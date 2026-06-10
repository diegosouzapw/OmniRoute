/**
 * #3571 — `/v1/completions` is the legacy OpenAI Completions API. OmniRoute routes
 * it internally through the chat pipeline, which emits chat-shaped payloads
 * (`chat.completion` / `chat.completion.chunk` with `choices[].message|delta.content`).
 * Legacy Completion clients (e.g. TabbyML's `openai/completion` backend) require
 * `choices[].text` and `object: "text_completion"`, and crash on the chat shape
 * (`Error("missing field 'text'")`).
 *
 * These helpers translate a chat-shaped object/stream back to the legacy
 * text-completion shape so the endpoint honours its OpenAI Completions contract.
 */

type AnyRec = Record<string, any>;

function choiceText(choice: AnyRec): string {
  if (!choice || typeof choice !== "object") return "";
  // chat.completion → message.content; chat.completion.chunk → delta.content;
  // already-text shape → text.
  const text = choice.message?.content ?? choice.delta?.content ?? choice.text ?? "";
  return typeof text === "string" ? text : "";
}

/**
 * Convert a single chat.completion / chat.completion.chunk object into the legacy
 * text-completion shape (`object: "text_completion"`, `choices[].text`).
 * Non-object input and already-text_completion objects are returned unchanged.
 */
export function toTextCompletionObject(obj: AnyRec): AnyRec {
  if (!obj || typeof obj !== "object" || !Array.isArray(obj.choices)) return obj;

  const choices = obj.choices.map((c: AnyRec, i: number) => ({
    text: choiceText(c),
    index: typeof c?.index === "number" ? c.index : i,
    logprobs: c?.logprobs ?? null,
    finish_reason: c?.finish_reason ?? null,
  }));

  const out: AnyRec = {
    id: obj.id,
    object: "text_completion",
    created: obj.created,
    model: obj.model,
    choices,
  };
  if (obj.usage) out.usage = obj.usage;
  if (obj.system_fingerprint !== undefined) out.system_fingerprint = obj.system_fingerprint;
  return out;
}

/**
 * Transform the payload of a single SSE `data:` line. Returns the re-serialized
 * text-completion JSON, `"[DONE]"` unchanged, or the original payload when it is
 * not JSON we recognise.
 */
export function transformSseData(payload: string): string {
  const trimmed = payload.trim();
  if (trimmed === "" || trimmed === "[DONE]") return trimmed;
  try {
    return JSON.stringify(toTextCompletionObject(JSON.parse(trimmed)));
  } catch {
    return trimmed;
  }
}

function transformLine(line: string): string {
  if (!line.startsWith("data:")) return line;
  const payload = line.slice("data:".length).replace(/^ /, "");
  return "data: " + transformSseData(payload);
}

/**
 * A line-oriented SSE TransformStream that rewrites each `data:` event from chat
 * shape to text-completion shape, passing through blank separators and `[DONE]`.
 */
export function createTextCompletionStreamTransformer(): TransformStream<Uint8Array, Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  return new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true });
      let idx: number;
      while ((idx = buffer.indexOf("\n")) >= 0) {
        const line = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 1);
        controller.enqueue(encoder.encode(transformLine(line) + "\n"));
      }
    },
    flush(controller) {
      if (buffer.length > 0) controller.enqueue(encoder.encode(transformLine(buffer)));
    },
  });
}

/**
 * Wrap a chat-pipeline Response so `/v1/completions` returns the legacy
 * text-completion shape. Error responses and non-JSON/non-SSE bodies pass through.
 */
export async function asTextCompletionResponse(res: Response): Promise<Response> {
  if (!res.ok) return res;
  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("text/event-stream") && res.body) {
    return new Response(res.body.pipeThrough(createTextCompletionStreamTransformer()), {
      status: res.status,
      headers: res.headers,
    });
  }

  if (contentType.includes("application/json")) {
    const obj = await res.json().catch(() => null);
    if (obj === null) return res;
    const headers = new Headers(res.headers);
    headers.delete("content-length"); // body length changed after re-serialization
    return new Response(JSON.stringify(toTextCompletionObject(obj)), {
      status: res.status,
      headers,
    });
  }

  return res;
}
