/**
 * Proxy Logger — In-memory ring buffer for proxy events
 * Mirrors the call-log pattern used by RequestLoggerV2
 */
import { v4 as uuidv4 } from "uuid";

const MAX_ENTRIES = 500;
const proxyLogs = [];

/**
 * Log a proxy event
 * @param {Object} entry
 * @param {"success"|"error"|"timeout"} entry.status
 * @param {Object} entry.proxy - { type, host, port }
 * @param {"key"|"combo"|"provider"|"global"|"direct"} entry.level
 * @param {string} [entry.levelId]
 * @param {string} [entry.provider]
 * @param {string} [entry.targetUrl]
 * @param {string} [entry.publicIp]
 * @param {number} [entry.latencyMs]
 * @param {string} [entry.error]
 * @param {string} [entry.connectionId]
 * @param {string} [entry.comboId]
 */
export function logProxyEvent(entry) {
  const log = {
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
  };

  proxyLogs.unshift(log); // newest first

  // Trim to max
  if (proxyLogs.length > MAX_ENTRIES) {
    proxyLogs.length = MAX_ENTRIES;
  }

  return log;
}

/**
 * Get proxy logs with optional filters
 * @param {Object} filters
 * @param {string} [filters.status] - "success"|"error"|"timeout"
 * @param {string} [filters.type] - "http"|"https"|"socks5"
 * @param {string} [filters.provider]
 * @param {string} [filters.level] - "key"|"combo"|"provider"|"global"|"direct"
 * @param {string} [filters.search] - free text search
 * @param {number} [filters.limit] - max results (default 300)
 * @returns {Array}
 */
export function getProxyLogs(filters = {}) {
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

/**
 * Clear all proxy logs
 */
export function clearProxyLogs() {
  proxyLogs.length = 0;
}

/**
 * Get proxy log stats
 */
export function getProxyLogStats() {
  const total = proxyLogs.length;
  const success = proxyLogs.filter((l) => l.status === "success").length;
  const error = proxyLogs.filter((l) => l.status === "error").length;
  const timeout = proxyLogs.filter((l) => l.status === "timeout").length;
  const direct = proxyLogs.filter((l) => l.level === "direct").length;
  return { total, success, error, timeout, direct };
}
