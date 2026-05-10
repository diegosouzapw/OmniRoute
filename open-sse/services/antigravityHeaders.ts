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
export const ANTIGRAVITY_CHROME_VERSION = "132.0.6834.160";
export const ANTIGRAVITY_ELECTRON_VERSION = "39.2.3";
export const ANTIGRAVITY_LOAD_CODE_ASSIST_USER_AGENT = `vscode/1.X.X (Antigravity/${ANTIGRAVITY_FALLBACK_VERSION})`;
export const ANTIGRAVITY_LOAD_CODE_ASSIST_API_CLIENT = "";
export const ANTIGRAVITY_CREDIT_PROBE_API_CLIENT = "google-genai-sdk/1.30.0 gl-node/v22.21.1";
const LOAD_CODE_ASSIST_METADATA = Object.freeze({
  ideType: "ANTIGRAVITY",
});

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
 * Antigravity desktop User-Agent:
 * "Antigravity/VERSION (Macintosh; Intel Mac OS X 10_15_7) Chrome/132... Electron/39..."
 */
export function antigravityUserAgent(): string {
  return `Antigravity/${getCachedAntigravityVersion()} (Macintosh; Intel Mac OS X 10_15_7) Chrome/${ANTIGRAVITY_CHROME_VERSION} Electron/${ANTIGRAVITY_ELECTRON_VERSION}`;
}

export async function resolveAntigravityUserAgent(): Promise<string> {
  const version = await resolveAntigravityVersion();
  return `Antigravity/${version} (Macintosh; Intel Mac OS X 10_15_7) Chrome/${ANTIGRAVITY_CHROME_VERSION} Electron/${ANTIGRAVITY_ELECTRON_VERSION}`;
}

export function antigravityNativeOAuthUserAgent(): string {
  return `vscode/1.X.X (Antigravity/${getCachedAntigravityVersion()})`;
}

export function getAntigravityLoadCodeAssistMetadata(): Record<string, string> {
  return { ...LOAD_CODE_ASSIST_METADATA };
}

export function getAntigravityLoadCodeAssistClientMetadata(): string {
  return JSON.stringify(LOAD_CODE_ASSIST_METADATA);
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

export { ANTIGRAVITY_VERSION };
