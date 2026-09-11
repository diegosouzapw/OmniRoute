import {
  sanitizeErrorMessage,
  sanitizeUpstreamDetails,
} from "@omniroute/open-sse/utils/errorSanitization.ts";
import { projectResponsesFailureOutput } from "@omniroute/open-sse/utils/responsesFailureOutput.ts";
import { sanitizePII } from "./piiSanitizer";

const SENSITIVE_KEYS = new Set([
  "api_key",
  "apiKey",
  "api-key",
  "authorization",
  "Authorization",
  "x-api-key",
  "X-Api-Key",
  "x-goog-api-key",
  "access_token",
  "accessToken",
  "refresh_token",
  "refreshToken",
  "password",
  "secret",
  "token",
  // secret-leak hardening: session cookies + browser-storage credentials that
  // some web-impersonation providers (Meta AI ecto_1_sess, Perplexity Web
  // storageState / runtimeKey) can surface into a request/response BODY field
  // rather than a header. Header-borne values are already masked by
  // maskSensitiveHeaders; this covers the body path into the on-disk call-log
  // artifact. Scoped to the actual credential field names only — the generic
  // word "capability" was intentionally NOT included: it is a common non-secret
  // field (model catalogs' `capabilities`, degradation/provider-discovery
  // `capability` strings, MCP tool schemas) and matching it here would broadly
  // redact useful diagnostics from call-log artifacts. The real Meta AI secret
  // is the ecto_1_sess cookie / ecto1: WS token, already covered by
  // cookie/authorization/storageState above.
  "cookie",
  "Cookie",
  "storageState",
  "storage-state",
  "runtimeKey",
]);

const SENSITIVE_CHALLENGE_KEYS = new Set([
  "recaptchav3token",
  "recaptchatoken",
  "turnstiletoken",
  "prooftoken",
  "resumetoken",
  "preparetoken",
]);

function isSensitivePayloadKey(key: string): boolean {
  if (SENSITIVE_KEYS.has(key)) return true;
  const normalizedKey = key.replace(/[-_]/g, "").toLowerCase();
  return SENSITIVE_CHALLENGE_KEYS.has(normalizedKey);
}

type JsonRecord = Record<string, unknown>;

const ENCRYPTED_REASONING_KEY = "encrypted_content";

function encryptedReasoningOmissionMarker(length?: number): string {
  return length === undefined
    ? "[omitted: encrypted reasoning]"
    : `[omitted: encrypted reasoning, ${length} chars]`;
}

