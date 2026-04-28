/**
 * Normalize upstream error bodies to a JSON-safe payload.
 * Accepts unknown/object/string inputs and guarantees an { error: { ... } } shape.
 */
export function toJsonErrorPayload(rawError, fallbackMessage = "Upstream provider error") {
  const fallback = {
    error: {
      message: fallbackMessage,
      type: "upstream_error",
      code: "upstream_error",
    },
  };

  if (rawError && typeof rawError === "object") {
    const errorObj = rawError.error;
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
      if (!("message" in errorObj) && nestedMessage) {
        return {
          error: {
            ...errorObj,
            message: nestedMessage,
            type: errorObj.type || "upstream_error",
            code: errorObj.code || "upstream_error",
          },
        };
      }
      return rawError;
    }
    if (!("message" in rawError)) {
      const message = extractErrorMessage(rawError);
      if (message) {
        return {
          error: {
            message,
            type: rawError.type || "upstream_error",
            code: rawError.code || "upstream_error",
            details: rawError,
          },
        };
      }
    }
    return { error: rawError };
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

function extractErrorMessage(value) {
  if (!value || typeof value !== "object") return null;

  if (typeof value.message === "string" && value.message.trim()) {
    return value.message.trim();
  }

  if (typeof value.detail === "string" && value.detail.trim()) {
    return value.detail.trim();
  }

  if (Array.isArray(value.errors)) {
    const messages = value.errors
      .map((entry) => {
        if (typeof entry === "string") return entry.trim();
        if (entry && typeof entry === "object") {
          return extractErrorMessage(entry) || JSON.stringify(entry);
        }
        return "";
      })
      .filter(Boolean);
    if (messages.length > 0) return messages.join(", ");
  }

  if (typeof value.name === "string" && value.name.trim()) {
    return value.name.trim();
  }

  return null;
}
