import { getAntigravityContentHeaders } from "../services/antigravityHeaders.ts";
import type { AntigravityClientProfile } from "@/shared/constants/antigravityClientProfile";

// GitHub Copilot request identity. Ported to match the GitHub Copilot CLI
// (`copilot` npm package) wire identity that Hermes captured live, NOT the
// VS Code Copilot Chat extension. The CLI's `copilot-developer-cli` integration
// id is the catalog-unlock lever: it exposes the full entitled model set
// (gemini-3.x, gpt-5.4-nano, the full opus reasoning range) where `vscode-chat`
// returns a narrower list. The default version tracks the supported CLI
// package (1.0.91) and follows a newer `@github/copilot` publish when the
// registry answers. Copilot gates models on that version and 400s a pin
// that is behind.
export const GITHUB_COPILOT_API_VERSION = "2026-08-01";
export const GITHUB_COPILOT_CLI_VERSION = "1.0.91";
const GITHUB_COPILOT_VERSION_OVERRIDE_ENV = "GITHUB_COPILOT_CLI_VERSION";
const SAFE_COPILOT_VERSION_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,31}$/;
const COPILOT_DOTTED_TRIPLE_PATTERN = /^\d+\.\d+\.\d+$/;
const NPM_GITHUB_COPILOT_LATEST_URL = "https://registry.npmjs.org/@github/copilot/latest";
export const GITHUB_COPILOT_VERSION_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
export const GITHUB_COPILOT_VERSION_FETCH_TIMEOUT_MS = 20_000;

type CopilotFetchLike = typeof fetch;

let copilotVersionCache: { fetchedAt: number; version: string } | null = null;
let copilotVersionInFlight: Promise<string> | null = null;

function getSafeCopilotEnvValue(name: string, pattern: RegExp): string | null {
  const raw = typeof process === "undefined" ? undefined : process.env?.[name];
  if (typeof raw !== "string") return null;
  const normalized = raw.trim();
  if (!normalized || !pattern.test(normalized)) {
    return null;
  }
  return normalized;
}

function parseCopilotDottedTriple(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return COPILOT_DOTTED_TRIPLE_PATTERN.test(trimmed) ? trimmed : null;
}

function compareCopilotDottedTriple(left: string, right: string): number {
  const leftParts = left.split(".").map((part) => Number.parseInt(part, 10) || 0);
  const rightParts = right.split(".").map((part) => Number.parseInt(part, 10) || 0);
  for (let i = 0; i < 3; i += 1) {
    if (leftParts[i] !== rightParts[i]) return leftParts[i] - rightParts[i];
  }
  return 0;
}

/** A fetched version replaces the pin only when it is strictly newer. */
function pickCopilotVersionAtLeastPin(candidate: string | null): string {
  if (candidate && compareCopilotDottedTriple(candidate, GITHUB_COPILOT_CLI_VERSION) > 0) {
    return candidate;
  }
  return GITHUB_COPILOT_CLI_VERSION;
}

function readFreshCopilotVersionCache(now = Date.now()): string | null {
  if (!copilotVersionCache) return null;
  if (now - copilotVersionCache.fetchedAt >= GITHUB_COPILOT_VERSION_CACHE_TTL_MS) return null;
  return copilotVersionCache.version;
}

/**
 * Refresh the advertised Copilot CLI version from `@github/copilot` on npm.
 * A dotted triple newer than 1.0.91 replaces it; any failure, a non-triple,
 * or an older publish keeps the pin. Cached for six hours. The fetch aborts
 * at 20s — registry responses from this host regularly exceed a few seconds.
 */
export function resolveGitHubCopilotCliVersion(
  fetchImpl: CopilotFetchLike = fetch
): Promise<string> {
  const now = Date.now();
  const fresh = readFreshCopilotVersionCache(now);
  if (fresh) return Promise.resolve(pickCopilotVersionAtLeastPin(fresh));
  if (copilotVersionInFlight) return copilotVersionInFlight;

  copilotVersionInFlight = (async () => {
    let resolved: string | null = null;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GITHUB_COPILOT_VERSION_FETCH_TIMEOUT_MS);
    try {
      const response = await fetchImpl(NPM_GITHUB_COPILOT_LATEST_URL, {
        headers: {
          Accept: "application/json",
          "User-Agent": "OmniRoute-CopilotVersion/1.0",
        },
        signal: controller.signal,
      });
      if (response.ok) {
        const payload = (await response.json()) as { version?: unknown };
        resolved = parseCopilotDottedTriple(payload?.version);
      }
    } catch {
      resolved = null;
    } finally {
      clearTimeout(timeoutId);
    }

    if (resolved && compareCopilotDottedTriple(resolved, GITHUB_COPILOT_CLI_VERSION) > 0) {
      copilotVersionCache = { fetchedAt: Date.now(), version: resolved };
    }
    return pickCopilotVersionAtLeastPin(resolved ?? readFreshCopilotVersionCache());
  })();

  const current = copilotVersionInFlight;
  void current.finally(() => {
    if (copilotVersionInFlight === current) copilotVersionInFlight = null;
  });
  return current;
}

