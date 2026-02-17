// Claude helper functions for translator
import { DEFAULT_THINKING_CLAUDE_SIGNATURE } from "../../config/defaultThinkingSignature.ts";

// Check if message has valid non-empty content
export function hasValidContent(msg) {
  if (typeof msg.content === "string" && msg.content.trim()) return true;
  if (Array.isArray(msg.content)) {
    return msg.content.some(
      (block) =>
        (block.type === "text" && block.text?.trim()) ||
        block.type === "tool_use" ||
        block.type === "tool_result"
    );
  }
  return false;
}

// Fix tool_use/tool_result ordering for Claude API
// 1. Assistant message with tool_use: remove text AFTER tool_use (Claude doesn't allow)
// 2. Merge consecutive same-role messages
export function fixToolUseOrdering(messages) {
  if (messages.length <= 1) return messages;

  // Pass 1: Fix assistant messages with tool_use - remove text after tool_use
  for (const msg of messages) {
    if (msg.role === "assistant" && Array.isArray(msg.content)) {
      const hasToolUse = msg.content.some((b) => b.type === "tool_use");
      if (hasToolUse) {
        // Keep only: thinking blocks + tool_use blocks (remove text blocks after tool_use)
        const newContent = [];
        let foundToolUse = false;

        for (const block of msg.content) {
          if (block.type === "tool_use") {
            foundToolUse = true;
            newContent.push(block);
          } else if (block.type === "thinking" || block.type === "redacted_thinking") {
            newContent.push(block);
          } else if (!foundToolUse) {
            // Keep text blocks BEFORE tool_use
            newContent.push(block);
          }
          // Skip text blocks AFTER tool_use
        }

        msg.content = newContent;
      }
    }
  }

  // Pass 2: Merge consecutive same-role messages
  const merged = [];

  for (const msg of messages) {
    const last = merged[merged.length - 1];

    if (last && last.role === msg.role) {
      // Merge content arrays
      const lastContent = Array.isArray(last.content)
        ? last.content
        : [{ type: "text", text: last.content }];
      const msgContent = Array.isArray(msg.content)
        ? msg.content
        : [{ type: "text", text: msg.content }];

      // Put tool_result first, then other content
      const toolResults = [
        ...lastContent.filter((b) => b.type === "tool_result"),
        ...msgContent.filter((b) => b.type === "tool_result"),
      ];
      const otherContent = [
        ...lastContent.filter((b) => b.type !== "tool_result"),
        ...msgContent.filter((b) => b.type !== "tool_result"),
      ];

      last.content = [...toolResults, ...otherContent];
    } else {
      // Ensure content is array
      const content = Array.isArray(msg.content)
        ? msg.content
        : [{ type: "text", text: msg.content }];
      merged.push({ role: msg.role, content: [...content] });
    }
  }

  return merged;
}

// Prepare request for Claude format endpoints
// - Cleanup cache_control
// - Filter empty messages
// - Add thinking block for Anthropic endpoint (provider === "claude")
// - Fix tool_use/tool_result ordering
export function prepareClaudeRequest(body, provider = null) {
  // 1. System: remove all cache_control, add only to last block with ttl 1h
  if (body.system && Array.isArray(body.system)) {
    body.system = body.system.map((block, i) => {
      const { cache_control, ...rest } = block;
      if (i === body.system.length - 1) {
        return { ...rest, cache_control: { type: "ephemeral", ttl: "1h" } };
      }
      return rest;
    });
  }

  // 2. Messages: process in optimized passes
  if (body.messages && Array.isArray(body.messages)) {
    const len = body.messages.length;
    let filtered = [];

    // Pass 1: remove cache_control + filter empty messages
    for (let i = 0; i < len; i++) {
      const msg = body.messages[i];

      // Remove cache_control from content blocks
      if (Array.isArray(msg.content)) {
        for (const block of msg.content) {
          delete block.cache_control;
        }
      }

      // Keep final assistant even if empty, otherwise check valid content
      const isFinalAssistant = i === len - 1 && msg.role === "assistant";
      if (isFinalAssistant || hasValidContent(msg)) {
        filtered.push(msg);
      }
    }

    // Pass 1.5: Fix tool_use/tool_result ordering
    // Each tool_use must have tool_result in the NEXT message (not same message with other content)
    filtered = fixToolUseOrdering(filtered);

    body.messages = filtered;

    // Check if thinking is enabled AND last message is from user
    const lastMessage = filtered[filtered.length - 1];
    const lastMessageIsUser = lastMessage?.role === "user";
    const thinkingEnabled = body.thinking?.type === "enabled" && lastMessageIsUser;

    // Pass 2 (reverse): add cache_control to last assistant + handle thinking for Anthropic
    let lastAssistantProcessed = false;
    for (let i = filtered.length - 1; i >= 0; i--) {
      const msg = filtered[i];

      if (msg.role === "assistant" && Array.isArray(msg.content)) {
        // Add cache_control to last block of first (from end) assistant with content
        if (!lastAssistantProcessed && msg.content.length > 0) {
          msg.content[msg.content.length - 1].cache_control = { type: "ephemeral" };
          lastAssistantProcessed = true;
        }

        // Handle thinking blocks for Anthropic endpoints (native + compatible)
        if (provider === "claude" || provider?.startsWith?.("anthropic-compatible-")) {
          let hasToolUse = false;
          let hasThinking = false;

          // Always replace signature for all thinking blocks
          for (const block of msg.content) {
            if (block.type === "thinking" || block.type === "redacted_thinking") {
              block.signature = DEFAULT_THINKING_CLAUDE_SIGNATURE;
              hasThinking = true;
            }
            if (block.type === "tool_use") hasToolUse = true;
          }

          // Add thinking block if thinking enabled + has tool_use but no thinking
          if (thinkingEnabled && !hasThinking && hasToolUse) {
            msg.content.unshift({
              type: "thinking",
              thinking: ".",
              signature: DEFAULT_THINKING_CLAUDE_SIGNATURE,
            });
          }
        }
      }
    }
  }

  // 3. Tools: remove all cache_control, add only to last tool with ttl 1h
  if (body.tools && Array.isArray(body.tools)) {
    body.tools = body.tools.map((tool, i) => {
      const { cache_control, ...rest } = tool;
      if (i === body.tools.length - 1) {
        return { ...rest, cache_control: { type: "ephemeral", ttl: "1h" } };
      }
      return rest;
    });
  }

  return body;
}
