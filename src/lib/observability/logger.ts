/**
 * src/lib/observability/logger.ts
 *
 * Pino-style structured logger. The intent is not to replace pino (which
 * OmniRoute already uses elsewhere) — it's to give the observability stack
 * a lightweight, dependency-free logger that:
 *  - writes newline-delimited JSON when OMNIROUTE_LOG_FORMAT=json
 *  - respects a single LOG_LEVEL env var (trace|debug|info|warn|error)
 *  - stamps every record with the current traceId / spanId when active
 *  - is safe to import from Edge (no fs, no process.stdout unless needed)
 *
 * Defaults match the existing OmniRoute console conventions: human-readable
 * in dev, JSON in prod. The logger NEVER throws — a logging failure must
 * not crash the host process.
 */

import * as otel from "./otel";

export type LogLevel = "trace" | "debug" | "info" | "warn" | "error";

const LEVEL_ORDER: Record<LogLevel, number> = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
};

const DEFAULT_LEVEL: LogLevel = "info";

let CURRENT_LEVEL: LogLevel = (process.env.OMNIROUTE_LOG_LEVEL as LogLevel) || DEFAULT_LEVEL;
let CURRENT_FORMAT: "json" | "pretty" =
  process.env.OMNIROUTE_LOG_FORMAT === "json" ? "json" : "pretty";

export interface LogFields {
  [key: string]: unknown;
}

export interface LogRecord {
  level: LogLevel;
  msg: string;
  time: number;
  traceId?: string;
  spanId?: string;
  [key: string]: unknown;
}

export interface Logger {
  trace(msg: string, fields?: LogFields): void;
  debug(msg: string, fields?: LogFields): void;
  info(msg: string, fields?: LogFields): void;
  warn(msg: string, fields?: LogFields): void;
  error(msg: string, fields?: LogFields): void;
  child(bindings: LogFields): Logger;
  level(): LogLevel;
  setLevel(level: LogLevel): void;
}

/** Set the global log level (e.g. from a /admin endpoint). */
export function setLogLevel(level: LogLevel): void {
  if (!(level in LEVEL_ORDER)) return;
  CURRENT_LEVEL = level;
}

/** Get the currently-active log level. */
export function getLogLevel(): LogLevel {
  return CURRENT_LEVEL;
}

/** Set the global log format. */
export function setLogFormat(format: "json" | "pretty"): void {
  CURRENT_FORMAT = format;
}

/** Read the current format. */
export function getLogFormat(): "json" | "pretty" {
  return CURRENT_FORMAT;
}

/** True when `level` is at or above the current threshold. */
export function isLogLevelEnabled(level: LogLevel): boolean {
  return LEVEL_ORDER[level] >= LEVEL_ORDER[CURRENT_LEVEL];
}

/**
 * Emit a log record through the configured sink. `traceId`/`spanId` are
 * attached lazily — we don't want to import otel.ts at the top level so
 * the logger module stays free of cyclic concerns.
 */
function emit(level: LogLevel, msg: string, fields: LogFields, bindings: LogFields): void {
  if (!isLogLevelEnabled(level)) return;
  const record: LogRecord = {
    level,
    msg,
    time: Date.now(),
    ...bindings,
    ...fields,
  };
  // Best-effort trace context — guarded so a missing ALS doesn't blow up.
  try {
    const traceId = otel.currentTraceId();
    const spanId = otel.currentSpanId();
    if (traceId) record.traceId = traceId;
    if (spanId) record.spanId = spanId;
  } catch {
    // otel module may be unavailable (Edge runtime); skip silently.
  }
  try {
    if (CURRENT_FORMAT === "json") {
      const sink = (globalThis as { process?: { stdout?: { write?: (s: string) => void } } }).process
        ?.stdout;
      sink?.write?.(JSON.stringify(record) + "\n");
    } else {
      const stamp = new Date(record.time).toISOString();
      const lvl = level.toUpperCase().padEnd(5);
      const ctx = record.traceId ? ` [trace=${record.traceId.slice(0, 8)}]` : "";
      const extras = Object.entries({ ...bindings, ...fields })
        .filter(([k]) => k !== "level" && k !== "msg" && k !== "time")
        .map(([k, v]) => ` ${k}=${stringify(v)}`)
        .join("");
      const sink = (globalThis as { process?: { stdout?: { write?: (s: string) => void } } }).process
        ?.stdout;
      sink?.write?.(`${stamp} ${lvl}${ctx} ${msg}${extras}\n`);
    }
  } catch {
    // Last-ditch: never throw from a logger.
  }
}

function stringify(v: unknown): string {
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  try {
    return JSON.stringify(v);
  } catch {
    return "[unserializable]";
  }
}

/** Build a new logger; pass `bindings` to attach static fields (component, …). */
export function createLogger(bindings: LogFields = {}): Logger {
  const bound: LogFields = { ...bindings };
  return {
    trace: (msg, fields) => emit("trace", msg, fields ?? {}, bound),
    debug: (msg, fields) => emit("debug", msg, fields ?? {}, bound),
    info: (msg, fields) => emit("info", msg, fields ?? {}, bound),
    warn: (msg, fields) => emit("warn", msg, fields ?? {}, bound),
    error: (msg, fields) => emit("error", msg, fields ?? {}, bound),
    child: (extra) => createLogger({ ...bound, ...extra }),
    level: () => CURRENT_LEVEL,
    setLevel: setLogLevel,
  };
}

/** Default root logger. */
export const logger = createLogger({ component: "observability" });

/** Test-only: reset level/format to env-derived values. */
export function _resetLoggerForTests(): void {
  CURRENT_LEVEL = (process.env.OMNIROUTE_LOG_LEVEL as LogLevel) || DEFAULT_LEVEL;
  CURRENT_FORMAT = process.env.OMNIROUTE_LOG_FORMAT === "json" ? "json" : "pretty";
}