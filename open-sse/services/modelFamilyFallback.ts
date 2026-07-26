/**
 * Model Family Fallback — Phase 2 Feature (T5)
 *
 * Implements two-phase model resolution:
 *   Phase 1 (static, pre-request): already done by model.ts alias resolution.
 *   Phase 2 (dynamic, post-error): when a provider returns a model-not-available
 *   error (400 with specific message or 404), we try sibling models within the
 *   same "family" before giving up.
 *
 * Inspired by Antigravity Manager's account-aware dynamic model remapping
 * (commit 6cea566, Mar 8 2026).
 */

import { getModelContextLimit } from "../../src/lib/modelCapabilities";
import { parseModel } from "./model.ts";
import {
  CONTEXT_OVERFLOW_REGEX,
  containsModelUnavailableMessage,
  isResourceNotFoundResponse,
} from "./errorClassifier.ts";
import { getRegistryEntry } from "../config/providerRegistry.ts";
import { isModelSelectable } from "./modelLifecycle.ts";

// ── Model Family Definitions ─────────────────────────────────────────────────

/**
 * Ordered candidate lists per model family.
 * First entry is the most preferred; fallback proceeds in order.
 */
const FAMILY_FALLBACK_TEMPLATES: Record<string, readonly string[]> = {
  // Gemini 3 / 3.1 Pro family — ordered by preference
  "gemini-3-pro": [
    "gemini-3.1-pro-preview",
    "gemini-3-pro-preview",
    "gemini-3.1-pro-high",
    "gemini-3-pro-high",
    "gemini-3.1-pro-low",
    "gemini-3-pro-low",
  ],
  "gemini-3.1-pro": [
    "gemini-3.1-pro-preview",
    "gemini-3-pro-preview",
    "gemini-3.1-pro-high",
    "gemini-3-pro-high",
    "gemini-3.1-pro-low",
    "gemini-3-pro-low",
  ],
  "gemini-3-pro-preview": [
    "gemini-3.1-pro-preview",
    "gemini-3-pro-high",
    "gemini-3.1-pro-high",
    "gemini-3-pro-low",
    "gemini-3.1-pro-low",
  ],
  "gemini-3.1-pro-preview": [
    "gemini-3-pro-preview",
    "gemini-3.1-pro-high",
    "gemini-3-pro-high",
    "gemini-3.1-pro-low",
    "gemini-3-pro-low",
  ],
  "gemini-3-pro-high": [
    "gemini-3.1-pro-high",
    "gemini-3-pro-preview",
    "gemini-3.1-pro-preview",
    "gemini-3-pro-low",
    "gemini-3.1-pro-low",
  ],
  "gemini-3.1-pro-high": [
    "gemini-3-pro-high",
    "gemini-3.1-pro-preview",
    "gemini-3-pro-preview",
    "gemini-3.1-pro-low",
    "gemini-3-pro-low",
  ],

  // Gemini 2.5 Pro family
  "gemini-2.5-pro": ["gemini-2.5-pro-preview-06-05", "gemini-2.5-pro-exp-03-25"],
  "gemini-2.5-pro-preview-06-05": ["gemini-2.5-pro", "gemini-2.5-pro-exp-03-25"],

  // Claude Mythos family (Fable 5) — flagship falls to the next-best Opus
  // tiers before the cheaper Sonnet, matching the Opus family ordering.
  "claude-fable-5": ["claude-opus-4-8", "claude-opus-4-7", "claude-sonnet-5"],

  // Claude Opus family
  "claude-opus-5": ["claude-opus-4-8", "claude-opus-4-7", "claude-sonnet-5"],
  "claude-opus-4-8": ["claude-opus-4-7", "claude-opus-4-6", "claude-sonnet-5"],
  "claude-opus-4-7": ["claude-opus-4-6", "claude-opus-4-5-20251101", "claude-sonnet-5"],
  "claude-opus-4-6": ["claude-opus-4-6-thinking", "claude-opus-4-5-20251101", "claude-sonnet-5"],
  "claude-opus-4-6-thinking": ["claude-opus-4-6", "claude-opus-4-5-20251101"],

  // Claude Sonnet family — Sonnet 5 is the newest tier; degrade to 4.6 → 4.5 → 4.
  "claude-sonnet-5": [
    "claude-sonnet-4-6",
    "claude-sonnet-4-5-20250929",
    "claude-sonnet-4-20250514",
  ],
  "claude-sonnet-4-6": ["claude-sonnet-4-5-20250929", "claude-sonnet-4-20250514"],
  "claude-sonnet-4-5-20250929": ["claude-sonnet-4-6", "claude-sonnet-4-20250514"],
};

