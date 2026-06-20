import type { RegistryEntry } from "../../shared.ts";

// dit.ai (#4155) — "Distributed Intelligence Trade", an OpenAI-compatible
// router/gateway with dynamic per-request pricing (a marketplace where provider
// channels bid and the cheapest qualified one wins). Standard named OpenAI-style
// provider, zenmux shape. No public free tier.
//
// Seed list is a fallback ONLY — the provider is in NAMED_OPENAI_STYLE_PROVIDERS
// so `/models` serves the live upstream catalog and falls back here on error.
// `gpt-5.4` / `claude-sonnet-4-6` are the example ids cited in dit.ai's dashboard
// docs. Base path confirmed live (returns a 401 OpenAI-style error body). Full
// upstream model-id list pending a live key.
export const ditProvider: RegistryEntry = {
  id: "dit",
  alias: "dai",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.dit.ai/v1/chat/completions",
  modelsUrl: "https://api.dit.ai/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 200000,
  models: [
    {
      id: "gpt-5.4",
      name: "GPT-5.4 (DIT.ai)",
      contextLength: 400000,
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "claude-sonnet-4-6",
      name: "Claude Sonnet 4.6 (DIT.ai)",
      contextLength: 200000,
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
    },
  ],
};
