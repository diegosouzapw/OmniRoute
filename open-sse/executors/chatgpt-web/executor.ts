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

import { isThinkingCapableModel, resolveThinkingEffort, setUserThinkingEffort } from "./thinking.ts";
import { parseOpenAIMessages, looksLikeImageGenRequest, looksLikeImageEditRequest, buildConversationBody } from "./messages.ts";
import { ResolverContext, pollForAsyncImage, makeImageResolver } from "./images.ts";
import { CHATGPT_BASE, SESSION_URL, CONV_URL, CHATGPT_USER_AGENT, OAI_CLIENT_VERSION, deviceIdFor, MODEL_MAP, browserHeaders, oaiHeaders } from "./constants.ts";
import { buildStreamingResponse, buildNonStreamingResponse, errorResponse } from "./responses.ts";
import { TokenEntry, tokenCache, cookieKey, buildSessionCookieHeader, exchangeSession, SessionAuthError } from "./session.ts";
import { runSessionWarmup } from "./warmup.ts";
import { derivePublicBaseUrl, stringToStream } from "./utils.ts";
import { SENTINEL_PREPARE_URL, ChatRequirements, prepareChatRequirements, SentinelBlockedError, fetchDpl, randomHex, buildPrekeyConfig, solveProofOfWork } from "./sentinel.ts";

// ─── Executor ───────────────────────────────────────────────────────────────

export class ChatGptWebExecutor extends BaseExecutor {
  constructor() {
    super("chatgpt-web", { id: "chatgpt-web", baseUrl: CONV_URL });
  }

