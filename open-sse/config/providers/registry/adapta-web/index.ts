import type { RegistryEntry } from "../../shared.ts";

export const adapta_webProvider: RegistryEntry = {
  id: "adapta-web",
  alias: "adp-web",
  format: "openai",
  executor: "adapta-web",
  baseUrl: "https://agent.adapta.one/api/chat/stream/v1",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "adapta-one", name: "Adapta ONE (Auto)", toolCalling: false },
    { id: "adapta-gpt", name: "GPT-5 (via Adapta)", toolCalling: false },
    { id: "adapta-claude", name: "Claude Sonnet 4.6 (via Adapta)", toolCalling: false },
    { id: "adapta-gemini", name: "Gemini 2.5 Pro (via Adapta)", toolCalling: false },
    { id: "adapta-grok", name: "Grok 4 (via Adapta)", toolCalling: false },
    { id: "adapta-deepseek", name: "DeepSeek R2 (via Adapta)", toolCalling: false },
    { id: "adapta-llama", name: "Llama 4 (via Adapta)", toolCalling: false },
  ],
};
