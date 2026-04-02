/** Upstream proxy config persistence for upstream_proxy_config table. */
import { getDbInstance } from "./core";

interface UpstreamProxyConfig {
  id: number;
  providerId: string;
  mode: string;
  cliproxyapiModelMapping: Record<string, unknown> | null;
  nativePriority: number;
  cliproxyapiPriority: number;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UpstreamProxyRow {
  id: unknown;
  provider_id: unknown;
  mode: unknown;
  cliproxyapi_model_mapping: unknown;
  native_priority: unknown;
  cliproxyapi_priority: unknown;
  enabled: unknown;
  created_at: unknown;
  updated_at: unknown;
}

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

const BLOCKED_HOSTNAMES = ["metadata.google.internal", "169.254.169.254", "metadata.aws.internal"];

function isPrivateHost(hostname: string): boolean {
  if (BLOCKED_HOSTNAMES.includes(hostname)) return true;
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") return false;
  if (
    /^10\./.test(hostname) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(hostname) ||
    /^192\.168\./.test(hostname)
  )
    return true;
  if (
    /^0\./.test(hostname) ||
    /^127\./.test(hostname) ||
    /^224\./.test(hostname) ||
    /^169\.254\./.test(hostname)
  )
    return true;
  return false;
}

export function validateProxyUrl(
  url: string
): { valid: true; url: string } | { valid: false; error: string } {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return {
        valid: false,
        error: `Unsupported protocol "${parsed.protocol}" — use http or https`,
      };
    }
    if (isPrivateHost(parsed.hostname)) {
      return {
        valid: false,
        error: `Proxy URL cannot point to private/internal address "${parsed.hostname}"`,
      };
    }
    return { valid: true, url };
  } catch {
    return { valid: false, error: `Invalid URL: "${url}"` };
  }
}

function rowToConfig(record: Record<string, unknown>): UpstreamProxyConfig {
  let mapping: Record<string, unknown> | null = null;
  if (record.cliproxyapi_model_mapping && typeof record.cliproxyapi_model_mapping === "string") {
    try {
      mapping = JSON.parse(record.cliproxyapi_model_mapping);
    } catch {
      mapping = null;
    }
  }
  return {
    id: record.id as number,
    providerId: record.provider_id as string,
    mode: record.mode as string,
    cliproxyapiModelMapping: mapping,
    nativePriority: record.native_priority as number,
    cliproxyapiPriority: record.cliproxyapi_priority as number,
    enabled: record.enabled === 1 || record.enabled === true,
    createdAt: record.created_at as string,
    updatedAt: record.updated_at as string,
  };
}

export async function getUpstreamProxyConfigs() {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT * FROM upstream_proxy_config ORDER BY provider_id")
    .all() as UpstreamProxyRow[];
  return rows.map((row) => rowToConfig(toRecord(row)));
}

export async function getUpstreamProxyConfig(providerId: string) {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT * FROM upstream_proxy_config WHERE provider_id = ?")
    .get(providerId) as UpstreamProxyRow | undefined;
  if (!row) return null;
  return rowToConfig(toRecord(row));
}

export async function upsertUpstreamProxyConfig(data: {
  providerId: string;
  mode?: string;
  cliproxyapiModelMapping?: Record<string, unknown> | null;
  nativePriority?: number;
  cliproxyapiPriority?: number;
  enabled?: boolean;
}) {
  const db = getDbInstance();
  const mode = data.mode ?? "native";
  const cliproxyapiModelMapping =
    data.cliproxyapiModelMapping !== undefined
      ? JSON.stringify(data.cliproxyapiModelMapping)
      : null;
  const nativePriority = data.nativePriority ?? 1;
  const cliproxyapiPriority = data.cliproxyapiPriority ?? 2;
  const enabled = data.enabled !== false ? 1 : 0;

  db.prepare(
    `INSERT INTO upstream_proxy_config
     (provider_id, mode, cliproxyapi_model_mapping, native_priority, cliproxyapi_priority, enabled, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
     ON CONFLICT(provider_id) DO UPDATE SET
       mode = excluded.mode,
       cliproxyapi_model_mapping = excluded.cliproxyapi_model_mapping,
       native_priority = excluded.native_priority,
       cliproxyapi_priority = excluded.cliproxyapi_priority,
       enabled = excluded.enabled,
       updated_at = datetime('now')`
  ).run(
    data.providerId,
    mode,
    cliproxyapiModelMapping,
    nativePriority,
    cliproxyapiPriority,
    enabled
  );

  return getUpstreamProxyConfig(data.providerId);
}

export async function updateUpstreamProxyConfig(
  providerId: string,
  updates: Record<string, unknown>
) {
  const db = getDbInstance();
  const current = await getUpstreamProxyConfig(providerId);
  if (!current) {
    throw new Error(`Provider ${providerId} not found`);
  }

  const sets: string[] = ["updated_at = datetime('now')"];
  const params: unknown[] = [];

  if (updates.mode !== undefined) {
    sets.push("mode = ?");
    params.push(updates.mode);
  }
  if (updates.cliproxyapiModelMapping !== undefined) {
    sets.push("cliproxyapi_model_mapping = ?");
    params.push(
      updates.cliproxyapiModelMapping === null
        ? null
        : JSON.stringify(updates.cliproxyapiModelMapping)
    );
  }
  if (updates.nativePriority !== undefined) {
    sets.push("native_priority = ?");
    params.push(updates.nativePriority);
  }
  if (updates.cliproxyapiPriority !== undefined) {
    sets.push("cliproxyapi_priority = ?");
    params.push(updates.cliproxyapiPriority);
  }
  if (updates.enabled !== undefined) {
    sets.push("enabled = ?");
    params.push(updates.enabled === true ? 1 : 0);
  }

  params.push(providerId);
  db.prepare(`UPDATE upstream_proxy_config SET ${sets.join(", ")} WHERE provider_id = ?`).run(
    ...params
  );

  return getUpstreamProxyConfig(providerId);
}

export async function deleteUpstreamProxyConfig(providerId: string) {
  const db = getDbInstance();
  const result = db
    .prepare("DELETE FROM upstream_proxy_config WHERE provider_id = ?")
    .run(providerId);
  return result.changes > 0;
}

export async function getProvidersByMode(mode: string) {
  const db = getDbInstance();
  const rows = db
    .prepare(
      "SELECT * FROM upstream_proxy_config WHERE mode = ? AND enabled = 1 ORDER BY provider_id"
    )
    .all(mode) as UpstreamProxyRow[];
  return rows.map((row) => rowToConfig(toRecord(row)));
}

export async function getFallbackChainForProvider(providerId: string) {
  const config = await getUpstreamProxyConfig(providerId);
  if (!config) return [];

  const chain: { executor: "native" | "cliproxyapi"; priority: number }[] = [];

  if (config.enabled) {
    chain.push({ executor: "native", priority: config.nativePriority });
    if (config.mode === "cliproxyapi" || config.mode === "fallback") {
      chain.push({ executor: "cliproxyapi", priority: config.cliproxyapiPriority });
    }
  }

  chain.sort((a, b) => a.priority - b.priority);
  return chain;
}
