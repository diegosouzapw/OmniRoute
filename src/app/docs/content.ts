export const DOCS_ENDPOINT_ROWS = [
  { path: "/v1/chat/completions", method: "POST", noteKey: "endpointChatNote" },
  { path: "/v1/responses", method: "POST", noteKey: "endpointResponsesNote" },
  { path: "/v1/completions", method: "POST", noteKey: "endpointCompletionsNote" },
  { path: "/v1/models", method: "GET", noteKey: "endpointModelsNote" },
  { path: "/v1/embeddings", method: "POST", noteKey: "endpointEmbeddingsNote" },
  { path: "/v1/moderations", method: "POST", noteKey: "endpointModerationsNote" },
  { path: "/v1/rerank", method: "POST", noteKey: "endpointRerankNote" },
  { path: "/v1/search", method: "POST", noteKey: "endpointSearchNote" },
  { path: "/v1/search/analytics", method: "GET", noteKey: "endpointSearchAnalyticsNote" },
  { path: "/v1/audio/transcriptions", method: "POST", noteKey: "endpointAudioNote" },
  { path: "/v1/audio/speech", method: "POST", noteKey: "endpointSpeechNote" },
  { path: "/v1/images/generations", method: "POST", noteKey: "endpointImagesNote" },
  { path: "/v1/videos/generations", method: "POST", noteKey: "endpointVideoNote" },
  { path: "/v1/music/generations", method: "POST", noteKey: "endpointMusicNote" },
  { path: "/v1/messages", method: "POST", noteKey: "endpointMessagesNote" },
  { path: "/v1/messages/count_tokens", method: "POST", noteKey: "endpointCountTokensNote" },
  { path: "/v1/files", method: "POST", noteKey: "endpointFilesNote" },
  { path: "/v1/batches", method: "POST", noteKey: "endpointBatchesNote" },
  { path: "/v1/ws", method: "GET", noteKey: "endpointWsNote" },
  { path: "/chat/completions", method: "POST", noteKey: "endpointRewriteChatNote" },
  { path: "/responses", method: "POST", noteKey: "endpointRewriteResponsesNote" },
  { path: "/models", method: "GET", noteKey: "endpointRewriteModelsNote" },
] as const;

export const DOCS_MANAGEMENT_ENDPOINT_ROWS = [
  { path: "/api/providers", method: "GET", noteKey: "mgmtProvidersListNote" },
  { path: "/api/providers", method: "POST", noteKey: "mgmtProvidersCreateNote" },
  { path: "/api/providers/:id", method: "PUT", noteKey: "mgmtProvidersUpdateNote" },
  { path: "/api/providers/:id", method: "DELETE", noteKey: "mgmtProvidersDeleteNote" },
  { path: "/api/providers/:id/test", method: "POST", noteKey: "mgmtProvidersTestNote" },
  { path: "/api/providers/:id/models", method: "GET", noteKey: "mgmtProvidersModelsNote" },
  { path: "/api/settings", method: "GET", noteKey: "mgmtSettingsGetNote" },
  { path: "/api/settings", method: "PUT", noteKey: "mgmtSettingsUpdateNote" },
  { path: "/api/settings/payload-rules", method: "GET", noteKey: "mgmtPayloadRulesGetNote" },
  { path: "/api/settings/payload-rules", method: "PUT", noteKey: "mgmtPayloadRulesUpdateNote" },
  { path: "/api/v1/management/proxies", method: "GET", noteKey: "mgmtProxiesListNote" },
  { path: "/api/v1/management/proxies", method: "POST", noteKey: "mgmtProxiesCreateNote" },
  {
    path: "/api/v1/management/proxies/health",
    method: "GET",
    noteKey: "mgmtProxiesHealthNote",
  },
  {
    path: "/api/v1/management/proxies/bulk-assign",
    method: "PUT",
    noteKey: "mgmtProxiesBulkAssignNote",
  },
  {
    path: "/api/v1/management/proxies/assignments",
    method: "GET",
    noteKey: "mgmtAssignmentsListNote",
  },
  {
    path: "/api/v1/management/proxies/assignments",
    method: "PUT",
    noteKey: "mgmtAssignmentsUpdateNote",
  },
  {
    path: "/api/settings/proxies/migrate",
    method: "POST",
    noteKey: "mgmtLegacyMigrationNote",
  },
] as const;

