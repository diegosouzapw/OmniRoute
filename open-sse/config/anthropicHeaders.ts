export const ANTHROPIC_VERSION_HEADER = "2023-06-01";

const ANTHROPIC_BETA_BASE = Object.freeze([
  "claude-code-20250219",
  "oauth-2025-04-20",
  "interleaved-thinking-2025-05-14",
  "context-management-2025-06-27",
  "prompt-caching-scope-2026-01-05",
  "advanced-tool-use-2025-11-20",
  "effort-2025-11-24",
  "structured-outputs-2025-12-15",
  "fast-mode-2026-02-01",
  "redact-thinking-2026-02-12",
  "token-efficient-tools-2026-03-28",
]);

const CLAUDE_OAUTH_EXTRA_BETAS = Object.freeze(["fine-grained-tool-streaming-2025-05-14"]);

export const ANTHROPIC_BETA_FULL = ANTHROPIC_BETA_BASE.join(",");
export const ANTHROPIC_BETA_API_KEY = ANTHROPIC_BETA_BASE.filter(
  (beta) => beta !== "oauth-2025-04-20"
).join(",");
export const ANTHROPIC_BETA_CLAUDE_OAUTH = [
  ...ANTHROPIC_BETA_BASE.slice(0, 3),
  ...CLAUDE_OAUTH_EXTRA_BETAS,
  ...ANTHROPIC_BETA_BASE.slice(3),
].join(",");

export const CLAUDE_CLI_VERSION = "2.1.121";
export const CLAUDE_CLI_USER_AGENT = `claude-cli/${CLAUDE_CLI_VERSION} (external, cli)`;
export const CLAUDE_CLI_STAINLESS_PACKAGE_VERSION = "0.81.0";
export const CLAUDE_CLI_STAINLESS_RUNTIME_VERSION = "v24.3.0";
