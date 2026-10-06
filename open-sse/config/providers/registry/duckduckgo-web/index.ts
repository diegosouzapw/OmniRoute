import type { RegistryEntry } from "../../shared.ts";

export const duckduckgo_webProvider: RegistryEntry = {
  id: "duckduckgo-web",
  alias: "ddgw",
  format: "openai",
  executor: "duckduckgo-web",
  baseUrl: "https://duck.ai/duckchat/v1/chat",
  authType: "none",
  authHeader: "none",
  poolConfig: {
    minSessions: 2,
    maxSessions: 5,
    cooldownBase: 1000,
    cooldownMax: 10000,
    cooldownJitter: 500,
    requestTimeout: 30000,
    requestJitter: 50,
  },
  // #8000: current Duck.ai free lineup — wire ids per duckchat/v1/models (2026-08-26):
  // gpt-5.4-nano was retired upstream and gpt-5.6-luna joined the free tier.
  models: [
    { id: "gpt-5.4-mini", name: "GPT-5.4 Mini", toolCalling: false },
    { id: "gpt-5.6-luna", name: "GPT-5.6 Luna", toolCalling: false },
    { id: "claude-haiku-4-5", name: "Claude Haiku 4.5", toolCalling: false },
    { id: "mistral-small-2603", name: "Mistral Small 4", toolCalling: false },
    { id: "tinfoil/gpt-oss-120b", name: "gpt-oss 120B", toolCalling: false },
    { id: "tinfoil/gemma4-31b", name: "Gemma 4 31B", toolCalling: false },
  ],
};
