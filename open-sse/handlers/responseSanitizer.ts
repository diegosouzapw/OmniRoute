import {
  copyOpenAICompatibleReasoningFields,
  getReadableReasoningValue,
} from "../utils/reasoningFields.ts";

/**
 * Response Sanitizer — Normalizes LLM responses to strict OpenAI SDK format.
 *
 * Fixes Issues:
 * 1. Strips non-standard fields (x_groq, usage_breakdown, service_tier) that
 *    break OpenAI Python SDK v1.83+ Pydantic validation (returns str instead of object)
 * 2. Extracts <think> tags from thinking models into reasoning_content
 * 3. Normalizes response id, object, and usage fields
 * 4. Converts developer role → system for non-OpenAI providers
 */

const ALLOWED_USAGE_FIELDS = new Set([
  "prompt_tokens",
  "completion_tokens",
  "total_tokens",
  "prompt_tokens_details",
  "completion_tokens_details",
]);
const ALLOWED_RESPONSES_USAGE_FIELDS = new Set([
  "input_tokens",
  "output_tokens",
  "total_tokens",
  "input_tokens_details",
  "output_tokens_details",
  "estimated",
]);

type JsonRecord = Record<string, unknown>;

export const OMIT_STREAMING_CHUNK_MARKER = "__omniroute_omit_streaming_chunk";

function toRecord(value: unknown): JsonRecord | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as JsonRecord;
}

function toString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function toNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function deleteOpenAICompatibleReasoningFields(record: JsonRecord): void {
  delete record.reasoning_content;
  delete record.reasoning;
  delete record.reasoning_text;
  delete record.reasoning_details;
}

function stripZeroWidthText(value: string): string {
  return value.replace(/[\u200B-\u200D\uFEFF]/g, "");
}

function stripZeroWidthValue(value: unknown): unknown {
  if (typeof value === "string") return stripZeroWidthText(value);
  if (Array.isArray(value)) return value.map((item) => stripZeroWidthValue(item));
  const record = toRecord(value);
  if (record) {
    return Object.fromEntries(
      Object.entries(record).map(([key, item]) => [key, stripZeroWidthValue(item)])
    );
  }
  return value;
}

function findBalancedJsonEnd(text: string, startIndex: number): number {
  if (startIndex < 0 || startIndex >= text.length || text[startIndex] !== "{") return -1;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = startIndex; index < text.length; index += 1) {
    const char = text[index];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  return -1;
}

function stripInternalToolEnvelopeText(content: string): string {
  let sanitized = stripZeroWidthText(content);
  const markerRegex =
    /to=(?:functions\.[A-Za-z0-9_.-]+|multi_tool_use\.[A-Za-z0-9_.-]+|[A-Za-z_][A-Za-z0-9_]*)/g;

  while (true) {
    const match = markerRegex.exec(sanitized);
    if (!match || match.index < 0) break;

    const searchWindowEnd = Math.min(sanitized.length, match.index + 1200);
    const jsonStart = sanitized.indexOf("{", match.index);
    if (jsonStart < 0 || jsonStart >= searchWindowEnd) {
      sanitized = `${sanitized.slice(0, match.index)}${sanitized.slice(match.index + match[0].length)}`;
      markerRegex.lastIndex = 0;
      continue;
    }

    const jsonEnd = findBalancedJsonEnd(sanitized, jsonStart);
    if (jsonEnd < 0) {
      sanitized = sanitized.slice(0, match.index);
      break;
    }

    const prefix = sanitized.slice(0, match.index).replace(/[ \t]+$/g, "");
    const suffix = sanitized.slice(jsonEnd + 1).replace(/^[ \t]+/g, "");
    sanitized = `${prefix}${suffix}`;
    markerRegex.lastIndex = 0;
  }

  return sanitized.replace(/\n{3,}/g, "\n\n").trim();
}

function parseTextualToolCallContent(content: unknown): { name: string; args: unknown } | null {
  if (typeof content !== "string") return null;
  const normalized = stripInternalToolEnvelopeText(content);
  const toolCallIndex = normalized.lastIndexOf("[Tool call:");
  if (toolCallIndex < 0) return null;
  const candidate = normalized.slice(toolCallIndex);
  const headerMatch = candidate.match(/^\[Tool call:\s*([^\]\n]+)\]\s*\nArguments:\s*/);
  if (!headerMatch) return null;
  const name = headerMatch[1]?.trim();
  const rawArgs = candidate.slice(headerMatch[0].length).trim();
  if (!name || !rawArgs) return null;
  const decoders = [
    (value: string) => value,
    (value: string) => {
      if (value.startsWith('"') && value.endsWith('"')) {
        const decoded = JSON.parse(value);
        return typeof decoded === "string" ? decoded : value;
      }
      return value;
    },
  ];
  for (const decode of decoders) {
    try {
      const decoded = decode(rawArgs);
      return { name, args: stripZeroWidthValue(JSON.parse(decoded)) };
    } catch {}
  }
  return null;
}

