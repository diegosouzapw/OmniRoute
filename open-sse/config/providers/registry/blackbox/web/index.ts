import type { RegistryEntry } from "../../../shared.ts";

export const blackbox_webProvider: RegistryEntry = {
  id: "blackbox-web",
  alias: "bb-web",
  format: "openai",
  executor: "blackbox-web",
  baseUrl: "https://app.blackbox.ai/api/chat",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    { id: "gpt-4-turbo", name: "GPT-4 Turbo", toolCalling: false },
    { id: "gpt-4", name: "GPT-4", toolCalling: false },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", toolCalling: false },
    { id: "claude-3-opus", name: "Claude 3 Opus", toolCalling: false },
    { id: "claude-3-sonnet", name: "Claude 3 Sonnet", toolCalling: false },
    { id: "gemini-pro", name: "Gemini Pro", toolCalling: false },
  ],
};
