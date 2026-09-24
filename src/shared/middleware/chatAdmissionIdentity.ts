import { createHmac, randomBytes } from "crypto";
import { timingSafeCompare } from "@/shared/utils/timingSafeCompare";

const ADMISSION_BYPASS_VALUE = "internal";
const FINGERPRINT_KEY = "omniroute-admission-fingerprint-v1";

export const ADMISSION_BYPASS_HEADER = "x-omniroute-admission-bypass";

export function resolveSessionId(request: Request): string {
  const authHeader = request.headers.get("authorization") || "";
  const bearerMatch = /^bearer\s+(\S+)$/i.exec(authHeader.trim());
  if (bearerMatch) return fingerprint(bearerMatch[1]);

  const xApiKey = request.headers.get("x-api-key")?.trim();
  if (xApiKey) return fingerprint(xApiKey);

  const xGoogApiKey = request.headers.get("x-goog-api-key")?.trim();
  return xGoogApiKey ? fingerprint(xGoogApiKey) : "anonymous";
}

// Lazily generated, held in memory only for the lifetime of this process — never
// persisted, never logged. Used ONLY as the last-resort self-loop bearer when the
// operator hasn't set OMNIROUTE_API_KEY/ROUTER_API_KEY (#13679: the previous fallback
// was the checked-in literal "sk_omniroute", a predictable shared secret anyone reading
// the source could forge). Both the in-process caller (audioBridgeHelpers /
// visionBridgeHelpers) and the verifier (isInternalAdmissionBypass) call this same
// function, so they always agree on the value within one process.
let generatedSelfLoopSecret: string | null = null;

function getGeneratedSelfLoopSecret(): string {
  if (!generatedSelfLoopSecret) {
    generatedSelfLoopSecret = randomBytes(32).toString("hex");
  }
  return generatedSelfLoopSecret;
}

export function resolveSelfLoopBearer(): string {
  return (
    process.env.OMNIROUTE_API_KEY?.trim() ||
    process.env.ROUTER_API_KEY?.trim() ||
    getGeneratedSelfLoopSecret()
  );
}

export function isInternalAdmissionBypass(request: Request): boolean {
  const bypass =
    request.headers.get(ADMISSION_BYPASS_HEADER)?.trim().toLowerCase() === ADMISSION_BYPASS_VALUE;
  if (!bypass) return false;

  const auth = request.headers.get("authorization") || "";
  const match = /^bearer\s+(\S+)$/i.exec(auth.trim());
  if (!match) return false;
  // This gates an admission-lane bypass on a shared secret, so the compare is
  // constant-time — `===` leaks matching-prefix length (GHSA-7434 class).
  return timingSafeCompare(match[1].trim().toLowerCase(), resolveSelfLoopBearer().toLowerCase());
}

function fingerprint(value: string): string {
  // Deterministic admission-lane fingerprint, never password verification.
  return `key_${createHmac("sha256", FINGERPRINT_KEY).update(value).digest("hex").slice(0, 16)}`;
}
