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
 *  12. omniroute_cache_stats       — Cache statistics and hit rates
 *  13. omniroute_cache_flush       — Flush/invalidate cache entries
 */

import { logToolCall } from "../audit.ts";
import { normalizeQuotaResponse } from "../../../src/shared/contracts/quota.ts";
import { resolveOmniRouteBaseUrl } from "../../../src/shared/utils/resolveOmniRouteBaseUrl.ts";
import {
  getComboModelProvider,
  getComboModelString,
  getComboStepTarget,
} from "../../../src/lib/combos/steps.ts";

const OMNIROUTE_BASE_URL = resolveOmniRouteBaseUrl();
const OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY || "";

async function apiFetch(path: string, options: RequestInit = {}): Promise<unknown> {
  const url = `${OMNIROUTE_BASE_URL}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(OMNIROUTE_API_KEY ? { Authorization: `Bearer ${OMNIROUTE_API_KEY}` } : {}),
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
  strategy:
    | "priority"
    | "weighted"
    | "round-robin"
    | "context-relay"
    | "strict-random"
    | "random"
    | "least-used"
    | "cost-optimized"
    | "auto";
  autoRoutingStrategy?: "rules" | "cost" | "eco" | "latency" | "fast";
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

    let nextConfig: JsonRecord | undefined = undefined;
    if (args.strategy === "auto" && args.autoRoutingStrategy) {
      const currentAutoConfig = toRecord(currentConfig.auto);
      nextConfig = {
        ...currentConfig,
        auto: {
          ...currentAutoConfig,
          routingStrategy: args.autoRoutingStrategy,
        },
      };
    }

    const payload: JsonRecord = { strategy: args.strategy };
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
      toString(toRecord(updatedConfig.auto).routingStrategy) ||
      (args.strategy === "auto" ? (args.autoRoutingStrategy ?? "rules") : "");

    const result = {
      success: true,
      combo: {
        id: toString(updatedCombo.id, comboId),
        name: toString(updatedCombo.name, toString(combo.name, comboId)),
        strategy: toString(updatedCombo.strategy, args.strategy),
        autoRoutingStrategy:
          toString(updatedCombo.strategy, args.strategy) === "auto" ? resolvedAutoStrategy : null,
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
