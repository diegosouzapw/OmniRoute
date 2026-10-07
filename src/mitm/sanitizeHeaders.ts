import type { IncomingHttpHeaders } from "node:http";
import { isForbiddenUpstreamHeaderName } from "../shared/constants/upstreamHeaders.ts";
import { maskSecret } from "./maskSecrets.ts";

const MASKED_CREDENTIAL_HEADERS = new Set([
  "authorization",
  "api-key",
  "x-api-key",
  "x-auth-token",
  "x-goog-api-key",
]);
const FULLY_REDACTED_HEADERS = new Set(["cookie", "set-cookie"]);

function sanitizeCredentialValue(value: string): string {
  const masked = maskSecret(value);
  return masked === value ? "[REDACTED]" : masked;
}

export function sanitizeHeaders(
  headers: IncomingHttpHeaders | Record<string, string | string[] | undefined>
): Record<string, string> {
  const sanitized: Record<string, string> = {};
  for (const [rawName, rawValue] of Object.entries(headers)) {
    const name = rawName.trim().toLowerCase();
    if (!name) continue;
    if (isForbiddenUpstreamHeaderName(name)) continue;
    if (FULLY_REDACTED_HEADERS.has(name)) {
      sanitized[name] = "[REDACTED]";
      continue;
    }
    if (rawValue === undefined) continue;

    const value = Array.isArray(rawValue) ? rawValue.join(", ") : rawValue;
    sanitized[name] = MASKED_CREDENTIAL_HEADERS.has(name) ? sanitizeCredentialValue(value) : value;
  }
  return sanitized;
}
