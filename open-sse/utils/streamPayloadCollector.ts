import { cloneLogPayload } from "@/lib/logPayloads";
import { FORMATS } from "../translator/formats.ts";

type StructuredSSEEvent = {
  index: number;
  event?: string;
  data: unknown;
};

type CollectorOptions = {
  maxEvents?: number;
  maxBytes?: number;
  stage?: string;
};

type BuildOptions = {
  includeEvents?: boolean;
};

type JsonRecord = Record<string, unknown>;

function getEventName(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return undefined;

  if (typeof (payload as { event?: unknown }).event === "string") {
    return (payload as { event: string }).event;
  }
  if (typeof (payload as { type?: unknown }).type === "string") {
    return (payload as { type: string }).type;
  }
  if ((payload as { done?: unknown }).done === true) {
    return "[DONE]";
  }
  return undefined;
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

function normalizeFormat(format?: string | null): string {
  if (!format) return "";
  if (format === FORMATS.OPENAI_RESPONSE) return FORMATS.OPENAI_RESPONSES;
  return format;
}

function inferFormatFromEvents(
  events: StructuredSSEEvent[],
  fallbackFormat?: string | null
): string {
  const normalizedFallback = normalizeFormat(fallbackFormat);
  if (normalizedFallback) return normalizedFallback;

  for (const evt of events) {
    const payload = asRecord(evt.data);
    const eventType = toString(payload.type || evt.event);

    if (eventType.startsWith("response.") || payload.object === "response") {
      return FORMATS.OPENAI_RESPONSES;
    }
    if (
      eventType === "message_start" ||
      eventType === "content_block_start" ||
      eventType === "content_block_delta" ||
      eventType === "message_delta" ||
      eventType === "message_stop" ||
      eventType === "ping"
    ) {
      return FORMATS.CLAUDE;
    }
    if (Array.isArray(payload.candidates) || payload.usageMetadata) {
      return FORMATS.GEMINI;
    }
  }

  return FORMATS.OPENAI;
}

function mergeUsage(target: JsonRecord, incoming: unknown) {
  const usage = asRecord(incoming);
  for (const [key, value] of Object.entries(usage)) {
    if (typeof value === "number" && Number.isFinite(value)) {
      if ((target[key] as number | undefined) === undefined || value > 0) {
        target[key] = value;
      }
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      target[key] = { ...asRecord(target[key]), ...asRecord(value) };
    } else if (typeof value === "string" && value.trim().length > 0) {
      target[key] = value;
    }
  }
}

function tryParseJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function buildOpenAISummary(events: StructuredSSEEvent[], fallbackModel?: string | null): unknown {
  const payloads = events
    .map((evt) => asRecord(evt.data))
    .filter((payload) => Object.keys(payload).length);
  if (payloads.length === 0) return null;

  const first = payloads[0];
  const contentParts: string[] = [];
  const reasoningParts: string[] = [];
  type ToolCall = {
    id: string | null;
    index: number;
    type: string;
    function: { name: string; arguments: string };
  };
  const toolCalls = new Map<string, ToolCall>();
  let unknownToolCallSeq = 0;
  let finishReason = "stop";
  let usage: JsonRecord | null = null;

  const getToolCallKey = (toolCall: JsonRecord) => {
    if (Number.isInteger(toolCall.index)) return `idx:${toolCall.index}`;
    if (toolCall.id) return `id:${toolCall.id}`;
    unknownToolCallSeq += 1;
    return `seq:${unknownToolCallSeq}`;
  };

  for (const chunk of payloads) {
    const choice = asRecord(Array.isArray(chunk.choices) ? chunk.choices[0] : null);
    const delta = asRecord(choice.delta);

    if (typeof delta.content === "string" && delta.content.length > 0) {
      contentParts.push(delta.content);
    }
    if (Array.isArray(delta.content)) {
      for (const part of delta.content) {
        const partObj = asRecord(part);
        if (typeof partObj.text === "string" && partObj.text.length > 0) {
          contentParts.push(partObj.text);
        }
      }
    }
    if (typeof delta.reasoning_content === "string" && delta.reasoning_content.length > 0) {
      reasoningParts.push(delta.reasoning_content);
    }

    if (Array.isArray(delta.tool_calls)) {
      for (const item of delta.tool_calls) {
        const toolCall = asRecord(item);
        const key = getToolCallKey(toolCall);
        const existing = toolCalls.get(key);
        const deltaArgs =
          typeof asRecord(toolCall.function).arguments === "string"
            ? String(asRecord(toolCall.function).arguments)
            : "";

        if (!existing) {
          toolCalls.set(key, {
            id: typeof toolCall.id === "string" ? toolCall.id : null,
            index: Number.isInteger(toolCall.index) ? Number(toolCall.index) : toolCalls.size,
            type: toString(toolCall.type, "function"),
            function: {
              name: toString(asRecord(toolCall.function).name, "unknown"),
              arguments: deltaArgs,
            },
          });
          continue;
        }

        existing.id = existing.id || (typeof toolCall.id === "string" ? toolCall.id : null);
        if (
          (!Number.isInteger(existing.index) || existing.index < 0) &&
          Number.isInteger(toolCall.index)
        ) {
          existing.index = Number(toolCall.index);
        }
        if (typeof asRecord(toolCall.function).name === "string" && !existing.function.name) {
          existing.function.name = String(asRecord(toolCall.function).name);
        }
        existing.function.arguments += deltaArgs;
      }
    }

    if (typeof choice.finish_reason === "string" && choice.finish_reason.length > 0) {
      finishReason = choice.finish_reason;
    }
    if (chunk.usage && typeof chunk.usage === "object") {
      usage = { ...asRecord(chunk.usage) };
    }
  }

  const message: JsonRecord = {
    role: "assistant",
    content: contentParts.length > 0 ? contentParts.join("") : null,
  };
  if (reasoningParts.length > 0) {
    message.reasoning_content = reasoningParts.join("");
  }

  const finalToolCalls = [...toolCalls.values()].sort((a, b) => a.index - b.index);
  if (finalToolCalls.length > 0) {
    finishReason = "tool_calls";
    message.tool_calls = finalToolCalls;
  }

  const result: JsonRecord = {
    id: toString(first.id, `chatcmpl-${Date.now()}`),
    object: "chat.completion",
    created: toNumber(first.created, Math.floor(Date.now() / 1000)),
    model: toString(first.model, fallbackModel || "unknown"),
    choices: [
      {
        index: 0,
        message,
        finish_reason: finishReason,
      },
    ],
  };

  if (usage && Object.keys(usage).length > 0) {
    result.usage = usage;
  }

  return result;
}

function buildResponsesSummary(
  events: StructuredSSEEvent[],
  fallbackModel?: string | null
): unknown {
  const payloads = events
    .map((evt) => asRecord(evt.data))
    .filter((payload) => Object.keys(payload).length);
  if (payloads.length === 0) return null;

  let completed: JsonRecord | null = null;
  let latestResponse: JsonRecord | null = null;
  let usage: JsonRecord | null = null;
  const textParts: string[] = [];

  for (const payload of payloads) {
    const eventType = toString(payload.type);
    if (
      eventType === "response.completed" &&
      payload.response &&
      typeof payload.response === "object"
    ) {
      completed = asRecord(payload.response);
    }
    if (payload.response && typeof payload.response === "object") {
      latestResponse = asRecord(payload.response);
    } else if (payload.object === "response") {
      latestResponse = payload;
    }
    if (
      eventType === "response.output_text.delta" &&
      typeof payload.delta === "string" &&
      payload.delta.length > 0
    ) {
      textParts.push(payload.delta);
    }
    if (payload.usage && typeof payload.usage === "object") {
      usage = { ...asRecord(payload.usage) };
    } else if (payload.response && typeof asRecord(payload.response).usage === "object") {
      usage = { ...asRecord(asRecord(payload.response).usage) };
    }
  }

  const picked = completed || latestResponse;
  if (picked && Object.keys(picked).length > 0) {
    return {
      id: toString(picked.id, `resp_${Date.now()}`),
      object: "response",
      model: toString(picked.model, fallbackModel || "unknown"),
      output: Array.isArray(picked.output) ? picked.output : [],
      usage: picked.usage ?? usage ?? null,
      status: toString(picked.status, completed ? "completed" : "in_progress"),
      created_at: toNumber(picked.created_at, Math.floor(Date.now() / 1000)),
      metadata: asRecord(picked.metadata),
    };
  }

  return {
    id: `resp_${Date.now()}`,
    object: "response",
    model: fallbackModel || "unknown",
    output:
      textParts.length > 0
        ? [
            {
              type: "message",
              role: "assistant",
              content: [{ type: "output_text", text: textParts.join("") }],
            },
          ]
        : [],
    usage: usage ?? null,
    status: "completed",
    created_at: Math.floor(Date.now() / 1000),
    metadata: {},
  };
}

function buildClaudeSummary(events: StructuredSSEEvent[], fallbackModel?: string | null): unknown {
  const payloads = events
    .map((evt) => asRecord(evt.data))
    .filter((payload) => Object.keys(payload).length);
  if (payloads.length === 0) return null;

  type ClaudeBlock =
    | { type: "text"; index: number; text: string }
    | { type: "thinking"; index: number; thinking: string; signature?: string }
    | {
        type: "tool_use";
        index: number;
        id: string;
        name: string;
        input: unknown;
        inputJson: string;
      };

  const blocks = new Map<number, ClaudeBlock>();
  const usage: JsonRecord = {};
  let messageId = "";
  let model = fallbackModel || "claude";
  let role = "assistant";
  let stopReason = "end_turn";
  let stopSequence: string | null = null;

  for (const payload of payloads) {
    const eventType = toString(payload.type);
    if (eventType === "message_start") {
      const message = asRecord(payload.message);
      messageId = toString(message.id, messageId || `msg_${Date.now()}`);
      model = toString(message.model, model);
      role = toString(message.role, role);
      mergeUsage(usage, message.usage);
      continue;
    }

    if (eventType === "content_block_start") {
      const index = toNumber(payload.index, blocks.size);
      const contentBlock = asRecord(payload.content_block);
      const blockType = toString(contentBlock.type);

      if (blockType === "thinking") {
        blocks.set(index, {
          type: "thinking",
          index,
          thinking: toString(contentBlock.thinking),
          signature:
            typeof contentBlock.signature === "string" ? contentBlock.signature : undefined,
        });
      } else if (blockType === "tool_use") {
        blocks.set(index, {
          type: "tool_use",
          index,
          id: toString(contentBlock.id, `toolu_${Date.now()}_${index}`),
          name: toString(contentBlock.name),
          input: cloneLogPayload(contentBlock.input ?? {}),
          inputJson: "",
        });
      } else {
        blocks.set(index, {
          type: "text",
          index,
          text: toString(contentBlock.text),
        });
      }
      continue;
    }

    if (eventType === "content_block_delta") {
      const index = toNumber(payload.index, 0);
      const delta = asRecord(payload.delta);
      const deltaType = toString(delta.type);
      const existing = blocks.get(index);

      if (deltaType === "input_json_delta") {
        const toolUse =
          existing && existing.type === "tool_use"
            ? existing
            : {
                type: "tool_use" as const,
                index,
                id: `toolu_${Date.now()}_${index}`,
                name: "",
                input: {},
                inputJson: "",
              };
        toolUse.inputJson += toString(delta.partial_json);
        blocks.set(index, toolUse);
        continue;
      }

      if (deltaType === "thinking_delta" || typeof delta.thinking === "string") {
        const thinking =
          existing && existing.type === "thinking"
            ? existing
            : { type: "thinking" as const, index, thinking: "", signature: undefined };
        thinking.thinking += toString(delta.thinking);
        blocks.set(index, thinking);
        continue;
      }

      const textBlock =
        existing && existing.type === "text"
          ? existing
          : {
              type: "text" as const,
              index,
              text: "",
            };
      textBlock.text += toString(delta.text);
      blocks.set(index, textBlock);
      continue;
    }

    if (eventType === "message_delta") {
      const delta = asRecord(payload.delta);
      stopReason = toString(delta.stop_reason, stopReason);
      stopSequence =
        typeof delta.stop_sequence === "string" ? String(delta.stop_sequence) : stopSequence;
      mergeUsage(usage, payload.usage);
      continue;
    }

    mergeUsage(usage, payload.usage);
  }

  const content = [...blocks.values()]
    .sort((a, b) => a.index - b.index)
    .flatMap((block) => {
      if (block.type === "text") {
        return block.text
          ? [
              {
                type: "text",
                text: block.text,
              },
            ]
          : [];
      }
      if (block.type === "thinking") {
        return block.thinking
          ? [
              {
                type: "thinking",
                thinking: block.thinking,
                ...(block.signature ? { signature: block.signature } : {}),
              },
            ]
          : [];
      }

      const parsedInput =
        block.inputJson.trim().length > 0
          ? tryParseJson(block.inputJson)
          : cloneLogPayload(block.input);
      return [
        {
          type: "tool_use",
          id: block.id,
          name: block.name,
          input: parsedInput,
        },
      ];
    });

  return {
    id: messageId || `msg_${Date.now()}`,
    type: "message",
    role,
    model,
    content,
    stop_reason: stopReason,
    ...(stopSequence ? { stop_sequence: stopSequence } : {}),
    ...(Object.keys(usage).length > 0 ? { usage } : {}),
  };
}

function buildGeminiSummary(events: StructuredSSEEvent[], fallbackModel?: string | null): unknown {
  const payloads = events
    .map((evt) => asRecord(evt.data))
    .filter((payload) => Object.keys(payload).length);
  if (payloads.length === 0) return null;

  const parts: JsonRecord[] = [];
  const usageMetadata: JsonRecord = {};
  let modelVersion = fallbackModel || "gemini";
  let finishReason = "STOP";
  let role = "model";

  const appendPart = (part: JsonRecord) => {
    const last = parts[parts.length - 1];
    if (
      last &&
      typeof last.text === "string" &&
      typeof part.text === "string" &&
      Boolean(last.thought) === Boolean(part.thought)
    ) {
      last.text += part.text;
      return;
    }
    parts.push(part);
  };

  for (const payload of payloads) {
    if (typeof payload.modelVersion === "string" && payload.modelVersion.length > 0) {
      modelVersion = payload.modelVersion;
    }
    mergeUsage(usageMetadata, payload.usageMetadata);

    const candidate = asRecord(Array.isArray(payload.candidates) ? payload.candidates[0] : null);
    if (typeof candidate.finishReason === "string" && candidate.finishReason.length > 0) {
      finishReason = candidate.finishReason;
    }

    const content = asRecord(candidate.content);
    if (typeof content.role === "string" && content.role.length > 0) {
      role = content.role;
    }

    if (!Array.isArray(content.parts)) continue;
    for (const item of content.parts) {
      const part = asRecord(item);
      if (part.functionCall && typeof part.functionCall === "object") {
        parts.push({
          functionCall: cloneLogPayload(part.functionCall),
        });
      } else if (typeof part.text === "string" && part.text.length > 0) {
        appendPart({
          text: part.text,
          ...(part.thought === true ? { thought: true } : {}),
        });
      }
    }
  }

  return {
    candidates: [
      {
        index: 0,
        content: {
          role,
          parts,
        },
        finishReason,
      },
    ],
    ...(Object.keys(usageMetadata).length > 0 ? { usageMetadata } : {}),
    modelVersion,
  };
}

export function buildStreamSummaryFromEvents(
  events: StructuredSSEEvent[],
  fallbackFormat?: string | null,
  fallbackModel?: string | null
): unknown {
  const format = inferFormatFromEvents(events, fallbackFormat);

  switch (format) {
    case FORMATS.OPENAI_RESPONSES:
      return buildResponsesSummary(events, fallbackModel);
    case FORMATS.CLAUDE:
      return buildClaudeSummary(events, fallbackModel);
    case FORMATS.GEMINI:
    case FORMATS.GEMINI_CLI:
    case FORMATS.ANTIGRAVITY:
      return buildGeminiSummary(events, fallbackModel);
    default:
      return buildOpenAISummary(events, fallbackModel);
  }
}

export function compactStructuredStreamPayload(payload: unknown): unknown {
  const record = asRecord(payload);
  if (record._streamed !== true || !("summary" in record)) {
    return payload;
  }

  const streamMeta: JsonRecord = {
    format: toString(record._format, "sse-json"),
    stage: toString(record._stage, "response"),
    eventCount: toNumber(record._eventCount, 0),
  };
  if (record._truncated === true) {
    streamMeta.truncated = true;
  }
  if (typeof record._droppedEvents === "number" && record._droppedEvents > 0) {
    streamMeta.droppedEvents = record._droppedEvents;
  }

  const summary = cloneLogPayload(record.summary);
  if (summary && typeof summary === "object" && !Array.isArray(summary)) {
    return {
      ...(summary as JsonRecord),
      _omniroute_stream: streamMeta,
    };
  }

  return {
    summary,
    _omniroute_stream: streamMeta,
  };
}

export function createStructuredSSECollector(options: CollectorOptions = {}) {
  const { maxEvents = 200, maxBytes = 49152, stage } = options;
  const events: StructuredSSEEvent[] = [];
  let usedBytes = 0;
  let droppedEvents = 0;

  return {
    push(payload: unknown, explicitEvent?: string) {
      if (payload === null || payload === undefined) return;

      const event: StructuredSSEEvent = {
        index: events.length + droppedEvents,
        data: cloneLogPayload(payload),
      };

      const eventName = explicitEvent || getEventName(payload);
      if (eventName) {
        event.event = eventName;
      }

      const serializedSize = JSON.stringify(event).length;
      if (events.length >= maxEvents || usedBytes + serializedSize > maxBytes) {
        droppedEvents += 1;
        return;
      }

      usedBytes += serializedSize;
      events.push(event);
    },

    getEvents() {
      return events.map((event) => cloneLogPayload(event));
    },

    build(summary?: unknown, buildOptions: BuildOptions = {}) {
      const { includeEvents = true } = buildOptions;
      return {
        _streamed: true,
        _format: "sse-json",
        ...(stage ? { _stage: stage } : {}),
        _eventCount: events.length + droppedEvents,
        ...(droppedEvents > 0 ? { _truncated: true, _droppedEvents: droppedEvents } : {}),
        ...(includeEvents ? { events } : {}),
        ...(summary === undefined ? {} : { summary: cloneLogPayload(summary) }),
      };
    },
  };
}
