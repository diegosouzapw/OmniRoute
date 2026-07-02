/**
 * Task Fitness Lookup Table
 *
 * Maps model patterns × task types → fitness score [0..1].
 * Supports wildcards and prefix matching.
 *
 * Resolution chain (highest → lowest priority):
 * 1. User override — DB `model_intelligence` where source='user_override'
 * 2. Arena ELO — DB `model_intelligence` where source='arena_elo'
 * 3. Models.dev tier — derived from `model_capabilities` table capability data
 * 4. Static FITNESS_TABLE — existing hardcoded lookup (current behavior)
 * 5. Wildcard boosts — existing pattern matching boosts (current behavior)
 */

// ─── Static fitness table (unchanged, fallback layer 4) ─────────────────

import { getDbInstance } from "../../../src/lib/db/core.ts";
import {
  getModelIntelligenceBySource,
  setUserFitnessOverrideEntry,
  deleteUserFitnessOverrideEntry,
} from "../../../src/lib/db/modelIntelligence.ts";

const FITNESS_TABLE: Record<string, Record<string, number>> = {
  coding: {
    "claude-sonnet": 0.95,
    "claude-opus": 0.92,
    "claude-haiku": 0.78,
    "gpt-4o": 0.9,
    "gpt-4o-mini": 0.8,
    "gpt-4-turbo": 0.88,
    o1: 0.93,
    o3: 0.95,
    "o4-mini": 0.88,
    codex: 0.98,
    "gemini-pro": 0.85,
    "gemini-flash": 0.8,
    "gemini-2.5-pro": 0.92,
    "gemini-2.5-flash": 0.82,
    "deepseek-coder": 0.9,
    "deepseek-v3": 0.85,
    "deepseek-r1": 0.88,
    "deepseek-chat": 0.84, // DeepSeek V3.2 Chat — strong code performance
    "deepseek-v3.2": 0.86, // Explicit V3.2 alias
    qwen: 0.78,
    llama: 0.72,
    mistral: 0.75,
    mixtral: 0.77,
    // Grok-4 fast — good code, ultra-low latency (1143ms P50)
    "grok-4-fast": 0.8,
    "grok-4": 0.82,
    "grok-3": 0.8,
    // Kimi K2.5 — agentic with tool calling, good at code tasks
    "kimi-k2": 0.82,
    // GLM-5.1 / GLM-5 — Z.AI reasoning models, 200K context / 128k output
    "glm-5.1": 0.78,
    "glm-5": 0.78,
    // MiniMax M2.5 — reasoning support helps complex code
    "minimax-m2.5": 0.75,
    "minimax-m2": 0.72,
  },
  review: {
    "claude-sonnet": 0.92,
    "claude-opus": 0.95,
    "claude-haiku": 0.7,
    "gpt-4o": 0.88,
    "gpt-4o-mini": 0.72,
    o1: 0.9,
    o3: 0.92,
    "gemini-pro": 0.9,
    "gemini-2.5-pro": 0.93,
    "gemini-flash": 0.75,
    "deepseek-r1": 0.85,
    "deepseek-v3": 0.8,
  },
  planning: {
    "claude-opus": 0.95,
    "claude-sonnet": 0.9,
    "gpt-4o": 0.88,
    o1: 0.92,
    o3: 0.95,
    "gemini-2.5-pro": 0.93,
    "gemini-pro": 0.88,
    "deepseek-r1": 0.85,
  },
  analysis: {
    "claude-opus": 0.95,
    "claude-sonnet": 0.92,
    "gemini-2.5-pro": 0.95,
    "gemini-pro": 0.88,
    "gemini-3.1-pro": 0.95, // Gemini 3.1 Pro — 1M context, ideal for long analysis
    "gpt-4o": 0.85,
    o1: 0.9,
    o3: 0.93,
    "deepseek-r1": 0.88,
    "deepseek-chat": 0.8,
    "kimi-k2": 0.82, // Kimi K2.5 agentic — good for analysis
    "glm-5.1": 0.82, // GLM-5.1 free reasoning, 200K context for long analysis
    "glm-5": 0.78, // GLM-5 with 128k output for long analysis
    "minimax-m2.5": 0.76,
  },
  debugging: {
    "claude-sonnet": 0.93,
    "claude-opus": 0.9,
    "gpt-4o": 0.88,
    o1: 0.85,
    "deepseek-coder": 0.9,
    "deepseek-v3": 0.82,
    "gemini-flash": 0.78,
    codex: 0.92,
  },
  documentation: {
    "claude-sonnet": 0.9,
    "claude-opus": 0.88,
    "gpt-4o": 0.92,
    "gpt-4o-mini": 0.85,
    "gemini-pro": 0.88,
    "gemini-flash": 0.82,
    "deepseek-v3": 0.78,
  },
  default: {
    "claude-sonnet": 0.85,
    "claude-opus": 0.85,
    "gpt-4o": 0.85,
    "gemini-pro": 0.8,
    "gemini-3.1-pro": 0.85,
    "deepseek-v3": 0.75,
    "deepseek-chat": 0.74,
    "gemini-flash": 0.72,
    // New models from ClawRouter analysis (2026-03-17):
    "grok-4-fast": 0.72, // ultra-fast, suitable for all tasks
    "grok-4": 0.74,
    "grok-3": 0.73,
    "kimi-k2": 0.76, // agentic multi-step tasks
    "glm-5.1": 0.75,
    "glm-5": 0.7,
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

function loadModelCapabilities(): Record<string, ModelCapRow> | null {
  if (_capabilitiesCache) return _capabilitiesCache;

  try {
    const db = getDbInstance();
    const rows = db.prepare("SELECT * FROM model_capabilities").all() as Record<string, unknown>[];
    const cache: Record<string, ModelCapRow> = {};

    for (const row of rows) {
      const modelId = typeof row.model_id === "string" ? row.model_id : "";
      if (!modelId) continue;

      cache[modelId.toLowerCase()] = {
        tool_call:
          row.tool_call === true || row.tool_call === 1
            ? true
            : row.tool_call === false || row.tool_call === 0
              ? false
              : null,
        reasoning:
          row.reasoning === true || row.reasoning === 1
            ? true
            : row.reasoning === false || row.reasoning === 0
              ? false
              : null,
        limit_context: typeof row.limit_context === "number" ? row.limit_context : null,
      };
    }

    _capabilitiesCache = cache;
    return cache;
  } catch {
    return null;
  }
}

export function getModelsDevTierFitness(model: string, taskType: string): number | null {
  const normalizedModel = model.toLowerCase();
  const normalizedTask = taskType.toLowerCase();

  const dbScore = queryModelIntelligence(normalizedModel, normalizedTask, "models_dev_tier");
  if (dbScore !== null) return dbScore;

  const caps = loadModelCapabilities();
  if (!caps) return null;

  const capRow = caps[normalizedModel];
  if (!capRow) return null;

  const tier = deriveTierFromCapabilities(capRow);
  const tierScores = TIER_TASK_FITNESS[tier];
  if (!tierScores) return null;

  return tierScores[normalizedTask] ?? tierScores.default ?? null;
}

// ─── Resolution chain ───────────────────────────────────────────────────

function lookupStaticFitnessTable(normalizedModel: string, normalizedTask: string): number | null {
  const table = FITNESS_TABLE[normalizedTask] || FITNESS_TABLE.default;
  for (const [pattern, score] of Object.entries(table)) {
    if (normalizedModel.includes(pattern)) return score;
  }
  return null;
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

export function getTaskFitnessWithSource(
  model: string,
  taskType: string
): { score: number; source: string } {
  const normalizedModel = model.toLowerCase();
  const normalizedTask = taskType.toLowerCase();

  const userOverride = queryModelIntelligence(normalizedModel, normalizedTask, "user_override");
  if (userOverride !== null) {
    return { score: userOverride, source: "user_override" };
  }

  // Try arena_elo with the literal model id first (e.g. "mimo-v2.5"). If that's
  // a miss and the model id carries a "-free" suffix (e.g. "mimo-v2.5-free"),
  // try the un-suffixed base id so free-tier variants inherit the arena_elo
  // score of their paid counterpart. This is what operators expect: the
  // upstream's `mimo-v2.5` is benchmarked once, and `mimo-v2.5-free` should
  // pick up the same signal rather than falling through to the wildcard 0.5
  // and losing every free-vs-paid comparison.
  const arenaElo = queryModelIntelligence(normalizedModel, normalizedTask, "arena_elo");
  if (arenaElo !== null) {
    return { score: arenaElo, source: "arena_elo" };
  }
  const arenaEloBase = lookupFreeAliasArenaElo(normalizedModel, normalizedTask);
  if (arenaEloBase !== null) {
    return { score: arenaEloBase, source: "arena_elo_free_alias" };
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

/** Suffix used to mark free-tier model variants (e.g. "mimo-v2.5-free"). */
const FREE_SUFFIX = "-free";

/**
 * Strip a trailing "-free" suffix from the model id and re-query arena_elo.
 * Returns `null` when the original id has no "-free" suffix, when the base id
 * is identical to the original, or when no arena_elo row exists for the base.
 *
 * Examples:
 *   "mimo-v2.5-free"   → look up "mimo-v2.5"
 *   "deepseek-v4-flash-free" → look up "deepseek-v4-flash"
 *   "big-pickle"       → no "-free" suffix → return null (skip)
 */
function lookupFreeAliasArenaElo(normalizedModel: string, normalizedTask: string): number | null {
  if (!normalizedModel.endsWith(FREE_SUFFIX)) return null;
  const baseId = normalizedModel.slice(0, -FREE_SUFFIX.length);
  if (baseId.length === 0 || baseId === normalizedModel) return null;
  return queryModelIntelligence(baseId, normalizedTask, "arena_elo");
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
