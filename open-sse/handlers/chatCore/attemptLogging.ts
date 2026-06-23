/**
 * chatCore per-attempt logging persistence (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore: persists one attempt's call log. Emits a provider.warning audit
 * event when the provider response carries warnings, fills the detailed pipeline payloads (when
 * detailed logging is on), and writes the bounded/truncated call-log row (request/response bodies
 * with the Claude prompt-cache meta attached). Best-effort: the saveCallLog write swallows its own
 * errors. The per-request context (provider/model/ids/combo/etc.) is threaded via `ctx` so the 16
 * call sites in the handler stay byte-identical; behaviour is unchanged.
 */

import { extractProviderWarnings } from "@/lib/compliance/providerAudit";
import { logAuditEvent } from "@/lib/compliance";
import { saveCallLog } from "@/lib/usageDb";
import { cloneBoundedChatLogPayload, truncateForLog } from "./logTruncation.ts";
import { attachLogMeta } from "./cacheUsageMeta.ts";

export type PersistAttemptLogsArgs = {
  status: number;
  tokens?: unknown;
  responseBody?: unknown;
  error?: string | null;
  providerRequest?: unknown;
  providerResponse?: unknown;
  clientResponse?: unknown;
  claudeCacheMeta?: Record<string, unknown>;
  claudeCacheUsageMeta?: Record<string, unknown>;
  cacheSource?: "upstream" | "semantic";
};

export type PersistAttemptLogsContext = {
  provider: string | null | undefined;
  connectionId: string | null | undefined;
  model: string | null | undefined;
  skillRequestId: string;
  detailedLoggingEnabled: boolean;
  reqLogger:
    | { getPipelinePayloads?: () => Record<string, unknown> | undefined }
    | null
    | undefined;
  pendingRequestId: unknown;
  clientRawRequest: { endpoint?: string } | null | undefined;
  requestedModel: unknown;
  credentials: { connectionId?: string } | null | undefined;
  startTime: number;
  body: unknown;
  sourceFormat: unknown;
  targetFormat: unknown;
  comboName: unknown;
  comboStepId: unknown;
  comboExecutionKey: unknown;
  tokensCompressed: unknown;
  apiKeyInfo: { id?: string | null; name?: string | null } | null | undefined;
  noLogEnabled: unknown;
};

export function persistAttemptLogs(args: PersistAttemptLogsArgs, ctx: PersistAttemptLogsContext) {
  const {
    status,
    tokens,
    responseBody,
    error,
    providerRequest,
    providerResponse,
    clientResponse,
    claudeCacheMeta,
    claudeCacheUsageMeta,
    cacheSource,
  } = args;
  const {
    provider,
    connectionId,
    model,
    skillRequestId,
    detailedLoggingEnabled,
    reqLogger,
    pendingRequestId,
    clientRawRequest,
    requestedModel,
    credentials,
    startTime,
    body,
    sourceFormat,
    targetFormat,
    comboName,
    comboStepId,
    comboExecutionKey,
    tokensCompressed,
    apiKeyInfo,
    noLogEnabled,
  } = ctx;

  const providerWarnings = extractProviderWarnings(providerResponse, clientResponse, responseBody);
  if (providerWarnings.length > 0) {
    logAuditEvent({
      action: "provider.warning",
      actor: "system",
      target: [provider, connectionId].filter(Boolean).join(":") || provider || model,
      resourceType: "provider_warning",
      status: "warning",
      requestId: skillRequestId,
      details: {
        provider,
        model,
        connectionId,
        httpStatus: status,
        warnings: providerWarnings,
      },
    });
  }

  const pipelinePayloads = detailedLoggingEnabled
    ? (reqLogger?.getPipelinePayloads?.() ?? {})
    : null;

  if (pipelinePayloads) {
    if (providerRequest !== undefined && !pipelinePayloads.providerRequest) {
      pipelinePayloads.providerRequest = providerRequest as Record<string, unknown>;
    }
    if (providerResponse !== undefined && !pipelinePayloads.providerResponse) {
      pipelinePayloads.providerResponse = providerResponse as Record<string, unknown>;
    }
    if (clientResponse !== undefined) {
      pipelinePayloads.clientResponse = clientResponse as Record<string, unknown>;
    }
    if (error) {
      pipelinePayloads.error = {
        ...(typeof pipelinePayloads.error === "object" && pipelinePayloads.error
          ? (pipelinePayloads.error as Record<string, unknown>)
          : {}),
        message: error,
      };
    }
  }

  saveCallLog({
    id: pendingRequestId,
    method: "POST",
    path: clientRawRequest?.endpoint || "/v1/chat/completions",
    status,
    model,
    requestedModel,
    provider,
    connectionId: connectionId || credentials?.connectionId || undefined,
    duration: Date.now() - startTime,
    tokens: tokens || {},
    requestBody: cloneBoundedChatLogPayload(
      attachLogMeta(truncateForLog(body as Record<string, unknown>), {
        claudePromptCache: claudeCacheMeta,
      })
    ),
    responseBody: cloneBoundedChatLogPayload(
      attachLogMeta(truncateForLog(responseBody as Record<string, unknown>), {
        claudePromptCache: claudeCacheMeta
          ? {
              applied: claudeCacheMeta.applied,
              totalBreakpoints: claudeCacheMeta.totalBreakpoints,
              anthropicBeta: claudeCacheMeta.anthropicBeta,
            }
          : null,
        claudePromptCacheUsage: claudeCacheUsageMeta,
      })
    ),
    error: error || null,
    sourceFormat,
    targetFormat,
    comboName,
    comboStepId,
    comboExecutionKey,
    tokensCompressed,
    cacheSource: cacheSource === "semantic" ? "semantic" : "upstream",
    apiKeyId: apiKeyInfo?.id || null,
    apiKeyName: apiKeyInfo?.name || null,
    noLog: noLogEnabled,
    pipelinePayloads,
  }).catch(() => {});
}
