import { buildErrorBody } from "../../utils/error.ts";

type ActiveTurn = {
  startedAt: number;
  retryCount: number;
};

export type TurnExecutionAcquireResult =
  | { acquired: true; release: () => void }
  | { acquired: false; retryCount: number; ageMs: number; release: () => void };

export const TURN_IN_PROGRESS_MESSAGE = "An identical request is already in progress";

export function createTurnInProgressResult(retryCount: number) {
  const body = buildErrorBody(409, TURN_IN_PROGRESS_MESSAGE, undefined, {
    type: "turn_in_progress",
    code: "turn_in_progress",
  });
  return {
    body,
    result: {
      success: false as const,
      status: 409,
      error: TURN_IN_PROGRESS_MESSAGE,
      errorType: "turn_in_progress",
      errorCode: "turn_in_progress",
      response: new Response(JSON.stringify(body), {
        status: 409,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "1",
          "X-OmniRoute-Turn-Retry": String(retryCount),
        },
      }),
    },
  };
}

const activeTurns = new Map<string, ActiveTurn>();

/**
 * Ensures a client retry carrying the same effective idempotency key cannot
 * open another upstream execution while the original turn is still streaming.
 */
export function acquireTurnExecution(key: string | null): TurnExecutionAcquireResult {
  if (!key) return { acquired: true, release: () => {} };

  const existing = activeTurns.get(key);
  if (existing) {
    existing.retryCount += 1;
    return {
      acquired: false,
      retryCount: existing.retryCount,
      ageMs: Math.max(0, Date.now() - existing.startedAt),
      release: () => {},
    };
  }

  const entry: ActiveTurn = { startedAt: Date.now(), retryCount: 0 };
  activeTurns.set(key, entry);
  let released = false;
  return {
    acquired: true,
    release: () => {
      if (released) return;
      released = true;
      if (activeTurns.get(key) === entry) activeTurns.delete(key);
    },
  };
}

export function getTurnExecutionSnapshot(key: string) {
  const active = activeTurns.get(key);
  if (!active) return null;
  return { retryCount: active.retryCount, ageMs: Math.max(0, Date.now() - active.startedAt) };
}

export function clearTurnExecutionsForTesting(): void {
  activeTurns.clear();
}
