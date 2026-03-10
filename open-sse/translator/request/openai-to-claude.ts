import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { CLAUDE_SYSTEM_PROMPT } from "../../config/constants.ts";
import { adjustMaxTokens } from "../helpers/maxTokensHelper.ts";
import { DEFAULT_THINKING_CLAUDE_SIGNATURE } from "../../config/defaultThinkingSignature.ts";

// Prefix for Claude OAuth tool names to avoid conflicts
// Can be disabled per-request via body._disableToolPrefix = true
export const CLAUDE_OAUTH_TOOL_PREFIX = "proxy_";
const CLAUDE_TOOL_CHOICE_REQUIRED = "an" + "y";

type ClaudeContentBlock = Record<string, unknown>;
type ClaudeMessage = {
  role: string;
  content: ClaudeContentBlock[];
};
type ClaudeSystemBlock = {
  type: string;
  text: string;
  cache_control?: { type: string; ttl?: string };
};
type ClaudeTool = {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
  cache_control?: { type: string; ttl?: string };
};

// Convert OpenAI request to Claude format
export function openaiToClaudeRequest(model, body, stream) {
  // Check if tool prefix should be disabled (configured per-provider or global)
  const disableToolPrefix = body?._disableToolPrefix === true;

  // Tool name mapping for Claude OAuth (capitalizedName → originalName)
  const toolNameMap = new Map();
  const result: {
    [key: string]: unknown;
    model: string;
    max_tokens: number;
    stream: boolean;
    messages: ClaudeMessage[];
    system?: ClaudeSystemBlock[];
    tools?: ClaudeTool[];
    tool_choice?: Record<string, unknown> | string;
    thinking?: Record<string, unknown>;
    _toolNameMap?: Map<string, string>;
  } = {
    model: model,
    max_tokens: adjustMaxTokens(body),
    stream: stream,
    messages: [],
  };

  // Temperature
  if (body.temperature !== undefined) {
    result.temperature = body.temperature;
  }

  // Messages
  const systemParts = [];

  if (body.messages && Array.isArray(body.messages)) {
    // Extract system messages
    for (const msg of body.messages) {
      if (msg.role === "system") {
        systemParts.push(
          typeof msg.content === "string" ? msg.content : extractTextContent(msg.content)
        );
      }
    }

    // Filter out system messages for separate processing
    const nonSystemMessages = body.messages.filter((m) => m.role !== "system");

    // Process messages with merging logic
    // CRITICAL: tool_result must be in separate message immediately after tool_use
    let currentRole: string | undefined = undefined;
    let currentParts: ClaudeContentBlock[] = [];

    const flushCurrentMessage = () => {
      if (currentRole && currentParts.length > 0) {
        result.messages.push({ role: currentRole, content: currentParts });
        currentParts = [];
      }
    };

    for (const msg of nonSystemMessages) {
      const newRole = msg.role === "user" || msg.role === "tool" ? "user" : "assistant";
      const blocks = getContentBlocksFromMessage(msg, toolNameMap, disableToolPrefix);
      const hasToolUse = blocks.some((b) => b.type === "tool_use");
      const hasToolResult = blocks.some((b) => b.type === "tool_result");

      // Separate tool_result from other content
      if (hasToolResult) {
        const toolResultBlocks = blocks.filter((b) => b.type === "tool_result");
        const otherBlocks = blocks.filter((b) => b.type !== "tool_result");

        flushCurrentMessage();

        if (toolResultBlocks.length > 0) {
          result.messages.push({ role: "user", content: toolResultBlocks });
        }

        if (otherBlocks.length > 0) {
          currentRole = newRole;
          currentParts.push(...otherBlocks);
        }
        continue;
      }

      if (currentRole !== newRole) {
        flushCurrentMessage();
        currentRole = newRole;
      }

      currentParts.push(...blocks);

      if (hasToolUse) {
        flushCurrentMessage();
      }
    }

    flushCurrentMessage();

    // Add cache_control to last assistant message
    for (let i = result.messages.length - 1; i >= 0; i--) {
      const message = result.messages[i];
      if (
        message.role === "assistant" &&
        Array.isArray(message.content) &&
        message.content.length > 0
      ) {
        const lastBlock = message.content[message.content.length - 1];
        if (lastBlock) {
          lastBlock.cache_control = { type: "ephemeral" };
          break;
        }
      }
    }
  }

  // System with Claude Code prompt and cache_control
  const claudeCodePrompt = { type: "text", text: CLAUDE_SYSTEM_PROMPT };

  if (systemParts.length > 0) {
    const systemText = systemParts.join("\n");
    result.system = [
      claudeCodePrompt,
      { type: "text", text: systemText, cache_control: { type: "ephemeral", ttl: "1h" } },
    ];
  } else {
    result.system = [claudeCodePrompt];
  }

  // Tools - convert from OpenAI format to Claude format with prefix for OAuth
  if (body.tools && Array.isArray(body.tools)) {
    result.tools = body.tools.map((tool) => {
      const toolData = tool.type === "function" && tool.function ? tool.function : tool;
      const originalName = toolData.name;

      // Claude OAuth requires prefixed tool names to avoid conflicts
      // When prefix is disabled (non-Claude backends), use original name
      const toolName = disableToolPrefix ? originalName : CLAUDE_OAUTH_TOOL_PREFIX + originalName;

      // Store mapping for response translation (prefixed → original)
      if (!disableToolPrefix) {
        toolNameMap.set(toolName, originalName);
      }

      return {
        name: toolName,
        description: toolData.description || "",
        input_schema: toolData.parameters ||
          toolData.input_schema || { type: "object", properties: {}, required: [] },
      };
    });

    // Filter out tools with empty names (would cause Claude 400 error)
    result.tools = result.tools.filter((tool) => tool.name && tool.name?.trim());

    // Add cache_control to last tool that doesn't have defer_loading
    // Tools with defer_loading=true cannot have cache_control (API rejects it)
    for (let i = result.tools.length - 1; i >= 0; i--) {
      if (!result.tools[i].defer_loading) {
        result.tools[i].cache_control = { type: "ephemeral", ttl: "1h" };
        break;
      }
    }
  }

  // Tool choice
  if (body.tool_choice) {
    result.tool_choice = convertOpenAIToolChoice(body.tool_choice);
  }

  // Thinking configuration
  if (body.thinking) {
    result.thinking = {
      type: body.thinking.type || "enabled",
      ...(body.thinking.budget_tokens && { budget_tokens: body.thinking.budget_tokens }),
      ...(body.thinking.max_tokens && { max_tokens: body.thinking.max_tokens }),
    };
  }

  // Attach toolNameMap to result for response translation
  if (toolNameMap.size > 0) {
    result._toolNameMap = toolNameMap;
  }

  return result;
}

