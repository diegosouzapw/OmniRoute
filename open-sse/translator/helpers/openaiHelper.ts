// OpenAI helper functions for translator

// Valid OpenAI content block types
export const VALID_OPENAI_CONTENT_TYPES = ["text", "image_url", "image"];
export const VALID_OPENAI_MESSAGE_TYPES = [
  "text",
  "image_url",
  "image",
  "tool_calls",
  "tool_result",
];

// Filter messages to OpenAI standard format
// Remove: redacted_thinking, and other non-OpenAI blocks
// Convert: thinking blocks → reasoning_content on the message
export function filterToOpenAIFormat(body) {
  if (!body.messages || !Array.isArray(body.messages)) return body;

  body.messages = body.messages.map((msg) => {
    // Keep tool messages as-is (OpenAI format)
    if (msg.role === "tool") return msg;

    // Keep assistant messages with tool_calls as-is
    if (msg.role === "assistant" && msg.tool_calls) return msg;

    // Handle string content
    if (typeof msg.content === "string") return msg;

    // Handle array content
    if (Array.isArray(msg.content)) {
      const filteredContent = [];
      let thinkingText = null;

      for (const block of msg.content) {
        // Extract thinking blocks as reasoning_content (OpenAI extended thinking)
        if (block.type === "thinking") {
          thinkingText = block.thinking || block.text || "";
          continue;
        }
        // Skip redacted thinking
        if (block.type === "redacted_thinking") continue;

        // Only keep valid OpenAI content types
        if (VALID_OPENAI_CONTENT_TYPES.includes(block.type)) {
          // Remove signature and cache_control fields
          const { signature, cache_control, ...cleanBlock } = block;
          filteredContent.push(cleanBlock);
        } else if (block.type === "tool_use") {
          // Convert tool_use to tool_calls format (handled separately)
          continue;
        } else if (block.type === "tool_result") {
          // Keep tool_result but clean it
          const { signature, cache_control, ...cleanBlock } = block;
          filteredContent.push(cleanBlock);
        }
      }

      // If all content was filtered, add empty text
      if (filteredContent.length === 0) {
        filteredContent.push({ type: "text", text: "" });
      }

      const result = { ...msg, content: filteredContent };
      // Attach thinking as reasoning_content for OpenAI extended thinking format
      if (thinkingText && msg.role === "assistant") {
        result.reasoning_content = thinkingText;
      }
      return result;
    }

    return msg;
  });

  // Filter out messages with only empty text (but NEVER filter tool messages)
  body.messages = body.messages.filter((msg) => {
    // Always keep tool messages
    if (msg.role === "tool") return true;
    // Always keep assistant messages with tool_calls
    if (msg.role === "assistant" && msg.tool_calls) return true;

    if (typeof msg.content === "string") return msg.content.trim() !== "";
    if (Array.isArray(msg.content)) {
      return msg.content.some((b) => (b.type === "text" && b.text?.trim()) || b.type !== "text");
    }
    return true;
  });

  // Remove empty tools array (some providers like QWEN reject it)
  if (body.tools && Array.isArray(body.tools) && body.tools.length === 0) {
    delete body.tools;
  }

  // Normalize tools to OpenAI format (from Claude, Gemini, etc.)
  if (body.tools && Array.isArray(body.tools) && body.tools.length > 0) {
    body.tools = body.tools
      .map((tool) => {
        // Already OpenAI format
        if (tool.type === "function" && tool.function) return tool;

        // Claude format: {name, description, input_schema}
        if (tool.name && (tool.input_schema || tool.description)) {
          return {
            type: "function",
            function: {
              name: tool.name,
              description: tool.description || "",
              parameters: tool.input_schema || { type: "object", properties: {} },
            },
          };
        }

        // Gemini format: {functionDeclarations: [{name, description, parameters}]}
        if (tool.functionDeclarations && Array.isArray(tool.functionDeclarations)) {
          return tool.functionDeclarations.map((fn) => ({
            type: "function",
            function: {
              name: fn.name,
              description: fn.description || "",
              parameters: fn.parameters || { type: "object", properties: {} },
            },
          }));
        }

        return tool;
      })
      .flat();
  }

  // Normalize tool_choice to OpenAI format
  if (body.tool_choice && typeof body.tool_choice === "object") {
    const choice = body.tool_choice;
    // Claude format: {type: "auto|any|tool", name?: "..."}
    if (choice.type === "auto") {
      body.tool_choice = "auto";
    } else if (choice.type === "any") {
      body.tool_choice = "required";
    } else if (choice.type === "tool" && choice.name) {
      body.tool_choice = { type: "function", function: { name: choice.name } };
    }
  }

  return body;
}
