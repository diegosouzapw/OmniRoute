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
    { id: "claude-fable-5", name: "Claude Fable 5 (web)", toolCalling: false },
    { id: "claude-opus-4-8", name: "Claude Opus 4.8 (web)", toolCalling: false },
    { id: "claude-opus-4-7", name: "Claude Opus 4.7 (web)", toolCalling: false },
    { id: "claude-opus-4-6", name: "Claude Opus 4.6 (web)", toolCalling: false },
    { id: "claude-sonnet-5", name: "Claude Sonnet 5 (web)", toolCalling: false },
    { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6 (web)", toolCalling: false },
    {
      id: "claude-haiku-4-5-20251001",
      name: "Claude Haiku 4.5 (web)",
      toolCalling: false,
    },
  ],
};