// Matches the exact header format required by parseTextualToolCallContent:
// "[Tool call: name]\nArguments:" (with optional whitespace).  Using the full
// header pattern prevents false positives when the model quotes "[Tool call:"
// in prose, code examples, or terminal output (#3355).
const TEXTUAL_TOOL_CALL_HEADER = /\[Tool call:[^\]\n]+\]\s*\nArguments:/;

function containsTextualToolCallContent(content: unknown): boolean {
  return (
    typeof content === "string" &&
    TEXTUAL_TOOL_CALL_HEADER.test(stripInternalToolEnvelopeText(content))
  );
}

const REASONING_TAG_NAMES = ["think", "thinking", "thought", "internal_thought"];
const REASONING_TAG_PATTERN = REASONING_TAG_NAMES.join("|");
// Matches complete <think>/<thinking>/<thought>/<internal_thought> blocks.
const THINK_TAG_REGEX = new RegExp(
  `<(${REASONING_TAG_PATTERN})\\b[^>]*>([\\s\\S]*?)<\\/\\1>`,
  "gi"
);
const REASONING_CLOSE_TAG_REGEX = new RegExp(`</(${REASONING_TAG_PATTERN})>`, "i");
const REASONING_TAG_FRAGMENT_REGEX = new RegExp(`</?(${REASONING_TAG_PATTERN})\\b[^>]*>`, "gi");
const CONTENT_OPEN_TAG_REGEX = /<content\b[^>]*>/i;
// Matches an unclosed reasoning tag at the end of a message. Some providers can
// emit malformed/open reasoning wrappers (for example "<thought\n...") before a
// tool call. Treat that tail as reasoning instead of visible assistant text.
const UNCLOSED_REASONING_TAG_REGEX = new RegExp(
  `<(${REASONING_TAG_PATTERN})(?:\\s[^>]*)?(?:>|\\r?\\n)([\\s\\S]*)$`,
  "i"
);

// #638, #727: Collapse runs of 2+ consecutive newlines into \n\n
// Tool call responses from thinking models often accumulate excessive newlines
const EXCESSIVE_NEWLINES = /\n{2,}/g;
function collapseExcessiveNewlines(text: string): string {
  return text.replace(EXCESSIVE_NEWLINES, "\n\n");
}

function cleanReasoningFragment(text: string): string {
  return text.replace(REASONING_TAG_FRAGMENT_REGEX, "").trim();
}

function splitClosingOnlyReasoningPrefix(text: string): {
  content: string;
  thinking: string | null;
} | null {
  const closeMatch = text.match(REASONING_CLOSE_TAG_REGEX);
  if (!closeMatch?.index) return null;

  const suffix = text.slice(closeMatch.index + closeMatch[0].length);
  if (!CONTENT_OPEN_TAG_REGEX.test(suffix)) return null;

  const thinking = cleanReasoningFragment(text.slice(0, closeMatch.index));
  if (!thinking) return null;
  return { content: suffix.trim(), thinking };
}

function movePrefixBeforeContentTagToThinking(cleaned: string, thinkingParts: string[]): string {
  const contentMatch = cleaned.match(CONTENT_OPEN_TAG_REGEX);
  if (!contentMatch?.index || contentMatch.index <= 0) return cleaned;

  const prefix = cleanReasoningFragment(cleaned.slice(0, contentMatch.index));
  if (prefix) thinkingParts.unshift(prefix);
  return cleaned.slice(contentMatch.index);
}

/**
 * Extract <think> blocks from text content and return separated parts.
 * @returns {{ content: string, thinking: string | null }}
 */
