import { resolveFeatureFlag } from "@/shared/utils/featureFlags";
import {
  OutboundUrlGuardError,
  PROVIDER_URL_BLOCKED_MESSAGE,
  isCloudMetadataHost,
  isPrivateHost,
  parseOutboundUrl,
  type OutboundUrlGuardMode,
} from "./outboundUrlGuard";

// #7682: this module is the DB/feature-flag-backed half of the outbound URL guard, split out
// of `./outboundUrlGuard.ts` so the CLI (`omniroute setup-opencode`, loaded via tsx with no
// tsconfig.json in a global npm install) never has to resolve the `@/` alias. Only Next.js /
// webpack-bundled server code (never the CLI) should import from here.

const TRUE_ENV_VALUES = new Set(["1", "true", "yes", "on"]);

export const PRIVATE_PROVIDER_URLS_ENV = "OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS";
// #5066: scoped to provider validation/use. Allows local/private provider endpoints
// (127.0.0.1, localhost, LAN) so local-first OpenAI-compatible providers validate, while
// cloud-metadata endpoints stay blocked. Defaults ON (OmniRoute is local-first); operators
// who only use public providers can disable it to restore strict SSRF blocking.
export const LOCAL_PROVIDER_URLS_ENV = "OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS";

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

/**
 * #5066: whether provider endpoints on local/private addresses are permitted. Defaults ON
 * (OmniRoute is local-first — local OpenAI-compatible providers should validate out of the
 * box). Disable via the `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS` flag (DB toggle or env) to
 * restore strict public-only SSRF blocking. Cloud-metadata stays blocked regardless.
 */
export function areLocalProviderUrlsAllowed(): boolean {
  try {
    const dbValue = resolveFeatureFlag(LOCAL_PROVIDER_URLS_ENV);
    if (dbValue !== undefined && dbValue !== "") return isTrueValue(dbValue);
  } catch {
    // DB not initialized yet — fall through to env / default.
  }
  const envValue = process.env[LOCAL_PROVIDER_URLS_ENV];
  if (typeof envValue === "string" && envValue !== "") return isTrueValue(envValue);
  // Default ON.
  return true;
}

/**
 * Guard mode for the provider VALIDATION/use path (not webhooks or remote images). Precedence:
 *  1. explicit full opt-in (`arePrivateProviderUrlsAllowed`) → "none" (no checks; power users).
 *  2. local-first default (`areLocalProviderUrlsAllowed`) → "block-metadata" (allow LAN, block IMDS).
 *  3. otherwise → "public-only" (strict).
 */
export function getProviderValidationGuard(): OutboundUrlGuardMode {
  if (arePrivateProviderUrlsAllowed()) return "none";
  if (areLocalProviderUrlsAllowed()) return "block-metadata";
  return "public-only";
}

/**
 * Webhook variant of `parseAndValidatePublicUrl`. Webhooks legitimately point at
 * internal services (n8n, Home Assistant, a LAN box) in Docker/self-hosted deployments,
 * so the private-host block is gated behind the same explicit opt-in used for private
 * provider URLs (`OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`, default OFF). Protocol and
 * embedded-credential checks in `parseOutboundUrl` remain unconditional. (#3269)
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
