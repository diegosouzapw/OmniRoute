/**
 * MCP Authorization Scopes — Defines permission scopes for each MCP tool.
 *
 * Each tool requires specific scopes to execute. API keys can be configured
 * with a subset of scopes to limit tool access (least-privilege).
 */

// ============ Scope Definitions ============

/** All available MCP scopes */
export const MCP_SCOPE_LIST = [
  "read:health",
  "read:combos",
  "write:combos",
  "read:quota",
  "read:usage",
  "read:models",
  "execute:completions",
  "execute:search",
  "write:budget",
  "write:resilience",
  "pricing:write",
  "read:cache",
  "write:cache",
  "read:compression",
  "write:compression",
  "read:proxies",
] as const;

export type McpScope = (typeof MCP_SCOPE_LIST)[number];

// ============ Tool → Scope Mapping ============

/** Maps each MCP tool to its required scopes */
export const MCP_TOOL_SCOPES: Record<string, readonly McpScope[]> = {
  // Phase 1: Essential Tools
  omniroute_get_health: ["read:health"],
  omniroute_list_combos: ["read:combos"],
  omniroute_get_combo_metrics: ["read:combos"],
  omniroute_switch_combo: ["write:combos"],
  omniroute_check_quota: ["read:quota"],
  omniroute_route_request: ["execute:completions"],
  omniroute_web_search: ["execute:search"],
  omniroute_web_fetch: ["execute:search"],
  omniroute_cost_report: ["read:usage"],
  omniroute_list_models_catalog: ["read:models"],

  // Phase 2: Advanced Tools
  omniroute_simulate_route: ["read:health", "read:combos"],
  omniroute_set_budget_guard: ["write:budget"],
  omniroute_set_resilience_profile: ["write:resilience"],
  omniroute_test_combo: ["execute:completions", "read:combos"],
  omniroute_get_provider_metrics: ["read:health"],
  omniroute_best_combo_for_task: ["read:combos", "read:health"],
  omniroute_explain_route: ["read:health", "read:usage"],
  omniroute_get_session_snapshot: ["read:usage"],
  omniroute_db_health_check: ["read:health", "write:resilience"],
  omniroute_sync_pricing: ["pricing:write"],
  omniroute_cache_stats: ["read:cache"],
  omniroute_cache_flush: ["write:cache"],
  omniroute_compression_status: ["read:compression"],
  omniroute_compression_configure: ["write:compression"],
  omniroute_set_compression_engine: ["write:compression"],
  omniroute_list_compression_combos: ["read:compression"],
  omniroute_compression_combo_stats: ["read:compression"],
  omniroute_ccr_store: ["write:compression"],
  omniroute_ccr_retrieve: ["read:compression"],
  omniroute_ccr_inspect: ["read:compression"],
  omniroute_ccr_list: ["read:compression"],
  omniroute_ccr_delete: ["write:compression"],
  omniroute_ccr_stats: ["read:compression"],
  omniroute_oneproxy_fetch: ["read:proxies"],
  omniroute_oneproxy_rotate: ["read:proxies"],
  omniroute_oneproxy_stats: ["read:proxies"],

  // Web-session pool observability (read) + lifecycle (write)
  omniroute_pool_status: ["read:health"],
  omniroute_pool_sessions: ["read:health"],
  omniroute_pool_health: ["read:health"],
  omniroute_pool_reset: ["write:resilience"],
  omniroute_pool_warm: ["write:resilience"],
  // Stealth browser pool observability (#3368 PR7)
  omniroute_browser_pool_status: ["read:health"],
} as const;
