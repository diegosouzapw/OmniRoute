import type { FreeProxyItem, FreeProxySyncResult, FreeProxyProvider } from "./types";
import { isPrivateHost } from "@/shared/network/outboundUrlGuard";

const DEFAULT_API_URL = "https://proxy.webshare.io/api/v2/proxy/list/";
const DEFAULT_MAX = 500;
const DEFAULT_PAGE_SIZE = 100;
const DEFAULT_TIMEOUT_MS = 15_000;
const MAX_PAGES = 50; // hard stop so a misbehaving `next` cursor can't loop forever

type WebshareApiProxy = {
  proxy_address?: string;
  port?: number;
  valid?: boolean;
  country_code?: string | null;
  last_verification?: string | null;
};

type WebshareApiResponse = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: WebshareApiProxy[];
};

/**
 * Webshare (https://proxy.webshare.io) proxy pool — imports the operator's
 * purchased/rotating proxy list via the account API. Unlike the other
 * free-proxy sources this is a paid, per-account list, so it is gated on an
 * API key rather than a plain on/off flag: `isEnabled()` returns false
 * whenever no key is configured, regardless of `FREE_PROXY_WEBSHARE_ENABLED`.
 */
export class WebshareProvider implements FreeProxyProvider {
  readonly id = "webshare" as const;
  readonly name = "Webshare";

  isEnabled(): boolean {
    if (process.env.FREE_PROXY_WEBSHARE_ENABLED === "false") return false;
    return Boolean(process.env.FREE_PROXY_WEBSHARE_API_KEY);
  }

  private getConfig() {
    return {
      apiUrl: process.env.FREE_PROXY_WEBSHARE_API_URL || DEFAULT_API_URL,
      apiKey: process.env.FREE_PROXY_WEBSHARE_API_KEY || "",
      maxProxies: parseInt(process.env.FREE_PROXY_WEBSHARE_MAX || "", 10) || DEFAULT_MAX,
    };
  }

  async sync(): Promise<FreeProxySyncResult> {
    if (!this.isEnabled()) {
      return {
        fetched: 0,
        added: 0,
        updated: 0,
        errors: ["Webshare provider disabled (set FREE_PROXY_WEBSHARE_API_KEY to enable)"],
      };
    }

    const { upsertFreeProxy } = await import("../db/freeProxies");
    const { pruneStaleFreeProxies } = await import("../db/freeProxies");
    const { apiUrl, apiKey, maxProxies } = this.getConfig();

    const errors: string[] = [];
    const activeKeys = new Set<string>();
    let added = 0;
    let updated = 0;
    let fetched = 0;
    let page = 1;

    try {
      while (fetched < maxProxies && page <= MAX_PAGES) {
        const url = new URL(apiUrl);
        url.searchParams.set("mode", "direct");
        url.searchParams.set("page", String(page));
        url.searchParams.set("page_size", String(Math.min(DEFAULT_PAGE_SIZE, maxProxies - fetched)));

        const res = await fetch(url, {
          signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
          headers: { Authorization: `Token ${apiKey}` },
        });

        if (!res.ok) {
          // Response bodies never contain the request's own Authorization
          // header, so this is safe to surface verbatim (truncated) without
          // leaking the API key.
          const text = await res.text().catch(() => "");
          errors.push(`HTTP ${res.status}: ${text.slice(0, 100)}`);
          break;
        }

        const json = (await res.json()) as WebshareApiResponse;
        const results = Array.isArray(json.results) ? json.results : [];
        if (results.length === 0) break;

        for (const p of results) {
          if (!p.proxy_address || !p.port) continue;
          if (isPrivateHost(p.proxy_address)) {
            errors.push(`Webshare: skipped private/loopback host ${p.proxy_address}`);
            continue;
          }
          if (p.valid === false) continue;

          activeKeys.add(`${p.proxy_address}:${p.port}`);

          const item: FreeProxyItem = {
            source: "webshare",
            host: p.proxy_address,
            port: p.port,
            type: "http",
            countryCode: p.country_code || null,
            qualityScore: null,
            latencyMs: null,
            anonymity: null,
            lastValidated: p.last_verification || new Date().toISOString(),
          };
          const result = await upsertFreeProxy(item);
          if (result.action === "created") added++;
          else updated++;
          fetched++;
        }

        if (!json.next) break;
        page++;
      }

      // Tombstone rows this account no longer lists (recycled/retired IDs).
      // Only run this when the sync completed without a hard error, so a
      // failed fetch never wipes out a previously-good candidate list.
      if (errors.length === 0 && fetched > 0) {
        await pruneStaleFreeProxies("webshare", activeKeys);
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
    return listFreeProxiesBySource("webshare", filters);
  }
}
