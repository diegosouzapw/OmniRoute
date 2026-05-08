const DEFAULT_CODEX_CLIENT_VERSION = "0.125.0";
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

export function getCodexUserAgent(): string {
  const override = getSafeEnvValue(CODEX_USER_AGENT_OVERRIDE_ENV, SAFE_HEADER_VALUE_PATTERN);
  if (override) {
    return override;
  }

  return `codex-cli/${getCodexClientVersion()} (${DEFAULT_CODEX_USER_AGENT_PLATFORM}; ${DEFAULT_CODEX_USER_AGENT_ARCH})`;
}

export function getCodexDefaultHeaders(): Record<string, string> {
  return {
    Version: getCodexClientVersion(),
    "Openai-Beta": "responses=experimental",
    "X-Codex-Beta-Features": "responses_websockets",
    "User-Agent": getCodexUserAgent(),
  };
}

export function normalizeCodexSessionId(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return SAFE_CODEX_SESSION_ID_PATTERN.test(normalized) ? normalized : null;
}