export function extractThinkingFromContent(text: string): {
  content: string;
  thinking: string | null;
} {
  if (!text || typeof text !== "string") {
    return { content: text || "", thinking: null };
  }

  const thinkingParts: string[] = [];
  let hasThinkTags = false;

  let cleaned = text.replace(THINK_TAG_REGEX, (_match, _tagName, thinkContent) => {
    hasThinkTags = true;
    const trimmed = thinkContent.trim();
    if (trimmed) {
      thinkingParts.push(trimmed);
    }
    return "";
  });

  if (!hasThinkTags) {
    const closingOnly = splitClosingOnlyReasoningPrefix(cleaned);
    if (closingOnly) {
      return closingOnly;
    }
  }

  const unclosedMatch = cleaned.match(UNCLOSED_REASONING_TAG_REGEX);
  if (unclosedMatch?.index !== undefined) {
    hasThinkTags = true;
    const reasoning = String(unclosedMatch[2] || "").trim();
    if (reasoning) thinkingParts.push(reasoning);
    const prefix = cleaned.slice(0, unclosedMatch.index);
    cleaned = /^(?:\s|§\d+§)*$/.test(prefix) ? "" : prefix;
  }

  if (!hasThinkTags) {
    return { content: text, thinking: null };
  }

  cleaned = movePrefixBeforeContentTagToThinking(cleaned, thinkingParts);

  return {
    content: cleaned.trim(),
    thinking: thinkingParts.length > 0 ? thinkingParts.join("\n\n") : null,
  };
}

/**
 * Sanitize a non-streaming OpenAI ChatCompletion response.
 * Strips non-standard fields and normalizes required fields.
 */
export interface SanitizeOpenAIResponseOptions {
  /**
   * When true, unconditionally remove `reasoning_content` from every choice
   * message in the final payload — including reasoning-only messages and
   * DeepSeek V4 — even though the default sanitizer keeps it in those cases.
   * Wired to the `x-omniroute-strip-reasoning` request header for clients whose
   * JSON parsers cannot tolerate the non-standard field (e.g. Firecrawl AI SDK).
   * Ported from upstream 9router#517 (closes upstream #509).
   */
  stripReasoning?: boolean;
}

export function sanitizeOpenAIResponse(
  body: unknown,
  options: SanitizeOpenAIResponseOptions = {}
): unknown {
  const bodyRecord = toRecord(body);
  if (!bodyRecord) return body;
  const stripReasoning = options.stripReasoning === true;

  // Build sanitized response with only allowed top-level fields
  const sanitized: JsonRecord = {};

  // Ensure required fields exist
  sanitized.id = normalizeResponseId(bodyRecord.id);
  sanitized.object = toString(bodyRecord.object) || "chat.completion";
  sanitized.created = toNumber(bodyRecord.created) ?? Math.floor(Date.now() / 1000);
  sanitized.model = toString(bodyRecord.model) || "unknown";

  // Sanitize choices
  if (Array.isArray(bodyRecord.choices)) {
    sanitized.choices = bodyRecord.choices.map((choice, idx) => {
      const sanitizedChoice = sanitizeChoice(choice, idx);
      const message = toRecord(sanitizedChoice.message);
      if (
        message &&
        Array.isArray(message.tool_calls) &&
        message.tool_calls.length > 0 &&
        sanitizedChoice.finish_reason !== "tool_calls"
      ) {
        sanitizedChoice.finish_reason = "tool_calls";
      }
      if (stripReasoning && message) {
        deleteOpenAICompatibleReasoningFields(message);
      }
      return sanitizedChoice;
    });
  } else {
    sanitized.choices = [];
  }

  // Sanitize usage
  if (bodyRecord.usage !== undefined) {
    sanitized.usage = sanitizeUsage(bodyRecord.usage);
  }

  // Keep system_fingerprint if present (it's a valid OpenAI field)
  if (bodyRecord.system_fingerprint) {
    sanitized.system_fingerprint = bodyRecord.system_fingerprint;
  }

  return sanitized;
}

