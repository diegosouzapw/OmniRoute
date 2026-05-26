import type { FreeProxyItem, FreeProxySyncResult, FreeProxyProvider } from "./types";

const DEFAULT_API_URL = "https://1proxy-api.aitradepulse.com/api/v1/proxies/advanced";
const DEFAULT_MAX = 500;
const DEFAULT_MIN_QUALITY = 50;
const DEFAULT_PAGE_SIZE = 100;
const MAX_CONSECUTIVE_FAILURES = 5;

type OneProxyApiProxy = {
  ip: string;
  port: number;
  protocol: string;
  country_code: string;
  latency_ms: number;
  anonymity: string;
  quality_score: number;
  last_validated: string;
};

type OneProxyApiResponse = {
  total: number;
  count: number;
  offset: number;
  proxies: OneProxyApiProxy[];
};

export class OneproxyProvider implements FreeProxyProvider {
  readonly id = "1proxy" as const;
  readonly name = "1proxy";

  private consecutiveFailures = 0;

  isEnabled(): boolean {
    return process.env.FREE_PROXY_1PROXY_ENABLED !== "false";
  }

  private getConfig() {
    return {
      apiUrl: process.env.FREE_PROXY_1PROXY_API_URL || DEFAULT_API_URL,
      maxProxies: parseInt(process.env.FREE_PROXY_1PROXY_MAX || "", 10) || DEFAULT_MAX,
      minQuality:
        parseInt(process.env.FREE_PROXY_1PROXY_MIN_QUALITY || "", 10) || DEFAULT_MIN_QUALITY,
    };
  }

  async sync(): Promise<FreeProxySyncResult> {
    if (!this.isEnabled()) {
      return { fetched: 0, added: 0, updated: 0, errors: ["1proxy provider disabled"] };
    }
    if (this.consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
      return {
        fetched: 0,
        added: 0,
        updated: 0,
        errors: [`Circuit breaker open: ${this.consecutiveFailures} consecutive failures`],
      };
    }

    const { upsertFreeProxy } = await import("../db/freeProxies");
    const { apiUrl, maxProxies, minQuality } = this.getConfig();
    const errors: string[] = [];
    let added = 0;
    let updated = 0;
    let fetched = 0;
    let offset = 0;

    try {
      while (fetched < maxProxies) {
        const limit = Math.min(DEFAULT_PAGE_SIZE, maxProxies - fetched);
        const url = `${apiUrl}?offset=${offset}&limit=${limit}&min_quality_score=${minQuality}`;
        const res = await fetch(url, { signal: AbortSignal.timeout(15000) });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          errors.push(`HTTP ${res.status}: ${text.slice(0, 100)}`);
          this.consecutiveFailures++;
          break;
        }

        const json = (await res.json()) as OneProxyApiResponse;
        if (!Array.isArray(json.proxies) || json.proxies.length === 0) break;

        for (const p of json.proxies) {
          const item: FreeProxyItem = {
            source: "1proxy",
            host: p.ip,
            port: p.port,
            type: (p.protocol?.toLowerCase() as FreeProxyItem["type"]) || "http",
            countryCode: p.country_code || null,
            qualityScore: p.quality_score ?? null,
            latencyMs: p.latency_ms ?? null,
            anonymity: p.anonymity || null,
            lastValidated: p.last_validated || new Date().toISOString(),
          };
          const result = await upsertFreeProxy(item);
          if (result.action === "created") added++;
          else updated++;
        }

        fetched += json.proxies.length;
        offset += json.proxies.length;
        if (json.proxies.length < limit) break;
      }
      this.consecutiveFailures = 0;
    } catch (err) {
      this.consecutiveFailures++;
      errors.push(err instanceof Error ? err.message : String(err));
    }

    return { fetched, added, updated, errors };
  }

  async list(filters: {
    protocol?: string;
    country?: string;
    minQuality?: number;
    limit?: number;
  }): Promise<FreeProxyItem[]> {
    const { listFreeProxiesBySource } = await import("../db/freeProxies");
    return listFreeProxiesBySource("1proxy", filters);
  }
}
