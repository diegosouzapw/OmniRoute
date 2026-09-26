/**
 * Attempt bookkeeping for agent session turns. Every combo, fallback or fusion attempt of one
 * client request reuses the same raw request body object, so it keys the request. Attempts are
 * numbered when their turn is resolved, in the order the attempts finish, before the save waits
 * on pricing, so a slow save of an older attempt cannot replace a newer turn.
 */
import { getDbInstance } from "@/lib/db/core";
import { discardAgentSessionMessageAttempt } from "@/lib/db/agentSessionMessages";

import { defaultLogger } from "../../utils/logger.ts";

type AttemptState = { requestKey: string; lastSeq: number };

const attemptsByRawBody = new WeakMap<object, AttemptState>();

export function startSessionTurnAttempt(
  rawBody: unknown
): { requestKey: string; attemptSeq: number } | null {
  if (!rawBody || typeof rawBody !== "object") return null;
  let state = attemptsByRawBody.get(rawBody);
  if (!state) {
    state = { requestKey: globalThis.crypto.randomUUID(), lastSeq: 0 };
    attemptsByRawBody.set(rawBody, state);
  }
  state.lastSeq += 1;
  return { requestKey: state.requestKey, attemptSeq: state.lastSeq };
}

/**
 * The client did not get the latest attempt's reply (a guardrail blocked it, the reply was
 * malformed, or a later attempt failed after the combo rejected it), so its turn is dropped.
 * A no-op when no turn was ever resolved for the request (capture off, first attempt failed).
 */
export function discardLatestSessionTurnAttempt(rawBody: unknown): void {
  if (!rawBody || typeof rawBody !== "object") return;
  const state = attemptsByRawBody.get(rawBody);
  if (!state) return;
  try {
    discardAgentSessionMessageAttempt(getDbInstance(), state.requestKey, state.lastSeq);
  } catch (error) {
    defaultLogger.debug("AGENT_SESSION", "session turn discard failed", {
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
