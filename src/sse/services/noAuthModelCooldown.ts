import { formatRetryAfter } from "@omniroute/open-sse/services/accountFallback.ts";
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
  const retryAfter = new Date(Date.now() + lockout.remainingMs).toISOString();
  const retryAfterHuman = formatRetryAfter(retryAfter);
  log.warn(
    "AUTH",
    `${provider} | ${connectionId} model ${model} locked (${lockout.reason}), ${retryAfterHuman}`
  );
  return {
    allRateLimited: true,
    retryAfter,
    retryAfterHuman,
    lastError: null,
    lastErrorCode: 429,
    cooldownScope: "model",
    cooldownModel: model,
    connectionsCount: 1,
  };
}
