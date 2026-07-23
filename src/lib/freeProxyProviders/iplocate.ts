import type { FreeProxyItem, FreeProxySyncResult, FreeProxyProvider } from "./types";
import { isPrivateHost } from "@/shared/network/outboundUrlGuard";

const BASE_URL = "https://raw.githubusercontent.com/iplocate/free-proxy-list/main/protocols";
const PROTOCOLS = ["http", "https", "socks4", "socks5"] as const;

// In-module cache to respect GitHub raw rate limits
let lastFetchAt = 0;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 min

export class IplocateProvider implements FreeProxyProvider {
  readonly id = "iplocate" as const;
  readonly name = "IPLocate";

  isEnabled(): boolean {
    return process.env.FREE_PROXY_IPLOCATE_ENABLED === "true";
  }

  async sync(): Promise<FreeProxySyncResult> {
    if (!this.isEnabled()) {
      return {
        fetched: 0,
        added: 0,
        updated: 0,
        errors: ["IPLocate provider disabled (opt-in via FREE_PROXY_IPLOCATE_ENABLED=true)"],
      };
    }

    const now = Date.now();
    if (now - lastFetchAt < CACHE_TTL_MS) {
      return { fetched: 0, added: 0, updated: 0, errors: ["IPLocate: cache fresh, skipping sync"] };
    }

    const { upsertFreeProxy } = await import("../db/freeProxies");
    const baseUrl = process.env.FREE_PROXY_IPLOCATE_BASE_URL || BASE_URL;
    const errors: string[] = [];
    let added = 0;
    let updated = 0;
    let fetched = 0;

    for (const proto of PROTOCOLS) {
      try {
        // #5595: the iplocate/free-proxy-list repo serves plain-text `ip:port`
        // lists at `<proto>.txt` — the previous `<proto>.json` path 404'd on every
        // protocol (and `res.json()` would fail even if it didn't, since the
        // payload is not JSON).
        const url = `${baseUrl}/${proto}.txt`;
        const res = await fetch(url, {
          signal: AbortSignal.timeout(15000),
          headers:
            lastFetchAt > 0 ? { "If-Modified-Since": new Date(lastFetchAt).toUTCString() } : {},
        });

        if (res.status === 304) continue;
        if (!res.ok) {
          errors.push(`${proto}: HTTP ${res.status}`);
          continue;
        }

        const text = await res.text();
        for (const line of text.split(/\r?\n/)) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;
          const sep = trimmed.lastIndexOf(":");
          if (sep <= 0) continue;
          const host = trimmed.slice(0, sep).trim();
          const port = Number(trimmed.slice(sep + 1).trim());
          if (!host || !Number.isInteger(port) || port < 1 || port > 65535) continue;
          if (isPrivateHost(host)) {
            errors.push(`${proto}: skipped private/loopback host ${host}`);
            continue;
          }
          const item: FreeProxyItem = {
            source: "iplocate",
            host,
            port,
            type: proto,
            countryCode: null, // the txt list carries no country data
            qualityScore: null,
            latencyMs: null,
            anonymity: null,
            lastValidated: new Date().toISOString(),
          };
          const r = await upsertFreeProxy(item);
          if (r.action === "created") added++;
          else updated++;
          fetched++;
        }
      } catch (err) {
        errors.push(`${proto}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    lastFetchAt = Date.now();
    return { fetched, added, updated, errors };
  }

  async list(filters: {
    protocol?: string;
    country?: string;
    minQuality?: number;
    limit?: number;
  }): Promise<FreeProxyItem[]> {
    const { listFreeProxiesBySource } = await import("../db/freeProxies");
    return listFreeProxiesBySource("iplocate", filters);
  }
}
