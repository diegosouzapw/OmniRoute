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
import { emit } from "@/lib/events/eventBus";
import type { RequestCompletedPayload, RequestFailedPayload } from "@/lib/events/types";
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
  /** Per-attempt trace id — MUST match the id emitted in `request.started` so the live
   * dashboard can pair the terminal event and clear the topology node's active pulse. */
  traceId: string;
  provider: string | null | undefined;
  connectionId: string | null | undefined;
  model: string | null | undefined;
  skillRequestId: string;
  detailedLoggingEnabled: boolean;
  reqLogger: { getPipelinePayloads?: () => Record<string, unknown> | undefined } | null | undefined;
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
  correlationId?: string | null;
  modelPinned?: boolean;
};

function toConnectionId(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function buildAccountRotationMeta(
  provider: string | null | undefined,
  initialConnectionId: string | null,
  finalConnectionId: string | null
) {
  if (provider !== "codex" || !initialConnectionId || !finalConnectionId) return null;
  if (initialConnectionId === finalConnectionId) return null;

  return {
    codexAccountRotation: {
      initialConnectionId,
      finalConnectionId,
    },
  };
}

/**
 * Pure resolver for the terminal request-lifecycle dashboard event. Extracted so the
 * "stuck green" latch fix (emitting request.completed/failed to clear the live topology
 * node) is unit-testable without the DB write in persistAttemptLogs. A 2xx/3xx status
 * with no error is a completion; everything else (including a missing/odd status) is a
 * failure. `id` mirrors the `traceId` used by the paired `request.started`.
 */
export function resolveRequestLifecycleEvent(input: {
  traceId: string;
  status: number;
  error?: string | null;
  model?: string | null;
  provider?: string | null;
  comboName?: unknown;
  tokens?: unknown;
  latencyMs: number;
}):
  | { name: "request.completed"; payload: RequestCompletedPayload }
  | { name: "request.failed"; payload: RequestFailedPayload } {
  const { traceId, status, error, model, provider, comboName, tokens, latencyMs } = input;
  const succeeded = typeof status === "number" && status >= 200 && status < 400 && !error;
  const resolvedComboName = typeof comboName === "string" && comboName ? comboName : undefined;
  if (succeeded) {
    const tokenBag = (tokens && typeof tokens === "object" ? tokens : {}) as Record<
      string,
      unknown
    >;
    const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : 0);
    return {
      name: "request.completed",
      payload: {
        id: traceId,
        status: "success",
        model: model || "unknown",
        provider: provider || "unknown",
        tokensInput: num(tokenBag.input ?? tokenBag.prompt_tokens ?? tokenBag.inputTokens),
        tokensOutput: num(tokenBag.output ?? tokenBag.completion_tokens ?? tokenBag.outputTokens),
        latencyMs,
        comboName: resolvedComboName,
      },
    };
  }
  return {
    name: "request.failed",
    payload: {
      id: traceId,
      error: error || `HTTP ${status}`,
      statusCode: typeof status === "number" ? status : undefined,
      latencyMs,
      model: model || undefined,
      provider: provider || undefined,
    },
  };
}

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
    traceId,
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
    correlationId,
    modelPinned,
  } = ctx;
  const initialConnectionId = toConnectionId(connectionId);
  const finalConnectionId = toConnectionId(credentials?.connectionId) || initialConnectionId;
  const accountRotationMeta = buildAccountRotationMeta(
    provider,
    initialConnectionId,
    finalConnectionId
  );

  const providerWarnings = extractProviderWarnings(providerResponse, clientResponse, responseBody);
  if (providerWarnings.length > 0) {
    logAuditEvent({
      action: "provider.warning",
      actor: "system",
      target: [provider, finalConnectionId].filter(Boolean).join(":") || provider || model,
      resourceType: "provider_warning",
      status: "warning",
      requestId: skillRequestId,
      details: {
        provider,
        model,
        connectionId: finalConnectionId,
        httpStatus: status,
        warnings: providerWarnings,
      },
    });
  }

  const capturedPipeline = reqLogger?.getPipelinePayloads?.() ?? null;
  const pipelinePayloads = detailedLoggingEnabled
    ? (capturedPipeline ?? {})
    : capturedPipeline?.routeDecision
      ? { routeDecision: capturedPipeline.routeDecision }
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
    connectionId: finalConnectionId || undefined,
    duration: Date.now() - startTime,
    tokens: tokens || {},
    requestBody: cloneBoundedChatLogPayload(
      attachLogMeta(truncateForLog(body as Record<string, unknown>), {
        ...accountRotationMeta,
        claudePromptCache: claudeCacheMeta,
      })
    ),
    responseBody: cloneBoundedChatLogPayload(
      attachLogMeta(truncateForLog(responseBody as Record<string, unknown>), {
        ...accountRotationMeta,
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
    correlationId,
    modelPinned: modelPinned || false,
  }).catch(() => {});

  // Emit the terminal request-lifecycle event to the live dashboard bus. `request.started`
  // is emitted in chatCore with this same `traceId`; without a matching completed/failed the
  // client's active-request map never drains, so the topology node stays green forever (the
  // "stuck green" latch — request.completed/failed were declared + consumed but never emitted).
  // Deferred via setImmediate to keep it off the response hot path, mirroring request.started.
  setImmediate(() => {
    const lifecycle = resolveRequestLifecycleEvent({
      traceId,
      status,
      error,
      model,
      provider,
      comboName,
      tokens,
      latencyMs: Date.now() - startTime,
    });
    if (lifecycle.name === "request.completed") {
      emit("request.completed", lifecycle.payload);
    } else {
      emit("request.failed", lifecycle.payload);
    }
  });
}
