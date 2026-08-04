import type { RegistryEntry } from "../../shared.ts";

// Poe (creator.poe.com) — OpenAI-compatible chat/responses gateway. #8082: the
// built-in `poe` provider (NAMED_OPENAI_STYLE_PROVIDERS, passthroughModels:true)
// had no REGISTRY entry, so model discovery's `getRegistryEntry("poe")?.baseUrl`
// resolved to undefined and every request failed with "No base URL configured
// for provider" even though credentials/inference worked fine. This base URL is
// the single source of truth other Poe code paths should read from (see
// src/lib/providers/validation/audioMiscProviders.ts::validatePoeProvider).
export const POE_DEFAULT_BASE_URL = "https://api.poe.com/v1";

export const poeProvider: RegistryEntry = {
  id: "poe",
  alias: "poe",
  format: "openai",
  executor: "default",
  baseUrl: `${POE_DEFAULT_BASE_URL}/chat/completions`,
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "gpt-5.2", name: "GPT-5.2" },
    { id: "claude-opus-4.8", name: "Claude Opus 4.8" },
    { id: "gemini-3.0-pro", name: "Gemini 3.0 Pro" },
  ],
};
