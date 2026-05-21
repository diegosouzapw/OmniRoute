export const HIDEABLE_SIDEBAR_ITEM_IDS = [
  // Home
  "home",
  // OmniProxy — flat
  "api-manager",
  "endpoints",
  "providers",
  "combos",
  "quota",
  // OmniProxy > Compression Context
  "context-caveman",
  "context-rtk",
  "context-combos",
  // OmniProxy > Tools
  "cli-tools",
  "agents",
  "cloud-agents",
  // OmniProxy > Integrations
  "api-endpoints",
  "webhooks",
  // OmniProxy > Proxy
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
  // Monitoring — flat
  "logs",
  "logs-proxy",
  "logs-console",
  "logs-activity",
  "health",
  "runtime",
  // Monitoring > Costs Parameters
  "costs-pricing",
  "costs-budget",
  "costs-quota-share",
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
  "settings",
  "settings-general",
  "settings-appearance",
  "settings-ai",
  "settings-routing",
  "settings-resilience",
  "settings-advanced",
  "settings-security",
  "settings-feature-flags",
  // Help
  "docs",
  "issues",
  "changelog",
] as const;

export type HideableSidebarItemId = (typeof HIDEABLE_SIDEBAR_ITEM_IDS)[number];

export type SidebarSectionId =
  | "home"
  | "omni-proxy"
  | "analytics"
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
    id: "combos",
    href: "/dashboard/combos",
    i18nKey: "combos",
    subtitleKey: "combosSubtitle",
    icon: "layers",
  },
  {
    id: "quota",
    href: "/dashboard/quota",
    i18nKey: "providerQuota",
    subtitleKey: "providerQuotaSubtitle",
    icon: "tune",
  },
];

const COMPRESSION_CONTEXT_GROUP: SidebarItemGroup = {
  type: "group",
  id: "compression-context",
  titleKey: "compressionContextGroup",
  titleFallback: "Compression Context",
  items: [
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
      id: "context-combos",
      href: "/dashboard/context/combos",
      i18nKey: "contextCombos",
      subtitleKey: "contextCombosSubtitle",
      icon: "hub",
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
      id: "cli-tools",
      href: "/dashboard/cli-tools",
      i18nKey: "cliTools",
      subtitleKey: "cliToolsSubtitle",
      icon: "terminal",
    },
    {
      id: "agents",
      href: "/dashboard/agents",
      i18nKey: "agents",
      subtitleKey: "agentsSubtitle",
      icon: "smart_toy",
    },
    {
      id: "cloud-agents",
      href: "/dashboard/cloud-agents",
      i18nKey: "cloudAgents",
      subtitleKey: "cloudAgentsSubtitle",
      icon: "cloud",
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

const PROXY_GROUP: SidebarItemGroup = {
  type: "group",
  id: "proxy",
  titleKey: "proxyGroup",
  titleFallback: "Proxy",
  items: [
    {
      id: "proxy",
      href: "/dashboard/system/proxy",
      i18nKey: "proxy",
      subtitleKey: "proxySubtitle",
      icon: "dns",
    },
    {
      id: "mitm-proxy",
      href: "/dashboard/system/mitm-proxy",
      i18nKey: "mitmProxy",
      subtitleKey: "mitmProxySubtitle",
      icon: "lan",
    },
    {
      id: "1proxy",
      href: "/dashboard/system/1proxy",
      i18nKey: "oneProxy",
      subtitleKey: "oneProxySubtitle",
      icon: "public",
    },
  ],
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
    id: "costs",
    href: "/dashboard/costs",
    i18nKey: "costs",
    subtitleKey: "costsSubtitle",
    icon: "account_balance_wallet",
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
];

const MONITORING_ITEMS: readonly SidebarItemDefinition[] = [
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
  {
    id: "logs-activity",
    href: "/dashboard/logs/activity",
    i18nKey: "logsActivity",
    subtitleKey: "logsActivitySubtitle",
    icon: "history",
  },
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
];

const COSTS_PARAMS_GROUP: SidebarItemGroup = {
  type: "group",
  id: "costs-parameters",
  titleKey: "costsParametersGroup",
  titleFallback: "Costs Parameters",
  items: [
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
      id: "costs-quota-share",
      href: "/dashboard/costs/quota-share",
      i18nKey: "costsQuotaShare",
      subtitleKey: "costsQuotaShareSubtitle",
      icon: "pie_chart",
    },
  ],
};

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

const MCP_GROUP: SidebarItemGroup = {
  type: "group",
  id: "mcp",
  titleKey: "mcp",
  titleFallback: "MCP Server",
  items: [
    {
      id: "mcp",
      href: "/dashboard/mcp",
      i18nKey: "mcp",
      subtitleKey: "mcpSubtitle",
      icon: "hub",
    },
  ],
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
    id: "skills",
    href: "/dashboard/skills",
    i18nKey: "omniSkills",
    subtitleKey: "omniSkillsSubtitle",
    icon: "auto_fix_high",
  },
  {
    id: "agent-skills",
    href: "/dashboard/agent-skills",
    i18nKey: "agentSkills",
    subtitleKey: "agentSkillsSubtitle",
    icon: "share",
  },
  MCP_GROUP,
  {
    id: "a2a",
    href: "/dashboard/a2a",
    i18nKey: "a2a",
    subtitleKey: "a2aSubtitle",
    icon: "device_hub",
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
    id: "settings",
    href: "/dashboard/settings",
    i18nKey: "settings",
    subtitleKey: "settingsSubtitle",
    icon: "settings",
  },
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
    id: "settings-feature-flags",
    href: "/dashboard/settings/feature-flags",
    i18nKey: "settingsFeatureFlags",
    subtitleKey: "settingsFeatureFlagsSubtitle",
    icon: "flag",
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
      PROXY_GROUP,
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
    id: "monitoring",
    titleKey: "monitoringSection",
    titleFallback: "Monitoring",
    children: [...MONITORING_ITEMS, COSTS_PARAMS_GROUP, AUDIT_GROUP],
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

// ─── Settings helpers ─────────────────────────────────────────────────────────

export const HIDDEN_SIDEBAR_ITEMS_SETTING_KEY = "hiddenSidebarItems";
export const SIDEBAR_SETTINGS_UPDATED_EVENT = "omniroute:settings-updated";

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
