// Pure, shared helpers for the provider-detail page and its extracted modals
// (Issue #3501 strangler-fig decomposition, Phase 2). Leaf module — imports only
// from @/shared, @/lib and colocated sibling modules that are themselves acyclic,
// so the page client AND colocated modals can import these without a circular
// dependency. Extracting them here unblocks moving the heavier modals
// (AddApiKeyModal / EditConnectionModal) out of the god-component in later phases.
import { LOCAL_PROVIDERS, isSelfHostedChatProvider } from "@/shared/constants/providers";
import { MODAL_DEFAULT_VALIDATION_MODEL_ID } from "@/shared/constants/modal";
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
import { CC_COMPATIBLE_DEFAULT_CHAT_PATH } from "./providerDetailConstants";
import {
  type ProviderMessageTranslator,
  providerText,
  getWebSessionCredentialLabel,
  getWebSessionCredentialHint,
  getWebSessionCredentialCheckLabel,
  getAddCredentialModalTitle,
} from "./providerCredentialText";

// Re-exported for backward compatibility — these used to be defined here
// (Issue #3501 strangler-fig home), but were extracted to providerCredentialText.ts
// once this leaf hit its frozen file-size cap (#1904 own growth).
export {
  type ProviderMessageTranslator,
  providerText,
  getWebSessionCredentialLabel,
  getWebSessionCredentialHint,
  getWebSessionCredentialCheckLabel,
  getAddCredentialModalTitle,
};

// ---------------------------------------------------------------------------
// Types shared between page + modals
// ---------------------------------------------------------------------------

export type LocalProviderMetadata = {
  name?: string;
  localDefault?: string;
  [key: string]: unknown;
};

export type CommandCodeAuthFlowState = {
  phase:
    "idle" | "starting" | "polling" | "received" | "applying" | "applied" | "expired" | "error";
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
  /** optional registry aliases for display/import */ aliases?: readonly string[];
  source?: string;
  apiFormat?: string;
  supportedEndpoints?: string[];
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
  isHidden?: boolean;
  isDeleted?: boolean;
  upstreamHeaders?: Record<string, string>;
  compatByProtocol?: CompatByProtocolMap;
  /** #2905: per-model upstream wire-format override. */ targetFormat?: string;
  /** #4125: manual context-window override (tokens), when set. */ contextWindowOverride?: number;
  /** #1904: manual vision-capability override for custom models whose upstream
   * discovery metadata doesn't self-report an image input modality. */
  supportsVision?: boolean;
};

export type CompatModelMap = Map<string, CompatModelRow>;
export type HeaderDraftRow = { id: string; name: string; value: string };

// ---------------------------------------------------------------------------
// #2905 — per-model targetFormat badge label mapping (pure, so it can be unit-tested
// outside the .tsx). Returns the i18n key for a targetFormat value, or null when the
// value is unknown (the caller then renders the raw value verbatim).
// ---------------------------------------------------------------------------
const TARGET_FORMAT_BADGE_I18N_KEYS: Record<string, string> = {
  openai: "compatProtocolOpenAI",
  "openai-responses": "compatProtocolOpenAIResponses",
  claude: "compatProtocolClaude",
  gemini: "targetFormatGemini",
  antigravity: "targetFormatAntigravity",
};

export function targetFormatBadgeI18nKey(value: string): string | null {
  return TARGET_FORMAT_BADGE_I18N_KEYS[value] ?? null;
}

/** #5442 — badge for add-credential validation; unsupported → neutral N/A (not red Invalid). */
export function validationBadgeProps(result: string): {
  variant: "success" | "error" | "info";
  labelKey: string;
  fallback: string;
} {
  if (result === "success") return { variant: "success", labelKey: "valid", fallback: "Valid" };
  if (result === "unsupported")
    return { variant: "info", labelKey: "notApplicable", fallback: "N/A" };
  return { variant: "error", labelKey: "invalid", fallback: "Invalid" };
}

/** A single model's outcome from a `/api/models/test-all` response. */
export interface TestAllModelOutcome {
  status: "ok" | "error";
  shouldHide: boolean;
}
type TestAllEntryStatus = "ok" | "error" | "slow";

