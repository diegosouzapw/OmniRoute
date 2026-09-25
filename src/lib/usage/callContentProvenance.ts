/**
 * Call content presence plus usage provenance (leaf module, no open-sse imports).
 *
 * Distinguishes an empty rendered reply from provider metering that never
 * arrived: `has_content` is measured on the client-visible body, while the
 * usage provenance tells whether token counts were reported, estimated
 * locally, or absent. Nullable by design — unknown is never a claim.
 */

export type UsageProvenance = "reported" | "estimated" | "absent";

// Same token-field inventory as hasValidUsage (open-sse/utils/usageTracking.ts):
// a usage object counts as reported when any known field is positive.
// NOTE: keep in sync if that inventory gains a field.
const TOKEN_FIELDS = [
  "prompt_tokens",
  "completion_tokens",
  "total_tokens",
  "input_tokens",
  "output_tokens",
  "promptTokenCount",
  "candidatesTokenCount",
  "totalTokenCount",
] as const;

export function hasTokenCount(tokens: unknown): boolean {
  if (!tokens || typeof tokens !== "object" || Array.isArray(tokens)) return false;
  const record = tokens as Record<string, unknown>;
  for (const field of TOKEN_FIELDS) {
    const value = record[field];
    if (typeof value === "number" && Number.isFinite(value) && value > 0) return true;
  }
  return false;
}

export function isOwnEstimatedUsage(tokens: unknown): boolean {
  if (!tokens || typeof tokens !== "object" || Array.isArray(tokens)) return false;
  return (tokens as Record<string, unknown>).estimated === true;
}

export function resolveUsageProvenance(options: {
  usageEstimated: boolean;
  tokens: unknown;
  isSuccess: boolean;
}): UsageProvenance | null {
  if (!options.isSuccess) return null;
  if (options.usageEstimated || isOwnEstimatedUsage(options.tokens)) return "estimated";
  if (hasTokenCount(options.tokens)) return "reported";
  return "absent";
}

const NON_TEXT_REQUEST_TYPES = new Set([
  "audio",
  "image",
  "video",
  "speech",
  "transcription",
  "translation",
  "embedding",
  "rerank",
  "search",
]);

const NON_TEXT_PATH_PATTERN = /\/v1\/(audio|images|videos)\/|audio|images|realtime|websocket/i;

export function isNonTextRequest(requestType: unknown, path: unknown): boolean {
  if (typeof requestType === "string" && NON_TEXT_REQUEST_TYPES.has(requestType)) return true;
  if (typeof path === "string" && NON_TEXT_PATH_PATTERN.test(path)) return true;
  return false;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function hasNonBlankText(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function hasToolCalls(value: unknown): boolean {
  if (!Array.isArray(value)) return false;
  return value.length > 0;
}

function messageHasContent(message: Record<string, unknown>): boolean | null {
  if (hasNonBlankText(message.content)) return true;
  if (
    hasToolCalls(message.tool_calls) ||
    (message.function_call !== undefined && message.function_call !== null) ||
    hasToolCalls(message.tool_uses)
  ) {
    return true;
  }
  if (hasNonBlankText(message.text)) return true;
  const recognized =
    "content" in message ||
    "tool_calls" in message ||
    "function_call" in message ||
    "tool_uses" in message ||
    "text" in message ||
    "reasoning_content" in message ||
    "reasoning" in message ||
    "thinking" in message;
  if (!recognized) return null;
  return false;
}

const TOOL_CALL_TYPES = new Set(["tool_call", "function_call", "custom_tool_call", "tool_use"]);

const MEDIA_KEY = /audio|image|video|data|base64|url/i;

// One chat choice: true/false when measurable, "media" for non-text output,
// null when the shape says nothing.
function choiceContent(choiceRecord: Record<string, unknown>): boolean | "media" | null {
  const message = asRecord(choiceRecord.message) ?? asRecord(choiceRecord.delta);
  if (!message) {
    if (hasNonBlankText(choiceRecord.text)) return true;
    return "finish_reason" in choiceRecord || "text" in choiceRecord ? false : null;
  }
  const result = messageHasContent(message);
  if (result !== null) return result;
  return Object.keys(message).some((key) => MEDIA_KEY.test(key)) ? "media" : null;
}

function choicesContent(choices: unknown[]): boolean | null {
  let recognizedAny = false;
  for (const choice of choices) {
    const choiceRecord = asRecord(choice);
    const result = choiceRecord ? choiceContent(choiceRecord) : null;
    if (result === true) return true;
    if (result === "media") return null;
    if (result === false) recognizedAny = true;
  }
  return recognizedAny ? false : null;
}

// Claude Messages: `content` is an array of typed blocks (text, tool_use,
// thinking); only non-blank text or a tool call is rendered content.
function claudeBlocksContent(content: unknown): boolean | null {
  if (!Array.isArray(content)) return null;
  let seen = false;
  for (const block of content) {
    const blockRecord = asRecord(block);
    if (!blockRecord) continue;
    if (hasNonBlankText(blockRecord.text) || blockRecord.type === "tool_use") return true;
    if (typeof blockRecord.type === "string") seen = true;
  }
  return seen ? false : null;
}

function partsContent(parts: unknown[]): boolean {
  return parts.some((part) => {
    const partRecord = asRecord(part);
    return (
      partRecord !== null &&
      (hasNonBlankText(partRecord.text) || TOOL_CALL_TYPES.has(partRecord.type as string))
    );
  });
}

function outputItemContent(itemRecord: Record<string, unknown>): boolean | null {
  if (TOOL_CALL_TYPES.has(itemRecord.type as string)) return true;
  const content = itemRecord.content;
  if (typeof content === "string") return content.trim().length > 0 ? true : null;
  if (Array.isArray(content)) return partsContent(content);
  return "type" in itemRecord ? false : null;
}

// Responses API: `output` items carry message parts or tool calls at item level.
function responsesOutputContent(output: unknown): boolean | null {
  if (!Array.isArray(output)) return null;
  let recognizedAny = false;
  for (const item of output) {
    const itemRecord = asRecord(item);
    if (!itemRecord) continue;
    const result = outputItemContent(itemRecord);
    if (result === true) return true;
    if (result === false) recognizedAny = true;
  }
  return recognizedAny ? false : null;
}

/**
 * True when the client-visible body carries rendered content (text or tool
 * calls). False for an empty success. Null when unmeasurable (missing body,
 * unrecognized shape, or non-text output) — never a "no content" claim.
 * Reasoning alone never counts: reasoning presence lives in reasoning_*.
 */
export function hasRenderedContent(clientBody: unknown): boolean | null {
  const body = asRecord(clientBody);
  if (!body) return null;
  if (Array.isArray(body.choices)) return choicesContent(body.choices);
  if ([body.content, body.text, body.output_text].some(hasNonBlankText)) return true;
  const claude = claudeBlocksContent(body.content);
  if (claude === true) return true;
  if (hasToolCalls(body.tool_calls) || (body.function_call ?? null) !== null) return true;
  const responses = responsesOutputContent(body.output);
  if (responses !== null) return responses;
  return claude;
}
