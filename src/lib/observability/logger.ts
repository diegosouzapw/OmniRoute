/**
 * logger.ts — Structured logger backed by pino (no new dependency).
 *
 * Re-uses the project's existing pino dependency (`pino` is already declared
 * in package.json). The logger emits LogRecords that can be enriched with
 * the active span context, allowing downstream tooling to correlate logs with
 * the span/trace timeline.
 *
 * Default-OFF: nothing is created until `createLogger()` is called. The
 * `createLogger({ enabled: false })` form yields a no-op logger.
 */

import pino, { type Logger as PinoLogger } from "pino";

import type { LogLevel, LogRecord, Span, SpanContext } from "./spanTypes";
import { getActiveSpan } from "./otel";

/** Knobs controlling the underlying pino instance. */
export interface LoggerOptions {
  name: string;
  level?: LogLevel;
  enabled?: boolean;
  /** Forward every log to this sink (test seam). */
  sink?: (record: LogRecord) => void;
}

/** Internal logger contract exposed to callers. */
export interface Logger {
  readonly name: string;
  readonly enabled: boolean;
  child(bindings: Record<string, unknown>): Logger;
  trace(message: string, attributes?: Record<string, unknown>): void;
  debug(message: string, attributes?: Record<string, unknown>): void;
  info(message: string, attributes?: Record<string, unknown>): void;
  warn(message: string, attributes?: Record<string, unknown>): void;
  error(message: string, attributes?: Record<string, unknown> | Error): void;
  fatal(message: string, attributes?: Record<string, unknown> | Error): void;
  /** Force-flush any buffered output (no-op for in-memory transports). */
  flush(): void;
}

const DEFAULT_LEVEL: LogLevel = "info";

function readLevel(): LogLevel {
  const env = process.env.OMNIROUTE_LOG_LEVEL;
  if (!env) return DEFAULT_LEVEL;
  const norm = env.trim().toLowerCase();
  if (norm === "trace" || norm === "debug" || norm === "info" || norm === "warn" || norm === "error" || norm === "fatal") {
    return norm;
  }
  return DEFAULT_LEVEL;
}

/** Create a logger. Pass `enabled: false` for a no-op logger (used in tests). */
export function createLogger(options: LoggerOptions): Logger {
  const enabled = options.enabled ?? true;
  if (!enabled) {
    return new NoopLogger(options.name);
  }
  return new PinoBackedLogger(options);
}

class NoopLogger implements Logger {
  readonly enabled = false;
  constructor(public readonly name: string) {}
  child(): Logger {
    return this;
  }
  trace(): void {}
  debug(): void {}
  info(): void {}
  warn(): void {}
  error(): void {}
  fatal(): void {}
  flush(): void {}
}

class PinoBackedLogger implements Logger {
  readonly enabled = true;
  readonly name: string;
  readonly #bindings: Record<string, unknown>;
  readonly #pino: PinoLogger;
  readonly #sink: ((record: LogRecord) => void) | null;

  constructor(options: LoggerOptions) {
    this.name = options.name;
    this.#bindings = {};
    this.#sink = options.sink ?? null;
    const level = options.level ?? readLevel();
    this.#pino = pino({ name: options.name, level, base: undefined });
  }

  child(bindings: Record<string, unknown>): Logger {
    const child = new PinoBackedLogger({
      name: this.name,
      enabled: true,
      sink: this.#sink ?? undefined,
    });
    child.#bindings = { ...this.#bindings, ...bindings };
    // Re-create pino with the merged bindings so each child carries its context.
    child.#pino = pino({ name: this.name, level: this.#pino.level, base: { ...child.#bindings } });
    return child;
  }

  trace(message: string, attributes?: Record<string, unknown>): void {
    this.#emit("trace", message, attributes);
  }
  debug(message: string, attributes?: Record<string, unknown>): void {
    this.#emit("debug", message, attributes);
  }
  info(message: string, attributes?: Record<string, unknown>): void {
    this.#emit("info", message, attributes);
  }
  warn(message: string, attributes?: Record<string, unknown>): void {
    this.#emit("warn", message, attributes);
  }
  error(message: string, attributes?: Record<string, unknown> | Error): void {
    const payload = normalizeErrorPayload(attributes);
    this.#emit("error", message, payload);
  }
  fatal(message: string, attributes?: Record<string, unknown> | Error): void {
    const payload = normalizeErrorPayload(attributes);
    this.#emit("fatal", message, payload);
  }
  flush(): void {
    // pino writes synchronously to stdout; nothing to flush.
  }

  /** Test seam: expose the underlying pino instance. */
  getPino(): PinoLogger {
    return this.#pino;
  }

  #emit(level: LogLevel, message: string, attributes?: Record<string, unknown>): void {
    const span = getActiveSpan();
    const context = span?.context;
    const merged = { ...this.#bindings, ...(attributes ?? {}) };

    // Honor the configured level — pino already filters stdout output, but
    // the sink must also be filtered so tests can assert "level=info drops debug".
    if (!isLevelEnabled(this.#pino.level, level)) return;

    // Forward to pino (stdout JSON line).
    try {
      const pinoMethod = this.#pino[level] as ((msg: string, attrs?: object) => void) | undefined;
      if (typeof pinoMethod === "function") {
        if (context) {
          pinoMethod.call(this.#pino, message, { ...merged, traceId: context.traceId, spanId: context.spanId });
        } else if (Object.keys(merged).length > 0) {
          pinoMethod.call(this.#pino, message, merged);
        } else {
          pinoMethod.call(this.#pino, message);
        }
      }
    } catch {
      // never let logging crash the host
    }

    if (this.#sink) {
      try {
        this.#sink({
          timestampMs: Date.now(),
          level,
          message,
          context: context ?? undefined,
          attributes: merged,
        });
      } catch {
        // best-effort
      }
    }
  }
}

/** Numeric ranks for log levels (lower = more verbose). */
const LEVEL_RANK: Record<LogLevel, number> = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

/** True when a record at `recordLevel` should pass the configured threshold. */
function isLevelEnabled(threshold: string, recordLevel: LogLevel): boolean {
  const t = LEVEL_RANK[threshold as LogLevel];
  const r = LEVEL_RANK[recordLevel];
  if (typeof t !== "number" || typeof r !== "number") return true;
  return r >= t;
}

function normalizeErrorPayload(
  attributes: Record<string, unknown> | Error | undefined
): Record<string, unknown> {
  if (!attributes) return {};
  if (attributes instanceof Error) {
    return {
      errorName: attributes.name,
      errorMessage: attributes.message,
      errorStack: attributes.stack,
    };
  }
  return attributes;
}

/** Convenience: build a LogRecord from a span context (used by exporters). */
export function logRecordWithContext(
  level: LogLevel,
  message: string,
  context: SpanContext | null,
  attributes?: Record<string, unknown>
): LogRecord {
  return {
    timestampMs: Date.now(),
    level,
    message,
    context: context ?? undefined,
    attributes,
  };
}

/** Test seam: pull the active pino instance (if any) for assertions. */
export function _pinoForTesting(logger: Logger): PinoLogger | null {
  if (logger instanceof PinoBackedLogger) {
    return logger.getPino();
  }
  return null;
}