// Claude helper functions for translator
import { DEFAULT_THINKING_CLAUDE_SIGNATURE } from "../../config/defaultThinkingSignature.ts";

type ClaudeContentBlock = {
  type?: string;
  text?: string;
  name?: string;
  tool_use_id?: string;
  cache_control?: unknown;
  signature?: string;
  thinking?: string;
  [key: string]: unknown;
};

type ClaudeMessage = {
  role?: string;
  content?: string | ClaudeContentBlock[];
  [key: string]: unknown;
};

type ClaudeTool = {
  name?: string;
  defer_loading?: boolean;
  cache_control?: unknown;
  [key: string]: unknown;
};

type ClaudeRequestBody = {
  system?: Array<Record<string, unknown> & { cache_control?: unknown }>;
  messages?: ClaudeMessage[];
  tools?: ClaudeTool[];
  thinking?: Record<string, unknown> | null;
  [key: string]: unknown;
};

// Check if message has valid non-empty content
export function hasValidContent(msg: ClaudeMessage): boolean {
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
export function fixToolUseOrdering(messages: ClaudeMessage[]): ClaudeMessage[] {
  if (messages.length <= 1) return messages;

  // Pass 1: Fix assistant messages with tool_use - remove text after tool_use
  for (const msg of messages) {
    if (msg.role === "assistant" && Array.isArray(msg.content)) {
      const hasToolUse = msg.content.some((b) => b.type === "tool_use");
      if (hasToolUse) {
        // Keep only: thinking blocks + tool_use blocks (remove text blocks after tool_use)
        const newContent: ClaudeContentBlock[] = [];
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
  const merged: ClaudeMessage[] = [];

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

function ensureMessageContentArray(msg: ClaudeMessage): ClaudeContentBlock[] {
  if (Array.isArray(msg?.content)) return msg.content;
  if (typeof msg?.content === "string" && msg.content.trim()) {
    msg.content = [{ type: "text", text: msg.content }];
    return msg.content;
  }
  return [];
}

function markMessageCacheControl(msg: ClaudeMessage, ttl?: string): boolean {
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
export function prepareClaudeRequest(
  body: ClaudeRequestBody,
  provider: string | null = null,
  preserveCacheControl = false
): ClaudeRequestBody {
  // 1. System: remove all cache_control, add only to last block with ttl 1h
  // In passthrough mode, preserve existing cache_control markers
  const supportsPromptCaching =
    provider === "claude" || provider?.startsWith?.("anthropic-compatible-");

  const systemBlocks = body.system;
  if (systemBlocks && Array.isArray(systemBlocks) && !preserveCacheControl) {
    body.system = systemBlocks.map((block, i) => {
      const { cache_control, ...rest } = block;
      if (i === systemBlocks.length - 1 && supportsPromptCaching) {
        return { ...rest, cache_control: { type: "ephemeral", ttl: "1h" } };
      }
      return rest;
    });
  }

  // 2. Messages: process in optimized passes
  if (body.messages && Array.isArray(body.messages)) {
    const len = body.messages.length;
    let filtered: ClaudeMessage[] = [];

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
    if (!preserveCacheControl && supportsPromptCaching) {
      const userMessageIndexes = filtered.reduce<number[]>((indexes, msg, index) => {
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
      const content = ensureMessageContentArray(msg);

      if (msg.role === "assistant" && content.length > 0) {
        // Add cache_control to last block of first (from end) assistant with content
        // Skip in passthrough mode to preserve client's cache_control markers
        if (
          !preserveCacheControl &&
          supportsPromptCaching &&
          !lastAssistantProcessed &&
          markMessageCacheControl(msg)
        ) {
          lastAssistantProcessed = true;
        }

        // Handle thinking blocks for Anthropic endpoints (native + compatible)
        if (provider === "claude" || provider?.startsWith?.("anthropic-compatible-")) {
          let hasToolUse = false;
          let hasThinking = false;

          // Convert thinking blocks to redacted_thinking and replace signature.
          // When requests cross provider boundaries (e.g., combo fallback), the
          // original thinking signature is invalid for the new provider, causing
          // "Invalid signature in thinking block" 400 errors. redacted_thinking
          // blocks are accepted without signature validation.
          for (const block of content) {
            if (block.type === "thinking" || block.type === "redacted_thinking") {
              block.type = "redacted_thinking";
              block.signature = DEFAULT_THINKING_CLAUDE_SIGNATURE;
              delete block.thinking;
              hasThinking = true;
            }
            if (block.type === "tool_use") hasToolUse = true;
          }

          // Add thinking block if thinking enabled + has tool_use but no thinking
          if (thinkingEnabled && !hasThinking && hasToolUse) {
            content.unshift({
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
    if (supportsPromptCaching) {
      for (let i = body.tools.length - 1; i >= 0; i--) {
        if (!body.tools[i].defer_loading) {
          body.tools[i].cache_control = { type: "ephemeral", ttl: "1h" };
          break;
        }
      }
    }
  }

  return body;
}
