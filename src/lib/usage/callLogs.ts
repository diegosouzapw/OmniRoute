/**
 * Structured call log management.
 *
 * SQLite stores only summary metadata. Detailed request/response payloads live in
 * filesystem artifacts and are loaded only for explicit detail/export flows.
 */

import fs from "node:fs";
import path from "node:path";
import type { RequestPipelinePayloads } from "@omniroute/open-sse/utils/requestLogger.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/errorSanitization.ts";
import { getDbInstance } from "../db/core";
import { getRequestDetailLogByCallLogId } from "../db/detailedLogs";
import { shouldPersistToDisk } from "./migrations";
import { getCallLogApiKeyContext } from "./callLogApiKeyContext";
import {
  getLoggedInputTokens,
  getLoggedOutputTokens,
  getPromptCacheReadTokensOrNull,
  getPromptCacheCreationTokensOrNull,
  getReasoningTokensOrNull,
  getObservedReasoning,
} from "./tokenAccounting";
import { isNoLog } from "../compliance/noLog";
import {
  parseStoredPayload,
  protectErrorPayloadForLog,
  protectPayloadForLog,
} from "../logPayloads";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import {
  CALL_LOGS_DIR,
  readCallArtifact,
  type CallLogArtifact,
  type CallLogDetailState,
} from "./callLogArtifacts";
import { closeCallLogArtifactWriter, writeCallArtifactAsync } from "./callLogArtifactWriter";
import {
  toNumber,
  toStringOrNull,
  parseInlineError,
  normalizeDetailState,
  sanitizeErrorForLog,
  toStoredErrorSummary,
  protectPipelinePayloads,
  buildRequestSummary,
  classifyCallLogError,
} from "./callLogs/format";
import {
  clearArtifactReference,
  cleanupOrphanCallLogFiles,
  cleanupOverflowCallLogFiles,
  deleteCallLogsBefore,
  trimCallLogsToMaxRows,
  rotateCallLogs,
  scheduleCallLogRotation,
} from "./callLogRotation";

// Re-exported for existing importers (usageDb.ts, compliance/index.ts, purge-logs route,
// and the call-log rotation/cap test suite) — the implementation now lives in
// ./callLogRotation.ts (extracted to satisfy the file-size gate, #10125).
export {
  cleanupOrphanCallLogFiles,
  cleanupOverflowCallLogFiles,
  deleteCallLogsBefore,
  trimCallLogsToMaxRows,
  rotateCallLogs,
  scheduleCallLogRotation,
};

type JsonRecord = Record<string, unknown>;

const pendingCallLogSaves = new Set<Promise<void>>();
let callLogSavesClosing = false;

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
  provider_node_name?: string | null;
  provider_node_prefix?: string | null;
  resolved_account?: string | null;
  correlation_id?: string | null;
  model_pinned?: number | null;
  session_tag?: string | null;
};

