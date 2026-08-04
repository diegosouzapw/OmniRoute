import type { RegistryEntry } from "../../shared.ts";

export const duckduckgo_webProvider: RegistryEntry = {
  id: "duckduckgo-web",
  alias: "ddgw",
  format: "openai",
  executor: "duckduckgo-web",
  baseUrl: "https://duckduckgo.com/duckchat/v1/chat",
  authType: "none",
  authHeader: "none",
  // #8000: current Duck.ai free lineup — wire ids per duckchat/v1/models (2026-07-22).
  models: [
    { id: "gpt-5.4-mini", name: "GPT-5.4 Mini", toolCalling: false },
    { id: "gpt-5.4-nano", name: "GPT-5.4 Nano", toolCalling: false },
    { id: "claude-haiku-4-5", name: "Claude Haiku 4.5", toolCalling: false },
    { id: "mistral-small-2603", name: "Mistral Small 4", toolCalling: false },
    { id: "tinfoil/gpt-oss-120b", name: "gpt-oss 120B", toolCalling: false },
    { id: "tinfoil/gemma4-31b", name: "Gemma 4 31B", toolCalling: false },
  ],
};
