import { BaseExecutor, type ExecuteInput } from "./base.ts";

const ADAPTA_APP_URL = "https://agent.adapta.one";
const ADAPTA_CLERK_URL = "https://clerk.agent.adapta.one";
const ADAPTA_STREAM_URL = `${ADAPTA_APP_URL}/api/chat/stream/v1`;

// Default model ID in Adapta's internal system (corresponds to "ONE" / auto-select)
const DEFAULT_AI_MODEL_ID = 14;

// Map from OmniRoute model IDs to Adapta internal model IDs.
// 14 = "ONE" (auto), values confirmed via chat history inspection.
// Additional IDs can be added as they are discovered.
const MODEL_ID_MAP: Record<string, number> = {
  "adapta-one": 14,
  "adapta-gpt": 14,
  "adapta-claude": 14,
  "adapta-gemini": 14,
  "adapta-grok": 14,
  "adapta-deepseek": 14,
  "adapta-llama": 14,
};

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

// ── In-memory session cache ───────────────────────────────────────────────────

interface CachedSession {
  sessionId: string;
  jwt: string;
  jwtExpiresAt: number; // unix ms
}

// Keyed by the first 32 chars of the stored __client JWT
const sessionCache = new Map<string, CachedSession>();

function cacheKey(clientJwt: string): string {
  return clientJwt.slice(0, 32);
}

function cachedJwt(clientJwt: string): string | null {
  const entry = sessionCache.get(cacheKey(clientJwt));
  if (!entry) return null;
  // Keep a 30-second buffer before expiry
  if (Date.now() >= entry.jwtExpiresAt - 30_000) return null;
  return entry.jwt;
}

function storeSession(clientJwt: string, sessionId: string, jwt: string, expMs: number): void {
  sessionCache.set(cacheKey(clientJwt), { sessionId, jwt, jwtExpiresAt: expMs });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function extractClientJwt(rawApiKey: string): string {
  // Users may paste the full "name=value" form or just the JWT value
  const trimmed = rawApiKey.trim();
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx > 0 && !trimmed.startsWith("eyJ")) {
    return trimmed.slice(eqIdx + 1).trim();
  }
  return trimmed;
}

/** Decode the exp claim from a JWT without verifying signature. */
function jwtExpMs(jwt: string): number {
  try {
    const parts = jwt.split(".");
    if (parts.length < 2) return 0;
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(b64));
    return typeof payload.exp === "number" ? payload.exp * 1000 : 0;
  } catch {
    return 0;
  }
}

function makeErrorResponse(status: number, message: string): Response {
  return new Response(
    JSON.stringify({ error: { message, type: "upstream_error", code: `HTTP_${status}` } }),
    { status, headers: { "Content-Type": "application/json" } }
  );
}

// ── Clerk auth flow ───────────────────────────────────────────────────────────

/** Step 1: GET /v1/client → returns active session ID. */
async function getSessionId(
  clientJwt: string,
  signal?: AbortSignal | null,
  log?: ExecuteInput["log"]
): Promise<string> {
  const resp = await fetch(`${ADAPTA_CLERK_URL}/v1/client`, {
    headers: {
      Cookie: `__client=${clientJwt}`,
      "User-Agent": USER_AGENT,
      Origin: ADAPTA_APP_URL,
    },
    signal: signal ?? undefined,
  });

  if (!resp.ok) {
    throw new Error(`Clerk /v1/client returned HTTP ${resp.status} — check your __client cookie`);
  }

  const body = await resp.json();
  const sessions: Array<{ id: string; status: string }> = body?.response?.sessions ?? [];
  const active = sessions.find((s) => s.status === "active");
  if (!active?.id) {
    throw new Error(
      "No active Clerk session found — your __client cookie may be expired or invalid"
    );
  }

  log?.info?.("ADAPTA-WEB", `Got session ID: ${active.id}`);
  return active.id;
}

/** Step 2: POST /v1/client/sessions/{id}/tokens → fresh short-lived JWT. */
async function refreshSessionJwt(
  clientJwt: string,
  sessionId: string,
  signal?: AbortSignal | null,
  log?: ExecuteInput["log"]
): Promise<string> {
  const resp = await fetch(`${ADAPTA_CLERK_URL}/v1/client/sessions/${sessionId}/tokens`, {
    method: "POST",
    headers: {
      Cookie: `__client=${clientJwt}`,
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
      Origin: ADAPTA_APP_URL,
    },
    signal: signal ?? undefined,
  });

  if (!resp.ok) {
    throw new Error(`Clerk token refresh returned HTTP ${resp.status}`);
  }

  const body = await resp.json();
  const jwt = body?.jwt;
  if (typeof jwt !== "string" || !jwt.startsWith("eyJ")) {
    throw new Error("Clerk token refresh did not return a valid JWT");
  }

  log?.info?.("ADAPTA-WEB", `Got fresh session JWT (${jwt.length} chars)`);
  return jwt;
}

