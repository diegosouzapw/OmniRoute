import type { RegistryEntry } from "../../shared.ts";

// OpenAdapter (#4239) — subscription LLM gateway exposing 70+ open-source SOTA
// models through one OpenAI-compatible endpoint. API lives on `.in` (the `.dev`
// domain is marketing only). Standard named OpenAI-style provider, zenmux shape.
//
// Seed list is a fallback ONLY — the provider is in NAMED_OPENAI_STYLE_PROVIDERS
// so `/models` serves the live upstream catalog and falls back here on error.
// `glm-4.7` is the single model id cited in OpenAdapter's public docs
// (https://docs.openadapter.dev). Base path confirmed live (returns a 401
// OpenAI-style error body). Full upstream model-id list pending a live key.
export const openadapterProvider: RegistryEntry = {
  id: "openadapter",
  alias: "oad",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.openadapter.in/v1/chat/completions",
  modelsUrl: "https://api.openadapter.in/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  models: [
    { id: "glm-4.7", name: "GLM 4.7 (OpenAdapter)", contextLength: 128000, toolCalling: true },
  ],
};
