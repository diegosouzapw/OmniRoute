/**
 * MCP Tool Schemas — Contracts for all 22 core and advanced OmniRoute MCP tools.
 *
 * Defines input/output Zod schemas, descriptions, scopes, and audit levels
 * for both essential (Phase 1) and advanced (Phase 2) MCP tools.
 *
 * Each tool wraps existing OmniRoute API endpoints and exposes them through
 * the Model Context Protocol, enabling AI agents in IDEs (VS Code, Cursor,
 * Copilot, Claude Desktop) to intelligently query gateway state.
 */

import { z } from "zod";
import {
  AUTO_ROUTING_STRATEGY_VALUES,
  ROUTING_STRATEGY_VALUES,
} from "../../../src/shared/constants/routingStrategies.ts";

// ============ Shared Types ============

export type AuditLevel = "none" | "basic" | "full";

export interface McpToolDefinition<TInput extends z.ZodTypeAny, TOutput extends z.ZodTypeAny> {
  /** Tool name (MCP identifier) */
  name: string;
  /** Human-readable description for AI agents */
  description: string;
  /** Zod schema for input validation */
  inputSchema: TInput;
  /** Zod schema for output validation */
  outputSchema: TOutput;
  /** Required API key scopes */
  scopes: readonly string[];
  /** Audit logging level */
  auditLevel: AuditLevel;
  /** Phase: 1 = essential, 2 = advanced */
  phase: 1 | 2;
  /** Source endpoints on OmniRoute that this tool wraps */
  sourceEndpoints: readonly string[];
}

// ============ Phase 1: Essential Tools (8) ============

// --- Tool 1: omniroute_get_health ---
export const getHealthInput = z.object({}).describe("No parameters required");

export const getHealthOutput = z.object({
  uptime: z.string(),
  version: z.string(),
  memoryUsage: z.object({
    heapUsed: z.number(),
    heapTotal: z.number(),
  }),
  circuitBreakers: z.array(
    z.object({
      provider: z.string(),
      state: z.enum(["CLOSED", "OPEN", "HALF_OPEN"]),
      failureCount: z.number(),
      lastFailure: z.string().nullable(),
    })
  ),
  rateLimits: z.array(
    z.object({
      provider: z.string(),
      rpm: z.number(),
      currentUsage: z.number(),
      isLimited: z.boolean(),
    })
  ),
  cacheStats: z
    .object({
      hits: z.number(),
      misses: z.number(),
      hitRate: z.number(),
    })
    .optional(),
  cryptography: z
    .object({
      status: z.enum(["healthy", "missing_or_invalid"]),
      provider: z.string(),
    })
    .optional(),
});

export const getHealthTool: McpToolDefinition<typeof getHealthInput, typeof getHealthOutput> = {
  name: "omniroute_get_health",
  description:
    "Returns the current health status of OmniRoute including uptime, memory usage, circuit breaker states for all providers, rate limit status, and cache statistics.",
  inputSchema: getHealthInput,
  outputSchema: getHealthOutput,
  scopes: ["read:health"],
  auditLevel: "basic",
  phase: 1,
  sourceEndpoints: ["/api/monitoring/health", "/api/resilience", "/api/rate-limits"],
};

// --- Tool 2: omniroute_list_combos ---
export const listCombosInput = z.object({
  includeMetrics: z
    .boolean()
    .optional()
    .describe("Include request count, success rate, latency, and cost metrics per combo"),
});

export const listCombosOutput = z.object({
  combos: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      models: z.array(
        z.object({
          provider: z.string(),
          model: z.string(),
          priority: z.number(),
        })
      ),
      strategy: z.enum(ROUTING_STRATEGY_VALUES),
      enabled: z.boolean(),
      metrics: z
        .object({
          requestCount: z.number(),
          successRate: z.number(),
          avgLatencyMs: z.number(),
          totalCost: z.number(),
        })
        .optional(),
    })
  ),
});

export const listCombosTool: McpToolDefinition<typeof listCombosInput, typeof listCombosOutput> = {
  name: "omniroute_list_combos",
  description:
    "Lists all configured combos (model chains) with their strategies and optionally includes performance metrics. Combos define how requests are routed across multiple providers.",
  inputSchema: listCombosInput,
  outputSchema: listCombosOutput,
  scopes: ["read:combos"],
  auditLevel: "basic",
  phase: 1,
  sourceEndpoints: ["/api/combos", "/api/combos/metrics"],
};

// --- Tool 3: omniroute_get_combo_metrics ---
export const getComboMetricsInput = z.object({
  comboId: z.string().describe("ID of the combo to get metrics for"),
});

export const getComboMetricsOutput = z.object({
  requests: z.number(),
  successRate: z.number(),
  avgLatency: z.number(),
  costTotal: z.number(),
  fallbackCount: z.number(),
  byProvider: z.array(
    z.object({
      provider: z.string(),
      requests: z.number(),
      successRate: z.number(),
      avgLatency: z.number(),
    })
  ),
});

export const getComboMetricsTool: McpToolDefinition<
  typeof getComboMetricsInput,
  typeof getComboMetricsOutput
> = {
  name: "omniroute_get_combo_metrics",
  description:
    "Returns detailed performance metrics for a specific combo including request count, success rate, average latency, total cost, and per-provider breakdowns.",
  inputSchema: getComboMetricsInput,
  outputSchema: getComboMetricsOutput,
  scopes: ["read:combos"],
  auditLevel: "basic",
  phase: 1,
  sourceEndpoints: ["/api/combos/metrics"],
};

