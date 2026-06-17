import type { RegistryEntry } from "../../shared.ts";

export const character_webProvider: RegistryEntry = {
  id: "character-web",
  alias: "cai",
  format: "openai",
  executor: "character-web",
  baseUrl: "https://neo.character.ai/chat",
  authType: "apikey",
  authHeader: "cookie",
  models: [{ id: "character-default", name: "Character.ai Default" }],
};
