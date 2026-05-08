import { upsertOneproxyProxy } from "./db/oneproxy";
import { getSettings } from "./db/settings";

type OneProxyApiResponse = {
  total: number;
  count: number;
  offset: number;
  limit: number;
  proxies: Array<{
    id: number;
    url: string;
    protocol: string;
    ip: string;
    port: number;
    country_code: string;
    country_name: string;
    latency_ms: number;
    anonymity: string;
    proxy_type: string;
    can_access_google: boolean;
    quality_score: number;
    is_working: boolean;
    validation_status: string;
    last_validated: string;
  }>;
};

const DEFAULT_API_URL = "https://1proxy-api.aitradepulse.com";
const DEFAULT_MAX_PROXIES = 500;
const DEFAULT_MIN_QUALITY = 50;
const DEFAULT_PAGE_SIZE = 100;

let lastSyncSuccess = false;
let lastSyncError: string | null = null;
let lastSyncAt: string | null = null;
let lastSyncCount = 0;
let consecutiveFailures = 0;
const MAX_CONSECUTIVE_FAILURES = 5;

export async function syncOneproxyProxies(options?: {
  apiUrl?: string;
  maxProxies?: number;
  minQuality?: number;
}): Promise<{
  success: boolean;
  added: number;
  updated: number;
  failed: number;
  total: number;
  error: string | null;
}> {
  const settings = await getSettings();
  const enabled = process.env.ONEPROXY_ENABLED !== "false";
  if (!enabled) {
    return {
      success: false,
      added: 0,
      updated: 0,
      failed: 0,
      total: 0,
      error: "1proxy integration disabled",
    };
  }

  const apiUrl = options?.apiUrl || process.env.ONEPROXY_API_URL || DEFAULT_API_URL;
  const maxProxies =
    (options?.maxProxies ?? parseInt(process.env.ONEPROXY_MAX_PROXIES || "", 10)) ||
    DEFAULT_MAX_PROXIES;
  const minQuality =
    (options?.minQuality ?? parseInt(process.env.ONEPROXY_MIN_QUALITY_THRESHOLD || "", 10)) ||
    DEFAULT_MIN_QUALITY;

  if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
    return {
      success: false,
      added: 0,
      updated: 0,
      failed: 0,
      total: 0,
      error: `Circuit breaker: ${consecutiveFailures} consecutive failures. Reset required.`,
    };
  }

  let added = 0;
  let updated = 0;
  let failed = 0;
  let offset = 0;

  try {
    while (true) {
      const url = `${apiUrl}/api/v1/proxies/advanced?limit=${DEFAULT_PAGE_SIZE}&offset=${offset}&min_quality=${minQuality}&is_working=true`;
      const response = await fetch(url, {
        signal: AbortSignal.timeout(30000),
      });

      if (!response.ok) {
        throw new Error(`1proxy API returned ${response.status}`);
      }

      const data = (await response.json()) as OneProxyApiResponse;
      if (!data.proxies || data.proxies.length === 0) break;

      for (const proxy of data.proxies) {
        if (added + updated >= maxProxies) break;

        try {
          const result = await upsertOneproxyProxy({
            ip: proxy.ip,
            port: proxy.port,
            protocol: proxy.protocol,
            countryCode: proxy.country_code,
            anonymity: proxy.anonymity,
            qualityScore: proxy.quality_score,
            latencyMs: proxy.latency_ms,
            googleAccess: proxy.can_access_google,
            lastValidated: proxy.last_validated,
          });

          if (result.action === "created") added++;
          else updated++;
        } catch {
          failed++;
        }
      }

      if (added + updated >= maxProxies) break;
      if (data.proxies.length < DEFAULT_PAGE_SIZE) break;

      offset += DEFAULT_PAGE_SIZE;
    }

    consecutiveFailures = 0;
    lastSyncSuccess = true;
    lastSyncError = null;
    lastSyncAt = new Date().toISOString();
    lastSyncCount = added + updated;

    return {
      success: true,
      added,
      updated,
      failed,
      total: added + updated,
      error: null,
    };
  } catch (err) {
    consecutiveFailures++;
    lastSyncSuccess = false;
    lastSyncError = err instanceof Error ? err.message : String(err);
    lastSyncAt = new Date().toISOString();

    return {
      success: false,
      added: 0,
      updated: 0,
      failed: 0,
      total: 0,
      error: lastSyncError,
    };
  }
}

export function getOneproxySyncStatus(): {
  lastSyncSuccess: boolean;
  lastSyncError: string | null;
  lastSyncAt: string | null;
  lastSyncCount: number;
  consecutiveFailures: number;
} {
  return {
    lastSyncSuccess,
    lastSyncError,
    lastSyncAt,
    lastSyncCount,
    consecutiveFailures,
  };
}

export function resetOneproxyCircuitBreaker(): void {
  consecutiveFailures = 0;
  lastSyncError = null;
}
