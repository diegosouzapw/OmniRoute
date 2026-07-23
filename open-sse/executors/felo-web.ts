import { randomUUID } from "node:crypto";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";

/**
 * FeloWebExecutor — anonymous, free access to Felo (felo.ai), a chat/search-agent
 * aggregator. No API key or session cookie required (`needs_auth = False` in the
 * g4f reference implementation, `g4f/Provider/Felo.py`, fetched 2026-07-17).
 *
 * Flow:
 * 1. POST /api-proxy/main/search/threads — opens a search thread, returns `stream_key`.
 * 2. GET /api/message/v1/stream/{stream_key}?offset=0 — SSE-shaped stream. Each line is
 *    `data:{...}` (no space after the colon, unlike most SSE producers). The JSON payload
 *    carries a double-encoded `content` string; parsing that yields `{ data: { type, data } }`
 *    where `type` is `"answer"` (incremental/snapshot text) or `"final_contexts"` (sources,
 *    dropped here — no OpenAI-compatible slot for citations on this translation path).
 *
 * Felo has no published API; this is a reverse-engineered, scrape-style integration in the
 * same family as `duckduckgo-web.ts` / `blackbox-web.ts` (see #6666 plan). It may break
 * without notice if Felo changes its frontend contract.
 */

export const FELO_BASE = "https://felo.ai";
export const FELO_THREADS_URL = `${FELO_BASE}/api-proxy/main/search/threads`;
export const FELO_PROVIDER_PREFIX = "felo-web/";

export function feloStreamUrl(streamKey: string): string {
  return `${FELO_BASE}/api/message/v1/stream/${encodeURIComponent(streamKey)}?offset=0`;
}

const FELO_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36";

export const FELO_HEADERS: Record<string, string> = {
  Accept: "*/*",
  "Content-Type": "application/json",
  Origin: FELO_BASE,
  Referer: `${FELO_BASE}/search?q=hello`,
  "User-Agent": FELO_USER_AGENT,
};

const FELO_STREAM_REQUEST_HEADERS: Record<string, string> = {
  Accept: "*/*",
  Origin: FELO_BASE,
  Referer: FELO_HEADERS.Referer,
  "User-Agent": FELO_USER_AGENT,
};

// Mirrors g4f's `Felo.model_aliases` — Felo has no published model list; this
// reverse-engineered mapping is the only reference (category drives which
// search/answer pipeline Felo routes the query through).
const FELO_MODEL_CATEGORIES: Record<string, string> = {
  "felo-chat": "chat",
  "felo-search": "google",
  "felo-scholar": "scholar",
  "felo-social": "social",
  "felo-document": "document",
};

export const FELO_DEFAULT_MODEL = "felo-chat";

export function normalizeFeloModel(model: string | undefined | null): string {
  if (!model) return FELO_DEFAULT_MODEL;
  const clean = model.startsWith(FELO_PROVIDER_PREFIX)
    ? model.slice(FELO_PROVIDER_PREFIX.length)
    : model;
  return Object.prototype.hasOwnProperty.call(FELO_MODEL_CATEGORIES, clean)
    ? clean
    : FELO_DEFAULT_MODEL;
}

export function resolveFeloCategory(model: string | undefined | null): string {
  return FELO_MODEL_CATEGORIES[normalizeFeloModel(model)];
}

export function extractFeloLastUserPrompt(messages: Array<Record<string, unknown>>): string {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return "";
  const content = lastUser.content;
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => {
      if (part && typeof part === "object" && typeof (part as Record<string, unknown>).text === "string") {
        return (part as Record<string, unknown>).text as string;
      }
      return "";
    })
    .filter(Boolean)
    .join("\n");
}

