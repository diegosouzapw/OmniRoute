/**
 * Live OpenCode CLI version for the synthesized `User-Agent` on Zen requests.
 *
 * The identity contract is pinned by the working OMP extension
 * (`zen-patch.ts`): `opencode/<semver> ai-sdk/provider-utils/<semver>
 * runtime/bun/<semver>`. Upstream validates this CLI identity on the free
 * tier; a bare `opencode` or a stale pin rots on every release, so the
 * `<semver>` resolves live from the npm registry JSON API
 * (`opencode-ai/latest`) — plain HTTPS fetch, NO npm binary needed, so
 * machines without npm work fine. Offline or registry blocked → the pin below
 * stays valid and `OPENCODE_USER_AGENT` still overrides everything.
 *
 * Sync header synthesis (`getCachedOpencodeCliVersion`) is pure and never
 * networks — cold/offline returns the pin. `OpencodeExecutor.execute()` kicks
 * `refreshOpencodeCliVersion()` fire-and-forget per request (coalesced, 6h TTL,
 * never throws), so the first request warms the cache in background and later
 * requests send the live version.
 */

const NPM_OPENCODE_LATEST_URL = "https://registry.npmjs.org/opencode-ai/latest";

/** Cold/offline fallback. Bump when the pin visibly lags the registry. */
export const OPENCODE_CLI_VERSION_FALLBACK = "1.18.31";

export const OPENCODE_CLI_VERSION_TTL_MS = 6 * 60 * 60 * 1000;

const FETCH_TIMEOUT_MS = 5_000;

let cachedVersion: string | null = null;
let cachedAt = 0;
let inFlight: Promise<string> | null = null;

export function isOpencodeCliVersion(value: unknown): value is string {
  return typeof value === "string" && /^\d+\.\d+\.\d+$/.test(value.trim());
}

/** Sync hot-path for header synthesis: pure, never networks. Cold/offline → pin. */
export function getCachedOpencodeCliVersion(): string {
  if (cachedVersion && Date.now() - cachedAt < OPENCODE_CLI_VERSION_TTL_MS) return cachedVersion;
  return cachedVersion ?? OPENCODE_CLI_VERSION_FALLBACK;
}

/**
 * Warm/refresh the cache (coalesced across callers, never rejects).
 * Fresh cache → returns it without fetching. Stale/absent → one registry
 * lookup; failure keeps the stale cache or pin.
 */
export function refreshOpencodeCliVersion(): Promise<string> {
  if (cachedVersion && Date.now() - cachedAt < OPENCODE_CLI_VERSION_TTL_MS) {
    return Promise.resolve(cachedVersion);
  }
  if (inFlight) return inFlight;
  inFlight = (async () => {
    try {
      const response = await globalThis.fetch(NPM_OPENCODE_LATEST_URL, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      const payload = response.ok ? ((await response.json()) as { version?: unknown }) : null;
      const version = typeof payload?.version === "string" ? payload.version.trim() : "";
      if (isOpencodeCliVersion(version)) {
        cachedVersion = version;
        cachedAt = Date.now();
      }
    } catch {
      // Registry unreachable — stale cache / pin stay valid.
    }
    return cachedVersion ?? OPENCODE_CLI_VERSION_FALLBACK;
  })();
  const current = inFlight;
  void current.finally(() => {
    if (inFlight === current) inFlight = null;
  });
  return current;
}

/** Test seam: clear the cache. */
export function resetOpencodeCliVersionCache(): void {
  cachedVersion = null;
  cachedAt = 0;
  inFlight = null;
}

/** Test seam: seed a fixed version (stale when cachedAt is old). */
export function configureOpencodeCliVersionForTests(version: string, cachedAtValue = Date.now()): void {
  if (!isOpencodeCliVersion(version)) {
    throw new TypeError(`Invalid OpenCode CLI version: ${version}`);
  }
  cachedVersion = version.trim();
  cachedAt = cachedAtValue;
}
