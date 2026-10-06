import type { RegistryEntry } from "../../shared.ts";
import {
  buildGeminiGenerateContentUrl,
  buildOpenAiCompatibleRegistryEntry,
  getAnthropicCompatHeaders,
} from "../../shared.ts";

/**
 * HCNSec — NewAPI-based host (https://api.hcnsec.cn), announced by its own `/api/status` as
 * 新疆幻城网安科技公益大模型安全网关. Catalogued as an API-key **regional** provider
 * (`APIKEY_PROVIDERS_REGIONAL.hcnsec`); this entry only describes how to reach it.
 *
 * It shipped OpenAI-only. The three alternates below were added after probing the host live:
 * every one of them reaches the NewAPI token layer (`{"error":{"type":"new_api_error"}}` on an
 * invalid key) rather than a router 404, so each is a route this host actually serves —
 * including the Gemini path in both its unary and `:streamGenerateContent?alt=sse` forms.
 * The default format, base URL and auth scheme are deliberately untouched.
 *
 * `models: []` is unchanged and deliberate. Unlike TabiToken, this host gates every discovery
 * endpoint behind auth (`/api/status` reports `pricing.requireAuth: true`; `/api/pricing`,
 * `/api/models`, `/api/models/display` and `/api/user/models` all answer "Unauthorized, not
 * logged in and no access token provided"). Rather than ship a guessed catalog, the model list
 * is left to live discovery through `modelsUrl` with the operator's own key — the same
 * arrangement `anyapi` and `helixmind` use.
 */
export const hcnsecProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "hcnsec",
  alias: "hcnsec",
  baseUrl: "https://api.hcnsec.cn/v1/chat/completions",
  modelsUrl: "https://api.hcnsec.cn/v1/models",
  responsesBaseUrl: "https://api.hcnsec.cn/v1/responses",
  models: [],
  passthroughModels: true,
  alternateFormats: [
    {
      // `Anthropic-Version` is scoped to this alternate (deepseek's arrangement) because
      // it is only meaningful on `/v1/messages`, and because `default.ts` supplies that
      // default solely for `anthropic-compatible-*` provider ids — not for a gateway that
      // reaches the Claude protocol through an alternate.
      format: "claude",
      baseUrl: "https://api.hcnsec.cn/v1/messages",
      authHeader: "x-api-key",
      headers: getAnthropicCompatHeaders(),
      label: "Anthropic-compatible",
    },
    {
      format: "openai-responses",
      baseUrl: "https://api.hcnsec.cn/v1/responses",
      authHeader: "bearer",
      label: "OpenAI Responses",
    },
    {
      // The Gemini protocol carries the model in the path, so this alternate needs the
      // same builder the native `gemini` provider uses instead of a constant chatPath.
      format: "gemini",
      baseUrl: "https://api.hcnsec.cn/v1beta/models",
      authHeader: "x-goog-api-key",
      urlBuilder: buildGeminiGenerateContentUrl,
      label: "Gemini-compatible",
    },
  ],
});
