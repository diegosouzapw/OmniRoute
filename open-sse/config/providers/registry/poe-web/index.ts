import type { RegistryEntry } from "../../shared.ts";

export const poe_webProvider: RegistryEntry = {
  id: "poe-web",
  alias: "poe",
  format: "openai",
  executor: "poe-web",
  baseUrl: "https://poe.com",
  models: [
    { id: "gpt-4o", name: "GPT-4o" },
    { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet" },
  ],
  defaultModel: "gpt-4o",
  auth: "cookie",
};
