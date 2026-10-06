/**
 * Task Fitness Lookup Table
 *
 * Maps model patterns × task types → fitness score [0..1].
 * Supports wildcards and prefix matching.
 *
 * Resolution chain (highest → lowest priority):
 * 1. User override — DB `model_intelligence` where source='user_override'
 * 2. Arena ELO — DB `model_intelligence` where source='arena_elo'
 * 2b. Layers 1-2 retried against the base model this id inherits quality scores
 *     from, when `resolveScoresAs` resolves one (#11489). Reported as
 *     `<source>:inherited`.
 * 2c. If the request id or its scoresAs base is vendor-retired (#11625), layers
 *     1–3 are skipped so a leftover arena row cannot short-circuit the layer-3
 *     veto, and a dead *codex id cannot keep the coding wildcard boost.
 * 3. Models.dev tier — derived from `model_capabilities` table capability data,
 *     with a vendor-lifecycle veto (#11508: a retired id never earns a tier
 *     score) and the same base-model inheritance as layers 1–2
 *     (`models_dev_tier:inherited`)
 * 4. Static FITNESS_TABLE — small hand-maintained table of VERSIONED model ids
 * 5. Wildcard boosts — pattern matching boosts over a neutral 0.5 baseline
 *
 * Layer 4 is deliberately small and versioned (#11503). It used to carry
 * version-less family patterns (`claude-sonnet`, `qwen`, `llama`, `codex`, …) that
 * matched by substring, so it kept scoring model families whose members the vendors
 * had already retired — and it scored them ABOVE live flagships it had never heard
 * of. Recognition by the table, not availability, decided rank.
 *
 * Two rules keep it honest:
 *  - Every row names a versioned id that exists in the provider catalog. A family
 *    pattern that would silently adopt every future member of that family does not
 *    belong here; `scripts/check/check-model-lifecycle.mjs` fails the build when a
 *    row starts matching an id the vendor has retired.
 *  - An id this table does not know falls through to the wildcard baseline of 0.5.
 *    That 0.5 means "no evidence", NOT "mediocre model" — it is the neutral point,
 *    and it must never be read as a quality claim about the model.
 */

// ─── Static fitness table (versioned rows only, fallback layer 4) ────────

import { getDbInstance } from "../../../src/lib/db/core.ts";
import {
  getModelIntelligenceBySource,
  setUserFitnessOverrideEntry,
  deleteUserFitnessOverrideEntry,
} from "../../../src/lib/db/modelIntelligence.ts";
import { readFileSync } from "node:fs";
import { resolveScoresAs } from "./scoresAs.ts";
import { isVendorRetiredId } from "../modelLifecycle.ts";

// #11508 — vendor lifecycle snapshot (#11507). An id the vendor has retired
// must never earn a capability-derived tier score: models.dev keeps listing
// retired models with their capabilities, so without this veto layer 3
// recreates the ranking inversion that #11503 removed from layer 4.
const LIFECYCLE_JSON_URL = new URL(
  "../../../config/quality/model-lifecycle.json",
  import.meta.url,
);
let _retiredModels: Set<string> | null = null;

function loadRetiredModels(): Set<string> {
  if (_retiredModels) return _retiredModels;
  const retired = new Set<string>();
  try {
    const parsed = JSON.parse(readFileSync(LIFECYCLE_JSON_URL, "utf8")) as {
      retired?: Record<string, { status?: string }>;
    };
    for (const [id, entry] of Object.entries(parsed.retired ?? {})) {
      if (entry?.status === "retired") retired.add(id.toLowerCase());
    }
  } catch {
    // Snapshot missing/unreadable → no lifecycle veto. Neutral by design:
    // the file is a curated aid, and its absence must not disable routing.
  }
  _retiredModels = retired;
  return retired;
}

