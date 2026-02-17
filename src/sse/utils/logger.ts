/**
 * SSE Logger — Thin wrapper around the shared Pino logger
 * for backward compatibility with existing SSE code.
 *
 * Migrated from console.log to structured Pino logging.
 */
import { createLogger, logger as rootLogger } from "@/shared/utils/logger";

const log = createLogger("sse");

export function debug(tag, message, data) {
  log.debug({ tag, ...spreadData(data) }, message);
}

export function info(tag, message, data) {
  log.info({ tag, ...spreadData(data) }, message);
}

export function warn(tag, message, data) {
  log.warn({ tag, ...spreadData(data) }, message);
}

export function error(tag, message, data) {
  log.error({ tag, ...spreadData(data) }, message);
}

export function request(method, path, extra) {
  log.info({ tag: "HTTP", method, path, ...spreadData(extra) }, `📥 ${method} ${path}`);
}

export function response(status, duration, extra) {
  const level = status < 400 ? "info" : "error";
  log[level](
    { tag: "HTTP", status, duration, ...spreadData(extra) },
    `📤 ${status} (${duration}ms)`
  );
}

export function stream(event, data) {
  log.debug({ tag: "STREAM", event, ...spreadData(data) }, `🌊 ${event}`);
}

// Mask sensitive data (kept for backward compat; prefer shared maskKey)
export { maskKey } from "@/shared/utils/formatting";

// Helper to spread data into structured fields
function spreadData(data) {
  if (!data) return {};
  if (typeof data === "string") return { detail: data };
  if (typeof data === "object") return data;
  return { detail: String(data) };
}
