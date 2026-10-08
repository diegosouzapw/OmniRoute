/**
 * Advertised Zed editor version for the x-zed-version header.
 *
 * The captured pin is the floor. A newer dotted triple from the latest
 * zed-industries/zed GitHub release replaces it for 6 hours. The lookup is
 * fire-and-forget; a cold or failed fetch stays on the pin. An explicit
 * executor config.appVersion still wins over both.
 */

export const ZED_CLIENT_VERSION = "0.200.0";

const ZED_RELEASE_URL = "https://api.github.com/repos/zed-industries/zed/releases/latest";
export const ZED_VERSION_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
export const ZED_VERSION_FETCH_TIMEOUT_MS = 20_000;
const DOTTED_TRIPLE_PATTERN = /^\d+\.\d+\.\d+$/;

type FetchLike = typeof fetch;

let cachedVersion: string | null = null;
let cachedAt = 0;
let inFlight: Promise<string> | null = null;

function parseReleaseTag(tagName: unknown): string | null {
  if (typeof tagName !== "string") return null;
  const stripped = tagName.trim().replace(/^v/, "");
  return DOTTED_TRIPLE_PATTERN.test(stripped) ? stripped : null;
}

function compareDottedTriple(left: string, right: string): number {
  const leftParts = left.split(".").map((part) => Number.parseInt(part, 10) || 0);
  const rightParts = right.split(".").map((part) => Number.parseInt(part, 10) || 0);
  for (let i = 0; i < 3; i += 1) {
    if (leftParts[i] !== rightParts[i]) return leftParts[i] - rightParts[i];
  }
  return 0;
}

function pickAtLeastPin(version: string | null): string {
  if (!version || compareDottedTriple(version, ZED_CLIENT_VERSION) <= 0) {
    return ZED_CLIENT_VERSION;
  }
  return version;
}

function readFreshCache(): string | null {
  if (!cachedVersion) return null;
  if (Date.now() - cachedAt >= ZED_VERSION_CACHE_TTL_MS) return null;
  return cachedVersion;
}

/**
 * Sync hot path. A cached release newer than the pin, else the pin.
 * Outside tests, a stale cache starts one background refresh; this call
 * itself never waits on the network.
 */
export function getZedClientVersion(): string {
  if (typeof process !== "undefined" && !process.env.NODE_TEST_CONTEXT && !readFreshCache() && !inFlight) {
    void refreshZedClientVersion();
  }
  return pickAtLeastPin(readFreshCache());
}

/**
 * Warm the GitHub cache (20s timeout, 6h TTL, coalesced, never rejects).
 * Any failure — network, non-2xx, or a tag that is not a dotted triple —
 * leaves the pin (or the previous fresh cache) in place. A fetched version
 * is stored only when it is newer than the pin.
 */
export function refreshZedClientVersion(fetchImpl: FetchLike = fetch): Promise<string> {
  const fresh = readFreshCache();
  if (fresh) return Promise.resolve(pickAtLeastPin(fresh));
  if (inFlight) return inFlight;

  inFlight = (async () => {
    let resolved: string | null = null;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ZED_VERSION_FETCH_TIMEOUT_MS);
    try {
      const response = await fetchImpl(ZED_RELEASE_URL, {
        headers: {
          Accept: "application/json",
          "User-Agent": "OmniRoute-ZedVersion/1.0",
        },
        signal: controller.signal,
      });
      if (response.ok) {
        const payload = (await response.json()) as { tag_name?: unknown };
        resolved = parseReleaseTag(payload?.tag_name);
      }
    } catch {
      resolved = null;
    } finally {
      clearTimeout(timeoutId);
    }

    if (resolved && compareDottedTriple(resolved, ZED_CLIENT_VERSION) > 0) {
      cachedVersion = resolved;
      cachedAt = Date.now();
    }
    return pickAtLeastPin(resolved ?? readFreshCache());
  })();

  const current = inFlight;
  void current.finally(() => {
    if (inFlight === current) inFlight = null;
  });
  return current;
}

/** Test seam: drop the release cache so the next refresh hits the network. */
export function resetZedClientVersionCache(): void {
  cachedVersion = null;
  cachedAt = 0;
  inFlight = null;
}
