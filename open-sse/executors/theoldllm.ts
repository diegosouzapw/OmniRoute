import { BaseExecutor, type ExecuteInput } from "./base.ts";
import type { ProviderCredentials } from "./base.ts";

const API_BASE = "https://theoldllm.vercel.app";
const API_PATH = "/api/chatgpt";
const API_URL = `${API_BASE}${API_PATH}`;
const CHROME_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36";

// ── Model name mapping ────────────────────────────────────────────────────

const GPT_MODELS: Record<string, string> = {
  "gpt-5.4": "GPT_5_4",
  "gpt-5.3": "GPT_5_3",
  "gpt-5.2": "GPT_5_2",
  "gpt-5.1": "GPT_5_1",
  "gpt-5": "GPT_5",
  "gpt5_4": "GPT_5_4",
  "gpt5_3": "GPT_5_3",
  "gpt5_2": "GPT_5_2",
  "gpt5_1": "GPT_5_1",
  "gpt_4o": "GPT_4O",
  "gpt-4o": "GPT_4O",
  "gpt_5_3": "GPT_5_3",
  "gpt_5_2": "GPT_5_2",
  "gpt_5_1": "GPT_5_1",
  "gpt_5": "GPT_5",
};

const CLAUDE_NAMES: Record<string, string> = {
  "claude-4.6-opus": "CLAUDE_4_6_OPUS",
  "claude-4.6-sonnet": "CLAUDE_4_6_SONNET",
  "claude-4.5-haiku": "CLAUDE_4_5_HAIKU",
  "claude_opus_4": "CLAUDE_4_6_OPUS",
  "claude_sonnet_4": "CLAUDE_4_6_SONNET",
  "claude_haiku_3_5": "CLAUDE_4_5_HAIKU",
  "claude opus 4": "CLAUDE_4_6_OPUS",
  "claude sonnet 4": "CLAUDE_4_6_SONNET",
  "claude haiku 3.5": "CLAUDE_4_5_HAIKU",
};

function mapModel(model: string): string {
  const n = model.toLowerCase().trim();
  const gptKey = n.replace(/[_\s]+/g, "-");
  if (GPT_MODELS[gptKey]) return GPT_MODELS[gptKey];
  const gptKey2 = n.replace(/[-\s]+/g, "_");
  if (GPT_MODELS[gptKey2]) return GPT_MODELS[gptKey2];
  if (CLAUDE_NAMES[n]) return CLAUDE_NAMES[n];
  if (n.includes("claude")) {
    if (n.includes("opus")) return "CLAUDE_4_6_OPUS";
    if (n.includes("sonnet")) return "CLAUDE_4_6_SONNET";
    if (n.includes("haiku")) return "CLAUDE_4_5_HAIKU";
  }
  if (n.includes("gpt") && n.includes("5")) return "GPT_5_4";
  return "GPT_5_4";
}

// ── Token generation (mirrors client-side rie() from theoldllm.vercel.app) ──
//
// The SPA generates X-Request-Token via:
//   const nie = "oldllm-client-2026";
//   const n = Date.now();
//   const e = `${n}-${nie}-${navigator.userAgent.slice(0, 20)}`;
//   let t = djb2_hash(e);
//   const r = crypto.randomUUID().slice(0, 8);
//   return `${n.toString(36)}-${Math.abs(t).toString(36)}-${r}`;
//
// Since nie is a static constant and the UA prefix is known, we can generate
// valid tokens server-side without launching a browser.

const TOKEN_SEED = "oldllm-client-2026";
const UA_PREFIX = CHROME_UA.slice(0, 20); // "Mozilla/5.0 (Windows"

export function generateRequestToken(): string {
  const n = Date.now();
  const e = `${n}-${TOKEN_SEED}-${UA_PREFIX}`;
  let t = 0;
  for (let i = 0; i < e.length; i++) {
    const s = e.charCodeAt(i);
    t = (t << 5) - t + s;
    t = t & t;
  }
  const r = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  return `${n.toString(36)}-${Math.abs(t).toString(36)}-${r}`;
}

// Exported for test compatibility — the new server-side token flow generates
// tokens per-request; this stub satisfies imports that set tokenCache.value.
export const tokenCache: { value: string; expiresAt: number } = { value: "", expiresAt: 0 };

// ── Direct Node.js fetch ──────────────────────────────────────────────────

async function directFetch(
  reqBody: Record<string, unknown>,
  signal?: AbortSignal | null,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 120_000);
  const onSignal = signal
    ? () => controller.abort(signal.reason)
    : undefined;
  signal?.addEventListener("abort", onSignal!, { once: true });

  try {
    return await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Version": "3.8.4",
        "X-Request-Token": generateRequestToken(),
        "User-Agent": CHROME_UA,
      },
      body: JSON.stringify(reqBody),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
    if (onSignal) signal?.removeEventListener("abort", onSignal);
  }
}

