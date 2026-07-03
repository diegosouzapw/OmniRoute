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
interface PickFastestModelArgs {
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
}
interface TelemetrySources {
  combos: JsonRecord[];
  breakers: JsonRecord[];
  providers: ReturnType<typeof normalizeQuotaResponse>["providers"];
  analyticsByProvider: JsonRecord;
  analyticsTop: JsonRecord;
}

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

function settledValue(result: PromiseSettledResult<unknown>): unknown {
  return result.status === "fulfilled" ? result.value : undefined;
}

async function fetchTelemetrySources(): Promise<TelemetrySources> {
  const [combosRaw, healthRaw, quotaRaw, analyticsRaw] = await Promise.allSettled([
    apiFetch("/api/combos"),
    apiFetch("/api/monitoring/health"),
    apiFetch("/api/usage/quota"),
    apiFetch("/api/usage/analytics?period=session"),
  ]);

  const analytics = toRecord(settledValue(analyticsRaw));
  return {
    combos: normalizeCombosResponse(settledValue(combosRaw)),
    breakers: toArrayOfRecords(toRecord(settledValue(healthRaw)).circuitBreakers),
    providers: normalizeQuotaResponse(settledValue(quotaRaw) ?? {}).providers,
    analyticsByProvider: toRecord(toRecord(analytics.byProvider)),
    analyticsTop: analytics,
  };
}

function selectComboScope(combos: JsonRecord[], comboId?: string) {
  const targetCombo = comboId
    ? combos.find((combo) => toString(combo.id) === comboId || toString(combo.name) === comboId)
    : undefined;
  return {
    targetCombo,
    scopedCombos: targetCombo ? [targetCombo] : combos.filter((combo) => combo.enabled !== false),
  };
}

function noCandidatesResult(error: string) {
  return { content: [{ type: "text" as const, text: JSON.stringify({ error }) }], isError: true };
}

function providerAnalytics(sources: TelemetrySources, provider: string) {
  const perProvider = toRecord(sources.analyticsByProvider[provider]);
  return perProvider.requests
    ? perProvider
    : toRecord(sources.analyticsTop.byProvider && toRecord(sources.analyticsTop.byProvider)[provider]);
}

function buildCandidate(model: ComboModel, sources: TelemetrySources): SpeedCandidate {
  const cb = sources.breakers.find((breaker) => toString(breaker.provider) === model.provider);
  const q = sources.providers.find((providerEntry) => providerEntry.provider === model.provider);
  const analytics = providerAnalytics(sources, model.provider);
  const cbState = toString(cb?.state, "CLOSED") as SpeedCandidate["circuitBreakerState"];
  const p95 = toNumber(analytics.p95LatencyMs, NaN);
  const errorRate = toNumber(analytics.errorRate, 0);

  return {
    provider: model.provider,
    model: model.model,
    circuitBreakerState: cbState,
    avgE2ELatencyMs: toNumber(analytics.avgLatencyMs, NaN),
    p95LatencyMs: Number.isFinite(p95) ? p95 : 0,
    avgTokensPerSecond: toNumber(analytics.avgTokensPerSecond ?? analytics.tps, NaN),
    avgTtftMs: toNumber(analytics.avgTtftMs ?? analytics.ttftMs, NaN),
    latencyStdDev: toNumber(analytics.latencyStdDev, NaN),
    errorRate: Number.isFinite(errorRate) ? errorRate : 0,
    failureRate: Number.isFinite(errorRate) ? errorRate : 0,
    quotaRemaining: q?.quotaUsed != null && q?.quotaTotal
      ? Math.max(0, 100 - q.quotaUsed / q.quotaTotal * 100)
      : 100,
    quotaTotal: q?.quotaTotal ?? 100,
    costPer1MTokens: model.inputCostPer1M ?? 0,
  };
}

function buildSpeedCandidates(scopedCombos: JsonRecord[], sources: TelemetrySources): SpeedCandidate[] {
  const speedCandidates: SpeedCandidate[] = [];
  for (const combo of scopedCombos) {
    for (const model of getComboModels(combo)) {
      if (model.provider && model.model) speedCandidates.push(buildCandidate(model, sources));
    }
  }
  return speedCandidates;
}

function candidateCompletenessScore(candidate: SpeedCandidate): number {
  return (candidate.circuitBreakerState ? 1 : 0) + (candidate.quotaRemaining != null ? 1 : 0);
}

function dedupeCandidates(candidates: SpeedCandidate[]): SpeedCandidate[] {
  const deduped = new Map<string, SpeedCandidate>();
  for (const candidate of candidates) {
    const key = `${candidate.provider}::${candidate.model}`;
    const existing = deduped.get(key);
    if (!existing || candidateCompletenessScore(candidate) > candidateCompletenessScore(existing)) {
      deduped.set(key, candidate);
    }
  }
  return [...deduped.values()];
}

async function applyWinnerToCombo(targetCombo: JsonRecord, winner: { provider: string; model: string }) {
  const comboId = toString(targetCombo.id);
  const comboData = toRecord(targetCombo.data);
  const baseConfig = toRecord(targetCombo.config);
  const currentConfig = Object.keys(baseConfig).length > 0 ? baseConfig : toRecord(comboData.config);
  const nextConfig = {
    ...currentConfig,
    auto: {
      ...toRecord(currentConfig.auto),
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
  return {
    id: toString(updatedCombo.id, comboId),
    name: toString(updatedCombo.name, toString(targetCombo.name, comboId)),
    strategy: toString(updatedCombo.strategy, "auto"),
    autoRoutingStrategy: toString(toRecord(updatedConfig.auto).routerStrategy, "latency"),
  };
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
export async function handlePickFastestModel(args: PickFastestModelArgs) {
  const start = Date.now();
  try {
    const sources = await fetchTelemetrySources();
    const { targetCombo, scopedCombos } = selectComboScope(sources.combos, args.comboId);

    if (scopedCombos.length === 0) {
      return noCandidatesResult("No matching combos available");
    }

    const finalCandidates = dedupeCandidates(buildSpeedCandidates(scopedCombos, sources));
    if (finalCandidates.length === 0) {
      return noCandidatesResult("No provider×model candidates available to rank");
    }

    const weights = args.weights ? { ...DEFAULT_SPEED_WEIGHTS, ...args.weights } : DEFAULT_SPEED_WEIGHTS;
    const ranked = rankBySpeed(finalCandidates, weights, {
      includeUnhealthy: args.includeUnhealthy === true,
    });

    const limit = Math.min(Math.max(toNumber(args.limit, 10), 1), 50);
    const trimmed = ranked.slice(0, limit);
    const winner = trimmed[0];

    let appliedToCombo: JsonRecord | null = null;
    if (args.applyToCombo && targetCombo && winner) {
      appliedToCombo = await applyWinnerToCombo(targetCombo, winner);
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
