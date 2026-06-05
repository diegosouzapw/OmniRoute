import type {
  HideableSidebarItemId,
  SidebarItemOrder,
  SidebarPresetId,
  SidebarSectionId,
} from "@/shared/constants/sidebarVisibility";
import type { ResilienceSettings } from "@/lib/resilience/settings";
import type {
  AccountFallbackStrategyValue,
  RoutingStrategyValue,
} from "@/shared/constants/routingStrategies";

/**
 * Application settings stored in SQLite key-value pairs.
 */
export interface Settings {
  requireLogin: boolean;
  hasPassword: boolean;
  fallbackStrategy: AccountFallbackStrategyValue;
  stickyRoundRobinLimit: number;
  requestRetry: number;
  maxRetryIntervalSec: number;
  maxBodySizeMb?: number;
  jwtSecret?: string;
  mcpEnabled?: boolean;
  mcpTransport?: "stdio" | "sse" | "streamable-http";
  a2aEnabled?: boolean;
  hideHealthCheckLogs?: boolean;
  hideEndpointCloudflaredTunnel?: boolean;
  hideEndpointTailscaleFunnel?: boolean;
  hideEndpointNgrokTunnel?: boolean;
  autoRefreshProviderQuota?: boolean;
  autoRefreshProviderQuotaInterval?: number;
  pinProviderQuotaToHome?: boolean;
  showQuickStartOnHome?: boolean;
  showProviderTopologyOnHome?: boolean;
  hiddenSidebarItems?: HideableSidebarItemId[];
  sidebarSectionOrder?: SidebarSectionId[];
  sidebarItemOrder?: SidebarItemOrder;
  sidebarActivePreset?: SidebarPresetId;
  resilienceSettings?: ResilienceSettings;
  // LOCAL_ONLY manage-scope bypass policy (DB-stored, hot-reloaded by
  // `applyRuntimeSettings` → `applyAuthzBypassSection`). The route guard
  // consults `getAuthzBypassSnapshot()` on the hot path; these fields are
  // the persisted source of truth that feeds that snapshot.
  localOnlyManageScopeBypassEnabled?: boolean;
  localOnlyManageScopeBypassPrefixes?: string[];
}

export interface ComboDefaults {
  strategy: RoutingStrategyValue;
  maxRetries: number;
  retryDelayMs: number;
  fallbackDelayMs?: number;
  maxComboDepth: number;
  trackMetrics: boolean;
  concurrencyPerModel?: number;
  queueTimeoutMs?: number;
  handoffThreshold?: number;
  handoffModel?: string;
  handoffProviders?: string[];
  maxMessagesForSummary?: number;
}

export interface ProxyConfig {
  type: "http" | "https" | "socks5";
  host: string;
  port: number;
  username?: string;
  password?: string;
}

export interface KVPair {
  key: string;
  value: string;
}
