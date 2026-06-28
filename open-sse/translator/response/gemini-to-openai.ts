import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import {
  buildGeminiThoughtSignatureKey,
  storeGeminiThoughtSignature,
} from "../../services/geminiThoughtSignatureStore.ts";
import {
  parseTextualToolCallCandidate,
  containsTextualToolCallMarker,
} from "../../utils/textualToolCall.ts";
import { normalizeOpenAICompatibleFinishReasonString } from "../../utils/finishReason.ts";

type GeminiToOpenAIState = {
  functionIndex: number;
  finishReason?: string;
  groundingProcessed?: boolean;
  hasEmittedContent?: boolean;
  messageId: string;
  model: string;
  pendingThoughtSignature?: string | null;
  signatureNamespace?: string | null;
  toolCalls: Map<number, unknown>;
  toolNameMap?: Map<string, string>;
  textualToolCallBuffer?: string;
  textualReasoningTagBuffer?: string;
  activeTextualReasoningTag?: string;
  textualReasoningContentBuffer?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    prompt_tokens_details?: {
      cached_tokens: number;
    };
    completion_tokens_details?: {
      reasoning_tokens: number;
    };
  };
};

type GeminiFunctionCallPart = {
  functionCall: {
    args?: unknown;
    id?: string;
    name: string;
  };
};

const REASONING_TAG_OPEN_REGEX =
  /<(think|thinking|thought|internal_thought)(?=\s|>|\r?\n)(?:\s[^>]*)?(?:>|\r?\n)/i;
const REASONING_TAG_OPEN_PREFIXES = ["<think", "<thinking", "<thought", "<internal_thought"];

// Close-tag matchers are needed for every text delta of a streamed reasoning response.
// Building `new RegExp("</tag>", "i")` on each delta recompiles the pattern thousands of
// times over a long stream (pure CPU waste on the token hot path). The tag name comes from
// the fixed REASONING_TAG_OPEN_REGEX capture group, so the cache is naturally bounded to a
// handful of entries. The regexes are non-global, so reuse across calls is safe (no shared
// lastIndex state).
const reasoningCloseTagRegexCache = new Map<string, RegExp>();
function getReasoningCloseTagRegex(tagName: string): RegExp {
  let regex = reasoningCloseTagRegexCache.get(tagName);
  if (!regex) {
    regex = new RegExp(`</${tagName}>`, "i");
    reasoningCloseTagRegexCache.set(tagName, regex);
  }
  return regex;
}

function isIgnorableReasoningTagPrefix(value: string): boolean {
  return /^(?:\s|§\d+§)*$/.test(value);
}

function getTrailingReasoningTagPrefixStart(text: string): number {
  const lastOpen = text.lastIndexOf("<");
  if (lastOpen < 0) return -1;
  const suffix = text.slice(lastOpen).toLowerCase();
  if (!suffix || suffix.includes(">") || suffix.includes("\n") || suffix.includes("\r")) return -1;
  return REASONING_TAG_OPEN_PREFIXES.some((prefix) => prefix.startsWith(suffix)) ? lastOpen : -1;
}

function getTrailingReasoningCloseTagPrefixStart(text: string, tagName: string): number {
  const lastClose = text.lastIndexOf("</");
  if (lastClose < 0) return -1;
  const suffix = text.slice(lastClose).toLowerCase();
  if (!suffix || suffix.includes(">") || suffix.includes("\n") || suffix.includes("\r")) return -1;
  return `</${tagName.toLowerCase()}>`.startsWith(suffix) ? lastClose : -1;
}

