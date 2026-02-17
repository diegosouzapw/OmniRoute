import { register } from "../index.js";
import { FORMATS } from "../formats.js";

// Create OpenAI chunk helper
function createChunk(state, delta, finishReason = null) {
  return {
    id: `chatcmpl-${state.messageId}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model: state.model,
    choices: [
      {
        index: 0,
        delta,
        finish_reason: finishReason,
      },
    ],
  };
}

// Convert Claude stream chunk to OpenAI format
export function claudeToOpenAIResponse(chunk, state) {
  if (!chunk) return null;

  const results = [];
  const event = chunk.type;

  switch (event) {
    case "message_start": {
      state.messageId = chunk.message?.id || `msg_${Date.now()}`;
      state.model = chunk.message?.model;
      state.toolCallIndex = 0;
      results.push(createChunk(state, { role: "assistant" }));
      break;
    }

    case "content_block_start": {
      const block = chunk.content_block;
      if (block?.type === "text") {
        state.textBlockStarted = true;
      } else if (block?.type === "thinking") {
        state.inThinkingBlock = true;
        state.currentBlockIndex = chunk.index;
        results.push(createChunk(state, { content: "<think>" }));
      } else if (block?.type === "tool_use") {
        const toolCallIndex = state.toolCallIndex++;
        // Restore original tool name from mapping (Claude OAuth)
        const toolName = state.toolNameMap?.get(block.name) || block.name;
        const toolCall = {
          index: toolCallIndex,
          id: block.id,
          type: "function",
          function: {
            name: toolName,
            arguments: "",
          },
        };
        state.toolCalls.set(chunk.index, toolCall);
        results.push(createChunk(state, { tool_calls: [toolCall] }));
      }
      break;
    }

    case "content_block_delta": {
      const delta = chunk.delta;
      if (delta?.type === "text_delta" && delta.text) {
        results.push(createChunk(state, { content: delta.text }));
      } else if (delta?.type === "thinking_delta" && delta.thinking) {
        results.push(createChunk(state, { content: delta.thinking }));
      } else if (delta?.type === "input_json_delta" && delta.partial_json) {
        const toolCall = state.toolCalls.get(chunk.index);
        if (toolCall) {
          toolCall.function.arguments += delta.partial_json;
          results.push(
            createChunk(state, {
              tool_calls: [
                {
                  index: toolCall.index,
                  id: toolCall.id,
                  function: { arguments: delta.partial_json },
                },
              ],
            })
          );
        }
      }
      break;
    }

    case "content_block_stop": {
      if (state.inThinkingBlock && chunk.index === state.currentBlockIndex) {
        results.push(createChunk(state, { content: "</think>" }));
        state.inThinkingBlock = false;
      }
      state.textBlockStarted = false;
      state.thinkingBlockStarted = false;
      break;
    }

    case "message_delta": {
      // Extract usage from message_delta event (Claude native format)
      // Normalize to OpenAI format (prompt_tokens/completion_tokens) for consistent logging
      if (chunk.usage && typeof chunk.usage === "object") {
        const inputTokens =
          typeof chunk.usage.input_tokens === "number" ? chunk.usage.input_tokens : 0;
        const outputTokens =
          typeof chunk.usage.output_tokens === "number" ? chunk.usage.output_tokens : 0;
        const cacheReadTokens =
          typeof chunk.usage.cache_read_input_tokens === "number"
            ? chunk.usage.cache_read_input_tokens
            : 0;
        const cacheCreationTokens =
          typeof chunk.usage.cache_creation_input_tokens === "number"
            ? chunk.usage.cache_creation_input_tokens
            : 0;

        // Use OpenAI format keys for consistent logging in stream.js
        state.usage = {
          prompt_tokens: inputTokens,
          completion_tokens: outputTokens,
          input_tokens: inputTokens,
          output_tokens: outputTokens,
        };

        // Store cache tokens if present
        if (cacheReadTokens > 0) {
          state.usage.cache_read_input_tokens = cacheReadTokens;
        }
        if (cacheCreationTokens > 0) {
          state.usage.cache_creation_input_tokens = cacheCreationTokens;
        }
      }

      if (chunk.delta?.stop_reason) {
        state.finishReason = convertStopReason(chunk.delta.stop_reason);
        const finalChunk: Record<string, any> = {
          id: `chatcmpl-${state.messageId}`,
          object: "chat.completion.chunk",
          created: Math.floor(Date.now() / 1000),
          model: state.model,
          choices: [
            {
              index: 0,
              delta: {},
              finish_reason: state.finishReason,
            },
          ],
        };

        // Include usage in final chunk if available
        if (state.usage && typeof state.usage === "object") {
          const inputTokens = state.usage.input_tokens || 0;
          const outputTokens = state.usage.output_tokens || 0;
          const cachedTokens = state.usage.cache_read_input_tokens || 0;
          const cacheCreationTokens = state.usage.cache_creation_input_tokens || 0;

          // prompt_tokens = input_tokens + cache_read + cache_creation (all prompt-side tokens)
          // completion_tokens = output_tokens
          // total_tokens = prompt_tokens + completion_tokens
          const promptTokens = inputTokens + cachedTokens + cacheCreationTokens;
          const completionTokens = outputTokens;
          const totalTokens = promptTokens + completionTokens;

          finalChunk.usage = {
            prompt_tokens: promptTokens,
            completion_tokens: completionTokens,
            total_tokens: totalTokens,
          };

          // Add prompt_tokens_details if cached tokens exist
          if (cachedTokens > 0 || cacheCreationTokens > 0) {
            finalChunk.usage.prompt_tokens_details = {};
            if (cachedTokens > 0) {
              finalChunk.usage.prompt_tokens_details.cached_tokens = cachedTokens;
            }
            if (cacheCreationTokens > 0) {
              finalChunk.usage.prompt_tokens_details.cache_creation_tokens = cacheCreationTokens;
            }
          }
        }

        results.push(finalChunk);
        state.finishReasonSent = true;
      }
      break;
    }

    case "message_stop": {
      if (!state.finishReasonSent) {
        const finishReason =
          state.finishReason || (state.toolCalls?.size > 0 ? "tool_calls" : "stop");
        const usageObj =
          state.usage && typeof state.usage === "object"
            ? {
                usage: {
                  prompt_tokens: state.usage.input_tokens || 0,
                  completion_tokens: state.usage.output_tokens || 0,
                  total_tokens: (state.usage.input_tokens || 0) + (state.usage.output_tokens || 0),
                },
              }
            : {};
        results.push({
          id: `chatcmpl-${state.messageId}`,
          object: "chat.completion.chunk",
          created: Math.floor(Date.now() / 1000),
          model: state.model,
          choices: [
            {
              index: 0,
              delta: {},
              finish_reason: finishReason,
            },
          ],
          ...usageObj,
        });
        state.finishReasonSent = true;
      }
      break;
    }
  }

  return results.length > 0 ? results : null;
}

// Convert Claude stop_reason to OpenAI finish_reason
function convertStopReason(reason) {
  switch (reason) {
    case "end_turn":
      return "stop";
    case "max_tokens":
      return "length";
    case "tool_use":
      return "tool_calls";
    case "stop_sequence":
      return "stop";
    default:
      return "stop";
  }
}

// Register
register(FORMATS.CLAUDE, FORMATS.OPENAI, null, claudeToOpenAIResponse);
