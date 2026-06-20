/**
 * #1311: echo the client-requested model/alias name back in the response.
 *
 * When a request uses an alias or combo (e.g. `claude-sonnet-cx` → `cx/gpt-5.5`),
 * OmniRoute forwards the upstream model name (`gpt-5.5`) in the response `model`
 * field. Strict clients (e.g. Claude Desktop) validate that the response model
 * matches the request and reject the mismatch with a 401. This opt-in helper
 * rewrites the `model` field back to the name the client asked for.
 *
 * The behavior is gated by a global setting (`echoRequestedModelName`, default off),
 * so the default response stays byte-for-byte unchanged.
 */

/**
 * Rewrite the top-level `model` field of a parsed response object (Chat Completions
 * JSON or an OpenAI SSE chunk) to `echoModel`. Mutates and returns `obj`. No-op when
 * `echoModel` is falsy or `obj` has no string `model` field.
 */
export function echoModelInObject(obj: unknown, echoModel: string | null | undefined): unknown {
  if (!echoModel) return obj;
  if (obj && typeof obj === "object" && !Array.isArray(obj)) {
    const rec = obj as Record<string, unknown>;
    if (typeof rec.model === "string") {
      rec.model = echoModel;
    }
  }
  return obj;
}

/**
 * Rewrite the `model` field inside a single SSE line. Only `data: {json}` lines that
 * carry a string `model` are rewritten; `data: [DONE]`, comments, event lines, and
 * unparseable payloads pass through untouched.
 */
export function echoModelInSseLine(line: string, echoModel: string | null | undefined): string {
  if (!echoModel) return line;
  if (!line.startsWith("data:")) return line;
  const payload = line.slice(5).trim();
  if (!payload || payload === "[DONE]" || payload[0] !== "{") return line;
  try {
    const parsed = JSON.parse(payload) as Record<string, unknown>;
    if (typeof parsed.model !== "string") return line;
    parsed.model = echoModel;
    return `data: ${JSON.stringify(parsed)}`;
  } catch {
    return line;
  }
}

/**
 * A TransformStream that rewrites the `model` field in every SSE `data:` chunk of a
 * UTF-8 byte stream to `echoModel`. Buffers across chunk boundaries so a `data:` frame
 * split across two reads is still rewritten correctly. Used as the final pipe stage of
 * the streaming response when the echo setting is on.
 */
export function createModelEchoTransform(echoModel: string | null | undefined): TransformStream {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  return new TransformStream({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true });
      // Emit complete lines; keep the trailing partial line in the buffer.
      const lastNewline = buffer.lastIndexOf("\n");
      if (lastNewline === -1) return;
      const ready = buffer.slice(0, lastNewline + 1);
      buffer = buffer.slice(lastNewline + 1);
      const rewritten = ready
        .split("\n")
        .map((line) => echoModelInSseLine(line, echoModel))
        .join("\n");
      controller.enqueue(encoder.encode(rewritten));
    },
    flush(controller) {
      const tail = buffer + decoder.decode();
      if (tail) controller.enqueue(encoder.encode(echoModelInSseLine(tail, echoModel)));
    },
  });
}
