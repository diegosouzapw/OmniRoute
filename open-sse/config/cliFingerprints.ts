/**
 * CLI Fingerprint Definitions
 *
 * Defines per-provider "fingerprints" that control the exact ordering of HTTP headers
 * and JSON body fields to match the native CLI tools exactly.
 *
 * When `cliCompatMode` is enabled for a provider, OmniRoute reorders outgoing requests
 * to be indistinguishable from the real CLI binary, reducing account flagging risk.
 *
 * Header order and body field order were captured via mitmproxy traffic analysis.
 */
import { isClaudeCodeCompatible } from "../services/provider.ts";
import {
  getAntigravityUserAgent,
  GITHUB_COPILOT_CHAT_USER_AGENT,
  getQwenOauthHeaders,
} from "./providerHeaderProfiles.ts";
import { normalizeCliCompatProviderId } from "@/shared/utils/cliCompat";

export interface CliFingerprint {
  /** Ordered list of header names (case-sensitive). Unlisted headers are appended. */
  headerOrder: string[];
  /** Ordered list of top-level JSON body fields. Unlisted fields are appended. */
  bodyFieldOrder: string[];
  /** User-Agent string to inject (overrides default) */
  userAgent?: string | (() => string);
  /** Extra headers to add */
  extraHeaders?: Record<string, string>;
}

/**
 * Fingerprint registry - keyed by provider alias (lowercase).
 * Based on mitmproxy traffic captures from native CLI tools.
 */
export const CLI_FINGERPRINTS: Record<string, CliFingerprint> = {
  codex: {
    headerOrder: [
      "Host",
      "Content-Type",
      "Authorization",
      "Accept",
      "User-Agent",
      "Accept-Encoding",
    ],
    bodyFieldOrder: [
      "model",
      "messages",
      "temperature",
      "top_p",
      "max_tokens",
      "stream",
      "tools",
      "tool_choice",
      "response_format",
      "n",
      "stop",
    ],
    // Codex builds mode-specific client headers in its executor/config. The CLI fingerprint must
    // only preserve ordering here; overriding User-Agent with a generic value would erase the
    // executor-provided version or user override.
  },
  claude: {
    headerOrder: [
      "Host",
      "Content-Type",
      "x-api-key",
      "anthropic-version",
      "anthropic-beta",
      "anthropic-dangerous-direct-browser-access",
      "x-app",
      "User-Agent",
      "X-Claude-Code-Session-Id",
      "x-client-request-id",
      "X-Stainless-Retry-Count",
      "X-Stainless-Timeout",
      "X-Stainless-Lang",
      "X-Stainless-Package-Version",
      "X-Stainless-OS",
      "X-Stainless-Arch",
      "X-Stainless-Runtime",
      "X-Stainless-Runtime-Version",
      "Accept",
      "accept-language",
      "accept-encoding",
      "sec-fetch-mode",
      "Connection",
    ],
    bodyFieldOrder: [
      "model",
      "messages",
      "system",
      "tools",
      "tool_choice",
      "metadata",
      "max_tokens",
      "thinking",
      "context_management",
      "output_config",
      "stream",
    ],
  },
  "claude-code-compatible": {
    headerOrder: [
      "Host",
      "Content-Type",
      "Authorization",
      "anthropic-version",
      "anthropic-beta",
      "anthropic-dangerous-direct-browser-access",
      "x-app",
      "User-Agent",
      "X-Claude-Code-Session-Id",
      "X-Stainless-Retry-Count",
      "X-Stainless-Timeout",
      "X-Stainless-Lang",
      "X-Stainless-Package-Version",
      "X-Stainless-OS",
      "X-Stainless-Arch",
      "X-Stainless-Runtime",
      "X-Stainless-Runtime-Version",
      "Accept",
      "accept-encoding",
      "Connection",
    ],
    bodyFieldOrder: [
      "model",
      "messages",
      "system",
      "tools",
      "tool_choice",
      "metadata",
      "max_tokens",
      "thinking",
      "output_config",
      "stream",
    ],
  },
  github: {
    headerOrder: [
      "Host",
      "Authorization",
      "X-Request-Id",
      "Vscode-Sessionid",
      "Vscode-Machineid",
      "Editor-Version",
      "Editor-Plugin-Version",
      "Copilot-Integration-Id",
      "Openai-Organization",
      "Openai-Intent",
      "Content-Type",
      "User-Agent",
      "Accept",
      "Accept-Encoding",
    ],
    bodyFieldOrder: [
      "messages",
      "model",
      "temperature",
      "top_p",
      "max_tokens",
      "n",
      "stream",
      "intent",
      "intent_threshold",
      "intent_content",
    ],
    userAgent: GITHUB_COPILOT_CHAT_USER_AGENT,
  },
  antigravity: {
    headerOrder: [
      "Host",
      "Content-Type",
      "Authorization",
      "User-Agent",
      "Accept",
      "Accept-Encoding",
    ],
    bodyFieldOrder: [
      "project",
      "model",
      "userAgent",
      "requestType",
      "requestId",
      "enabledCreditTypes",
      "request",
    ],
    userAgent: getAntigravityUserAgent,
  },
  qwen: {
    headerOrder: [
      "Host",
      "Content-Type",
      "Authorization",
      "User-Agent",
      "X-Dashscope-AuthType",
      "X-Dashscope-CacheControl",
      "X-Dashscope-UserAgent",
      "X-Stainless-Arch",
      "X-Stainless-Lang",
      "X-Stainless-Os",
      "X-Stainless-Package-Version",
      "X-Stainless-Retry-Count",
      "X-Stainless-Runtime",
      "X-Stainless-Runtime-Version",
      "Connection",
      "Accept",
      "Accept-Language",
      "Sec-Fetch-Mode",
      "Accept-Encoding",
    ],
    bodyFieldOrder: [
      "model",
      "messages",
      "temperature",
      "top_p",
      "max_tokens",
      "stream",
      "tools",
      "tool_choice",
      "response_format",
      "n",
      "stop",
    ],
    userAgent: getQwenOauthHeaders()["User-Agent"],
    extraHeaders: getQwenOauthHeaders(),
  },
};

