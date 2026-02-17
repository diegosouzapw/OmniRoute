import { detectFormat } from "../services/provider.js";
import { translateResponse, initState } from "../translator/index.js";
import { FORMATS } from "../translator/formats.js";
import { SKIP_PATTERNS } from "../config/constants.js";
import { formatSSE } from "./stream.js";

/**
 * Check for bypass patterns — return fake response without calling provider.
 *
 * Intentionally limited to Claude CLI requests only because:
 * 1. The bypass patterns (title extraction, warmup, count) are specific to
 *    Claude CLI's internal protocol — other clients don't send these patterns.
 * 2. False-positive bypasses would silently break real requests.
 * 3. The SKIP_PATTERNS config allows user-defined patterns for any client.
 *
 * @param {object} body - Request body
 * @param {string} model - Model name
 * @param {string} userAgent - User-Agent header
 * @returns {object|null} Bypass response or null to proceed normally
 */
export function handleBypassRequest(body, model, userAgent = "") {
  if (!userAgent.includes("claude-cli")) return null;
  if (!body.messages?.length) return null;

  const messages = body.messages;
  const getText = (content) => {
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
      return content
        .filter((c) => c.type === "text")
        .map((c) => c.text)
        .join(" ");
    }
    return "";
  };

  let shouldBypass = false;

  // Pattern 1: Title extraction (assistant message = "{")
  const lastMsg = messages[messages.length - 1];
  if (lastMsg?.role === "assistant" && lastMsg.content?.[0]?.text === "{") {
    shouldBypass = true;
  }

  // Pattern 2: Warmup
  if (!shouldBypass) {
    const firstText = getText(messages[0]?.content);
    if (firstText === "Warmup") {
      shouldBypass = true;
    }
  }

  // Pattern 3: Count
  if (!shouldBypass && messages.length === 1 && messages[0]?.role === "user") {
    const firstText = getText(messages[0]?.content);
    if (firstText === "count") {
      shouldBypass = true;
    }
  }

  // Pattern 4: Skip patterns
  if (!shouldBypass && SKIP_PATTERNS?.length) {
    const userMessages = messages.filter((m) => m.role === "user");
    const userText = userMessages.map((m) => getText(m.content)).join(" ");
    if (SKIP_PATTERNS.some((p) => userText.includes(p))) {
      shouldBypass = true;
    }
  }

  if (!shouldBypass) return null;

  const sourceFormat = detectFormat(body);
  const stream = body.stream !== false;

  return stream
    ? createStreamingResponse(sourceFormat, model)
    : createNonStreamingResponse(sourceFormat, model);
}

/**
 * Create OpenAI standard format response
 */
function createOpenAIResponse(model) {
  const id = `chatcmpl-${Date.now()}`;
  const created = Math.floor(Date.now() / 1000);
  const text = "CLI Command Execution: Clear Terminal";

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

/**
 * Create non-streaming response with translation
 * Use translator to convert OpenAI → sourceFormat
 */
function createNonStreamingResponse(sourceFormat, model) {
  const openaiResponse = createOpenAIResponse(model);

  // If sourceFormat is OpenAI, return directly
  if (sourceFormat === FORMATS.OPENAI) {
    return {
      success: true,
      response: new Response(JSON.stringify(openaiResponse), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }),
    };
  }

  // Use translator to convert: simulate streaming then collect all chunks
  const state = initState(sourceFormat);
  state.model = model;

  const openaiChunks = createOpenAIStreamingChunks(openaiResponse);
  const allTranslated = [];

  for (const chunk of openaiChunks) {
    const translated = translateResponse(FORMATS.OPENAI, sourceFormat, chunk, state);
    if (translated?.length > 0) {
      allTranslated.push(...translated);
    }
  }

  // Flush remaining
  const flushed = translateResponse(FORMATS.OPENAI, sourceFormat, null, state);
  if (flushed?.length > 0) {
    allTranslated.push(...flushed);
  }

  // For non-streaming, merge all chunks into final response
  const finalResponse = mergeChunksToResponse(allTranslated, sourceFormat);

  return {
    success: true,
    response: new Response(JSON.stringify(finalResponse), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }),
  };
}

/**
 * Create streaming response with translation
 * Use translator to convert OpenAI chunks → sourceFormat
 */
function createStreamingResponse(sourceFormat, model) {
  const openaiResponse = createOpenAIResponse(model);
  const state = initState(sourceFormat);
  state.model = model;

  // Create OpenAI streaming chunks
  const openaiChunks = createOpenAIStreamingChunks(openaiResponse);

  // Translate each chunk to sourceFormat using translator
  const translatedChunks = [];

  for (const chunk of openaiChunks) {
    const translated = translateResponse(FORMATS.OPENAI, sourceFormat, chunk, state);
    if (translated?.length > 0) {
      for (const item of translated) {
        translatedChunks.push(formatSSE(item, sourceFormat));
      }
    }
  }

  // Flush remaining events
  const flushed = translateResponse(FORMATS.OPENAI, sourceFormat, null, state);
  if (flushed?.length > 0) {
    for (const item of flushed) {
      translatedChunks.push(formatSSE(item, sourceFormat));
    }
  }

  // Add [DONE]
  translatedChunks.push("data: [DONE]\n\n");

  return {
    success: true,
    response: new Response(translatedChunks.join(""), {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
      },
    }),
  };
}

/**
 * Merge translated chunks into final response object (for non-streaming)
 * Takes the last complete chunk as the final response
 */
function mergeChunksToResponse(chunks, sourceFormat) {
  if (!chunks || chunks.length === 0) {
    return createOpenAIResponse("unknown");
  }

  // For most formats, the last chunk before done contains the complete response
  // Find the most complete chunk (usually the last one with content)
  let finalChunk = chunks[chunks.length - 1];

  // For Claude format, find the message_stop or final message
  if (sourceFormat === FORMATS.CLAUDE) {
    const messageStop = chunks.find((c) => c.type === "message_stop");
    if (messageStop) {
      // Reconstruct complete message from chunks
      const contentDelta = chunks.find((c) => c.type === "content_block_delta");
      const messageDelta = chunks.find((c) => c.type === "message_delta");
      const messageStart = chunks.find((c) => c.type === "message_start");

      if (messageStart?.message) {
        finalChunk = messageStart.message;
        // Merge usage if available
        if (messageDelta?.usage) {
          finalChunk.usage = messageDelta.usage;
        }
      }
    }
  }

  return finalChunk;
}

/**
 * Create OpenAI streaming chunks from complete response
 */
function createOpenAIStreamingChunks(completeResponse) {
  const { id, created, model, choices } = completeResponse;
  const content = choices[0].message.content;

  return [
    // Chunk with content
    {
      id,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [
        {
          index: 0,
          delta: {
            role: "assistant",
            content,
          },
          finish_reason: null,
        },
      ],
    },
    // Final chunk with finish_reason
    {
      id,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [
        {
          index: 0,
          delta: {},
          finish_reason: "stop",
        },
      ],
      usage: completeResponse.usage,
    },
  ];
}