/** Returns a valid (non-expired) session JWT, refreshing if necessary. */
async function getSessionJwt(
  clientJwt: string,
  signal?: AbortSignal | null,
  log?: ExecuteInput["log"]
): Promise<string> {
  const cached = cachedJwt(clientJwt);
  if (cached) {
    log?.info?.("ADAPTA-WEB", "Using cached session JWT");
    return cached;
  }

  const sessionId = await getSessionId(clientJwt, signal, log);
  const jwt = await refreshSessionJwt(clientJwt, sessionId, signal, log);
  storeSession(clientJwt, sessionId, jwt, jwtExpMs(jwt) || Date.now() + 55_000);
  return jwt;
}

// ── Request/response translation ──────────────────────────────────────────────

interface OpenAIMessage {
  role: string;
  content: unknown;
}

interface AdaptaPart {
  type: "text";
  text: string;
}

interface AdaptaMessage {
  role: string;
  parts: AdaptaPart[];
}

/** Extract plain text from an OpenAI message content (string or content-parts array). */
function extractText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .filter((c: Record<string, unknown>) => c.type === "text")
      .map((c: Record<string, unknown>) => String(c.text ?? ""))
      .join("");
  }
  return String(content ?? "");
}

/** Build the final Adapta messages array, injecting system prompt into first user message. */
function buildAdaptaMessages(messages: OpenAIMessage[]): AdaptaMessage[] {
  let systemText = "";
  const rest: OpenAIMessage[] = [];

  for (const msg of messages) {
    const role = msg.role === "developer" ? "system" : msg.role;
    if (role === "system") {
      systemText += (systemText ? "\n" : "") + extractText(msg.content);
    } else {
      rest.push(msg);
    }
  }

  const adapted: AdaptaMessage[] = [];
  let systemInjected = false;

  for (const msg of rest) {
    if (msg.role !== "user" && msg.role !== "assistant") continue;
    const text = extractText(msg.content);
    if (!text.trim()) continue;

    if (!systemInjected && systemText && msg.role === "user") {
      adapted.push({
        role: "user",
        parts: [{ type: "text", text: `${systemText}\n\n${text}` }],
      });
      systemInjected = true;
    } else {
      adapted.push({ role: msg.role, parts: [{ type: "text", text }] });
    }
  }

  return adapted;
}

// ── SSE transform: Adapta → OpenAI ───────────────────────────────────────────

