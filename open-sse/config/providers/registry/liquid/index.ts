import type { RegistryEntry } from "../../shared.ts";

/**
 * Liquid AI.
 *
 * The old api.liquid.ai host stopped serving the API — it now returns a Vercel
 * 404 HTML page for every path, so routing here failed with an unparseable body
 * rather than a clean error. The live OpenAI-compatible endpoint is
 * inference.liquid.ai, which answers 403 {"detail":"Not authenticated"} without
 * a key (both verified 2026-07-20).
 */
export const liquidProvider: RegistryEntry = {
  id: "liquid",
  alias: "liquid",
  format: "openai",
  executor: "default",
  baseUrl: "https://inference.liquid.ai/v1/chat/completions",
  modelsUrl: "https://inference.liquid.ai/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: [{ id: "liquid-lfm-40b", name: "Liquid LFM 40B" }],
};
