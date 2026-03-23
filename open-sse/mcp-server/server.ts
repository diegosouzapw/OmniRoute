/**
 * OmniRoute MCP Server — Model Context Protocol server exposing
 * OmniRoute gateway intelligence as tools for AI agents.
 *
 * Supports two transports:
 *   1. stdio  — for IDE integration (VS Code, Cursor, Claude Desktop)
 *   2. HTTP   — for remote/programmatic access
 *
 * Tools wrap existing OmniRoute API endpoints and add intelligence
 * such as routing simulation, budget guards, and session snapshots.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import {
  MCP_TOOLS,
  getHealthInput,
  listCombosInput,
  getComboMetricsInput,
  switchComboInput,
  checkQuotaInput,
  routeRequestInput,
  costReportInput,
  listModelsCatalogInput,
  simulateRouteInput,
  setBudgetGuardInput,
  setRoutingStrategyInput,
  setResilienceProfileInput,
  testComboInput,
  getProviderMetricsInput,
  bestComboForTaskInput,
  explainRouteInput,
  getSessionSnapshotInput,
  syncPricingInput,
} from "./schemas/tools.ts";
import { startMcpHeartbeat } from "./runtimeHeartbeat.ts";

import { logToolCall } from "./audit.ts";
import {
  evaluateToolScopes,
  resolveCallerScopeContext,
  type McpToolExtraLike,
} from "./scopeEnforcement.ts";

import {
  handleSimulateRoute,
  handleSetBudgetGuard,
  handleSetRoutingStrategy,
  handleSetResilienceProfile,
  handleTestCombo,
  handleGetProviderMetrics,
  handleBestComboForTask,
  handleExplainRoute,
  handleGetSessionSnapshot,
  handleSyncPricing,
} from "./tools/advancedTools.ts";
import { normalizeQuotaResponse } from "../../src/shared/contracts/quota.ts";

// ============ Configuration ============

const OMNIROUTE_BASE_URL = process.env.OMNIROUTE_BASE_URL || "http://localhost:20128";
const OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY || "";
const MCP_ENFORCE_SCOPES = process.env.OMNIROUTE_MCP_ENFORCE_SCOPES === "true";
const MCP_ALLOWED_SCOPES = new Set(
  (process.env.OMNIROUTE_MCP_SCOPES || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
);

type JsonRecord = Record<string, unknown>;

type TextToolResult = {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
};

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function toString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function toNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function toStringArray(value: unknown, fallback: string[] = []): string[] {
  const values = toArray(value).filter((entry): entry is string => typeof entry === "string");
  return values.length > 0 ? values : fallback;
}

function normalizeComboModels(
  rawModels: unknown
): Array<{ provider: string; model: string; priority: number }> {
  return toArray(rawModels).map((rawModel, index) => {
    const model = toRecord(rawModel);
    return {
      provider: toString(model.provider, "unknown"),
      model: toString(model.model, "unknown"),
      priority: toNumber(model.priority, index + 1),
    };
  });
}

/**
 * Internal fetch helper that calls OmniRoute API endpoints.
 */
async function omniRouteFetch(path: string, options: RequestInit = {}): Promise<unknown> {
  const url = `${OMNIROUTE_BASE_URL}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(OMNIROUTE_API_KEY ? { Authorization: `Bearer ${OMNIROUTE_API_KEY}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  };

  const response = await fetch(url, { ...options, headers, signal: AbortSignal.timeout(10000) });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(`OmniRoute API error [${response.status}]: ${errorText}`);
  }

  return response.json();
}

function withScopeEnforcement(
  toolName: string,
  handler: (args: unknown, extra?: McpToolExtraLike) => Promise<TextToolResult>
) {
  return async (args: unknown, extra?: McpToolExtraLike): Promise<TextToolResult> => {
    const scopeContext = resolveCallerScopeContext(extra, Array.from(MCP_ALLOWED_SCOPES));
    const scopeCheck = evaluateToolScopes(toolName, scopeContext.scopes, MCP_ENFORCE_SCOPES);
    if (!scopeCheck.allowed) {
      const missingScopes =
        scopeCheck.missing.length > 0 ? scopeCheck.missing.join(", ") : "unavailable";
      const reason = scopeCheck.reason || "scope_check_failed";
      const msg =
        `Insufficient MCP scopes for ${toolName}. ` +
        `Missing: ${missingScopes}. ` +
        `Caller=${scopeContext.callerId}, source=${scopeContext.source}.`;
      const safeArgs = args && typeof args === "object" ? toRecord(args) : { rawArgs: args };
      await logToolCall(
        toolName,
        {
          ...safeArgs,
          _scopeCheck: {
            callerId: scopeContext.callerId,
            source: scopeContext.source,
            required: scopeCheck.required,
            provided: scopeCheck.provided,
            missing: scopeCheck.missing,
          },
        },
        null,
        0,
        false,
        `scope_denied:${reason}`
      );
      return {
        content: [{ type: "text" as const, text: `Error: ${msg}` }],
        isError: true,
      };
    }

    return handler(args, extra);
  };
}

