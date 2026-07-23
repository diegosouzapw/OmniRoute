import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { CLAUDE_OAUTH_TOOL_PREFIX } from "../request/openai-to-claude.ts";
import { hasToolCallShim, applyToolCallShimToBuffer } from "../helpers/toolCallShim.ts";
import { appendToolCallArgumentDelta } from "../../utils/toolCallArguments.ts";
import { isAbortFinishReason } from "../../utils/finishReason.ts";
import {
  isInternalReasoningPlaceholder,
  stripInternalReasoningPlaceholder,
} from "../../utils/reasoningPlaceholder.ts";
import { REVERSE_MAP } from "../../services/claudeCodeToolRemapper.ts";

function normalizeToolName(name: string): string {
  return REVERSE_MAP[name] ?? name;
}

interface XmlToolCall {
  id: string;
  name: string;
  args: Record<string, string>;
}

/**
 * Extract complete XML <invoke> blocks from text content.
 * Some models (e.g. nvidia/abacusai/dracarys) emit tool calls as
 * XML blocks instead of JSON tool_calls. This function detects
 * <invoke name="ToolName"><parameter name="arg">value</parameter></invoke>
 * blocks, converts them to tool calls, and returns the cleaned text.
 * Incomplete XML is buffered in state for the next chunk.
 */
function extractXmlInvokeBlocks(
  text: string,
  state
): { cleaned: string; toolCalls: XmlToolCall[] } {
  const toolCalls: XmlToolCall[] = [];

  // Prepend any incomplete content from previous chunk
  const combined = (state._xmlInvokeBuffer || "") + text;
  state._xmlInvokeBuffer = "";

  let remaining = combined;
  let cleaned = "";

  while (true) {
    const startMatch = remaining.match(/<invoke\s+name="([^"]*)"\s*>/);
    if (!startMatch) {
      cleaned += remaining;
      break;
    }

    // Text before the <invoke> block
    cleaned += remaining.slice(0, startMatch.index);

    const blockStart = startMatch.index;
    const restAfterStart = remaining.slice(blockStart);
    const endMatch = restAfterStart.match(/<\/invoke>/);

    if (!endMatch) {
      // Incomplete block — buffer for next chunk
      state._xmlInvokeBuffer = restAfterStart;
      break;
    }

    // Complete block found
    const innerXml = restAfterStart.slice(startMatch[0].length, endMatch.index);
    const fullBlock = restAfterStart.slice(0, endMatch.index + endMatch[0].length);

    // Parse <parameter name="..." ...>value</parameter>
    const args: Record<string, string> = {};
    const paramRegex = /<parameter\s+name="([^"]*)"[^>]*>([\s\S]*?)<\/parameter>/g;
    let pm;
    while ((pm = paramRegex.exec(innerXml)) !== null) {
      args[pm[1]] = pm[2].trim();
    }

    toolCalls.push({
      id: `toolu_xml_${Date.now()}_${toolCalls.length}`,
      name: startMatch[1],
      args,
    });

    // Continue scanning after the block
    remaining = remaining.slice(blockStart + fullBlock.length);
  }

  return { cleaned, toolCalls };
}

// Helper: stop thinking block if started
function stopThinkingBlock(state, results) {
  if (!state.thinkingBlockStarted) return;
  results.push({
    type: "content_block_stop",
    index: state.thinkingBlockIndex,
  });
  state.thinkingBlockStarted = false;
}

// Helper: stop text block if started
function stopTextBlock(state, results) {
  if (!state.textBlockStarted || state.textBlockClosed) return;
  state.textBlockClosed = true;
  results.push({
    type: "content_block_stop",
    index: state.textBlockIndex,
  });
  state.textBlockStarted = false;
}