const FITNESS_TABLE: Record<string, Record<string, number>> = {
  coding: {
    "gpt-4o": 0.9,
    "gpt-4o-mini": 0.8,
    "gpt-4-turbo": 0.88,
    o3: 0.95,
    "o4-mini": 0.88,
    "gemini-2.5-pro": 0.92,
    "gemini-2.5-flash": 0.82,
    "deepseek-coder": 0.9,
    "deepseek-v3": 0.85,
    "deepseek-r1": 0.88,
    "deepseek-chat": 0.84, // DeepSeek V3.2 Chat — strong code performance
    "deepseek-v3.2": 0.86, // Explicit V3.2 alias
    "grok-3": 0.8,
    // GLM-5.1 — Z.AI reasoning model, 200K context / 128k output
    "glm-5.1": 0.78,
    // MiniMax M2.5 — reasoning support helps complex code
    "minimax-m2.5": 0.75,
    "minimax-m2": 0.72,
  },
  review: {
    "gpt-4o": 0.88,
    "gpt-4o-mini": 0.72,
    o3: 0.92,
    "gemini-2.5-pro": 0.93,
    "deepseek-r1": 0.85,
    "deepseek-v3": 0.8,
  },
  planning: {
    "gpt-4o": 0.88,
    o3: 0.95,
    "gemini-2.5-pro": 0.93,
    "deepseek-r1": 0.85,
  },
  analysis: {
    "gemini-2.5-pro": 0.95,
    "gemini-3.1-pro": 0.95, // Gemini 3.1 Pro — 1M context, ideal for long analysis
    "gpt-4o": 0.85,
    o3: 0.93,
    "deepseek-r1": 0.88,
    "deepseek-chat": 0.8,
    "glm-5.1": 0.82, // GLM-5.1 free reasoning, 200K context for long analysis
    "minimax-m2.5": 0.76,
  },
  debugging: {
    "gpt-4o": 0.88,
    "deepseek-coder": 0.9,
    "deepseek-v3": 0.82,
  },
  documentation: {
    "gpt-4o": 0.92,
    "gpt-4o-mini": 0.85,
    "deepseek-v3": 0.78,
  },
  default: {
    "gpt-4o": 0.85,
    "gemini-3.1-pro": 0.85,
    "deepseek-v3": 0.75,
    "deepseek-chat": 0.74,
    "grok-3": 0.73,
    "glm-5.1": 0.75,
    "minimax-m2.5": 0.7,
  },
};

// Wildcard patterns: model substrings → task type boosts
const WILDCARD_BOOSTS: Array<{ pattern: string; taskType: string; boost: number }> = [
  { pattern: "coder", taskType: "coding", boost: 0.15 },
  { pattern: "code", taskType: "coding", boost: 0.1 },
  { pattern: "fast", taskType: "coding", boost: 0.05 },
  { pattern: "thinking", taskType: "planning", boost: 0.1 },
  { pattern: "thinking", taskType: "analysis", boost: 0.1 },
];

// ─── Models.dev tier → task fitness mapping (resolution layer 3) ────────

/**
 * Intelligence tier derived from models.dev capability data.
 * Tier assignment rules:
 * - `reasoning === true` → "premium"
 * - `tool_call === true && context >= 128000` → "standard"
 * - `tool_call === true` → "fast"
 * - everything else → "budget"
 */
const TIER_TASK_FITNESS: Record<string, Record<string, number>> = {
  premium: {
    coding: 0.92,
    review: 0.93,
    planning: 0.94,
    analysis: 0.95,
    debugging: 0.9,
    documentation: 0.88,
    default: 0.85,
  },
  standard: {
    coding: 0.85,
    review: 0.84,
    planning: 0.85,
    analysis: 0.85,
    debugging: 0.82,
    documentation: 0.85,
    default: 0.78,
  },
  fast: {
    coding: 0.78,
    review: 0.72,
    planning: 0.7,
    analysis: 0.72,
    debugging: 0.75,
    documentation: 0.8,
    default: 0.72,
  },
  budget: {
    coding: 0.65,
    review: 0.6,
    planning: 0.55,
    analysis: 0.58,
    debugging: 0.6,
    documentation: 0.7,
    default: 0.55,
  },
};
// ─── DB access helpers ──────────────────────────────────────────────────

const _intelligenceCache = new Map<string, number | null>();

function queryModelIntelligence(model: string, category: string, source: string): number | null {
  const cacheKey = `${model}:${category}:${source}`;
  if (_intelligenceCache.has(cacheKey)) {
    return _intelligenceCache.get(cacheKey)!;
  }

  try {
    const entry = getModelIntelligenceBySource(model, source, category);
    if (entry) {
      _intelligenceCache.set(cacheKey, entry.score);
      return entry.score;
    }
    return null;
  } catch {
    return null;
  }
}

// ─── Models.dev capability → tier → fitness resolution ──────────────────

let _capabilitiesCache: Record<string, ModelCapRow> | null = null;

interface ModelCapRow {
  tool_call: boolean | null;
  reasoning: boolean | null;
  limit_context: number | null;
}

function deriveTierFromCapabilities(cap: ModelCapRow): string {
  if (cap.reasoning === true) return "premium";
  if (cap.tool_call === true && (cap.limit_context ?? 0) >= 128000) return "standard";
  if (cap.tool_call === true) return "fast";
  return "budget";
}

