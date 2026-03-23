/**
 * Translator: OpenAI Responses API -> OpenAI Chat Completions
 *
 * Responses API uses: { input: [...], instructions: "..." }
 * Chat API uses: { messages: [...] }
 */
import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import { generateToolCallId } from "../helpers/toolCallHelper.ts";

type JsonRecord = Record<string, unknown>;

const UNSUPPORTED_TOOLS = ["file_search", "code_interpreter", "web_search_preview"];

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function toString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function unsupportedFeature(message: string): Error & { statusCode: number; errorType: string } {
  const error = new Error(message) as Error & { statusCode: number; errorType: string };
  error.statusCode = 400;
  error.errorType = "unsupported_feature";
  return error;
}

/**
 * Convert OpenAI Responses API request to OpenAI Chat Completions format
 */
export function openaiResponsesToOpenAIRequest(
  model: unknown,
  body: unknown,
  stream: unknown,
  credentials: unknown
): unknown {
  void model;
  void stream;
  void credentials;

  const root = toRecord(body);
  if (root.input === undefined) return body;

  // Validate unsupported features - return clear errors instead of silent failure
  const tools = toArray(root.tools);
  if (tools.length > 0) {
    for (const toolValue of tools) {
      const tool = toRecord(toolValue);
      if (UNSUPPORTED_TOOLS.includes(toString(tool.type))) {
        throw unsupportedFeature(
          `Unsupported Responses API feature: ${toString(tool.type)} tool type is not supported by omniroute`
        );
      }
    }
  }

  if (root.background) {
    throw unsupportedFeature(
      "Unsupported Responses API feature: background mode is not supported by omniroute"
    );
  }

  const result: JsonRecord = { ...root };
  const messages: JsonRecord[] = [];
  result.messages = messages;

  // Convert instructions to system message
  if (typeof root.instructions === "string" && root.instructions.length > 0) {
    messages.push({ role: "system", content: root.instructions });
  }

  // Group items by conversation turn
  let currentAssistantMsg: JsonRecord | null = null;
  let pendingToolResults: JsonRecord[] = [];

  const inputItems = toArray(root.input);
  for (const itemValue of inputItems) {
    const item = toRecord(itemValue);

    // Determine item type - Droid CLI sends role-based items without 'type' field
    // Fallback: if no type but has role property, treat as message
    const itemType = toString(item.type) || (item.role ? "message" : "");

    if (itemType === "message") {
      // Flush pending assistant message with tool calls
      if (currentAssistantMsg) {
        messages.push(currentAssistantMsg);
        currentAssistantMsg = null;
      }

      // Flush pending tool results
      if (pendingToolResults.length > 0) {
        for (const toolResult of pendingToolResults) {
          messages.push(toolResult);
        }
        pendingToolResults = [];
      }

      // Convert content: input_text -> text, output_text -> text
      const content = Array.isArray(item.content)
        ? item.content.map((contentValue) => {
            const contentItem = toRecord(contentValue);
            if (contentItem.type === "input_text") {
              return { type: "text", text: toString(contentItem.text) };
            }
            if (contentItem.type === "output_text") {
              return { type: "text", text: toString(contentItem.text) };
            }
            return contentValue;
          })
        : item.content;

      messages.push({ role: toString(item.role), content });
      continue;
    }

    if (itemType === "function_call") {
      // Skip tool calls with empty names to avoid infinite placeholder_tool loops
      const fnName = toString(item.name).trim();
      if (!fnName) {
        continue;
      }

      // Start or append assistant message with tool_calls
      if (!currentAssistantMsg) {
        currentAssistantMsg = {
          role: "assistant",
          content: null,
          tool_calls: [],
        };
      }

      const toolCalls = Array.isArray(currentAssistantMsg.tool_calls)
        ? currentAssistantMsg.tool_calls
        : [];
      toolCalls.push({
        id: toString(item.call_id),
        type: "function",
        function: {
          name: fnName,
          arguments: item.arguments,
        },
      });
      currentAssistantMsg.tool_calls = toolCalls;
      continue;
    }

    if (itemType === "function_call_output") {
      // Flush assistant message first if present
      if (currentAssistantMsg) {
        messages.push(currentAssistantMsg);
        currentAssistantMsg = null;
      }

      // Flush pending tool results first
      if (pendingToolResults.length > 0) {
        for (const toolResult of pendingToolResults) {
          messages.push(toolResult);
        }
        pendingToolResults = [];
      }

      // Add tool result immediately
      messages.push({
        role: "tool",
        tool_call_id: toString(item.call_id),
        content: typeof item.output === "string" ? item.output : JSON.stringify(item.output),
      });
      continue;
    }

    if (itemType === "reasoning") {
      // Skip reasoning items - they are display-only metadata
      continue;
    }
  }

  // Flush remainder
  if (currentAssistantMsg) {
    messages.push(currentAssistantMsg);
  }
  if (pendingToolResults.length > 0) {
    for (const toolResult of pendingToolResults) {
      messages.push(toolResult);
    }
  }

  // Convert tools format
  if (Array.isArray(root.tools)) {
    result.tools = root.tools.map((toolValue) => {
      const tool = toRecord(toolValue);
      if (tool.function) return toolValue;
      return {
        type: "function",
        function: {
          name: toString(tool.name),
          description: toString(tool.description),
          parameters: tool.parameters,
          strict: tool.strict,
        },
      };
    });
  }

  // Filter orphaned tool results (no matching tool_call in assistant messages)
  const allToolCallIds = new Set<string>();
  for (const m of messages) {
    const rec = toRecord(m);
    if (Array.isArray(rec.tool_calls)) {
      for (const tc of rec.tool_calls as { id?: string }[]) {
        if (tc.id) allToolCallIds.add(String(tc.id));
      }
    }
  }
  result.messages = messages.filter((m) => {
    const rec = toRecord(m);
    if (rec.role === "tool" && rec.tool_call_id) {
      return allToolCallIds.has(String(rec.tool_call_id));
    }
    return true;
  });

  // Cleanup Responses API specific fields
  // Note: prompt_cache_key is intentionally preserved — it is used by Codex and other
  // providers as a cache-affinity signal. Stripping it breaks prompt caching (#517).
  delete result.input;
  delete result.instructions;
  delete result.include;
  delete result.store;
  delete result.reasoning;

  return result;
}

