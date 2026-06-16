import type { RegistryEntry } from "../../shared.ts";

export const monsterapiProvider: RegistryEntry = {
  id: "monsterapi",
  alias: "monster",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.monsterapi.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "llama-3-8b-fuse", name: "Llama 3 8B Fuse" }],
};
