import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * Atria — official API for the Atria Dawn family from the Shanghai AI
 * Laboratory (api.atria-asi.ai).
 *
 * Atria Dawn Preview is a 744B-parameter MoE agentic model built on the
 * GLM-5.2 foundation (arXiv 2609.15818): text-only, 256K context, up to
 * 65,536 output tokens, always-on reasoning surfaced through
 * reasoning_content, and tools via the standard chat `tools` field. Model
 * ids are case-sensitive. The host also speaks Anthropic Messages and
 * OpenAI Responses; OmniRoute uses the chat surface.
 *
 * Account limits: a per-account RPM cap shared across all keys and all
 * three endpoints (surfaced via x-rpm-limit / x-rpm-remaining headers,
 * fixed-minute window), plus an announced 100M free-token grant whose
 * period (daily vs monthly) is not published — only the RPM cap is
 * verifiable without asking support.
 */
export const atriaProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "atria",
  alias: "atria",
  baseUrl: "https://api.atria-asi.ai/v1/chat/completions",
  modelsUrl: "https://api.atria-asi.ai/v1/models",
  defaultContextLength: 262144,
  models: [
    {
      id: "Atria-Dawn-Preview",
      name: "Atria Dawn Preview",
      supportsReasoning: true,
      toolCalling: true,
      contextLength: 262144,
      maxOutputTokens: 65536,
    },
  ],
});
