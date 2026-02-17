/**
 * Structured console logger utility for omniroute.
 *
 * Provides consistent, machine-parseable log output across the codebase.
 * Supports two output formats controlled by LOG_FORMAT env var:
 *   - "text" (default): [LEVEL] [TAG] message {metadata}
 *   - "json": Single-line JSON objects for log aggregators
 *
 * Usage:
 *   import { logger, createLogger, generateRequestId } from "../utils/logger.js";
 *
 *   // Tag-based (simple — for services/utilities):
 *   const log = logger("CHAT");
 *   log.info("Request received", { model: "claude-4" });
 *
 *   // Request-scoped (with correlation ID — for request pipelines):
 *   const reqLog = createLogger(generateRequestId());
 *   reqLog.info("AUTH", "Token refreshed", { provider: "claude" });
 *
 * Environment variables:
 *   LOG_LEVEL  — minimum level: debug | info | warn | error (default: info)
 *   LOG_FORMAT — output format: text | json (default: text)
 */

const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };

const currentLevel =
  LEVELS[((typeof process !== "undefined" && process.env?.LOG_LEVEL) || "info").toLowerCase()] ??
  LEVELS.info;

const jsonFormat = typeof process !== "undefined" && process.env?.LOG_FORMAT === "json";

let requestCounter = 0;

/**
 * Generate a unique request ID for log correlation.
 * Format: req_<timestamp>_<counter>
 * @returns {string}
 */
export function generateRequestId() {
  return `req_${Date.now()}_${++requestCounter}`;
}

/**
 * Mask a sensitive key for safe logging.
 * Shows first 6 and last 4 characters: "sk-abc123...xyz9"
 * @param {string} key
 * @returns {string}
 */
export function maskKey(key) {
  if (!key || key.length < 12) return "(redacted)";
  return `${key.slice(0, 6)}...${key.slice(-4)}`;
}

/**
 * Get the correct console method for a log level.
 * @param {string} level
 * @returns {Function}
 */
function getConsoleFn(level) {
  switch (level) {
    case "debug":
      return console.debug;
    case "warn":
      return console.warn;
    case "error":
      return console.error;
    default:
      return console.log;
  }
}

/**
 * Format metadata object as compact JSON string for log output.
 * Omits keys with null/undefined values to keep logs clean.
 * @param {object} [meta] - Optional metadata
 * @returns {string} Formatted metadata string or empty string
 */
function formatMeta(meta) {
  if (!meta || typeof meta !== "object") return "";
  const cleaned = {};
  for (const [k, v] of Object.entries(meta)) {
    if (v !== undefined && v !== null) cleaned[k] = v;
  }
  return Object.keys(cleaned).length > 0 ? ` ${JSON.stringify(cleaned)}` : "";
}

/**
 * Create a tagged logger instance (simple API for services and utilities).
 * @param {string} tag - Log category tag (e.g. "CHAT", "AUTH", "STREAM")
 * @returns {{ debug: Function, info: Function, warn: Function, error: Function }}
 */
export function logger(tag) {
  const emit = (level, message, meta) => {
    if (LEVELS[level] < currentLevel) return;
    const consoleFn = getConsoleFn(level);

    if (jsonFormat) {
      const entry: Record<string, any> = {
        ts: new Date().toISOString(),
        level,
        tag,
        msg: message,
      };
      if (meta && typeof meta === "object" && Object.keys(meta).length > 0) {
        entry.data = meta;
      }
      consoleFn(JSON.stringify(entry));
    } else {
      consoleFn(`[${level.toUpperCase()}] [${tag}] ${message}${formatMeta(meta)}`);
    }
  };

  return {
    debug: (message, meta) => emit("debug", message, meta),
    info: (message, meta) => emit("info", message, meta),
    warn: (message, meta) => emit("warn", message, meta),
    error: (message, meta) => emit("error", message, meta),
  };
}

/**
 * Create a request-scoped logger with correlation ID.
 * All methods accept (tag, message, data?) for structured logging.
 *
 * @param {string} [requestId] - Unique request ID for correlation
 * @returns {{ debug, info, warn, error }}
 */
export function createLogger(requestId = null) {
  const emit = (level, tag, message, data) => {
    if (LEVELS[level] < currentLevel) return;
    const consoleFn = getConsoleFn(level);

    if (jsonFormat) {
      const entry: Record<string, any> = {
        ts: new Date().toISOString(),
        level,
        tag,
        msg: message,
      };
      if (requestId) entry.reqId = requestId;
      if (data && typeof data === "object" && Object.keys(data).length > 0) {
        entry.data = data;
      }
      consoleFn(JSON.stringify(entry));
    } else {
      const ts = new Date().toISOString().slice(11, 23); // HH:MM:SS.mmm
      const prefix = requestId ? `[${requestId}]` : "";
      const dataStr = formatMeta(data);
      consoleFn(`${ts} ${prefix}[${tag}] ${message}${dataStr}`);
    }
  };

  return {
    debug: (tag, msg, data) => emit("debug", tag, msg, data),
    info: (tag, msg, data) => emit("info", tag, msg, data),
    warn: (tag, msg, data) => emit("warn", tag, msg, data),
    error: (tag, msg, data) => emit("error", tag, msg, data),
  };
}

/**
 * Module-level default logger (no requestId — for startup/config messages).
 */
export const defaultLogger = createLogger();

export default logger;
