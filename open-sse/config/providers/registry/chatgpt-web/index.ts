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
    { id: "gpt-5.5-pro", name: "GPT-5.5 Pro" }, //pro tier only
    { id: "gpt-5.5-thinking", name: "GPT-5.5 Thinking" }, //plus, pro tier
    { id: "gpt-5.5", name: "GPT-5.5 Instant" }, //free, plus, pro tier
    { id: "gpt-5.4-pro", name: "GPT-5.4 Pro" }, //pro tier only
    { id: "gpt-5.4-thinking", name: "GPT-5.4 Thinking" }, //plus, pro tier
    { id: "gpt-5.4-thinking-mini", name: "GPT-5.4 Thinking Mini" }, //free-login only
    { id: "gpt-5.3", name: "GPT-5.3 Instant" }, //free, free-login, plus, pro tier
    { id: "gpt-5.3-mini", name: "GPT-5.3 Mini" }, //limit fallback
    { id: "gpt-5.2-pro", name: "GPT-5.2 Pro" }, //pro tier only
    { id: "gpt-5.2-thinking", name: "GPT-5.2 Thinking" }, //plus ~ tier
    { id: "gpt-5.2-instant", name: "GPT-5.2 Instant" }, //plus ~ tier
    { id: "o3", name: "o3" }, //plus ~ tier
    { id: "gpt-4-5", name: "GPT-4.5" }, //pro tier only
  ],
};
