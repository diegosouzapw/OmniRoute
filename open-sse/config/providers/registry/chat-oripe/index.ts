import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

// The upstream brand and hostname are ambiguous, so avoid unverified quota claims.
export const chatOripeProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "chat-oripe",
  alias: "chat-oripe",
  baseUrl: "https://api.oriper.com/v1/chat/completions",
  modelsUrl: "https://api.oriper.com/v1/models",
  models: [],
  passthroughModels: true,
});
