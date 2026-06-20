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
    { id: "claude-opus-4-8", name: "Claude 4.8 Opus" },
    { id: "claude-opus-4-7", name: "Claude 4.7 Opus" },
    { id: "claude-sonnet-4-6", name: "Claude 4.6 Sonnet" },
    { id: "claude-haiku-4-5", name: "Claude 4.5 Haiku" },
    { id: "gpt-5-5", name: "GPT 5.5" },
    { id: "gpt-5-4", name: "GPT 5.4" },
    { id: "gpt-5-2", name: "GPT 5.2" },
    { id: "gemini-3-1-pro", name: "Gemini 3.1 Pro" },
    { id: "gemini-2-5-pro", name: "Gemini 2.5 Pro" },
    { id: "gemini-3-flash", name: "Gemini 3 Flash" },
    { id: "gemini-3-5-flash", name: "Gemini 3.5 Flash" },
  ],
};
