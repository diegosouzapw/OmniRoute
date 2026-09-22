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
const SAFE_HEADER_TOKEN_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,31}$/;
const SAFE_HEADER_VALUE_PATTERN = /^[\x20-\x7E]{1,200}$/;
const SAFE_CODEX_SESSION_ID_PATTERN = /^[A-Za-z0-9._:-]{1,200}$/;

function getSafeEnvValue(name: string, pattern: RegExp): string | null {
  const raw = process.env[name];
  if (typeof raw !== "string") return null;
  const normalized = raw.trim();
  if (!normalized || !pattern.test(normalized)) {
    return null;
  }
  return normalized;
}

export function getCodexClientVersion(): string {
  return (
    getSafeEnvValue(CODEX_VERSION_OVERRIDE_ENV, SAFE_HEADER_TOKEN_PATTERN) ||
    DEFAULT_CODEX_CLIENT_VERSION
  );
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
    "Openai-Beta": "responses=experimental",
    "X-Codex-Beta-Features": "responses_websockets",
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
