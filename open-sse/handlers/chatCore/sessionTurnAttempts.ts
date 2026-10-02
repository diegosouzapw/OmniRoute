/**
 * Attempt bookkeeping for agent session turns.
 *
 * - Every combo, fallback or fusion attempt of one client request reuses the same raw request
 *   body object, so it keys the request (`requestKey`).
 * - Each attempt is numbered when it is dispatched, i.e. when handleChatCore resolves its agent
 *   context, from one process-wide counter. A later-dispatched attempt always has a higher
 *   number, however the attempts finish, so a late reply of an older attempt never replaces a
 *   newer turn.
 * - Discarding drops only the discarding attempt's own turn.
 * - Fusion panel calls never touch turns (see fusionPanelContext).
 */
import { getDbInstance } from "@/lib/db/core";
import { discardAgentSessionMessageAttempt } from "@/lib/db/agentSessionMessages";

import { isFusionPanelCall } from "../../utils/fusionPanelContext.ts";
import { defaultLogger } from "../../utils/logger.ts";

let lastAttemptSeq = 0;
const attemptSeqByContext = new WeakMap<object, number>();
const requestKeyByRawBody = new WeakMap<object, string>();

const isObject = (value: unknown): value is object => Boolean(value) && typeof value === "object";

/** Numbers the attempt that owns `agentContext`; called once per handleChatCore dispatch. */
export function startSessionTurnAttempt(agentContext: unknown): void {
  if (isObject(agentContext)) attemptSeqByContext.set(agentContext, ++lastAttemptSeq);
}

export function sessionTurnAttemptSeq(agentContext: unknown): number | null {
  if (!isObject(agentContext)) return null;
  if (!attemptSeqByContext.has(agentContext)) startSessionTurnAttempt(agentContext);
  return attemptSeqByContext.get(agentContext) ?? null;
}

export function sessionTurnRequestKey(rawBody: unknown): string | null {
  if (!isObject(rawBody)) return null;
  let key = requestKeyByRawBody.get(rawBody);
  if (!key) {
    key = globalThis.crypto.randomUUID();
    requestKeyByRawBody.set(rawBody, key);
  }
  return key;
}

/**
 * The client did not get this attempt's reply (a guardrail blocked it, the reply was malformed,
 * the upstream failed, or the stream did not finish), so only this attempt's turn is dropped.
 * A no-op when no turn was resolved for the request or outside a turn-bearing attempt.
 */
export function discardSessionTurnAttempt(rawBody: unknown, agentContext: unknown): void {
  if (isFusionPanelCall() || !isObject(rawBody) || !isObject(agentContext)) return;
  const requestKey = requestKeyByRawBody.get(rawBody);
  const attemptSeq = attemptSeqByContext.get(agentContext);
  if (!requestKey || attemptSeq === undefined) return;
  try {
    discardAgentSessionMessageAttempt(getDbInstance(), requestKey, attemptSeq);
  } catch (error) {
    defaultLogger.debug("AGENT_SESSION", "session turn discard failed", {
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
