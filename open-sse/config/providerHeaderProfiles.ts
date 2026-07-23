import { getAntigravityContentHeaders } from "../services/antigravityHeaders.ts";
import type { AntigravityClientProfile } from "@/shared/constants/antigravityClientProfile";

export const GITHUB_COPILOT_API_VERSION = "2026-06-01";
export const GITHUB_COPILOT_EDITOR_VERSION = "vscode/1.126.0";
export const GITHUB_COPILOT_CHAT_PLUGIN_VERSION = "copilot-chat/0.54.0";
export const GITHUB_COPILOT_CHAT_USER_AGENT = "GitHubCopilotChat/0.54.0";
export const GITHUB_COPILOT_REFRESH_PLUGIN_VERSION = "copilot/1.388.0";
export const GITHUB_COPILOT_REFRESH_USER_AGENT = "GithubCopilot/1.0";
export const GITHUB_COPILOT_INTEGRATION_ID = "vscode-chat";
export const GITHUB_COPILOT_OPENAI_INTENT = "conversation-panel";
export const GITHUB_COPILOT_DEFAULT_INITIATOR = "user";
export const GITHUB_COPILOT_USER_AGENT_LIBRARY = "electron-fetch";

export const QWEN_CLI_VERSION = "0.19.3";
export const QWEN_STAINLESS_LANG = "js";

export const QODER_DEFAULT_USER_AGENT = "Qoder-Cli";

export const KIRO_SDK_USER_AGENT = "AWS-SDK-JS/3.0.0 kiro-ide/1.0.0";
export const KIRO_AMZ_USER_AGENT = "aws-sdk-js/3.0.0 kiro-ide/1.0.0";
export const KIRO_STREAMING_TARGET =
  "AmazonCodeWhispererStreamingService.GenerateAssistantResponse";

export const CURSOR_REGISTRY_VERSION = "3.9";

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
  // Qoder's DashScope-compatible backend expects Qwen Code's runtime-derived wire identity.
  // Keep it runtime-derived so packaged deployments use their own platform/architecture.
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

export function getAntigravityUserAgent(profile: AntigravityClientProfile = "ide"): string {
  return getAntigravityContentHeaders(profile)["User-Agent"];
}

export function getAntigravityProviderHeaders(
  profile: AntigravityClientProfile = "ide"
): Record<string, string> {
  return getAntigravityContentHeaders(profile);
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
