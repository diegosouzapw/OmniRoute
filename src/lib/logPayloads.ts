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
]);

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
    if (SENSITIVE_KEYS.has(key)) {
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
  const reasoningOmitted = omitEncryptedReasoningForLog(normalized);
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
