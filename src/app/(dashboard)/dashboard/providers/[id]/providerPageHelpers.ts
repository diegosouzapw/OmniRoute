// Pure, shared helpers for the provider-detail page and its extracted modals
// (Issue #3501 strangler-fig decomposition, Phase 2). Leaf module — imports only
// from @/shared, so the page client AND colocated modals can import these without
// a circular dependency. Extracting them here unblocks moving the heavier modals
// (AddApiKeyModal / EditConnectionModal) out of the god-component in later phases.
import { LOCAL_PROVIDERS, isSelfHostedChatProvider } from "@/shared/constants/providers";

export type ProviderMessageTranslator = ((
  key: string,
  values?: Record<string, unknown>
) => string) & {
  has?: (key: string) => boolean;
};

export type LocalProviderMetadata = {
  name?: string;
  localDefault?: string;
  [key: string]: unknown;
};

export function providerText(
  t: ProviderMessageTranslator,
  key: string,
  fallback: string,
  values?: Record<string, unknown>
): string {
  if (typeof t.has === "function" && t.has(key)) {
    return t(key, values);
  }
  if (values) {
    return Object.entries(values).reduce(
      (acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)),
      fallback
    );
  }
  return fallback;
}

export function providerCountText(
  t: ProviderMessageTranslator,
  key: string,
  count: number,
  singularFallback: string,
  pluralFallback: string
): string {
  return providerText(t, key, count === 1 ? singularFallback : pluralFallback, { count });
}

export function readBooleanToggle(value: unknown, fallback: boolean): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "1" || normalized === "true") return true;
    if (normalized === "0" || normalized === "false") return false;
  }
  return fallback;
}

export const CONFIGURABLE_BASE_URL_PROVIDERS = new Set([
  "azure-openai",
  "azure-ai",
  "bailian-coding-plan",
  "xiaomi-mimo",
  "siliconflow",
  "heroku",
  "databricks",
  "snowflake",
  "searxng-search",
  "petals",
]);

export const DEFAULT_PROVIDER_BASE_URLS: Record<string, string> = {
  "azure-openai": "https://example-resource.openai.azure.com",
  "azure-ai": "https://example-resource.services.ai.azure.com/openai/v1",
  "bailian-coding-plan": "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
  "xiaomi-mimo": "https://token-plan-sgp.xiaomimimo.com/v1",
  siliconflow: "https://api.siliconflow.com/v1",
  "searxng-search": "http://localhost:8888/search",
  petals: "https://chat.petals.dev/api/v1/generate",
};

export function getLocalProviderMetadata(providerId?: string | null) {
  if (!providerId || !isSelfHostedChatProvider(providerId)) return null;
  return (LOCAL_PROVIDERS as Record<string, LocalProviderMetadata>)[providerId] || null;
}

export function isBaseUrlConfigurableProvider(providerId?: string | null) {
  return Boolean(
    providerId &&
    (CONFIGURABLE_BASE_URL_PROVIDERS.has(providerId) || isSelfHostedChatProvider(providerId))
  );
}

export function getProviderBaseUrlDefault(providerId?: string | null) {
  const localProvider = getLocalProviderMetadata(providerId);
  if (typeof localProvider?.localDefault === "string" && localProvider.localDefault.trim()) {
    return localProvider.localDefault;
  }
  return providerId ? DEFAULT_PROVIDER_BASE_URLS[providerId] || "" : "";
}

export function getProviderBaseUrlHint(
  providerId?: string | null,
  t?: ((key: string, values?: Record<string, unknown>) => string) | null
) {
  const localProvider = getLocalProviderMetadata(providerId);
  if (localProvider && t) {
    return t("localProviderBaseUrlHint", {
      provider: localProvider.name || providerId,
      baseUrl: getProviderBaseUrlDefault(providerId),
    });
  }
  switch (providerId) {
    case "azure-openai":
      return t ? t("azureOpenAiBaseUrlHint") : undefined;
    case "bailian-coding-plan":
      return t ? t("bailianBaseUrlHint") : undefined;
    case "xiaomi-mimo":
      return t ? t("xiaomiMimoBaseUrlHint") : undefined;
    case "heroku":
      return t ? t("herokuBaseUrlHint") : undefined;
    case "databricks":
      return t ? t("databricksBaseUrlHint") : undefined;
    case "snowflake":
      return t ? t("snowflakeBaseUrlHint") : undefined;
    case "searxng-search":
      return t ? t("searxngBaseUrlHint") : undefined;
    default:
      return undefined;
  }
}

export function getProviderBaseUrlPlaceholder(providerId?: string | null) {
  if (isSelfHostedChatProvider(providerId || "")) {
    return getProviderBaseUrlDefault(providerId);
  }
  switch (providerId) {
    case "azure-openai":
      return "https://my-resource.openai.azure.com";
    case "bailian-coding-plan":
    case "xiaomi-mimo":
      return getProviderBaseUrlDefault(providerId);
    case "siliconflow":
      return "https://api.siliconflow.cn/v1";
    case "heroku":
      return "https://us.inference.heroku.com";
    case "databricks":
      return "https://adb-1234567890123456.7.azuredatabricks.net/serving-endpoints";
    case "snowflake":
      return "https://example-account.snowflakecomputing.com";
    case "searxng-search":
      return "http://localhost:8888/search";
    default:
      return "";
  }
}

export function isGlmProvider(providerId?: string | null) {
  return providerId === "glm" || providerId === "glm-cn" || providerId === "glmt";
}

export function parseRoutingTagsInput(value: string): string[] | undefined {
  const tags = Array.from(
    new Set(
      value
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)
    )
  );
  return tags.length > 0 ? tags : undefined;
}

export function parseExcludedModelsInput(value: string): string[] | undefined {
  const patterns = Array.from(
    new Set(
      value
        .split(",")
        .map((pattern) => pattern.trim())
        .filter(Boolean)
    )
  );
  return patterns.length > 0 ? patterns : undefined;
}

export function formatRoutingTagsInput(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value
    .filter((tag): tag is string => typeof tag === "string" && tag.trim().length > 0)
    .join(", ");
}

export function formatExcludedModelsInput(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value
    .filter(
      (pattern): pattern is string => typeof pattern === "string" && pattern.trim().length > 0
    )
    .join(", ");
}
