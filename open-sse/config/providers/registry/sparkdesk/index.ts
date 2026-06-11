import type { RegistryEntry } from "../../shared.ts";

export const sparkdeskProvider: RegistryEntry = {
  id: "sparkdesk",
  alias: "sparkdesk",
  format: "openai",
  executor: "default",
  baseUrl: "https://spark-api.xf-yun.com/v3.1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "general", name: "General" }],
};
