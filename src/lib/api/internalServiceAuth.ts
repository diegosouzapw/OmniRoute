import { readFileSync } from "node:fs";
import { timingSafeEqual } from "node:crypto";
import { AUTHZ_HEADER_PEER_LOCALITY } from "@/server/authz/headers";

export const INTERNAL_SERVICE_AUTH_HEADER = "x-omniroute-internal-service-token";

function configuredToken(): string {
  const inlineToken = process.env.OMNIROUTE_INTERNAL_SERVICE_TOKEN?.trim();
  if (inlineToken) return inlineToken;

  const tokenFile = process.env.OMNIROUTE_INTERNAL_SERVICE_TOKEN_FILE?.trim();
  if (!tokenFile) return "";

  try {
    return readFileSync(tokenFile, "utf8").trim();
  } catch {
    return "";
  }
}

export function getInternalServiceAuthHeaders(): Record<string, string> {
  const token = configuredToken();
  return token ? { [INTERNAL_SERVICE_AUTH_HEADER]: token } : {};
}

export function isInternalServiceRequest(request: Request): boolean {
  const expected = configuredToken();
  const provided = request.headers.get(INTERNAL_SERVICE_AUTH_HEADER)?.trim() || "";
  if (!expected || !provided || expected.length !== provided.length) return false;

  return timingSafeEqual(Buffer.from(provided, "utf8"), Buffer.from(expected, "utf8"));
}

export function isTrustedLoopbackInternalServiceRequest(request?: Request | null): boolean {
  if (!request?.headers) return false;
  return (
    request.headers.get(AUTHZ_HEADER_PEER_LOCALITY) === "loopback" &&
    isInternalServiceRequest(request)
  );
}
