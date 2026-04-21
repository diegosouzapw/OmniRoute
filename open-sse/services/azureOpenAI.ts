const DEFAULT_AZURE_OPENAI_API_VERSION = "2024-10-21";

function normalizeBaseUrl(value: string | null | undefined): string {
  return (value || "").trim().replace(/\/$/, "");
}

export function normalizeAzureOpenAIBaseUrl(value: string | null | undefined): string {
  const normalized = normalizeBaseUrl(value);

  return normalized
    .replace(/\/openai\/deployments\/[^/?#]+\/chat\/completions.*$/i, "")
    .replace(/\/openai\/models.*$/i, "")
    .replace(/\/openai$/i, "");
}

export function resolveAzureOpenAIApiVersion(
  providerSpecificData: Record<string, unknown> | null | undefined
): string {
  const rawValue = providerSpecificData?.apiVersion;
  if (typeof rawValue !== "string") {
    return DEFAULT_AZURE_OPENAI_API_VERSION;
  }

  const trimmed = rawValue.trim();
  return trimmed || DEFAULT_AZURE_OPENAI_API_VERSION;
}

export function buildAzureOpenAIChatUrl(
  baseUrl: string | null | undefined,
  deployment: string,
  providerSpecificData: Record<string, unknown> | null | undefined
): string {
  const normalizedBaseUrl = normalizeAzureOpenAIBaseUrl(baseUrl);
  const apiVersion = resolveAzureOpenAIApiVersion(providerSpecificData);
  return `${normalizedBaseUrl}/openai/deployments/${encodeURIComponent(deployment)}/chat/completions?api-version=${encodeURIComponent(apiVersion)}`;
}

export function buildAzureOpenAIModelsUrl(
  baseUrl: string | null | undefined,
  providerSpecificData: Record<string, unknown> | null | undefined
): string {
  const normalizedBaseUrl = normalizeAzureOpenAIBaseUrl(baseUrl);
  const apiVersion = resolveAzureOpenAIApiVersion(providerSpecificData);
  return `${normalizedBaseUrl}/openai/models?api-version=${encodeURIComponent(apiVersion)}`;
}

export { DEFAULT_AZURE_OPENAI_API_VERSION };
