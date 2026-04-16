import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";

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

      // Thinking content → thinking block (always open+close per chunk)
      if (isThought && part.text) {
        // Close any open text block first
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

      // Function call → tool_use block
      if (part.functionCall) {
        // Close any open text block first
        if (state.openTextBlockIdx !== null) {
          results.push({ type: "content_block_stop", index: state.openTextBlockIdx });
          state.openTextBlockIdx = null;
        }
        const fc = part.functionCall;
        const rawToolName = fc.name;
        const restoredToolName = state.toolNameMap?.get(rawToolName) || rawToolName;
        const idx = state.contentBlockIndex++;
        const toolId = fc.id || `toolu_${Date.now()}_${idx}`;

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
        // Always emit delta into the SAME open block (no open+close per chunk)
        results.push({
          type: "content_block_delta",
          index: state.openTextBlockIdx,
          delta: { type: "text_delta", text: part.text },
        });
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
      input_tokens: inputTokens,
      output_tokens: candidatesTokens + thoughtsTokens,
    };
    if (cachedTokens > 0) {
      state.usage.cache_read_input_tokens = cachedTokens;
    }
  }

  // ── Finish reason → close open blocks + message_delta + message_stop ──
  if (candidate.finishReason) {
    // Close any still-open text block before finishing
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
      // Content blocked by Gemini safety. Any text streamed before this finish
      // reason has already been emitted to the client — this is unavoidable in
      // SSE streaming. Map to end_turn (Claude has no "content blocked" reason).
      stopReason = "end_turn";
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

// Register as direct path: Gemini → Claude
register(FORMATS.GEMINI, FORMATS.CLAUDE, null, geminiToClaudeResponse);
register(FORMATS.GEMINI_CLI, FORMATS.CLAUDE, null, geminiToClaudeResponse);
register(FORMATS.ANTIGRAVITY, FORMATS.CLAUDE, null, geminiToClaudeResponse);
