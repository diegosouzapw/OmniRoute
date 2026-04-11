// Claude helper functions for translator
import { DEFAULT_THINKING_CLAUDE_SIGNATURE } from "../../config/defaultThinkingSignature.ts";
import {
  rewriteForwardedTextForLane,
  rewriteForwardedToolNameForLane,
} from "../../config/forwardingKeywordRules.ts";

const CLAUDE_OAUTH_FORWARDING_LANE = "claude-oauth-prefixed";

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

function ensureMessageContentArray(msg) {
  if (Array.isArray(msg?.content)) return msg.content;
  if (typeof msg?.content === "string" && msg.content.trim()) {
    msg.content = [{ type: "text", text: msg.content }];
    return msg.content;
  }
  return [];
}

function markMessageCacheControl(msg, ttl) {
  const content = ensureMessageContentArray(msg);
  if (content.length === 0) return false;
  const lastIndex = content.length - 1;
  content[lastIndex].cache_control =
    ttl !== undefined ? { type: "ephemeral", ttl } : { type: "ephemeral" };
  return true;
}

// Prepare request for Claude format endpoints
// - Cleanup cache_control (unless preserveCacheControl=true for passthrough)
// - Filter empty messages
// - Add thinking block for Anthropic endpoint (provider === "claude")
// - Fix tool_use/tool_result ordering
export function prepareClaudeRequest(body, provider = null, preserveCacheControl = false) {
  // 1. System: remove all cache_control, add only to last block with ttl 1h
  // In passthrough mode, preserve existing cache_control markers
  if (body.system && Array.isArray(body.system) && !preserveCacheControl) {
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
    // In passthrough mode, preserve existing cache_control markers
    for (let i = 0; i < len; i++) {
      const msg = body.messages[i];

      // Remove cache_control from content blocks (skip in passthrough mode)
      if (Array.isArray(msg.content) && !preserveCacheControl) {
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

    // Pass 1.4: Filter out tool_use blocks with empty names (causes Claude 400 error)
    // Apply to ALL roles (assistant tool_use + any user messages that may carry tool_use)
    // Also filter tool_result blocks with missing tool_use_id
    for (const msg of filtered) {
      if (Array.isArray(msg.content)) {
        msg.content = msg.content.filter(
          (block) => block.type !== "tool_use" || (block.name && block.name?.trim())
        );
        msg.content = msg.content.filter(
          (block) => block.type !== "tool_result" || block.tool_use_id
        );
      }
    }

    // Also filter top-level tool declarations with empty names
    if (body.tools && Array.isArray(body.tools)) {
      body.tools = body.tools.filter((tool) => tool.name && tool.name?.trim());
    }

    // Pass 1.5: Fix tool_use/tool_result ordering
    // Each tool_use must have tool_result in the NEXT message (not same message with other content)
    filtered = fixToolUseOrdering(filtered);

    body.messages = filtered;

    // Check if thinking is enabled AND last message is from user
    const lastMessage = filtered[filtered.length - 1];
    const lastMessageIsUser = lastMessage?.role === "user";
    const thinkingEnabled = body.thinking?.type === "enabled" && lastMessageIsUser;

    // Claude Code-style prompt caching:
    // - cache the second-to-last user turn for conversation reuse
    // - cache the last assistant turn so the next user turn can reuse it
    // Skip in passthrough mode to preserve client's cache_control markers
    if (!preserveCacheControl) {
      const userMessageIndexes = filtered.reduce((indexes, msg, index) => {
        if (msg?.role === "user") indexes.push(index);
        return indexes;
      }, []);
      const secondToLastUserIndex =
        userMessageIndexes.length >= 2 ? userMessageIndexes[userMessageIndexes.length - 2] : -1;
      if (secondToLastUserIndex >= 0) {
        markMessageCacheControl(filtered[secondToLastUserIndex]);
      }
    }

    // Pass 2 (reverse): add cache_control to last assistant + handle thinking for Anthropic
    let lastAssistantProcessed = false;
    for (let i = filtered.length - 1; i >= 0; i--) {
      const msg = filtered[i];

      if (msg.role === "assistant" && Array.isArray(ensureMessageContentArray(msg))) {
        // Add cache_control to last block of first (from end) assistant with content
        // Skip in passthrough mode to preserve client's cache_control markers
        if (!preserveCacheControl && !lastAssistantProcessed && markMessageCacheControl(msg)) {
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

  // 3. Tools: remove all cache_control, add only to last non-deferred tool with ttl 1h
  // Tools with defer_loading=true cannot have cache_control (API rejects it)
  // In passthrough mode, preserve existing cache_control markers
  if (body.tools && Array.isArray(body.tools) && !preserveCacheControl) {
    body.tools = body.tools.map((tool) => {
      const { cache_control, ...rest } = tool;
      return rest;
    });
    for (let i = body.tools.length - 1; i >= 0; i--) {
      if (!body.tools[i].defer_loading) {
        body.tools[i].cache_control = { type: "ephemeral", ttl: "1h" };
        break;
      }
    }
  }

  return body;
}

export function applyClaudeOAuthLexicalRewrite(body) {
  if (!body || typeof body !== "object") {
    return { body, toolNameMap: null };
  }

  const toolNameMap = new Map();
  const rewriteText = (text) =>
    typeof text === "string"
      ? rewriteForwardedTextForLane(CLAUDE_OAUTH_FORWARDING_LANE, text)
      : text;
  const rewriteToolName = (toolName) => {
    if (typeof toolName !== "string") return toolName;
    const normalizedToolName = toolName.trim();
    if (!normalizedToolName) return toolName;
    const rewrittenToolName = rewriteForwardedToolNameForLane(
      CLAUDE_OAUTH_FORWARDING_LANE,
      normalizedToolName
    );
    if (rewrittenToolName !== normalizedToolName) {
      toolNameMap.set(rewrittenToolName, normalizedToolName);
    }
    return rewrittenToolName;
  };

  if (Array.isArray(body.system)) {
    body.system = body.system.map((block) =>
      block && typeof block === "object" && typeof block.text === "string"
        ? { ...block, text: rewriteText(block.text) }
        : block
    );
  } else if (typeof body.system === "string") {
    body.system = rewriteText(body.system);
  }

  if (Array.isArray(body.tools)) {
    body.tools = body.tools.map((tool) => {
      if (!tool || typeof tool !== "object") return tool;
      const rewrittenTool = { ...tool };
      if (typeof rewrittenTool.name === "string") {
        rewrittenTool.name = rewriteToolName(rewrittenTool.name);
      }
      if (typeof rewrittenTool.description === "string") {
        rewrittenTool.description = rewriteText(rewrittenTool.description);
      }
      return rewrittenTool;
    });
  }

  if (body.tool_choice && typeof body.tool_choice === "object") {
    if (body.tool_choice.type === "tool" && typeof body.tool_choice.name === "string") {
      body.tool_choice = {
        ...body.tool_choice,
        name: rewriteToolName(body.tool_choice.name),
      };
    }
  }

  if (Array.isArray(body.messages)) {
    body.messages = body.messages.map((message) => {
      if (!message || typeof message !== "object") return message;
      if (typeof message.content === "string") {
        return {
          ...message,
          content: rewriteText(message.content),
        };
      }
      if (!Array.isArray(message.content)) return message;
      return {
        ...message,
        content: message.content.map((block) => {
          if (!block || typeof block !== "object") return block;
          if (block.type === "text" && typeof block.text === "string") {
            return { ...block, text: rewriteText(block.text) };
          }
          if (block.type === "thinking" && typeof block.thinking === "string") {
            return { ...block, thinking: rewriteText(block.thinking) };
          }
          if (block.type === "tool_use" && typeof block.name === "string") {
            return { ...block, name: rewriteToolName(block.name) };
          }
          if (block.type === "tool_result" && Array.isArray(block.content)) {
            return {
              ...block,
              content: block.content.map((nestedBlock) =>
                nestedBlock?.type === "text" && typeof nestedBlock.text === "string"
                  ? { ...nestedBlock, text: rewriteText(nestedBlock.text) }
                  : nestedBlock
              ),
            };
          }
          if (block.type === "tool_result" && typeof block.content === "string") {
            return {
              ...block,
              content: rewriteText(block.content),
            };
          }
          return block;
        }),
      };
    });
  }

  return { body, toolNameMap: toolNameMap.size > 0 ? toolNameMap : null };
}
