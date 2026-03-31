/**
 * Structured Logger — FASE-05 Code Quality
 *
 * Lightweight structured logging wrapper with JSON output for production
 * and human-readable output for development. Replaces scattered console.log
 * calls with consistent, parseable log entries.
 *
 * When APP_LOG_TO_FILE is enabled, log entries are also appended as JSON lines
 * to the application log file for the Console Log Viewer.
 *
 * @module shared/utils/structuredLogger
 */

import { getCorrelationId } from "../middleware/correlationId";
import { appendFileSync, existsSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { getAppLogConfig } from "@/lib/logEnv";

const LOG_LEVELS: Record<string, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  fatal: 50,
};

const appLogConfig = getAppLogConfig();
const currentLevel = LOG_LEVELS[appLogConfig.level?.toLowerCase() || ""] || LOG_LEVELS.info;
const isProduction = process.env.NODE_ENV === "production";

// File logging configuration
const logToFile = appLogConfig.logToFile;
const logFilePath = resolve(appLogConfig.logFilePath);

// Ensure log directory exists once at module load
if (logToFile) {
  try {
    const dir = dirname(logFilePath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  } catch {
    // silently ignore — will retry on each write
  }
}

/**
 * Append a JSON log line to the log file (non-blocking best-effort).
 */
function writeToFile(entry: Record<string, unknown>) {
  if (!logToFile) return;
  try {
    appendFileSync(logFilePath, JSON.stringify(entry) + "\n");
  } catch {
    // Silently fail — file logging should never break the app
  }
}

function formatEntry(
  level: string,
  component: string,
  message: string,
  meta?: Record<string, unknown>
) {
  const entry: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    level,
    component,
    message,
    ...meta,
  };

  // Add correlation ID if available
  const correlationId = getCorrelationId() as string | undefined;
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

function buildEntry(
  level: string,
  component: string,
  message: string,
  meta?: Record<string, unknown>
) {
  const entry: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    level,
    component,
    message,
    ...meta,
  };
  const correlationId = getCorrelationId() as string | undefined;
  if (correlationId) {
    entry.correlationId = correlationId;
  }
  return entry;
}

export function createLogger(component: string) {
  return {
    debug(message: string, meta?: Record<string, unknown>) {
      if (currentLevel <= LOG_LEVELS.debug) {
        const entry = buildEntry("debug", component, message, meta);
        console.debug(formatEntry("debug", component, message, meta));
        writeToFile(entry);
      }
    },
    info(message: string, meta?: Record<string, unknown>) {
      if (currentLevel <= LOG_LEVELS.info) {
        const entry = buildEntry("info", component, message, meta);
        console.info(formatEntry("info", component, message, meta));
        writeToFile(entry);
      }
    },
    warn(message: string, meta?: Record<string, unknown>) {
      if (currentLevel <= LOG_LEVELS.warn) {
        const entry = buildEntry("warn", component, message, meta);
        console.warn(formatEntry("warn", component, message, meta));
        writeToFile(entry);
      }
    },
    error(message: string, meta?: Record<string, unknown>) {
      if (currentLevel <= LOG_LEVELS.error) {
        const entry = buildEntry("error", component, message, meta);
        console.error(formatEntry("error", component, message, meta));
        writeToFile(entry);
      }
    },
    fatal(message: string, meta?: Record<string, unknown>) {
      const entry = buildEntry("fatal", component, message, meta);
      console.error(formatEntry("fatal", component, message, meta));
      writeToFile(entry);
    },
    child(defaultMeta: Record<string, unknown>) {
      return createLogger(component);
    },
  };
}

export { LOG_LEVELS };
