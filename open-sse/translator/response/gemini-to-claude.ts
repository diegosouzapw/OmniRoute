import { register } from "../index.js";
import { FORMATS } from "../formats.js";

/**
 * Direct Gemini → Claude response translator.
 * Converts Gemini streaming chunks directly to Claude Messages API
 * streaming events, skipping the OpenAI hub intermediate step.
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

      // Thinking content → thinking block
      if (isThought && part.text) {
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

      // Function call → tool_use block (with or without thoughtSignature)
      if (part.functionCall) {
        const fc = part.functionCall;
        const idx = state.contentBlockIndex++;
        const toolId = fc.id || `toolu_${Date.now()}_${idx}`;

        results.push({
          type: "content_block_start",
          index: idx,
          content_block: {
            type: "tool_use",
            id: toolId,
            name: fc.name,
            input: {},
          },
        });

        // Send args as a single JSON delta
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

      // Text content → text block
      if (part.text !== undefined && part.text !== "" && !hasThoughtSig) {
        const idx = state.contentBlockIndex++;
        results.push({
          type: "content_block_start",
          index: idx,
          content_block: { type: "text", text: "" },
        });
        results.push({
          type: "content_block_delta",
          index: idx,
          delta: { type: "text_delta", text: part.text },
        });
        results.push({ type: "content_block_stop", index: idx });
      }

      // Text with thoughtSignature but not a thought (model output after thinking)
      if (
        hasThoughtSig &&
        part.text !== undefined &&
        part.text !== "" &&
        !isThought &&
        !part.functionCall
      ) {
        const idx = state.contentBlockIndex++;
        results.push({
          type: "content_block_start",
          index: idx,
          content_block: { type: "text", text: "" },
        });
        results.push({
          type: "content_block_delta",
          index: idx,
          delta: { type: "text_delta", text: part.text },
        });
        results.push({ type: "content_block_stop", index: idx });
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

  // ── Finish reason → message_delta + message_stop ───────────────
  if (candidate.finishReason) {
    let stopReason;
    const reason = candidate.finishReason.toLowerCase();
    if (state.hasToolUse || reason === "tool_calls") {
      stopReason = "tool_use";
    } else if (reason === "max_tokens" || reason === "length") {
      stopReason = "max_tokens";
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