/**
 * Decide a model's per-row test status (the green/red icon) and whether it should
 * be auto-hidden, from one `/api/models/test-all` result entry.
 *
 * Centralised so both "Test all models" handlers (ProviderDetailPageClient and
 * PassthroughModelsSection) derive — and then apply — the same per-model status.
 * Previously test-all only counted ok/error for a toast and never updated
 * `modelTestStatus`, so the icons stayed blank and users could not tell which
 * model failed (unlike the single-model ▶ test).
 *
 * Auto-hide policy: when `autoHideFailed` is on, only NON-TRANSIENT failures are
 * hidden. Transient failures remain visible because the model may still be healthy
 * and hidden state persists across restarts, removing it from `/v1/models`.
 *
 * Genuine failures (`status:"error"` without a transient flag — e.g. upstream
 * 400 "invalid model", schema mismatch, auth failure) ARE still auto-hidden,
 * which is the intended use of the toggle.
 */
export function evaluateTestAllEntry(
  entry:
    | {
        status?: TestAllEntryStatus;
        rateLimited?: boolean;
        isTimeout?: boolean;
        isTransient?: boolean;
      }
    | null
    | undefined,
  autoHideFailed: boolean
): TestAllModelOutcome {
  const ok = entry?.status === "ok";
  const transient = [entry?.rateLimited, entry?.isTimeout, entry?.isTransient].some(Boolean);
  return {
    status: ok ? "ok" : "error",
    // Hide only persistent failures. Transient (rate-limited, timeout) are
    // surfaced on the icon but kept visible so a single throttled batch test
    // does not silently wipe the catalog.
    shouldHide: !ok && autoHideFailed && !transient,
  };
}

/**
 * "Test all models" result toast. Centralises the i18n variable contract so the
 * call sites cannot drift from the `testAllResults` template again — the template
 * is `"{ok} of {total} models working"`, so it MUST receive `ok` and `total`
 * (passing `{ ok, error }` previously raised next-intl's FORMATTING_ERROR).
 */
export function testAllResultsText(
  t: ProviderMessageTranslator,
  ok: number,
  total: number
): string {
  return providerText(t, "testAllResults", "{ok} of {total} models working", { ok, total });
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
  "xiaomi-mimo",
  "siliconflow",
  "heroku",
  "databricks",
  "snowflake",
  "searxng-search",
  "petals",
  "comfyui",
]);

