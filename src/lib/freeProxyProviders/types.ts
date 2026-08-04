export type FreeProxySourceId = "1proxy" | "proxifly" | "iplocate" | "webshare";

export interface FreeProxyItem {
  source: FreeProxySourceId;
  host: string;
  port: number;
  type: "http" | "https" | "socks4" | "socks5";
  countryCode: string | null;
  qualityScore: number | null; // 0-100, normalizado entre fontes
  latencyMs: number | null;
  anonymity: string | null; // 'elite' | 'anonymous' | 'transparent'
  lastValidated: string | null; // ISO timestamp
}

export interface FreeProxySyncResult {
  fetched: number;
  added: number;
  updated: number;
  errors: string[];
}

export interface FreeProxyProvider {
  readonly id: FreeProxySourceId;
  readonly name: string;
  isEnabled(): boolean;
  sync(): Promise<FreeProxySyncResult>;
  list(filters: {
    protocol?: string;
    country?: string;
    minQuality?: number;
    limit?: number;
  }): Promise<FreeProxyItem[]>;
}
