import type { RegistryEntry } from "../../shared.ts";

// FreeTheAi — OpenAI-compatible gateway with a Discord-signup free tier
// (issue #6670). Same shape as the hackclub/chutes aggregator entries:
// standard OpenAI chat/completions + /v1/models discovery, so no custom
// executor/translator is needed.
export const freetheaiProvider: RegistryEntry = {
  id: "freetheai",
  alias: "fta",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.freetheai.xyz/v1/chat/completions",
  modelsUrl: "https://api.freetheai.xyz/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  passthroughModels: true,
  defaultContextLength: 128000,
  models: [
    { id: "gpt-4o-mini", name: "GPT-4o Mini" },
    { id: "llama-3.3-70b-instruct", name: "Llama 3.3 70B" },
    { id: "deepseek-chat", name: "DeepSeek Chat" },
  ],
};
