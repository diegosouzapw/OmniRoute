import { register } from "../index.ts";
import { FORMATS } from "../formats.ts";

// Convert OpenAI SSE chunk to Antigravity SSE format
// Real Antigravity format:
//   data: {"response":{"candidates":[{"content":{"role":"model","parts":[...]}, "finishReason":"STOP"}], "usageMetadata":{...}, "modelVersion":"...", "responseId":"..."}}
// Tool calls: OpenAI sends incremental args across chunks → accumulate and emit ONCE at finish
export function openaiToAntigravityResponse(chunk, state) {
  if (!chunk) return null;

  const choice = chunk.choices?.[0];
  if (!choice) {
    if (chunk.usage) {
      state._usage = chunk.usage;
    }
    return null;
  }

  const delta = choice.delta || {};
  const finishReason = choice.finish_reason;

  // Init state
  if (!state._toolCallAccum) state._toolCallAccum = {};
  if (!state._responseId) state._responseId = chunk.id || `resp_${Date.now()}`;
  if (!state._modelVersion) state._modelVersion = chunk.model || "";

  const parts = [];

  // Thinking/reasoning → thought part
  if (delta.reasoning_content) {
    parts.push({ thought: true, text: delta.reasoning_content });
  }

  // Text content
  if (delta.content) {
    parts.push({ text: delta.content });
  }

  // Accumulate tool calls silently (no emit until finish)
  if (delta.tool_calls) {
    for (const tc of delta.tool_calls) {
      const idx = tc.index ?? 0;
      if (!state._toolCallAccum[idx]) {
        state._toolCallAccum[idx] = { id: "", name: "", arguments: "" };
      }
      const accum = state._toolCallAccum[idx];
      if (tc.id) accum.id = tc.id;
      if (tc.function?.name) accum.name += tc.function.name;
      if (tc.function?.arguments) accum.arguments += tc.function.arguments;
    }
    // Skip emit — wait for finish_reason
    if (parts.length === 0 && !finishReason) return null;
  }

  // On finish, emit accumulated tool calls as complete functionCall parts
  if (finishReason) {
    const indices = Object.keys(state._toolCallAccum);
    for (const idx of indices) {
      const accum = state._toolCallAccum[idx];
      let args = {};
      try {
        args = JSON.parse(accum.arguments);
      } catch {
        /* empty */
      }
      parts.push({
        functionCall: {
          name: accum.name,
          args,
        },
      });
    }
  }

  // Skip empty non-finish chunks
  if (parts.length === 0 && !finishReason) return null;

  // Ensure at least empty text part on finish with no content
  if (parts.length === 0 && finishReason) {
    parts.push({ text: "" });
  }

  // Build candidate
  const candidate: Record<string, any> = { content: { role: "model", parts } };

  // Finish reason mapping
  if (finishReason) {
    const reasonMap = {
      stop: "STOP",
      length: "MAX_TOKENS",
      tool_calls: "STOP",
      content_filter: "SAFETY",
    };
    candidate.finishReason = reasonMap[finishReason] || "STOP";
  }

  // Build response
  const response: Record<string, any> = {
    candidates: [candidate],
    modelVersion: state._modelVersion,
    responseId: state._responseId,
  };

  // Usage metadata
  const usage = chunk.usage || state._usage;
  if (usage) {
    response.usageMetadata = {
      promptTokenCount: usage.prompt_tokens || 0,
      candidatesTokenCount: usage.completion_tokens || 0,
      totalTokenCount: usage.total_tokens || 0,
    };
    if (usage.completion_tokens_details?.reasoning_tokens) {
      response.usageMetadata.thoughtsTokenCount = usage.completion_tokens_details.reasoning_tokens;
    }
    if (usage.prompt_tokens_details?.cached_tokens) {
      response.usageMetadata.cachedContentTokenCount = usage.prompt_tokens_details.cached_tokens;
    }
  }

  return { response };
}

// Register
register(FORMATS.OPENAI, FORMATS.ANTIGRAVITY, null, openaiToAntigravityResponse);
