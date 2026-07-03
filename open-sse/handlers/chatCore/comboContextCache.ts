import { getUpstreamProxyConfig } from "@/lib/localDb";

/**
 * Module-level cache for upstream proxy config (shared across all requests).
 * 10s TTL prevents per-request DB lookups while staying fresh enough for setting changes.
 */
type CachedUpstreamProxyConfig = {
  mode: string;
  enabled: boolean;
  cliproxyapiModelMapping: Record<string, string> | null;
  ts: number;
};

const _proxyConfigCache = new Map<string, CachedUpstreamProxyConfig>();
const PROXY_CONFIG_CACHE_TTL = 10_000;

/**
 * Module-level cache for all combos data (shared across all requests).
 * Uses cached promises to prevent thundering herd — all concurrent callers
 * wait for the same underlying DB query while it's in flight.
 */
let _combosPromise: Promise<unknown[]> | null = null;
let _combosCacheTs = 0;
let _combosCacheVersionSnapshot = -1;
const COMBOS_CACHE_TTL = 10_000;

export async function getCombosCached(): Promise<unknown[]> {
  const now = Date.now();
  const { getCombos, getCombosCacheVersion } = await import("@/lib/localDb");
  const version = getCombosCacheVersion();
  // A combo write (create/update/delete/reorder) bumps the shared version via
  // invalidateDbCache("combos"); when it no longer matches our snapshot we drop
  // the cached promise so the nested-combo expansion stops serving removed
  // targets/models within the 10s TTL window (#3147).
  if (version !== _combosCacheVersionSnapshot) {
    clearCombosCache();
  }
  if (_combosPromise && now - _combosCacheTs < COMBOS_CACHE_TTL) {
    return _combosPromise;
  }
  _combosCacheTs = now;
  _combosCacheVersionSnapshot = version;
  _combosPromise = getCombos();
  return _combosPromise;
}

export function clearCombosCache() {
  _combosPromise = null;
  _combosCacheTs = 0;
  _combosCacheVersionSnapshot = -1;
}

export function clearUpstreamProxyConfigCache(providerId?: string) {
  if (providerId) {
    _proxyConfigCache.delete(providerId);
    return;
  }
  _proxyConfigCache.clear();
}

export async function getUpstreamProxyConfigCached(providerId: string) {
  const cached = _proxyConfigCache.get(providerId);
  if (cached && Date.now() - cached.ts < PROXY_CONFIG_CACHE_TTL) return cached;
  const cfg = await getUpstreamProxyConfig(providerId).catch(() => null);
  const result = cfg
    ? {
        mode: cfg.mode,
        enabled: cfg.enabled,
        cliproxyapiModelMapping: normalizeCliproxyapiModelMapping(cfg.cliproxyapiModelMapping),
        ts: Date.now(),
      }
    : {
        mode: "native" as const,
        enabled: false,
        cliproxyapiModelMapping: null,
        ts: Date.now(),
      };
  _proxyConfigCache.set(providerId, result);
  return result;
}

function normalizeCliproxyapiModelMapping(
  value: Record<string, unknown> | null | undefined
): Record<string, string> | null {
  if (!value || typeof value !== "object") return null;
  const entries = Object.entries(value).filter(
    (entry): entry is [string, string] =>
      typeof entry[0] === "string" &&
      entry[0].trim().length > 0 &&
      typeof entry[1] === "string" &&
      entry[1].trim().length > 0
  );
  return entries.length > 0 ? Object.fromEntries(entries) : null;
}
