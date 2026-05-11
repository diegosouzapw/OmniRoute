export const HIDEABLE_SIDEBAR_ITEM_IDS = [
  "home",
  "endpoints",
  "api-manager",
  "providers",
  "combos",
  "batch",
  "costs",
  "analytics",
  "cache",
  "context-caveman",
  "context-rtk",
  "context-combos",
  "limits",
  "cli-tools",
  "agents",
  "memory",
  "skills",
  "translator",
  "playground",
  "media",
  "search-tools",
  "logs",
  "audit",
  "webhooks",
  "health",
  "proxy",
  "settings",
  "docs",
  "issues",
  "changelog",
] as const;

export type HideableSidebarItemId = (typeof HIDEABLE_SIDEBAR_ITEM_IDS)[number];
export type SidebarSectionId = "primary" | "context" | "cli" | "debug" | "system" | "help";

export interface SidebarItemDefinition {
  id: HideableSidebarItemId;
  href: string;
  i18nKey: string;
  icon: string;
  exact?: boolean;
  external?: boolean;
}

export interface SidebarSectionDefinition {
  id: SidebarSectionId;
  titleKey: string;
  titleFallback: string;
  items: readonly SidebarItemDefinition[];
  showTitleInSidebar?: boolean;
  visibility?: "always" | "debug";
}

const PRIMARY_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { id: "home", href: "/dashboard", i18nKey: "home", icon: "home", exact: true },
  { id: "endpoints", href: "/dashboard/endpoint", i18nKey: "endpoints", icon: "api" },
  { id: "api-manager", href: "/dashboard/api-manager", i18nKey: "apiManager", icon: "vpn_key" },
  { id: "providers", href: "/dashboard/providers", i18nKey: "providers", icon: "dns" },
  { id: "combos", href: "/dashboard/combos", i18nKey: "combos", icon: "layers" },
  { id: "batch", href: "/dashboard/batch", i18nKey: "batch", icon: "view_list" },
  { id: "costs", href: "/dashboard/costs", i18nKey: "costs", icon: "account_balance_wallet" },
  { id: "analytics", href: "/dashboard/analytics", i18nKey: "analytics", icon: "analytics" },
  { id: "cache", href: "/dashboard/cache", i18nKey: "cache", icon: "cached" },
  { id: "limits", href: "/dashboard/limits", i18nKey: "limits", icon: "tune" },
  { id: "media", href: "/dashboard/cache/media", i18nKey: "media", icon: "perm_media" },
];

const CLI_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { id: "cli-tools", href: "/dashboard/cli-tools", i18nKey: "cliToolsShort", icon: "terminal" },
  { id: "agents", href: "/dashboard/agents", i18nKey: "agents", icon: "smart_toy" },
  { id: "memory", href: "/dashboard/memory", i18nKey: "memory", icon: "psychology" },
  { id: "skills", href: "/dashboard/skills", i18nKey: "skills", icon: "auto_fix_high" },
];

const CONTEXT_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  {
    id: "context-caveman",
    href: "/dashboard/context/caveman",
    i18nKey: "contextCaveman",
    icon: "compress",
  },
  {
    id: "context-rtk",
    href: "/dashboard/context/rtk",
    i18nKey: "contextRtk",
    icon: "filter_alt",
  },
  {
    id: "context-combos",
    href: "/dashboard/context/combos",
    i18nKey: "contextCombos",
    icon: "hub",
  },
];

const DEBUG_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { id: "translator", href: "/dashboard/translator", i18nKey: "translator", icon: "translate" },
  { id: "playground", href: "/dashboard/playground", i18nKey: "playground", icon: "science" },
  {
    id: "search-tools",
    href: "/dashboard/search-tools",
    i18nKey: "searchTools",
    icon: "manage_search",
  },
];

const SYSTEM_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { id: "logs", href: "/dashboard/logs", i18nKey: "logs", icon: "description" },
  { id: "audit", href: "/dashboard/audit", i18nKey: "auditLog", icon: "policy" },
  { id: "webhooks", href: "/dashboard/webhooks", i18nKey: "webhooks", icon: "webhook" },
  { id: "health", href: "/dashboard/health", i18nKey: "health", icon: "health_and_safety" },
  { id: "proxy", href: "/dashboard/system/proxy", i18nKey: "proxy", icon: "dns" },
  { id: "settings", href: "/dashboard/settings", i18nKey: "settings", icon: "settings" },
];

const HELP_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
  { id: "docs", href: "/docs", i18nKey: "docs", icon: "menu_book", external: true },
  {
    id: "issues",
    href: "https://github.com/diegosouzapw/OmniRoute/issues",
    i18nKey: "issues",
    icon: "bug_report",
    external: true,
  },
  { id: "changelog", href: "/dashboard/changelog", i18nKey: "changelog", icon: "campaign" },
];

export const SIDEBAR_SECTIONS: readonly SidebarSectionDefinition[] = [
  {
    id: "primary",
    titleKey: "primarySection",
    titleFallback: "Main",
    items: PRIMARY_SIDEBAR_ITEMS,
    showTitleInSidebar: false,
  },
  {
    id: "context",
    titleKey: "contextSection",
    titleFallback: "Context & Cache",
    items: CONTEXT_SIDEBAR_ITEMS,
  },
  {
    id: "cli",
    titleKey: "cliSection",
    titleFallback: "CLI",
    items: CLI_SIDEBAR_ITEMS,
  },
  {
    id: "debug",
    titleKey: "debugSection",
    titleFallback: "Debug",
    items: DEBUG_SIDEBAR_ITEMS,
    visibility: "debug",
  },
  {
    id: "system",
    titleKey: "systemSection",
    titleFallback: "System",
    items: SYSTEM_SIDEBAR_ITEMS,
  },
  {
    id: "help",
    titleKey: "helpSection",
    titleFallback: "Help",
    items: HELP_SIDEBAR_ITEMS,
  },
] as const;

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