// --- Tool 4: omniroute_switch_combo ---
export const switchComboInput = z.object({
  comboId: z.string().describe("ID of the combo to activate/deactivate"),
  active: z.boolean().describe("Whether to enable or disable the combo"),
});

export const switchComboOutput = z.object({
  success: z.boolean(),
  combo: z.object({
    id: z.string(),
    name: z.string(),
    enabled: z.boolean(),
  }),
});

export const switchComboTool: McpToolDefinition<typeof switchComboInput, typeof switchComboOutput> =
  {
    name: "omniroute_switch_combo",
    description:
      "Activates or deactivates a combo. When deactivated, requests will not be routed through this combo. Use to toggle between different routing strategies.",
    inputSchema: switchComboInput,
    outputSchema: switchComboOutput,
    scopes: ["write:combos"],
    auditLevel: "full",
    phase: 1,
    sourceEndpoints: ["/api/combos"],
  };

// --- Tool 5: omniroute_check_quota ---
export const checkQuotaInput = z.object({
  provider: z
    .string()
    .optional()
    .describe(
      "Filter by provider name (e.g., 'claude', 'gemini'). If omitted, returns all providers."
    ),
  connectionId: z.string().optional().describe("Filter by specific connection ID"),
});

export const checkQuotaOutput = z.object({
  providers: z.array(
    z.object({
      name: z.string(),
      provider: z.string(),
      connectionId: z.string(),
      quotaUsed: z.number(),
      quotaTotal: z.number().nullable(),
      percentRemaining: z.number(),
      resetAt: z.string().nullable(),
      tokenStatus: z.enum(["valid", "expiring", "expired", "refreshing"]),
    })
  ),
  meta: z
    .object({
      generatedAt: z.string(),
      filters: z.object({
        provider: z.string().nullable(),
        connectionId: z.string().nullable(),
      }),
      totalProviders: z.number(),
    })
    .optional(),
});

export const checkQuotaTool: McpToolDefinition<typeof checkQuotaInput, typeof checkQuotaOutput> = {
  name: "omniroute_check_quota",
  description:
    "Checks the remaining API quota for one or all providers. Returns quota used/total, percentage remaining, reset time, and token health status.",
  inputSchema: checkQuotaInput,
  outputSchema: checkQuotaOutput,
  scopes: ["read:quota"],
  auditLevel: "basic",
  phase: 1,
  sourceEndpoints: ["/api/usage/quota", "/api/token-health", "/api/rate-limits"],
};

// --- Tool 6: omniroute_route_request ---
export const routeRequestInput = z.object({
  model: z.string().describe("Model identifier (e.g., 'claude-sonnet-4', 'gpt-4o')"),
  messages: z
    .array(
      z.object({
        role: z.string(),
        content: z.string(),
      })
    )
    .describe("Chat messages in OpenAI format"),
  combo: z.string().optional().describe("Specific combo to route through"),
  budget: z.number().optional().describe("Maximum cost in USD for this request"),
  role: z
    .enum(["coding", "review", "planning", "analysis"])
    .optional()
    .describe("Task role hint for intelligent routing"),
  stream: z.boolean().optional().default(false).describe("Whether to stream the response"),
});

export const routeRequestOutput = z.object({
  response: z.object({
    content: z.string(),
    model: z.string(),
    tokens: z.object({
      prompt: z.number(),
      completion: z.number(),
    }),
  }),
  routing: z.object({
    provider: z.string(),
    combo: z.string().nullable(),
    fallbacksTriggered: z.number(),
    cost: z.number(),
    latencyMs: z.number(),
    routingExplanation: z.string(),
  }),
});

export const routeRequestTool: McpToolDefinition<
  typeof routeRequestInput,
  typeof routeRequestOutput
> = {
  name: "omniroute_route_request",
  description:
    "Sends a chat completion request through OmniRoute's intelligent routing pipeline. Supports combo selection, budget limits, and task role hints for optimal provider matching.",
  inputSchema: routeRequestInput,
  outputSchema: routeRequestOutput,
  scopes: ["execute:completions"],
  auditLevel: "full",
  phase: 1,
  sourceEndpoints: ["/v1/chat/completions", "/v1/responses"],
};

// --- Tool 7: omniroute_cost_report ---
export const costReportInput = z.object({
  period: z
    .enum(["session", "day", "week", "month"])
    .optional()
    .default("session")
    .describe("Time period for the cost report"),
});

export const costReportOutput = z.object({
  period: z.string(),
  totalCost: z.number(),
  requestCount: z.number(),
  tokenCount: z.object({
    prompt: z.number(),
    completion: z.number(),
  }),
  byProvider: z.array(
    z.object({
      name: z.string(),
      cost: z.number(),
      requests: z.number(),
    })
  ),
  byModel: z.array(
    z.object({
      model: z.string(),
      cost: z.number(),
      requests: z.number(),
    })
  ),
  budget: z.object({
    limit: z.number().nullable(),
    remaining: z.number().nullable(),
  }),
});

