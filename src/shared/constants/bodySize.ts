export const REQUEST_BODY_BYTES_PER_MB = 1024 * 1024;
export const DEFAULT_REQUEST_BODY_LIMIT_MB = 10;
export const MIN_REQUEST_BODY_LIMIT_MB = 1;
export const MAX_REQUEST_BODY_LIMIT_MB = 500;
export const DEFAULT_REQUEST_BODY_LIMIT_BYTES =
  DEFAULT_REQUEST_BODY_LIMIT_MB * REQUEST_BODY_BYTES_PER_MB;

export function normalizeRequestBodyLimitMb(value: unknown): number | null {
  const parsed =
    typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  if (!Number.isFinite(parsed)) return null;

  const normalized = Math.floor(parsed);
  if (normalized < MIN_REQUEST_BODY_LIMIT_MB || normalized > MAX_REQUEST_BODY_LIMIT_MB) {
    return null;
  }

  return normalized;
}

export function requestBodyLimitMbToBytes(value: number): number {
  return value * REQUEST_BODY_BYTES_PER_MB;
}

export function parseRequestBodyLimitBytes(value: string | undefined): number {
  if (!value) return DEFAULT_REQUEST_BODY_LIMIT_BYTES;

  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_REQUEST_BODY_LIMIT_BYTES;
}

export function requestBodyLimitBytesToMb(value: number): number {
  const configuredMb = Math.round(value / REQUEST_BODY_BYTES_PER_MB);
  return Math.min(MAX_REQUEST_BODY_LIMIT_MB, Math.max(MIN_REQUEST_BODY_LIMIT_MB, configuredMb));
}

export function requestBodyLimitMbFromEnv(value: string | undefined): number {
  return requestBodyLimitBytesToMb(parseRequestBodyLimitBytes(value));
}
