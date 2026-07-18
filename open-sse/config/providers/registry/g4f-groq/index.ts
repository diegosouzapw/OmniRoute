import type { RegistryEntry } from "../../shared.ts";

// g4f.space/api/groq — no-key reverse proxy to Groq (gpt4free project, issue #6650).
// Same OpenAI-compatible shape as the other no-key gateways (hackclub, uncloseai):
// standard chat/completions + /v1/models discovery, no custom executor/translator.
export const g4f_groqProvider: RegistryEntry = {
  id: "g4f-groq",
  alias: "g4fgroq",
  format: "openai",
  executor: "default",
  baseUrl: "https://g4f.space/api/groq/v1/chat/completions",
  modelsUrl: "https://g4f.space/api/groq/v1/models",
  authType: "optional",
  authHeader: "bearer",
  passthroughModels: true,
  models: [
    { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B (g4f/Groq)" },
    { id: "llama-3.1-8b-instant", name: "Llama 3.1 8B Instant (g4f/Groq)" },
  ],
};
