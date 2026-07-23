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
 *
 * When `requestedModel` is provided, the returned `model` echoes the caller's
 * requested identifier rather than the upstream provider's post-routing model
 * string. Legacy OpenAI Completions clients pin cache keys / observability to
 * the model they asked for, and the `x-omniroute-model` response header
 * already advertises the request-side identifier — the body must match.
 */
export function toTextCompletionObject(obj: AnyRec, requestedModel?: string): AnyRec {
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
    model: requestedModel ?? obj.model,
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
export function transformSseData(payload: string, requestedModel?: string): string {
  const trimmed = payload.trim();
  if (trimmed === "" || trimmed === "[DONE]") return trimmed;
  try {
    return JSON.stringify(toTextCompletionObject(JSON.parse(trimmed), requestedModel));
  } catch {
    return trimmed;
  }
}

function transformLine(line: string, requestedModel?: string): string {
  if (!line.startsWith("data:")) return line;
  const payload = line.slice("data:".length).replace(/^ /, "");
  return "data: " + transformSseData(payload, requestedModel);
}

/**
 * A line-oriented SSE TransformStream that rewrites each `data:` event from chat
 * shape to text-completion shape, passing through blank separators and `[DONE]`.
 */
export function createTextCompletionStreamTransformer(
  requestedModel?: string
): TransformStream<Uint8Array, Uint8Array> {
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
        controller.enqueue(encoder.encode(transformLine(line, requestedModel) + "\n"));
      }
    },
    flush(controller) {
      if (buffer.length > 0)
        controller.enqueue(encoder.encode(transformLine(buffer, requestedModel)));
    },
  });
}

/**
 * Wrap a chat-pipeline Response so `/v1/completions` returns the legacy
 * text-completion shape. Error responses and non-JSON/non-SSE bodies pass through.
 *
 * When `requestedModel` is provided, response `body.model` echoes the caller's
 * requested identifier (matching the `x-omniroute-model` response header).
 */
export async function asTextCompletionResponse(
  res: Response,
  requestedModel?: string
): Promise<Response> {
  if (!res.ok) return res;
  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("text/event-stream") && res.body) {
    // Re-serialization changes the byte length, so drop any upstream content-length
    // (a buffered SSE body could otherwise advertise a stale length and truncate/hang
    // the client), mirroring the JSON branch below. (#3821-review LEDGER-8)
    const headers = new Headers(res.headers);
    headers.delete("content-length");
    return new Response(
      res.body.pipeThrough(createTextCompletionStreamTransformer(requestedModel)),
      {
        status: res.status,
        headers,
      }
    );
  }

  if (contentType.includes("application/json")) {
    const obj = await res.json().catch(() => null);
    if (obj === null) return res;
    const headers = new Headers(res.headers);
    headers.delete("content-length"); // body length changed after re-serialization
    return new Response(JSON.stringify(toTextCompletionObject(obj, requestedModel)), {
      status: res.status,
      headers,
    });
  }

  return res;
}