function consumeTextualReasoningTags(
  text: string,
  state: GeminiToOpenAIState,
  results: Array<Record<string, unknown>>
): string {
  const pendingTagBuffer = state.textualReasoningTagBuffer || "";

  if (state.activeTextualReasoningTag && pendingTagBuffer.startsWith("</")) {
    const combinedClose = `${pendingTagBuffer}${text}`;
    const closeTag = `</${state.activeTextualReasoningTag}>`;
    const lowerCombinedClose = combinedClose.toLowerCase();
    const lowerCloseTag = closeTag.toLowerCase();

    if (lowerCombinedClose.startsWith(lowerCloseTag)) {
      emitTextDelta(state.textualReasoningContentBuffer || "", state, results, "reasoning_content");
      state.activeTextualReasoningTag = undefined;
      state.textualReasoningContentBuffer = undefined;
      state.textualReasoningTagBuffer = undefined;
      return combinedClose.slice(closeTag.length);
    }

    if (lowerCloseTag.startsWith(lowerCombinedClose)) {
      state.textualReasoningTagBuffer = combinedClose;
      return "";
    }
  }

  let remaining = `${state.textualReasoningTagBuffer || ""}${text}`;
  state.textualReasoningTagBuffer = undefined;

  while (remaining) {
    if (state.activeTextualReasoningTag) {
      const bufferedReasoning = `${state.textualReasoningContentBuffer || ""}${remaining}`;
      const closeRegex = getReasoningCloseTagRegex(state.activeTextualReasoningTag);
      const closeMatch = closeRegex.exec(bufferedReasoning);
      if (!closeMatch || closeMatch.index < 0) {
        const partialCloseStart = getTrailingReasoningCloseTagPrefixStart(
          bufferedReasoning,
          state.activeTextualReasoningTag
        );
        if (partialCloseStart >= 0) {
          state.textualReasoningContentBuffer = bufferedReasoning.slice(0, partialCloseStart);
          state.textualReasoningTagBuffer = bufferedReasoning.slice(partialCloseStart);
          return "";
        }
        state.textualReasoningContentBuffer = bufferedReasoning;
        return "";
      }

      emitTextDelta(
        bufferedReasoning.slice(0, closeMatch.index),
        state,
        results,
        "reasoning_content"
      );
      state.activeTextualReasoningTag = undefined;
      state.textualReasoningContentBuffer = undefined;
      const closeEnd = bufferedReasoning.indexOf(">", closeMatch.index);
      remaining = bufferedReasoning.slice(
        closeEnd >= 0 ? closeEnd + 1 : closeMatch.index + closeMatch[0].length
      );
      continue;
    }

    const openMatch = REASONING_TAG_OPEN_REGEX.exec(remaining);
    if (!openMatch || openMatch.index < 0) {
      const partialStart = getTrailingReasoningTagPrefixStart(remaining);
      if (partialStart >= 0) {
        state.textualReasoningTagBuffer = remaining.slice(partialStart);
        const prefix = remaining.slice(0, partialStart);
        return isIgnorableReasoningTagPrefix(prefix) ? "" : prefix;
      }
      return remaining;
    }

    const before = remaining.slice(0, openMatch.index);
    if (before && !isIgnorableReasoningTagPrefix(before)) {
      emitTextDelta(before, state, results, "content");
    }

    const tagName = openMatch[1];
    const bodyStart = openMatch.index + openMatch[0].length;
    const afterOpen = remaining.slice(bodyStart);
    const closeRegex = getReasoningCloseTagRegex(tagName);
    const closeMatch = closeRegex.exec(afterOpen);
    if (!closeMatch || closeMatch.index < 0) {
      state.activeTextualReasoningTag = tagName;
      state.textualReasoningContentBuffer = afterOpen;
      return "";
    }

    emitTextDelta(afterOpen.slice(0, closeMatch.index), state, results, "reasoning_content");
    remaining = afterOpen.slice(closeMatch.index + closeMatch[0].length);
  }

  return "";
}

function flushOpenTextualReasoning(
  state: GeminiToOpenAIState,
  results: Array<Record<string, unknown>>
): void {
  if (!state.activeTextualReasoningTag && !state.textualReasoningContentBuffer) return;
  emitTextDelta(state.textualReasoningContentBuffer || "", state, results, "reasoning_content");
  state.activeTextualReasoningTag = undefined;
  state.textualReasoningContentBuffer = undefined;
  state.textualReasoningTagBuffer = undefined;
}