export function sanitizeResponsesApiResponse(body: unknown): unknown {
  const bodyRecord = toRecord(body);
  if (!bodyRecord) return body;

  if (Array.isArray(bodyRecord.choices)) {
    return convertOpenAIResponseToResponses(bodyRecord);
  }

  const responseRoot =
    bodyRecord.object === "response"
      ? bodyRecord
      : toRecord(bodyRecord.response ?? bodyRecord) || bodyRecord;

  const sanitized: JsonRecord = {
    id: normalizeResponsesId(responseRoot.id),
    object: "response",
    created_at:
      toNumber(responseRoot.created_at) ??
      toNumber(responseRoot.created) ??
      Math.floor(Date.now() / 1000),
    model: toString(responseRoot.model) || "unknown",
    status: toString(responseRoot.status) || "completed",
    background: typeof responseRoot.background === "boolean" ? responseRoot.background : false,
    error: responseRoot.error ?? null,
  };

  const output = sanitizeResponsesOutput(responseRoot.output);

  // Some upstreams return a shorthand Responses body that carries the answer only
  // in `output_text` with an empty/absent `output[]`. Synthesize a message item so
  // the sanitized response still has usable structured output — otherwise the text
  // is dropped and the response is later flagged malformed (#4942 regression).
  if (
    output.length === 0 &&
    typeof responseRoot.output_text === "string" &&
    responseRoot.output_text.trim().length > 0
  ) {
    output.push({
      id: "msg_0",
      type: "message",
      role: "assistant",
      content: [{ type: "output_text", text: responseRoot.output_text.trim() }],
    });
  }
  sanitized.output = output;

  const outputText = extractResponsesOutputText(output);
  if (outputText.length > 0) {
    sanitized.output_text = outputText;
  }

  if (responseRoot.usage !== undefined) {
    sanitized.usage = sanitizeResponsesUsage(responseRoot.usage);
  }

  return sanitized;
}

/**
 * Sanitize a single choice object.
 */
function sanitizeChoice(choice: unknown, defaultIndex: number): JsonRecord {
  const choiceRecord = toRecord(choice);
  const sanitized: JsonRecord = {
    index: defaultIndex,
    finish_reason: null,
  };

  if (choiceRecord?.index !== undefined) {
    sanitized.index = choiceRecord.index;
  }

  if (choiceRecord?.finish_reason !== undefined) {
    sanitized.finish_reason = choiceRecord.finish_reason;
  }

  // Sanitize message (non-streaming) or delta (streaming)
  if (choiceRecord?.message !== undefined) {
    sanitized.message = sanitizeMessage(choiceRecord.message);
  }
  if (choiceRecord?.delta !== undefined) {
    sanitized.delta = sanitizeMessage(choiceRecord.delta);
  }

  // Keep logprobs if present
  if (choiceRecord?.logprobs !== undefined) {
    sanitized.logprobs = choiceRecord.logprobs;
  }

  return sanitized;
}

/**
 * Sanitize a message object, extracting <think> tags if present.
 */
function sanitizeMessage(msg: unknown): unknown {
  const msgRecord = toRecord(msg);
  if (!msgRecord) return msg;

  const sanitized: JsonRecord = {};

  // Copy only allowed fields
  if (msgRecord.role) sanitized.role = msgRecord.role;
  if (msgRecord.refusal !== undefined) sanitized.refusal = msgRecord.refusal;

  // Handle content — extract <think> tags
  if (typeof msgRecord.content === "string") {
    const { content, thinking } = extractThinkingFromContent(
      stripInternalToolEnvelopeText(msgRecord.content)
    );
    sanitized.content = collapseExcessiveNewlines(content);

    // Set reasoning_content from prompt-format tags only when the provider did
    // not also return a native OpenAI-compatible reasoning field.
    if (thinking && !getReadableReasoningValue(msgRecord)) {
      sanitized.reasoning_content = thinking;
    }
  } else if (msgRecord.content !== undefined) {
    sanitized.content = msgRecord.content;
  }

  copyOpenAICompatibleReasoningFields(msgRecord, sanitized);

  const textualToolCall = parseTextualToolCallContent(sanitized.content);
  if (textualToolCall && !msgRecord.tool_calls) {
    sanitized.content = null;
    sanitized.tool_calls = [
      {
        id: `call_${Date.now()}_0`,
        type: "function",
        function: {
          name: textualToolCall.name,
          arguments: JSON.stringify(textualToolCall.args || {}),
        },
      },
    ];
  } else if (containsTextualToolCallContent(sanitized.content) && !msgRecord.tool_calls) {
    sanitized.content = null;
  }

  // Preserve tool_calls
  if (msgRecord.tool_calls) {
    sanitized.tool_calls = msgRecord.tool_calls;
  }

  // Preserve function_call (legacy)
  if (msgRecord.function_call) {
    sanitized.function_call = msgRecord.function_call;
  }

  return sanitized;
}

/**
 * Sanitize usage object — keep only standard fields.
 */
