import {
  evictSessionAccountAffinityForConnection,
  evictSessionAccountAffinityForConnectionAsync,
  getSessionAffinityStore,
} from "@/lib/db/sessionAccountAffinity";
import { isComboPerModelTimeoutAbort } from "@omniroute/open-sse/services/combo/comboAbortReasons.ts";
import * as log from "../utils/logger";

/** Request-path helper: keep the legacy SQLite eviction and its logging synchronous. */
export function evictSessionAffinityOnComboTimeoutAsync(
  params: ComboTimeoutAffinityEvictionParams
): boolean | Promise<boolean> {
  if (getSessionAffinityStore().driver === "sqlite")
    return evictSessionAffinityOnComboTimeout(params);
  return evictRedisSessionAffinityOnComboTimeout(params);
}

async function evictRedisSessionAffinityOnComboTimeout(
  params: ComboTimeoutAffinityEvictionParams
): Promise<boolean> {
  const { sessionKey, provider, connectionId, modelAbortSignal } = params;
  if (!sessionKey || !provider || !connectionId || !isComboPerModelTimeoutAbort(modelAbortSignal))
    return false;
  try {
    const evicted = await evictSessionAccountAffinityForConnectionAsync(
      sessionKey,
      provider,
      connectionId
    );
    if (evicted)
      log.warn("AUTH", `Session account affinity evicted after ${provider} combo target timeout`);
    return evicted;
  } catch {
    // Local persistence failures are best-effort too; preserve the dispatch result.
    log.warn("AUTH", "Session affinity timeout eviction failed");
    return false;
  }
}

/** Inputs the combo-timeout eviction needs from the dispatch site. */
export interface ComboTimeoutAffinityEvictionParams {
  sessionKey?: string | null;
  provider: string;
  connectionId?: string | null;
  /** Per-target abort signal handed down by the combo timeout runner. */
  modelAbortSignal?: AbortSignal | null;
}

/**
 * #6219 follow-up — evict the sticky pin when a COMBO per-model timeout abandons
 * the pinned account.
 *
 * The #6219 eviction only fires on the generic `markAccountUnavailable` →
 * `shouldFallback` path in chat.ts. A combo target timeout never reaches it: the
 * combo runner aborts the dispatch, the abort propagates out of
 * `executeChatWithBreaker` as a rejection, and `buildTargetTimeoutRunner`
 * swallows it behind the synthetic 524. Nothing marks the account unavailable
 * (correctly — a stall is not a quota/auth failure), so the pin survived its full
 * TTL and every following request in that session was handed straight back to the
 * stalled account.
 *
 * Only a genuine per-model timeout evicts. A client disconnect or a hedge
 * cancellation says nothing about the account's health and must leave the pin
 * intact. The eviction is connection-matched, so a pin pointing at a different
 * (healthy) account is never touched. Best-effort: never throws into the dispatch
 * path.
 *
 * @returns true when a pin was actually evicted.
 */
export function evictSessionAffinityOnComboTimeout(
  params: ComboTimeoutAffinityEvictionParams
): boolean {
  const { sessionKey, provider, connectionId, modelAbortSignal } = params;
  if (!sessionKey || !provider || !connectionId) return false;
  if (!isComboPerModelTimeoutAbort(modelAbortSignal)) return false;

  try {
    const evicted = evictSessionAccountAffinityForConnection(sessionKey, provider, connectionId);
    if (evicted) {
      const sessionLabel = `${sessionKey.slice(0, 18)}...`;
      log.warn(
        "AUTH",
        `session_key=${sessionLabel} pin on ${connectionId.slice(
          0,
          8
        )} evicted — ${provider} stalled past the combo target timeout`
      );
    }
    return evicted;
  } catch {
    // Best-effort: a failed eviction must never break the dispatch path.
    return false;
  }
}
