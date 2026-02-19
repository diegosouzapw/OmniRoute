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

const logToFile = process.env.LOG_TO_FILE !== "false";
const logFilePath = resolve(process.env.LOG_FILE_PATH || "logs/application/app.log");

let initialized = false;

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

/**
 * Initialize the console interceptor.
 * Patches console.log, console.info, console.warn, console.error, console.debug
 * to also write to the log file.
 *
 * Safe to call multiple times — only initializes once.
 */
export function initConsoleInterceptor(): void {
  if (!logToFile || initialized) return;

  try {
    ensureDir();
  } catch {
    // Can't create log dir — skip interception
    return;
  }

  initialized = true;

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
      // Call original console method
      original(...args);
      // Also write to file
      writeEntry(level, args);
    };
  }
}
