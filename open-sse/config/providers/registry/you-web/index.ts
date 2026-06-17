import type { RegistryEntry } from "../../shared.ts";

export const you_webProvider: RegistryEntry = {
  id: "you-web",
  alias: "yw",
  format: "openai",
  executor: "you-web",
  baseUrl: "https://you.com/api/streamingSearch",
  authType: "apikey",
  authHeader: "cookie",
  passthroughModels: true,
  models: [
    { id: "you-gpt4o", name: "You GPT-4o" },
    { id: "you-claude-3-5-sonnet", name: "You Claude 3.5 Sonnet" },
    { id: "you-command-r-plus", name: "You Command R+" },
  ],
};
