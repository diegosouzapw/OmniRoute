import { GLM_DEFAULT_BASE_URLS } from "../../config/glmProvider.ts";

type ZaiCredentialsLike = {
  providerSpecificData?: { targetFormat?: unknown } | null;
} | null;

/**
 * #7364: "zai"/"glm-coding-apikey" default to the Anthropic Messages wire format
 * (registry format:"claude"), but a per-model `targetFormat` override (custom-model
 * dropdown, #2905) can resolve to "openai" — e.g. for a vision model like glm-4.6v
 * that the operator wants routed through the OpenAI-compatible endpoint instead.
 * chatCore/executionCredentials.ts threads that resolved override onto
 * `providerSpecificData.targetFormat`; DefaultExecutor.buildUrl() has no other way
 * to see it, so without this check every zai/glm-coding-apikey request silently hit
 * the Claude-format endpoint regardless of the override.
 */
export function resolveZaiUrl(
  credentials: ZaiCredentialsLike,
  resolveBaseUrl: (fallback?: string) => string
): string {
  if (credentials?.providerSpecificData?.targetFormat === "openai") {
    return resolveBaseUrl(GLM_DEFAULT_BASE_URLS.international);
  }
  return `${resolveBaseUrl()}?beta=true`;
}
