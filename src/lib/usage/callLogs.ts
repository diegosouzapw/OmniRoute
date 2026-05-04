/**
 * Structured call log management.
 *
 * SQLite stores only summary metadata. Detailed request/response payloads live in
 * filesystem artifacts and are loaded only for explicit detail/export flows.
 */

import fs from "fs";
import path from "path";
import type { RequestPipelinePayloads } from "@omniroute/open-sse/utils/requestLogger.ts";
import { getDbInstance } from "../db/core";
import { getRequestDetailLogByCallLogId } from "../db/detailedLogs";
import { shouldPersistToDisk } from "./migrations";
import {
  getLoggedInputTokens,
  getLoggedOutputTokens,
  getPromptCacheReadTokensOrNull,
  getPromptCacheCreationTokensOrNull,
  getReasoningTokensOrNull,
} from "./tokenAccounting";
import { isNoLog } from "../compliance";
import { sanitizePII } from "../piiSanitizer";
import { protectPayloadForLog, parseStoredPayload } from "../logPayloads";
import { getCallLogMaxEntries, getCallLogRetentionDays, getCallLogsTableMaxRows } from "../logEnv";
import { pickMaskedDisplayValue } from "@/shared/utils/maskEmail";
import {
  CALL_LOGS_DIR,
  cleanupEmptyCallLogDirs,
  deleteCallArtifact,
  listCallLogArtifactFiles,
  readCallArtifact,
  writeCallArtifact,
  type CallLogArtifact,
  type CallLogDetailState,
} from "./callLogArtifacts";

type JsonRecord = Record<string, unknown>;

type CallLogSummaryRow = {
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
  detail_state: string | null;
  artifact_relpath: string | null;
  artifact_size_bytes: number | null;
  artifact_sha256: string | null;
  has_request_body: number | null;
  has_response_body: number | null;
  has_pipeline_details: number | null;
  request_summary: string | null;
  provider_node_prefix?: string | null;
};

type LegacyInlineRow = {
  request_body: string | null;
  response_body: string | null;
  error: string | null;
};

type DeleteResult = {
  deletedRows: number;
  deletedArtifacts: number;
};

