import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * Logfare — free OpenAI-compatible LLM inference provider.
 *
 * Live-verified 2026-08-21: GET https://logfare.ai/v1/models returns a real
 * catalog (20 models; 11 chat-capable incl. kimi-k3, deepseek-v4-pro,
 * glm-5.2, gpt-5.6-luna, minimax-m3). Auth is a Bearer API key issued
 * instantly at https://logfare.ai/register (username/password, no email).
 *
 * ⚠️ Privacy: in exchange for free inference, Logfare logs every request
 * (prompts, completions, metadata). After PII scrubbing this may feed their
 * private internal evaluation datasets. Users can opt out at /consent; see
 * https://logfare.ai/tos and https://logfare.ai/privacy. The dashboard card
 * surfaces this via freeNote.
 */
export const logfareProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "logfare",
  alias: "logfare",
  baseUrl: "https://logfare.ai/v1/chat/completions",
  modelsUrl: "https://logfare.ai/v1/models",
  models: [],
  passthroughModels: true,
});
