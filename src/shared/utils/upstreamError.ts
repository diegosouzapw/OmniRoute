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

function extractErrorMessage(value: unknown): string | null {
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
