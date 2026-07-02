export type JsonRecord = Record<string, unknown>;
export type ProxyScope = "global" | "provider" | "account" | "combo";

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
