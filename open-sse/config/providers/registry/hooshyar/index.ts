import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * Hooshyar — Iranian OpenAI-compatible gateway (wqai.morvism.ir).
 *
 * Regional coverage for Iran, where direct OpenAI/Anthropic access is
 * blocked: serves a 10-id catalog (Claude, GPT, Grok, Kimi K2.6, GLM incl. a
 * free-tier id, plus the waiq-default auto-router). Keys are issued by the
 * service operator — no public self-service signup page is documented at the
 * time of writing, and issued tokens expire and must be renewed.
 *
 * Verification (2026-09-21): /v1/models is live (401 unauthenticated) and the
 * 10-id catalog was previously synchronized with a valid token; the token
 * available at PR time had expired ("The API token has expired"), so a fresh
 * 200 completion could not be captured — recorded here rather than assumed.
 */
export const hooshyarProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "hooshyar",
  alias: "hooshyar",
  baseUrl: "https://wqai.morvism.ir/v1/chat/completions",
  modelsUrl: "https://wqai.morvism.ir/v1/models",
  models: [
    // waiq-default stays first so it remains the provider default (the
    // gateway's own auto-router); the full 10-id catalog is discovered live.
    { id: "waiq-default", name: "Waiq Default (auto routing)" },
    { id: "glm-5.3-free", name: "GLM 5.3 (free tier)" },
  ],
  passthroughModels: true,
});
