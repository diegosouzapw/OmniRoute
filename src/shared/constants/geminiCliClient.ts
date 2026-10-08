/**
 * Wire version advertised for the Gemini CLI identity preset.
 *
 * `GEMINI_CLI_CLIENT_VERSION` is the captured pin. Callers that put the
 * version on the wire must go through getGeminiCliClientVersion() so a
 * newer `@google/gemini-cli` publish is picked up without a rebuild. The
 * getter reads a 6h cache of the npm `latest` document and uses that
 * version when it is a dotted triple newer than the pin. The lookup is
 * fire-and-forget; a cold or failed fetch stays on the pin.
 */
export const GEMINI_CLI_CLIENT_VERSION = "0.1.0";
export const GEMINI_CLI_USER_AGENT_SUFFIX = "(linux; x64)";

const NPM_GEMINI_CLI_LATEST_URL = "https://registry.npmjs.org/@google/gemini-cli/latest";
export const GEMINI_CLI_VERSION_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
export const GEMINI_CLI_VERSION_FETCH_TIMEOUT_MS = 20_000;

const DOTTED_TRIPLE_PATTERN = /^\d+\.\d+\.\d+$/;

type FetchLike = typeof fetch;

let cachedVersion: string | null = null;
let cachedAt = 0;
let inFlight: Promise<string> | null = null;

function parseDottedTriple(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return DOTTED_TRIPLE_PATTERN.test(trimmed) ? trimmed : null;
}

function compareDottedTriple(a: string, b: string): number {
  const aParts = a.split(".").map((part) => Number.parseInt(part, 10) || 0);
  const bParts = b.split(".").map((part) => Number.parseInt(part, 10) || 0);
  for (let i = 0; i < 3; i += 1) {
    if (aParts[i] !== bParts[i]) return aParts[i] - bParts[i];
  }
  return 0;
}

function pickAtLeastPin(version: string | null): string {
  if (!version || compareDottedTriple(version, GEMINI_CLI_CLIENT_VERSION) <= 0) {
    return GEMINI_CLI_CLIENT_VERSION;
  }
  return version;
}

function readFreshCache(): string | null {
  if (!cachedVersion) return null;
  if (Date.now() - cachedAt >= GEMINI_CLI_VERSION_CACHE_TTL_MS) return null;
  return cachedVersion;
}

function shouldAutoRefreshGeminiCliVersion(): boolean {
  if (typeof process === "undefined") return false;
  return !process.env.NODE_TEST_CONTEXT;
}

/**
 * Sync hot path. A cached registry version newer than the pin, else the pin.
 * Outside tests, a stale cache starts one background refresh; this call
 * itself never waits on the network.
 */
export function getGeminiCliClientVersion(): string {
  if (shouldAutoRefreshGeminiCliVersion() && !readFreshCache() && !inFlight) {
    void refreshGeminiCliClientVersion();
  }
  return pickAtLeastPin(readFreshCache());
}

export function getGeminiCliUserAgent(): string {
  return `GeminiCLI/${getGeminiCliClientVersion()} ${GEMINI_CLI_USER_AGENT_SUFFIX}`;
}

/**
 * Warm the npm cache (20s timeout, 6h TTL, coalesced, never rejects).
 * Any failure -- network, non-2xx, or a payload that is not a dotted triple --
 * leaves the pin (or the previous fresh cache) in place. A fetched triple
 * older than or equal to the pin is discarded.
 */
export function refreshGeminiCliClientVersion(fetchImpl: FetchLike = fetch): Promise<string> {
  const fresh = readFreshCache();
  if (fresh) return Promise.resolve(pickAtLeastPin(fresh));

  if (inFlight) return inFlight;

  inFlight = (async () => {
    let resolved: string | null = null;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), GEMINI_CLI_VERSION_FETCH_TIMEOUT_MS);
      try {
        const response = await fetchImpl(NPM_GEMINI_CLI_LATEST_URL, {
          headers: {
            Accept: "application/json",
            "User-Agent": "OmniRoute-GeminiCliVersion/1.0",
          },
          signal: controller.signal,
        });
        if (response.ok) {
          const payload = (await response.json()) as { version?: unknown };
          resolved = parseDottedTriple(payload?.version);
        }
      } finally {
        clearTimeout(timeoutId);
      }
    } catch {
      resolved = null;
    }

    if (resolved && compareDottedTriple(resolved, GEMINI_CLI_CLIENT_VERSION) > 0) {
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

/** Test seam: drop the registry cache so the next refresh hits the network. */
export function resetGeminiCliClientVersionCache(): void {
  cachedVersion = null;
  cachedAt = 0;
  inFlight = null;
}
