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
 * When LOG_TO_FILE is enabled (default: true), logs are also written
 * as JSON lines to the file specified by LOG_FILE_PATH.
 */
import pino from "pino";
import { resolve } from "path";
import { getLogConfig, initLogRotation } from "@/lib/logRotation";

const isDev = process.env.NODE_ENV !== "production";

const baseConfig: pino.LoggerOptions = {
  level: process.env.LOG_LEVEL || (isDev ? "debug" : "info"),
  base: { service: "omniroute" },
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level(label: string) {
      return { level: label };
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
 * Build the logger with optional file transport.
 * Uses pino transport targets for all destinations.
 */
function buildLogger(): pino.Logger {
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
        return pino({
          ...transportConfig,
          transport: {
            targets: [
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
            ],
          },
        });
      }

      // Production: JSON → stdout + JSON → file
      return pino({
        ...transportConfig,
        transport: {
          targets: [
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
          ],
        },
      });
    } catch (err) {
      // Log the actual error for diagnostics (issue #165)
      console.warn(
        "[logger] Failed to set up file transport, attempting sync fallback...",
        (err as Error)?.message || err
      );

      // Fallback: use sync pino.destination() instead of worker-thread transport
      // pino.transport() uses worker threads which can fail in Next.js production bundles
      try {
        const absLogPath = resolve(logConfig.logFilePath);
        const fileDestination = pino.destination({ dest: absLogPath, mkdir: true, sync: true });

        // Production fallback: JSON to both stdout and file via multistream
        return pino(
          baseConfig,
          pino.multistream([
            { stream: process.stdout, level: logLevel as pino.Level },
            { stream: fileDestination, level: logLevel as pino.Level },
          ])
        );
      } catch (fallbackErr) {
        console.warn(
          "[logger] Sync fallback also failed, falling back to console only",
          (fallbackErr as Error)?.message || fallbackErr
        );
      }
    }
  }

  // Console-only (no file logging)
  if (isDev) {
    return pino({
      ...baseConfig,
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss.l",
          ignore: "pid,hostname,service",
          messageFormat: "[{module}] {msg}",
        },
      },
    });
  }

  return pino(baseConfig);
}

export const logger = buildLogger();

/**
 * Create a child logger with a module tag.
 * @param {string} module - Module name for log context (e.g., "proxy", "db", "sse")
 * @returns {pino.Logger}
 */
export function createLogger(module: string) {
  return logger.child({ module });
}

export default logger;
