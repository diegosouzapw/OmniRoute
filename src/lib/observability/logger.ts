/**
 * Pino-compatible structured logger (PR-004).
 *
 * We don't pull `pino` (deps). Instead we emit NDJSON lines (one JSON object
 * per line) which `pino`, `bunyan`, `vector`, and `fluentbit` all parse
 * natively.
 *
 * Each log line carries:
 *   - level (numeric — pino convention: 10 trace, 20 debug, 30 info, 40 warn, 50 error, 60 fatal)
 *   - time (ISO 8601 UTC)
 *   - msg (string)
 *   - traceId + spanId (when an OTel span is active)
 *   - everything passed in `bindings`
 *
 * Log level can be set via `OMNIROUTE_LOG_LEVEL` (default `info`).
 * Log format can be set via `OMNIROUTE_LOG_FORMAT` (`json` default, `pretty`
 * for dev). Setting `OMNIROUTE_LOG_FORMAT=pretty` reformats as
 * human-readable single-line output for the dev console.
 *
 * Per-request/per-tenant context is held in AsyncLocalStorage and merged
 * into every log line emitted inside that scope.
 */

import { AsyncLocalStorage } from "node:async_hooks";
import { currentTraceId, currentSpanId } from "./otel";

// ───────────────────────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────────────────────

/** Pino-compatible numeric log levels. */
export type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";

const LEVEL_VALUES: Record<LogLevel, number> = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

/** Context shape stored in AsyncLocalStorage for per-request scopes. */
export interface LogContext {
  /** Tenant identifier (if known). */
  tenantId?: string;
  /** Request ID (corresponds to the `x-request-id` response header). */
  requestId?: string;
  /** Authenticated user (if any). */
  userId?: string;
  /** Route path being served (if in a request handler). */
  route?: string;
  /** HTTP method. */
  method?: string;
  /** Free-form key/value tags. */
  tags?: Record<string, string>;
}

/** Shape of a single log record before serialization. */
interface LogRecord {
  level: number;
  levelLabel: LogLevel;
  time: string;
  msg: string;
  traceId?: string;
  spanId?: string;
  pid: number;
  context?: LogContext;
  /** User-provided bindings (everything passed to log.info/.error/etc). */
  bindings: Record<string, unknown>;
}

// ───────────────────────────────────────────────────────────────────────────
// State
// ───────────────────────────────────────────────────────────────────────────

const contextStore = new AsyncLocalStorage<LogContext>();
let cachedMinLevel = 0;
let cachedFormat: "json" | "pretty" = "json";

function resolveMinLevel(): number {
  const raw = (process.env.OMNIROUTE_LOG_LEVEL ?? "info").trim().toLowerCase();
  const lvl = (LEVEL_VALUES as Record<string, number>)[raw];
  return typeof lvl === "number" ? lvl : LEVEL_VALUES.info;
}

function resolveFormat(): "json" | "pretty" {
  const raw = (process.env.OMNIROUTE_LOG_FORMAT ?? "json").trim().toLowerCase();
  return raw === "pretty" ? "pretty" : "json";
}

function refreshFromEnv(): void {
  cachedMinLevel = resolveMinLevel();
  cachedFormat = resolveFormat();
}

// Refresh on each log call — operators tune the env in dev and we want the
// change to take effect without restarting the process.
function getMinLevel(): number {
  const resolved = resolveMinLevel();
  if (resolved !== cachedMinLevel) cachedMinLevel = resolved;
  return cachedMinLevel;
}

function getFormat(): "json" | "pretty" {
  const resolved = resolveFormat();
  if (resolved !== cachedFormat) cachedFormat = resolved;
  return resolved;
}

refreshFromEnv();

// ───────────────────────────────────────────────────────────────────────────
// Public API
// ───────────────────────────────────────────────────────────────────────────

/**
 * Log a message at the given level. Extra context goes in `bindings`.
 *
 * @example
 * ```ts
 * log.info("combo_created", { comboId: id, tierCount: 3 });
 * log.error("upstream_failed", err, { provider, model });
 * ```
 */