// Get content blocks from single message
function getContentBlocksFromMessage(msg, toolNameMap = new Map(), disableToolPrefix = false) {
  const blocks = [];

  if (msg.role === "tool") {
    blocks.push({
      type: "tool_result",
      tool_use_id: msg.tool_call_id,
      content: msg.content,
    });
  } else if (msg.role === "user") {
    if (typeof msg.content === "string") {
      if (msg.content) {
        blocks.push({ type: "text", text: msg.content });
      }
    } else if (Array.isArray(msg.content)) {
      for (const part of msg.content) {
        if (part.type === "text" && part.text) {
          blocks.push({ type: "text", text: part.text });
        } else if (part.type === "tool_result") {
          // Skip tool_result with no tool_use_id (would be useless and may cause errors)
          if (!part.tool_use_id) continue;
          blocks.push({
            type: "tool_result",
            tool_use_id: part.tool_use_id,
            content: part.content,
            ...(part.is_error && { is_error: part.is_error }),
          });
        } else if (part.type === "image_url") {
          const url = part.image_url.url;
          const match = url.match(/^data:([^;]+);base64,(.+)$/);
          if (match) {
            blocks.push({
              type: "image",
              source: { type: "base64", media_type: match[1], data: match[2] },
            });
          }
        } else if (part.type === "image" && part.source) {
          blocks.push({ type: "image", source: part.source });
        }
      }
    }
  } else if (msg.role === "assistant") {
    // Add reasoning_content as thinking block (OpenAI extended thinking format)
    if (msg.reasoning_content) {
      blocks.push({
        type: "thinking",
        thinking: msg.reasoning_content,
        signature: DEFAULT_THINKING_CLAUDE_SIGNATURE,
      });
    }

    if (Array.isArray(msg.content)) {
      for (const part of msg.content) {
        if (part.type === "text" && part.text) {
          blocks.push({ type: "text", text: part.text });
        } else if (part.type === "thinking" || part.type === "redacted_thinking") {
          // Preserve thinking blocks with signature
          blocks.push({
            ...part,
            signature: part.signature || DEFAULT_THINKING_CLAUDE_SIGNATURE,
          });
        } else if (part.type === "tool_use") {
          // Tool name already has prefix from tool declarations, keep as-is
          // CRITICAL: Skip tool_use blocks with empty name (causes Claude 400 error)
          if (part.name && part.name.trim()) {
            blocks.push({ type: "tool_use", id: part.id, name: part.name, input: part.input });
          }
        }
      }
    } else if (msg.content) {
      const text = typeof msg.content === "string" ? msg.content : extractTextContent(msg.content);
      if (text) {
        blocks.push({ type: "text", text });
      }
    }

    if (msg.tool_calls && Array.isArray(msg.tool_calls)) {
      for (const tc of msg.tool_calls) {
        if (tc.type === "function") {
          // CRITICAL: Skip tool_calls with empty function name (causes Claude 400 error)
          const fnName = tc.function?.name;
          if (!fnName || !fnName.trim()) continue;

          // Apply prefix to tool name (skip if disabled)
          const toolName = disableToolPrefix ? fnName : CLAUDE_OAUTH_TOOL_PREFIX + fnName;
          blocks.push({
            type: "tool_use",
            id: tc.id,
            name: toolName,
            input: tryParseJSON(tc.function.arguments),
          });
        }
      }
    }
  }

  return blocks;
}

