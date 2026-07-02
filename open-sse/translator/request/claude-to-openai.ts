import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { adjustMaxTokens } from "../helpers/maxTokensHelper.ts";

type JsonRecord = Record<string, unknown>;
const TOOL_CHOICE_ANY = ["a", "n", "y"].join("");

/**
 * Port of decolua/9router commit 0aaa5ab3 (closes prompt-cache instability):
 * Anthropic injects a dynamic `x-anthropic-billing-header: <value>` line at
 * the top of some system prompts. When we translate Claude → OpenAI and
 * forward to a non-Anthropic upstream, that line both leaks into the
 * assistant prompt and rotates per request, destroying prompt-cache hits.
 * Strip it from each system entry before assembling the OpenAI request.
 */
function stripAnthropicBillingHeader(text: unknown): string {
  if (typeof text !== "string") return "";
  return text.replace(/^x-anthropic-billing-header:[^\n]*(?:\r?\n)?/i, "");
}

/**
 * Normalize tool input schema for OpenAI compatibility.
 * OpenAI strict mode requires `properties: {}` on object-type schemas,
 * even for zero-argument tools. Anthropic/MCP tools may omit it (#1898).
 */
function normalizeToolSchema(schema: unknown): Record<string, unknown> {
  const fallback = { type: "object", properties: {} };
  if (!schema || typeof schema !== "object" || Array.isArray(schema)) return fallback;
  const s = schema as Record<string, unknown>;
  if (s.type === "object" && !s.properties) {
    return { ...s, properties: {} };
  }
  return s;
}

function normalizeOpenAIReasoningEffort(effort: unknown): string | undefined {
  if (typeof effort !== "string") return undefined;
  const normalized = effort.toLowerCase();
  if (normalized === "max") return "xhigh";
  return normalized || undefined;
}

