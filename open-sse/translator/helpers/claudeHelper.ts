// Claude helper functions for translator
import { DEFAULT_THINKING_CLAUDE_SIGNATURE } from "../../config/defaultThinkingSignature.ts";
import { lookupReasoning, recordReplay } from "../../services/reasoningCache.ts";

// Placeholder thinking text used as last-resort fallback when:
//   - Target upstream is a non-Anthropic Claude-shape provider
//     (kimi-coding, glmt, zai, …) that rejects redacted_thinking blobs
//   - Client (e.g. Capy) sent only redacted_thinking on replay
//   - reasoningCache has no entry for the corresponding tool_use.id
// Must be non-empty: kimi-coding treats empty `thinking.thinking` as
// `reasoning_content missing` and 400s.
export const NON_ANTHROPIC_THINKING_PLACEHOLDER = "(prior reasoning summary unavailable)";

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

  // Non-Anthropic Claude-shape providers (kimi-coding, glmt, zai, …) cannot
  // validate the synthetic redacted_thinking.data blob — they're not Anthropic
  // and don't speak its signature scheme. They expect plain `thinking { text }`
  // blocks with the original reasoning text, or fail with:
  //   "thinking is enabled but reasoning_content is missing in assistant
  //    tool call message at index N"
  // We use the same allowlist as prompt-caching: only Anthropic-native
  // upstreams get redacted_thinking. Everything else gets plain thinking blocks
  // backed by reasoningCache (real text) or a placeholder (cache miss).
  const supportsRedactedThinking = supportsPromptCaching;

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

    // Index of the LAST assistant message in the filtered array. Anthropic
    // enforces the latest assistant message's thinking blocks cannot be
    // modified — preserve them verbatim. Older assistant messages can be
    // rewritten to redacted_thinking { data } as before.
    let latestAssistantIndex = -1;
    for (let k = filtered.length - 1; k >= 0; k--) {
      if (filtered[k]?.role === "assistant") {
        latestAssistantIndex = k;
        break;
      }
    }

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

        // Handle thinking blocks for Anthropic-shape endpoints.
        // prepareClaudeRequest is only invoked when targetFormat === claude
        // (translator/index.ts:165-168), so any provider that lands here has
        // a Claude-format upstream: claude native, anthropic-compatible-*,
        // kimi-coding (api.kimi.com/coding/v1/messages), glmt, zai, etc.
        // All of these enforce the same body-shape contract for thinking mode:
        // when body.thinking.type === "enabled" and an assistant turn contains
        // a tool_use, the same content[] must include a thinking (or
        // redacted_thinking) block emitted before the tool_use. Without it,
        // the upstream rejects with errors like:
        //   "thinking is enabled but reasoning_content is missing in
        //    assistant tool call message at index N"  (kimi-coding)
        //   "Invalid signature in thinking block"     (claude native, on
        //                                              cross-provider replay)
        // Guard: never modify EXISTING thinking blocks in the latest assistant
        // message when sending to an Anthropic-native upstream. Anthropic returns
        // 400 "blocks in the latest assistant message cannot be modified" if any
        // field changes. Injecting a NEW thinking block (when none exists) is fine.
        // Older assistant messages can still be rewritten.
        // For non-Anthropic providers: only the text replacement is skipped
        // for the latest assistant (if it already has non-empty thinking text);
        // field cleanup (signature strip, type normalization) still runs.
        const isLatestAssistant = i === latestAssistantIndex;
        const latestHasExistingThinking =
          isLatestAssistant &&
          content.some((b: any) => b.type === "thinking" || b.type === "redacted_thinking");
        if (latestHasExistingThinking && supportsRedactedThinking) {
          // Anthropic: skip all thinking-block rewrites entirely — the
          // blocks must remain verbatim (type, thinking, signature, data).
          continue;
        }

        let hasToolUse = false;
        let hasThinking = false;

        // Pre-collect tool_use ids in this content[] for reasoningCache
        // lookups when the upstream is a non-Anthropic Claude-shape provider.
        // The cache is keyed by tool_call_id which equals tool_use.id for
        // Anthropic-shape (the same value is reused across formats — see
        // claude-to-openai.ts:63 where openai tool_call.id = claude tool_use.id).
        const toolUseIds: string[] = [];
        if (!supportsRedactedThinking) {
          for (const block of content) {
            if (block.type === "tool_use" && typeof block.id === "string") {
              toolUseIds.push(block.id);
            }
          }
        }

        // Convert thinking blocks per provider type:
        //
        // Anthropic-native (claude, anthropic-compatible-*):
        //   Emit redacted_thinking { data } with synthetic blob. Anthropic
        //   accepts this as a valid placeholder for replay context without
        //   re-validating the original signature. Previous behavior — keep.
        //
        //   When requests cross provider boundaries (e.g., combo fallback) or
        //   when client-stored signatures (Capy) replay back to Anthropic, the
        //   original `thinking.signature` no longer validates: "Invalid
        //   signature in thinking block" 400. redacted_thinking accepts without
        //   signature validation — but Anthropic REQUIRES a `data` field.
        //   Field rules: redacted_thinking={type,data} ; thinking={type,thinking,signature}.
        //
        // Non-Anthropic Claude-shape (kimi-coding, glmt, zai, …):
        //   Emit plain thinking { thinking: <text> } using the real reasoning
        //   text from reasoningCache (captured on the prior assistant
        //   response). Falls back to NON_ANTHROPIC_THINKING_PLACEHOLDER if the
        //   cache misses (rare but possible after a process restart or TTL
        //   eviction). Empty text is treated as "missing" by kimi-coding so
        //   never emit an empty thinking field.
        let thinkingBlockIdx = 0;
        for (const block of content) {
          if (block.type === "thinking" || block.type === "redacted_thinking") {
            if (supportsRedactedThinking) {
              block.type = "redacted_thinking";
              block.data = DEFAULT_THINKING_CLAUDE_SIGNATURE;
              delete block.thinking;
              delete block.signature;
            } else {
              const existing =
                typeof block.thinking === "string" && block.thinking.length > 0
                  ? block.thinking
                  : "";
              let text = existing;
              // For the latest assistant message on non-Anthropic upstreams,
              // preserve the thinking text verbatim when it is already present.
              // Cache lookups and the placeholder fallback only apply to older
              // messages (or to the latest if the client sent empty text).
              if (!text || !latestHasExistingThinking) {
                if (!text) {
                  const pairedToolUseId = toolUseIds[thinkingBlockIdx];
                  if (pairedToolUseId) {
                    const cached = lookupReasoning(pairedToolUseId);
                    if (cached) {
                      text = cached;
                      recordReplay();
                    }
                  }
                }
                block.type = "thinking";
                block.thinking = text || NON_ANTHROPIC_THINKING_PLACEHOLDER;
              } else {
                // latestHasExistingThinking + non-empty text: preserve text, still clean up fields
                block.type = "thinking";
              }
              delete block.data;
              delete block.signature;
            }
            hasThinking = true;
            thinkingBlockIdx++;
          }
          if (block.type === "tool_use") hasToolUse = true;
        }

        // Add precursor thinking block if thinking enabled + has tool_use but
        // no existing thinking-ish block. Required for Anthropic-shape
        // thinking-mode upstreams (claude, kimi-coding, glm, …) when the
        // assistant turn's content[] needs a thinking block in front of any
        // tool_use. Use the same provider-aware shape selection as above.
        if (thinkingEnabled && !hasThinking && hasToolUse) {
          if (supportsRedactedThinking) {
            content.unshift({
              type: "redacted_thinking",
              data: DEFAULT_THINKING_CLAUDE_SIGNATURE,
            });
          } else {
            let text = "";
            const firstToolUseId = toolUseIds[0];
            if (firstToolUseId) {
              const cached = lookupReasoning(firstToolUseId);
              if (cached) {
                text = cached;
                recordReplay();
              }
            }
            content.unshift({
              type: "thinking",
              thinking: text || NON_ANTHROPIC_THINKING_PLACEHOLDER,
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
