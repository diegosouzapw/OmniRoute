import type { PersistedEvalRun } from "../../src/lib/db/evals.ts";
import { listModelEvalRunsForRouting } from "../../src/lib/db/evals.ts";
import { parseModel } from "./model.ts";

type EvalRoutingLogger = {
  info?: (...args: unknown[]) => void;
  warn?: (...args: unknown[]) => void;
  debug?: (...args: unknown[]) => void;
};

type EvalRoutingTarget = {
  modelStr: string;
};

type EvalRoutingConfig = {
  enabled: boolean;
  suiteIds: string[];
  maxAgeHours: number;
  minCases: number;
  qualityWeight: number;
  latencyWeight: number;
  cacheTtlMs: number;
};

type TargetScore = {
  score: number;
  passRate: number;
  avgLatencyMs: number;
  totalCases: number;
  runs: number;
};

const DEFAULT_EVAL_ROUTING_CONFIG: EvalRoutingConfig = {
  enabled: false,
  suiteIds: [],
  maxAgeHours: 24 * 30,
  minCases: 1,
  qualityWeight: 0.85,
  latencyWeight: 0.15,
  cacheTtlMs: 60_000,
};

const MAX_EVAL_ROUTING_CACHE_ENTRIES = 200;
const evalRoutingCache = new Map<string, { expiresAt: number; runs: PersistedEvalRun[] }>();

function pruneEvalRoutingCache(now = Date.now()): void {
  for (const [key, entry] of evalRoutingCache) {
    if (entry.expiresAt <= now) evalRoutingCache.delete(key);
  }

  while (evalRoutingCache.size > MAX_EVAL_ROUTING_CACHE_ENTRIES) {
    const oldestKey = evalRoutingCache.keys().next().value;
    if (!oldestKey) break;
    evalRoutingCache.delete(oldestKey);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function toStringList(value: unknown, maxItems: number): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map((entry) => String(entry || "").trim()).filter(Boolean))].slice(
    0,
    maxItems
  );
}

