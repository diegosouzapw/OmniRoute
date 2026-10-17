/**
 * Structured Logger — Pino-based logger for OmniRoute
 *
 * Usage:
 *   import { logger } from "@/shared/utils/logger";
 *   const log = logger.child({ module: "proxy" });
 *   log.info({ model: "gpt-4o" }, "Request received");
 *   log.error({ err }, "Connection failed");
 *
 * In development, output is pretty-printed via pino-pretty.
 * In production, output is structured JSON for log aggregation.
 *
 * When APP_LOG_TO_FILE is enabled (default: true), logs are also written
 * as JSON lines to the file specified by APP_LOG_FILE_PATH.
 */
import pino from "pino";
import { Writable } from "stream";
import { resolve } from "path";
import { getLogConfig, initLogRotation, onLogRotation } from "@/lib/logRotation";
import { getAppLogLevel } from "@/lib/logEnv";
import { redactLogArgs } from "@/shared/utils/logRedaction";
import {
  getOrCreateSharedLoggerResource,
  type SharedLoggerResource,
} from "@/shared/utils/loggerResource";

const isDev = process.env.NODE_ENV !== "production";

const baseConfig: pino.LoggerOptions = {
  level: getAppLogLevel(isDev ? "debug" : "info"),
  base: { service: "omniroute" },
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level(label: string) {
      return { level: label };
    },
  },
  // Final defense-in-depth redaction net: runs in the main thread (transport-safe) and
  // scrubs credentials that slip into any log message/object/error. See logRedaction.ts.
  hooks: {
    logMethod(inputArgs: unknown[], method: (...args: unknown[]) => void) {
      return (method as (...a: unknown[]) => void).apply(this, redactLogArgs(inputArgs));
    },
  },
};

function getTransportCompatibleConfig(): pino.LoggerOptions {
  const { formatters, ...rest } = baseConfig;
  if (!formatters) return rest;

  const { level: _levelFormatter, ...safeFormatters } = formatters;
  return Object.keys(safeFormatters).length > 0 ? { ...rest, formatters: safeFormatters } : rest;
}

/**
 * Build a `pino.transport()` worker-thread stream and attach an `error` listener
 * BEFORE handing it to `pino()`.
 *
 * `pino({ transport: {...} })` builds the same stream internally but never listens
 * for its `error` event. A destination that stops existing mid-run (its directory is
 * deleted — e.g. a test's tmp `DATA_DIR` removed in `after()`, or an operator wiping
 * `logs/`) makes the worker's write fail with `ENOENT`; that surfaces as an unlistened
 * `error` event on the main-thread stream, which Node re-throws as an uncaught
 * exception (issue #6360 — "resource generated asynchronous activity after the test
 * ended"). A logger must never crash its host process because its own log file
 * vanished, so failed writes are dropped (best-effort stderr notice) instead of
 * escalating.
 */
function buildTransportStream(
  targets: NonNullable<pino.TransportMultiOptions["targets"]>,
  attachErrorHandler = true
) {
  const stream = pino.transport({ targets });
  if (!attachErrorHandler) return stream;
  stream.on("error", (err: unknown) => {
    try {
      process.stderr.write(
        `[logger] log transport write failed, dropping log line: ${(err as Error)?.message || err}\n`
      );
    } catch {
      // Nothing more we can do — never let a logging failure crash the process.
    }
  });
  return stream;
}

interface OwnedLogStream {
  flushSync?: () => void;
  flush?: (done: () => void) => void;
  write?: (chunk: unknown) => unknown;
  end?: () => void;
  once?: (event: string, listener: () => void) => unknown;
  on?: (event: string, listener: (...args: unknown[]) => void) => unknown;
}

/** SonicBoom sync destinations expose reopen(); other streams lack it. */
interface ReopenableSyncDestination extends OwnedLogStream {
  reopen?: () => void;
}

/**
 * A stable Writable that forwards every write to a replaceable target stream.
 *
 * Pino keeps the stream it receives at construction (children included), and
 * the worker-thread file transport exposes no `reopen()`. Swapping the whole
 * logger would orphan every `logger.child()` created so far, so rotation
 * rebuilds the file transport and switches this proxy's target instead: the
 * object pino holds never changes, only the file descriptor behind it.
 */
class SwitchableTargetStream extends Writable {
  private target: OwnedLogStream | null;
  private closedTargets = new Set<OwnedLogStream>();
  private ended = false;

  constructor(initialTarget: OwnedLogStream | null) {
    super({ decodeStrings: false });
    this.target = initialTarget;
    // The stream pino holds must itself carry an error listener: the 6360
    // guard reads listenerCount("error") on streamSym, and an unlistened
    // worker failure would re-throw as an uncaught exception.
    // Errors from the current target arrive through attachErrorRelay below,
    // which re-emits them here: a single sink on this proxy (see
    // createFileLogger) therefore runs exactly once per transport failure,
    // with the original arguments intact.
    this.on("error", () => {
      // Handled by relayed listeners below; this keeps the emitter safe.
    });
    if (initialTarget) this.attachErrorRelay(initialTarget);
  }

