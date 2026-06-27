export const HIDEABLE_SIDEBAR_ITEM_IDS = [
  // Home
  "home",
  // OmniProxy — flat
  "api-manager",
  "endpoints",
  "providers",
  "embedded-services",
  "combos",
  "combos-live",
  "quota",
  // OmniProxy > Compression Context (Settings → Combos → engines → Studio)
  "context-settings",
  "context-combos",
  "context-caveman",
  "context-rtk",
  "context-headroom",
  "context-session-dedup",
  "context-ccr",
  "context-llmlingua",
  "context-lite",
  "context-aggressive",
  "context-ultra",
  "compression-studio",
  // OmniProxy > Tools
  "cli-code",
  "cli-agents",
  "acp-agents",
  "cloud-agents",
  "agent-bridge",
  "traffic-inspector",
  // OmniProxy > Integrations
  "api-endpoints",
  "webhooks",
  // OmniProxy — proxy
  "proxy",
  "mitm-proxy",
  "1proxy",
  // Analytics
  "analytics",
  "analytics-combo-health",
  "analytics-utilization",
  "costs",
  "cache",
  "analytics-compression",
  "analytics-search",
  "analytics-evals",
  "provider-stats",
  // Monitoring — flat
  "activity",
  "logs",
  "logs-proxy",
  "logs-console",
  "logs-activity",
  "health",
  "runtime",
  // Costs section
  "costs-pricing",
  "costs-budget",
  "costs-free-tiers",
  "costs-quota-share",
  "free-provider-rankings",
  // Monitoring > Audit
  "audit",
  "audit-mcp",
  "audit-a2a",
  // Dev Tools
  "translator",
  "playground",
  "search-tools",
  // Agentic Features
  "memory",
  "skills",
  "agent-skills",
  "mcp",
  "a2a",
  "plugins",
  // Gamification
  "leaderboard",
  "profile",
  "tokens",
  // Other Features — flat
  "media",
  // Other Features > Batch
  "batch",
  "batch-files",
  // Configuration
  "settings-general",
  "settings-appearance",
  "settings-ai",
  "settings-routing",
  "settings-resilience",
  "settings-advanced",
  "settings-security",
  "settings-access-tokens",
  "settings-feature-flags",
  "settings-sidebar",
  // Help
  "docs",
  "issues",
  "changelog",
] as const;

export type HideableSidebarItemId = (typeof HIDEABLE_SIDEBAR_ITEM_IDS)[number];

export const SIDEBAR_ICON_ACCENTS: Partial<Record<HideableSidebarItemId, string>> = {
  home: "#60A5FA",
  "api-manager": "#F59E0B",
  endpoints: "#38BDF8",
  providers: "#818CF8",
  combos: "#A855F7",
  quota: "#F472B6",
  "context-caveman": "#F97316",
  "context-rtk": "#2DD4BF",
  "context-combos": "#C084FC",
  "cli-code": "#FACC15",
  "cli-agents": "#93C5FD",
  "cloud-agents": "#7DD3FC",
  "api-endpoints": "#14B8A6",
  webhooks: "#EC4899",
  proxy: "#A3E635",
  "mitm-proxy": "#FB7185",
  "1proxy": "#22D3EE",
  analytics: "#06B6D4",
  "analytics-combo-health": "#34D399",
  "analytics-utilization": "#FBBF24",
  costs: "#FB923C",
  cache: "#84CC16",
  "analytics-compression": "#F97316",
  "analytics-search": "#38BDF8",
  "analytics-evals": "#A78BFA",
  logs: "#CBD5E1",
  "logs-proxy": "#A3E635",
  "logs-console": "#FACC15",
  "logs-activity": "#60A5FA",
  health: "#EF4444",
  runtime: "#F59E0B",
  "costs-pricing": "#FB923C",
  "costs-budget": "#22C55E",
  "costs-quota-share": "#06B6D4",
  audit: "#F43F5E",
  "audit-mcp": "#818CF8",
  "audit-a2a": "#A855F7",
  translator: "#3B82F6",
  playground: "#EAB308",
  "search-tools": "#0891B2",
  memory: "#10B981",
  skills: "#F43F5E",
  "agent-skills": "#D946EF",
  mcp: "#8B5CF6",
  a2a: "#06B6D4",
  leaderboard: "#FACC15",
  profile: "#60A5FA",
  tokens: "#A3E635",
  media: "#D946EF",
  batch: "#14B8A6",
  "batch-files": "#38BDF8",
  "settings-general": "#64748B",
  "settings-appearance": "#D946EF",
  "settings-ai": "#A78BFA",
  "settings-routing": "#06B6D4",
  "settings-resilience": "#22C55E",
  "settings-advanced": "#F97316",
  "settings-security": "#EF4444",
  "settings-feature-flags": "#FACC15",
  "settings-sidebar": "#38BDF8",
  docs: "#2563EB",
  issues: "#DC2626",
  changelog: "#F59E0B",
};

