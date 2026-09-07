import type { RegistryEntry } from "../../shared.ts";
import { ANTHROPIC_BETA_API_KEY, ANTHROPIC_VERSION_HEADER } from "../../shared.ts";

export const anthropicProvider: RegistryEntry = {
  id: "anthropic",
  alias: "anthropic",
  format: "claude",
  executor: "default",
  baseUrl: "https://api.anthropic.com/v1/messages",
  urlSuffix: "?beta=true",
  authType: "apikey",
  authHeader: "x-api-key",
  defaultContextLength: 200000,
  headers: {
    "Anthropic-Version": ANTHROPIC_VERSION_HEADER,
    "Anthropic-Beta": ANTHROPIC_BETA_API_KEY,
  },
  models: [
    {
      id: "claude-fable-5-1",
      name: "Claude Fable 5.1",
      contextLength: 1000000,
      maxOutputTokens: 128000,
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "medium", "high", "xhigh", "max"],
      supportsXHighEffort: true,
      supportsVision: true,
      unsupportedParams: ["temperature", "top_p", "top_k"],
    },
    {
      id: "claude-fable-5",
      name: "Claude Fable 5",
      contextLength: 1048576,
      unsupportedParams: ["temperature", "top_p", "top_k"],
    },
    {
      id: "claude-opus-5",
      name: "Claude Opus 5",
      contextLength: 1000000,
      maxOutputTokens: 128000,
      supportsXHighEffort: true,
      unsupportedParams: ["temperature", "top_p", "top_k"],
    },

    {
      id: "claude-sonnet-5",
      name: "Claude Sonnet 5",
      contextLength: 1048576,
      // Sonnet 5 rejects non-default sampling params with a 400 (adaptive-only).
      unsupportedParams: ["temperature", "top_p", "top_k"],
    },

    { id: "claude-haiku-4.5", name: "Claude Haiku 4.5" },
  ],
};