export function buildFeloThreadPayload(
  model: string | undefined | null,
  prompt: string
): Record<string, unknown> {
  const searchUuid = randomUUID();
  return {
    query: prompt,
    search_uuid: searchUuid,
    lang: "",
    agent_lang: "en",
    search_options: { langcode: "en-US" },
    search_video: true,
    query_from: "default",
    category: resolveFeloCategory(model),
    model: "",
    auto_routing: true,
    mode: "concise",
    device_id: randomUUID().replaceAll("-", ""),
    source_message_rid: "",
    documents: [],
    document_action: "",
    slides_source: { type: "ask_question", files: {} },
    slide_template_uid: "",
    selected_resource_ids: [],
    process_id: searchUuid,
    stream_protocol: "message_center_v1",
    enable_task_state: true,
  };
}

function extractFeloAnswerText(contentJson: unknown): string | null {
  if (!contentJson || typeof contentJson !== "object") return null;
  const data = (contentJson as Record<string, unknown>).data;
  if (!data || typeof data !== "object") return null;
  const dataRecord = data as Record<string, unknown>;
  if (dataRecord.type !== "answer") return null;
  const inner = dataRecord.data;
  if (!inner || typeof inner !== "object") return null;
  const text = (inner as Record<string, unknown>).text;
  return typeof text === "string" ? text : null;
}

export interface FeloParsedLine {
  /** New text to emit for this line, or null when the line carried nothing new. */
  newText: string | null;
  /** Running "previous text" snapshot to pass into the next call. */
  nextPreviousText: string;
}

/**
 * Parse a single line of Felo's SSE-shaped stream, diffing against the running
 * snapshot the same way the g4f reference implementation does: each `answer`
 * event carries the full text-so-far, and only the new suffix is new content.
 */
export function parseFeloStreamLine(line: string, previousText: string): FeloParsedLine {
  const trimmed = line.trim();
  if (!trimmed.startsWith("data:{")) {
    return { newText: null, nextPreviousText: previousText };
  }

  let outer: unknown;
  try {
    outer = JSON.parse(trimmed.slice(5));
  } catch {
    return { newText: null, nextPreviousText: previousText };
  }

  const content = (outer as Record<string, unknown> | null)?.content;
  if (typeof content !== "string") {
    return { newText: null, nextPreviousText: previousText };
  }

  let contentJson: unknown;
  try {
    contentJson = JSON.parse(content);
  } catch {
    return { newText: null, nextPreviousText: previousText };
  }

  const text = extractFeloAnswerText(contentJson);
  if (text === null) {
    return { newText: null, nextPreviousText: previousText };
  }

  if (text.startsWith(previousText)) {
    const newPart = text.slice(previousText.length);
    return newPart
      ? { newText: newPart, nextPreviousText: text }
      : { newText: null, nextPreviousText: previousText };
  }

  return { newText: text, nextPreviousText: text };
}

/** Replay a full raw stream body through `parseFeloStreamLine`, returning the final text. */
export function accumulateFeloStreamText(rawText: string): string {
  let previousText = "";
  for (const line of rawText.split("\n")) {
    previousText = parseFeloStreamLine(line, previousText).nextPreviousText;
  }
  return previousText;
}

export class FeloWebExecutor extends BaseExecutor {
  constructor() {
    super("felo-web", { baseUrl: FELO_BASE });
  }