function emitTextDelta(
  content: string,
  state: GeminiToOpenAIState,
  results: Array<Record<string, unknown>>,
  field: "content" | "reasoning_content" = "content"
) {
  if (!content) return;
  if (field === "content") state.hasEmittedContent = true;
  results.push({
    id: `chatcmpl-${state.messageId}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model: state.model,
    choices: [
      {
        index: 0,
        delta: { [field]: content },
        finish_reason: null,
      },
    ],
  });
}

function normalizeToolCallArgs(args: unknown): unknown {
  if (typeof args !== "string") return args;
  const trimmed = args.trim();
  if (!trimmed || !(trimmed.startsWith("{") || trimmed.startsWith("["))) return args;
  try {
    return JSON.parse(trimmed);
  } catch {
    return args;
  }
}

function buildToolCallId(
  functionCall: GeminiFunctionCallPart["functionCall"],
  toolName: string,
  toolCallIndex: number
) {
  return typeof functionCall?.id === "string" && functionCall.id.length > 0
    ? functionCall.id
    : `${toolName}-${Date.now()}-${toolCallIndex}`;
}

function getSignatureCacheKey(
  state: Pick<GeminiToOpenAIState, "signatureNamespace">,
  toolCallId: unknown
) {
  return buildGeminiThoughtSignatureKey(state?.signatureNamespace, toolCallId);
}

function emitFunctionCallPart(
  part: GeminiFunctionCallPart,
  state: GeminiToOpenAIState,
  results: Array<Record<string, unknown>>
) {
  const rawToolName = part.functionCall.name;
  const fcName = state.toolNameMap?.get(rawToolName) || rawToolName;
  const fcArgs = normalizeToolCallArgs(part.functionCall.args || {});
  const toolCallIndex = state.functionIndex++;
  const toolCall = {
    id: buildToolCallId(part.functionCall, fcName, toolCallIndex),
    index: toolCallIndex,
    type: "function",
    function: {
      name: fcName,
      arguments: JSON.stringify(fcArgs),
    },
  };

  if (state.pendingThoughtSignature) {
    storeGeminiThoughtSignature(
      getSignatureCacheKey(state, toolCall.id),
      state.pendingThoughtSignature
    );
    state.pendingThoughtSignature = null;
  }

  state.toolCalls.set(toolCallIndex, toolCall);
  results.push({
    id: `chatcmpl-${state.messageId}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model: state.model,
    choices: [
      {
        index: 0,
        delta: { tool_calls: [toolCall] },
        finish_reason: null,
      },
    ],
  });
}