export const SIDEBAR_SUBITEM_ICON_ACCENTS: Record<string, string> = {};

function getDeterministicIconAccent(id: string): string {
  let hash = 0;
  for (let index = 0; index < id.length; index += 1) {
    hash = (hash * 31 + id.charCodeAt(index)) >>> 0;
  }
  const hue = hash % 360;
  const saturation = 72;
  const lightness = 56;
  const chroma = (1 - Math.abs((2 * lightness) / 100 - 1)) * (saturation / 100);
  const huePrime = hue / 60;
  const x = chroma * (1 - Math.abs((huePrime % 2) - 1));
  const match = lightness / 100 - chroma / 2;
  const [red, green, blue] =
    huePrime < 1
      ? [chroma, x, 0]
      : huePrime < 2
        ? [x, chroma, 0]
        : huePrime < 3
          ? [0, chroma, x]
          : huePrime < 4
            ? [0, x, chroma]
            : huePrime < 5
              ? [x, 0, chroma]
              : [chroma, 0, x];

  return [red, green, blue]
    .map((channel) =>
      Math.round((channel + match) * 255)
        .toString(16)
        .padStart(2, "0")
        .toUpperCase()
    )
    .join("")
    .replace(/^/, "#");
}

export function getSidebarIconAccent(id: string): string {
  return (
    SIDEBAR_ICON_ACCENTS[id as HideableSidebarItemId] ||
    SIDEBAR_SUBITEM_ICON_ACCENTS[id] ||
    getDeterministicIconAccent(id)
  );
}

export type SidebarSectionId =
  | "home"
  | "omni-proxy"
  | "analytics"
  | "costs"
  | "monitoring"
  | "devtools"
  | "agentic-features"
  | "other-features"
  | "configuration"
  | "help";

export interface SidebarItemDefinition {
  id: HideableSidebarItemId;
  href: string;
  i18nKey: string;
  subtitleKey?: string;
  /** Literal label shown when `i18nKey` has no translation (avoids per-locale edits). */
  labelFallback?: string;
  /** Literal subtitle shown when `subtitleKey` is absent/untranslated. */
  subtitleFallback?: string;
  icon: string;
  exact?: boolean;
  external?: boolean;
}

export interface SidebarItemGroup {
  type: "group";
  id: string;
  titleKey: string;
  titleFallback: string;
  items: readonly SidebarItemDefinition[];
}

export type SidebarSectionChild = SidebarItemDefinition | SidebarItemGroup;

export interface SidebarSectionDefinition {
  id: SidebarSectionId;
  titleKey: string;
  titleFallback: string;
  children: readonly SidebarSectionChild[];
  showTitle?: boolean;
  visibility?: "always" | "debug";
  defaultPinned?: boolean;
}

export function getSectionItems(
  section: SidebarSectionDefinition | { children: readonly SidebarSectionChild[] }
): readonly SidebarItemDefinition[] {
  return section.children.flatMap((child) =>
    "type" in child && child.type === "group" ? child.items : [child as SidebarItemDefinition]
  );
}

// ─── Item arrays ────────────────────────────────────────────────────────────

const HOME_ITEMS: readonly SidebarItemDefinition[] = [
  {
    id: "home",
    href: "/home",
    i18nKey: "home",
    subtitleKey: "homeSubtitle",
    icon: "home",
    exact: true,
  },
];

