import type { AntigravityClientProfile } from "@/shared/constants/antigravityClientProfile";
import { getRuntimeArch, getRuntimePlatform } from "./cloudCodeHeaders.ts";
import {
  getCachedAntigravityCliVersion,
  getCachedAntigravityIdeVersion,
} from "./antigravityVersion.ts";

export const ANTIGRAVITY_IDE_NODE_API_CLIENT = "google-api-nodejs-client/10.3.0";
export const ANTIGRAVITY_IDE_NODE_X_GOOG_API_CLIENT = "gl-node/22.21.1";

function normalizePlatform(platform: NodeJS.Platform | string): string {
  return platform === "win32" ? "windows" : platform || "unknown";
}

function normalizeArch(arch: NodeJS.Architecture | string): string {
  switch (arch) {
    case "x64":
      return "amd64";
    case "ia32":
      return "386";
    default:
      return arch || "unknown";
  }
}

function getPlatformArch(
  platform: NodeJS.Platform | string = getRuntimePlatform(),
  arch: NodeJS.Architecture | string = getRuntimeArch()
): { arch: string; platform: string } {
  return {
    arch: normalizeArch(arch),
    platform: normalizePlatform(platform),
  };
}

function withOptionalBearerAuth(
  headers: Record<string, string>,
  accessToken?: string | null
): Record<string, string> {
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return headers;
}

export function antigravityIdeUserAgent(
  version = getCachedAntigravityIdeVersion(),
  platform: NodeJS.Platform | string = getRuntimePlatform(),
  arch: NodeJS.Architecture | string = getRuntimeArch()
): string {
  const runtime = getPlatformArch(platform, arch);
  return `antigravity/ide/${version} ${runtime.platform}/${runtime.arch}`;
}

export function antigravityCliUserAgent(
  version = getCachedAntigravityCliVersion(),
  platform: NodeJS.Platform | string = getRuntimePlatform(),
  arch: NodeJS.Architecture | string = getRuntimeArch(),
  authMethod = "consumer"
): string {
  const runtime = getPlatformArch(platform, arch);
  return `antigravity/cli/${version} (aidev_client; os_type=${runtime.platform}; arch=${runtime.arch}; auth_method=${authMethod})`;
}

export function antigravityIdeNodeUserAgent(
  version = getCachedAntigravityIdeVersion(),
  platform: NodeJS.Platform | string = getRuntimePlatform(),
  arch: NodeJS.Architecture | string = getRuntimeArch()
): string {
  const runtime = getPlatformArch(platform, arch);
  return `antigravity/${version} ${runtime.platform}/${runtime.arch} ${ANTIGRAVITY_IDE_NODE_API_CLIENT}`;
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
