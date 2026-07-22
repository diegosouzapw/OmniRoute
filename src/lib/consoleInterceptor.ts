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

type ConsoleMethod = (...args: unknown[]) => void;

/**
 * State owned by initConsoleInterceptor, cleared by __consoleInterceptorInternals.reset().
 * Kept module-level (not inside init) so reset() can undo a previous init: `test:unit:fast`
 * runs with `--test-isolation=none`, so a patched console or a leaked stream listener would
 * otherwise persist across every subsequent test file in the process.
 */
let savedConsoleMethods: Partial<Record<string, ConsoleMethod>> | null = null;
let streamErrorHandler: ((err: unknown) => void) | null = null;

function isEpipe(error: unknown): boolean {
  return (error as NodeJS.ErrnoException | null)?.code === "EPIPE";
}

/**
 * Handle an 'error' event on process.stdout / process.stderr.
 *
 * Node only converts a stream 'error' into an uncaughtException when the emitter has no
 * listener, so simply attaching this handler is what breaks the #8181 loop.
 *
 * That also means attaching it absorbs EVERY stream error on these streams, process-wide —
 * including conditions that are fatal today (ENOSPC, EBADF, ECONNRESET). Absorb EPIPE, which
 * is the one we are here to survive, and re-raise everything else on a fresh stack so the
 * process keeps its current crash semantics.
 */
function handleStreamError(error: unknown): void {
  if (isEpipe(error)) return;
  setImmediate(() => {
    throw error;
  });
}

/**
 * Install the stdio error guard. Idempotent.
 *
 * Deliberately independent of console interception. `structuredLogger.error()`/`.fatal()`
 * write to stderr directly, and those writes happen whether or not file logging is enabled,
 * so a broken pipe can raise an async EPIPE in configurations where interception is off
 * (`APP_LOG_TO_FILE=false`, or a log directory that cannot be created). The guard has to be
 * in place for those too, otherwise the very loop this exists to prevent is still reachable.
 */