const OMNI_PROXY_ITEMS: readonly SidebarItemDefinition[] = [
  {
    id: "endpoints",
    href: "/dashboard/endpoint",
    i18nKey: "endpoints",
    subtitleKey: "endpointsSubtitle",
    icon: "api",
  },
  {
    id: "api-manager",
    href: "/dashboard/api-manager",
    i18nKey: "apiManager",
    subtitleKey: "apiManagerSubtitle",
    icon: "vpn_key",
  },
  {
    id: "providers",
    href: "/dashboard/providers",
    i18nKey: "providers",
    subtitleKey: "providersSubtitle",
    icon: "dns",
  },
  {
    id: "embedded-services",
    href: "/dashboard/providers/services",
    i18nKey: "embeddedServices",
    subtitleKey: "embeddedServicesSubtitle",
    icon: "deployed_code",
  },
  {
    id: "combos",
    href: "/dashboard/combos",
    i18nKey: "combos",
    subtitleKey: "combosSubtitle",
    icon: "layers",
  },
  {
    id: "combos-live",
    href: "/dashboard/combos/live",
    i18nKey: "combosLive",
    labelFallback: "Combo Studio",
    subtitleFallback: "Live routing cascade",
    icon: "account_tree",
  },
  {
    id: "quota",
    href: "/dashboard/quota",
    i18nKey: "providerQuota",
    subtitleKey: "providerQuotaSubtitle",
    icon: "tune",
  },
  {
    id: "costs-quota-share",
    href: "/dashboard/costs/quota-share",
    i18nKey: "costsQuotaShare",
    subtitleKey: "costsQuotaShareSubtitle",
    icon: "pie_chart",
  },
];

export const COMPRESSION_CONTEXT_GROUP: SidebarItemGroup = {
  type: "group",
  id: "compression-context",
  titleKey: "compressionContextGroup",
  titleFallback: "Compression Context",
  // Order: Settings (the unified panel) → Combos → per-engine pages → Studio (analytics).
  items: [
    {
      id: "context-settings",
      href: "/dashboard/context/settings",
      i18nKey: "contextSettings",
      labelFallback: "Compression Settings",
      subtitleFallback: "Global defaults",
      icon: "settings",
    },
    {
      id: "context-combos",
      href: "/dashboard/context/combos",
      i18nKey: "contextCombos",
      subtitleKey: "contextCombosSubtitle",
      icon: "hub",
    },
    {
      id: "context-caveman",
      href: "/dashboard/context/caveman",
      i18nKey: "contextCaveman",
      subtitleKey: "contextCavemanSubtitle",
      icon: "compress",
    },
    {
      id: "context-rtk",
      href: "/dashboard/context/rtk",
      i18nKey: "contextRtk",
      subtitleKey: "contextRtkSubtitle",
      icon: "filter_alt",
    },
    {
      id: "context-headroom",
      href: "/dashboard/context/headroom",
      i18nKey: "contextHeadroom",
      labelFallback: "Headroom",
      subtitleFallback: "Tabular compaction",
      icon: "table_rows",
    },
    {
      id: "context-session-dedup",
      href: "/dashboard/context/session-dedup",
      i18nKey: "contextSessionDedup",
      labelFallback: "Session Dedup",
      subtitleFallback: "Cross-turn dedup",
      icon: "content_copy",
    },
    {
      id: "context-ccr",
      href: "/dashboard/context/ccr",
      i18nKey: "contextCcr",
      labelFallback: "CCR",
      subtitleFallback: "Retrieve markers",
      icon: "archive",
    },
    {
      id: "context-llmlingua",
      href: "/dashboard/context/llmlingua",
      i18nKey: "contextLlmlingua",
      labelFallback: "LLMLingua",
      subtitleFallback: "Semantic pruning",
      icon: "psychology",
    },
    {
      id: "context-lite",
      href: "/dashboard/context/lite",
      i18nKey: "contextLite",
      labelFallback: "Lite",
      subtitleFallback: "Fast whitespace cleanup",
      icon: "compress",
    },
    {
      id: "context-aggressive",
      href: "/dashboard/context/aggressive",
      i18nKey: "contextAggressive",
      labelFallback: "Aggressive",
      subtitleFallback: "Summary + aging",
      icon: "speed",
    },
    {
      id: "context-ultra",
      href: "/dashboard/context/ultra",
      i18nKey: "contextUltra",
      labelFallback: "Ultra",
      subtitleFallback: "Heuristic pruning",
      icon: "bolt",
    },
    {
      id: "compression-studio",
      href: "/dashboard/compression/studio",
      i18nKey: "compressionStudio",
      labelFallback: "Compression Studio",
      subtitleFallback: "Live engine cascade",
      icon: "monitoring",
    },
  ],
};

