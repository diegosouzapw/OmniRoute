/**
 * Proxy Logger — Hybrid in-memory + SQLite persistence
 *
 * Keeps a fast in-memory ring buffer for real-time dashboard AND
 * persists to SQLite so logs survive server restarts.
 *
 * Pattern follows callLogs.js (T-15 decomposition).
 */
import { v4 as uuidv4 } from "uuid";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/errorSanitization.ts";
import { getDbInstance, isCloud, isBuildPhase } from "./db/core";
import { ensureProxyLogsColumns } from "./db/schemaColumns";

const shouldPersistToDisk = !isCloud && !isBuildPhase;

const MAX_IN_MEMORY_ENTRIES = 200;

interface ProxyInfo {
  type: string;
  host: string;
  port: number | string;
}

interface ProxyLogEntry {
  id: string;
  timestamp: string;
  status: string;
  proxy: ProxyInfo | null;
  level: string;
  levelId: string | null;
  provider: string | null;
  targetUrl: string | null;
  clientIp: string | null;
  /** Outbound/egress IP the upstream actually saw (null until probed). The
   * historical clientIp is the INBOUND IP (x-forwarded-for); egressIp answers
   * "by which IP is this account leaving" — critical for rotating providers. */
  egressIp: string | null;
  latencyMs: number;
  error: string | null;
  connectionId: string | null;
  comboId: string | null;
  account: string | null;
  tlsFingerprint: boolean;
}

type ProxyLogInput = Partial<ProxyLogEntry> & {
  publicIp?: string | null;
};

interface ProxyLogFilters {
  status?: string;
  type?: string;
  provider?: string;
  level?: string;
  search?: string;
  limit?: number;
}

const proxyLogs: ProxyLogEntry[] = [];

// `public_ip` is the historical SQLite column name; API/UI expose the value as clientIp.

// ──────────────── Startup: hydrate from DB ────────────────

function loadFromDb() {
  if (!shouldPersistToDisk) return;
  try {
    const db = getDbInstance();
    // Self-heal the proxy_logs schema before reading/writing (migration 134
    // guarantees egress_ip on every migrated DB; this covers restored/odd states).
    ensureProxyLogsColumns(db);
    const rows = db
      .prepare("SELECT * FROM proxy_logs ORDER BY timestamp DESC LIMIT ?")
      .all(MAX_IN_MEMORY_ENTRIES) as any[];

    for (const row of rows) {
      proxyLogs.push({
        id: row.id,
        timestamp: row.timestamp,
        status: row.status || "success",
        proxy: row.proxy_host
          ? { type: row.proxy_type, host: row.proxy_host, port: row.proxy_port }
          : null,
        level: row.level || "direct",
        levelId: row.level_id || null,
        provider: row.provider || null,
        targetUrl: row.target_url || null,
        clientIp: row.public_ip || null,
        egressIp: row.egress_ip || null,
        latencyMs: row.latency_ms || 0,
        error: row.error || null,
        connectionId: row.connection_id || null,
        comboId: row.combo_id || null,
        account: row.account || null,
        tlsFingerprint: row.tls_fingerprint === 1,
      });
    }

    if (proxyLogs.length > 0) {
      console.log(`[proxyLogger] Loaded ${proxyLogs.length} proxy logs from SQLite`);
    }
  } catch (err: any) {
    console.warn(
      "[proxyLogger] Failed to load from DB:",
      sanitizeErrorMessage(err) || "Proxy log hydration failed"
    );
  }
}

loadFromDb();

// Default-off override that restores the verbose [ProxyEgress] console line (raw
// client/egress IPs + account prefix). Kept OFF by default so the process log leaks
// neither IPs nor the account prefix. Deliberately NOT coupled to debugMode
// (src/lib/db/settings.ts defaults debugMode to true) — this verbosity is opt-in only.
// Storage (in-memory ring buffer + SQLite) is untouched and always keeps full IPs.

/** Read at call time so tests can toggle it between imports. */
export function isProxyLogIncludeIps(): boolean {
  return process.env.PROXY_LOG_INCLUDE_IPS === "true" || process.env.PROXY_LOG_INCLUDE_IPS === "1";
}

