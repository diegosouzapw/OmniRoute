import type { RegistryEntry } from "../../shared.ts";

export const haiperProvider: RegistryEntry = {
  id: "haiper",
  alias: "hp",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.haiper.ai/v1",
  authType: "apikey",
  authHeader: "HAIPER_KEY",
  models: [
    { id: "gen2", name: "Gen 2 Video" },
    { id: "gen2-image", name: "Gen 2 Image" },
  ],
};
