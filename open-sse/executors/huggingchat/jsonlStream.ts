// Pure JSONL stream translation (HuggingChat NDJSON -> OpenAI SSE). Verbatim from huggingchat.ts.

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
  cancellationSignal?: AbortSignal | null
): AsyncGenerator<string> {
  const reader = body.getReader();
  const unbindReaderCancellation = bindReaderCancellation(reader, cancellationSignal);
  const decoder = new TextDecoder();
  let buffer = "";
  let emittedRole = false;
  let fullText = "";
  let finished = false;

  try {
    while (true) {
      if (signal?.aborted) break;

      const { value, done } = await reader.read();
      if (done) break;

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

    if (!finished && buffer.trim()) {
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
    reader.releaseLock();
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
  signal?: AbortSignal | null
): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullText = "";

  try {
    while (true) {
      if (signal?.aborted) break;

      const { value, done } = await reader.read();
      if (done) break;

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
    reader.releaseLock();
  }

  return fullText;
}
