// Pure, shared helpers for the provider-detail page and its extracted modals
// (Issue #3501 strangler-fig decomposition, Phase 2). Leaf module — imports only
// from @/shared, @/lib and colocated sibling modules that are themselves acyclic,
// so the page client AND colocated modals can import these without a circular
// dependency. Extracting them here unblocks moving the heavier modals
// (AddApiKeyModal / EditConnectionModal) out of the god-component in later phases.
import { LOCAL_PROVIDERS, isSelfHostedChatProvider } from "@/shared/constants/providers";
import {
  MODEL_COMPAT_PROTOCOL_KEYS,
  type ModelCompatProtocolKey,
} from "@/shared/constants/modelCompat";
import {
  getClaudeCodeCompatibleRequestDefaults as _getClaudeCodeCompatibleRequestDefaults,
  getCodexRequestDefaults as _getCodexRequestDefaults,
  type CodexServiceTier,
} from "@/lib/providers/requestDefaults";
import { type CodexGlobalServiceMode } from "@/lib/providers/codexFastTier";
import { type WebSessionCredentialRequirement } from "./webSessionCredentials";

// ---------------------------------------------------------------------------
// Types shared between page + modals
// ---------------------------------------------------------------------------

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

export type CommandCodeAuthFlowState = {
  phase:
    | "idle"
    | "starting"
    | "polling"
    | "received"
    | "applying"
    | "applied"
    | "expired"
    | "error";
  state: string;
  authUrl: string;
  callbackUrl: string;
  expiresAt: string | null;
  message?: string;
};

// ---------------------------------------------------------------------------
// Compat model map types (shared by upstream-headers helpers and the page)
// ---------------------------------------------------------------------------

export type CompatByProtocolMap = Partial<
  Record<
    ModelCompatProtocolKey,
    {
      normalizeToolCallId?: boolean;
      preserveOpenAIDeveloperRole?: boolean;
      upstreamHeaders?: Record<string, string>;
    }
  >
>;

export type CompatModelRow = {
  id?: string;
  name?: string;
  source?: string;
  apiFormat?: string;
  supportedEndpoints?: string[];
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
  isHidden?: boolean;
  upstreamHeaders?: Record<string, string>;
  compatByProtocol?: CompatByProtocolMap;
};

export type CompatModelMap = Map<string, CompatModelRow>;

export type HeaderDraftRow = { id: string; name: string; value: string };

// ---------------------------------------------------------------------------
// Utility — message translation with fallback
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Base-URL helpers
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Routing-tags / excluded-models parse + format
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Web-session credential label / hint helpers (Phase 2b)
// ---------------------------------------------------------------------------

export function getWebSessionCredentialLabel(
  t: ProviderMessageTranslator,
  requirement: WebSessionCredentialRequirement,
  optional: boolean
): string {
  if (requirement.kind === "none") {
    return providerText(t, "webNoAuthCredentialLabel", "No credential required");
  }
  const baseLabel =
    requirement.kind === "token"
      ? providerText(t, "webTokenCredentialLabel", "Web session token")
      : t("sessionCookieLabel");
  return optional ? `${baseLabel} (${t("optional").toLowerCase()})` : baseLabel;
}

export function getWebSessionCredentialHint(
  t: ProviderMessageTranslator,
  requirement: WebSessionCredentialRequirement,
  providerName: string,
  editing: boolean
): string | undefined {
  if (requirement.kind === "none") return undefined;

  const values = { provider: providerName, credential: requirement.credentialName };
  if (editing) {
    return requirement.kind === "token"
      ? providerText(
          t,
          "webTokenEditHint",
          "Leave blank to keep the current web session token. Credential: {credential}.",
          values
        )
      : providerText(
          t,
          "webCookieEditHint",
          "Leave blank to keep the current session cookie. Required cookie: {credential}.",
          values
        );
  }

  return requirement.kind === "token"
    ? providerText(
        t,
        "webTokenCredentialHint",
        "Credential: {credential}. Paste the token value from your own signed-in {provider} web session, or a DevTools HAR export if the provider supports it.",
        values
      )
    : providerText(
        t,
        "webCookieCredentialHint",
        "Required cookie: {credential}. Paste the Cookie header value from your own signed-in {provider} web session. Do not include the Cookie: prefix.",
        values
      );
}

