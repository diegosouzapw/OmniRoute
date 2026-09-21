/**
 * Zylo key check. `zylo-api` is registered as an OpenAI-compatible provider, so the
 * generic probe validates a key by calling `GET /v1/models` and returning `{valid:true}`
 * on the first 2xx. Zylo serves that route WITHOUT authentication — it answers 200 with
 * no `Authorization` header at all, and 200 for a bogus key — so the account-setup dialog
 * greened any string and the first request Zylo actually authenticates was the user's own
 * model test, which came back `401 {"error":"Key not found: zk-…"}` (#13828; that message
 * is Zylo's own text, not OmniRoute's).
 *
 * `POST /v1/chat/completions` is the authenticated route, so a single probe there is the
 * correct auth check — the same remedy already applied to dify (#11002) and bytez (#5422).
 */
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { normalizeBaseUrl } from "./urlHelpers";
import { buildBearerHeaders } from "./headers";
import { validateDirectChatProvider } from "./directChatProbe";

/** Zylo's catalog lists `gpt-oss`; kept overridable for accounts on a different plan. */
export const ZYLO_DEFAULT_VALIDATION_MODEL_ID = "gpt-oss";

/**
 * Shape a provider/connection base URL into Zylo's chat route. Accepts the API root
 * (`https://api.zyloai.net`), a `/v1` root, or a full `/v1/chat/completions` URL, and
 * always returns `{base}/v1/chat/completions`.
 */
export function resolveZyloChatUrl(baseUrl: string) {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";
  const cleaned = normalized
    .replace(/\/chat\/completions$/, "")
    .replace(/\/models$/, "")
    .replace(/\/v1$/, "");
  return `${cleaned}/v1/chat/completions`;
}

export async function validateZyloApiProvider({ apiKey, providerSpecificData = {} }: any) {
  const configuredBaseUrl =
    normalizeBaseUrl(providerSpecificData.baseUrl) ||
    getRegistryEntry("zylo-api")?.baseUrl ||
    "https://api.zyloai.net/v1/chat/completions";

  return validateDirectChatProvider({
    url: resolveZyloChatUrl(configuredBaseUrl),
    headers: buildBearerHeaders(apiKey, providerSpecificData),
    body: {
      model: providerSpecificData.validationModelId || ZYLO_DEFAULT_VALIDATION_MODEL_ID,
      messages: [{ role: "user", content: "test" }],
      max_tokens: 1,
    },
    providerSpecificData,
  });
}