/**
 * #11508: `model_capabilities` is keyed per (provider, model_id), and the same
 * model id routinely appears under many providers with disagreeing capability
 * columns (measured on a synced DB: 189 ids conflict on `reasoning`, 134 on
 * `tool_call`, 528 on `limit_context`). The former last-write-wins loop made
 * the surviving value depend on SQLite's undefined row order for the query, so
 * a model's tier could silently flip between syncs.
 *
 * Aggregation rule (documented choice): booleans are capability-maximal — any
 * non-null row asserting `true` wins; `limit_context` is the max across rows
 * that carry one. Both are deterministic and independent of row order.
 */
function loadModelCapabilities(): Record<string, ModelCapRow> | null {
  if (_capabilitiesCache) return _capabilitiesCache;

  try {
    const db = getDbInstance();
    const tableExists = db
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='model_capabilities'")
      .get();
    if (!tableExists) return null;

    const rows = db.prepare("SELECT * FROM model_capabilities").all() as Record<string, unknown>[];

    interface CapAccumulator {
      toolTrue: boolean;
      toolSeen: boolean;
      toolFalse: boolean;
      reasonTrue: boolean;
      reasonSeen: boolean;
      reasonFalse: boolean;
      maxContext: number | null;
    }
    const acc = new Map<string, CapAccumulator>();

    for (const row of rows) {
      const modelId = typeof row.model_id === "string" ? row.model_id : "";
      if (!modelId) continue;

      let entry = acc.get(modelId.toLowerCase());
      if (!entry) {
        entry = {
          toolTrue: false,
          toolSeen: false,
          toolFalse: false,
          reasonTrue: false,
          reasonSeen: false,
          reasonFalse: false,
          maxContext: null,
        };
        acc.set(modelId.toLowerCase(), entry);
      }

      if (row.tool_call === true || row.tool_call === 1) {
        entry.toolTrue = true;
        entry.toolSeen = true;
      } else if (row.tool_call === false || row.tool_call === 0) {
        entry.toolFalse = true;
        entry.toolSeen = true;
      }
      if (row.reasoning === true || row.reasoning === 1) {
        entry.reasonTrue = true;
        entry.reasonSeen = true;
      } else if (row.reasoning === false || row.reasoning === 0) {
        entry.reasonFalse = true;
        entry.reasonSeen = true;
      }
      if (typeof row.limit_context === "number") {
        entry.maxContext =
          entry.maxContext === null
            ? row.limit_context
            : Math.max(entry.maxContext, row.limit_context);
      }
    }

    const cache: Record<string, ModelCapRow> = {};
    for (const [modelId, a] of acc) {
      cache[modelId] = {
        tool_call: a.toolTrue ? true : a.toolFalse ? false : null,
        reasoning: a.reasonTrue ? true : a.reasonFalse ? false : null,
        limit_context: a.maxContext,
      };
    }

    _capabilitiesCache = cache;
    return cache;
  } catch {
    return null;
  }
}

/** Test/ops hook: forces the next tier lookup to re-read `model_capabilities`. */
export function invalidateCapabilitiesCache(): void {
  _capabilitiesCache = null;
}

/**
 * Layer 3 with lifecycle veto and variant inheritance (#11508).
 *
 * Source is `"models_dev_tier"`, or `"models_dev_tier:inherited"` when the
 * score was resolved through the base model of an effort-suffix / `-free` /
 * explicitly aliased variant id (#11492 wired the same indirection into
 * layers 1–2 only; models.dev publishes base ids, so e.g. `gpt-5.6-sol-xhigh`
 * used to fall to the wildcard while `gpt-5.6-sol` scored premium).
 */
export function getModelsDevTierFitnessWithSource(
  model: string,
  taskType: string
): { score: number; source: string } | null {
  const normalizedModel = model.toLowerCase();
  const normalizedTask = taskType.toLowerCase();

  // Lifecycle veto runs before every other signal in this layer: a retired id
  // must fall through to the documented neutral baseline, never inherit a
  // premium score from capabilities data that outlived the vendor's support.
  if (loadRetiredModels().has(normalizedModel)) return null;

  const dbScore = queryModelIntelligence(normalizedModel, normalizedTask, "models_dev_tier");
  if (dbScore !== null) return { score: dbScore, source: "models_dev_tier" };

  const caps = loadModelCapabilities();
  if (!caps) return null;

  let capRow = caps[normalizedModel];
  let inheritedViaBase = false;
  if (!capRow) {
    const { base, via } = resolveScoresAs(normalizedModel);
    if (via !== null && base !== normalizedModel) {
      capRow = caps[base.toLowerCase()];
      inheritedViaBase = capRow != null;
    }
  }
  if (!capRow) return null;

  const tier = deriveTierFromCapabilities(capRow);
  const tierScores = TIER_TASK_FITNESS[tier];
  if (!tierScores) return null;

  const score = tierScores[normalizedTask] ?? tierScores.default ?? null;
  if (score === null) return null;
  return { score, source: inheritedViaBase ? "models_dev_tier:inherited" : "models_dev_tier" };
}

