/**
 * SSE Logger — Thin wrapper around the shared Pino logger
 * for backward compatibility with existing SSE code.
 *
 * Migrated from console.log to structured Pino logging.
 */
import { createLogger, logger as rootLogger } from "@/shared/utils/logger";

const log = createLogger("sse");

export function debug(tag: string, message: string, data?: unknown) {
  log.debug({ tag, ...spreadData(data) }, message);
}

export function info(tag: string, message: string, data?: unknown) {
  log.info({ tag, ...spreadData(data) }, message);
}

export function warn(tag: string, message: string, data?: unknown) {
  log.warn({ tag, ...spreadData(data) }, message);
}

export function error(tag: string, message: string, data?: unknown) {
  log.error({ tag, ...spreadData(data) }, message);
}

export function request(method: string, path: string, extra?: unknown) {
  log.info({ tag: "HTTP", method, path, ...spreadData(extra) }, `📥 ${method} ${path}`);
}

export function response(status: number, duration: number, extra?: unknown) {
  const level = status < 400 ? "info" : "error";
  log[level](
    { tag: "HTTP", status, duration, ...spreadData(extra) },
    `📤 ${status} (${duration}ms)`
  );
}

export function stream(event: string, data?: unknown) {
  log.debug({ tag: "STREAM", event, ...spreadData(data) }, `🌊 ${event}`);
}

// Mask sensitive data (kept for backward compat; prefer shared maskKey)
export { maskKey } from "@/shared/utils/formatting";

// Helper to spread data into structured fields
function spreadData(data: unknown): Record<string, unknown> {
  if (!data) return {};
  if (typeof data === "string") return { detail: data };
  if (typeof data === "object") return data as Record<string, unknown>;
  return { detail: String(data) };
}
