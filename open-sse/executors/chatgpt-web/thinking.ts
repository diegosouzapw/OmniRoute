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

import { CHATGPT_BASE, MODEL_MAP, THINKING_CAPABLE_SLUGS, browserHeaders, oaiHeaders } from "./constants.ts";
import { cookieKey, buildSessionCookieHeader } from "./session.ts";

export const USER_LAST_USED_MODEL_CONFIG_URL = `${CHATGPT_BASE}/backend-api/settings/user_last_used_model_config`;

// ─── Thinking-effort preference (PATCH user_last_used_model_config) ────────
// chatgpt.com has two thinking levels for its dedicated thinking-models:
//   • standard — default, faster
//   • extended — longer reasoning budget
// The browser sets the level by PATCHing `/backend-api/settings/user_last_used_model_config`
// once, then issues the conversation request — the conversation endpoint itself
// has no `thinking_effort` field; the server reads the user's stored preference
// at routing time. We mirror that handshake when an OpenAI-style request
// includes `reasoning_effort` (or a direct `providerSpecificData.thinkingEffort`
// override).
//
// Cached per (cookie, slug, effort): the preference persists server-side, so
// re-PATCHing the same combination is wasted bytes. Refreshed on TTL expiry or
// whenever the caller switches efforts.

export const thinkingEffortCache = new Map<string, number>();

export const THINKING_EFFORT_TTL_MS = 5 * 60 * 1000;

export const THINKING_EFFORT_CACHE_MAX = 400;

/** chatgpt.com only exposes the thinking-effort toggle on dedicated thinking
 * models and the o-series. PATCHing for a non-thinking surface is a no-op
 * (the server accepts it but the routing-time read picks the wrong knob).
 *
 * Three branches because the input can arrive in three shapes:
 *   1. OmniRoute dot-form id (`gpt-5.4-thinking-mini`) — every thinking
 *      variant carries the literal "thinking" substring here.
 *   2. Resolved chatgpt.com slug containing "thinking" (`gpt-5-5-thinking`).
 *   3. Resolved chatgpt.com slug that drops the substring under abbreviation
 *      (`gpt-5-4-t-mini`). Looked up via THINKING_CAPABLE_SLUGS, which is
 *      derived from MODEL_MAP itself so adding a new abbreviated thinking
 *      mapping automatically extends the check.
 *
 * Branch 3 also catches the case where a caller passes the chatgpt.com slug
 * directly as the `model` field (no MODEL_MAP translation needed), which
 * would otherwise silently bypass the PATCH. */
export function isThinkingCapableModel(modelId: string, slug: string): boolean {
  return (
    modelId.includes("thinking") ||
    modelId === "o3" ||
    slug.includes("thinking") ||
    THINKING_CAPABLE_SLUGS.has(slug) ||
    THINKING_CAPABLE_SLUGS.has(modelId)
  );
}

/** Map either a chatgpt.com-native value (`standard`/`extended`) or the
 * OpenAI Chat Completions `reasoning_effort` field to the value the
 * `user_last_used_model_config` endpoint expects.
 *
 *   minimal | low | medium | standard  → standard
 *   high    | xhigh | extended         → extended
 *
 * `medium` collapses to `standard` because chatgpt.com only has two levels —
 * there is no separate medium tier on the web product. Returns null for
 * absent/unknown inputs. */
export function normalizeThinkingEffort(input: unknown): "standard" | "extended" | null {
  if (typeof input !== "string") return null;
  const v = input.trim().toLowerCase();
  if (v === "extended" || v === "high" || v === "xhigh") return "extended";
  if (v === "standard" || v === "low" || v === "medium" || v === "minimal") {
    return "standard";
  }
  return null;
}

/** Resolve the requested effort for this turn.
 * Order: `providerSpecificData.thinkingEffort` (raw override, takes
 * `standard`/`extended` directly) > `body.reasoning_effort` (top-level OpenAI
 * Chat Completions field) > `body.reasoning.effort` (Responses-API nesting).
 * Returns null when the caller did not request one. */
export function resolveThinkingEffort(
  body: unknown,
  providerSpecificData: Record<string, unknown> | undefined
): "standard" | "extended" | null {
  if (providerSpecificData && providerSpecificData.thinkingEffort !== undefined) {
    return normalizeThinkingEffort(providerSpecificData.thinkingEffort);
  }
  const b = (body as Record<string, unknown> | null) ?? null;
  if (!b) return null;
  const top = normalizeThinkingEffort(b.reasoning_effort);
  if (top) return top;
  const nested = (b.reasoning as Record<string, unknown> | undefined)?.effort;
  return normalizeThinkingEffort(nested);
}

async export function setUserThinkingEffort(
  modelSlug: string,
  effort: "standard" | "extended",
  accessToken: string,
  accountId: string | null,
  sessionId: string,
  deviceId: string,
  cookie: string,
  signal: AbortSignal | null | undefined,
  log:
    | {
        debug?: (tag: string, msg: string) => void;
        warn?: (tag: string, msg: string) => void;
      }
    | null
    | undefined
): Promise<void> {
  const cacheKey = `${cookieKey(cookie)}:${modelSlug}:${effort}`;
  const now = Date.now();
  const last = thinkingEffortCache.get(cacheKey);
  if (last && now - last < THINKING_EFFORT_TTL_MS) {
    log?.debug?.("CGPT-WEB", `thinking_effort cached (${modelSlug}=${effort}) — skip PATCH`);
    return;
  }
  if (thinkingEffortCache.size >= THINKING_EFFORT_CACHE_MAX && !thinkingEffortCache.has(cacheKey)) {
    const first = thinkingEffortCache.keys().next().value;
    if (first) thinkingEffortCache.delete(first);
  }

  const url =
    `${USER_LAST_USED_MODEL_CONFIG_URL}` +
    `?model_slug=${encodeURIComponent(modelSlug)}` +
    `&thinking_effort=${encodeURIComponent(effort)}`;
  const headers: Record<string, string> = {
    ...browserHeaders(),
    ...oaiHeaders(sessionId, deviceId),
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
    Cookie: buildSessionCookieHeader(cookie),
    Priority: "u=4",
  };
  if (accountId) headers["chatgpt-account-id"] = accountId;

  try {
    const r = await tlsFetchChatGpt(url, {
      method: "PATCH",
      headers,
      timeoutMs: 15_000,
      signal,
    });
    if (r.status >= 400) {
      log?.warn?.(
        "CGPT-WEB",
        `thinking_effort PATCH ${r.status} for ${modelSlug}=${effort} (continuing)`
      );
      return;
    }
    thinkingEffortCache.set(cacheKey, now);
    log?.debug?.("CGPT-WEB", `thinking_effort PATCH OK (${modelSlug}=${effort})`);
  } catch (err) {
    log?.warn?.(
      "CGPT-WEB",
      `thinking_effort PATCH failed: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}