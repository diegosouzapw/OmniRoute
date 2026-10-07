/**
 * Server-sent event parsing and provider response reconstruction.
 *
 * This module is an independent implementation based on the WHATWG event-stream
 * algorithm and the public OpenAI, Anthropic, and Gemini streaming schemas.
 */

export type ApiFormat = "anthropic" | "openai" | "gemini" | "unknown";

export interface SseEvent {
  event?: string;
  data?: string;
  // Parsed JSON payload when `data` was valid JSON.
  json?: unknown;
}

export interface MergedResponse {
  format: ApiFormat;
  message?: unknown;
  raw?: SseEvent[];
}

type JsonRecord = Record<string, unknown>;

interface AnthropicBlockState {
  block: JsonRecord;
  partialInput: string;
}

interface OpenAiToolState {
  value: JsonRecord;
  functionValue: JsonRecord;
}

interface OpenAiChoiceState {
  value: JsonRecord;
  message: JsonRecord;
  tools: Map<number, OpenAiToolState>;
}

function asRecord(value: unknown): JsonRecord | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : null;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function asIndex(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : fallback;
}

function appendString(record: JsonRecord, key: string, value: unknown): void {
  if (typeof value !== "string") return;
  const current = typeof record[key] === "string" ? record[key] : "";
  record[key] = current + value;
}

function mergeRecord(previous: unknown, next: unknown): JsonRecord {
  return { ...(asRecord(previous) ?? {}), ...(asRecord(next) ?? {}) };
}

function dispatchSseEvent(
  events: SseEvent[],
  dataLines: string[],
  sawDataField: boolean,
  eventName: string
): void {
  if (!sawDataField) return;

  const data = dataLines.join("\n");
  const event: SseEvent = { data };
  if (eventName) event.event = eventName;

  if (data !== "[DONE]") {
    try {
      event.json = JSON.parse(data) as unknown;
    } catch {
      // Raw data is still useful to callers when a provider emits a sentinel or malformed JSON.
    }
  }
  events.push(event);
}

/** Parse a complete `text/event-stream` payload using WHATWG field semantics. */
export function parseSseStream(raw: string): SseEvent[] {
  const input = raw.charCodeAt(0) === 0xfeff ? raw.slice(1) : raw;
  const events: SseEvent[] = [];
  let dataLines: string[] = [];
  let eventName = "";
  let sawDataField = false;
  let lineStart = 0;

  const processLine = (line: string): void => {
    if (line.length === 0) {
      dispatchSseEvent(events, dataLines, sawDataField, eventName);
      dataLines = [];
      eventName = "";
      sawDataField = false;
      return;
    }
    if (line.startsWith(":")) return;

    const colon = line.indexOf(":");
    const field = colon === -1 ? line : line.slice(0, colon);
    let value = colon === -1 ? "" : line.slice(colon + 1);
    if (value.startsWith(" ")) value = value.slice(1);

    if (field === "data") {
      dataLines.push(value);
      sawDataField = true;
    } else if (field === "event") {
      eventName = value;
    }
    // `id`, `retry`, comments, and extension fields do not alter the public event shape.
  };

  for (let index = 0; index < input.length; index += 1) {
    const code = input.charCodeAt(index);
    if (code !== 0x0a && code !== 0x0d) continue;

    processLine(input.slice(lineStart, index));
    if (code === 0x0d && input.charCodeAt(index + 1) === 0x0a) index += 1;
    lineStart = index + 1;
  }

  // WHATWG does not dispatch an event that lacks its terminating blank line.
  return events;
}

