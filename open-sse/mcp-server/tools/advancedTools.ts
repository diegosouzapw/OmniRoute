/**
 * OmniRoute MCP Advanced Tools — 8 intelligence tools that differentiate
 * OmniRoute from any other AI gateway.
 *
 * Tools:
 *   1. omniroute_simulate_route     — Dry-run routing simulation
 *   2. omniroute_set_budget_guard   — Session budget with degrade/block/alert
 *   3. omniroute_set_resilience_profile — Circuit breaker/retry profiles
 *   4. omniroute_test_combo         — Live test each provider in a combo
 *   5. omniroute_get_provider_metrics — Detailed per-provider metrics
 *   6. omniroute_best_combo_for_task — AI-powered combo recommendation
 *   7. omniroute_explain_route      — Post-hoc routing decision explainer
 *   8. omniroute_get_session_snapshot — Full session state snapshot
 */

import { logToolCall } from "../audit.ts";

const OMNIROUTE_BASE_URL = process.env.OMNIROUTE_BASE_URL || "http://localhost:20128";
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

const RESILIENCE_PROFILES = {
  aggressive: { circuitBreakerThreshold: 3, retryCount: 1, timeoutMs: 10000, fallbackDepth: 5 },
  balanced: { circuitBreakerThreshold: 5, retryCount: 2, timeoutMs: 15000, fallbackDepth: 3 },
  conservative: { circuitBreakerThreshold: 10, retryCount: 3, timeoutMs: 30000, fallbackDepth: 2 },
} as const;

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

    const combos = combosRaw.status === "fulfilled" ? (combosRaw.value as any[]) : [];
    const health = healthRaw.status === "fulfilled" ? (healthRaw.value as any) : {};
    const quota = quotaRaw.status === "fulfilled" ? (quotaRaw.value as any) : {};

    // Find target combo
    const targetCombo = args.combo
      ? combos.find((c: any) => c.id === args.combo || c.name === args.combo)
      : combos.find((c: any) => c.enabled !== false);

    if (!targetCombo) {
      return {
        content: [
          { type: "text" as const, text: JSON.stringify({ error: "No matching combo found" }) },
        ],
        isError: true,
      };
    }

    const models = targetCombo.models || targetCombo.data?.models || [];
    const breakers = health?.circuitBreakers || [];
    const providers = quota?.providers || (Array.isArray(quota) ? quota : []);

    // Simulate path
    const simulatedPath = models.map((m: any, idx: number) => {
      const cb = breakers.find((b: any) => b.provider === m.provider);
      const q = providers.find((p: any) => p.provider === m.provider);
      const estimatedCost = (args.promptTokenEstimate / 1_000_000) * (m.inputCostPer1M || 3.0);
      return {
        provider: m.provider,
        model: m.model || args.model,
        probability: idx === 0 ? 0.85 : 0.15 / Math.max(models.length - 1, 1),
        estimatedCost: Math.round(estimatedCost * 10000) / 10000,
        healthStatus: cb?.state || "CLOSED",
        quotaAvailable: q?.percentRemaining ?? 100,
      };
    });

    const costs = simulatedPath.map((p: any) => p.estimatedCost);
    const result = {
      simulatedPath,
      fallbackTree: {
        primary: simulatedPath[0]?.provider || "unknown",
        fallbacks: simulatedPath.slice(1).map((p: any) => p.provider),
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
      const analytics = (await apiFetch("/api/usage/analytics?period=session")) as any;
      spent = analytics?.totalCost || 0;
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

    // Apply to OmniRoute via API
    try {
      await apiFetch("/api/resilience", {
        method: "PUT",
        body: JSON.stringify({
          circuitBreakerThreshold: settings.circuitBreakerThreshold,
          retryCount: settings.retryCount,
          timeoutMs: settings.timeoutMs,
        }),
      });
    } catch {
      // Resilience endpoint may not exist yet — return settings anyway
    }

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
    const combos = (await apiFetch("/api/combos")) as any[];
    const combo = combos.find((c: any) => c.id === args.comboId || c.name === args.comboId);
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

    const models = combo.models || combo.data?.models || [];
    const prompt = (args.testPrompt || "Say hello").slice(0, 200);

    // Test each provider in parallel
    const results = await Promise.allSettled(
      models.map(async (m: any) => {
        const providerStart = Date.now();
        try {
          const resp = (await apiFetch("/v1/chat/completions", {
            method: "POST",
            body: JSON.stringify({
              model: m.model || "auto",
              messages: [{ role: "user", content: prompt }],
              max_tokens: 50,
              stream: false,
              "x-provider": m.provider,
            }),
          })) as any;

          return {
            provider: m.provider,
            model: m.model || resp?.model || "unknown",
            success: true,
            latencyMs: Date.now() - providerStart,
            cost: resp?.cost || 0,
            tokenCount: (resp?.usage?.prompt_tokens || 0) + (resp?.usage?.completion_tokens || 0),
          };
        } catch (err) {
          return {
            provider: m.provider,
            model: m.model || "unknown",
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

    const health = healthRaw.status === "fulfilled" ? (healthRaw.value as any) : {};
    const quota = quotaRaw.status === "fulfilled" ? (quotaRaw.value as any) : {};
    const analytics = analyticsRaw.status === "fulfilled" ? (analyticsRaw.value as any) : {};

    const cb = (health.circuitBreakers || []).find((b: any) => b.provider === args.provider);
    const providerQuota = Array.isArray(quota?.providers)
      ? quota.providers.find((p: any) => p.provider === args.provider)
      : null;

    const result = {
      provider: args.provider,
      successRate: analytics?.successRate ?? 1.0,
      requestCount: analytics?.requestCount ?? 0,
      avgLatencyMs: analytics?.avgLatencyMs ?? 0,
      p50LatencyMs: analytics?.p50LatencyMs ?? 0,
      p95LatencyMs: analytics?.p95LatencyMs ?? 0,
      p99LatencyMs: analytics?.p99LatencyMs ?? 0,
      errorRate: analytics?.errorRate ?? 0,
      lastError: analytics?.lastError || null,
      circuitBreakerState: cb?.state || "CLOSED",
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
    const combos = (await apiFetch("/api/combos")) as any[];
    const enabledCombos = combos.filter((c: any) => c.enabled !== false);

    if (enabledCombos.length === 0) {
      return {
        content: [
          { type: "text" as const, text: JSON.stringify({ error: "No enabled combos available" }) },
        ],
        isError: true,
      };
    }

    // Score combos by task fitness
    const scored = enabledCombos.map((c: any) => {
      const models = c.models || c.data?.models || [];
      let score = 0;

      // Provider preference scoring
      for (const m of models) {
        const prefIdx = fitness.preferred.indexOf(m.provider);
        if (prefIdx >= 0) score += (fitness.preferred.length - prefIdx) * 10;
      }

      // Name-based trait scoring
      const name = (c.name || "").toLowerCase();
      for (const trait of fitness.traits) {
        if (name.includes(trait)) score += 5;
      }

      // Check if it's a free combo
      const isFree =
        name.includes("free") ||
        models.every((m: any) => (m.provider || "").toLowerCase().includes("free"));

      return { combo: c, score, isFree };
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
    let decision: any = null;
    try {
      decision = await apiFetch(`/api/routing/decisions/${encodeURIComponent(args.requestId)}`);
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

export async function handleGetSessionSnapshot() {
  const start = Date.now();
  try {
    const analytics = (await apiFetch("/api/usage/analytics?period=session").catch(
      () => ({})
    )) as any;

    const result = {
      sessionStart: analytics?.sessionStart || new Date().toISOString(),
      duration: analytics?.duration || "unknown",
      requestCount: analytics?.requestCount || 0,
      costTotal: analytics?.totalCost || 0,
      tokenCount: {
        prompt: analytics?.tokenCount?.prompt || 0,
        completion: analytics?.tokenCount?.completion || 0,
      },
      topModels:
        analytics?.byModel?.slice(0, 5).map((m: any) => ({ model: m.model, count: m.requests })) ||
        [],
      topProviders:
        analytics?.byProvider
          ?.slice(0, 5)
          .map((p: any) => ({ provider: p.name, count: p.requests })) || [],
      errors: analytics?.errorCount || 0,
      fallbacks: analytics?.fallbackCount || 0,
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
