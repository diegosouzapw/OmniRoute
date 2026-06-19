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
    { id: "adapta-one", name: "Adapta ONE (Auto)" },
    { id: "adapta-gpt", name: "GPT-5 (via Adapta)" },
    { id: "adapta-claude", name: "Claude Sonnet 4.6 (via Adapta)" },
    { id: "adapta-gemini", name: "Gemini 2.5 Pro (via Adapta)" },
    { id: "adapta-grok", name: "Grok 4 (via Adapta)" },
    { id: "adapta-deepseek", name: "DeepSeek R2 (via Adapta)" },
    { id: "adapta-llama", name: "Llama 4 (via Adapta)" },
  ],
};
