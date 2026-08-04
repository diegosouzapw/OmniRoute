import type { RegistryEntry } from "../../shared.ts";

/**
 * Dahl — OpenAI-compatible free inference provider.
 *
 * Token lifecycle: accounts are created by POSTing to
 * https://inference.dahl.global/tokens (proxied via /api/dahl/tokens to
 * avoid browser CORS). The response `{ available_tokens, token }` yields
 * the API key stored as connection authType "apikey".
 *
 * Models are hardcoded — MiniMax M2.7 and Kimi K2.6.
 */
export const dahlProvider: RegistryEntry = {
  id: "dahl",
  alias: "dahl",
  format: "openai",
  executor: "openai-compatible",
  baseUrl: "https://inference.dahl.global/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  authPrefix: "Bearer",
  passthroughModels: false,
  defaultContextLength: 200000,
  models: [
    { id: "MiniMaxAI/MiniMax-M2.7", name: "MiniMax M2.7" },
    { id: "moonshotai/Kimi-K2.6", name: "Kimi K2.6" },
  ],
};
