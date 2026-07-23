/**
 * Login brute-force guard.
 *
 * Tracks failed `/api/auth/login` attempts per client IP in process memory
 * and returns lockout decisions. Single-process scope is intentional — this
 * is a defense-in-depth check that pairs with Cloudflare/reverse-proxy rate
 * limiting, not a substitute for it.
 *
 * Tunables:
 *   - failure threshold: 5 within `WINDOW_MS`
 *   - lockout duration: `LOCKOUT_MS`
 *   - sliding window: `WINDOW_MS`
 *
 * The guard is a no-op when `enabled` is false; the caller decides based on
 * the `bruteForceProtection` setting (default true).
 */

const WINDOW_MS = 15 * 60 * 1000;
const LOCKOUT_MS = 15 * 60 * 1000;
const FAILURE_THRESHOLD = 5;

interface AttemptState {
  count: number;
  firstAttemptAt: number;
  lockedUntil: number | null;
}

const attempts: Map<string, AttemptState> = new Map();

// Above this many tracked IPs, opportunistically drop entries whose window has elapsed and
// that are not currently locked. Without this the map only ever grew (entries were deleted
// only on a *successful* login), so every distinct IP that ever failed a login leaked a
// permanent entry — unbounded under distributed brute-force. Expired/unlocked entries are
// already treated as "allowed", so removing them never changes a guard decision.
const PRUNE_THRESHOLD = 256;

function pruneExpiredAttempts(now: number): void {
  for (const [key, state] of attempts) {
    const windowElapsed = now - state.firstAttemptAt > WINDOW_MS;
    const notLocked = !state.lockedUntil || state.lockedUntil <= now;
    if (windowElapsed && notLocked) attempts.delete(key);
  }
}

export interface GuardDecision {
  allowed: boolean;
  retryAfterSeconds?: number;
}

function nowMs(): number {
  return Date.now();
}

function clientKey(rawIp: string | null | undefined): string {
  const ip = (rawIp || "").trim();
  return ip || "__unknown__";
}

export function checkLoginGuard(
  rawIp: string | null | undefined,
  options: { enabled: boolean }
): GuardDecision {
  if (!options.enabled) return { allowed: true };
  const state = attempts.get(clientKey(rawIp));
  if (!state) return { allowed: true };
  const now = nowMs();
  if (state.lockedUntil && state.lockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((state.lockedUntil - now) / 1000),
    };
  }
  return { allowed: true };
}

export function recordLoginFailure(
  rawIp: string | null | undefined,
  options: { enabled: boolean }
): GuardDecision {
  if (!options.enabled) return { allowed: true };
  const key = clientKey(rawIp);
  const now = nowMs();

  // Keep the map from growing without bound as distinct IPs fail logins over time.
  if (attempts.size > PRUNE_THRESHOLD) pruneExpiredAttempts(now);

  const existing = attempts.get(key);

  if (!existing || now - existing.firstAttemptAt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAttemptAt: now, lockedUntil: null });
    return { allowed: true };
  }

  const nextCount = existing.count + 1;
  if (nextCount >= FAILURE_THRESHOLD) {
    const lockedUntil = now + LOCKOUT_MS;
    attempts.set(key, {
      count: nextCount,
      firstAttemptAt: existing.firstAttemptAt,
      lockedUntil,
    });
    return { allowed: false, retryAfterSeconds: Math.ceil(LOCKOUT_MS / 1000) };
  }

  attempts.set(key, {
    count: nextCount,
    firstAttemptAt: existing.firstAttemptAt,
    lockedUntil: null,
  });
  return { allowed: true };
}

export function clearLoginAttempts(rawIp: string | null | undefined): void {
  attempts.delete(clientKey(rawIp));
}

export function resetLoginGuardForTests(): void {
  attempts.clear();
}

/** Test-only: current number of tracked IP entries. */
export function getLoginGuardSizeForTests(): number {
  return attempts.size;
}

export const LOGIN_GUARD_TUNABLES = Object.freeze({
  WINDOW_MS,
  LOCKOUT_MS,
  FAILURE_THRESHOLD,
});