// Matches a JSON string field in captured SSE text. Alternatives inside the value are disjoint,
// keeping the scan linear even for large encrypted blobs.
const SERIALIZED_ENCRYPTED_REASONING_RE = /(\"encrypted_content\"\s*:\s*\")((?:\\.|[^\"\\])*)\"/g;
const STREAM_CHUNK_TIMESTAMP_RE = /^\[\d{2}:\d{2}:\d{2}\.\d{3}\] /;

export function omitEncryptedReasoningFromLogChunks(chunks: string[]): string[] {
  const combined = chunks.map((chunk) => chunk.replace(STREAM_CHUNK_TIMESTAMP_RE, "")).join("");
  let found = false;
  const omitted = combined.replace(SERIALIZED_ENCRYPTED_REASONING_RE, (_match, prefix: string) => {
    found = true;
    return `${prefix}${encryptedReasoningOmissionMarker()}\"`;
  });
  return found ? [omitted] : chunks;
}

const ERROR_SUBTREE_KEYS = new Set([
  "error",
  "errors",
  "warning",
  "warnings",
  "errormessage",
  "warningmessage",
  "errordescription",
  "warningdescription",
  "lasterror",
]);

function isErrorSubtreeKey(key: string): boolean {
  return ERROR_SUBTREE_KEYS.has(key.replace(/[-_]/g, "").toLowerCase());
}

function sanitizeErrorSubtreeValue(value: unknown): unknown {
  if (typeof value === "string") return sanitizeErrorMessage(value);
  try {
    if (value instanceof Error) {
      return {
        name: sanitizeErrorMessage(value.name) || "Error",
        message: sanitizeErrorMessage(value.message),
      };
    }
    return sanitizeUpstreamDetails(value);
  } catch {
    return "[REDACTED]";
  }
}

type ErrorSubtreeProjection = { value: unknown; found: boolean };

function projectErrorSubtreesForLog(
  value: unknown,
  seen = new WeakSet<object>(),
  forceResponsesFailure = false,
  protocolResponseObject = false
): ErrorSubtreeProjection {
  if (forceResponsesFailure && typeof value === "string") {
    return { value: sanitizeErrorMessage(value) || "[REDACTED]", found: true };
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (
      (trimmed.startsWith("{") || trimmed.startsWith("[")) &&
      STREAM_ERROR_ENVELOPE_RE.test(trimmed)
    ) {
      try {
        const parsed: unknown = JSON.parse(trimmed);
        const projected = isDiscriminatedStreamError(parsed)
          ? { value: sanitizeErrorSubtreeValue(parsed), found: true }
          : projectErrorSubtreesForLog(parsed, seen);
        if (projected.found) {
          const serialized = JSON.stringify(projected.value);
          if (typeof serialized === "string") return { value: serialized, found: true };
        }
      } catch {
        return { value: sanitizeErrorMessage(value) || "[REDACTED]", found: true };
      }
    }
    return { value, found: false };
  }
  if (value === null || value === undefined || typeof value !== "object") {
    return { value, found: false };
  }
  if (isOpaqueBinary(value)) return { value, found: false };
  if (isDiscriminatedStreamError(value)) {
    return { value: sanitizeErrorSubtreeValue(value), found: true };
  }
  const declaresResponsesFailure = isResponsesFailureEvent(value);
  const responsesFailure = forceResponsesFailure || declaresResponsesFailure;
  if (seen.has(value)) return { value: "[circular]", found: false };
  seen.add(value);

  if (Array.isArray(value)) {
    try {
      let found = false;
      const projected = value.map((entry) => {
        const result = projectErrorSubtreesForLog(entry, seen, responsesFailure, false);
        found ||= result.found;
        return result.value;
      });
      return { value: projected, found };
    } finally {
      seen.delete(value);
    }
  }

  try {
    let found = responsesFailure;
    const projected: JsonRecord = {};
    for (const [key, entryValue] of Object.entries(value)) {
      if (isErrorSubtreeKey(key) || (responsesFailure && isResponseFailureMessageKey(key))) {
        projected[key] = sanitizeErrorSubtreeValue(entryValue);
        found = true;
        continue;
      }
      // Responses failures may attach diagnostics under neutral key names. Keep
      // projecting through that envelope, while preserving partial model output
      // as content rather than treating it as an error message.
      const normalizedKey = key.replace(/[-_]/g, "").toLowerCase();
      const preservePartialOutput =
        responsesFailure &&
        normalizedKey === "output" &&
        (protocolResponseObject || declaresResponsesFailure);
      if (preservePartialOutput) {
        projected[key] = projectResponsesFailureOutput(
          entryValue,
          (_field, stringValue) => sanitizeErrorMessage(stringValue) || "[REDACTED]"
        );
        found = true;
        continue;
      }
      const childIsProtocolResponse =
        normalizedKey === "response" &&
        (declaresResponsesFailure || (forceResponsesFailure && !protocolResponseObject));
      const result = projectErrorSubtreesForLog(
        entryValue,
        seen,
        responsesFailure,
        childIsProtocolResponse
      );
      projected[key] = result.value;
      found ||= result.found;
    }
    return { value: projected, found };
  } catch {
    return { value: "[REDACTED]", found: false };
  } finally {
    seen.delete(value);
  }
}

const STREAM_ERROR_DISCRIMINATOR_KEYS = ["type", "event", "kind", "status"] as const;
const STREAM_ERROR_DISCRIMINATORS = new Set(["error", "warning"]);
const RESPONSES_FAILURE_DISCRIMINATORS = new Set(["response.failed"]);
const RESPONSE_FAILURE_MESSAGE_KEYS = new Set(["message", "detail", "details", "description"]);
const STREAM_ERROR_ENVELOPE_RE =
  /["'](?:error|errors|warning|warnings|last_error|lastError|errorMessage|warningMessage)["']\s*:|["'](?:type|event|kind)["']\s*:\s*["'](?:error|warning|response\.(?:failed|completed))["']|["']status["']\s*:\s*["']failed["']/i;

function isResponseFailureMessageKey(key: string): boolean {
  return RESPONSE_FAILURE_MESSAGE_KEYS.has(key.replace(/[-_]/g, "").toLowerCase());
}

function isResponsesFailureEvent(value: unknown): boolean {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  try {
    const record = value as JsonRecord;
    const directFailure = STREAM_ERROR_DISCRIMINATOR_KEYS.some((key) => {
      const discriminator = record[key];
      return (
        typeof discriminator === "string" &&
        RESPONSES_FAILURE_DISCRIMINATORS.has(discriminator.trim().toLowerCase())
      );
    });
    if (directFailure) return true;

    const status = record.status;
    if (typeof status === "string" && status.trim().toLowerCase() === "failed") return true;

    const nestedResponse = record.response;
    if (!nestedResponse || typeof nestedResponse !== "object" || Array.isArray(nestedResponse)) {
      return false;
    }
    const nestedStatus = (nestedResponse as JsonRecord).status;
    return typeof nestedStatus === "string" && nestedStatus.trim().toLowerCase() === "failed";
  } catch {
    return true;
  }
}

function isDiscriminatedStreamError(value: unknown): boolean {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  try {
    const record = value as JsonRecord;
    return STREAM_ERROR_DISCRIMINATOR_KEYS.some((key) => {
      const discriminator = record[key];
      return (
        typeof discriminator === "string" &&
        STREAM_ERROR_DISCRIMINATORS.has(discriminator.trim().toLowerCase())
      );
    });
  } catch {
    return true;
  }
}

function sanitizeStreamErrorPayload(
  rawPayload: string,
  forceError: boolean,
  forceResponsesFailure = false
): { found: boolean; value: string } {
  try {
    const parsed: unknown = JSON.parse(rawPayload);
    if (forceError || isDiscriminatedStreamError(parsed)) {
      const projected = sanitizeErrorSubtreeValue(parsed);
      const serialized = JSON.stringify(projected);
      return {
        found: true,
        value: typeof serialized === "string" ? serialized : "[REDACTED]",
      };
    }

    const projected = projectErrorSubtreesForLog(
      parsed,
      new WeakSet<object>(),
      forceResponsesFailure
    );
    if (!projected.found) return { found: false, value: rawPayload };
    return { found: true, value: JSON.stringify(projected.value) };
  } catch {
    if (!forceError && !forceResponsesFailure && !STREAM_ERROR_ENVELOPE_RE.test(rawPayload)) {
      return { found: false, value: rawPayload };
    }
    return {
      found: true,
      value: sanitizeErrorMessage(rawPayload) || "[REDACTED]",
    };
  }
}

/**
 * Sanitize error/warning records captured as fragmented SSE or NDJSON text.
 * Prefixes are matched at the start of a line so unrelated `metadata:` fields
 * cannot be mistaken for SSE `data:` frames.
 */
export function sanitizeErrorFramesFromLogChunks(chunks: string[]): string[] {
  const combined = chunks.map((chunk) => chunk.replace(STREAM_CHUNK_TIMESTAMP_RE, "")).join("");
  let found = false;
  let errorEventActive = false;
  let responsesFailureEventActive = false;
  const projectedLines = combined.split("\n").map((line) => {
    if (line.trim().length === 0) {
      errorEventActive = false;
      responsesFailureEventActive = false;
      return line;
    }

    const eventMatch = line.match(/^\s*event:\s*([^\s]+)\s*$/i);
    if (eventMatch) {
      const eventName = eventMatch[1].toLowerCase();
      errorEventActive = STREAM_ERROR_DISCRIMINATORS.has(eventName);
      responsesFailureEventActive = RESPONSES_FAILURE_DISCRIMINATORS.has(eventName);
      return line;
    }

    const dataMatch = line.match(/^(\s*data:)([ \t]?)(.*)$/);
    if (dataMatch) {
      const rawPayload = dataMatch[3].trim();
      if (!rawPayload || rawPayload === "[DONE]") return line;
      const projected = sanitizeStreamErrorPayload(
        rawPayload,
        errorEventActive,
        responsesFailureEventActive
      );
      if (!projected.found) return line;
      found = true;
      return `${dataMatch[1]}${dataMatch[2]}${projected.value}`;
    }

    if (errorEventActive || responsesFailureEventActive) {
      found = true;
      return sanitizeErrorMessage(line) || "[REDACTED]";
    }

    const trimmed = line.trim();
    if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return line;
    const projected = sanitizeStreamErrorPayload(trimmed, false);
    if (!projected.found) return line;
    found = true;
    return `${line.slice(0, line.length - line.trimStart().length)}${projected.value}`;
  });

  return found ? [projectedLines.join("\n")] : chunks;
}

/**
 * True for any binary/opaque byte view (Uint8Array, Buffer, DataView, other
 * typed arrays). `Array.isArray()` returns false for these, so callers that
 * branch on it before recursing would otherwise fall into the generic-object
 * branch and enumerate one JS property key per decoded byte (#7297).
 */
function isOpaqueBinary(value: unknown): value is ArrayBufferView {
  return ArrayBuffer.isView(value);
}

function describeOpaqueBinary(value: ArrayBufferView): string {
  const byteLength = value.byteLength;
  return `[binary ${byteLength} bytes]`;
}

export function cloneLogPayload<T>(value: T): T {
  if (value === null || value === undefined) return value;
  if (typeof globalThis.structuredClone === "function") {
    return globalThis.structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
}

export function normalizePayloadForLog(payload: unknown): unknown {
  if (typeof payload !== "string") return payload;

  const trimmed = payload.trim();
  if (!trimmed) return "";

  try {
    return JSON.parse(trimmed);
  } catch {
    return { _rawText: payload };
  }
}

/**
 * Remove opaque encrypted reasoning from log copies. The value is replayable by clients but
 * provides no useful diagnostics, so retaining its size is sufficient for observability.
 */
export function omitEncryptedReasoningForLog(payload: unknown): unknown {
  if (!payload || typeof payload !== "object") return payload;
  if (isOpaqueBinary(payload)) return describeOpaqueBinary(payload);
  if (Array.isArray(payload)) return payload.map(omitEncryptedReasoningForLog);

  const omitted: JsonRecord = {};
  for (const [key, value] of Object.entries(payload)) {
    if (key === ENCRYPTED_REASONING_KEY && typeof value === "string" && value.length > 0) {
      omitted[key] = encryptedReasoningOmissionMarker(value.length);
    } else if (typeof value === "object" && value !== null) {
      omitted[key] = omitEncryptedReasoningForLog(value);
    } else {
      omitted[key] = value;
    }
  }
  return omitted;
}

export function redactPayload(payload: unknown): unknown {
  if (!payload || typeof payload !== "object") return payload;
  if (isOpaqueBinary(payload)) return describeOpaqueBinary(payload);
  if (Array.isArray(payload)) return payload.map(redactPayload);

  const redacted: JsonRecord = {};
  for (const [key, value] of Object.entries(payload)) {
    if (isSensitivePayloadKey(key)) {
      redacted[key] = "[REDACTED]";
    } else if (typeof value === "string" && value.startsWith("Bearer ")) {
      redacted[key] = "Bearer [REDACTED]";
    } else if (typeof value === "object" && value !== null) {
      redacted[key] = redactPayload(value);
    } else {
      redacted[key] = value;
    }
  }
  return redacted;
}

export function sanitizePayloadPII(payload: unknown): unknown {
  if (typeof payload === "string") {
    return sanitizePII(payload).text;
  }
  if (!payload || typeof payload !== "object") {
    return payload;
  }
  if (isOpaqueBinary(payload)) {
    return describeOpaqueBinary(payload);
  }
  if (Array.isArray(payload)) {
    return payload.map(sanitizePayloadPII);
  }

  const sanitized: JsonRecord = {};
  for (const [key, value] of Object.entries(payload)) {
    sanitized[key] = sanitizePayloadPII(value);
  }
  return sanitized;
}

export function protectPayloadForLog(payload: unknown): unknown {
  if (payload === null || payload === undefined) return null;
  const normalized = normalizePayloadForLog(payload);
  const errorProjected = projectErrorSubtreesForLog(normalized).value;
  const reasoningOmitted = omitEncryptedReasoningForLog(errorProjected);
  const piiSanitized = sanitizePayloadPII(reasoningOmitted);
  return redactPayload(piiSanitized);
}

/** Project every string leaf because the payload is known to represent a failed response. */
export function protectErrorPayloadForLog(payload: unknown): unknown {
  if (payload === null || payload === undefined) return null;
  const normalized = normalizePayloadForLog(payload);
  if (isOpaqueBinary(normalized)) return describeOpaqueBinary(normalized);
  const errorProjected = sanitizeErrorSubtreeValue(normalized);
  const reasoningOmitted = omitEncryptedReasoningForLog(errorProjected);
  const piiSanitized = sanitizePayloadPII(reasoningOmitted);
  return redactPayload(piiSanitized);
}

export function serializePayloadForStorage(payload: unknown, maxLength = 65536): string | null {
  if (payload === null || payload === undefined) return null;

  const exact = JSON.stringify(payload);
  if (exact.length <= maxLength) {
    return exact;
  }

  return JSON.stringify({
    _truncated: true,
    _originalSize: exact.length,
    _preview: exact.slice(0, maxLength),
  });
}

export function parseStoredPayload(value: unknown): unknown | null {
  if (typeof value !== "string" || value.trim().length === 0) return null;
  try {
    return JSON.parse(value);
  } catch {
    return { _rawText: value };
  }
}
