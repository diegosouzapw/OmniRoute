/**
 * Kiro to OpenAI Response Translator
 * Converts Kiro/AWS CodeWhisperer streaming events to OpenAI SSE format
 */
import { register } from "../index.js";
import { FORMATS } from "../formats.js";

/**
 * Parse Kiro SSE event and convert to OpenAI format
 * Kiro events: assistantResponseEvent, codeEvent, supplementaryWebLinksEvent, etc.
 */
export function convertKiroToOpenAI(chunk, state) {
  if (!chunk) return null;

  // If chunk is already in OpenAI format (from executor transform), return as-is
  if (chunk.object === "chat.completion.chunk" && chunk.choices) {
    return chunk;
  }

  // Handle string chunk (raw SSE data)
  let data = chunk;
  if (typeof chunk === "string") {
    // Parse SSE format: event:xxx\ndata:xxx
    const lines = chunk.split("\n");
    let eventType = "";
    let eventData = "";

    for (const line of lines) {
      if (line.startsWith("event:")) {
        eventType = line.slice(6).trim();
      } else if (line.startsWith(":event-type:")) {
        eventType = line.slice(12).trim();
      } else if (line.startsWith("data:")) {
        eventData = line.slice(5).trim();
      } else if (line.startsWith(":content-type:")) {
        // Skip content-type header
      } else if (line.trim() && !line.startsWith(":")) {
        // Raw JSON data
        eventData = line.trim();
      }
    }

    if (!eventData) return null;

    try {
      data = JSON.parse(eventData);
      data._eventType = eventType;
    } catch {
      // Not JSON, might be raw text
      data = { text: eventData, _eventType: eventType };
    }
  }

  // Initialize state if needed
  if (!state.responseId) {
    state.responseId = `chatcmpl-${Date.now()}`;
    state.created = Math.floor(Date.now() / 1000);
    state.chunkIndex = 0;
  }

  const eventType = data._eventType || data.event || "";

  // Handle different Kiro event types
  if (eventType === "assistantResponseEvent" || data.assistantResponseEvent) {
    const content = data.assistantResponseEvent?.content || data.content || "";
    if (!content) return null;

    const openaiChunk = {
      id: state.responseId,
      object: "chat.completion.chunk",
      created: state.created,
      model: state.model || "kiro",
      choices: [
        {
          index: 0,
          delta: {
            ...(state.chunkIndex === 0 ? { role: "assistant" } : {}),
            content: content,
          },
          finish_reason: null,
        },
      ],
    };

    state.chunkIndex++;
    return openaiChunk;
  }

  // Handle reasoning/thinking events
  if (eventType === "reasoningContentEvent" || data.reasoningContentEvent) {
    const content = data.reasoningContentEvent?.content || data.content || "";
    if (!content) return null;

    // Convert to thinking block format (Claude-style)
    const openaiChunk = {
      id: state.responseId,
      object: "chat.completion.chunk",
      created: state.created,
      model: state.model || "kiro",
      choices: [
        {
          index: 0,
          delta: {
            ...(state.chunkIndex === 0 ? { role: "assistant" } : {}),
            content: `<thinking>${content}</thinking>`,
          },
          finish_reason: null,
        },
      ],
    };

    state.chunkIndex++;
    return openaiChunk;
  }

  // Handle tool use events
  if (eventType === "toolUseEvent" || data.toolUseEvent) {
    const toolUse = data.toolUseEvent || data;
    const toolCallId = toolUse.toolUseId || `call_${Date.now()}`;
    const toolName = toolUse.name || "";
    const toolInput = toolUse.input || {};

    const openaiChunk = {
      id: state.responseId,
      object: "chat.completion.chunk",
      created: state.created,
      model: state.model || "kiro",
      choices: [
        {
          index: 0,
          delta: {
            ...(state.chunkIndex === 0 ? { role: "assistant" } : {}),
            tool_calls: [
              {
                index: 0,
                id: toolCallId,
                type: "function",
                function: {
                  name: toolName,
                  arguments: JSON.stringify(toolInput),
                },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    };

    state.chunkIndex++;
    return openaiChunk;
  }

  // Handle completion/done events
  if (eventType === "messageStopEvent" || eventType === "done" || data.messageStopEvent) {
    state.finishReason = "stop"; // Mark for usage injection in stream.js

    const openaiChunk: Record<string, any> = {
      id: state.responseId,
      object: "chat.completion.chunk",
      created: state.created,
      model: state.model || "kiro",
      choices: [
        {
          index: 0,
          delta: {},
          finish_reason: "stop",
        },
      ],
    };

    // Include usage in final chunk if available
    if (state.usage && typeof state.usage === "object") {
      openaiChunk.usage = state.usage;
    }

    return openaiChunk;
  }

  // Handle usage events
  if (eventType === "usageEvent" || data.usageEvent) {
    const usage = data.usageEvent || data;
    if (usage && typeof usage === "object") {
      state.usage = {
        prompt_tokens: usage.inputTokens || 0,
        completion_tokens: usage.outputTokens || 0,
        total_tokens: (usage.inputTokens || 0) + (usage.outputTokens || 0),
      };
    }
    return null;
  }

  // Unknown event type - skip
  return null;
}

// Register translator
register(FORMATS.KIRO, FORMATS.OPENAI, null, convertKiroToOpenAI);