export function getWebSessionCredentialCheckLabel(
  t: ProviderMessageTranslator,
  requirement: WebSessionCredentialRequirement
): string {
  if (requirement.kind === "token") return providerText(t, "checkWebToken", "Check token");
  return providerText(t, "checkCookie", "Check cookie");
}

export function getAddCredentialModalTitle(
  t: ProviderMessageTranslator,
  providerName: string,
  requirement: WebSessionCredentialRequirement | null
): string {
  if (!requirement) return t("addProviderApiKeyTitle", { provider: providerName });
  if (requirement.kind === "none") {
    return providerText(t, "addProviderConnectionTitle", "Add {provider} connection", {
      provider: providerName,
    });
  }
  if (requirement.kind === "token") {
    return providerText(t, "addProviderWebTokenTitle", "Add {provider} web token", {
      provider: providerName,
    });
  }
  return providerText(t, "addProviderSessionCookieTitle", "Add {provider} session cookie", {
    provider: providerName,
  });
}

// ---------------------------------------------------------------------------
// Upstream-headers helpers (Phase 2b)
// ---------------------------------------------------------------------------

export const UPSTREAM_HEADERS_UI_MAX = 16;

export function upstreamHeadersRecordsEqual(
  a: Record<string, string>,
  b: Record<string, string>
): boolean {
  const ka = Object.keys(a).sort();
  const kb = Object.keys(b).sort();
  if (ka.length !== kb.length) return false;
  return ka.every((k, i) => k === kb[i] && a[k] === b[k]);
}

export function headerRowsToRecord(rows: HeaderDraftRow[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const r of rows) {
    const k = r.name.trim();
    if (!k) continue;
    out[k] = r.value;
  }
  return out;
}

// Internal helper: returns the per-protocol compat slice for a model (custom
// overrides take precedence over overrideMap).
export function getProtoSlice(
  c: CompatModelRow | undefined,
  o: CompatModelRow | undefined,
  protocol: string
) {
  return c?.compatByProtocol?.[protocol] ?? o?.compatByProtocol?.[protocol];
}

export function effectiveUpstreamHeadersForProtocol(
  modelId: string,
  protocol: string,
  customMap: CompatModelMap,
  overrideMap: CompatModelMap
): Record<string, string> {
  const c = customMap.get(modelId);
  const o = overrideMap.get(modelId);
  const base: Record<string, string> = {};
  if (c?.upstreamHeaders && typeof c.upstreamHeaders === "object") {
    Object.assign(base, c.upstreamHeaders);
  } else if (o?.upstreamHeaders && typeof o.upstreamHeaders === "object") {
    Object.assign(base, o.upstreamHeaders);
  }
  const pc = getProtoSlice(c, o, protocol);
  if (pc?.upstreamHeaders && typeof pc.upstreamHeaders === "object") {
    Object.assign(base, pc.upstreamHeaders);
  }
  return base;
}