// ── Error Detection ──────────────────────────────────────────────────────────

/**
 * Error message fragments that indicate the requested model is unavailable
 * for the current account/provider, as opposed to a transient error.
 */
const MODEL_UNAVAILABLE_FRAGMENTS = [
  "model not found",
  "model_not_found",
  "model not available",
  "model is not available",
  "no such model",
  "unsupported model",
  "unknown model",
  "this model does not exist",
  "invalid model",
  "model not supported",
  "not enabled for",
  "access to model",
];

/**
 * Returns true if the HTTP status + error message indicates the model
 * itself is not available, not a transient server error.
 */
export function isModelUnavailableError(
  status: number,
  errorMessage: string,
  provider?: string | null
): boolean {
  if (status === 404) return !isResourceNotFoundResponse(errorMessage);
  if (status !== 400 && status !== 403) return false;

  const msg = errorMessage.toLowerCase();
  if (provider === "kiro" && msg.includes("improperly formed request")) return true;
  if (MODEL_UNAVAILABLE_FRAGMENTS.some((fragment) => msg.includes(fragment))) return true;
  return containsModelUnavailableMessage(errorMessage);
}

export function isContextOverflowError(status: number, errorMessage: string): boolean {
  if (status !== 400) return false;
  return CONTEXT_OVERFLOW_REGEX.test(errorMessage);
}

// ── Fallback Resolution ──────────────────────────────────────────────────────

/**
 * All notation forms a family-fallback candidate might be registered under
 * in a provider's catalog: the literal hyphen form, dot-notation variants
 * (`claude-opus-4-8` -> `claude-opus-4.8`), and — for dated snapshot ids
 * like `claude-opus-4-5-20251101` — the same variants with the trailing
 * `-YYYYMMDD` snapshot suffix stripped, so a dated candidate can still
 * resolve to a provider's undated catalog entry (`claude-opus-4.5`).
 */
function candidateNotationVariants(candidate: string): string[] {
  const variants = [
    candidate,
    candidate.replace(/-(\d+)-(\d+)$/, "-$1.$2"),
    candidate.replace(/-(\d+)-(\d+)-/, "-$1.$2-"),
  ];

  const dateStripped = candidate.replace(/-\d{8}$/, "");
  if (dateStripped !== candidate) {
    variants.push(dateStripped, dateStripped.replace(/-(\d+)-(\d+)$/, "-$1.$2"));
  }

  return variants;
}

/**
 * Resolve a family candidate against the provider's supported model ids.
 * Returns the matching notation (preferring the first variant found) or
 * `null` if the candidate is absent from the catalog under every notation.
 */
function resolveCandidateNotation(candidate: string, supportedIds: Set<string>): string | null {
  return candidateNotationVariants(candidate).find((variant) => supportedIds.has(variant)) ?? null;
}

function resolveFamilyContext(currentModel: string, providerHint?: string | null) {
  const parsed = parseModel(currentModel);
  const bareModel = parsed.model || currentModel;
  const explicitProvider = parsed.provider || parsed.providerAlias || null;
  const registryEntry = getRegistryEntry(explicitProvider || providerHint || "");
  if (!registryEntry) return null;

  const lookupKey = bareModel.replace(/\./g, "-");
  const family =
    FAMILY_FALLBACK_TEMPLATES[lookupKey] ?? FAMILY_FALLBACK_TEMPLATES[bareModel] ?? null;
  if (!family) return null;

  return {
    bareModel,
    family,
    provider: registryEntry.id,
    outputPrefix: explicitProvider ? `${registryEntry.id}/` : "",
    supportedIds: new Set(registryEntry.models.map((model) => model.id)),
  };
}