export function detectApiFormat(chunks: SseEvent[]): ApiFormat {
  for (const chunk of chunks) {
    const namedEvent = chunk.event ?? "";
    if (
      namedEvent === "message_start" ||
      namedEvent === "message_delta" ||
      namedEvent === "message_stop" ||
      namedEvent.startsWith("content_block_")
    ) {
      return "anthropic";
    }
    const payload = asRecord(chunk.json);
    if (!payload) continue;

    const type = typeof payload.type === "string" ? payload.type : "";
    if (
      type === "message_start" ||
      type === "message_delta" ||
      type === "message_stop" ||
      type.startsWith("content_block_")
    ) {
      return "anthropic";
    }
    if (Array.isArray(payload.choices) || type.startsWith("response.")) return "openai";
    if (Array.isArray(payload.candidates) || asRecord(payload.usageMetadata)) return "gemini";
  }
  return "unknown";
}

export function rebuildAnthropic(chunks: SseEvent[]): MergedResponse {
  let message: JsonRecord = { type: "message", role: "assistant", content: [] };
  const blocks = new Map<number, AnthropicBlockState>();

  for (const chunk of chunks) {
    const payload = asRecord(chunk.json);
    if (!payload) continue;
    const type = typeof payload.type === "string" ? payload.type : "";

    if (type === "message_start") {
      const startedMessage = asRecord(payload.message);
      if (startedMessage) {
        message = { ...startedMessage };
        for (const [position, value] of asArray(startedMessage.content).entries()) {
          const block = asRecord(value);
          if (block) blocks.set(position, { block: { ...block }, partialInput: "" });
        }
      }
      continue;
    }

    const index = asIndex(payload.index, blocks.size);
    if (type === "content_block_start") {
      const contentBlock = asRecord(payload.content_block);
      if (contentBlock) {
        blocks.set(index, { block: { ...contentBlock }, partialInput: "" });
      }
      continue;
    }

    if (type === "content_block_delta") {
      const delta = asRecord(payload.delta);
      if (!delta) continue;
      const state = blocks.get(index) ?? { block: {}, partialInput: "" };
      const deltaType = typeof delta.type === "string" ? delta.type : "";
      if (deltaType === "text_delta") appendString(state.block, "text", delta.text);
      if (deltaType === "thinking_delta") appendString(state.block, "thinking", delta.thinking);
      if (deltaType === "signature_delta") {
        appendString(state.block, "signature", delta.signature);
      }
      if (deltaType === "input_json_delta" && typeof delta.partial_json === "string") {
        state.partialInput += delta.partial_json;
      }
      blocks.set(index, state);
      continue;
    }

    if (type === "content_block_stop") {
      const state = blocks.get(index);
      if (state?.partialInput) {
        try {
          state.block.input = JSON.parse(state.partialInput) as unknown;
        } catch {
          state.block.input = state.partialInput;
        }
      }
      continue;
    }

    if (type === "message_delta") {
      Object.assign(message, asRecord(payload.delta) ?? {});
      if (payload.usage !== undefined) {
        message.usage = mergeRecord(message.usage, payload.usage);
      }
    }
  }

  message.content = [...blocks.entries()]
    .sort(([left], [right]) => left - right)
    .map(([, state]) => state.block);
  return { format: "anthropic", message };
}

function getOpenAiChoice(
  choices: Map<number, OpenAiChoiceState>,
  index: number
): OpenAiChoiceState {
  const existing = choices.get(index);
  if (existing) return existing;
  const created: OpenAiChoiceState = {
    value: { index },
    message: { role: "assistant", content: "" },
    tools: new Map(),
  };
  choices.set(index, created);
  return created;
}

function mergeOpenAiTools(state: OpenAiChoiceState, toolDeltas: unknown[]): void {
  for (const [position, rawTool] of toolDeltas.entries()) {
    const tool = asRecord(rawTool);
    if (!tool) continue;
    const index = asIndex(tool.index, position);
    const current = state.tools.get(index) ?? { value: { index }, functionValue: {} };

    for (const [key, value] of Object.entries(tool)) {
      if (key !== "function" && key !== "index" && value !== undefined) {
        current.value[key] = value;
      }
    }
    const functionDelta = asRecord(tool.function);
    if (functionDelta) {
      if (typeof functionDelta.name === "string") {
        appendString(current.functionValue, "name", functionDelta.name);
      }
      if (typeof functionDelta.arguments === "string") {
        appendString(current.functionValue, "arguments", functionDelta.arguments);
      }
      current.value.function = current.functionValue;
    }
    state.tools.set(index, current);
  }
}

