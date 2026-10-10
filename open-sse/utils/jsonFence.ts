/**
 * JSON-mode fence unwrap for non-streaming responses.
 *
 * Providers that receive Structured Output as a prompt instruction (Claude-backed
 * targets especially) tend to answer with the JSON wrapped in a ```json fence.
 * Clients that `JSON.parse` the content — schema-parsed SDK calls, pydantic, the
 * Vercel AI SDK's generateObject — then fail. The fence is stripped ONLY when the
 * client actually asked for JSON output and ONLY when the whole content is one
 * fenced block: a fence inside prose stays user-visible content.
 *
 * Streaming is intentionally out of scope: unwrapping there would need a stateful
 * transform that holds back the opening fence across chunk boundaries.
 */

type JsonRecord = Record<string, unknown>;

const JSON_OUTPUT_TYPES = new Set(["json_schema", "json_object"]);
const FENCE = "```";

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function isJsonFormatType(format: unknown): boolean {
  const type = asRecord(format)?.type;
  return typeof type === "string" && JSON_OUTPUT_TYPES.has(type);
}

/**
 * True when the client request asked for JSON output: Chat Completions
 * `response_format.type` or Responses API `text.format.type` is
 * `json_schema` / `json_object`.
 */
export function wantsJsonOutput(body: unknown): boolean {
  const record = asRecord(body);
  if (!record) return false;
  return (
    isJsonFormatType(record.response_format) || isJsonFormatType(asRecord(record.text)?.format)
  );
}

/**
 * Unwrap content that is exactly one ```json (or bare ```) fenced block.
 * Anything else — prose around a fence, several blocks, another language tag,
 * non-strings — is returned unchanged.
 */
export function stripJsonFence(content: unknown): unknown {
  if (typeof content !== "string") return content;
  const trimmed = content.trim();
  if (!trimmed.startsWith(FENCE) || !trimmed.endsWith(FENCE)) return content;
  const firstNewline = trimmed.indexOf("\n");
  if (firstNewline === -1) return content;
  const lang = trimmed.slice(FENCE.length, firstNewline).trim().toLowerCase();
  if (lang !== "" && lang !== "json") return content;
  const inner = trimmed.slice(firstNewline + 1, trimmed.length - FENCE.length);
  if (inner.includes(FENCE)) return content;
  return inner.trim();
}

function unfenceChatChoices(response: JsonRecord): void {
  if (!Array.isArray(response.choices)) return;
  for (const choice of response.choices) {
    const message = asRecord(asRecord(choice)?.message);
    if (message && typeof message.content === "string") {
      message.content = stripJsonFence(message.content);
    }
  }
}

function unfenceResponsesOutput(response: JsonRecord): void {
  if (Array.isArray(response.output)) {
    for (const item of response.output) {
      const record = asRecord(item);
      if (record?.type !== "message" || !Array.isArray(record.content)) continue;
      for (const part of record.content) {
        const partRecord = asRecord(part);
        if (partRecord?.type === "output_text" && typeof partRecord.text === "string") {
          partRecord.text = stripJsonFence(partRecord.text);
        }
      }
    }
  }
  if (typeof response.output_text === "string") {
    response.output_text = stripJsonFence(response.output_text);
  }
}

/**
 * Unfence the assistant text of an OpenAI Chat (`choices[]`) or Responses API
 * (`output[]`) response, in place, when `clientBody` asked for JSON output.
 * Other response shapes are left untouched.
 */
export function unfenceJsonOutput<T>(clientBody: unknown, response: T): T {
  if (!wantsJsonOutput(clientBody)) return response;
  const record = asRecord(response);
  if (!record) return response;
  unfenceChatChoices(record);
  unfenceResponsesOutput(record);
  return response;
}