function transformStream(adaptaStream: ReadableStream, model: string): ReadableStream {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const id = `chatcmpl-adp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const created = Math.floor(Date.now() / 1000);
  let roleEmitted = false;

  return new ReadableStream({
    async start(controller) {
      const reader = adaptaStream.getReader();
      let buffer = "";

      const emit = (obj: object) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));

      const chunk = (delta: object, finish?: string) =>
        emit({
          id,
          object: "chat.completion.chunk",
          created,
          model,
          choices: [{ index: 0, delta, finish_reason: finish ?? null }],
        });

      const ensureRole = () => {
        if (!roleEmitted) {
          roleEmitted = true;
          chunk({ role: "assistant", content: "" });
        }
      };

      const finalize = () => {
        ensureRole();
        chunk({}, "stop");
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      };

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (!payload) continue;

            let event: Record<string, unknown>;
            try {
              event = JSON.parse(payload);
            } catch {
              continue;
            }

            const type = event.type as string;

            if (type === "text-delta") {
              const delta = event.delta as string;
              // Suppress the "quick-response" loading placeholder
              if (event.id === "quick-response") continue;
              if (typeof delta === "string" && delta.length > 0) {
                ensureRole();
                chunk({ content: delta });
              }
            } else if (type === "text-end") {
              if (event.id === "quick-response") continue;
              // Real text ended — stream will send more events or close
            } else if (type === "error") {
              const errText = String(event.errorText ?? "Adapta upstream error");
              ensureRole();
              // Emit the error as content so the user sees it
              chunk({ content: `\n\n[Erro: ${errText}]` });
              finalize();
              return;
            } else if (type === "done" || type === "end") {
              finalize();
              return;
            }
          }
        }
      } catch {
        // Stream aborted or network error — emit what we have
      }

      finalize();
    },
  });
}

// ── Executor ──────────────────────────────────────────────────────────────────

export class AdaptaWebExecutor extends BaseExecutor {
  constructor() {
    super("adapta-web", { baseUrl: ADAPTA_STREAM_URL });
  }

  async testConnection(
    credentials: Record<string, unknown>,
    signal?: AbortSignal
  ): Promise<boolean> {
    try {
      const rawKey = String((credentials as Record<string, unknown>)?.apiKey ?? "");
      if (!rawKey) return false;
      const clientJwt = extractClientJwt(rawKey);
      const sessionId = await getSessionId(clientJwt, signal);
      return !!sessionId;
    } catch {
      return false;
    }
  }

  async execute({ model, body, stream, credentials, signal, log }: ExecuteInput) {
    const bodyObj = (body ?? {}) as Record<string, unknown>;
    const messages = (Array.isArray(bodyObj.messages) ? bodyObj.messages : []) as OpenAIMessage[];

    // 1. Extract and validate credentials
    const rawKey = String((credentials as Record<string, unknown>)?.apiKey ?? "");
    if (!rawKey) {
      return {
        response: makeErrorResponse(
          401,
          "Missing Adapta credentials — paste your __client cookie from .clerk.agent.adapta.one"
        ),
        url: ADAPTA_STREAM_URL,
        headers: {},
        transformedBody: body,
      };
    }
    const clientJwt = extractClientJwt(rawKey);

    let sessionJwt: string;
    try {
      log?.info?.("ADAPTA-WEB", "Obtaining session JWT via Clerk...");
      sessionJwt = await getSessionJwt(clientJwt, signal, log);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      log?.warn?.("ADAPTA-WEB", `Auth failed: ${msg}`);
      return {
        response: makeErrorResponse(401, `Adapta auth failed: ${msg}`),
        url: ADAPTA_STREAM_URL,
        headers: {},
        transformedBody: body,
      };
    }

    // 2. Build Adapta request body
    const aiModelId = MODEL_ID_MAP[model] ?? DEFAULT_AI_MODEL_ID;
    const adaptaMessages = buildAdaptaMessages(messages);

    if (adaptaMessages.length === 0) {
      return {
        response: makeErrorResponse(400, "No messages provided"),
        url: ADAPTA_STREAM_URL,
        headers: {},
        transformedBody: body,
      };
    }

    const requestPayload = {
      messages: adaptaMessages,
      aiModelId,
    };

    const headers: Record<string, string> = {
      Authorization: `Bearer ${sessionJwt}`,
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      "User-Agent": USER_AGENT,
      Origin: ADAPTA_APP_URL,
      Referer: `${ADAPTA_APP_URL}/agentic-chat`,
    };

    log?.info?.(
      "ADAPTA-WEB",
      `POST ${ADAPTA_STREAM_URL} | model=${model} aiModelId=${aiModelId} msgs=${adaptaMessages.length}`
    );

    // 3. Fire request
    const resp = await fetch(ADAPTA_STREAM_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(requestPayload),
      signal: signal ?? undefined,
    });

    if (!resp.ok) {
      let errMsg = `Adapta error HTTP ${resp.status}`;
      if (resp.status === 401 || resp.status === 403) {
        errMsg =
          "Adapta session expired or invalid — re-paste your __client cookie from .clerk.agent.adapta.one";
        // Evict cached JWT so next request re-authenticates
        sessionCache.delete(cacheKey(clientJwt));
      } else if (resp.status === 429) {
        errMsg = "Adapta rate limited — wait and retry";
      }
      log?.warn?.("ADAPTA-WEB", errMsg);
      return {
        response: makeErrorResponse(resp.status, errMsg),
        url: ADAPTA_STREAM_URL,
        headers,
        transformedBody: requestPayload,
      };
    }

    // 4. Stream or collect
    if (stream !== false) {
      return {
        response: new Response(transformStream(resp.body!, model), {
          status: 200,
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        }),
        url: ADAPTA_STREAM_URL,
        headers,
        transformedBody: requestPayload,
      };
    }

    // Non-streaming: collect all text-delta events
    const decoder = new TextDecoder();
    const reader = resp.body!.getReader();
    let buf = "";
    let fullText = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const ev = JSON.parse(line.slice(6));
            if (ev.type === "text-delta" && ev.id !== "quick-response") {
              fullText += String(ev.delta ?? "");
            }
          } catch {
            // skip
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    return {
      response: new Response(
        JSON.stringify({
          id: `chatcmpl-adp-${Date.now()}`,
          object: "chat.completion",
          created: Math.floor(Date.now() / 1000),
          model,
          choices: [
            {
              index: 0,
              message: { role: "assistant", content: fullText },
              finish_reason: "stop",
            },
          ],
          usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      ),
      url: ADAPTA_STREAM_URL,
      headers,
      transformedBody: requestPayload,
    };
  }
}
