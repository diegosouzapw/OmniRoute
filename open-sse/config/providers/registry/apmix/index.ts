import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../shared.ts";

// Apmix (apmix.ai) — subscription LLM gateway. OpenAI-compatible surface at
// https://api.apmix.ai/v1 (chat completions + responses), Bearer `apx_live_…`
// keys. The model catalog is plan-scoped per key, so `modelsUrl` discovery
// (NAMED_OPENAI_STYLE_PROVIDERS) serves the live list; the seed catalog in
// CHAT_OPENAI_COMPAT_MODELS.apmix is the union fallback.
export const apmixProvider: RegistryEntry = {
  id: "apmix",
  alias: "apmix",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.apmix.ai/v1/chat/completions",
  modelsUrl: "https://api.apmix.ai/v1/models",
  responsesBaseUrl: "https://api.apmix.ai/v1/responses",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS.apmix,
};
