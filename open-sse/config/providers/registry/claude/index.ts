import type { RegistryEntry } from "../../shared.ts";
import {
  getClaudeCliHeaders,
  mapStainlessOs,
  mapStainlessArch,
  ANTHROPIC_BETA_CLAUDE_OAUTH,
  ANTHROPIC_VERSION_HEADER,
  CLAUDE_CLI_STAINLESS_PACKAGE_VERSION,
  CLAUDE_CLI_STAINLESS_RUNTIME_VERSION,
  CLAUDE_CLI_USER_AGENT,
  resolvePublicCred,
} from "../../shared.ts";

export const claudeProvider: RegistryEntry = {
  id: "claude",
  alias: "cc",
  format: "claude",
  executor: "default",
  baseUrl: "https://api.anthropic.com/v1/messages",
  urlSuffix: "?beta=true",
  authType: "oauth",
  authHeader: "x-api-key",
  defaultContextLength: 200000,
  headers: getClaudeCliHeaders(),
  oauth: {
    clientIdEnv: "CLAUDE_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("claude_id"),
    tokenUrl: "https://api.anthropic.com/v1/oauth/token",
  },
  models: [
    {
      id: "claude-fable-5",
      name: "Claude Fable 5",
      contextLength: 1000000,
      maxOutputTokens: 128000,
      // Opus 4.7+/Fable 5 reject non-default temperature/top_p/top_k with a 400 (sampling
      // is fixed; reasoning is steered by output_config.effort). Strip them before dispatch.
      unsupportedParams: ["temperature", "top_p", "top_k"],
    },
    {
      id: "claude-opus-4-8",
      name: "Claude Opus 4.8",
      contextLength: 1000000,
      maxOutputTokens: 128000,
      unsupportedParams: ["temperature", "top_p", "top_k"],
    },
    {
      id: "claude-opus-4-7",
      name: "Claude Opus 4.7",
      contextLength: 1000000,
      maxOutputTokens: 128000,
      unsupportedParams: ["temperature", "top_p", "top_k"],
    },
    {
      id: "claude-opus-4-6",
      name: "Claude Opus 4.6",
      supportsXHighEffort: false,
      contextLength: 1000000,
      maxOutputTokens: 128000,
    },
    {
      id: "claude-opus-4-5-20251101",
      name: "Claude Opus 4.5",
      supportsXHighEffort: false,
      contextLength: 200000,
      maxOutputTokens: 64000,
    },
    {
      id: "claude-sonnet-5",
      name: "Claude Sonnet 5",
      contextLength: 1000000,
      maxOutputTokens: 128000,
      // Sonnet 5 is the first Sonnet-tier model to support xhigh effort — do NOT copy
      // the `supportsXHighEffort: false` from the older claude-sonnet-4-6/4-5 entries.
      supportsXHighEffort: true,
      // Sonnet 5 rejects non-default temperature/top_p/top_k with a 400 (adaptive-only;
      // reasoning steered by output_config.effort). Mirrors the Opus/Fable entries.
      unsupportedParams: ["temperature", "top_p", "top_k"],
    },
    {
      id: "claude-sonnet-4-6",
      name: "Claude 4.6 Sonnet",
      supportsXHighEffort: false,
      contextLength: 200000,
      maxOutputTokens: 64000,
    },
    {
      id: "claude-sonnet-4-5-20250929",
      name: "Claude 4.5 Sonnet",
      supportsXHighEffort: false,
      contextLength: 200000,
      maxOutputTokens: 64000,
    },
    {
      id: "claude-haiku-4-5-20251001",
      name: "Claude 4.5 Haiku",
      supportsXHighEffort: false,
      contextLength: 200000,
      maxOutputTokens: 64000,
    },
  ],
};
