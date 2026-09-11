import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { isAbortFinishReason } from "../../utils/finishReason.ts";
import { restoreClaudeToolName } from "../../services/claudeCodeToolRemapper.ts";
import {
  buildGeminiThoughtSignatureKey,
  storeGeminiThoughtSignature,
} from "../../services/geminiThoughtSignatureStore.ts";
import { splitMarkdownBoundary } from "../helpers/markdownBoundary.ts";

function normalizeToolName(name: string, toolNameMap?: Map<string, string> | null): string {
  return restoreClaudeToolName(name, toolNameMap);
}

function extractXmlInvokeBlocks(
  text: string,
  state: { _xmlInvokeBuffer?: string }
): { cleaned: string; toolCalls: Array<{ id: string; name: string; args: Record<string, unknown> }> } {
  const toolCalls: Array<{ id: string; name: string; args: Record<string, unknown> }> = [];
  const combined = (state._xmlInvokeBuffer || "") + text;
  state._xmlInvokeBuffer = "";
  let remaining = combined;
  let cleaned = "";

  while (remaining.length > 0) {
    const invokeMatch = remaining.match(/<invoke\s+name="([^"]*)"\s*>/);
    const toolCallTagMatch = remaining.match(/<tool_call>/);
    const toolCallTextMatch = remaining.match(/TOOL_CALL\s+([A-Za-z0-9_]+):\s*/);

    const matches = [
      invokeMatch ? { type: "invoke" as const, index: invokeMatch.index!, data: invokeMatch } : null,
      toolCallTagMatch ? { type: "tool_call_tag" as const, index: toolCallTagMatch.index!, data: toolCallTagMatch } : null,
      toolCallTextMatch ? { type: "tool_call_text" as const, index: toolCallTextMatch.index!, data: toolCallTextMatch } : null,
    ].filter(Boolean).sort((a, b) => a!.index - b!.index);

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
      if (!endMatch) { state._xmlInvokeBuffer = rest; break; }
      const innerXml = rest.slice(startMatch[0].length, endMatch.index!);
      const fullLength = endMatch.index! + endMatch[0].length;
      const args: Record<string, string> = {};
      const paramRegex = /<parameter\s+name="([^"]*)"[^>]*>([\s\S]*?)<\/parameter>/g;
      let pm;
      while ((pm = paramRegex.exec(innerXml)) !== null) { args[pm[1]] = pm[2].trim(); }
      toolCalls.push({ id: `toolu_xml_${Date.now()}_${toolCalls.length}`, name: startMatch[1], args });
      remaining = rest.slice(fullLength);
    } else if (first.type === "tool_call_tag") {
      const endMatch = rest.match(/<\/tool_call>/);
      if (!endMatch) { state._xmlInvokeBuffer = rest; break; }
      const innerJson = rest.slice("<tool_call>".length, endMatch.index!).trim();
      const fullLength = endMatch.index! + "</tool_call>".length;
      try {
        const parsed = JSON.parse(innerJson) as Record<string, unknown>;
        const name = (parsed.name || parsed.tool_name || "") as string;
        const rawArgs = parsed.arguments || parsed.args || parsed.parameters || {};
        const args: Record<string, unknown> = typeof rawArgs === "string" ? JSON.parse(rawArgs) : (rawArgs as Record<string, unknown>);
        if (name) { toolCalls.push({ id: `toolu_txt_${Date.now()}_${toolCalls.length}`, name, args }); }
      } catch { cleaned += rest.slice(0, fullLength); }
      remaining = rest.slice(fullLength);
    } else {
      const startMatch = first.data;
      const toolName = startMatch[1];
      const afterPrefix = rest.slice(startMatch[0].length);
      let depth = 0, inString = false, escape = false, jsonEndIndex = -1;
      for (let i = 0; i < afterPrefix.length; i++) {
        const c = afterPrefix[i];
        if (escape) { escape = false; continue; }
        if (c === "\\" && inString) { escape = true; continue; }
        if (c === '"') { inString = !inString; continue; }
        if (!inString) {
          if (c === "{") depth++;
          else if (c === "}") { depth--; if (depth === 0) { jsonEndIndex = i + 1; break; } }
        }
      }
      if (jsonEndIndex === -1) { state._xmlInvokeBuffer = rest; break; }
      const jsonStr = afterPrefix.slice(0, jsonEndIndex);
      const fullLength = startMatch[0].length + jsonEndIndex;
      try {
        const args = JSON.parse(jsonStr) as Record<string, unknown>;
        toolCalls.push({ id: `toolu_txt_${Date.now()}_${toolCalls.length}`, name: toolName, args });
      } catch { cleaned += rest.slice(0, fullLength); }
      remaining = rest.slice(fullLength);
    }
  }

  return { cleaned, toolCalls };
}

