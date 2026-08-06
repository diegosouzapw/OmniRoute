import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const helixmindProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "helixmind",
  alias: "helixmind",
  baseUrl: "https://helixmind.online/v1/chat/completions",
  modelsUrl: "https://helixmind.online/v1/models",
  responsesBaseUrl: "https://helixmind.online/v1/responses",
  models: [],
  passthroughModels: true,
  alternateFormats: [
    {
      format: "claude",
      baseUrl: "https://helixmind.online/v1/messages",
      authHeader: "x-api-key",
      label: "Anthropic-compatible",
    },
    {
      format: "openai-responses",
      baseUrl: "https://helixmind.online/v1/responses",
      authHeader: "bearer",
      label: "OpenAI Responses",
    },
  ],
});
