import { sanitizePII } from "./piiSanitizer";

const SENSITIVE_KEYS = new Set([
  "api_key",
  "apiKey",
  "api-key",
  "authorization",
  "Authorization",
  "x-api-key",
  "X-Api-Key",
  "access_token",
  "accessToken",
  "refresh_token",
  "refreshToken",
  "password",
  "secret",
  "token",
]);

type JsonRecord = Record<string, unknown>;

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

export function redactPayload(payload: unknown): unknown {
  if (!payload || typeof payload !== "object") return payload;
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
  if (Array.isArray(payload)) {
    return payload.map(sanitizePayloadPII);
  }
  if (!payload || typeof payload !== "object") {
    return payload;
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
  const piiSanitized = sanitizePayloadPII(normalized);
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
