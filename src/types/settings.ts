import type { HideableSidebarItemId } from "@/shared/constants/sidebarVisibility";
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
  jwtSecret?: string;
  mcpEnabled?: boolean;
  mcpTransport?: "stdio" | "sse" | "streamable-http";
  a2aEnabled?: boolean;
  hideHealthCheckLogs?: boolean;
  hideEndpointCloudflaredTunnel?: boolean;
  hideEndpointTailscaleFunnel?: boolean;
  hideEndpointNgrokTunnel?: boolean;
  hiddenSidebarItems?: HideableSidebarItemId[];
  resilienceSettings?: ResilienceSettings;
}

export interface ComboDefaults {
  strategy: RoutingStrategyValue;
  maxRetries: number;
  retryDelayMs: number;
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