  async testConnection(
    _credentials: Record<string, unknown>,
    signal?: AbortSignal
  ): Promise<boolean> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.getTimeoutMs());
    try {
      const mergedSignal = signal
        ? AbortSignal.any([signal, controller.signal])
        : controller.signal;

      const response = await fetch(FELO_THREADS_URL, {
        method: "POST",
        headers: FELO_HEADERS,
        body: JSON.stringify(buildFeloThreadPayload(FELO_DEFAULT_MODEL, "hi")),
        signal: mergedSignal,
      });
      if (!response.ok) return false;
      const data = await response.json().catch(() => null);
      return typeof (data as Record<string, unknown> | null)?.stream_key === "string";
    } catch {
      return false;
    } finally {
      clearTimeout(timeout);
    }
  }

  async execute(input: ExecuteInput): Promise<Response> {
    const { model, body, stream, signal } = input;
    const bodyObj = (body || {}) as Record<string, unknown>;
    const messages = Array.isArray(bodyObj.messages)
      ? (bodyObj.messages as Array<Record<string, unknown>>)
      : [];
    const isStreaming = stream !== false;

    if (messages.length === 0) {
      return feloErrorResponse(400, "No messages provided");
    }
    const prompt = extractFeloLastUserPrompt(messages);
    if (!prompt) {
      return feloErrorResponse(400, "No user message content found");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.getTimeoutMs());
    const mergedSignal = signal ? AbortSignal.any([signal, controller.signal]) : controller.signal;

    try {
      const streamKey = await this.createFeloThread(model, prompt, mergedSignal);
      if (streamKey instanceof Response) {
        clearTimeout(timeout);
        return streamKey;
      }

      const streamResponse = await fetch(feloStreamUrl(streamKey), {
        method: "GET",
        headers: FELO_STREAM_REQUEST_HEADERS,
        signal: mergedSignal,
      });
      clearTimeout(timeout);

      if (!streamResponse.ok || !streamResponse.body) {
        const status = !streamResponse.ok && streamResponse.status >= 500 ? 502 : streamResponse.status || 502;
        return feloErrorResponse(status, `Felo stream request failed with HTTP ${streamResponse.status}`);
      }

      return await processFeloResponse(streamResponse, isStreaming);
    } catch (error) {
      clearTimeout(timeout);
      if (error instanceof DOMException && error.name === "AbortError") {
        return feloErrorResponse(499, "Request cancelled");
      }
      return feloErrorResponse(500, error instanceof Error ? error.message : "Unknown error");
    }
  }

  /** Returns the resolved `stream_key`, or an error Response to propagate as-is. */
  private async createFeloThread(
    model: string | undefined,
    prompt: string,
    signal: AbortSignal
  ): Promise<string | Response> {
    const threadResponse = await fetch(FELO_THREADS_URL, {
      method: "POST",
      headers: FELO_HEADERS,
      body: JSON.stringify(buildFeloThreadPayload(model, prompt)),
      signal,
    });

    if (!threadResponse.ok) {
      const status = threadResponse.status >= 500 ? 502 : threadResponse.status;
      return feloErrorResponse(status, `Felo thread creation failed with HTTP ${threadResponse.status}`);
    }

    const threadJson = await threadResponse.json().catch(() => null);
    const streamKey = (threadJson as Record<string, unknown> | null)?.stream_key;
    if (typeof streamKey !== "string" || !streamKey) {
      return feloErrorResponse(502, "Felo did not return a stream_key");
    }
    return streamKey;
  }
}

function feloErrorResponse(status: number, message: string): Response {
  return new Response(JSON.stringify({ error: { message: sanitizeErrorMessage(message) } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function buildFeloStreamTransform(): TransformStream<Uint8Array, Uint8Array> {
  let previousText = "";
  let buffer = "";
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  return new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const parsed = parseFeloStreamLine(line, previousText);
        previousText = parsed.nextPreviousText;
        if (!parsed.newText) continue;
        const openaiChunk = { choices: [{ delta: { content: parsed.newText }, index: 0 }] };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(openaiChunk)}\n\n`));
      }
    },
    flush(controller) {
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
    },
  });
}

async function processFeloResponse(response: Response, streaming: boolean): Promise<Response> {
  if (streaming) {
    if (!response.body) {
      return feloErrorResponse(500, "No response body");
    }
    const transformed = response.body.pipeThrough(buildFeloStreamTransform());
    return new Response(transformed, { headers: { "Content-Type": "text/event-stream" } });
  }

  const rawText = await response.text();
  const fullText = accumulateFeloStreamText(rawText);
  return new Response(
    JSON.stringify({
      choices: [
        {
          message: { role: "assistant", content: fullText },
          index: 0,
          finish_reason: "stop",
        },
      ],
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}

export const feloWebExecutor = new FeloWebExecutor();
