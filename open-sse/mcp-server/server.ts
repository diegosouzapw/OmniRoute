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
  getHealthInput,
  listCombosInput,
  getComboMetricsInput,
  switchComboInput,
  checkQuotaInput,
  routeRequestInput,
  costReportInput,
  listModelsCatalogInput,
  MCP_ESSENTIAL_TOOLS,
} from "./schemas/tools.ts";

import { logToolCall } from "./audit.ts";

import {
  handleSimulateRoute,
  handleSetBudgetGuard,
  handleSetResilienceProfile,
  handleTestCombo,
  handleGetProviderMetrics,
  handleBestComboForTask,
  handleExplainRoute,
  handleGetSessionSnapshot,
} from "./tools/advancedTools.ts";

// ============ Configuration ============

const OMNIROUTE_BASE_URL = process.env.OMNIROUTE_BASE_URL || "http://localhost:20128";
const OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY || "";

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

// ============ Tool Handlers ============

async function handleGetHealth() {
  const start = Date.now();
  try {
    const [healthRaw, resilienceRaw, rateLimitsRaw] = await Promise.allSettled([
      omniRouteFetch("/api/monitoring/health"),
      omniRouteFetch("/api/resilience"),
      omniRouteFetch("/api/rate-limits"),
    ]);

    const health =
      healthRaw.status === "fulfilled" ? (healthRaw.value as Record<string, unknown>) : {};
    const resilience =
      resilienceRaw.status === "fulfilled" ? (resilienceRaw.value as Record<string, unknown>) : {};
    const rateLimits =
      rateLimitsRaw.status === "fulfilled" ? (rateLimitsRaw.value as Record<string, unknown>) : {};

    const result = {
      uptime: String((health as any)?.uptime || "unknown"),
      version: String((health as any)?.version || "unknown"),
      memoryUsage: (health as any)?.memoryUsage || { heapUsed: 0, heapTotal: 0 },
      circuitBreakers: Array.isArray((resilience as any)?.circuitBreakers)
        ? (resilience as any).circuitBreakers
        : [],
      rateLimits: Array.isArray((rateLimits as any)?.limits) ? (rateLimits as any).limits : [],
      cacheStats: (health as any)?.cacheStats || undefined,
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
    const combos = (await omniRouteFetch("/api/combos")) as any;
    let metrics: Record<string, unknown> = {};
    if (args.includeMetrics) {
      metrics = (await omniRouteFetch("/api/combos/metrics").catch(() => ({}))) as Record<
        string,
        unknown
      >;
    }

    const result = {
      combos: Array.isArray(combos)
        ? combos.map((c: any) => ({
            id: c.id,
            name: c.name,
            models: c.models || c.data?.models || [],
            strategy: c.strategy || c.data?.strategy || "priority",
            enabled: c.enabled !== false,
            ...(args.includeMetrics ? { metrics: (metrics as any)?.[c.id] || null } : {}),
          }))
        : [],
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
      method: "PATCH",
      body: JSON.stringify({ enabled: args.active }),
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

    const raw = (await omniRouteFetch(path)) as any;
    const result = {
      providers: Array.isArray(raw?.providers) ? raw.providers : Array.isArray(raw) ? raw : [],
    };

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
    })) as any;

    const result = {
      response: {
        content: raw?.choices?.[0]?.message?.content || "",
        model: raw?.model || args.model,
        tokens: {
          prompt: raw?.usage?.prompt_tokens || 0,
          completion: raw?.usage?.completion_tokens || 0,
        },
      },
      routing: {
        provider: raw?.provider || "unknown",
        combo: raw?.combo || null,
        fallbacksTriggered: raw?.fallbacksTriggered || 0,
        cost: raw?.cost || 0,
        latencyMs: Date.now() - start,
        routingExplanation: raw?.routingExplanation || "Request routed through primary provider",
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
    const raw = (await omniRouteFetch(
      `/api/usage/analytics?period=${encodeURIComponent(period)}`
    )) as any;

    const result = {
      period,
      totalCost: raw?.totalCost || 0,
      requestCount: raw?.requestCount || 0,
      tokenCount: raw?.tokenCount || { prompt: 0, completion: 0 },
      byProvider: raw?.byProvider || [],
      byModel: raw?.byModel || [],
      budget: raw?.budget || { limit: null, remaining: null },
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
    const params = new URLSearchParams();
    if (args.provider) params.set("provider", args.provider);
    if (args.capability) params.set("capability", args.capability);
    if (params.toString()) path += `?${params.toString()}`;

    const raw = (await omniRouteFetch(path)) as any;
    const result = {
      models: Array.isArray(raw?.data)
        ? raw.data.map((m: any) => ({
            id: m.id,
            provider: m.owned_by || m.provider || "unknown",
            capabilities: m.capabilities || ["chat"],
            status: m.status || "available",
            pricing: m.pricing || undefined,
          }))
        : [],
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
  server.tool(
    "omniroute_get_health",
    "Returns OmniRoute health status including uptime, memory, circuit breakers, rate limits, and cache stats",
    {},
    handleGetHealth
  );

  server.tool(
    "omniroute_list_combos",
    "Lists all configured combos (model chains) with strategies and optional metrics",
    { includeMetrics: { type: "boolean", description: "Include performance metrics per combo" } },
    (args) => handleListCombos(args as any)
  );

  server.tool(
    "omniroute_get_combo_metrics",
    "Returns detailed performance metrics for a specific combo",
    { comboId: { type: "string", description: "ID of the combo to get metrics for" } },
    (args) => handleGetComboMetrics(args as any)
  );

  server.tool(
    "omniroute_switch_combo",
    "Activates or deactivates a combo for routing",
    {
      comboId: { type: "string", description: "ID of the combo" },
      active: { type: "boolean", description: "Whether to enable or disable" },
    },
    (args) => handleSwitchCombo(args as any)
  );

  server.tool(
    "omniroute_check_quota",
    "Checks remaining API quota for one or all providers",
    {
      provider: { type: "string", description: "Filter by provider name (optional)" },
      connectionId: { type: "string", description: "Filter by connection ID (optional)" },
    },
    (args) => handleCheckQuota(args as any)
  );

  server.tool(
    "omniroute_route_request",
    "Sends a chat completion request through OmniRoute intelligent routing",
    {
      model: { type: "string", description: "Model identifier" },
      messages: {
        type: "array",
        items: {
          type: "object",
          properties: { role: { type: "string" }, content: { type: "string" } },
        },
        description: "Chat messages",
      },
      combo: { type: "string", description: "Specific combo to route through (optional)" },
      budget: { type: "number", description: "Max cost in USD (optional)" },
      role: {
        type: "string",
        description: "Task role hint: coding, review, planning, analysis (optional)",
      },
    },
    (args) => handleRouteRequest(args as any)
  );

  server.tool(
    "omniroute_cost_report",
    "Generates a cost report for the specified period",
    {
      period: {
        type: "string",
        description: "Time period: session, day, week, month (default: session)",
      },
    },
    (args) => handleCostReport(args as any)
  );

  server.tool(
    "omniroute_list_models_catalog",
    "Lists all available AI models across providers with capabilities and pricing",
    {
      provider: { type: "string", description: "Filter by provider name (optional)" },
      capability: {
        type: "string",
        description: "Filter by capability: chat, embedding, image (optional)",
      },
    },
    (args) => handleListModelsCatalog(args as any)
  );

  // ── Advanced Tools (Phase 3) ──────────────────────────────

  server.tool(
    "omniroute_simulate_route",
    "Simulates the routing path a request would take without executing it (dry-run)",
    {
      model: { type: "string", description: "Target model identifier" },
      promptTokenEstimate: { type: "number", description: "Estimated prompt token count" },
      combo: {
        type: "string",
        description: "Specific combo to simulate (optional, default: active)",
      },
    },
    (args) => handleSimulateRoute(args as any)
  );

  server.tool(
    "omniroute_set_budget_guard",
    "Sets a session budget limit with configurable action when exceeded (degrade/block/alert)",
    {
      maxCost: { type: "number", description: "Maximum cost in USD for the session" },
      action: { type: "string", description: "Action on exceed: degrade, block, or alert" },
      degradeToTier: {
        type: "string",
        description: "If action=degrade, target tier: cheap or free (optional)",
      },
    },
    (args) => handleSetBudgetGuard(args as any)
  );

  server.tool(
    "omniroute_set_resilience_profile",
    "Applies a resilience profile controlling circuit breakers, retries, timeouts, and fallback depth",
    {
      profile: { type: "string", description: "Profile: aggressive, balanced, or conservative" },
    },
    (args) => handleSetResilienceProfile(args as any)
  );

  server.tool(
    "omniroute_test_combo",
    "Tests each provider in a combo with a real prompt, reporting latency, cost, and success per provider",
    {
      comboId: { type: "string", description: "ID or name of the combo to test" },
      testPrompt: { type: "string", description: "Short test prompt (max 200 chars)" },
    },
    (args) => handleTestCombo(args as any)
  );

  server.tool(
    "omniroute_get_provider_metrics",
    "Returns detailed metrics for a specific provider including latency percentiles and circuit breaker state",
    {
      provider: { type: "string", description: "Provider name" },
    },
    (args) => handleGetProviderMetrics(args as any)
  );

  server.tool(
    "omniroute_best_combo_for_task",
    "Recommends the best combo for a task type based on provider fitness and constraints",
    {
      taskType: {
        type: "string",
        description: "Task type: coding, review, planning, analysis, debugging, documentation",
      },
      budgetConstraint: { type: "number", description: "Max cost constraint in USD (optional)" },
      latencyConstraint: { type: "number", description: "Max latency constraint in ms (optional)" },
    },
    (args) => handleBestComboForTask(args as any)
  );

  server.tool(
    "omniroute_explain_route",
    "Explains why a request was routed to a specific provider, showing scoring factors and fallbacks",
    {
      requestId: { type: "string", description: "Request ID from X-Request-Id header" },
    },
    (args) => handleExplainRoute(args as any)
  );

  server.tool(
    "omniroute_get_session_snapshot",
    "Returns a full snapshot of the current working session: cost, tokens, top models, errors, budget status",
    {},
    handleGetSessionSnapshot
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

  console.error("[MCP] OmniRoute MCP Server starting (stdio transport)...");
  await server.connect(transport);
  console.error("[MCP] OmniRoute MCP Server connected and ready.");
}

// If this file is run directly, start stdio server
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"))) {
  startMcpStdio().catch((err) => {
    console.error("[MCP] Fatal error:", err);
    process.exit(1);
  });
}
