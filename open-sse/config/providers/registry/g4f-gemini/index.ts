import type { RegistryEntry } from "../../shared.ts";

// g4f.space/api/gemini — no-key reverse proxy to Gemini (gpt4free project, issue #6650).
// Distinct auth mechanism from the existing gemini-web (browser cookie): this is a
// plain no-key HTTP proxy. Same OpenAI-compatible shape as the other no-key gateways.
export const g4f_geminiProvider: RegistryEntry = {
  id: "g4f-gemini",
  alias: "g4fgem",
  format: "openai",
  executor: "default",
  baseUrl: "https://g4f.space/api/gemini/v1/chat/completions",
  modelsUrl: "https://g4f.space/api/gemini/v1/models",
  authType: "optional",
  authHeader: "bearer",
  passthroughModels: true,
  models: [
    { id: "models/gemini-2.5-flash", name: "Gemini 2.5 Flash (g4f)" },
    { id: "models/gemini-2.5-pro", name: "Gemini 2.5 Pro (g4f)" },
  ],
};
