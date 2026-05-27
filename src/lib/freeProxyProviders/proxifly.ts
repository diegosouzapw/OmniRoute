import type { FreeProxyItem, FreeProxySyncResult, FreeProxyProvider } from "./types";
import { isPrivateHost } from "@/shared/network/outboundUrlGuard";

const DEFAULT_QUANTITY = 100;
const DEFAULT_ANONYMITY = "elite";

type ProxiflyProxy = {
  ip: string;
  port: number;
  protocol: string;
  country: string;
  anonymity: string;
  speed: number;
};

export class ProxiflyProvider implements FreeProxyProvider {
  readonly id = "proxifly" as const;
  readonly name = "Proxifly";

  isEnabled(): boolean {
    return process.env.FREE_PROXY_PROXIFLY_ENABLED !== "false";
  }

  async sync(): Promise<FreeProxySyncResult> {
    if (!this.isEnabled()) {
      return { fetched: 0, added: 0, updated: 0, errors: ["Proxifly provider disabled"] };
    }

    const { upsertFreeProxy } = await import("../db/freeProxies");
    const quantity =
      parseInt(process.env.FREE_PROXY_PROXIFLY_QUANTITY || "", 10) || DEFAULT_QUANTITY;
    const anonymity = process.env.FREE_PROXY_PROXIFLY_ANONYMITY || DEFAULT_ANONYMITY;

    const errors: string[] = [];
    let added = 0;
    let updated = 0;
    let fetched = 0;

    try {
      const proxiflyModule = await import("proxifly");
      const proxifly = proxiflyModule.default ?? proxiflyModule;
      const result = await (proxifly as { getProxy: (opts: unknown) => Promise<unknown> }).getProxy(
        {
          protocol: "http",
          anonymity: anonymity as "elite" | "anonymous" | "transparent",
          speed: "fast",
          quantity,
        }
      );

      const proxies: ProxiflyProxy[] = Array.isArray(result) ? result : [result as ProxiflyProxy];

      for (const p of proxies) {
        if (!p.ip || !p.port) continue;
        if (isPrivateHost(p.ip)) {
          errors.push(`Proxifly: skipped private/loopback host ${p.ip}`);
          continue;
        }
        const item: FreeProxyItem = {
          source: "proxifly",
          host: p.ip,
          port: Number(p.port),
          type: (p.protocol || "http").toLowerCase() as FreeProxyItem["type"],
          countryCode: p.country?.slice(0, 2).toUpperCase() || null,
          qualityScore: p.speed != null ? Math.min(100, Math.max(0, Math.round(p.speed))) : null,
          latencyMs: null,
          anonymity: p.anonymity || null,
          lastValidated: new Date().toISOString(),
        };
        const r = await upsertFreeProxy(item);
        if (r.action === "created") added++;
        else updated++;
        fetched++;
      }
    } catch (err) {
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
    return listFreeProxiesBySource("proxifly", filters);
  }
}
