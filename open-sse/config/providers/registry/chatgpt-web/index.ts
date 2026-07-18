import type { RegistryEntry } from "../../shared.ts";

export const chatgpt_webProvider: RegistryEntry = {
  id: "chatgpt-web",
  alias: "cgpt-web",
  format: "openai",
  executor: "chatgpt-web",
  baseUrl: "https://chatgpt.com/backend-api/conversation",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    { id: "gpt-5.6-pro", name: "GPT-5.6 Pro" }, // pro tier only, standard effort
    { id: "gpt-5.6-thinking", name: "GPT-5.6 Thinking" }, // plus, pro tier
    { id: "gpt-5.5-pro-extended", name: "GPT-5.5 Pro Extended" }, // pro tier only, extended effort
    { id: "gpt-5.5-pro", name: "GPT-5.5 Pro" }, // pro tier only, standard effort
    { id: "gpt-5.5-thinking", name: "GPT-5.5 Thinking" }, // plus, pro tier
    { id: "gpt-5.5", name: "GPT-5.5 Instant" }, // free, plus, pro tier
    { id: "o3", name: "o3" }, // plus ~ tier
  ],
};
