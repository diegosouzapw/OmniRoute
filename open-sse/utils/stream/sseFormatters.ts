import { asRecord } from "./utils.ts";
import { JsonRecord, ToolCall } from "./types.ts";

/* @testonly */ export function toStreamingToolCallDelta(toolCall: ToolCall) {
  return {
    index: toolCall.index,
    id: toolCall.id != null ? String(toolCall.id) : null,
    type: toolCall.type,
    function: {
      name: toolCall.function.name,
      arguments: toolCall.function.arguments,
    },
  };
}

/* @testonly */ export function toResponsesFunctionCallItem(toolCall: ToolCall) {
  return {
    type: "function_call",
    id: (toolCall.id != null ? String(toolCall.id) : null) || `fc_${toolCall.index}`,
    call_id: (toolCall.id != null ? String(toolCall.id) : null) || `call_${toolCall.index}`,
    name: toolCall.function.name,
    arguments: toolCall.function.arguments,
    status: "completed",
  };
}

export function buildResponsesFunctionCallEvents(toolCall: ToolCall) {
  const item = toResponsesFunctionCallItem(toolCall);
  return [
    {
      type: "response.output_item.added",
      output_index: toolCall.index,
      item,
    },
    {
      type: "response.function_call_arguments.done",
      item_id: item.id,
      output_index: toolCall.index,
      arguments: toolCall.function.arguments,
    },
    {
      type: "response.output_item.done",
      output_index: toolCall.index,
      item,
    },
  ];
}

export function formatSSEDataEvents(events: unknown[]) {
  return events.map((event) => `data: ${JSON.stringify(event)}\n`).join("\n");
}

export function toChatCompletionChunkWithToolCall(base: JsonRecord, toolCall: ToolCall) {
  const choice = asRecord(Array.isArray(base.choices) ? base.choices[0] : null);
  const delta = { ...asRecord(choice.delta) };
  delete delta.content;
  delete delta.reasoning_content;
  return {
    ...base,
    choices: [
      {
        ...choice,
        index: typeof choice.index === "number" ? choice.index : 0,
        delta: {
          ...delta,
          tool_calls: [toStreamingToolCallDelta(toolCall)],
        },
        finish_reason: null,
      },
    ],
  };
}

export function toResponsesCompletedWithToolCalls(parsed: JsonRecord, toolCalls: ToolCall[]) {
  const response = asRecord(parsed.response);
  const existingOutput = Array.isArray(response.output) ? response.output : [];
  return {
    ...parsed,
    response: {
      ...response,
      output: [
        ...existingOutput,
        ...toolCalls.map((toolCall) => toResponsesFunctionCallItem(toolCall)),
      ],
    },
  };
}