// Convert OpenAI tool choice to Claude format
function convertOpenAIToolChoice(choice) {
  if (!choice) return { type: "auto" };
  if (typeof choice === "object" && choice.type) return choice;
  if (choice === "auto" || choice === "none") return { type: "auto" };
  if (choice === "required") return { type: CLAUDE_TOOL_CHOICE_REQUIRED };
  if (typeof choice === "object" && choice.function) {
    return { type: "tool", name: choice.function.name };
  }
  return { type: "auto" };
}

// Extract text from content
function extractTextContent(content) {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("\n");
  }
  return "";
}

// Try parse JSON
function tryParseJSON(str) {
  if (typeof str !== "string") return str;
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}

// OpenAI -> Claude format for Antigravity (without system prompt modifications)
function openaiToClaudeRequestForAntigravity(model, body, stream) {
  const result = openaiToClaudeRequest(model, body, stream);

  // Remove Claude Code system prompt, keep only user's system messages
  if (result.system && Array.isArray(result.system)) {
    result.system = result.system.filter(
      (block) => !block.text || !block.text.includes("You are Claude Code")
    );
    if (result.system.length === 0) {
      delete result.system;
    }
  }

  // Strip prefix from tool names for Antigravity (doesn't use Claude OAuth)
  if (result.tools && Array.isArray(result.tools)) {
    result.tools = result.tools.map((tool) => {
      if (tool.name && tool.name.startsWith(CLAUDE_OAUTH_TOOL_PREFIX)) {
        return {
          ...tool,
          name: tool.name.slice(CLAUDE_OAUTH_TOOL_PREFIX.length),
        };
      }
      return tool;
    });
  }

  // Strip prefix from tool_use in messages
  if (result.messages && Array.isArray(result.messages)) {
    result.messages = result.messages.map((msg) => {
      if (!msg.content || !Array.isArray(msg.content)) {
        return msg;
      }

      const updatedContent = msg.content.map((block) => {
        const blockType = typeof block.type === "string" ? block.type : "";
        const blockName = typeof block.name === "string" ? block.name : "";
        if (
          blockType === "tool_use" &&
          blockName &&
          blockName.startsWith(CLAUDE_OAUTH_TOOL_PREFIX)
        ) {
          return {
            ...block,
            name: blockName.slice(CLAUDE_OAUTH_TOOL_PREFIX.length),
          };
        }
        return block;
      });

      return { ...msg, content: updatedContent };
    });
  }

  return result;
}

// Export for use in other translators
export { openaiToClaudeRequestForAntigravity };

// Register
register(FORMATS.OPENAI, FORMATS.CLAUDE, openaiToClaudeRequest, null);
