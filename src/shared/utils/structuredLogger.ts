/**
 * Structured Logger — FASE-05 Code Quality
 *
 * Lightweight structured logging wrapper with JSON output for production
 * and human-readable output for development. Replaces scattered console.log
 * calls with consistent, parseable log entries.
 *
 * @module shared/utils/structuredLogger
 */

import { getCorrelationId } from "../middleware/correlationId";

const LOG_LEVELS = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  fatal: 50,
};

const currentLevel = LOG_LEVELS[process.env.LOG_LEVEL?.toLowerCase()] || LOG_LEVELS.info;
const isProduction = process.env.NODE_ENV === "production";

/**
 * Format a log entry.
 *
 * @param {string} level
 * @param {string} component
 * @param {string} message
 * @param {Object} [meta]
 * @returns {string}
 */
function formatEntry(level, component, message, meta) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    component,
    message,
    ...meta,
  };

  // Add correlation ID if available
  const correlationId = getCorrelationId();
  if (correlationId) {
    entry.correlationId = correlationId;
  }

  if (isProduction) {
    return JSON.stringify(entry);
  }

  // Human-readable for development
  const metaStr = meta && Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : "";
  const corrStr = correlationId ? ` [${correlationId.slice(0, 8)}]` : "";
  return `[${entry.timestamp}] ${level.toUpperCase().padEnd(5)} [${component}]${corrStr} ${message}${metaStr}`;
}

/**
 * Create a scoped logger for a specific component.
 *
 * @param {string} component - Component name (e.g. 'CHAT', 'AUTH', 'PROXY')
 * @returns {{ debug: Function, info: Function, warn: Function, error: Function, fatal: Function }}
 */
export function createLogger(component) {
  return {
    debug(message, meta) {
      if (currentLevel <= LOG_LEVELS.debug) {
        console.debug(formatEntry("debug", component, message, meta));
      }
    },
    info(message, meta) {
      if (currentLevel <= LOG_LEVELS.info) {
        console.info(formatEntry("info", component, message, meta));
      }
    },
    warn(message, meta) {
      if (currentLevel <= LOG_LEVELS.warn) {
        console.warn(formatEntry("warn", component, message, meta));
      }
    },
    error(message, meta) {
      if (currentLevel <= LOG_LEVELS.error) {
        console.error(formatEntry("error", component, message, meta));
      }
    },
    fatal(message, meta) {
      console.error(formatEntry("fatal", component, message, meta));
    },
    /**
     * Create a child logger with additional default metadata.
     * @param {Object} defaultMeta - Default metadata to include
     * @returns {Object} Child logger
     */
    child(defaultMeta) {
      return createLogger(component);
    },
  };
}

export { LOG_LEVELS };