/**
 * Pure formatter for the [ProxyEgress] process-log line (#10348). At the default level it
 * emits a short, IP/prefix-free summary; when details are opted in it restores the full
 * verbose line including client/egress IPs and the account. Extracted as a separate
 * function so it is unit-testable without patching console.log and so the change never
 * grows logProxyEvent itself.
 */
export function formatProxyEgressConsoleLine(params: {
  provider: string | null;
  account: string | null;
  clientIp: string | null;
  egressIp: string | null;
  level: string;
  proxyHost: string | null | undefined;
  status: string;
  includeDetails?: boolean;
}): string {
  const provider = params.provider || "-";
  const status = params.status;
  if (!params.includeDetails) {
    return `[ProxyEgress] ${provider} status=${status}`;
  }
  const proxy = params.proxyHost ? `:${params.proxyHost}` : "";
  return (
    `[ProxyEgress] ${provider}/${params.account || "-"} ` +
    `in=${params.clientIp || "?"} out=${params.egressIp || "?"} ` +
    `proxy=${params.level}${proxy} status=${status}`
  );
}

// ──────────────── Log a proxy event ────────────────

export function logProxyEvent(entry: ProxyLogInput) {
  const safeError =
    entry.error === null || entry.error === undefined || entry.error === ""
      ? null
      : sanitizeErrorMessage(entry.error) || "Proxy request failed";
  const log: ProxyLogEntry = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    status: entry.status || "success",
    proxy: entry.proxy || null,
    level: entry.level || "direct",
    levelId: entry.levelId || null,
    provider: entry.provider || null,
    targetUrl: entry.targetUrl || null,
    clientIp: entry.clientIp ?? entry.publicIp ?? null,
    egressIp: entry.egressIp ?? null,
    latencyMs: entry.latencyMs || 0,
    error: safeError,
    connectionId: entry.connectionId || null,
    comboId: entry.comboId || null,
    account: entry.account || null,
    tlsFingerprint: entry.tlsFingerprint || false,
  };

  // Structured egress line so the operator can confirm, in the proxy logs, which
  // IP each account is entering (clientIp) and leaving (egressIp) by.
  if (log.proxy || log.egressIp) {
    console.log(
      formatProxyEgressConsoleLine({
        provider: log.provider,
        account: log.account,
        clientIp: log.clientIp,
        egressIp: log.egressIp,
        level: log.level,
        proxyHost: log.proxy?.host,
        status: log.status,
        includeDetails: isProxyLogIncludeIps(),
      })
    );
  }

  // 1. In-memory ring buffer (newest first)
  proxyLogs.unshift(log);
  if (proxyLogs.length > MAX_IN_MEMORY_ENTRIES) {
    proxyLogs.length = MAX_IN_MEMORY_ENTRIES;
  }

  // 2. Queue for background batch persistence (SQLite / Redis)
  if (shouldPersistToDisk) {
    enqueueProxyLog(log);
  }

  return log;
}

// ──────────────── Background Batch Persistence ────────────────

const BATCH_FLUSH_INTERVAL_MS = 1000;
const BATCH_SIZE_THRESHOLD = 100;

let pendingLogsQueue: ProxyLogEntry[] = [];
let batchTimer: NodeJS.Timeout | null = null;

function ensureBatchTimer() {
  if (batchTimer) return;
  batchTimer = setInterval(() => {
    flushProxyLogsSync();
  }, BATCH_FLUSH_INTERVAL_MS);
  if (typeof batchTimer.unref === "function") {
    batchTimer.unref();
  }
}

function enqueueProxyLog(log: ProxyLogEntry) {
  pendingLogsQueue.push(log);
  ensureBatchTimer();
  if (pendingLogsQueue.length >= BATCH_SIZE_THRESHOLD) {
    flushProxyLogsSync();
  }
}

