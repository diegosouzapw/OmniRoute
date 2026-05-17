import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { solveDeepSeekPow } from "../lib/deepseek-pow.ts";

export const DEEPSEEK_WEB_BASE = "https://chat.deepseek.com";
const COMPLETION_URL = `${DEEPSEEK_WEB_BASE}/api/v0/chat/completion`;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// DeepSeek native API headers
const BASE_HEADERS: Record<string, string> = {
  "User-Agent": USER_AGENT,
  "x-app-version": "2.0.0",
  "x-client-platform": "web",
  "x-client-version": "2.0.0",
  "x-client-locale": "en_US",
};

// ── Types ────────────────────────────────────────────────────────────────

export interface DeepSeekCredentials {
  cookies: string;
}

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

// ── Helpers ──────────────────────────────────────────────────────────────

function validateCredentials(creds: unknown): creds is DeepSeekCredentials {
  const raw =
    typeof creds === "object" && creds !== null
      ? (creds as Record<string, unknown>).cookies
      : undefined;
  return typeof raw === "string" && raw.includes("ds_session_id=");
}

function errorResponse(status: number, message: string, dsCode?: number): Response {
  return new Response(
    JSON.stringify({
      error: { message, type: "upstream_error", code: dsCode ?? `HTTP_${status}` },
    }),
    { status, headers: { "Content-Type": "application/json" } }
  );
}

function mapModelToType(model?: string): { modelType: string; thinking: boolean } {
  if (!model) return { modelType: "default", thinking: false };
  const m = model.toLowerCase();
  if (m.includes("r1") || m.includes("reason") || m.includes("think"))
    return { modelType: "deepseek_r1", thinking: true };
  if (m.includes("v3")) return { modelType: "deepseek_v3", thinking: false };
  if (m.includes("expert")) return { modelType: "expert", thinking: true };
  return { modelType: "default", thinking: false };
}

// ── PoW Solver (DeepSeekHashV1) ─────────────────────────────────────────

