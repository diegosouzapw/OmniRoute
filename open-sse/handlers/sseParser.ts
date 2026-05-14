/**
 * Convert OpenAI-style SSE chunks into a single non-streaming JSON response.
 * Used as a fallback when upstream returns text/event-stream for stream=false.
 */
function readSSEEvents(rawSSE) {
  const lines = String(rawSSE || "").split("\n");
  const events = [];
  let currentEvent = "";
  let currentData = [];

  const flush = () => {
    if (currentData.length === 0) {
      currentEvent = "";
      return;
    }

    const payload = currentData.join("\n").trim();
    currentData = [];
    if (!payload || payload === "[DONE]") {
      currentEvent = "";
      return;
    }

    try {
      const data = JSON.parse(payload);
      if (
        currentEvent &&
        data &&
        typeof data === "object" &&
        !Array.isArray(data) &&
        typeof data.type !== "string"
      ) {
        data.type = currentEvent;
      }
      events.push({
        event: currentEvent || undefined,
        data,
      });
    } catch {
      // Ignore malformed SSE events and continue best-effort parsing.
    }

    currentEvent = "";
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/\r$/, "");
    if (line.trim() === "") {
      flush();
      continue;
    }

    if (line.startsWith("event:")) {
      // Some relays omit the blank separator between Claude events. Flush the
      // previous event before accepting the next event name.
      if (currentData.length > 0) flush();
      currentEvent = line.slice(6).trim();
      continue;
    }

    if (line.startsWith("data:")) {
      const dataLine = line.slice(5).trimStart();
      if (dataLine.trim() === "[DONE]") {
        flush();
        currentEvent = "";
        continue;
      }
      currentData.push(dataLine);
    }
  }

  flush();
  return events;
}

function toRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function toString(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function toNumber(value, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

export function parseSSEToOpenAIResponse(rawSSE, fallbackModel) {
  const lines = String(rawSSE || "").split("\n");
  const chunks = [];
  let sawChoices = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    try {
      const parsed = JSON.parse(payload);
      if (Array.isArray(parsed?.choices)) {
        sawChoices = true;
      }
      chunks.push(parsed);
    } catch {
      // Ignore malformed SSE lines and continue best-effort parsing.
    }
  }

  if (chunks.length === 0 || !sawChoices) return null;

  const first = chunks[0];
  const contentParts = [];
  const reasoningParts = [];
  type AccumulatedToolCall = {
    id: string | null;
    index: number;
    type: string;
    function: { name: string; arguments: string };
  };

  const accumulatedToolCalls = new Map<string, AccumulatedToolCall>();
  let unknownToolCallSeq = 0;
  let finishReason = "stop";
  let usage = null;

  const getToolCallKey = (toolCall: Record<string, unknown>) => {
    if (Number.isInteger(toolCall?.index)) return `idx:${toolCall.index}`;
    if (toolCall?.id) return `id:${toolCall.id}`;
    unknownToolCallSeq += 1;
    return `seq:${unknownToolCallSeq}`;
  };

  for (const chunk of chunks) {
    const choice = chunk?.choices?.[0];
    const delta = choice?.delta || {};

    if (typeof delta.content === "string" && delta.content.length > 0) {
      contentParts.push(delta.content);
    }
    if (typeof delta.reasoning_content === "string" && delta.reasoning_content.length > 0) {
      reasoningParts.push(delta.reasoning_content);
    }
    // Normalize `reasoning` alias (NVIDIA kimi-k2.5 etc.)
    if (
      typeof delta.reasoning === "string" &&
      delta.reasoning.length > 0 &&
      !delta.reasoning_content
    ) {
      reasoningParts.push(delta.reasoning);
    }

    // T18: Accumulate tool calls correctly across streamed chunks
    if (delta.tool_calls) {
      for (const tc of delta.tool_calls) {
        const key = getToolCallKey(tc);
        const existing = accumulatedToolCalls.get(key);
        const deltaArgs = typeof tc?.function?.arguments === "string" ? tc.function.arguments : "";

        if (!existing) {
          accumulatedToolCalls.set(key, {
            id: tc?.id ?? null,
            index: Number.isInteger(tc?.index) ? tc.index : accumulatedToolCalls.size,
            type: tc?.type || "function",
            function: {
              name: tc?.function?.name || "unknown",
              arguments: deltaArgs,
            },
          });
        } else {
          existing.id = existing.id || tc?.id || null;
          if (!Number.isInteger(existing.index) && Number.isInteger(tc?.index)) {
            existing.index = tc.index;
          }
          if (tc?.function?.name && !existing.function?.name) {
            existing.function = existing.function || {};
            existing.function.name = tc.function.name;
          }
          existing.function = existing.function || {};
          existing.function.arguments = `${existing.function.arguments || ""}${deltaArgs}`;
          accumulatedToolCalls.set(key, existing);
        }
      }
    }

    if (choice?.finish_reason) {
      finishReason = choice.finish_reason;
    }
    if (chunk?.usage && typeof chunk.usage === "object") {
      usage = chunk.usage;
    }
  }

  const joinedContent = contentParts.length > 0 ? contentParts.join("").trim() : "";
  const joinedReasoning = reasoningParts.length > 0 ? reasoningParts.join("").trim() : null;
  const message: Record<string, unknown> = {
    role: "assistant",
    content: joinedContent,
  };
  if (joinedReasoning) {
    message.reasoning_content = joinedReasoning;
  }

  const finalToolCalls = [...accumulatedToolCalls.values()].filter(Boolean).sort((a, b) => {
    const ai = Number.isInteger(a?.index) ? a.index : 0;
    const bi = Number.isInteger(b?.index) ? b.index : 0;
    return ai - bi;
  });
  if (finalToolCalls.length > 0) {
    finishReason = "tool_calls"; // T18 normalization
    message.tool_calls = finalToolCalls;
  }

  const result: Record<string, unknown> = {
    id: first.id || `chatcmpl-${Date.now()}`,
    object: "chat.completion",
    created: first.created || Math.floor(Date.now() / 1000),
    model: first.model || fallbackModel || "unknown",
    choices: [
      {
        index: 0,
        message,
        finish_reason: finishReason,
      },
    ],
  };

  if (usage) {
    result.usage = usage;
  }

  return result;
}

/**
 * Convert Claude-style SSE events into a single non-streaming message object.
 * Used when Claude-compatible upstreams stream even for stream=false.
 */
export function parseSSEToClaudeResponse(rawSSE, fallbackModel) {
  const payloads = readSSEEvents(rawSSE)
    .map((event) => toRecord(event.data))
    .filter((payload) => Object.keys(payload).length > 0);

  if (payloads.length === 0) return null;

  const blocks = new Map();
  const usage = {};
  let messageId = "";
  let model = fallbackModel || "claude";
  let role = "assistant";
  let stopReason = "end_turn";
  let stopSequence = null;
  let sawClaudeEvent = false;

  const mergeUsage = (incoming) => {
    const usageRecord = toRecord(incoming);
    for (const [key, value] of Object.entries(usageRecord)) {
      if (typeof value === "number" && Number.isFinite(value)) {
        usage[key] = value;
      } else if (value && typeof value === "object" && !Array.isArray(value)) {
        usage[key] = { ...toRecord(usage[key]), ...toRecord(value) };
      } else if (typeof value === "string" && value.trim().length > 0) {
        usage[key] = value;
      }
    }
  };

  const tryParseJson = (raw) => {
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  };

  for (const payload of payloads) {
    const eventType = toString(payload.type);
    if (eventType === "message_start") {
      sawClaudeEvent = true;
      const message = toRecord(payload.message);
      messageId = toString(message.id, messageId || `msg_${Date.now()}`);
      model = toString(message.model, model);
      role = toString(message.role, role);
      mergeUsage(message.usage);
      continue;
    }

    if (eventType === "content_block_start") {
      sawClaudeEvent = true;
      const index = toNumber(payload.index, blocks.size);
      const contentBlock = toRecord(payload.content_block);
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
          input: contentBlock.input ?? {},
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
      sawClaudeEvent = true;
      const index = toNumber(payload.index, 0);
      const delta = toRecord(payload.delta);
      const deltaType = toString(delta.type);
      const existing = blocks.get(index);

      if (deltaType === "input_json_delta") {
        const toolUse =
          existing && existing.type === "tool_use"
            ? existing
            : {
                type: "tool_use",
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
            : { type: "thinking", index, thinking: "", signature: undefined };
        thinking.thinking += toString(delta.thinking);
        blocks.set(index, thinking);
        continue;
      }

      const textBlock =
        existing && existing.type === "text"
          ? existing
          : {
              type: "text",
              index,
              text: "",
            };
      textBlock.text += toString(delta.text);
      blocks.set(index, textBlock);
      continue;
    }

    if (eventType === "message_delta") {
      sawClaudeEvent = true;
      const delta = toRecord(payload.delta);
      stopReason = toString(delta.stop_reason, stopReason);
      stopSequence =
        typeof delta.stop_sequence === "string" ? String(delta.stop_sequence) : stopSequence;
      mergeUsage(payload.usage);
      continue;
    }

    mergeUsage(payload.usage);
  }

  if (!sawClaudeEvent) return null;

  const content = [...blocks.values()]
    .sort((a, b) => a.index - b.index)
    .flatMap((block) => {
      if (block.type === "text") {
        return block.text ? [{ type: "text", text: block.text }] : [];
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
        block.inputJson.trim().length > 0 ? tryParseJson(block.inputJson) : block.input;
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

/**
 * Convert Responses API SSE events into a single non-streaming response object.
 * Expects events such as response.created / response.in_progress / response.completed.
 */
const RESPONSES_TERMINAL_EVENT_TYPES = new Set([
  "response.completed",
  "response.done",
  "response.cancelled",
  "response.canceled",
  "response.failed",
  "response.incomplete",
]);

function toOutputIndex(value) {
  if (typeof value === "number" && Number.isInteger(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isInteger(parsed)) return parsed;
  }
  return null;
}

function cloneResponseItem(item) {
  const record = toRecord(item);
  return {
    ...record,
    ...(Array.isArray(record.content)
      ? {
          content: record.content.map((contentPart) => {
            const part = toRecord(contentPart);
            return { ...part };
          }),
        }
      : {}),
    ...(Array.isArray(record.summary)
      ? {
          summary: record.summary.map((summaryPart) => {
            const part = toRecord(summaryPart);
            return { ...part };
          }),
        }
      : {}),
  };
}

function ensureResponsesMessageItem(outputItems, outputIndex) {
  const existing = outputItems.get(outputIndex);
  if (existing?.type === "message") return existing;

  const next = {
    ...(existing && typeof existing === "object" ? existing : {}),
    id: existing?.id || `msg_${Date.now()}_${outputIndex}`,
    type: "message",
    role: "assistant",
    content: Array.isArray(existing?.content)
      ? existing.content.map((contentPart) => ({ ...toRecord(contentPart) }))
      : [{ type: "output_text", annotations: [], text: "" }],
  };

  if (next.content.length === 0) {
    next.content.push({ type: "output_text", annotations: [], text: "" });
  }

  outputItems.set(outputIndex, next);
  return next;
}

function ensureResponsesReasoningItem(outputItems, outputIndex, itemId) {
  const existing = outputItems.get(outputIndex);
  if (existing?.type === "reasoning") return existing;

  const next = {
    ...(existing && typeof existing === "object" ? existing : {}),
    id: itemId || existing?.id || `rs_${Date.now()}_${outputIndex}`,
    type: "reasoning",
    summary: Array.isArray(existing?.summary)
      ? existing.summary.map((summaryPart) => ({ ...toRecord(summaryPart) }))
      : [{ type: "summary_text", text: "" }],
  };

  if (next.summary.length === 0) {
    next.summary.push({ type: "summary_text", text: "" });
  }

  outputItems.set(outputIndex, next);
  return next;
}

function ensureResponsesFunctionCallItem(outputItems, outputIndex, itemId, callId, name) {
  const existing = outputItems.get(outputIndex);
  if (existing?.type === "function_call") {
    if (callId && !existing.call_id) existing.call_id = callId;
    if (name && !existing.name) existing.name = name;
    if (itemId && !existing.id) existing.id = itemId;
    return existing;
  }

  const next = {
    ...(existing && typeof existing === "object" ? existing : {}),
    id: itemId || existing?.id || `fc_${callId || `${Date.now()}_${outputIndex}`}`,
    type: "function_call",
    call_id: callId || existing?.call_id || "",
    name: name || existing?.name || "",
    arguments: typeof existing?.arguments === "string" ? existing.arguments : "",
  };

  outputItems.set(outputIndex, next);
  return next;
}

function mergeResponseItems(existing, incoming) {
  const next = cloneResponseItem(incoming);
  if (!existing || typeof existing !== "object") return next;

  return {
    ...existing,
    ...next,
    ...(Array.isArray(next.content)
      ? {
          content: next.content,
        }
      : {}),
    ...(Array.isArray(next.summary)
      ? {
          summary: next.summary,
        }
      : {}),
  };
}

export function parseSSEToResponsesOutput(rawSSE, fallbackModel) {
  const lines = String(rawSSE || "").split("\n");
  const events = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    try {
      const parsed = JSON.parse(payload);
      const record = toRecord(parsed);
      if (Object.keys(record).length > 0) {
        events.push(record);
      }
    } catch {
      // Ignore malformed lines and continue best-effort parsing.
    }
  }

  if (events.length === 0) return null;

  let terminalResponse = null;
  let terminalEventType = "";
  let latestResponse = null;
  const outputItems = new Map();

  for (const evt of events) {
    const eventType = toString(evt?.type);
    const outputIndex = toOutputIndex(evt?.output_index);
    const item = toRecord(evt?.item);

    if (outputIndex !== null && eventType === "response.output_item.added") {
      outputItems.set(outputIndex, cloneResponseItem(item));
    }

    if (outputIndex !== null && eventType === "response.output_item.done") {
      const existing = outputItems.get(outputIndex);
      outputItems.set(outputIndex, mergeResponseItems(existing, item));
    }

    if (outputIndex !== null && eventType === "response.output_text.delta") {
      const messageItem = ensureResponsesMessageItem(outputItems, outputIndex);
      const content = Array.isArray(messageItem.content) ? messageItem.content : [];
      const firstPart =
        content.length > 0 ? { ...toRecord(content[0]) } : { type: "output_text", annotations: [] };
      firstPart.type = firstPart.type || "output_text";
      firstPart.annotations = Array.isArray(firstPart.annotations) ? firstPart.annotations : [];
      firstPart.text = `${toString(firstPart.text)}${toString(evt.delta)}`;
      content[0] = firstPart;
      messageItem.content = content;
    }

    if (outputIndex !== null && eventType === "response.output_text.done") {
      const messageItem = ensureResponsesMessageItem(outputItems, outputIndex);
      const content = Array.isArray(messageItem.content) ? messageItem.content : [];
      const firstPart =
        content.length > 0 ? { ...toRecord(content[0]) } : { type: "output_text", annotations: [] };
      firstPart.type = firstPart.type || "output_text";
      firstPart.annotations = Array.isArray(firstPart.annotations) ? firstPart.annotations : [];
      firstPart.text = toString(evt.text, toString(firstPart.text));
      content[0] = firstPart;
      messageItem.content = content;
    }

    if (outputIndex !== null && eventType === "response.reasoning_summary_text.delta") {
      const reasoningItem = ensureResponsesReasoningItem(
        outputItems,
        outputIndex,
        toString(evt.item_id)
      );
      const summary = Array.isArray(reasoningItem.summary) ? reasoningItem.summary : [];
      const firstPart =
        summary.length > 0 ? { ...toRecord(summary[0]) } : { type: "summary_text", text: "" };
      firstPart.type = firstPart.type || "summary_text";
      firstPart.text = `${toString(firstPart.text)}${toString(evt.delta)}`;
      summary[0] = firstPart;
      reasoningItem.summary = summary;
    }

    if (outputIndex !== null && eventType === "response.reasoning_summary_text.done") {
      const reasoningItem = ensureResponsesReasoningItem(
        outputItems,
        outputIndex,
        toString(evt.item_id)
      );
      const summary = Array.isArray(reasoningItem.summary) ? reasoningItem.summary : [];
      const firstPart =
        summary.length > 0 ? { ...toRecord(summary[0]) } : { type: "summary_text", text: "" };
      firstPart.type = firstPart.type || "summary_text";
      firstPart.text = toString(evt.text, toString(firstPart.text));
      summary[0] = firstPart;
      reasoningItem.summary = summary;
    }

    if (outputIndex !== null && eventType === "response.function_call_arguments.delta") {
      const functionCallItem = ensureResponsesFunctionCallItem(
        outputItems,
        outputIndex,
        toString(evt.item_id),
        "",
        ""
      );
      functionCallItem.arguments = `${toString(functionCallItem.arguments)}${toString(evt.delta)}`;
    }

    if (outputIndex !== null && eventType === "response.function_call_arguments.done") {
      const functionCallItem = ensureResponsesFunctionCallItem(
        outputItems,
        outputIndex,
        toString(evt.item_id),
        "",
        ""
      );
      functionCallItem.arguments = toString(evt.arguments, toString(functionCallItem.arguments));
    }

    if (RESPONSES_TERMINAL_EVENT_TYPES.has(eventType) && evt.response) {
      terminalResponse = evt.response;
      terminalEventType = eventType;
    }
    if (evt?.response && typeof evt.response === "object") {
      latestResponse = evt.response;
    } else if (evt?.object === "response") {
      latestResponse = evt;
    }
  }

  const picked = terminalResponse || latestResponse;
  if (!picked || typeof picked !== "object") return null;
  const reconstructedOutput = [...outputItems.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, item]) => item)
    .filter((item) => item && typeof item === "object");
  const pickedOutput = Array.isArray(picked.output) ? picked.output : [];
  const statusFallback =
    terminalEventType === "response.cancelled"
      ? "cancelled"
      : terminalEventType === "response.canceled"
        ? "canceled"
        : terminalEventType === "response.failed"
          ? "failed"
          : terminalEventType === "response.incomplete"
            ? "incomplete"
            : terminalResponse
              ? "completed"
              : "in_progress";

  return {
    id: picked.id || `resp_${Date.now()}`,
    object: picked.object || "response",
    model: picked.model || fallbackModel || "unknown",
    output: pickedOutput.length > 0 ? pickedOutput : reconstructedOutput,
    usage: picked.usage || null,
    status: picked.status || statusFallback,
    created_at: picked.created_at || Math.floor(Date.now() / 1000),
    metadata: picked.metadata || {},
  };
}