// Helper: flush any buffered Markdown boundary text before closing the open text block
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
  if (state.openTextBlockIdx === null) {
    const idx = state.contentBlockIndex++;
    state.openTextBlockIdx = idx;
    results.push({
      type: "content_block_start",
      index: idx,
      content_block: { type: "text", text: "" },
    });
  }
  results.push({
    type: "content_block_delta",
    index: state.openTextBlockIdx,
    delta: { type: "text_delta", text: buffered },
  });
}

/**
 * Direct Gemini → Claude response translator.
 * Converts Gemini streaming chunks directly to Claude Messages API
 * streaming events, skipping the OpenAI hub intermediate step.
 *
 * Fix (issue #253): Keep the text content_block open across streaming chunks
 * instead of opening+closing it on every chunk. This prevents Claude Code
 * from rendering each delta on a separate line.
 */
export function geminiToClaudeResponse(chunk, state) {
  if (!chunk) return null;

  // Handle Antigravity wrapper
  const response = chunk.response || chunk;
  if (!response || !response.candidates?.[0]) return null;

  const results = [];
  const candidate = response.candidates[0];
  const content = candidate.content;

  // ── Initialize: emit message_start ─────────────────────────────
  if (!state.messageId) {
    state.messageId = response.responseId || `msg_${Date.now()}`;
    state.model = response.modelVersion || "gemini";
    state.contentBlockIndex = 0;
    // Track open text block so we can keep it open across chunks
    state.openTextBlockIdx = null;
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

  // ── Process parts ──────────────────────────────────────────────
  if (content?.parts) {
    for (const part of content.parts) {
      const hasThoughtSig = part.thoughtSignature || part.thought_signature;
      const isThought = part.thought === true;

      // Capture thoughtSignature so the next functionCall (or same-part call)
      // can persist it for Claude→Gemini follow-up turns (#8979 / #2504 parity).
      if (typeof hasThoughtSig === "string" && hasThoughtSig.length > 0) {
        state.pendingThoughtSignature = hasThoughtSig;
      }

      // Thinking content → thinking block (always open+close per chunk)
      if (isThought && part.text) {
        // Close any open text block first
        flushMarkdownBuffer(state, results);
        if (state.openTextBlockIdx !== null) {
          results.push({ type: "content_block_stop", index: state.openTextBlockIdx });
          state.openTextBlockIdx = null;
        }
        const idx = state.contentBlockIndex++;
        results.push({
          type: "content_block_start",
          index: idx,
          content_block: { type: "thinking", thinking: "" },
        });
        results.push({
          type: "content_block_delta",
          index: idx,
          delta: { type: "thinking_delta", thinking: part.text },
        });
        results.push({ type: "content_block_stop", index: idx });
        continue;
      }

      // Standalone thoughtSignature part (no text / no functionCall): keep
      // pending and wait for the following functionCall — do not emit to Claude.
      if (
        typeof hasThoughtSig === "string" &&
        hasThoughtSig.length > 0 &&
        (part.text === undefined || part.text === "") &&
        !part.functionCall
      ) {
        continue;
      }

      // Function call → tool_use block
      if (part.functionCall) {
        // Close any open text block first
        flushMarkdownBuffer(state, results);
        if (state.openTextBlockIdx !== null) {
          results.push({ type: "content_block_stop", index: state.openTextBlockIdx });
          state.openTextBlockIdx = null;
        }
        const fc = part.functionCall;
        const rawToolName = fc.name;
        const restoredToolName = normalizeToolName(
          typeof rawToolName === "string" ? rawToolName : "",
          state.toolNameMap instanceof Map ? state.toolNameMap : null
        );
        const idx = state.contentBlockIndex++;
        const toolId = fc.id || `toolu_${Date.now()}_${idx}`;

        const signatureForToolCall =
          (typeof hasThoughtSig === "string" && hasThoughtSig.length > 0 ? hasThoughtSig : null) ||
          (typeof state.pendingThoughtSignature === "string" &&
          state.pendingThoughtSignature.length > 0
            ? state.pendingThoughtSignature
            : null);
        if (signatureForToolCall) {
          storeGeminiThoughtSignature(
            buildGeminiThoughtSignatureKey(state.signatureNamespace, toolId),
            signatureForToolCall
          );
          state.pendingThoughtSignature = null;
        }

        results.push({
          type: "content_block_start",
          index: idx,
          content_block: {
            type: "tool_use",
            id: toolId,
            name: restoredToolName,
            input: {},
          },
        });

        const argsStr = JSON.stringify(fc.args || {});
        results.push({
          type: "content_block_delta",
          index: idx,
          delta: { type: "input_json_delta", partial_json: argsStr },
        });
        results.push({ type: "content_block_stop", index: idx });

        if (!state.hasToolUse) state.hasToolUse = true;
        continue;
      }

      // Regular text content → keep text block open across streaming chunks
      const isRegularText = part.text !== undefined && part.text !== "" && !hasThoughtSig;
      const isTextAfterThinking =
        hasThoughtSig &&
        part.text !== undefined &&
        part.text !== "" &&
        !isThought &&
        !part.functionCall;

      if (isRegularText || isTextAfterThinking) {
        const { cleaned, toolCalls: textToolCalls } = extractXmlInvokeBlocks(part.text, state);

        // Process any extracted text-format tool calls (<tool_call>, TOOL_CALL, <invoke>)
        if (textToolCalls.length > 0) {
          flushMarkdownBuffer(state, results);
          if (state.openTextBlockIdx !== null) {
            results.push({ type: "content_block_stop", index: state.openTextBlockIdx });
            state.openTextBlockIdx = null;
          }
          for (const tc of textToolCalls) {
            const idx = state.contentBlockIndex++;
            const restoredToolName = restoreClaudeToolName(
              tc.name,
              state.toolNameMap instanceof Map ? state.toolNameMap : null
            );
            const signatureForToolCall =
              (typeof hasThoughtSig === "string" && hasThoughtSig.length > 0 ? hasThoughtSig : null) ||
              (typeof state.pendingThoughtSignature === "string" &&
              state.pendingThoughtSignature.length > 0
                ? state.pendingThoughtSignature
                : null);
            if (signatureForToolCall) {
              storeGeminiThoughtSignature(
                buildGeminiThoughtSignatureKey(state.signatureNamespace, tc.id),
                signatureForToolCall
              );
              state.pendingThoughtSignature = null;
            }

            results.push({
              type: "content_block_start",
              index: idx,
              content_block: { type: "tool_use", id: tc.id, name: restoredToolName, input: {} },
            });
            results.push({
              type: "content_block_delta",
              index: idx,
              delta: { type: "input_json_delta", partial_json: JSON.stringify(tc.args || {}) },
            });
            results.push({ type: "content_block_stop", index: idx });
            if (!state.hasToolUse) state.hasToolUse = true;
          }
        }

        if (cleaned) {
          // Rehydrate buffered Markdown boundary prefix before emitting.
          const bufferedPrefix = state._markdownBuffer || "";
          state._markdownBuffer = "";
          const combinedText = bufferedPrefix + cleaned;
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
            combinedText,
            state._markdownCodeSpanRun || 0,
            state._markdownTrailingBackslash === true,
            state._markdownFenceRun || 0,
            state._markdownFenceOpening === true,
            state._markdownFenceClosingRun || 0,
            state._markdownLineIndent || 0,
          );
          state._markdownBuffer = textToHold;
          state._markdownCodeSpanRun = backtickRun || 0;
          state._markdownTrailingBackslash = trailingBackslash === true;
          state._markdownFenceRun = fenceRun || 0;
          state._markdownFenceOpening = fenceOpening === true;
          state._markdownFenceClosingRun = fenceClosingRun || 0;
          state._markdownLineIndent = lineIndent || 0;

          // Fully-held chunk (e.g. "`" + "code" -> whole text deferred to the
          // boundary buffer): emitting an empty delta here opens a text block
          // and fires a zero-length text_delta for nothing. The held content
          // flushes on the next chunk; skip the event pair entirely.
          if (textToEmit) {
            // Open a new text block only if none is open yet
            if (state.openTextBlockIdx === null) {
              const idx = state.contentBlockIndex++;
              state.openTextBlockIdx = idx;
              results.push({
                type: "content_block_start",
                index: idx,
                content_block: { type: "text", text: "" },
              });
            }
            results.push({
              type: "content_block_delta",
              index: state.openTextBlockIdx,
              delta: { type: "text_delta", text: textToEmit },
            });
          }
        }
      }
    }
  }

  // ── Usage metadata ─────────────────────────────────────────────
  const usageMeta = response.usageMetadata || chunk.usageMetadata;
  if (usageMeta && typeof usageMeta === "object") {
    const inputTokens =
      typeof usageMeta.promptTokenCount === "number" ? usageMeta.promptTokenCount : 0;
    const candidatesTokens =
      typeof usageMeta.candidatesTokenCount === "number" ? usageMeta.candidatesTokenCount : 0;
    const thoughtsTokens =
      typeof usageMeta.thoughtsTokenCount === "number" ? usageMeta.thoughtsTokenCount : 0;
    const cachedTokens =
      typeof usageMeta.cachedContentTokenCount === "number" ? usageMeta.cachedContentTokenCount : 0;

    state.usage = {
      input_tokens: Math.max(0, inputTokens - cachedTokens),
      output_tokens: candidatesTokens + thoughtsTokens,
    };
    if (cachedTokens > 0) {
      state.usage.cache_read_input_tokens = cachedTokens;
    }
  }

  // ── Finish reason → close open blocks + message_delta + message_stop ──
  if (candidate.finishReason) {
    // Close any still-open text block before finishing
    flushMarkdownBuffer(state, results);
    if (state.openTextBlockIdx !== null) {
      results.push({ type: "content_block_stop", index: state.openTextBlockIdx });
      state.openTextBlockIdx = null;
    }

    let stopReason;
    const reason = candidate.finishReason.toLowerCase();
    if (state.hasToolUse || reason === "tool_calls") {
      stopReason = "tool_use";
    } else if (reason === "max_tokens" || reason === "length") {
      stopReason = "max_tokens";
    } else if (reason === "safety" || reason === "recitation" || reason === "blocklist") {
      stopReason = "end_turn";
    } else if (isAbortFinishReason(reason)) {
      stopReason = "tool_use";
    } else {
      stopReason = "end_turn";
    }

    results.push({
      type: "message_delta",
      delta: { stop_reason: stopReason, stop_sequence: null },
      usage: state.usage || { input_tokens: 0, output_tokens: 0 },
    });
    results.push({ type: "message_stop" });
  }

  return results.length > 0 ? results : null;
}

register(FORMATS.GEMINI, FORMATS.CLAUDE, null, geminiToClaudeResponse);
register(FORMATS.ANTIGRAVITY, FORMATS.CLAUDE, null, geminiToClaudeResponse);