const TOOLS_GROUP: SidebarItemGroup = {
  type: "group",
  id: "tools",
  titleKey: "toolsGroup",
  titleFallback: "Tools",
  items: [
    {
      id: "cli-code",
      href: "/dashboard/cli-code",
      i18nKey: "cliCode",
      subtitleKey: "cliCodeSubtitle",
      icon: "terminal",
    },
    {
      id: "cli-agents",
      href: "/dashboard/cli-agents",
      i18nKey: "cliAgents",
      subtitleKey: "cliAgentsSubtitle",
      icon: "smart_toy",
    },
    {
      id: "acp-agents",
      href: "/dashboard/acp-agents",
      i18nKey: "acpAgents",
      subtitleKey: "acpAgentsSubtitle",
      icon: "device_hub",
    },
    {
      id: "cloud-agents",
      href: "/dashboard/cloud-agents",
      i18nKey: "cloudAgents",
      subtitleKey: "cloudAgentsSubtitle",
      icon: "cloud",
    },
    {
      id: "agent-bridge",
      href: "/dashboard/tools/agent-bridge",
      i18nKey: "agentBridge",
      subtitleKey: "agentBridgeSubtitle",
      icon: "link",
    },
    {
      id: "traffic-inspector",
      href: "/dashboard/tools/traffic-inspector",
      i18nKey: "trafficInspector",
      subtitleKey: "trafficInspectorSubtitle",
      icon: "network_check",
    },
  ],
};

const INTEGRATIONS_GROUP: SidebarItemGroup = {
  type: "group",
  id: "integrations",
  titleKey: "integrationsGroup",
  titleFallback: "Integrations",
  items: [
    {
      id: "api-endpoints",
      href: "/dashboard/api-endpoints",
      i18nKey: "apiEndpoints",
      subtitleKey: "apiEndpointsSubtitle",
      icon: "api",
    },
    {
      id: "webhooks",
      href: "/dashboard/webhooks",
      i18nKey: "webhooks",
      subtitleKey: "webhooksSubtitle",
      icon: "webhook",
    },
  ],
};

const PROXY_ITEM: SidebarItemDefinition = {
  id: "proxy",
  href: "/dashboard/system/proxy",
  i18nKey: "proxy",
  subtitleKey: "proxySubtitle",
  icon: "dns",
};

const ANALYTICS_ITEMS: readonly SidebarItemDefinition[] = [
  {
    id: "analytics",
    href: "/dashboard/analytics",
    i18nKey: "usage",
    subtitleKey: "usageSubtitle",
    icon: "analytics",
  },
  {
    id: "analytics-combo-health",
    href: "/dashboard/analytics/combo-health",
    i18nKey: "analyticsComboHealth",
    subtitleKey: "analyticsComboHealthSubtitle",
    icon: "monitor_heart",
  },
  {
    id: "analytics-utilization",
    href: "/dashboard/analytics/utilization",
    i18nKey: "analyticsUtilization",
    subtitleKey: "analyticsUtilizationSubtitle",
    icon: "bar_chart",
  },
  {
    id: "cache",
    href: "/dashboard/cache",
    i18nKey: "cache",
    subtitleKey: "cacheSubtitle",
    icon: "cached",
  },
  {
    id: "analytics-compression",
    href: "/dashboard/analytics/compression",
    i18nKey: "analyticsCompression",
    subtitleKey: "analyticsCompressionSubtitle",
    icon: "compress",
  },
  {
    id: "analytics-search",
    href: "/dashboard/analytics/search",
    i18nKey: "analyticsSearch",
    subtitleKey: "analyticsSearchSubtitle",
    icon: "manage_search",
  },
  {
    id: "analytics-evals",
    href: "/dashboard/analytics/evals",
    i18nKey: "analyticsEvals",
    subtitleKey: "analyticsEvalsSubtitle",
    icon: "labs",
  },
  {
    id: "provider-stats",
    href: "/dashboard/provider-stats",
    i18nKey: "providerStats",
    subtitleKey: "providerStatsSubtitle",
    icon: "speed",
  },
];

const MONITORING_ITEMS: readonly SidebarItemDefinition[] = [
  {
    id: "activity",
    href: "/dashboard/activity",
    i18nKey: "activity",
    subtitleKey: "activitySubtitle",
    icon: "timeline",
  },
];

