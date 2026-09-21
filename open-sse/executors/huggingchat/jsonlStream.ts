// Pure JSONL stream translation (HuggingChat NDJSON -> OpenAI SSE). Verbatim from huggingchat.ts.

import { HUGGINGCHAT_MAX_BODY_BYTES } from "../../config/constants.ts";

const MAX_BODY_EXCEEDED_MESSAGE =
  "HuggingChat response exceeded the maximum supported size before completing";

export class HuggingChatStreamError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HuggingChatStreamError";
  }
}

function cancelReader(reader: ReadableStreamDefaultReader<Uint8Array>): void {
  try {
    void reader.cancel().catch(() => undefined);
  } catch {
    // The error event is authoritative; transport cleanup is best effort.
  }
}

function bindReaderCancellation(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  signal?: AbortSignal | null
): () => void {
  if (!signal) return () => undefined;

  const cancel = () => cancelReader(reader);
  if (signal.aborted) {
    cancel();
    return () => undefined;
  }

  signal.addEventListener("abort", cancel, { once: true });
  return () => signal.removeEventListener("abort", cancel);
}

export function sseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

export function parseJsonlLine(line: string): {
  token?: string;
  done?: boolean;
  error?: string;
  text?: string;
} {
  try {
    const event = JSON.parse(line);

    if (event.type === "stream" && typeof event.token === "string") {
      const token = event.token.replace(/\0/g, "");
      if (token) return { token };
    }

    if (event.type === "finalAnswer" && typeof event.text === "string") {
      return { text: event.text, done: true };
    }

    if (event.type === "status") {
      if (event.status === "error") {
        return { error: event.message || "HuggingChat generation error" };
      }
      if (event.status === "finished") {
        return { done: true };
      }
    }
  } catch {
    // Skip non-JSON lines
  }

  return {};
}

export async function* streamJsonlToOpenAi(
  body: ReadableStream<Uint8Array>,
  model: string,
  id: string,
  created: number,
  signal?: AbortSignal | null,
  cancellationSignal?: AbortSignal | null,
  maxBytes: number = HUGGINGCHAT_MAX_BODY_BYTES
): AsyncGenerator<string> {
  const reader = body.getReader();
  const unbindReaderCancellation = bindReaderCancellation(reader, cancellationSignal);
  // Also bind the plain `signal` so an already-in-flight `reader.read()` unblocks the
  // instant it aborts, instead of only being noticed the next time the loop polls
  // `signal?.aborted` (#12577 — a stalled upstream can otherwise leave the read
  // suspended forever even once a caller-supplied timeout signal has fired).
  const unbindSignalCancellation = bindReaderCancellation(reader, signal);
  const decoder = new TextDecoder();
  let buffer = "";
  let emittedRole = false;
  let fullText = "";
  let finished = false;
  let totalBytes = 0;
  let exceededCap = false;

  try {
    while (true) {
      if (signal?.aborted) break;

      const { value, done } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        exceededCap = true;
        cancelReader(reader);
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        const parsed = parseJsonlLine(trimmed);

        if (parsed.error) {
          cancelReader(reader);
          throw new HuggingChatStreamError(parsed.error);
        }

        if (parsed.token) {
          if (!emittedRole) {
            emittedRole = true;
            yield sseChunk({
              id,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
            });
          }

          fullText += parsed.token;
          yield sseChunk({
            id,
            object: "chat.completion.chunk",
            created,
            model,
            choices: [{ index: 0, delta: { content: parsed.token }, finish_reason: null }],
          });
        }

        if (parsed.text) {
          const remaining = parsed.text.slice(fullText.length);
          if (remaining) {
            if (!emittedRole) {
              emittedRole = true;
              yield sseChunk({
                id,
                object: "chat.completion.chunk",
                created,
                model,
                choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
              });
            }
            yield sseChunk({
              id,
              object: "chat.completion.chunk",
              created,
              model,
              choices: [{ index: 0, delta: { content: remaining }, finish_reason: null }],
            });
          }
          finished = true;
          break;
        }

        if (parsed.done) {
          finished = true;
          break;
        }
      }

      if (finished) break;
    }

    if (!finished && !exceededCap && buffer.trim()) {
      const parsed = parseJsonlLine(buffer.trim());
      if (parsed.error) {
        throw new HuggingChatStreamError(parsed.error);
      }
      if (parsed.token && !signal?.aborted) {
        if (!emittedRole) {
          emittedRole = true;
          yield sseChunk({
            id,
            object: "chat.completion.chunk",
            created,
            model,
            choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
          });
        }
        yield sseChunk({
          id,
          object: "chat.completion.chunk",
          created,
          model,
          choices: [{ index: 0, delta: { content: parsed.token }, finish_reason: null }],
        });
      }
    }
  } finally {
    unbindReaderCancellation();
    unbindSignalCancellation();
    reader.releaseLock();
  }

  if (exceededCap) {
    yield sseChunk({
      id,
      object: "chat.completion.chunk",
      created,
      model,
      error: {
        message: MAX_BODY_EXCEEDED_MESSAGE,
        type: "upstream_error",
        code: "huggingchat_payload_too_large",
      },
    });
    yield "data: [DONE]\n\n";
    return;
  }

  if (!signal?.aborted && !cancellationSignal?.aborted) {
    yield sseChunk({
      id,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    });
    if (!signal?.aborted && !cancellationSignal?.aborted) {
      yield "data: [DONE]\n\n";
    }
  }
}

export async function readJsonlResponse(
  body: ReadableStream<Uint8Array>,
  signal?: AbortSignal | null,
  maxBytes: number = HUGGINGCHAT_MAX_BODY_BYTES
): Promise<string> {
  const reader = body.getReader();
  // Bind the signal so an already-in-flight `reader.read()` unblocks the instant it
  // aborts, instead of only being noticed the next time the loop polls `signal?.aborted`
  // (#12577 — a stalled upstream can otherwise leave the read suspended forever even
  // once a caller-supplied timeout signal has fired).
  const unbindSignalCancellation = bindReaderCancellation(reader, signal);
  const decoder = new TextDecoder();
  let buffer = "";
  let fullText = "";
  let totalBytes = 0;

  try {
    while (true) {
      if (signal?.aborted) break;

      const { value, done } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        cancelReader(reader);
        throw new HuggingChatStreamError(MAX_BODY_EXCEEDED_MESSAGE);
      }

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        const parsed = parseJsonlLine(trimmed);
        if (parsed.token) fullText += parsed.token;
        if (parsed.text) return parsed.text;
        if (parsed.error) {
          cancelReader(reader);
          throw new HuggingChatStreamError(parsed.error);
        }
      }
    }

    if (buffer.trim()) {
      const parsed = parseJsonlLine(buffer.trim());
      if (parsed.text) return parsed.text;
      if (parsed.token) fullText += parsed.token;
      if (parsed.error) throw new HuggingChatStreamError(parsed.error);
    }
  } finally {
    unbindSignalCancellation();
    reader.releaseLock();
  }

  return fullText;
}
