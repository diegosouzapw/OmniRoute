import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * Ashna — OpenAI-compatible gateway by AshnaAI (app.ashna.ai).
 *
 * One host speaks three protocols (OpenAI chat completions, Anthropic
 * Messages, OpenAI Responses); OmniRoute uses the chat surface. Keys are
 * created at Account → API on app.ashna.ai and sent as Bearer tokens.
 *
 * The upstream /models catalog (~88 ids: foundation models from OpenAI,
 * Anthropic, Google, DeepSeek, GLM, Kimi, Mistral, NVIDIA, xAI plus the
 * native Ashna-X1) is volatile, so the registry seeds only ids that were
 * smoke-tested against the live chat endpoint (2026-09-21) and passthrough
 * discovery serves the rest. ashna-diffusion-1 is deliberately NOT seeded:
 * it is an image model served by the images API, not chat completions.
 */
export const ashnaProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "ashna",
  alias: "ashna",
  baseUrl: "https://api.ashna.ai/v1/api/chat/completions",
  modelsUrl: "https://api.ashna.ai/v1/api/models",
  models: [
    // ashna-x1 stays first so it remains the provider default (native flagship).
    { id: "ashna-x1", name: "Ashna-X1", supportsReasoning: true },
    { id: "gpt-6-astra", name: "GPT 6 Astra" },
  ],
  passthroughModels: true,
});
