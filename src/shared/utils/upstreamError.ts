/**
 * Normalize upstream error bodies to a JSON-safe payload.
 * Accepts unknown/object/string inputs and guarantees an { error: { ... } } shape.
 */
type JsonRecord = Record<string, unknown>;

export function toJsonErrorPayload(rawError: unknown, fallbackMessage = "Upstream provider error") {
  const fallback = {
    error: {
      message: fallbackMessage,
      type: "upstream_error",
      code: "upstream_error",
    },
  };

  if (rawError && typeof rawError === "object") {
    const rawErrorRecord = rawError as JsonRecord;
    const errorObj = rawErrorRecord.error;
    if (typeof errorObj === "string") {
      return {
        error: {
          message: errorObj,
          type: "upstream_error",
          code: "upstream_error",
        },
      };
    }
    if (errorObj && typeof errorObj === "object") {
      const nestedMessage = extractErrorMessage(errorObj);
      const errorRecord = errorObj as JsonRecord;
      if (!("message" in errorRecord) && nestedMessage) {
        return {
          error: {
            ...errorRecord,
            message: nestedMessage,
            type: errorRecord.type || "upstream_error",
            code: errorRecord.code || "upstream_error",
          },
        };
      }
      return rawError;
    }
    if (!("message" in rawErrorRecord)) {
      const message = extractErrorMessage(rawErrorRecord);
      if (message) {
        return {
          error: {
            message,
            type: rawErrorRecord.type || "upstream_error",
            code: rawErrorRecord.code || "upstream_error",
            details: rawErrorRecord,
          },
        };
      }
    }
    return { error: rawErrorRecord };
  }

  if (typeof rawError === "string") {
    const trimmed = rawError.trim();
    if (!trimmed) {
      return fallback;
    }

    try {
      const parsed = JSON.parse(trimmed);
      return toJsonErrorPayload(parsed, fallbackMessage);
    } catch {
      return {
        error: {
          message: trimmed,
          type: "upstream_error",
          code: "upstream_error",
        },
      };
    }
  }

  return fallback;
}

export function extractErrorMessage(value: unknown): string | null {
  if (!value || typeof value !== "object") return null;
  const record = value as JsonRecord;

  if (typeof record.message === "string" && record.message.trim()) {
    return record.message.trim();
  }

  if (typeof record.detail === "string" && record.detail.trim()) {
    return record.detail.trim();
  }

  if (Array.isArray(record.errors)) {
    const messages = record.errors
      .map((entry: unknown) => {
        if (typeof entry === "string") return entry.trim();
        if (entry && typeof entry === "object") {
          return extractErrorMessage(entry) || JSON.stringify(entry);
        }
        return "";
      })
      .filter(Boolean);
    if (messages.length > 0) return messages.join(", ");
  }

  if (typeof record.name === "string" && record.name.trim()) {
    return record.name.trim();
  }

  return null;
}

/**
 * One-line reason for an upstream failure, for `lastError` and the console.
 *
 * A non-string used to collapse to the bare fallback, which is what an operator
 * then reads in the dashboard. The case that matters most is not a string: a
 * failed `fetch` arrives as `TypeError: fetch failed` with the actionable part on
 * `error.cause.code` (ECONNREFUSED, ENOTFOUND, ETIMEDOUT), so a wrong port, a
 * firewall and a blocked proxy all looked identical.
 *
 * Only message-shaped fields and transport codes are read — the value is never
 * serialized wholesale, so a request body or header attached to an error cannot
 * leak into the stored reason.
 */
export function describeUpstreamFailure(
  value: unknown,
  fallback = "Provider error",
  maxLength = 100
): string {
  const clamp = (text: string) => text.replace(/\s+/g, " ").trim().slice(0, maxLength);

  if (typeof value === "string") return value.slice(0, maxLength);
  if (!value || typeof value !== "object") return fallback;

  const record = value as JsonRecord;
  const cause = record.cause as JsonRecord | undefined;
  const code =
    typeof record.code === "string" && record.code
      ? record.code
      : cause && typeof cause === "object" && typeof cause.code === "string" && cause.code
        ? cause.code
        : null;

  const nestedError = record.error;
  const message =
    extractErrorMessage(value) ??
    (typeof nestedError === "string" && nestedError.trim()
      ? nestedError.trim()
      : extractErrorMessage(nestedError));

  if (message) {
    return code && !message.includes(code) ? clamp(`${message} (${code})`) : clamp(message);
  }
  return code ? clamp(`${fallback} (${code})`) : fallback;
}
