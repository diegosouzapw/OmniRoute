/**
 * @file index.ts
 * @description Raycast Pro AI provider registry entry (reverse-engineered, unofficial API).
 *
 * @changes
 * - [2026-07-28] [Composer] - Initial Raycast provider registry module
 */

import type { RegistryEntry } from "../../shared.ts";

/** Seed catalog — full list synced from Raycast /api/v1/ai/models on connect/import. */
export const raycastProvider: RegistryEntry = {
  id: "raycast",
  alias: "rc",
  format: "openai",
  executor: "raycast",
  baseUrl: "https://backend.raycast.com/api/v1/ai",
  authType: "oauth",
  authHeader: "bearer",
  defaultContextLength: 128000,
  models: [
    { id: "openai-gpt-5-mini", name: "GPT-5 Mini" },
    { id: "openai-gpt-4o-mini", name: "GPT-4o Mini" },
    { id: "anthropic-claude-sonnet-4-6", name: "Claude Sonnet 4.6" },
    { id: "google-gemini-2.5-flash", name: "Gemini 2.5 Flash" },
    { id: "raycast-ray1", name: "Ray1" },
    { id: "raycast-ray1-mini", name: "Ray1 Mini" },
    { id: "perplexity-sonar", name: "Sonar" },
    { id: "perplexity-sonar-pro", name: "Sonar Pro" },
    { id: "mistral-open-mistral-nemo", name: "Mistral Nemo" },
    { id: "xai-grok-3-mini", name: "Grok 3 Mini" },
  ],
};
