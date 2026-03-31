import { FORMATS } from "../translator/formats.ts";

type JsonRecord = Record<string, unknown>;

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function toNumber(value: unknown, fallback = 0): number {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim().length > 0
        ? Number(value)
        : Number.NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

function extractMessageOutputText(item: JsonRecord): string {
  if (!Array.isArray(item.content)) return "";
  let text = "";
  for (const part of item.content) {
    if (!part || typeof part !== "object") continue;
    const partObj = toRecord(part);
    if (partObj.type === "output_text" && typeof partObj.text === "string") {
      text += partObj.text;
    }
  }
  return text;
}

/**
 * T19: Pick the last non-empty message output text from Responses API output.
 * Falls back to the last message item even when all message texts are empty.
 */
function findBestMessageText(output: unknown[]): {
  text: string;
  selectedMessageIndex: number;
  messageItems: JsonRecord[];
} {
  const messageItems = output
    .map((item) => toRecord(item))
    .filter((item) => item.type === "message" && Array.isArray(item.content));

  for (let i = messageItems.length - 1; i >= 0; i -= 1) {
    const text = extractMessageOutputText(messageItems[i]);
    if (text.trim().length > 0) {
      return { text, selectedMessageIndex: i, messageItems };
    }
  }

  if (messageItems.length > 0) {
    const lastIndex = messageItems.length - 1;
    return {
      text: extractMessageOutputText(messageItems[lastIndex]),
      selectedMessageIndex: lastIndex,
      messageItems,
    };
  }

  return { text: "", selectedMessageIndex: -1, messageItems: [] };
}

/**
 * Translate non-streaming response to OpenAI format
 * Handles different provider response formats (Gemini, Claude, etc.)
 *
 * @param toolNameMap - Optional Map<prefixedName, originalName> for Claude OAuth tool name stripping
 */
export function translateNonStreamingResponse(
  responseBody: unknown,
  targetFormat: string,
  sourceFormat: string,
  toolNameMap?: Map<string, string> | null
): unknown {
  // If already in source format, return as-is
  if (targetFormat === sourceFormat) {
    return responseBody;
  }

  let intermediateOpenAI = responseBody;

  // Handle OpenAI Responses API format
  if (targetFormat === FORMATS.OPENAI_RESPONSES) {
    const responseRoot = toRecord(responseBody);
    const response =
      responseRoot.object === "response"
        ? responseRoot
        : toRecord(responseRoot.response ?? responseRoot);
    const output = Array.isArray(response.output) ? response.output : [];
    const usage = toRecord(response.usage ?? responseRoot.usage);

    const messageSelection = findBestMessageText(output);
    let textContent = messageSelection.text;
    let reasoningContent = "";
    const toolCalls: JsonRecord[] = [];

    for (const item of output) {
      if (!item || typeof item !== "object") continue;
      const itemObj = toRecord(item);

      if (itemObj.type === "message" && Array.isArray(itemObj.content)) {
        for (const part of itemObj.content) {
          if (!part || typeof part !== "object") continue;
          const partObj = toRecord(part);
          if (partObj.type === "summary_text" && typeof partObj.text === "string") {
            reasoningContent += partObj.text;
          }
        }
      } else if (itemObj.type === "reasoning" && Array.isArray(itemObj.summary)) {
        for (const part of itemObj.summary) {
          const partObj = toRecord(part);
          if (partObj.type === "summary_text" && typeof partObj.text === "string") {
            reasoningContent += partObj.text;
          }
        }
      } else if (itemObj.type === "function_call") {
        const callId =
          toString(itemObj.call_id) ||
          toString(itemObj.id) ||
          `call_${Date.now()}_${toolCalls.length}`;
        const fnArgs =
          typeof itemObj.arguments === "string"
            ? itemObj.arguments
            : JSON.stringify(itemObj.arguments || {});
        const rawName = toString(itemObj.name);
        // Strip Claude OAuth proxy_ prefix using toolNameMap
        const resolvedName = toolNameMap?.get(rawName) ?? rawName;
        toolCalls.push({
          id: callId,
          type: "function",
          function: {
            name: resolvedName,
            arguments: fnArgs,
          },
        });
      }
    }

    const message: JsonRecord = { role: "assistant" };
    if (textContent) {
      message.content = textContent;
    }
    if (reasoningContent) {
      message.reasoning_content = reasoningContent;
    }
    if (toolCalls.length > 0) {
      message.tool_calls = toolCalls;
    }
    if (message.content === undefined) {
      message.content = "";
    }

    if (process.env.DEBUG_RESPONSES_SSE_TO_JSON === "true") {
      console.log(
        `[ResponsesSSE] ${output.length} output items, ${messageSelection.messageItems.length} message items`
      );
      messageSelection.messageItems.forEach((item, idx) => {
        const textLen = extractMessageOutputText(item).length;
        console.log(`  [${idx}] text length: ${textLen}`);
      });
      console.log(`  → Selected message index: ${messageSelection.selectedMessageIndex}`);
      console.log(`  → Final text content length: ${textContent.length}`);
    }

    const createdAt = toNumber(response.created_at, Math.floor(Date.now() / 1000));
    const model = toString(response.model || responseRoot.model, "openai-responses");
    const finishReason = toolCalls.length > 0 ? "tool_calls" : "stop";

    const result: JsonRecord = {
      id: `chatcmpl-${toString(response.id, String(Date.now()))}`,
      object: "chat.completion",
      created: createdAt,
      model,
      choices: [
        {
          index: 0,
          message,
          finish_reason: finishReason,
        },
      ],
    };

    if (Object.keys(usage).length > 0) {
      const inputTokens = toNumber(usage.input_tokens, 0);
      const outputTokens = toNumber(usage.output_tokens, 0);
      result.usage = {
        prompt_tokens: inputTokens,
        completion_tokens: outputTokens,
        total_tokens: inputTokens + outputTokens,
      };

      if (toNumber(usage.reasoning_tokens, 0) > 0) {
        (result.usage as JsonRecord).completion_tokens_details = {
          reasoning_tokens: toNumber(usage.reasoning_tokens, 0),
        };
      }
      if (
        toNumber(usage.cache_read_input_tokens, 0) > 0 ||
        toNumber(usage.cache_creation_input_tokens, 0) > 0
      ) {
        (result.usage as JsonRecord).prompt_tokens_details = {};
        const promptDetails = (result.usage as JsonRecord).prompt_tokens_details as JsonRecord;
        if (toNumber(usage.cache_read_input_tokens, 0) > 0) {
          promptDetails.cached_tokens = toNumber(usage.cache_read_input_tokens, 0);
        }
        if (toNumber(usage.cache_creation_input_tokens, 0) > 0) {
          promptDetails.cache_creation_tokens = toNumber(usage.cache_creation_input_tokens, 0);
        }
      }
    }

    intermediateOpenAI = result;
  }

  // Handle Gemini/Antigravity format
  else if (
    targetFormat === FORMATS.GEMINI ||
    targetFormat === FORMATS.ANTIGRAVITY ||
    targetFormat === FORMATS.GEMINI_CLI
  ) {
    const root = toRecord(responseBody);
    const response = toRecord(root.response ?? root);
    const candidates = Array.isArray(response.candidates) ? response.candidates : [];
    if (candidates[0]) {
      const candidate = toRecord(candidates[0]);
      const content = toRecord(candidate.content);
      const usage = toRecord(response.usageMetadata ?? root.usageMetadata);

      let textContent = "";
      const toolCalls: JsonRecord[] = [];
      let reasoningContent = "";

      if (Array.isArray(content.parts)) {
        for (const part of content.parts) {
          const partObj = toRecord(part);
          if (partObj.thought === true && typeof partObj.text === "string") {
            reasoningContent += partObj.text;
          } else if (typeof partObj.text === "string") {
            textContent += partObj.text;
          }
          if (partObj.functionCall) {
            const fn = toRecord(partObj.functionCall);
            toolCalls.push({
              id: `call_${toString(fn.name, "unknown")}_${Date.now()}_${toolCalls.length}`,
              type: "function",
              function: {
                name: toString(fn.name),
                arguments: JSON.stringify(fn.args || {}),
              },
            });
          }
        }
      }

      const message: JsonRecord = { role: "assistant" };
      if (textContent) {
        message.content = textContent;
      }
      if (reasoningContent) {
        message.reasoning_content = reasoningContent;
      }
      if (toolCalls.length > 0) {
        message.tool_calls = toolCalls;
      }
      if (!message.content && !message.tool_calls) {
        message.content = "";
      }

      let finishReason = toString(candidate.finishReason, "stop").toLowerCase();
      if (finishReason === "stop" && toolCalls.length > 0) {
        finishReason = "tool_calls";
      }

      const createdMs = Date.parse(toString(response.createTime));
      const created = Number.isFinite(createdMs)
        ? Math.floor(createdMs / 1000)
        : Math.floor(Date.now() / 1000);

      const result: JsonRecord = {
        id: `chatcmpl-${toString(response.responseId, String(Date.now()))}`,
        object: "chat.completion",
        created,
        model: toString(response.modelVersion, "gemini"),
        choices: [
          {
            index: 0,
            message,
            finish_reason: finishReason,
          },
        ],
      };

      if (Object.keys(usage).length > 0) {
        result.usage = {
          prompt_tokens:
            toNumber(usage.promptTokenCount, 0) + toNumber(usage.thoughtsTokenCount, 0),
          completion_tokens: toNumber(usage.candidatesTokenCount, 0),
          total_tokens: toNumber(usage.totalTokenCount, 0),
        };
        if (toNumber(usage.thoughtsTokenCount, 0) > 0) {
          (result.usage as JsonRecord).completion_tokens_details = {
            reasoning_tokens: toNumber(usage.thoughtsTokenCount, 0),
          };
        }
      }

      intermediateOpenAI = result;
    }
  }

  // Handle Claude format
  else if (targetFormat === FORMATS.CLAUDE) {
    const root = toRecord(responseBody);
    const contentBlocks = Array.isArray(root.content) ? root.content : [];
    if (contentBlocks.length > 0) {
      let textContent = "";
      let thinkingContent = "";
      const toolCalls: JsonRecord[] = [];

      for (const block of contentBlocks) {
        const blockObj = toRecord(block);
        if (blockObj.type === "text") {
          textContent += toString(blockObj.text);
        } else if (blockObj.type === "thinking") {
          thinkingContent += toString(blockObj.thinking);
        } else if (blockObj.type === "tool_use") {
          const rawName = toString(blockObj.name);
          const strippedName = toolNameMap?.get(rawName) ?? rawName;
          toolCalls.push({
            id: toString(blockObj.id, `call_${Date.now()}_${toolCalls.length}`),
            type: "function",
            function: {
              name: strippedName,
              arguments: JSON.stringify(blockObj.input || {}),
            },
          });
        }
      }

      const message: JsonRecord = { role: "assistant" };
      if (textContent) {
        message.content = textContent;
      }
      if (thinkingContent) {
        message.reasoning_content = thinkingContent;
      }
      if (toolCalls.length > 0) {
        message.tool_calls = toolCalls;
      }
      if (message.content === undefined) {
        message.content = "";
      }

      let finishReason = toString(root.stop_reason, "stop");
      if (finishReason === "end_turn") finishReason = "stop";
      if (finishReason === "tool_use") finishReason = "tool_calls";

      const result: JsonRecord = {
        id: `chatcmpl-${toString(root.id, String(Date.now()))}`,
        object: "chat.completion",
        created: Math.floor(Date.now() / 1000),
        model: toString(root.model, "claude"),
        choices: [
          {
            index: 0,
            message,
            finish_reason: finishReason,
          },
        ],
      };

      const usage = toRecord(root.usage);
      if (Object.keys(usage).length > 0) {
        const promptTokens = toNumber(usage.input_tokens, 0);
        const completionTokens = toNumber(usage.output_tokens, 0);
        result.usage = {
          prompt_tokens: promptTokens,
          completion_tokens: completionTokens,
          total_tokens: promptTokens + completionTokens,
        };
      }

      intermediateOpenAI = result;
    }
  }

  // Phase 3: Translate from OpenAI back to Client Source format
  if (sourceFormat === FORMATS.CLAUDE && sourceFormat !== targetFormat) {
    return convertOpenAINonStreamingToClaude(toRecord(intermediateOpenAI));
  }

  // Return intermediateOpenAI (which is either the raw response if unknown targetFormat, or an OpenAI compatible payload)
  return intermediateOpenAI;
}

/**
 * Helper to convert an OpenAI chat.completion JSON object to Claude format for non-streaming.
 */
function convertOpenAINonStreamingToClaude(openaiResponse: JsonRecord): JsonRecord {
  const isChoicesArray = Array.isArray(openaiResponse.choices);
  if (!isChoicesArray && openaiResponse.object !== "chat.completion") {
    return openaiResponse; // If it doesn't look like OpenAI, return as-is
  }

  const choice = isChoicesArray ? openaiResponse.choices[0] : null;
  const choiceObj = choice ? toRecord(choice) : {};
  const messageObj = choiceObj.message ? toRecord(choiceObj.message) : {};

  const content: JsonRecord[] = [];

  let hasTextOrReasoning = false;

  if (messageObj.reasoning_content) {
    hasTextOrReasoning = true;
    content.push({
      type: "thinking",
      thinking: toString(messageObj.reasoning_content),
    });
  }

  // Always include text if it exists (even empty string), or if there are no tool calls and no reasoning
  const hasToolCalls = Array.isArray(messageObj.tool_calls) && messageObj.tool_calls.length > 0;

  if (messageObj.content !== undefined && messageObj.content !== null) {
    hasTextOrReasoning = true;
    content.push({
      type: "text",
      text: toString(messageObj.content),
    });
  } else if (!hasTextOrReasoning) {
    // Claude format expects a text block even before tool calls (or if empty)
    content.push({
      type: "text",
      text: "",
    });
  }

  if (Array.isArray(messageObj.tool_calls)) {
    for (const tool of messageObj.tool_calls) {
      const toolObj = toRecord(tool);
      const fn = toRecord(toolObj.function);
      content.push({
        type: "tool_use",
        id: toString(toolObj.id, `call_${Date.now()}`),
        name: toString(fn.name),
        input:
          typeof fn.arguments === "string" ? JSON.parse(fn.arguments || "{}") : fn.arguments || {},
      });
    }
  }

  let stopReason = toString(choiceObj.finish_reason, "end_turn");
  if (stopReason === "stop") stopReason = "end_turn";
  if (stopReason === "tool_calls") stopReason = "tool_use";

  const usageSrc = toRecord(openaiResponse.usage);
  const claudeResponse: JsonRecord = {
    id: toString(openaiResponse.id, `msg_${Date.now()}`),
    type: "message",
    role: "assistant",
    model: toString(openaiResponse.model, "claude"),
    content,
    stop_reason: stopReason,
    stop_sequence: null,
    usage: {
      input_tokens: toNumber(usageSrc.prompt_tokens, 0),
      output_tokens: toNumber(usageSrc.completion_tokens, 0),
    },
  };

  return claudeResponse;
}
