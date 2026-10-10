import type { RegistryEntry } from "../../shared.ts";

export const kieProvider: RegistryEntry = {
  id: "kie",
  alias: "kie",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.kie.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  models: [
    // Sweep 2026-06-19: + current flagships the kie proxy surfaces. gemini-3-pro was
    // skipped (registry already carries the newer gemini-3-1-pro).
    {
      id: "claude-fable-5",
      name: "Claude 5 Fable",
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "medium", "high", "xhigh", "max"],
    },
    { id: "claude-opus-5", name: "Claude 5 Opus" },
    { id: "claude-sonnet-5", name: "Claude 5 Sonnet" },
    { id: "claude-haiku-4-5", name: "Claude 4.5 Haiku" },
    { id: "gpt-5-6-sol", name: "GPT 5.6 Sol" },
    { id: "gpt-5-6-terra", name: "GPT 5.6 Terra" },
    { id: "gpt-5-6-luna", name: "GPT 5.6 Luna" },
    { id: "gemini-3-1-pro", name: "Gemini 3.1 Pro" },
    { id: "gemini-3-7-flash", name: "Gemini 3.7 Flash" },
    { id: "grok-4-6", name: "Grok 4.6" },
  ],
};
