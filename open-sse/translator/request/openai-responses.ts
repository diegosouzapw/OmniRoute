/**
 * Translator: OpenAI Responses API → OpenAI Chat Completions
 *
 * Responses API uses: { input: [...], instructions: "..." }
 * Chat API uses: { messages: [...] }
 */
import { register } from "../index.ts";
import { FORMATS } from "../formats.ts";

/**
 * Convert OpenAI Responses API request to OpenAI Chat Completions format
 */
export function openaiResponsesToOpenAIRequest(model, body, stream, credentials) {
  if (!body.input) return body;

  // Validate unsupported features — return clear errors instead of silent failure
  const UNSUPPORTED_TOOLS = ["file_search", "code_interpreter", "web_search_preview"];
  if (body.tools?.length) {
    for (const tool of body.tools) {
      if (UNSUPPORTED_TOOLS.includes(tool.type)) {
        const error = new Error(
          `Unsupported Responses API feature: ${tool.type} tool type is not supported by omniroute`
        );
        (error as any).statusCode = 400;
        (error as any).errorType = "unsupported_feature";
        throw error;
      }
    }
  }
  if (body.background) {
    const error = new Error(
      "Unsupported Responses API feature: background mode is not supported by omniroute"
    );
    (error as any).statusCode = 400;
    (error as any).errorType = "unsupported_feature";
    throw error;
  }

  const result: Record<string, any> = { ...body };
  result.messages = [];

  // Convert instructions to system message
  if (body.instructions) {
    result.messages.push({ role: "system", content: body.instructions });
  }

  // Group items by conversation turn
  let currentAssistantMsg = null;
  let pendingToolResults = [];

  for (const item of body.input) {
    // Determine item type - Droid CLI sends role-based items without 'type' field
    // Fallback: if no type but has role property, treat as message
    const itemType = item.type || (item.role ? "message" : null);

    if (itemType === "message") {
      // Flush any pending assistant message with tool calls
      if (currentAssistantMsg) {
        result.messages.push(currentAssistantMsg);
        currentAssistantMsg = null;
      }
      // Flush pending tool results
      if (pendingToolResults.length > 0) {
        for (const tr of pendingToolResults) {
          result.messages.push(tr);
        }
        pendingToolResults = [];
      }

      // Convert content: input_text → text, output_text → text
      const content = Array.isArray(item.content)
        ? item.content.map((c) => {
            if (c.type === "input_text") return { type: "text", text: c.text };
            if (c.type === "output_text") return { type: "text", text: c.text };
            return c;
          })
        : item.content;
      result.messages.push({ role: item.role, content });
    } else if (itemType === "function_call") {
      // Start or append to assistant message with tool_calls
      if (!currentAssistantMsg) {
        currentAssistantMsg = {
          role: "assistant",
          content: null,
          tool_calls: [],
        };
      }
      currentAssistantMsg.tool_calls.push({
        id: item.call_id,
        type: "function",
        function: {
          name: item.name,
          arguments: item.arguments,
        },
      });
    } else if (itemType === "function_call_output") {
      // Flush assistant message first if exists
      if (currentAssistantMsg) {
        result.messages.push(currentAssistantMsg);
        currentAssistantMsg = null;
      }
      // Flush any pending tool results first
      if (pendingToolResults.length > 0) {
        for (const tr of pendingToolResults) {
          result.messages.push(tr);
        }
        pendingToolResults = [];
      }
      // Add tool result immediately
      result.messages.push({
        role: "tool",
        tool_call_id: item.call_id,
        content: typeof item.output === "string" ? item.output : JSON.stringify(item.output),
      });
    } else if (itemType === "reasoning") {
      // Skip reasoning items - they are for display only
      continue;
    }
  }

  // Flush remaining
  if (currentAssistantMsg) {
    result.messages.push(currentAssistantMsg);
  }
  if (pendingToolResults.length > 0) {
    for (const tr of pendingToolResults) {
      result.messages.push(tr);
    }
  }

  // Convert tools format
  if (body.tools && Array.isArray(body.tools)) {
    result.tools = body.tools.map((tool) => {
      if (tool.function) return tool;
      return {
        type: "function",
        function: {
          name: tool.name,
          description: tool.description,
          parameters: tool.parameters,
          strict: tool.strict,
        },
      };
    });
  }

  // Cleanup Responses API specific fields
  delete result.input;
  delete result.instructions;
  delete result.include;
  delete result.prompt_cache_key;
  delete result.store;
  delete result.reasoning;

  return result;
}

