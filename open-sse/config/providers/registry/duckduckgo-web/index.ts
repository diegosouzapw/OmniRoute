import type { RegistryEntry } from "../../shared.ts";

export const duckduckgo_webProvider: RegistryEntry = {
  id: "duckduckgo-web",
  alias: "ddgw",
  format: "openai",
  executor: "duckduckgo-web",
  baseUrl: "https://duckduckgo.com/duckchat/v1/chat",
  authType: "none",
  authHeader: "none",
  models: [
    { id: "gpt-4o-mini", name: "GPT-4o Mini" },
    { id: "gpt-5-mini", name: "GPT-5 Mini" },
    { id: "claude-3-5-haiku-20241022", name: "Claude 3.5 Haiku" },
    { id: "llama-4-scout", name: "Llama 4 Scout" },
    { id: "mistral-small-2501", name: "Mistral Small" },
    { id: "o3-mini", name: "O3 Mini" },
  ],
};