let logIdCounter = 0;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function truncateText(value: string, maxLength: number) {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

function parseInlineError(value: unknown): unknown {
  if (typeof value !== "string" || value.trim().length === 0) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function normalizeDetailState(value: unknown): CallLogDetailState {
  if (
    value === "ready" ||
    value === "missing" ||
    value === "corrupt" ||
    value === "legacy-inline"
  ) {
    return value;
  }
  return "none";
}

function sanitizeErrorForLog(error: unknown): unknown {
  if (error === null || error === undefined) return null;
  if (typeof error === "string") return sanitizePII(error).text;
  if (error instanceof Error) {
    return {
      message: sanitizePII(error.message).text,
      stack: sanitizePII(error.stack || "").text || undefined,
      name: error.name,
    };
  }
  return protectPayloadForLog(error);
}

function toStoredErrorSummary(error: unknown): string | null {
  const sanitized = sanitizeErrorForLog(error);
  if (sanitized === null || sanitized === undefined) return null;

  if (typeof sanitized === "string") {
    return truncateText(sanitized, 4000);
  }

  try {
    return truncateText(JSON.stringify(sanitized), 4000);
  } catch {
    return truncateText(String(sanitized), 4000);
  }
}

function protectPipelinePayloads(payloads: unknown): RequestPipelinePayloads | null {
  if (!payloads || typeof payloads !== "object") return null;

  const protectedPayloads: RequestPipelinePayloads = {};
  for (const [key, value] of Object.entries(payloads as JsonRecord)) {
    if (value === null || value === undefined) continue;

    if (key === "streamChunks" && value && typeof value === "object") {
      const chunks = value as Record<string, unknown>;
      const compacted = Object.fromEntries(
        Object.entries(chunks).filter(
          ([, chunkValue]) => Array.isArray(chunkValue) && chunkValue.length > 0
        )
      );
      if (Object.keys(compacted).length > 0) {
        protectedPayloads.streamChunks = protectPayloadForLog(
          compacted
        ) as RequestPipelinePayloads["streamChunks"];
      }
      continue;
    }

    protectedPayloads[key as keyof RequestPipelinePayloads] = protectPayloadForLog(value) as never;
  }

  return Object.keys(protectedPayloads).length > 0 ? protectedPayloads : null;
}

function buildRequestSummary(requestType: string | null, requestBody: unknown): string | null {
  if (requestType !== "search") return null;

  const body = asRecord(requestBody);
  if (Object.keys(body).length === 0) return null;

  const summary: JsonRecord = {};
  if (typeof body.query === "string" && body.query.trim().length > 0) {
    summary.query = sanitizePII(body.query).text;
  }

  const filters = Object.fromEntries(
    Object.entries(body).filter(([key]) => key !== "query" && key !== "provider")
  );
  if (Object.keys(filters).length > 0) {
    summary.filters = filters;
  }

  if (Object.keys(summary).length === 0) return null;
  return JSON.stringify(summary);
}

function generateLogId() {
  logIdCounter++;
  return `${Date.now()}-${logIdCounter}`;
}

async function resolveAccountName(connectionId: string | null | undefined) {
  let account = connectionId ? connectionId.slice(0, 8) : "-";

  if (!connectionId) {
    return account;
  }

  try {
    const { getProviderConnections } = await import("@/lib/localDb");
    const connections = await getProviderConnections();
    const conn = connections.find((item) => item.id === connectionId);
    if (conn) {
      account = pickMaskedDisplayValue(
        [toStringOrNull(conn.name), toStringOrNull(conn.email)],
        account
      );
    }
  } catch {
    // Best-effort lookup only.
  }

  return account;
}

async function resolveProviderPrefix(providerId: string): Promise<string | null> {
  if (!providerId) return null;
  try {
    const { getProviderNodeById } = await import("@/lib/localDb");
    const node = await getProviderNodeById(providerId);
    if (node && typeof node.prefix === "string" && node.prefix.trim().length > 0) {
      return node.prefix.trim();
    }
  } catch {
    // Best-effort lookup only.
  }
  return null;
}

function isCompatibleProviderId(providerId: string | null): boolean {
  if (!providerId) return false;
  return (
    providerId.startsWith("openai-compatible-") || providerId.startsWith("anthropic-compatible-")
  );
}

function applyNodePrefix(
  requestedModel: string | null,
  provider: string | null,
  nodePrefix: string | null
): string | null {
  if (!requestedModel || !provider || !nodePrefix) return requestedModel;
  if (requestedModel.startsWith(provider + "/")) {
    return nodePrefix + "/" + requestedModel.slice(provider.length + 1);
  }
  return requestedModel;
}
function buildArtifact(
  logEntry: {
    id: string;
    timestamp: string;
    method: string;
    path: string;
    status: number;
    model: string;
    requestedModel: string | null;
    provider: string;
    account: string;
    connectionId: string | null;
    duration: number;
    tokensIn: number;
    tokensOut: number;
    tokensCacheRead: number | null;
    tokensCacheCreation: number | null;
    tokensReasoning: number | null;
    tokensCompressed: number | null;
    requestType: string | null;
    sourceFormat: string | null;
    targetFormat: string | null;
    apiKeyId: string | null;
    apiKeyName: string | null;
    comboName: string | null;
    comboStepId: string | null;
    comboExecutionKey: string | null;
  },
  requestBody: unknown,
  responseBody: unknown,
  error: unknown,
  pipelinePayloads: RequestPipelinePayloads | null
): CallLogArtifact {
  return {
    schemaVersion: 5,
    summary: {
      id: logEntry.id,
      timestamp: logEntry.timestamp,
      method: logEntry.method,
      path: logEntry.path,
      status: logEntry.status,
      model: logEntry.model,
      requestedModel: logEntry.requestedModel,
      provider: logEntry.provider,
      account: logEntry.account,
      connectionId: logEntry.connectionId,
      duration: logEntry.duration,
      tokens: {
        in: logEntry.tokensIn,
        out: logEntry.tokensOut,
        cacheRead: logEntry.tokensCacheRead,
        cacheWrite: logEntry.tokensCacheCreation,
        reasoning: logEntry.tokensReasoning,
        compressed: logEntry.tokensCompressed,
      },
      requestType: logEntry.requestType,
      sourceFormat: logEntry.sourceFormat,
      targetFormat: logEntry.targetFormat,
      apiKeyId: logEntry.apiKeyId,
      apiKeyName: logEntry.apiKeyName,
      comboName: logEntry.comboName,
      comboStepId: logEntry.comboStepId,
      comboExecutionKey: logEntry.comboExecutionKey,
    },
    requestBody: requestBody ?? null,
    responseBody: responseBody ?? null,
    error: error ?? null,
    ...(pipelinePayloads ? { pipeline: pipelinePayloads } : {}),
  };
}

function hasTable(tableName: string): boolean {
  const db = getDbInstance();
  return Boolean(
    db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(tableName)
  );
}

function readLegacyLogFromDisk(entry: {
  timestamp: string | null;
  model: string | null;
  status: number;
}) {
  if (!CALL_LOGS_DIR || !entry.timestamp) return null;

  try {
    const date = new Date(entry.timestamp);
    if (Number.isNaN(date.getTime())) return null;

    const dateFolder = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
    const dir = path.join(CALL_LOGS_DIR, dateFolder);
    if (!fs.existsSync(dir)) return null;

    const time = `${String(date.getHours()).padStart(2, "0")}${String(date.getMinutes()).padStart(
      2,
      "0"
    )}${String(date.getSeconds()).padStart(2, "0")}`;
    const safeModel = (entry.model || "unknown").replace(/[/:]/g, "-");
    const expectedName = `${time}_${safeModel}_${entry.status}.json`;

    const exactPath = path.join(dir, expectedName);
    if (fs.existsSync(exactPath)) {
      return JSON.parse(fs.readFileSync(exactPath, "utf8"));
    }

    const files = fs
      .readdirSync(dir)
      .filter((file) => file.startsWith(time) && file.endsWith(`_${entry.status}.json`));
    if (files.length > 0) {
      return JSON.parse(fs.readFileSync(path.join(dir, files[0]), "utf8"));
    }
  } catch (error) {
    console.error("[callLogs] Failed to read legacy disk log:", (error as Error).message);
  }

  return null;
}

function clearArtifactReference(relativePath: string, nextState: CallLogDetailState) {
  const db = getDbInstance();
  db.prepare(
    `
      UPDATE call_logs
      SET detail_state = ?,
          artifact_relpath = NULL,
          artifact_size_bytes = NULL,
          artifact_sha256 = NULL
      WHERE artifact_relpath = ?
    `
  ).run(nextState, relativePath);
}

function listReferencedArtifacts() {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT artifact_relpath FROM call_logs WHERE artifact_relpath IS NOT NULL")
    .all() as Array<{ artifact_relpath: string | null }>;

  return new Set(
    rows.map((row) => row.artifact_relpath).filter((value): value is string => Boolean(value))
  );
}

function deleteCallLogRowsByIds(ids: string[]): DeleteResult {
  if (ids.length === 0) {
    return { deletedRows: 0, deletedArtifacts: 0 };
  }

  const db = getDbInstance();
  const placeholders = ids.map(() => "?").join(", ");
  const rows = db
    .prepare(`SELECT artifact_relpath FROM call_logs WHERE id IN (${placeholders})`)
    .all(...ids) as Array<{ artifact_relpath: string | null }>;

  const result = db.prepare(`DELETE FROM call_logs WHERE id IN (${placeholders})`).run(...ids);
  let deletedArtifacts = 0;
  for (const row of rows) {
    if (deleteCallArtifact(row.artifact_relpath)) {
      deletedArtifacts++;
    }
  }
  cleanupEmptyCallLogDirs();

  return {
    deletedRows: result.changes,
    deletedArtifacts,
  };
}

export function cleanupOrphanCallLogFiles(baseDir = CALL_LOGS_DIR) {
  if (!baseDir || !fs.existsSync(baseDir)) return 0;

  try {
    const referenced = listReferencedArtifacts();
    let deleted = 0;
    for (const file of listCallLogArtifactFiles(baseDir)) {
      if (referenced.has(file.relativePath)) continue;
      if (deleteCallArtifact(file.relativePath)) {
        deleted++;
      }
    }
    cleanupEmptyCallLogDirs(baseDir);
    return deleted;
  } catch (error) {
    console.error("[callLogs] Failed to prune orphan request artifacts:", (error as Error).message);
    return 0;
  }
}

export function cleanupOverflowCallLogFiles(baseDir = CALL_LOGS_DIR, maxEntries?: number) {
  if (!baseDir || !fs.existsSync(baseDir)) return 0;

  const limit = maxEntries ?? getCallLogMaxEntries();
  if (!Number.isInteger(limit) || limit < 1) return 0;

  try {
    let deleted = 0;
    const files = listCallLogArtifactFiles(baseDir);
    for (const file of files.slice(limit)) {
      if (deleteCallArtifact(file.relativePath)) {
        clearArtifactReference(file.relativePath, "missing");
        deleted++;
      }
    }
    cleanupEmptyCallLogDirs(baseDir);
    return deleted;
  } catch (error) {
    console.error(
      "[callLogs] Failed to prune overflow request artifacts:",
      (error as Error).message
    );
    return 0;
  }
}

export function deleteCallLogsBefore(cutoff: string): DeleteResult {
  const db = getDbInstance();
  const ids = db
    .prepare("SELECT id FROM call_logs WHERE timestamp < ? ORDER BY timestamp ASC")
    .all(cutoff)
    .map((row) => String((row as { id: string }).id));

  return deleteCallLogRowsByIds(ids);
}

export function trimCallLogsToMaxRows(maxRows = getCallLogsTableMaxRows()) {
  if (!Number.isInteger(maxRows) || maxRows < 1) {
    return { deletedRows: 0, deletedArtifacts: 0 };
  }

  const db = getDbInstance();
  let deletedRows = 0;
  let deletedArtifacts = 0;
  const batchSize = 5000;

  while (true) {
    const currentCount = db.prepare("SELECT COUNT(*) AS cnt FROM call_logs").get() as {
      cnt: number;
    };
    if (currentCount.cnt <= maxRows) break;

    const toDelete = Math.min(currentCount.cnt - maxRows, batchSize);
    const ids = db
      .prepare("SELECT id FROM call_logs ORDER BY timestamp ASC LIMIT ?")
      .all(toDelete)
      .map((row) => String((row as { id: string }).id));
    const result = deleteCallLogRowsByIds(ids);
    deletedRows += result.deletedRows;
    deletedArtifacts += result.deletedArtifacts;
    if (result.deletedRows === 0) break;
  }

  return { deletedRows, deletedArtifacts };
}

function mapSummaryRow(row: CallLogSummaryRow) {
  const detailState = normalizeDetailState(row.detail_state);
  const provider = row.provider;
  const nodePrefix = row.provider_node_prefix ?? null;
  return {
    id: row.id,
    timestamp: row.timestamp,
    method: row.method,
    path: row.path,
    status: toNumber(row.status),
    model: row.model,
    requestedModel: applyNodePrefix(row.requested_model, provider, nodePrefix),
    provider,
    account: row.account,
    connectionId: row.connection_id,
    duration: toNumber(row.duration),
    tokens: {
      in: toNumber(row.tokens_in),
      out: toNumber(row.tokens_out),
      cacheRead: row.tokens_cache_read != null ? toNumber(row.tokens_cache_read) : null,
      cacheWrite: row.tokens_cache_creation != null ? toNumber(row.tokens_cache_creation) : null,
      reasoning: row.tokens_reasoning != null ? toNumber(row.tokens_reasoning) : null,
      compressed: row.tokens_compressed != null ? toNumber(row.tokens_compressed) : null,
    },
    cacheSource: row.cache_source || "upstream",
    requestType: row.request_type,
    sourceFormat: row.source_format,
    targetFormat: row.target_format,
    apiKeyId: row.api_key_id,
    apiKeyName: row.api_key_name,
    comboName: row.combo_name,
    comboStepId: row.combo_step_id,
    comboExecutionKey: row.combo_execution_key,
    error: row.error_summary,
    detailState,
    artifactRelPath: row.artifact_relpath,
    artifactSizeBytes: row.artifact_size_bytes,
    artifactSha256: row.artifact_sha256,
    requestSummary: row.request_summary ? parseStoredPayload(row.request_summary) : null,
    hasRequestBody: toNumber(row.has_request_body) === 1,
    hasResponseBody: toNumber(row.has_response_body) === 1,
    hasPipelineDetails: toNumber(row.has_pipeline_details) === 1,
  };
}

function buildLegacyPipelinePayloads(id: string) {
  const detailed = getRequestDetailLogByCallLogId(id);
  if (!detailed) return null;

  return {
    clientRequest: detailed.client_request ?? null,
    providerRequest: detailed.translated_request ?? null,
    providerResponse: detailed.provider_response ?? null,
    clientResponse: detailed.client_response ?? null,
  };
}

function getLegacyInlineDetail(id: string) {
  if (!hasTable("call_logs_v1_legacy")) return null;

  const db = getDbInstance();
  const row = db
    .prepare("SELECT request_body, response_body, error FROM call_logs_v1_legacy WHERE id = ?")
    .get(id) as LegacyInlineRow | undefined;
  if (!row) return null;

  return {
    requestBody: parseStoredPayload(row.request_body),
    responseBody: parseStoredPayload(row.response_body),
    error: parseInlineError(row.error),
  };
}

export async function saveCallLog(entry: any) {
  if (!shouldPersistToDisk) return;

  try {
    const apiKeyId = entry.apiKeyId || null;
    const noLogEnabled = Boolean(entry.noLog) || (apiKeyId ? isNoLog(apiKeyId) : false);

    const protectedRequestBody = noLogEnabled ? null : protectPayloadForLog(entry.requestBody);
    const protectedResponseBody = noLogEnabled ? null : protectPayloadForLog(entry.responseBody);
    const protectedPipelinePayloads = noLogEnabled
      ? null
      : protectPipelinePayloads(entry.pipelinePayloads ?? entry.pipeline ?? null);
    const protectedError = sanitizeErrorForLog(entry.error);

    const account = await resolveAccountName(entry.connectionId || null);
    const rawProvider: string = entry.provider || "-";
    const rawRequestedModel: string | null = entry.requestedModel || null;
    let resolvedRequestedModel = rawRequestedModel;
    if (rawRequestedModel && isCompatibleProviderId(rawProvider)) {
      const nodePrefix = await resolveProviderPrefix(rawProvider);
      resolvedRequestedModel = applyNodePrefix(rawRequestedModel, rawProvider, nodePrefix);
    }
    const logEntry = {
      id: typeof entry.id === "string" && entry.id.length > 0 ? entry.id : generateLogId(),
      timestamp: typeof entry.timestamp === "string" ? entry.timestamp : new Date().toISOString(),
      method: entry.method || "POST",
      path: entry.path || "/v1/chat/completions",
      status: entry.status || 0,
      model: entry.model || "-",
      requestedModel: resolvedRequestedModel,
      provider: rawProvider,
      account,
      connectionId: entry.connectionId || null,
      duration: entry.duration || 0,
      tokensIn: toNumber(getLoggedInputTokens(entry.tokens)),
      tokensOut: toNumber(getLoggedOutputTokens(entry.tokens)),
      tokensCacheRead: getPromptCacheReadTokensOrNull(entry.tokens),
      tokensCacheCreation: getPromptCacheCreationTokensOrNull(entry.tokens),
      tokensReasoning: getReasoningTokensOrNull(entry.tokens),
      tokensCompressed: entry.tokensCompressed != null ? toNumber(entry.tokensCompressed) : null,
      cacheSource: entry.cacheSource === "semantic" ? "semantic" : "upstream",
      requestType: entry.requestType || null,
      sourceFormat: entry.sourceFormat || null,
      targetFormat: entry.targetFormat || null,
      apiKeyId,
      apiKeyName: entry.apiKeyName || null,
      comboName: entry.comboName || null,
      comboStepId: toStringOrNull(entry.comboStepId),
      comboExecutionKey:
        toStringOrNull(entry.comboExecutionKey) || toStringOrNull(entry.comboStepId),
    };

    const requestSummary = noLogEnabled
      ? null
      : buildRequestSummary(logEntry.requestType, protectedRequestBody);
    const detailExpected =
      !noLogEnabled &&
      (protectedRequestBody !== null ||
        protectedResponseBody !== null ||
        protectedError !== null ||
        protectedPipelinePayloads !== null);

    let detailState: CallLogDetailState = "none";
    let artifactRelPath: string | null = null;
    let artifactSizeBytes: number | null = null;
    let artifactSha256: string | null = null;

    if (detailExpected) {
      const artifact = buildArtifact(
        logEntry,
        protectedRequestBody,
        protectedResponseBody,
        protectedError,
        protectedPipelinePayloads
      );
      const artifactResult = writeCallArtifact(artifact);
      if (artifactResult) {
        detailState = "ready";
        artifactRelPath = artifactResult.relPath;
        artifactSizeBytes = artifactResult.sizeBytes;
        artifactSha256 = artifactResult.sha256;
      } else {
        detailState = "missing";
      }
    }

    const db = getDbInstance();
    db.prepare(
      `
      INSERT INTO call_logs (
        id, timestamp, method, path, status, model, requested_model, provider,
        account, connection_id, duration, tokens_in, tokens_out,
        tokens_cache_read, tokens_cache_creation, tokens_reasoning, tokens_compressed,
        cache_source, request_type, source_format, target_format, api_key_id, api_key_name,
        combo_name, combo_step_id, combo_execution_key, error_summary, detail_state,
        artifact_relpath, artifact_size_bytes, artifact_sha256,
        has_request_body, has_response_body, has_pipeline_details, request_summary
      )
      VALUES (
        @id, @timestamp, @method, @path, @status, @model, @requestedModel, @provider,
        @account, @connectionId, @duration, @tokensIn, @tokensOut,
        @tokensCacheRead, @tokensCacheCreation, @tokensReasoning, @tokensCompressed,
        @cacheSource, @requestType, @sourceFormat, @targetFormat, @apiKeyId, @apiKeyName,
        @comboName, @comboStepId, @comboExecutionKey, @errorSummary, @detailState,
        @artifactRelPath, @artifactSizeBytes, @artifactSha256,
        @hasRequestBody, @hasResponseBody, @hasPipelineDetails, @requestSummary
      )
    `
    ).run({
      ...logEntry,
      errorSummary: toStoredErrorSummary(protectedError),
      detailState,
      artifactRelPath,
      artifactSizeBytes,
      artifactSha256,
      hasRequestBody: protectedRequestBody !== null ? 1 : 0,
      hasResponseBody: protectedResponseBody !== null ? 1 : 0,
      hasPipelineDetails: protectedPipelinePayloads ? 1 : 0,
      requestSummary,
    });

    rotateCallLogs();
  } catch (error) {
    console.error("[callLogs] Failed to save call log:", (error as Error).message);
  }
}

export function rotateCallLogs() {
  if (!CALL_LOGS_DIR || !fs.existsSync(CALL_LOGS_DIR)) return;

  try {
    const retentionMs = getCallLogRetentionDays() * 24 * 60 * 60 * 1000;
    const cutoff = new Date(Date.now() - retentionMs).toISOString();

    deleteCallLogsBefore(cutoff);
    trimCallLogsToMaxRows(getCallLogsTableMaxRows());
    cleanupOverflowCallLogFiles(CALL_LOGS_DIR, getCallLogMaxEntries());
    cleanupOrphanCallLogFiles(CALL_LOGS_DIR);
  } catch (error) {
    console.error("[callLogs] Failed to rotate request artifacts:", (error as Error).message);
  }
}

if (shouldPersistToDisk) {
  try {
    rotateCallLogs();
  } catch {
    // Best-effort startup cleanup.
  }
}

export async function getCallLogs(filter: any = {}) {
  const db = getDbInstance();
  let sql = `
    SELECT cl.*,
      pn.prefix AS provider_node_prefix
    FROM call_logs cl
    LEFT JOIN provider_nodes pn ON pn.id = cl.provider
  `;
  const conditions: string[] = [];
  const params: Record<string, unknown> = {};

  if (filter.status) {
    if (filter.status === "error") {
      conditions.push("(cl.status >= 400 OR cl.error_summary IS NOT NULL)");
    } else if (filter.status === "ok") {
      conditions.push("cl.status >= 200 AND cl.status < 300");
    } else {
      const statusCode = parseInt(filter.status, 10);
      if (!Number.isNaN(statusCode)) {
        conditions.push("cl.status = @statusCode");
        params.statusCode = statusCode;
      }
    }
  }

  if (filter.model) {
    conditions.push("(cl.model LIKE @modelQ OR cl.requested_model LIKE @modelQ)");
    params.modelQ = `%${filter.model}%`;
  }
  if (filter.provider) {
    conditions.push("cl.provider LIKE @providerQ");
    params.providerQ = `%${filter.provider}%`;
  }
  if (filter.account) {
    conditions.push("cl.account LIKE @accountQ");
    params.accountQ = `%${filter.account}%`;
  }
  if (filter.apiKey) {
    conditions.push("(cl.api_key_name LIKE @apiKeyQ OR cl.api_key_id LIKE @apiKeyQ)");
    params.apiKeyQ = `%${filter.apiKey}%`;
  }
  if (filter.combo) {
    conditions.push("cl.combo_name IS NOT NULL");
  }
  if (filter.search) {
    conditions.push(`(
      cl.model LIKE @searchQ OR cl.path LIKE @searchQ OR cl.account LIKE @searchQ OR
      cl.requested_model LIKE @searchQ OR cl.provider LIKE @searchQ OR
      cl.api_key_name LIKE @searchQ OR cl.api_key_id LIKE @searchQ OR
      cl.combo_name LIKE @searchQ OR CAST(cl.status AS TEXT) LIKE @searchQ
      OR cl.combo_step_id LIKE @searchQ OR cl.combo_execution_key LIKE @searchQ
      OR cl.error_summary LIKE @searchQ
    )`);
    params.searchQ = `%${filter.search}%`;
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  const limit = filter.limit || 200;
  sql += ` ORDER BY cl.timestamp DESC LIMIT ${limit}`;

  const rows = db.prepare(sql).all(params) as CallLogSummaryRow[];
  return rows.map(mapSummaryRow);
}

export async function getCallLogById(id: string) {
  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT cl.*,
        pn.prefix AS provider_node_prefix
       FROM call_logs cl
       LEFT JOIN provider_nodes pn ON pn.id = cl.provider
       WHERE cl.id = ?`
    )
    .get(id) as
    | CallLogSummaryRow
    | undefined;
  if (!row) return null;

  const entry = mapSummaryRow(row);
  let detailState = entry.detailState;
  let artifactRelPath = entry.artifactRelPath;

  if (artifactRelPath) {
    const artifactResult = readCallArtifact(artifactRelPath);
    if (artifactResult.state === "ready" && artifactResult.artifact) {
      return {
        ...entry,
        detailState: "ready" as const,
        requestBody: artifactResult.artifact.requestBody ?? null,
        responseBody: artifactResult.artifact.responseBody ?? null,
        error: artifactResult.artifact.error ?? entry.error,
        pipelinePayloads: artifactResult.artifact.pipeline ?? buildLegacyPipelinePayloads(id),
        hasPipelineDetails: Boolean(artifactResult.artifact.pipeline) || entry.hasPipelineDetails,
      };
    }

    detailState = artifactResult.state;
    if (artifactResult.state === "missing") {
      clearArtifactReference(artifactRelPath, "missing");
      artifactRelPath = null;
    } else {
      db.prepare("UPDATE call_logs SET detail_state = ? WHERE id = ?").run("corrupt", id);
    }
  }

  if (detailState === "legacy-inline") {
    const legacyInline = getLegacyInlineDetail(id);
    if (legacyInline) {
      const legacyPipeline = buildLegacyPipelinePayloads(id);
      return {
        ...entry,
        detailState,
        artifactRelPath,
        ...legacyInline,
        pipelinePayloads: legacyPipeline,
        hasPipelineDetails: Boolean(legacyPipeline) || entry.hasPipelineDetails,
      };
    }
  }

  const legacyDisk = readLegacyLogFromDisk(entry);
  if (legacyDisk) {
    const legacyPipeline = buildLegacyPipelinePayloads(id);
    return {
      ...entry,
      detailState,
      artifactRelPath,
      requestBody: legacyDisk.requestBody ?? null,
      responseBody: legacyDisk.responseBody ?? null,
      error: legacyDisk.error ?? entry.error,
      pipelinePayloads: legacyPipeline,
      hasPipelineDetails: Boolean(legacyPipeline) || entry.hasPipelineDetails,
    };
  }

  const legacyPipeline = buildLegacyPipelinePayloads(id);
  return {
    ...entry,
    detailState,
    artifactRelPath,
    requestBody: null,
    responseBody: null,
    error: entry.error,
    pipelinePayloads: legacyPipeline,
    hasPipelineDetails: Boolean(legacyPipeline) || entry.hasPipelineDetails,
  };
}

export async function exportCallLogsSince(since: string) {
  const db = getDbInstance();
  const ids = db
    .prepare("SELECT id FROM call_logs WHERE timestamp >= ? ORDER BY timestamp DESC")
    .all(since)
    .map((row) => String((row as { id: string }).id));

  const logs: unknown[] = [];
  for (const id of ids) {
    const log = await getCallLogById(id);
    if (log) logs.push(log);
  }
  return logs;
}