export const DOCS_FEATURE_ITEMS = [
  { icon: "hub", titleKey: "featureRoutingTitle", textKey: "featureRoutingText" },
  { icon: "layers", titleKey: "featureCombosTitle", textKey: "featureCombosText" },
  { icon: "auto_awesome", titleKey: "featureAutoComboTitle", textKey: "featureAutoComboText" },
  { icon: "travel_explore", titleKey: "featureSearchTitle", textKey: "featureSearchText" },
  { icon: "bar_chart", titleKey: "featureUsageTitle", textKey: "featureUsageText" },
  { icon: "analytics", titleKey: "featureAnalyticsTitle", textKey: "featureAnalyticsText" },
  { icon: "health_and_safety", titleKey: "featureHealthTitle", textKey: "featureHealthText" },
  { icon: "psychology", titleKey: "featureMemoryTitle", textKey: "featureMemoryText" },
  { icon: "auto_fix_high", titleKey: "featureSkillsTitle", textKey: "featureSkillsText" },
  { icon: "smart_toy", titleKey: "featureAcpTitle", textKey: "featureAcpText" },
  { icon: "terminal", titleKey: "featureCliTitle", textKey: "featureCliText" },
  { icon: "shield", titleKey: "featureSecurityTitle", textKey: "featureSecurityText" },
] as const;

export const DOCS_USE_CASE_ITEMS = [
  { titleKey: "useCaseSingleEndpointTitle", textKey: "useCaseSingleEndpointText" },
  { titleKey: "useCaseFallbackTitle", textKey: "useCaseFallbackText" },
  { titleKey: "useCaseUsageVisibilityTitle", textKey: "useCaseUsageVisibilityText" },
] as const;

export const DOCS_DEPLOYMENT_GUIDES = [
  {
    icon: "android",
    titleKey: "deployTermuxTitle",
    textKey: "deployTermuxText",
    href: "https://github.com/diegosouzapw/OmniRoute/blob/main/docs/TERMUX_GUIDE.md",
  },
] as const;

export const DOCS_TROUBLESHOOTING_KEYS = [
  "troubleshootingModelRouting",
  "troubleshootingAmbiguousModels",
  "troubleshootingCodexFamily",
  "troubleshootingTestConnection",
  "troubleshootingCircuitBreaker",
  "troubleshootingOAuth",
] as const;

export const DOCS_TOC_ITEMS = [
  { href: "#quick-start", labelKey: "quickStart" },
  { href: "#deployment", labelKey: "deploymentGuides" },
  { href: "#features", labelKey: "features" },
  { href: "#supported-providers", labelKey: "supportedProvidersToc" },
  { href: "#use-cases", labelKey: "commonUseCases" },
  { href: "#client-compatibility", labelKey: "clientCompatibility" },
  { href: "#protocols", labelKey: "protocolsToc" },
  { href: "#mcp-tools", labelKey: "mcpToolsToc" },
  { href: "#api-reference", labelKey: "apiReference" },
  { href: "#management-api", labelKey: "managementApiReference" },
  { href: "#model-prefixes", labelKey: "modelPrefixes" },
  { href: "#troubleshooting", labelKey: "troubleshooting" },
] as const;

export const DOCS_MCP_TOOL_GROUPS = [
  {
    titleKey: "mcpToolsRoutingTitle",
    textKey: "mcpToolsRoutingDesc",
    tools: [
      "omniroute_get_health",
      "omniroute_list_combos",
      "omniroute_get_combo_metrics",
      "omniroute_switch_combo",
      "omniroute_check_quota",
      "omniroute_route_request",
      "omniroute_cost_report",
      "omniroute_list_models_catalog",
      "omniroute_web_search",
    ],
  },
  {
    titleKey: "mcpToolsOperationsTitle",
    textKey: "mcpToolsOperationsDesc",
    tools: [
      "omniroute_simulate_route",
      "omniroute_set_budget_guard",
      "omniroute_set_routing_strategy",
      "omniroute_set_resilience_profile",
      "omniroute_test_combo",
      "omniroute_get_provider_metrics",
      "omniroute_best_combo_for_task",
      "omniroute_explain_route",
      "omniroute_get_session_snapshot",
      "omniroute_db_health_check",
      "omniroute_sync_pricing",
    ],
  },
  {
    titleKey: "mcpToolsCacheTitle",
    textKey: "mcpToolsCacheDesc",
    tools: ["omniroute_cache_stats", "omniroute_cache_flush"],
  },
  {
    titleKey: "mcpToolsMemoryTitle",
    textKey: "mcpToolsMemoryDesc",
    tools: ["omniroute_memory_search", "omniroute_memory_add", "omniroute_memory_clear"],
  },
  {
    titleKey: "mcpToolsSkillsTitle",
    textKey: "mcpToolsSkillsDesc",
    tools: [
      "omniroute_skills_list",
      "omniroute_skills_enable",
      "omniroute_skills_execute",
      "omniroute_skills_executions",
    ],
  },
] as const;
