/**
 * applyFeed.ts — Read-time overlay merge for the Radar free-model catalog.
 *
 * The feed is applied OVER the static baseline catalog at read time.
 * The baseline (`FREE_MODEL_BUDGETS`) is NEVER mutated.
 *
 * Merge rules:
 *  1. Feed never overwrites a local override, except the safety-critical
 *     `enabled:false` signal for an upstream model confirmed unavailable.
 *  2. `enabled:false` disables the entry with `disabledBy: "radar"` provenance.
 *  3. User-added entry NOT in the feed survives untouched.
 *  4. User deletion tombstone prevents feed from resurrecting the entry.
 */

import type { RadarLocalizedText } from "./feedSchema";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * A merged catalog entry.  Extends the baseline `FreeModelBudget` shape
 * with overlay metadata so the UI can render origin badges and explain
 * why an entry is disabled.
 */
export interface MergedEntry {
  provider: string;
  modelId: string;
  displayName: string;
  monthlyTokens: number;
  creditTokens: number;
  freeType:
    | "recurring-daily"
    | "recurring-monthly"
    | "recurring-uncapped"
    | "recurring-credit"
    | "keyless"
    | "one-time-initial"
    | "discontinued";
  poolKey: string | null;
  tos: "ok" | "caution" | "ambiguous" | "avoid" | "unknown";
  trainsOnPrompts?: boolean;
  /** Whether the entry is enabled for use. Defaults to true. */
  enabled?: boolean;
  /**
   * Provenance: where this entry's merged state comes from.
   *  - "baseline": untouched from the static catalog.
   *  - "radar":    fields were updated by the Radar feed.
   *  - "local":    user has at least one local override on this entry.
   */
  origin: "baseline" | "radar" | "local";
  /**
   * Present when the entry was disabled by the Radar feed (`enabled: false`).
   * Absent for entries disabled by other means or still enabled.
   */
  disabledBy?: "radar";
  /**
   * Context window size in tokens. Only present on entries that carry feed
   * data (origin "radar"/"local" merged from a feed entry); undefined for
   * baseline-only entries.
   */
  contextWindow?: number | null;
  /** Capability flags reported by the feed. Undefined for baseline-only entries. */
  capabilities?: {
    tools: boolean;
    vision: boolean;
    thinking: boolean;
  };
  /** Rate/quota limits reported by the feed. Undefined for baseline-only entries. */
  limits?: {
    rpm: number | null;
    rpd: number | null;
    tpm: number | null;
    tpd: number | null;
  };
  /** Setup guide (key URL + steps) reported by the feed. Undefined for baseline-only entries. */
  setup?: {
    keyUrl: string | null;
    steps: RadarLocalizedText[];
  } | null;
}

/**
 * A feed model entry from the Radar catalog payload.
 * Matches the shape in `feedSchema.ts` ModelSchema.
 */