export const costReportTool: McpToolDefinition<typeof costReportInput, typeof costReportOutput> = {
  name: "omniroute_cost_report",
  description:
    "Generates a cost report for the specified period showing total cost, request count, token usage, and breakdowns by provider and model. Also shows budget status if configured.",
  inputSchema: costReportInput,
  outputSchema: costReportOutput,
  scopes: ["read:usage"],
  auditLevel: "basic",
  phase: 1,
  sourceEndpoints: ["/api/usage/analytics", "/api/usage/budget"],
};

// --- Tool 8: omniroute_list_models_catalog ---
export const listModelsCatalogInput = z.object({
  provider: z.string().optional().describe("Filter by provider name"),
  capability: z
    .enum(["chat", "embedding", "image", "audio", "video", "rerank", "moderation"])
    .optional()
    .describe("Filter by model capability"),
});

export const listModelsCatalogOutput = z.object({
  models: z.array(
    z.object({
      id: z.string(),
      provider: z.string(),
      capabilities: z.array(z.string()),
      status: z.enum(["available", "degraded", "unavailable"]),
      pricing: z
        .object({
          inputPerMillion: z.number().nullable(),
          outputPerMillion: z.number().nullable(),
        })
        .optional(),
    })
  ),
});

export const listModelsCatalogTool: McpToolDefinition<
  typeof listModelsCatalogInput,
  typeof listModelsCatalogOutput
> = {
  name: "omniroute_list_models_catalog",
  description:
    "Lists all available AI models across all providers with their capabilities, current status, and pricing information.",
  inputSchema: listModelsCatalogInput,
  outputSchema: listModelsCatalogOutput,
  scopes: ["read:models"],
  auditLevel: "none",
  phase: 1,
  sourceEndpoints: ["/api/models/catalog", "/v1/models"],
};

// --- Tool 9: omniroute_web_search ---
export const webSearchInput = z.object({
  query: z
    .string()
    .min(1, "Query is required")
    .max(500, "Query must be 500 characters or fewer")
    .describe("The search query string"),
  max_results: z
    .number()
    .int()
    .min(1)
    .max(20)
    .default(5)
    .describe("Maximum number of search results to return"),
  search_type: z.enum(["web", "news"]).default("web").describe("Type of search to perform"),
  provider: z
    .enum([
      "serper-search",
      "brave-search",
      "perplexity-search",
      "exa-search",
      "tavily-search",
      "google-pse-search",
      "linkup-search",
      "searchapi-search",
      "searxng-search",
    ])
    .optional()
    .describe("Specific search provider to use"),
});

export const webSearchOutput = z.object({
  id: z.string(),
  provider: z.string(),
  query: z.string(),
  results: z.array(
    z.object({
      title: z.string(),
      url: z.string(),
      display_url: z.string().optional(),
      snippet: z.string(),
      position: z.number().int().positive(),
    })
  ),
  cached: z.boolean(),
  usage: z.object({
    queries_used: z.number().int().min(0),
    search_cost_usd: z.number().min(0),
  }),
});

export const webSearchTool: McpToolDefinition<typeof webSearchInput, typeof webSearchOutput> = {
  name: "omniroute_web_search",
  description:
    "Performs a web search using OmniRoute's search gateway. Supports multiple providers (Serper, Brave, Perplexity, Exa, Tavily, Google PSE, Linkup, SearchAPI, SearXNG) with automatic failover. Returns search results with titles, URLs, snippets, and position data.",
  inputSchema: webSearchInput,
  outputSchema: webSearchOutput,
  scopes: ["execute:search"],
  auditLevel: "basic",
  phase: 1,
  sourceEndpoints: ["/v1/search"],
};

// ============ Phase 2: Advanced Tools (8) ============

// --- Tool 9: omniroute_simulate_route ---
export const simulateRouteInput = z.object({
  model: z.string().describe("Target model for simulation"),
  promptTokenEstimate: z.number().describe("Estimated prompt token count"),
  combo: z.string().optional().describe("Specific combo to simulate (default: active combo)"),
});

export const simulateRouteOutput = z.object({
  simulatedPath: z.array(
    z.object({
      provider: z.string(),
      model: z.string(),
      probability: z.number(),
      estimatedCost: z.number(),
      healthStatus: z.enum(["CLOSED", "OPEN", "HALF_OPEN"]),
      quotaAvailable: z.number(),
    })
  ),
  fallbackTree: z.object({
    primary: z.string(),
    fallbacks: z.array(z.string()),
    worstCaseCost: z.number(),
    bestCaseCost: z.number(),
  }),
});

export const simulateRouteTool: McpToolDefinition<
  typeof simulateRouteInput,
  typeof simulateRouteOutput
> = {
  name: "omniroute_simulate_route",
  description:
    "Simulates (dry-run) the routing path a request would take without actually executing it. Shows the fallback tree, provider probabilities, estimated costs, and health status.",
  inputSchema: simulateRouteInput,
  outputSchema: simulateRouteOutput,
  scopes: ["read:health", "read:combos"],
  auditLevel: "basic",
  phase: 2,
  sourceEndpoints: ["/api/combos", "/api/monitoring/health", "/api/resilience"],
};

// --- Tool 10: omniroute_set_budget_guard ---
export const setBudgetGuardInput = z.object({
  maxCost: z.number().describe("Maximum cost in USD for this session"),
  action: z.enum(["degrade", "block", "alert"]).describe("Action when budget is exceeded"),
  degradeToTier: z
    .enum(["cheap", "free"])
    .optional()
    .describe("If action=degrade, which tier to fall back to"),
});

