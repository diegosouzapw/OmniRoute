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

export const LOGIN_GUARD_TUNABLES = Object.freeze({
  WINDOW_MS,
  LOCKOUT_MS,
  FAILURE_THRESHOLD,
});
