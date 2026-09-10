import { getAntigravityContentHeaders } from "../services/antigravityHeaders.ts";
import type { AntigravityClientProfile } from "@/shared/constants/antigravityClientProfile";

// GitHub Copilot request identity. Ported to match the GitHub Copilot CLI
// (`copilot` npm package) wire identity that Hermes captured live, NOT the
// VS Code Copilot Chat extension. The CLI's `copilot-developer-cli` integration
// id is the catalog-unlock lever: it exposes the full entitled model set
// (gemini-3.x, gpt-5.4-nano, the full opus reasoning range) where `vscode-chat`
// returns a narrower list. Version strings track the live-captured CLI 1.0.81-6.
export const GITHUB_COPILOT_API_VERSION = "2026-08-01";
export const GITHUB_COPILOT_CLI_VERSION = "1.0.81-6";
const GITHUB_COPILOT_VERSION_OVERRIDE_ENV = "GITHUB_COPILOT_CLI_VERSION";
const SAFE_COPILOT_VERSION_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,31}$/;

function getSafeCopilotEnvValue(name: string, pattern: RegExp): string | null {
  const raw = typeof process === "undefined" ? undefined : process.env?.[name];
  if (typeof raw !== "string") return null;
  const normalized = raw.trim();
  if (!normalized || !pattern.test(normalized)) {
    return null;
  }
  return normalized;
}

/** Captured pin, overridable via GITHUB_COPILOT_CLI_VERSION (#12417). */
export function getGitHubCopilotCliVersion(): string {
  return (
    getSafeCopilotEnvValue(GITHUB_COPILOT_VERSION_OVERRIDE_ENV, SAFE_COPILOT_VERSION_PATTERN) ||
    GITHUB_COPILOT_CLI_VERSION
  );
}

export const GITHUB_COPILOT_EDITOR_VERSION = `copilot/${GITHUB_COPILOT_CLI_VERSION}`;
export const GITHUB_COPILOT_CHAT_PLUGIN_VERSION = `copilot-chat/${GITHUB_COPILOT_CLI_VERSION}`;
export const GITHUB_COPILOT_CHAT_USER_AGENT = `GitHubCopilotChat/${GITHUB_COPILOT_CLI_VERSION}`;
export const GITHUB_COPILOT_CLI_USER_AGENT = `copilot/${GITHUB_COPILOT_CLI_VERSION}`;
export const GITHUB_COPILOT_REFRESH_PLUGIN_VERSION = `copilot/${GITHUB_COPILOT_CLI_VERSION}`;
export const GITHUB_COPILOT_REFRESH_USER_AGENT = "GithubCopilot/1.0";

/** Request-time Copilot Chat UA. Pin consts above stay for lockstep tests (#12417). */
export function getGitHubCopilotChatUserAgent(): string {
  return `GitHubCopilotChat/${getGitHubCopilotCliVersion()}`;
}
export const GITHUB_COPILOT_INTEGRATION_ID = "copilot-developer-cli";
export const GITHUB_COPILOT_OPENAI_INTENT = "conversation-agent";
export const GITHUB_COPILOT_INTERACTION_TYPE = "conversation-user";
export const GITHUB_COPILOT_HARNESS_ID = "copilot-sdk";
export const GITHUB_COPILOT_DEFAULT_INITIATOR = "user";

// Stable per-install device fingerprint (the CLI's X-Client-Machine-Id). The
// real @github/copilot CLI sends ONE stable UUID on every inference + /models
// call (verified identical across all captured requests) — a per-call random id
// would itself be an anti-fingerprint tell. We mint one per process and cache
// it (env-overridable via GITHUB_COPILOT_MACHINE_ID), which keeps it stable for
// the lifetime of a running OmniRoute instance, matching "one CLI install".
let _copilotMachineId: string | null = null;
export function getGitHubCopilotMachineId(): string {
  const override = (process?.env?.GITHUB_COPILOT_MACHINE_ID || "").trim();
  if (override) return override;
  if (_copilotMachineId) return _copilotMachineId;
  _copilotMachineId =
    crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return _copilotMachineId;
}

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
  initiator = GITHUB_COPILOT_DEFAULT_INITIATOR,
  options: { vision?: boolean; intent?: string } = {}
): Record<string, string> {
  // Matches the live @github/copilot CLI 1.0.81-6 inference request 1:1 (MITM-
  // captured). NOTE the CLI does NOT send `editor-plugin-version` nor
  // `x-vscode-user-agent-library-version` on the inference path — those belong
  // to the VS Code Copilot Chat extension, not the CLI. Sending an incomplete
  // OR an over-complete header fingerprint is itself a flagging signal, so we
  // send exactly the CLI's set. The `copilot-integration-id` (copilot-developer-cli)
  // is the catalog-unlock lever; the stable X-Client-Machine-Id is the CLI's
  // per-install device fingerprint.
  const version = getGitHubCopilotCliVersion();
  const headers: Record<string, string> = {
    "copilot-integration-id": GITHUB_COPILOT_INTEGRATION_ID,
    "editor-version": `copilot/${version}`,
    "user-agent": `copilot/${version}`,
    "openai-intent": options.intent || GITHUB_COPILOT_OPENAI_INTENT,
    "x-interaction-type": GITHUB_COPILOT_INTERACTION_TYPE,
    "copilot-harness-id": GITHUB_COPILOT_HARNESS_ID,
    "x-github-api-version": GITHUB_COPILOT_API_VERSION,
    "x-client-machine-id": getGitHubCopilotMachineId(),
    "X-Initiator": initiator,
    Accept: accept,
    "Content-Type": "application/json",
  };
  // Copilot's /v1/messages proxy returns an empty content block for image
  // requests unless this is set. Add it only when the turn carries an image.
  if (options.vision) {
    headers["copilot-vision-request"] = "true";
  }
  return headers;
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
  const version = getGitHubCopilotCliVersion();
  return {
    Authorization: authorization,
    Accept: "application/json",
    "X-GitHub-Api-Version": GITHUB_COPILOT_API_VERSION,
    "User-Agent": `GitHubCopilotChat/${version}`,
    "Editor-Version": `copilot/${version}`,
    "Editor-Plugin-Version": `copilot-chat/${version}`,
  };
}

export function getGitHubCopilotRefreshHeaders(authorization: string): Record<string, string> {
  const version = getGitHubCopilotCliVersion();
  return {
    Authorization: authorization,
    Accept: "application/json",
    "User-Agent": GITHUB_COPILOT_REFRESH_USER_AGENT,
    "Editor-Version": `copilot/${version}`,
    "Editor-Plugin-Version": `copilot/${version}`,
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
