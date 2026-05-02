import { antigravityUserAgent } from "../services/antigravityHeaders.ts";

export const GITHUB_COPILOT_API_VERSION = "2025-04-01";
export const GITHUB_COPILOT_EDITOR_VERSION = "vscode/1.117.0";
export const GITHUB_COPILOT_CHAT_PLUGIN_VERSION = "copilot-chat/0.45.1";
export const GITHUB_COPILOT_CHAT_USER_AGENT = "GitHubCopilotChat/0.45.1";
export const GITHUB_COPILOT_REFRESH_PLUGIN_VERSION = "copilot/1.388.0";
export const GITHUB_COPILOT_REFRESH_USER_AGENT = "GithubCopilot/1.0";
export const GITHUB_COPILOT_INTEGRATION_ID = "vscode-chat";
export const GITHUB_COPILOT_OPENAI_INTENT = "conversation-panel";
export const GITHUB_COPILOT_DEFAULT_INITIATOR = "user";
export const GITHUB_COPILOT_USER_AGENT_LIBRARY = "electron-fetch";

export const QWEN_CLI_VERSION = "0.15.4";
export const QWEN_STAINLESS_LANG = "js";
export const QWEN_STAINLESS_PACKAGE_VERSION = "5.11.0";
export const QWEN_STAINLESS_RETRY_COUNT = "1";
export const QWEN_STAINLESS_RUNTIME = "node";
export const QWEN_ACCEPT_LANGUAGE = "*";
export const QWEN_SEC_FETCH_MODE = "cors";

export const QODER_DEFAULT_USER_AGENT = "Qoder-Cli";

export const KIRO_SDK_USER_AGENT = "AWS-SDK-JS/3.0.0 kiro-ide/1.0.0";
export const KIRO_AMZ_USER_AGENT = "aws-sdk-js/3.0.0 kiro-ide/1.0.0";
export const KIRO_STREAMING_TARGET =
  "AmazonCodeWhispererStreamingService.GenerateAssistantResponse";

export const CURSOR_REGISTRY_VERSION = "3.2.14";

export function getGitHubCopilotChatHeaders(
  accept = "application/json",
  initiator = GITHUB_COPILOT_DEFAULT_INITIATOR
): Record<string, string> {
  return {
    "copilot-integration-id": GITHUB_COPILOT_INTEGRATION_ID,
    "editor-version": GITHUB_COPILOT_EDITOR_VERSION,
    "editor-plugin-version": GITHUB_COPILOT_CHAT_PLUGIN_VERSION,
    "user-agent": GITHUB_COPILOT_CHAT_USER_AGENT,
    "openai-intent": GITHUB_COPILOT_OPENAI_INTENT,
    "x-github-api-version": GITHUB_COPILOT_API_VERSION,
    "x-vscode-user-agent-library-version": GITHUB_COPILOT_USER_AGENT_LIBRARY,
    "X-Initiator": initiator,
    Accept: accept,
    "Content-Type": "application/json",
  };
}

export function getRuntimePlatform(): string {
  return typeof process !== "undefined" && typeof process.platform === "string"
    ? process.platform
    : "unknown";
}

export function getRuntimeArch(): string {
  return typeof process !== "undefined" && typeof process.arch === "string"
    ? process.arch
    : "unknown";
}

export function getRuntimeVersion(): string {
  return typeof process !== "undefined" && typeof process.version === "string"
    ? process.version
    : "unknown";
}

export function normalizeStainlessPlatform(platform: string = getRuntimePlatform()): string {
  const normalized = platform.toLowerCase();
  if (normalized.includes("ios")) return "iOS";
  if (normalized === "android") return "Android";
  if (normalized === "darwin") return "MacOS";
  if (normalized === "win32") return "Windows";
  if (normalized === "freebsd") return "FreeBSD";
  if (normalized === "openbsd") return "OpenBSD";
  if (normalized === "linux") return "Linux";
  return normalized ? `Other:${normalized}` : "Unknown";
}

export function normalizeStainlessArch(arch: string = getRuntimeArch()): string {
  if (arch === "x32") return "x32";
  if (arch === "x86_64" || arch === "x64") return "x64";
  if (arch === "arm") return "arm";
  if (arch === "aarch64" || arch === "arm64") return "arm64";
  return arch ? `other:${arch}` : "unknown";
}

