/**
 * ConolExecutor — conol.ai browser-session chat (Unofficial/Experimental).
 *
 * Protocol verified against the web client on 2026-07-30:
 *   - POST /api/assets for raw image uploads
 *   - POST /api/sessions to create a session and submit typed messages
 *   - GET /api/sessions/{id}/messages?logDeltas=1 for cumulative NDJSON updates
 *   - Cookie authentication via __Secure-better-auth.session_token
 */
import { BaseExecutor, mergeAbortSignals, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult as makeErrorResult } from "../utils/error.ts";
import {
  CursorImageError,
  extractImageUrls,
  resolveCursorImages,
} from "../utils/cursorImages.ts";
import {
  normalizeConolCookie,
  resolveConolCredentials,
} from "../services/conolAuth.ts";
import { resolveConolModelSelection } from "../services/conolModels.ts";

export { normalizeConolCookie, resolveConolCredentials };

const CONOL_ORIGIN = "https://conol.ai";
const CONOL_SESSION_URL = `${CONOL_ORIGIN}/api/sessions`;
const CONOL_REQUEST_TIMEOUT_MS = 300_000;
const CONOL_MAX_STREAM_BYTES = 16 * 1024 * 1024;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36";

interface ChatMessage {
  role: string;
  content: unknown;
}

interface ConolRequestBody {
  messages?: ChatMessage[];
  model?: string;
  timezone?: string;
}

interface ConolMessagePart {
  type: "text" | "image";
  content: string;
  mediaType?: string;
}

