import {
  estimateTokens,
  type ClaudeResponseArgs,
  type ClaudeToolUseArgs,
  type JsonRecord,
} from "./types.ts";

function usage(inputTokens: number, outputTokens: number) {
  return {
    input_tokens: inputTokens,
    output_tokens: outputTokens,
  };
}

export function buildClaudeTextResponse(args: ClaudeResponseArgs): JsonRecord {
  return {
    id: args.id,
    type: "message",
    role: "assistant",
    model: args.model,
    content: [{ type: "text", text: args.text }],
    stop_reason: "end_turn",
    stop_sequence: null,
    usage: usage(args.inputTokens, args.outputTokens || estimateTokens(args.text)),
  };
}

export function buildClaudeToolUseResponse(args: ClaudeToolUseArgs): JsonRecord {
  return {
    id: args.id,
    type: "message",
    role: "assistant",
    model: args.model,
    content: [
      {
        type: "tool_use",
        id: args.tool.id,
        name: args.tool.name,
        input: args.tool.input,
      },
    ],
    stop_reason: "tool_use",
    stop_sequence: null,
    usage: usage(args.inputTokens, args.outputTokens),
  };
}

function frame(event: string, data: JsonRecord): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export function buildClaudeSseFrames(message: JsonRecord): string {
  const content = Array.isArray(message.content) ? message.content : [];
  const startMessage = { ...message, content: [], stop_reason: null, stop_sequence: null };
  let out = frame("message_start", { type: "message_start", message: startMessage });

  content.forEach((block, index) => {
    const blockRecord = block as JsonRecord;
    if (blockRecord.type === "text") {
      out += frame("content_block_start", {
        type: "content_block_start",
        index,
        content_block: { type: "text", text: "" },
      });
      out += frame("content_block_delta", {
        type: "content_block_delta",
        index,
        delta: { type: "text_delta", text: String(blockRecord.text || "") },
      });
      out += frame("content_block_stop", { type: "content_block_stop", index });
      return;
    }

    if (blockRecord.type === "tool_use") {
      out += frame("content_block_start", {
        type: "content_block_start",
        index,
        content_block: {
          type: "tool_use",
          id: blockRecord.id,
          name: blockRecord.name,
          input: {},
        },
      });
      out += frame("content_block_delta", {
        type: "content_block_delta",
        index,
        delta: {
          type: "input_json_delta",
          partial_json: JSON.stringify(blockRecord.input || {}),
        },
      });
      out += frame("content_block_stop", { type: "content_block_stop", index });
    }
  });

  out += frame("message_delta", {
    type: "message_delta",
    delta: { stop_reason: message.stop_reason, stop_sequence: null },
    usage: { output_tokens: (message.usage as JsonRecord | undefined)?.output_tokens || 0 },
  });
  out += frame("message_stop", { type: "message_stop" });
  return out;
}
