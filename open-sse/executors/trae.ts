/**
 * TraeExecutor — talks to Trae's remote agent API (solo_agent_remote).
 *
 * Flow (reverse-engineered from solo.trae.ai web client):
 *   1. POST {base}/chat_sessions          → { data: { chat_session_id, message_id } }
 *   2. GET  {base}/chat_sessions/{id}/events?reply_to_message_id={message_id}
 *        → text/event-stream. Assistant text streams in `plan_item` events under
 *          the `thought` field (cumulative per plan-item id). `token_usage` carries
 *          usage; `done` ends the turn; `error` carries upstream errors.
 *
 * Auth: header `Authorization: Cloud-IDE-JWT <JWT>` (RS256, ~14-day lifetime).
 * The JWT is stored as credentials.accessToken; identity fields (web_id,
 * biz_user_id, user_unique_id, scope, tenant, region) live in providerSpecificData.
 *
 * Model selection: model="auto" → server picks; otherwise model is the upstream
 * `name` from GET {base}/models (e.g. gpt-5.2, gemini-3.1-pro, kimi-k2.5).
 */

import { BaseExecutor, mergeUpstreamExtraHeaders } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";

type JsonRecord = Record<string, unknown>;
type ChatMessage = { role?: string; content?: unknown };

const STREAM_TIMEOUT_MS = parseInt(process.env.TRAE_STREAM_TIMEOUT_MS || "300000", 10);

function flattenQuery(messages: ChatMessage[]): string {
  const parts: string[] = [];
  for (const m of messages) {
    let content = "";
    if (typeof m.content === "string") content = m.content;
    else if (Array.isArray(m.content)) {
      content = m.content
        .map((p) => {
          if (typeof p === "string") return p;
          if (p && typeof p === "object") return String((p as JsonRecord).text ?? "");
          return "";
        })
        .join("");
    }
    if (m.role === "system") parts.push(`[System]\n${content}`);
    else if (m.role === "assistant") parts.push(`[Assistant]\n${content}`);
    else parts.push(content);
  }
  const text = parts.join("\n\n");
  // Trae expects query as a JSON-encoded string of typed content blocks.
  return JSON.stringify([{ type: "text", data: { content: text } }]);
}

export class TraeExecutor extends BaseExecutor {
  constructor() {
    super("trae", PROVIDERS["trae"]);
  }

  private base(): string {
    return (this.config.baseUrl || "https://core-normal.trae.ai/api/remote/v1").replace(/\/$/, "");
  }

  buildHeaders(credentials): Record<string, string> {
    const token = (credentials.accessToken as string) || "";
    const psd = (credentials.providerSpecificData as JsonRecord) || {};
    return {
      Authorization: `Cloud-IDE-JWT ${token}`,
      "Content-Type": "application/json",
      "X-Trae-Client-Type": "web",
      "X-Preferenced-Language": (psd.appLanguage as string) || "en",
      "x-user-region": (psd.userRegion as string) || "US",
      Referer: "https://solo.trae.ai/",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
        "(KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
    };
  }

  /**
   * SOLO exposes two session modes (the toggle on solo.trae.ai):
   *   - "code" (default): full model picker — `auto` plus named models
   *     (gpt-5.4, kimi-k2.5, gemini-3.1-pro, …).
   *   - "work": a single, faster "auto" agent with no model picker.
   * We surface "work" as its own model id (`trae/work`) so callers can opt into
   * the fast lane; any other model id runs in "code" mode. "work" forces the
   * auto strategy with an empty model_name, since it has no model selection.
   */
  private resolveMode(model: string): {
    mode: "code" | "work";
    strategy: "auto" | "manual";
    modelName: string;
  } {
    const m = (model || "").trim().toLowerCase();
    if (m === "work" || m === "auto-work" || m === "solo-work") {
      return { mode: "work", strategy: "auto", modelName: "" };
    }
    const auto = !m || m === "auto";
    return { mode: "code", strategy: auto ? "auto" : "manual", modelName: auto ? "" : model };
  }

