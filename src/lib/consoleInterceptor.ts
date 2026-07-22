/**
 * Console Log Interceptor — captures console output to a log file.
 *
 * Monkey-patches console.log, console.info, console.warn, console.error,
 * and console.debug to also append JSON log entries to a file. This allows
 * the Console Log Viewer to display application logs in real-time.
 *
 * Call initConsoleInterceptor() once at server startup (before any logging).
 *
 * @module lib/consoleInterceptor
 */

import { appendFileSync, existsSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { getAppLogFilePath, getAppLogToFile } from "./logEnv";

const logToFile = getAppLogToFile();
const logFilePath = resolve(getAppLogFilePath());

declare global {
  var __omnirouteConsoleInterceptorInit: boolean | undefined;
}

/**
 * Map console method names to log levels.
 */
const LEVEL_MAP: Record<string, string> = {
  debug: "debug",
  log: "info",
  info: "info",
  warn: "warn",
  error: "error",
};

// ── Rate limiting & dedup (Issue #8181) ─────────────────────────
// Same pattern as structuredLogger.ts (#1006): token-bucket rate limit +
// identical-message dedup within a sliding window. Prevents the EPIPE
// feedback loop from generating ~13k lines/sec of identical log entries.

const DEDUP_WINDOW_MS = 5_000;
const MAX_WRITES_PER_SECOND = 50;
const MAX_TRACKED_MESSAGES = 500;

const _recentMessages = new Map<string, { count: number; firstSeen: number }>();
let _writeCount = 0;
let _writeWindowStart = Date.now();

/** Latch: once stdout/stderr pipe is broken, stop all file logging. */
let _pipeBroken = false;

/** Latch: emit the "log dir missing" warning at most once. */
let _dirMissingWarned = false;

function pruneRecentMessages(now: number): void {
  if (_recentMessages.size > 100) {
    for (const [key, entry] of _recentMessages) {
      if (now - entry.firstSeen > DEDUP_WINDOW_MS) _recentMessages.delete(key);
    }
  }
  if (_recentMessages.size >= MAX_TRACKED_MESSAGES) {
    const overflow = _recentMessages.size - MAX_TRACKED_MESSAGES + 1;
    let removed = 0;
    for (const key of _recentMessages.keys()) {
      if (removed >= overflow) break;
      _recentMessages.delete(key);
      removed++;
    }
  }
}

function shouldSuppressWrite(message: string): boolean {
  const now = Date.now();

  // Rate limit: max writes per second
  if (now - _writeWindowStart > 1000) {
    _writeCount = 0;
    _writeWindowStart = now;
  }
  if (_writeCount >= MAX_WRITES_PER_SECOND) return true;

  // Dedup: suppress identical messages within window
  const existing = _recentMessages.get(message);
  if (existing && now - existing.firstSeen < DEDUP_WINDOW_MS) {
    existing.count++;
    return true;
  }

  pruneRecentMessages(now);

  _recentMessages.set(message, { count: 1, firstSeen: now });
  _writeCount++;
  return false;
}

/**
 * Ensure the log directory exists.
 */
function ensureDir() {
  const dir = dirname(logFilePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

/**
 * Try to extract component name from message patterns like [COMPONENT] or [component].
 */
function extractComponent(msg: string): string {
  const match = msg.match(/^\[([^\]]+)\]/);
  return match ? match[1] : "app";
}

/**
 * Convert arguments to a string message, handling objects and errors.
 */
function argsToMessage(args: unknown[]): string {
  return args
    .map((arg) => {
      if (arg instanceof Error) return `${arg.message}\n${arg.stack || ""}`;
      if (typeof arg === "object" && arg !== null) {
        try {
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      }
      return String(arg);
    })
    .join(" ");
}

// Original unpatched stderr write — captured before any patching.
const _originalStderrWrite = process.stderr.write.bind(process.stderr);

/**
 * Append a JSON log entry to the log file.
 * Rate-limited and deduplicated to prevent runaway loops (#8181).
 */
function writeEntry(level: string, args: unknown[]) {
  if (_pipeBroken) return; // Pipe is broken — file logging is latched off

  try {
    const message = argsToMessage(args);

    // Rate limit + dedup
    if (shouldSuppressWrite(message)) return;

    const entry = {
      timestamp: new Date().toISOString(),
      level,
      component: extractComponent(message),
      message,
    };
    appendFileSync(logFilePath, JSON.stringify(entry) + "\n");
  } catch (error) {
    // If the log directory is missing (ENOENT), emit a one-time warning to
    // the original unpatched stderr so a silent logging outage is detectable.
    if (
      !_dirMissingWarned &&
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      _dirMissingWarned = true;
      try {
        _originalStderrWrite(
          `[consoleInterceptor] WARNING: log directory missing — file logging disabled (ENOENT).\n`
        );
      } catch {
        // If even stderr is broken, there is nothing more we can do.
      }
    }
    // Silently fail — never break the app over log writing
  }
}

function shouldIgnoreConsoleWriteError(error: unknown): boolean {
  return error instanceof Error && (error as NodeJS.ErrnoException).code === "EPIPE";
}

/**
 * Attach error listeners to stdout/stderr so that an asynchronous EPIPE
 * (delivered when stdout is a pipe) latches file logging off instead of
 * feeding the feedback loop (#8181 Defect 2).
 */
function attachPipeErrorListeners(): void {
  const handler = (err: NodeJS.ErrnoException): void => {
    if (err.code === "EPIPE") {
      _pipeBroken = true;
    }
  };

  if (process.stdout && typeof process.stdout.on === "function") {
    process.stdout.on("error", handler);
  }
  if (process.stderr && typeof process.stderr.on === "function") {
    process.stderr.on("error", handler);
  }
}

/**
 * Initialize the console interceptor.
 * Patches console.log, console.info, console.warn, console.error, console.debug
 * to also write to the log file.
 *
 * Safe to call multiple times — only initializes once.
 */
export function initConsoleInterceptor(): void {
  if (!logToFile || globalThis.__omnirouteConsoleInterceptorInit) return;

  try {
    ensureDir();
  } catch {
    // Can't create log dir — skip interception
    return;
  }

  globalThis.__omnirouteConsoleInterceptorInit = true;

  // Attach async EPIPE detection (#8181 Defect 2)
  attachPipeErrorListeners();

  // Save original methods
  const originalMethods = {
    log: console.log.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    debug: console.debug.bind(console),
  };

  // Patch each console method
  for (const [method, level] of Object.entries(LEVEL_MAP)) {
    const original = originalMethods[method as keyof typeof originalMethods];
    if (!original) continue;

    (console as unknown as Record<string, unknown>)[method] = (...args: unknown[]) => {
      writeEntry(level, args);
      try {
        original(...args);
      } catch (error) {
        if (!shouldIgnoreConsoleWriteError(error)) throw error;
      }
    };
  }
}

// ── Test-only exports ───────────────────────────────────────────
export const __consoleInterceptorInternals = {
  get pipeBroken() {
    return _pipeBroken;
  },
  setPipeBroken(value: boolean) {
    _pipeBroken = value;
  },
  resetRateLimiter() {
    _recentMessages.clear();
    _writeCount = 0;
    _writeWindowStart = Date.now();
    _dirMissingWarned = false;
  },
  shouldSuppressWrite,
};