export interface FeedModel {
  provider: string;
  modelId: string;
  displayName: string;
  familyId: string | null;
  freeType: MergedEntry["freeType"];
  budget:
    | { kind: "per_model"; tokensPerMonth: number }
    | { kind: "shared_pool"; poolId: string; tokensPerMonth: number }
    | { kind: "rate_only" };
  limits: {
    rpm: number | null;
    rpd: number | null;
    tpm: number | null;
    tpd: number | null;
  };
  contextWindow: number | null;
  capabilities: {
    tools: boolean;
    vision: boolean;
    thinking: boolean;
  };
  trainsOnPrompts: boolean | null;
  tosRisk: MergedEntry["tos"];
  setup: {
    keyUrl: string | null;
    steps: RadarLocalizedText[];
  } | null;
  enabled: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build a composite key for deduplication / override / tombstone lookup.
 */
function entryKey(provider: string, modelId: string): string {
  return `${provider}:${modelId}`;
}

/**
 * Convert a FeedModel budget into a `monthlyTokens` number compatible
 * with the baseline catalog shape.
 */
function feedBudgetToMonthlyTokens(budget: FeedModel["budget"]): number {
  if (budget.kind === "per_model") return budget.tokensPerMonth;
  if (budget.kind === "shared_pool") return budget.tokensPerMonth;
  return 0; // rate_only
}

/**
 * Convert a FeedModel budget into a `poolKey` compatible with the baseline.
 */
function feedBudgetToPoolKey(budget: FeedModel["budget"]): string | null {
  if (budget.kind === "shared_pool") return budget.poolId;
  return null;
}

// ---------------------------------------------------------------------------
// applyFeed
// ---------------------------------------------------------------------------

export interface ApplyFeedInput {
  /** The static baseline catalog entries. */
  baseline: MergedEntry[];
  /** Feed model entries from the cached Radar payload. */
  feed: FeedModel[];
  /**
   * User-local overrides keyed by `provider:modelId`.
   * Each value is a partial MergedEntry — only the fields the user explicitly
   * customized.  Feed values for those fields are skipped.
   */
  localOverrides: Map<string, Partial<MergedEntry>>;
  /**
   * Composite keys (`provider:modelId`) of entries the user has deleted.
   * Feed re-appearance must NOT resurrect them.
   */
  tombstones: Set<string>;
}

/**
 * Merge the Radar feed over the baseline catalog, honoring 4 rules:
 *
 *  1. Feed never overwrites a local override field.
 *  2. `enabled:false` disables the entry with provenance.
 *  3. User-added entry NOT in the feed survives untouched.
 *  4. Tombstone prevents resurrection.
 *
 * @returns A new array of merged entries (never mutates inputs).
 */
export function applyFeed(input: ApplyFeedInput): MergedEntry[] {
  const { baseline, feed, localOverrides, tombstones } = input;

  // Index baseline by composite key for fast lookup
  const baselineIndex = new Map<string, MergedEntry>();
  for (const entry of baseline) {
    const key = entryKey(entry.provider, entry.modelId);
    // Rule 4: if tombstoned, skip even baseline entries
    if (!tombstones.has(key)) {
      baselineIndex.set(key, entry);
    }
  }

  // Index feed by composite key
  const feedIndex = new Map<string, FeedModel>();
  for (const model of feed) {
    const key = entryKey(model.provider, model.modelId);
    feedIndex.set(key, model);
  }

  // Result accumulator — keyed to prevent duplicates
  const resultMap = new Map<string, MergedEntry>();

  // Pass 1: process all baseline entries
  for (const [key, baseEntry] of baselineIndex) {
    const feedEntry = feedIndex.get(key);
    const overrides = localOverrides.get(key);

    if (!feedEntry) {
      // No feed entry: baseline passes through (rule 3: user-added survives)
      resultMap.set(key, { ...baseEntry });
      continue;
    }

    // Feed entry exists — merge
    const merged = mergeOne(baseEntry, feedEntry, overrides);
    resultMap.set(key, merged);
  }

  // Pass 2: add feed-only entries (not in baseline)
  for (const [key, feedEntry] of feedIndex) {
    if (resultMap.has(key)) continue; // already processed
    if (tombstones.has(key)) continue; // rule 4

    // New entry from feed
    const overrides = localOverrides.get(key);
    const merged = feedModelToMerged(feedEntry, overrides);
    resultMap.set(key, merged);
  }

  return [...resultMap.values()];
}

// ---------------------------------------------------------------------------
// Internal merge helpers
// ---------------------------------------------------------------------------

/**
 * Merge a single baseline entry with a feed entry and optional local overrides.
 * Rule 1: local overrides take precedence over feed values.
 * Rule 2: feed `enabled: false` disables with provenance.
 */
function mergeOne(
  base: MergedEntry,
  feed: FeedModel,
  overrides: Partial<MergedEntry> | undefined
): MergedEntry {
  // Start from baseline
  const result: MergedEntry = { ...base };

  // Determine which fields the user has overridden locally
  const overriddenKeys = overrides ? new Set(Object.keys(overrides)) : new Set<string>();

  // Rule 2: feed disable
  if (!feed.enabled) {
    result.enabled = false;
    result.disabledBy = "radar";
  }

  // Merge feed fields that the user has NOT overridden (rule 1)
  if (!overriddenKeys.has("displayName")) {
    result.displayName = feed.displayName;
  }
  if (!overriddenKeys.has("monthlyTokens")) {
    result.monthlyTokens = feedBudgetToMonthlyTokens(feed.budget);
  }
  if (!overriddenKeys.has("poolKey")) {
    result.poolKey = feedBudgetToPoolKey(feed.budget);
  }
  if (!overriddenKeys.has("freeType")) {
    result.freeType = feed.freeType;
  }
  if (!overriddenKeys.has("tos")) {
    result.tos = feed.tosRisk;
  }
  if (!overriddenKeys.has("trainsOnPrompts")) {
    result.trainsOnPrompts = feed.trainsOnPrompts ?? undefined;
  }
  if (!overriddenKeys.has("creditTokens")) {
    // Feed doesn't have creditTokens; keep baseline
  }
  if (!overriddenKeys.has("contextWindow")) {
    result.contextWindow = feed.contextWindow;
  }
  if (!overriddenKeys.has("capabilities")) {
    result.capabilities = feed.capabilities;
  }
  if (!overriddenKeys.has("limits")) {
    result.limits = feed.limits;
  }
  if (!overriddenKeys.has("setup")) {
    result.setup = feed.setup;
  }

  // Apply local overrides (rule 1: they win)
  if (overrides) {
    if (overrides.displayName !== undefined) result.displayName = overrides.displayName;
    if (overrides.monthlyTokens !== undefined) result.monthlyTokens = overrides.monthlyTokens;
    if (overrides.creditTokens !== undefined) result.creditTokens = overrides.creditTokens;
    if (overrides.freeType !== undefined) result.freeType = overrides.freeType;
    if (overrides.poolKey !== undefined) result.poolKey = overrides.poolKey;
    if (overrides.tos !== undefined) result.tos = overrides.tos;
    if (overrides.trainsOnPrompts !== undefined) result.trainsOnPrompts = overrides.trainsOnPrompts;
    if (overrides.enabled !== undefined) result.enabled = overrides.enabled;
    if (overrides.contextWindow !== undefined) result.contextWindow = overrides.contextWindow;
    if (overrides.capabilities !== undefined) result.capabilities = overrides.capabilities;
    if (overrides.limits !== undefined) result.limits = overrides.limits;
    if (overrides.setup !== undefined) result.setup = overrides.setup;
  }

  // Safety exception to rule 1: a model confirmed unavailable upstream is
  // never resurrected by a stale local enabled:true override.
  if (!feed.enabled) {
    result.enabled = false;
    result.disabledBy = "radar";
  }

  // Origin: "local" if user has overrides, else "radar" (feed updated it)
  result.origin = overriddenKeys.size > 0 ? "local" : "radar";

  return result;
}

/**
 * Convert a feed-only model into a MergedEntry.
 */
function feedModelToMerged(
  feed: FeedModel,
  overrides: Partial<MergedEntry> | undefined
): MergedEntry {
  const entry: MergedEntry = {
    provider: feed.provider,
    modelId: feed.modelId,
    displayName: overrides?.displayName ?? feed.displayName,
    monthlyTokens: overrides?.monthlyTokens ?? feedBudgetToMonthlyTokens(feed.budget),
    creditTokens: overrides?.creditTokens ?? 0,
    freeType: overrides?.freeType ?? feed.freeType,
    poolKey: overrides?.poolKey ?? feedBudgetToPoolKey(feed.budget),
    tos: overrides?.tos ?? feed.tosRisk,
    trainsOnPrompts: overrides?.trainsOnPrompts ?? feed.trainsOnPrompts ?? undefined,
    enabled: feed.enabled ? (overrides?.enabled ?? true) : false,
    origin: overrides ? "local" : "radar",
    contextWindow: overrides?.contextWindow ?? feed.contextWindow,
    capabilities: overrides?.capabilities ?? feed.capabilities,
    limits: overrides?.limits ?? feed.limits,
    setup: overrides?.setup ?? feed.setup,
  };

  // Rule 2 is the safety exception to local override precedence.
  if (!feed.enabled) {
    entry.enabled = false;
    entry.disabledBy = "radar";
  }

  return entry;
}
