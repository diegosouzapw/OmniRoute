import type { RegistryEntry } from "../../shared.ts";

export const xaiProvider: RegistryEntry = {
  id: "xai",
  alias: "xai",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.x.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "grok-4.3", name: "Grok 4.3" },
    { id: "grok-build-0.1", name: "Grok Build 0.1", contextLength: 256000 },
    { id: "grok-4.20-multi-agent-0309", name: "Grok 4.20 Multi Agent" },
    { id: "grok-4.20-0309-reasoning", name: "Grok 4.20 Reasoning" },
    { id: "grok-4.20-0309-non-reasoning", name: "Grok 4.20" },
  ],
};
