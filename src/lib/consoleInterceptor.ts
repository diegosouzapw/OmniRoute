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
 * listener, so simply attaching this handler is what breaks the loop: a raw stderr write
 * that fails asynchronously on a broken pipe no longer becomes an uncaughtException that the
 * framework re-logs through the patched console, back into the same dead stream.
 *
 * That also means attaching it absorbs EVERY stream error on these streams, process-wide --
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

/**
 * Append a JSON log entry to the log file.
 */
function writeEntry(level: string, args: unknown[]) {
  try {
    const message = argsToMessage(args);
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      component: extractComponent(message),
      message,
    };
    appendFileSync(logFilePath, JSON.stringify(entry) + "\n");
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
  if (!logToFile || globalThis.__omnirouteConsoleInterceptorInit) return;

  try {
    ensureDir();
  } catch {
    // Can't create log dir — skip interception
    return;
  }

  globalThis.__omnirouteConsoleInterceptorInit = true;

  // Break the loop at its closure point: with a listener attached, an async EPIPE on these
  // streams no longer re-throws as an uncaughtException, so the
  // uncaughtException -> console.error -> write-to-dead-stream cycle never starts.
  streamErrorHandler = handleStreamError;
  process.stdout.on("error", streamErrorHandler);
  process.stderr.on("error", streamErrorHandler);

  // Capture the raw method references first, so reset() can restore the exact functions that
  // were installed before patching. The bound copies below are for calling, not restoring --
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
    globalThis.__omnirouteConsoleInterceptorInit = undefined;
  },
};