/** Test seam: drop the registry cache so the next resolve hits the network. */
export function resetGitHubCopilotCliVersionCache(): void {
  copilotVersionCache = null;
  copilotVersionInFlight = null;
}

/** Captured pin, overridable via GITHUB_COPILOT_CLI_VERSION (#12417). */
export function getGitHubCopilotCliVersion(): string {
  const override = getSafeCopilotEnvValue(
    GITHUB_COPILOT_VERSION_OVERRIDE_ENV,
    SAFE_COPILOT_VERSION_PATTERN
  );
  if (override) return override;
  if (!process.env.NODE_TEST_CONTEXT && !readFreshCopilotVersionCache() && !copilotVersionInFlight)
    void resolveGitHubCopilotCliVersion();
  return pickCopilotVersionAtLeastPin(readFreshCopilotVersionCache());
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
export const GITHUB_COPILOT_CLI_INTEGRATION_ID = "copilot-developer-cli";
export const GITHUB_COPILOT_CHAT_INTEGRATION_ID = "copilot-chat";
export const GITHUB_COPILOT_INTEGRATION_ID = GITHUB_COPILOT_CLI_INTEGRATION_ID;
export const GITHUB_COPILOT_OPENAI_INTENT = "conversation-agent";
export const GITHUB_COPILOT_INTERACTION_TYPE = "conversation-user";
export const GITHUB_COPILOT_HARNESS_ID = "copilot-sdk";
export const GITHUB_COPILOT_DEFAULT_INITIATOR = "user";

export function normalizeCopilotIntegrationId(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || /[\r\n]/.test(trimmed)) return null;
  return trimmed;
}

export function resolveCopilotIntegrationIdOverride(): string | null {
  const raw = typeof process === "undefined" ? undefined : process.env?.COPILOT_INTEGRATION_ID;
  return normalizeCopilotIntegrationId(raw);
}

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

// CODEBUDDY_CN_USER_AGENT is the captured pin for the CLI/CodeBuddy version
// string. It MUST stay identical across OAuth (src/lib/oauth/constants/oauth.ts), chat
// completions (open-sse/config/providers/registry/codebuddy-cn/index.ts) and usage/quota
// (open-sse/services/usage/codebuddy-cn.ts) - a mismatched version string across a
// single account's auth vs. chat calls is exactly the kind of internally-inconsistent
// client fingerprint Tencent's WAF flags as anomalous (#12702). Request paths read
// getCodeBuddyCnUserAgent(), which may replace both numbers with a newer npm publish.
export const CODEBUDDY_CN_USER_AGENT = "CLI/2.108.1 CodeBuddy/2.108.1";

// CodeBuddy International (codebuddy.ai) - single source of truth for intl profile.
export const CODEBUDDY_INTL_USER_AGENT = "IDE/2.108.1 CodeBuddy/2.108.1";

const QWEN_DOTTED_TRIPLE_PATTERN = /^\d+\.\d+\.\d+$/;
const NPM_QWEN_CODE_LATEST_URL = "https://registry.npmjs.org/@qwen-code/qwen-code/latest";
const NPM_CODEBUDDY_LATEST_URL = "https://registry.npmjs.org/@tencent-ai/codebuddy-code/latest";
export const QWEN_CLI_VERSION_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
export const QWEN_CLI_VERSION_FETCH_TIMEOUT_MS = 20_000;
export const CODEBUDDY_CN_VERSION_CACHE_TTL_MS = QWEN_CLI_VERSION_CACHE_TTL_MS;
export const CODEBUDDY_CN_VERSION_FETCH_TIMEOUT_MS = QWEN_CLI_VERSION_FETCH_TIMEOUT_MS;

type NpmFetchLike = typeof fetch;

