import {
  ANTIGRAVITY_FALLBACK_VERSION,
  getCachedAntigravityVersion,
  resolveAntigravityVersion,
} from "./antigravityVersion.ts";
import { googApiClientHeader } from "./cloudCodeHeaders.ts";

/**
 * Antigravity and Gemini CLI header utilities.
 *
 * Generates User-Agent strings and API client headers that match
 * the real Antigravity and Gemini CLI binaries.
 *
 * Based on CLIProxyAPI's misc/header_utils.go.
 */

type AntigravityHeaderProfile = "loadCodeAssist" | "fetchAvailableModels" | "models";

const ANTIGRAVITY_VERSION = ANTIGRAVITY_FALLBACK_VERSION;
export const ANTIGRAVITY_LOAD_CODE_ASSIST_USER_AGENT = "google-api-nodejs-client/10.3.0";
export const ANTIGRAVITY_LOAD_CODE_ASSIST_API_CLIENT =
  "google-cloud-sdk vscode_cloudshelleditor/0.1";
const LOAD_CODE_ASSIST_METADATA = Object.freeze({
  ideType: "IDE_UNSPECIFIED",
  platform: "PLATFORM_UNSPECIFIED",
  pluginType: "GEMINI",
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
 * Antigravity User-Agent: "antigravity/VERSION darwin/arm64"
 *
 * Always claims darwin/arm64 regardless of actual server OS.
 * Real Antigravity is a macOS desktop tool — most users are on macOS.
 * Claiming linux/amd64 from a datacenter IP is MORE suspicious than
 * darwin/arm64. Matches CLIProxyAPI's proven production behavior.
 */
export function antigravityUserAgent(): string {
  return `antigravity/${getCachedAntigravityVersion()} darwin/arm64`;
}

export async function resolveAntigravityUserAgent(): Promise<string> {
  const version = await resolveAntigravityVersion();
  return `antigravity/${version} darwin/arm64`;
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
          "User-Agent": ANTIGRAVITY_LOAD_CODE_ASSIST_USER_AGENT,
          "X-Goog-Api-Client": ANTIGRAVITY_LOAD_CODE_ASSIST_API_CLIENT,
          "Client-Metadata": getAntigravityLoadCodeAssistClientMetadata(),
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

export { ANTIGRAVITY_VERSION };
export { googApiClientHeader };