export const log = {
  trace(msg: string, bindings?: Record<string, unknown>): void { emit("trace", msg, bindings); },
  debug(msg: string, bindings?: Record<string, unknown>): void { emit("debug", msg, bindings); },
  info(msg: string, bindings?: Record<string, unknown>): void { emit("info", msg, bindings); },
  warn(msg: string, bindings?: Record<string, unknown>): void { emit("warn", msg, bindings); },
  /** Error-level log. Pass the Error as the second arg so its stack survives. */
  error(msg: string, err?: unknown, bindings?: Record<string, unknown>): void {
    emit("error", msg, mergeErrorBindings(err, bindings));
  },
  fatal(msg: string, err?: unknown, bindings?: Record<string, unknown>): void {
    emit("fatal", msg, mergeErrorBindings(err, bindings));
  },
  /** Test-only: clear the AsyncLocalStorage context stack. */
  resetForTests(): void {
    contextStore.enterWith({});
  },
};

/** Set the log context for the current async scope. */
export function setLogContext(ctx: LogContext): void {
  contextStore.enterWith(ctx);
}

/** Merge new keys into the current async scope's log context. */
export function withLogContext<T>(extra: Partial<LogContext>, fn: () => T): T {
  const current = contextStore.getStore() ?? {};
  return contextStore.run({ ...current, ...extra }, fn);
}

/** Read the current async scope's log context (undefined outside a scope). */
export function getLogContext(): LogContext | undefined {
  return contextStore.getStore();
}

/** Clear the current async scope's log context. */
export function clearLogContext(): void {
  contextStore.enterWith({});
}

// ───────────────────────────────────────────────────────────────────────────
// Internals
// ───────────────────────────────────────────────────────────────────────────

function emit(level: LogLevel, msg: string, bindings?: Record<string, unknown>): void {
  const levelNum = LEVEL_VALUES[level];
  if (levelNum < getMinLevel()) return;

  const ctx = contextStore.getStore();
  const traceId = currentTraceId();
  const spanId = currentSpanId();

  const record: LogRecord = {
    // Spread user bindings first so reserved keys (level, msg, pid, ...) below
    // always win. Users should never need to override these — they're logger
    // invariants.
    ...(bindings ?? {}),
    level: levelNum,
    levelLabel: level,
    time: new Date().toISOString(),
    msg,
    pid: process.pid,
    ...(traceId ? { traceId } : {}),
    ...(spanId ? { spanId } : {}),
    ...(ctx && Object.keys(ctx).length > 0 ? { context: ctx } : {}),
    // Mirror the bindings under `record.bindings` so the pretty formatter can
    // re-serialize them without round-tripping through the rest of the record.
    bindings: bindings ?? {},
  };

  const line = getFormat() === "pretty" ? formatPretty(record) : JSON.stringify(record);
  // stdout for info+; stderr for warn+. Keeps container log shippers happy.
  const stream = levelNum >= LEVEL_VALUES.warn ? process.stderr : process.stdout;
  stream.write(`${line}\n`);
}

function mergeErrorBindings(err: unknown, bindings?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (err === undefined) return bindings;
  if (err instanceof Error) {
    return {
      ...(bindings ?? {}),
      err: {
        type: err.name,
        message: err.message,
        stack: err.stack,
      },
    };
  }
  return { ...(bindings ?? {}), err: String(err) };
}

function formatPretty(rec: LogRecord): string {
  // Pad to 7 chars so "INFO " / "WARN  " / "ERROR " line up when reading a
  // console scrollback. 4-char labels ("INFO", "WARN") get 3 spaces of padding;
  // 5-char labels ("ERROR", "FATAL") get 2; "TRACE" / "DEBUG" get 3.
  const lvl = rec.levelLabel.toUpperCase().padEnd(7);
  const ctxBits: string[] = [];
  if (rec.context?.requestId) ctxBits.push(`req=${rec.context.requestId}`);
  if (rec.context?.tenantId) ctxBits.push(`tenant=${rec.context.tenantId}`);
  if (rec.context?.route) ctxBits.push(`route=${rec.context.route}`);
  if (rec.traceId) ctxBits.push(`trace=${rec.traceId.slice(0, 8)}`);
  const ctxStr = ctxBits.length > 0 ? ` ${ctxBits.join(" ")}` : "";
  const bindingStr = Object.keys(rec.bindings ?? {}).length > 0
    ? ` ${JSON.stringify(rec.bindings)}`
    : "";
  return `${rec.time} ${lvl}${rec.msg}${ctxStr}${bindingStr}`;
}
