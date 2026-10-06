/**
 * Call-log source for the log-export pipeline.
 *
 * Reads `call_logs` in insertion order using SQLite's implicit `rowid` as the export
 * cursor. `timestamp` is NOT usable as a cursor: callers may supply their own value
 * (see saveCallLogOperation), so a slow request can be written after a faster one that
 * started later — a timestamp cursor would silently skip it. `rowid` is monotonic for
 * inserts and log rotation only deletes the oldest rows, so the high-water mark never
 * moves backwards except on a full purge, which `getMaxCallLogRowId` detects.
 *
 * The projected record mirrors what the Logs dashboard tab renders (same JOINs, same
 * provider/account resolution helpers). Request/response payloads live in filesystem
 * artifacts and are only attached when the destination opts in (`includeBodies`); they
 * are read through `getCallLogById`, the same path the Logs detail pane uses, so the
 * export cannot drift from the UI and inherits its PII sanitisation, secret redaction
 * and `noLog` handling.
 */

import { getDbInstance } from "../db/core";
import { applyNodePrefix, getCallLogById, resolveProviderDisplay } from "./callLogs";
import type { LogExportRecord, LogExportSourceRow } from "../logExport/types";

/** Cap applied per payload field when a destination does not set its own. */
export const DEFAULT_MAX_BODY_BYTES = 262_144;

export interface CallLogExportOptions {
  /** Attach request/response payloads. Off by default: these carry prompt content. */
  includeBodies?: boolean;
  /** Per-field byte cap; oversized payloads are truncated, never dropped. */
  maxBodyBytes?: number;
}

const RESOLVED_ACCOUNT_SQL = "COALESCE(NULLIF(pc.name, ''), NULLIF(pc.email, ''), cl.account)";

type ExportSourceRow = {
  row_id: number;
  id: string;
  timestamp: string | null;
  method: string | null;
  path: string | null;
  status: number | null;
  model: string | null;
  requested_model: string | null;
  provider: string | null;
  account: string | null;
  connection_id: string | null;
  duration: number | null;
  tokens_in: number | null;
  tokens_out: number | null;
  tokens_cache_read: number | null;
  tokens_cache_creation: number | null;
  tokens_reasoning: number | null;
  tokens_compressed: number | null;
  cache_source: string | null;
  request_type: string | null;
  source_format: string | null;
  target_format: string | null;
  api_key_id: string | null;
  api_key_name: string | null;
  combo_name: string | null;
  combo_step_id: string | null;
  combo_execution_key: string | null;
  error_summary: string | null;
  error_type: string | null;
  detail_state: string | null;
  has_request_body: number | null;
  has_response_body: number | null;
  has_pipeline_details: number | null;
  correlation_id: string | null;
  model_pinned: number | null;
  session_tag: string | null;
  provider_node_name: string | null;
  provider_node_prefix: string | null;
  resolved_account: string | null;
};

