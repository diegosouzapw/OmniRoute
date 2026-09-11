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
import { REVERSE_MAP, restoreClaudeToolName } from "../../services/claudeCodeToolRemapper.ts";
import { sanitizeToolId } from "../helpers/schemaCoercion.ts";
import { splitMarkdownBoundary } from "../helpers/markdownBoundary.ts";

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
  const combined = (state._xmlInvokeBuffer || "") + text;
  state._xmlInvokeBuffer = "";
  let remaining = combined;
  let cleaned = "";

  while (remaining.length > 0) {
    // Find all possible tool call patterns and pick the earliest
    const invokeMatch = remaining.match(/<invoke\s+name="([^"]*)"\s*>/);
    const toolCallTagMatch = remaining.match(/<tool_call>/);
    const toolCallTextMatch = remaining.match(/TOOL_CALL\s+([A-Za-z0-9_]+):\s*/);

    const matches = [
      invokeMatch
        ? { type: "invoke" as const, index: invokeMatch.index!, data: invokeMatch }
        : null,
      toolCallTagMatch
        ? { type: "tool_call_tag" as const, index: toolCallTagMatch.index!, data: toolCallTagMatch }
        : null,
      toolCallTextMatch
        ? {
            type: "tool_call_text" as const,
            index: toolCallTextMatch.index!,
            data: toolCallTextMatch,
          }
        : null,
    ]
      .filter(Boolean)
      .sort((a, b) => a!.index - b!.index);

    if (matches.length === 0) {
      cleaned += remaining;
      break;
    }

    const first = matches[0]!;
    cleaned += remaining.slice(0, first.index);
    const rest = remaining.slice(first.index);

    if (first.type === "invoke") {
      const startMatch = first.data;
      const endMatch = rest.match(/<\/invoke>/);
      if (!endMatch) {
        state._xmlInvokeBuffer = rest;
        break;
      }
      const innerXml = rest.slice(startMatch[0].length, endMatch.index!);
      const fullLength = endMatch.index! + endMatch[0].length;
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
      remaining = rest.slice(fullLength);
    } else if (first.type === "tool_call_tag") {
      const endMatch = rest.match(/<\/tool_call>/);
      if (!endMatch) {
        state._xmlInvokeBuffer = rest;
        break;
      }
      const innerJson = rest.slice("<tool_call>".length, endMatch.index!).trim();
      const fullLength = endMatch.index! + "</tool_call>".length;
      try {
        const parsed = JSON.parse(innerJson) as Record<string, unknown>;
        const name = (parsed.name || parsed.tool_name || "") as string;
        const rawArgs = parsed.arguments || parsed.args || parsed.parameters || {};
        const args: Record<string, string> =
          typeof rawArgs === "string" ? JSON.parse(rawArgs) : (rawArgs as Record<string, string>);
        if (name) {
          toolCalls.push({ id: `toolu_txt_${Date.now()}_${toolCalls.length}`, name, args });
        }
      } catch {
        cleaned += rest.slice(0, fullLength);
      }
      remaining = rest.slice(fullLength);
    } else {
      const startMatch = first.data;
      const toolName = startMatch[1];
      const afterPrefix = rest.slice(startMatch[0].length);
      let depth = 0;
      let inString = false;
      let escape = false;
      let jsonEndIndex = -1;
      for (let i = 0; i < afterPrefix.length; i++) {
        const c = afterPrefix[i];
        if (escape) {
          escape = false;
          continue;
        }
        if (c === "\\" && inString) {
          escape = true;
          continue;
        }
        if (c === '"') {
          inString = !inString;
          continue;
        }
        if (!inString) {
          if (c === "{") depth++;
          else if (c === "}") {
            depth--;
            if (depth === 0) {
              jsonEndIndex = i + 1;
              break;
            }
          }
        }
      }
      if (jsonEndIndex === -1) {
        state._xmlInvokeBuffer = rest;
        break;
      }
      const jsonStr = afterPrefix.slice(0, jsonEndIndex);
      const fullLength = startMatch[0].length + jsonEndIndex;
      try {
        const args = JSON.parse(jsonStr) as Record<string, string>;
        toolCalls.push({ id: `toolu_txt_${Date.now()}_${toolCalls.length}`, name: toolName, args });
      } catch {
        cleaned += rest.slice(0, fullLength);
      }
      remaining = rest.slice(fullLength);
    }
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

// Helper: flush any buffered Markdown boundary text before closing a text block
function flushMarkdownBuffer(state, results) {
  const buffered = state._markdownBuffer;
  state._markdownCodeSpanRun = 0;
  state._markdownTrailingBackslash = false;
  state._markdownFenceRun = 0;
  state._markdownFenceOpening = false;
  state._markdownFenceClosingRun = 0;
  state._markdownLineIndent = 0;
  if (!buffered) return;
  state._markdownBuffer = "";
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
  if (!state.textBlockClosed) {
    results.push({
      type: "content_block_delta",
      index: state.textBlockIndex,
      delta: { type: "text_delta", text: buffered },
    });
  }
}

// Helper: stop text block if started
function stopTextBlock(state, results) {
  flushMarkdownBuffer(state, results);
  if (!state.textBlockStarted || state.textBlockClosed) return;
  state.textBlockClosed = true;
  results.push({
    type: "content_block_stop",
    index: state.textBlockIndex,
  });
  state.textBlockStarted = false;
}

