import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { isAbortFinishReason } from "../../utils/finishReason.ts";
import { restoreClaudeToolName, REVERSE_MAP } from "../../services/claudeCodeToolRemapper.ts";
import {
  buildGeminiThoughtSignatureKey,
  storeGeminiThoughtSignature,
} from "../../services/geminiThoughtSignatureStore.ts";

function normalizeToolName(name: string): string {
  return REVERSE_MAP[name] ?? name;
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
        if (state.openTextBlockIdx !== null) {
          results.push({ type: "content_block_stop", index: state.openTextBlockIdx });
          state.openTextBlockIdx = null;
        }
        const fc = part.functionCall;
        const rawToolName = fc.name;
        // #9008: honor the request's original casing via toolNameMap before any
        // REVERSE_MAP lowercase fallback (#7926). Blind REVERSE_MAP broke Claude
        // Code (Read/WebSearch → read/websearch → "No such tool available").
        const restoredToolName = restoreClaudeToolName(
          typeof rawToolName === "string" ? rawToolName : "",
          state.toolNameMap instanceof Map ? state.toolNameMap : null
        );
        const idx = state.contentBlockIndex++;
        const toolId = fc.id || `toolu_${Date.now()}_${idx}`;

        const signatureForToolCall =
          (typeof hasThoughtSig === "string" && hasThoughtSig.length > 0
            ? hasThoughtSig
            : null) ||
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
      if (isRegularText) {
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
          delta: { type: "text_delta", text: part.text },
        });
        continue;
      }

      // Final thought block (thinking is done, signature present but no text)
      if (hasThoughtSig && !isThought && !part.text) {
        if (state.openTextBlockIdx !== null) {
          results.push({ type: "content_block_stop", index: state.openTextBlockIdx });
          state.openTextBlockIdx = null;
        }
        continue;
      }
    }
  }

  // ── Finalize: emit message_stop ────────────────────────────────
  if (state.openTextBlockIdx !== null) {
    results.push({ type: "content_block_stop", index: state.openTextBlockIdx });
    state.openTextBlockIdx = null;
  }

  return results;
}