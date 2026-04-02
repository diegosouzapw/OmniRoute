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

function rowToConfig(record: Record<string, unknown>): UpstreamProxyConfig {
  return {
    id: record.id as number,
    providerId: record.provider_id as string,
    mode: record.mode as string,
    cliproxyapiModelMapping:
      record.cliproxyapi_model_mapping && typeof record.cliproxyapi_model_mapping === "string"
        ? JSON.parse(record.cliproxyapi_model_mapping)
        : null,
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
    `INSERT OR REPLACE INTO upstream_proxy_config 
     (provider_id, mode, cliproxyapi_model_mapping, native_priority, cliproxyapi_priority, enabled, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`
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