export function flushProxyLogsSync() {
  if (pendingLogsQueue.length === 0) return;
  const batch = pendingLogsQueue;
  pendingLogsQueue = [];

  // 1. If Redis driver is active, asynchronously publish batch to Redis Stream/Channel
  if (process.env.QUOTA_STORE_DRIVER === "redis" || process.env.QUOTA_STORE_REDIS_URL) {
    try {
      import("@/lib/quota/redisQuotaStore")
        .then(({ getRedisQuotaStore }) => {
          const store = getRedisQuotaStore(process.env.QUOTA_STORE_REDIS_URL || "");
          const client = (store as any)?.client;
          if (client && typeof client.publish === "function") {
            for (const entry of batch) {
              client.publish("omniroute:proxy_logs", JSON.stringify(entry)).catch(() => {});
            }
          }
        })
        .catch(() => {});
    } catch {
      /* ignore redis pub errors */
    }
  }

  // 2. Persist to SQLite using a single transaction for high-performance non-blocking write
  try {
    const db = getDbInstance();
    const insertStmt = db.prepare(
      `INSERT INTO proxy_logs (id, timestamp, status, proxy_type, proxy_host, proxy_port,
        level, level_id, provider, target_url, public_ip, egress_ip, latency_ms, error,
        connection_id, combo_id, account, tls_fingerprint)
      VALUES (@id, @timestamp, @status, @proxyType, @proxyHost, @proxyPort,
        @level, @levelId, @provider, @targetUrl, @clientIp, @egressIp, @latencyMs, @error,
        @connectionId, @comboId, @account, @tlsFingerprint)`
    );

    const transaction = db.transaction((entries: ProxyLogEntry[]) => {
      for (const item of entries) {
        insertStmt.run({
          id: item.id,
          timestamp: item.timestamp,
          status: item.status,
          proxyType: item.proxy?.type || null,
          proxyHost: item.proxy?.host || null,
          proxyPort: item.proxy?.port ? Number(item.proxy.port) : null,
          level: item.level,
          levelId: item.levelId,
          provider: item.provider,
          targetUrl: item.targetUrl,
          clientIp: item.clientIp,
          egressIp: item.egressIp,
          latencyMs: item.latencyMs,
          error: item.error,
          connectionId: item.connectionId,
          comboId: item.comboId,
          account: item.account,
          tlsFingerprint: item.tlsFingerprint ? 1 : 0,
        });
      }
    });

    transaction(batch);
  } catch (err: any) {
    console.warn(
      "[proxyLogger] Failed to write proxy log batch to disk:",
      sanitizeErrorMessage(err) || "Proxy log persistence failed"
    );
  }
}

// ──────────────── Query ────────────────

/**
 * Get proxy logs with optional filters.
 * Reads from in-memory for speed (already hydrated from DB on startup).
 */
export function getProxyLogs(filters: ProxyLogFilters = {}) {
  let logs = [...proxyLogs];

  if (filters.status) {
    if (filters.status === "ok") {
      logs = logs.filter((l) => l.status === "success");
    } else {
      logs = logs.filter((l) => l.status === filters.status);
    }
  }

  if (filters.type) {
    logs = logs.filter((l) => l.proxy?.type === filters.type);
  }

  if (filters.provider) {
    logs = logs.filter((l) => l.provider === filters.provider);
  }

  if (filters.level) {
    logs = logs.filter((l) => l.level === filters.level);
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    logs = logs.filter(
      (l) =>
        (l.proxy?.host || "").toLowerCase().includes(q) ||
        (l.provider || "").toLowerCase().includes(q) ||
        (l.targetUrl || "").toLowerCase().includes(q) ||
        (l.clientIp || "").toLowerCase().includes(q) ||
        (l.egressIp || "").toLowerCase().includes(q) ||
        (l.level || "").toLowerCase().includes(q) ||
        (l.error || "").toLowerCase().includes(q) ||
        (l.account || "").toLowerCase().includes(q)
    );
  }

  const limit = filters.limit || 300;
  return logs.slice(0, limit);
}

// ──────────────── Clear ────────────────

export function clearProxyLogs() {
  proxyLogs.length = 0;

  if (shouldPersistToDisk) {
    try {
      const db = getDbInstance();
      db.prepare("DELETE FROM proxy_logs").run();
    } catch (err: any) {
      console.warn(
        "[proxyLogger] Failed to clear DB:",
        sanitizeErrorMessage(err) || "Proxy log cleanup failed"
      );
    }
  }
}