export function getModelsDevTierFitness(model: string, taskType: string): number | null {
  const hit = getModelsDevTierFitnessWithSource(model, taskType);
  return hit ? hit.score : null;
}

// ─── Resolution chain ───────────────────────────────────────────────────

/** Characters that separate the segments of a model id (`openai/gpt-4o-2024-05-13`). */
const SEGMENT_SEPARATORS = new Set(["-", ".", "/"]);

/**
 * True when `pattern` occurs in `model` delimited by segment boundaries on BOTH sides —
 * i.e. it starts at the beginning of the id or right after a `-` / `.` / `/`, and ends at
 * the end of the id or right before one.
 *
 * This is what makes a versioned row safe to keep (#11503). Substring matching scored
 * models the row was never about:
 *   - `o3` matched `solar-pro3` (an unrelated Upstage model)
 *   - `gpt-4o` matched `chatgpt-4o-latest`, which OpenAI shut down on 2026-02-17 —
 *     so a dead model inherited the live flagship's 0.9. With boundary matching the
 *     `-4o-` inside `chatgpt-4o-latest` is not a `gpt-4o` occurrence at a boundary
 *     (the preceding character is `t`), so it falls through to the neutral 0.5.
 * Legitimate forms still match: `o3`, `o3-mini`, `openai/o3`, `gpt-4o-2024-05-13`.
 */
function matchesAtSegmentBoundary(model: string, pattern: string): boolean {
  if (!pattern) return false;
  let index = model.indexOf(pattern);
  while (index !== -1) {
    const startsAtBoundary = index === 0 || SEGMENT_SEPARATORS.has(model[index - 1]);
    const endIndex = index + pattern.length;
    const endsAtBoundary = endIndex === model.length || SEGMENT_SEPARATORS.has(model[endIndex]);
    if (startsAtBoundary && endsAtBoundary) return true;
    index = model.indexOf(pattern, index + 1);
  }
  return false;
}

/**
 * Resolve a model id against the static fitness table, LONGEST PATTERN FIRST (#8603).
 *
 * The shadowing itself is already fixed on `release/v3.8.49` (9f5be229b): matching used
 * to return the first `String.includes` hit in declaration order, so a shorter pattern
 * declared earlier shadowed a model's own, more specific row — `FITNESS_TABLE.coding`
 * declares `"gpt-4o": 0.9` before `"gpt-4o-mini": 0.8`, so `gpt-4o-mini` inherited the
 * flagship's 0.9 and its own row was unreachable (same for `deepseek-v3.2` vs
 * `deepseek-v3`). The length-ranked scan below is that upstream fix, unchanged.
 *
 * What this PR adds is only the exported seam: the surrounding resolution chain hits the
 * DB (user_override / arena_elo / models.dev tier) before reaching layer 4, so pinning
 * the ordering guarantee through `getTaskFitness` would depend on DB fixture state.
 * `taskFitness-pattern-order-8603.test.ts` calls this directly instead.
 *
 * Matching is anchored to SEGMENT BOUNDARIES since #11503: a plain `String.includes`
 * let a row leak into ids that merely contain its characters — `o3` scored
 * `solar-pro3`, and `gpt-4o` scored `chatgpt-4o-latest` (a different, retired model).
 * See `matchesAtSegmentBoundary`.
 */
export function getStaticFitnessTableScore(model: string, taskType: string): number | null {
  const normalizedModel = model.toLowerCase();
  const normalizedTask = taskType.toLowerCase();
  const table = FITNESS_TABLE[normalizedTask] || FITNESS_TABLE.default;
  const sortedEntries = Object.entries(table).sort((a, b) => b[0].length - a[0].length);
  for (const [pattern, score] of sortedEntries) {
    if (matchesAtSegmentBoundary(normalizedModel, pattern)) return score;
  }
  return null;
}

function lookupStaticFitnessTable(normalizedModel: string, normalizedTask: string): number | null {
  return getStaticFitnessTableScore(normalizedModel, normalizedTask);
}

function lookupWildcardBoosts(normalizedModel: string, normalizedTask: string): number {
  let baseScore = 0.5;
  for (const wc of WILDCARD_BOOSTS) {
    if (normalizedModel.includes(wc.pattern) && normalizedTask === wc.taskType) {
      baseScore += wc.boost;
    }
  }
  return Math.min(1.0, baseScore);
}

