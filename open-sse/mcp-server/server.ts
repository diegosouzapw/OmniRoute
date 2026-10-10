import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { APP_CONFIG } from "@/shared/constants/appConfig";
import { registerToolSearchTool } from "./toolSearch/register.ts";
import {
  MCP_TOOLS,
  getHealthInput,
  listCombosInput,
  getComboMetricsInput,
  switchComboInput,
  createComboInput,
  checkQuotaInput,
  routeRequestInput,
  costReportInput,
  listModelsCatalogInput,
  buildWebSearchInputSchema,
  xSearchInput,
  webFetchInput,
  simulateRouteInput,
  setBudgetGuardInput,
  setRoutingStrategyInput,
  setResilienceProfileInput,
  testComboInput,
  getProviderMetricsInput,
  bestComboForTaskInput,
  explainRouteInput,
  pickFastestModelInput,
  getSessionSnapshotInput,
  dbHealthCheckInput,
  syncPricingInput,
  cacheStatsInput,
  cacheFlushInput,
  oneproxyFetchInput,
  oneproxyRotateInput,
  oneproxyStatsInput,
} from "./schemas/tools.ts";
import { startMcpHeartbeat } from "./runtimeHeartbeat.ts";
import { countUniqueMcpTools } from "./toolCount.ts";
import { z } from "zod";
import { closeAuditDb, logToolCall } from "./audit.ts";
import { withJevToolGuard } from "./jevGuard.ts";
import {
  buildScopeDenialMessage,
  evaluateToolScopes,
  resolveCallerScopeContext,
  shouldForceScopeEnforcement,
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
  handleDbHealthCheck,
  handleSyncPricing,
  handleCacheStats,
  handleCacheFlush,
  handleOneproxyFetch,
  handleOneproxyRotate,
  handleOneproxyStats,
} from "./tools/advancedTools.ts";
import { handlePickFastestModel } from "./tools/pickFastestModel.ts";
// #15159 M-01 — "file = register + wrap. handle* -> tools/canonical/*.ts".
// These twelve handlers used to be defined inline below `withScopeEnforcement`,
// which made this file a 784-line registration-and-implementation mix. They are
// unchanged in behaviour; they just live where the other thirteen tool modules
// already live. `coercions.ts` holds the helpers both sides need, so neither
// direction imports the other and graph cycles 193/194 stay closed (M-06).
import {
  handleCheckQuota,
  handleCreateCombo,
  handleGetComboMetrics,
  handleGetHealth,
  handleListCombos,
  handleSwitchCombo,
} from "./tools/opsTools.ts";
import {
  handleCostReport,
  handleListModelsCatalog,
  handleRouteRequest,
} from "./tools/inferenceTools.ts";
import { handleWebFetch, handleWebSearch, handleXSearch } from "./tools/webTools.ts";
import { toRecord } from "./coercions.ts";
import { memoryTools } from "./tools/memoryTools.ts";
import { skillTools } from "./tools/skillTools.ts";
import { agentSkillTools } from "./tools/agentSkillTools.ts";
import { githubSkillTools } from "./tools/githubSkillTools.ts";
import { skillRegistry } from "../../src/lib/skills/registry.ts";
import { skillExecutor } from "../../src/lib/skills/executor.ts";
import { pluginTools } from "./tools/pluginTools.ts";
import { compressionTools } from "./tools/compressionTools.ts";
import { poolTools } from "./tools/poolTools.ts";
import { gamificationTools } from "./tools/gamificationTools.ts";
import { notionTools } from "./tools/notionTools.ts";
import { obsidianTools } from "./tools/obsidianTools.ts";
import { localCorpusTools } from "./tools/localCorpusTools.ts";
import { compressMcpRegistryMetadata } from "./descriptionCompressor.ts";
import { reduceToolManifest, readMcpToolProfileFromEnv } from "./toolCardinality.ts";
import { smartFilterText } from "../services/compression/engines/mcpAccessibility/index.ts";
import {
  DEFAULT_MCP_ACCESSIBILITY_CONFIG,
  clampMcpAccessibilityConfig,
  type McpAccessibilityConfig,
} from "../services/compression/engines/mcpAccessibility/constants.ts";
import { getDbInstance, ensureDbInitialized } from "../../src/lib/db/core.ts";
import { isMcpScopeEnforcementEnabled } from "../../src/shared/utils/featureFlags.ts";
import { toSafeMcpErrorMessage } from "./errorMessage.ts";
import { registerRadarCatalogTool } from "./radarCatalog.ts";
import type { TextToolResult } from "./toolResult.ts";
export { getMcpModelsCatalog } from "./catalog.ts";

