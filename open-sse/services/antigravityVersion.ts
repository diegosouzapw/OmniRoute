const ANTIGRAVITY_RELEASE_FEED_URL =
  "https://antigravity-auto-updater-974169037036.us-central1.run.app/releases";
const ANTIGRAVITY_GITHUB_RELEASE_URL =
  "https://api.github.com/repos/antigravityide/antigravity/releases/latest";

export const ANTIGRAVITY_VERSION_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
export const ANTIGRAVITY_VERSION_FETCH_TIMEOUT_MS = 5_000;
export const ANTIGRAVITY_FALLBACK_VERSION = "1.23.2";

type VersionCache = {
  fetchedAt: number;
  version: string;
};

type FetchLike = typeof fetch;

let versionCache: VersionCache | null = null;
let inFlightRequest: Promise<string> | null = null;

function normalizeVersion(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().replace(/^v/i, "");
  const match = trimmed.match(/^(\d+\.\d+\.\d+)\b/);
  return match ? match[1] : null;
}

async function fetchJsonWithTimeout(fetchImpl: FetchLike, url: string): Promise<unknown> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ANTIGRAVITY_VERSION_FETCH_TIMEOUT_MS);

  try {
    const response = await fetchImpl(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "OmniRoute-AntigravityVersion/1.0",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Version source ${url} returned ${response.status}`);
    }

    return response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

function parseOfficialReleaseFeed(payload: unknown): string | null {
  if (!Array.isArray(payload)) return null;

  for (const entry of payload) {
    const version = normalizeVersion((entry as { version?: unknown })?.version);
    if (version) return version;
  }

  return null;
}

function parseGitHubRelease(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;

  const candidate =
    (payload as { tag_name?: unknown }).tag_name ?? (payload as { name?: unknown }).name;

  return normalizeVersion(candidate);
}

async function fetchLatestAntigravityVersion(fetchImpl: FetchLike): Promise<string | null> {
  const sources = [
    {
      parse: parseOfficialReleaseFeed,
      url: ANTIGRAVITY_RELEASE_FEED_URL,
    },
    {
      parse: parseGitHubRelease,
      url: ANTIGRAVITY_GITHUB_RELEASE_URL,
    },
  ];

  for (const source of sources) {
    try {
      const payload = await fetchJsonWithTimeout(fetchImpl, source.url);
      const version = source.parse(payload);
      if (version) return version;
    } catch {
      // Try the next source and fall back to the last known good version if all fail.
    }
  }

  return null;
}

export async function resolveAntigravityVersion(fetchImpl: FetchLike = fetch): Promise<string> {
  const now = Date.now();

  if (versionCache && now - versionCache.fetchedAt < ANTIGRAVITY_VERSION_CACHE_TTL_MS) {
    return versionCache.version;
  }

  if (inFlightRequest) {
    return inFlightRequest;
  }

  inFlightRequest = (async () => {
    const resolved = await fetchLatestAntigravityVersion(fetchImpl);
    const version = resolved || versionCache?.version || ANTIGRAVITY_FALLBACK_VERSION;

    if (resolved) {
      versionCache = {
        fetchedAt: Date.now(),
        version,
      };
    }

    return version;
  })();

  try {
    return await inFlightRequest;
  } finally {
    inFlightRequest = null;
  }
}

export function getCachedAntigravityVersion(): string {
  return versionCache?.version || ANTIGRAVITY_FALLBACK_VERSION;
}

export function seedAntigravityVersionCache(version: string, fetchedAt = Date.now()): void {
  versionCache = {
    fetchedAt,
    version,
  };
}

export function clearAntigravityVersionCache(): void {
  versionCache = null;
  inFlightRequest = null;
}