type VersionCache = { fetchedAt: number; version: string };

let qwenVersionCache: VersionCache | null = null;
let qwenVersionInFlight: Promise<string> | null = null;
let codeBuddyVersionCache: VersionCache | null = null;
let codeBuddyVersionInFlight: Promise<string> | null = null;

function parseDottedTriple(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return QWEN_DOTTED_TRIPLE_PATTERN.test(trimmed) ? trimmed : null;
}

function compareDottedTriple(left: string, right: string): number {
  const leftParts = left.split(".").map((part) => Number.parseInt(part, 10) || 0);
  const rightParts = right.split(".").map((part) => Number.parseInt(part, 10) || 0);
  for (let i = 0; i < 3; i += 1) {
    if (leftParts[i] !== rightParts[i]) return leftParts[i] - rightParts[i];
  }
  return 0;
}

function readFreshVersionCache(
  cache: VersionCache | null,
  ttlMs: number,
  now = Date.now()
): string | null {
  if (!cache) return null;
  if (now - cache.fetchedAt >= ttlMs) return null;
  return cache.version;
}

function shouldAutoRefreshCliVersion(): boolean {
  if (typeof process === "undefined") return false;
  return !process.env.NODE_TEST_CONTEXT;
}

/**
 * Warm one npm `latest` document. A dotted triple newer than `pin` is cached
 * for six hours; a rejected fetch, a non-2xx, a non-triple, or an older
 * publish leaves the pin in place. The fetch aborts at 20s.
 */
function refreshNpmDottedTriple(options: {
  url: string;
  pin: string;
  userAgent: string;
  timeoutMs: number;
  ttlMs: number;
  readCache: () => VersionCache | null;
  setCache: (next: VersionCache) => void;
  readInFlight: () => Promise<string> | null;
  setInFlight: (next: Promise<string> | null) => void;
  fetchImpl: NpmFetchLike;
}): Promise<string> {
  const fresh = readFreshVersionCache(options.readCache(), options.ttlMs);
  if (fresh && compareDottedTriple(fresh, options.pin) > 0) return Promise.resolve(fresh);
  const existing = options.readInFlight();
  if (existing) return existing;

  const current = (async () => {
    let resolved: string | null = null;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs);
    try {
      const response = await options.fetchImpl(options.url, {
        headers: {
          Accept: "application/json",
          "User-Agent": options.userAgent,
        },
        signal: controller.signal,
      });
      if (response.ok) {
        const payload = (await response.json()) as { version?: unknown };
        resolved = parseDottedTriple(payload?.version);
      }
    } catch {
      resolved = null;
    } finally {
      clearTimeout(timeoutId);
    }

    if (resolved && compareDottedTriple(resolved, options.pin) > 0) {
      options.setCache({ fetchedAt: Date.now(), version: resolved });
      return resolved;
    }
    const stillFresh = readFreshVersionCache(options.readCache(), options.ttlMs);
    if (stillFresh && compareDottedTriple(stillFresh, options.pin) > 0) return stillFresh;
    return options.pin;
  })();

  options.setInFlight(current);
  void current.finally(() => {
    if (options.readInFlight() === current) options.setInFlight(null);
  });
  return current;
}

/** Sync hot path. Cache if newer than the pin, else the pin. Never waits. */
export function getQwenCliVersion(): string {
  if (shouldAutoRefreshCliVersion() && !qwenVersionInFlight) {
    const fresh = readFreshVersionCache(qwenVersionCache, QWEN_CLI_VERSION_CACHE_TTL_MS);
    if (!fresh || compareDottedTriple(fresh, QWEN_CLI_VERSION) <= 0) {
      void refreshQwenCliVersion();
    }
  }
  const fresh = readFreshVersionCache(qwenVersionCache, QWEN_CLI_VERSION_CACHE_TTL_MS);
  if (fresh && compareDottedTriple(fresh, QWEN_CLI_VERSION) > 0) return fresh;
  return QWEN_CLI_VERSION;
}

export function refreshQwenCliVersion(fetchImpl: NpmFetchLike = fetch): Promise<string> {
  return refreshNpmDottedTriple({
    url: NPM_QWEN_CODE_LATEST_URL,
    pin: QWEN_CLI_VERSION,
    userAgent: "OmniRoute-QwenCodeVersion/1.0",
    timeoutMs: QWEN_CLI_VERSION_FETCH_TIMEOUT_MS,
    ttlMs: QWEN_CLI_VERSION_CACHE_TTL_MS,
    readCache: () => qwenVersionCache,
    setCache: (next) => {
      qwenVersionCache = next;
    },
    readInFlight: () => qwenVersionInFlight,
    setInFlight: (next) => {
      qwenVersionInFlight = next;
    },
    fetchImpl,
  });
}