function sanitizeUsage(usage: unknown): unknown {
  const usageRecord = toRecord(usage);
  if (!usageRecord) return usage;

  const sanitized: JsonRecord = {};

  // Cross-map Claude-style → OpenAI-style field names.
  // Some providers return input_tokens/output_tokens instead of prompt_tokens/completion_tokens.
  // Without this mapping, the whitelist filter below strips them, resulting in NaN/0 tokens (#617).
  if (usageRecord.input_tokens !== undefined && usageRecord.prompt_tokens === undefined) {
    usageRecord.prompt_tokens = usageRecord.input_tokens;
  }
  if (usageRecord.output_tokens !== undefined && usageRecord.completion_tokens === undefined) {
    usageRecord.completion_tokens = usageRecord.output_tokens;
  }

  for (const key of ALLOWED_USAGE_FIELDS) {
    if (usageRecord[key] !== undefined) {
      sanitized[key] = usageRecord[key];
    }
  }

  // Ensure required fields
  const promptTokens = toNumber(sanitized.prompt_tokens) ?? 0;
  const completionTokens = toNumber(sanitized.completion_tokens) ?? 0;
  const totalTokens = toNumber(sanitized.total_tokens) ?? promptTokens + completionTokens;

  sanitized.prompt_tokens = promptTokens;
  sanitized.completion_tokens = completionTokens;
  sanitized.total_tokens = totalTokens;

  return sanitized;
}

function sanitizeResponsesUsage(usage: unknown): unknown {
  const usageRecord = toRecord(usage);
  if (!usageRecord) return usage;

  const normalized: JsonRecord = { ...usageRecord };

  if (normalized.prompt_tokens !== undefined && normalized.input_tokens === undefined) {
    normalized.input_tokens = normalized.prompt_tokens;
  }
  if (normalized.completion_tokens !== undefined && normalized.output_tokens === undefined) {
    normalized.output_tokens = normalized.completion_tokens;
  }
  if (
    normalized.prompt_tokens_details !== undefined &&
    normalized.input_tokens_details === undefined
  ) {
    normalized.input_tokens_details = normalized.prompt_tokens_details;
  }
  if (
    normalized.completion_tokens_details !== undefined &&
    normalized.output_tokens_details === undefined
  ) {
    normalized.output_tokens_details = normalized.completion_tokens_details;
  }

  const inputDetails = toRecord(normalized.input_tokens_details) || {};
  if (
    normalized.cache_read_input_tokens !== undefined &&
    inputDetails.cached_tokens === undefined
  ) {
    inputDetails.cached_tokens = normalized.cache_read_input_tokens;
  }
  if (
    normalized.cache_creation_input_tokens !== undefined &&
    inputDetails.cache_creation_tokens === undefined
  ) {
    inputDetails.cache_creation_tokens = normalized.cache_creation_input_tokens;
  }
  if (Object.keys(inputDetails).length > 0) {
    normalized.input_tokens_details = inputDetails;
  }

  const outputDetails = toRecord(normalized.output_tokens_details) || {};
  if (normalized.reasoning_tokens !== undefined && outputDetails.reasoning_tokens === undefined) {
    outputDetails.reasoning_tokens = normalized.reasoning_tokens;
  }
  if (Object.keys(outputDetails).length > 0) {
    normalized.output_tokens_details = outputDetails;
  }

  const sanitized: JsonRecord = {};
  for (const key of ALLOWED_RESPONSES_USAGE_FIELDS) {
    if (normalized[key] !== undefined) {
      sanitized[key] = normalized[key];
    }
  }

  const inputTokens = toNumber(sanitized.input_tokens) ?? 0;
  const outputTokens = toNumber(sanitized.output_tokens) ?? 0;
  const totalTokens = toNumber(sanitized.total_tokens) ?? inputTokens + outputTokens;

  sanitized.input_tokens = inputTokens;
  sanitized.output_tokens = outputTokens;
  sanitized.total_tokens = totalTokens;

  return sanitized;
}

/**
 * Normalize response ID to use chatcmpl- prefix.
 */
function normalizeResponseId(id: unknown): string {
  if (!id || typeof id !== "string") {
    return `chatcmpl-${crypto.randomUUID().replace(/-/g, "").slice(0, 29)}`;
  }
  // Already correct format
  if (id.startsWith("chatcmpl-")) return id;
  // Keep custom IDs but don't break them
  return id;
}

function normalizeResponsesId(id: unknown): string {
  if (!id || typeof id !== "string") {
    return `resp_${crypto.randomUUID().replace(/-/g, "").slice(0, 24)}`;
  }
  if (id.startsWith("resp_")) return id;
  return `resp_${id}`;
}

