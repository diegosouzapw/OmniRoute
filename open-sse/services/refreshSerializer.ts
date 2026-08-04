/**
 * Global OAuth refresh serialization, keyed by rotation group.
 *
 * Why this exists (Front 1 of the Codex multi-account cascade fix):
 * Providers that share a single Auth0 client_id — notably OpenAI Codex and the
 * `openai` provider — enforce "single active session per client_id". When two
 * *sibling* accounts under that client refresh their `refresh_token` at nearly
 * the same time, Auth0 treats it as token reuse and revokes the WHOLE
 * refresh_token family, so previously-healthy accounts suddenly fail with
 * `refresh_token_invalidated` / `refresh_token_reused` (openai/codex#9648).
 *
 * The per-connection mutex in tokenRefresh.ts does NOT help: the colliding
 * refreshes happen on DIFFERENT connections. This serializer forces the actual
 * network refresh to concurrency=1 across every connection in a rotation group,
 * so two siblings never POST to /oauth/token concurrently. Optional spacing
 * (CODEX_REFRESH_SPACING_MS) inserts a small gap between consecutive refreshes
 * in a group for extra safety. Non-rotating providers (Google, etc.) are not
 * serialized — their refresh_tokens are permanent and there is no cascade.
 */

// Providers mapped to the same string share one serialized lane. Codex and the
// raw `openai` provider use the same Auth0 backend, so they MUST share a lane.
const ROTATION_LOCK_GROUP: Record<string, string> = {
  codex: "openai-auth0",
  openai: "openai-auth0",
  claude: "anthropic-oauth",
  "gitlab-duo": "gitlab-duo",
  kiro: "kiro",
  "kimi-coding": "kimi-coding",
};

// Protective settle gap (ms) between two consecutive sibling refreshes when the
// env var is unset. Conservative by default; bursts are rare and correctness
// (not revoking the family) outweighs the extra wall-clock on a queued refresh.
const DEFAULT_REFRESH_SPACING_MS = 2000;

/**
 * Gap (ms) inserted between two consecutive refreshes in the same rotation group.
 * It is only paid when a sibling is already queued behind the current refresh —
 * a lone refresh is released immediately so the reactive request path pays no
 * extra latency. The gap gives Auth0 time to settle a rotation before the next
 * sibling presents its (now superseded) refresh_token, closing the
 * family-revocation race window (openai/codex#9648).
 *
 * Tunable via `CODEX_REFRESH_SPACING_MS`; set it to `"0"` to opt out entirely.
 */
export function getRefreshSpacingMs(): number {
  const rawEnv = process.env.CODEX_REFRESH_SPACING_MS;
  if (rawEnv === undefined || rawEnv === "") return DEFAULT_REFRESH_SPACING_MS;
  const raw = Number(rawEnv);
  // Explicit "0" opts out; anything unparseable falls back to the safe default.
  return Number.isFinite(raw) && raw >= 0 ? raw : DEFAULT_REFRESH_SPACING_MS;
}

// Tail promise per group — each new refresh chains after the previous one.
const groupTail = new Map<string, Promise<void>>();

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Returns the serialization group for a provider, or null when it is not a rotating provider. */
export function rotationGroupFor(provider: string): string | null {
  return ROTATION_LOCK_GROUP[provider] ?? null;
}

/**
 * Run `fn` (the actual network refresh) serialized against every other refresh
 * in the same rotation group. Different groups run concurrently; non-rotating
 * providers run immediately with no locking.
 */
export async function serializeRefresh<T>(provider: string, fn: () => Promise<T>): Promise<T> {
  const group = rotationGroupFor(provider);
  if (!group) return fn();

  const prevTail = groupTail.get(group) ?? Promise.resolve();
  let releaseMine!: () => void;
  const mine = new Promise<void>((resolve) => {
    releaseMine = resolve;
  });
  const myTail = prevTail.then(() => mine);
  groupTail.set(group, myTail);

  // Wait for our turn. Ignore a predecessor's rejection — its `finally` still
  // releases the lane, so the queue keeps flowing even after a failed refresh.
  await prevTail.catch(() => {});

  try {
    return await fn();
  } finally {
    // Only pay the settle gap when a sibling is already queued behind us — a
    // lone refresh has nobody to collide with, so it must be released
    // immediately (zero added latency on the reactive request path).
    const hasSuccessor = groupTail.get(group) !== myTail;
    if (hasSuccessor) {
      const spacing = getRefreshSpacingMs();
      if (spacing > 0) await delay(spacing);
    }
    releaseMine();
    // Garbage-collect the lane when nobody chained after us.
    if (groupTail.get(group) === myTail) groupTail.delete(group);
  }
}

/**
 * Front 3 (reuse-race tolerance): decide whether an unrecoverable refresh failure
 * (`refresh_token_invalidated` / `refresh_token_reused`) should be IGNORED because
 * a concurrent or sibling refresh already rotated this connection's refresh_token.
 *
 * If the DB now holds a different, non-empty refresh_token than the one we
 * presented, the failure was a stale-token reuse and the connection is actually
 * healthy with the newer token — so it must stay active instead of being
 * deactivated. Mirrors the health-check's `credentialsChangedSinceSweep` guard
 * and codex-lb's replica race-detection.
 */
export function wasRefreshTokenRotated(
  attemptedRefreshToken: string | null | undefined,
  latestRefreshToken: string | null | undefined
): boolean {
  return (
    typeof attemptedRefreshToken === "string" &&
    attemptedRefreshToken.length > 0 &&
    typeof latestRefreshToken === "string" &&
    latestRefreshToken.length > 0 &&
    latestRefreshToken !== attemptedRefreshToken
  );
}

/** Test-only: clear all in-flight lanes between tests. */
export function __resetRefreshSerializerForTest(): void {
  groupTail.clear();
}
