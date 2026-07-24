/**
 * Wire-version data captured from the signed Claude Code binary.
 *
 * Keep this leaf dependency-free so server executors, compatibility bridges,
 * and client-facing identity presets can share one source of truth.
 */
export const CLAUDE_CODE_CLIENT_VERSION = "2.1.219";
export const CLAUDE_CODE_CLIENT_BUILD_REVISION = "250";
export const CLAUDE_CODE_CLIENT_BILLING_VERSION = `${CLAUDE_CODE_CLIENT_VERSION}.${CLAUDE_CODE_CLIENT_BUILD_REVISION}`;
export const CLAUDE_CODE_SDK_PACKAGE_VERSION = "0.94.0";
export const CLAUDE_CODE_RUNTIME_VERSION = "v26.3.0";

export type ClaudeCodeEntrypoint = "cli" | "sdk-cli";

export function getClaudeCodeUserAgent(entrypoint: ClaudeCodeEntrypoint): string {
  return `claude-cli/${CLAUDE_CODE_CLIENT_VERSION} (external, ${entrypoint})`;
}
