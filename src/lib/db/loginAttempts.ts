import { getDbInstance } from "./core";

const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getKey(identifier: string): string {
  return `login:${identifier}`;
}

/** Safely parse stored attempt timestamps, filtering to within the window. */
function parseAttempts(raw: string | undefined, windowStart: number): number[] {
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((t): t is number => typeof t === "number" && t > windowStart);
  } catch {
    return [];
  }
}

export function recordLoginFailure(identifier: string): { locked: boolean; attemptsLeft: number } {
  const db = getDbInstance();
  const key = getKey(identifier);
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'login_attempts' AND key = ?")
    .get(key) as { value: string } | undefined;

  const attempts = parseAttempts(row?.value, windowStart);
  attempts.push(now);

  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('login_attempts', ?, ?)"
  ).run(key, JSON.stringify(attempts));

  const locked = attempts.length >= MAX_ATTEMPTS;
  return { locked, attemptsLeft: Math.max(0, MAX_ATTEMPTS - attempts.length) };
}

export function checkLoginLockout(identifier: string): { locked: boolean; retryAfterMs: number } {
  const db = getDbInstance();
  const key = getKey(identifier);
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'login_attempts' AND key = ?")
    .get(key) as { value: string } | undefined;

  if (!row) return { locked: false, retryAfterMs: 0 };

  const attempts = parseAttempts(row.value, windowStart);

  // All timestamps expired — prune the stale row
  if (attempts.length === 0) {
    db.prepare("DELETE FROM key_value WHERE namespace = 'login_attempts' AND key = ?").run(key);
    return { locked: false, retryAfterMs: 0 };
  }

  if (attempts.length < MAX_ATTEMPTS) return { locked: false, retryAfterMs: 0 };

  const oldestInWindow = attempts.reduce((a, b) => (b < a ? b : a));
  const retryAfterMs = Math.max(0, oldestInWindow + WINDOW_MS - now);
  return { locked: true, retryAfterMs };
}

export function clearLoginAttempts(identifier: string): void {
  const db = getDbInstance();
  const key = getKey(identifier);
  db.prepare("DELETE FROM key_value WHERE namespace = 'login_attempts' AND key = ?").run(key);
}
