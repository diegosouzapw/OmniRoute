import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS, getAnthropicCompatHeaders } from "../../shared.ts";

export const xiaomi_mimoProvider: RegistryEntry = {
  id: "xiaomi-mimo",
  alias: "mimo",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.xiaomimimo.com/v1",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS["xiaomi-mimo"],
  // Xiaomi also publishes the same catalog over an Anthropic-compatible endpoint
  // on the same host. The operator picks per connection; see
  // config/providers/alternateFormats.ts.
  alternateFormats: [
    {
      format: "claude",
      baseUrl: "https://api.xiaomimimo.com/anthropic/v1/messages",
      authHeader: "x-api-key",
      headers: getAnthropicCompatHeaders(),
      label: "Anthropic-compatible",
    },
  ],
};
