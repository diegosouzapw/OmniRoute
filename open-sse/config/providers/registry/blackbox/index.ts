import type { RegistryEntry } from "../../shared.ts";

export const blackboxProvider: RegistryEntry = {
  id: "blackbox",
  alias: "bb",
  format: "openai",
  executor: "default",
  // NOTE: api.blackbox.ai returns HTTP 404 on /v1/chat/completions and /v1/models
  // (empty body, all path variants) since sweep 2026-08-21; the public inference
  // surface has moved to the gated enterprise.blackbox.ai/v1 endpoint. The provider
  // is marked deprecated in src/shared/constants/providers/apikey/frontier-labs.ts —
  // this registry entry is kept intact (registration/execution unaffected), so
  // existing configured keys keep working if a restored/enterprise host is reachable.
  baseUrl: "https://api.blackbox.ai/v1/chat/completions",
  modelsUrl: "https://api.blackbox.ai/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    {
      id: "claude-fable-5",
      name: "Claude Fable 5",
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "medium", "high", "xhigh", "max"],
    },
    { id: "claude-opus-4.8", name: "Claude Opus 4.8" },
    { id: "claude-sonnet-5", name: "Claude Sonnet 5" },
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