/**
 * Reorder an object's keys according to a specified order.
 * Keys not in the order list are appended at the end in their original order.
 */
export function orderFields<T extends Record<string, unknown>>(obj: T, fieldOrder: string[]): T {
  if (!fieldOrder?.length || !obj || typeof obj !== "object") return obj;

  const result: Record<string, unknown> = {};
  const remaining = new Set(Object.keys(obj));

  // First, add fields in the specified order
  for (const key of fieldOrder) {
    if (key in obj) {
      result[key] = obj[key];
      remaining.delete(key);
    }
  }

  // Then append remaining fields in original order
  for (const key of remaining) {
    result[key] = obj[key];
  }

  return result as T;
}

/**
 * Reorder HTTP headers according to a fingerprint.
 * Returns a new object with headers in the specified order.
 */
export function orderHeaders(
  headers: Record<string, string>,
  headerOrder: string[]
): Record<string, string> {
  if (!headerOrder?.length || !headers) return headers;

  const result: Record<string, string> = {};
  const remaining = new Map<string, string>();

  // Build case-insensitive lookup
  const headerMap = new Map<string, [string, string]>();
  for (const [key, value] of Object.entries(headers)) {
    headerMap.set(key.toLowerCase(), [key, value]);
  }

  // Add ordered headers first
  for (const orderedKey of headerOrder) {
    const entry = headerMap.get(orderedKey.toLowerCase());
    if (entry) {
      result[entry[0]] = entry[1];
      headerMap.delete(orderedKey.toLowerCase());
    }
  }

  // Add remaining headers
  for (const [, [key, value]] of headerMap) {
    result[key] = value;
  }

  return result;
}

/**
 * Apply a CLI fingerprint to headers and body.
 * Returns { headers, bodyString } with the correct ordering.
 */
export function applyFingerprint(
  provider: string,
  headers: Record<string, string>,
  body: unknown
): { headers: Record<string, string>; bodyString: string } {
  const normalizedProvider = normalizeCliCompatProviderId(provider || "");
  const fingerprintKey = isClaudeCodeCompatible(provider)
    ? "claude-code-compatible"
    : normalizedProvider;
  const fingerprint = CLI_FINGERPRINTS[fingerprintKey];

  if (!fingerprint) {
    return { headers, bodyString: JSON.stringify(body) };
  }

  // Apply user agent override
  if (fingerprint.userAgent) {
    headers["User-Agent"] =
      typeof fingerprint.userAgent === "function" ? fingerprint.userAgent() : fingerprint.userAgent;
  }

  // Apply extra headers
  if (fingerprint.extraHeaders) {
    Object.assign(headers, fingerprint.extraHeaders);
  }

  // Reorder headers
  const orderedHeaders = orderHeaders(headers, fingerprint.headerOrder);

  // Reorder body fields
  const orderedBody =
    body && typeof body === "object" && !Array.isArray(body)
      ? orderFields(body as Record<string, unknown>, fingerprint.bodyFieldOrder)
      : body;

  return {
    headers: orderedHeaders,
    bodyString: JSON.stringify(orderedBody),
  };
}

/**
 * Runtime cache for CLI compat providers set via Settings UI.
 * Updated by the settings API when users toggle providers.
 */
let _cliCompatProviders: Set<string> = new Set();

/**
 * Update the runtime cache of CLI-compat-enabled providers.
 * Called from the settings API when cliCompatProviders is updated.
 */
export function setCliCompatProviders(providers: string[]): void {
  _cliCompatProviders = new Set(
    (providers || [])
      .map((p) => normalizeCliCompatProviderId(p))
      .filter((provider) => provider in CLI_FINGERPRINTS)
  );
}

/**
 * Get the current list of CLI-compat-enabled providers.
 */
export function getCliCompatProviders(): string[] {
  return Array.from(_cliCompatProviders);
}

/**
 * Check if CLI compatibility mode is enabled for a provider.
 * Reads from: 1) Runtime cache (Settings UI), 2) Environment variables.
 */
export function isCliCompatEnabled(provider: string): boolean {
  if (isClaudeCodeCompatible(provider)) return true;

  const key = provider?.toLowerCase().replace(/[^a-z0-9]/g, "_");

  // 1. Check runtime cache (set via Settings UI)
  const normalizedProvider = normalizeCliCompatProviderId(provider || "");
  if (_cliCompatProviders.has(normalizedProvider)) return true;

  // 2. Check environment variable: CLI_COMPAT_<PROVIDER>=1
  const envKey = `CLI_COMPAT_${key?.toUpperCase()}`;
  if (process.env[envKey] === "1" || process.env[envKey] === "true") return true;

  // 3. Global enable: CLI_COMPAT_ALL=1
  if (process.env.CLI_COMPAT_ALL === "1" || process.env.CLI_COMPAT_ALL === "true") return true;

  return false;
}