export const setBudgetGuardOutput = z.object({
  sessionId: z.string(),
  budgetTotal: z.number(),
  budgetSpent: z.number(),
  budgetRemaining: z.number(),
  action: z.string(),
  status: z.enum(["active", "warning", "exceeded"]),
});

export const setBudgetGuardTool: McpToolDefinition<
  typeof setBudgetGuardInput,
  typeof setBudgetGuardOutput
> = {
  name: "omniroute_set_budget_guard",
  description:
    "Sets a budget guard that limits spending for the current session. When the budget is reached, it can degrade to cheaper models, block requests, or send alerts.",
  inputSchema: setBudgetGuardInput,
  outputSchema: setBudgetGuardOutput,
  scopes: ["write:budget"],
  auditLevel: "full",
  phase: 2,
  sourceEndpoints: ["/api/usage/budget"],
};

// --- Tool 11: omniroute_set_routing_strategy ---
export const setRoutingStrategyInput = z.object({
  comboId: z.string().describe("Combo ID or name to update"),
  strategy: z.enum(ROUTING_STRATEGY_VALUES).describe("Routing strategy to apply"),
  autoRoutingStrategy: z
    .enum(AUTO_ROUTING_STRATEGY_VALUES)
    .optional()
    .describe("Optional strategy used by auto mode (only used when strategy='auto')"),
});

export const setRoutingStrategyOutput = z.object({
  success: z.boolean(),
  combo: z.object({
    id: z.string(),
    name: z.string(),
    strategy: z.string(),
    autoRoutingStrategy: z.string().nullable(),
  }),
});

export const setRoutingStrategyTool: McpToolDefinition<
  typeof setRoutingStrategyInput,
  typeof setRoutingStrategyOutput
> = {
  name: "omniroute_set_routing_strategy",
  description:
    "Updates a combo routing strategy (priority/weighted/auto/etc.) at runtime. Supports selecting the sub-strategy used by auto mode (rules/cost/latency).",
  inputSchema: setRoutingStrategyInput,
  outputSchema: setRoutingStrategyOutput,
  scopes: ["write:combos"],
  auditLevel: "full",
  phase: 2,
  sourceEndpoints: ["/api/combos", "/api/combos/{id}"],
};

// --- Tool 12: omniroute_set_resilience_profile ---
export const setResilienceProfileInput = z.object({
  profile: z
    .enum(["aggressive", "balanced", "conservative"])
    .describe("Resilience profile to apply"),
});

export const setResilienceProfileOutput = z.object({
  applied: z.boolean(),
  settings: z.object({
    circuitBreakerThreshold: z.number(),
    retryCount: z.number(),
    timeoutMs: z.number(),
    fallbackDepth: z.number(),
  }),
});

export const setResilienceProfileTool: McpToolDefinition<
  typeof setResilienceProfileInput,
  typeof setResilienceProfileOutput
> = {
  name: "omniroute_set_resilience_profile",
  description:
    "Applies a resilience profile that adjusts circuit breaker thresholds, retry counts, timeouts, and fallback depth. 'aggressive' = fast fail, 'conservative' = max retries.",
  inputSchema: setResilienceProfileInput,
  outputSchema: setResilienceProfileOutput,
  scopes: ["write:resilience"],
  auditLevel: "full",
  phase: 2,
  sourceEndpoints: ["/api/resilience"],
};

// --- Tool 13: omniroute_test_combo ---
export const testComboInput = z.object({
  comboId: z.string().describe("ID of the combo to test"),
  testPrompt: z.string().max(500).describe("Short test prompt (max 500 chars)"),
});

export const testComboOutput = z.object({
  results: z.array(
    z.object({
      provider: z.string(),
      model: z.string(),
      success: z.boolean(),
      latencyMs: z.number(),
      cost: z.number(),
      tokenCount: z.number(),
      error: z.string().optional(),
    })
  ),
  summary: z.object({
    totalProviders: z.number(),
    successful: z.number(),
    fastestProvider: z.string(),
    cheapestProvider: z.string(),
  }),
});

export const testComboTool: McpToolDefinition<typeof testComboInput, typeof testComboOutput> = {
  name: "omniroute_test_combo",
  description:
    "Tests a combo by sending a short test prompt to each provider in the combo and reporting individual results including latency, cost, and success status.",
  inputSchema: testComboInput,
  outputSchema: testComboOutput,
  scopes: ["execute:completions", "read:combos"],
  auditLevel: "full",
  phase: 2,
  sourceEndpoints: ["/api/combos/test", "/v1/chat/completions"],
};

// --- Tool 14: omniroute_get_provider_metrics ---
export const getProviderMetricsInput = z.object({
  provider: z.string().describe("Provider name (e.g., 'claude', 'gemini-cli', 'codex')"),
});

export const getProviderMetricsOutput = z.object({
  provider: z.string(),
  successRate: z.number(),
  requestCount: z.number(),
  avgLatencyMs: z.number(),
  p50LatencyMs: z.number(),
  p95LatencyMs: z.number(),
  p99LatencyMs: z.number(),
  errorRate: z.number(),
  lastError: z
    .object({
      message: z.string(),
      timestamp: z.string(),
    })
    .nullable(),
  circuitBreakerState: z.enum(["CLOSED", "OPEN", "HALF_OPEN"]),
  quotaInfo: z.object({
    used: z.number(),
    total: z.number().nullable(),
    resetAt: z.string().nullable(),
  }),
});

