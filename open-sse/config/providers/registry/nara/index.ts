import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * NaraRouter — OpenAI-compatible aggregator (router.bynara.id).
 *
 * Free key issued via their Telegram channel. The free tier is a shared
 * 5M-tokens/day pool; many models are gated behind
 * credit/plan, so only the free-tier models are pinned.
 */
export const naraProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "nara",
  baseUrl: "https://router.bynara.id/v1/chat/completions",
  models: [
    { id: "tencent-hy3", name: "Tencent Hy3", contextLength: 1000000 },
    { id: "mistral-large", name: "Mistral Large", contextLength: 252000, toolCalling: true },
    { id: "mistral-medium-3-5", name: "Mistral Medium 3.5", contextLength: 256000, toolCalling: true, supportsVision: true },
  ],
});