function sanitizeResponsesStreamingOutputItem(item: unknown): JsonRecord | null {
  const itemRecord = toRecord(item);
  if (!itemRecord) return null;

  const type = toString(itemRecord.type) || "message";

  if (type === "message") {
    const role = toString(itemRecord.role) || "assistant";
    const phase = toString(itemRecord.phase);
    if (role === "assistant" && phase === "commentary") {
      return null;
    }

    const content = sanitizeResponsesMessageContent(itemRecord.content).filter((part) => {
      const partRecord = toRecord(part);
      const partPhase = partRecord ? toString(partRecord.phase) : undefined;
      return partPhase !== "commentary";
    });

    if (role === "assistant" && content.length === 0) {
      return null;
    }

    return {
      ...itemRecord,
      type: "message",
      role,
      content,
    };
  }

  if (type === "reasoning") {
    const summary = Array.isArray(itemRecord.summary)
      ? itemRecord.summary
          .map((part) => {
            const partRecord = toRecord(part);
            if (!partRecord) return null;
            return {
              ...partRecord,
              type: toString(partRecord.type) || "summary_text",
              text: collapseExcessiveNewlines(toString(partRecord.text) || ""),
            };
          })
          .filter((part) => part !== null)
      : [];

    return {
      ...itemRecord,
      type: "reasoning",
      summary,
    };
  }

  if (type === "function_call") {
    return {
      ...itemRecord,
      type: "function_call",
      arguments:
        typeof itemRecord.arguments === "string"
          ? itemRecord.arguments
          : JSON.stringify(itemRecord.arguments || {}),
    };
  }

  if (type === "function_call_output") {
    return {
      ...itemRecord,
      type: "function_call_output",
      output:
        typeof itemRecord.output === "string"
          ? collapseExcessiveNewlines(itemRecord.output)
          : JSON.stringify(itemRecord.output ?? ""),
    };
  }

  return { ...itemRecord };
}

function sanitizeResponsesStreamingOutput(output: unknown): JsonRecord[] {
  if (!Array.isArray(output)) return [];

  return output
    .map((item) => sanitizeResponsesStreamingOutputItem(item))
    .filter((item): item is JsonRecord => item !== null);
}

function sanitizeResponsesStreamingEvent(parsedRecord: JsonRecord): JsonRecord {
  const sanitized: JsonRecord = { ...parsedRecord };
  const eventType = toString(parsedRecord.type) || "";

  if (parsedRecord.item !== undefined) {
    const sanitizedItem = sanitizeResponsesStreamingOutputItem(parsedRecord.item);
    if (sanitizedItem) {
      sanitized.item = sanitizedItem;
    } else {
      delete sanitized.item;
      if (eventType === "response.output_item.added" || eventType === "response.output_item.done") {
        sanitized[OMIT_STREAMING_CHUNK_MARKER] = true;
      }
    }
  }

  if (Array.isArray(parsedRecord.output)) {
    const output = sanitizeResponsesStreamingOutput(parsedRecord.output);
    sanitized.output = output;
    const outputText = extractResponsesOutputText(output);
    if (outputText.length > 0) {
      sanitized.output_text = outputText;
    } else {
      delete sanitized.output_text;
    }
  }

  const responseRecord = toRecord(parsedRecord.response);
  if (responseRecord) {
    const responseOutput = Array.isArray(responseRecord.output)
      ? sanitizeResponsesStreamingOutput(responseRecord.output)
      : undefined;
    const sanitizedResponse: JsonRecord = {
      ...responseRecord,
      ...(responseOutput ? { output: responseOutput } : {}),
    };
    const responseOutputText = responseOutput ? extractResponsesOutputText(responseOutput) : "";
    if (responseOutputText.length > 0) {
      sanitizedResponse.output_text = responseOutputText;
    } else {
      delete sanitizedResponse.output_text;
    }
    sanitized.response = sanitizedResponse;
  }

  return sanitized;
}

function sanitizeResponsesOutput(output: unknown): JsonRecord[] {
  if (!Array.isArray(output)) return [];

  return output
    .map((item, index) => sanitizeResponsesOutputItem(item, index))
    .filter((item): item is JsonRecord => item !== null);
}

