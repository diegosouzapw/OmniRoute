import { logToolCall } from "../audit.ts";
import { getMcpHttpAuthHeadersForInternalFetch } from "../httpAuthContext.ts";
import { normalizeQuotaResponse } from "../../../src/shared/contracts/quota.ts";
import { resolveOmniRouteBaseUrl } from "../../../src/shared/utils/resolveOmniRouteBaseUrl.ts";
import {
  getComboModelProvider,
  getComboModelString,
  getComboStepTarget,
} from "../../../src/lib/combos/steps.ts";
import type { AutoRoutingStrategyValue } from "../../../src/shared/constants/routingStrategies.ts";
import { rankBySpeed, DEFAULT_SPEED_WEIGHTS } from "../../services/autoCombo/speedRanking.ts";
import type { SpeedCandidate } from "../../services/autoCombo/speedRanking.ts";

const OMNIROUTE_BASE_URL = resolveOmniRouteBaseUrl();
const OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY || "";

async function apiFetch(path: string, options: RequestInit = {}): Promise<unknown> {
  const url = `${OMNIROUTE_BASE_URL}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(OMNIROUTE_API_KEY ? { Authorization: `Bearer ${OMNIROUTE_API_KEY}` } : {}),
    ...getMcpHttpAuthHeadersForInternalFetch(),
    ...((options.headers as Record<string, string>) || {}),
  };
  const response = await fetch(url, { ...options, headers, signal: AbortSignal.timeout(30000) });
  if (!response.ok) {
    const text = await response.text().catch(() => "Unknown error");
    throw new Error(`API [${response.status}]: ${text}`);
  }
  return response.json();
}

type JsonRecord = Record<string, unknown>;
interface ComboModel { provider: string; model: string; inputCostPer1M: number; }
function isRecord(value: unknown): value is JsonRecord { return !!value && typeof value === "object" && !Array.isArray(value); }
function toRecord(value: unknown): JsonRecord { return isRecord(value) ? value : {}; }
function toArrayOfRecords(value: unknown): JsonRecord[] { return Array.isArray(value) ? value.filter(isRecord) : []; }
function toString(value: unknown, fallback = ""): string { return typeof value === "string" ? value : fallback; }
function toNumber(value: unknown, fallback = 0): number {
  const parsed = typeof value === "number" ? value : typeof value === "string" && value.trim().length > 0 ? Number(value) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}
function getComboModels(combo: JsonRecord): ComboModel[] {
  const directModels = toArrayOfRecords(combo.models);
  const nestedModels = toArrayOfRecords(toRecord(combo.data).models);
  const sourceModels = directModels.length > 0 ? directModels : nestedModels;
  return sourceModels.map((model) => ({
    provider: getComboModelProvider(model) || (getComboModelString(model) ? "unknown" : "combo"),
    model: getComboModelString(model) || getComboStepTarget(model) || "",
    inputCostPer1M: toNumber(model.inputCostPer1M, 3.0),
  }));
}
function normalizeCombosResponse(raw: unknown): JsonRecord[] {
  if (Array.isArray(raw)) return raw.filter(isRecord);
  const source = toRecord(raw);
  return Array.isArray(source.combos) ? source.combos.filter(isRecord) : [];
}

/**
 * Speed-optimized "pick the fastest reliable provider×model" tool.
 *
 * Composes live telemetry from `/api/combos/metrics` (per-combo per-model
 * avg latency + success rate), `/api/monitoring/health` (circuit-breaker
 * state), `/api/usage/quota` (quota remaining) and `/api/usage/analytics`
 * (per-provider p95 / errorRate) into SpeedCandidates, runs the same
 * `rankBySpeed` engine that drives `LatencyStrategyImpl` and the latency-
 * optimized playground preview, and returns:
 *   - the top-ranked (fastest) provider×model pair,
 *   - the full ranked list with per-factor scores (ttft / tps / e2e /
 *     p95 / health / reliability / stability) so callers can show
 *     "why this one wins" in dashboards,
 *   - optionally applies the choice to a target combo by flipping its
 *     strategy to "auto" + autoRoutingStrategy "latency", so the runtime
 *     router will keep using this ranking.
 */
export async function handlePickFastestModel(args: {
  comboId?: string;
  /** When true, OPEN-circuit candidates are still scored (sorted to the bottom). */
  includeUnhealthy?: boolean;
  /** Optional weight overrides; merged onto DEFAULT_SPEED_WEIGHTS. */
  weights?: Partial<{
    ttft: number;
    tps: number;
    e2e: number;
    p95: number;
    health: number;
    reliability: number;
    stability: number;
  }>;
  /** When true + comboId present, sets the combo's autoRoutingStrategy to "latency". */
  applyToCombo?: boolean;
  /** Max number of ranked entries to return (default 10). */
  limit?: number;
}) {
  const start = Date.now();
  try {
    // Pull all of the live telemetry we need in parallel.
    const [combosRaw, healthRaw, quotaRaw, analyticsRaw] = await Promise.allSettled([
      apiFetch("/api/combos"),
      apiFetch("/api/monitoring/health"),
      apiFetch("/api/usage/quota"),
      apiFetch("/api/usage/analytics?period=session"),
    ]);

    const combos = combosRaw.status === "fulfilled" ? normalizeCombosResponse(combosRaw.value) : [];
    const health = healthRaw.status === "fulfilled" ? toRecord(healthRaw.value) : {};
    const quota =
      quotaRaw.status === "fulfilled"
        ? normalizeQuotaResponse(quotaRaw.value)
        : normalizeQuotaResponse({});
    const analytics = analyticsRaw.status === "fulfilled" ? toRecord(analyticsRaw.value) : {};
    const analyticsByProvider = toRecord(toRecord(analytics.byProvider));
    const analyticsTop = toRecord(analytics);

    // Narrow to the requested combo, if provided.
    const targetCombo = args.comboId
      ? combos.find(
          (combo) => toString(combo.id) === args.comboId || toString(combo.name) === args.comboId
        )
      : undefined;

    const scopedCombos = targetCombo
      ? [targetCombo]
      : combos.filter((combo) => combo.enabled !== false);

    if (scopedCombos.length === 0) {
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ error: "No matching combos available" }),
          },
        ],
        isError: true,
      };
    }

    const breakers = toArrayOfRecords(health.circuitBreakers);
    const providers = quota.providers;

    // Assemble SpeedCandidates from the combo's models.
    const speedCandidates: SpeedCandidate[] = [];
    for (const combo of scopedCombos) {
      const models = getComboModels(combo);
      for (const model of models) {
        if (!model.provider || !model.model) continue;
        const cb = breakers.find((breaker) => toString(breaker.provider) === model.provider);
        const q = providers.find((providerEntry) => providerEntry.provider === model.provider);
        const perProvider = toRecord(analyticsByProvider[model.provider]);
        const fallbackAnalytics = perProvider.requests
          ? perProvider
          : toRecord(analyticsTop.byProvider && analyticsTop.byProvider[model.provider]);
        const cbState = toString(cb?.state, "CLOSED") as SpeedCandidate["circuitBreakerState"];
        const p95 = toNumber(perProvider.p95LatencyMs ?? fallbackAnalytics.p95LatencyMs, NaN);
        const errorRate = toNumber(perProvider.errorRate ?? fallbackAnalytics.errorRate, 0);

        speedCandidates.push({
          provider: model.provider,
          model: model.model,
          circuitBreakerState: cbState,
          avgE2ELatencyMs: toNumber(perProvider.avgLatencyMs ?? fallbackAnalytics.avgLatencyMs, NaN),
          p95LatencyMs: Number.isFinite(p95) ? p95 : 0,
          avgTokensPerSecond: toNumber(perProvider.avgTokensPerSecond ?? fallbackAnalytics.tps, NaN),
          avgTtftMs: toNumber(
            perProvider.avgTtftMs ?? fallbackAnalytics.ttftMs ?? fallbackAnalytics.avgTtftMs,
            NaN
          ),
          latencyStdDev: toNumber(perProvider.latencyStdDev ?? fallbackAnalytics.latencyStdDev, NaN),
          errorRate: Number.isFinite(errorRate) ? errorRate : 0,
          failureRate: Number.isFinite(errorRate) ? errorRate : 0,
          quotaRemaining: q?.quotaUsed != null && q?.quotaTotal
            ? Math.max(0, 100 - q.quotaUsed / q.quotaTotal * 100)
            : 100,
          quotaTotal: q?.quotaTotal ?? 100,
          costPer1MTokens: model.inputCostPer1M ?? 0,
        });
      }
    }

    // Dedupe by provider×model (a model can appear across multiple combos).
    const dedupeKey = (c: SpeedCandidate) => `${c.provider}::${c.model}`;
    const deduped = new Map<string, SpeedCandidate>();
    for (const candidate of speedCandidates) {
      const key = dedupeKey(candidate);
      const existing = deduped.get(key);
      if (!existing) {
        deduped.set(key, candidate);
        continue;
      }
      // Prefer the candidate whose CB / quota numbers are most populated.
      const existingScore = (existing.circuitBreakerState ? 1 : 0) + (existing.quotaRemaining != null ? 1 : 0);
      const newScore = (candidate.circuitBreakerState ? 1 : 0) + (candidate.quotaRemaining != null ? 1 : 0);
      if (newScore > existingScore) deduped.set(key, candidate);
    }
    const finalCandidates = [...deduped.values()];

    if (finalCandidates.length === 0) {
      return {
        content: [
          { type: "text" as const, text: JSON.stringify({ error: "No provider×model candidates available to rank" }) },
        ],
        isError: true,
      };
    }

    // Merge caller weight overrides on top of the defaults.
    const weights = args.weights
      ? { ...DEFAULT_SPEED_WEIGHTS, ...args.weights }
      : DEFAULT_SPEED_WEIGHTS;

    const ranked = rankBySpeed(finalCandidates, weights, {
      includeUnhealthy: args.includeUnhealthy === true,
    });

    const limit = Math.min(Math.max(toNumber(args.limit, 10), 1), 50);
    const trimmed = ranked.slice(0, limit);
    const winner = trimmed[0];

    // Optionally apply the winner's provider×model back to the target combo by
    // flipping it into "auto" routing with the "latency" strategy.  We still
    // let the runtime router pick the actual model within the combo's pool
    // (this call does not mutate the combo's model list).
    let appliedToCombo: JsonRecord | null = null;
    if (args.applyToCombo && targetCombo && winner) {
      const comboId = toString(targetCombo.id);
      const comboData = toRecord(targetCombo.data);
      const currentConfig = toRecord(
        Object.keys(toRecord(targetCombo.config)).length > 0
          ? targetCombo.config
          : comboData.config
      );
      const currentAutoConfig = toRecord(currentConfig.auto);
      const nextConfig = {
        ...currentConfig,
        auto: {
          ...currentAutoConfig,
          routerStrategy: "latency" as AutoRoutingStrategyValue,
        },
      };
      const updatedCombo = toRecord(
        await apiFetch(`/api/combos/${encodeURIComponent(comboId)}`, {
          method: "PUT",
          body: JSON.stringify({ strategy: "auto", config: nextConfig }),
        })
      );
      const updatedConfig = toRecord(updatedCombo.config);
      appliedToCombo = {
        id: toString(updatedCombo.id, comboId),
        name: toString(updatedCombo.name, toString(targetCombo.name, comboId)),
        strategy: toString(updatedCombo.strategy, "auto"),
        autoRoutingStrategy: toString(toRecord(updatedConfig.auto).routerStrategy, "latency"),
      };
    }

    const result = {
      fastest: winner
        ? {
            provider: winner.provider,
            model: winner.model,
            score: winner.score,
            reason: winner.reason,
          }
        : null,
      ranked: trimmed.map((entry) => ({
        provider: entry.provider,
        model: entry.model,
        score: entry.score,
        factors: entry.factors,
        metrics: entry.metrics,
        reason: entry.reason,
      })),
      weights,
      comboScope: targetCombo
        ? { id: toString(targetCombo.id), name: toString(targetCombo.name) }
        : null,
      appliedToCombo,
    };

    await logToolCall("omniroute_pick_fastest_model", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall(
      "omniroute_pick_fastest_model",
      args,
      null,
      Date.now() - start,
      false,
      msg
    );
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}
