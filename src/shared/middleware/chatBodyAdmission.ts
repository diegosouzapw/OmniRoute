/**
 * Bounded admission for POST /v1/chat/completions.
 *
 * Large chat bodies amplify into multiple transient representations while they are parsed,
 * translated, compressed, and dispatched. A heap snapshot alone cannot prevent two healthy
 * requests from entering that allocation-heavy path together. This module reserves process-
 * local heavyweight capacity before parsing and enforces the hard limit against bytes read,
 * not an untrusted Content-Length header.
 */

import { CORS_HEADERS } from "../utils/cors";

function parsePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export const CHAT_LARGE_BODY_BYTES = parsePositiveInt(
  process.env.OMNIROUTE_CHAT_LARGE_BODY_BYTES,
  256 * 1024
);

export const CHAT_HARD_MAX_BODY_BYTES = parsePositiveInt(
  process.env.OMNIROUTE_CHAT_HARD_MAX_BODY_BYTES,
  50 * 1024 * 1024
);

const CHAT_MAX_HEAVY_IN_FLIGHT = parsePositiveInt(
  process.env.OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT,
  1
);

export const CHAT_HEAVY_MESSAGE_COUNT = parsePositiveInt(
  process.env.OMNIROUTE_CHAT_HEAVY_MESSAGE_COUNT,
  200
);
export const CHAT_HEAVY_TOOL_COUNT = parsePositiveInt(
  process.env.OMNIROUTE_CHAT_HEAVY_TOOL_COUNT,
  64
);
export const CHAT_HEAVY_ESTIMATED_TOKENS = parsePositiveInt(
  process.env.OMNIROUTE_CHAT_HEAVY_ESTIMATED_TOKENS,
  32_000
);
export const CHAT_HARD_MAX_MESSAGES = parsePositiveInt(
  process.env.OMNIROUTE_CHAT_HARD_MAX_MESSAGES,
  800
);

export interface ChatAdmissionLease {
  readonly released: boolean;
  release(): void;
}

/**
 * Process-local heavyweight reservation. The capacity check and increment execute in one
 * synchronous JavaScript turn, making acquisition atomic within an OmniRoute process.
 * Queueing is intentionally separate: unavailable capacity is a retryable 503.
 */
export class ChatAdmissionController {
  #activeHeavy = 0;

  constructor(readonly maxHeavyInFlight = 1) {
    if (!Number.isSafeInteger(maxHeavyInFlight) || maxHeavyInFlight < 1) {
      throw new RangeError("maxHeavyInFlight must be a positive integer");
    }
  }

  get activeHeavy(): number {
    return this.#activeHeavy;
  }

