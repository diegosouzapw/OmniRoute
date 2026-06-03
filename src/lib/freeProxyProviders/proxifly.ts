import type { FreeProxyItem, FreeProxySyncResult, FreeProxyProvider } from "./types";
import { isPrivateHost } from "@/shared/network/outboundUrlGuard";

const DEFAULT_QUANTITY = 100;
const DEFAULT_ANONYMITY = "elite";
const DEFAULT_API_URL = "https://api.proxifly.dev/proxy";
const DEFAULT_PROTOCOL = "http";
const DEFAULT_TIMEOUT_MS = 15_000;
const MAX_BATCH_QUANTITY = 20;

type ProxiflyProxy = {
  ip?: string;
  port?: number | string;
  protocol?: string;
  country?: string;
  anonymity?: string;
  speed?: number;
  score?: number;
  quality_score?: number;
  geolocation?: {
    country?: string | null;
  } | null;
};

function parsePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = parseInt(value || "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizeProxyResponse(value: unknown): ProxiflyProxy[] {
  if (Array.isArray(value)) return value as ProxiflyProxy[];
  if (value && typeof value === "object") {
    const maybeWrapped = value as { proxies?: unknown };
    if (Array.isArray(maybeWrapped.proxies)) return maybeWrapped.proxies as ProxiflyProxy[];
    return [value as ProxiflyProxy];
  }
  return [];
}

function normalizeProxyType(protocol: string | undefined): FreeProxyItem["type"] {
  const normalized = protocol?.toLowerCase();
  return normalized === "https" || normalized === "socks4" || normalized === "socks5"
    ? normalized
    : "http";
}

function normalizeQualityScore(proxy: ProxiflyProxy): number | null {
  const raw = proxy.speed ?? proxy.quality_score ?? proxy.score;
  if (raw == null || !Number.isFinite(raw)) return null;
  return Math.min(100, Math.max(0, Math.round(raw)));
}

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
    const quantity = parsePositiveInt(process.env.FREE_PROXY_PROXIFLY_QUANTITY, DEFAULT_QUANTITY);
    const anonymity = process.env.FREE_PROXY_PROXIFLY_ANONYMITY || DEFAULT_ANONYMITY;

    const errors: string[] = [];
    let added = 0;
    let updated = 0;
    let fetched = 0;
    let requested = 0;

    try {
      while (requested < quantity) {
        const batchQuantity = Math.min(MAX_BATCH_QUANTITY, quantity - requested);
        const url = new URL(DEFAULT_API_URL);
        url.searchParams.set("format", "json");
        url.searchParams.set("quantity", String(batchQuantity));
        url.searchParams.set("protocol", DEFAULT_PROTOCOL);
        url.searchParams.set("anonymity", anonymity);

        const res = await fetch(url, {
          signal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          errors.push(`HTTP ${res.status}: ${text.slice(0, 100)}`);
          break;
        }

        const proxies = normalizeProxyResponse(await res.json());
        if (proxies.length === 0) break;
        requested += proxies.length;

        for (const p of proxies) {
          if (!p || !p.ip || !p.port) continue;
          if (isPrivateHost(p.ip)) {
            errors.push(`Proxifly: skipped private/loopback host ${p.ip}`);
            continue;
          }
          const item: FreeProxyItem = {
            source: "proxifly",
            host: p.ip,
            port: Number(p.port),
            type: normalizeProxyType(p.protocol),
            countryCode:
              p.geolocation?.country?.slice(0, 2).toUpperCase() ||
              p.country?.slice(0, 2).toUpperCase() ||
              null,
            qualityScore: normalizeQualityScore(p),
            latencyMs: null,
            anonymity: p.anonymity || null,
            lastValidated: new Date().toISOString(),
          };
          const r = await upsertFreeProxy(item);
          if (r.action === "created") added++;
          else updated++;
          fetched++;
        }

        if (proxies.length < batchQuantity) break;
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
