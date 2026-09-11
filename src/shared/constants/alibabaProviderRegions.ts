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
  // The catalog entry is the personal TOKEN Plan (see providers/apikey/regional.ts:
  // name "Alibaba Token Plan"). The legacy coding-intl/coding hosts serve the separate
  // Coding Plan product and reject Token Plan keys with 401 invalid_api_key — verified
  // live 2026-08-18 against the same key that returns 429 (quota) on the host below.
  // Keeps /apps/anthropic/v1 because the registry entry is format "claude".
  "bailian-coding-plan": {
    "global-sg": "https://token-plan.ap-southeast-1.maas.aliyuncs.com/apps/anthropic/v1",
    "china-beijing": "https://token-plan.cn-beijing.maas.aliyuncs.com/apps/anthropic/v1",
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

const SLASH_CHAR_CODE = 47;

/**
 * Strip every trailing "/" in linear time.
 *
 * Deliberately not a regex: `/\/+$/` has no left anchor, so the engine retries at
 * every start offset and each attempt re-walks the slash run before failing `$` —
 * quadratic on an endpoint made of many slashes (CodeQL js/polynomial-redos).
 * Connection base URLs are operator-supplied, so they reach this trim directly.
 */
function stripTrailingSlashes(value: string): string {
  let end = value.length;
  while (end > 0 && value.charCodeAt(end - 1) === SLASH_CHAR_CODE) end--;
  return end === value.length ? value : value.slice(0, end);
}

function normalizeEndpoint(value: string): string {
  return stripTrailingSlashes(value.trim())
    .replace(/\/(?:chat\/completions|messages)$/i, "")
    .toLowerCase();
}

/**
 * Preset hosts this family used to ship. They must keep counting as presets: a connection
 * saved while a preset was current carries that URL in providerSpecificData.baseUrl, and if
 * a retired preset were mistaken for a deliberate custom URL the connection would stay
 * pinned to a host that no longer accepts its key, deaf to the region selector.
 */
const LEGACY_FAMILY_PRESETS: Readonly<Record<AlibabaProviderFamily, readonly string[]>> = {
  alibaba: [],
  // Retired 2026-08-18 — Coding Plan hosts, wrong product for this Token Plan entry.
  "bailian-coding-plan": [
    "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
    "https://coding.dashscope.aliyuncs.com/apps/anthropic/v1",
  ],
  "qwen-cloud": [],
  "qwen-cloud-token-plan": [],
};

/**
 * Media (AIGC) roots, when they differ from the chat root.
 *
 * Only bailian-coding-plan diverges: its CHAT traffic moved to the Token Plan host
 * (2026-08), but image/video generation keeps running on the DashScope AIGC service
 * (`/api/v1/services/aigc/…`) — see imageRegistry.ts / videoRegistry.ts, which pin those
 * hosts literally. Deriving media from the chat root would have silently repointed every
 * Bailian image/video call at a host that does not serve AIGC.
 */
const ALIBABA_PROVIDER_MEDIA_OVERRIDES: Partial<
  Record<AlibabaProviderFamily, Readonly<Record<AlibabaProviderRegion, string>>>
> = {
  "bailian-coding-plan": {
    "global-sg": "https://coding-intl.dashscope.aliyuncs.com/api/v1",
    "china-beijing": "https://coding.dashscope.aliyuncs.com/api/v1",
  },
};

function isFamilyPresetUrl(family: AlibabaProviderFamily, value: string): boolean {
  const normalized = normalizeEndpoint(value);
  const isCurrentPreset = ALIBABA_PROVIDER_REGION_VALUES.some(
    (region) => normalizeEndpoint(ALIBABA_PROVIDER_ENDPOINTS[family][region]) === normalized
  );
  if (isCurrentPreset) return true;
  return LEGACY_FAMILY_PRESETS[family].some((preset) => normalizeEndpoint(preset) === normalized);
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

function resolveAlibabaCompatibleApiRoot(
  providerId: string,
  providerSpecificData: unknown,
  fallback: string,
  apiFamily: "compatible-mode" | "compatible-api"
): string {
  const resolved = stripTrailingSlashes(
    resolveAlibabaProviderBaseUrl(providerId, providerSpecificData, fallback).trim()
  ).replace(/\/(?:chat\/completions|embeddings|reranks?|models)$/i, "");
  if (!resolved) return "";

  const compatibleRoot = resolved.replace(/\/compatible-(?:mode|api)\/v1$/i, `/${apiFamily}/v1`);
  if (compatibleRoot !== resolved) return compatibleRoot;

  try {
    const url = new URL(resolved);
    const isAlibabaCloudRoot =
      (url.pathname === "" || url.pathname === "/") &&
      (url.hostname === "dashscope.aliyuncs.com" ||
        url.hostname === "dashscope-intl.aliyuncs.com" ||
        url.hostname.endsWith(".maas.aliyuncs.com"));
    if (isAlibabaCloudRoot) return `${stripTrailingSlashes(resolved)}/${apiFamily}/v1`;
  } catch {
    // Keep operator-supplied proxy paths unchanged; validation owns URL rejection.
  }

  return resolved;
}

/** Resolve the selected Alibaba connection's OpenAI-compatible embedding endpoint. */
export function resolveAlibabaProviderEmbeddingUrl(
  providerId: string,
  providerSpecificData?: unknown,
  fallback = ""
): string {
  const root = resolveAlibabaCompatibleApiRoot(
    providerId,
    providerSpecificData,
    fallback,
    "compatible-mode"
  );
  return root ? `${root}/embeddings` : "";
}

/** Resolve qwen3-rerank's flat compatible endpoint for the selected connection. */
export function resolveAlibabaQwen3RerankUrl(
  providerId: string,
  providerSpecificData?: unknown,
  fallback = ""
): string {
  const root = resolveAlibabaCompatibleApiRoot(
    providerId,
    providerSpecificData,
    fallback,
    "compatible-api"
  );
  return root ? `${root}/reranks` : "";
}

export function resolveAlibabaProviderModelsUrl(
  providerId: string,
  providerSpecificData?: unknown,
  fallback = ""
): string {
  const baseUrl = stripTrailingSlashes(
    resolveAlibabaProviderBaseUrl(providerId, providerSpecificData, fallback).trim()
  ).replace(/\/(?:chat\/completions|messages|models)$/i, "");
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
  const family = canonicalProviderFamily(providerId);
  const data = asRecord(providerSpecificData);
  const configuredBaseUrl =
    typeof data.baseUrl === "string" && data.baseUrl.trim() ? data.baseUrl.trim() : "";
  const mediaOverride = family ? ALIBABA_PROVIDER_MEDIA_OVERRIDES[family] : undefined;

  // A custom base URL still drives media, as before — the override only replaces the
  // preset-derived host.
  if (
    family &&
    mediaOverride &&
    (!configuredBaseUrl || isFamilyPresetUrl(family, configuredBaseUrl))
  ) {
    return mediaOverride[resolveAlibabaProviderRegion(providerId, data)];
  }

  return stripTrailingSlashes(
    resolveAlibabaProviderBaseUrl(providerId, providerSpecificData, fallback).trim()
  )
    .replace(/\/compatible-mode\/v1(?:\/(?:chat\/completions|models))?$/i, "/api/v1")
    .replace(/\/apps\/anthropic(?:\/v1)?(?:\/messages)?$/i, "/api/v1");
}
