/**
 * MCP Server v2 — 2026-07-28 spec-compliant sidecar.
 *
 * Implements the key spec changes that the v1 server (pre-2026 SDK) does not:
 *   - server/discover RPC (replaces implicit initialize handshake)
 *   - resultType field on all results ("complete" | "input_required")
 *   - Cacheable list results (ttlMs + cacheScope)
 *   - _meta extraction (protocolVersion, clientInfo, clientCapabilities)
 *   - outputSchema on tool definitions
 *   - Header-based routing support (Mcp-Method, Mcp-Name)
 *   - MRTR contract shape (inputRequests + requestState)
 *
 * Designed as a parallel surface — the v1 server stays untouched.
 * Both servers can run simultaneously on different transports/ports.
 *
 * Reuses v1's omniRouteFetch, logToolCall, and data extraction helpers.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  getHealthInput,
  getHealthOutput,
  listCombosInput,
  listCombosOutput,
  getComboMetricsInput,
  getComboMetricsOutput,
  switchComboInput,
  switchComboOutput,
  createComboInput,
  createComboOutput,
  checkQuotaInput,
  checkQuotaOutput,
  routeRequestInput,
  routeRequestOutput,
  costReportInput,
  costReportOutput,
} from "../schemas/tools.ts";
import {
  getHealthTool,
  listCombosTool,
  getComboMetricsTool,
  switchComboTool,
  createComboTool,
  checkQuotaTool,
  routeRequestTool,
  costReportTool,
} from "../schemas/tools.ts";
import { omniRouteFetch, toRecord, toArray, toString, toNumber } from "../server.ts";
import { logToolCall } from "../audit.ts";
import { normalizeQuotaResponse } from "../../../src/shared/contracts/quota.ts";

// Re-export types
export type { TextToolResult } from "../toolResult.ts";

// ============================================================================
// Constants
// ============================================================================

const PROTOCOL_VERSION = "2026-07-28";
const SERVER_NAME = "omniroute";
const SERVER_VERSION = process.env.npm_package_version || "3.8.51";

// Cache TTLs per resource type (milliseconds)
const CACHE_TTL = {
  tools: 30_000, // 30s — tool list changes rarely
  combos: 15_000, // 15s — combos change more frequently
  health: 5_000, // 5s — health is ephemeral
  quota: 10_000, // 10s — quota changes with usage
  models: 300_000, // 5min — model catalog is very stable
} as const;

// ============================================================================
// Result wrapping
// ============================================================================

/**
 * Wraps a tool result with the spec-required resultType field.
 * All v2 tool results carry resultType: "complete".
 */
export function withResultType<T extends Record<string, unknown>>(
  result: T
): T & { resultType: "complete" } {
  return { ...result, resultType: "complete" as const };
}

/**
 * Adds caching hints to list responses.
 * tools/list, resources/list, prompts/list MUST include ttlMs + cacheScope.
 */
export function withCacheHints<T extends Record<string, unknown>>(
  result: T,
  ttlMs: number,
  cacheScope: "public" | "private" = "public"
): T & { ttlMs: number; cacheScope: "public" | "private" } {
  return { ...result, ttlMs, cacheScope };
}

// ============================================================================
// _meta extraction
// ============================================================================

export interface ClientMeta {
  protocolVersion?: string;
  clientInfo?: { name?: string; version?: string };
  clientCapabilities?: Record<string, unknown>;
}

/**
 * Extracts _meta fields from a request params object.
 * The 2026-07-28 spec requires every request to carry these in _meta.
 */
export function extractMeta(params: Record<string, unknown> | undefined): ClientMeta {
  const meta = (params as Record<string, unknown> | undefined)?._meta as
    Record<string, unknown> | undefined;
  if (!meta || typeof meta !== "object") return {};

  const result: ClientMeta = {};

  const pv = meta["io.modelcontextprotocol/protocolVersion"];
  if (typeof pv === "string") result.protocolVersion = pv;

  const ci = meta["io.modelcontextprotocol/clientInfo"];
  if (ci && typeof ci === "object") {
    const info = ci as Record<string, unknown>;
    result.clientInfo = {
      name: typeof info.name === "string" ? info.name : undefined,
      version: typeof info.version === "string" ? info.version : undefined,
    };
  }

  const caps = meta["io.modelcontextprotocol/clientCapabilities"];
  if (caps && typeof caps === "object") {
    result.clientCapabilities = caps as Record<string, unknown>;
  }

  return result;
}