function isClaudeServerWebSearchTool(tool: unknown): tool is JsonRecord {
  if (!tool || typeof tool !== "object" || Array.isArray(tool)) return false;
  const record = tool as JsonRecord;
  return (
    record.name === "web_search" &&
    typeof record.type === "string" &&
    /^web_search_\d{8}$/.test(record.type)
  );
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function convertClaudeServerWebSearchTool(tool: JsonRecord): JsonRecord {
  const allowedDomains = toStringArray(tool.allowed_domains);
  const blockedDomains = toStringArray(tool.blocked_domains);
  const filters: JsonRecord = {};
  if (allowedDomains.length > 0) filters.allowed_domains = allowedDomains;
  if (blockedDomains.length > 0) filters.blocked_domains = blockedDomains;

  return {
    type: "web_search",
    ...(Object.keys(filters).length > 0 ? { filters } : {}),
    ...(tool.user_location &&
    typeof tool.user_location === "object" &&
    !Array.isArray(tool.user_location)
      ? { user_location: tool.user_location }
      : {}),
  };
}

function hasClaudeServerWebSearchTool(tools: unknown): boolean {
  return Array.isArray(tools) && tools.some((tool) => isClaudeServerWebSearchTool(tool));
}

function shouldUseNativeResponsesWebSearch(credentials: unknown): boolean {
  return (
    credentials !== null &&
    typeof credentials === "object" &&
    !Array.isArray(credentials) &&
    (credentials as JsonRecord)._targetFormat === FORMATS.OPENAI_RESPONSES
  );
}

// Convert Claude request to OpenAI format
export function claudeToOpenAIRequest(model, body, stream, credentials: unknown = null) {
  // #2069 — when the routed provider honors OpenAI-format cache_control breakpoints
  // (DashScope/alibaba, etc.) and the upstream caller requested preservation, keep
  // the client's cache_control markers on system + message text blocks instead of
  // collapsing them away during the Claude→OpenAI conversion.
  const preserveCacheControl =
    credentials !== null &&
    typeof credentials === "object" &&
    !Array.isArray(credentials) &&
    (credentials as JsonRecord)._preserveCacheControl === true;

  const result: {
    model: string;
    messages: JsonRecord[];
    stream: unknown;
    [key: string]: unknown;
  } = {
    model: model,
    messages: [],
    stream: stream,
  };

  // Max tokens
  if (body.max_tokens) {
    result.max_tokens = adjustMaxTokens(body);
  }

  // Temperature
  if (body.temperature !== undefined) {
    result.temperature = body.temperature;
  }
  if (body.top_p !== undefined) {
    result.top_p = body.top_p;
  }
  if (body.stop_sequences !== undefined) {
    result.stop = body.stop_sequences;
  }

  // System message
  if (body.system) {
    // When preserving cache_control for a caching-capable provider, and the client
    // tagged any system block, keep the array-of-blocks shape so the breakpoint
    // survives (DashScope reads cache_control off content blocks). Otherwise fall
    // back to the joined-string form expected by generic OpenAI providers (#2069).
    const systemHasCacheControl =
      preserveCacheControl &&
      Array.isArray(body.system) &&
      body.system.some((s) => s && typeof s === "object" && s.cache_control !== undefined);

    const systemContent = systemHasCacheControl
      ? body.system.map((s) => {
          // body.system may be a mixed array — handle string elements (and
          // null/non-object) defensively so we never drop text or throw.
          if (typeof s === "string") return { type: "text", text: stripAnthropicBillingHeader(s) };
          const rawText = s && typeof s === "object" ? (s as JsonRecord).text || "" : "";
          const block: JsonRecord = { type: "text", text: stripAnthropicBillingHeader(rawText) };
          if (s && typeof s === "object" && (s as JsonRecord).cache_control !== undefined) {
            block.cache_control = (s as JsonRecord).cache_control;
          }
          return block;
        })
      : Array.isArray(body.system)
        ? body.system
            .map((s) => stripAnthropicBillingHeader(s.text || ""))
            .filter(Boolean)
            .join("\n")
        : stripAnthropicBillingHeader(body.system);

    if (systemHasCacheControl || systemContent) {
      result.messages.push({
        role: "system",
        content: systemContent,
      });
    }
  }

  // Convert messages
  if (body.messages && Array.isArray(body.messages)) {
    for (let i = 0; i < body.messages.length; i++) {
      const msg = body.messages[i];
      const converted = convertClaudeMessage(msg, preserveCacheControl);
      if (converted) {
        // Handle array of messages (multiple tool results)
        if (Array.isArray(converted)) {
          result.messages.push(...converted);
        } else {
          result.messages.push(converted);
        }
      }
    }
  }

  // #4714 / #4385: re-group every role:"tool" message immediately after the
  // assistant turn whose tool_calls issued it (dropping genuine orphans), then
  // fill placeholders for any tool_call left unanswered.
  result.messages = regroupToolMessages(result.messages);

  // Fix missing tool responses - OpenAI requires every tool_call to have a response.
  // Runs after regrouping so real results are already adjacent and only a truly
  // unanswered tool_call receives a "[No response received]" placeholder.
  fixMissingToolResponses(result.messages);

  const useNativeResponsesWebSearch = shouldUseNativeResponsesWebSearch(credentials);

  // Tools
  if (body.tools && Array.isArray(body.tools)) {
    const normalizedTools = body.tools
      .map((tool) => {
        if (useNativeResponsesWebSearch && isClaudeServerWebSearchTool(tool)) {
          return convertClaudeServerWebSearchTool(tool);
        }

        if (!tool || typeof tool !== "object" || Array.isArray(tool)) return null;
        const record = tool as JsonRecord;
        const name = typeof record.name === "string" ? record.name.trim() : "";
        if (!name) return null; // skip tools with empty/invalid name

        return {
          type: "function",
          function: {
            name,
            description: typeof record.description === "string" ? record.description : "", // fix: never null (#276)
            parameters: normalizeToolSchema(record.input_schema),
          },
        };
      })
      .filter((tool): tool is JsonRecord => Boolean(tool));

    if (normalizedTools.length > 0) {
      result.tools = normalizedTools;
    }
  }

  // Tool choice
  if (body.tool_choice) {
    result.tool_choice = convertToolChoice(
      body.tool_choice,
      useNativeResponsesWebSearch && hasClaudeServerWebSearchTool(body.tools)
    );
  }

  // Reasoning effort: map Claude-side thinking controls to OpenAI reasoning_effort.
  // Priority: output_config.effort (Claude Code) > thinking.budget_tokens (Claude native).
  // Budget buckets match the reverse mapping in thinkingBudget.ts::setCustomBudget.
  const outputEffort = normalizeOpenAIReasoningEffort(body.output_config?.effort) || "";
  if (outputEffort) {
    result.reasoning_effort = outputEffort;
  } else if (body.thinking?.type === "enabled" && typeof body.thinking.budget_tokens === "number") {
    const budget = body.thinking.budget_tokens;
    if (budget <= 0) {
      // disabled — leave reasoning_effort unset
    } else if (budget <= 1024) {
      result.reasoning_effort = "low";
    } else if (budget <= 10240) {
      result.reasoning_effort = "medium";
    } else if (budget < 131072) {
      result.reasoning_effort = "high";
    } else {
      result.reasoning_effort = "xhigh";
    }
  }

  return result;
}

// #4714: Re-group tool result messages so every role:"tool" message sits
// immediately after the assistant message whose tool_calls issued it, in
// tool_calls order. Claude Code can issue parallel tool_use in one assistant turn
// but have their tool_result blocks arrive across SEPARATE user turns with
// interleaved text; the naive conversion then left a role:"tool" stranded after a
// user message, which OpenAI-compatible upstreams reject with 400 "Messages with
// role 'tool' must be a response to a preceding message with 'tool_calls'".
// Tool messages whose tool_call_id matches no assistant.tool_calls are dropped here
// (supersedes the standalone #4385 orphan filter — same drop behavior, plus ordering).
function regroupToolMessages(messages: JsonRecord[]): JsonRecord[] {
  // tool_call_id -> index of the assistant message that issued it (first wins).
  const callIdToAssistant = new Map<string, number>();
  messages.forEach((msg, idx) => {
    if (msg.role === "assistant" && Array.isArray(msg.tool_calls)) {
      for (const tc of msg.tool_calls as { id?: string }[]) {
        if (tc.id && !callIdToAssistant.has(String(tc.id))) {
          callIdToAssistant.set(String(tc.id), idx);
        }
      }
    }
  });

  // Collect tool messages per assistant index, keyed by tool_call_id (first result wins).
  const toolsByAssistant = new Map<number, Map<string, JsonRecord>>();
  for (const msg of messages) {
    if (msg.role !== "tool") continue;
    const callId = String(msg.tool_call_id ?? "");
    const assistantIdx = callIdToAssistant.get(callId);
    if (assistantIdx === undefined) continue; // orphan -> drop
    let group = toolsByAssistant.get(assistantIdx);
    if (!group) {
      group = new Map();
      toolsByAssistant.set(assistantIdx, group);
    }
    if (!group.has(callId)) group.set(callId, msg);
  }

  // Rebuild: keep non-tool messages in order; attach each assistant's tool results
  // immediately after it, ordered by the assistant's own tool_calls sequence.
  const out: JsonRecord[] = [];
  messages.forEach((msg, idx) => {
    if (msg.role === "tool") return; // moved into its assistant's group
    out.push(msg);
    if (msg.role === "assistant" && Array.isArray(msg.tool_calls)) {
      const group = toolsByAssistant.get(idx);
      if (group) {
        for (const tc of msg.tool_calls as { id?: string }[]) {
          const tool = tc.id ? group.get(String(tc.id)) : undefined;
          if (tool) out.push(tool);
        }
      }
    }
  });
  return out;
}

// Fix missing tool responses - add empty responses for tool_calls without responses
function fixMissingToolResponses(messages) {
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    if (msg.role === "assistant" && msg.tool_calls && msg.tool_calls.length > 0) {
      const toolCallIds = msg.tool_calls.map((tc) => tc.id);

      // Collect all tool response IDs that IMMEDIATELY follow this assistant message
      const respondedIds = new Set();
      let insertPosition = i + 1;
      for (let j = i + 1; j < messages.length; j++) {
        const nextMsg = messages[j];
        if (nextMsg.role === "tool" && nextMsg.tool_call_id) {
          respondedIds.add(nextMsg.tool_call_id);
          insertPosition = j + 1;
        } else {
          break;
        }
      }

      // Find missing responses and insert them
      const missingIds = toolCallIds.filter((id) => !respondedIds.has(id));

      if (missingIds.length > 0) {
        const missingResponses = missingIds.map((id) => ({
          role: "tool",
          tool_call_id: id,
          content: "[No response received]",
        }));
        messages.splice(insertPosition, 0, ...missingResponses);
        i = insertPosition + missingResponses.length - 1;
      }
    }
  }
}

