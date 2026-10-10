/**
 * VeniceWebExecutor — Privacy-Focused AI Chat via venice.ai
 *
 * Endpoint: POST https://outerface.venice.ai/api/inference/chat
 * Auth: Clerk `__client` cookie (clerk.venice.ai) exchanged for a short-lived
 *       session JWT sent as `Authorization: Bearer` (see venice-web-auth.ts).
 * Response: newline-delimited JSON events ({kind: "content"|"meta", ...}) served
 *       as text/html, translated here to OpenAI chat.completion(.chunk).
 */
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult as makeErrorResult } from "../utils/error.ts";
import {
  VENICE_APP_URL,
  VeniceAuthError,
  decodeJwtPayload,
  evictSessionJwt,
  extractClientJwt,
  getSessionJwt,
} from "./venice-web-auth.ts";

const INFERENCE_URL = "https://outerface.venice.ai/api/inference/chat";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36";

interface VeniceEvent {
  kind?: string;
  content?: string;
  reasoning_content?: string;
}

function extractText(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return String(content ?? "");
  return content
    .filter((c: Record<string, unknown>) => c?.type === "text")
    .map((c: Record<string, unknown>) => String(c.text ?? ""))
    .join("");
}

function randomRequestId(): string {
  return Math.random().toString(36).slice(2, 9).padEnd(7, "0");
}

export function buildVeniceBody(
  bodyObj: Record<string, unknown>,
  modelId: string,
  userId: string
): Record<string, unknown> {
  const messages = (bodyObj.messages as Array<{ role: string; content: unknown }>) || [];
  const temperature = typeof bodyObj.temperature === "number" ? bodyObj.temperature : 0.7;
  const topP = typeof bodyObj.top_p === "number" ? bodyObj.top_p : 0.9;
  return {
    modelId,
    prompt: messages.map((m) => ({ role: m.role, content: extractText(m.content) })),
    reasoning: false,
    temperature,
    topP,
    requestId: randomRequestId(),
    userId,
    simpleMode: false,
    includeVeniceSystemPrompt: false,
    webEnabled: false,
    webScrapeEnabled: false,
    xSearchEnabled: false,
    conversationType: "text",
    enableLargeContextChat: false,
    isCharacter: false,
    clientProcessingTime: 0,
  };
}

/** Parse one NDJSON line defensively; unparseable lines are skipped. */
export function parseVeniceLine(line: string): VeniceEvent | null {
  const trimmed = line.trim();
  if (!trimmed) return null;
  try {
    const parsed = JSON.parse(trimmed);
    return parsed && typeof parsed === "object" ? (parsed as VeniceEvent) : null;
  } catch {
    return null;
  }
}

function veniceHeaders(jwt: string): Record<string, string> {
  return {
    "Content-Type": "application/json",
    "User-Agent": USER_AGENT,
    Accept: "*/*",
    Referer: `${VENICE_APP_URL}/`,
    Origin: VENICE_APP_URL,
    Authorization: `Bearer ${jwt}`,
    "x-venice-request-timestamp-ms": String(Date.now()),
    "x-venice-version": "interface@web",
    "x-venice-middleface-version": "outerface@web",
  };
}

function chunkOf(id: string, model: string, delta: object, finish: string | null = null) {
  return {
    id,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, delta, finish_reason: finish }],
  };
}

function transformStream(
  upstream: ReadableStream<Uint8Array>,
  model: string,
  signal?: AbortSignal | null
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const id = `chatcmpl-ven-${Date.now()}`;
  return new ReadableStream({
    async start(controller) {
      const emit = (obj: object) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      const handle = (line: string) => {
        const ev = parseVeniceLine(line);
        if (ev?.kind !== "content") return;
        if (ev.content) emit(chunkOf(id, model, { content: ev.content }));
        else if (ev.reasoning_content) {
          emit(chunkOf(id, model, { reasoning_content: ev.reasoning_content }));
        }
      };
      const reader = upstream.getReader();
      let buffer = "";
      emit(chunkOf(id, model, { role: "assistant", content: "" }));
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          lines.forEach(handle);
        }
        handle(buffer);
      } catch (err) {
        if (!signal?.aborted) controller.error(err);
        return;
      }
      emit(chunkOf(id, model, {}, "stop"));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
}

export async function collectContent(upstream: Response): Promise<string> {
  const text = await upstream.text();
  let out = "";
  for (const line of text.split("\n")) {
    const ev = parseVeniceLine(line);
    if (ev?.kind === "content" && ev.content) out += ev.content;
  }
  return out;
}

export class VeniceWebExecutor extends BaseExecutor {
  constructor() {
    super("venice-web", { id: "venice-web", baseUrl: VENICE_APP_URL });
  }

  async execute(input: ExecuteInput) {
    const { body, credentials, signal, stream: wantStream } = input;
    const bodyObj = (body || {}) as Record<string, unknown>;
    const clientJwt = extractClientJwt(String(credentials?.apiKey ?? ""));
    if (!clientJwt) {
      return makeErrorResult(401, "Venice: missing __client cookie", body, INFERENCE_URL);
    }

    let jwt: string;
    try {
      jwt = await getSessionJwt(clientJwt, signal);
    } catch (err) {
      const status = err instanceof VeniceAuthError ? err.status : 502;
      const msg = err instanceof Error ? err.message : "unknown";
      return makeErrorResult(status, `Venice auth failed: ${msg}`, body, INFERENCE_URL);
    }

    const modelId = (bodyObj.model as string) || "venice-default";
    const userId = String(decodeJwtPayload(jwt).sub ?? "");
    const reqBody = buildVeniceBody(bodyObj, modelId, userId);
    const reqHeaders = veniceHeaders(jwt);

    let upstream: Response;
    try {
      upstream = await fetch(INFERENCE_URL, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(reqBody),
        signal,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "unknown";
      return makeErrorResult(502, `Venice fetch failed: ${msg}`, body, INFERENCE_URL);
    }

    if (!upstream.ok) {
      if (upstream.status === 401 || upstream.status === 403) evictSessionJwt(clientJwt);
      const errText = await upstream.text().catch(() => "");
      return makeErrorResult(upstream.status, `Venice error: ${errText}`, body, INFERENCE_URL);
    }

    if (!wantStream) {
      const content = await collectContent(upstream);
      const response = new Response(
        JSON.stringify({
          id: `chatcmpl-ven-${Date.now()}`,
          object: "chat.completion",
          created: Math.floor(Date.now() / 1000),
          model: modelId,
          choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
        }),
        { headers: { "Content-Type": "application/json" } }
      );
      return { response, url: INFERENCE_URL, headers: reqHeaders, transformedBody: reqBody };
    }

    const sse = transformStream(
      upstream.body ?? new ReadableStream({ start: (c) => c.close() }),
      modelId,
      signal
    );
    return {
      response: new Response(sse, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      }),
      url: INFERENCE_URL,
      headers: reqHeaders,
      transformedBody: reqBody,
    };
  }
}