// ============================================================================
// server/discover response
// ============================================================================

export interface DiscoverResult {
  name: string;
  version: string;
  protocolVersion: "2026-07-28";
  capabilities: {
    tools: { listChanged: boolean };
    resources: { listChanged: boolean };
    prompts: { listChanged: boolean };
  };
  toolsCount: number;
  features: string[];
}

/**
 * Builds the server/discover response.
 * This is the replacement for the implicit initialize handshake.
 */
export function buildDiscoverResult(toolCount: number): DiscoverResult {
  return {
    name: SERVER_NAME,
    version: SERVER_VERSION,
    protocolVersion: PROTOCOL_VERSION,
    capabilities: {
      tools: { listChanged: true },
      resources: { listChanged: true },
      prompts: { listChanged: true },
    },
    toolsCount: toolCount,
    features: [
      "tools/list",
      "tools/call",
      "server/discover",
      "cacheable-lists",
      "output-schema",
      "header-routing",
    ],
  };
}

// ============================================================================
// Tool definitions with outputSchema
// ============================================================================

/**
 * v2 tool definition that includes outputSchema per 2026-07-28 spec.
 * The v1 server registers tools without outputSchema; v2 adds it.
 */
export interface V2ToolDefinition {
  name: string;
  description: string;
  inputSchema: unknown;
  outputSchema?: unknown;
  scopes: readonly string[];
  cacheTtlMs?: number;
}

const V2_TOOLS: V2ToolDefinition[] = [
  {
    ...getHealthTool,
    outputSchema: getHealthOutput,
    cacheTtlMs: CACHE_TTL.health,
  },
  {
    ...listCombosTool,
    outputSchema: listCombosOutput,
    cacheTtlMs: CACHE_TTL.combos,
  },
  {
    ...getComboMetricsTool,
    outputSchema: getComboMetricsOutput,
  },
  {
    ...switchComboTool,
    outputSchema: switchComboOutput,
  },
  {
    ...createComboTool,
    outputSchema: createComboOutput,
  },
  {
    ...checkQuotaTool,
    outputSchema: checkQuotaOutput,
    cacheTtlMs: CACHE_TTL.quota,
  },
  {
    ...routeRequestTool,
    outputSchema: routeRequestOutput,
  },
  {
    ...costReportTool,
    outputSchema: costReportOutput,
  },
];

// ============================================================================
// Input Required (MRTR) support
// ============================================================================

/**
 * Builds an InputRequiredResult per the MRTR pattern.
 * 2026-07-28 replaces server-initiated requests with this contract.
 */
export function buildInputRequiredResult(
  inputRequests: Record<string, { method: string; params: Record<string, unknown> }>,
  requestState?: string
): { resultType: "input_required"; inputRequests: typeof inputRequests; requestState?: string } {
  return {
    resultType: "input_required",
    inputRequests,
    ...(requestState ? { requestState } : {}),
  };
}

// ============================================================================
// v2 Server Factory
// ============================================================================

export interface McpServerV2 {
  server: McpServer;
  discover: () => DiscoverResult;
  getRegisteredToolCount: () => number;
  handleListTools: (cacheScope?: "public" | "private") => Record<string, unknown>;
}

/**
 * Creates a spec-compliant MCP v2 server.
 * Wraps the existing MCP SDK's McpServer to add 2026-07-28 features.
 */
export function createMcpServerV2(): McpServerV2 {
  const server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION,
  });

  // Register tools with outputSchema (v2 feature)
  for (const tool of V2_TOOLS) {
    server.registerTool(
      tool.name,
      {
        description: tool.description,
        // @ts-ignore: dynamic zod access
        inputSchema: tool.inputSchema,
        // outputSchema is the v2 addition — v1 omitted it
        ...(tool.outputSchema ? { outputSchema: tool.outputSchema } : {}),
      },
      // @ts-ignore: handler wrapping
      async (args: Record<string, unknown>) => {
        const params = args as Record<string, unknown>;
        const meta = extractMeta(params);

        // In production, meta would be used for auth/auditing.
        // For now, we extract it to prove the contract.

        // Dispatch to the appropriate handler based on tool name
        // Each handler returns content; we wrap with resultType
        const handler = TOOL_HANDLERS[tool.name];
        if (!handler) {
          return {
            content: [{ type: "text" as const, text: `Error: No handler for ${tool.name}` }],
            isError: true,
          };
        }

        const result = await handler(args);
        return {
          ...result,
          // resultType is added by the list-level wrapper, not per-tool
        };
      }
    );
  }

  const discover = () => buildDiscoverResult(V2_TOOLS.length);

  const getRegisteredToolCount = () => V2_TOOLS.length;

  const handleListTools = (cacheScope: "public" | "private" = "public") => {
    const tools = V2_TOOLS.map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema,
      ...(t.outputSchema ? { outputSchema: t.outputSchema } : {}),
    }));

    return withCacheHints(withResultType({ tools }), CACHE_TTL.tools, cacheScope);
  };

  return {
    server,
    discover,
    getRegisteredToolCount,
    handleListTools,
  };
}