function rebuildOpenAiResponses(chunks: SseEvent[]): JsonRecord {
  let response: JsonRecord = { object: "response", output: [] };
  const items = new Map<number, JsonRecord>();
  const contentByItem = new Map<number, Map<number, JsonRecord>>();

  const getItem = (outputIndex: number): JsonRecord => {
    const existing = items.get(outputIndex);
    if (existing) return existing;
    const created: JsonRecord = { type: "message", role: "assistant", content: [] };
    items.set(outputIndex, created);
    return created;
  };

  const getPart = (outputIndex: number, contentIndex: number): JsonRecord => {
    let content = contentByItem.get(outputIndex);
    if (!content) {
      content = new Map();
      contentByItem.set(outputIndex, content);
    }
    const existing = content.get(contentIndex);
    if (existing) return existing;
    const created: JsonRecord = { type: "output_text", text: "" };
    content.set(contentIndex, created);
    return created;
  };

  const mergeItem = (outputIndex: number, rawItem: unknown): void => {
    const item = asRecord(rawItem);
    if (!item) return;
    const current = getItem(outputIndex);
    for (const [key, value] of Object.entries(item)) {
      if (key !== "content" && value !== undefined) current[key] = value;
    }
    for (const [contentIndex, rawPart] of asArray(item.content).entries()) {
      const part = asRecord(rawPart);
      if (part) Object.assign(getPart(outputIndex, contentIndex), part);
    }
  };

  for (const chunk of chunks) {
    const payload = asRecord(chunk.json);
    if (!payload) continue;
    const embeddedResponse = asRecord(payload.response);
    if (embeddedResponse) {
      for (const [key, value] of Object.entries(embeddedResponse)) {
        if (key !== "output" && value !== undefined) response[key] = value;
      }
      for (const [outputIndex, item] of asArray(embeddedResponse.output).entries()) {
        mergeItem(outputIndex, item);
      }
    }

    const outputIndex = asIndex(payload.output_index, 0);
    const contentIndex = asIndex(payload.content_index, 0);
    if (
      payload.type === "response.output_item.added" ||
      payload.type === "response.output_item.done"
    ) {
      mergeItem(outputIndex, payload.item);
    }
    if (
      payload.type === "response.content_part.added" ||
      payload.type === "response.content_part.done"
    ) {
      const part = asRecord(payload.part);
      if (part) Object.assign(getPart(outputIndex, contentIndex), part);
    }
    if (payload.type === "response.output_text.delta") {
      appendString(getPart(outputIndex, contentIndex), "text", payload.delta);
    }
    if (payload.type === "response.output_text.done" && typeof payload.text === "string") {
      getPart(outputIndex, contentIndex).text = payload.text;
    }
    if (payload.type === "response.refusal.delta") {
      const part = getPart(outputIndex, contentIndex);
      part.type = "refusal";
      appendString(part, "refusal", payload.delta);
    }
    if (payload.type === "response.refusal.done" && typeof payload.refusal === "string") {
      const part = getPart(outputIndex, contentIndex);
      part.type = "refusal";
      part.refusal = payload.refusal;
    }
    if (payload.type === "response.function_call_arguments.delta") {
      const item = getItem(outputIndex);
      item.type = "function_call";
      appendString(item, "arguments", payload.delta);
    }
    if (
      payload.type === "response.function_call_arguments.done" &&
      typeof payload.arguments === "string"
    ) {
      const item = getItem(outputIndex);
      item.type = "function_call";
      item.arguments = payload.arguments;
    }
  }

  response.output = [...items.entries()]
    .sort(([left], [right]) => left - right)
    .map(([outputIndex, item]) => {
      const content = contentByItem.get(outputIndex);
      if (content && content.size > 0) {
        item.content = [...content.entries()]
          .sort(([left], [right]) => left - right)
          .map(([, part]) => part);
      }
      return item;
    });
  return response;
}

