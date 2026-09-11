/**
 * Wire-version data captured from the signed Claude Code binary.
 *
 * Keep this leaf dependency-free so server executors, compatibility bridges,
 * and client-facing identity presets can share one source of truth.
 *
 * `CLAUDE_CODE_CLIENT_VERSION` is the captured pin. Runtime callers that
 * advertise the version on the wire must go through getClaudeCodeClientVersion()
 * so operators can bump past Anthropic's model gate without a rebuild (#12417).
 */
export const CLAUDE_CODE_CLIENT_VERSION = "2.1.258";
export const CLAUDE_CODE_CLIENT_BUILD_REVISION = "1e2";
export const CLAUDE_CODE_CLIENT_BILLING_VERSION = `${CLAUDE_CODE_CLIENT_VERSION}.${CLAUDE_CODE_CLIENT_BUILD_REVISION}`;
export const CLAUDE_CODE_SDK_PACKAGE_VERSION = "0.112.1";
export const CLAUDE_CODE_RUNTIME_VERSION = "v26.3.0";

export type ClaudeCodeEntrypoint = "cli" | "sdk-cli";

const CLAUDE_VERSION_OVERRIDE_ENV = "CLAUDE_CODE_CLIENT_VERSION";
const SAFE_HEADER_TOKEN_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,31}$/;

function getSafeEnvValue(name: string, pattern: RegExp): string | null {
  const raw = typeof process === "undefined" ? undefined : process.env?.[name];
  if (typeof raw !== "string") return null;
  const normalized = raw.trim();
  if (!normalized || !pattern.test(normalized)) {
    return null;
  }
  return normalized;
}

export function getClaudeCodeClientVersion(): string {
  return getSafeEnvValue(CLAUDE_VERSION_OVERRIDE_ENV, SAFE_HEADER_TOKEN_PATTERN) || CLAUDE_CODE_CLIENT_VERSION;
}

export function getClaudeCodeClientBillingVersion(): string {
  return `${getClaudeCodeClientVersion()}.${CLAUDE_CODE_CLIENT_BUILD_REVISION}`;
}

export function getClaudeCodeUserAgent(entrypoint: ClaudeCodeEntrypoint): string {
  return `claude-cli/${getClaudeCodeClientVersion()} (external, ${entrypoint})`;
}