function wasCandidateTried(
  candidateModel: string,
  provider: string,
  triedModels: Set<string>
): boolean {
  for (const attempted of triedModels) {
    const parsed = parseModel(attempted);
    const attemptedModel = parsed.model || attempted;
    const attemptedProvider = parsed.provider || parsed.providerAlias || provider;
    const registryEntry = getRegistryEntry(attemptedProvider);
    if (
      (registryEntry?.id || attemptedProvider) === provider &&
      attemptedModel === candidateModel
    ) {
      return true;
    }
  }
  return false;
}

function resolveProviderFamilyCandidates(
  currentModel: string,
  providerHint?: string | null
): { provider: string; outputPrefix: string; candidates: string[] } | null {
  const context = resolveFamilyContext(currentModel, providerHint);
  if (!context) return null;

  const candidates: string[] = [];
  for (const candidate of context.family) {
    const resolvedCandidate = resolveCandidateNotation(candidate, context.supportedIds);
    if (!resolvedCandidate) continue;
    if (!isModelSelectable(context.provider, resolvedCandidate)) continue;
    if (!candidates.includes(resolvedCandidate)) candidates.push(resolvedCandidate);
  }

  return {
    provider: context.provider,
    outputPrefix: context.outputPrefix,
    candidates,
  };
}

/**
 * Get the next fallback model from the same family.
 *
 * @param currentModel  The model that just failed
 * @param triedModels   Set of model IDs already tried (to avoid cycles)
 * @param providerHint  Current provider when currentModel is an unprefixed wire ID
 * @returns             Next model to try, or null if family exhausted
 */
export function getNextFamilyFallback(
  currentModel: string,
  triedModels: Set<string>,
  providerHint?: string | null
): string | null {
  const resolved = resolveProviderFamilyCandidates(currentModel, providerHint);
  if (!resolved) return null;

  for (const candidate of resolved.candidates) {
    if (!wasCandidateTried(candidate, resolved.provider, triedModels)) {
      return `${resolved.outputPrefix}${candidate}`;
    }
  }

  return null; // family exhausted
}

/**
 * Check if a model belongs to any registered family.
 */
export function isInModelFamily(model: string, providerHint?: string | null): boolean {
  const resolved = resolveProviderFamilyCandidates(model, providerHint);
  return Boolean(resolved?.candidates.length);
}

/**
 * Get all members of a model's family (including itself).
 */
export function getModelFamily(model: string, providerHint?: string | null): string[] {
  const resolved = resolveProviderFamilyCandidates(model, providerHint);
  if (!resolved) return [model];
  return [model, ...resolved.candidates.map((candidate) => `${resolved.outputPrefix}${candidate}`)];
}

/**
 * Find a model with larger context window from a list of candidate models.
 * Uses models.dev synced capabilities to compare context limits.
 */
export function findLargerContextModel(
  currentModel: string,
  availableModels: string[],
  providerHint?: string | null
): string | null {
  const currentParsed = parseModel(currentModel);
  const currentProvider =
    currentParsed.provider || currentParsed.providerAlias || providerHint || "unknown";
  const currentModelId = currentParsed.model || currentModel;
  const currentLimit = getModelContextLimit(currentProvider, currentModelId) ?? 0;

  let bestModel: string | null = null;
  let bestLimit = currentLimit;

  for (const candidate of availableModels) {
    if (candidate === currentModel) continue;
    const parsed = parseModel(candidate);
    const provider = parsed.provider || parsed.providerAlias || providerHint || "unknown";
    const modelId = parsed.model || candidate;
    const limit = getModelContextLimit(provider, modelId) ?? 0;

    if (limit > bestLimit) {
      bestLimit = limit;
      bestModel = candidate;
    }
  }

  return bestModel;
}
