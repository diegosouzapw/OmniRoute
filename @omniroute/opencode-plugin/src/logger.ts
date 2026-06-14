/**
 * Structured logger for the OmniRoute plugin.
 *
 * Levels: error < warn < info < debug
 * Default: warn (matches current console.warn behavior)
 * Set via features.logLevel in plugin options.
 */

export type LogLevel = "error" | "warn" | "info" | "debug";

const LEVEL_ORDER: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const TAG = "[omniroute-plugin]";

function shouldLog(current: LogLevel, target: LogLevel): boolean {
  return LEVEL_ORDER[current] >= LEVEL_ORDER[target];
}

let _level: LogLevel = "warn";

export function setLogLevel(level: LogLevel): void {
  _level = level;
}

export function getLogLevel(): LogLevel {
  return _level;
}

function fmt(level: LogLevel, msg: string, tag?: string): string {
  const prefix = tag ? `${TAG}${tag}` : TAG;
  return `${prefix} [${level.toUpperCase()}] ${msg}`;
}

export const logger = {
  error(msg: string, ...args: unknown[]): void {
    if (shouldLog(_level, "error")) console.error(fmt("error", msg), ...args);
  },
  warn(msg: string, ...args: unknown[]): void {
    if (shouldLog(_level, "warn")) console.warn(fmt("warn", msg), ...args);
  },
  info(msg: string, ...args: unknown[]): void {
    if (shouldLog(_level, "info")) console.warn(fmt("info", msg), ...args);
  },
  debug(msg: string, ...args: unknown[]): void {
    if (shouldLog(_level, "debug")) console.warn(fmt("debug", msg), ...args);
  },
  /** Always emit regardless of level (for critical init breadcrumbs). */
  always(msg: string, ...args: unknown[]): void {
    console.warn(TAG, msg, ...args);
  },

  // ── Tagged child loggers ──────────────────────────────────────────────
  child(tag: string) {
    return {
      error: (msg: string, ...args: unknown[]) =>
        shouldLog(_level, "error") &&
        console.error(fmt("error", msg, tag), ...args),
      warn: (msg: string, ...args: unknown[]) =>
        shouldLog(_level, "warn") &&
        console.warn(fmt("warn", msg, tag), ...args),
      info: (msg: string, ...args: unknown[]) =>
        shouldLog(_level, "info") &&
        console.warn(fmt("info", msg, tag), ...args),
      debug: (msg: string, ...args: unknown[]) =>
        shouldLog(_level, "debug") &&
        console.warn(fmt("debug", msg, tag), ...args),
    };
  },
};
