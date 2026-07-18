import {
  getCodexRequestDefaults,
  normalizeCodexServiceTier,
  type CodexServiceTier,
} from "./requestDefaults";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export type CodexFastTierValue = CodexServiceTier;
export type CodexGlobalServiceMode = "none" | CodexServiceTier;

export const CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS: readonly string[] = [
  "gpt-5.6-sol",
  "gpt-5.6-terra",
  "gpt-5.6-luna",
  "gpt-5.5",
];

export interface CodexGlobalFastServiceTierResolved {
  enabled: boolean;
  tier: CodexFastTierValue;
  supportedModels: readonly string[];
}

/**
 * Resolve the global Codex Fast Tier settings. Handles three legacy shapes:
 *  - { codexServiceTier: true }                      (oldest boolean)
 *  - { codexServiceTier: { enabled: true } }         (PR #2440 shape)
 *  - { codexServiceTier: { enabled, tier, supportedModels } } (this follow-up)
 *  - { codexFastServiceTier: true }                  (very early flag)
 *
 * Defaults when fields are absent on an enabled config:
 *  - tier            = "priority"  (back-compat: PR #2440 only injected priority)
 *  - supportedModels = CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS
 *    (OpenAI Fast-eligible per models_cache.json)
 */
export function resolveCodexGlobalFastServiceTier(
  settings: unknown
): CodexGlobalFastServiceTierResolved {
  const record = asRecord(settings);
  const raw = record.codexServiceTier;

  let enabled = false;
  let tier: CodexFastTierValue = "priority";
  let supportedModels: readonly string[] = CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS;

  if (typeof raw === "boolean") {
    enabled = raw;
  } else if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const obj = raw as JsonRecord;
    if (obj.enabled === true) enabled = true;

    if (typeof obj.tier === "string") {
      const t = obj.tier.trim().toLowerCase();
      if (t === "default" || t === "priority" || t === "flex") {
        tier = t;
      }
    }

    if (Array.isArray(obj.supportedModels)) {
      const list = obj.supportedModels
        .filter((m): m is string => typeof m === "string")
        .map((m) => m.trim())
        .filter((m) => m.length > 0);
      if (list.length > 0) supportedModels = list;
    }
  } else if (record.codexFastServiceTier === true) {
    enabled = true;
  }

  return { enabled, tier, supportedModels };
}

export function isCodexGlobalFastServiceTierEnabled(settings: unknown): boolean {
  const resolved = resolveCodexGlobalFastServiceTier(settings);
  return resolved.enabled && resolved.tier !== "default";
}

export function getCodexGlobalServiceMode(settings: unknown): CodexGlobalServiceMode {
  const resolved = resolveCodexGlobalFastServiceTier(settings);
  return resolved.enabled ? resolved.tier : "none";
}

export function getCodexConnectionServiceTier(providerSpecificData: unknown): CodexServiceTier {
  return getCodexRequestDefaults(providerSpecificData).serviceTier ?? "default";
}

export function getCodexEffectiveServiceTier(
  providerSpecificData: unknown,
  globalServiceMode: CodexGlobalServiceMode | boolean
): CodexServiceTier {
  // Dashboard global modes are explicit overrides; use "none" to preserve the
  // per-connection requestDefaults.serviceTier value.
  if (globalServiceMode === true) return "priority";
  if (globalServiceMode && globalServiceMode !== false && globalServiceMode !== "none") {
    return globalServiceMode;
  }
  return getCodexConnectionServiceTier(providerSpecificData);
}

export function getCodexEffectiveFastServiceTier(
  providerSpecificData: unknown,
  globalFastServiceTierEnabled: CodexGlobalServiceMode | boolean
): boolean {
  return (
    getCodexEffectiveServiceTier(providerSpecificData, globalFastServiceTierEnabled) !== "default"
  );
}

function modelMatchesSupportedList(
  model: string | null | undefined,
  supportedModels: readonly string[]
): boolean {
  if (typeof model !== "string" || model.length === 0) return false;
  const normalizedModel = model.trim().toLowerCase().split("/").pop() || "";
  if (!normalizedModel) return false;
  for (const supported of supportedModels) {
    const candidate = supported.trim().toLowerCase();
    if (!candidate) continue;
    if (normalizedModel === candidate || normalizedModel.startsWith(candidate)) {
      return true;
    }
  }
  return false;
}

export interface ApplyCodexGlobalFastServiceTierOptions {
  /**
   * Target model for the current request. When provided, the global override is only
   * injected if the model matches the user-selected supportedModels list.
   * When omitted, the gate is skipped (back-compat with the original signature).
   */
  model?: string | null;
  /**
   * Outbound request body. A valid per-request body.service_tier is left untouched
   * when already set.
   */
  body?: Record<string, unknown> | null;
}

export function applyCodexGlobalFastServiceTier<T extends JsonRecord | null | undefined>(
  provider: string | null | undefined,
  credentials: T,
  settings: unknown,
  options: ApplyCodexGlobalFastServiceTierOptions = {}
): T {
  if (provider !== "codex") return credentials;

  const resolved = resolveCodexGlobalFastServiceTier(settings);
  if (!resolved.enabled) return credentials;

  // Per-model gate for paid fast/flex modes. A global "default" mode intentionally
  // disables account-level overrides for every Codex model.
  if (resolved.tier !== "default" && options.model !== undefined) {
    if (!modelMatchesSupportedList(options.model, resolved.supportedModels)) {
      return credentials;
    }
  }

  if (!credentials || typeof credentials !== "object" || Array.isArray(credentials)) {
    return credentials;
  }

  const providerSpecificData = asRecord(credentials.providerSpecificData);
  const requestDefaults = asRecord(providerSpecificData.requestDefaults);

  const body = options.body;
  const rawBodyTier = body && typeof body === "object" ? (body as JsonRecord).service_tier : null;
  const normalizedBodyTier =
    typeof rawBodyTier === "string" ? normalizeCodexServiceTier(rawBodyTier) : null;
  if (normalizedBodyTier) {
    if (body && typeof body === "object" && !Array.isArray(body)) {
      (body as JsonRecord).service_tier = normalizedBodyTier;
    }
    return credentials;
  }

  if (resolved.tier === "default") {
    const nextRequestDefaults = { ...requestDefaults };
    delete nextRequestDefaults.serviceTier;
    const nextProviderSpecificData = { ...providerSpecificData };
    if (Object.keys(nextRequestDefaults).length > 0) {
      nextProviderSpecificData.requestDefaults = nextRequestDefaults;
    } else {
      delete nextProviderSpecificData.requestDefaults;
    }
    return {
      ...credentials,
      providerSpecificData: nextProviderSpecificData,
    } as T;
  }

  if (body && typeof body === "object" && !Array.isArray(body)) {
    // Write the wire value directly to the outbound body when possible, so combo
    // request previews and logs show the same effective tier that the executor sends.
    // The executor also accepts requestDefaults.serviceTier for downstream accounting.
    (body as JsonRecord).service_tier = resolved.tier;
  }

  // Intentional precedence: body service_tier > global mode > connection defaults.
  // Use "none" globally if each account should keep its individual service-tier setting.
  return {
    ...credentials,
    providerSpecificData: {
      ...providerSpecificData,
      requestDefaults: {
        ...requestDefaults,
        serviceTier: resolved.tier,
      },
    },
  } as T;
}