const LOGS_GROUP: SidebarItemGroup = {
  type: "group",
  id: "logs",
  titleKey: "logsGroup",
  titleFallback: "Logs",
  items: [
    {
      id: "logs",
      href: "/dashboard/logs",
      i18nKey: "logs",
      subtitleKey: "logsSubtitle",
      icon: "description",
    },
    {
      id: "logs-proxy",
      href: "/dashboard/logs/proxy",
      i18nKey: "logsProxy",
      subtitleKey: "logsProxySubtitle",
      icon: "lan",
    },
    {
      id: "logs-console",
      href: "/dashboard/logs/console",
      i18nKey: "consoleLogs",
      subtitleKey: "consoleLogsSubtitle",
      icon: "terminal",
    },
  ],
};

const SYSTEM_GROUP: SidebarItemGroup = {
  type: "group",
  id: "system",
  titleKey: "systemGroup",
  titleFallback: "System",
  items: [
    {
      id: "health",
      href: "/dashboard/health",
      i18nKey: "health",
      subtitleKey: "healthSubtitle",
      icon: "health_and_safety",
    },
    {
      id: "runtime",
      href: "/dashboard/runtime",
      i18nKey: "runtime",
      subtitleKey: "runtimeSubtitle",
      icon: "bolt",
    },
  ],
};

const COSTS_ITEMS: readonly SidebarItemDefinition[] = [
  {
    id: "costs",
    href: "/dashboard/costs",
    i18nKey: "costsOverview",
    subtitleKey: "costsOverviewSubtitle",
    icon: "account_balance_wallet",
  },
  {
    id: "costs-pricing",
    href: "/dashboard/costs/pricing",
    i18nKey: "costsPricing",
    subtitleKey: "costsPricingSubtitle",
    icon: "price_change",
  },
  {
    id: "costs-budget",
    href: "/dashboard/costs/budget",
    i18nKey: "costsBudget",
    subtitleKey: "costsBudgetSubtitle",
    icon: "savings",
  },
  {
    id: "costs-free-tiers",
    href: "/dashboard/free-tiers",
    i18nKey: "costsFreeTiers",
    subtitleKey: "costsFreeTiersSubtitle",
    icon: "request_quote",
  },
  {
    id: "free-provider-rankings",
    href: "/dashboard/free-provider-rankings",
    i18nKey: "freeProviderRankings",
    subtitleKey: "freeProviderRankingsSubtitle",
    icon: "leaderboard",
  },
];

const AUDIT_GROUP: SidebarItemGroup = {
  type: "group",
  id: "audit",
  titleKey: "auditGroup",
  titleFallback: "Audit",
  items: [
    {
      id: "audit",
      href: "/dashboard/audit",
      i18nKey: "auditLog",
      subtitleKey: "auditLogSubtitle",
      icon: "policy",
    },
    {
      id: "audit-mcp",
      href: "/dashboard/audit/mcp",
      i18nKey: "auditMcp",
      subtitleKey: "auditMcpSubtitle",
      icon: "security",
    },
    {
      id: "audit-a2a",
      href: "/dashboard/audit/a2a",
      i18nKey: "auditA2a",
      subtitleKey: "auditA2aSubtitle",
      icon: "device_hub",
    },
  ],
};

const DEVTOOLS_ITEMS: readonly SidebarItemDefinition[] = [
  {
    id: "translator",
    href: "/dashboard/translator",
    i18nKey: "translator",
    subtitleKey: "translatorSubtitle",
    icon: "translate",
  },
  {
    id: "playground",
    href: "/dashboard/playground",
    i18nKey: "playground",
    subtitleKey: "playgroundSubtitle",
    icon: "science",
  },
  {
    id: "search-tools",
    href: "/dashboard/search-tools",
    i18nKey: "searchTools",
    subtitleKey: "searchToolsSubtitle",
    icon: "manage_search",
  },
];

const MCP_ITEM: SidebarItemDefinition = {
  id: "mcp",
  href: "/dashboard/mcp",
  i18nKey: "mcp",
  subtitleKey: "mcpSubtitle",
  icon: "hub",
};