/**
 * Convert OpenAI Chat Completions to OpenAI Responses API format
 */
export function openaiToOpenAIResponsesRequest(model, body, stream, credentials) {
  const result: Record<string, any> = {
    model,
    input: [],
    stream: true,
    store: false,
  };

  // Extract system message as instructions
  let hasSystemMessage = false;
  const messages = body.messages || [];

  for (const msg of messages) {
    if (msg.role === "system") {
      // Use first system message as instructions
      if (!hasSystemMessage) {
        result.instructions = typeof msg.content === "string" ? msg.content : "";
        hasSystemMessage = true;
      }
      continue; // Skip system messages in input
    }

    // Convert user messages
    if (msg.role === "user") {
      const content =
        typeof msg.content === "string"
          ? [{ type: "input_text", text: msg.content }]
          : Array.isArray(msg.content)
            ? msg.content.map((c) => {
                if (c.type === "text") return { type: "input_text", text: c.text };
                if (c.type === "image_url") return c; // Pass through image content
                return c;
              })
            : [{ type: "input_text", text: "" }];

      result.input.push({
        type: "message",
        role: "user",
        content,
      });
    }

    // Convert assistant messages
    if (msg.role === "assistant") {
      // Add reasoning/thinking content BEFORE the assistant output
      if (msg.reasoning_content) {
        result.input.push({
          type: "reasoning",
          id: `reasoning_${result.input.length}`,
          summary: [{ type: "summary_text", text: msg.reasoning_content }],
        });
      }

      // Handle thinking blocks in array content
      if (Array.isArray(msg.content)) {
        for (const block of msg.content) {
          if (block.type === "thinking" || block.type === "redacted_thinking") {
            result.input.push({
              type: "reasoning",
              id: `reasoning_${result.input.length}`,
              summary: [{ type: "summary_text", text: block.thinking || block.data || "..." }],
            });
          }
        }
      }

      // Build the assistant output content
      const outputContent = [];
      if (typeof msg.content === "string" && msg.content) {
        outputContent.push({ type: "output_text", text: msg.content });
      } else if (Array.isArray(msg.content)) {
        for (const c of msg.content) {
          if (c.type === "text" && c.text) {
            outputContent.push({ type: "output_text", text: c.text });
          } else if (c.type === "thinking" || c.type === "redacted_thinking") {
            // Already handled above as reasoning items
            continue;
          } else if (c.type !== "thinking" && c.type !== "redacted_thinking") {
            outputContent.push(c);
          }
        }
      }

      // Only add the assistant message if there's actual content
      if (outputContent.length > 0) {
        result.input.push({
          type: "message",
          role: "assistant",
          content: outputContent,
        });
      }

      // Convert tool_calls to function_call items
      if (msg.tool_calls && Array.isArray(msg.tool_calls)) {
        for (const tc of msg.tool_calls) {
          result.input.push({
            type: "function_call",
            call_id: tc.id,
            name: tc.function?.name || "",
            arguments: tc.function?.arguments || "{}",
          });
        }
      }
    }

    // Convert tool results
    if (msg.role === "tool") {
      result.input.push({
        type: "function_call_output",
        call_id: msg.tool_call_id,
        output: msg.content,
      });
    }
  }

  // If no system message, leave instructions empty
  if (!hasSystemMessage) {
    result.instructions = "";
  }

  // Convert tools format
  if (body.tools && Array.isArray(body.tools)) {
    result.tools = body.tools.map((tool) => {
      if (tool.type === "function") {
        return {
          type: "function",
          name: tool.function.name,
          description: tool.function.description,
          parameters: tool.function.parameters,
          strict: tool.function.strict,
        };
      }
      return tool;
    });
  }

  // Pass through other relevant fields
  if (body.temperature !== undefined) result.temperature = body.temperature;
  if (body.max_tokens !== undefined) result.max_tokens = body.max_tokens;
  if (body.top_p !== undefined) result.top_p = body.top_p;

  return result;
}

// Register both directions
register(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, openaiResponsesToOpenAIRequest, null);
register(FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES, openaiToOpenAIResponsesRequest, null);
