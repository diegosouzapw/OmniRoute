export type JsonRecord = Record<string, unknown>;
export type ProxyScope = "global" | "provider" | "account" | "combo";

// Rotation strategy applied when a scope has a POOL of proxies (#6365). Defaults
// to `round-robin` (monotonic persisted cursor — never Math.random). `random`
// picks uniformly from the alive set; `sticky` holds the same member for a
// configurable window before advancing the cursor.
export type ProxyRotationStrategy = "round-robin" | "random" | "sticky" | "latency";
export const PROXY_ROTATION_STRATEGIES: readonly ProxyRotationStrategy[] = [
  "round-robin",
  "random",
  "sticky",
  "latency",
];
export const DEFAULT_PROXY_ROTATION_STRATEGY: ProxyRotationStrategy = "round-robin";

export interface ProxyRegistryRecord {
  id: string;
  name: string;
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  region: string | null;
  notes: string | null;
  status: string;
  source: string;
  family: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProxyAssignmentRecord {
  id: number;
  proxyId: string;
  scope: ProxyScope;
  scopeId: string | null;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProxyPayload {
  name: string;
  type: string;
  host: string;
  port: number;
  username?: string;
  password?: string;
  region?: string | null;
  notes?: string | null;
  status?: string;
  source?: string;
  family?: string;
}

export interface ProxyAssignmentPayload {
  scope: string;
  scopeId?: string | null;
}

export interface ProxyMutationResult {
  proxy: ProxyRegistryRecord;
  assignment: ProxyAssignmentRecord | null;
}

export type LegacyProxyClearStatus = "cleared" | "absent";

export interface ProxyTransactionResult extends ProxyMutationResult {
  legacyClearStatus: LegacyProxyClearStatus;
}

export interface LegacyProxyConfig {
  global?: unknown;
  providers?: Record<string, unknown>;
  combos?: Record<string, unknown>;
  keys?: Record<string, unknown>;
}
