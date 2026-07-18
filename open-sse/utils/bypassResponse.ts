import { translateResponse, initState } from "../translator/index.ts";
import { FORMATS } from "../translator/formats.ts";
import { formatSSE } from "./stream.ts";

/**
 * Shared synthetic-response builders for the various "answer without calling
 * the provider" code paths (CLI bypass patterns today; any future canned/
 * synthetic response can reuse these instead of re-deriving format
 * translation). Extracted out of bypassHandler.ts so the logic has exactly
 * one owner. Ported from upstream decolua/9router#2404 (bypassResponse.js),
 * with the Claude-format content reconstruction fixed — see
 * mergeChunksToResponse() below.
 */

const DEFAULT_BYPASS_TEXT = "CLI Command Execution: Clear Terminal";

/** Build a complete (non-chunked) OpenAI chat-completion response object. */
export function createOpenAIResponse(model, text = DEFAULT_BYPASS_TEXT) {
  const id = `chatcmpl-${Date.now()}`;
  const created = Math.floor(Date.now() / 1000);

  return {
    id,
    object: "chat.completion",
    created,
    model,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: text,
        },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 1,
      completion_tokens: 1,
      total_tokens: 2,
    },
  };
}

/** Split a complete OpenAI response into the two streaming chunks a client expects. */
export function createOpenAIStreamingChunks(completeResponse) {
  const { id, created, model, choices } = completeResponse;
  const content = choices[0].message.content;

  return [
    {
      id,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [
        {
          index: 0,
          delta: { role: "assistant", content },
          finish_reason: null,
        },
      ],
    },
    {
      id,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: completeResponse.usage,
    },
  ];
}

/**
 * Reconstruct the Claude `content` array from the content_block_start/delta
 * events emitted for a synthetic (one-shot) response. The translator always
 * starts `message_start.message.content` empty and streams blocks in via
 * separate events, so the blocks have to be replayed and merged by index.
 */
function buildClaudeContentBlocks(chunks) {
  const blockMap = new Map();
  for (const chunk of chunks) {
    if (chunk?.type === "content_block_start" && typeof chunk.index === "number") {
      blockMap.set(chunk.index, { ...(chunk.content_block || {}) });
    }
    if (chunk?.type === "content_block_delta" && typeof chunk.index === "number") {
      const current = blockMap.get(chunk.index) || { type: "text", text: "" };
      if (chunk.delta?.type === "text_delta") {
        current.type = current.type || "text";
        current.text = `${current.text || ""}${chunk.delta.text || ""}`;
      }
      blockMap.set(chunk.index, current);
    }
  }
  return [...blockMap.entries()].sort((a, b) => a[0] - b[0]).map(([, block]) => block);
}

/** Apply the trailing message_delta's usage/stop fields onto the merged message. */
function applyClaudeMessageDelta(mergedMessage, messageStart, messageDelta) {
  const startUsage = messageStart.message.usage;
  const deltaUsage = messageDelta?.usage;
  if (startUsage || deltaUsage) {
    mergedMessage.usage = {
      ...(startUsage || {}),
      ...(deltaUsage || {}),
    };
  }
  if (messageDelta?.delta?.stop_reason !== undefined) {
    mergedMessage.stop_reason = messageDelta.delta.stop_reason;
  }
  if (messageDelta?.delta?.stop_sequence !== undefined) {
    mergedMessage.stop_sequence = messageDelta.delta.stop_sequence;
  }
}

/**
 * Reconstruct the final Claude message from a synthetic bypass response's
 * chunk stream — taking the raw `message_start.message` would return an
 * empty `content: []`. Falls back to `fallback` (the raw last chunk) when
 * the stream never completed or never carried a `message_start`.
 */
function mergeClaudeChunks(chunks, fallback) {
  const messageStop = chunks.find((c) => c.type === "message_stop");
  if (!messageStop) return fallback;

  const messageStart = chunks.find((c) => c.type === "message_start");
  if (!messageStart?.message) return fallback;

  const messageDelta = chunks.find((c) => c.type === "message_delta");
  const mergedMessage = {
    ...messageStart.message,
    content: buildClaudeContentBlocks(chunks),
  };
  applyClaudeMessageDelta(mergedMessage, messageStart, messageDelta);
  return mergedMessage;
}

/**
 * Merge translated chunks into a final response object (for non-streaming
 * callers). For most formats the last chunk is already complete. Claude
 * format is chunk-oriented even for "one-shot" synthetic responses, so the
 * final message has to be reconstructed — see mergeClaudeChunks() above.
 */
export function mergeChunksToResponse(chunks, sourceFormat) {
  if (!chunks || chunks.length === 0) {
    return createOpenAIResponse("unknown");
  }

  const finalChunk = chunks[chunks.length - 1];

  if (sourceFormat === FORMATS.CLAUDE) {
    return mergeClaudeChunks(chunks, finalChunk);
  }

  return finalChunk;
}

/** Build a non-streaming Response translated from OpenAI into `sourceFormat`. */
export function createNonStreamingResponse(sourceFormat, model, text?: string) {
  const openaiResponse = createOpenAIResponse(model, text);

  if (sourceFormat === FORMATS.OPENAI) {
    return {
      success: true,
      response: new Response(JSON.stringify(openaiResponse), {
        headers: { "Content-Type": "application/json" },
      }),
    };
  }

  const state = initState(sourceFormat);
  state.model = model;

  const openaiChunks = createOpenAIStreamingChunks(openaiResponse);
  const allTranslated: unknown[] = [];

  for (const chunk of openaiChunks) {
    const translated = translateResponse(FORMATS.OPENAI, sourceFormat, chunk, state);
    if (translated?.length > 0) allTranslated.push(...translated);
  }

  const flushed = translateResponse(FORMATS.OPENAI, sourceFormat, null, state);
  if (flushed?.length > 0) allTranslated.push(...flushed);

  const finalResponse = mergeChunksToResponse(allTranslated, sourceFormat);

  return {
    success: true,
    response: new Response(JSON.stringify(finalResponse), {
      headers: { "Content-Type": "application/json" },
    }),
  };
}

/** Build a streaming (SSE) Response translated from OpenAI into `sourceFormat`. */
export function createStreamingResponse(sourceFormat, model, text?: string) {
  const openaiResponse = createOpenAIResponse(model, text);
  const state = initState(sourceFormat);
  state.model = model;

  const openaiChunks = createOpenAIStreamingChunks(openaiResponse);
  const translatedChunks: string[] = [];

  for (const chunk of openaiChunks) {
    const translated = translateResponse(FORMATS.OPENAI, sourceFormat, chunk, state);
    if (translated?.length > 0) {
      for (const item of translated) translatedChunks.push(formatSSE(item, sourceFormat));
    }
  }

  const flushed = translateResponse(FORMATS.OPENAI, sourceFormat, null, state);
  if (flushed?.length > 0) {
    for (const item of flushed) translatedChunks.push(formatSSE(item, sourceFormat));
  }

  translatedChunks.push("data: [DONE]\n\n");

  return {
    success: true,
    response: new Response(translatedChunks.join(""), {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    }),
  };
}