export function getQwenCliUserAgent(version = QWEN_CLI_VERSION): string {
  // Qwen Code builds this from the runtime process values. Keep it runtime-derived so
  // packaged deployments use their own platform/architecture instead of a maintainer's host.
  return `QwenCode/${version} (${getRuntimePlatform()}; ${getRuntimeArch()})`;
}

export function getGitHubCopilotInternalUserHeaders(authorization: string): Record<string, string> {
  return {
    Authorization: authorization,
    Accept: "application/json",
    "X-GitHub-Api-Version": GITHUB_COPILOT_API_VERSION,
    "User-Agent": GITHUB_COPILOT_CHAT_USER_AGENT,
    "Editor-Version": GITHUB_COPILOT_EDITOR_VERSION,
    "Editor-Plugin-Version": GITHUB_COPILOT_CHAT_PLUGIN_VERSION,
  };
}

export function getGitHubCopilotRefreshHeaders(authorization: string): Record<string, string> {
  return {
    Authorization: authorization,
    Accept: "application/json",
    "User-Agent": GITHUB_COPILOT_REFRESH_USER_AGENT,
    "Editor-Version": GITHUB_COPILOT_EDITOR_VERSION,
    "Editor-Plugin-Version": GITHUB_COPILOT_REFRESH_PLUGIN_VERSION,
  };
}

export function getQwenOauthHeaders(): Record<string, string> {
  const userAgent = getQwenCliUserAgent();
  return {
    "User-Agent": userAgent,
    "X-Dashscope-AuthType": "qwen-oauth",
    "X-Dashscope-CacheControl": "enable",
    "X-Dashscope-UserAgent": userAgent,
    "X-Stainless-Arch": normalizeStainlessArch(),
    "X-Stainless-Lang": QWEN_STAINLESS_LANG,
    "X-Stainless-Os": normalizeStainlessPlatform(),
    "X-Stainless-Package-Version": QWEN_STAINLESS_PACKAGE_VERSION,
    "X-Stainless-Retry-Count": QWEN_STAINLESS_RETRY_COUNT,
    "X-Stainless-Runtime": QWEN_STAINLESS_RUNTIME,
    "X-Stainless-Runtime-Version": getRuntimeVersion(),
    Connection: "keep-alive",
    "Accept-Language": QWEN_ACCEPT_LANGUAGE,
    "Sec-Fetch-Mode": QWEN_SEC_FETCH_MODE,
  };
}

export function getQoderDefaultHeaders(): Record<string, string> {
  return {
    "User-Agent": QODER_DEFAULT_USER_AGENT,
  };
}

export function getQoderDashscopeCompatHeaders(): Record<string, string> {
  const userAgent = getQwenCliUserAgent();
  return {
    "x-dashscope-authtype": "qwen-oauth",
    "x-dashscope-cachecontrol": "enable",
    "user-agent": userAgent,
    "x-dashscope-useragent": userAgent,
    "x-stainless-arch": normalizeStainlessArch(),
    "x-stainless-lang": QWEN_STAINLESS_LANG,
    "x-stainless-os": normalizeStainlessPlatform(),
  };
}

export function getAntigravityUserAgent(): string {
  return antigravityUserAgent();
}

export function getAntigravityProviderHeaders(): Record<string, string> {
  return {
    "User-Agent": getAntigravityUserAgent(),
  };
}

export function getKiroServiceHeaders(
  accept = "application/vnd.amazon.eventstream"
): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Accept: accept,
    "X-Amz-Target": KIRO_STREAMING_TARGET,
    "User-Agent": KIRO_SDK_USER_AGENT,
    "X-Amz-User-Agent": KIRO_AMZ_USER_AGENT,
  };
}

export function getCursorUserAgent(version: string): string {
  return `Cursor/${version}`;
}

export function getCursorRegistryHeaders(
  version = CURSOR_REGISTRY_VERSION
): Record<string, string> {
  return {
    "connect-accept-encoding": "gzip",
    "connect-protocol-version": "1",
    "Content-Type": "application/connect+proto",
    "User-Agent": getCursorUserAgent(version),
  };
}

export function getCursorUsageHeaders(
  accessToken: string,
  version = CURSOR_REGISTRY_VERSION
): Record<string, string> {
  const userAgent = getCursorUserAgent(version);
  return {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    "User-Agent": userAgent,
    "x-cursor-client-version": version,
    "x-cursor-user-agent": userAgent,
  };
}