// ============ Tool Handlers ============

async function handleGetHealth() {
  const start = Date.now();
  try {
    const [healthRaw, resilienceRaw, rateLimitsRaw] = await Promise.allSettled([
      omniRouteFetch("/api/monitoring/health"),
      omniRouteFetch("/api/resilience"),
      omniRouteFetch("/api/rate-limits"),
    ]);

    const health = healthRaw.status === "fulfilled" ? toRecord(healthRaw.value) : {};
    const resilience = resilienceRaw.status === "fulfilled" ? toRecord(resilienceRaw.value) : {};
    const rateLimits = rateLimitsRaw.status === "fulfilled" ? toRecord(rateLimitsRaw.value) : {};
    const memoryUsageRaw = toRecord(health.memoryUsage);
    const cacheStatsRaw = toRecord(health.cacheStats);
    const resilienceCircuitBreakers = toArray(resilience.circuitBreakers);
    const rateLimitEntries = toArray(rateLimits.limits);

    const result = {
      uptime: toString(health.uptime, "unknown"),
      version: toString(health.version, "unknown"),
      memoryUsage: {
        heapUsed: toNumber(memoryUsageRaw.heapUsed, 0),
        heapTotal: toNumber(memoryUsageRaw.heapTotal, 0),
      },
      circuitBreakers: resilienceCircuitBreakers,
      rateLimits: rateLimitEntries,
      cacheStats:
        Object.keys(cacheStatsRaw).length > 0
          ? {
              hits: toNumber(cacheStatsRaw.hits, 0),
              misses: toNumber(cacheStatsRaw.misses, 0),
              hitRate: toNumber(cacheStatsRaw.hitRate, 0),
            }
          : undefined,
    };

    await logToolCall("omniroute_get_health", {}, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_get_health", {}, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

async function handleListCombos(args: { includeMetrics?: boolean }) {
  const start = Date.now();
  try {
    const combosRaw = await omniRouteFetch("/api/combos");
    const combosRecord = toRecord(combosRaw);
    const combos = Array.isArray(combosRecord.combos)
      ? combosRecord.combos
      : Array.isArray(combosRaw)
        ? combosRaw
        : [];
    let metrics: JsonRecord = {};
    if (args.includeMetrics) {
      metrics = toRecord(await omniRouteFetch("/api/combos/metrics").catch(() => ({})));
    }

    const result = {
      combos: toArray(combos).map((rawCombo) => {
        const combo = toRecord(rawCombo);
        const comboData = toRecord(combo.data);
        const comboId = toString(combo.id, "");
        const modelsSource =
          Array.isArray(combo.models) && combo.models.length > 0 ? combo.models : comboData.models;
        return {
          id: comboId,
          name: toString(combo.name, comboId || "unnamed"),
          models: normalizeComboModels(modelsSource),
          strategy: toString(combo.strategy, toString(comboData.strategy, "priority")),
          enabled: combo.enabled !== false,
          ...(args.includeMetrics ? { metrics: metrics[comboId] ?? null } : {}),
        };
      }),
    };

    await logToolCall("omniroute_list_combos", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_list_combos", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

async function handleGetComboMetrics(args: { comboId: string }) {
  const start = Date.now();
  try {
    const result = await omniRouteFetch(
      `/api/combos/metrics?comboId=${encodeURIComponent(args.comboId)}`
    );
    await logToolCall("omniroute_get_combo_metrics", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_get_combo_metrics", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

async function handleSwitchCombo(args: { comboId: string; active: boolean }) {
  const start = Date.now();
  try {
    const result = await omniRouteFetch(`/api/combos/${encodeURIComponent(args.comboId)}`, {
      method: "PUT",
      body: JSON.stringify({ isActive: args.active }),
    });
    await logToolCall("omniroute_switch_combo", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_switch_combo", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

async function handleCheckQuota(args: { provider?: string; connectionId?: string }) {
  const start = Date.now();
  try {
    let path = "/api/usage/quota";
    if (args.connectionId) path += `?connectionId=${encodeURIComponent(args.connectionId)}`;
    else if (args.provider) path += `?provider=${encodeURIComponent(args.provider)}`;

    const result = normalizeQuotaResponse(await omniRouteFetch(path), {
      provider: args.provider || null,
      connectionId: args.connectionId || null,
    });

    await logToolCall("omniroute_check_quota", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_check_quota", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

async function handleRouteRequest(args: {
  model: string;
  messages: Array<{ role: string; content: string }>;
  combo?: string;
  budget?: number;
  role?: string;
  stream?: boolean;
}) {
  const start = Date.now();
  try {
    const body: Record<string, unknown> = {
      model: args.model,
      messages: args.messages,
      stream: false, // MCP tool always returns non-streaming
    };
    if (args.combo) {
      body["x-combo"] = args.combo;
    }

    const raw = (await omniRouteFetch("/v1/chat/completions", {
      method: "POST",
      body: JSON.stringify(body),
    })) as JsonRecord;
    const choices = toArray(raw.choices);
    const firstChoice = toRecord(choices[0]);
    const firstMessage = toRecord(firstChoice.message);
    const usage = toRecord(raw.usage);

    const result = {
      response: {
        content: toString(firstMessage.content, ""),
        model: toString(raw.model, args.model),
        tokens: {
          prompt: toNumber(usage.prompt_tokens, 0),
          completion: toNumber(usage.completion_tokens, 0),
        },
      },
      routing: {
        provider: toString(raw.provider, "unknown"),
        combo: raw.combo ?? null,
        fallbacksTriggered: toNumber(raw.fallbacksTriggered, 0),
        cost: toNumber(raw.cost, 0),
        latencyMs: Date.now() - start,
        routingExplanation: toString(
          raw.routingExplanation,
          "Request routed through primary provider"
        ),
      },
    };

    await logToolCall(
      "omniroute_route_request",
      { model: args.model, messageCount: args.messages.length },
      result.routing,
      Date.now() - start,
      true
    );
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall(
      "omniroute_route_request",
      { model: args.model },
      null,
      Date.now() - start,
      false,
      msg
    );
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

async function handleCostReport(args: { period?: string }) {
  const start = Date.now();
  try {
    const period = args.period || "session";
    const rangeMap: Record<string, string> = {
      session: "1d",
      day: "1d",
      week: "7d",
      month: "30d",
    };
    const range = rangeMap[period] || "30d";
    const raw = toRecord(
      await omniRouteFetch(`/api/usage/analytics?range=${encodeURIComponent(range)}`)
    );
    const tokenCount = toRecord(raw.tokenCount);
    const budget = toRecord(raw.budget);

    const result = {
      period,
      totalCost: toNumber(raw.totalCost, 0),
      requestCount: toNumber(raw.requestCount, 0),
      tokenCount: {
        prompt: toNumber(tokenCount.prompt, 0),
        completion: toNumber(tokenCount.completion, 0),
      },
      byProvider: toArray(raw.byProvider),
      byModel: toArray(raw.byModel),
      budget: {
        limit: budget.limit ?? null,
        remaining: budget.remaining ?? null,
      },
    };

    await logToolCall("omniroute_cost_report", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_cost_report", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

async function handleListModelsCatalog(args: { provider?: string; capability?: string }) {
  const start = Date.now();
  try {
    let path = "/v1/models";
    let isProviderSpecific = false;
    let source = "local_catalog";
    let warning = undefined;

    if (args.provider && !args.capability) {
      // Use direct provider fetch to get real-time API status
      path = `/api/providers/${encodeURIComponent(args.provider)}/models`;
      isProviderSpecific = true;
    } else {
      const params = new URLSearchParams();
      if (args.provider) params.set("provider", args.provider);
      if (args.capability) params.set("capability", args.capability);
      if (params.toString()) path += `?${params.toString()}`;
    }

    const raw = toRecord(await omniRouteFetch(path));

    // If we used the direct provider endpoint
    let rawModels = [];
    if (isProviderSpecific) {
      rawModels = Array.isArray(raw.models) ? raw.models : [];
      source = typeof raw.source === "string" ? raw.source : "api";
      if (raw.warning) warning = String(raw.warning);
    } else {
      rawModels = Array.isArray(raw.data) ? raw.data : [];
      source = "local_catalog";
      // OmniRoute's global /v1/models is always a cached/local catalog
    }

    const result = {
      models: rawModels.map((rawModel) => {
        const model = toRecord(rawModel);
        return {
          id: toString(model.id, ""),
          provider: toString(model.owned_by, toString(model.provider, args.provider || "unknown")),
          capabilities: toStringArray(model.capabilities, ["chat"]),
          status: toString(model.status, "available"),
          pricing: model.pricing,
        };
      }),
      source,
      ...(warning ? { warning } : {}),
    };

    await logToolCall(
      "omniroute_list_models_catalog",
      args,
      { modelCount: result.models.length },
      Date.now() - start,
      true
    );
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_list_models_catalog", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

// ============ MCP Server Setup ============

/**
 * Create and configure the OmniRoute MCP Server with all essential tools.
 */
export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "omniroute",
    version: process.env.npm_package_version || "1.8.1",
  });

  // Register essential tools
  server.registerTool(
    "omniroute_get_health",
    {
      description:
        "Returns OmniRoute health status including uptime, memory, circuit breakers, rate limits, and cache stats",
      inputSchema: getHealthInput,
    },
    withScopeEnforcement("omniroute_get_health", async (args) => {
      getHealthInput.parse(args ?? {});
      return handleGetHealth();
    })
  );

  server.registerTool(
    "omniroute_list_combos",
    {
      description:
        "Lists all configured combos (model chains) with strategies and optional metrics",
      inputSchema: listCombosInput,
    },
    withScopeEnforcement("omniroute_list_combos", (args) =>
      handleListCombos(listCombosInput.parse(args))
    )
  );

  server.registerTool(
    "omniroute_get_combo_metrics",
    {
      description: "Returns detailed performance metrics for a specific combo",
      inputSchema: getComboMetricsInput,
    },
    withScopeEnforcement("omniroute_get_combo_metrics", (args) =>
      handleGetComboMetrics(getComboMetricsInput.parse(args))
    )
  );

  server.registerTool(
    "omniroute_switch_combo",
    {
      description: "Activates or deactivates a combo for routing",
      inputSchema: switchComboInput,
    },
    withScopeEnforcement("omniroute_switch_combo", (args) =>
      handleSwitchCombo(switchComboInput.parse(args))
    )
  );

  server.registerTool(
    "omniroute_check_quota",
    {
      description: "Checks remaining API quota for one or all providers",
      inputSchema: checkQuotaInput,
    },
    withScopeEnforcement("omniroute_check_quota", (args) =>
      handleCheckQuota(checkQuotaInput.parse(args))
    )
  );

  server.registerTool(
    "omniroute_route_request",
    {
      description: "Sends a chat completion request through OmniRoute intelligent routing",
      inputSchema: routeRequestInput,
    },
    withScopeEnforcement("omniroute_route_request", (args) =>
      handleRouteRequest(routeRequestInput.parse(args))
    )
  );

  server.registerTool(
    "omniroute_cost_report",
    {
      description: "Generates a cost report for the specified period",
      inputSchema: costReportInput,
    },
    withScopeEnforcement("omniroute_cost_report", (args) =>
      handleCostReport(costReportInput.parse(args))
    )
  );

  server.registerTool(
    "omniroute_list_models_catalog",
    {
      description: "Lists all available AI models across providers with capabilities and pricing",
      inputSchema: listModelsCatalogInput,
    },
    withScopeEnforcement("omniroute_list_models_catalog", (args) =>
      handleListModelsCatalog(listModelsCatalogInput.parse(args))
    )
  );

  // ── Advanced Tools (Phase 3) ──────────────────────────────

  server.registerTool(
    "omniroute_simulate_route",
    {
      description: "Simulates the routing path a request would take without executing it (dry-run)",
      inputSchema: simulateRouteInput,
    },
    withScopeEnforcement("omniroute_simulate_route", (args) =>
      handleSimulateRoute(simulateRouteInput.parse(args))
    )
  );

  server.registerTool(
    "omniroute_set_budget_guard",
    {
      description:
        "Sets a session budget limit with configurable action when exceeded (degrade/block/alert)",
      inputSchema: setBudgetGuardInput,
    },
    withScopeEnforcement("omniroute_set_budget_guard", (args) =>
      handleSetBudgetGuard(setBudgetGuardInput.parse(args))
    )
  );

  server.registerTool(
    "omniroute_set_routing_strategy",
    {
      description:
        "Updates combo routing strategy at runtime (priority/weighted/round-robin/auto/etc.)",
      inputSchema: setRoutingStrategyInput,
    },
    withScopeEnforcement("omniroute_set_routing_strategy", (args) =>
      handleSetRoutingStrategy(setRoutingStrategyInput.parse(args))
    )
  );

  server.registerTool(
    "omniroute_set_resilience_profile",
    {
      description:
        "Applies a resilience profile controlling circuit breakers, retries, timeouts, and fallback depth",
      inputSchema: setResilienceProfileInput,
    },
    withScopeEnforcement("omniroute_set_resilience_profile", (args) =>
      handleSetResilienceProfile(setResilienceProfileInput.parse(args))
    )
  );

  server.registerTool(
    "omniroute_test_combo",
    {
      description:
        "Tests each provider in a combo with a real prompt, reporting latency, cost, and success per provider",
      inputSchema: testComboInput,
    },
    withScopeEnforcement("omniroute_test_combo", (args) =>
      handleTestCombo(testComboInput.parse(args))
    )
  );

  server.registerTool(
    "omniroute_get_provider_metrics",
    {
      description:
        "Returns detailed metrics for a specific provider including latency percentiles and circuit breaker state",
      inputSchema: getProviderMetricsInput,
    },
    withScopeEnforcement("omniroute_get_provider_metrics", (args) =>
      handleGetProviderMetrics(getProviderMetricsInput.parse(args))
    )
  );

  server.registerTool(
    "omniroute_best_combo_for_task",
    {
      description:
        "Recommends the best combo for a task type based on provider fitness and constraints",
      inputSchema: bestComboForTaskInput,
    },
    withScopeEnforcement("omniroute_best_combo_for_task", (args) =>
      handleBestComboForTask(bestComboForTaskInput.parse(args))
    )
  );

  server.registerTool(
    "omniroute_explain_route",
    {
      description:
        "Explains why a request was routed to a specific provider, showing scoring factors and fallbacks",
      inputSchema: explainRouteInput,
    },
    withScopeEnforcement("omniroute_explain_route", (args) =>
      handleExplainRoute(explainRouteInput.parse(args))
    )
  );

  server.registerTool(
    "omniroute_get_session_snapshot",
    {
      description:
        "Returns a full snapshot of the current working session: cost, tokens, top models, errors, budget status",
      inputSchema: getSessionSnapshotInput,
    },
    withScopeEnforcement("omniroute_get_session_snapshot", async (args) => {
      getSessionSnapshotInput.parse(args ?? {});
      return handleGetSessionSnapshot();
    })
  );

  server.registerTool(
    "omniroute_sync_pricing",
    {
      description:
        "Syncs pricing data from external sources (LiteLLM) into OmniRoute without overwriting user-set prices",
      inputSchema: syncPricingInput,
    },
    withScopeEnforcement("omniroute_sync_pricing", (args) =>
      handleSyncPricing(syncPricingInput.parse(args))
    )
  );

  return server;
}

// ============ Main Entry Point (stdio) ============

/**
 * Start the MCP server with stdio transport.
 * Called when `omniroute --mcp` is used.
 */
export async function startMcpStdio(): Promise<void> {
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  const version = process.env.npm_package_version || "1.8.1";
  const stopHeartbeat = startMcpHeartbeat({
    version,
    scopesEnforced: MCP_ENFORCE_SCOPES,
    allowedScopes: Array.from(MCP_ALLOWED_SCOPES),
    toolCount: MCP_TOOLS.length,
  });
  const stopHeartbeatOnce = () => {
    stopHeartbeat();
  };
  process.once("exit", stopHeartbeatOnce);
  process.once("SIGINT", stopHeartbeatOnce);
  process.once("SIGTERM", stopHeartbeatOnce);

  console.error("[MCP] OmniRoute MCP Server starting (stdio transport)...");
  try {
    await server.connect(transport);
    console.error("[MCP] OmniRoute MCP Server connected and ready.");
  } finally {
    stopHeartbeatOnce();
    process.off("exit", stopHeartbeatOnce);
    process.off("SIGINT", stopHeartbeatOnce);
    process.off("SIGTERM", stopHeartbeatOnce);
  }
}

// If this file is run directly, start stdio server
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"))) {
  startMcpStdio().catch((err) => {
    console.error("[MCP] Fatal error:", err);
    process.exit(1);
  });
}