const AGENTIC_FEATURES_ITEMS: readonly SidebarSectionChild[] = [
  {
    id: "memory",
    href: "/dashboard/memory",
    i18nKey: "memory",
    subtitleKey: "memorySubtitle",
    icon: "psychology",
  },
  {
    id: "agent-skills",
    href: "/dashboard/agent-skills",
    i18nKey: "agentSkills",
    subtitleKey: "agentSkillsSubtitle",
    icon: "share",
  },
  {
    id: "skills",
    href: "/dashboard/omni-skills",
    i18nKey: "omniSkills",
    subtitleKey: "omniSkillsSubtitle",
    icon: "auto_fix_high",
  },
  MCP_ITEM,
  {
    id: "a2a",
    href: "/dashboard/a2a",
    i18nKey: "a2a",
    subtitleKey: "a2aSubtitle",
    icon: "device_hub",
  },
  {
    id: "plugins",
    href: "/dashboard/plugins",
    i18nKey: "plugins",
    subtitleKey: "pluginsSubtitle",
    icon: "extension",
  },
];

const GAMIFICATION_GROUP: SidebarItemGroup = {
  type: "group",
  id: "gamification",
  titleKey: "gamificationGroup",
  titleFallback: "Gamification",
  items: [
    {
      id: "leaderboard",
      href: "/dashboard/leaderboard",
      i18nKey: "leaderboard",
      subtitleKey: "leaderboardSubtitle",
      icon: "emoji_events",
    },
    {
      id: "profile",
      href: "/dashboard/profile",
      i18nKey: "profile",
      subtitleKey: "profileSubtitle",
      icon: "person",
    },
    {
      id: "tokens",
      href: "/dashboard/tokens",
      i18nKey: "tokens",
      subtitleKey: "tokensSubtitle",
      icon: "toll",
    },
  ],
};

const OTHER_FEATURES_ITEMS: readonly SidebarItemDefinition[] = [
  {
    id: "media",
    href: "/dashboard/cache/media",
    i18nKey: "media",
    subtitleKey: "mediaSubtitle",
    icon: "perm_media",
  },
];

const BATCH_GROUP: SidebarItemGroup = {
  type: "group",
  id: "batch",
  titleKey: "batchGroup",
  titleFallback: "Batch",
  items: [
    {
      id: "batch",
      href: "/dashboard/batch",
      i18nKey: "batch",
      subtitleKey: "batchSubtitle",
      icon: "view_list",
    },
    {
      id: "batch-files",
      href: "/dashboard/batch/files",
      i18nKey: "batchFiles",
      subtitleKey: "batchFilesSubtitle",
      icon: "folder",
    },
  ],
};

const CONFIGURATION_ITEMS: readonly SidebarItemDefinition[] = [
  {
    id: "settings-general",
    href: "/dashboard/settings/general",
    i18nKey: "settingsGeneral",
    subtitleKey: "settingsGeneralSubtitle",
    icon: "tune",
  },
  {
    id: "settings-appearance",
    href: "/dashboard/settings/appearance",
    i18nKey: "settingsAppearance",
    subtitleKey: "settingsAppearanceSubtitle",
    icon: "palette",
  },
  {
    id: "settings-ai",
    href: "/dashboard/settings/ai",
    i18nKey: "settingsAi",
    subtitleKey: "settingsAiSubtitle",
    icon: "auto_awesome",
  },
  {
    id: "settings-routing",
    href: "/dashboard/settings/routing",
    i18nKey: "globalRouting",
    subtitleKey: "globalRoutingSubtitle",
    icon: "route",
  },
  {
    id: "settings-resilience",
    href: "/dashboard/settings/resilience",
    i18nKey: "settingsResilience",
    subtitleKey: "settingsResilienceSubtitle",
    icon: "health_and_safety",
  },
  {
    id: "settings-advanced",
    href: "/dashboard/settings/advanced",
    i18nKey: "settingsAdvanced",
    subtitleKey: "settingsAdvancedSubtitle",
    icon: "engineering",
  },
  {
    id: "settings-security",
    href: "/dashboard/settings/security",
    i18nKey: "settingsSecurity",
    subtitleKey: "settingsSecuritySubtitle",
    icon: "shield",
  },
  {
    id: "settings-access-tokens",
    href: "/dashboard/settings/access-tokens",
    i18nKey: "settingsAccessTokens",
    labelFallback: "Access Tokens",
    subtitleKey: "settingsAccessTokensSubtitle",
    icon: "key",
  },
  {
    id: "settings-feature-flags",
    href: "/dashboard/settings/feature-flags",
    i18nKey: "settingsFeatureFlags",
    subtitleKey: "settingsFeatureFlagsSubtitle",
    icon: "flag",
  },
  {
    id: "settings-sidebar",
    href: "/dashboard/settings/sidebar",
    i18nKey: "settingsSidebar",
    subtitleKey: "settingsSidebarSubtitle",
    icon: "view_sidebar",
  },
];