// Convert OpenAI stream chunk to Claude format
export function openaiToClaudeResponse(chunk, state) {
  if (!chunk || !chunk.choices?.[0]) return null;

  const results = [];
  const choice = chunk.choices[0];
  const delta = choice.delta;

  // Track usage from OpenAI chunk if available
  if (chunk.usage && typeof chunk.usage === "object") {
    const promptTokens =
      typeof chunk.usage.prompt_tokens === "number" ? chunk.usage.prompt_tokens : 0;
    const outputTokens =
      typeof chunk.usage.completion_tokens === "number" ? chunk.usage.completion_tokens : 0;

    // Extract cache tokens from prompt_tokens_details
    const cachedTokens = chunk.usage.prompt_tokens_details?.cached_tokens;
    const cacheCreationTokens = chunk.usage.prompt_tokens_details?.cache_creation_tokens;
    const cacheReadTokens = typeof cachedTokens === "number" ? cachedTokens : 0;
    const cacheCreateTokens = typeof cacheCreationTokens === "number" ? cacheCreationTokens : 0;

    // input_tokens = prompt_tokens - cached_tokens - cache_creation_tokens
    // Because OpenAI's prompt_tokens includes all prompt-side tokens
    const inputTokens = promptTokens - cacheReadTokens - cacheCreateTokens;

    state.usage = {
      input_tokens: inputTokens,
      output_tokens: outputTokens,
    };

    // Add cache_read_input_tokens if present
    if (cacheReadTokens > 0) {
      state.usage.cache_read_input_tokens = cacheReadTokens;
    }

    // Add cache_creation_input_tokens if present
    if (cacheCreateTokens > 0) {
      state.usage.cache_creation_input_tokens = cacheCreateTokens;
    }

    // Note: completion_tokens_details.reasoning_tokens is already included in output_tokens
    // No need to add separately as Claude expects total output_tokens
  }

  // First chunk - ALWAYS send message_start first
  if (!state.messageStartSent) {
    state.messageStartSent = true;
    state.messageId = chunk.id?.replace("chatcmpl-", "") || `msg_${Date.now()}`;
    if (!state.messageId || state.messageId === "chat" || state.messageId.length < 8) {
      state.messageId =
        chunk.extend_fields?.requestId || chunk.extend_fields?.traceId || `msg_${Date.now()}`;
    }
    state.model = chunk.model || "unknown";
    state.nextBlockIndex = 0;
    state._pendingXmlToolCalls = [];
    state._xmlInvokeBuffer = "";
    results.push({
      type: "message_start",
      message: {
        id: state.messageId,
        type: "message",
        role: "assistant",
        model: state.model,
        content: [],
        stop_reason: null,
        stop_sequence: null,
        usage: { input_tokens: 0, output_tokens: 0 },
      },
    });
  }

  // Handle reasoning_content (thinking) - GLM, DeepSeek, etc.
  // Also supports 'reasoning' field alias and reasoning_details[] (StepFun/OpenRouter)
  let reasoningContent = delta?.reasoning_content || delta?.reasoning;
  if (!reasoningContent && Array.isArray(delta?.reasoning_details)) {
    const parts: string[] = [];
    for (const detail of delta.reasoning_details) {
      if (detail && typeof detail === "object") {
        const text = detail.text || detail.content;
        if (typeof text === "string" && text) parts.push(text);
      }
    }
    if (parts.length > 0) reasoningContent = parts.join("");
  }
  if (reasoningContent && !isInternalReasoningPlaceholder(reasoningContent)) {
    stopTextBlock(state, results);

    if (!state.thinkingBlockStarted) {
      state.thinkingBlockIndex = state.nextBlockIndex++;
      state.thinkingBlockStarted = true;
      results.push({
        type: "content_block_start",
        index: state.thinkingBlockIndex,
        content_block: { type: "thinking", thinking: "" },
      });
    }

    results.push({
      type: "content_block_delta",
      index: state.thinkingBlockIndex,
      delta: { type: "thinking_delta", thinking: reasoningContent },
    });
  }

  // Handle regular content — strip the internal reasoning placeholder if
  // the model echoed it through ordinary content (#8081). Only the content
  // block emission is skipped when nothing meaningful remains; the chunk
  // may still carry tool_calls / finish_reason below, which must still run.
  if (delta?.content) {
    const strippedContent = stripInternalReasoningPlaceholder(delta.content);
    if (strippedContent) {
      stopThinkingBlock(state, results);

      // Check for XML <invoke> blocks that some models emit instead of JSON tool_calls
      const { cleaned, toolCalls: xmlToolCalls } = extractXmlInvokeBlocks(strippedContent, state);

      // Accumulate extracted tool calls for emission at finish
      if (xmlToolCalls.length > 0) {
        // Close any ongoing text block before tool calls
        stopTextBlock(state, results);
        state._pendingXmlToolCalls.push(...xmlToolCalls);
      }

      // Emit remaining non-XML text content
      if (!cleaned) {
        // All content was XML invoke blocks — skip text block entirely
        // (tool calls will be emitted at finish)
      } else if (xmlToolCalls.length > 0) {
        // Text before/between/after XML blocks — (re)start a text block
        if (!state.textBlockStarted) {
          state.textBlockIndex = state.nextBlockIndex++;
          state.textBlockStarted = true;
          state.textBlockClosed = false;
          results.push({
            type: "content_block_start",
            index: state.textBlockIndex,
            content_block: { type: "text", text: "" },
          });
        }
        results.push({
          type: "content_block_delta",
          index: state.textBlockIndex,
          delta: { type: "text_delta", text: cleaned },
        });
      } else {
        // No XML — emit as regular text (original behaviour)
        if (!state.textBlockStarted) {
          state.textBlockIndex = state.nextBlockIndex++;
          state.textBlockStarted = true;
          state.textBlockClosed = false;
          results.push({
            type: "content_block_start",
            index: state.textBlockIndex,
            content_block: { type: "text", text: "" },
          });
        }
        results.push({
          type: "content_block_delta",
          index: state.textBlockIndex,
          delta: { type: "text_delta", text: cleaned },
        });
      }
    }
  }

  // Tool calls
  if (delta?.tool_calls) {
    for (const tc of delta.tool_calls) {
      const idx = tc.index ?? 0;

      // Strip the Claude OAuth prefix from an incoming tool name (if any).
      const incomingName = (() => {
        let n = tc.function?.name || "";
        if (n.startsWith(CLAUDE_OAUTH_TOOL_PREFIX)) n = n.slice(CLAUDE_OAUTH_TOOL_PREFIX.length);
        return n;
      })();

      // A tool call is identified by its id. Some OpenAI-compatible upstreams
      // (GLM 5.2) stream the id and function.name in SEPARATE SSE chunks. The
      // Claude protocol cannot patch a content_block_start after it is emitted,
      // so we register the tool call on the id chunk but DEFER content_block_start
      // until the name arrives (#2077 / decolua/9router#2077).
      if (tc.id && !state.toolCalls.has(idx)) {
        stopThinkingBlock(state, results);
        stopTextBlock(state, results);

        state.toolCalls.set(idx, {
          id: tc.id,
          name: incomingName,
          blockIndex: state.nextBlockIndex++,
          // Shimmed tools buffer their raw args and emit a single corrected
          // input_json_delta at content_block_stop time (see finish handler).
          shimmed: incomingName ? hasToolCallShim(incomingName) : false,
          argBuffer: "",
          startEmitted: false,
        });
      }

      const toolInfo = state.toolCalls.get(idx);
      if (toolInfo) {
        // Capture a late-arriving id or name (streamed after the initial chunk).
        if (tc.id && !toolInfo.id) toolInfo.id = tc.id;
        if (incomingName && !toolInfo.startEmitted && !toolInfo.name) {
          toolInfo.name = incomingName;
          toolInfo.shimmed = hasToolCallShim(incomingName);
        }

        // Emit content_block_start once we have a name. If arguments arrive before
        // any name was ever seen, start the block anyway with the (empty) name so
        // the input_json_delta stays well-formed.
        if (!toolInfo.startEmitted && (toolInfo.name || tc.function?.arguments != null)) {
          toolInfo.startEmitted = true;
          results.push({
            type: "content_block_start",
            index: toolInfo.blockIndex,
            content_block: {
              type: "tool_use",
              id: toolInfo.id,
              name: toolInfo.name || "",
              input: {},
            },
          });
        }
      }

      if (tc.function?.arguments) {
        if (toolInfo) {
          // Always buffer the raw stream so shimmed tools can re-emit a
          // corrected JSON at stop time.
          const existingArgs = toolInfo.argBuffer || "";
          const nextArgs = appendToolCallArgumentDelta(existingArgs, tc.function.arguments);
          let deltaStr = nextArgs.slice(existingArgs.length);
          toolInfo.argBuffer = nextArgs;

          if (toolInfo.shimmed || !deltaStr) {
            // Suppress passthrough for shimmed tools; emit one corrective delta at finish.
            continue;
          }

          // NOTE: The regex-based "Fix #1852" strip that previously ran here was
          // removed in #4951. That strip matched patterns like `"key":""` and
          // `"key":[]` to remove spurious placeholder fields that some models emit
          // as noise. However, since #3762 the snapshot-dedup logic in
          // appendToolCallArgumentDelta already collapses repeated/growing snapshots
          // into a single delta, so noise-only chunks are naturally suppressed.
          // More critically, the regex unconditionally deleted any field whose value
          // happened to be "" or [], silently corrupting intentional empty-string or
          // empty-array arguments (e.g. {"file_path":"","content":"text"} →
          // {"content":"text"}). Emit deltaStr as-is; the Claude client parses the
          // assembled partial_json fragments and tolerates unknown extra fields.

          results.push({
            type: "content_block_delta",
            index: toolInfo.blockIndex,
            delta: { type: "input_json_delta", partial_json: deltaStr },
          });
        }
      }
    }
  }

  // Finish — guard against duplicate finish_reason chunks (common with OpenAI-compatible models).
  // Use a dedicated `claudeFinishEmitted` flag rather than `state.finishReason`: in the
  // Responses→Claude hub path the shared `state` object is also written by the
  // openai-responses→openai translator, which sets `state.finishReason` on
  // `response.completed` BEFORE this openai→claude step runs. Reusing `finishReason` as the
  // guard therefore misfired and silently dropped the terminal message_delta/message_stop
  // for Responses→Claude streams (#5828 regression).
  if (choice.finish_reason && !state.claudeFinishEmitted) {
    state.claudeFinishEmitted = true;
    stopThinkingBlock(state, results);
    stopTextBlock(state, results);

    for (const [, toolInfo] of state.toolCalls) {
      // A tool call whose name/args never arrived (only an id chunk was seen)
      // still has a reserved block index but no content_block_start. Emit it now
      // so the terminal content_block_stop is not orphaned (#2077 edge case).
      if (!toolInfo.startEmitted) {
        toolInfo.startEmitted = true;
        results.push({
          type: "content_block_start",
          index: toolInfo.blockIndex,
          content_block: {
            type: "tool_use",
            id: toolInfo.id,
            name: toolInfo.name || "",
            input: {},
          },
        });
      }

      // For shimmed tools, emit one corrective input_json_delta with the
      // fully patched JSON before closing the block.
      if (toolInfo.shimmed) {
        const patched = applyToolCallShimToBuffer(toolInfo.name, toolInfo.argBuffer || "");
        results.push({
          type: "content_block_delta",
          index: toolInfo.blockIndex,
          delta: { type: "input_json_delta", partial_json: patched },
        });
      }

      results.push({
        type: "content_block_stop",
        index: toolInfo.blockIndex,
      });
    }

    // Emit any XML-extracted tool calls (from models like Dracarys that
    // emit <invoke> blocks in content instead of JSON tool_calls in delta)
    const xmlToolCalls = state._pendingXmlToolCalls || [];
    for (const tc of xmlToolCalls) {
      const blockIndex = state.nextBlockIndex++;
      results.push({
        type: "content_block_start",
        index: blockIndex,
        content_block: {
          type: "tool_use",
          id: tc.id,
          name: normalizeToolName(tc.name),
          input: tc.args,
        },
      });
      results.push({
        type: "content_block_stop",
        index: blockIndex,
      });
    }

    // Override finish_reason to tool_use if XML tool calls were found
    const overrideFinishReason = xmlToolCalls.length > 0 ? "tool_calls" : choice.finish_reason;

    // Mark finish for later usage injection in stream.js
    state.finishReason = overrideFinishReason;

    // Use tracked usage (will be estimated in stream.js if not valid)
    const finalUsage = state.usage || { input_tokens: 0, output_tokens: 0 };
    results.push({
      type: "message_delta",
      delta: { stop_reason: convertFinishReason(overrideFinishReason) },
      usage: finalUsage,
    });
    results.push({ type: "message_stop" });
  }

  return results.length > 0 ? results : null;
}

// Convert OpenAI finish_reason to Claude stop_reason
function convertFinishReason(reason) {
  switch (reason) {
    case "stop":
      return "end_turn";
    case "length":
      return "max_tokens";
    case "tool_calls":
      return "tool_use";
    default:
      // Gemini/Antigravity abort reasons (e.g. MALFORMED_FUNCTION_CALL,
      // UNEXPECTED_TOOL_CALL — see isAbortFinishReason) reach here unrecognized
      // after the OpenAI hub normalization. Collapsing them to a clean
      // "end_turn" presents an aborted tool call to the client as a successful
      // completion (9router#2462 sub-bug #2). Surface them as "tool_use" —
      // the same non-clean-stop signal already used for real tool_calls above —
      // so the client does not treat the turn as done. Genuinely unknown future
      // reasons still fall back to "end_turn" so a benign new value does not
      // start misreporting every Gemini-family turn as an unfinished tool call.
      return isAbortFinishReason(reason) ? "tool_use" : "end_turn";
  }
}

// Register
register(FORMATS.OPENAI, FORMATS.CLAUDE, null, openaiToClaudeResponse);
