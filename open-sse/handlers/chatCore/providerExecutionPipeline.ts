import type { ChatCoreErrorResult, ProviderLegUsage } from "@/lib/skills/toolLoopTypes.ts";
import type { getProviderCredentials } from "@/sse/services/auth.ts";
import type { updateFromHeaders, updateFromResponseBody } from "../../services/rateLimitManager.ts";
import type { writeTerminalStatus } from "@/shared/utils/terminalStatus.ts";
import type { updateProviderConnection } from "@/lib/db/providers.ts";
import type {
  lockModel,
  recordCoreOwnedAntigravityQuotaState,
} from "../../services/accountFallback.ts";
import { createErrorResult } from "../../utils/error.ts";
import { applyStatusRestatement } from "../../config/upstreamStatusRestatement.ts";
import { recoverAnthropicThinkingSignature } from "./thinkingSignatureRecovery.ts";
import {
  isModelUnavailableError,
  getNextFamilyFallback as defaultGetNextFamilyFallback,
} from "../../services/modelFamilyFallback.ts";
import { COOLDOWN_MS } from "../../config/errorConfig.ts";
import { normalizeHeaders } from "../../utils/headers.ts";

export interface ChatCoreExecutorResult {
  response: Response;
  url: string;
  headers: Record<string, string>;
  transformedBody: unknown;
  transport?: string;
  _executionCredentials?: Record<string, unknown>;
  _accountSemaphoreRelease?: () => void;
}

export interface ProviderExecutionPolicy {
  allowAccountRotation: boolean;
  allowModelFallback: boolean;
  expectedConnectionId?: string;
}

export type ProviderExecutionOutcome =
  | {
      kind: "response";
      response: Response;
      url: string;
      headers: Record<string, string>;
      transformedBody: unknown;
      model: string;
      connectionId: string;
    }
  | {
      kind: "error";
      result: ChatCoreErrorResult;
      providerUsage: ProviderLegUsage | null;
      model: string;
      connectionId: string;
    };

export interface PipelineTargetContext {
  provider: string;
  requestedModel: string;
  sourceFormat: string;
  targetFormat: string;
  stream: boolean;
}

export interface PipelineConnectionContext {
  initialConnectionId: string;
  getCurrentConnectionId: () => string | undefined;
  getCredentials: () => Record<string, unknown>;
  replaceCredentials: (next: Record<string, unknown>) => void;
  onCredentialsRefreshed: (next: Record<string, unknown>) => void | Promise<void>;
  assertManagedLeaseFence: (connectionId: string) => void;
  getProviderCredentials: typeof getProviderCredentials;
  refreshCredentials?: (
    credentials: Record<string, unknown>
  ) => Promise<Record<string, unknown> | null>;
}

export interface PipelineWireState {
  body: Record<string, unknown>;
  currentModel: string;
  triedModels: Set<string>;
  setBodyAndModel: (body: Record<string, unknown>, model: string) => void;
}

export interface PipelineStateHooks {
  updatePendingStage: (stage: string, data?: Record<string, unknown>) => void;
  recordRateLimitHeaders: typeof updateFromHeaders;
  recordRateLimitBody: typeof updateFromResponseBody;
  writeTerminalStatus: typeof writeTerminalStatus;
  persistConnectionPatch: typeof updateProviderConnection;
  setConnectionRateLimitedUntil: (
    connectionId: string,
    untilMs: number | null
  ) => void | Promise<void>;
  lockModel: typeof lockModel;
  recordAntigravityQuotaState: typeof recordCoreOwnedAntigravityQuotaState;
  markAccountSemaphoreBlocked: (connectionId: string) => void;
  isolateProbeFailures: () => boolean | Promise<boolean>;
  onCodexScopeRateLimited?: (params: {
    failedConnectionId: string;
    model: string | null;
    rateLimitedUntil: string;
    credentials?: Record<string, unknown> | null;
  }) => void | Promise<void>;
  onClearSessionAffinity?: (params: { failedConnectionId: string }) => void | Promise<void>;
  onAuditAccountRotation?: (params: {
    action: "codex.account_rotation";
    failedConnectionId: string;
    newConnectionId: string;
    attempt: number;
    retryAfterMs: number | null;
  }) => void | Promise<void>;
}

export interface ProviderExecutionPipelineInput {
  policy: Readonly<ProviderExecutionPolicy>;
  target: PipelineTargetContext;
  connection: PipelineConnectionContext;
  wire: PipelineWireState;
  state: PipelineStateHooks;
  sendProviderAttempt: (model: string, allowDedup: boolean) => Promise<ChatCoreExecutorResult>;
  getNextFamilyFallback?: (
    currentModel: string,
    triedModels: Set<string>,
    providerHint?: string | null
  ) => string | null;
}

