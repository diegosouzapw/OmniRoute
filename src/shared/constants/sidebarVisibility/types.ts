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
  "context-omniglyph",
  "compression-studio",
  "compression-exclusions",
  // OmniProxy > Tools
  "cli-code",
  "cli-agents",
  "acp-agents",
  "cloud-agents",
  "conductor",
  "orchestration",
  "agent-bridge",
  "traffic-inspector",
  "discovery",
  // OmniProxy > Integrations
  "api-endpoints",
  "webhooks",
  "log-export",
  // OmniProxy — proxy tools
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
  "logs-timeline",
  "conversations",
  "logs-activity",
  "health",
  "runtime",
  "resilience-connections",
  // Costs section
  "costs-pricing",
  "costs-budget",
  "costs-free-tiers",
  "costs-quota-share",
  "free-provider-rankings",
  "radar",
  "radar-admin",
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
  "chaos-config",
  "mcp",
  "a2a",
  "plugins",
  // Gamification
  "leaderboard",
  "profile",
  "tokens",
  "gamification-admin",
  // Other Features — flat
  "media",
  // Other Features > Batch
  "batch",
  "batch-files",
  // Configuration
  "settings-general",
  "settings-appearance",
  "settings-ai",
  "settings-modality-bridge",
  "settings-routing",
  "settings-resilience",
  "settings-advanced",
  "settings-security",
  "settings-access-tokens",
  "settings-feature-flags",
  "settings-cache",
  "settings-sidebar",
  // Help
  "docs",
  "issues",
  "changelog",
] as const;

export type HideableSidebarItemId = (typeof HIDEABLE_SIDEBAR_ITEM_IDS)[number];

/** Sidebar entries that are intentionally always available and cannot be hidden by presets. */
export type AlwaysVisibleSidebarItemId = "proxy";

export type SidebarItemId = HideableSidebarItemId | AlwaysVisibleSidebarItemId;

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
  id: SidebarItemId;
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
  /**
   * Opt-in feature-flag gate. When present, the item is only shown while the
   * named flag resolves to `true` server-side. Sidebar.tsx has no built-in
   * feature-flag awareness — the flag's resolved value is fetched once
   * (piggy-backed on the existing `/api/settings` call) and passed through
   * `isSidebarItemVisibleForFlags()` alongside the existing hidden-items
   * filter. Add new flag keys to this union as new flag-gated items appear.
   */
  featureFlagKey?: "RADAR_ENABLED";
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

export type SidebarPresetId = "all" | "essentials" | "minimal" | "developer" | "admin";

export interface SidebarPresetDefinition {
  id: SidebarPresetId;
  icon: string;
  hiddenItems: HideableSidebarItemId[];
}

export type SidebarItemOrder = Partial<Record<SidebarSectionId, string[]>>;
