/**
 * Some OpenAI-compatible upstreams stream `choices[].delta.content` as an array of
 * typed chunks instead of a string. Mistral reasoning models (e.g.
 * `labs-leanstral-1-5`) send their thinking this way:
 *
 *   {"delta": {"content": [{"type": "thinking", "thinking": [{"type": "text", "text": "The"}]}]}}
 *   {"delta": {"content": [{"type": "text", "text": "Hi"}]}}
 *
 * OpenAI's chat-chunk contract requires `delta.content` to be a string, and the
 * Responses translator forwards it verbatim as `response.output_text.delta.delta`,
 * which strict Responses clients reject ("malformed response.output_text.delta delta").
 *
 * These helpers fold such a delta back into the OpenAI shape in place: text parts
 * become the `content` string, thinking parts are appended to `reasoning_content`.
 */

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function partsText(value: unknown): string {
  if (typeof value === "string") return value;
  if (!Array.isArray(value)) return "";
  return value
    .map((part) => (isRecord(part) && typeof part.text === "string" ? part.text : ""))
    .join("");
}

/** Normalize one `delta` object. Returns true when it was changed. */
export function normalizeArrayContentDelta(delta: JsonRecord): boolean {
  if (!Array.isArray(delta.content)) return false;

  let text = "";
  let thinking = "";
  for (const part of delta.content) {
    if (!isRecord(part)) continue;
    if (part.type === "text" && typeof part.text === "string") {
      text += part.text;
    } else if (part.type === "thinking") {
      thinking += partsText(part.thinking);
    }
  }

  if (text) delta.content = text;
  else delete delta.content;

  if (thinking) {
    delta.reasoning_content =
      (typeof delta.reasoning_content === "string" ? delta.reasoning_content : "") + thinking;
  }
  return true;
}

/** Normalize every `choices[].delta` of an OpenAI chat-completion chunk. */
export function normalizeArrayContentChunk(chunk: unknown): boolean {
  if (!isRecord(chunk) || !Array.isArray(chunk.choices)) return false;
  let changed = false;
  for (const choice of chunk.choices) {
    if (isRecord(choice) && isRecord(choice.delta)) {
      changed = normalizeArrayContentDelta(choice.delta) || changed;
    }
  }
  return changed;
}