export const getProviderMetricsTool: McpToolDefinition<
  typeof getProviderMetricsInput,
  typeof getProviderMetricsOutput
> = {
  name: "omniroute_get_provider_metrics",
  description:
    "Returns detailed performance metrics for a specific provider including success/error rates, latency percentiles (p50/p95/p99), circuit breaker state, and quota information.",
  inputSchema: getProviderMetricsInput,
  outputSchema: getProviderMetricsOutput,
  scopes: ["read:health"],
  auditLevel: "basic",
  phase: 2,
  sourceEndpoints: ["/api/provider-metrics", "/api/resilience"],
};

// --- Tool 15: omniroute_best_combo_for_task ---
export const bestComboForTaskInput = z.object({
  taskType: z
    .enum(["coding", "review", "planning", "analysis", "debugging", "documentation"])
    .describe("Type of task to find the best combo for"),
  budgetConstraint: z.number().optional().describe("Maximum cost in USD"),
  latencyConstraint: z.number().optional().describe("Maximum acceptable latency in ms"),
});

export const bestComboForTaskOutput = z.object({
  recommendedCombo: z.object({
    id: z.string(),
    name: z.string(),
    reason: z.string(),
  }),
  alternatives: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      tradeoff: z.string(),
    })
  ),
  freeAlternative: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
});

export const bestComboForTaskTool: McpToolDefinition<
  typeof bestComboForTaskInput,
  typeof bestComboForTaskOutput
> = {
  name: "omniroute_best_combo_for_task",
  description:
    "Recommends the best combo for a given task type (coding, review, planning, etc.) considering budget and latency constraints. Also suggests alternatives and free options.",
  inputSchema: bestComboForTaskInput,
  outputSchema: bestComboForTaskOutput,
  scopes: ["read:combos", "read:health"],
  auditLevel: "basic",
  phase: 2,
  sourceEndpoints: ["/api/combos", "/api/combos/metrics", "/api/monitoring/health"],
};

// --- Tool 16: omniroute_explain_route ---
export const explainRouteInput = z.object({
  requestId: z.string().describe("Request ID from the X-Request-Id header"),
});

export const explainRouteOutput = z.object({
  requestId: z.string(),
  decision: z.object({
    comboUsed: z.string(),
    providerSelected: z.string(),
    modelUsed: z.string(),
    score: z.number(),
    factors: z.array(
      z.object({
        name: z.string(),
        value: z.number(),
        weight: z.number(),
        contribution: z.number(),
      })
    ),
    fallbacksTriggered: z.array(
      z.object({
        provider: z.string(),
        reason: z.string(),
      })
    ),
    costActual: z.number(),
    latencyActual: z.number(),
  }),
});

export const explainRouteTool: McpToolDefinition<
  typeof explainRouteInput,
  typeof explainRouteOutput
> = {
  name: "omniroute_explain_route",
  description:
    "Explains why a specific request was routed to a particular provider. Shows the scoring factors, weights, fallbacks triggered, actual cost, and latency.",
  inputSchema: explainRouteInput,
  outputSchema: explainRouteOutput,
  scopes: ["read:health", "read:usage"],
  auditLevel: "basic",
  phase: 2,
  sourceEndpoints: [],
};

// --- Tool 17: omniroute_get_session_snapshot ---
export const getSessionSnapshotInput = z.object({}).describe("No parameters required");

export const getSessionSnapshotOutput = z.object({
  sessionStart: z.string(),
  duration: z.string(),
  requestCount: z.number(),
  costTotal: z.number(),
  tokenCount: z.object({
    prompt: z.number(),
    completion: z.number(),
  }),
  topModels: z.array(
    z.object({
      model: z.string(),
      count: z.number(),
    })
  ),
  topProviders: z.array(
    z.object({
      provider: z.string(),
      count: z.number(),
    })
  ),
  errors: z.number(),
  fallbacks: z.number(),
  budgetGuard: z
    .object({
      active: z.boolean(),
      remaining: z.number(),
    })
    .nullable(),
});

export const getSessionSnapshotTool: McpToolDefinition<
  typeof getSessionSnapshotInput,
  typeof getSessionSnapshotOutput
> = {
  name: "omniroute_get_session_snapshot",
  description:
    "Returns a snapshot of the current working session including duration, request count, total cost, top models/providers used, error count, and budget guard status.",
  inputSchema: getSessionSnapshotInput,
  outputSchema: getSessionSnapshotOutput,
  scopes: ["read:usage"],
  auditLevel: "none",
  phase: 2,
  sourceEndpoints: ["/api/usage/analytics", "/api/telemetry/summary"],
};

// --- Tool 18: omniroute_db_health_check ---
export const dbHealthCheckInput = z.object({
  autoRepair: z
    .boolean()
    .optional()
    .describe("When true, runs the database auto-repair flow before returning the result"),
});

export const dbHealthCheckOutput = z.object({
  isHealthy: z.boolean(),
  issues: z.array(
    z.object({
      type: z.enum([
        "integrity_check_failed",
        "broken_reference",
        "stale_snapshot",
        "invalid_state",
      ]),
      table: z.string(),
      description: z.string(),
      count: z.number(),
    })
  ),
  repairedCount: z.number(),
  backupCreated: z.boolean(),
  autoRepair: z.boolean(),
  checkedAt: z.string(),
});