// Convert Gemini response chunk to OpenAI format
export function geminiToOpenAIResponse(chunk, state) {
  if (!chunk) return null;

  // Handle Antigravity wrapper
  const response = chunk.response || chunk;
  if (!response) return null;

  const modelVersion =
    typeof response.modelVersion === "string" ? response.modelVersion.toLowerCase() : "";
  const parseTextualReasoningTags = !chunk.response && !modelVersion.startsWith("antigravity/");
  const results = [];
  const candidate = response.candidates?.[0];

  if (!candidate) {
    // Mid-stream Gemini API error: the stream can emit an error object
    // `{ "error": { "code": 503, "message": "...", "status": "UNAVAILABLE" } }`
    // (optionally wrapped in `response`) instead of a candidates payload — typically
    // after some partial content. Without this branch the chunk has no candidates and
    // no promptFeedback, so it is dropped (return null) and the stream ends with a
    // default finish_reason "stop", masking the failure and skipping combo fallback.
    // Surface it as state.upstreamError so stream.ts errors the stream out (mirrors the
    // openai-responses translator's normalizeUpstreamFailure path).
    const errorObj = response.error || chunk.error;
    if (errorObj && typeof errorObj === "object") {
      const rawCode = errorObj.code;
      const rawStatus = errorObj.status;
      const status =
        typeof rawCode === "number" && rawCode >= 400 && rawCode <= 599
          ? rawCode
          : rawStatus === "RESOURCE_EXHAUSTED"
            ? 429
            : 502;
      const message =
        typeof errorObj.message === "string" ? errorObj.message : "Gemini upstream failure";
      state.upstreamError = {
        status,
        type: status === 429 ? "rate_limit_error" : "server_error",
        code:
          typeof rawStatus === "string" && rawStatus
            ? rawStatus
            : status === 429
              ? "rate_limit_exceeded"
              : "bad_gateway",
        message,
      };
      return null;
    }

    const promptFeedback = response.promptFeedback || chunk.promptFeedback;
    if (!promptFeedback) return null;

    if (!state.messageId) {
      state.messageId = response.responseId || `msg_${Date.now()}`;
      state.model = response.modelVersion || "gemini";
      results.push({
        id: `chatcmpl-${state.messageId}`,
        object: "chat.completion.chunk",
        created: Math.floor(Date.now() / 1000),
        model: state.model,
        choices: [
          {
            index: 0,
            delta: { role: "assistant", content: "" },
            finish_reason: null,
          },
        ],
      });
    }

    results.push({
      id: `chatcmpl-${state.messageId}`,
      object: "chat.completion.chunk",
      created: Math.floor(Date.now() / 1000),
      model: state.model,
      choices: [
        {
          index: 0,
          delta: {},
          finish_reason: "content_filter",
        },
      ],
    });

    return results;
  }

  const content = candidate.content;

  // Initialize state
  if (!state.messageId) {
    state.messageId = response.responseId || `msg_${Date.now()}`;
    state.model = response.modelVersion || "gemini";
    state.functionIndex = 0;
    results.push({
      id: `chatcmpl-${state.messageId}`,
      object: "chat.completion.chunk",
      created: Math.floor(Date.now() / 1000),
      model: state.model,
      choices: [
        {
          index: 0,
          delta: { role: "assistant" },
          finish_reason: null,
        },
      ],
    });
  }

  // Process parts
  if (content?.parts) {
    for (const part of content.parts) {
      const hasThoughtSig = part.thoughtSignature || part.thought_signature;
      const isThought = part.thought === true;
      if (hasThoughtSig && typeof hasThoughtSig === "string") {
        state.pendingThoughtSignature = hasThoughtSig;
      }

      // Handle thought signature (thinking mode) or native gemini thought flag
      if (hasThoughtSig || isThought) {
        const hasTextContent = part.text !== undefined && part.text !== "";
        const hasFunctionCall = !!part.functionCall;

        // Gemini/Antigravity can emit thoughtSignature as a standalone part
        // immediately before the functionCall part. Keep it pending so the
        // following functionCall is cached and can be re-attached on later
        // turns; otherwise OpenAI-format clients lose the signature and the
        // next Gemini request has to stringify historical tool calls.
        if (hasThoughtSig && !hasTextContent && !hasFunctionCall) {
          continue;
        }

        if (hasTextContent) {
          if (!isThought) {
            state.hasEmittedContent = true;
          }
          results.push({
            id: `chatcmpl-${state.messageId}`,
            object: "chat.completion.chunk",
            created: Math.floor(Date.now() / 1000),
            model: state.model,
            choices: [
              {
                index: 0,
                delta: isThought ? { reasoning_content: part.text } : { content: part.text },
                finish_reason: null,
              },
            ],
          });
        }

        if (hasFunctionCall) {
          // Flush any still-open textual reasoning wrapper as reasoning_content BEFORE
          // the tool call. A signed native functionCall arriving while a `<thinking>`
          // (etc.) tag opened in an earlier chunk is still buffered must not silently
          // drop that buffered reasoning — flushOpenTextualReasoning emits it and clears
          // the active-tag/content buffers. (LEDGER-4 / #3821-review)
          flushOpenTextualReasoning(state, results);
          // Also drop any partial open-tag fragment buffered at a chunk boundary
          // (flushOpenTextualReasoning early-returns when only this is set), matching the
          // pre-fix branch which cleared all three buffers. (#3821-review convergence)
          state.textualReasoningTagBuffer = undefined;
          emitFunctionCallPart(part, state, results);
        }
        continue;
      }

      // Text content (non-thinking). Some Gemini/Antigravity turns can imitate
      // the request-side signatureless history fallback and emit a textual
      // "[Tool call: ...]" block instead of native functionCall. Convert that
      // back to a structured OpenAI tool call so clients/tools do not see it as
      // assistant prose.
      if (part.text !== undefined && part.text !== "") {
        const afterReasoning = consumeTextualReasoningTags(part.text, state, results);
        if (!afterReasoning) continue;

        let accumulated = (state.textualToolCallBuffer || "") + afterReasoning;

        let candidate = parseTextualToolCallCandidate(accumulated);

        if (candidate) {
          accumulated = accumulated.replace(/[\u200B-\u200D\uFEFF]/g, "");
          let toolCallIndex = accumulated.lastIndexOf("(empty)[Tool call:");
          if (toolCallIndex < 0) {
            toolCallIndex = accumulated.lastIndexOf("[Tool call:");
          }
          if (toolCallIndex < 0) {
            const lastParen = accumulated.lastIndexOf("(");
            if (lastParen !== -1 && "(empty)[Tool call:".startsWith(accumulated.slice(lastParen))) {
              toolCallIndex = lastParen;
            } else {
              const lastBracket = accumulated.lastIndexOf("[");
              if (lastBracket !== -1 && "[Tool call:".startsWith(accumulated.slice(lastBracket))) {
                toolCallIndex = lastBracket;
              }
            }
          }

          if (toolCallIndex > 0) {
            const leftPart = accumulated.slice(0, toolCallIndex);
            state.hasEmittedContent = true;
            results.push({
              id: `chatcmpl-${state.messageId}`,
              object: "chat.completion.chunk",
              created: Math.floor(Date.now() / 1000),
              model: state.model,
              choices: [
                {
                  index: 0,
                  delta: { content: leftPart },
                  finish_reason: null,
                },
              ],
            });

            accumulated = accumulated.slice(toolCallIndex);
            candidate = parseTextualToolCallCandidate(accumulated);
          }

          if (candidate) {
            if (candidate.kind === "complete") {
              emitFunctionCallPart(
                {
                  functionCall: {
                    name: candidate.name,
                    args: candidate.args,
                  },
                },
                state,
                results
              );
              state.textualToolCallBuffer = "";
            } else {
              state.textualToolCallBuffer = accumulated;
            }
            continue;
          }
        }

        if (state.textualToolCallBuffer) {
          const flushedText = state.textualToolCallBuffer + afterReasoning;
          state.textualToolCallBuffer = "";
          state.hasEmittedContent = true;
          results.push({
            id: `chatcmpl-${state.messageId}`,
            object: "chat.completion.chunk",
            created: Math.floor(Date.now() / 1000),
            model: state.model,
            choices: [
              {
                index: 0,
                delta: { content: flushedText },
                finish_reason: null,
              },
            ],
          });
          continue;
        }

        state.hasEmittedContent = true;
        results.push({
          id: `chatcmpl-${state.messageId}`,
          object: "chat.completion.chunk",
          created: Math.floor(Date.now() / 1000),
          model: state.model,
          choices: [
            {
              index: 0,
              delta: { content: afterReasoning },
              finish_reason: null,
            },
          ],
        });
      }

      // Function call
      if (part.functionCall) {
        emitFunctionCallPart(part, state, results);
      }

      // Inline data (images)
      const inlineData = part.inlineData || part.inline_data;
      if (inlineData?.data) {
        const mimeType = inlineData.mimeType || inlineData.mime_type || "image/png";
        results.push({
          id: `chatcmpl-${state.messageId}`,
          object: "chat.completion.chunk",
          created: Math.floor(Date.now() / 1000),
          model: state.model,
          choices: [
            {
              index: 0,
              delta: {
                images: [
                  {
                    type: "image_url",
                    image_url: { url: `data:${mimeType};base64,${inlineData.data}` },
                  },
                ],
              },
              finish_reason: null,
            },
          ],
        });
      }
    }
  }

  // Grounding Metadata (Google Search)
  const grounding = candidate.groundingMetadata || candidate.grounding_metadata;
  if (grounding && !state.groundingProcessed) {
    const citations = [];
    if (grounding.groundingChunks || grounding.grounding_chunks) {
      const chunks = grounding.groundingChunks || grounding.grounding_chunks;
      for (const chunk of chunks) {
        if (chunk.web) {
          citations.push({
            title: chunk.web.title,
            url: chunk.web.uri,
          });
        }
      }
    }

    if (citations.length > 0) {
      results.push({
        id: `chatcmpl-${state.messageId}`,
        object: "chat.completion.chunk",
        created: Math.floor(Date.now() / 1000),
        model: state.model,
        choices: [
          {
            index: 0,
            delta: { citations },
            finish_reason: null,
          },
        ],
      });
      state.groundingProcessed = true;
    }
  }

  // Usage metadata - extract before finish reason so we can include it
  const usageMeta = response.usageMetadata || chunk.usageMetadata;
  if (usageMeta && typeof usageMeta === "object") {
    const cachedTokens =
      typeof usageMeta.cachedContentTokenCount === "number" ? usageMeta.cachedContentTokenCount : 0;
    const promptTokenCountRaw =
      typeof usageMeta.promptTokenCount === "number" ? usageMeta.promptTokenCount : 0;
    const thoughtsTokens =
      typeof usageMeta.thoughtsTokenCount === "number" ? usageMeta.thoughtsTokenCount : 0;
    let candidatesTokens =
      typeof usageMeta.candidatesTokenCount === "number" ? usageMeta.candidatesTokenCount : 0;
    const totalTokens =
      typeof usageMeta.totalTokenCount === "number" ? usageMeta.totalTokenCount : 0;

    // prompt_tokens = promptTokenCount (includes cached tokens, matching claude-to-openai.js behavior)
    const promptTokens = promptTokenCountRaw;

    // Fallback calculation if candidatesTokenCount is 0 but totalTokenCount exists
    if (candidatesTokens === 0 && totalTokens > 0) {
      candidatesTokens = totalTokens - promptTokenCountRaw - thoughtsTokens;
      if (candidatesTokens < 0) candidatesTokens = 0;
    }

    // completion_tokens = candidatesTokenCount + thoughtsTokenCount (match Go code)
    const completionTokens = candidatesTokens + thoughtsTokens;

    state.usage = {
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
    };

    // Add prompt_tokens_details if cached tokens exist
    if (cachedTokens > 0) {
      state.usage.prompt_tokens_details = {
        cached_tokens: cachedTokens,
      };
    }

    // Add completion_tokens_details if reasoning tokens exist
    if (thoughtsTokens > 0) {
      state.usage.completion_tokens_details = {
        reasoning_tokens: thoughtsTokens,
      };
    }
  }

  // Finish reason - include usage in final chunk
  if (candidate.finishReason) {
    if (parseTextualReasoningTags) {
      flushOpenTextualReasoning(state, results);
    }

    if (state.textualToolCallBuffer) {
      const remainingText = state.textualToolCallBuffer;
      state.textualToolCallBuffer = "";
      const textualToolCall = parseTextualToolCallCandidate(remainingText);
      if (textualToolCall && textualToolCall.kind === "complete") {
        emitFunctionCallPart(
          {
            functionCall: {
              name: textualToolCall.name,
              args: textualToolCall.args,
            },
          },
          state,
          results
        );
      } else if (state.hasEmittedContent || !containsTextualToolCallMarker(remainingText)) {
        state.hasEmittedContent = true;
        results.push({
          id: `chatcmpl-${state.messageId}`,
          object: "chat.completion.chunk",
          created: Math.floor(Date.now() / 1000),
          model: state.model,
          choices: [
            {
              index: 0,
              delta: { content: remainingText },
              finish_reason: null,
            },
          ],
        });
      }
    }

    // normalizeOpenAICompatibleFinishReasonString lowercases, maps max_tokens→length,
    // and folds Gemini safety reasons (safety/recitation/blocklist/...) → content_filter
    // so downstream clients can distinguish a blocked completion from a normal stop.
    let finishReason = normalizeOpenAICompatibleFinishReasonString(candidate.finishReason);
    if (finishReason === "stop" && state.toolCalls.size > 0) {
      finishReason = "tool_calls";
    }

    const finalChunk: Record<string, unknown> = {
      id: `chatcmpl-${state.messageId}`,
      object: "chat.completion.chunk",
      created: Math.floor(Date.now() / 1000),
      model: state.model,
      choices: [
        {
          index: 0,
          delta: {},
          finish_reason: finishReason,
        },
      ],
    };

    // Include usage in final chunk for downstream translators
    if (state.usage) {
      finalChunk.usage = state.usage;
    }

    results.push(finalChunk);
    state.finishReason = finishReason;
  }

  return results.length > 0 ? results : null;
}

// Register
register(FORMATS.GEMINI, FORMATS.OPENAI, null, geminiToOpenAIResponse);
register(FORMATS.ANTIGRAVITY, FORMATS.OPENAI, null, geminiToOpenAIResponse);
