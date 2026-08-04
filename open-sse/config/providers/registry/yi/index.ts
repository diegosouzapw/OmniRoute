import type { RegistryEntry } from "../../shared.ts";

export const yiProvider: RegistryEntry = {
  id: "yi",
  alias: "yi",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.lingyiwanwu.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "yi-large", name: "Yi Large" }],
};
