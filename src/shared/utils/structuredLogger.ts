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
import { getAppLogFilePath, getAppLogLevel, getAppLogToFile } from "@/lib/logEnv";

const LOG_LEVELS: Record<string, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  fatal: 50,
};

const currentLevel = LOG_LEVELS[getAppLogLevel("info").toLowerCase() || ""] || LOG_LEVELS.info;
const isProduction = process.env.NODE_ENV === "production";

// File logging configuration
const logToFile = getAppLogToFile();
const logFilePath = resolve(getAppLogFilePath());

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

// EPIPE-safe error deduplication + rate limiting (#1006)
const _recentErrors = new Map<string, { count: number; firstSeen: number }>();
const DEDUP_WINDOW_MS = 5_000;
const MAX_WRITES_PER_SECOND = 50;
// Hard cap on tracked distinct error messages. The age-based cleanup only removes entries
// older than DEDUP_WINDOW_MS, so a burst of >100 *unique* messages within a single 5s window
// (e.g. messages embedding request ids / urls / timestamps) could outpace it and grow the map.
// This bound evicts the oldest entries (Map preserves insertion order) as a backstop.
const MAX_TRACKED_ERRORS = 500;
let _writeCount = 0;
let _writeWindowStart = Date.now();

function pruneRecentErrors(now: number): void {
  // Age-based cleanup of expired entries.
  if (_recentErrors.size > 100) {
    for (const [key, entry] of _recentErrors) {
      if (now - entry.firstSeen > DEDUP_WINDOW_MS) _recentErrors.delete(key);
    }
  }
  // Hard size cap: evict oldest (insertion-order) entries if a unique-message burst outpaced
  // the age-based cleanup.
  if (_recentErrors.size >= MAX_TRACKED_ERRORS) {
    const overflow = _recentErrors.size - MAX_TRACKED_ERRORS + 1;
    let removed = 0;
    for (const key of _recentErrors.keys()) {
      if (removed >= overflow) break;
      _recentErrors.delete(key);
      removed++;
    }
  }
}

function shouldSuppressError(message: string): boolean {
  const now = Date.now();

  // Rate limit: max writes per second
  if (now - _writeWindowStart > 1000) {
    _writeCount = 0;
    _writeWindowStart = now;
  }
  if (_writeCount >= MAX_WRITES_PER_SECOND) return true;

  // Dedup: suppress identical messages within window
  const existing = _recentErrors.get(message);
  if (existing && now - existing.firstSeen < DEDUP_WINDOW_MS) {
    existing.count++;
    return true;
  }

  pruneRecentErrors(now);

  _recentErrors.set(message, { count: 1, firstSeen: now });
  _writeCount++;
  return false;
}

/** Test-only internals for verifying the dedup-map bound. */
export const __structuredLoggerInternals = {
  recentErrors: _recentErrors,
  pruneRecentErrors,
  MAX_TRACKED_ERRORS,
  isStreamWritable,
};

/**
 * True when a stream can still accept a write.
 *
 * Exported via __structuredLoggerInternals for tests: the real process.stderr cannot be
 * destroyed in-process to exercise this, because the test runner writes its own output there.
 */
function isStreamWritable(stream: { destroyed?: boolean; writableEnded?: boolean }): boolean {
  return stream.destroyed !== true && stream.writableEnded !== true;
}

/**
 * Write a line to stderr, skipping the write entirely when the stream is already known-bad.
 *
 * The `try {} catch {}` this replaces could only ever catch a *synchronous* failure. On a
 * broken pipe the write fails asynchronously and surfaces as an 'error' event on the stream,
 * which — with no listener attached — Node re-throws as an uncaughtException. That is the
 * ignition point of the #8181 log-flood loop, and it fires from the very line whose comment
 * says raw stderr writes are used to *avoid* EPIPE loops.
 *
 * consoleInterceptor now attaches the listener that stops the loop; this guard is defence in
 * depth, so a dead stream is not written to in the first place. The catch is retained for the
 * synchronous cases it always covered.
 */
function safeStderrWrite(text: string): void {
  if (!isStreamWritable(process.stderr)) return;
  try {
    process.stderr.write(text);
  } catch {
    /* synchronous write failures remain non-fatal, as before */
  }
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
        if (shouldSuppressError(message)) return;
        const entry = buildEntry("error", component, message, meta);
        // Use stderr.write to avoid Next.js console patching that triggers EPIPE loops.
        // Guarded: an unguarded write here is the ignition point of #8181.
        safeStderrWrite(formatEntry("error", component, message, meta) + "\n");
        writeToFile(entry);
      }
    },
    fatal(message: string, meta?: Record<string, unknown>) {
      if (shouldSuppressError(message)) return;
      const entry = buildEntry("fatal", component, message, meta);
      safeStderrWrite(formatEntry("fatal", component, message, meta) + "\n");
      writeToFile(entry);
    },
    child(defaultMeta: Record<string, unknown>) {
      return createLogger(component);
    },
  };
}

export { LOG_LEVELS };