export function anyUpstreamHeadersBadge(
  modelId: string,
  customMap: CompatModelMap,
  overrideMap: CompatModelMap
): boolean {
  const c = customMap.get(modelId);
  const o = overrideMap.get(modelId);
  const nonempty = (u: unknown) =>
    u && typeof u === "object" && !Array.isArray(u) && Object.keys(u as object).length > 0;
  if (nonempty(c?.upstreamHeaders) || nonempty(o?.upstreamHeaders)) return true;
  for (const p of MODEL_COMPAT_PROTOCOL_KEYS) {
    const pc = getProtoSlice(c, o, p);
    if (nonempty(pc?.upstreamHeaders)) return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Codex helpers + consts (Phase 2b)
// ---------------------------------------------------------------------------

export const CODEX_REASONING_STRENGTH_OPTIONS = [
  { value: "none", label: "None" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "xhigh", label: "XHigh" },
];

export const CODEX_ACCOUNT_SERVICE_TIER_VALUES: CodexServiceTier[] = [
  "default",
  "priority",
  "flex",
];

export const CODEX_GLOBAL_SERVICE_MODE_VALUES: CodexGlobalServiceMode[] = [
  "none",
  ...CODEX_ACCOUNT_SERVICE_TIER_VALUES,
];

export function getCodexServiceTierLabel(
  t: ProviderMessageTranslator,
  value: CodexGlobalServiceMode
): string {
  if (value === "none") {
    return providerText(t, "codexServiceModeNone", "No global setting");
  }
  if (value === "default") return providerText(t, "codexServiceTierDefault", "Default");
  if (value === "priority") return providerText(t, "codexServiceTierPriority", "Priority");
  return providerText(t, "codexServiceTierFlex", "Flex");
}

export function normalizeCodexLimitPolicy(policy: unknown): { use5h: boolean; useWeekly: boolean } {
  const record =
    policy && typeof policy === "object" && !Array.isArray(policy)
      ? (policy as Record<string, unknown>)
      : {};
  return {
    use5h: typeof record.use5h === "boolean" ? record.use5h : true,
    useWeekly: typeof record.useWeekly === "boolean" ? record.useWeekly : true,
  };
}

/**
 * UI adapter around the canonical getCodexRequestDefaults from requestDefaults.ts.
 * Adds the "medium" fallback for reasoningEffort required by the connection form.
 */
export function getCodexRequestDefaults(providerSpecificData: unknown): {
  reasoningEffort: string;
  serviceTier?: CodexServiceTier;
} {
  const defaults = _getCodexRequestDefaults(providerSpecificData);
  return {
    reasoningEffort: defaults.reasoningEffort ?? "medium",
    ...(defaults.serviceTier ? { serviceTier: defaults.serviceTier } : {}),
  };
}

export function getClaudeCodeCompatibleRequestDefaults(providerSpecificData: unknown): {
  context1m: boolean;
} {
  const defaults = _getClaudeCodeCompatibleRequestDefaults(providerSpecificData);
  return {
    context1m: defaults.context1m === true,
  };
}

// ---------------------------------------------------------------------------
// Misc pure helpers (Phase 2b)
// ---------------------------------------------------------------------------

export const SILICONFLOW_ENDPOINTS = [
  { id: "siliconflow", label: "Global", baseUrl: "https://api.siliconflow.com/v1" },
  { id: "siliconflow-cn", label: "China", baseUrl: "https://api.siliconflow.cn/v1" },
] as const;

export function compatProtocolLabelKey(protocol: string): string {
  if (protocol === "openai") return "compatProtocolOpenAI";
  if (protocol === "openai-responses") return "compatProtocolOpenAIResponses";
  if (protocol === "claude") return "compatProtocolClaude";
  return "compatProtocolOpenAI";
}

export function extractCommandCodeCredentialInput(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (parsed && typeof parsed === "object") {
      const record = parsed as Record<string, unknown>;
      const direct = record.apiKey || record.api_key || record.key || record.token;
      if (typeof direct === "string" && direct.trim()) return direct.trim();
      const nested = record.data;
      if (nested && typeof nested === "object") {
        const nestedRecord = nested as Record<string, unknown>;
        const nestedKey = nestedRecord.apiKey || nestedRecord.api_key || nestedRecord.key;
        if (typeof nestedKey === "string" && nestedKey.trim()) return nestedKey.trim();
      }
    }
  } catch {
    // Not JSON; continue with URL/raw parsing.
  }

  try {
    const url = new URL(trimmed);
    const key =
      url.searchParams.get("apiKey") ||
      url.searchParams.get("api_key") ||
      url.searchParams.get("key") ||
      url.searchParams.get("token");
    if (key?.trim()) return key.trim();
    const hash = url.hash.replace(/^#/, "");
    if (hash) {
      const hashParams = new URLSearchParams(hash);
      const hashKey =
        hashParams.get("apiKey") ||
        hashParams.get("api_key") ||
        hashParams.get("key") ||
        hashParams.get("token");
      if (hashKey?.trim()) return hashKey.trim();
    }
  } catch {
    // Not a URL; use the raw value.
  }

  return trimmed;
}

export function normalizeAndValidateHttpBaseUrl(
  rawValue: unknown,
  fallbackUrl: string
): { value: string | null; error: string | null } {
  const value = (typeof rawValue === "string" ? rawValue.trim() : "") || fallbackUrl;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { value: null, error: "Base URL must use http or https" };
    }
    return { value, error: null };
  } catch {
    return { value: null, error: "Base URL must be a valid URL" };
  }
}
