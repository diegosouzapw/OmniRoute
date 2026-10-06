import type { RegistryEntry } from "../../shared.ts";

export const token_kioskProvider: RegistryEntry = {
  id: "token-kiosk",
  alias: "tk",
  format: "openai",
  executor: "default",
  baseUrl: "https://agent-router.gaib.ai/v1/chat/completions",
  modelsUrl: "https://agent-router.gaib.ai/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  models: [
    { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet (Token Kiosk)", contextLength: 200000, toolCalling: true, supportsVision: true },
    { id: "deepseek-v3", name: "DeepSeek V3 (Token Kiosk)", contextLength: 64000, toolCalling: true },
    { id: "deepseek-r1", name: "DeepSeek R1 (Token Kiosk)", contextLength: 64000, toolCalling: true, supportsReasoning: true },
    { id: "kimi-k1.5", name: "Kimi K1.5 (Token Kiosk)", contextLength: 128000, toolCalling: true },
    { id: "minimax-m6", name: "MiniMax M6 (Token Kiosk)", contextLength: 128000, toolCalling: true },
  ],
};
