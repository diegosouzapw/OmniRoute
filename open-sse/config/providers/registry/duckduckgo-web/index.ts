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
    { id: "gpt-4o-mini", name: "GPT-4o Mini", toolCalling: false },
    { id: "gpt-5-mini", name: "GPT-5 Mini", toolCalling: false },
    { id: "claude-3-5-haiku-20241022", name: "Claude 3.5 Haiku", toolCalling: false },
    { id: "llama-4-scout", name: "Llama 4 Scout", toolCalling: false },
    { id: "mistral-small-2501", name: "Mistral Small", toolCalling: false },
    { id: "o3-mini", name: "O3 Mini", toolCalling: false },
  ],
};
