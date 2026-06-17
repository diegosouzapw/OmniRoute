import type { RegistryEntry } from "../../shared.ts";

export const llm7Provider: RegistryEntry = {
  id: "llm7",
  alias: "l7",
  format: "openai",
  executor: "llm7",
  baseUrl: "https://api.llm7.io/v1/chat/completions",
  authType: "none",
  models: [
    { id: "gpt-4o", name: "GPT-4o (via llm7.ai)" },
    { id: "mistral-small-3.2", name: "Mistral Small (via llm7.ai)" },
  ],
};
