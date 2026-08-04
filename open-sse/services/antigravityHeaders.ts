import type { AntigravityClientProfile } from "@/shared/constants/antigravityClientProfile";
import {
  getCachedAntigravityCliVersion,
  getCachedAntigravityIdeVersion,
} from "./antigravityVersion.ts";

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
export function getAntigravityLoadCodeAssistMetadata(): Record<string, string> {
  return {
    ideType: "ANTIGRAVITY",
  };
}
