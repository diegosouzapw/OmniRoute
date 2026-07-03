/**
 * OmniRoute MCP Advanced Tools — 13 intelligence tools that differentiate
 * OmniRoute from all other AI gateways.
 *
 * Tools:
 *   1. omniroute_simulate_route     — Dry-run routing simulation
 *   2. omniroute_set_budget_guard   — Session budget with degrade/block/alert
 *   3. omniroute_set_routing_strategy — Runtime strategy switch for combos
 *   4. omniroute_set_resilience_profile — Circuit breaker/retry profiles
 *   5. omniroute_test_combo         — Live test each provider in a combo
 *   6. omniroute_get_provider_metrics — Detailed per-provider metrics
 *   7. omniroute_best_combo_for_task — AI-powered combo recommendation
 *   8. omniroute_explain_route      — Post-hoc routing decision explainer
 *   9. omniroute_get_session_snapshot — Full session state snapshot
 *  10. omniroute_db_health_check   — Diagnose and repair DB state drift
 *  11. omniroute_sync_pricing      — Sync provider pricing from external source
 */

import { logToolCall } from "../audit.ts";
import { getMcpHttpAuthHeadersForInternalFetch } from "../httpAuthContext.ts";
import { normalizeQuotaResponse } from "../../../src/shared/contracts/quota.ts";
import { resolveOmniRouteBaseUrl } from "../../../src/shared/utils/resolveOmniRouteBaseUrl.ts";
import {
  getComboModelProvider,
  getComboModelString,
  getComboStepTarget,
} from "../../../src/lib/combos/steps.ts";
import type {
  AutoRoutingStrategyValue,
  RoutingStrategyValue,
} from "../../../src/shared/constants/routingStrategies.ts";
import { normalizeRoutingStrategy } from "../../../src/shared/constants/routingStrategies.ts";
import { rankBySpeed, DEFAULT_SPEED_WEIGHTS } from "../../services/autoCombo/speedRanking.ts";
import type { SpeedCandidate } from "../../services/autoCombo/speedRanking.ts";
import { pickFastestModelInput } from "../schemas/tools.ts";
import type { z } from "zod";

const OMNIROUTE_BASE_URL = resolveOmniRouteBaseUrl();
const OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY || "";

