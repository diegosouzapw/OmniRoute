/**
 * Convert OpenAI-style SSE chunks into a single non-streaming JSON response.
 * Used as a fallback when upstream returns text/event-stream for stream=false.
 */
export function parseSSEToOpenAIResponse(rawSSE, fallbackModel) {
  const lines = String(rawSSE || "").split("\n");
  const chunks = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    try {
      chunks.push(JSON.parse(payload));
    } catch {
      // Ignore malformed SSE lines and continue best-effort parsing.
    }
  }

  if (chunks.length === 0) return null;

  const first = chunks[0];
  const contentParts = [];
  const reasoningParts = [];
  const accumulatedToolCalls = new Map<string, any>();
  let unknownToolCallSeq = 0;
  let finishReason = "stop";
  let usage = null;

  const getToolCallKey = (toolCall: any) => {
    if (toolCall?.id) return `id:${toolCall.id}`;
    if (Number.isInteger(toolCall?.index)) return `idx:${toolCall.index}`;
    unknownToolCallSeq += 1;
    return `seq:${unknownToolCallSeq}`;
  };

  for (const chunk of chunks) {
    const choice = chunk?.choices?.[0];
    const delta = choice?.delta || {};

    if (typeof delta.content === "string" && delta.content.length > 0) {
      contentParts.push(delta.content);
    }
    if (typeof delta.reasoning_content === "string" && delta.reasoning_content.length > 0) {
      reasoningParts.push(delta.reasoning_content);
    }

    // T18: Accumulate tool calls correctly across streamed chunks
    if (delta.tool_calls) {
      for (const tc of delta.tool_calls) {
        const key = getToolCallKey(tc);
        const existing = accumulatedToolCalls.get(key);
        const deltaArgs = typeof tc?.function?.arguments === "string" ? tc.function.arguments : "";

        if (!existing) {
          accumulatedToolCalls.set(key, {
            id: tc?.id ?? null,
            index: Number.isInteger(tc?.index) ? tc.index : accumulatedToolCalls.size,
            type: tc?.type || "function",
            function: {
              name: tc?.function?.name || "unknown",
              arguments: deltaArgs,
            },
          });
        } else {
          existing.id = existing.id || tc?.id || null;
          if (!Number.isInteger(existing.index) && Number.isInteger(tc?.index)) {
            existing.index = tc.index;
          }
          if (tc?.function?.name && !existing.function?.name) {
            existing.function = existing.function || {};
            existing.function.name = tc.function.name;
          }
          existing.function = existing.function || {};
          existing.function.arguments = `${existing.function.arguments || ""}${deltaArgs}`;
          accumulatedToolCalls.set(key, existing);
        }
      }
    }

    if (choice?.finish_reason) {
      finishReason = choice.finish_reason;
    }
    if (chunk?.usage && typeof chunk.usage === "object") {
      usage = chunk.usage;
    }
  }

  const message: Record<string, unknown> = {
    role: "assistant",
    content: contentParts.length > 0 ? contentParts.join("") : null,
  };
  if (reasoningParts.length > 0) {
    message.reasoning_content = reasoningParts.join("");
  }

  const finalToolCalls = [...accumulatedToolCalls.values()].filter(Boolean).sort((a, b) => {
    const ai = Number.isInteger(a?.index) ? a.index : 0;
    const bi = Number.isInteger(b?.index) ? b.index : 0;
    return ai - bi;
  });
  if (finalToolCalls.length > 0) {
    finishReason = "tool_calls"; // T18 normalization
    message.tool_calls = finalToolCalls;
  }

  const result: Record<string, unknown> = {
    id: first.id || `chatcmpl-${Date.now()}`,
    object: "chat.completion",
    created: first.created || Math.floor(Date.now() / 1000),
    model: first.model || fallbackModel || "unknown",
    choices: [
      {
        index: 0,
        message,
        finish_reason: finishReason,
      },
    ],
  };

  if (usage) {
    result.usage = usage;
  }

  return result;
}

/**
 * Convert Responses API SSE events into a single non-streaming response object.
 * Expects events such as response.created / response.in_progress / response.completed.
 */
export function parseSSEToResponsesOutput(rawSSE, fallbackModel) {
  const lines = String(rawSSE || "").split("\n");
  const events = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    try {
      events.push(JSON.parse(payload));
    } catch {
      // Ignore malformed lines and continue best-effort parsing.
    }
  }

  if (events.length === 0) return null;

  let completed = null;
  let latestResponse = null;

  for (const evt of events) {
    if (evt?.type === "response.completed" && evt.response) {
      completed = evt.response;
    }
    if (evt?.response && typeof evt.response === "object") {
      latestResponse = evt.response;
    } else if (evt?.object === "response") {
      latestResponse = evt;
    }
  }

  const picked = completed || latestResponse;
  if (!picked || typeof picked !== "object") return null;

  return {
    id: picked.id || `resp_${Date.now()}`,
    object: "response",
    model: picked.model || fallbackModel || "unknown",
    output: Array.isArray(picked.output) ? picked.output : [],
    usage: picked.usage || null,
    status: picked.status || (completed ? "completed" : "in_progress"),
    created_at: picked.created_at || Math.floor(Date.now() / 1000),
    metadata: picked.metadata || {},
  };
}
