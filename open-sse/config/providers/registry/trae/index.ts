import type { RegistryEntry } from "../../shared.ts";

export const traeProvider: RegistryEntry = {
  id: "trae",
  alias: "tr",
  format: "openai",
  executor: "trae",
  baseUrl: "https://core-normal.trae.ai/api/remote/v1",
  authType: "oauth",
  authHeader: "bearer",
  defaultContextLength: 272000,
  models: [
    { id: "auto", name: "Auto (Code · Server Picks)" },
    { id: "work", name: "Work (Auto · fast)" },
    { id: "gemini-3.1-pro", name: "Gemini 3.1 Pro" },
    { id: "gemini-3-flash-solo", name: "Gemini 3 Flash" },
    // #3110: MiniMax M3 via Trae
    { id: "minimax-m3", name: "MiniMax M3", contextLength: 1048576, supportsVision: true },
    { id: "minimax-m2.7", name: "MiniMax M2.7" },
    { id: "kimi-k2.5", name: "Kimi K2.5" },
    { id: "gpt-5.4", name: "GPT 5.4" },
    { id: "gpt-5.2", name: "GPT 5.2" },
  ],
};
