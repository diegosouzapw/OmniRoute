/**
 * Detailed Request Logs DB Layer (#378)
 *
 * Saves full request/response bodies at each pipeline stage.
 * Ring-buffer of 500 entries enforced by SQL trigger in migration 006.
 * Only active when settings.detailed_logs_enabled = "1".
 */
import { v4 as uuidv4 } from "uuid";
import { getDbInstance } from "./core";
import { getSettings } from "./settings";
import { isNoLog } from "../compliance";
import {
  protectPayloadForLog,
  serializePayloadForStorage,
  parseStoredPayload,
} from "../logPayloads";
import { compactStructuredStreamPayload } from "@omniroute/open-sse/utils/streamPayloadCollector.ts";

export interface RequestDetailLog {
  id?: string;
  call_log_id?: string | null;
  timestamp?: string;
  client_request?: unknown | null;
  translated_request?: unknown | null;
  provider_response?: unknown | null;
  client_response?: unknown | null;
  provider?: string | null;
  model?: string | null;
  source_format?: string | null;
  target_format?: string | null;
  duration_ms?: number;
  api_key_id?: string | null;
  no_log?: boolean;
}

/** Returns true if detailed logging is enabled in settings */
export async function isDetailedLoggingEnabled(): Promise<boolean> {
  try {
    const settings = await getSettings();
    const val = settings.detailed_logs_enabled;
    return val === true || val === "1" || val === "true";
  } catch {
    return false;
  }
}

/** Save a detailed log entry — caller must verify isDetailedLoggingEnabled() first */
export function saveRequestDetailLog(entry: RequestDetailLog): void {
  const noLogEnabled =
    Boolean(entry.no_log) || (entry.api_key_id ? isNoLog(entry.api_key_id) : false);
  if (noLogEnabled) return;

  const db = getDbInstance();
  const id = entry.id ?? uuidv4();
  const timestamp = entry.timestamp ?? new Date().toISOString();
  const compactProviderResponse = compactStructuredStreamPayload(entry.provider_response);
  const compactClientResponse = compactStructuredStreamPayload(entry.client_response);

  db.prepare(
    `
    INSERT INTO request_detail_logs
      (id, call_log_id, timestamp, client_request, translated_request,
       provider_response, client_response, provider, model, source_format, target_format, duration_ms)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    id,
    entry.call_log_id ?? null,
    timestamp,
    serializePayloadForStorage(protectPayloadForLog(entry.client_request)),
    serializePayloadForStorage(protectPayloadForLog(entry.translated_request)),
    serializePayloadForStorage(protectPayloadForLog(compactProviderResponse)),
    serializePayloadForStorage(protectPayloadForLog(compactClientResponse)),
    entry.provider ?? null,
    entry.model ?? null,
    entry.source_format ?? null,
    entry.target_format ?? null,
    entry.duration_ms ?? 0
  );
}

/** Fetch detailed logs (latest first) */
export function getRequestDetailLogs(limit = 50, offset = 0): RequestDetailLog[] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `
      SELECT * FROM request_detail_logs
      ORDER BY timestamp DESC
      LIMIT ? OFFSET ?
    `
    )
    .all(limit, offset) as Array<Record<string, unknown>>;

  return rows.map(mapDetailedLogRow);
}

/** Get a single detailed log by ID */
export function getRequestDetailLogById(id: string): RequestDetailLog | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM request_detail_logs WHERE id = ?").get(id) as
    | Record<string, unknown>
    | undefined;
  return row ? mapDetailedLogRow(row) : null;
}

/** Get the most recent detailed log for a call log ID */
export function getRequestDetailLogByCallLogId(callLogId: string): RequestDetailLog | null {
  const db = getDbInstance();
  const row = db
    .prepare(
      `
      SELECT * FROM request_detail_logs
      WHERE call_log_id = ?
      ORDER BY timestamp DESC
      LIMIT 1
    `
    )
    .get(callLogId) as Record<string, unknown> | undefined;
  return row ? mapDetailedLogRow(row) : null;
}

/** Get total count of detailed logs */
export function getRequestDetailLogCount(): number {
  const db = getDbInstance();
  const row = db.prepare("SELECT COUNT(*) as cnt FROM request_detail_logs").get() as {
    cnt: number;
  };
  return row?.cnt ?? 0;
}

function mapDetailedLogRow(row: Record<string, unknown>): RequestDetailLog {
  return {
    id: typeof row.id === "string" ? row.id : undefined,
    call_log_id: typeof row.call_log_id === "string" ? row.call_log_id : null,
    timestamp: typeof row.timestamp === "string" ? row.timestamp : undefined,
    client_request: parseStoredPayload(row.client_request),
    translated_request: parseStoredPayload(row.translated_request),
    provider_response: parseStoredPayload(row.provider_response),
    client_response: parseStoredPayload(row.client_response),
    provider: typeof row.provider === "string" ? row.provider : null,
    model: typeof row.model === "string" ? row.model : null,
    source_format: typeof row.source_format === "string" ? row.source_format : null,
    target_format: typeof row.target_format === "string" ? row.target_format : null,
    duration_ms: typeof row.duration_ms === "number" ? row.duration_ms : 0,
  };
}
