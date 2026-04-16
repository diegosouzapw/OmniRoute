/**
 * Structured console logger utility for omniroute.
 *
 * Provides consistent, machine-parseable log output across the codebase.
 * Supports two output formats controlled by APP_LOG_FORMAT env var:
 *   - "text" (default): [LEVEL] [TAG] message {metadata}
 *   - "json": Single-line JSON objects for log aggregators
 *
 * Usage:
 *   import { logger, createLogger, generateRequestId } from "../utils/logger.ts";
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
 *   APP_LOG_LEVEL  — minimum level: debug | info | warn | error (default: info)
 *   APP_LOG_FORMAT — output format: text | json (default: text)
 */
import { getAppLogFormat, getAppLogLevel } from "../../src/lib/logEnv";

const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 } as const;

type LogLevel = keyof typeof LEVELS;
type LogMetadata = Record<string, unknown>;
type ConsoleFn = (...data: unknown[]) => void;

type TaggedLogger = {
  debug: (message: string, meta?: LogMetadata | null) => void;
  info: (message: string, meta?: LogMetadata | null) => void;
  warn: (message: string, meta?: LogMetadata | null) => void;
  error: (message: string, meta?: LogMetadata | null) => void;
};

type RequestScopedLogger = {
  debug: (tag: string, msg: string, data?: LogMetadata | null) => void;
  info: (tag: string, msg: string, data?: LogMetadata | null) => void;
  warn: (tag: string, msg: string, data?: LogMetadata | null) => void;
  error: (tag: string, msg: string, data?: LogMetadata | null) => void;
};

function isLogLevel(value: string): value is LogLevel {
  return Object.prototype.hasOwnProperty.call(LEVELS, value);
}

const configuredLevel = getAppLogLevel("info").toLowerCase();
const currentLevel = isLogLevel(configuredLevel) ? LEVELS[configuredLevel] : LEVELS.info;

const jsonFormat = getAppLogFormat("text") === "json";

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
export function maskKey(key: string | null | undefined): string {
  if (!key || key.length < 12) return "(redacted)";
  return `${key.slice(0, 6)}...${key.slice(-4)}`;
}

/**
 * Get the correct console method for a log level.
 * @param {string} level
 * @returns {Function}
 */
function getConsoleFn(level: LogLevel): ConsoleFn {
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
function formatMeta(meta?: LogMetadata | null): string {
  if (!meta || typeof meta !== "object") return "";
  const cleaned: LogMetadata = {};
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
export function logger(tag: string): TaggedLogger {
  const emit = (level: LogLevel, message: string, meta?: LogMetadata | null): void => {
    if (LEVELS[level] < currentLevel) return;
    const consoleFn = getConsoleFn(level);

    if (jsonFormat) {
      const entry: Record<string, unknown> = {
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
export function createLogger(requestId: string | null = null): RequestScopedLogger {
  const emit = (level: LogLevel, tag: string, message: string, data?: LogMetadata | null): void => {
    if (LEVELS[level] < currentLevel) return;
    const consoleFn = getConsoleFn(level);

    if (jsonFormat) {
      const entry: Record<string, unknown> = {
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