export function resetQwenCliVersionCache(): void {
  qwenVersionCache = null;
  qwenVersionInFlight = null;
}

function formatCodeBuddyCnUserAgent(version: string): string {
  return `CLI/${version} CodeBuddy/${version}`;
}

/** Sync hot path. Both numbers move together, or the captured pin stays. */
export function getCodeBuddyCnUserAgent(): string {
  if (shouldAutoRefreshCliVersion() && !codeBuddyVersionInFlight) {
    const fresh = readFreshVersionCache(codeBuddyVersionCache, CODEBUDDY_CN_VERSION_CACHE_TTL_MS);
    if (!fresh) void refreshCodeBuddyCnUserAgent();
  }
  const fresh = readFreshVersionCache(codeBuddyVersionCache, CODEBUDDY_CN_VERSION_CACHE_TTL_MS);
  if (fresh) return formatCodeBuddyCnUserAgent(fresh);
  return CODEBUDDY_CN_USER_AGENT;
}

export function refreshCodeBuddyCnUserAgent(fetchImpl: NpmFetchLike = fetch): Promise<string> {
  const pinVersion = CODEBUDDY_CN_USER_AGENT.match(/(\d+\.\d+\.\d+)/)?.[1] ?? "0.0.0";
  return refreshNpmDottedTriple({
    url: NPM_CODEBUDDY_LATEST_URL,
    pin: pinVersion,
    userAgent: "OmniRoute-CodeBuddyVersion/1.0",
    timeoutMs: CODEBUDDY_CN_VERSION_FETCH_TIMEOUT_MS,
    ttlMs: CODEBUDDY_CN_VERSION_CACHE_TTL_MS,
    readCache: () => codeBuddyVersionCache,
    setCache: (next) => {
      codeBuddyVersionCache = next;
    },
    readInFlight: () => codeBuddyVersionInFlight,
    setInFlight: (next) => {
      codeBuddyVersionInFlight = next;
    },
    fetchImpl,
  }).then((version) => formatCodeBuddyCnUserAgent(version));
}

export function resetCodeBuddyCnVersionCache(): void {
  codeBuddyVersionCache = null;
  codeBuddyVersionInFlight = null;
}

export const KIRO_SDK_USER_AGENT = "AWS-SDK-JS/3.0.0 kiro-ide/1.0.0";
export const KIRO_AMZ_USER_AGENT = "aws-sdk-js/3.0.0 kiro-ide/1.0.0";
export const KIRO_STREAMING_TARGET =
  "AmazonCodeWhispererStreamingService.GenerateAssistantResponse";

export const CURSOR_REGISTRY_VERSION = "3.9";

export function getGitHubCopilotChatHeaders(
  accept = "application/json",
  initiator = GITHUB_COPILOT_DEFAULT_INITIATOR,
  options: { vision?: boolean; intent?: string; integrationId?: string } = {}
): Record<string, string> {
  // Header shape follows a live @github/copilot CLI 1.0.88 inference capture.
  // NOTE the CLI does NOT send `editor-plugin-version` nor
  // `x-vscode-user-agent-library-version` on the inference path — those belong
  // to the VS Code Copilot Chat extension, not the CLI. Sending an incomplete
  // OR an over-complete header fingerprint is itself a flagging signal, so we
  // send exactly the CLI's set. The `copilot-integration-id` (copilot-developer-cli)
  // is the catalog-unlock lever; the stable X-Client-Machine-Id is the CLI's
  // per-install device fingerprint.
  const version = getGitHubCopilotCliVersion();
  const integrationId =
    normalizeCopilotIntegrationId(options.integrationId) ||
    resolveCopilotIntegrationIdOverride() ||
    GITHUB_COPILOT_CLI_INTEGRATION_ID;
  const headers: Record<string, string> = {
    "copilot-integration-id": integrationId,
    "editor-version": `copilot/${version}`,
    "user-agent": `copilot/${version} (${getRuntimePlatform()}) term/unknown`,
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

export function getQwenCliUserAgent(version = getQwenCliVersion()): string {
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