function installStdioErrorGuard(): void {
  if (streamErrorHandler) return;
  streamErrorHandler = handleStreamError;
  process.stdout.on("error", streamErrorHandler);
  process.stderr.on("error", streamErrorHandler);
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

// Rate limiting for interceptor disk writes, applied to `error` entries ONLY.
//
// The policy mirrors #1006's in structuredLogger (50 writes/sec, 5s dedup, bounded map) so the
// numbers are ones upstream has already accepted. The `error`-only scope is deliberate and is
// not what #1006 did by accident: structuredLogger applies its limiter solely to error() and
// fatal(), whereas writeEntry here serves all five of log/info/warn/error/debug across ~800
// non-error call sites. Applying a 50/sec cap to ordinary logging would silently drop routine
// startup and per-request lines from the Console Log Viewer's file.
const ERROR_DEDUP_WINDOW_MS = 5_000;
const ERROR_MAX_WRITES_PER_SECOND = 50;
const ERROR_MAX_TRACKED = 500;

let recentErrorEntries = new Map<string, number>();
let errorWriteCount = 0;
let errorWindowStart = Date.now();
let missingDirNoticeEmitted = false;

function shouldSuppressErrorEntry(message: string): boolean {
  const now = Date.now();

  if (now - errorWindowStart > 1000) {
    errorWriteCount = 0;
    errorWindowStart = now;
  }
  if (errorWriteCount >= ERROR_MAX_WRITES_PER_SECOND) return true;

  const firstSeen = recentErrorEntries.get(message);
  if (firstSeen !== undefined && now - firstSeen < ERROR_DEDUP_WINDOW_MS) return true;

  if (recentErrorEntries.size >= ERROR_MAX_TRACKED) {
    // Map preserves insertion order; evict oldest as a backstop against a unique-message burst.
    const oldest = recentErrorEntries.keys().next();
    if (!oldest.done) recentErrorEntries.delete(oldest.value);
  }

  recentErrorEntries.set(message, now);
  errorWriteCount++;
  return false;
}

/**
 * Report, exactly once, that the log file has become unwritable.
 *
 * Written straight to stderr rather than through console: console is patched by this module,
 * so routing it there would re-enter writeEntry and could recurse. Guarded on stream health
 * for the same reason structuredLogger's raw writes now are (#8181).
 */
function emitMissingDirNoticeOnce(): void {
  if (missingDirNoticeEmitted) return;
  missingDirNoticeEmitted = true;
  if (process.stderr.destroyed || process.stderr.writableEnded) return;
  try {
    process.stderr.write(
      `[consoleInterceptor] console file-logging is failing; log file unavailable: ${logFilePath}\n`
    );
  } catch {
    /* the notice is best-effort by definition */
  }
}

/**
 * Append a JSON log entry to the log file.
 *
 * ensureDir() runs once in initConsoleInterceptor(), so if the log directory is removed while
 * the process is alive every subsequent append throws ENOENT into the catch below and console
 * file-logging stops permanently, with nothing surfaced. Recreate the directory and retry once
 * before giving up, and say so on the first failure.
 */
function writeEntry(level: string, args: unknown[]) {
  try {
    const message = argsToMessage(args);
    if (level === "error" && shouldSuppressErrorEntry(message)) return;

    const entry = {
      timestamp: new Date().toISOString(),
      level,
      component: extractComponent(message),
      message,
    };
    const line = JSON.stringify(entry) + "\n";

    try {
      appendFileSync(logFilePath, line);
    } catch {
      try {
        ensureDir();
        appendFileSync(logFilePath, line);
      } catch {
        emitMissingDirNoticeOnce();
      }
    }
  } catch {
    // Silently fail — never break the app over log writing
  }
}

function shouldIgnoreConsoleWriteError(error: unknown): boolean {
  return error instanceof Error && (error as NodeJS.ErrnoException).code === "EPIPE";
}

/**
 * Initialize the console interceptor.
 * Patches console.log, console.info, console.warn, console.error, console.debug
 * to also write to the log file.
 *
 * Safe to call multiple times — only initializes once.
 */
export function initConsoleInterceptor(): void {
  // Install the stdio guard first, before any early return. It protects the raw stderr writes
  // in structuredLogger, which happen regardless of whether console interception is enabled.
  installStdioErrorGuard();

  if (!logToFile || globalThis.__omnirouteConsoleInterceptorInit) return;

  try {
    ensureDir();
  } catch {
    // Can't create log dir — skip interception
    return;
  }

  globalThis.__omnirouteConsoleInterceptorInit = true;

  // Capture the raw method references first, so reset() can restore the exact functions that
  // were installed before patching. The bound copies below are for calling, not restoring —
  // restoring a bound copy would change function identity and defeat the save/restore that
  // existing console-mocking tests rely on.
  savedConsoleMethods = {
    log: console.log as ConsoleMethod,
    info: console.info as ConsoleMethod,
    warn: console.warn as ConsoleMethod,
    error: console.error as ConsoleMethod,
    debug: console.debug as ConsoleMethod,
  };

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

/**
 * Test-only internals.
 *
 * `reset()` is not a convenience: `test:unit:fast` runs `--test-isolation=none`, so every unit
 * test file shares one process. Without it, an interceptor initialised by one file would leave
 * console patched and stream listeners attached for every file that follows.
 */
export const __consoleInterceptorInternals = {
  reset(): void {
    if (streamErrorHandler) {
      process.stdout.removeListener("error", streamErrorHandler);
      process.stderr.removeListener("error", streamErrorHandler);
      streamErrorHandler = null;
    }
    if (savedConsoleMethods) {
      for (const [method, fn] of Object.entries(savedConsoleMethods)) {
        if (fn) (console as unknown as Record<string, unknown>)[method] = fn;
      }
      savedConsoleMethods = null;
    }
    recentErrorEntries = new Map();
    errorWriteCount = 0;
    errorWindowStart = Date.now();
    missingDirNoticeEmitted = false;
    globalThis.__omnirouteConsoleInterceptorInit = undefined;
  },
};
