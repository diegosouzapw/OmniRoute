import type { RegistryEntry } from "../../shared.ts";

// ChatAnywhere (api.chatanywhere.tech) — OpenAI-compatible gateway from the
// chatanywhere/GPT_API_free project (~38.7k GitHub stars). Requires GitHub-account-
// gated API key. Free tier is for personal non-commercial use only.
export const chatanywhereProvider: RegistryEntry = {
  id: "chatanywhere",
  alias: "chtany",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.chatanywhere.tech/v1/chat/completions",
  modelsUrl: "https://api.chatanywhere.tech/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  passthroughModels: true,
  models: [],
};