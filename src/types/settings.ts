/**
 * Application settings stored in SQLite key-value pairs.
 */
export interface Settings {
  requireLogin: boolean;
  hasPassword: boolean;
  fallbackStrategy: "fill-first" | "round-robin";
  stickyRoundRobinLimit: number;
  jwtSecret?: string;
}

export interface ComboDefaults {
  strategy: "priority" | "weighted" | "round-robin";
  maxRetries: number;
  retryDelayMs: number;
  timeoutMs: number;
  healthCheckEnabled: boolean;
  healthCheckTimeoutMs: number;
  maxComboDepth: number;
  trackMetrics: boolean;
  concurrencyPerModel?: number;
  queueTimeoutMs?: number;
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
