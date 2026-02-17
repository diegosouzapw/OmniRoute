/**
 * Proxy Logger — Hybrid in-memory + SQLite persistence
 *
 * Keeps a fast in-memory ring buffer for real-time dashboard AND
 * persists to SQLite so logs survive server restarts.
 *
 * Pattern follows callLogs.js (T-15 decomposition).
 */
import { v4 as uuidv4 } from "uuid";
import { getDbInstance, isCloud, isBuildPhase } from "./db/core";

const shouldPersistToDisk = !isCloud && !isBuildPhase;

const MAX_ENTRIES = 500;

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
  publicIp: string | null;
  latencyMs: number;
  error: string | null;
  connectionId: string | null;
  comboId: string | null;
  account: string | null;
  tlsFingerprint: boolean;
}

interface ProxyLogFilters {
  status?: string;
  type?: string;
  provider?: string;
  level?: string;
  search?: string;
  limit?: number;
}

const proxyLogs: ProxyLogEntry[] = [];

// ──────────────── Startup: hydrate from DB ────────────────

function loadFromDb() {
  if (!shouldPersistToDisk) return;
  try {
    const db = getDbInstance();
    const rows = db
      .prepare("SELECT * FROM proxy_logs ORDER BY timestamp DESC LIMIT ?")
      .all(MAX_ENTRIES) as any[];

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
        publicIp: row.public_ip || null,
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
    console.warn("[proxyLogger] Failed to load from DB:", err.message);
  }
}

loadFromDb();

// ──────────────── Log a proxy event ────────────────

export function logProxyEvent(entry: Partial<ProxyLogEntry>) {
  const log: ProxyLogEntry = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    status: entry.status || "success",
    proxy: entry.proxy || null,
    level: entry.level || "direct",
    levelId: entry.levelId || null,
    provider: entry.provider || null,
    targetUrl: entry.targetUrl || null,
    publicIp: entry.publicIp || null,
    latencyMs: entry.latencyMs || 0,
    error: entry.error || null,
    connectionId: entry.connectionId || null,
    comboId: entry.comboId || null,
    account: entry.account || null,
    tlsFingerprint: entry.tlsFingerprint || false,
  };

  // 1. In-memory ring buffer (newest first)
  proxyLogs.unshift(log);
  if (proxyLogs.length > MAX_ENTRIES) {
    proxyLogs.length = MAX_ENTRIES;
  }

  // 2. Persist to SQLite
  if (shouldPersistToDisk) {
    try {
      const db = getDbInstance();
      db.prepare(
        `INSERT INTO proxy_logs (id, timestamp, status, proxy_type, proxy_host, proxy_port,
          level, level_id, provider, target_url, public_ip, latency_ms, error,
          connection_id, combo_id, account, tls_fingerprint)
        VALUES (@id, @timestamp, @status, @proxyType, @proxyHost, @proxyPort,
          @level, @levelId, @provider, @targetUrl, @publicIp, @latencyMs, @error,
          @connectionId, @comboId, @account, @tlsFingerprint)`
      ).run({
        id: log.id,
        timestamp: log.timestamp,
        status: log.status,
        proxyType: log.proxy?.type || null,
        proxyHost: log.proxy?.host || null,
        proxyPort: log.proxy?.port || null,
        level: log.level,
        levelId: log.levelId,
        provider: log.provider,
        targetUrl: log.targetUrl,
        publicIp: log.publicIp,
        latencyMs: log.latencyMs,
        error: log.error,
        connectionId: log.connectionId,
        comboId: log.comboId,
        account: log.account,
        tlsFingerprint: log.tlsFingerprint ? 1 : 0,
      });

      // Trim old entries
      const count = (db.prepare("SELECT COUNT(*) as cnt FROM proxy_logs").get() as any)?.cnt || 0;
      if (count > MAX_ENTRIES) {
        db.prepare(
          `DELETE FROM proxy_logs WHERE id IN (
            SELECT id FROM proxy_logs ORDER BY timestamp ASC LIMIT ?
          )`
        ).run(count - MAX_ENTRIES);
      }
    } catch (err: any) {
      console.warn("[proxyLogger] Failed to persist:", err.message);
    }
  }

  return log;
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
        (l.publicIp || "").toLowerCase().includes(q) ||
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
      console.warn("[proxyLogger] Failed to clear DB:", err.message);
    }
  }
}

// ──────────────── Stats ────────────────

export function getProxyLogStats() {
  const total = proxyLogs.length;
  const success = proxyLogs.filter((l) => l.status === "success").length;
  const error = proxyLogs.filter((l) => l.status === "error").length;
  const timeout = proxyLogs.filter((l) => l.status === "timeout").length;
  const direct = proxyLogs.filter((l) => l.level === "direct").length;
  return { total, success, error, timeout, direct };
}