const LEASE_MISMATCH_STATUS = 409;
const LEASE_MISMATCH_CODE = "LEASE_CONNECTION_MISMATCH";

function currentConnectionId(connection: PipelineConnectionContext): string {
  return connection.getCurrentConnectionId() ?? connection.initialConnectionId;
}

function retryAfterMsFrom(attempt: ChatCoreExecutorResult): number | null {
  // attempt.headers is the outbound request bag (BaseExecutor finalHeaders).
  // Retry-After lives on the upstream Response — same source as the parent
  // chatCore rotate path. normalizeHeaders lower-cases keys, so "Retry-After"
  // is looked up as "retry-after"; it does not drop the field.
  const raw = normalizeHeaders(attempt.response?.headers)["retry-after"];
  if (raw == null || raw === "") return null;
  const parsed = Number.parseFloat(String(raw));
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return parsed * 1000;
}

/**
 * Feed the runtime rate limiter from a non-2xx upstream attempt.
 *
 * Order matters and mirrors the chatCore error path: headers FIRST (a 429 evicts
 * the cached limiter so the body can materialize a fresh one), body SECOND (the
 * body-embedded retry-after drains that fresh reservoir). Inverting them throws
 * the drain away.
 *
 * The body is read through `response.clone()` — never the original stream. This
 * is a shared streaming path, so consuming `attempt.response` here would silently
 * break passthrough and SSE; `toOutcome` below drains the same way.
 *
 * Both hooks are best-effort: rate-limit learning must never fail the request.
 */
async function recordUpstreamRateLimit(
  state: PipelineStateHooks,
  provider: string,
  connectionId: string,
  model: string,
  attempt: ChatCoreExecutorResult
): Promise<void> {
  if (!connectionId) return;
  const status = attempt.response.status;
  try {
    state.recordRateLimitHeaders(provider, connectionId, attempt.response.headers, status, model);
  } catch {
    // best-effort
  }
  try {
    const text = await attempt.response.clone().text();
    // parseRetryAfterFromBody JSON.parses a string and falls back to "unknown"
    // on non-JSON, so the raw text is the safest thing to hand over.
    if (text) state.recordRateLimitBody(provider, connectionId, text, status, model);
  } catch {
    // Body already consumed/unreadable — the header signal above still applied.
  }
}

function leaseMismatch(model: string, connectionId: string): ProviderExecutionOutcome {
  const result = createErrorResult(
    LEASE_MISMATCH_STATUS,
    "Managed lease connection mismatch",
    null,
    LEASE_MISMATCH_CODE,
    "lease_error"
  );
  return {
    kind: "error",
    result: {
      success: false,
      status: result.status,
      response: result.response,
      error: result.error,
      errorCode: LEASE_MISMATCH_CODE,
      errorType: "lease_error",
    },
    providerUsage: null,
    model,
    connectionId,
  };
}

async function toOutcome(
  attempt: ChatCoreExecutorResult,
  model: string,
  connectionId: string,
  provider: string
): Promise<ProviderExecutionOutcome> {
  const status = attempt.response.status;
  if (status >= 200 && status < 300) {
    return {
      kind: "response",
      response: attempt.response,
      url: attempt.url,
      headers: attempt.headers,
      transformedBody: attempt.transformedBody,
      model,
      connectionId,
    };
  }
  let message = attempt.response.statusText || "upstream error";
  let body: unknown = attempt.transformedBody;
  try {
    // clone() is the drain. sendProviderAttempt must not cancel() a streaming
    // non-2xx body before we get here (BYOP 422 / Codex 429 Retry-After).
    const text = await attempt.response.clone().text();
    try {
      body = JSON.parse(text);
      const err = (body as { error?: { message?: unknown } } | null)?.error;
      if (err && typeof err.message === "string" && err.message) message = err.message;
    } catch {
      // Non-JSON upstream body (plain-text 429, HTML error page). parseUpstreamError
      // — the pre-pipeline path this replaced — surfaces the raw text as the message;
      // collapsing it to statusText ("upstream error") hides what the provider said.
      // buildErrorBody()/sanitizeErrorMessage() still sanitize and truncate it before
      // it reaches any response body (Hard Rule #12).
      if (text.trim()) message = text;
    }
  } catch {
    // Body unreadable (already consumed) — keep statusText.
  }
  const restatement = applyStatusRestatement({
    provider,
    status,
    message,
    body,
    retryAfterMs: null,
  });
  const result = createErrorResult(restatement.status, message, restatement.retryAfterMs);
  return {
    kind: "error",
    result: {
      success: false,
      status: result.status,
      response: attempt.response,
      error: result.error,
      errorCode: result.errorCode,
      errorType: result.errorType,
      rawMessage: message,
      upstreamErrorBody: body,
      upstreamHeaders: attempt.response.headers,
    },
    providerUsage: null,
    model,
    connectionId,
  };
}