function sanitizeResponsesOutputItem(item: unknown, index: number): JsonRecord | null {
  const itemRecord = toRecord(item);
  if (!itemRecord) return null;

  const type = toString(itemRecord.type) || "message";

  if (type === "message") {
    const content = sanitizeResponsesMessageContent(itemRecord.content);
    const sanitized: JsonRecord = {
      id: toString(itemRecord.id) || `msg_${index}`,
      type: "message",
      role: toString(itemRecord.role) || "assistant",
      content,
    };
    return sanitized;
  }

  if (type === "reasoning") {
    const summary = Array.isArray(itemRecord.summary)
      ? itemRecord.summary
          .map((part) => {
            const partRecord = toRecord(part);
            if (!partRecord) return null;
            return {
              type: toString(partRecord.type) || "summary_text",
              text: collapseExcessiveNewlines(toString(partRecord.text) || ""),
            };
          })
          .filter((part): part is { type: string; text: string } => part !== null)
      : [];

    return {
      id: toString(itemRecord.id) || `rs_${index}`,
      type: "reasoning",
      summary,
    };
  }

  if (type === "function_call") {
    const callId = toString(itemRecord.call_id) || toString(itemRecord.id) || `call_${index}`;
    return {
      id: toString(itemRecord.id) || `fc_${callId}`,
      type: "function_call",
      call_id: callId,
      name: toString(itemRecord.name) || "",
      arguments:
        typeof itemRecord.arguments === "string"
          ? itemRecord.arguments
          : JSON.stringify(itemRecord.arguments || {}),
    };
  }

  if (type === "function_call_output") {
    return {
      id: toString(itemRecord.id) || `fco_${toString(itemRecord.call_id) || index}`,
      type: "function_call_output",
      call_id: toString(itemRecord.call_id) || "",
      output: itemRecord.output ?? "",
    };
  }

  return { ...itemRecord, type };
}

function sanitizeResponsesMessageContent(content: unknown): JsonRecord[] {
  if (typeof content === "string") {
    if (content.length === 0) return [];
    return [
      {
        type: "output_text",
        text: collapseExcessiveNewlines(stripInternalToolEnvelopeText(content)),
        annotations: [],
      },
    ];
  }

  if (!Array.isArray(content)) return [];

  return content
    .map((part) => {
      const partRecord = toRecord(part);
      if (!partRecord) {
        if (typeof part === "string") {
          return {
            type: "output_text",
            text: collapseExcessiveNewlines(stripInternalToolEnvelopeText(part)),
            annotations: [],
          };
        }
        return null;
      }

      const partType = toString(partRecord.type);
      if (
        partType === "output_text" ||
        partType === "text" ||
        ((partType === undefined || partType === "") && typeof partRecord.text === "string")
      ) {
        return {
          ...partRecord,
          type: "output_text",
          text: collapseExcessiveNewlines(
            stripInternalToolEnvelopeText(toString(partRecord.text) || "")
          ),
          annotations: Array.isArray(partRecord.annotations) ? partRecord.annotations : [],
        };
      }

      return { ...partRecord };
    })
    .filter((part): part is JsonRecord => part !== null);
}

function extractResponsesOutputText(output: JsonRecord[]): string {
  const parts: string[] = [];

  for (const item of output) {
    if (item.type !== "message" || !Array.isArray(item.content)) continue;
    for (const part of item.content) {
      const partRecord = toRecord(part);
      if (!partRecord) continue;
      if (
        (partRecord.type === "output_text" || partRecord.type === "text") &&
        typeof partRecord.text === "string" &&
        partRecord.text.length > 0
      ) {
        parts.push(partRecord.text);
      }
    }
  }

  return parts.join("");
}

function convertOpenAIResponseToResponses(openaiResponse: JsonRecord): JsonRecord {
  const responseId = normalizeResponsesId(openaiResponse.id);
  const createdAt = toNumber(openaiResponse.created) ?? Math.floor(Date.now() / 1000);
  const model = toString(openaiResponse.model) || "unknown";
  const choice = Array.isArray(openaiResponse.choices)
    ? (toRecord(openaiResponse.choices[0]) ?? {})
    : {};
  const message = toRecord(choice.message) || {};
  const output: JsonRecord[] = [];

  const reasoningContent =
    toString(message.reasoning_content) ||
    (typeof message.reasoning === "string" ? message.reasoning : "");
  if (reasoningContent) {
    output.push({
      id: `rs_${responseId}_0`,
      type: "reasoning",
      summary: [{ type: "summary_text", text: reasoningContent }],
    });
  }

  const hasToolCalls = Array.isArray(message.tool_calls) && message.tool_calls.length > 0;
  const messageContent = sanitizeResponsesMessageContent(message.content);
  if (messageContent.length > 0 || (!hasToolCalls && !reasoningContent)) {
    output.push({
      id: `msg_${responseId}_0`,
      type: "message",
      role: toString(message.role) || "assistant",
      content:
        messageContent.length > 0
          ? messageContent
          : [{ type: "output_text", text: "", annotations: [] }],
    });
  }

  const toolCalls = Array.isArray(message.tool_calls)
    ? message.tool_calls
    : message.function_call
      ? [
          {
            id: toString(choice.id) || "call_0",
            type: "function",
            function: message.function_call,
          },
        ]
      : [];

  for (let index = 0; index < toolCalls.length; index += 1) {
    const toolCall = toRecord(toolCalls[index]) || {};
    const fn = toRecord(toolCall.function) || {};
    const callId = toString(toolCall.id) || `call_${index}`;
    output.push({
      id: `fc_${callId}`,
      type: "function_call",
      call_id: callId,
      name: toString(fn.name) || "",
      arguments:
        typeof fn.arguments === "string" ? fn.arguments : JSON.stringify(fn.arguments || {}),
    });
  }

  const sanitized: JsonRecord = {
    id: responseId,
    object: "response",
    created_at: createdAt,
    model,
    status: "completed",
    background: false,
    error: null,
    output,
  };

  const outputText = extractResponsesOutputText(output);
  if (outputText.length > 0) {
    sanitized.output_text = outputText;
  }

  if (openaiResponse.usage !== undefined) {
    sanitized.usage = sanitizeResponsesUsage(openaiResponse.usage);
  }

  return sanitized;
}

