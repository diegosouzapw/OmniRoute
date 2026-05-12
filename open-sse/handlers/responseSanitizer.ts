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

function hasVisibleMessageContent(content: unknown): boolean {
  if (typeof content === "string") {
    return content.trim().length > 0;
  }

  if (!Array.isArray(content)) return false;

  return content.some((contentPart) => {
    const part = toRecord(contentPart);
    if (!part) return false;
    if (typeof part.text === "string" && part.text.trim().length > 0) return true;
    if (typeof part.content === "string" && part.content.trim().length > 0) return true;
    const partType = toString(part.type);
    return Boolean(partType && partType !== "thinking" && partType !== "reasoning");
  });
}

// Matches <think>...</think> blocks and <thinking>...</thinking> (greedy, dotAll)
const THINK_TAG_REGEX = /<(?:think|thinking)>([\s\S]*?)<\/(?:think|thinking)>/gi;

// #638, #727: Collapse runs of 2+ consecutive newlines into \n\n
// Tool call responses from thinking models often accumulate excessive newlines
const EXCESSIVE_NEWLINES = /\n{2,}/g;
function collapseExcessiveNewlines(text: string): string {
  return text.replace(EXCESSIVE_NEWLINES, "\n\n");
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

  const cleaned = text.replace(THINK_TAG_REGEX, (_, thinkContent) => {
    hasThinkTags = true;
    const trimmed = thinkContent.trim();
    if (trimmed) {
      thinkingParts.push(trimmed);
    }
    return "";
  });

  if (!hasThinkTags) {
    return { content: text, thinking: null };
  }

  return {
    content: cleaned.trim(),
    thinking: thinkingParts.length > 0 ? thinkingParts.join("\n\n") : null,
  };
}

/**
 * Sanitize a non-streaming OpenAI ChatCompletion response.
 * Strips non-standard fields and normalizes required fields.
 */
export function sanitizeOpenAIResponse(body: unknown): unknown {
  const bodyRecord = toRecord(body);
  if (!bodyRecord) return body;

  // Build sanitized response with only allowed top-level fields
  const sanitized: JsonRecord = {};

  // Ensure required fields exist
  sanitized.id = normalizeResponseId(bodyRecord.id);
  sanitized.object = toString(bodyRecord.object) || "chat.completion";
  sanitized.created = toNumber(bodyRecord.created) ?? Math.floor(Date.now() / 1000);
  sanitized.model = toString(bodyRecord.model) || "unknown";

  // Sanitize choices
  if (Array.isArray(bodyRecord.choices)) {
    sanitized.choices = bodyRecord.choices.map((choice, idx) => sanitizeChoice(choice, idx));
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
    const { content, thinking } = extractThinkingFromContent(msgRecord.content);
    sanitized.content = collapseExcessiveNewlines(content);

    // Set reasoning_content from <think> tags (if not already set)
    if (thinking && !msgRecord.reasoning_content) {
      sanitized.reasoning_content = thinking;
    }
  } else if (msgRecord.content !== undefined) {
    sanitized.content = msgRecord.content;
  }

  // Preserve existing reasoning_content (from providers that natively support it)
  if (msgRecord.reasoning_content && !sanitized.reasoning_content) {
    sanitized.reasoning_content = msgRecord.reasoning_content;
  }

  // Handle 'reasoning' field alias (some providers use this instead of reasoning_content)
  if (
    msgRecord.reasoning &&
    typeof msgRecord.reasoning === "string" &&
    !sanitized.reasoning_content
  ) {
    sanitized.reasoning_content = msgRecord.reasoning;
  }

  // Handle reasoning_details[] array (StepFun/OpenRouter format)
  // Structure: [{ type: "reasoning.text", text: "...", format: "unknown", index: 0 }]
  if (Array.isArray(msgRecord.reasoning_details) && !sanitized.reasoning_content) {
    const reasoningParts: string[] = [];
    for (const detail of msgRecord.reasoning_details) {
      const detailObj = detail && typeof detail === "object" ? (detail as JsonRecord) : null;
      if (!detailObj) continue;
      const detailType = typeof detailObj.type === "string" ? detailObj.type : "";
      const detailText =
        typeof detailObj.text === "string"
          ? detailObj.text
          : typeof detailObj.content === "string"
            ? detailObj.content
            : "";
      if (
        detailText &&
        (detailType === "reasoning" ||
          detailType === "reasoning.text" ||
          detailType === "thinking" ||
          detailType === "")
      ) {
        reasoningParts.push(detailText);
      }
    }
    if (reasoningParts.length > 0) {
      sanitized.reasoning_content = reasoningParts.join("");
    }
  }

  // Non-streaming responses should not expose both visible content and reasoning_content.
  // Some clients drop the visible assistant text or render duplicated panels when both fields
  // are present in the final payload. Keep reasoning_content only for reasoning-only messages.
  if (
    sanitized.reasoning_content !== undefined &&
    hasVisibleMessageContent(sanitized.content) &&
    !msgRecord.tool_calls &&
    !msgRecord.function_call
  ) {
    delete sanitized.reasoning_content;
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
        text: collapseExcessiveNewlines(content),
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
            text: collapseExcessiveNewlines(part),
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
          text: collapseExcessiveNewlines(toString(partRecord.text) || ""),
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

  // Build sanitized chunk
  const sanitized: JsonRecord = {};

  // Keep only standard fields
  if (parsedRecord.id !== undefined) sanitized.id = parsedRecord.id;
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
          if (deltaRecord.reasoning_content !== undefined) {
            delta.reasoning_content = deltaRecord.reasoning_content;
          }
          if (deltaRecord.reasoning_text !== undefined) {
            delta.reasoning_text = deltaRecord.reasoning_text;
          } else if (typeof deltaRecord.reasoning === "string" && deltaRecord.reasoning) {
            // Alias: some providers use 'reasoning' instead of 'reasoning_content'
            delta.reasoning_content = deltaRecord.reasoning;
          } else if (Array.isArray(deltaRecord.reasoning_details)) {
            // StepFun/OpenRouter: reasoning_details[{type:"reasoning.text", text:"..."}]
            const parts: string[] = [];
            for (const detail of deltaRecord.reasoning_details) {
              const d = detail && typeof detail === "object" ? (detail as JsonRecord) : null;
              if (!d) continue;
              const text =
                typeof d.text === "string"
                  ? d.text
                  : typeof d.content === "string"
                    ? d.content
                    : "";
              if (text) parts.push(text);
            }
            if (parts.length > 0) {
              delta.reasoning_content = parts.join("");
            }
          }
          if (deltaRecord.tool_calls !== undefined) delta.tool_calls = deltaRecord.tool_calls;
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
