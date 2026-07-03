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
      id: "claude-opus-4.7",
      name: "Claude Opus 4.7",
      // Opus 4.7+ rejects non-default temperature/top_p/top_k with a 400 (sampling fixed;
      // reasoning via output_config.effort). Mirrors the dashed `claude` registry ids.
      unsupportedParams: ["temperature", "top_p", "top_k"],
    },
    {
      id: "claude-opus-4.8",
      name: "Claude Opus 4.8",
      contextLength: 1048576,
      // Opus 4.7+ (incl. 4.8, Fable 5) reject non-default sampling with a 400. Mirrors claude-opus-4.7.
      unsupportedParams: ["temperature", "top_p", "top_k"],
    },
    {
      id: "claude-fable-5",
      name: "Claude Fable 5",
      contextLength: 1048576,
      unsupportedParams: ["temperature", "top_p", "top_k"],
    },
    { id: "claude-opus-4.6", name: "Claude Opus 4.6" },
    { id: "claude-opus-4.5", name: "Claude Opus 4.5" },
    {
      id: "claude-sonnet-5",
      name: "Claude Sonnet 5",
      contextLength: 1048576,
      // Sonnet 5 rejects non-default sampling params with a 400 (adaptive-only).
      unsupportedParams: ["temperature", "top_p", "top_k"],
    },
    { id: "claude-sonnet-4.6", name: "Claude Sonnet 4.6" },
    { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.6" },
    { id: "claude-haiku-4.5", name: "Claude Haiku 4.5" },
  ],
};
