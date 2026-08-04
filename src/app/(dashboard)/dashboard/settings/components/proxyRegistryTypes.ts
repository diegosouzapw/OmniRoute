// Client-safe types for the proxy registry UI. This module MUST NOT import
// server-only code (e.g. `lib/db/proxies/mappers`, which pulls in node `crypto`
// via the encryption helper) — it is imported by "use client" components.
//
// `RelayRepairMode` mirrors the server-side union returned by
// `relayRepairMode()` in lib/db/proxies/mappers.ts. Keep the two in sync.

export type RelayRepairMode = "noop" | "recovered" | "redeploy" | null;

export interface RelayInfo {
  isRelay: boolean;
  authMissing: boolean;
  repairMode: RelayRepairMode;
}

export interface ProxyItem {
  id: string;
  name: string;
  type: string;
  host: string;
  port: number;
  username?: string | null;
  password?: string | null;
  region?: string | null;
  notes?: string | null;
  status?: string;
  family?: string;
  relayInfo?: RelayInfo;
}
