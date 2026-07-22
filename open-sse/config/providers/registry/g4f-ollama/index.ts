import type { RegistryEntry } from "../../shared.ts";

// g4f.space/api/ollama — no-key hosted Ollama gateway (gpt4free project, issue #6650).
// Fills a niche none of the existing ollama-* entries cover (local/cloud/search) —
// this is a no-key *hosted* Ollama proxy. Same OpenAI-compatible shape as the other
// no-key gateways.
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
