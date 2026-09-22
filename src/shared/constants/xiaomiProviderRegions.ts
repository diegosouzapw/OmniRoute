export const XIAOMI_MIMO_TOKEN_PLAN_REGION_VALUES = [
  "singapore",
  "china",
  "amsterdam",
] as const;

export type XiaomiMimoTokenPlanRegion =
  (typeof XIAOMI_MIMO_TOKEN_PLAN_REGION_VALUES)[number];

export const XIAOMI_MIMO_TOKEN_PLAN_ENDPOINTS: Readonly<
  Record<
    XiaomiMimoTokenPlanRegion,
    Readonly<{
      host: string;
      openai: string;
      anthropic: string;
    }>
  >
> = {
  singapore: {
    host: "https://token-plan-sgp.xiaomimimo.com",
    openai: "https://token-plan-sgp.xiaomimimo.com/v1",
    anthropic: "https://token-plan-sgp.xiaomimimo.com/anthropic/v1/messages",
  },
  china: {
    host: "https://token-plan-cn.xiaomimimo.com",
    openai: "https://token-plan-cn.xiaomimimo.com/v1",
    anthropic: "https://token-plan-cn.xiaomimimo.com/anthropic/v1/messages",
  },
  amsterdam: {
    host: "https://token-plan-ams.xiaomimimo.com",
    openai: "https://token-plan-ams.xiaomimimo.com/v1",
    anthropic: "https://token-plan-ams.xiaomimimo.com/anthropic/v1/messages",
  },
};

export const DEFAULT_XIAOMI_MIMO_TOKEN_PLAN_REGION: XiaomiMimoTokenPlanRegion =
  "singapore";

export function normalizeXiaomiTokenPlanRegion(
  value: unknown,
  fallback: XiaomiMimoTokenPlanRegion = DEFAULT_XIAOMI_MIMO_TOKEN_PLAN_REGION
): XiaomiMimoTokenPlanRegion {
  if (typeof value !== "string") return fallback;
  const lower = value.trim().toLowerCase();
  if (lower === "singapore" || lower === "sgp" || lower === "sg") {
    return "singapore";
  }
  if (lower === "china" || lower === "cn" || lower === "china-beijing") {
    return "china";
  }
  if (lower === "amsterdam" || lower === "ams" || lower === "europe") {
    return "amsterdam";
  }
  return fallback;
}

export function isXiaomiTokenPlanRegionalProvider(
  providerId?: string | null
): boolean {
  return providerId === "xiaomi-mimo-token-plan";
}

export function resolveXiaomiTokenPlanBaseUrl(
  providerSpecificData?: unknown,
  fallback?: string
): string {
  const psd = (
    providerSpecificData && typeof providerSpecificData === "object"
      ? providerSpecificData
      : {}
  ) as Record<string, unknown>;

  // Deliberate custom override takes precedence
  if (typeof psd.baseUrl === "string" && psd.baseUrl.trim()) {
    return psd.baseUrl.trim();
  }

  const region = normalizeXiaomiTokenPlanRegion(psd.region);
  return (
    XIAOMI_MIMO_TOKEN_PLAN_ENDPOINTS[region]?.openai ??
    fallback ??
    XIAOMI_MIMO_TOKEN_PLAN_ENDPOINTS.singapore.openai
  );
}

export function normalizeXiaomiAnthropicMessagesUrl(baseUrl: string): string {
  const trimmed = baseUrl.trim().replace(/\/+$/, "");
  if (trimmed.endsWith("/messages")) {
    return trimmed;
  }
  if (trimmed.endsWith("/v1")) {
    return `${trimmed}/messages`;
  }
  if (trimmed.endsWith("/anthropic")) {
    return `${trimmed}/v1/messages`;
  }
  return `${trimmed}/anthropic/v1/messages`;
}

export function resolveXiaomiTokenPlanAnthropicUrl(
  providerSpecificData?: unknown,
  fallback?: string
): string {
  const psd = (
    providerSpecificData && typeof providerSpecificData === "object"
      ? providerSpecificData
      : {}
  ) as Record<string, unknown>;

  // Deliberate custom override takes precedence
  if (typeof psd.baseUrl === "string" && psd.baseUrl.trim()) {
    return normalizeXiaomiAnthropicMessagesUrl(psd.baseUrl);
  }

  const region = normalizeXiaomiTokenPlanRegion(psd.region);
  return (
    XIAOMI_MIMO_TOKEN_PLAN_ENDPOINTS[region]?.anthropic ??
    fallback ??
    XIAOMI_MIMO_TOKEN_PLAN_ENDPOINTS.singapore.anthropic
  );
}