// ============================================================================
// Tool handlers — wired to real OmniRoute API via omniRouteFetch
// Reuses v1's data extraction helpers (toRecord, toArray, toString, toNumber)
// ============================================================================

async function handleGetHealth() {
  const start = Date.now();
  try {
    const [healthRaw, resilienceRaw, rateLimitsRaw] = await Promise.allSettled([
      omniRouteFetch("/api/monitoring/health"),
      omniRouteFetch("/api/resilience"),
      omniRouteFetch("/api/rate-limits"),
    ]);

    const health =
      healthRaw.status === "fulfilled" ? toRecord(healthRaw.value as Record<string, unknown>) : {};
    const resilience =
      resilienceRaw.status === "fulfilled"
        ? toRecord(resilienceRaw.value as Record<string, unknown>)
        : {};
    const rateLimits =
      rateLimitsRaw.status === "fulfilled"
        ? toRecord(rateLimitsRaw.value as Record<string, unknown>)
        : {};
    const memoryUsageRaw = toRecord(health.memoryUsage);
    const resilienceCircuitBreakers = toArray(resilience.circuitBreakers);
    const rateLimitEntries = toArray(rateLimits.limits);

    const result = withResultType({
      uptime: toString(health.uptime, "unknown"),
      version: toString(health.version, SERVER_VERSION),
      memoryUsage: {
        heapUsed: toNumber(memoryUsageRaw.heapUsed, 0),
        heapTotal: toNumber(memoryUsageRaw.heapTotal, 0),
      },
      circuitBreakers: resilienceCircuitBreakers,
      rateLimits: rateLimitEntries,
    });

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
    let metrics: Record<string, unknown> = {};
    if (args.includeMetrics) {
      metrics = toRecord(await omniRouteFetch("/api/combos/metrics").catch(() => ({})));
    }

    const result = withResultType({
      combos: toArray(combos).map((rawCombo) => {
        const combo = toRecord(rawCombo);
        const comboData = toRecord(combo.data);
        const comboId = toString(combo.id, "");
        const modelsSource =
          Array.isArray(combo.models) && combo.models.length > 0 ? combo.models : comboData.models;
        return {
          id: comboId,
          name: toString(combo.name, comboId || "unnamed"),
          strategy: toString(combo.strategy, toString(comboData.strategy, "priority")),
          enabled: combo.enabled !== false,
          ...(args.includeMetrics ? { metrics: metrics[comboId] ?? null } : {}),
        };
      }),
    });

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
    const result = withResultType(
      await omniRouteFetch(`/api/combos/metrics?comboId=${encodeURIComponent(args.comboId)}`)
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
    const result = withResultType(
      await omniRouteFetch(`/api/combos/${encodeURIComponent(args.comboId)}`, {
        method: "PUT",
        body: JSON.stringify({ isActive: args.active }),
      })
    );
    await logToolCall("omniroute_switch_combo", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_switch_combo", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

async function handleCreateCombo(args: {
  name: string;
  description?: string;
  strategy?: string;
  models: { provider: string; model: string }[];
}) {
  const start = Date.now();
  try {
    const result = withResultType(
      await omniRouteFetch("/api/combos", {
        method: "POST",
        body: JSON.stringify(args),
      })
    );
    await logToolCall("omniroute_create_combo", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_create_combo", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

async function handleCheckQuota(args: { provider?: string; connectionId?: string }) {
  const start = Date.now();
  try {
    let path = "/api/usage/quota";
    if (args.connectionId) path += `?connectionId=${encodeURIComponent(args.connectionId)}`;
    else if (args.provider) path += `?provider=${encodeURIComponent(args.provider)}`;

    const result = withResultType(
      normalizeQuotaResponse(await omniRouteFetch(path), {
        provider: args.provider || null,
        connectionId: args.connectionId || null,
      })
    );

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
      stream: false,
    };
    if (args.combo) {
      body["x-combo"] = args.combo;
    }

    const raw = toRecord(
      await omniRouteFetch("/v1/chat/completions", {
        method: "POST",
        body: JSON.stringify(body),
      })
    );
    const choices = toArray(raw.choices);
    const firstChoice = toRecord(choices[0]);
    const firstMessage = toRecord(firstChoice.message);
    const usage = toRecord(raw.usage);

    const result = withResultType({
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
    });

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
    const range = rangeMap[period] || "1d";

    const raw = toRecord(
      await omniRouteFetch(`/api/costs/report?range=${encodeURIComponent(range)}`)
    );

    const result = withResultType({
      period,
      totalCost: toNumber(raw.totalCost, 0),
      requestCount: toNumber(raw.requestCount, 0),
      tokenCount: {
        prompt: toNumber(raw?.tokenCount?.prompt, 0),
        completion: toNumber(raw?.tokenCount?.completion, 0),
      },
      byProvider: toArray(raw.byProvider),
      byModel: toArray(raw.byModel),
    });

    await logToolCall("omniroute_cost_report", args, result, Date.now() - start, true);
    return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await logToolCall("omniroute_cost_report", args, null, Date.now() - start, false, msg);
    return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
  }
}

const TOOL_HANDLERS: Record<
  string,
  (
    args: Record<string, unknown>
  ) => Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }>
> = {
  omniroute_get_health: handleGetHealth,
  omniroute_list_combos: (args) => handleListCombos(toRecord(args) as { includeMetrics?: boolean }),
  omniroute_get_combo_metrics: (args) =>
    handleGetComboMetrics(toRecord(args) as { comboId: string }),
  omniroute_switch_combo: (args) =>
    handleSwitchCombo(toRecord(args) as { comboId: string; active: boolean }),
  omniroute_create_combo: (args) =>
    handleCreateCombo(
      toRecord(args) as { name: string; models: { provider: string; model: string }[] }
    ),
  omniroute_check_quota: (args) =>
    handleCheckQuota(toRecord(args) as { provider?: string; connectionId?: string }),
  omniroute_route_request: (args) =>
    handleRouteRequest(
      toRecord(args) as { model: string; messages: { role: string; content: string }[] }
    ),
  omniroute_cost_report: (args) => handleCostReport(toRecord(args) as { period?: string }),
};

// ============================================================================
// Header-based routing helpers
// ============================================================================

/**
 * Extracts MCP routing headers from an HTTP request.
 * 2026-07-28 spec: Streamable HTTP MUST include Mcp-Method and Mcp-Name.
 */
export function extractMcpHeaders(headers: Record<string, string | string[] | undefined>): {
  method?: string;
  name?: string;
  protocolVersion?: string;
} {
  const result: { method?: string; name?: string; protocolVersion?: string } = {};

  const method = headers["mcp-method"] ?? headers["Mcp-Method"];
  if (typeof method === "string") result.method = method;
  else if (Array.isArray(method) && method.length > 0) result.method = method[0];

  const name = headers["mcp-name"] ?? headers["Mcp-Name"];
  if (typeof name === "string") result.name = name;
  else if (Array.isArray(name) && name.length > 0) result.name = name[0];

  const pv = headers["mcp-protocol-version"] ?? headers["MCP-Protocol-Version"];
  if (typeof pv === "string") result.protocolVersion = pv;
  else if (Array.isArray(pv) && pv.length > 0) result.protocolVersion = pv[0];

  return result;
}

/**
 * Routes an HTTP request based on MCP headers.
 * Returns the handler key or null if routing fails.
 */
export function routeByHeaders(headers: Record<string, string | string[] | undefined>): {
  routed: boolean;
  method?: string;
  name?: string;
  protocolVersion?: string;
} {
  const extracted = extractMcpHeaders(headers);
  return {
    routed: !!(extracted.method && extracted.name),
    ...extracted,
  };
}

export { CACHE_TTL, PROTOCOL_VERSION, SERVER_VERSION, SERVER_NAME };
