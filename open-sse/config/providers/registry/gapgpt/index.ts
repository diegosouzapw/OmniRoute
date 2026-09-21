import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * GapGPT — Iranian OpenAI-compatible relay (gapgpt.app).
 *
 * Regional coverage for Iran, where direct OpenAI/Anthropic/Google access is
 * blocked: gapgpt.app is a Persian storefront that sells API keys in minutes
 * and serves a ~129-id catalog (OpenAI, Anthropic, Google, xAI, DeepSeek, GLM
 * plus native gapgpt-* models) from api.gapgpt.app/v1. NewAPI-style billing
 * with per-request pre-consume checks.
 *
 * Verification (2026-09-21): /v1/models returns the live catalog with a valid
 * key (HTTP 200) and 401 unauthenticated; chat completions reach upstream
 * billing with the key accepted (the test key's balance was exhausted, so no
 * 200 completion could be captured — recorded here rather than assumed).
 */
export const gapgptProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "gapgpt",
  alias: "gapgpt",
  baseUrl: "https://api.gapgpt.app/v1/chat/completions",
  modelsUrl: "https://api.gapgpt.app/v1/models",
  models: [
    // Native GapGPT model stays first so it remains the provider default;
    // the ~129-id upstream catalog is discovered live via /v1/models.
    // gapgpt/z-image is deliberately NOT seeded (image model, images API).
    { id: "gapgpt-qwen-3.5-thinking", name: "GapGPT Qwen 3.5 Thinking", supportsReasoning: true },
    { id: "gpt-4o-mini", name: "GPT 4o mini" },
  ],
  passthroughModels: true,
});
