import { getRuntimeArch, getRuntimePlatform } from "./providerHeaderProfiles.ts";

export const GROK_BUILD_PROXY_BASE_URL = "https://cli-chat-proxy.grok.com/v1";
export const GROK_BUILD_RESPONSES_URL = `${GROK_BUILD_PROXY_BASE_URL}/responses`;
export const GROK_BUILD_MODELS_URL = `${GROK_BUILD_PROXY_BASE_URL}/models`;

export const GROK_BUILD_OAUTH_ISSUER = "https://auth.x.ai";
export const GROK_BUILD_DEVICE_CODE_URL = `${GROK_BUILD_OAUTH_ISSUER}/oauth2/device/code`;
export const GROK_BUILD_TOKEN_URL = `${GROK_BUILD_OAUTH_ISSUER}/oauth2/token`;

export const GROK_BUILD_DEFAULT_CLIENT_VERSION = "0.2.106";
export const GROK_BUILD_DEFAULT_CONTEXT_WINDOW = 256_000;
export const GROK_BUILD_DEFAULT_REASONING_EFFORT = "high";
export const GROK_BUILD_CLIENT_IDENTIFIER = "grok-shell";
export const GROK_BUILD_TOKEN_AUTH = "xai-grok-cli";
export const GROK_BUILD_REASONING_INCLUDE = "reasoning.encrypted_content";
export const GROK_BUILD_OAUTH_REFERRER = "grok-build";

export const GROK_BUILD_OAUTH_SCOPES = Object.freeze([
  "openid",
  "profile",
  "email",
  "offline_access",
  "grok-cli:access",
  "api:access",
  "conversations:read",
  "conversations:write",
  "workspaces:read",
  "workspaces:write",
]);

export type GrokBuildClientMode = "headless" | "interactive";
export type GrokBuildClientSurface = "ui" | "cli" | "headless";

export type GrokBuildSessionHeaderOptions = {
  token?: string | null;
  model?: string | null;
  stream?: boolean;
  clientMode?: GrokBuildClientMode;
  userId?: string | null;
  email?: string | null;
  principalType?: string | null;
};

function getWireEmail(email?: string | null, principalType?: string | null): string | null {
  const normalizedPrincipalType = principalType?.trim().toLowerCase();
  return normalizedPrincipalType === "team" || normalizedPrincipalType === "organization"
    ? null
    : email || null;
}

function mapPlatform(platform: string): string {
  if (platform === "darwin") return "macos";
  if (platform === "win32") return "windows";
  return platform;
}

function mapArch(arch: string): string {
  if (arch === "arm64") return "aarch64";
  if (arch === "x64") return "x86_64";
  return arch;
}

export function getGrokBuildClientVersion(): string {
  return GROK_BUILD_DEFAULT_CLIENT_VERSION;
}

export function getGrokBuildUserAgent(): string {
  return `${GROK_BUILD_CLIENT_IDENTIFIER}/${getGrokBuildClientVersion()} (${mapPlatform(
    getRuntimePlatform()
  )}; ${mapArch(getRuntimeArch())})`;
}

export function getGrokBuildClientHeaders(
  clientMode: GrokBuildClientMode = "headless"
): Record<string, string> {
  return {
    "x-grok-client-version": getGrokBuildClientVersion(),
    "x-grok-client-identifier": GROK_BUILD_CLIENT_IDENTIFIER,
    "x-grok-client-mode": clientMode,
    "User-Agent": getGrokBuildUserAgent(),
  };
}

export function getGrokBuildSessionHeaders({
  token,
  model,
  stream = false,
  clientMode = "headless",
  userId,
  email,
  principalType,
}: GrokBuildSessionHeaderOptions = {}): Record<string, string> {
  const wireEmail = getWireEmail(email, principalType);
  return {
    "Content-Type": "application/json",
    Accept: stream ? "text/event-stream" : "application/json",
    ...getGrokBuildClientHeaders(clientMode),
    "X-XAI-Token-Auth": GROK_BUILD_TOKEN_AUTH,
    "x-authenticateresponse": "authenticate-response",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(model ? { "x-grok-model-override": model } : {}),
    ...(userId
      ? {
          "x-userid": userId,
          "x-grok-user-id": userId,
        }
      : {}),
    ...(wireEmail ? { "x-email": wireEmail } : {}),
  };
}

export function getGrokBuildOAuthHeaders(
  surface: GrokBuildClientSurface = "ui"
): Record<string, string> {
  return {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    "x-grok-client-version": getGrokBuildClientVersion(),
    "x-grok-client-surface": surface,
  };
}

export function getGrokBuildModelsHeaders({
  token,
  userId,
  email,
  principalType,
}: Pick<GrokBuildSessionHeaderOptions, "token" | "userId" | "email" | "principalType">): Record<
  string,
  string
> {
  const wireEmail = getWireEmail(email, principalType);
  return {
    Accept: "application/json",
    ...getGrokBuildClientHeaders("headless"),
    "X-XAI-Token-Auth": GROK_BUILD_TOKEN_AUTH,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(userId ? { "x-userid": userId } : {}),
    ...(wireEmail ? { "x-email": wireEmail } : {}),
  };
}
