import type { RegistryEntry } from "../../shared.ts";

export const cozeProvider: RegistryEntry = {
  id: "coze",
  alias: "coze",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.coze.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "claude-3-7-sonnet-20250514", name: "Claude 3.7 Sonnet" }],
};
