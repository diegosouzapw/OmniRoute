import type { RegistryEntry } from "../../shared.ts";

export const monsterapiProvider: RegistryEntry = {
  id: "monsterapi",
  alias: "monster",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.monsterapi.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // Sweep 2026-06-19: + current served Llama tiers (developer.monsterapi.ai).
  models: [
    { id: "meta-llama/Meta-Llama-3.1-8B-Instruct", name: "Llama 3.1 8B Instruct" },
    { id: "meta-llama/Llama-3.3-70B-Instruct", name: "Llama 3.3 70B Instruct" },
    { id: "llama-3-8b-fuse", name: "Llama 3 8B Fuse" },
  ],
};
