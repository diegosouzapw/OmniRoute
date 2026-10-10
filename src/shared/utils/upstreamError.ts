/**
 * Normalize upstream error bodies to a JSON-safe payload.
 * Accepts unknown/object/string inputs and guarantees an { error: { ... } } shape.
 *
 * Hard Rule #12 (#15159 wave 1.1): every field that reaches the returned object
 * passes through `sanitizeErrorMessage`, and the `error` record is built from an
 * explicit allow-list rather than by spreading the upstream object. This helper
 * has 21 call sites across 13 production files that each serialize its return
 * value straight into an HTTP response body, so before this contract the upstream
 * provider controlled every client-visible byte — including `token`,
 * `internal_path` and a pasted stack trace. Two other guarantees hold on every
 * branch: `error.message` is ALWAYS present (falling back to `fallbackMessage`),
 * and the shape stays OpenAI-compatible.
 */
import {
  sanitizeErrorMessage,
  sanitizeUpstreamDetails,
} from "@omniroute/open-sse/utils/errorSanitization.ts";

type JsonRecord = Record<string, unknown>;

/**
 * Upstream error fields safe to forward verbatim, beyond `message`. Anything not
 * listed here is dropped from the top level of `error` — an allow-list is what
 * makes the passthrough safe, since a deny-list can never enumerate every way a
 * provider can smuggle a secret.
 */
const SAFE_ERROR_FIELDS = ["type", "code", "param", "reason", "status"] as const;

/** Keys that can mutate an object's prototype chain rather than describe data. */
const PROTOTYPE_CONTROL_KEYS = new Set(["__proto__", "constructor", "prototype"]);

/** Sanitize a candidate error field, or `undefined` when nothing safe remains. */
function safeErrorField(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const sanitized = sanitizeErrorMessage(value).trim();
  return sanitized || undefined;
}

/**
 * Sanitize an allow-listed diagnostic field that may be text or a primitive.
 * `status` in particular arrives as a number from most providers, and dropping it
 * would lose the status code the client can act on.
 */
function safeDiagnosticField(value: unknown): string | number | boolean | undefined {
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
  if (typeof value === "boolean") return value;
  return safeErrorField(value);
}

/**
 * Rebuild a sanitized value with ordinary object prototypes.
 *
 * `sanitizeUpstreamDetails` deliberately builds its records with
 * `Object.create(null)` (prototype-pollution safety). That is right while the
 * value is being assembled, but these records are returned into a client-visible
 * payload where consumers may compare them structurally — `assert.deepStrictEqual`
 * and `in`-style prototype lookups behave differently on a null-prototype
 * object. Rebuilding on the way out keeps the payload a normal JSON value.
 */
function toPlainJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((entry) => toPlainJson(entry));
  if (value && typeof value === "object") {
    const out: JsonRecord = {};
    for (const [key, entry] of Object.entries(value as JsonRecord)) {
      // Belt-and-braces: `sanitizeUpstreamDetails` already drops these via
      // PROTOTYPE_CONTROL_KEYS, but `out[key] = …` on a normal object would
      // ASSIGN the prototype if one ever got through. Own-property definition
      // makes that impossible regardless of what the caller passes in.
      if (PROTOTYPE_CONTROL_KEYS.has(key)) continue;
      Object.defineProperty(out, key, {
        value: toPlainJson(entry),
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
    return out;
  }
  return value;
}

/**
 * Assemble the `error` record from an allow-listed subset of `source`.
 * `fallbackMessage` is used when `source` carries no usable message, so the
 * client always receives something to show.
 */
function buildErrorRecord(source: JsonRecord, fallbackMessage: string): JsonRecord {
  const message = safeErrorField(extractErrorMessage(source)) ?? fallbackMessage;
  const record: JsonRecord = {
    message,
    type: safeErrorField(source.type) ?? "upstream_error",
    code: safeErrorField(source.code) ?? "upstream_error",
  };

  for (const field of SAFE_ERROR_FIELDS) {
    if (field === "type" || field === "code") continue;
    const safe = safeDiagnosticField(source[field]);
    if (safe !== undefined) record[field] = safe;
  }

  return record;
}

export function toJsonErrorPayload(rawError: unknown, fallbackMessage = "Upstream provider error") {
  const fallback = {
    error: {
      message: sanitizeErrorMessage(fallbackMessage) || "Upstream provider error",
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
          message: safeErrorField(errorObj) ?? fallback.error.message,
          type: "upstream_error",
          code: "upstream_error",
        },
      };
    }
    if (errorObj && typeof errorObj === "object") {
      const errorRecord = errorObj as JsonRecord;
      // A nested `error` object is the upstream envelope's own error body. Keep
      // the allow-listed fields and drop every sibling — the old `return
      // rawError` / `...errorRecord` spread handed the client the whole object.
      return { error: buildErrorRecord(errorRecord, fallbackMessage) };
    }
    if (!("message" in rawErrorRecord)) {
      const message = extractErrorMessage(rawErrorRecord);
      if (message) {
        const record = buildErrorRecord(rawErrorRecord, fallbackMessage);
        // The remaining upstream context is still useful, but only after
        // sanitizeUpstreamDetails drops credential-shaped and prototype keys
        // and redacts every string inside it.
        const sanitizedDetails = toPlainJson(sanitizeUpstreamDetails(rawErrorRecord));
        if (sanitizedDetails !== null && typeof sanitizedDetails === "object") {
          record.details = sanitizedDetails;
        }
        return { error: record };
      }
    }
    return { error: buildErrorRecord(rawErrorRecord, fallbackMessage) };
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
          // A non-JSON body is upstream text that can be a pasted stack trace;
          // sanitizeErrorMessage strips the frames and redacts any credential.
          message: safeErrorField(trimmed) ?? fallback.error.message,
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
