import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS, getAnthropicCompatHeaders } from "../../shared.ts";

/**
 * Xiaomi MiMo Token Plan (platform.xiaomimimo.com/token-plan).
 *
 * A separate product from the regular account: `tp-…` keys authenticate only on
 * the regional token-plan host and return 401 on api.xiaomimimo.com. Same pattern
 * already used by qwen-cloud-token-plan, which is likewise its own entry.
 */
export const xiaomi_mimo_token_planProvider: RegistryEntry = {
  id: "xiaomi-mimo-token-plan",
  alias: "mimotp",
  format: "openai",
  executor: "default",
  baseUrl: "https://token-plan-sgp.xiaomimimo.com/v1",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS["xiaomi-mimo-token-plan"],
  alternateFormats: [
    {
      format: "claude",
      baseUrl: "https://token-plan-sgp.xiaomimimo.com/anthropic/v1/messages",
      authHeader: "x-api-key",
      headers: getAnthropicCompatHeaders(),
      label: "Anthropic-compatible",
    },
  ],
};
