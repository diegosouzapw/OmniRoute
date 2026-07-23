export const ALIBABA_PROVIDER_REGION_VALUES = ["global-sg", "china-beijing"] as const;

export type AlibabaProviderRegion = (typeof ALIBABA_PROVIDER_REGION_VALUES)[number];
export type AlibabaProviderFamily =
  "alibaba" | "bailian-coding-plan" | "qwen-cloud" | "qwen-cloud-token-plan";

export const ALIBABA_PROVIDER_ENDPOINTS: Readonly<
  Record<AlibabaProviderFamily, Readonly<Record<AlibabaProviderRegion, string>>>
> = {
  alibaba: {
    "global-sg": "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
    "china-beijing": "https://dashscope.aliyuncs.com/compatible-mode/v1",
  },
  "bailian-coding-plan": {
    "global-sg": "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
    "china-beijing": "https://coding.dashscope.aliyuncs.com/apps/anthropic/v1",
  },
  "qwen-cloud": {
    "global-sg": "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
    "china-beijing": "https://dashscope.aliyuncs.com/compatible-mode/v1",
  },
  "qwen-cloud-token-plan": {
    "global-sg": "https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1",
    "china-beijing": "https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1",
  },
};

const REGIONAL_PROVIDER_IDS = new Set([
  "alibaba",
  "alibaba-cn",
  "bailian-coding-plan",
  "qwen-cloud",
  "qwen-cloud-token-plan",
]);

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function canonicalProviderFamily(providerId: string): AlibabaProviderFamily | null {
  if (providerId === "alibaba-cn") return "alibaba";
  if (
    providerId === "alibaba" ||
    providerId === "bailian-coding-plan" ||
    providerId === "qwen-cloud" ||
    providerId === "qwen-cloud-token-plan"
  ) {
    return providerId;
  }
  return null;
}

function normalizeEndpoint(value: string): string {
  return value
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/(?:chat\/completions|messages)$/i, "")
    .toLowerCase();
}

function isFamilyPresetUrl(family: AlibabaProviderFamily, value: string): boolean {
  const normalized = normalizeEndpoint(value);
  return ALIBABA_PROVIDER_REGION_VALUES.some(
    (region) => normalizeEndpoint(ALIBABA_PROVIDER_ENDPOINTS[family][region]) === normalized
  );
}

export function isAlibabaRegionalProvider(providerId: string | null | undefined): boolean {
  return typeof providerId === "string" && REGIONAL_PROVIDER_IDS.has(providerId);
}

export function getDefaultAlibabaProviderRegion(
  providerId: string | null | undefined
): AlibabaProviderRegion {
  return providerId === "alibaba-cn" ? "china-beijing" : "global-sg";
}

export function normalizeAlibabaProviderRegion(
  value: unknown,
  fallback: AlibabaProviderRegion = "global-sg"
): AlibabaProviderRegion {
  if (typeof value !== "string") return fallback;
  switch (value.trim().toLowerCase()) {
    case "global-sg":
    case "global":
    case "international":
    case "singapore":
    case "ap-southeast-1":
      return "global-sg";
    case "china-beijing":
    case "china":
    case "cn":
    case "beijing":
    case "cn-beijing":
      return "china-beijing";
    default:
      return fallback;
  }
}

export function resolveAlibabaProviderRegion(
  providerId: string,
  providerSpecificData?: unknown
): AlibabaProviderRegion {
  const fallback = getDefaultAlibabaProviderRegion(providerId);
  return normalizeAlibabaProviderRegion(asRecord(providerSpecificData).region, fallback);
}

/**
 * Resolve the Alibaba-family API root for a connection.
 *
 * A genuinely custom base URL wins. Historical saved preset URLs do not: they are treated as
 * defaults so changing the region selector immediately switches to the matching regional host.
 */
export function resolveAlibabaProviderBaseUrl(
  providerId: string,
  providerSpecificData?: unknown,
  fallback = ""
): string {
  const family = canonicalProviderFamily(providerId);
  const data = asRecord(providerSpecificData);
  const configuredBaseUrl =
    typeof data.baseUrl === "string" && data.baseUrl.trim() ? data.baseUrl.trim() : "";

  if (!family) return configuredBaseUrl || fallback;
  if (configuredBaseUrl && !isFamilyPresetUrl(family, configuredBaseUrl)) {
    return configuredBaseUrl;
  }

  const region = resolveAlibabaProviderRegion(providerId, data);
  return ALIBABA_PROVIDER_ENDPOINTS[family][region];
}

export function resolveAlibabaProviderModelsUrl(
  providerId: string,
  providerSpecificData?: unknown,
  fallback = ""
): string {
  const baseUrl = resolveAlibabaProviderBaseUrl(providerId, providerSpecificData, fallback)
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/(?:chat\/completions|messages|models)$/i, "");
  return baseUrl ? `${baseUrl}/models` : "";
}

/**
 * Resolve the dedicated Alibaba-family media API root from the connection's
 * regional OpenAI/Anthropic-compatible endpoint.
 */
export function resolveAlibabaProviderMediaBaseUrl(
  providerId: string,
  providerSpecificData?: unknown,
  fallback = ""
): string {
  return resolveAlibabaProviderBaseUrl(providerId, providerSpecificData, fallback)
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/compatible-mode\/v1(?:\/(?:chat\/completions|models))?$/i, "/api/v1")
    .replace(/\/apps\/anthropic(?:\/v1)?(?:\/messages)?$/i, "/api/v1");
}
