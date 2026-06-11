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

import { ChatGptStreamEvent, extractImagePointers } from "./sse.ts";
import { CHATGPT_BASE, browserHeaders, oaiHeaders } from "./constants.ts";
import { buildSessionCookieHeader } from "./session.ts";

export interface ImagePointerRef {
  pointer: string;
  messageId?: string;
}

/**
 * Resolves a ChatGPT asset_pointer to a downloadable URL, given the live
 * conversation_id (needed for sediment:// pointers). Returns null on failure
 * so the caller can decide whether to surface a placeholder or skip silently.
 */
export type ImageResolver = (
  assetPointer: string,
  conversationId: string | null,
  parentMessageId?: string | null
) => Promise<string | null>;

/** Build the final markdown block for a list of resolved image URLs. */
export function imageMarkdown(urls: string[]): string {
  if (urls.length === 0) return "";
  // Two leading newlines → ensure separation from any prior text the model
  // produced ("Here is your kitten:\n\n![image](...)"). One image per line.
  return "\n\n" + urls.map((u) => `![image](${u})`).join("\n\n");
}

async export function resolveImagePointers(
  pointers: ImagePointerRef[] | undefined,
  conversationId: string | null,
  resolver: ImageResolver | null,
  log?: { warn?: (tag: string, msg: string) => void } | null,
  fallbackParentMessageId?: string | null
): Promise<string[]> {
  if (!pointers || pointers.length === 0 || !resolver) return [];
  const urls: string[] = [];
  for (const ref of pointers) {
    try {
      const url = await resolver(
        ref.pointer,
        conversationId,
        ref.messageId ?? fallbackParentMessageId
      );
      if (url) urls.push(url);
    } catch (err) {
      log?.warn?.(
        "CGPT-WEB",
        `Image resolve failed (${ref.pointer}): ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
  return urls;
}

// ─── Image asset resolution ────────────────────────────────────────────────
// ChatGPT's image_gen tool emits `image_asset_pointer` parts whose
// `asset_pointer` is one of:
//
//   file-service://file-XXXX        → resolved via /backend-api/files/{id}/download
//   sediment://file-XXXX            → resolved via /backend-api/conversation/{conv_id}/attachment/{id}/download
//
// Both endpoints return JSON `{ download_url: "<azure-blob-sas-url>", ... }`.
// The signed URL has a limited lifetime (typically a few hours), but that's
// usually sufficient for the user to view the image in their UI right after
// generation. Persistent storage can be layered on later if needed.

export const FILE_SERVICE_PREFIX = "file-service://";

export const SEDIMENT_PREFIX = "sediment://";

export interface ResolverContext {
  accessToken: string;
  accountId: string | null;
  sessionId: string;
  deviceId: string;
  cookie: string;
  signal?: AbortSignal | null;
  log?: { debug?: (tag: string, msg: string) => void; warn?: (tag: string, msg: string) => void };
  /**
   * Absolute base URL that downstream clients should use to fetch cached
   * images served by /v1/chatgpt-web/image/<id>. Derived from the inbound
   * request host so the URL is reachable from whatever network the client
   * came in on (localhost, Tailscale, cloudflared tunnel, etc.).
   */
  publicBaseUrl: string;
}

async export function fetchDownloadUrl(endpoint: string, ctx: ResolverContext): Promise<string | null> {
  const headers: Record<string, string> = {
    ...browserHeaders(),
    ...oaiHeaders(ctx.sessionId, ctx.deviceId),
    Accept: "application/json",
    Authorization: `Bearer ${ctx.accessToken}`,
    Cookie: buildSessionCookieHeader(ctx.cookie),
  };
  if (ctx.accountId) headers["chatgpt-account-id"] = ctx.accountId;

  const response = await tlsFetchChatGpt(endpoint, {
    method: "GET",
    headers,
    timeoutMs: 30_000,
    signal: ctx.signal,
  });
  if (response.status !== 200) {
    ctx.log?.warn?.(
      "CGPT-WEB",
      `Image download URL fetch failed (${response.status}) for ${endpoint}`
    );
    return null;
  }
  let parsed: { download_url?: string } = {};
  try {
    parsed = JSON.parse(response.text || "{}");
  } catch {
    console.warn("[chatgpt-web] image download URL parse failed");
    return null;
  }
  return parsed.download_url ?? null;
}

/**
 * Download a chatgpt.com signed image URL and re-serve it from OmniRoute's
 * short-lived image cache. The URLs returned by /files/<id>/download and
 * /conversation/<cid>/attachment/<fid>/download point at chatgpt.com's
 * estuary endpoint, which 403s for any request without the user's session
 * cookie. Downstream clients (Open WebUI, OpenAI-compatible apps) won't
 * have those cookies, so we download once via the authenticated TLS client
 * and return a browser-fetchable OmniRoute URL.
 */
export const IMAGE_DOWNLOAD_MAX_BYTES = 8 * 1024 * 1024;

async export function imageUrlToCachedImageUrl(
  signedUrl: string,
  ctx: ResolverContext,
  imageContext?: ChatGptImageConversationContext
): Promise<string | null> {
  const headers: Record<string, string> = {
    ...browserHeaders(),
    Accept: "image/*,*/*;q=0.8",
    Authorization: `Bearer ${ctx.accessToken}`,
    Cookie: buildSessionCookieHeader(ctx.cookie),
  };
  if (ctx.accountId) headers["chatgpt-account-id"] = ctx.accountId;

  let response: TlsFetchResult;
  try {
    response = await tlsFetchChatGpt(signedUrl, {
      method: "GET",
      headers,
      timeoutMs: 60_000,
      signal: ctx.signal,
      // Required for binary payloads — the underlying tls-client returns
      // bytes as a `data:<mime>;base64,...` string when this is true.
      // Without it, raw image bytes get mangled by UTF-8 decoding.
      byteResponse: true,
    });
  } catch (err) {
    ctx.log?.warn?.(
      "CGPT-WEB",
      `Image fetch failed: ${err instanceof Error ? err.message : String(err)}`
    );
    return null;
  }

  if (response.status !== 200) {
    ctx.log?.warn?.(
      "CGPT-WEB",
      `Image fetch returned HTTP ${response.status} (${(response.text || "").slice(0, 120)})`
    );
    return null;
  }

  if (response.text == null || response.text.length === 0) return null;

  // tls-client-node already returns binary bodies as a "data:<mime>;base64,..."
  // string (see node_modules/tls-client-node/dist/response.js — its bytes()
  // method splits on the comma to extract base64). Decode back into bytes
  // so we can hand them to the cache.
  let bytes: Buffer;
  let mime: string;
  if (/^data:[^;]{1,256};base64,/.test(response.text)) {
    const commaIdx = response.text.indexOf(",");
    const header = response.text.slice(5, commaIdx); // strip "data:"
    mime = header.split(";")[0] || "image/png";
    bytes = Buffer.from(response.text.slice(commaIdx + 1), "base64");
  } else {
    // Plain-text body (shouldn't happen for binary downloads with
    // byteResponse:true, but handle defensively).
    bytes = Buffer.from(response.text, "binary");
    mime = response.headers.get("content-type")?.split(";")[0]?.trim() || "image/png";
  }
  if (bytes.length === 0 || bytes.length > IMAGE_DOWNLOAD_MAX_BYTES) {
    if (bytes.length > IMAGE_DOWNLOAD_MAX_BYTES) {
      ctx.log?.warn?.(
        "CGPT-WEB",
        `Image too large to cache (${bytes.length} bytes > ${IMAGE_DOWNLOAD_MAX_BYTES}); skipping`
      );
    }
    return null;
  }
  // Cache the image and return a stable HTTP URL pointing at our own
  // /v1/chatgpt-web/image/<id> route. Streaming the raw base64 back via
  // SSE deltas works but Open WebUI's progressive markdown renderer shows
  // each chunk as plain text mid-stream — the user sees megabytes of
  // base64 scroll past before the image renders. URL-based delivery
  // produces a small markdown delta and renders instantly when the
  // browser fetches the URL.
  const id = storeChatGptImage(bytes, mime, undefined, imageContext);
  return `${ctx.publicBaseUrl}/v1/chatgpt-web/image/${id}`;
}

/**
 * Resolve the async image_gen result by registering a WebSocket with
 * chatgpt.com and listening for the image_asset_pointer.
 *
 * Background: when chatgpt.com is busy ("Lots of people are creating images
 * right now") the image_gen tool defers — the initial SSE finishes with a
 * "Processing image..." placeholder and the real image arrives over a
 * WebSocket pubsub. (We checked: the conversation tree at
 * `/backend-api/conversation/{id}` is NOT updated when the image lands, so
 * polling that endpoint does nothing.)
 *
 * Flow:
 *   1. POST /backend-api/register-websocket → { wss_url, expires_at, ... }
 *   2. Open the wss_url with the standard WebSocket client.
 *      Auth lives in the URL (signed access token), so we don't need the
 *      TLS-impersonation transport here.
 *   3. Each WS message is JSON like { type: "wss-message", data: { ...
 *      conversation event ... } }. The conversation event has the same
 *      shape as the SSE events from /backend-api/f/conversation.
 *   4. Watch for assistant messages with multimodal_text + image_asset_pointer
 *      OR a `message_stream_complete` for the conversation. Resolve when
 *      either pointer arrives or the timeout fires.
 */
async export function registerWebSocket(ctx: ResolverContext): Promise<string | null> {
  // chatgpt.com migrated from POST /backend-api/register-websocket to a
  // GET-only endpoint under /backend-api/celsius/ws/user. The response shape
  // also changed from `{ wss_url }` → `{ websocket_url }`. Newer codebases
  // (g4f, etc.) all hit the celsius path; the legacy path now 404s.
  // Keep the legacy path as a fallback for older deployments.
  const candidates = [
    { url: `${CHATGPT_BASE}/backend-api/celsius/ws/user`, method: "GET" as const },
    { url: `${CHATGPT_BASE}/backend-api/register-websocket`, method: "POST" as const },
  ];
  const headers: Record<string, string> = {
    ...browserHeaders(),
    ...oaiHeaders(ctx.sessionId, ctx.deviceId),
    Accept: "application/json",
    Authorization: `Bearer ${ctx.accessToken}`,
    Cookie: buildSessionCookieHeader(ctx.cookie),
  };
  if (ctx.accountId) headers["chatgpt-account-id"] = ctx.accountId;

  for (const { url, method } of candidates) {
    let r: TlsFetchResult;
    try {
      r = await tlsFetchChatGpt(url, {
        method,
        headers,
        body: method === "POST" ? "" : undefined,
        timeoutMs: 30_000,
        signal: ctx.signal,
      });
    } catch (err) {
      ctx.log?.warn?.(
        "CGPT-WEB",
        `register-websocket fetch failed for ${url}: ${err instanceof Error ? err.message : String(err)}`
      );
      continue;
    }
    if (r.status === 200) {
      try {
        const data = JSON.parse(r.text || "{}") as {
          websocket_url?: string;
          wss_url?: string;
        };
        const ws = data.websocket_url ?? data.wss_url;
        if (ws) {
          ctx.log?.debug?.("CGPT-WEB", `Got WebSocket URL via ${url}`);
          return ws;
        }
      } catch {
        console.warn("[chatgpt-web] WebSocket URL parse failed, falling through");
        /* fall through */
      }
    }
    ctx.log?.warn?.(
      "CGPT-WEB",
      `register-websocket via ${url} → ${r.status}: ${(r.text || "").slice(0, 200)}`
    );
  }
  return null;
}

export interface WsWaitOutcome {
  pointers: ImagePointerRef[];
  /** True if the connection emitted an error event. Used by the retry layer
   *  to decide whether a transport blip is worth a second attempt. */
  errored: boolean;
  /** True if any frame (message or open) was actually received from the
   *  server. A retry is most valuable when the connection died before
   *  exchanging any data. */
  gotAnyMessage: boolean;
}

async export function waitForImageViaWebSocket(
  wssUrl: string,
  conversationId: string,
  timeoutMs: number,
  ctx: ResolverContext
): Promise<WsWaitOutcome> {
  return new Promise((resolve) => {
    const found = new Map<string, ImagePointerRef>();
    let resolved = false;
    let errored = false;
    let gotAnyMessage = false;
    const finish = () => {
      if (resolved) return;
      resolved = true;
      try {
        ws.close();
      } catch {
        console.warn("[chatgpt-web] ws.close failed");
        /* ignore */
      }
      resolve({
        pointers: Array.from(found.values()),
        errored,
        gotAnyMessage,
      });
    };
    const ws = new WebSocket(wssUrl);
    const timer = setTimeout(() => {
      ctx.log?.warn?.("CGPT-WEB", `WebSocket image wait timed out after ${timeoutMs}ms`);
      finish();
    }, timeoutMs);
    const onAbort = () => {
      ctx.log?.debug?.("CGPT-WEB", "WebSocket aborted by client");
      finish();
    };
    ctx.signal?.addEventListener?.("abort", onAbort);
    ws.onopen = () => {
      gotAnyMessage = true;
      ctx.log?.debug?.("CGPT-WEB", "WebSocket open — waiting for image events");
    };
    ws.onerror = (e) => {
      errored = true;
      ctx.log?.warn?.("CGPT-WEB", `WebSocket error: ${(e as ErrorEvent).message ?? "unknown"}`);
    };
    ws.onclose = () => {
      clearTimeout(timer);
      ctx.signal?.removeEventListener?.("abort", onAbort);
      finish();
    };
    ws.onmessage = (event) => {
      gotAnyMessage = true;
      let payload: unknown;
      const raw = typeof event.data === "string" ? event.data : event.data.toString();
      try {
        payload = JSON.parse(raw);
      } catch {
        console.warn("[chatgpt-web] WebSocket event JSON parse failed");
        return;
      }
      // chatgpt.com's celsius WS frames look like:
      //   { type: "conversation-update",
      //     payload: { conversation_id: "...",
      //                update_content: { message: { ... }, ... } } }
      // Older deployments wrapped the conversation event directly as { data }.
      const obj = payload as Record<string, unknown>;
      const candidates: ChatGptStreamEvent[] = [];
      const innerPayload = obj.payload as Record<string, unknown> | undefined;
      const updateContent = innerPayload?.update_content as Record<string, unknown> | undefined;
      if (updateContent?.message) {
        candidates.push({
          message: updateContent.message as ChatGptStreamEvent["message"],
          conversation_id: innerPayload?.conversation_id as string | undefined,
        });
      }
      if (innerPayload?.message) {
        candidates.push({
          message: innerPayload.message as ChatGptStreamEvent["message"],
          conversation_id: innerPayload.conversation_id as string | undefined,
        });
      }
      if ((obj.data as { message?: unknown } | undefined)?.message) {
        candidates.push(obj.data as ChatGptStreamEvent);
      }

      for (const data of candidates) {
        if (data?.conversation_id && data.conversation_id !== conversationId) continue;
        const m = data?.message;
        // The async image_gen result arrives as a TOOL-role message
        // ({"author":{"role":"tool","name":"t2uay3k.sj1i4kz"}}), so we
        // accept tool messages here too — extractImagePointers does the
        // actual content_type filtering.
        if (Array.isArray(m?.content?.parts)) {
          for (const ptr of extractImagePointers(m.content?.parts ?? [])) {
            const existing = found.get(ptr);
            found.set(
              ptr,
              existing?.messageId
                ? existing
                : { pointer: ptr, ...(m?.id ? { messageId: m.id } : {}) }
            );
          }
        }
        if (m?.metadata && typeof m.metadata === "object") {
          const md = m.metadata as Record<string, unknown>;
          const ptr = (md.asset_pointer ?? md.image_asset_pointer) as string | undefined;
          if (typeof ptr === "string") {
            const existing = found.get(ptr);
            found.set(
              ptr,
              existing?.messageId
                ? existing
                : { pointer: ptr, ...(m?.id ? { messageId: m.id } : {}) }
            );
          }
        }
      }
      if (found.size > 0) finish();
    };
  });
}

// Default 3-minute wait for the async image_gen tool to produce an image
// pointer over the celsius WebSocket. Tunable so deployments can stretch
// during chatgpt.com queue-deep windows ("Lots of people are creating
// images right now") without code changes.
export const DEFAULT_ASYNC_IMAGE_TIMEOUT_MS = 180_000;

export function configuredAsyncImageTimeoutMs(): number {
  const raw = Number(process.env.OMNIROUTE_CGPT_WEB_IMAGE_TIMEOUT_MS);
  if (!Number.isFinite(raw) || raw <= 0) return DEFAULT_ASYNC_IMAGE_TIMEOUT_MS;
  return Math.floor(raw);
}

async export function pollForAsyncImage(
  conversationId: string,
  ctx: ResolverContext,
  opts: { timeoutMs?: number } = {}
): Promise<ImagePointerRef[]> {
  const totalTimeoutMs = opts.timeoutMs ?? configuredAsyncImageTimeoutMs();
  const deadline = Date.now() + totalTimeoutMs;

  // One reconnect attempt on transport error: the WS endpoint is signed and
  // short-lived, and a network blip during the long wait would otherwise
  // lose the image entirely. The deadline is shared across attempts so we
  // never exceed the caller's budget.
  for (let attempt = 0; attempt < 2; attempt++) {
    const remaining = deadline - Date.now();
    if (remaining <= 0) break;
    const wssUrl = await registerWebSocket(ctx);
    if (!wssUrl) {
      ctx.log?.warn?.(
        "CGPT-WEB",
        attempt === 0
          ? "Could not register WebSocket — async image gen not retrievable"
          : `WebSocket re-registration failed on retry attempt ${attempt + 1}`
      );
      if (attempt === 0) continue; // try again — registration can be flaky
      return [];
    }
    ctx.log?.debug?.(
      "CGPT-WEB",
      `Registered WebSocket for async image (attempt ${attempt + 1}, ${remaining}ms remaining)`
    );
    const outcome = await waitForImageViaWebSocket(wssUrl, conversationId, remaining, ctx);
    if (outcome.pointers.length > 0) return outcome.pointers;
    if (ctx.signal?.aborted) return [];
    // Only retry when the connection died before producing anything useful.
    // A clean close with no pointers (e.g., upstream cancellation) shouldn't
    // burn a second attempt — the result would be the same.
    if (!outcome.errored || outcome.gotAnyMessage) return [];
    ctx.log?.warn?.(
      "CGPT-WEB",
      `WebSocket attempt ${attempt + 1} ended in transport error before any frame; retrying`
    );
  }
  return [];
}

export function makeImageResolver(ctx: ResolverContext): ImageResolver {
  // Cache resolutions across the same request — the same pointer can show up
  // on multiple SSE events (in-progress + finished_successfully). One HTTP
  // round-trip per unique pointer is enough.
  const cache = new Map<string, string | null>();

  return async (assetPointer, conversationId, parentMessageId) => {
    if (cache.has(assetPointer)) return cache.get(assetPointer) ?? null;

    let fileId: string | null = null;
    if (assetPointer.startsWith(FILE_SERVICE_PREFIX)) {
      fileId = assetPointer.slice(FILE_SERVICE_PREFIX.length);
    } else if (assetPointer.startsWith(SEDIMENT_PREFIX)) {
      fileId = assetPointer.slice(SEDIMENT_PREFIX.length);
    } else {
      ctx.log?.warn?.("CGPT-WEB", `Unknown asset_pointer scheme: ${assetPointer}`);
    }

    let signedUrl: string | null = null;
    if (fileId) {
      // Both endpoints return a chatgpt.com estuary URL signed for the
      // user's current session — that URL 403s without the cookie, so
      // downstream clients can't fetch it directly. We download once via
      // the authenticated TLS client and expose the bytes through
      // OmniRoute's short-lived image cache.
      //
      // /files/{id}/download is the historical path. It works for
      // chat-uploaded files and the older image_gen output format
      // (`file-XXXX`). Newer image-edit results from continued
      // conversations land with a `file_00000000XXXX` shape that 422s on
      // /files/{id}/download — they're conversation-scoped attachments
      // and only resolve through /conversation/{cid}/attachment/{fid}/
      // download. We try /files first because it's cheaper and works for
      // the common case, then fall through.
      signedUrl = await fetchDownloadUrl(
        `${CHATGPT_BASE}/backend-api/files/${encodeURIComponent(fileId)}/download`,
        ctx
      );
      if (!signedUrl && conversationId) {
        signedUrl = await fetchDownloadUrl(
          `${CHATGPT_BASE}/backend-api/conversation/${encodeURIComponent(conversationId)}/attachment/${encodeURIComponent(fileId)}/download`,
          ctx
        );
      }
    }

    let finalUrl: string | null = null;
    if (signedUrl) {
      // chatgpt.com signed URLs require the user's session cookie to fetch,
      // so we materialize the bytes into our own cache and emit an OmniRoute
      // URL. If that fails (oversize, network error, etc.) we return null —
      // never the signed URL — because handing it back would emit broken
      // markdown that 403s for the client. Better to drop the image silently
      // than render a broken link.
      finalUrl = await imageUrlToCachedImageUrl(
        signedUrl,
        ctx,
        conversationId && parentMessageId ? { conversationId, parentMessageId } : undefined
      );
    }
    cache.set(assetPointer, finalUrl);
    if (finalUrl) {
      const preview = finalUrl.startsWith("data:")
        ? `data:... (${finalUrl.length} chars)`
        : finalUrl.slice(0, 80) + "...";
      ctx.log?.debug?.("CGPT-WEB", `Resolved ${assetPointer} → ${preview}`);
    }
    return finalUrl;
  };
}