function isTokenRejected(status: number, body: string): boolean {
  if (status === 401 || status === 403) return true;
  try {
    const p = JSON.parse(body);
    return (
      p?.error?.type === "access_denied" ||
      (typeof p?.error === "string" && /blocked|denied|invalid/i.test(p.error))
    );
  } catch {
    return false;
  }
}

// ── SSE helpers ───────────────────────────────────────────────────────────

function parseSseContent(sseText: string): string {
  let content = "";
  for (const line of sseText.split("\n")) {
    if (line.startsWith("data: ") && line !== "data: [DONE]") {
      try {
        const d = JSON.parse(line.slice(6));
        content += d.choices?.[0]?.delta?.content || d.choices?.[0]?.delta?.text || "";
      } catch {}
    }
  }
  return content;
}

function buildChatCompletion(content: string, model: string): string {
  return JSON.stringify({
    id: `chatcmpl-${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: mapModel(model),
    choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
    usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  });
}

function buildErrorResponse(status: number, body: string): string {
  let detail = body;
  for (const line of body.split("\n")) {
    if (line.startsWith("data: ") && line !== "data: [DONE]") {
      try {
        const p = JSON.parse(line.slice(6));
        if (p.error) { detail = JSON.stringify(p.error); break; }
      } catch {}
    }
  }
  return JSON.stringify({
    error: { message: detail, type: "upstream_error", code: `HTTP_${status}` },
  });
}

// ── Executor ──────────────────────────────────────────────────────────────

export class TheOldLlmExecutor extends BaseExecutor {
  constructor() {
    super("theoldllm", { format: "openai" });
  }

  buildUrl(_model: string, _stream: boolean): string {
    return API_URL;
  }

  buildHeaders(_credentials: ProviderCredentials): Record<string, string> {
    return {
      "Content-Type": "application/json",
      "X-Client-Version": "3.8.4",
      "User-Agent": CHROME_UA,
    };
  }

  transformRequest(model: string, body: unknown, _stream: boolean): unknown {
    if (typeof body === "object" && body !== null) {
      return { ...(body as Record<string, unknown>), model: mapModel(model) };
    }
    return body;
  }

  async testConnection(
    _credentials: ProviderCredentials,
    _signal?: AbortSignal | null,
    log?: ExecuteInput["log"],
  ): Promise<boolean> {
    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Client-Version": "3.8.4",
          "X-Request-Token": generateRequestToken(),
          "User-Agent": CHROME_UA,
        },
        body: JSON.stringify({
          model: "GPT_5_4",
          messages: [{ role: "user", content: "ping" }],
          stream: false,
        }),
        signal: _signal ?? undefined,
      });
      return resp.status === 200;
    } catch {
      log?.warn?.("THEOLDLLM", "testConnection network error");
      return false;
    }
  }

  async execute(input: ExecuteInput): Promise<{
    response: Response;
    url: string;
    headers: Record<string, string>;
    transformedBody: unknown;
  }> {
    const { model, stream, body, signal, log } = input;
    const encoder = new TextEncoder();

    if (signal?.aborted) {
      return {
        response: new Response(encoder.encode(JSON.stringify({
          error: { message: "Request aborted", type: "abort", code: "ABORTED" },
        })), { status: 499, headers: { "Content-Type": "application/json" } }),
        url: API_URL,
        headers: this.buildHeaders(input.credentials),
        transformedBody: body,
      };
    }

    try {
      const reqBody = {
        ...(body as Record<string, unknown>),
        model: mapModel(model),
        stream: true,
      };

      let upstream = await directFetch(reqBody, signal);
      let finalBody = await upstream.text();

      if (isTokenRejected(upstream.status, finalBody)) {
        log?.warn?.("THEOLDLLM", `Token rejected (${upstream.status}), retrying with fresh token…`);
        upstream = await directFetch(reqBody, signal);
        finalBody = await upstream.text();
      }

      if (upstream.status === 200 && finalBody) {
        const payload = stream
          ? finalBody
          : buildChatCompletion(parseSseContent(finalBody), model);
        return {
          response: new Response(encoder.encode(payload), {
            status: 200,
            headers: {
              "Content-Type": stream ? "text/event-stream" : "application/json",
              "Cache-Control": "no-cache",
            },
          }),
          url: API_URL,
          headers: this.buildHeaders(input.credentials),
          transformedBody: body,
        };
      }

      return {
        response: new Response(encoder.encode(buildErrorResponse(upstream.status, finalBody)), {
          status: upstream.status,
          headers: { "Content-Type": "application/json" },
        }),
        url: API_URL,
        headers: this.buildHeaders(input.credentials),
        transformedBody: body,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      log?.error?.("THEOLDLLM", `Executor error: ${msg}`);
      return {
        response: new Response(
          encoder.encode(
            JSON.stringify({
              error: { message: msg, type: "upstream_error", code: "EXECUTOR_ERROR" },
            }),
          ),
          { status: 502, headers: { "Content-Type": "application/json" } },
        ),
        url: API_URL,
        headers: this.buildHeaders(input.credentials),
        transformedBody: body,
      };
    }
  }
}

export default TheOldLlmExecutor;