// Harvest the upstream usage block from any chunk, including trailing
// usage-only chunks that carry `choices: []` (#11817).
function trackUsageFromChunk(chunk, state) {
  if (!chunk.usage || typeof chunk.usage !== "object") return;
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

// Convert OpenAI stream chunk to Claude format
export function openaiToClaudeResponse(chunk, state) {
  if (!chunk && !state.pendingClaudeFinishChoice) return null;

  const results = [];
  const chunkUsage = chunk?.usage;
  const hasChunkUsage = chunkUsage && typeof chunkUsage === "object";

  // Usage must be harvested BEFORE the choices guard: many OpenAI-compatible
  // upstreams (Fireworks, vLLM, Together, …) deliver the authoritative usage
  // block — including prompt_tokens_details.cached_tokens — on a trailing
  // usage-only chunk shaped `{"choices":[],"usage":{...}}`. Returning early on
  // that chunk discarded the real numbers and left downstream accounting on
  // OmniRoute's own tokenizer estimate (#11817).
  //
  // Harvesting alone is not enough: if the finish_reason chunk arrives BEFORE
  // this trailing usage chunk (the normal order for these upstreams), the
  // finish block below fires immediately and emits message_delta with
  // whatever state.usage held at that moment — zero/stale, since the real
  // trailing chunk hasn't been seen yet. The finish deferral below
  // (pendingClaudeFinishChoice) holds the terminal emission open until either
  // real usage has arrived or a genuine flush forces it, so the message_delta
  // actually sent to the client carries the correct numbers (#11817 follow-up).
  if (chunk) trackUsageFromChunk(chunk, state);

  const chunkChoice = chunk?.choices?.[0];
  const flushingPendingFinish = !chunkChoice && Boolean(state.pendingClaudeFinishChoice);
  const choice = chunkChoice || state.pendingClaudeFinishChoice;
  if (!choice) return null;
  if (flushingPendingFinish) state.pendingClaudeFinishChoice = null;
  const delta = choice.delta;
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
    state._markdownBuffer = "";
    state._markdownCodeSpanRun = 0;
    state._markdownTrailingBackslash = false;
    state._markdownFenceRun = 0;
    state._markdownFenceOpening = false;
    state._markdownFenceClosingRun = 0;
    state._markdownLineIndent = 0;
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
  if (
    typeof reasoningContent === "string" &&
    reasoningContent !== "" &&
    !isInternalReasoningPlaceholder(reasoningContent)
  ) {
    // Non-Anthropic reasoning has no Anthropic signature, so it cannot be
    // replayed as a Claude `thinking` block. Do not launder it into text either:
    // it may contain private chain-of-thought and would pollute future history.
    void reasoningContent;
  }

  // Handle regular content — strip the internal reasoning placeholder if
  // the model echoed it through ordinary content (#8081). Only the content
  // block emission is skipped when nothing meaningful remains; the chunk
  // may still carry tool_calls / finish_reason below, which must still run.
  if (delta?.content) {
    const strippedContent = stripInternalReasoningPlaceholder(delta.content);
    if (strippedContent) {
      stopThinkingBlock(state, results);

      // Rehydrate any Markdown boundary suffix buffered from the previous chunk
      // before searching for XML tool calls, so the prefix is not lost.
      const bufferedPrefix = state._markdownBuffer || "";
      state._markdownBuffer = "";

      // Check for XML <invoke> blocks that some models emit instead of JSON tool_calls
      const { cleaned, toolCalls: xmlToolCalls } = extractXmlInvokeBlocks(
        bufferedPrefix + strippedContent,
        state
      );

      // Accumulate extracted tool calls for emission at finish
      if (xmlToolCalls.length > 0) {
        // Close any ongoing text block before tool calls
        stopTextBlock(state, results);
        state._pendingXmlToolCalls.push(...xmlToolCalls);
      }

      // Defer any trailing incomplete Markdown boundary token to the next chunk.
      const {
        emit: textToEmit,
        hold: textToHold,
        backtickRun,
        trailingBackslash,
        fenceRun,
        fenceOpening,
        fenceClosingRun,
        lineIndent,
      } = splitMarkdownBoundary(
        cleaned,
        state._markdownCodeSpanRun || 0,
        state._markdownTrailingBackslash === true,
        state._markdownFenceRun || 0,
        state._markdownFenceOpening === true,
        state._markdownFenceClosingRun || 0,
        state._markdownLineIndent || 0
      );
      state._markdownBuffer = textToHold;
      state._markdownCodeSpanRun = backtickRun || 0;
      state._markdownTrailingBackslash = trailingBackslash === true;
      state._markdownFenceRun = fenceRun || 0;
      state._markdownFenceOpening = fenceOpening === true;
      state._markdownFenceClosingRun = fenceClosingRun || 0;
      state._markdownLineIndent = lineIndent || 0;

      // Emit remaining non-XML text content
      if (textToEmit) {
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
          delta: { type: "text_delta", text: textToEmit },
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
        return restoreClaudeToolName(n, state.toolNameMap);
      })();

      // A tool call is identified by its id. Some OpenAI-compatible upstreams
      // (GLM 5.2) stream the id and function.name in SEPARATE SSE chunks. The
      // Claude protocol cannot patch a content_block_start after it is emitted,
      // so we register the tool call on the id chunk but DEFER content_block_start
      // until the name arrives (#2077 / decolua/9router#2077).
      if (tc.id && !state.toolCalls.has(idx)) {
        stopThinkingBlock(state, results);
        stopTextBlock(state, results);

        const sanitizedId = sanitizeToolId(tc.id);
        state.toolCalls.set(idx, {
          id: sanitizedId,
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
        if (tc.id && !toolInfo.id) toolInfo.id = sanitizeToolId(tc.id);
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
    if (!hasChunkUsage && !flushingPendingFinish) {
      state.pendingClaudeFinishChoice = choice;
      return results.length > 0 ? results : null;
    }

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
          name: restoreClaudeToolName(
            tc.name,
            state.toolNameMap instanceof Map ? state.toolNameMap : null
          ),
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
