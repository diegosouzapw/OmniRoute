const CACHE_TTL_MS = 5 * 60 * 1000;
const releasesCache = new Map<string, { data: any; ts: number }>();

function getGitHubHeaders(): Record<string, string> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function fetchJSON(url: string): Promise<any> {
  const res = await fetch(url, {
    headers: getGitHubHeaders(),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${url}`);
  return res.json();
}

async function cachedFetch(url: string): Promise<any> {
  const cached = releasesCache.get(url);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) return cached.data;
  const data = await fetchJSON(url);
  releasesCache.set(url, { data, ts: Date.now() });
  return data;
}

interface ReleaseInfo {
  tag: string;
  version: string;
  assets: { name: string; url: string; size: number }[];
  publishedAt: string;
  body: string;
}

function parseRelease(raw: any): ReleaseInfo {
  return {
    tag: raw.tag_name,
    version: raw.tag_name.replace(/^v/, ""),
    assets: (raw.assets || []).map((a: any) => ({
      name: a.name,
      url: a.browser_download_url,
      size: a.size,
    })),
    publishedAt: raw.published_at,
    body: raw.body || "",
  };
}

export async function getLatestRelease(): Promise<ReleaseInfo> {
  const raw = await cachedFetch(
    "https://api.github.com/repos/router-for-me/CLIProxyAPI/releases/latest"
  );
  return parseRelease(raw);
}

export async function getReleaseByVersion(version: string): Promise<ReleaseInfo | null> {
  const tag = version.startsWith("v") ? version : `v${version}`;
  try {
    const raw = await cachedFetch(
      `https://api.github.com/repos/router-for-me/CLIProxyAPI/releases/tags/${tag}`
    );
    return parseRelease(raw);
  } catch {
    return null;
  }
}

export async function getAvailableVersions(): Promise<string[]> {
  const raw = await cachedFetch(
    "https://api.github.com/repos/router-for-me/CLIProxyAPI/releases?per_page=30"
  );
  return (Array.isArray(raw) ? raw : []).map((r: any) => r.tag_name);
}

export async function getChecksums(version: string): Promise<Map<string, string>> {
  const tag = version.startsWith("v") ? version : `v${version}`;
  const url = `https://github.com/router-for-me/CLIProxyAPI/releases/download/${tag}/checksums.txt`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) return new Map();
    const text = await res.text();
    const map = new Map<string, string>();
    for (const line of text.split("\n")) {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 2) {
        map.set(parts[1], parts[0]);
      }
    }
    return map;
  } catch {
    return new Map();
  }
}

export function clearCache(): void {
  releasesCache.clear();
}
