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
import { resolve } from "path";
import { getLogConfig, initLogRotation } from "@/lib/logRotation";
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
function buildTransportStream(targets: NonNullable<pino.TransportMultiOptions["targets"]>) {
  const stream = pino.transport({ targets });
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
  end?: () => void;
  once?: (event: string, listener: () => void) => unknown;
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

      if (isDev) {
        // Dev: pino-pretty → stdout, JSON → file
        const stream = buildTransportStream([
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
        ]);
        return createLoggerResource(pino(transportConfig, stream), stream);
      }

      // Production: JSON → stdout + JSON → file
      {
        const stream = buildTransportStream([
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
        ]);
        return createLoggerResource(pino(transportConfig, stream), stream);
      }
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

        // Production fallback: JSON to both stdout and file via multistream
        return createLoggerResource(
          pino(
            baseConfig,
            pino.multistream([
              { stream: process.stdout, level: logLevel as pino.Level },
              { stream: fileDestination, level: logLevel as pino.Level },
            ])
          ),
          fileDestination
        );
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
