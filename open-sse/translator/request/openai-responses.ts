/**
 * Translator: OpenAI Responses API -> OpenAI Chat Completions
 *
 * Responses API uses: { input: [...], instructions: "..." }
 * Chat API uses: { messages: [...] }
 */
import { isOpenAIResponsesStoreEnabled } from "@/lib/providers/requestDefaults";
import { FORMATS } from "../formats.ts";
import { generateToolCallId } from "../helpers/toolCallHelper.ts";
import { register } from "../registry.ts";

type JsonRecord = Record<string, unknown>;
const RESPONSES_STORE_MARKER = "_omnirouteResponsesStore";

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function toString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function normalizeResponsesReasoningEffort(value: unknown): string {
  const effort = toString(value).toLowerCase();
  return effort === "max" ? "xhigh" : effort;
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
  const credentialRecord = toRecord(credentials);
  const storeEnabled = isOpenAIResponsesStoreEnabled(credentialRecord.providerSpecificData);

  // Validate tool types — only function tools can be translated to Chat Completions
  const tools = toArray(root.tools);
  if (tools.length > 0) {
    for (const toolValue of tools) {
      const tool = toRecord(toolValue);
      const toolType = toString(tool.type);
      // Allow: function tools, tools already in Chat format (have .function property), CLI subagent tools,
      // and namespace tools (MCP tool groups used by Codex/OpenAI Responses API).
      if (
        toolType &&
        toolType !== "function" &&
        toolType !== "custom" &&
        toolType !== "command" &&
        toolType !== "namespace" &&
        !tool.function
      ) {
        throw unsupportedFeature(
          `Unsupported Responses API feature: ${toolType} tool type is not supported by omniroute`
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
            if (contentItem.type === "input_image") {
              const imgResult: JsonRecord = {
                type: "image_url",
                image_url: { url: toString(contentItem.image_url) },
              };
              if (contentItem.detail !== undefined) {
                (imgResult.image_url as JsonRecord).detail = contentItem.detail;
              }
              return imgResult;
            }
            if (contentItem.type === "input_file") {
              const fileObj: JsonRecord = {};
              if (contentItem.file_data !== undefined) fileObj.file_data = contentItem.file_data;
              if (contentItem.file_id !== undefined) fileObj.file_id = contentItem.file_id;
              if (contentItem.file_url !== undefined) fileObj.file_url = contentItem.file_url;
              if (contentItem.filename !== undefined) fileObj.filename = contentItem.filename;
              return { type: "file", file: fileObj };
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
          arguments:
            typeof item.arguments === "string"
              ? item.arguments
              : JSON.stringify(item.arguments ?? {}),
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

  // Translate tool_choice object format: Responses {type,name} → Chat {type,function:{name}}
  if (
    result.tool_choice &&
    typeof result.tool_choice === "object" &&
    !Array.isArray(result.tool_choice)
  ) {
    const tc = toRecord(result.tool_choice);
    const tcType = toString(tc.type);
    if (tcType === "function" && tc.name !== undefined && !tc.function) {
      result.tool_choice = { type: "function", function: { name: tc.name } };
    } else if (tcType && tcType !== "function" && tcType !== "allowed_tools") {
      // Built-in tool types (web_search_preview, file_search, etc.) have no Chat equivalent
      throw unsupportedFeature(
        `Unsupported Responses API feature: tool_choice type '${tcType}' is not supported by omniroute`
      );
    }
  }

  // Cleanup Responses API specific fields
  // Note: prompt_cache_key is intentionally preserved — it is used by Codex and other
  // providers as a cache-affinity signal. Stripping it breaks prompt caching (#517).
  delete result.input;
  delete result.instructions;
  delete result.include;
  if (storeEnabled && root.store !== undefined) {
    result[RESPONSES_STORE_MARKER] = root.store;
  }
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

  const root = toRecord(body);
  const credentialRecord = toRecord(credentials);
  const storeEnabled = isOpenAIResponsesStoreEnabled(credentialRecord.providerSpecificData);
  const result: JsonRecord = {
    model,
    input: [],
    stream: true,
  };
  if (!storeEnabled) {
    result.store = false;
  }

  const input = result.input as JsonRecord[];

  // Extract first system message as instructions
  let hasSystemMessage = false;
  const messages = toArray(root.messages);

  for (const messageValue of messages) {
    const msg = toRecord(messageValue);
    const role = toString(msg.role);

    if (role === "system" || role === "developer") {
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
                  const imgUrl = contentItem.image_url as
                    | string
                    | { url?: string; detail?: string };
                  const imgResult: JsonRecord = {
                    type: "input_image",
                    image_url: typeof imgUrl === "string" ? imgUrl : imgUrl?.url || "",
                  };
                  if (typeof imgUrl === "object" && imgUrl?.detail !== undefined) {
                    imgResult.detail = imgUrl.detail;
                  }
                  return imgResult;
                }
                if (contentItem.type === "file") {
                  const file = toRecord(contentItem.file);
                  const fileResult: JsonRecord = { type: "input_file" };
                  if (file.file_data !== undefined) fileResult.file_data = file.file_data;
                  if (file.file_id !== undefined) fileResult.file_id = file.file_id;
                  if (file.file_url !== undefined) fileResult.file_url = file.file_url;
                  if (file.filename !== undefined) fileResult.filename = file.filename;
                  return fileResult;
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
          if (contentItem.type === "text") {
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

      // Handle deprecated function_call field (pre-tool_calls API)
      if (msg.function_call && !msg.tool_calls) {
        const fc = toRecord(msg.function_call);
        const fnName = toString(fc.name).trim();
        if (fnName) {
          input.push({
            type: "function_call",
            call_id: `call_${fnName}`,
            name: fnName,
            arguments: toString(fc.arguments, "{}"),
          });
        }
      }
    }

    // Convert tool results
    if (role === "tool") {
      input.push({
        type: "function_call_output",
        call_id: toString(msg.tool_call_id),
        output:
          typeof msg.content === "string"
            ? msg.content
            : Array.isArray(msg.content)
              ? msg.content.map((c) => {
                  const part = toRecord(c);
                  if (part.type === "text")
                    return { type: "input_text", text: toString(part.text) };
                  return c;
                })
              : String(msg.content ?? ""),
      });
    }

    // Handle deprecated function role messages
    if (role === "function") {
      input.push({
        type: "function_call_output",
        call_id: `call_${toString(msg.name)}`,
        output: typeof msg.content === "string" ? msg.content : String(msg.content ?? ""),
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

  // Translate tool_choice: Chat {type,function:{name}} → Responses {type,name}
  if (root.tool_choice !== undefined) {
    if (typeof root.tool_choice === "string") {
      result.tool_choice = root.tool_choice;
    } else if (typeof root.tool_choice === "object" && !Array.isArray(root.tool_choice)) {
      const tc = toRecord(root.tool_choice);
      if (tc.type === "function" && tc.function) {
        const fn = toRecord(tc.function);
        result.tool_choice = { type: "function", name: fn.name };
      } else {
        result.tool_choice = root.tool_choice;
      }
    } else {
      result.tool_choice = root.tool_choice;
    }
  }

  // Pass through relevant fields
  if (root.previous_response_id !== undefined) {
    result.previous_response_id = root.previous_response_id;
  }
  if (root.prompt_cache_key !== undefined) {
    result.prompt_cache_key = root.prompt_cache_key;
  }
  if (root.session_id !== undefined) {
    result.session_id = root.session_id;
  }
  if (root.conversation_id !== undefined) {
    result.conversation_id = root.conversation_id;
  }
  if (root.service_tier !== undefined) result.service_tier = root.service_tier;
  if (root.temperature !== undefined) result.temperature = root.temperature;
  // Translate max_tokens / max_completion_tokens → max_output_tokens for Responses API.
  // The Responses API does not accept max_tokens or max_completion_tokens; it requires
  // max_output_tokens. max_completion_tokens takes priority as the newer Chat Completions field.
  if (root.max_completion_tokens !== undefined) {
    result.max_output_tokens = root.max_completion_tokens;
  } else if (root.max_tokens !== undefined) {
    result.max_output_tokens = root.max_tokens;
  }
  if (root.top_p !== undefined) result.top_p = root.top_p;
  if (root.reasoning !== undefined) {
    result.reasoning = root.reasoning;
  } else if (root.reasoning_effort !== undefined) {
    const effort = normalizeResponsesReasoningEffort(root.reasoning_effort);
    if (effort) {
      result.reasoning = { effort };
    }
  }
  if (storeEnabled) {
    if (root[RESPONSES_STORE_MARKER] !== undefined) {
      result.store = root[RESPONSES_STORE_MARKER];
    } else if (root.store !== undefined) {
      result.store = root.store;
    }
  }

  return result;
}

// Register both directions
register(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, openaiResponsesToOpenAIRequest, null);
register(FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES, openaiToOpenAIResponsesRequest, null);
