import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { solveDeepSeekPowAsync } from "../lib/deepseek-pow.ts";

export const DEEPSEEK_WEB_BASE = "https://chat.deepseek.com";
const DEEPSEEK_API_BASE = `${DEEPSEEK_WEB_BASE}/api`;
const COMPLETION_URL = `${DEEPSEEK_API_BASE}/v0/chat/completion`;

const FAKE_HEADERS: Record<string, string> = {
  Accept: "*/*",
  "Accept-Encoding": "gzip, deflate, br, zstd",
  "Accept-Language": "en-US,en;q=0.9",
  Origin: DEEPSEEK_WEB_BASE,
  Referer: `${DEEPSEEK_WEB_BASE}/`,
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
  "X-App-Version": "20241129.1",
  "X-Client-Locale": "en-US",
  "X-Client-Platform": "web",
  "X-Client-Version": "1.8.0",
};

// ── Types ────────────────────────────────────────────────────────────────

interface PowChallenge {
  algorithm: string;
  challenge: string;
  salt: string;
  signature: string;
  difficulty: number;
  expire_at: number;
  expire_after: number;
  target_path: string;
}

interface TokenInfo {
  accessToken: string;
  expiresAt: number;
}

// ── Token cache (keyed by userToken → short-lived access token) ─────────

const tokenCache = new Map<string, TokenInfo>();
const sessionCache = new Map<string, { sessionId: string; createdAt: number }>();

const SESSION_CACHE_TTL_MS = 5 * 60 * 1000;

// ── Helpers ──────────────────────────────────────────────────────────────

function extractUserToken(credentials: Record<string, unknown>): string | null {
  const raw = credentials?.apiKey || credentials?.accessToken || credentials?.refreshToken;
  if (typeof raw !== "string" || raw.length === 0) return null;
  // Handle JSON-wrapped tokens (DeepSeek stores token as {"value":"..."})
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed?.value === "string") return parsed.value;
  } catch {
    // not JSON, use raw
  }
  return raw;
}

function errorResponse(status: number, message: string, dsCode?: number): Response {
  return new Response(
    JSON.stringify({
      error: { message, type: "upstream_error", code: dsCode ?? `HTTP_${status}` },
    }),
    { status, headers: { "Content-Type": "application/json" } }
  );
}

function resolveModelOptions(
  model?: string,
  bodyObj?: Record<string, unknown>
): {
  modelType: string;
  thinkingEnabled: boolean;
  searchEnabled: boolean;
} {
  const m = (model || "").toLowerCase();
  const modelType = m.includes("pro") || m.includes("expert") ? "expert" : "default";
  const thinkingEnabled =
    m.includes("r1") ||
    m.includes("think") ||
    m.includes("reason") ||
    bodyObj?.thinking_enabled === true ||
    bodyObj?.thinking === true ||
    !!bodyObj?.reasoning_effort;
  const searchEnabled =
    m.includes("search") ||
    bodyObj?.search_enabled === true ||
    bodyObj?.search === true ||
    bodyObj?.web_search === true;
  return { modelType, thinkingEnabled, searchEnabled };
}

function generateFakeCookie(): string {
  const ts = Date.now();
  const hex = (n: number) =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 16).toString(16)).join("");
  const uid = () =>
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  return `intercom-HWWAFSESTIME=${ts}; HWWAFSESID=${hex(18)}; Hm_lvt_${uid()}=${Math.floor(ts / 1000)}; _frid=${uid()}`;
}

// ── PoW Solver (DeepSeekHashV1) ─────────────────────────────────────────

async function solvePow(challenge: PowChallenge): Promise<string> {
  const answer = await solveDeepSeekPowAsync(
    challenge.algorithm,
    challenge.challenge,
    challenge.salt,
    challenge.difficulty,
    challenge.expire_at
  );
  if (answer < 0) throw new Error("PoW solver failed");
  return Buffer.from(
    JSON.stringify({
      algorithm: challenge.algorithm,
      challenge: challenge.challenge,
      salt: challenge.salt,
      answer,
      signature: challenge.signature,
      target_path: challenge.target_path,
    })
  ).toString("base64");
}

// ── SSE Transform (DeepSeek → OpenAI) ───────────────────────────────────

