import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { normalizeBaseUrl } from "./urlHelpers.ts";
import { validateDirectChatProvider } from "./directChatProbe.ts";
import { buildClinepassHeaders } from "@/shared/utils/clineAuth.ts";

export const CLINE_DEFAULT_VALIDATION_MODEL_ID = "nvidia/nemotron-3-nano-30b-a30b:free";

export function resolveClineChatUrl(baseUrl: string) {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";
  const cleaned = normalized
    .replace(/\/chat\/completions$/, "")
    .replace(/\/models$/, "")
    .replace(/\/v1$/, "");
  return `${cleaned}/api/v1/chat/completions`;
}

export async function validateClineProvider({
  apiKey,
  providerSpecificData = {},
  isLocal = false,
  provider = "cline",
}: any) {
  const configuredBaseUrl =
    normalizeBaseUrl(providerSpecificData.baseUrl) ||
    getRegistryEntry(provider)?.baseUrl ||
    "https://api.cline.bot/api/v1/chat/completions";

  const headers = buildClinepassHeaders({ apiKey }, undefined, { clientType: "omniroute" });
  headers["Content-Type"] = "application/json";

  const model =
    providerSpecificData.validationModelId ||
    getRegistryEntry(provider)?.models?.[0]?.id ||
    CLINE_DEFAULT_VALIDATION_MODEL_ID;

  return validateDirectChatProvider({
    url: configuredBaseUrl.includes("/api/v1/chat/completions")
      ? configuredBaseUrl
      : resolveClineChatUrl(configuredBaseUrl),
    headers,
    body: {
      model,
      messages: [{ role: "user", content: "ping" }],
      // Cline requires stream mode, else it returns "generateText is not implemented".
      stream: true,
    },
    providerSpecificData,
    isLocal,
  });
}
