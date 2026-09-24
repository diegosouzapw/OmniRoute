/**
 * Xiaomi MiMo Token Plan regional clusters.
 *
 * A Token Plan key authenticates only on the cluster that issued it
 * (China, Singapore, or Amsterdam). The same key returns 401 on the other
 * clusters and on api.xiaomimimo.com. The region is stored per connection as
 * providerSpecificData.region; connections saved before the selector existed
 * have no region and keep the Singapore host they were created against.
 */

export const XIAOMI_TOKEN_PLAN_REGION_VALUES = ["cn", "sgp", "ams"] as const;

export type XiaomiTokenPlanRegion = (typeof XIAOMI_TOKEN_PLAN_REGION_VALUES)[number];

export const XIAOMI_TOKEN_PLAN_PROVIDER_ID = "xiaomi-mimo-token-plan";

export const DEFAULT_XIAOMI_TOKEN_PLAN_REGION: XiaomiTokenPlanRegion = "sgp";

const REGION_HOSTS: Readonly<Record<XiaomiTokenPlanRegion, string>> = {
  cn: "https://token-plan-cn.xiaomimimo.com",
  sgp: "https://token-plan-sgp.xiaomimimo.com",
  ams: "https://token-plan-ams.xiaomimimo.com",
};

const SLASH_CHAR_CODE = 47;

function stripTrailingSlashes(value: string): string {
  let end = value.length;
  while (end > 0 && value.charCodeAt(end - 1) === SLASH_CHAR_CODE) end--;
  return end === value.length ? value : value.slice(0, end);
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function isXiaomiTokenPlanProvider(providerId: string | null | undefined): boolean {
  return providerId === XIAOMI_TOKEN_PLAN_PROVIDER_ID;
}

export function normalizeXiaomiTokenPlanRegion(value: unknown): XiaomiTokenPlanRegion | null {
  if (typeof value !== "string") return null;
  switch (value.trim().toLowerCase()) {
    case "cn":
    case "china":
    case "token-plan-cn":
      return "cn";
    case "sgp":
    case "sg":
    case "singapore":
    case "token-plan-sgp":
      return "sgp";
    case "ams":
    case "amsterdam":
    case "europe":
    case "eu":
    case "token-plan-ams":
      return "ams";
    default:
      return null;
  }
}

export function resolveXiaomiTokenPlanRegion(
  providerSpecificData?: unknown
): XiaomiTokenPlanRegion {
  return (
    normalizeXiaomiTokenPlanRegion(asRecord(providerSpecificData).region) ??
    DEFAULT_XIAOMI_TOKEN_PLAN_REGION
  );
}

/** Cluster origin for the region, e.g. https://token-plan-ams.xiaomimimo.com */
export function xiaomiTokenPlanOrigin(region: XiaomiTokenPlanRegion): string {
  return REGION_HOSTS[region];
}

/** OpenAI-compatible root: <origin>/v1 */
export function xiaomiTokenPlanOpenAiRoot(region: XiaomiTokenPlanRegion): string {
  return `${REGION_HOSTS[region]}/v1`;
}

/** Anthropic-compatible endpoint: <origin>/anthropic/v1/messages */
export function xiaomiTokenPlanAnthropicUrl(region: XiaomiTokenPlanRegion): string {
  return `${REGION_HOSTS[region]}/anthropic/v1/messages`;
}

/**
 * True when the value is exactly one of the built-in regional presets, so a
 * saved preset URL must not pin a connection against a later region change.
 * Anything else (including a bare cluster origin or a proxy) is a deliberate
 * custom endpoint and keeps winning.
 */
export function isXiaomiTokenPlanPresetUrl(value: string): boolean {
  const normalized = stripTrailingSlashes(value.trim()).toLowerCase();
  return XIAOMI_TOKEN_PLAN_REGION_VALUES.some((region) => {
    const origin = REGION_HOSTS[region].toLowerCase();
    return (
      normalized === `${origin}/v1` ||
      normalized === `${origin}/v1/chat/completions` ||
      normalized === `${origin}/anthropic` ||
      normalized === `${origin}/anthropic/v1` ||
      normalized === `${origin}/anthropic/v1/messages`
    );
  });
}

/**
 * OpenAI-compatible root for a Token Plan connection.
 * A deliberate custom base URL wins; historical preset URLs follow the region.
 */
export function resolveXiaomiTokenPlanBaseUrl(
  providerSpecificData?: unknown,
  fallback = ""
): string {
  const data = asRecord(providerSpecificData);
  const configured =
    typeof data.baseUrl === "string" && data.baseUrl.trim() ? data.baseUrl.trim() : "";
  if (configured && !isXiaomiTokenPlanPresetUrl(configured))
    return stripTrailingSlashes(configured);
  const region = resolveXiaomiTokenPlanRegion(data);
  return xiaomiTokenPlanOpenAiRoot(region) || fallback;
}