function transformSSE(deepseekStream: ReadableStream, model: string): ReadableStream {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const id = `chatcmpl-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const created = Math.floor(Date.now() / 1000);
  let emittedRole = false;

  return new ReadableStream({
    async start(controller) {
      const reader = deepseekStream.getReader();
      let buffer = "";

      const emit = (obj: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      };

      const chunk = (delta: object, finish?: string) => {
        emit({
          id,
          object: "chat.completion.chunk",
          created,
          model,
          choices: [{ index: 0, delta, finish_reason: finish ?? null }],
        });
      };

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ") && !line.startsWith("data:")) continue;
            const payload = line.replace(/^data:\s*/, "").trim();

            if (payload === "[DONE]") {
              if (!emittedRole) {
                emittedRole = true;
                chunk({ role: "assistant", content: "" });
              }
              chunk({}, "stop");
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
              return;
            }

            let data: Record<string, unknown>;
            try {
              data = JSON.parse(payload);
            } catch {
              continue;
            }

            const fragments = (data as any)?.v?.response?.fragments;
            if (Array.isArray(fragments)) {
              if (!emittedRole) {
                emittedRole = true;
                chunk({ role: "assistant", content: "" });
              }
              for (const frag of fragments) {
                if (typeof frag.content === "string" && frag.content.length > 0) {
                  if (frag.type === "THINK") {
                    chunk({ reasoning_content: frag.content });
                  } else {
                    chunk({ content: frag.content });
                  }
                }
              }
            }

            // response/fragments path (incremental updates)
            if ((data as any)?.p === "response/fragments" && Array.isArray((data as any)?.v)) {
              if (!emittedRole) {
                emittedRole = true;
                chunk({ role: "assistant", content: "" });
              }
              for (const frag of (data as any).v) {
                if (typeof frag.content === "string" && frag.content.length > 0) {
                  if (frag.type === "THINK") {
                    chunk({ reasoning_content: frag.content });
                  } else {
                    chunk({ content: frag.content });
                  }
                }
              }
            }

            if ((data as any)?.p === "response/status" && (data as any)?.v === "FINISHED") {
              if (!emittedRole) {
                emittedRole = true;
                chunk({ role: "assistant", content: "" });
              }
              chunk({}, "stop");
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
              return;
            }
          }
        }
      } catch (err) {
        controller.error(err);
        return;
      }

      if (!emittedRole) {
        emittedRole = true;
        chunk({ role: "assistant", content: "" });
      }
      chunk({}, "stop");
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

async function collectSSEContent(deepseekStream: ReadableStream): Promise<string> {
  const decoder = new TextDecoder();
  const reader = deepseekStream.getReader();
  let buffer = "";
  const parts: string[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.startsWith("data: ") && !line.startsWith("data:")) continue;
      const payload = line.replace(/^data:\s*/, "").trim();
      try {
        const data = JSON.parse(payload);
        const fragments = data?.v?.response?.fragments;
        if (Array.isArray(fragments)) {
          for (const frag of fragments) {
            if (typeof frag.content === "string") parts.push(frag.content);
          }
        }
        if (data?.p === "response/fragments" && Array.isArray(data?.v)) {
          for (const frag of data.v) {
            if (typeof frag.content === "string") parts.push(frag.content);
          }
        }
      } catch {
        // skip
      }
    }
  }

  return parts.join("");
}

// ── DeepSeek API calls (Bearer token auth, like Chat2API) ───────────────

async function acquireAccessToken(
  userToken: string,
  signal?: AbortSignal | null,
  log?: ExecuteInput["log"]
): Promise<string> {
  const cached = tokenCache.get(userToken);
  if (cached && cached.expiresAt > Math.floor(Date.now() / 1000)) {
    return cached.accessToken;
  }

  log?.info?.("DEEPSEEK-WEB", "Acquiring access token from /users/current...");
  const resp = await fetch(`${DEEPSEEK_API_BASE}/v0/users/current`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
      ...FAKE_HEADERS,
    },
    signal: signal ?? undefined,
  });

  if (resp.status === 401 || resp.status === 403) {
    throw new Error("Token invalid or expired — get a new userToken from DeepSeek localStorage");
  }
  if (!resp.ok) {
    throw new Error(`users/current HTTP ${resp.status}`);
  }

  const json = await resp.json();
  const bizData = json?.data?.biz_data || json?.biz_data;
  if (!bizData?.token) {
    const errMsg = json?.msg || json?.data?.biz_msg || "Unknown error";
    throw new Error(`Failed to acquire token: ${errMsg}`);
  }

  const accessToken = bizData.token;
  tokenCache.set(userToken, {
    accessToken,
    expiresAt: Math.floor(Date.now() / 1000) + 3600,
  });

  log?.info?.("DEEPSEEK-WEB", `Access token acquired (${accessToken.length} chars)`);
  return accessToken;
}

async function createSession(
  accessToken: string,
  connectionId: string | undefined,
  signal?: AbortSignal | null
): Promise<string> {
  const cacheKey = connectionId || accessToken;
  const cached = sessionCache.get(cacheKey);
  if (cached && Date.now() - cached.createdAt < SESSION_CACHE_TTL_MS) {
    return cached.sessionId;
  }

  const resp = await fetch(`${DEEPSEEK_API_BASE}/v0/chat_session/create`, {
    method: "POST",
    headers: {
      ...FAKE_HEADERS,
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      Cookie: generateFakeCookie(),
    },
    body: JSON.stringify({}),
    signal: signal ?? undefined,
  });

  if (!resp.ok) throw new Error(`chat_session/create HTTP ${resp.status}`);
  const json = await resp.json();
  const bizData = json?.data?.biz_data || json?.biz_data;
  const id = bizData?.chat_session?.id;
  if (!id) throw new Error(`No session id: code=${json?.code}`);

  sessionCache.set(cacheKey, { sessionId: id, createdAt: Date.now() });
  return id;
}

async function getPowChallenge(
  accessToken: string,
  signal?: AbortSignal | null
): Promise<PowChallenge> {
  const resp = await fetch(`${DEEPSEEK_API_BASE}/v0/chat/create_pow_challenge`, {
    method: "POST",
    headers: {
      ...FAKE_HEADERS,
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ target_path: "/api/v0/chat/completion" }),
    signal: signal ?? undefined,
  });
  if (!resp.ok) throw new Error(`create_pow_challenge HTTP ${resp.status}`);
  const json = await resp.json();
  const bizData = json?.data?.biz_data || json?.biz_data;
  if (!bizData?.challenge?.challenge) throw new Error(`No PoW challenge: code=${json?.code}`);
  return bizData.challenge as PowChallenge;
}

// ── Executor ─────────────────────────────────────────────────────────────

export class DeepSeekWebExecutor extends BaseExecutor {
  constructor() {
    super("deepseek-web", { baseUrl: DEEPSEEK_WEB_BASE });
  }

  async testConnection(
    credentials: Record<string, unknown>,
    signal?: AbortSignal
  ): Promise<boolean> {
    try {
      const userToken = extractUserToken(credentials);
      if (!userToken) return false;
      const accessToken = await acquireAccessToken(userToken, signal);
      return !!accessToken;
    } catch {
      return false;
    }
  }

  async execute({ model, body, stream, credentials, signal, log }: ExecuteInput) {
    const bodyObj = (body || {}) as Record<string, unknown>;
    const messages = (Array.isArray(bodyObj.messages) ? bodyObj.messages : []) as Array<{
      role: string;
      content: string;
    }>;
    const rawCreds = credentials as unknown as Record<string, unknown>;

    // 1. Extract userToken from credentials.apiKey
    const userToken = extractUserToken(rawCreds);
    if (!userToken) {
      return {
        response: errorResponse(
          400,
          "Invalid credentials: paste your userToken from DeepSeek localStorage " +
            "(DevTools → Application → Local Storage → chat.deepseek.com → userToken)"
        ),
        url: COMPLETION_URL,
        headers: {},
        transformedBody: body,
      };
    }

    try {
      // 2. Exchange userToken for short-lived access token (cached 1h)
      let t0 = Date.now();
      const accessToken = await acquireAccessToken(userToken, signal, log);
      log?.info?.("DEEPSEEK-WEB", `Token acquired in ${Date.now() - t0}ms`);

      // 3. Create chat session (cached 5min)
      t0 = Date.now();
      const sessionId = await createSession(accessToken, rawCreds.connectionId as string, signal);
      log?.info?.("DEEPSEEK-WEB", `Session created in ${Date.now() - t0}ms`);

      // 4. Get PoW challenge and solve
      t0 = Date.now();
      const powChallenge = await getPowChallenge(accessToken, signal);
      log?.info?.(
        "DEEPSEEK-WEB",
        `PoW challenge fetched in ${Date.now() - t0}ms (difficulty=${powChallenge.difficulty})`
      );
      t0 = Date.now();
      const powAnswer = await solvePow(powChallenge);
      log?.info?.("DEEPSEEK-WEB", `PoW solved in ${Date.now() - t0}ms`);

      // 5. Build prompt from messages
      const prompt = messages
        .map((m) => {
          if (m.role === "system") return `[System]: ${m.content}`;
          if (m.role === "assistant") return `[Assistant]: ${m.content}`;
          return m.content;
        })
        .join("\n");

      // 6. Resolve model type, thinking, and search from model name + body flags
      const { modelType, thinkingEnabled, searchEnabled } = resolveModelOptions(
        model as string,
        bodyObj
      );
      const refFileIds = Array.isArray(bodyObj.ref_file_ids) ? bodyObj.ref_file_ids : [];
      log?.info?.(
        "DEEPSEEK-WEB",
        `model_type=${modelType}, thinking=${thinkingEnabled}, search=${searchEnabled}, files=${refFileIds.length}, stream=${stream !== false}`
      );

      // 7. Send completion request
      const headers: Record<string, string> = {
        ...FAKE_HEADERS,
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Ds-Pow-Response": powAnswer,
        "X-Client-Timezone-Offset": String(new Date().getTimezoneOffset() * -60),
        Cookie: generateFakeCookie(),
      };

      const requestPayload = {
        chat_session_id: sessionId,
        parent_message_id: null,
        model_type: modelType,
        prompt,
        ref_file_ids: refFileIds,
        thinking_enabled: thinkingEnabled,
        search_enabled: searchEnabled,
        preempt: false,
      };

      t0 = Date.now();
      log?.info?.("DEEPSEEK-WEB", `POST ${COMPLETION_URL}`);
      const resp = await fetch(COMPLETION_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(requestPayload),
        signal: signal ?? undefined,
      });

      log?.info?.(
        "DEEPSEEK-WEB",
        `Completion response in ${Date.now() - t0}ms, status=${resp.status}`
      );

      if (!resp.ok) {
        const status = resp.status;
        let errMsg = `DeepSeek API error (${status})`;
        if (status === 401 || status === 403) {
          tokenCache.delete(userToken);
          errMsg = "DeepSeek token expired — get a fresh userToken from localStorage.";
        } else if (status === 429) {
          errMsg = "DeepSeek rate limited. Wait and retry.";
        }
        log?.warn?.("DEEPSEEK-WEB", errMsg);

        try {
          const errBody = await resp.json();
          if (errBody?.code && errBody.code !== 0) {
            errMsg = `DeepSeek error ${errBody.code}: ${errBody.msg}`;
          }
        } catch {
          /* ignore */
        }

        return {
          response: errorResponse(status, errMsg),
          url: COMPLETION_URL,
          headers,
          transformedBody: requestPayload,
        };
      }

      // Check for HTTP 200 with DeepSeek error JSON
      const ct = resp.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        try {
          const json = await resp.json();
          if (json?.code && json.code !== 0) {
            const errMsg = `DeepSeek error ${json.code}: ${json.msg}`;
            log?.warn?.("DEEPSEEK-WEB", errMsg);
            const status = json.code === 40003 ? 401 : json.code === 40002 ? 429 : 502;
            if (json.code === 40003) tokenCache.delete(userToken);
            return {
              response: errorResponse(status, errMsg, json.code),
              url: COMPLETION_URL,
              headers,
              transformedBody: requestPayload,
            };
          }
          return {
            response: new Response(JSON.stringify(json), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }),
            url: COMPLETION_URL,
            headers,
            transformedBody: requestPayload,
          };
        } catch {
          /* not JSON, continue */
        }
      }

      // 8. Transform SSE stream to OpenAI format
      if (stream !== false) {
        const openaiStream = transformSSE(resp.body!, model || modelType);
        return {
          response: new Response(openaiStream, {
            status: 200,
            headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
          }),
          url: COMPLETION_URL,
          headers,
          transformedBody: requestPayload,
        };
      }

      // Non-streaming: collect all content, return OpenAI JSON
      const content = await collectSSEContent(resp.body!);
      const openaiResponse = {
        id: `chatcmpl-${Date.now()}`,
        object: "chat.completion",
        created: Math.floor(Date.now() / 1000),
        model: model || modelType,
        choices: [
          {
            index: 0,
            message: { role: "assistant", content },
            finish_reason: "stop",
          },
        ],
        usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      };
      return {
        response: new Response(JSON.stringify(openaiResponse), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
        url: COMPLETION_URL,
        headers,
        transformedBody: requestPayload,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      log?.error?.("DEEPSEEK-WEB", `Execute failed: ${msg}`);

      if (err instanceof DOMException && err.name === "AbortError") {
        return {
          response: errorResponse(499, "Request cancelled"),
          url: COMPLETION_URL,
          headers: {},
          transformedBody: body,
        };
      }

      return {
        response: errorResponse(502, `DeepSeek error: ${msg}`),
        url: COMPLETION_URL,
        headers: {},
        transformedBody: body,
      };
    }
  }
}

export const deepseekWebExecutor = new DeepSeekWebExecutor();

// Re-export for auto-refresh executor and tests
export { acquireAccessToken, tokenCache, sessionCache };