  async execute({
    model,
    body,
    stream,
    credentials,
    signal,
    log,
    onCredentialsRefreshed,
    clientHeaders,
  }: ExecuteInput) {
    const messages = (body as Record<string, unknown> | null)?.messages as
      | Array<Record<string, unknown>>
      | undefined;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        response: errorResponse(400, "Missing or empty messages array"),
        url: CONV_URL,
        headers: {},
        transformedBody: body,
      };
    }

    if (!credentials.apiKey) {
      return {
        response: errorResponse(
          401,
          "ChatGPT auth failed — paste your __Secure-next-auth.session-token cookie value."
        ),
        url: CONV_URL,
        headers: {},
        transformedBody: body,
      };
    }

    // Pass the user's pasted cookie blob through to exchangeSession; the helper
    // accepts bare values, unchunked cookies, chunked (.0/.1) cookies, and full
    // "Cookie: ..." DevTools lines.
    const cookie = credentials.apiKey;

    // 1. Token exchange
    let tokenEntry: TokenEntry;
    try {
      tokenEntry = await exchangeSession(cookie, signal);
    } catch (err) {
      if (err instanceof SessionAuthError) {
        log?.warn?.("CGPT-WEB", err.message);
        return {
          response: errorResponse(
            401,
            "ChatGPT auth failed — re-paste your __Secure-next-auth.session-token cookie from chatgpt.com.",
            "HTTP_401"
          ),
          url: SESSION_URL,
          headers: {},
          transformedBody: body,
        };
      }
      log?.error?.(
        "CGPT-WEB",
        `Session exchange failed: ${err instanceof Error ? err.message : String(err)}`
      );
      return {
        response: errorResponse(
          502,
          `ChatGPT session exchange failed: ${err instanceof Error ? err.message : String(err)}`
        ),
        url: SESSION_URL,
        headers: {},
        transformedBody: body,
      };
    }

    // Surface any rotated cookie back to the caller so the DB credential is refreshed.
    if (tokenEntry.refreshedCookie && tokenEntry.refreshedCookie !== cookie) {
      const updated: ProviderCredentials = { ...credentials, apiKey: tokenEntry.refreshedCookie };
      try {
        await onCredentialsRefreshed?.(updated);
      } catch (err) {
        log?.warn?.(
          "CGPT-WEB",
          `Failed to persist refreshed cookie: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }

    // 2a. Warmup — GET / to scrape DPL + script src so the prekey looks legit.
    let dplInfo: { dpl: string; scriptSrc: string };
    try {
      dplInfo = await fetchDpl(cookie, signal);
    } catch (err) {
      log?.warn?.(
        "CGPT-WEB",
        `DPL warmup failed (continuing with fallback): ${err instanceof Error ? err.message : String(err)}`
      );
      dplInfo = {
        dpl: `dpl=${OAI_CLIENT_VERSION.replace(/^prod-/, "")}`,
        scriptSrc: `${CHATGPT_BASE}/_next/static/chunks/webpack-${randomHex(16)}.js`,
      };
    }

    // 2a'. Browser-like session warmup. Sentinel scores the session by whether
    // the client recently hit /me, /conversations, /models — same as a real
    // browser does on page load. Failures here are non-fatal; the worst case
    // is Sentinel still escalates to Turnstile.
    const sessionId = randomUUID();
    const deviceId = deviceIdFor(cookie);
    await runSessionWarmup(
      tokenEntry.accessToken,
      tokenEntry.accountId,
      sessionId,
      deviceId,
      cookie,
      signal,
      log
    );

    // 2a''. Apply thinking_effort preference for thinking-capable models.
    // Mirrors what chatgpt.com's web UI does when the user toggles the
    // "Standard"/"Extended" thinking switch — PATCH the user-config endpoint
    // before issuing the conversation. The conversation request itself has
    // no `thinking_effort` field; the server reads the stored preference at
    // routing time. Best-effort: a failed PATCH falls back to whatever the
    // account's current preference is.
    const earlyModelSlug = MODEL_MAP[model] ?? model;
    const requestedEffort = resolveThinkingEffort(body, credentials.providerSpecificData);
    if (requestedEffort && isThinkingCapableModel(model, earlyModelSlug)) {
      await setUserThinkingEffort(
        earlyModelSlug,
        requestedEffort,
        tokenEntry.accessToken,
        tokenEntry.accountId,
        sessionId,
        deviceId,
        cookie,
        signal,
        log
      );
    }

    // 2b. Sentinel chat-requirements
    let reqs: ChatRequirements;
    try {
      reqs = await prepareChatRequirements(
        tokenEntry.accessToken,
        tokenEntry.accountId,
        sessionId,
        deviceId,
        cookie,
        dplInfo,
        signal,
        log
      );
    } catch (err) {
      if (err instanceof SentinelBlockedError) {
        log?.warn?.("CGPT-WEB", err.message);
        return {
          response: errorResponse(
            403,
            "ChatGPT blocked the request (Sentinel/Turnstile required). Try again later or open chatgpt.com in a browser to refresh state.",
            "SENTINEL_BLOCKED"
          ),
          url: SENTINEL_PREPARE_URL,
          headers: {},
          transformedBody: body,
        };
      }
      log?.error?.(
        "CGPT-WEB",
        `Sentinel failed: ${err instanceof Error ? err.message : String(err)}`
      );
      return {
        response: errorResponse(
          502,
          `ChatGPT sentinel failed: ${err instanceof Error ? err.message : String(err)}`
        ),
        url: SENTINEL_PREPARE_URL,
        headers: {},
        transformedBody: body,
      };
    }

    log?.debug?.(
      "CGPT-WEB",
      `sentinel: token=${reqs.token ? "y" : "n"} pow=${reqs.proofofwork?.required ? "y" : "n"} turnstile=${reqs.turnstile?.required ? "y" : "n"}`
    );

    // Optional: if a turnstile token was supplied via providerSpecificData,
    // pass it through. Otherwise, send the request anyway — sometimes Sentinel
    // reports turnstile.required even when the conversation endpoint accepts
    // requests without it.
    const turnstileToken =
      typeof credentials.providerSpecificData?.turnstileToken === "string"
        ? credentials.providerSpecificData.turnstileToken
        : null;

    // 3. Solve PoW (if required) — reuses the same browser-fingerprint config
    // shape as the prekey, just with the server-provided seed + difficulty.
    let proofToken: string | null = null;
    if (reqs.proofofwork?.required && reqs.proofofwork.seed && reqs.proofofwork.difficulty) {
      const powConfig = buildPrekeyConfig(CHATGPT_USER_AGENT, dplInfo.dpl, dplInfo.scriptSrc);
      proofToken = await solveProofOfWork(
        reqs.proofofwork.seed,
        reqs.proofofwork.difficulty,
        powConfig,
        log
      );
    }

    // 4. Build conversation request
    const parsed = parseOpenAIMessages(messages);
    if (!parsed.currentMsg.trim() && parsed.history.length === 0) {
      return {
        response: errorResponse(400, "Empty user message"),
        url: CONV_URL,
        headers: {},
        transformedBody: body,
      };
    }

    // Toggle Temporary Chat off only for image-generation requests, since
    // Temporary Chat disables the image_gen tool. For plain text turns we
    // keep Temporary Chat on so the user's chatgpt.com history isn't
    // polluted with router traffic.
    const imageEdit = looksLikeImageEditRequest(parsed);
    const continuation = imageEdit ? parsed.latestImageContext : null;
    const forImageGen = looksLikeImageGenRequest(parsed) || imageEdit;
    if (forImageGen) {
      log?.debug?.(
        "CGPT-WEB",
        continuation
          ? "Image edit intent detected — continuing saved image conversation"
          : "Image-gen intent detected — disabling Temporary Chat for this turn"
      );
    }

    const parentMessageId = continuation?.parentMessageId ?? randomUUID();
    const modelSlug = MODEL_MAP[model] ?? model;
    const cgptBody = buildConversationBody(
      parsed,
      modelSlug,
      parentMessageId,
      forImageGen,
      continuation
    );

    const headers: Record<string, string> = {
      ...browserHeaders(),
      ...oaiHeaders(sessionId, deviceId),
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      Authorization: `Bearer ${tokenEntry.accessToken}`,
      Cookie: buildSessionCookieHeader(cookie),
    };
    if (tokenEntry.accountId) headers["chatgpt-account-id"] = tokenEntry.accountId;
    if (reqs.token) headers["openai-sentinel-chat-requirements-token"] = reqs.token;
    if (reqs.prepare_token)
      headers["openai-sentinel-chat-requirements-prepare-token"] = reqs.prepare_token;
    if (proofToken) headers["openai-sentinel-proof-token"] = proofToken;
    if (turnstileToken) headers["openai-sentinel-turnstile-token"] = turnstileToken;

    log?.info?.("CGPT-WEB", `Conversation request → ${modelSlug} (pow=${!!proofToken})`);

    let response: TlsFetchResult;
    try {
      response = await tlsFetchChatGpt(CONV_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(cgptBody),
        timeoutMs: 120_000, // generations can take a while
        signal,
        // For real-time streaming, ask the TLS client to write the body to
        // a temp file and surface it as a ReadableStream as it arrives —
        // otherwise long generations buffer entirely before the client sees
        // anything (and the downstream HTTP request can time out).
        stream,
      });
    } catch (err) {
      log?.error?.("CGPT-WEB", `Fetch failed: ${err instanceof Error ? err.message : String(err)}`);
      const code = err instanceof TlsClientUnavailableError ? "TLS_UNAVAILABLE" : undefined;
      return {
        response: errorResponse(
          502,
          `ChatGPT connection failed: ${err instanceof Error ? err.message : String(err)}`,
          code
        ),
        url: CONV_URL,
        headers,
        transformedBody: cgptBody,
      };
    }

    if (response.status >= 400) {
      const status = response.status;
      // Log the upstream body on 4xx/5xx — error responses are small and the
      // upstream message is much more useful than our wrapper. Goes through
      // the executor logger so it respects the application's log config.
      log?.warn?.("CGPT-WEB", `conv ${status}: ${(response.text || "").slice(0, 400)}`);
      let errMsg = `ChatGPT returned HTTP ${status}`;
      if (status === 401 || status === 403) {
        errMsg =
          "ChatGPT auth failed — session may have expired. Re-paste your __Secure-next-auth.session-token.";
        tokenCache.delete(cookieKey(cookie));
      } else if (status === 404) {
        errMsg =
          "ChatGPT returned 404 — usually the model is no longer available on this account or the chat-requirements-token expired. Retry will start a fresh conversation.";
      } else if (status === 429) {
        errMsg = "ChatGPT rate limited. Wait a moment and retry.";
      }
      log?.warn?.("CGPT-WEB", errMsg);
      return {
        response: errorResponse(status, errMsg, `HTTP_${status}`),
        url: CONV_URL,
        headers,
        transformedBody: cgptBody,
      };
    }

    // For streaming requests the TLS client returns a ReadableStream that
    // tails the temp file as it's written. For non-streaming requests, it
    // returns the full body as text — wrap that in a one-shot stream so the
    // existing SSE parser can consume it uniformly.
    let bodyStream: ReadableStream<Uint8Array>;
    if (response.body) {
      bodyStream = response.body;
    } else if (response.text) {
      bodyStream = stringToStream(response.text);
    } else {
      return {
        response: errorResponse(502, "ChatGPT returned empty response body"),
        url: CONV_URL,
        headers,
        transformedBody: cgptBody,
      };
    }

    const cid = `chatcmpl-cgpt-${crypto.randomUUID().slice(0, 12)}`;
    const created = Math.floor(Date.now() / 1000);

    const resolverCtx: ResolverContext = {
      accessToken: tokenEntry.accessToken,
      accountId: tokenEntry.accountId,
      sessionId,
      deviceId,
      cookie,
      signal,
      log,
      publicBaseUrl: derivePublicBaseUrl(clientHeaders, log),
    };
    const imageResolver = makeImageResolver(resolverCtx);
    const pollAsyncImage = (conversationId: string) =>
      pollForAsyncImage(conversationId, resolverCtx);

    let finalResponse: Response;
    if (stream) {
      const sseStream = buildStreamingResponse(
        bodyStream,
        model,
        cid,
        created,
        imageResolver,
        pollAsyncImage,
        log,
        signal
      );
      finalResponse = new Response(sseStream, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "X-Accel-Buffering": "no",
        },
      });
    } else {
      finalResponse = await buildNonStreamingResponse(
        bodyStream,
        model,
        cid,
        created,
        parsed.currentMsg,
        imageResolver,
        pollAsyncImage,
        log,
        signal
      );
    }

    return { response: finalResponse, url: CONV_URL, headers, transformedBody: cgptBody };
  }
}