export const DEFAULT_PROVIDER_BASE_URLS: Record<string, string> = {
  "azure-openai": "https://example-resource.openai.azure.com",
  "azure-ai": "https://example-resource.services.ai.azure.com/openai/v1",
  "bailian-coding-plan": "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
  "xiaomi-mimo": "https://token-plan-sgp.xiaomimimo.com/v1",
  siliconflow: "https://api.siliconflow.com/v1",
  "searxng-search": "http://localhost:8888/search",
  petals: "https://chat.petals.dev/api/v1/generate",
  comfyui: "http://localhost:8188",
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

/**
 * #6147 — whether a built-in provider is eligible for an OPT-IN "Advanced →
 * override base URL" affordance in the edit-connection modal.
 *
 * This does NOT widen the always-on base-URL field: providers already covered by
 * `isBaseUrlConfigurableProvider` (the configurable set + self-hosted) keep their
 * existing dedicated field and return `false` here. Every *other* provider id is
 * eligible to opt in per-connection so an operator can hot-fix a broken built-in
 * preset by pointing it at a custom endpoint. The field stays hidden until the
 * user explicitly reveals it (or an override was already saved), so nothing is
 * exposed by default. OAuth connections are excluded at the call site, since
 * their save path does not persist `providerSpecificData.baseUrl`.
 */
export function isBaseUrlOverrideEligibleProvider(providerId?: string | null): boolean {
  if (!providerId) return false;
  if (isBaseUrlConfigurableProvider(providerId)) return false;
  return true;
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
    case "comfyui":
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

// parseRoutingTagsInput / parseExcludedModelsInput moved to the pure leaf
// providerInputParsers.ts (kept re-exported here for existing UI importers).
export { parseExcludedModelsInput, parseRoutingTagsInput } from "./providerInputParsers";

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
// Web-session credential label / hint helpers (Phase 2b) — moved to
// providerCredentialText.ts (#1904 own growth); re-exported above.
// ---------------------------------------------------------------------------

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
// Model-compat compute helpers (Phase 1e — moved from god-component).
// These are pure functions that derive effective compat state from the two
// maps (customModels + modelCompatOverrides).  They live here so both the
// page client AND extracted components can import them without a cycle.
// ---------------------------------------------------------------------------

export function buildCompatMap(rows: CompatModelRow[]): CompatModelMap {
  const m = new Map<string, CompatModelRow>();
  for (const r of rows) if (r.id) m.set(r.id, r);
  return m;
}

export function getDisplayModelAlias(modelId: string, alias?: string | null): string | null {
  const trimmed = typeof alias === "string" ? alias.trim() : "";
  if (!trimmed || trimmed === modelId) return null;
  return trimmed;
}

function readActiveHiddenFlag(row: CompatModelRow | undefined): boolean | undefined {
  if (!row || row.isDeleted === true) return undefined;
  if (Object.prototype.hasOwnProperty.call(row, "isHidden")) {
    return Boolean(row.isHidden);
  }
  return undefined;
}

export function isModelHiddenFn(
  modelId: string,
  customMap: CompatModelMap,
  overrideMap: CompatModelMap
): boolean {
  const customHidden = readActiveHiddenFlag(customMap.get(modelId));
  if (customHidden !== undefined) return customHidden;

  const overrideHidden = readActiveHiddenFlag(overrideMap.get(modelId));
  if (overrideHidden !== undefined) return overrideHidden;

  return false;
}

export function effectiveNormalizeForProtocol(
  modelId: string,
  protocol: string,
  customMap: CompatModelMap,
  overrideMap: CompatModelMap
): boolean {
  const c = customMap.get(modelId);
  const o = overrideMap.get(modelId);
  const pc = getProtoSlice(c, o, protocol);
  if (pc && Object.prototype.hasOwnProperty.call(pc, "normalizeToolCallId")) {
    return Boolean(pc.normalizeToolCallId);
  }
  if (c?.normalizeToolCallId) return true;
  return Boolean(o?.normalizeToolCallId);
}

export function effectivePreserveForProtocol(
  modelId: string,
  protocol: string,
  customMap: CompatModelMap,
  overrideMap: CompatModelMap
): boolean {
  const c = customMap.get(modelId);
  const o = overrideMap.get(modelId);
  const pc = getProtoSlice(c, o, protocol);
  if (pc && Object.prototype.hasOwnProperty.call(pc, "preserveOpenAIDeveloperRole")) {
    return Boolean(pc.preserveOpenAIDeveloperRole);
  }
  if (c && Object.prototype.hasOwnProperty.call(c, "preserveOpenAIDeveloperRole")) {
    return Boolean(c.preserveOpenAIDeveloperRole);
  }
  if (o && Object.prototype.hasOwnProperty.call(o, "preserveOpenAIDeveloperRole")) {
    return Boolean(o.preserveOpenAIDeveloperRole);
  }
  return true;
}

export function anyNormalizeCompatBadge(
  modelId: string,
  customMap: CompatModelMap,
  overrideMap: CompatModelMap
): boolean {
  const c = customMap.get(modelId);
  const o = overrideMap.get(modelId);
  if (c?.normalizeToolCallId || o?.normalizeToolCallId) return true;
  for (const p of MODEL_COMPAT_PROTOCOL_KEYS) {
    const pc = getProtoSlice(c, o, p);
    if (pc?.normalizeToolCallId) return true;
  }
  return false;
}

export function anyNoPreserveCompatBadge(
  modelId: string,
  customMap: CompatModelMap,
  overrideMap: CompatModelMap
): boolean {
  const c = customMap.get(modelId);
  const o = overrideMap.get(modelId);
  if (
    c &&
    Object.prototype.hasOwnProperty.call(c, "preserveOpenAIDeveloperRole") &&
    c.preserveOpenAIDeveloperRole === false
  ) {
    return true;
  }
  if (
    o &&
    Object.prototype.hasOwnProperty.call(o, "preserveOpenAIDeveloperRole") &&
    o.preserveOpenAIDeveloperRole === false
  ) {
    return true;
  }
  for (const p of MODEL_COMPAT_PROTOCOL_KEYS) {
    const pc = getProtoSlice(c, o, p);
    if (
      pc &&
      Object.prototype.hasOwnProperty.call(pc, "preserveOpenAIDeveloperRole") &&
      pc.preserveOpenAIDeveloperRole === false
    ) {
      return true;
    }
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
  { value: "max", label: "Max" },
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
export function getClaudeCodeCompatibleRequestDefaults(providerSpecificData: unknown) {
  const defaults = _getClaudeCodeCompatibleRequestDefaults(providerSpecificData);
  return {
    context1m: defaults.context1m === true,
    redactThinking: defaults.redactThinking === true,
    summarizeThinking: defaults.summarizeThinking === true,
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

/**
 * #5446 — Modal authenticates with two credentials, a Token ID (`ak-…`) and a
 * Token Secret (`as-…`), sent as `Authorization: Bearer <TOKEN_ID>:<TOKEN_SECRET>`.
 * The add-connection form collects them in two fields and combines them here into
 * the single encrypted `apiKey` value, so the generic bearer executor path emits
 * `Bearer <id:secret>` with no provider-specific header code. When only the id
 * field is filled, it is returned verbatim so users can still paste a pre-combined
 * `id:secret` string into the single field.
 */
// #5446 checklist item 4 — Modal is bring-your-own-deploy, but the server-side
// validator probes a known public model; pre-fill the same id so the UI and the
// probe never drift.
export function defaultValidationModelIdForProvider(provider: string | undefined): string {
  return provider === "modal" ? MODAL_DEFAULT_VALIDATION_MODEL_ID : "";
}

export function combineModalCredential(tokenId: string, tokenSecret: string): string {
  const id = tokenId.trim();
  const secret = tokenSecret.trim();
  if (!secret) return id;
  if (!id) return secret;
  return `${id}:${secret}`;
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

// ---------------------------------------------------------------------------
// PassthroughModelsSection test-all helpers (Issue #3610)
// ---------------------------------------------------------------------------

/**
 * Builds the JSON body for a single-model batch-test request.
 * When `autoHideFailed` is true the server will persist the hide,
 * so this flag MUST be threaded through from the UI state.
 */
export function buildPassthroughTestBody(opts: {
  providerId: string;
  connectionId: string;
  modelId: string;
  autoHideFailed: boolean;
}): {
  providerId: string;
  connectionId: string;
  modelIds: string[];
  autoHideFailed: boolean;
} {
  return {
    providerId: opts.providerId,
    connectionId: opts.connectionId,
    modelIds: [opts.modelId],
    autoHideFailed: opts.autoHideFailed,
  };
}

/**
 * Decides whether the visibility filter should be switched to "visible"
 * after a test-all run completes.
 *
 * The rule: only switch when at least one model was hidden during the run
 * AND the user had autoHideFailed enabled. This ensures that models that
 * were just hidden don't remain on-screen, giving the user instant feedback.
 */
export function shouldSwitchToVisibleFilter(opts: {
  autoHideFailed: boolean;
  hiddenCount: number;
}): boolean {
  return opts.autoHideFailed && opts.hiddenCount > 0;
}

// ---------------------------------------------------------------------------
// Error-type label map — shared by ConnectionRow and EditConnectionModal
// ---------------------------------------------------------------------------
export const ERROR_TYPE_LABELS: Record<string, { labelKey: string; variant: string }> = {
  runtime_error: { labelKey: "errorTypeRuntime", variant: "warning" },
  upstream_auth_error: { labelKey: "errorTypeUpstreamAuth", variant: "error" },
  account_deactivated: { labelKey: "Account Deactivated", variant: "error" },
  auth_missing: { labelKey: "errorTypeMissingCredential", variant: "warning" },
  token_refresh_failed: { labelKey: "errorTypeRefreshFailed", variant: "warning" },
  token_expired: { labelKey: "errorTypeTokenExpired", variant: "warning" },
  upstream_rate_limited: { labelKey: "errorTypeRateLimited", variant: "warning" },
  upstream_unavailable: { labelKey: "errorTypeUpstreamUnavailable", variant: "error" },
  network_error: { labelKey: "errorTypeNetworkError", variant: "warning" },
  unsupported: { labelKey: "errorTypeTestUnsupported", variant: "default" },
  upstream_error: { labelKey: "errorTypeUpstreamError", variant: "error" },
  banned: { labelKey: "errorTypeBanned", variant: "error" },
  credits_exhausted: { labelKey: "errorTypeCreditsExhausted", variant: "warning" },
};

// ---------------------------------------------------------------------------
// formatProviderModelsErrorResponse — shared error formatter for provider-models
// API calls. Used by both the page client and CustomModelsSection.
// ---------------------------------------------------------------------------

type ProviderModelsApiErrorBody = {
  error?: {
    message?: string;
    details?: Array<{ field?: string; message?: string }>;
  };
};

export async function formatProviderModelsErrorResponse(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as ProviderModelsApiErrorBody;
    const err = data?.error;
    if (Array.isArray(err?.details) && err.details.length > 0) {
      return err.details
        .map((d) => {
          const f = typeof d.field === "string" && d.field ? d.field : "?";
          const m = typeof d.message === "string" ? d.message : "";
          return m ? `${f}: ${m}` : f;
        })
        .join("; ");
    }
    if (typeof err?.message === "string" && err.message.trim()) {
      return err.message.trim();
    }
  } catch {
    /* ignore */
  }
  const st = res.statusText?.trim();
  return st || `HTTP ${res.status}`;
}

// ---------------------------------------------------------------------------
// formatTimeAgo — used in EditConnectionModal's extra-key health display
// ---------------------------------------------------------------------------
export function formatTimeAgo(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;
  if (diff < 0) return "just now";
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

// ---------------------------------------------------------------------------
// Provider-detail page pure helpers (Phase 1s — extracted from god-component)
// ---------------------------------------------------------------------------

export function getApiLabel(
  t: ProviderMessageTranslator,
  isAnthropicProtocolCompatible: boolean,
  apiType: string | undefined
): string {
  if (isAnthropicProtocolCompatible) return t("messagesApi");
  switch (apiType) {
    case "responses":
      return t("responsesApi");
    case "embeddings":
      return t("embeddings");
    case "audio-transcriptions":
      return t("audioTranscriptions");
    case "audio-speech":
      return t("audioSpeech");
    case "images-generations":
      return t("imagesGenerations");
    default:
      return t("chatCompletions");
  }
}

export function getApiDefaultPath(
  isCcCompatible: boolean,
  isAnthropicCompatible: boolean,
  apiType: string | undefined
): string {
  if (isCcCompatible) return CC_COMPATIBLE_DEFAULT_CHAT_PATH;
  if (isAnthropicCompatible) return "/messages";
  switch (apiType) {
    case "responses":
      return "/responses";
    case "embeddings":
      return "/embeddings";
    case "audio-transcriptions":
      return "/audio/transcriptions";
    case "audio-speech":
      return "/audio/speech";
    case "images-generations":
      return "/images/generations";
    default:
      return "/chat/completions";
  }
}

export function getApiPath(
  isCcCompatible: boolean,
  isAnthropicCompatible: boolean,
  apiType: string | undefined,
  chatPath: string | undefined
): string {
  const defaultPath = getApiDefaultPath(isCcCompatible, isAnthropicCompatible, apiType);
  return (chatPath || defaultPath).replace(/^\//, "");
}

export function getHeaderIconProviderId(
  isOpenAICompatible: boolean,
  isAnthropicProtocolCompatible: boolean,
  providerInfoId: string,
  providerInfoApiType: string | undefined
): string {
  if (isOpenAICompatible && providerInfoApiType) {
    return providerInfoApiType === "responses" ? "oai-r" : "oai-cc";
  }
  if (isAnthropicProtocolCompatible) {
    return "anthropic-m";
  }
  return providerInfoId;
}
