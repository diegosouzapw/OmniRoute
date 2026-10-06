import { COOLDOWN_MS } from "../config/errorConfig.ts";

/**
 * Per-connection streak of upstream per-request refusals (REQUEST_REJECTED —
 * today Anthropic's OAuth `403 "Request not allowed"`, #12859).
 *
 * A single refusal is a hiccup: the same token serves the next request. A run
 * of them is enforcement, and re-sending every request into it is the wrong
 * thing to do to an OAuth account. So the connection is excluded for a short,
 * growing cooldown after each refusal, and only a streak of *consecutive*
 * refusals escalates to the terminal `banned` state that used to fire on the
 * first one.
 *
 * What counts as one refusal: one cooldown *episode*. Responses that land while
 * the connection is already excluded were in flight before the cooldown was
 * written (parallel sessions, fan-out) — they are the same event, not new
 * evidence, and are ignored. A successful response on the connection clears
 * the streak (chatHelpers onRequestSuccess); the window below is only a
 * staleness bound so an ancient refusal can never be the first of a streak.
 *
 * State is in-memory on purpose. A restart forgets the streak, which errs on
 * the side of a few more cooldowns before escalation — never on the side of a
 * ban the operator has to undo by hand. The caller may re-seed one refusal
 * from the persisted row (`seedRequestRejectedStreak`) to bound a crash loop.
 */

/** A refusal older than this cannot start or continue a streak. */
export const REQUEST_REJECTED_WINDOW_MS = 24 * 60 * 60 * 1000;
/** Consecutive refusals at which the connection is written as `banned`. */
export const REQUEST_REJECTED_ESCALATION_THRESHOLD = 3;
/** Cooldown after the 1st and 2nd refusal of a streak; the 3rd escalates. */
export const REQUEST_REJECTED_COOLDOWNS_MS = [
  COOLDOWN_MS.requestRejected,
  COOLDOWN_MS.requestRejectedRepeat,
];

export interface RequestRejectedVerdict {
  /** 1-based position of this refusal in the current streak. */
  streak: number;
  /** How long to exclude the connection from selection; 0 when escalating. */
  cooldownMs: number;
  /** True when the streak reached the threshold — caller writes the terminal state. */
  escalate: boolean;
  /**
   * False when the refusal landed while the connection was already in a
   * cooldown written by an earlier refusal: same event, nothing to persist.
   */
  counted: boolean;
  windowMs: number;
  threshold: number;
}

interface StreakState {
  count: number;
  lastRefusalAt: number;
  cooldownUntil: number;
}

const streaks = new Map<string, StreakState>();
let clock: () => number = () => Date.now();

function cooldownForStreak(streak: number): number {
  const step = Math.min(streak, REQUEST_REJECTED_COOLDOWNS_MS.length) - 1;
  return REQUEST_REJECTED_COOLDOWNS_MS[step];
}

export function recordRequestRejected(
  connectionId: string,
  now: number = clock()
): RequestRejectedVerdict {
  const existing = streaks.get(connectionId);
  const base = {
    windowMs: REQUEST_REJECTED_WINDOW_MS,
    threshold: REQUEST_REJECTED_ESCALATION_THRESHOLD,
  };

  if (existing && now < existing.cooldownUntil) {
    // In flight before the cooldown was written — same episode.
    return {
      streak: existing.count,
      cooldownMs: Math.max(0, existing.cooldownUntil - now),
      escalate: false,
      counted: false,
      ...base,
    };
  }

  const continues = !!existing && now - existing.lastRefusalAt < REQUEST_REJECTED_WINDOW_MS;
  const streak = continues ? existing.count + 1 : 1;
  const escalate = streak >= REQUEST_REJECTED_ESCALATION_THRESHOLD;

  if (escalate) {
    // The terminal state takes over; a reconnect starts from a clean slate.
    streaks.delete(connectionId);
    return { streak, cooldownMs: 0, escalate: true, counted: true, ...base };
  }

  const cooldownMs = cooldownForStreak(streak);
  streaks.set(connectionId, { count: streak, lastRefusalAt: now, cooldownUntil: now + cooldownMs });
  return { streak, cooldownMs, escalate: false, counted: true, ...base };
}

/**
 * Restore one refusal that happened before this process started (read from
 * the persisted connection row), so a crash loop cannot reset the count on
 * every boot. No-op when the connection already has in-memory state or the
 * refusal is outside the window.
 */
export function seedRequestRejectedStreak(
  connectionId: string,
  lastRefusalAt: number,
  now: number = clock()
): boolean {
  if (streaks.has(connectionId)) return false;
  if (!Number.isFinite(lastRefusalAt) || now - lastRefusalAt >= REQUEST_REJECTED_WINDOW_MS) {
    return false;
  }
  streaks.set(connectionId, { count: 1, lastRefusalAt, cooldownUntil: lastRefusalAt });
  return true;
}

export function hasRequestRejectedStreak(connectionId: string): boolean {
  return streaks.has(connectionId);
}

/** Forget a connection's streak — on a successful response or an operator reset. */
export function clearRequestRejectedStreak(connectionId: string): void {
  streaks.delete(connectionId);
}

/** Test-only: wipe all streaks and restore the real clock. */
export function __resetRequestRejectedStreaksForTests(): void {
  streaks.clear();
  clock = () => Date.now();
}

/** Test-only: replace the clock the streak reads when no `now` is passed. */
export function __setRequestRejectedClockForTests(fn: (() => number) | null): void {
  clock = fn ?? (() => Date.now());
}