  tryAcquireHeavy(): ChatAdmissionLease | null {
    if (this.#activeHeavy >= this.maxHeavyInFlight) return null;
    this.#activeHeavy += 1;
    let released = false;
    return {
      get released() {
        return released;
      },
      release: () => {
        if (released) return;
        released = true;
        this.#activeHeavy = Math.max(0, this.#activeHeavy - 1);
      },
    };
  }
}

const defaultAdmissionController = new ChatAdmissionController(CHAT_MAX_HEAVY_IN_FLIGHT);

export type ChatRequestAdmission =
  | { admit: true; request: Request; lease: ChatAdmissionLease | null }
  | { admit: false; response: Response };

export type ChatStructureAdmission =
  | { admit: true; lease: ChatAdmissionLease | null }
  | { admit: false; response: Response };

function rejectionResponse(status: 413 | 503, hardMaxBytes: number): Response {
  const isPayload = status === 413;
  const headers: Record<string, string> = {
    ...CORS_HEADERS,
    "Content-Type": "application/json",
  };
  if (!isPayload) headers["Retry-After"] = "2";
  return new Response(
    JSON.stringify({
      error: {
        message: isPayload
          ? `Request body too large for chat completions (max ${Math.floor(
              hardMaxBytes / (1024 * 1024)
            )} MB).`
          : "Chat admission capacity is temporarily unavailable. Retry shortly.",
        type: isPayload ? "payload_too_large" : "server_error",
        code: isPayload ? "PAYLOAD_TOO_LARGE" : "chat_admission_busy",
      },
    }),
    { status, headers }
  );
}

function structuralRejectionResponse(status: 413 | 503, maxMessages: number): Response {
  const historyLimit = status === 413;
  const headers: Record<string, string> = {
    ...CORS_HEADERS,
    "Content-Type": "application/json",
  };
  if (!historyLimit) headers["Retry-After"] = "1";

  return new Response(
    JSON.stringify({
      error: {
        message: historyLimit
          ? `Chat history exceeds the ${maxMessages}-message limit; compact the conversation and retry.`
          : "Structurally heavy chat request capacity is busy; retry shortly.",
        type: historyLimit ? "payload_too_large" : "server_error",
        code: historyLimit ? "chat_history_too_large" : "chat_admission_busy",
        reason: historyLimit ? "message_limit" : "structure_limit",
      },
    }),
    { status, headers }
  );
}

type TokenEstimate = { tokens: number; exhausted: boolean };

function conservativeStringTokens(value: string, remaining: number): number {
  let tokens = 0;
  for (const character of value) {
    tokens += character.codePointAt(0)! < 0x80 ? 0.25 : 1;
    if (tokens >= remaining) return remaining;
  }
  return tokens;
}

function estimateStructureTokens(value: unknown, limit: number): TokenEstimate {
  let tokens = 0;
  let visited = 0;
  const maxNodes = 10_000;
  const stack: Array<{ value: unknown; depth: number }> = [{ value, depth: 0 }];
  while (stack.length > 0 && tokens < limit && visited < maxNodes) {
    const current = stack.pop();
    if (!current) break;
    visited += 1;
    if (typeof current.value === "string") {
      tokens += conservativeStringTokens(current.value, limit - tokens);
      continue;
    }
    if (!current.value || typeof current.value !== "object") continue;
    if (current.depth >= 12) return { tokens, exhausted: true };

    const remainingNodes = maxNodes - visited - stack.length;
    if (Array.isArray(current.value)) {
      if (current.value.length > remainingNodes) return { tokens, exhausted: true };
      for (const child of current.value) stack.push({ value: child, depth: current.depth + 1 });
      continue;
    }

    let children = 0;
    for (const key in current.value) {
      if (!Object.hasOwn(current.value, key)) continue;
      children += 1;
      if (children > remainingNodes) return { tokens, exhausted: true };
      tokens += conservativeStringTokens(key, limit - tokens);
      if (tokens >= limit) return { tokens: limit, exhausted: false };
      stack.push({
        value: (current.value as Record<string, unknown>)[key],
        depth: current.depth + 1,
      });
    }
  }
  return { tokens, exhausted: stack.length > 0 && tokens < limit };
}

export function admitChatStructure(
  body: unknown,
  lease: ChatAdmissionLease | null,
  options: {
    controller?: ChatAdmissionController;
    maxMessages?: number;
    heavyMessages?: number;
    heavyTools?: number;
    heavyTokens?: number;
  } = {}
): ChatStructureAdmission {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { admit: true, lease };

  const record = body as Record<string, unknown>;
  const messages = Array.isArray(record.messages) ? record.messages : [];
  const tools = Array.isArray(record.tools) ? record.tools : [];
  const maxMessages = options.maxMessages ?? CHAT_HARD_MAX_MESSAGES;
  if (messages.length > maxMessages) {
    return { admit: false, response: structuralRejectionResponse(413, maxMessages) };
  }

  const heavyMessages = options.heavyMessages ?? CHAT_HEAVY_MESSAGE_COUNT;
  const heavyTools = options.heavyTools ?? CHAT_HEAVY_TOOL_COUNT;
  const heavyTokens = options.heavyTokens ?? CHAT_HEAVY_ESTIMATED_TOKENS;
  const countHeavy = messages.length >= heavyMessages || tools.length >= heavyTools;
  if (!countHeavy && lease) return { admit: true, lease };

  const messageEstimate = estimateStructureTokens(messages, heavyTokens);
  const toolEstimate = messageEstimate.exhausted
    ? { tokens: 0, exhausted: true }
    : estimateStructureTokens(tools, heavyTokens - messageEstimate.tokens);
  const estimatedTokens = Math.min(heavyTokens, messageEstimate.tokens + toolEstimate.tokens);
  const heavy =
    countHeavy ||
    messageEstimate.exhausted ||
    toolEstimate.exhausted ||
    estimatedTokens >= heavyTokens;
  if (!heavy || lease) return { admit: true, lease };

  const acquired = (options.controller ?? defaultAdmissionController).tryAcquireHeavy();
  return acquired
    ? { admit: true, lease: acquired }
    : { admit: false, response: structuralRejectionResponse(503, maxMessages) };
}

function parseContentLength(header: string | null): number | null {
  if (header === null || !/^(0|[1-9]\d*)$/.test(header.trim())) return null;
  const parsed = Number(header);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

function rebuildRequest(request: Request, body: Uint8Array): Request {
  const headers = new Headers(request.headers);
  // The inbound value may be absent or dishonest. Let the runtime derive the correct value.
  headers.delete("content-length");
  return new Request(request.url, {
    method: request.method,
    headers,
    body,
    signal: request.signal,
    duplex: "half",
  } as RequestInit & { duplex: "half" });
}

/**
 * Reserve heavyweight capacity and ingest the body with a hard byte bound before JSON
 * parsing. Missing/invalid Content-Length is sniffed only up to the heavyweight threshold;
 * a lease is acquired atomically before retaining bytes at or beyond that threshold.
 */
export async function admitChatRequest(
  request: Request,
  options: {
    controller?: ChatAdmissionController;
    largeBodyBytes?: number;
    hardMaxBytes?: number;
  } = {}
): Promise<ChatRequestAdmission> {
  const controller = options.controller ?? defaultAdmissionController;
  const largeBodyBytes = options.largeBodyBytes ?? CHAT_LARGE_BODY_BYTES;
  const hardMaxBytes = options.hardMaxBytes ?? CHAT_HARD_MAX_BODY_BYTES;
  const contentLength = parseContentLength(request.headers.get("content-length"));

  if (contentLength !== null && contentLength > hardMaxBytes) {
    return { admit: false, response: rejectionResponse(413, hardMaxBytes) };
  }

  let lease: ChatAdmissionLease | null = null;
  const reserve = (): boolean => {
    if (lease) return true;
    lease = controller.tryAcquireHeavy();
    return lease !== null;
  };

  // A known-large declaration can reserve before ingestion. Unknown lengths are boundedly
  // sniffed below; this avoids consuming scarce heavyweight capacity for small chunked bodies.
  if (contentLength !== null && contentLength >= largeBodyBytes && !reserve()) {
    return { admit: false, response: rejectionResponse(503, hardMaxBytes) };
  }

  const reader = request.body?.getReader();
  if (!reader) return { admit: true, request, lease };

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > hardMaxBytes) {
        await reader.cancel("chat request exceeds hard body limit").catch(() => undefined);
        lease?.release();
        return { admit: false, response: rejectionResponse(413, hardMaxBytes) };
      }
      if (totalBytes >= largeBodyBytes && !reserve()) {
        await reader.cancel("chat admission capacity unavailable").catch(() => undefined);
        return { admit: false, response: rejectionResponse(503, hardMaxBytes) };
      }
      chunks.push(value);
    }
  } catch (error) {
    lease?.release();
    throw error;
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return { admit: true, request: rebuildRequest(request, body), lease };
}

/** Release a lease if a handler rejects; otherwise bind it to the returned response lifecycle. */
export async function releaseChatAdmissionAfterHandler(
  responsePromise: Promise<Response>,
  lease: ChatAdmissionLease | null
): Promise<Response> {
  try {
    return releaseChatAdmissionWhenDone(await responsePromise, lease);
  } catch (error) {
    lease?.release();
    throw error;
  }
}

/** Hold a heavyweight lease through an SSE response without buffering the response body. */
export function releaseChatAdmissionWhenDone(
  response: Response,
  lease: ChatAdmissionLease | null
): Response {
  if (!lease) return response;
  const isStreaming = response.headers.get("content-type")?.includes("text/event-stream");
  if (!isStreaming || !response.body) {
    lease.release();
    return response;
  }

  const reader = response.body.getReader();
  const body = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          lease.release();
          controller.close();
        } else {
          controller.enqueue(value);
        }
      } catch (error) {
        lease.release();
        controller.error(error);
      }
    },
    async cancel(reason) {
      lease.release();
      await reader.cancel(reason).catch(() => undefined);
    },
  });

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