export const dbHealthCheckTool: McpToolDefinition<
  typeof dbHealthCheckInput,
  typeof dbHealthCheckOutput
> = {
  name: "omniroute_db_health_check",
  description:
    "Diagnoses OmniRoute database drift such as orphan quota/domain rows, invalid JSON state, and broken combo references. Set autoRepair=true to repair those rows before returning the report.",
  inputSchema: dbHealthCheckInput,
  outputSchema: dbHealthCheckOutput,
  scopes: ["read:health", "write:resilience"],
  auditLevel: "full",
  phase: 2,
  sourceEndpoints: ["/api/db/health"],
};

// --- Tool 19: omniroute_sync_pricing ---
export const syncPricingInput = z.object({
  sources: z
    .array(z.string())
    .optional()
    .describe("External pricing sources to sync from (default: ['litellm'])"),
  dryRun: z
    .boolean()
    .optional()
    .describe("If true, preview sync results without saving to database"),
});

export const syncPricingOutput = z.object({
  success: z.boolean(),
  modelCount: z.number(),
  providerCount: z.number(),
  source: z.string(),
  dryRun: z.boolean(),
  error: z.string().optional(),
  warnings: z.array(z.string()).optional(),
  data: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
});

export const syncPricingTool: McpToolDefinition<typeof syncPricingInput, typeof syncPricingOutput> =
  {
    name: "omniroute_sync_pricing",
    description:
      "Syncs pricing data from external sources (LiteLLM) into OmniRoute. Synced pricing fills gaps not covered by hardcoded defaults without overwriting user-set prices. Use dryRun=true to preview.",
    inputSchema: syncPricingInput,
    outputSchema: syncPricingOutput,
    scopes: ["pricing:write"],
    auditLevel: "full",
    phase: 2,
    sourceEndpoints: ["/api/pricing/sync"],
  };

// ============ Cache Tools ============

export const cacheStatsInput = z.object({}).describe("No parameters required");

export const cacheStatsOutput = z.object({
  semanticCache: z.object({
    memoryEntries: z.number(),
    dbEntries: z.number(),
    hits: z.number(),
    misses: z.number(),
    hitRate: z.string(),
    tokensSaved: z.number(),
  }),
  promptCache: z
    .object({
      totalRequests: z.number(),
      requestsWithCacheControl: z.number(),
      totalInputTokens: z.number(),
      totalCachedTokens: z.number(),
      totalCacheCreationTokens: z.number(),
      tokensSaved: z.number(),
      estimatedCostSaved: z.number(),
    })
    .nullable(),
  idempotency: z.object({
    activeKeys: z.number(),
    windowMs: z.number(),
  }),
  config: z
    .object({
      semanticCacheEnabled: z.boolean(),
    })
    .optional(),
});

export const cacheStatsTool: McpToolDefinition<typeof cacheStatsInput, typeof cacheStatsOutput> = {
  name: "omniroute_cache_stats",
  description:
    "Returns cache statistics including semantic cache hit rate, prompt cache metrics by provider, and idempotency layer stats.",
  inputSchema: cacheStatsInput,
  outputSchema: cacheStatsOutput,
  scopes: ["read:cache"],
  auditLevel: "basic",
  phase: 2,
  sourceEndpoints: ["/api/cache"],
};

export const cacheFlushInput = z.object({
  signature: z.string().optional().describe("Specific cache signature to invalidate"),
  model: z.string().optional().describe("Invalidate all entries for a specific model"),
});

export const cacheFlushOutput = z.object({
  ok: z.boolean(),
  invalidated: z.number().optional(),
  scope: z.string().optional(),
});

export const cacheFlushTool: McpToolDefinition<typeof cacheFlushInput, typeof cacheFlushOutput> = {
  name: "omniroute_cache_flush",
  description:
    "Flush cache entries. Provide signature to invalidate a single entry, model to invalidate all entries for a model, or omit both to clear all.",
  inputSchema: cacheFlushInput,
  outputSchema: cacheFlushOutput,
  scopes: ["write:cache"],
  auditLevel: "full",
  phase: 2,
  sourceEndpoints: ["/api/cache"],
};

// ============ Compression Tools ============

export const compressionStatusInput = z.object({}).describe("No parameters required");

export const compressionStatusOutput = z.object({
  enabled: z.boolean(),
  strategy: z.string(),
  settings: z.object({
    maxTokens: z.number(),
    autoTriggerMode: z.string(),
    targetRatio: z.number(),
    preserveSystemPrompt: z.boolean(),
    mcpDescriptionCompressionEnabled: z.boolean(),
  }),
  analytics: z.object({
    totalRequests: z.number(),
    compressedRequests: z.number(),
    tokensSaved: z.number(),
    avgCompressionRatio: z.number(),
    byMode: z.record(
      z.string(),
      z.object({
        count: z.number(),
        tokensSaved: z.number(),
        avgSavingsPct: z.number(),
      })
    ),
    validationFallbacks: z.number(),
    requestsWithReceipts: z.number(),
    realUsage: z.object({
      requestsWithReceipts: z.number(),
      promptTokens: z.number(),
      completionTokens: z.number(),
      totalTokens: z.number(),
      cacheReadTokens: z.number(),
      cacheWriteTokens: z.number(),
      estimatedUsdSaved: z.number(),
      bySource: z.record(z.string(), z.number()),
    }),
    mcpDescriptionCompression: z.object({
      descriptionsCompressed: z.number(),
      charsSaved: z.number(),
      estimatedTokensSaved: z.number(),
    }),
  }),
  cacheStats: z
    .object({
      hits: z.number(),
      misses: z.number(),
      hitRate: z.string(),
      tokensSaved: z.number(),
    })
    .nullable(),
});

