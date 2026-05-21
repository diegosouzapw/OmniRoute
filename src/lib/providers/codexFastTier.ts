import { getCodexRequestDefaults, normalizeCodexServiceTier } from "./requestDefaults";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export type CodexFastTierValue = "priority" | "flex";

export const CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS: readonly string[] = ["gpt-5.5", "gpt-5.4"];

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
 *  - supportedModels = ["gpt-5.5", "gpt-5.4"] (OpenAI Fast-eligible per models_cache.json)
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
      if (t === "priority" || t === "flex") {
        tier = t;
      } else if (t === "default") {
        // Explicit "default" means: do not inject any override.
        enabled = false;
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
  return resolveCodexGlobalFastServiceTier(settings).enabled;
}

export function getCodexEffectiveFastServiceTier(
  providerSpecificData: unknown,
  globalFastServiceTierEnabled: boolean
): boolean {
  return (
    globalFastServiceTierEnabled ||
    getCodexRequestDefaults(providerSpecificData).serviceTier === "priority"
  );
}

function modelMatchesSupportedList(
  model: string | null | undefined,
  supportedModels: readonly string[]
): boolean {
  if (typeof model !== "string" || model.length === 0) return false;
  const normalizedModel = model.trim().toLowerCase();
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
   * Outbound request body. When provided and the tier is "flex", the helper writes
   * body.service_tier directly so the value survives the requestDefaults normalizer
   * (which only canonicalizes priority/fast). Per-request body.service_tier is left
   * untouched if already set.
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

  // Per-model gate. Skip when caller did not pass a model (back-compat call sites).
  if (options.model !== undefined) {
    if (!modelMatchesSupportedList(options.model, resolved.supportedModels)) {
      return credentials;
    }
  }

  if (!credentials || typeof credentials !== "object" || Array.isArray(credentials)) {
    return credentials;
  }

  const providerSpecificData = asRecord(credentials.providerSpecificData);
  const requestDefaults = asRecord(providerSpecificData.requestDefaults);

  // Per-connection requestDefaults.serviceTier wins over global. Mirrors the
  // executor's body.service_tier > requestDefaults.serviceTier > global precedence.
  if (normalizeCodexServiceTier(requestDefaults.serviceTier)) {
    return credentials;
  }

  if (resolved.tier === "flex") {
    // requestDefaults.serviceTier is normalized downstream and "flex" would be stripped.
    // Write to the outbound body instead, but only if the caller did not already set it.
    const body = options.body;
    if (body && typeof body === "object" && !Array.isArray(body)) {
      const existing = (body as JsonRecord).service_tier;
      if (typeof existing !== "string" || existing.trim().length === 0) {
        (body as JsonRecord).service_tier = "flex";
      }
    }
    return credentials;
  }

  // tier === "priority": existing behavior — inject via requestDefaults so the
  // executor's normal precedence chain picks it up and cost accounting reflects it.
  return {
    ...credentials,
    providerSpecificData: {
      ...providerSpecificData,
      requestDefaults: {
        ...requestDefaults,
        serviceTier: "priority",
      },
    },
  } as T;
}
