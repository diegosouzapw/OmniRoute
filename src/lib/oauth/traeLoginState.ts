/**
 * One-time login states for the Trae browser flow. The dashboard asks for a state
 * before opening Trae's authorization page and Trae echoes it back on the loopback
 * callback, which is only honoured for a state issued here and not used yet.
 *
 * Kept in memory on `globalThis`, like the other short-lived OAuth state: a pending
 * login does not need to survive a restart.
 */
import { randomUUID } from "node:crypto";

const STATE_TTL_MS = 15 * 60 * 1000;
const MAX_PENDING_STATES = 100;
const STORE_KEY = "__traeLoginStates";

function store(): Map<string, number> {
  const g = globalThis as unknown as { [STORE_KEY]?: Map<string, number> };
  if (!g[STORE_KEY]) g[STORE_KEY] = new Map<string, number>();
  return g[STORE_KEY]!;
}

function prune(): void {
  const now = Date.now();
  const states = store();
  for (const [state, expiresAt] of states) {
    if (expiresAt <= now) states.delete(state);
  }
  while (states.size >= MAX_PENDING_STATES) {
    const oldest = states.keys().next().value;
    if (oldest === undefined) break;
    states.delete(oldest);
  }
}

export function createTraeLoginState(): string {
  prune();
  const state = randomUUID();
  store().set(state, Date.now() + STATE_TTL_MS);
  return state;
}

/** True exactly once for a state that was issued and has not expired. */
export function consumeTraeLoginState(state: string | null | undefined): boolean {
  if (!state) return false;
  const states = store();
  const expiresAt = states.get(state);
  if (expiresAt === undefined) return false;
  states.delete(state);
  return expiresAt > Date.now();
}