export const compressionStatusTool: McpToolDefinition<
  typeof compressionStatusInput,
  typeof compressionStatusOutput
> = {
  name: "omniroute_compression_status",
  description:
    "Returns current compression configuration, strategy, analytics summary (requests compressed, tokens saved, avg ratio), and provider-aware cache statistics.",
  inputSchema: compressionStatusInput,
  outputSchema: compressionStatusOutput,
  scopes: ["read:compression"],
  auditLevel: "basic",
  phase: 2,
  sourceEndpoints: ["/api/compression/status"],
};

export const compressionConfigureInput = z.object({
  enabled: z.boolean().optional(),
  strategy: z
    .enum(["off", "lite", "standard", "aggressive", "ultra", "rtk", "stacked"])
    .optional()
    .describe("Compression mode"),
  autoTriggerMode: z
    .enum(["off", "lite", "standard", "aggressive", "ultra", "rtk", "stacked"])
    .optional(),
  maxTokens: z
    .number()
    .int()
    .min(0)
    .optional()
    .describe("Maximum tokens before compression triggers"),
  targetRatio: z.number().optional().describe("Target compression ratio (0.0–1.0)"),
  preserveSystemPrompt: z.boolean().optional(),
  mcpDescriptionCompressionEnabled: z.boolean().optional(),
});

export const compressionConfigureOutput = z.object({
  success: z.boolean(),
  updated: z.record(z.string(), z.unknown()),
  settings: z.object({
    enabled: z.boolean(),
    strategy: z.string(),
    autoTriggerMode: z.string(),
    maxTokens: z.number(),
    targetRatio: z.number(),
    preserveSystemPrompt: z.boolean(),
    mcpDescriptionCompressionEnabled: z.boolean(),
  }),
});

export const compressionConfigureTool: McpToolDefinition<
  typeof compressionConfigureInput,
  typeof compressionConfigureOutput
> = {
  name: "omniroute_compression_configure",
  description:
    "Configure compression settings at runtime. Supports enabling/disabling compression, changing strategy (off/lite/standard/aggressive/ultra/rtk/stacked), adjusting maxTokens threshold, targetRatio, auto-trigger mode, system prompt preservation, and MCP description compression.",
  inputSchema: compressionConfigureInput,
  outputSchema: compressionConfigureOutput,
  scopes: ["write:compression"],
  auditLevel: "full",
  phase: 2,
  sourceEndpoints: ["/api/compression/configure"],
};

export const setCompressionEngineInput = z.object({
  engine: z.enum(["off", "caveman", "rtk", "stacked"]).optional(),
  cavemanIntensity: z.enum(["lite", "full", "ultra"]).optional(),
  rtkIntensity: z.enum(["minimal", "standard", "aggressive"]).optional(),
  outputMode: z.boolean().optional(),
});

export const setCompressionEngineOutput = z.object({
  success: z.boolean(),
  settings: z.record(z.string(), z.unknown()),
});

export const setCompressionEngineTool: McpToolDefinition<
  typeof setCompressionEngineInput,
  typeof setCompressionEngineOutput
> = {
  name: "omniroute_set_compression_engine",
  description: "Set the active compression engine and Caveman/RTK runtime options.",
  inputSchema: setCompressionEngineInput,
  outputSchema: setCompressionEngineOutput,
  scopes: ["write:compression"],
  auditLevel: "full",
  phase: 2,
  sourceEndpoints: ["/api/settings/compression", "/api/context/rtk/config"],
};

export const listCompressionCombosInput = z.object({});
export const listCompressionCombosOutput = z.object({
  combos: z.array(z.record(z.string(), z.unknown())),
});

export const listCompressionCombosTool: McpToolDefinition<
  typeof listCompressionCombosInput,
  typeof listCompressionCombosOutput
> = {
  name: "omniroute_list_compression_combos",
  description: "List compression combos and their engine pipelines.",
  inputSchema: listCompressionCombosInput,
  outputSchema: listCompressionCombosOutput,
  scopes: ["read:compression"],
  auditLevel: "basic",
  phase: 2,
  sourceEndpoints: ["/api/context/combos"],
};

export const compressionComboStatsInput = z.object({
  comboId: z.string().optional(),
  since: z.enum(["24h", "7d", "30d", "all"]).optional(),
});

export const compressionComboStatsOutput = z.record(z.string(), z.unknown());

export const compressionComboStatsTool: McpToolDefinition<
  typeof compressionComboStatsInput,
  typeof compressionComboStatsOutput
> = {
  name: "omniroute_compression_combo_stats",
  description: "Get compression analytics grouped by engine and compression combo.",
  inputSchema: compressionComboStatsInput,
  outputSchema: compressionComboStatsOutput,
  scopes: ["read:compression"],
  auditLevel: "basic",
  phase: 2,
  sourceEndpoints: ["/api/context/analytics"],
};

