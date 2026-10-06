import type { RegistryEntry } from "../../shared.ts";

// g4f.space/api/ollama — optional-auth hosted Ollama gateway (gpt4free, issue #6650).
// Anonymous requests require proof-of-work cake credits; a member API key is the
// alternative. This remote OpenAI-compatible proxy is distinct from local/cloud/search.
export const g4f_ollamaProvider: RegistryEntry = {
  id: "g4f-ollama",
  alias: "g4foll",
  format: "openai",
  executor: "default",
  baseUrl: "https://g4f.space/api/ollama/v1/chat/completions",
  modelsUrl: "https://g4f.space/api/ollama/v1/models",
  authType: "optional",
  authHeader: "bearer",
  passthroughModels: true,
  models: [{ id: "gemma3:4b", name: "Gemma 3 4B (g4f/Ollama)" }],
};
