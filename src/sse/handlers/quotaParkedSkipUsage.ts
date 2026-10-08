/**
 * #14360: when quota parking skips a provider (every connection is parked /
 * rate-limited), `handleNoCredentials` synthesizes a 429/503 without ever
 * reaching an upstream — so the normal failure path never writes a call_logs
 * row and the refusal only exists in the client's terminal.
 *
 * This leaf records that synthesized response (and the pipeline-gate rejection)
 * through
 * `recordRejectedRequestUsage` with one shared attribution (api key, endpoint,
 * conversation, start time — `chatRejectionAttribution`), so the
 * `usage_history` row (success:false) is counted against the right key.
 *
 * Combo targets are NOT recorded here: a combo calls handleSingleModel once per
 * target, and the combo-exhausted path in `chat.ts` already writes one row for
 * the whole request — recording each parked target too would duplicate it.
 */
import * as log from "../utils/logger";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import type { RejectedRequestUsageInput } from "./rejectedRequestUsage";

/** The request-scoped values of handleSingleModelChat that attribute a rejection. */
export interface ChatRejectionScope {
  body?: { model?: string } | null;
  modelStr?: string | null;
  clientRawRequest?: { endpoint?: string | null } | null;
  apiKeyInfo?: { id?: string | null; name?: string | null } | null;
  runtimeOptions?: {
    comboStepId?: string | null;
    comboExecutionKey?: string | null;
    correlationId?: string | null;
    conversationId?: string | null;
  } | null;
  telemetry?: { startTime?: number } | null;
  comboName?: string | null;
  isCombo?: boolean;
}

export interface QuotaParkedSkip {
  credentials: unknown;
  lastError: string | null;
  lastStatus: number | null;
  provider: string;
  model: string;
}

/** Attribution fields shared by every pre-dispatch rejection recorded from chat.ts. */
export function chatRejectionAttribution(scope: ChatRejectionScope) {
  const opts = scope.runtimeOptions ?? null;
  const isCombo = scope.isCombo === true;
  return {
    requestedModel: scope.body?.model || scope.modelStr || undefined,
    endpoint: scope.clientRawRequest?.endpoint,
    comboName: isCombo ? (scope.comboName ?? null) : null,
    comboStepId: isCombo ? (opts?.comboStepId ?? null) : null,
    comboExecutionKey: isCombo ? (opts?.comboExecutionKey ?? null) : null,
    apiKeyId: scope.apiKeyInfo?.id ?? null,
    apiKeyName: scope.apiKeyInfo?.name ?? null,
    correlationId: opts?.correlationId ?? null,
    sessionTag: opts?.conversationId ?? null,
    startTime: scope.telemetry?.startTime,
  };
}

async function recordSafely(input: RejectedRequestUsageInput, what: string): Promise<void> {
  try {
    // Lazy, as chat.ts always loaded it: keeps usageDb off chat.ts's static import graph.
    const { recordRejectedRequestUsage } = await import("./rejectedRequestUsage");
    await recordRejectedRequestUsage(input);
  } catch (err) {
    log.debug("CHAT", `[${input.provider}/${input.model}] ${what} log failed`, {
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

/**
 * Pipeline-gate rejection (provider circuit breaker OPEN / model cooldown):
 * visible in /dashboard/logs AND counted per api key in usage_history
 * (success:false) — otherwise a key whose traffic is entirely gate-rejected
 * shows "zero requests" (support-mesh 2026-07-08).
 */
export async function recordGateRejection(
  status: number,
  provider: string,
  model: string,
  scope: ChatRejectionScope
): Promise<void> {
  await recordSafely(
    {
      status,
      model,
      provider,
      error: `[${status}] Pipeline gate rejected`,
      ...chatRejectionAttribution(scope),
    },
    "gate rejection"
  );
}

type ParkedCredentials = {
  allRateLimited?: unknown;
  lastError?: unknown;
  lastErrorCode?: unknown;
  cooldownScope?: unknown;
};

/**
 * The status `handleNoCredentials` returns through `unavailableResponse` for a
 * quota-parked provider, or null when it takes another branch (no parked
 * credentials, or the model-scoped cooldown response, which is its own path).
 */
export function quotaParkedSkipStatus(credentials: unknown, lastStatus: number | null) {
  const creds = credentials as ParkedCredentials | null;
  if (!creds || !creds.allRateLimited) return null;
  const status = Number(
    lastStatus || Number(creds.lastErrorCode) || HTTP_STATUS.SERVICE_UNAVAILABLE
  );
  if (creds.cooldownScope === "model" && status === HTTP_STATUS.RATE_LIMITED) return null;
  return status;
}

export async function recordQuotaParkedSkip(
  skip: QuotaParkedSkip,
  scope: ChatRejectionScope
): Promise<void> {
  if (scope.isCombo) return;
  const status = quotaParkedSkipStatus(skip.credentials, skip.lastStatus);
  if (status === null) return;
  const creds = skip.credentials as ParkedCredentials;
  const errorMsg =
    skip.lastError || (typeof creds.lastError === "string" && creds.lastError) || "Unavailable";
  await recordSafely(
    {
      status,
      model: skip.model,
      provider: skip.provider,
      error: `[${skip.provider}/${skip.model}] ${errorMsg}`,
      ...chatRejectionAttribution(scope),
    },
    "quota-parked skip"
  );
}