const MCP_ALLOWED_SCOPES = new Set(
  (process.env.OMNIROUTE_MCP_SCOPES || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
);
const TOTAL_MCP_TOOL_COUNT = countUniqueMcpTools({
  MCP_TOOLS,
  memoryTools,
  skillTools,
  agentSkillTools,
  githubSkillTools,
  poolTools,
  gamificationTools,
  pluginTools,
  notionTools,
  obsidianTools,
  localCorpusTools,
  compressionTools,
});

function readMcpDescriptionCompressionEnabled(): boolean {
  try {
    const row = getDbInstance()
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get("compression", "mcpDescriptionCompressionEnabled") as { value?: string } | undefined;
    if (!row?.value) return true;
    return JSON.parse(row.value) !== false;
  } catch {
    return true;
  }
}

function readMcpAccessibilityConfig(): McpAccessibilityConfig {
  try {
    const row = getDbInstance()
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get("compression", "mcpAccessibility") as { value?: string } | undefined;
    if (!row?.value) return { ...DEFAULT_MCP_ACCESSIBILITY_CONFIG };
    // clampMcpAccessibilityConfig bounds every field (and folds in the non-object guard), so a
    // persisted out-of-range maxTextChars can't make smartFilterText truncate the whole text.
    return clampMcpAccessibilityConfig(JSON.parse(row.value));
  } catch {
    return { ...DEFAULT_MCP_ACCESSIBILITY_CONFIG };
  }
}

// #15159 M-01: toRecord / toArray / toString / toFiniteNumber / isLaneFlagOn /
// toUptimeString / normalizeComboModels moved to `./coercions.ts`. They are pure
// and import nothing, so both this file and the extracted `tools/*` modules can
// depend on them without either depending on the other — which is what keeps
// the `server.ts -> tools/*` edge one-directional. `toRecord` is still used here,
// by `withScopeEnforcement` below; the rest are imported only by the handlers.
/**
 * Re-exported rather than defined here, and imported (not just re-exported) because the
 * tool handlers below call it by name — a bare `export … from` creates no local binding.
 *
 * #15159 M-06: the hop moved to its own leaf module so that `catalog.ts` and
 * `radarCatalog.ts` can import it directly instead of reaching back into this file
 * through `import("./server.ts")`, which closed two cycles in the dependency graph.
 */
import { omniRouteFetch } from "./internalFetch.ts";

export { omniRouteFetch };

function withScopeEnforcement(
  toolName: string,
  handler: (args: unknown, extra?: McpToolExtraLike) => Promise<TextToolResult>,
  toolScopes?: readonly string[]
) {
  return async (args: unknown, extra?: McpToolExtraLike): Promise<TextToolResult> => {
    const scopeContext = resolveCallerScopeContext(extra, Array.from(MCP_ALLOWED_SCOPES));
    const scopeCheck = evaluateToolScopes(
      toolName,
      scopeContext.scopes,
      isMcpScopeEnforcementEnabled() || shouldForceScopeEnforcement(scopeContext),
      toolScopes
    );
    if (!scopeCheck.allowed) {
      const reason = scopeCheck.reason || "scope_check_failed";
      // S-04 (#15159): no Caller=/source= here — see buildScopeDenialMessage. The
      // identity is still recorded in the _scopeCheck audit payload below, which is
      // where an operator needs it.
      const msg = buildScopeDenialMessage(toolName, scopeCheck.missing);
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

export interface CreateMcpServerOptions {
  blockedProviders?: string[] | (() => string[]);
}

export function createMcpServer(options?: CreateMcpServerOptions): McpServer {
  const resolveBlockedProviders = (): string[] => {
    if (typeof options?.blockedProviders === "function") {
      return options.blockedProviders();
    }
    if (Array.isArray(options?.blockedProviders)) {
      return options.blockedProviders;
    }
    return [];
  };

  const blockedProviders = resolveBlockedProviders();
  const dynamicWebSearchInput = buildWebSearchInputSchema(blockedProviders);

  const server = new McpServer({
    name: "omniroute",
    version: APP_CONFIG.version,
  });
  const mcpDescriptionCompressionEnabled = readMcpDescriptionCompressionEnabled();
  const mcpAccessibilityConfig = readMcpAccessibilityConfig();
  // F4.3 tool-cardinality: opt-in tool profile (MCP_TOOL_DENY / MCP_TOOL_ALLOW). null = no filter.
  const toolProfile = readMcpToolProfileFromEnv(process.env);
  const registerTool = server.registerTool.bind(server);
  server.registerTool = ((name: string, config: Record<string, unknown>, handler: unknown) => {
    const metadata = compressMcpRegistryMetadata(config, {
      enabled: mcpDescriptionCompressionEnabled,
    });
    const filteredHandler = mcpAccessibilityConfig.enabled
      ? async (args: unknown, extra?: unknown) => {
          const result = await (handler as (a: unknown, e?: unknown) => Promise<TextToolResult>)(
            args,
            extra
          );
          if (Array.isArray(result?.content)) {
            for (const block of result.content) {
              if (block && block.type === "text" && typeof block.text === "string") {
                block.text = smartFilterText(block.text, mcpAccessibilityConfig);
              }
            }
          }
          return result;
        }
      : handler;
    const guardedHandler = withJevToolGuard(name, filteredHandler as never);
    const registered = registerTool(name, metadata, guardedHandler as never);
    if (toolProfile && reduceToolManifest([{ name, scopes: [] }], toolProfile).length === 0) {
      // Denied by the cardinality profile: keep the registration valid but disable it so the tool
      // is not announced in tools/list (token savings). The default profile never reaches here.
      const disablable = registered as unknown as { disable?: () => void };
      if (typeof disablable?.disable === "function") disablable.disable();
    }
    return registered;
  }) as typeof server.registerTool;
  const registerPrompt = server.registerPrompt.bind(server);
  server.registerPrompt = ((name: string, config: Record<string, unknown>, handler: unknown) => {
    const metadata = compressMcpRegistryMetadata(config, {
      enabled: mcpDescriptionCompressionEnabled,
    });
    return registerPrompt(name, metadata as never, handler as never);
  }) as typeof server.registerPrompt;
  const registerResource = server.registerResource.bind(server);
  server.registerResource = ((
    name: string,
    uriOrTemplate: unknown,
    config: Record<string, unknown>,
    readCallback: unknown
  ) => {
    const metadata = compressMcpRegistryMetadata(config, {
      enabled: mcpDescriptionCompressionEnabled,
    });
    return registerResource(name, uriOrTemplate as never, metadata as never, readCallback as never);
  }) as typeof server.registerResource;

  const RESERVED_MCP_NAMES = new Set([
    ...MCP_TOOLS.map((t) => t.name),
    ...Object.keys(memoryTools),
    ...Object.keys(skillTools),
    ...Object.keys(compressionTools),
    ...Object.keys(poolTools),
    ...pluginTools.map((t) => t.name),
    ...gamificationTools.map((t) => t.name),
    ...obsidianTools.map((t) => t.name),
    ...notionTools.map((t) => t.name),
    ...localCorpusTools.map((t) => t.name),
  ]);

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
    "omniroute_create_combo",
    {
      description: "Registers a new combo (model chain) with name, models, and strategy",
      inputSchema: createComboInput,
    },
    withScopeEnforcement("omniroute_create_combo", (args) =>
      handleCreateCombo(createComboInput.parse(args))
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

  registerRadarCatalogTool(server, withScopeEnforcement);

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
    "omniroute_pick_fastest_model",
    {
      description: "Picks the fastest reliable provider-model pair from live telemetry.",
      inputSchema: pickFastestModelInput,
    },
    withScopeEnforcement("omniroute_pick_fastest_model", (args) =>
      handlePickFastestModel(pickFastestModelInput.parse(args))
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
    "omniroute_db_health_check",
    {
      description:
        "Diagnoses or repairs OmniRoute database drift, including broken combo references and orphan quota/domain rows",
      inputSchema: dbHealthCheckInput,
    },
    withScopeEnforcement("omniroute_db_health_check", (args) =>
      handleDbHealthCheck(dbHealthCheckInput.parse(args ?? {}))
    )
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

  server.registerTool(
    "omniroute_web_search",
    {
      description:
        "Performs a web search using OmniRoute's search gateway. Supports multiple providers (Serper, Brave, Perplexity, Exa, Tavily) with automatic failover. Returns search results with titles, URLs, snippets, and position data.",
      inputSchema: dynamicWebSearchInput,
    },
    withScopeEnforcement("omniroute_web_search", (args) =>
      // Resolve per invocation (not the startup snapshot above) so a resolver
      // function passed via CreateMcpServerOptions sees policy changes without
      // a server rebuild. The advertised inputSchema stays a creation-time
      // snapshot — MCP clients fetch it once at tools/list.
      handleWebSearch(buildWebSearchInputSchema(resolveBlockedProviders()).parse(args))
    )
  );

  server.registerTool(
    "omniroute_x_search",
    {
      description:
        "Search X (Twitter) through OmniRoute using SuperGrok / xAI server-side x_search. Requires xai-oauth or an xAI API key. Not web search.",
      inputSchema: xSearchInput,
    },
    withScopeEnforcement("omniroute_x_search", (args) => handleXSearch(xSearchInput.parse(args)))
  );

  server.registerTool(
    "omniroute_web_fetch",
    {
      description:
        "Fetches and extracts content from a URL using OmniRoute's web fetch gateway. Supports multiple providers (Firecrawl, Jina Reader, Tavily) with automatic failover. Returns the page content as markdown, HTML, links, or screenshot, along with metadata.",
      inputSchema: webFetchInput,
    },
    withScopeEnforcement("omniroute_web_fetch", (args) => handleWebFetch(webFetchInput.parse(args)))
  );

  server.registerTool(
    "omniroute_cache_stats",
    {
      description:
        "Returns cache statistics including semantic cache hit rate, prompt cache metrics by provider, and idempotency layer stats.",
      inputSchema: cacheStatsInput,
    },
    withScopeEnforcement("omniroute_cache_stats", () => handleCacheStats())
  );

  server.registerTool(
    "omniroute_cache_flush",
    {
      description:
        "Flush cache entries. Provide signature to invalidate a single entry, model to invalidate all entries for a model, or omit both to clear all.",
      inputSchema: cacheFlushInput,
    },
    withScopeEnforcement("omniroute_cache_flush", (args) =>
      handleCacheFlush(cacheFlushInput.parse(args))
    )
  );

  server.registerTool(
    "omniroute_oneproxy_fetch",
    {
      description:
        "Fetch free proxies from the 1proxy marketplace with optional filters for protocol, country, and quality. Returns validated proxies with quality scores.",
      inputSchema: oneproxyFetchInput,
    },
    withScopeEnforcement("omniroute_oneproxy_fetch", (args) =>
      handleOneproxyFetch(oneproxyFetchInput.parse(args))
    )
  );

  server.registerTool(
    "omniroute_oneproxy_rotate",
    {
      description:
        "Get the next available free proxy from the 1proxy pool using the specified rotation strategy.",
      inputSchema: oneproxyRotateInput,
    },
    withScopeEnforcement("omniroute_oneproxy_rotate", (args) =>
      handleOneproxyRotate(oneproxyRotateInput.parse(args))
    )
  );

  server.registerTool(
    "omniroute_oneproxy_stats",
    {
      description:
        "Returns 1proxy sync status and statistics: total proxies, average quality, sync history, and distribution by protocol and country.",
      inputSchema: oneproxyStatsInput,
    },
    withScopeEnforcement("omniroute_oneproxy_stats", (args) =>
      handleOneproxyStats(oneproxyStatsInput.parse(args))
    )
  );

  registerToolSearchTool(server, withScopeEnforcement);

  // ── Memory Tools ──────────────────────────────
  Object.values(memoryTools).forEach((toolDef: any) => {
    server.registerTool(
      toolDef.name,
      {
        description: toolDef.description,
        // @ts-ignore: dynamic zod access
        inputSchema: toolDef.inputSchema,
      },
      withScopeEnforcement(
        toolDef.name,
        async (args, extra) => {
          try {
            const parsedArgs = toolDef.inputSchema.parse(args ?? {});
            // @ts-ignore - handler type lost through dynamic Object.values() access
            const result = await toolDef.handler(parsedArgs, extra);
            return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
          } catch (err) {
            const msg = toSafeMcpErrorMessage(err, "Memory tool execution failed");
            return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
          }
        },
        toolDef.scopes
      )
    );
  });

  // ── Skill Tools ──────────────────────────────
  Object.values(skillTools).forEach((toolDef: any) => {
    server.registerTool(
      toolDef.name,
      {
        description: toolDef.description,
        // @ts-ignore: dynamic zod access
        inputSchema: toolDef.inputSchema,
      },
      withScopeEnforcement(
        toolDef.name,
        async (args, extra) => {
          try {
            const parsedArgs = toolDef.inputSchema.parse(args ?? {});
            // @ts-ignore - handler type lost through dynamic Object.values() access
            const result = await toolDef.handler(parsedArgs, extra);
            return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
          } catch (err) {
            const msg = toSafeMcpErrorMessage(err, "Skill tool execution failed");
            return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
          }
        },
        toolDef.scopes
      )
    );
  });

  // ── Agent Skill Tools ─────────────────────────
  Object.values(agentSkillTools).forEach((toolDef) => {
    server.registerTool(
      toolDef.name,
      {
        description: toolDef.description,
        // @ts-ignore: dynamic zod access
        inputSchema: toolDef.inputSchema,
      },
      withScopeEnforcement(
        toolDef.name,
        async (args, extra) => {
          try {
            const parsedArgs = toolDef.inputSchema.parse(args ?? {});
            // @ts-expect-error - handler type lost through dynamic Object.values() access
            const result = await toolDef.handler(parsedArgs, extra);
            return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
          } catch (err) {
            const msg = toSafeMcpErrorMessage(err, "Agent skill tool execution failed");
            return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
          }
        },
        toolDef.scopes
      )
    );
  });

  // ── GitHub Skill Tools ──────────────────────────
  Object.values(githubSkillTools).forEach((toolDef) => {
    server.registerTool(
      toolDef.name,
      {
        description: toolDef.description,
        // @ts-ignore: dynamic zod access
        inputSchema: toolDef.inputSchema,
      },
      withScopeEnforcement(
        toolDef.name,
        async (args) => {
          try {
            const parsedArgs = toolDef.inputSchema.parse(args ?? {});
            // @ts-expect-error - handler type lost through dynamic Object.values() access
            const result = await toolDef.handler(parsedArgs);
            return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
          } catch (err) {
            const msg = toSafeMcpErrorMessage(err, "GitHub skill tool execution failed");
            return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
          }
        },
        toolDef.scopes
      )
    );
  });

  // ── Plugin Tools ──────────────────────────────
  pluginTools.forEach((toolDef) => {
    server.registerTool(
      toolDef.name,
      {
        description: toolDef.description,
        // @ts-ignore: dynamic zod access
        inputSchema: toolDef.inputSchema,
      },
      withScopeEnforcement(
        toolDef.name,
        async (args, extra) => {
          try {
            const parsedArgs = toolDef.inputSchema.parse(args ?? {});
            // @ts-ignore: handler expected specific object
            const result = await toolDef.handler(parsedArgs, extra);
            return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
          } catch (err) {
            const msg = toSafeMcpErrorMessage(err, "Plugin tool execution failed");
            return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
          }
        },
        toolDef.scopes
      )
    );
  });

  // ── Compression Tools ─────────────────────────
  Object.values(compressionTools).forEach((toolDef: any) => {
    server.registerTool(
      toolDef.name,
      {
        description: toolDef.description,
        // @ts-ignore: dynamic zod access
        inputSchema: toolDef.inputSchema,
      },
      withScopeEnforcement(
        toolDef.name,
        async (args, extra) => {
          try {
            const parsedArgs = toolDef.inputSchema.parse(args ?? {});
            // @ts-ignore - handler type lost through dynamic Object.values() access
            const result = await toolDef.handler(parsedArgs, extra);
            return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
          } catch (err) {
            const msg = toSafeMcpErrorMessage(err, "Compression tool execution failed");
            return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
          }
        },
        toolDef.scopes
      )
    );
  });

  // ── Web-Session Pool Tools (#3368 observability) ─
  // Typed structurally (not `any`) — the shape is pinned by
  // tests/unit/mcp-tool-collections-shape.test.ts, so the loop can stay strict.
  Object.values(poolTools).forEach(
    (toolDef: {
      name: string;
      description: string;
      scopes: readonly string[];
      inputSchema: { parse: (input: unknown) => unknown };
      handler: (parsedArgs: unknown, extra?: unknown) => Promise<unknown>;
    }) => {
      server.registerTool(
        toolDef.name,
        {
          description: toolDef.description,
          // @ts-ignore: dynamic zod access
          inputSchema: toolDef.inputSchema,
        },
        withScopeEnforcement(
          toolDef.name,
          async (args, extra) => {
            try {
              const parsedArgs = toolDef.inputSchema.parse(args ?? {});
              const result = await toolDef.handler(parsedArgs, extra);
              return {
                content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
              };
            } catch (err) {
              const msg = toSafeMcpErrorMessage(err, "Pool tool execution failed");
              return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
            }
          },
          toolDef.scopes
        )
      );
    }
  );

  // ── Gamification Tools ────────────────────────
  gamificationTools.forEach((toolDef) => {
    server.registerTool(
      toolDef.name,
      {
        description: toolDef.description,
        // @ts-ignore: dynamic zod access
        inputSchema: toolDef.inputSchema,
      },
      withScopeEnforcement(
        toolDef.name,
        async (args, extra) => {
          try {
            const parsedArgs = toolDef.inputSchema.parse(args ?? {});
            // @ts-ignore: handler expected specific object
            const result = await toolDef.handler(parsedArgs, extra);
            return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
          } catch (err) {
            const msg = toSafeMcpErrorMessage(err, "Gamification tool execution failed");
            return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
          }
        },
        toolDef.scopes
      )
    );
  });

  // ── Notion Context Source Tools ───────────────
  notionTools.forEach((toolDef) => {
    server.registerTool(
      toolDef.name,
      {
        description: toolDef.description,
        // @ts-ignore: dynamic zod access
        inputSchema: toolDef.inputSchema,
      },
      withScopeEnforcement(
        toolDef.name,
        async (args, extra) => {
          try {
            const parsedArgs = toolDef.inputSchema.parse(args ?? {});
            // @ts-ignore: handler expected specific object
            const result = await toolDef.handler(parsedArgs, extra);
            return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
          } catch (err) {
            const msg = toSafeMcpErrorMessage(err, "Notion tool execution failed");
            return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
          }
        },
        toolDef.scopes
      )
    );
  });

  // ── Local Corpus Context Source Tools ─────────
  localCorpusTools.forEach((toolDef) => {
    server.registerTool(
      toolDef.name,
      {
        description: toolDef.description,
        // @ts-ignore: dynamic zod access
        inputSchema: toolDef.inputSchema,
      },
      withScopeEnforcement(
        toolDef.name,
        async (args, extra) => {
          try {
            const parsedArgs = toolDef.inputSchema.parse(args ?? {});
            // @ts-ignore: handler expected specific object
            const result = await toolDef.handler(parsedArgs, extra);
            return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
          } catch (error) {
            const msg = toSafeMcpErrorMessage(error, "Local corpus tool execution failed");
            return {
              content: [{ type: "text" as const, text: `Error: ${msg}` }],
              isError: true,
            };
          }
        },
        toolDef.scopes
      )
    );
  });

  // ── Obsidian Context Source Tools ─────────────
  obsidianTools.forEach((toolDef) => {
    server.registerTool(
      toolDef.name,
      {
        description: toolDef.description,
        // @ts-ignore: dynamic zod access
        inputSchema: toolDef.inputSchema,
      },
      withScopeEnforcement(
        toolDef.name,
        async (args, extra) => {
          try {
            const parsedArgs = toolDef.inputSchema.parse(args ?? {});
            // @ts-ignore: handler expected specific object
            const result = await toolDef.handler(parsedArgs, extra);
            return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
          } catch (err) {
            const msg = toSafeMcpErrorMessage(err, "Obsidian tool execution failed");
            return { content: [{ type: "text" as const, text: `Error: ${msg}` }], isError: true };
          }
        },
        toolDef.scopes
      )
    );
  });

  // ── Dynamic Skill Tools (from skills table) ──
  const skillToMcpToolName = (skill: { name: string }) =>
    `skill_${skill.name.replace(/[^a-z0-9_-]/gi, "_")}`;
  try {
    const enabledSkills = skillRegistry.list().filter((s) => s.enabled);
    for (const skill of enabledSkills) {
      const toolName = skillToMcpToolName(skill);
      if (RESERVED_MCP_NAMES.has(toolName)) continue;

      server.registerTool(
        toolName,
        {
          description: skill.description,
          inputSchema: z.object({}).passthrough(),
        },
        withScopeEnforcement(
          toolName,
          async (args, extra) => {
            const scopeContext = resolveCallerScopeContext(extra, Array.from(MCP_ALLOWED_SCOPES));
            const apiKeyId = scopeContext.callerId || "mcp";
            try {
              const execution = await skillExecutor.execute(
                skill.name,
                (args ?? {}) as Record<string, unknown>,
                { apiKeyId }
              );
              return {
                content: [
                  { type: "text" as const, text: JSON.stringify(execution.output, null, 2) },
                ],
              };
            } catch (err) {
              const msg = toSafeMcpErrorMessage(err, "Skill execution failed");
              return {
                content: [{ type: "text" as const, text: `Error: ${msg}` }],
                isError: true,
              };
            }
          },
          ["execute:skills"]
        )
      );
    }
  } catch {
    // Skills not loaded yet — skip dynamic registration until next reconnect
  }

  return server;
}

// ============ Main Entry Point (stdio) ============

/**
 * Start the MCP server with stdio transport.
 * Called when `omniroute --mcp` is used.
 */
export async function startMcpStdio(): Promise<void> {
  await ensureDbInitialized();
  // Stdout is reserved for JSON-RPC — bin/mcpStdioConsoleGuard.mjs is preloaded via
  // `node --import` (see bin/mcp-server.mjs) so console.log/warn already redirect to
  // stderr before this module's own imports evaluate.
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  const version = APP_CONFIG.version;
  const stopHeartbeat = startMcpHeartbeat({
    version,
    scopesEnforced: isMcpScopeEnforcementEnabled,
    allowedScopes: Array.from(MCP_ALLOWED_SCOPES),
    toolCount: TOTAL_MCP_TOOL_COUNT,
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
    if (closeAuditDb()) {
      console.error("[MCP] Audit database checkpointed and closed.");
    }
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