const RESOLVED_ACCOUNT_SQL = "COALESCE(NULLIF(pc.name, ''), NULLIF(pc.email, ''), cl.account)";

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
    const { getProviderConnections } = await import("@/lib/db/providers");
    const connections = await getProviderConnections();
    const conn = connections.find((item) => item.id === connectionId);
    if (conn) {
      account = pickDisplayValue(
        [toStringOrNull(conn.name), toStringOrNull(conn.email)],
        true,
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
    const { getProviderNodeById } = await import("@/lib/db/providers");
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

export function applyNodePrefix(
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

// #6187: extract the assistant message from a chat-completion-shaped response
// body so we can inspect its reasoning_content / <think> content.
function extractAssistantMessage(responseBody: unknown): unknown {
  if (!responseBody || typeof responseBody !== "object") return responseBody;
  const choices = (responseBody as JsonRecord).choices;
  if (Array.isArray(choices) && choices.length > 0) {
    const first = choices[0] as JsonRecord;
    return first?.message ?? first?.delta ?? first;
  }
  return responseBody;
}

// #6187: decide the reasoning SOURCE and (char-only) count recorded alongside
// the usage-derived tokens_reasoning. Usage is authoritative when it reports
// non-zero reasoning tokens; otherwise we fall back to observed reasoning
// content so "reasoned but metered 0" stays distinguishable. reasoning_chars is
// a CHARACTER count, never a token count — it must not touch cost math.
function resolveReasoningObservation(
  usageReasoning: number | null,
  responseBody: unknown
): { source: string | null; chars: number | null } {
  if (usageReasoning != null && usageReasoning > 0) {
    return { source: "usage", chars: null };
  }
  const observed = getObservedReasoning(extractAssistantMessage(responseBody));
  if (observed.chars > 0) {
    return { source: observed.source, chars: observed.chars };
  }
  return { source: null, chars: null };
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
    console.error(
      "[callLogs] Failed to read legacy disk log:",
      sanitizeErrorMessage(error) || "Legacy call log read failed"
    );
  }

  return null;
}

export function resolveProviderDisplay(
  provider: string | null,
  nodeName: string | null,
  nodePrefix: string | null
): string | null {
  const rawProvider = toStringOrNull(provider);
  if (!rawProvider) return null;

  const name = toStringOrNull(nodeName)?.trim();
  if (name) return name;

  const prefix = toStringOrNull(nodePrefix)?.trim();
  if (prefix) return prefix;

  return null;
}

function mapSummaryRow(row: CallLogSummaryRow) {
  const detailState = normalizeDetailState(row.detail_state);
  const provider = row.provider;
  const nodeName = row.provider_node_name ?? null;
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
    providerDisplay: resolveProviderDisplay(provider, nodeName, nodePrefix),
    account: row.resolved_account || row.account,
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
    correlationId: row.correlation_id || null,
    modelPinned: toNumber(row.model_pinned) === 1,
    sessionTag: row.session_tag || null,
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

async function saveCallLogOperation(entry: any): Promise<void> {
  try {
    const apiKeyContext = getCallLogApiKeyContext();
    // `||` (not `??`): an empty-string apiKeyId/apiKeyName is "unattributed",
    // same as before this fallback existed — it must not be persisted verbatim
    // nor block the request-scoped context.
    const apiKeyId = entry.apiKeyId || apiKeyContext?.apiKeyId || null;
    const apiKeyName = entry.apiKeyName || apiKeyContext?.apiKeyName || null;
    const noLogEnabled = Boolean(entry.noLog) || (apiKeyId ? isNoLog(apiKeyId) : false);

    const protectedRequestBody = noLogEnabled ? null : protectPayloadForLog(entry.requestBody);
    const responseStatus = Number(entry.status);
    const failedResponse = Number.isFinite(responseStatus) && responseStatus >= 400;
    const protectedResponseBody = noLogEnabled
      ? null
      : failedResponse
        ? protectErrorPayloadForLog(entry.responseBody)
        : protectPayloadForLog(entry.responseBody);
    const protectedPipelinePayloads = noLogEnabled
      ? null
      : protectPipelinePayloads(
          entry.pipelinePayloads ?? entry.pipeline ?? null,
          failedResponse ? responseStatus : undefined
        );
    const protectedError = sanitizeErrorForLog(entry.error);

    const account = await resolveAccountName(entry.connectionId || null);
    const rawProvider: string = entry.provider || "-";
    const rawRequestedModel: string | null = entry.requestedModel || null;
    let resolvedRequestedModel = rawRequestedModel;
    if (rawRequestedModel && isCompatibleProviderId(rawProvider)) {
      const nodePrefix = await resolveProviderPrefix(rawProvider);
      resolvedRequestedModel = applyNodePrefix(rawRequestedModel, rawProvider, nodePrefix);
    }
    // #6187: usage-derived reasoning tokens stay UNCHANGED (cost math reads this),
    // while reasoning source/char-count are recorded separately for observability.
    const tokensReasoning = getReasoningTokensOrNull(entry.tokens);
    const reasoningObservation = resolveReasoningObservation(tokensReasoning, entry.responseBody);
    const errorType = classifyCallLogError(entry.status, entry.error, entry.provider);
    const logEntry = {
      id: typeof entry.id === "string" && entry.id.length > 0 ? entry.id : generateLogId(),
      timestamp: typeof entry.timestamp === "string" ? entry.timestamp : new Date().toISOString(),
      method: entry.method || "POST",
      path: entry.path || "/v1/chat/completions",
      status: entry.status || 0,
      errorType,
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
      tokensReasoning,
      reasoningSource: reasoningObservation.source,
      reasoningChars: reasoningObservation.chars,
      tokensCompressed: entry.tokensCompressed != null ? toNumber(entry.tokensCompressed) : null,
      cacheSource: entry.cacheSource === "semantic" ? "semantic" : "upstream",
      requestType: entry.requestType || null,
      sourceFormat: entry.sourceFormat || null,
      targetFormat: entry.targetFormat || null,
      apiKeyId,
      apiKeyName,
      comboName: entry.comboName || null,
      comboStepId: toStringOrNull(entry.comboStepId),
      comboExecutionKey:
        toStringOrNull(entry.comboExecutionKey) || toStringOrNull(entry.comboStepId),
      correlationId: entry.correlationId || null,
      modelPinned: entry.modelPinned ? 1 : 0,
      sessionTag: entry.sessionTag || null,
      // OpenAI Responses API response id, when this attempt produced one --
      // indexed so a later request's `previous_response_id` can resolve
      // this row's artifact for OmniRoute-native continuation. See
      // src/lib/db/responsesContinuationStore.ts.
      responseId: typeof entry.responseId === "string" ? entry.responseId : null,
      // #12150 P2 surface 2: 1 when this request's persisted client snapshot had
      // its video transcript cues structurally redacted, so
      // resolvePreviousResponseState refuses to rehydrate it as continuation
      // history. See src/lib/db/responsesContinuationStore.ts.
      videoContentRemoved: entry.videoContentRemoved ? 1 : 0,
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
      const artifactResult = await writeCallArtifactAsync(artifact);
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
        reasoning_source, reasoning_chars,
        cache_source, request_type, source_format, target_format, api_key_id, api_key_name,
        combo_name, combo_step_id, combo_execution_key, error_summary, detail_state,
        artifact_relpath, artifact_size_bytes, artifact_sha256,
        has_request_body, has_response_body, has_pipeline_details, request_summary,
        correlation_id, model_pinned, session_tag, response_id, error_type,
        video_content_removed
      )
      VALUES (
        @id, @timestamp, @method, @path, @status, @model, @requestedModel, @provider,
        @account, @connectionId, @duration, @tokensIn, @tokensOut,
        @tokensCacheRead, @tokensCacheCreation, @tokensReasoning, @tokensCompressed,
        @reasoningSource, @reasoningChars,
        @cacheSource, @requestType, @sourceFormat, @targetFormat, @apiKeyId, @apiKeyName,
        @comboName, @comboStepId, @comboExecutionKey, @errorSummary, @detailState,
        @artifactRelPath, @artifactSizeBytes, @artifactSha256,
        @hasRequestBody, @hasResponseBody, @hasPipelineDetails, @requestSummary,
        @correlationId, @modelPinned, @sessionTag, @responseId, @errorType,
        @videoContentRemoved
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

    scheduleCallLogRotation();
  } catch (error) {
    console.error(
      "[callLogs] Failed to save call log:",
      sanitizeErrorMessage(error) || "Call log persistence failed"
    );
  }
}

export function saveCallLog(entry: any): Promise<void> {
  if (!shouldPersistToDisk || callLogSavesClosing) return Promise.resolve();

  const operation = saveCallLogOperation(entry);
  pendingCallLogSaves.add(operation);
  void operation.then(
    () => pendingCallLogSaves.delete(operation),
    () => pendingCallLogSaves.delete(operation)
  );
  return operation;
}

export async function waitForCallLogSaves(timeoutMs: number): Promise<boolean> {
  const deadline = Date.now() + Math.max(0, timeoutMs);
  while (pendingCallLogSaves.size > 0) {
    const remainingMs = deadline - Date.now();
    if (remainingMs <= 0) return false;

    let timeout: NodeJS.Timeout | undefined;
    const settled = await Promise.race([
      Promise.allSettled([...pendingCallLogSaves]).then(() => true),
      new Promise<false>((resolve) => {
        timeout = setTimeout(() => resolve(false), remainingMs);
        timeout.unref?.();
      }),
    ]);
    if (timeout) clearTimeout(timeout);
    if (!settled) return false;
  }
  return true;
}

export async function closeCallLogSaves(timeoutMs = 2_000): Promise<void> {
  callLogSavesClosing = true;
  const drained = await waitForCallLogSaves(timeoutMs);
  if (!drained) {
    await closeCallLogArtifactWriter(0);
  }

  // The admission gate above makes this a stable snapshot. After a forced worker
  // close, queued artifact promises have resolved fail-open and their SQLite
  // continuations can finish before the database is closed.
  await Promise.allSettled([...pendingCallLogSaves]);
  await closeCallLogArtifactWriter(0);
}

if (shouldPersistToDisk && process.env.NODE_ENV !== "test") {
  scheduleCallLogRotation();
}

/**
 * Pushes a `column LIKE %value%` condition (mirrors the correlationId/sessionTag substring-match
 * precedent). Extracted so getCallLogs stays under the max-lines-per-function ratchet — #8249.
 */
function pushLikeFilter(
  conditions: string[],
  params: Record<string, unknown>,
  column: string,
  paramKey: string,
  value: unknown
) {
  if (!value) return;
  conditions.push(`cl.${column} LIKE @${paramKey}`);
  params[paramKey] = `%${value}%`;
}

export async function getCallLogs(filter: any = {}) {
  const db = getDbInstance();
  let sql = `
    SELECT cl.*,
      pn.name AS provider_node_name, pn.prefix AS provider_node_prefix,
      ${RESOLVED_ACCOUNT_SQL} AS resolved_account
    FROM call_logs cl
    LEFT JOIN provider_nodes pn ON pn.id = cl.provider
    LEFT JOIN provider_connections pc ON pc.id = cl.connection_id
  `;
  const conditions: string[] = [];
  const params: Record<string, unknown> = {};

  if (filter.status) {
    if (filter.status === "error") {
      conditions.push("(cl.status >= 400 OR cl.error_summary IS NOT NULL)");
    } else if (filter.status === "ok") {
      conditions.push("cl.status >= 200 AND cl.status < 300");
    } else {
      const statusCode = Number.parseInt(filter.status, 10);
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
    conditions.push(`(cl.account LIKE @accountQ OR ${RESOLVED_ACCOUNT_SQL} LIKE @accountQ)`);
    params.accountQ = `%${filter.account}%`;
  }
  if (filter.apiKey) {
    conditions.push("(cl.api_key_name LIKE @apiKeyQ OR cl.api_key_id LIKE @apiKeyQ)");
    params.apiKeyQ = `%${filter.apiKey}%`;
  }
  pushLikeFilter(conditions, params, "correlation_id", "correlationId", filter.correlationId);
  pushLikeFilter(conditions, params, "session_tag", "sessionTag", filter.sessionTag);
  if (filter.combo) {
    conditions.push("cl.combo_name IS NOT NULL");
  }
  if (filter.excludeTests) {
    // Home "Recent Requests" is an allowlist of real provider inference, not a
    // blacklist of known backend log types. Persisted provider requests enter via
    // the public gateway namespaces (/v1/* or /api/v1/*); internal management work
    // (connection tests, model sync, and future /api/providers/* jobs) does not.
    // Apply this before LIMIT so backend rows can never displace real traffic.
    conditions.push(`(cl.path LIKE '/v1/%' OR cl.path LIKE '/api/v1/%')`);
  }
  if (filter.since) {
    conditions.push("cl.timestamp >= @since");
    params.since = filter.since instanceof Date ? filter.since.toISOString() : String(filter.since);
  }
  if (filter.until) {
    conditions.push("cl.timestamp <= @until");
    params.until = filter.until instanceof Date ? filter.until.toISOString() : String(filter.until);
  }
  if (filter.search) {
    conditions.push(`(
      cl.model LIKE @searchQ OR cl.path LIKE @searchQ OR cl.account LIKE @searchQ OR
      ${RESOLVED_ACCOUNT_SQL} LIKE @searchQ OR
      cl.requested_model LIKE @searchQ OR cl.provider LIKE @searchQ OR
      cl.api_key_name LIKE @searchQ OR cl.api_key_id LIKE @searchQ OR
      cl.combo_name LIKE @searchQ OR CAST(cl.status AS TEXT) LIKE @searchQ
      OR cl.combo_step_id LIKE @searchQ OR cl.combo_execution_key LIKE @searchQ
      OR cl.error_summary LIKE @searchQ
      OR cl.correlation_id LIKE @searchQ
    )`);
    params.searchQ = `%${filter.search}%`;
  }

  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  const limit = Number.isInteger(filter.limit) && filter.limit > 0 ? filter.limit : 200;
  const offset = Number.isInteger(filter.offset) && filter.offset > 0 ? filter.offset : 0;
  sql += ` ORDER BY cl.timestamp DESC LIMIT @__limit OFFSET @__offset`;
  params.__limit = limit;
  params.__offset = offset;

  const rows = db.prepare(sql).all(params) as CallLogSummaryRow[];
  return rows.map(mapSummaryRow);
}

export async function getCallLogById(id: string) {
  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT cl.*,
        pn.name AS provider_node_name,
        pn.prefix AS provider_node_prefix,
        ${RESOLVED_ACCOUNT_SQL} AS resolved_account
       FROM call_logs cl
       LEFT JOIN provider_nodes pn ON pn.id = cl.provider
       LEFT JOIN provider_connections pc ON pc.id = cl.connection_id
       WHERE cl.id = ?`
    )
    .get(id) as CallLogSummaryRow | undefined;
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
        active: false,
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
        active: false,
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
      active: false,
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
    active: false,
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