/**
 * Convert OpenAI Chat Completions to OpenAI Responses API format
 */
export function openaiToOpenAIResponsesRequest(
  model: unknown,
  body: unknown,
  stream: unknown,
  credentials: unknown
): unknown {
  void stream;
  void credentials;

  const root = toRecord(body);
  const result: JsonRecord = {
    model,
    input: [],
    stream: true,
    store: false,
  };

  const input = result.input as JsonRecord[];

  // Extract first system message as instructions
  let hasSystemMessage = false;
  const messages = toArray(root.messages);

  for (const messageValue of messages) {
    const msg = toRecord(messageValue);
    const role = toString(msg.role);

    if (role === "system") {
      if (!hasSystemMessage) {
        result.instructions = typeof msg.content === "string" ? msg.content : "";
        hasSystemMessage = true;
      }
      continue;
    }

    // Convert user messages
    if (role === "user") {
      const content =
        typeof msg.content === "string"
          ? [{ type: "input_text", text: msg.content }]
          : Array.isArray(msg.content)
            ? msg.content.map((contentValue) => {
                const contentItem = toRecord(contentValue);
                if (contentItem.type === "text") {
                  return { type: "input_text", text: toString(contentItem.text) };
                }
                if (contentItem.type === "image_url") {
                  const imgUrl = contentItem.image_url as string | { url?: string };
                  return {
                    type: "input_image",
                    image_url: typeof imgUrl === "string" ? imgUrl : imgUrl?.url || "",
                  };
                }
                return contentValue;
              })
            : [{ type: "input_text", text: "" }];

      input.push({
        type: "message",
        role: "user",
        content,
      });
    }

    // Convert assistant messages
    if (role === "assistant") {
      // Skip reasoning_content — OpenAI Responses API requires server-generated
      // rs_* IDs for reasoning items. Synthesizing client-side IDs (e.g. reasoning_N)
      // causes 400 errors from Responses-compatible upstreams. (#224)

      // Skip thinking blocks in array content — same rs_* ID constraint applies

      // Build assistant output content
      const outputContent: unknown[] = [];
      if (typeof msg.content === "string" && msg.content) {
        outputContent.push({ type: "output_text", text: msg.content });
      } else if (Array.isArray(msg.content)) {
        for (const contentValue of msg.content) {
          const contentItem = toRecord(contentValue);
          if (contentItem.type === "text" && contentItem.text) {
            outputContent.push({ type: "output_text", text: toString(contentItem.text) });
          } else if (contentItem.type === "thinking" || contentItem.type === "redacted_thinking") {
            // Reasoning already moved above
            continue;
          } else {
            outputContent.push(contentValue);
          }
        }
      }

      // Only add assistant message if content exists
      if (outputContent.length > 0) {
        input.push({
          type: "message",
          role: "assistant",
          content: outputContent,
        });
      }

      // Convert tool_calls to function_call items
      if (Array.isArray(msg.tool_calls)) {
        for (const toolCallValue of msg.tool_calls) {
          const toolCall = toRecord(toolCallValue);
          const fn = toRecord(toolCall.function);
          // Skip tool calls with empty names to avoid infinite placeholder_tool loops
          const fnName = toString(fn.name).trim();
          if (!fnName) {
            continue;
          }
          input.push({
            type: "function_call",
            call_id: toString(toolCall.id).trim() || generateToolCallId(),
            name: fnName,
            arguments: toString(fn.arguments, "{}"),
          });
        }
      }
    }

    // Convert tool results
    if (role === "tool") {
      input.push({
        type: "function_call_output",
        call_id: toString(msg.tool_call_id),
        output: msg.content,
      });
    }
  }

  // Filter orphaned function_call_output items (no matching function_call)
  // This happens when Claude Code compaction removes messages but leaves tool results
  const knownCallIds = new Set(
    input
      .filter(
        (item: { type?: string; call_id?: string }) => item.type === "function_call" && item.call_id
      )
      .map((item: { type?: string; call_id?: string }) => item.call_id)
  );
  result.input = input.filter((item: { type?: string; call_id?: string }) => {
    if (item.type === "function_call_output" && item.call_id) {
      return knownCallIds.has(item.call_id);
    }
    return true;
  });

  // If no system message, keep empty instructions
  if (!hasSystemMessage) {
    result.instructions = "";
  }

  // Convert tools format
  if (Array.isArray(root.tools)) {
    result.tools = root.tools.map((toolValue) => {
      const tool = toRecord(toolValue);
      if (tool.type === "function") {
        const fn = toRecord(tool.function);
        return {
          type: "function",
          name: toString(fn.name),
          description: toString(fn.description),
          parameters: fn.parameters,
          strict: fn.strict,
        };
      }
      return toolValue;
    });
  }

  // Pass through relevant fields
  if (root.service_tier !== undefined) result.service_tier = root.service_tier;
  if (root.temperature !== undefined) result.temperature = root.temperature;
  if (root.max_tokens !== undefined) result.max_tokens = root.max_tokens;
  if (root.top_p !== undefined) result.top_p = root.top_p;

  return result;
}

// Register both directions
register(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, openaiResponsesToOpenAIRequest, null);
register(FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES, openaiToOpenAIResponsesRequest, null);
