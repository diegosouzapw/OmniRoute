import type { RegistryEntry } from "../../shared.ts";

// g4f.space/api/gemini — optional-auth remote Gemini gateway (gpt4free, issue #6650).
// Unlike gemini-web's browser cookie, anonymous requests use proof-of-work cake credits;
// a member API key is the alternative. The wire format is standard OpenAI-compatible HTTP.
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
