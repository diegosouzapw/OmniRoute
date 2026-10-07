import type { AntigravityClientProfile } from "@/shared/constants/antigravityClientProfile";
import {
  getCachedAntigravityCliVersion,
  getCachedAntigravityIdeVersion,
} from "./antigravityVersion.ts";

// loadCodeAssist/onboardUser's `metadata` body is a protobuf-JSON-shaped
// object — ideType/pluginType are int32 enums on the wire, not strings, and
// platform is required. Values mirror the sibling 9router project's
// LOAD_CODE_ASSIST_METADATA (open-sse/config/appConstants.js).
//
// Live comparison (same Google account, same host, 2026-08-25): 9Router
// (this exact metadata shape, including a Linux platform enum) succeeded
// against loadCodeAssist/onboardUser; OmniRoute (ideType as the bare string
// "ANTIGRAVITY", no platform/pluginType) got 403 on both from the identical
// account. Sending an incomplete client identity reads to Google's backend
// as untrusted and gets rejected.
//
// NOTE: a prior version of this function carried the comment "Matches
// Antigravity-Manager quota.rs: only ideType (no platform — LINUX is
// rejected)" — the opposite conclusion, presumably true when it was
// written. Trusting the fresh live comparison over that stale claim here;
// if this regresses Linux specifically, that old note is why.
const ANTIGRAVITY_IDE_TYPE_ENUM = 9;
const ANTIGRAVITY_PLUGIN_TYPE_GEMINI_ENUM = 2;
const ANTIGRAVITY_PLATFORM_ENUM = {
  UNSPECIFIED: 0,
  DARWIN_AMD64: 1,
  DARWIN_ARM64: 2,
  LINUX_AMD64: 3,
  LINUX_ARM64: 4,
  WINDOWS_AMD64: 5,
} as const;

function resolveAntigravityPlatformEnum(): number {
  const platform = process.platform;
  const arch = process.arch;
  if (platform === "darwin") {
    return arch === "arm64"
      ? ANTIGRAVITY_PLATFORM_ENUM.DARWIN_ARM64
      : ANTIGRAVITY_PLATFORM_ENUM.DARWIN_AMD64;
  }
  if (platform === "linux") {
    return arch === "arm64"
      ? ANTIGRAVITY_PLATFORM_ENUM.LINUX_ARM64
      : ANTIGRAVITY_PLATFORM_ENUM.LINUX_AMD64;
  }
  if (platform === "win32") return ANTIGRAVITY_PLATFORM_ENUM.WINDOWS_AMD64;
  return ANTIGRAVITY_PLATFORM_ENUM.UNSPECIFIED;
}

export const ANTIGRAVITY_IDE_NODE_API_CLIENT = "google-api-nodejs-client/10.3.0";
export const ANTIGRAVITY_IDE_NODE_X_GOOG_API_CLIENT = "gl-node/22.21.1";

// Antigravity presents the native macOS desktop client fingerprint: the upstream
// backend expects the Mac build, so the OS/arch token is pinned to darwin/arm64
// regardless of the host OmniRoute happens to run on (#8098). The IDE / CLI /
// IDE-Node User-Agent split (#8013) is preserved — only the platform token is fixed.
const ANTIGRAVITY_OS_TYPE = "darwin";
const ANTIGRAVITY_ARCH = "arm64";

function withOptionalBearerAuth(
  headers: Record<string, string>,
  accessToken?: string | null
): Record<string, string> {
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return headers;
}

export function antigravityIdeUserAgent(version = getCachedAntigravityIdeVersion()): string {
  return `antigravity/ide/${version} ${ANTIGRAVITY_OS_TYPE}/${ANTIGRAVITY_ARCH}`;
}

export function antigravityCliUserAgent(
  version = getCachedAntigravityCliVersion(),
  authMethod = "consumer"
): string {
  return `antigravity/cli/${version} (aidev_client; os_type=${ANTIGRAVITY_OS_TYPE}; arch=${ANTIGRAVITY_ARCH}; auth_method=${authMethod})`;
}

export function antigravityIdeNodeUserAgent(version = getCachedAntigravityIdeVersion()): string {
  return `antigravity/${version} ${ANTIGRAVITY_OS_TYPE}/${ANTIGRAVITY_ARCH} ${ANTIGRAVITY_IDE_NODE_API_CLIENT}`;
}

export function getAntigravityOAuthUserAgent(profile: AntigravityClientProfile): string {
  return profile === "cli" ? antigravityCliUserAgent() : antigravityIdeNodeUserAgent();
}

export function getAntigravityContentHeaders(
  profile: AntigravityClientProfile,
  accessToken?: string | null
): Record<string, string> {
  return withOptionalBearerAuth(
    {
      "Content-Type": "application/json",
      "User-Agent": profile === "cli" ? antigravityCliUserAgent() : antigravityIdeUserAgent(),
    },
    accessToken
  );
}

export function getAntigravityIdeNodeHeaders(accessToken?: string | null): Record<string, string> {
  return withOptionalBearerAuth(
    {
      "Content-Type": "application/json",
      "User-Agent": antigravityIdeNodeUserAgent(),
      "X-Goog-Api-Client": ANTIGRAVITY_IDE_NODE_X_GOOG_API_CLIENT,
    },
    accessToken
  );
}

/** Native loadCodeAssist body metadata captured from both official clients. */
export function getAntigravityLoadCodeAssistMetadata(): Record<string, number> {
  return {
    ideType: ANTIGRAVITY_IDE_TYPE_ENUM,
    platform: resolveAntigravityPlatformEnum(),
    pluginType: ANTIGRAVITY_PLUGIN_TYPE_GEMINI_ENUM,
  };
}