/**
 * Sanitize a streaming SSE chunk for passthrough mode.
 * Lighter than full sanitization — only strips problematic extra fields.
 */
export function sanitizeStreamingChunk(parsed: unknown): unknown {
  const parsedRecord = toRecord(parsed);
  if (!parsedRecord) return parsed;

  const eventType = toString(parsedRecord.type) || "";
  if (eventType.startsWith("response.") || parsedRecord.object === "response") {
    return sanitizeResponsesStreamingEvent(parsedRecord);
  }

  // Build sanitized chunk
  const sanitized: JsonRecord = {};

  // Keep only standard fields — normalize id to string to avoid AI_InvalidResponseDataError
  if (parsedRecord.id !== undefined && parsedRecord.id !== null) {
    sanitized.id = normalizeResponseId(
      typeof parsedRecord.id === "string" ? parsedRecord.id : String(parsedRecord.id)
    );
  }
  sanitized.object = toString(parsedRecord.object) || "chat.completion.chunk";
  if (parsedRecord.created !== undefined) sanitized.created = parsedRecord.created;
  if (parsedRecord.model !== undefined) sanitized.model = parsedRecord.model;

  // Sanitize choices with delta
  if (Array.isArray(parsedRecord.choices)) {
    sanitized.choices = parsedRecord.choices.map((choice) => {
      const c: JsonRecord = { index: 0 };
      const choiceRecord = toRecord(choice);
      if (!choiceRecord) return c;

      c.index = toNumber(choiceRecord.index) ?? 0;

      if (choiceRecord.delta !== undefined) {
        const deltaRecord = toRecord(choiceRecord.delta);
        if (deltaRecord) {
          const delta: JsonRecord = {};
          if (deltaRecord.role !== undefined) delta.role = deltaRecord.role;
          if (deltaRecord.content !== undefined) {
            delta.content =
              typeof deltaRecord.content === "string"
                ? collapseExcessiveNewlines(deltaRecord.content)
                : deltaRecord.content;
          }
          copyOpenAICompatibleReasoningFields(deltaRecord, delta);
          if (deltaRecord.tool_calls !== undefined) {
            delta.tool_calls = Array.isArray(deltaRecord.tool_calls)
              ? deltaRecord.tool_calls.map((tc) => {
                  const t = toRecord(tc);
                  if (!t) return tc;
                  if (t.id !== undefined && t.id !== null && typeof t.id !== "string") {
                    return { ...t, id: String(t.id) };
                  }
                  return t;
                })
              : deltaRecord.tool_calls;
          }
          if (deltaRecord.function_call !== undefined)
            delta.function_call = deltaRecord.function_call;
          c.delta = delta;
        } else {
          c.delta = choiceRecord.delta;
        }
      }

      if (choiceRecord.finish_reason !== undefined) c.finish_reason = choiceRecord.finish_reason;
      if (choiceRecord.logprobs !== undefined) c.logprobs = choiceRecord.logprobs;
      return c;
    });
  }

  // Sanitize usage if present
  if (parsedRecord.usage !== undefined) {
    sanitized.usage = sanitizeUsage(parsedRecord.usage);
  }

  // Keep system_fingerprint if present
  if (parsedRecord.system_fingerprint) {
    sanitized.system_fingerprint = parsedRecord.system_fingerprint;
  }

  return sanitized;
}