function clampNumber(value: unknown, fallback: number, min: number, max: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function normalizeEvalRoutingConfig(rawConfig: unknown): EvalRoutingConfig {
  const raw = isRecord(rawConfig) ? rawConfig : {};
  const qualityWeight = clampNumber(
    raw.qualityWeight,
    DEFAULT_EVAL_ROUTING_CONFIG.qualityWeight,
    0,
    1
  );
  const latencyWeight = clampNumber(
    raw.latencyWeight,
    DEFAULT_EVAL_ROUTING_CONFIG.latencyWeight,
    0,
    1
  );
  const weightTotal = qualityWeight + latencyWeight;

  return {
    enabled: raw.enabled === true,
    suiteIds: toStringList(raw.suiteIds, 50),
    maxAgeHours: clampNumber(raw.maxAgeHours, DEFAULT_EVAL_ROUTING_CONFIG.maxAgeHours, 1, 24 * 365),
    minCases: Math.floor(
      clampNumber(raw.minCases, DEFAULT_EVAL_ROUTING_CONFIG.minCases, 1, 100_000)
    ),
    qualityWeight: weightTotal > 0 ? qualityWeight / weightTotal : 1,
    latencyWeight: weightTotal > 0 ? latencyWeight / weightTotal : 0,
    cacheTtlMs: Math.floor(
      clampNumber(raw.cacheTtlMs, DEFAULT_EVAL_ROUTING_CONFIG.cacheTtlMs, 1_000, 300_000)
    ),
  };
}

function getTargetAliases(modelStr: string): string[] {
  const parsed = parseModel(modelStr);
  const modelId = typeof parsed.model === "string" ? parsed.model.trim() : "";
  return [...new Set([modelStr.trim(), modelId].filter(Boolean))];
}

function buildCacheKey(targetIds: string[], config: EvalRoutingConfig): string {
  return JSON.stringify({
    targetIds: [...targetIds].sort(),
    suiteIds: [...config.suiteIds].sort(),
    maxAgeHours: config.maxAgeHours,
    minCases: config.minCases,
  });
}

function getEvalRuns(targetIds: string[], config: EvalRoutingConfig): PersistedEvalRun[] {
  const now = Date.now();
  pruneEvalRoutingCache(now);

  const cacheKey = buildCacheKey(targetIds, config);
  const cached = evalRoutingCache.get(cacheKey);
  if (cached && cached.expiresAt > now) return cached.runs;

  const runs = listModelEvalRunsForRouting({
    targetIds,
    suiteIds: config.suiteIds,
    maxAgeHours: config.maxAgeHours,
  });
  evalRoutingCache.set(cacheKey, { expiresAt: now + config.cacheTtlMs, runs });
  pruneEvalRoutingCache(now);
  return runs;
}

function dedupeLatestRunsBySuite(runs: PersistedEvalRun[]): PersistedEvalRun[] {
  const latest = new Map<string, PersistedEvalRun>();
  for (const run of runs) {
    const key = run.suiteId;
    const current = latest.get(key);
    if (!current || new Date(run.createdAt).getTime() > new Date(current.createdAt).getTime()) {
      latest.set(key, run);
    }
  }
  return Array.from(latest.values());
}

function calculateTargetScore(
  runs: PersistedEvalRun[],
  config: EvalRoutingConfig,
  bestLatencyMs: number | null
): TargetScore | null {
  const validRuns = dedupeLatestRunsBySuite(runs).filter(
    (run) => run.summary.total >= config.minCases
  );
  if (validRuns.length === 0) return null;

  const totalCases = validRuns.reduce((sum, run) => sum + run.summary.total, 0);
  if (totalCases < config.minCases) return null;

  const passRate =
    validRuns.reduce((sum, run) => sum + run.summary.passRate * run.summary.total, 0) / totalCases;
  const latencyWeight = validRuns.reduce(
    (sum, run) => sum + Math.max(0, run.avgLatencyMs) * run.summary.total,
    0
  );
  const avgLatencyMs = latencyWeight / totalCases;
  const qualityScore = Math.max(0, Math.min(1, passRate / 100));
  const latencyScore =
    bestLatencyMs && avgLatencyMs > 0
      ? Math.max(0, Math.min(1, bestLatencyMs / avgLatencyMs))
      : 0.5;
  const score = qualityScore * config.qualityWeight + latencyScore * config.latencyWeight;

  return {
    score,
    passRate,
    avgLatencyMs,
    totalCases,
    runs: validRuns.length,
  };
}

function buildRankedEvalEntries<T extends EvalRoutingTarget>(
  targets: T[],
  aliasesByIndex: string[][],
  config: EvalRoutingConfig
): {
  entries: Array<{
    target: T;
    index: number;
    score: ReturnType<typeof calculateTargetScore> | null;
  }>;
} | null {
  let runs: PersistedEvalRun[];
  try {
    const targetIds = [...new Set(aliasesByIndex.flat())];
    if (targetIds.length === 0) return null;
    runs = getEvalRuns(targetIds, config);
  } catch {
    return null;
  }

  if (runs.length === 0) return null;

  const runsByTargetId = new Map<string, PersistedEvalRun[]>();
  for (const run of runs) {
    const targetId = run.target.id;
    if (!targetId) continue;
    const bucket = runsByTargetId.get(targetId) || [];
    bucket.push(run);
    runsByTargetId.set(targetId, bucket);
  }

  const runsByIndex = aliasesByIndex.map((aliases) => {
    const byId = new Map<string, PersistedEvalRun>();
    for (const alias of aliases) {
      for (const run of runsByTargetId.get(alias) || []) {
        byId.set(run.id, run);
      }
    }
    return Array.from(byId.values());
  });

  const candidateLatencies = runsByIndex
    .flatMap((targetRuns) => dedupeLatestRunsBySuite(targetRuns))
    .filter((run) => run.summary.total >= config.minCases && run.avgLatencyMs > 0)
    .map((run) => run.avgLatencyMs);
  const bestLatencyMs = candidateLatencies.length > 0 ? Math.min(...candidateLatencies) : null;

  const entries = targets.map((target, index) => ({
    target,
    index,
    score: calculateTargetScore(runsByIndex[index] || [], config, bestLatencyMs),
  }));

  if (entries.filter((entry) => entry.score).length === 0) return null;

  entries.sort((left, right) => {
    if (left.score && right.score) {
      const delta = right.score.score - left.score.score;
      if (Math.abs(delta) > 0.0001) return delta;
      return left.index - right.index;
    }
    if (left.score) return -1;
    if (right.score) return 1;
    return left.index - right.index;
  });

  return { entries };
}

export function orderTargetsByEvalScores<T extends EvalRoutingTarget>(
  targets: T[],
  rawConfig: unknown,
  log: EvalRoutingLogger = {}
): T[] {
  const config = normalizeEvalRoutingConfig(rawConfig);
  if (!config.enabled || targets.length <= 1) return targets;

  const aliasesByIndex = targets.map((target) => getTargetAliases(target.modelStr));
  const result = buildRankedEvalEntries(targets, aliasesByIndex, config);
  if (!result) return targets;

  const { entries } = result;
  const scoredCount = entries.filter((entry) => entry.score).length;

  log.info?.(
    "COMBO",
    `Eval-driven routing: ranked ${scoredCount}/${targets.length} targets by eval history`
  );
  log.debug?.(
    "COMBO",
    `Eval-driven routing scores: ${entries
      .filter((entry) => entry.score)
      .map(
        (entry) =>
          `${entry.target.modelStr}=${entry.score?.score.toFixed(3)} pass=${entry.score?.passRate.toFixed(1)} cases=${entry.score?.totalCases}`
      )
      .join(", ")}`
  );

  return entries.map((entry) => entry.target);
}

export function resetEvalRoutingCache(): void {
  evalRoutingCache.clear();
}