function assertLease(
  policy: Readonly<ProviderExecutionPolicy>,
  connection: PipelineConnectionContext,
  model: string
): ProviderExecutionOutcome | null {
  const expected = policy.expectedConnectionId;
  if (!expected) return null;
  const current = connection.getCurrentConnectionId();
  if (current && current !== expected) {
    return leaseMismatch(model, current);
  }
  return null;
}

function maxAttemptsFor(provider: string): number {
  return provider === "codex" ? 3 : 1;
}

/**
 * Shared first-send + provider recovery. Does not read a successful body.
 * Account/model retries live here; sendProviderAttempt is one wire send.
 */
export async function runProviderExecutionPipeline(
  input: ProviderExecutionPipelineInput
): Promise<ProviderExecutionOutcome> {
  const { policy, target, connection, wire, state, sendProviderAttempt } = input;
  const maxAttempts = maxAttemptsFor(target.provider);
  const excludedIds: string[] = [];
  let attempts = 0;
  let lastAttempt: ChatCoreExecutorResult | null = null;
  let antigravityByopRotationPending = false;
  let authRefreshPending = false;
  let authRefreshed = false;
  let modelFallbackPending = false;
  const resolveFamilyFallback = input.getNextFamilyFallback ?? defaultGetNextFamilyFallback;

  while (
    attempts < maxAttempts ||
    antigravityByopRotationPending ||
    authRefreshPending ||
    modelFallbackPending
  ) {
    antigravityByopRotationPending = false;
    authRefreshPending = false;
    modelFallbackPending = false;
    const before = assertLease(policy, connection, wire.currentModel);
    if (before) return before;

    const attempt = await sendProviderAttempt(wire.currentModel, attempts === 0);
    lastAttempt = attempt;

    const after = assertLease(policy, connection, wire.currentModel);
    if (after) return after;

    const status = attempt.response.status;
    if (status >= 200 && status < 300) {
      return toOutcome(
        attempt,
        wire.currentModel,
        currentConnectionId(connection),
        target.provider
      );
    }

    // Teach the runtime limiter BEFORE any recovery branch rotates or retries:
    // the 429 belongs to the connection that just took it. chatCore's own
    // updateFromHeaders/updateFromResponseBody pair only runs on the streaming
    // leg — the non-streaming leg returns this pipeline's error outcome straight
    // to the caller, so without this the reservoir was never drained (#12945).
    await recordUpstreamRateLimit(
      state,
      target.provider,
      currentConnectionId(connection),
      wire.currentModel,
      attempt
    );

    const isolateProbe = await state.isolateProbeFailures();
    const canRotateAccount = policy.allowAccountRotation && !isolateProbe;

    if (
      canRotateAccount &&
      target.provider === "codex" &&
      status === 429 &&
      attempts < maxAttempts - 1
    ) {
      const failedId = currentConnectionId(connection);
      const retryAfterMs = retryAfterMsFrom(attempt);
      if (failedId && !excludedIds.includes(failedId)) excludedIds.push(failedId);
      if (failedId) {
        await state.onCodexScopeRateLimited?.({
          failedConnectionId: failedId,
          model: wire.currentModel || target.requestedModel || null,
          rateLimitedUntil: new Date(Date.now() + (retryAfterMs || 60_000)).toISOString(),
          credentials: connection.getCredentials(),
        });
        await state.onClearSessionAffinity?.({ failedConnectionId: failedId });
      }
      const nextCreds = await connection
        .getProviderCredentials("codex", null, null, wire.currentModel, {
          excludeConnectionIds: [...excludedIds],
        })
        .catch(() => null);
      if (nextCreds && !nextCreds.allRateLimited && nextCreds.connectionId) {
        await state.onAuditAccountRotation?.({
          action: "codex.account_rotation",
          failedConnectionId: failedId,
          newConnectionId: String(nextCreds.connectionId),
          attempt: attempts + 1,
          retryAfterMs,
        });
        connection.replaceCredentials(nextCreds as Record<string, unknown>);
        attempts += 1;
        continue;
      }
    }

    if (canRotateAccount && target.provider === "antigravity" && status === 422) {
      // Same drain as toOutcome: clone the Response. A prior body.cancel()
      // makes this throw "Body has already been consumed" and skips rotate.
      const byopBody = await attempt.response
        .clone()
        .text()
        .catch(() => "");
      if (byopBody.includes("gcp_project_required")) {
        const failedId = currentConnectionId(connection);
        if (failedId && !excludedIds.includes(failedId)) excludedIds.push(failedId);
        if (failedId) {
          await state.setConnectionRateLimitedUntil(
            failedId,
            Date.now() + (COOLDOWN_MS.gcpProjectRequired ?? 24 * 60 * 60 * 1000)
          );
        }
        const nextCreds = await connection
          .getProviderCredentials("antigravity", null, null, wire.currentModel, {
            excludeConnectionIds: [...excludedIds],
          })
          .catch(() => null);
        if (nextCreds && !nextCreds.allRateLimited && nextCreds.connectionId) {
          connection.replaceCredentials(nextCreds as Record<string, unknown>);
          antigravityByopRotationPending = true;
          continue;
        }
      }
    }

    if (
      !authRefreshed &&
      (status === 401 || status === 403) &&
      typeof connection.refreshCredentials === "function"
    ) {
      const refreshed = await connection.refreshCredentials(connection.getCredentials());
      if (refreshed && (refreshed.accessToken || refreshed.copilotToken)) {
        connection.replaceCredentials({ ...connection.getCredentials(), ...refreshed });
        await connection.onCredentialsRefreshed(refreshed);
        authRefreshed = true;
        authRefreshPending = true;
        continue;
      }
    }

    {
      let signatureMessage = attempt.response.statusText || "upstream error";
      try {
        const parsed = JSON.parse(await attempt.response.clone().text()) as {
          error?: { message?: unknown };
        };
        if (typeof parsed?.error?.message === "string" && parsed.error.message) {
          signatureMessage = parsed.error.message;
        }
      } catch {
        // keep statusText
      }
      const signatureRecovery = await recoverAnthropicThinkingSignature({
        provider: target.provider,
        statusCode: status,
        message: signatureMessage,
        body: wire.body,
        execute: async (recoveryBody) => {
          if (recoveryBody && typeof recoveryBody === "object" && !Array.isArray(recoveryBody)) {
            wire.setBodyAndModel(recoveryBody as Record<string, unknown>, wire.currentModel);
          }
          return sendProviderAttempt(wire.currentModel, false);
        },
        parseError: async (response) => {
          let message = response.statusText || "upstream error";
          let responseBody: unknown = null;
          try {
            responseBody = JSON.parse(await response.clone().text());
            const err = (responseBody as { error?: { message?: unknown } } | null)?.error;
            if (typeof err?.message === "string" && err.message) message = err.message;
          } catch {
            // keep statusText
          }
          return {
            statusCode: response.status,
            message,
            retryAfterMs: null,
            responseBody,
          };
        },
      });
      if (
        signatureRecovery.attempted &&
        signatureRecovery.succeeded &&
        signatureRecovery.execution
      ) {
        lastAttempt = {
          response: signatureRecovery.execution.response,
          url: signatureRecovery.execution.url ?? attempt.url,
          headers:
            (signatureRecovery.execution.headers as Record<string, string>) ?? attempt.headers,
          transformedBody: signatureRecovery.execution.transformedBody ?? attempt.transformedBody,
        };
        return toOutcome(
          lastAttempt,
          wire.currentModel,
          currentConnectionId(connection),
          target.provider
        );
      }
    }

    if (policy.allowModelFallback) {
      let fallbackMessage = attempt.response.statusText || "upstream error";
      try {
        const parsed = JSON.parse(await attempt.response.clone().text()) as {
          error?: { message?: unknown };
        };
        if (typeof parsed?.error?.message === "string" && parsed.error.message) {
          fallbackMessage = parsed.error.message;
        }
      } catch {
        // keep statusText
      }
      if (isModelUnavailableError(status, fallbackMessage, target.provider)) {
        const nextModel = resolveFamilyFallback(
          wire.currentModel,
          wire.triedModels,
          target.provider
        );
        if (nextModel) {
          wire.setBodyAndModel({ ...wire.body, model: nextModel }, nextModel);
          modelFallbackPending = true;
          continue;
        }
      }
    }

    return toOutcome(attempt, wire.currentModel, currentConnectionId(connection), target.provider);
  }

  if (lastAttempt) {
    return toOutcome(
      lastAttempt,
      wire.currentModel,
      currentConnectionId(connection),
      target.provider
    );
  }
  return leaseMismatch(wire.currentModel, currentConnectionId(connection));
}
