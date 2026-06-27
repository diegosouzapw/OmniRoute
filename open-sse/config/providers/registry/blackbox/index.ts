import type { RegistryEntry } from "../../shared.ts";

export const blackboxProvider: RegistryEntry = {
  id: "blackbox",
  alias: "bb",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.blackbox.ai/v1/chat/completions",
  modelsUrl: "https://api.blackbox.ai/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "claude-fable-5", name: "Claude Fable 5" },
    { id: "claude-opus-4.8", name: "Claude Opus 4.8" },
    { id: "claude-sonnet-4.6", name: "Claude Sonnet 4.6" },
    { id: "gpt-5.5", name: "GPT-5.5" },
    { id: "gpt-5.4-pro", name: "GPT-5.4 Pro" },
    { id: "gpt-5.4", name: "GPT-5.4" },
    { id: "gpt-5.3-codex", name: "GPT-5.3 Codex" },
    { id: "gpt-5.4-nano", name: "GPT-5.4 Nano" },
    { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash" },
    { id: "grok-4.3", name: "Grok 4.3" },
  ],
};