export function getTaskFitness(model: string, taskType: string): number {
  return getTaskFitnessWithSource(model, taskType).score;
}

function isFitnessRetired(modelId: string): boolean {
  if (isVendorRetiredId(modelId)) return true;
  const { base, via } = resolveScoresAs(modelId);
  return via !== null && isVendorRetiredId(base);
}

export function getTaskFitnessWithSource(
  model: string,
  taskType: string
): { score: number; source: string } {
  const normalizedModel = model.toLowerCase();
  const normalizedTask = taskType.toLowerCase();
  const fitnessRetired = isFitnessRetired(normalizedModel);

  if (!fitnessRetired) {
    const userOverride = queryModelIntelligence(normalizedModel, normalizedTask, "user_override");
    if (userOverride !== null) {
      return { score: userOverride, source: "user_override" };
    }

    const arenaElo = queryModelIntelligence(normalizedModel, normalizedTask, "arena_elo");
    if (arenaElo !== null) {
      return { score: arenaElo, source: "arena_elo" };
    }

    // Layers 1-2, retried against the base model this id inherits quality from
    // (#11489). Every DB-backed source publishes scores for BASE models only, so
    // a variant id — an effort suffix (`gpt-5.6-sol-xhigh`), a vendor alias
    // (`gpt-5.6`), a `-free` tier marker (`mimo-v2.5-free`, #4517) — misses both
    // literal lookups and used to fall all the way to the wildcard 0.5, losing
    // every comparison against a base model that happens to be benchmarked.
    // The score is inherited VERBATIM: the 12-factor scoring already prices cost
    // and latency per variant, so there is no basis for inventing an effort
    // delta. `:inherited` keeps the indirection visible to callers.
    const inherited = lookupInheritedFitness(normalizedModel, normalizedTask);
    if (inherited !== null) {
      return inherited;
    }

    const tierScore = getModelsDevTierFitness(normalizedModel, normalizedTask);
    if (tierScore !== null) {
      return { score: tierScore, source: "models_dev_tier" };
    }

    const staticScore = lookupStaticFitnessTable(normalizedModel, normalizedTask);
    if (staticScore !== null) {
      return { score: staticScore, source: "fitness_table" };
    }

    return { score: lookupWildcardBoosts(normalizedModel, normalizedTask), source: "wildcard_boost" };
  }

  // Retired: 0.5 is "no evidence", never a quality claim and never a *codex boost.
  return { score: 0.5, source: "wildcard_boost" };
}

/**
 * Re-run the two DB-backed layers against the base model `normalizedModel`
 * inherits quality scores from (#11489). Returns `null` when the id resolves to
 * itself (nothing to inherit) or when the base has no row either.
 *
 * This subsumes the former `-free` arena_elo special case (#4517) and extends
 * it: the `-free` base is now consulted for `user_override` too, and the same
 * indirection now covers effort suffixes and vendor aliases. `resolveScoresAs`
 * is catalog-anchored, so a base that is not a routable id is never queried.
 */
function lookupInheritedFitness(
  normalizedModel: string,
  normalizedTask: string
): { score: number; source: string } | null {
  const { base, via } = resolveScoresAs(normalizedModel);
  if (via === null || base === normalizedModel) return null;
  const normalizedBase = base.toLowerCase();
  if (isVendorRetiredId(normalizedBase)) return null;

  for (const source of ["user_override", "arena_elo"] as const) {
    const score = queryModelIntelligence(normalizedBase, normalizedTask, source);
    if (score !== null) return { score, source: `${source}:inherited` };
  }
  return null;
}

export function setUserFitnessOverride(model: string, category: string, score: number): void {
  try {
    setUserFitnessOverrideEntry(model.toLowerCase(), category.toLowerCase(), score);
    invalidateFitnessCache();
  } catch (err) {
    throw new Error(
      `Failed to set user fitness override for ${model}/${category}: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

export function clearUserFitnessOverride(model: string, category: string): void {
  try {
    deleteUserFitnessOverrideEntry(model.toLowerCase(), category.toLowerCase());
    invalidateFitnessCache();
  } catch (err) {
    throw new Error(
      `Failed to clear user fitness override for ${model}/${category}: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

export function getTaskTypes(): string[] {
  return Object.keys(FITNESS_TABLE).filter((k) => k !== "default");
}

export function invalidateFitnessCache(): void {
  _capabilitiesCache = null;
  _intelligenceCache.clear();
}
