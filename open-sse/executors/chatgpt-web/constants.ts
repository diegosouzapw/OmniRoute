import { BaseExecutor, type ExecuteInput, type ProviderCredentials } from "../base.ts";
import { OMNIROUTE_VERSION } from "@/shared/constants/version.ts";
import { getProxyForAccount } from "../../utils/proxyFallback.ts";
import { HttpsProxyAgent } from "https-proxy-agent";
import crypto from "node:crypto";
import { createHash } from "node:crypto";
import { saveCallLog } from "@/lib/usage/callLogArtifacts.ts";
import { streamWithTimeout } from "../../utils/stream.ts";
import { ANTIGRAVITY_CONFIG } from "../../config/errorConfig.ts";
import { storeChatGptImage, getChatGptImageConversationContext, __resetChatGptImageCacheForTesting, type ChatGptImageConversationContext } from "../../services/chatgptImageCache.ts";

import { thinkingEffortCache } from "./thinking.ts";
import { tokenCache, cookieKey } from "./session.ts";
import { warmupCache } from "./warmup.ts";
import { resetDplCache } from "./sentinel.ts";

// ─── Constants ──────────────────────────────────────────────────────────────

export const CHATGPT_BASE = "https://chatgpt.com";

export const SESSION_URL = `${CHATGPT_BASE}/api/auth/session`;

export const CONV_URL = `${CHATGPT_BASE}/backend-api/f/conversation`;

export const CHATGPT_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:148.0) Gecko/20100101 Firefox/148.0";

// Captured from a real chatgpt.com browser session (April 2026).
export const OAI_CLIENT_VERSION = "prod-81e0c5cdf6140e8c5db714d613337f4aeab94029";

export const OAI_CLIENT_BUILD_NUMBER = "6128297";

// Per-cookie device ID. The browser stores a persistent `oai-did` cookie that
// uniquely identifies the device for OpenAI's risk model — we derive a stable
// UUID from a hash of the session cookie so that each account/connection gets
// its own device id, but it doesn't change between requests.
export const deviceIdCache = new Map<string, string>();

export function deviceIdFor(cookie: string): string {
  const key = cookieKey(cookie);
  let id = deviceIdCache.get(key);
  if (!id) {
    // Synthesize a UUID v4-shaped string from a SHA-256 of the cookie. Stable,
    // deterministic per cookie, no PII (the cookie's already secret).
    // Not a password hash — SHA-256 is used to derive a stable UUID from the
    // session cookie for device-id fingerprinting. The output is a cache key.
    const h = createHash("sha256").update(cookie).digest("hex"); // lgtm[js/insufficient-password-hash]
    id =
      `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-` +
      `${((parseInt(h.slice(16, 17), 16) & 0x3) | 0x8).toString(16)}${h.slice(17, 20)}-` +
      h.slice(20, 32);
    if (deviceIdCache.size >= 200) {
      const first = deviceIdCache.keys().next().value;
      if (first) deviceIdCache.delete(first);
    }
    deviceIdCache.set(key, id);
  }
  return id;
}

// OmniRoute model ID → ChatGPT internal slug. OmniRoute uses dot-form IDs
// (e.g. "gpt-5.3-instant"), ChatGPT's web routes use dash-form
// (e.g. "gpt-5-3-instant"). The slug catalog comes from
// /backend-api/models on a logged-in account; "gpt-5-4-t-mini" is ChatGPT's
// abbreviated slug for "GPT-5.4 Thinking Mini".
export const MODEL_MAP: Record<string, string> = {
  "gpt-5.3-instant": "gpt-5-3-instant",
  "gpt-5.3": "gpt-5-3",
  "gpt-5.3-mini": "gpt-5-3-mini",
  "gpt-5.5-thinking": "gpt-5-5-thinking",
  "gpt-5.4-thinking": "gpt-5-4-thinking",
  "gpt-5.4-thinking-mini": "gpt-5-4-t-mini",
  "gpt-5.2-instant": "gpt-5-2-instant",
  "gpt-5.2": "gpt-5-2",
  "gpt-5.2-thinking": "gpt-5-2-thinking",
  "gpt-5.1": "gpt-5-1",
  "gpt-5": "gpt-5",
  "gpt-5-mini": "gpt-5-mini",
  o3: "o3",
};

/** Set of chatgpt.com slugs that the user_last_used_model_config endpoint
 * accepts a `thinking_effort` value for, derived from MODEL_MAP so adding a
 * new thinking entry there automatically extends this set. Includes the
 * abbreviated slug `gpt-5-4-t-mini` (no literal "thinking" substring) — the
 * reason this set exists at all rather than a substring match.
 *
 * Derived from MODEL_MAP keys (always dot-form) that contain "thinking" or
 * are the `o3` reasoning model; the values are the chatgpt.com-side slugs. */
export const THINKING_CAPABLE_SLUGS: ReadonlySet<string> = new Set(
  Object.entries(MODEL_MAP)
    .filter(([k]) => k.includes("thinking") || k === "o3")
    .map(([, v]) => v)
);

// ─── Browser-like default headers ──────────────────────────────────────────

export function browserHeaders(): Record<string, string> {
  return {
    Accept: "*/*",
    "Accept-Language": "en-US,en;q=0.9",
    "Cache-Control": "no-cache",
    Origin: CHATGPT_BASE,
    Pragma: "no-cache",
    Referer: `${CHATGPT_BASE}/`,
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": CHATGPT_USER_AGENT,
  };
}

/** Headers ChatGPT's web client sends on backend-api requests. */
export function oaiHeaders(sessionId: string, deviceId: string): Record<string, string> {
  return {
    "OAI-Language": "en-US",
    "OAI-Device-Id": deviceId,
    "OAI-Client-Version": OAI_CLIENT_VERSION,
    "OAI-Client-Build-Number": OAI_CLIENT_BUILD_NUMBER,
    "OAI-Session-Id": sessionId,
  };
}

// Strip ChatGPT's internal entity markup. The browser renders these as proper
// inline citations / chips via JS; for a plain text completion we just want
// the human-readable form.
//   entity["city","Paris","capital of France"]  →  Paris
//   entity["…","value", …]                       →  value
export const ENTITY_RE = /entity\["[^"]*","([^"]*)"[^\]]*\]/g;

// Test-only: clear caches between tests
export function __resetChatGptWebCachesForTesting(): void {
  tokenCache.clear();
  warmupCache.clear();
  thinkingEffortCache.clear();
  deviceIdCache.clear();
  __resetChatGptImageCacheForTesting();
  resetDplCache();
}