const HELP_ITEMS: readonly SidebarItemDefinition[] = [
  {
    id: "docs",
    href: "/docs",
    i18nKey: "docs",
    subtitleKey: "docsSubtitle",
    icon: "menu_book",
    external: true,
  },
  {
    id: "issues",
    href: "https://github.com/diegosouzapw/OmniRoute/issues",
    i18nKey: "issues",
    subtitleKey: "issuesSubtitle",
    icon: "bug_report",
    external: true,
  },
  {
    id: "changelog",
    href: "/dashboard/changelog",
    i18nKey: "changelog",
    subtitleKey: "changelogSubtitle",
    icon: "campaign",
  },
];

// ─── Sections ────────────────────────────────────────────────────────────────

export const SIDEBAR_SECTIONS: readonly SidebarSectionDefinition[] = [
  {
    id: "home",
    titleKey: "home",
    titleFallback: "Home",
    children: HOME_ITEMS,
    showTitle: false,
  },
  {
    id: "omni-proxy",
    titleKey: "omniProxySection",
    titleFallback: "OmniProxy",
    children: [
      ...OMNI_PROXY_ITEMS,
      COMPRESSION_CONTEXT_GROUP,
      TOOLS_GROUP,
      INTEGRATIONS_GROUP,
      PROXY_ITEM,
    ],
    defaultPinned: true,
  },
  {
    id: "analytics",
    titleKey: "analyticsSection",
    titleFallback: "Analytics",
    children: ANALYTICS_ITEMS,
  },
  {
    id: "costs",
    titleKey: "costsSection",
    titleFallback: "Costs",
    children: COSTS_ITEMS,
  },
  {
    id: "monitoring",
    titleKey: "monitoringSection",
    titleFallback: "Monitoring",
    children: [...MONITORING_ITEMS, LOGS_GROUP, AUDIT_GROUP, SYSTEM_GROUP],
  },
  {
    id: "devtools",
    titleKey: "devtoolsSection",
    titleFallback: "Dev Tools",
    children: DEVTOOLS_ITEMS,
    visibility: "debug",
  },
  {
    id: "agentic-features",
    titleKey: "agenticFeaturesSection",
    titleFallback: "Agentic Features",
    children: AGENTIC_FEATURES_ITEMS,
  },
  {
    id: "other-features",
    titleKey: "otherFeaturesSection",
    titleFallback: "Other Features",
    children: [GAMIFICATION_GROUP, ...OTHER_FEATURES_ITEMS, BATCH_GROUP],
  },
  {
    id: "configuration",
    titleKey: "configurationSection",
    titleFallback: "Configuration",
    children: CONFIGURATION_ITEMS,
  },
  {
    id: "help",
    titleKey: "helpSection",
    titleFallback: "Help",
    children: HELP_ITEMS,
  },
] as const;

// ─── Ordering & preset setting keys ──────────────────────────────────────────

export const HIDDEN_SIDEBAR_ITEMS_SETTING_KEY = "hiddenSidebarItems";
export const SIDEBAR_SECTION_ORDER_KEY = "sidebarSectionOrder";
export const SIDEBAR_ITEM_ORDER_KEY = "sidebarItemOrder";
export const SIDEBAR_PRESET_KEY = "sidebarActivePreset";
export const SIDEBAR_SETTINGS_UPDATED_EVENT = "omniroute:settings-updated";

// ─── Preset types & definitions ───────────────────────────────────────────────

export type SidebarPresetId = "all" | "minimal" | "developer" | "admin";

export interface SidebarPresetDefinition {
  id: SidebarPresetId;
  icon: string;
  hiddenItems: HideableSidebarItemId[];
}

const MINIMAL_SHOWN: ReadonlySet<HideableSidebarItemId> = new Set([
  "home",
  "endpoints",
  "api-manager",
  "providers",
  "combos",
  "analytics",
  "costs",
  "logs",
  "health",
  "settings-general",
  "settings-sidebar",
  "docs",
  "changelog",
]);

