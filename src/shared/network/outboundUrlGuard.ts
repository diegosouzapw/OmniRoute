import { isIP } from "node:net";
import { resolveFeatureFlag } from "@/shared/utils/featureFlags";

const TRUE_ENV_VALUES = new Set(["1", "true", "yes", "on"]);

export const PROVIDER_URL_BLOCKED_MESSAGE = "Blocked private or local provider URL";
export const PRIVATE_PROVIDER_URLS_ENV = "OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS";

export type OutboundUrlGuardMode = "none" | "public-only";
export type OutboundUrlGuardErrorCode = "OUTBOUND_URL_GUARD_BLOCKED" | "OUTBOUND_URL_INVALID";

type OutboundUrlGuardErrorInit = {
  code: OutboundUrlGuardErrorCode;
  url: string;
  hostname?: string | null;
};

export class OutboundUrlGuardError extends Error {
  code: OutboundUrlGuardErrorCode;
  url: string;
  hostname?: string | null;

  constructor(message: string, init: OutboundUrlGuardErrorInit) {
    super(message);
    this.name = "OutboundUrlGuardError";
    this.code = init.code;
    this.url = init.url;
    this.hostname = init.hostname ?? null;
  }
}

function normalizeHost(hostname: string) {
  const normalized = hostname.trim().toLowerCase();
  if (normalized.startsWith("[") && normalized.endsWith("]")) {
    return normalized.slice(1, -1);
  }
  return normalized;
}

export function isPrivateHost(hostname: string) {
  const normalized = normalizeHost(hostname);
  if (!normalized) return true;

  if (
    normalized === "localhost" ||
    normalized === "0.0.0.0" ||
    normalized === "127.0.0.1" ||
    normalized === "::1" ||
    normalized.endsWith(".localhost") ||
    normalized.endsWith(".local") ||
    // `.internal` is reserved for private use (ICANN-style) and is the
    // hostname suffix used by GCP/Azure metadata probes
    // (e.g. `metadata.google.internal`).
    normalized.endsWith(".internal") ||
    normalized.startsWith("::ffff:")
  ) {
    return true;
  }

  if (isIP(normalized) === 4) {
    const octets = normalized.split(".").map((segment) => parseInt(segment, 10));
    const [a, b] = octets;

    if (a === 0 || a === 10 || a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 100 && b >= 64 && b <= 127) return true;
    return false;
  }

  if (isIP(normalized) === 6) {
    return (
      normalized === "::1" ||
      normalized.startsWith("fc") ||
      normalized.startsWith("fd") ||
      normalized.startsWith("fe80:")
    );
  }

  return false;
}

const CLOUD_METADATA_HOSTNAMES = new Set([
  "169.254.169.254", // AWS / GCP / Azure / Oracle IMDS
  "metadata.google.internal", // GCP
  "metadata.goog", // GCP
  "100.100.100.200", // Alibaba Cloud
  "fd00:ec2::254", // AWS IPv6 IMDS
]);

/**
 * Cloud-metadata and IPv4 link-local (169.254.0.0/16) endpoints are the classic
 * SSRF→IAM-credential pivot and have no legitimate webhook/automation use case. They are
 * blocked UNCONDITIONALLY — even when private targets are explicitly opted in. (#3269)
 */
export function isCloudMetadataHost(hostname: string): boolean {
  const host = normalizeHost(hostname);
  if (!host) return false;
  if (CLOUD_METADATA_HOSTNAMES.has(host)) return true;
  if (host.startsWith("169.254.")) return true; // IPv4 link-local /16
  return false;
}

export function parseOutboundUrl(input: string | URL) {
  let url: URL;
  try {
    url = input instanceof URL ? input : new URL(String(input));
  } catch {
    throw new OutboundUrlGuardError(`Invalid outbound URL: ${String(input)}`, {
      code: "OUTBOUND_URL_INVALID",
      url: String(input),
    });
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new OutboundUrlGuardError(`Invalid outbound URL protocol for ${url.toString()}`, {
      code: "OUTBOUND_URL_INVALID",
      url: url.toString(),
      hostname: url.hostname || null,
    });
  }

  if (url.username || url.password) {
    throw new OutboundUrlGuardError("Blocked outbound URL with embedded credentials", {
      code: "OUTBOUND_URL_GUARD_BLOCKED",
      url: url.toString(),
      hostname: url.hostname || null,
    });
  }

  return url;
}

export function parseAndValidatePublicUrl(input: string | URL) {
  const url = parseOutboundUrl(input);

  if (isPrivateHost(url.hostname)) {
    throw new OutboundUrlGuardError(PROVIDER_URL_BLOCKED_MESSAGE, {
      code: "OUTBOUND_URL_GUARD_BLOCKED",
      url: url.toString(),
      hostname: url.hostname || null,
    });
  }

  return url;
}

/**
 * Webhook variant of {@link parseAndValidatePublicUrl}. Webhooks legitimately point at
 * internal services (n8n, Home Assistant, a LAN box) in Docker/self-hosted deployments,
 * so the private-host block is gated behind the same explicit opt-in used for private
 * provider URLs (`OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`, default OFF). Protocol and
 * embedded-credential checks in {@link parseOutboundUrl} remain unconditional. (#3269)
 */
export function parseAndValidateWebhookUrl(input: string | URL) {
  const url = parseOutboundUrl(input);

  // Cloud-metadata / link-local endpoints are NEVER a valid webhook target — block them
  // even when the private opt-in is enabled (SSRF→IAM-credential pivot). (#3269)
  if (isCloudMetadataHost(url.hostname)) {
    throw new OutboundUrlGuardError(PROVIDER_URL_BLOCKED_MESSAGE, {
      code: "OUTBOUND_URL_GUARD_BLOCKED",
      url: url.toString(),
      hostname: url.hostname || null,
    });
  }

  if (!arePrivateProviderUrlsAllowed() && isPrivateHost(url.hostname)) {
    throw new OutboundUrlGuardError(PROVIDER_URL_BLOCKED_MESSAGE, {
      code: "OUTBOUND_URL_GUARD_BLOCKED",
      url: url.toString(),
      hostname: url.hostname || null,
    });
  }

  return url;
}

function isTrueValue(raw: unknown): boolean {
  if (typeof raw !== "string") return false;
  return TRUE_ENV_VALUES.has(raw.trim().toLowerCase());
}

export function arePrivateProviderUrlsAllowed() {
  // 1) DB override takes precedence — it represents an explicit user toggle in
  //    the dashboard ("Allow Private Provider URLs"). This is critical for the
  //    Electron build (#2575) where the server is spawned with the env value
  //    captured at boot, so subsequent UI toggles only land in the DB and the
  //    env-first ordering would otherwise mask them.
  try {
    const dbValue = resolveFeatureFlag(PRIVATE_PROVIDER_URLS_ENV);
    if (isTrueValue(dbValue)) return true;
  } catch {
    // DB not initialized yet — fall through to env-only check.
  }

  // 2) Explicit env opt-in (for headless/Docker users who set it before boot).
  if (isTrueValue(process.env[PRIVATE_PROVIDER_URLS_ENV])) return true;

  // 3) Legacy escape hatch — disabling the outbound guard implies allowing
  //    private URLs.
  const legacyValue = process.env["OUTBOUND_SSRF_GUARD_ENABLED"];
  if (
    typeof legacyValue === "string" &&
    ["false", "0", "no", "off"].includes(legacyValue.trim().toLowerCase())
  ) {
    return true;
  }

  return false;
}

export function getProviderOutboundGuard(): OutboundUrlGuardMode {
  return arePrivateProviderUrlsAllowed() ? "none" : "public-only";
}
