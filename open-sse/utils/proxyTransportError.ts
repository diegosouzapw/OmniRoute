import { extractTransportCauseCode, TRANSPORT_CODE_RE } from "./proxyFetchRedaction.ts";

export type TransportError = Error & {
  code: string;
  causeCode?: string;
  errorCode?: string;
  statusCode?: number;
};

export function sanitizeTransportError(
  error: unknown,
  message: string,
  fallbackCode: string
): TransportError {
  const source = error && typeof error === "object" ? (error as Record<string, unknown>) : {};
  const sanitized = new Error(message) as TransportError;
  sanitized.code =
    typeof source.code === "string" && TRANSPORT_CODE_RE.test(source.code)
      ? source.code
      : fallbackCode;
  const causeCode = extractTransportCauseCode(error);
  if (causeCode !== undefined) {
    sanitized.causeCode = causeCode;
  }
  if (typeof source.errorCode === "string" && /^[a-zA-Z0-9_:-]{1,64}$/.test(source.errorCode)) {
    sanitized.errorCode = source.errorCode;
  }
  if (typeof source.statusCode === "number" && Number.isFinite(source.statusCode)) {
    sanitized.statusCode = source.statusCode;
  }
  return sanitized;
}