function toNumberOrNull(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function mapExportRow(row: ExportSourceRow): LogExportRecord {
  const provider = row.provider;
  return {
    id: row.id,
    timestamp: row.timestamp,
    method: row.method,
    path: row.path,
    status: toNumberOrNull(row.status),
    model: row.model,
    requestedModel: applyNodePrefix(row.requested_model, provider, row.provider_node_prefix),
    provider,
    providerDisplay: resolveProviderDisplay(
      provider,
      row.provider_node_name,
      row.provider_node_prefix
    ),
    account: row.resolved_account || row.account,
    connectionId: row.connection_id,
    duration: toNumberOrNull(row.duration),
    tokensIn: toNumberOrNull(row.tokens_in),
    tokensOut: toNumberOrNull(row.tokens_out),
    tokensCacheRead: toNumberOrNull(row.tokens_cache_read),
    tokensCacheWrite: toNumberOrNull(row.tokens_cache_creation),
    tokensReasoning: toNumberOrNull(row.tokens_reasoning),
    tokensCompressed: toNumberOrNull(row.tokens_compressed),
    cacheSource: row.cache_source || "upstream",
    requestType: row.request_type,
    sourceFormat: row.source_format,
    targetFormat: row.target_format,
    apiKeyId: row.api_key_id,
    apiKeyName: row.api_key_name,
    comboName: row.combo_name,
    comboStepId: row.combo_step_id,
    comboExecutionKey: row.combo_execution_key,
    errorSummary: row.error_summary,
    errorType: row.error_type ?? null,
    correlationId: row.correlation_id || null,
    sessionTag: row.session_tag || null,
    modelPinned: toNumberOrNull(row.model_pinned) === 1,
    detailState: row.detail_state,
    hasRequestBody: toNumberOrNull(row.has_request_body) === 1,
    hasResponseBody: toNumberOrNull(row.has_response_body) === 1,
    hasPipelineDetails: toNumberOrNull(row.has_pipeline_details) === 1,
    requestBody: null,
    responseBody: null,
    pipelineRouteDecision: null,
    pipelineClientRequest: null,
    pipelineOpenaiRequest: null,
    pipelineProviderRequest: null,
    pipelineProviderResponse: null,
    pipelineClientResponse: null,
    pipelineError: null,
    bodiesTruncated: false,
  };
}

/**
 * Serialise one payload for export. Objects become JSON; strings pass through so an
 * already-serialised body is not double-encoded. Oversized values are truncated rather
 * than dropped, because a clipped prompt still answers "what was asked" while a null
 * answers nothing. Truncation is reported back so the row can be flagged.
 */
function serialiseBody(
  value: unknown,
  maxBytes: number
): { text: string | null; truncated: boolean } {
  if (value === null || value === undefined) return { text: null, truncated: false };

  let text: string;
  if (typeof value === "string") {
    text = value;
  } else {
    try {
      text = JSON.stringify(value);
    } catch {
      // Circular or otherwise unserialisable: record the shape, never throw mid-export.
      return { text: '{"_export_error":"payload is not serialisable"}', truncated: false };
    }
  }
  if (text === undefined) return { text: null, truncated: false };

  if (Buffer.byteLength(text, "utf8") <= maxBytes) return { text, truncated: false };

  // Slice on a byte boundary, then drop any partial trailing UTF-8 sequence.
  const clipped = Buffer.from(text, "utf8").subarray(0, maxBytes).toString("utf8");
  const safe = clipped.endsWith("�") ? clipped.slice(0, -1) : clipped;
  return { text: `${safe}…[truncated]`, truncated: true };
}

/**
 * Attach payloads to already-projected rows. Each row is resolved through
 * `getCallLogById`, which handles artifact / legacy-inline / missing / corrupt detail
 * states identically to the dashboard. A row whose detail cannot be read keeps its
 * summary fields and exports null payloads: a missing artifact must not fail the batch
 * and strand the cursor.
 */
export async function attachExportBodies(
  rows: LogExportSourceRow[],
  maxBodyBytes: number = DEFAULT_MAX_BODY_BYTES
): Promise<LogExportSourceRow[]> {
  const cap = Math.max(1024, maxBodyBytes);

  return Promise.all(
    rows.map(async (row) => {
      let detail: Awaited<ReturnType<typeof getCallLogById>> = null;
      try {
        detail = await getCallLogById(row.record.id);
      } catch {
        return row;
      }
      if (!detail) return row;

      const pipeline = (detail.pipelinePayloads ?? null) as Record<string, unknown> | null;
      let truncated = false;
      const take = (value: unknown): string | null => {
        const result = serialiseBody(value, cap);
        if (result.truncated) truncated = true;
        return result.text;
      };

      const record: LogExportRecord = {
        ...row.record,
        requestBody: take(detail.requestBody),
        responseBody: take(detail.responseBody),
        pipelineRouteDecision: take(pipeline?.routeDecision),
        pipelineClientRequest: take(pipeline?.clientRawRequest ?? pipeline?.clientRequest),
        pipelineOpenaiRequest: take(pipeline?.openaiRequest),
        pipelineProviderRequest: take(pipeline?.providerRequest),
        pipelineProviderResponse: take(pipeline?.providerResponse),
        pipelineClientResponse: take(pipeline?.clientResponse),
        pipelineError: take(pipeline?.error),
        bodiesTruncated: false,
      };
      record.bodiesTruncated = truncated;
      return { rowId: row.rowId, record };
    })
  );
}

/** Highest rowid currently in `call_logs`, or 0 when the table is empty. */
export function getMaxCallLogRowId(): number {
  const db = getDbInstance();
  const row = db.prepare("SELECT COALESCE(MAX(rowid), 0) AS max_row_id FROM call_logs").get() as {
    max_row_id: number;
  };
  return Number(row?.max_row_id ?? 0);
}

/** Rows still waiting to be exported past `afterRowId`. */
export function countCallLogsAfterRowId(afterRowId: number): number {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT COUNT(*) AS pending FROM call_logs WHERE rowid > ?")
    .get(afterRowId) as { pending: number };
  return Number(row?.pending ?? 0);
}

/** One batch of exportable rows, oldest first, paired with their cursor value. */
export function getCallLogsForExport(afterRowId: number, limit: number): LogExportSourceRow[] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT cl.rowid AS row_id, cl.*,
              pn.name AS provider_node_name,
              pn.prefix AS provider_node_prefix,
              ${RESOLVED_ACCOUNT_SQL} AS resolved_account
         FROM call_logs cl
         LEFT JOIN provider_nodes pn ON pn.id = cl.provider
         LEFT JOIN provider_connections pc ON pc.id = cl.connection_id
        WHERE cl.rowid > @afterRowId
        ORDER BY cl.rowid ASC
        LIMIT @limit`
    )
    .all({ afterRowId, limit }) as ExportSourceRow[];

  return rows.map((row) => ({ rowId: Number(row.row_id), record: mapExportRow(row) }));
}
