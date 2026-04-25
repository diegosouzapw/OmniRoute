import {
  ANTIGRAVITY_FALLBACK_VERSION,
  getCachedAntigravityVersion,
  resolveAntigravityVersion,
} from "./antigravityVersion.ts";

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
const GEMINI_CLI_VERSION = "0.31.0";
const GEMINI_SDK_VERSION = "1.41.0";
const NODE_VERSION = "v22.19.0";
const LOAD_CODE_ASSIST_USER_AGENT = "google-api-nodejs-client/9.15.1";
const LOAD_CODE_ASSIST_API_CLIENT = "google-cloud-sdk vscode_cloudshelleditor/0.1";
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

function getPlatform(): string {
  const p = typeof process !== "undefined" ? process.platform : "unknown";
  switch (p) {
    case "win32":
      return "windows";
    default:
      return p; // "linux", etc.
  }
}

function getArch(): string {
  const a = typeof process !== "undefined" ? process.arch : "unknown";
  switch (a) {
    case "x64":
      return "x64";
    case "ia32":
      return "x86";
    case "arm64":
      return "arm64";
    default:
      return a;
  }
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
          "User-Agent": LOAD_CODE_ASSIST_USER_AGENT,
          "X-Goog-Api-Client": LOAD_CODE_ASSIST_API_CLIENT,
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

/**
 * Gemini CLI User-Agent: "GeminiCLI/VERSION/MODEL (OS; ARCH)"
 * Example: "GeminiCLI/1.0.0/gemini-3-flash (macos; arm64)"
 */
export function geminiCLIUserAgent(model: string): string {
  return `GeminiCLI/${GEMINI_CLI_VERSION}/${model || "unknown"} (${getPlatform()}; ${getArch()})`;
}

/**
 * X-Goog-Api-Client header value matching the real Gemini SDK.
 * Example: "google-genai-sdk/1.41.0 gl-node/v22.19.0"
 */
export function googApiClientHeader(): string {
  return `google-genai-sdk/${GEMINI_SDK_VERSION} gl-node/${NODE_VERSION}`;
}

export {
  ANTIGRAVITY_VERSION,
  GEMINI_CLI_VERSION,
  GEMINI_SDK_VERSION,
  LOAD_CODE_ASSIST_USER_AGENT as ANTIGRAVITY_LOAD_CODE_ASSIST_USER_AGENT,
  LOAD_CODE_ASSIST_API_CLIENT as ANTIGRAVITY_LOAD_CODE_ASSIST_API_CLIENT,
};
