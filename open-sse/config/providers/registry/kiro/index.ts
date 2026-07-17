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
  // Model IDs must match Kiro's real upstream catalog exactly — an unknown id
  // makes Kiro return `400 "Invalid model. Please select a different model"`.
  // Fabricated ids (auto-kiro, claude-opus-4.x, claude-fable-5, claude-sonnet-4.6)
  // were removed after live VPS validation: Kiro offers no Opus/Fable, its Sonnet
  // is 4.5 (not 4.6), and there is no "auto" model id (it was sent verbatim and
  // 400'd). claude-sonnet-5 is a real Kiro model but plan-gated per account —
  // kept so entitled accounts can use it. See kiro cluster #6112/#6113/#6099.
  models: [
    {
      id: "claude-sonnet-5",
      name: "Claude Sonnet 5",
      contextLength: 1000000,
      maxOutputTokens: 128000,
    },
    {
      id: "claude-sonnet-4.5",
      name: "Claude Sonnet 4.5",
      contextLength: 200000,
      maxOutputTokens: 64000,
    },
    {
      id: "claude-haiku-4.5",
      name: "Claude Haiku 4.5",
      contextLength: 200000,
      maxOutputTokens: 64000,
    },
    { id: "deepseek-3.2", name: "DeepSeek V3.2" },
    { id: "minimax-m2.5", name: "MiniMax M2.5" },
    { id: "minimax-m2.1", name: "MiniMax M2.1" },
    { id: "glm-5", name: "GLM-5" },
    { id: "qwen3-coder-next", name: "Qwen3 Coder Next" },
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