  private commonParams(psd: JsonRecord, mode: "code" | "work", sessionId?: string): string {
    const cp: JsonRecord = {
      language: "en-us",
      app_language: (psd.appLanguage as string) || "en",
      quality: "stable",
      app_version: (psd.appVersion as string) || "1.0.0.1229",
      web_id: (psd.webId as string) || "",
      user_identity: (psd.userIdentity as string) || "Free",
      is_freshman: "0",
      biz_user_id: (psd.bizUserId as string) || "",
      user_unique_id: (psd.userUniqueId as string) || "",
      scope: (psd.scope as string) || "marscode-us",
      tenant: (psd.tenant as string) || "marscode",
      region: (psd.region as string) || "US-East",
      aiRegion: (psd.aiRegion as string) || (psd.region as string) || "US-East",
      is_privacy_mode: 0,
      privacy_mode: "off",
      solo_chat_mode: mode,
    };
    if (sessionId) cp.biz_session_id = sessionId;
    return JSON.stringify(cp);
  }

  /** POST /chat_sessions — creates a session and submits the first turn. */
  private async createSession(
    headers: Record<string, string>,
    query: string,
    model: string,
    psd: JsonRecord,
    signal?: AbortSignal | null
  ): Promise<{ sessionId: string; messageId: string }> {
    const { mode, strategy, modelName } = this.resolveMode(model);
    const body = {
      mode,
      environment_id: "default",
      initial_message: {
        chat_session_id: "",
        content: [],
        query,
        model_name: modelName,
        agent_type: "solo_agent_remote",
        model_selection_strategy: strategy,
        common_params: this.commonParams(psd, mode),
      },
      env: "remote",
      auto_create_project: false,
      origin: "web",
    };
    const res = await fetch(`${this.base()}/chat_sessions`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal: signal || undefined,
    });
    const text = await res.text();
    if (!res.ok) throw new Error(`[${res.status}] ${text}`);
    const json = JSON.parse(text);
    if (json?.code !== 0) throw new Error(`Trae create_session: ${JSON.stringify(json)}`);
    return { sessionId: json.data.chat_session_id, messageId: json.data.message_id };
  }

  /**
   * GET /events SSE → invoke onEvent(eventType, dataObj) per frame.
   * Resolves when `done`/`error` arrives, the stream ends, or timeout fires.
   */
  private async streamEvents(
    headers: Record<string, string>,
    sessionId: string,
    replyTo: string,
    onEvent: (ev: string | null, data: JsonRecord) => boolean,
    signal?: AbortSignal | null
  ): Promise<void> {
    const url = `${this.base()}/chat_sessions/${sessionId}/events?reply_to_message_id=${encodeURIComponent(replyTo)}`;
    const ctrl = new AbortController();
    // If the caller's signal is already aborted, abort upfront so we don't open
    // a network request the consumer no longer wants.
    if (signal?.aborted) ctrl.abort();
    const timer = setTimeout(() => ctrl.abort(new Error("trae stream timeout")), STREAM_TIMEOUT_MS);
    const onAbort = () => ctrl.abort();
    if (signal) signal.addEventListener("abort", onAbort, { once: true });
    try {
      const res = await fetch(url, { method: "GET", headers, signal: ctrl.signal });
      if (!res.ok || !res.body) throw new Error(`[${res.status}] events stream failed`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let ev: string | null = null;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        // SSE frames are separated by lines; process complete lines only.
        while ((nl = buf.indexOf("\n")) >= 0) {
          const line = buf.slice(0, nl).replace(/\r$/, "");
          buf = buf.slice(nl + 1);
          if (line.startsWith("event:")) ev = line.slice(6).trim();
          else if (line.startsWith("data:")) {
            const payload = line.slice(5).trim();
            let data: JsonRecord;
            try {
              data = JSON.parse(payload);
            } catch {
              data = { _raw: payload };
            }
            if (onEvent(ev, data)) {
              await reader.cancel().catch(() => {});
              return;
            }
          } else if (line === "") ev = null;
        }
      }
    } finally {
      clearTimeout(timer);
      if (signal) signal.removeEventListener("abort", onAbort);
    }
  }

  async execute({ model, body, stream, credentials, signal, upstreamExtraHeaders }) {
    const headers = this.buildHeaders(credentials as JsonRecord);
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders as Record<string, string> | null);
    const psd = ((credentials as JsonRecord).providerSpecificData as JsonRecord) || {};
    const reqBody = body as { messages?: ChatMessage[] };
    const query = flattenQuery(reqBody.messages || []);
    const responseId = `chatcmpl-trae-${Date.now()}`;
    const created = Math.floor(Date.now() / 1000);

    const errResponse = (status: number, message: string) =>
      new Response(
        JSON.stringify({
          error: { message: sanitizeErrorMessage(message), type: "api_error", code: "" },
        }),
        { status, headers: { "Content-Type": "application/json" } }
      );

    let session: { sessionId: string; messageId: string };
    try {
      session = await this.createSession(
        headers,
        query,
        model as string,
        psd,
        signal as AbortSignal
      );
    } catch (err) {
      return {
        response: errResponse(502, err instanceof Error ? err.message : String(err)),
        url: this.base(),
        headers,
        transformedBody: body,
      };
    }

    // Shared per-turn state: plan_item thoughts (cumulative, longest wins).
    const order: string[] = [];
    const thoughts: Record<string, string> = {};
    let sent = 0;
    let usage: JsonRecord | null = null;
    let errorEvent: JsonRecord | null = null;
    const renderNewText = (data: JsonRecord): string => {
      const pid = data.id as string | undefined;
      if (!pid) return "";
      if (!(pid in thoughts)) order.push(pid);
      const t = (data.thought as string) || "";
      if (t.length >= (thoughts[pid] || "").length) thoughts[pid] = t;
      const full = order.map((i) => thoughts[i]).join("");
      const piece = full.slice(sent);
      sent = full.length;
      return piece;
    };

    if (stream !== false) {
      const enc = new TextEncoder();
      const sse = new ReadableStream({
        start: async (controller) => {
          const emit = (obj: JsonRecord) =>
            controller.enqueue(enc.encode(`data: ${JSON.stringify(obj)}\n\n`));
          let roleEmitted = false;
          try {
            emit({
              id: responseId,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
            });
            roleEmitted = true;
            await this.streamEvents(
              headers,
              session.sessionId,
              session.messageId,
              (ev, data) => {
                if (ev === "error") {
                  errorEvent = data;
                  return true;
                }
                if (ev === "token_usage") usage = data;
                if (ev === "plan_item") {
                  const piece = renderNewText(data);
                  if (piece)
                    emit({
                      id: responseId,
                      object: "chat.completion.chunk",
                      created,
                      model,
                      choices: [{ index: 0, delta: { content: piece }, finish_reason: null }],
                    });
                }
                return ev === "done";
              },
              signal as AbortSignal
            );
            void roleEmitted;
            if (errorEvent) {
              emit({
                id: responseId,
                object: "chat.completion.chunk",
                created,
                model,
                choices: [],
                error: {
                  message: `trae ${errorEvent.code}: ${errorEvent.message}`,
                  type: "api_error",
                },
              });
            } else {
              emit({
                id: responseId,
                object: "chat.completion.chunk",
                created,
                model,
                choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
              });
              if (usage)
                emit({
                  id: responseId,
                  object: "chat.completion.chunk",
                  created,
                  model,
                  choices: [],
                  usage: {
                    prompt_tokens: usage.prompt_tokens || 0,
                    completion_tokens: usage.completion_tokens || 0,
                    total_tokens: usage.total_tokens || 0,
                  },
                });
            }
            controller.enqueue(enc.encode("data: [DONE]\n\n"));
            controller.close();
          } catch (err) {
            controller.error(err);
          }
        },
      });
      return {
        response: new Response(sse, {
          status: 200,
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        }),
        url: this.base(),
        headers,
        transformedBody: body,
      };
    }

    // Non-streaming: drive to completion, return chat.completion JSON.
    try {
      await this.streamEvents(
        headers,
        session.sessionId,
        session.messageId,
        (ev, data) => {
          if (ev === "error") {
            errorEvent = data;
            return true;
          }
          if (ev === "token_usage") usage = data;
          if (ev === "plan_item") renderNewText(data);
          return ev === "done";
        },
        signal as AbortSignal
      );
    } catch (err) {
      return {
        response: errResponse(502, err instanceof Error ? err.message : String(err)),
        url: this.base(),
        headers,
        transformedBody: body,
      };
    }
    if (errorEvent) {
      return {
        response: errResponse(502, `trae ${errorEvent.code}: ${errorEvent.message}`),
        url: this.base(),
        headers,
        transformedBody: body,
      };
    }
    const content = order.map((i) => thoughts[i]).join("");
    const out: JsonRecord = {
      id: responseId,
      object: "chat.completion",
      created,
      model,
      choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
    };
    if (usage)
      out.usage = {
        prompt_tokens: usage.prompt_tokens || 0,
        completion_tokens: usage.completion_tokens || 0,
        total_tokens: usage.total_tokens || 0,
      };
    return {
      response: new Response(JSON.stringify(out), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
      url: this.base(),
      headers,
      transformedBody: body,
    };
  }

  /**
   * Headless refresh of the 14-day Cloud-IDE-JWT using the long-lived (~7 month)
   * RefreshToken captured during /authorize. Mirrors the desktop client's call to
   *   POST {apiHost}/cloudide/api/v3/trae/oauth/ExchangeToken
   *   { ClientID, RefreshToken, ClientSecret: "-", UserID: "" }
   * The response uses the same envelope as GetUserToken:
   *   { ResponseMetadata: { Error?: { Code, Message } }, Result: { Token, RefreshToken,
   *     TokenExpireAt, RefreshExpireAt, TokenExpireDuration, UserID, TenantID } }
   * On Error.Code === "RefreshTokenInvalid" the caller must re-authorize via
   * the browser flow — we throw so the connection is marked unusable.
   */
  async refreshCredentials(credentials) {
    const psd = (credentials?.providerSpecificData as JsonRecord) || {};
    const refreshToken = credentials?.refreshToken as string | undefined;
    if (!refreshToken) return null;
    const host = ((psd.host as string) || "https://api-us-east.trae.ai").replace(/\/$/, "");
    const clientId = (psd.clientId as string) || "en1oxy7wnw8j9n";
    const url = `${host}/cloudide/api/v3/trae/oauth/ExchangeToken`;
    const body = { ClientID: clientId, RefreshToken: refreshToken, ClientSecret: "-", UserID: "" };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    if (!res.ok) {
      throw new Error(`Trae ExchangeToken HTTP ${res.status}: ${text.slice(0, 200)}`);
    }
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("Trae ExchangeToken: response was not JSON");
    }
    const errCode = parsed?.ResponseMetadata?.Error?.Code;
    if (errCode) {
      // Surface invalid-refresh to the caller — BaseExecutor.execute swallows the
      // refresh exception, but the next request will hit 401 and trigger fallback;
      // we also leave the (stale) accessToken in place so observability shows why.
      throw new Error(`Trae ExchangeToken error: ${errCode}`);
    }
    const result = parsed?.Result;
    if (!result?.Token) {
      throw new Error("Trae ExchangeToken: response missing Result.Token");
    }
    return {
      accessToken: result.Token as string,
      refreshToken: (result.RefreshToken as string) || refreshToken,
      expiresAt: result.TokenExpireAt
        ? new Date(Number(result.TokenExpireAt)).toISOString()
        : undefined,
    };
  }
}

export default TraeExecutor;
