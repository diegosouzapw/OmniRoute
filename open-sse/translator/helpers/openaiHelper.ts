// OpenAI helper functions for translator

// Valid OpenAI content block types
// `input_audio` / `audio_url` ported from upstream decolua/9router#913 so audio
// parts survive `filterToOpenAIFormat()` on OpenAI-target passthrough routes.
export const VALID_OPENAI_CONTENT_TYPES = [
  "text",
  "image_url",
  "image",
  "file_url",
  "file",
  "document",
  "input_audio",
  "audio_url",
];
export const VALID_OPENAI_MESSAGE_TYPES = [
  "text",
  "image_url",
  "image",
  "file_url",
  "file",
  "document",
  "image",
  "input_audio",
  "audio_url",
  "tool_calls",
  "tool_result",
];
const CLAUDE_TOOL_CHOICE_REQUIRED = "an" + "y";

// Filter messages to OpenAI standard format
// Remove: redacted_thinking, and other non-OpenAI blocks
// Convert: thinking blocks → reasoning_content on the message
export function filterToOpenAIFormat(body, opts = {}) {
  // #2069 — when the routed provider honors OpenAI-format cache_control
  // breakpoints (DashScope/alibaba, Xiaomi MiMo, etc.) and preservation was
  // requested upstream, keep the `cache_control` field on each content block
  // instead of destructuring it away. `signature` is always stripped.
  const preserveCacheControl = opts?.preserveCacheControl === true;
  // #4849 strips reasoning_content from tool-call assistant turns to stop O(n^2)
  // context growth — but reasoning-replay providers (DeepSeek V4, Kimi K2, etc.)
  // REQUIRE the client's reasoning_content to be passed back, so keep it for them
  // (the caller sets this when the routed model needs reasoning replay).
  const preserveReasoningContent = opts?.preserveReasoningContent === true;
  if (!body.messages || !Array.isArray(body.messages)) return body;

  body.messages = body.messages.map((msg) => {
    // Normalize OpenAI Responses-style `developer` role to `system` — many
    // OpenAI-compatible providers reject `developer` (ported from
    // decolua/9router#1011).
    if (msg.role === "developer") msg = { ...msg, role: "system" };

    // Keep tool messages as-is (OpenAI format)
    if (msg.role === "tool") return msg;

    // Keep assistant messages with tool_calls, but strip reasoning_content —
    // reasoning blobs inflate context on every subsequent agentic turn (O(n^2)).
    // Exception: reasoning-replay providers must keep client-provided
    // reasoning_content (they 400 without it), so preserve it when requested.
    if (msg.role === "assistant" && msg.tool_calls) {
      if (!preserveReasoningContent && msg.reasoning_content !== undefined) {
        const { reasoning_content, ...cleanMsg } = msg;
        return cleanMsg;
      }
      return msg;
    }

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
          // Strip `signature` always; strip `cache_control` unless the provider
          // honors OpenAI-format cache breakpoints and preservation was requested (#2069).
          const { signature, cache_control, ...rest } = block;
          const cleanBlock =
            preserveCacheControl && cache_control !== undefined
              ? { ...rest, cache_control }
              : rest;
          if (
            cleanBlock.type === "text" &&
            typeof cleanBlock.text === "string" &&
            cleanBlock.text.length === 0
          ) {
            continue;
          }
          const fileData = cleanBlock.file_url ?? cleanBlock.file ?? cleanBlock.document;
          if (
            (cleanBlock.type === "file" || cleanBlock.type === "document") &&
            !fileData?.url &&
            !fileData?.data
          ) {
            const fileContent =
              cleanBlock.file?.content ??
              cleanBlock.file?.text ??
              cleanBlock.content ??
              cleanBlock.text;
            const fileName = cleanBlock.file?.name ?? cleanBlock.name ?? "attachment";
            if (typeof fileContent === "string" && fileContent.length > 0) {
              filteredContent.push({ type: "text", text: `[${fileName}]\n${fileContent}` });
              continue;
            }
          }
          filteredContent.push(cleanBlock);
        } else if (block.type === "tool_use") {
          // Convert tool_use to tool_calls format (handled separately)
          continue;
        } else if (block.type === "tool_result") {
          const resultContent = block.content ?? block.text ?? block.output ?? "";
          const resultText =
            typeof resultContent === "string"
              ? resultContent
              : Array.isArray(resultContent)
                ? resultContent
                    .filter((c) => c?.type === "text")
                    .map((c) => c.text)
                    .join("\n")
                : JSON.stringify(resultContent);
          if (typeof resultText === "string" && resultText.length > 0) {
            filteredContent.push({
              type: "text",
              text: `[Tool Result: ${block.tool_use_id ?? block.id ?? "unknown"}]\n${resultText}`,
            });
          }
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

  // Strip Claude-specific fields that OpenAI-compatible providers reject
  delete body.metadata;
  delete body.anthropic_version;
  // Codex clients send a top-level `client_metadata` object; OpenAI rejects it
  // with 400 "Unknown parameter: 'client_metadata'" (9router#1157).
  delete body.client_metadata;

  // Map max_output_tokens (from Vercel AI SDK) to max_tokens logic
  if (body.max_output_tokens !== undefined) {
    if (body.max_tokens === undefined) {
      body.max_tokens = body.max_output_tokens;
    }
    delete body.max_output_tokens;
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
              // Coerce: strict upstream validators (NVIDIA NIM, Codex) reject
              // non-string descriptions. Ports decolua/9router#397.
              description: String(tool.description ?? ""),
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
              description: String(fn.description ?? ""),
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
    // Claude format: {type: "auto|required-tool|tool", name?: "..."}
    if (choice.type === "auto") {
      body.tool_choice = "auto";
    } else if (choice.type === CLAUDE_TOOL_CHOICE_REQUIRED) {
      body.tool_choice = "required";
    } else if (choice.type === "tool" && choice.name) {
      body.tool_choice = { type: "function", function: { name: choice.name } };
    }
  }

  return body;
}