export interface ParsedConolStream {
  text: string;
  usedTokens: number | null;
  contextWindow: number | null;
  modelId: string;
  done: boolean;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function extractText(value: unknown): string {
  if (typeof value === "string") return value;
  if (value == null) return "";
  if (Array.isArray(value)) {
    return value
      .map((item) => extractText(item))
      .filter(Boolean)
      .join("\n");
  }
  if (typeof value !== "object") return "";
  const record = value as Record<string, unknown>;
  const type = readString(record.type).toLowerCase();
  if (type === "image_url" || type === "input_image" || type === "image") return "";
  return (
    readString(record.text) ||
    (typeof record.content === "string" ? record.content : extractText(record.content)) ||
    extractText(record.output) ||
    extractText(record.result)
  );
}

function roleLabel(role: string): string {
  switch (role.toLowerCase()) {
    case "system":
    case "developer":
      return "System";
    case "assistant":
    case "model":
      return "Assistant";
    case "tool":
    case "function":
      return "Tool";
    default:
      return "User";
  }
}

export function buildConolPromptText(messages: ChatMessage[]): string {
  return messages
    .map((message) => {
      const text = extractText(message.content).trim();
      const hasImage = extractImageUrls(message.content).length > 0;
      const content = text || (hasImage ? "[Image attached]" : "");
      return content ? `[${roleLabel(message.role)}]\n${content}` : "";
    })
    .filter(Boolean)
    .join("\n\n");
}

function messageText(value: unknown): string {
  if (!value || typeof value !== "object" || Array.isArray(value)) return "";
  const message = value as Record<string, unknown>;
  if (readString(message.role).toLowerCase() !== "assistant") return "";
  return extractText(message.content).trim();
}

function stageAssistantText(
  stages: unknown,
  field: "logs" | "preview"
): string {
  if (!Array.isArray(stages)) return "";
  let result = "";
  for (const stage of stages) {
    if (!stage || typeof stage !== "object" || Array.isArray(stage)) continue;
    const entries = (stage as Record<string, unknown>)[field];
    if (!Array.isArray(entries)) continue;
    for (const entry of entries) {
      const text = messageText(entry);
      if (text) result = text;
    }
  }
  return result;
}

function parseEventLine(originalLine: string): unknown | null {
  let line = originalLine.trim();
  if (!line || line.startsWith(":") || line.startsWith("event:")) return null;
  if (line.startsWith("data:")) line = line.slice(5).trim();
  if (line.startsWith("message\t")) line = line.slice("message\t".length);
  if (!line) return null;
  if (line === "[DONE]") return { type: "done" };
  try {
    return JSON.parse(line);
  } catch {
    // Ignore non-JSON keepalive and timestamp lines.
    return null;
  }
}

function isDoneEvent(value: unknown): boolean {
  return (
    !!value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    readString((value as Record<string, unknown>).type) === "done"
  );
}

function parseEventLines(raw: string): unknown[] {
  const events: unknown[] = [];
  for (const line of raw.replace(/\r\n/g, "\n").split("\n")) {
    const event = parseEventLine(line);
    if (event) events.push(event);
  }
  return events;
}

/**
 * Conol emits a terminal `done` event but keeps the HTTP stream open. Reading
 * `response.text()` therefore waits until the request timeout even though the
 * assistant answer is already complete. Consume complete lines and cancel the
 * reader as soon as `done` arrives.
 */
export async function collectConolMessageStream(response: Response): Promise<string> {
  if (!response.body) return response.text();

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const lines: string[] = [];
  let pending = "";
  let totalBytes = 0;
  let doneEventReceived = false;

  try {
    while (!doneEventReceived) {
      const chunk = await reader.read();
      if (chunk.done) {
        pending += decoder.decode();
        break;
      }

      totalBytes += chunk.value.byteLength;
      if (totalBytes > CONOL_MAX_STREAM_BYTES) {
        throw new Error("Conol message stream exceeded the safety limit");
      }
      pending += decoder.decode(chunk.value, { stream: true });
      const completeLines = pending.split(/\r?\n/);
      pending = completeLines.pop() ?? "";
      for (const line of completeLines) {
        lines.push(line);
        if (isDoneEvent(parseEventLine(line))) {
          doneEventReceived = true;
          break;
        }
      }
    }

    if (!doneEventReceived && pending) lines.push(pending);
  } finally {
    if (doneEventReceived) {
      try {
        await reader.cancel();
      } catch {
        // The upstream may close at the same instant as its done event.
      }
    } else {
      reader.releaseLock();
    }
  }

  return lines.join("\n");
}

export function parseConolMessageStream(raw: string): ParsedConolStream {
  let finalizedText = "";
  let previewText = "";
  let streamedText = "";
  let usedTokens: number | null = null;
  let contextWindow: number | null = null;
  let modelId = "";
  let done = false;

  for (const value of parseEventLines(raw)) {
    if (!value || typeof value !== "object" || Array.isArray(value)) continue;
    const event = value as Record<string, unknown>;
    const type = readString(event.type);
    if (type === "done") {
      done = true;
      continue;
    }

    const finalCandidate = stageAssistantText(event.stages, "logs");
    const previewCandidate = stageAssistantText(event.stages, "preview");
    if (finalCandidate) finalizedText = finalCandidate;
    if (previewCandidate) previewText = previewCandidate;

    if (type === "assistant") {
      const direct = extractText(event.content ?? event.message ?? event.text).trim();
      if (direct) finalizedText = direct;
    } else if (type === "stream_event") {
      const delta = extractText(event.delta ?? event.content ?? event.text);
      if (delta) streamedText += delta;
    }

    const context =
      event.contextUsage &&
      typeof event.contextUsage === "object" &&
      !Array.isArray(event.contextUsage)
        ? (event.contextUsage as Record<string, unknown>)
        : null;
    if (context) {
      const used = Number(context.usedTokens);
      const window = Number(context.contextWindow);
      if (Number.isFinite(used)) usedTokens = used;
      if (Number.isFinite(window)) contextWindow = window;
      modelId = readString(context.modelId) || modelId;
    }
  }

  return {
    text: finalizedText || previewText || streamedText,
    usedTokens,
    contextWindow,
    modelId,
    done,
  };
}

function conolHeaders(cookie: string, extra?: Record<string, string>): Record<string, string> {
  return {
    accept: "application/json",
    "accept-language": "en-US,en;q=0.9",
    cookie,
    origin: CONOL_ORIGIN,
    referer: `${CONOL_ORIGIN}/home`,
    "user-agent": USER_AGENT,
    ...extra,
  };
}

function safeTimezone(value: unknown): string {
  const explicit = readString(value);
  if (/^[A-Za-z_+-]+(?:\/[A-Za-z0-9_+-]+)*$/.test(explicit)) return explicit;
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

async function uploadConolImages(
  cookie: string,
  imageUrls: string[],
  signal?: AbortSignal | null
): Promise<ConolMessagePart[]> {
  const images = await resolveCursorImages(imageUrls);
  const parts: ConolMessagePart[] = [];
  for (const image of images) {
    const response = await fetch(`${CONOL_ORIGIN}/api/assets`, {
      method: "POST",
      headers: conolHeaders(cookie, {
        accept: "application/json",
        "content-type": image.mimeType,
      }),
      body: image.data,
      signal: signal ?? undefined,
    });
    if (!response.ok) {
      throw new Error(`Conol image upload failed (HTTP ${response.status})`);
    }
    const payload = (await response.json()) as Record<string, unknown>;
    const id = readString(payload.id);
    if (!/^[A-Za-z0-9_-]+$/.test(id)) {
      throw new Error("Conol image upload returned an invalid asset ID");
    }
    parts.push({
      type: "image",
      content: `/api/assets/${id}`,
      mediaType: readString(payload.mediaType) || image.mimeType,
    });
  }
  return parts;
}

function estimateTokens(text: string): number {
  return Math.max(0, Math.ceil(text.length / 4));
}

function completionResponse(
  text: string,
  model: string,
  sessionId: string,
  prompt: string
): Response {
  const promptTokens = estimateTokens(prompt);
  const completionTokens = estimateTokens(text);
  return new Response(
    JSON.stringify({
      id: `chatcmpl-conol-${sessionId}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model,
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: text },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: promptTokens + completionTokens,
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

function streamResponse(text: string, model: string, sessionId: string): Response {
  const encoder = new TextEncoder();
  const id = `chatcmpl-conol-${sessionId}`;
  const created = Math.floor(Date.now() / 1000);
  const readable = new ReadableStream({
    start(controller) {
      const chunks = [
        {
          id,
          object: "chat.completion.chunk",
          created,
          model,
          choices: [{ index: 0, delta: { role: "assistant", content: text }, finish_reason: null }],
        },
        {
          id,
          object: "chat.completion.chunk",
          created,
          model,
          choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
        },
      ];
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(readable, {
    status: 200,
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      connection: "keep-alive",
    },
  });
}

export class ConolWebExecutor extends BaseExecutor {
  constructor() {
    super("conol-web", { id: "conol-web", baseUrl: CONOL_SESSION_URL });
  }

  async execute(input: ExecuteInput) {
    const requestBody = (input.body || {}) as ConolRequestBody;
    const messages = Array.isArray(requestBody.messages) ? requestBody.messages : [];
    const prompt = buildConolPromptText(messages);
    const imageUrls = messages.flatMap((message) => extractImageUrls(message.content));
    if (!prompt && imageUrls.length === 0) {
      return makeErrorResult(400, "No user message found", { model: input.model }, CONOL_SESSION_URL);
    }

    const { cookie } = resolveConolCredentials(input.credentials);
    if (!cookie) {
      return makeErrorResult(
        401,
        "Missing Conol session cookie — sign in with the browser or paste the Cookie header",
        { model: input.model },
        CONOL_SESSION_URL
      );
    }

    const { model, effort } = resolveConolModelSelection(input.model || requestBody.model);
    const timeoutSignal = AbortSignal.timeout(CONOL_REQUEST_TIMEOUT_MS);
    const upstreamSignal = input.signal
      ? mergeAbortSignals(input.signal, timeoutSignal)
      : timeoutSignal;
    try {
      const imageParts = await uploadConolImages(cookie, imageUrls, upstreamSignal);
      const parts: ConolMessagePart[] = [];
      if (prompt) parts.push({ type: "text", content: prompt });
      parts.push(...imageParts);

      const upstreamBody = {
        source: { type: "home" },
        messages: parts,
        timezone: safeTimezone(requestBody.timezone),
        agentModel: model,
        ...(effort ? { agentEffort: effort } : {}),
      };
      const createResponse = await fetch(CONOL_SESSION_URL, {
        method: "POST",
        headers: conolHeaders(cookie, { "content-type": "application/json" }),
        body: JSON.stringify(upstreamBody),
        signal: upstreamSignal,
      });
      if (createResponse.status === 401 || createResponse.status === 403) {
        return makeErrorResult(
          createResponse.status,
          "Conol session expired or is invalid — sign in again",
          { model },
          CONOL_SESSION_URL
        );
      }
      if (!createResponse.ok) {
        return makeErrorResult(
          createResponse.status,
          `Conol session creation failed (HTTP ${createResponse.status})`,
          { model },
          CONOL_SESSION_URL
        );
      }

      const created = (await createResponse.json()) as Record<string, unknown>;
      const sessionId = readString(created.sessionId);
      if (!/^[A-Za-z0-9_-]+$/.test(sessionId)) {
        return makeErrorResult(
          502,
          "Conol returned an invalid session identifier",
          { model },
          CONOL_SESSION_URL
        );
      }

      const messagesUrl = `${CONOL_SESSION_URL}/${sessionId}/messages?logDeltas=1`;
      const messageResponse = await fetch(messagesUrl, {
        method: "GET",
        headers: conolHeaders(cookie, { accept: "text/event-stream, application/x-ndjson" }),
        signal: upstreamSignal,
      });
      if (!messageResponse.ok) {
        return makeErrorResult(
          messageResponse.status,
          `Conol message stream failed (HTTP ${messageResponse.status})`,
          { model, sessionId },
          messagesUrl
        );
      }

      const parsed = parseConolMessageStream(await collectConolMessageStream(messageResponse));
      if (!parsed.text) {
        return makeErrorResult(
          502,
          "Conol returned no assistant response",
          { model, sessionId },
          messagesUrl
        );
      }
      const response = input.stream
        ? streamResponse(parsed.text, model, sessionId)
        : completionResponse(parsed.text, model, sessionId, prompt);

      return {
        response,
        url: messagesUrl,
        headers: { cookie: "***" },
        transformedBody: {
          model,
          ...(effort ? { effort } : {}),
          sessionId,
          imageCount: imageParts.length,
        },
      };
    } catch (error) {
      const isTimeout = error instanceof Error && error.name === "TimeoutError";
      const status = error instanceof CursorImageError ? error.status : isTimeout ? 504 : 502;
      const message =
        error instanceof CursorImageError
          ? error.message
          : isTimeout
            ? "Conol request timed out"
            : error instanceof Error && error.name === "AbortError"
              ? "Conol request was cancelled"
              : "Conol request failed";
      return makeErrorResult(status, message, { model }, CONOL_SESSION_URL);
    }
  }
}
