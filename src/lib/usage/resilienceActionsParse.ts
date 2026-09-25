/**
 * Fail-soft parser for the compact `call_logs.resilience_actions` JSON (migration 191).
 * Kept out of callLogs.ts so the call-log module stays under the file-size cap.
 */
const RESILIENCE_ACTION_KEYS = new Set([
  "rotations",
  "park_ms",
  "parked",
  "replayed",
  "stored_429",
  "empty_retries",
  "continued",
  "buffered",
  "resumed",
  "dropped_notes",
]);

function isValidBufferedValue(value: unknown): value is "retry" | "pass" {
  return value === "retry" || value === "pass";
}

function cleanNumericValue(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) return null;
  return Math.floor(value);
}

function parseResiliencePayload(raw: unknown): Record<string, unknown> | null {
  if (typeof raw !== "string" || raw.length === 0) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return null;
  return parsed as Record<string, unknown>;
}

function cleanResilienceRecord(record: Record<string, unknown>): Record<string, unknown> | null {
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    if (!RESILIENCE_ACTION_KEYS.has(key)) continue;
    if (key === "buffered") {
      if (isValidBufferedValue(value)) cleaned[key] = value;
      continue;
    }
    const numeric = cleanNumericValue(value);
    if (numeric !== null) {
      cleaned[key] = numeric;
      continue;
    }
    if (typeof value === "boolean") {
      cleaned[key] = value;
    }
  }
  return Object.keys(cleaned).length > 0 ? cleaned : null;
}

/**
 * Parse the compact resilience-actions JSON (fail-soft: corrupt or unknown
 * input yields null, never throws into the read path).
 */
export function parseResilienceActions(raw: unknown): Record<string, unknown> | null {
  const record = parseResiliencePayload(raw);
  if (record === null) return null;
  return cleanResilienceRecord(record);
}