  setTarget(next: OwnedLogStream | null): void {
    if (this.target && next) this.closedTargets.add(this.target);
    this.target = next;
    if (next) this.attachErrorRelay(next);
  }

  markTargetClosed(target: OwnedLogStream | null): void {
    if (target) this.closedTargets.add(target);
  }

  private attachErrorRelay(target: OwnedLogStream): void {
    try {
      target.on?.("error", (...args: unknown[]) => {
        try {
          this.emit("error", ...args);
        } catch {
          // Never let a logging failure crash the process.
        }
      });
    } catch {
      // Targets without an emitter simply carry no relay.
    }
  }

  override on(event: string, listener: (...args: unknown[]) => void): this {
    return super.on(event, listener as (...args: unknown[]) => void);
  }

  override once(event: string, listener: (...args: unknown[]) => void): this {
    return super.once(event, listener as (...args: unknown[]) => void);
  }

  _write(
    chunk: unknown,
    _encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ): void {
    const target = this.target;
    if (!target?.write) {
      callback();
      return;
    }
    try {
      const result = target.write(chunk);
      if (result === false && typeof target.once === "function") {
        target.once("drain", () => callback());
      } else {
        callback();
      }
    } catch (error) {
      callback(error instanceof Error ? error : new Error(String(error)));
    }
  }

  _final(callback: (error?: Error | null) => void): void {
    if (this.ended) {
      callback();
      return;
    }
    this.ended = true;
    const target = this.target;
    if (!target || this.closedTargets.has(target)) {
      callback();
      return;
    }
    try {
      target.end?.();
      callback();
    } catch (error) {
      callback(error instanceof Error ? error : new Error(String(error)));
    }
  }
}

async function closeOwnedStream(stream: OwnedLogStream | null): Promise<void> {
  if (!stream) return;

  try {
    stream.flushSync?.();
  } catch {
    // Best-effort shutdown: a missing log destination must not block process exit.
  }

  if (!stream.end) return;

  await new Promise<void>((resolveClose) => {
    let resolved = false;
    const finish = () => {
      if (resolved) return;
      resolved = true;
      resolveClose();
    };
    const fallback = setTimeout(finish, 1_000);

    stream.once?.("close", () => {
      clearTimeout(fallback);
      finish();
    });

    try {
      stream.end?.();
      if (!stream.once) {
        clearTimeout(fallback);
        finish();
      }
    } catch {
      clearTimeout(fallback);
      finish();
    }
  });
}

function createLoggerResource(
  logger: pino.Logger,
  stream: OwnedLogStream | null
): SharedLoggerResource {
  return {
    logger,
    close: () => closeOwnedStream(stream),
  };
}

/** Targets shared by the dev and production file transports (stdout + file). */
function fileTransportTargets(
  absLogPath: string,
  logLevel: string,
  pretty: boolean
): NonNullable<pino.TransportMultiOptions["targets"]> {
  if (pretty) {
    return [
      {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss.l",
          ignore: "pid,hostname,service",
          messageFormat: "[{module}] {msg}",
          destination: 1,
        },
        level: logLevel,
      },
      {
        target: "pino/file",
        options: { destination: absLogPath, mkdir: true },
        level: logLevel,
      },
    ];
  }
  return [
    {
      target: "pino/file",
      options: { destination: 1 }, // stdout
      level: logLevel,
    },
    {
      target: "pino/file",
      options: { destination: absLogPath, mkdir: true },
      level: logLevel,
    },
  ];
}

interface FileLoggerHandle {
  logger: pino.Logger;
  stream: OwnedLogStream;
  proxy: SwitchableTargetStream;
  reopen: () => Promise<void>;
  close: () => Promise<void>;
}

/**
 * Build a standalone file logger whose stream reopens the current path after
 * a log rotation. Used by the shared logger and covered by the rotation
 * tests: entries queue in the proxy while the fresh transport starts, then
 * the old transport (still pointing at the rotated file) closes.
 */
export function createFileLogger(
  filePath: string,
  options?: { level?: string; pretty?: boolean }
): FileLoggerHandle {
  const logLevel = options?.level ?? ((baseConfig.level as string) || "info");
  const pretty = options?.pretty ?? isDev;
  const absLogPath = resolve(filePath);
  const transportConfig = getTransportCompatibleConfig();

  let stream = buildTransportStream(fileTransportTargets(absLogPath, logLevel, pretty), false);
  let current: OwnedLogStream = stream;
  const proxy = new SwitchableTargetStream(stream);
  // Single error sink for every generation of the file transport: worker
  // write failures are dropped with a stderr notice instead of escalating.
  proxy.on("error", (err: unknown) => {
    try {
      process.stderr.write(
        `[logger] log transport write failed, dropping log line: ${(err as Error)?.message || err}\n`
      );
    } catch {
      // Nothing more we can do — never let a logging failure crash the process.
    }
  });
  const logger = pino(transportConfig, proxy);
  let closed = false;

  const reopen = async (): Promise<void> => {
    if (closed) return;
    const next = buildTransportStream(fileTransportTargets(absLogPath, logLevel, pretty), false);
    const previous = current;
    current = next;
    proxy.setTarget(next);
    proxy.markTargetClosed(previous);
    await closeOwnedStream(previous);
  };

  const close = async (): Promise<void> => {
    if (closed) return;
    closed = true;
    proxy.markTargetClosed(current);
    await closeOwnedStream(current);
  };

  return { logger, stream: proxy, proxy, reopen, close };
}