async function apiFetch(path: string, options: RequestInit = {}): Promise<unknown> {
  const url = `${OMNIROUTE_BASE_URL}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // Static env key is only a fallback; the per-caller MCP identity forwarded via
    // withMcpHttpAuthContext must win over it (#5819).
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

interface ComboModel {
  provider: string;
  model: string;
  inputCostPer1M: number;
}

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function toRecord(value: unknown): JsonRecord {
  return isRecord(value) ? value : {};
}

function toArrayOfRecords(value: unknown): JsonRecord[] {
  return Array.isArray(value) ? value.filter(isRecord) : [];
}

function toString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function toNumber(value: unknown, fallback = 0): number {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim().length > 0
        ? Number(value)
        : Number.NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toBoolean(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
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

// ============ In-Memory State ============

interface BudgetGuardState {
  sessionId: string;
  maxCost: number;
  action: "degrade" | "block" | "alert";
  degradeToTier?: "cheap" | "free";
  spent: number;
  createdAt: string;
}

let activeBudgetGuard: BudgetGuardState | null = null;

type ResilienceProfileConfig = {
  requestQueue: {
    requestsPerMinute: number;
    minTimeBetweenRequestsMs: number;
    concurrentRequests: number;
  };
  connectionCooldown: {
    oauth: {
      baseCooldownMs: number;
      useUpstreamRetryHints: boolean;
      maxBackoffSteps: number;
    };
    apikey: {
      baseCooldownMs: number;
      useUpstreamRetryHints: boolean;
      maxBackoffSteps: number;
    };
  };
  providerBreaker: {
    oauth: {
      failureThreshold: number;
      resetTimeoutMs: number;
    };
    apikey: {
      failureThreshold: number;
      resetTimeoutMs: number;
    };
  };
};

const RESILIENCE_PROFILES = {
  aggressive: {
    requestQueue: {
      requestsPerMinute: 180,
      minTimeBetweenRequestsMs: 100,
      concurrentRequests: 16,
    },
    connectionCooldown: {
      oauth: {
        baseCooldownMs: 30000,
        useUpstreamRetryHints: false,
        maxBackoffSteps: 4,
      },
      apikey: {
        baseCooldownMs: 2000,
        useUpstreamRetryHints: true,
        maxBackoffSteps: 3,
      },
    },
    providerBreaker: {
      oauth: {
        failureThreshold: 2,
        resetTimeoutMs: 30000,
      },
      apikey: {
        failureThreshold: 3,
        resetTimeoutMs: 15000,
      },
    },
  },
  balanced: {
    requestQueue: {
      requestsPerMinute: 100,
      minTimeBetweenRequestsMs: 200,
      concurrentRequests: 10,
    },
    connectionCooldown: {
      oauth: {
        baseCooldownMs: 60000,
        useUpstreamRetryHints: false,
        maxBackoffSteps: 8,
      },
      apikey: {
        baseCooldownMs: 3000,
        useUpstreamRetryHints: true,
        maxBackoffSteps: 5,
      },
    },
    providerBreaker: {
      oauth: {
        failureThreshold: 3,
        resetTimeoutMs: 60000,
      },
      apikey: {
        failureThreshold: 5,
        resetTimeoutMs: 30000,
      },
    },
  },
  conservative: {
    requestQueue: {
      requestsPerMinute: 60,
      minTimeBetweenRequestsMs: 350,
      concurrentRequests: 6,
    },
    connectionCooldown: {
      oauth: {
        baseCooldownMs: 120000,
        useUpstreamRetryHints: false,
        maxBackoffSteps: 10,
      },
      apikey: {
        baseCooldownMs: 30000,
        useUpstreamRetryHints: false,
        maxBackoffSteps: 8,
      },
    },
    providerBreaker: {
      oauth: {
        failureThreshold: 8,
        resetTimeoutMs: 120000,
      },
      apikey: {
        failureThreshold: 8,
        resetTimeoutMs: 60000,
      },
    },
  },
} satisfies Record<"aggressive" | "balanced" | "conservative", ResilienceProfileConfig>;

const TASK_FITNESS: Record<string, { preferred: string[]; traits: string[] }> = {
  coding: { preferred: ["claude", "deepseek", "codex"], traits: ["fast", "code-optimized"] },
  review: { preferred: ["claude", "gemini", "openai"], traits: ["analytical", "thorough"] },
  planning: { preferred: ["gemini", "claude", "openai"], traits: ["reasoning", "structured"] },
  analysis: { preferred: ["gemini", "claude"], traits: ["deep-reasoning", "large-context"] },
  debugging: { preferred: ["claude", "deepseek", "codex"], traits: ["code-aware", "fast"] },
  documentation: { preferred: ["gemini", "claude", "openai"], traits: ["clear", "structured"] },
};

// ============ Tool Handlers ============

export async function handleSimulateRoute(args: {
  model: string;
  promptTokenEstimate: number;
  combo?: string;
}) {
  const start = Date.now();
  try {
    // Fetch combos and health data for simulation
    const [combosRaw, healthRaw, quotaRaw] = await Promise.allSettled([
      apiFetch("/api/combos"),
      apiFetch("/api/monitoring/health"),
      apiFetch("/api/usage/quota"),
    ]);

    const combos = combosRaw.status === "fulfilled" ? normalizeCombosResponse(combosRaw.value) : [];
    const health = healthRaw.status === "fulfilled" ? toRecord(healthRaw.value) : {};
    const quota =
      quotaRaw.status === "fulfilled"
        ? normalizeQuotaResponse(quotaRaw.value)
        : normalizeQuotaResponse({});

    // Find target combo
    const targetCombo = args.combo
      ? combos.find(
          (combo) => toString(combo.id) === args.combo || toString(combo.name) === args.combo
        )
      : combos.find((combo) => combo.enabled !== false);

    if (!targetCombo) {
      return {
        content: [
          { type: "text" as const, text: JSON.stringify({ error: "No matching combo found" }) },
        ],
        isError: true,
      };
    }

    const models = getComboModels(targetCombo);
    const breakers = toArrayOfRecords(health.circuitBreakers);
    const providers = quota.providers;

    // Simulate path
    const simulatedPath = models.map((model, idx: number) => {
      const cb = breakers.find((breaker) => toString(breaker.provider) === model.provider);
      const q = providers.find((providerEntry) => providerEntry.provider === model.provider);
      const estimatedCost = (args.promptTokenEstimate / 1_000_000) * model.inputCostPer1M;
      return {
        provider: model.provider,
        model: model.model || args.model,
        probability: idx === 0 ? 0.85 : 0.15 / Math.max(models.length - 1, 1),
        estimatedCost: Math.round(estimatedCost * 10000) / 10000,
        healthStatus: toString(cb?.state, "CLOSED"),
        quotaAvailable: q?.percentRemaining ?? 100,
      };
    });

    const costs = simulatedPath.map((pathEntry) => pathEntry.estimatedCost);
    const result = {
      simulatedPath,
      fallbackTree: {
        primary: simulatedPath[0]?.provider || "unknown",
        fallbacks: simulatedPath.slice(1).map((pathEntry) => pathEntry.provider),
        worstCaseCost: Math.max(...costs, 0),
        bestCaseCost: Math.min(...costs, 0),
      },
    };

    await logToolCall("omniroute_simulate_route", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_simulate_route", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleSetBudgetGuard(args: {
  maxCost: number;
  action: "degrade" | "block" | "alert";
  degradeToTier?: "cheap" | "free";
}) {
  const start = Date.now();
  try {
    // Get current session cost
    let spent = 0;
    try {
      const analytics = toRecord(await apiFetch("/api/usage/analytics?period=session"));
      spent = toNumber(analytics.totalCost, 0);
    } catch {
      /* ignore if analytics not available */
    }

    activeBudgetGuard = {
      sessionId: `budget_${Date.now()}`,
      maxCost: args.maxCost,
      action: args.action,
      degradeToTier: args.degradeToTier,
      spent,
      createdAt: new Date().toISOString(),
    };

    const remaining = Math.max(0, args.maxCost - spent);
    const result = {
      sessionId: activeBudgetGuard.sessionId,
      budgetTotal: args.maxCost,
      budgetSpent: Math.round(spent * 10000) / 10000,
      budgetRemaining: Math.round(remaining * 10000) / 10000,
      action: args.action,
      status: remaining <= 0 ? "exceeded" : remaining < args.maxCost * 0.2 ? "warning" : "active",
    };

    await logToolCall(
      "omniroute_set_budget_guard",
      { maxCost: args.maxCost, action: args.action },
      result,
      Date.now() - start,
      true
    );
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_set_budget_guard", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleSetRoutingStrategy(args: {
  comboId: string;
  strategy: RoutingStrategyValue;
  autoRoutingStrategy?: AutoRoutingStrategyValue;
}) {
  const start = Date.now();
  try {
    const combos = normalizeCombosResponse(await apiFetch("/api/combos"));
    const combo = combos.find(
      (comboEntry) =>
        toString(comboEntry.id) === args.comboId || toString(comboEntry.name) === args.comboId
    );

    if (!combo) {
      const msg = `Combo '${args.comboId}' not found`;
      await logToolCall(
        "omniroute_set_routing_strategy",
        args,
        null,
        Date.now() - start,
        false,
        msg
      );
      return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
    }

    const comboId = toString(combo.id);
    if (!comboId) {
      const msg = "Matched combo has no id";
      await logToolCall(
        "omniroute_set_routing_strategy",
        args,
        null,
        Date.now() - start,
        false,
        msg
      );
      return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
    }

    const comboData = toRecord(combo.data);
    const currentConfig = toRecord(
      Object.keys(toRecord(combo.config)).length > 0 ? combo.config : comboData.config
    );

    const normalizedStrategy = normalizeRoutingStrategy(args.strategy);
    let nextConfig: JsonRecord | undefined = undefined;
    if (normalizedStrategy === "auto" && args.autoRoutingStrategy) {
      const currentAutoConfig = toRecord(currentConfig.auto);
      nextConfig = {
        ...currentConfig,
        auto: {
          ...currentAutoConfig,
          routerStrategy: args.autoRoutingStrategy,
        },
      };
    }

    const payload: JsonRecord = { strategy: normalizedStrategy };
    if (nextConfig && Object.keys(nextConfig).length > 0) {
      payload.config = nextConfig;
    }

    const updatedCombo = toRecord(
      await apiFetch(`/api/combos/${encodeURIComponent(comboId)}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      })
    );

    const updatedConfig = toRecord(updatedCombo.config);
    const resolvedAutoStrategy =
      toString(toRecord(updatedConfig.auto).routerStrategy) ||
      (normalizedStrategy === "auto" ? (args.autoRoutingStrategy ?? "rules") : "");

    const result = {
      success: true,
      combo: {
        id: toString(updatedCombo.id, comboId),
        name: toString(updatedCombo.name, toString(combo.name, comboId)),
        strategy: toString(updatedCombo.strategy, normalizedStrategy),
        autoRoutingStrategy:
          toString(updatedCombo.strategy, normalizedStrategy) === "auto"
            ? resolvedAutoStrategy
            : null,
      },
    };

    await logToolCall("omniroute_set_routing_strategy", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_set_routing_strategy", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleSetResilienceProfile(args: {
  profile: "aggressive" | "balanced" | "conservative";
}) {
  const start = Date.now();
  try {
    const settings = RESILIENCE_PROFILES[args.profile];
    if (!settings) {
      return {
        content: [{ type: "text" as const, text: `Error: Invalid profile "${args.profile}"` }],
        isError: true,
      };
    }

    // Apply to OmniRoute via API using the plan-aligned resilience structure.
    await apiFetch("/api/resilience", {
      method: "PATCH",
      body: JSON.stringify(settings),
    });

    const result = { applied: true, profile: args.profile, settings };

    await logToolCall("omniroute_set_resilience_profile", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall(
      "omniroute_set_resilience_profile",
      args,
      null,
      Date.now() - start,
      false,
      msg
    );
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleTestCombo(args: { comboId: string; testPrompt: string }) {
  const start = Date.now();
  try {
    // Get combo details
    const combos = normalizeCombosResponse(await apiFetch("/api/combos"));
    const combo = combos.find(
      (comboEntry) =>
        toString(comboEntry.id) === args.comboId || toString(comboEntry.name) === args.comboId
    );
    if (!combo) {
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ error: `Combo "${args.comboId}" not found` }),
          },
        ],
        isError: true,
      };
    }

    const models = getComboModels(combo);
    const prompt = (args.testPrompt || "Say hello").slice(0, 200);

    // Test each provider in parallel
    const results = await Promise.allSettled(
      models.map(async (model) => {
        const providerStart = Date.now();
        try {
          const resp = toRecord(
            await apiFetch("/v1/chat/completions", {
              method: "POST",
              body: JSON.stringify({
                model: model.model || "auto",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 50,
                stream: false,
                "x-provider": model.provider,
              }),
            })
          );
          const usage = toRecord(resp.usage);

          return {
            provider: model.provider,
            model: model.model || toString(resp.model, "unknown"),
            success: true,
            latencyMs: Date.now() - providerStart,
            cost: toNumber(resp.cost, 0),
            tokenCount: toNumber(usage.prompt_tokens, 0) + toNumber(usage.completion_tokens, 0),
          };
        } catch (err) {
          return {
            provider: model.provider,
            model: model.model || "unknown",
            success: false,
            latencyMs: Date.now() - providerStart,
            cost: 0,
            tokenCount: 0,
            error: err instanceof Error ? err.message : String(err),
          };
        }
      })
    );

    const providerResults = results.map((r) =>
      r.status === "fulfilled"
        ? r.value
        : {
            provider: "unknown",
            model: "unknown",
            success: false,
            latencyMs: 0,
            cost: 0,
            tokenCount: 0,
            error: "Promise rejected",
          }
    );
    const successful = providerResults.filter((r) => r.success);
    const fastest = successful.sort((a, b) => a.latencyMs - b.latencyMs)[0];
    const cheapest = successful.sort((a, b) => a.cost - b.cost)[0];

    const result = {
      results: providerResults,
      summary: {
        totalProviders: providerResults.length,
        successful: successful.length,
        fastestProvider: fastest?.provider || "none",
        cheapestProvider: cheapest?.provider || "none",
      },
    };

    await logToolCall(
      "omniroute_test_combo",
      { comboId: args.comboId },
      result.summary,
      Date.now() - start,
      true
    );
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_test_combo", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleGetProviderMetrics(args: { provider: string }) {
  const start = Date.now();
  try {
    const [healthRaw, quotaRaw, analyticsRaw] = await Promise.allSettled([
      apiFetch("/api/monitoring/health"),
      apiFetch(`/api/usage/quota?provider=${encodeURIComponent(args.provider)}`),
      apiFetch(`/api/usage/analytics?period=session&provider=${encodeURIComponent(args.provider)}`),
    ]);

    const health = healthRaw.status === "fulfilled" ? toRecord(healthRaw.value) : {};
    const quota =
      quotaRaw.status === "fulfilled"
        ? normalizeQuotaResponse(quotaRaw.value, { provider: args.provider })
        : normalizeQuotaResponse({});
    const analytics = analyticsRaw.status === "fulfilled" ? toRecord(analyticsRaw.value) : {};

    const cb = toArrayOfRecords(health.circuitBreakers).find(
      (breaker) => toString(breaker.provider) === args.provider
    );
    const providerQuota = quota.providers.find((p) => p.provider === args.provider) || null;

    const result = {
      provider: args.provider,
      successRate: toNumber(analytics.successRate, 1.0),
      requestCount: toNumber(analytics.requestCount, 0),
      avgLatencyMs: toNumber(analytics.avgLatencyMs, 0),
      p50LatencyMs: toNumber(analytics.p50LatencyMs, 0),
      p95LatencyMs: toNumber(analytics.p95LatencyMs, 0),
      p99LatencyMs: toNumber(analytics.p99LatencyMs, 0),
      errorRate: toNumber(analytics.errorRate, 0),
      lastError: toString(analytics.lastError) || null,
      circuitBreakerState: toString(cb?.state, "CLOSED"),
      quotaInfo: providerQuota
        ? {
            used: providerQuota.quotaUsed,
            total: providerQuota.quotaTotal,
            resetAt: providerQuota.resetAt,
          }
        : { used: 0, total: null, resetAt: null },
    };

    await logToolCall("omniroute_get_provider_metrics", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_get_provider_metrics", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleBestComboForTask(args: {
  taskType: string;
  budgetConstraint?: number;
  latencyConstraint?: number;
}) {
  const start = Date.now();
  try {
    const fitness = TASK_FITNESS[args.taskType] || TASK_FITNESS.coding;
    const combos = normalizeCombosResponse(await apiFetch("/api/combos"));
    const enabledCombos = combos.filter((combo) => combo.enabled !== false);

    if (enabledCombos.length === 0) {
      return {
        content: [
          { type: "text" as const, text: JSON.stringify({ error: "No enabled combos available" }) },
        ],
        isError: true,
      };
    }

    // Score combos by task fitness
    const scored = enabledCombos.map((combo) => {
      const models = getComboModels(combo);
      let score = 0;

      // Provider preference scoring
      for (const model of models) {
        const prefIdx = fitness.preferred.indexOf(model.provider);
        if (prefIdx >= 0) score += (fitness.preferred.length - prefIdx) * 10;
      }

      // Name-based trait scoring
      const name = toString(combo.name).toLowerCase();
      for (const trait of fitness.traits) {
        if (name.includes(trait)) score += 5;
      }

      // Check if it's a free combo
      const isFree =
        name.includes("free") ||
        models.every((model) => model.provider.toLowerCase().includes("free"));

      return { combo, score, isFree };
    });

    scored.sort((a, b) => b.score - a.score);
    const best = scored[0];
    const alternatives = scored.slice(1, 4).map((s) => ({
      id: s.combo.id,
      name: s.combo.name,
      tradeoff: s.isFree
        ? "free but may have limits"
        : s.score < best.score * 0.5
          ? "cheaper but slower"
          : "similar quality, different providers",
    }));
    const freeAlt = scored.find((s) => s.isFree && s !== best);

    const result = {
      recommendedCombo: {
        id: best.combo.id,
        name: best.combo.name,
        reason: `Best match for "${args.taskType}": preferred providers (${fitness.preferred.slice(0, 3).join(", ")})`,
      },
      alternatives,
      freeAlternative: freeAlt ? { id: freeAlt.combo.id, name: freeAlt.combo.name } : null,
    };

    await logToolCall(
      "omniroute_best_combo_for_task",
      args,
      result.recommendedCombo,
      Date.now() - start,
      true
    );
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_best_combo_for_task", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
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

export async function handleExplainRoute(args: { requestId: string }) {
  const start = Date.now();
  try {
    // Query routing_decisions table via API
    let decision: JsonRecord | null = null;
    try {
      decision = toRecord(
        await apiFetch(`/api/routing/decisions/${encodeURIComponent(args.requestId)}`)
      );
    } catch {
      // Fall back to a generic explanation
    }

    const result = decision
      ? {
          requestId: args.requestId,
          decision: {
            comboUsed: decision.comboUsed || "default",
            providerSelected: decision.providerSelected || "unknown",
            modelUsed: decision.modelUsed || "unknown",
            score: decision.score || 0,
            factors: decision.factors || [
              { name: "health", value: 1, weight: 0.3, contribution: 0.3 },
              { name: "quota", value: 1, weight: 0.25, contribution: 0.25 },
              { name: "cost", value: 0.8, weight: 0.2, contribution: 0.16 },
              { name: "latency", value: 0.9, weight: 0.15, contribution: 0.135 },
              { name: "task_fit", value: 0.7, weight: 0.1, contribution: 0.07 },
            ],
            fallbacksTriggered: decision.fallbacksTriggered || [],
            costActual: decision.costActual || 0,
            latencyActual: decision.latencyActual || 0,
          },
        }
      : {
          requestId: args.requestId,
          decision: {
            comboUsed: "unknown",
            providerSelected: "unknown",
            modelUsed: "unknown",
            score: 0,
            factors: [],
            fallbacksTriggered: [],
            costActual: 0,
            latencyActual: 0,
          },
          note: "Routing decision not found. The /api/routing/decisions endpoint may not be implemented yet, or the requestId is invalid.",
        };

    await logToolCall(
      "omniroute_explain_route",
      args,
      { requestId: args.requestId },
      Date.now() - start,
      true
    );
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_explain_route", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

// ============ handlePickFastestModel ============
// Picks the fastest *reliable* provider×model pair using live TTFT, TPS, and
// E2E latency averages — not just p95 latency — penalised for circuit-breaker
// OPEN state, high failure rate, and latency instability (high std-dev). The
// ranking shape comes from open-sse/services/autoCombo/speedRanking.ts so the
// same scoring math also drives the internal LatencyStrategy.
//
// This tool complements `handleGetProviderMetrics` (per-provider payload) by
// returning the *whole ranked pool* with per-candidate factor breakdowns so
// agents can present side-by-side comparisons without re-implementing the
// scoring themselves.

export async function handlePickFastestModel(args: z.infer<typeof pickFastestModelInput>) {
  const start = Date.now();
  const toolName = "omniroute_pick_fastest_model";

  try {
    // Pull live health (circuit-breaker state) + combos. Per-provider perf
    // telemetry comes from the per-combo metrics endpoint which already
    // exposes TTFT, TPS, E2E per provider×model combo inside a combo.
    const [healthRaw, combosRaw] = await Promise.allSettled([
      apiFetch("/api/monitoring/health"),
      apiFetch("/api/combos"),
    ]);

    const health = healthRaw.status === "fulfilled" ? toRecord(healthRaw.value) : {};
    const combos =
      combosRaw.status === "fulfilled"
        ? normalizeCombosResponse(combosRaw.value)
        : [];

    const circuitBreakers = Array.isArray(health.circuitBreakers)
      ? health.circuitBreakers.filter(isRecord)
      : [];
    const breakerByProvider = new Map<string, "CLOSED" | "HALF_OPEN" | "OPEN">();
    for (const breaker of circuitBreakers) {
      const provider = toString(breaker.provider);
      if (!provider) continue;
      const rawState = toString(breaker.state, "CLOSED").toUpperCase();
      const state: "CLOSED" | "HALF_OPEN" | "OPEN" =
        rawState === "OPEN"
          ? "OPEN"
          : rawState === "HALF_OPEN"
            ? "HALF_OPEN"
            : "CLOSED";
      breakerByProvider.set(provider, state);
    }

    // Determine scope: a single combo, or all enabled combos.
    const scopedCombos: JsonRecord[] = args.comboId
      ? combos.filter(
          (c) => toString(c.id) === args.comboId || toString(c.name) === args.comboId,
        )
      : combos.filter((c) => c.enabled !== false);

    const comboScope = scopedCombos[0]
      ? { id: toString(scopedCombos[0].id, ""), name: toString(scopedCombos[0].name, "") }
      : null;

    if (scopedCombos.length === 0) {
      const msg = args.comboId
        ? `Combo '${args.comboId}' not found`
        : "No enabled combos available";
      await logToolCall(toolName, args, null, Date.now() - start, false, msg);
      return { content: [{ type: "text", text: JSON.stringify({ error: msg }) }], isError: true };
    }

    // Pull per-combo metrics for each scoped combo so we can populate
    // provider-level TTFT/TPS/E2E for the candidate pool.
    const perComboMetrics = await Promise.all(
      scopedCombos.map(async (combo) => {
        const comboId = toString(combo.id);
        if (!comboId) return { comboId: "", metrics: {} };
        const metrics = await apiFetch(
          `/api/combos/metrics?comboId=${encodeURIComponent(comboId)}`,
        ).catch(() => ({}));
        return { comboId, metrics: toRecord(metrics) };
      }),
    );
    const metricsByCombo = new Map<string, JsonRecord>(
      perComboMetrics.map((entry) => [entry.comboId, entry.metrics]),
    );

    // Build the raw candidate pool from scoped combos' models + per-combo
    // metrics. Each provider×model instance becomes a candidate.
    interface RawCandidate {
      provider: string;
      model: string;
      comboId: string;
      comboName: string;
      avgTtftMs?: number;
      avgTokensPerSecond?: number;
      avgE2ELatencyMs?: number;
      p95LatencyMs?: number;
      latencyStdDev?: number;
      failureRate?: number;
      errorRate?: number;
      costPer1MTokens?: number;
      quotaRemaining?: number;
      quotaTotal?: number;
      circuitBreakerState: "CLOSED" | "HALF_OPEN" | "OPEN";
    }

    const rawPool: RawCandidate[] = [];
    for (const combo of scopedCombos) {
      const comboId = toString(combo.id, "");
      const comboName = toString(combo.name, "");
      const comboMetrics = metricsByCombo.get(comboId) ?? {};
      // metrics shape: { byProvider: [{ provider, avgLatency, errorRate, … }] }
      const byProvider = toArrayOfRecords(comboMetrics.byProvider);
      const perfByProvider = new Map<string, JsonRecord>();
      for (const entry of byProvider) {
        const provider = toString(entry.provider);
        if (provider) perfByProvider.set(provider, entry);
      }
      const models = getComboModels(combo);
      for (const m of models) {
        const perf = perfByProvider.get(m.provider) ?? {};
        const avgLatency = toNumber(perf.avgLatency, -1);
        const errorRate = toNumber(perf.errorRate, -1);
        const ttft = toNumber(perf.avgTtftMs, -1);
        const tps = toNumber(perf.avgTokensPerSecond, -1);
        const p95Raw = toNumber(perf.p95LatencyMs, -1);
        const stdDevRaw = toNumber(perf.latencyStdDev, -1);
        const rawCircuit = toString(perf.circuitState, "").toUpperCase();
        const breakState: "CLOSED" | "HALF_OPEN" | "OPEN" =
          rawCircuit === "OPEN"
            ? "OPEN"
            : rawCircuit === "HALF_OPEN"
              ? "HALF_OPEN"
              : breakerByProvider.get(m.provider) ?? "CLOSED";
        rawPool.push({
          provider: m.provider,
          model: m.model,
          comboId,
          comboName,
          avgTtftMs: ttft >= 0 ? ttft : undefined,
          avgTokensPerSecond: tps >= 0 ? tps : undefined,
          avgE2ELatencyMs: avgLatency >= 0 ? avgLatency : undefined,
          p95LatencyMs: p95Raw >= 0 ? p95Raw : undefined,
          latencyStdDev:
            stdDevRaw >= 0
              ? stdDevRaw
              : p95Raw >= 0
                ? Math.max(1, p95Raw * 0.25)
                : undefined,
          failureRate: errorRate >= 0 ? errorRate : 0,
          errorRate: errorRate >= 0 ? errorRate : 0,
          circuitBreakerState: breakState,
        });
      }
    }

    if (rawPool.length === 0) {
      const msg = "No provider candidates available to rank";
      await logToolCall(toolName, args, null, Date.now() - start, false, msg);
      return { content: [{ type: "text", text: JSON.stringify({ error: msg }) }], isError: true };
    }

    // Map raw pool → SpeedCandidate shape consumed by rankBySpeed.
    const candidates: SpeedCandidate[] = rawPool.map((c) => ({
      provider: c.provider,
      model: c.model,
      quotaRemaining: c.quotaRemaining ?? 100,
      quotaTotal: c.quotaTotal ?? 1,
      circuitBreakerState: c.circuitBreakerState,
      costPer1MTokens: c.costPer1MTokens ?? 0,
      p95LatencyMs: c.p95LatencyMs ?? 0,
      avgTtftMs: c.avgTtftMs,
      avgE2ELatencyMs: c.avgE2ELatencyMs,
      avgTokensPerSecond: c.avgTokensPerSecond,
      latencyStdDev: c.latencyStdDev ?? 0,
      errorRate: c.errorRate ?? 0,
      failureRate: c.failureRate ?? 0,
      health:
        c.circuitBreakerState === "CLOSED"
          ? 1
          : c.circuitBreakerState === "HALF_OPEN"
            ? 0.5
            : 0,
    }));

    // Strict filter (default): drop OPEN-circuit candidates so they can't
    // sneak into the top-N. Non-strict mode keeps them but lets scoring
    // push them to the bottom of the ranking.
    const includeUnhealthy = args.includeUnhealthy === true;
    const filtered = includeUnhealthy
      ? candidates
      : candidates.filter((c) => c.circuitBreakerState !== "OPEN");

    if (filtered.length === 0) {
      const msg = includeUnhealthy
        ? "No candidates available after filtering"
        : "All candidates have OPEN circuit breakers";
      await logToolCall(toolName, args, null, Date.now() - start, false, msg);
      return { content: [{ type: "text", text: JSON.stringify({ error: msg }) }], isError: true };
    }

    const weightsOverride =
      args.weights && typeof args.weights === "object"
        ? {
            ...DEFAULT_SPEED_WEIGHTS,
            ...(typeof args.weights.ttft === "number" ? { ttft: args.weights.ttft } : {}),
            ...(typeof args.weights.tps === "number" ? { tps: args.weights.tps } : {}),
            ...(typeof args.weights.e2e === "number" ? { e2e: args.weights.e2e } : {}),
            ...(typeof args.weights.p95 === "number" ? { p95: args.weights.p95 } : {}),
            ...(typeof args.weights.reliability === "number"
              ? { reliability: args.weights.reliability }
              : {}),
            ...(typeof args.weights.stability === "number"
              ? { stability: args.weights.stability }
              : {}),
            ...(typeof args.weights.health === "number"
              ? { health: args.weights.health }
              : {}),
          }
        : undefined;

    const ranking = rankBySpeed(filtered, weightsOverride);
    const limit = Math.max(1, Math.min(50, args.limit ?? 10));
    const top = ranking.slice(0, limit);

    const winner = top[0];

    // Translate the internal ranking shape into the schema-described output.
    const ranked = top.map((entry, idx) => ({
      provider: entry.provider,
      model: entry.model,
      score: Math.round(entry.score * 10000) / 10000,
      rank: idx + 1,
      factors: {
        ttft: Math.round(entry.factors.ttft * 10000) / 10000,
        tps: Math.round(entry.factors.tps * 10000) / 10000,
        e2e: Math.round(entry.factors.e2e * 10000) / 10000,
        p95: Math.round(entry.factors.p95 * 10000) / 10000,
        health: Math.round(entry.factors.health * 10000) / 10000,
        reliability: Math.round(entry.factors.reliability * 10000) / 10000,
        stability: Math.round(entry.factors.stability * 10000) / 10000,
      },
      metrics: {
        avgTtftMs: entry.metrics.avgTtftMs,
        avgTokensPerSecond: entry.metrics.avgTokensPerSecond,
        avgE2ELatencyMs: entry.metrics.avgE2ELatencyMs,
        p95LatencyMs: entry.metrics.p95LatencyMs ?? null,
        latencyStdDev: entry.metrics.latencyStdDev,
        failureRate: Math.round(entry.metrics.failureRate * 10000) / 10000,
        circuitBreakerState: entry.metrics.circuitBreakerState,
      },
      reason: entry.reason,
    }));

    const usedWeights = weightsOverride ?? DEFAULT_SPEED_WEIGHTS;
    const result = {
      fastest: winner ? ranked[0] : null,
      ranked,
      weights: usedWeights,
      comboScope,
      appliedToCombo: null as null | {
        id: string;
        name: string;
        strategy: string;
        autoRoutingStrategy: string;
      },
    };

    // Optionally flip the combo's strategy to auto + latency so the runtime
    // router keeps using the same scoring we just computed.
    if (args.applyToCombo && args.comboId && winner) {
      try {
        const target = scopedCombos[0];
        if (target) {
          const body = {
            strategy: "auto",
            autoRoutingStrategy: "latency",
          };
          await apiFetch(
            `/api/combos/${encodeURIComponent(toString(target.id))}`,
            { method: "PUT", body: JSON.stringify(body) },
          );
          result.appliedToCombo = {
            id: toString(target.id, args.comboId),
            name: toString(target.name, args.comboId),
            strategy: "auto",
            autoRoutingStrategy: "latency",
          };
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        await logToolCall(
          toolName,
          { ...args, applyToComboError: msg },
          null,
          Date.now() - start,
          false,
          msg,
        );
        return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
      }
    }

    await logToolCall(
      toolName,
      args,
      {
        candidateCount: ranking.length,
        winner: winner ? `${winner.provider}/${winner.model}` : null,
      },
      Date.now() - start,
      true,
    );
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall(toolName, args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleSyncPricing(args: { sources?: string[]; dryRun?: boolean }) {
  const start = Date.now();
  try {
    const result = toRecord(
      await apiFetch("/api/pricing/sync", {
        method: "POST",
        body: JSON.stringify({
          sources: args.sources,
          dryRun: args.dryRun ?? false,
        }),
      })
    );

    await logToolCall("omniroute_sync_pricing", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_sync_pricing", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleGetSessionSnapshot() {
  const start = Date.now();
  try {
    const analytics = toRecord(
      await apiFetch("/api/usage/analytics?period=session").catch(() => ({}))
    );
    const tokenCount = toRecord(analytics.tokenCount);
    const byModel = toArrayOfRecords(analytics.byModel);
    const byProvider = toArrayOfRecords(analytics.byProvider);

    const result = {
      sessionStart: toString(analytics.sessionStart, new Date().toISOString()),
      duration: toString(analytics.duration, "unknown"),
      requestCount: toNumber(analytics.requestCount, 0),
      costTotal: toNumber(analytics.totalCost, 0),
      tokenCount: {
        prompt: toNumber(tokenCount.prompt, 0),
        completion: toNumber(tokenCount.completion, 0),
      },
      topModels: byModel.slice(0, 5).map((model) => ({
        model: toString(model.model, "unknown"),
        count: toNumber(model.requests, 0),
      })),
      topProviders: byProvider.slice(0, 5).map((provider) => ({
        provider: toString(provider.name, "unknown"),
        count: toNumber(provider.requests, 0),
      })),
      errors: toNumber(analytics.errorCount, 0),
      fallbacks: toNumber(analytics.fallbackCount, 0),
      budgetGuard: activeBudgetGuard
        ? {
            active: true,
            remaining: Math.max(0, activeBudgetGuard.maxCost - activeBudgetGuard.spent),
            action: activeBudgetGuard.action,
          }
        : null,
    };

    await logToolCall(
      "omniroute_get_session_snapshot",
      {},
      { requestCount: result.requestCount },
      Date.now() - start,
      true
    );
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_get_session_snapshot", {}, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleDbHealthCheck(args: { autoRepair?: boolean }) {
  const start = Date.now();
  const autoRepair = args.autoRepair === true;

  try {
    const { runManagedDbHealthCheck } = await import("../../../src/lib/db/core.ts");
    const result = runManagedDbHealthCheck({ autoRepair });

    await logToolCall(
      "omniroute_db_health_check",
      args,
      {
        isHealthy: toBoolean(result.isHealthy, false),
        repairedCount: toNumber(result.repairedCount, 0),
      },
      Date.now() - start,
      true
    );

    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_db_health_check", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleCacheStats() {
  const start = Date.now();
  try {
    const raw = toRecord(await apiFetch("/api/cache"));
    const semanticCache = toRecord(raw.semanticCache);
    const promptCache = raw.promptCache ? toRecord(raw.promptCache) : null;
    const idempotency = toRecord(raw.idempotency);
    const config = raw.config ? toRecord(raw.config) : null;

    const result = {
      semanticCache: {
        memoryEntries: toNumber(semanticCache.memoryEntries, 0),
        dbEntries: toNumber(semanticCache.dbEntries, 0),
        hits: toNumber(semanticCache.hits, 0),
        misses: toNumber(semanticCache.misses, 0),
        hitRate: toString(semanticCache.hitRate, "0%"),
        tokensSaved: toNumber(semanticCache.tokensSaved, 0),
      },
      promptCache: promptCache
        ? {
            totalRequests: toNumber(promptCache.totalRequests, 0),
            requestsWithCacheControl: toNumber(promptCache.requestsWithCacheControl, 0),
            totalInputTokens: toNumber(promptCache.totalInputTokens, 0),
            totalCachedTokens: toNumber(promptCache.totalCachedTokens, 0),
            totalCacheCreationTokens: toNumber(promptCache.totalCacheCreationTokens, 0),
            tokensSaved: toNumber(promptCache.tokensSaved, 0),
            estimatedCostSaved: toNumber(promptCache.estimatedCostSaved, 0),
          }
        : null,
      idempotency: {
        activeKeys: toNumber(idempotency.activeKeys, 0),
        windowMs: toNumber(idempotency.windowMs, 0),
      },
      config: config
        ? {
            semanticCacheEnabled: toBoolean(config.semanticCacheEnabled, true),
          }
        : undefined,
    };

    await logToolCall("omniroute_cache_stats", {}, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_cache_stats", {}, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleCacheFlush(args: { signature?: string; model?: string }) {
  const start = Date.now();
  try {
    const params = new URLSearchParams();
    let scope = "all";

    if (args.signature) {
      params.set("signature", args.signature);
      scope = "signature";
    } else if (args.model) {
      params.set("model", args.model);
      scope = "model";
    }

    const query = params.toString();
    const path = query ? `/api/cache?${query}` : "/api/cache";
    const raw = toRecord(
      await apiFetch(path, {
        method: "DELETE",
      })
    );

    const result = {
      ok: toBoolean(raw.ok, true),
      invalidated: toNumber(raw.invalidated ?? raw.cleared, 0),
      scope,
    };

    await logToolCall("omniroute_cache_flush", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_cache_flush", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

// ============ 1proxy Tools ============

export async function handleOneproxyFetch(
  args: { protocol?: string; countryCode?: string; minQuality?: number; limit?: number } = {}
) {
  const start = Date.now();
  try {
    const params = new URLSearchParams();
    if (args.protocol) params.set("protocol", args.protocol);
    if (args.countryCode) params.set("countryCode", args.countryCode);
    if (args.minQuality) params.set("minQuality", String(args.minQuality));
    if (args.limit) params.set("limit", String(args.limit));

    const query = params.toString();
    const path = query ? `/api/settings/oneproxy?${query}` : "/api/settings/oneproxy";
    const raw = toRecord(await apiFetch(path));

    const items = toArrayOfRecords(raw.items).map((r) => ({
      id: toString(r.id, ""),
      host: toString(r.host, ""),
      port: toNumber(r.port, 0),
      type: toString(r.type, "http"),
      countryCode: typeof r.country_code === "string" ? r.country_code : null,
      qualityScore: r.quality_score != null ? toNumber(r.quality_score) : null,
      latencyMs: r.latency_ms != null ? toNumber(r.latency_ms) : null,
      anonymity: typeof r.anonymity === "string" ? r.anonymity : null,
      googleAccess: r.google_access === 1 || r.google_access === true,
      status: toString(r.status, "active"),
    }));

    const result = { items, total: toNumber(raw.total, items.length) };
    await logToolCall("omniroute_oneproxy_fetch", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_oneproxy_fetch", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleOneproxyRotate(
  args: { strategy?: "random" | "quality" | "sequential" } = {}
) {
  const start = Date.now();
  try {
    const body: Record<string, unknown> = {};
    if (args.strategy) body.strategy = args.strategy;

    const raw = toRecord(
      await apiFetch("/api/settings/oneproxy/rotate", {
        method: "POST",
        body: JSON.stringify(body),
      })
    );

    const result = {
      id: toString(raw.id, ""),
      host: toString(raw.host, ""),
      port: toNumber(raw.port, 0),
      type: toString(raw.type, "http"),
      countryCode: typeof raw.country_code === "string" ? raw.country_code : null,
      qualityScore: raw.quality_score != null ? toNumber(raw.quality_score) : null,
      latencyMs: raw.latency_ms != null ? toNumber(raw.latency_ms) : null,
    };

    await logToolCall("omniroute_oneproxy_rotate", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_oneproxy_rotate", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

export async function handleOneproxyStats(args: Record<string, never> = {}) {
  const start = Date.now();
  try {
    const raw = toRecord(await apiFetch("/api/settings/oneproxy?action=stats"));

    const statsRaw = toRecord(raw.stats);
    const statusRaw = toRecord(raw.status);

    const stats = {
      total: toNumber(statsRaw.total, 0),
      active: toNumber(statsRaw.active, 0),
      avgQuality: statsRaw.avg_quality != null ? toNumber(statsRaw.avg_quality) : null,
      lastValidated: typeof statsRaw.last_validated === "string" ? statsRaw.last_validated : null,
      byProtocol: toArrayOfRecords(statsRaw.by_protocol || statsRaw.byProtocol).map((r) => ({
        protocol: toString(r.protocol, ""),
        count: toNumber(r.count, 0),
      })),
      byCountry: toArrayOfRecords(statsRaw.by_country || statsRaw.byCountry).map((r) => ({
        countryCode: toString(r.countryCode || r.country_code, ""),
        count: toNumber(r.count, 0),
      })),
    };

    const status = {
      lastSyncSuccess: toBoolean(statusRaw.last_sync_success, false),
      lastSyncError:
        typeof statusRaw.last_sync_error === "string" ? statusRaw.last_sync_error : null,
      lastSyncAt: typeof statusRaw.last_sync_at === "string" ? statusRaw.last_sync_at : null,
      lastSyncCount: toNumber(statusRaw.last_sync_count, 0),
      consecutiveFailures: toNumber(statusRaw.consecutive_failures, 0),
    };

    const result = { stats, status };
    await logToolCall("omniroute_oneproxy_stats", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_oneproxy_stats", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}