const DEVELOPER_SHOWN: ReadonlySet<HideableSidebarItemId> = new Set([
  "home",
  "endpoints",
  "api-manager",
  "providers",
  "combos",
  "quota",
  "context-caveman",
  "context-rtk",
  "context-combos",
  "cli-code",
  "cli-agents",
  "acp-agents",
  "api-endpoints",
  "analytics",
  "analytics-combo-health",
  "costs",
  "cache",
  "logs",
  "health",
  "runtime",
  "translator",
  "playground",
  "memory",
  "skills",
  "mcp",
  "a2a",
  "settings-general",
  "settings-routing",
  "settings-resilience",
  "settings-sidebar",
  "docs",
  "issues",
  "changelog",
]);

const ADMIN_SHOWN: ReadonlySet<HideableSidebarItemId> = new Set([
  "home",
  "endpoints",
  "api-manager",
  "providers",
  "combos",
  "quota",
  "analytics",
  "analytics-combo-health",
  "analytics-utilization",
  "costs",
  "costs-pricing",
  "costs-budget",
  "costs-quota-share",
  "cache",
  "logs",
  "activity",
  "health",
  "runtime",
  "audit",
  "audit-mcp",
  "audit-a2a",
  "settings-general",
  "settings-routing",
  "settings-resilience",
  "settings-security",
  "settings-access-tokens",
  "settings-feature-flags",
  "settings-sidebar",
  "docs",
  "changelog",
]);

function buildHiddenList(shown: ReadonlySet<HideableSidebarItemId>): HideableSidebarItemId[] {
  return HIDEABLE_SIDEBAR_ITEM_IDS.filter((id) => !shown.has(id));
}

export const SIDEBAR_PRESETS: readonly SidebarPresetDefinition[] = [
  { id: "all", icon: "select_all", hiddenItems: [] },
  { id: "minimal", icon: "minimize", hiddenItems: buildHiddenList(MINIMAL_SHOWN) },
  { id: "developer", icon: "code", hiddenItems: buildHiddenList(DEVELOPER_SHOWN) },
  { id: "admin", icon: "admin_panel_settings", hiddenItems: buildHiddenList(ADMIN_SHOWN) },
];

export type SidebarItemOrder = Partial<Record<SidebarSectionId, string[]>>;

// ─── Ordering utilities ───────────────────────────────────────────────────────

export function applySectionOrder(
  sections: readonly SidebarSectionDefinition[],
  order: SidebarSectionId[]
): SidebarSectionDefinition[] {
  if (order.length === 0) return [...sections];
  const knownIds = new Set(sections.map((s) => s.id));
  const validOrder = order.filter((id) => knownIds.has(id));
  const orderMap = new Map(validOrder.map((id, i) => [id, i]));
  return [...sections].sort((a, b) => {
    const ai = orderMap.get(a.id) ?? validOrder.length + sections.indexOf(a);
    const bi = orderMap.get(b.id) ?? validOrder.length + sections.indexOf(b);
    return ai - bi;
  });
}

export function applyItemOrder(
  children: readonly SidebarSectionChild[],
  order: string[]
): SidebarSectionChild[] {
  if (order.length === 0) return [...children];
  const getChildId = (c: SidebarSectionChild): string =>
    "type" in c && c.type === "group" ? c.id : (c as SidebarItemDefinition).id;
  const knownIds = new Set(children.map(getChildId));
  const validOrder = order.filter((id) => knownIds.has(id));
  const orderMap = new Map(validOrder.map((id, i) => [id, i]));
  return [...children].sort((a, b) => {
    const aId = getChildId(a);
    const bId = getChildId(b);
    const ai = orderMap.get(aId) ?? validOrder.length + children.indexOf(a);
    const bi = orderMap.get(bId) ?? validOrder.length + children.indexOf(b);
    return ai - bi;
  });
}

// ─── Settings helpers ─────────────────────────────────────────────────────────

export function normalizeHiddenSidebarItems(value: unknown): HideableSidebarItemId[] {
  if (!Array.isArray(value)) return [];

  const hiddenItems = new Set<HideableSidebarItemId>();

  for (const item of value) {
    if (
      typeof item === "string" &&
      HIDEABLE_SIDEBAR_ITEM_IDS.includes(item as HideableSidebarItemId)
    ) {
      hiddenItems.add(item as HideableSidebarItemId);
    }
  }

  return HIDEABLE_SIDEBAR_ITEM_IDS.filter((item) => hiddenItems.has(item));
}
