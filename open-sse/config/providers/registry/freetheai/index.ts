import type { RegistryEntry } from "../../shared.ts";

// FreeTheAi — OpenAI-compatible gateway with a free tier (issue #6670).
// Same shape as the chutes aggregator entries: standard OpenAI
// chat/completions + /v1/models discovery, so no custom executor/translator
// is needed.
//
// #15385: the gateway moved freetheai.xyz → freetheai.org (the .xyz host is
// dead) and signup moved off Discord. Model ids are namespaced per upstream
// group and MUST be sent in full — `fta/zai/glm-5.3`, not a bare `glm-5.3`.
export const freetheaiProvider: RegistryEntry = {
  id: "freetheai",
  alias: "fta",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.freetheai.org/v1/chat/completions",
  modelsUrl: "https://api.freetheai.org/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  passthroughModels: true,
  defaultContextLength: 128000,
  // Fallback only — `passthroughModels: true` makes the live /v1/models list
  // authoritative after the first sync. These are the upstream-documented ids;
  // the daily check-in (not this seed) is what actually unlocks them.
  models: [
    { id: "fta/zai/glm-5.3", name: "GLM 5.3 (zai)" },
    { id: "fta/kimi/k3", name: "Kimi K3" },
  ],
};