// Convert single Claude message - returns single message or array of messages
function convertClaudeMessage(msg, preserveCacheControl = false) {
  const role = msg.role === "user" || msg.role === "tool" ? "user" : "assistant";

  // Simple string content
  if (typeof msg.content === "string") {
    return { role, content: msg.content };
  }

  // Array content
  if (Array.isArray(msg.content)) {
    const parts = [];
    const toolCalls = [];
    const toolResults = [];
    let reasoningContent = null;

    for (const block of msg.content) {
      switch (block.type) {
        case "text": {
          const textPart: JsonRecord = { type: "text", text: block.text };
          // #2069 — carry the client's cache_control breakpoint through to
          // caching-capable OpenAI-format providers (DashScope/alibaba, etc.).
          if (preserveCacheControl && block.cache_control !== undefined) {
            textPart.cache_control = block.cache_control;
          }
          parts.push(textPart);
          break;
        }

        case "image":
          if (block.source?.type === "base64") {
            parts.push({
              type: "image_url",
              image_url: {
                url: `data:${block.source.media_type};base64,${block.source.data}`,
              },
            });
          } else if (block.source?.type === "url" && typeof block.source.url === "string") {
            parts.push({
              type: "image_url",
              image_url: {
                url: block.source.url,
              },
            });
          }
          break;

        case "thinking":
          reasoningContent = block.thinking || block.text || "";
          break;

        case "redacted_thinking":
          if (reasoningContent == null) {
            reasoningContent = "";
          }
          break;

        case "tool_use":
          toolCalls.push({
            id: block.id,
            type: "function",
            function: {
              name: block.name,
              arguments:
                typeof block.input === "string"
                  ? block.input
                  : JSON.stringify(block.input || {}),
            },
          });
          break;

        case "tool_result":
          let resultContent = "";
          if (typeof block.content === "string") {
            resultContent = block.content;
          } else if (Array.isArray(block.content)) {
            // Keep text in the tool message; lift any images out as a following user
            // turn (OpenAI `tool` messages can't carry images). Without this, an
            // image-only tool_result is JSON.stringify'd → base64 as text, which
            // causes "input exceeds the context window" errors in OpenAI-protocol
            // upstreams (port of decolua/9router#2123 by alican532).
            const textParts: string[] = [];
            let hasImage = false;
            for (const c of block.content) {
              if (c.type === "text") {
                textParts.push(c.text);
              } else if (c.type === "image" && c.source?.type === "base64") {
                parts.push({
                  type: "image_url",
                  image_url: {
                    url: `data:${c.source.media_type};base64,${c.source.data}`,
                  },
                });
                hasImage = true;
              }
            }
            resultContent =
              textParts.join("\n") ||
              (hasImage ? "[tool returned an image; see attached]" : JSON.stringify(block.content));
          } else if (block.content) {
            resultContent = JSON.stringify(block.content);
          }

          toolResults.push({
            role: "tool",
            tool_call_id: block.tool_use_id,
            content: resultContent,
          });
          break;
      }
    }

    // If has tool results, return array of tool messages
    if (toolResults.length > 0) {
      if (parts.length > 0) {
        const textContent = parts.length === 1 && parts[0].type === "text" ? parts[0].text : parts;
        return [...toolResults, { role: "user", content: textContent }];
      }
      return toolResults;
    }

    // If has tool calls, return assistant message with tool_calls
    if (toolCalls.length > 0) {
      const result: JsonRecord = { role: "assistant" };
      if (parts.length > 0) {
        result.content = parts.length === 1 && parts[0].type === "text" ? parts[0].text : parts;
      }
      result.tool_calls = toolCalls;
      if (reasoningContent !== null) {
        result.reasoning_content = reasoningContent;
      }
      return result;
    }

    // Return content
    if (parts.length > 0) {
      const result: JsonRecord = {
        role,
        content: parts.length === 1 && parts[0].type === "text" ? parts[0].text : parts,
      };
      if (reasoningContent !== null && role === "assistant") {
        result.reasoning_content = reasoningContent;
      }
      return result;
    }

    // Empty content array
    if (msg.content.length === 0) {
      const result: JsonRecord = { role, content: "" };
      if (reasoningContent !== null && role === "assistant") {
        result.reasoning_content = reasoningContent;
      }
      return result;
    }

    if (reasoningContent !== null && role === "assistant") {
      return { role, content: "", reasoning_content: reasoningContent };
    }
  }

  return null;
}

// Convert tool choice
function convertToolChoice(choice, hasServerWebSearch = false) {
  if (!choice) return "auto";
  if (typeof choice === "string") return choice;

  switch (choice.type) {
    case "auto":
      return "auto";
    case TOOL_CHOICE_ANY:
      return "required";
    case "tool":
      if (hasServerWebSearch && choice.name === "web_search") {
        return { type: "web_search" };
      }
      return { type: "function", function: { name: choice.name } };
    default:
      return "auto";
  }
}

// Register
register(FORMATS.CLAUDE, FORMATS.OPENAI, claudeToOpenAIRequest, null);
