import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { normalizeBaseUrl } from "./urlHelpers.ts";
import { buildBearerHeaders } from "./headers.ts";
import { validateDirectChatProvider } from "./directChatProbe.ts";

export const KILOCODE_DEFAULT_VALIDATION_MODEL_ID = "openrouter/free";

export function resolveKilocodeChatUrl(baseUrl: string) {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";
  const cleaned = normalized.replace(/\/chat\/completions$/, "").replace(/\/models$/, "");
  return `${cleaned}/chat/completions`;
}

export async function validateKilocodeProvider({
  apiKey,
  providerSpecificData = {},
  isLocal = false,
}: any) {
  const configuredBaseUrl =
    normalizeBaseUrl(providerSpecificData.baseUrl) ||
    getRegistryEntry("kilocode")?.baseUrl ||
    "https://api.kilo.ai/api/openrouter/chat/completions";

  const headers = buildBearerHeaders(apiKey, providerSpecificData);
  headers["Content-Type"] = "application/json";
  headers["X-KILOCODE-EDITORNAME"] = "OmniRoute";

  const model =
    providerSpecificData.validationModelId ||
    getRegistryEntry("kilocode")?.models?.[0]?.id ||
    KILOCODE_DEFAULT_VALIDATION_MODEL_ID;

  return validateDirectChatProvider({
    url: configuredBaseUrl.includes("/chat/completions")
      ? configuredBaseUrl
      : resolveKilocodeChatUrl(configuredBaseUrl),
    headers,
    body: {
      model,
      messages: [{ role: "user", content: "ping" }],
      max_tokens: 1,
    },
    providerSpecificData,
    isLocal,
  });
}
