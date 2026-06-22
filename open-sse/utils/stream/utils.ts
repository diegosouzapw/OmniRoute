import { FETCH_BODY_TIMEOUT_MS } from "../../config/constants";

const STREAM_SUMMARY_TEXT_LIMIT = 64 * 1024;
export { STREAM_SUMMARY_TEXT_LIMIT };

export function stringifyIdValue(value: unknown): string | null {
  return value === null || value === undefined ? null : String(value);
}

export function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

export function appendBoundedText(current: string, next: string): string {
  if (!next) return current;
  const combined = current + next;
  if (combined.length <= STREAM_SUMMARY_TEXT_LIMIT) return combined;
  return combined.slice(-STREAM_SUMMARY_TEXT_LIMIT);
}

export const STREAM_MODE = {
  TRANSLATE: "translate",
  PASSTHROUGH: "passthrough",
  SSE: "sse",
} as const;

/**
 * Race a response body read against a timeout.
 * Prevents indefinite hangs when the upstream sends headers but stalls on the body.
 */
export function withBodyTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = FETCH_BODY_TIMEOUT_MS
): Promise<T> {
  if (timeoutMs <= 0) return promise;
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      const err = new Error(`Response body read timeout after ${timeoutMs}ms`);
      err.name = "BodyTimeoutError";
      reject(err);
    }, timeoutMs);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer)) as Promise<T>;
}