export function rebuildOpenAI(chunks: SseEvent[]): MergedResponse {
  const hasChatChunks = chunks.some((chunk) => Array.isArray(asRecord(chunk.json)?.choices));
  if (!hasChatChunks) {
    return { format: "openai", message: rebuildOpenAiResponses(chunks) };
  }

  const result: JsonRecord = {};
  const choices = new Map<number, OpenAiChoiceState>();

  for (const chunk of chunks) {
    const payload = asRecord(chunk.json);
    if (!payload) continue;
    for (const [key, value] of Object.entries(payload)) {
      if (key !== "choices" && key !== "usage" && value !== undefined) result[key] = value;
    }
    if (payload.usage !== undefined) result.usage = payload.usage;

    for (const [position, rawChoice] of asArray(payload.choices).entries()) {
      const choice = asRecord(rawChoice);
      if (!choice) continue;
      const index = asIndex(choice.index, position);
      const state = getOpenAiChoice(choices, index);
      const delta = asRecord(choice.delta);

      if (delta) {
        if (typeof delta.role === "string") state.message.role = delta.role;
        appendString(state.message, "content", delta.content);
        appendString(state.message, "refusal", delta.refusal);
        mergeOpenAiTools(state, asArray(delta.tool_calls));

        const functionCall = asRecord(delta.function_call);
        if (functionCall) {
          const current = asRecord(state.message.function_call) ?? {};
          appendString(current, "name", functionCall.name);
          appendString(current, "arguments", functionCall.arguments);
          state.message.function_call = current;
        }
      }

      for (const [key, value] of Object.entries(choice)) {
        if (key !== "delta" && value !== null && value !== undefined) state.value[key] = value;
      }
    }
  }

  result.choices = [...choices.entries()]
    .sort(([left], [right]) => left - right)
    .map(([, state]) => {
      if (state.tools.size > 0) {
        state.message.tool_calls = [...state.tools.entries()]
          .sort(([left], [right]) => left - right)
          .map(([, tool]) => tool.value);
      }
      return { ...state.value, message: state.message };
    });
  return { format: "openai", message: result };
}

export function rebuildGemini(chunks: SseEvent[]): MergedResponse {
  const result: JsonRecord = {};
  const candidates = new Map<number, JsonRecord>();
  const parts = new Map<number, unknown[]>();

  for (const chunk of chunks) {
    const payload = asRecord(chunk.json);
    if (!payload) continue;
    for (const [key, value] of Object.entries(payload)) {
      if (key !== "candidates" && value !== undefined) result[key] = value;
    }

    for (const [position, rawCandidate] of asArray(payload.candidates).entries()) {
      const candidate = asRecord(rawCandidate);
      if (!candidate) continue;
      const index = asIndex(candidate.index, position);
      const current = candidates.get(index) ?? { index };
      const content = asRecord(candidate.content);
      const currentParts = parts.get(index) ?? [];
      if (content) currentParts.push(...asArray(content.parts));
      parts.set(index, currentParts);

      for (const [key, value] of Object.entries(candidate)) {
        if (key !== "content" && value !== undefined) current[key] = value;
      }
      if (content) {
        current.content = {
          ...asRecord(current.content),
          ...content,
          parts: currentParts,
        };
      }
      candidates.set(index, current);
    }
  }

  result.candidates = [...candidates.entries()]
    .sort(([left], [right]) => left - right)
    .map(([, candidate]) => candidate);
  return { format: "gemini", message: result };
}

export function mergeStream(chunks: SseEvent[]): MergedResponse {
  const format = detectApiFormat(chunks);
  if (format === "anthropic") return rebuildAnthropic(chunks);
  if (format === "openai") return rebuildOpenAI(chunks);
  if (format === "gemini") return rebuildGemini(chunks);
  return { format: "unknown", raw: chunks };
}
