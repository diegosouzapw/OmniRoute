type JsonRecord = Record<string, unknown>;

export type GitLabDirectAccessDetails = {
  token: string;
  baseUrl: string;
  expiresAt: string | null;
  headers: Record<string, string>;
};

export const GITLAB_DUO_DEFAULT_BASE_URL =
  process.env.GITLAB_DUO_BASE_URL || process.env.GITLAB_BASE_URL || "https://gitlab.com";

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export function normalizeGitLabBaseUrl(baseUrl?: unknown): string {
  const raw = typeof baseUrl === "string" ? baseUrl.trim() : "";
  return (raw || GITLAB_DUO_DEFAULT_BASE_URL).replace(/\/$/, "");
}

export function resolveGitLabOAuthBaseUrl(providerSpecificData?: unknown): string {
  const data = asRecord(providerSpecificData);
  return normalizeGitLabBaseUrl(data.baseUrl);
}

export function buildGitLabOAuthEndpoints(baseUrl?: unknown) {
  const root = normalizeGitLabBaseUrl(baseUrl);
  return {
    root,
    authorizeUrl: `${root}/oauth/authorize`,
    tokenUrl: `${root}/oauth/token`,
    userUrl: `${root}/api/v4/user`,
    directAccessUrl: `${root}/api/v4/code_suggestions/direct_access`,
    publicCompletionsUrl: `${root}/api/v4/code_suggestions/completions`,
  };
}

export function buildGitLabDirectGatewayUrl(baseUrl: string): string {
  const normalized = normalizeGitLabBaseUrl(baseUrl);
  if (normalized.endsWith("/ai/v2/completions")) {
    return normalized;
  }
  if (normalized.endsWith("/ai/v2")) {
    return `${normalized}/completions`;
  }
  return `${normalized}/ai/v2/completions`;
}

export function parseGitLabDirectAccessDetails(payload: unknown): GitLabDirectAccessDetails | null {
  const data = asRecord(payload);
  const token = typeof data.token === "string" ? data.token.trim() : "";
  const baseUrl = typeof data.base_url === "string" ? data.base_url.trim() : "";
  if (!token || !baseUrl) {
    return null;
  }

  const rawHeaders = asRecord(data.headers);
  const headers = Object.fromEntries(
    Object.entries(rawHeaders).filter(
      (entry): entry is [string, string] =>
        typeof entry[0] === "string" && typeof entry[1] === "string"
    )
  );

  const expiresAt =
    typeof data.expires_at === "number" && Number.isFinite(data.expires_at)
      ? new Date(data.expires_at * 1000).toISOString()
      : null;

  return {
    token,
    baseUrl: normalizeGitLabBaseUrl(baseUrl),
    expiresAt,
    headers,
  };
}

export function getCachedGitLabDirectAccess(
  providerSpecificData?: unknown,
  minValidityMs = 60_000
): GitLabDirectAccessDetails | null {
  const data = asRecord(providerSpecificData);
  const cache = data.gitlabDirectAccess ?? data.directAccessCache;
  const parsed = parseGitLabDirectAccessDetails(cache);
  if (!parsed) {
    return null;
  }
  if (!parsed.expiresAt) {
    return parsed;
  }

  const expiresAtMs = new Date(parsed.expiresAt).getTime();
  if (!Number.isFinite(expiresAtMs) || expiresAtMs <= Date.now() + minValidityMs) {
    return null;
  }

  return parsed;
}

export function isGitLabDirectAccessDisabled(status: number, bodyText: string): boolean {
  return status === 403 && bodyText.toLowerCase().includes("direct connections are disabled");
}
