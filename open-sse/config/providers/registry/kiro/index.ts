import type { RegistryEntry } from "../../shared.ts";
import { getKiroServiceHeaders } from "../../shared.ts";

export const kiroProvider: RegistryEntry = {
  id: "kiro",
  alias: "kr",
  format: "kiro",
  executor: "kiro",
  baseUrl: "https://codewhisperer.us-east-1.amazonaws.com/generateAssistantResponse",
  authType: "oauth",
  authHeader: "bearer",
  defaultContextLength: 200000,
  headers: getKiroServiceHeaders(),
  oauth: {
    tokenUrl: "https://prod.us-east-1.auth.desktop.kiro.dev/refreshToken",
    authUrl: "https://prod.us-east-1.auth.desktop.kiro.dev",
  },
  // Curated fallback used when account-scoped discovery is unavailable. The
  // management API remains authoritative for the models each account can use.
  models: [
    {
      id: "claude-opus-4.8",
      name: "Claude Opus 4.8",
      contextLength: 1000000,
    },
    {
      id: "claude-opus-4.7",
      name: "Claude Opus 4.7",
      contextLength: 1000000,
    },
    {
      id: "claude-opus-4.6",
      name: "Claude Opus 4.6",
      contextLength: 1000000,
    },
    {
      id: "claude-sonnet-5",
      name: "Claude Sonnet 5",
      contextLength: 1000000,
      maxOutputTokens: 128000,
    },
    {
      id: "claude-sonnet-4.6",
      name: "Claude Sonnet 4.6",
      contextLength: 1000000,
      maxOutputTokens: 64000,
    },
    {
      id: "claude-haiku-4.5",
      name: "Claude Haiku 4.5",
      contextLength: 200000,
      maxOutputTokens: 64000,
    },
    {
      id: "deepseek-3.2",
      name: "DeepSeek V3.2",
      contextLength: 128000,
    },
    { id: "glm-5", name: "GLM-5", contextLength: 200000 },
    { id: "minimax-m2.5", name: "MiniMax M2.5", contextLength: 200000 },
    { id: "minimax-m2.1", name: "MiniMax M2.1", contextLength: 200000 },
    { id: "qwen3-coder-next", name: "Qwen3 Coder Next", contextLength: 256000 },
    // Kiro's first OpenAI-family models (kiro.dev/changelog/models, 2026-07-14):
    // three tiers — Sol (flagship), Terra (balanced mid-tier), Luna (fastest/
    // cheapest) — all sharing the announced 272k context window.
    {
      id: "gpt-5.6-sol",
      name: "GPT-5.6 Sol",
      contextLength: 272000,
      maxOutputTokens: 128000,
    },
    {
      id: "gpt-5.6-terra",
      name: "GPT-5.6 Terra",
      contextLength: 272000,
      maxOutputTokens: 128000,
    },
    {
      id: "gpt-5.6-luna",
      name: "GPT-5.6 Luna",
      contextLength: 272000,
      maxOutputTokens: 128000,
    },
  ],
};
