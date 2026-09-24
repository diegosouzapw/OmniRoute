import { sanitizeErrorMessage } from "../../utils/error.ts";

const ERROR_NAME_ONLY_RE = /^[A-Za-z]*Error:?$/;

/** Convert an unknown Arena failure into a stable, public-safe message. */
export function sanitizeLMArenaError(value: unknown, fallback = "Arena upstream error"): string {
  let candidate = value;
  try {
    if (value instanceof Error) candidate = value.message;
  } catch {
    // Hostile thrown values can expose coercing prototype/message accessors.
  }

  const sanitized = sanitizeErrorMessage(candidate).trim();
  if (!sanitized || ERROR_NAME_ONLY_RE.test(sanitized)) return fallback;
  return sanitized;
}
