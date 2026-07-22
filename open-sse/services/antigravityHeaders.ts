import {
  ANTIGRAVITY_FALLBACK_VERSION,
  getCachedAntigravityVersion,
  resolveAntigravityVersion,
} from "./antigravityVersion.ts";

/**
 * Antigravity header utilities.
 *
 * Generates User-Agent strings and API client headers that match
 * the real Antigravity client flows.
 *
 * Based on CLIProxyAPI's misc/header_utils.go.
 */

type AntigravityHeaderProfile = "loadCodeAssist" | "fetchAvailableModels" | "models";

const ANTIGRAVITY_VERSION = ANTIGRAVITY_FALLBACK_VERSION;
export const ANTIGRAVITY_LOAD_CODE_ASSIST_USER_AGENT = `vscode/1.X.X (Antigravity/${ANTIGRAVITY_FALLBACK_VERSION})`;
export const ANTIGRAVITY_LOAD_CODE_ASSIST_API_CLIENT = "";
export const ANTIGRAVITY_NODE_API_CLIENT = "google-api-nodejs-client/10.3.0";
// Harness/bootstrap X-Goog-Api-Client synced with CLIProxyAPI misc.AntigravityGoogAPIClientUA.
export const ANTIGRAVITY_CREDIT_PROBE_API_CLIENT = "gl-node/22.21.1";
export const ANTIGRAVITY_API_CLIENT = ANTIGRAVITY_CREDIT_PROBE_API_CLIENT;

function withOptionalBearerAuth(
  headers: Record<string, string>,
  accessToken?: string | null
): Record<string, string> {
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return headers;
}

/**
 * OS/arch token in the Antigravity IDE User-Agent. The real desktop client the
 * upstream expects is the Mac build, so we default to `darwin/arm64` (matching the
 * known-good native client) regardless of the host OmniRoute happens to run on.
 */
function getAntigravityPlatformInfo(platform: NodeJS.Platform = "darwin"): string {
  switch (platform) {
    case "win32":
      return "win32/x64";
    case "linux":
      return "linux/x64";
    case "darwin":
    default:
      return "darwin/arm64";
  }
}

/**
 * Antigravity IDE User-Agent, byte-shaped like the real native client:
 * "antigravity/ide/VERSION darwin/arm64". VERSION is the live-resolved Antigravity
 * release (falls back to the known-stable floor); no synthetic Chrome/Electron suffix.
 */
export function antigravityUserAgent(
  version = getCachedAntigravityVersion(),
  platform: NodeJS.Platform = "darwin"
): string {
  return `antigravity/ide/${version} ${getAntigravityPlatformInfo(platform)}`;
}

export async function resolveAntigravityUserAgent(
  platform: NodeJS.Platform = "darwin"
): Promise<string> {
  const version = await resolveAntigravityVersion();
  return antigravityUserAgent(version, platform);
}

export function antigravityNativeOAuthUserAgent(): string {
  return `vscode/1.X.X (Antigravity/${getCachedAntigravityVersion()})`;
}

/** Matches Antigravity-Manager quota.rs: only ideType (no platform — LINUX is rejected). */
export function getAntigravityLoadCodeAssistMetadata(): Record<string, string> {
  return {
    ideType: "ANTIGRAVITY",
  };
}

export function getAntigravityLoadCodeAssistClientMetadata(): string {
  return JSON.stringify(getAntigravityLoadCodeAssistMetadata());
}

export function getAntigravityHeaders(
  profile: AntigravityHeaderProfile,
  accessToken?: string | null
): Record<string, string> {
  switch (profile) {
    case "loadCodeAssist":
      return withOptionalBearerAuth(
        {
          "Content-Type": "application/json",
          "User-Agent": antigravityNativeOAuthUserAgent(),
        },
        accessToken
      );
    case "fetchAvailableModels":
    case "models":
      return withOptionalBearerAuth(
        {
          "Content-Type": "application/json",
          "User-Agent": antigravityUserAgent(),
        },
        accessToken
      );
    default:
      return withOptionalBearerAuth({ "Content-Type": "application/json" }, accessToken);
  }
}

/** X-Goog-Api-Client used by Antigravity's credit probe path. */
export function getAntigravityCreditProbeApiClientHeader(): string {
  return ANTIGRAVITY_CREDIT_PROBE_API_CLIENT;
}

/** X-Goog-Api-Client used by harness/native Node Antigravity paths. */
export function getAntigravityApiClientHeader(): string {
  return ANTIGRAVITY_API_CLIENT;
}

export { ANTIGRAVITY_VERSION };
