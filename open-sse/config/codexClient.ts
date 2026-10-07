import {
  CODEX_CLI_RS_ORIGINATOR,
  DEFAULT_CODEX_CLIENT_VERSION,
  getCodexCliRsHeaders as buildCodexCliRsHeaders,
} from "@/shared/constants/codexClient";

export {
  DEFAULT_CODEX_CLIENT_VERSION,
  CODEX_CLI_RS_ORIGINATOR,
} from "@/shared/constants/codexClient";
const DEFAULT_CODEX_USER_AGENT_PLATFORM = "Windows 10.0.26200";
const DEFAULT_CODEX_USER_AGENT_ARCH = "x64";
const CODEX_VERSION_OVERRIDE_ENV = "CODEX_CLIENT_VERSION";
const CODEX_USER_AGENT_OVERRIDE_ENV = "CODEX_USER_AGENT";
const CODEX_RELEASE_URL = "https://api.github.com/repos/openai/codex/releases/latest";
export const CODEX_VERSION_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
export const CODEX_VERSION_FETCH_TIMEOUT_MS = 20_000;
const SAFE_HEADER_TOKEN_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,31}$/;
const SAFE_HEADER_VALUE_PATTERN = /^[\x20-\x7E]{1,200}$/;
const SAFE_CODEX_SESSION_ID_PATTERN = /^[A-Za-z0-9._:-]{1,200}$/;
const CODEX_DOTTED_TRIPLE_PATTERN = /^(\d+)\.(\d+)\.(\d+)$/;

type CodexVersionCache = {
  fetchedAt: number;
  version: string;
};

type FetchLike = typeof fetch;

let versionCache: CodexVersionCache | null = null;
let versionInFlight: Promise<string> | null = null;

function getSafeEnvValue(name: string, pattern: RegExp): string | null {
  const raw = process.env[name];
  if (typeof raw !== "string") return null;
  const normalized = raw.trim();
  if (!normalized || !pattern.test(normalized)) {
    return null;
  }
  return normalized;
}

function parseCodexReleaseTag(tagName: unknown): string | null {
  if (typeof tagName !== "string") return null;
  const stripped = tagName.trim().replace(/^rust-v/, "");
  const match = CODEX_DOTTED_TRIPLE_PATTERN.exec(stripped);
  return match ? match[0] : null;
}

function compareDottedTriple(left: string, right: string): number {
  const leftParts = left.split(".").map((part) => Number.parseInt(part, 10));
  const rightParts = right.split(".").map((part) => Number.parseInt(part, 10));
  for (let i = 0; i < 3; i += 1) {
    if (leftParts[i] !== rightParts[i]) return leftParts[i] - rightParts[i];
  }
  return 0;
}

function pickCodexVersionAtLeastPin(candidate: string | null): string {
  if (candidate && compareDottedTriple(candidate, DEFAULT_CODEX_CLIENT_VERSION) > 0) {
    return candidate;
  }
  return DEFAULT_CODEX_CLIENT_VERSION;
}

