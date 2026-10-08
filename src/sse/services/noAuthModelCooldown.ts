import { formatRetryAfter } from "@omniroute/open-sse/services/accountFallback.ts";
import { getOpencodeFreeTierSkipRemainingMs } from "@omniroute/open-sse/services/opencodeFreeTierSkip.ts";
import * as log from "../utils/logger";

interface ActiveModelLockout {
  reason: string;
  remainingMs: number;
}

/**
 * Selection outcome for a no-auth provider whose model is temporarily locked on
 * the shared synthetic connection.
 *
 * Real connections report the same situation as "all credentials cooling down
 * for this model" (`allRateLimited`, model scope), which the chat handler waits
 * out or answers with a 429 and a Retry-After. Returning null here instead made
 * a lock of a few seconds surface as a fatal 401 "No active credentials".
 */
export function buildNoAuthModelCooldown(
  provider: string,
  model: string,
  lockout: ActiveModelLockout,
  connectionId: string
) {
  return buildNoAuthCooldownEnvelope({
    provider,
    connectionId,
    remainingMs: lockout.remainingMs,
    cooldownScope: "model",
    cooldownModel: model,
    lastError: null,
    logDetail: `model ${model} locked (${lockout.reason})`,
  });
}

/**
 * Paused no-auth provider: the shared synthetic connection is temporarily out
 * while a provider-scoped refusal pause covers it. Returns the same retryable
 * envelope shape as the model lockout above (429 + Retry-After) scoped to the
 * connection — or null when no active pause covers the provider (including an
 * expired pause, whose entry the reader drops), so selection keeps hydrating.
 */
export function pauseCooldownIfPaused(
  provider: string,
  connectionId: string,
  model?: string | null
) {
  const remainingMs = getOpencodeFreeTierSkipRemainingMs(provider, Date.now(), model);
  if (remainingMs === null) return null;
  if (remainingMs <= 0) return null;
  return buildNoAuthPauseCooldown(provider, remainingMs, connectionId);
}

function buildNoAuthPauseCooldown(provider: string, remainingMs: number, connectionId: string) {
  return buildNoAuthCooldownEnvelope({
    provider,
    connectionId,
    remainingMs,
    cooldownScope: "connection",
    cooldownModel: null,
    lastError: "The shared no-auth connection is in a refusal pause",
    logDetail: "shared connection paused",
  });
}

function buildNoAuthCooldownEnvelope({
  provider,
  connectionId,
  remainingMs,
  cooldownScope,
  cooldownModel,
  lastError,
  logDetail,
}: {
  provider: string;
  connectionId: string;
  remainingMs: number;
  cooldownScope: string;
  cooldownModel: string | null;
  lastError: string | null;
  logDetail: string;
}) {
  const retryAfter = new Date(Date.now() + remainingMs).toISOString();
  const retryAfterHuman = formatRetryAfter(retryAfter);
  log.warn("AUTH", `${provider} | ${connectionId} ${logDetail}, ${retryAfterHuman}`);
  return {
    allRateLimited: true,
    retryAfter,
    retryAfterHuman,
    lastError,
    lastErrorCode: 429,
    cooldownScope,
    cooldownModel,
    connectionsCount: 1,
  };
}