// ============ 1proxy Tools ============

export const oneproxyFetchInput = z.object({
  protocol: z.string().optional().describe("Filter by protocol: http, https, socks4, socks5"),
  countryCode: z.string().optional().describe("Filter by country code (e.g. US, DE)"),
  minQuality: z.number().optional().describe("Minimum quality score (0-100)"),
  limit: z.number().optional().describe("Maximum number of proxies to return"),
});

export const oneproxyFetchOutput = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      host: z.string(),
      port: z.number(),
      type: z.string(),
      countryCode: z.string().nullable(),
      qualityScore: z.number().nullable(),
      latencyMs: z.number().nullable(),
      anonymity: z.string().nullable(),
      googleAccess: z.boolean(),
      status: z.string(),
    })
  ),
  total: z.number(),
});

export const oneproxyFetchTool: McpToolDefinition<
  typeof oneproxyFetchInput,
  typeof oneproxyFetchOutput
> = {
  name: "omniroute_oneproxy_fetch",
  description:
    "Fetch free proxies from the 1proxy marketplace with optional filters for protocol, country, and quality. Returns validated proxies with quality scores.",
  inputSchema: oneproxyFetchInput,
  outputSchema: oneproxyFetchOutput,
  scopes: ["read:proxies"],
  auditLevel: "basic",
  phase: 2,
  sourceEndpoints: ["/api/settings/oneproxy"],
};

export const oneproxyRotateInput = z.object({
  strategy: z
    .enum(["random", "quality", "sequential"])
    .optional()
    .describe("Rotation strategy: quality (best first), random, or sequential"),
});

export const oneproxyRotateOutput = z.object({
  id: z.string(),
  host: z.string(),
  port: z.number(),
  type: z.string(),
  countryCode: z.string().nullable(),
  qualityScore: z.number().nullable(),
  latencyMs: z.number().nullable(),
});

export const oneproxyRotateTool: McpToolDefinition<
  typeof oneproxyRotateInput,
  typeof oneproxyRotateOutput
> = {
  name: "omniroute_oneproxy_rotate",
  description:
    "Get the next available free proxy from the 1proxy pool using the specified rotation strategy.",
  inputSchema: oneproxyRotateInput,
  outputSchema: oneproxyRotateOutput,
  scopes: ["read:proxies"],
  auditLevel: "basic",
  phase: 2,
  sourceEndpoints: ["/api/settings/oneproxy/rotate"],
};

export const oneproxyStatsInput = z.object({}).describe("No parameters required");

export const oneproxyStatsOutput = z.object({
  stats: z.object({
    total: z.number(),
    active: z.number(),
    avgQuality: z.number().nullable(),
    lastValidated: z.string().nullable(),
    byProtocol: z.array(z.object({ protocol: z.string(), count: z.number() })),
    byCountry: z.array(z.object({ countryCode: z.string(), count: z.number() })),
  }),
  status: z.object({
    lastSyncSuccess: z.boolean(),
    lastSyncError: z.string().nullable(),
    lastSyncAt: z.string().nullable(),
    lastSyncCount: z.number(),
    consecutiveFailures: z.number(),
  }),
});

export const oneproxyStatsTool: McpToolDefinition<
  typeof oneproxyStatsInput,
  typeof oneproxyStatsOutput
> = {
  name: "omniroute_oneproxy_stats",
  description:
    "Returns 1proxy sync status and statistics: total proxies, average quality, sync history, and distribution by protocol and country.",
  inputSchema: oneproxyStatsInput,
  outputSchema: oneproxyStatsOutput,
  scopes: ["read:proxies"],
  auditLevel: "basic",
  phase: 2,
  sourceEndpoints: ["/api/settings/oneproxy"],
};

// ============ Tool Registry ============

/** All MCP tool definitions, ordered by phase then name */
export const MCP_TOOLS = [
  getHealthTool,
  listCombosTool,
  getComboMetricsTool,
  switchComboTool,
  checkQuotaTool,
  routeRequestTool,
  costReportTool,
  listModelsCatalogTool,
  webSearchTool,
  simulateRouteTool,
  setBudgetGuardTool,
  setRoutingStrategyTool,
  setResilienceProfileTool,
  testComboTool,
  getProviderMetricsTool,
  bestComboForTaskTool,
  explainRouteTool,
  getSessionSnapshotTool,
  dbHealthCheckTool,
  syncPricingTool,
  cacheStatsTool,
  cacheFlushTool,
  compressionStatusTool,
  compressionConfigureTool,
  setCompressionEngineTool,
  listCompressionCombosTool,
  compressionComboStatsTool,
  oneproxyFetchTool,
  oneproxyRotateTool,
  oneproxyStatsTool,
] as const;

/** Essential tools only (Phase 1) */
export const MCP_ESSENTIAL_TOOLS = MCP_TOOLS.filter((t) => t.phase === 1);

/** Advanced tools only (Phase 2) */
export const MCP_ADVANCED_TOOLS = MCP_TOOLS.filter((t) => t.phase === 2);

/** Map of tool name → tool definition */
export const MCP_TOOL_MAP = Object.fromEntries(MCP_TOOLS.map((t) => [t.name, t])) as Record<
  string,
  (typeof MCP_TOOLS)[number]
>;