/**
 * Subscribe a file logger to log rotations: after each rotation affecting its
 * path, rebuild the file transport so new lines reach the current file.
 * Failures stay best-effort (stderr notice) — logging must never crash its host.
 */
export function subscribeFileLoggerToRotation(
  handle: FileLoggerHandle,
  filePath: string
): () => void {
  const expected = resolve(filePath);
  return onLogRotation((currentPath: string) => {
    if (resolve(currentPath) !== expected) return;
    handle.reopen().catch((error: unknown) => {
      try {
        process.stderr.write(
          `[logger] failed to reopen log file after rotation, continuing on rotated file: ${(error as Error)?.message || error}\n`
        );
      } catch {
        // Nothing more we can do — never let a logging failure crash the process.
      }
    });
  });
}

/**
 * Build the logger with optional file transport.
 * Uses pino transport targets for all destinations.
 */
function buildLoggerResource(): SharedLoggerResource {
  const logConfig = getLogConfig();
  const logLevel = (baseConfig.level as string) || "info";
  const transportConfig = getTransportCompatibleConfig();

  // If file logging is enabled, set up dual transport (stdout + file)
  if (logConfig.logToFile) {
    try {
      // Initialize log directory and rotation
      initLogRotation();

      // Resolve to absolute path for pino worker threads
      const absLogPath = resolve(logConfig.logFilePath);
      const handle = createFileLogger(logConfig.logFilePath, { pretty: isDev });
      const unsubscribe = subscribeFileLoggerToRotation(handle, absLogPath);
      return {
        logger: handle.logger,
        close: async () => {
          unsubscribe();
          await handle.close();
        },
      };
    } catch (err) {
      // Log the actual error for diagnostics (issue #165)
      try {
        process.stderr.write(
          `[logger] Failed to set up file transport, attempting sync fallback: ${(err as Error)?.message || err}\n`
        );
      } catch {}

      // Fallback: use sync pino.destination() instead of worker-thread transport
      // pino.transport() uses worker threads which can fail in Next.js production bundles
      try {
        const absLogPath = resolve(logConfig.logFilePath);
        const fileDestination = pino.destination({ dest: absLogPath, mkdir: true, sync: true });
        fileDestination.on("error", (err: unknown) => {
          try {
            process.stderr.write(
              `[logger] sync log destination write failed, dropping log line: ${(err as Error)?.message || err}\n`
            );
          } catch {
            // Nothing more we can do — never let a logging failure crash the process.
          }
        });

        const reopenSyncDestination = (): void => {
          try {
            const reopenable: ReopenableSyncDestination = fileDestination;
            if (typeof reopenable.reopen === "function") {
              reopenable.reopen();
            }
          } catch (error) {
            try {
              process.stderr.write(
                `[logger] failed to reopen log file after rotation, continuing on rotated file: ${(error as Error)?.message || error}\n`
              );
            } catch {
              // Nothing more we can do — never let a logging failure crash the process.
            }
          }
        };
        const unsubscribeSync = onLogRotation((currentPath: string) => {
          if (resolve(currentPath) !== absLogPath) return;
          reopenSyncDestination();
        });

        // Production fallback: JSON to both stdout and file via multistream
        return {
          logger: pino(
            baseConfig,
            pino.multistream([
              { stream: process.stdout, level: logLevel as pino.Level },
              { stream: fileDestination, level: logLevel as pino.Level },
            ])
          ),
          close: async () => {
            unsubscribeSync();
            await closeOwnedStream(fileDestination);
          },
        };
      } catch (fallbackErr) {
        try {
          process.stderr.write(
            `[logger] Sync fallback also failed, falling back to console only: ${(fallbackErr as Error)?.message || fallbackErr}\n`
          );
        } catch {}
      }
    }
  }

  // Console-only (no file logging)
  if (isDev) {
    const stream = buildTransportStream([
      {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss.l",
          ignore: "pid,hostname,service",
          messageFormat: "[{module}] {msg}",
        },
        level: logLevel,
      },
    ]);
    return createLoggerResource(pino(transportConfig, stream), stream);
  }

  return createLoggerResource(pino(baseConfig), null);
}

const sharedLoggerResource = getOrCreateSharedLoggerResource(buildLoggerResource);

export const logger = sharedLoggerResource.logger;

/**
 * Create a child logger with a module tag.
 * @param {string} module - Module name for log context (e.g., "proxy", "db", "sse")
 * @returns {pino.Logger}
 */
export function createLogger(module: string) {
  return logger.child({ module });
}
