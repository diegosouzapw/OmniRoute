import type { RegistryEntry } from "../../../shared.ts";

export const claude_webProvider: RegistryEntry = {
  id: "claude-web",
  alias: "cw",
  format: "openai",
  executor: "claude-web",
  baseUrl: "https://claude.ai/api/organizations",
  authType: "apikey",
  authHeader: "cookie",
  models: [
    { id: "claude-sonnet-5", name: "Claude 5 Sonnet (web)", toolCalling: false },
    { id: "claude-sonnet-4-6", name: "Claude 4.6 Sonnet (web)", toolCalling: false },
    { id: "claude-haiku-4-5", name: "Claude 4.5 Haiku (web)", toolCalling: false },
  ],
};