async function fetchCodexReleaseTag(fetchImpl: FetchLike): Promise<string | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CODEX_VERSION_FETCH_TIMEOUT_MS);
  try {
    const response = await fetchImpl(CODEX_RELEASE_URL, {
      headers: {
        Accept: "application/json",
        "User-Agent": "OmniRoute-CodexVersion/1.0",
      },
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as { tag_name?: unknown };
    return parseCodexReleaseTag(payload?.tag_name);
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Refresh the advertised Codex CLI version from the latest GitHub release.
 * A fetched dotted triple newer than the pin replaces it; any failure, a
 * malformed tag, or an older release keeps the pin. Cached for six hours.
 */
export function resolveCodexClientVersion(fetchImpl: FetchLike = fetch): Promise<string> {
  const now = Date.now();
  if (versionCache && now - versionCache.fetchedAt < CODEX_VERSION_CACHE_TTL_MS) {
    return Promise.resolve(pickCodexVersionAtLeastPin(versionCache.version));
  }
  if (versionInFlight) return versionInFlight;

  versionInFlight = (async () => {
    const fetched = await fetchCodexReleaseTag(fetchImpl);
    const version = pickCodexVersionAtLeastPin(fetched ?? versionCache?.version ?? null);
    if (fetched) {
      versionCache = { fetchedAt: Date.now(), version };
    }
    return version;
  })();

  return versionInFlight.finally(() => {
    versionInFlight = null;
  });
}

export function getCachedCodexClientVersion(): string {
  return pickCodexVersionAtLeastPin(versionCache?.version ?? null);
}

export function seedCodexClientVersionCache(version: string, fetchedAt = Date.now()): void {
  if (!CODEX_DOTTED_TRIPLE_PATTERN.test(version)) {
    throw new TypeError(`Invalid Codex client version: ${version}`);
  }
  versionCache = { fetchedAt, version };
}

export function clearCodexClientVersionCache(): void {
  versionCache = null;
  versionInFlight = null;
}

export function getCodexClientVersion(): string {
  const override = getSafeEnvValue(CODEX_VERSION_OVERRIDE_ENV, SAFE_HEADER_TOKEN_PATTERN);
  if (override) return override;
  if (!process.env.NODE_TEST_CONTEXT && !versionCache && !versionInFlight) void resolveCodexClientVersion();
  return getCachedCodexClientVersion();
}

/**
 * Extract the Codex client version the CALLER actually reported, so OmniRoute
 * forwards it upstream instead of substituting a pinned default. The official
 * CLI sends it in User-Agent, e.g.
 *   codex_cli_rs/0.154.0 (Mac OS 26.6.2; arm64) ...
 *   codex_exec/0.154.0 (Mac OS 26.6.2; arm64) xterm-256color (codex_exec; 0.154.0)
 * Some clients also send a `version` header.
 *
 * Why this matters: the ChatGPT backend gates newer models on the client
 * version ("The 'gpt-6-astra' model requires a newer version of Codex").
 * A pinned default silently rots every time the user upgrades their CLI.
 *
 * Returns null when the caller sent nothing usable, so callers can fall back
 * to getCodexClientVersion().
 */
const CODEX_CLIENT_VERSION_IN_UA_PATTERN = /(?:codex[-_][A-Za-z0-9_]*|codex-cli)\/(\d+\.\d+\.\d+)/i;

export function getCodexClientVersionFromHeaders(
  clientHeaders?: Record<string, string> | null
): string | null {
  if (!clientHeaders) return null;

  const pick = (name: string): string | null => {
    const direct = clientHeaders[name];
    if (typeof direct === "string" && direct.trim()) return direct.trim();
    const lower = name.toLowerCase();
    for (const [k, v] of Object.entries(clientHeaders)) {
      if (k.toLowerCase() === lower && typeof v === "string" && v.trim()) {
        return v.trim();
      }
    }
    return null;
  };

  const fromVersionHeader = pick("version");
  if (fromVersionHeader && SAFE_HEADER_TOKEN_PATTERN.test(fromVersionHeader)) {
    return fromVersionHeader;
  }

  const userAgent = pick("user-agent");
  if (!userAgent) return null;

  const match = CODEX_CLIENT_VERSION_IN_UA_PATTERN.exec(userAgent);
  if (!match) return null;

  const version = match[1];
  return SAFE_HEADER_TOKEN_PATTERN.test(version) ? version : null;
}

export function getCodexUserAgent(versionOverride?: string | null): string {
  const override = getSafeEnvValue(CODEX_USER_AGENT_OVERRIDE_ENV, SAFE_HEADER_VALUE_PATTERN);
  if (override) {
    return override;
  }

  const version =
    versionOverride && SAFE_HEADER_TOKEN_PATTERN.test(versionOverride)
      ? versionOverride
      : getCodexClientVersion();

  return `codex-cli/${version} (${DEFAULT_CODEX_USER_AGENT_PLATFORM}; ${DEFAULT_CODEX_USER_AGENT_ARCH})`;
}

export function getCodexDefaultHeaders(): Record<string, string> {
  return {
    Version: getCodexClientVersion(),
    "Openai-Beta": "responses_websockets=2026-02-06",
    "User-Agent": getCodexUserAgent(),
  };
}

export function getCodexCliRsHeaders(): Record<string, string> {
  return buildCodexCliRsHeaders(getCodexClientVersion());
}

/**
 * Identity for the credential face (auth.openai.com: token exchange / refresh).
 * The real Codex client sends only `originator` + `User-Agent` on that face
 * (codex-rs login/default_client.rs default_headers()); the `Version` header
 * gate exists only on the chatgpt.com/backend-api inference face, so it is
 * deliberately omitted here. Mirrors sub2api v0.1.178
 * ApplyCodexCanonicalAuthIdentity.
 */
export function getCodexAuthIdentityHeaders(): Record<string, string> {
  return {
    "User-Agent": getCodexUserAgent(),
    originator: CODEX_CLI_RS_ORIGINATOR,
  };
}

/**
 * Canonical Codex CLI identity for server-initiated calls against the
 * chatgpt.com/backend-api face that are not tied to one end-client request
 * (usage / quota / models manifest / reset-credits). Same UA/version chain as
 * inference so these calls do not show up upstream as anonymous half-identities.
 */
export function getCodexBackendIdentityHeaders(): Record<string, string> {
  return {
    "User-Agent": getCodexUserAgent(),
    originator: CODEX_CLI_RS_ORIGINATOR,
    Version: getCodexClientVersion(),
  };
}

export function normalizeCodexSessionId(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return SAFE_CODEX_SESSION_ID_PATTERN.test(normalized) ? normalized : null;
}
