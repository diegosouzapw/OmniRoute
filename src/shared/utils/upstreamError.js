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
      return rawError;
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