function solvePow(challenge: PowChallenge): Record<string, unknown> {
  const answer = solveDeepSeekPow(
    challenge.algorithm,
    challenge.challenge,
    challenge.salt,
    challenge.difficulty,
    challenge.expire_at
  );
  if (answer < 0) throw new Error("PoW solver failed");
  return {
    algorithm: challenge.algorithm,
    challenge: challenge.challenge,
    salt: challenge.salt,
    answer,
    signature: challenge.signature,
    target_path: challenge.target_path,
  };
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
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();

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

            // Extract content from DeepSeek fragments
            const fragments = (data as any)?.v?.response?.fragments;
            if (Array.isArray(fragments)) {
              if (!emittedRole) {
                emittedRole = true;
                chunk({ role: "assistant", content: "" });
              }
              for (const frag of fragments) {
                if (typeof frag.content === "string" && frag.content.length > 0) {
                  chunk({ content: frag.content });
                }
              }
            }

            // Check for stream end
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

            // Also check event: close
            if ((data as any)?.click_behavior !== undefined) {
              // close event — emit [DONE] if not already
            }
          }
        }
      } catch (err) {
        // Stream error — emit what we have
      }

      // Fallback close
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
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6).trim();
      try {
        const data = JSON.parse(payload);
        const fragments = data?.v?.response?.fragments;
        if (Array.isArray(fragments)) {
          for (const frag of fragments) {
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

// ── DeepSeek API calls ──────────────────────────────────────────────────

async function getBearerToken(
  cookies: string,
  signal?: AbortSignal,
  log?: ExecuteInput["log"]
): Promise<string> {
  const resp = await fetch(`${DEEPSEEK_WEB_BASE}/api/v0/users/current`, {
    headers: { ...BASE_HEADERS, Cookie: cookies },
    signal,
  });
  if (!resp.ok) {
    throw new Error(`users/current HTTP ${resp.status}`);
  }
  const json = await resp.json();
  const token = json?.data?.biz_data?.token;
  if (!token) {
    throw new Error(`No token in users/current response: code=${json?.code} msg=${json?.msg}`);
  }
  log?.info?.("DEEPSEEK-WEB", `Got bearer token (${token.length} chars)`);
  return token;
}

async function createSession(
  token: string,
  cookies: string,
  signal?: AbortSignal
): Promise<string> {
  const resp = await fetch(`${DEEPSEEK_WEB_BASE}/api/v0/chat_session/create`, {
    method: "POST",
    headers: {
      ...BASE_HEADERS,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Cookie: cookies,
    },
    body: JSON.stringify({}),
    signal,
  });
  if (!resp.ok) throw new Error(`chat_session/create HTTP ${resp.status}`);
  const json = await resp.json();
  const id = json?.data?.biz_data?.chat_session?.id;
  if (!id) throw new Error(`No session id: code=${json?.code}`);
  return id;
}

async function getPowChallenge(
  token: string,
  cookies: string,
  signal?: AbortSignal
): Promise<PowChallenge> {
  const resp = await fetch(`${DEEPSEEK_WEB_BASE}/api/v0/chat/create_pow_challenge`, {
    method: "POST",
    headers: {
      ...BASE_HEADERS,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Cookie: cookies,
    },
    body: JSON.stringify({ target_path: "/api/v0/chat/completion" }),
    signal,
  });
  if (!resp.ok) throw new Error(`create_pow_challenge HTTP ${resp.status}`);
  const json = await resp.json();
  const challenge = json?.data?.biz_data?.challenge;
  if (!challenge?.challenge) throw new Error(`No PoW challenge: code=${json?.code}`);
  return challenge as PowChallenge;
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
      const cookies = String((credentials as any)?.cookies || "");
      if (!cookies.includes("ds_session_id=")) return false;
      const token = await getBearerToken(cookies, signal);
      return !!token;
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

    // 1. Validate credentials
    if (!validateCredentials(rawCreds)) {
      return {
        response: errorResponse(400, "Invalid credentials: requires ds_session_id cookie"),
        url: COMPLETION_URL,
        headers: {},
        transformedBody: body,
      };
    }
    const cookies = rawCreds.cookies;

    try {
      // 2. Get bearer token from session cookie
      log?.info?.("DEEPSEEK-WEB", "Getting bearer token...");
      const token = await getBearerToken(cookies, signal, log);

      // 3. Create chat session
      log?.info?.("DEEPSEEK-WEB", "Creating chat session...");
      const sessionId = await createSession(token, cookies, signal);

      // 4. Get PoW challenge and solve
      log?.info?.("DEEPSEEK-WEB", "Getting PoW challenge...");
      const powChallenge = await getPowChallenge(token, cookies, signal);
      log?.info?.("DEEPSEEK-WEB", `Solving PoW (difficulty=${powChallenge.difficulty})...`);
      const powSolution = solvePow(powChallenge);
      log?.info?.("DEEPSEEK-WEB", `PoW solved: nonce=${powSolution.answer}`);

      // 5. Build prompt from messages
      const prompt = messages
        .map((m) => {
          if (m.role === "system") return `[System]: ${m.content}`;
          if (m.role === "assistant") return `[Assistant]: ${m.content}`;
          return m.content;
        })
        .join("\n");

      // 6. Map model and extract features from request body
      const { modelType, thinking } = mapModelToType(model as string);
      const thinkingEnabled =
        thinking || bodyObj.thinking_enabled === true || bodyObj.thinking === true;
      const searchEnabled =
        bodyObj.search_enabled === true || bodyObj.search === true || bodyObj.web_search === true;
      const refFileIds = Array.isArray(bodyObj.ref_file_ids) ? bodyObj.ref_file_ids : [];
      log?.info?.(
        "DEEPSEEK-WEB",
        `model_type=${modelType}, thinking=${thinkingEnabled}, search=${searchEnabled}, files=${refFileIds.length}, stream=${stream !== false}`
      );

      // 7. Send completion request
      const headers: Record<string, string> = {
        ...BASE_HEADERS,
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
        "x-ds-pow-response": Buffer.from(JSON.stringify(powSolution)).toString("base64"),
        "x-client-timezone-offset": String(new Date().getTimezoneOffset() * -60),
        Cookie: cookies,
        Referer: `${DEEPSEEK_WEB_BASE}/`,
      };
      if (thinkingEnabled) {
        headers["x-thinking-enabled"] = "1";
      }

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

      log?.info?.("DEEPSEEK-WEB", `POST ${COMPLETION_URL}`);
      const resp = await fetch(COMPLETION_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(requestPayload),
        signal,
      });

      if (!resp.ok) {
        const status = resp.status;
        let errMsg = `DeepSeek API error (${status})`;
        if (status === 401 || status === 403) {
          errMsg = "DeepSeek session expired — re-paste your ds_session_id cookie.";
        } else if (status === 429) {
          errMsg = "DeepSeek rate limited. Wait and retry.";
        }
        log?.warn?.("DEEPSEEK-WEB", errMsg);

        // Check for DeepSeek JSON error body
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
            return {
              response: errorResponse(status, errMsg, json.code),
              url: COMPLETION_URL,
              headers,
              transformedBody: requestPayload,
            };
          }
          // Valid JSON response (shouldn't happen for streaming, but handle it)
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
