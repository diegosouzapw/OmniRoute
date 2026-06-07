import { register } from "../registry.ts";
import { FORMATS } from "../formats.ts";
import {
  buildGeminiThoughtSignatureKey,
  storeGeminiThoughtSignature,
} from "../../services/geminiThoughtSignatureStore.ts";

type GeminiToOpenAIState = {
  functionIndex: number;
  messageId: string;
  model: string;
  pendingThoughtSignature?: string | null;
  signatureNamespace?: string | null;
  toolCalls: Map<number, unknown>;
  toolNameMap?: Map<string, string>;
  textualToolCallBuffer?: string;
};

type GeminiFunctionCallPart = {
  functionCall: {
    args?: unknown;
    id?: string;
    name: string;
  };
};

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

function stripZeroWidth(value: unknown): unknown {
  if (typeof value === "string") {
    return value.replace(/[\u200B-\u200D\uFEFF]/g, "");
  }
  if (Array.isArray(value)) {
    return value.map((item) => stripZeroWidth(item));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        stripZeroWidth(item),
      ])
    );
  }
  return value;
}

function isValidToolCallHeaderPrefix(candidate: string): boolean {
  if (!candidate.startsWith("[Tool call:")) return false;

  const bracketIndex = candidate.indexOf("]");
  if (bracketIndex === -1) {
    const namePart = candidate.slice("[Tool call:".length);
    if (namePart.includes("\n") || namePart.includes("[")) return false;
    return true;
  }

  const namePart = candidate.slice("[Tool call:".length, bracketIndex);
  if (namePart.includes("\n") || namePart.trim().length === 0) return false;

  const afterBracket = candidate.slice(bracketIndex + 1);
  const leadingWhitespaceMatch = afterBracket.match(/^[\s\r\n]*/);
  const leadingWhitespace = leadingWhitespaceMatch ? leadingWhitespaceMatch[0] : "";
  const textAfterWhitespace = afterBracket.slice(leadingWhitespace.length);

  if (textAfterWhitespace.length === 0) {
    return true;
  }

  if (!leadingWhitespace.includes("\n")) {
    return false;
  }

  const expectedText = "Arguments:";
  if (expectedText.startsWith(textAfterWhitespace)) {
    return true;
  }

  if (textAfterWhitespace.startsWith(expectedText)) {
    return true;
  }

  return false;
}

function parseTextualToolCallCandidate(
  text: unknown
): { kind: "complete"; name: string; args: unknown } | { kind: "partial" } | null {
  if (typeof text !== "string") return null;
  const normalized = text.replace(/[\u200B-\u200D\uFEFF]/g, "");
  const toolCallIndex = normalized.lastIndexOf("[Tool call:");
  if (toolCallIndex < 0) {
    const lastBracket = normalized.lastIndexOf("[");
    if (lastBracket !== -1 && "[Tool call:".startsWith(normalized.slice(lastBracket))) {
      return { kind: "partial" };
    }
    const lastParen = normalized.lastIndexOf("(");
    if (lastParen !== -1 && "(empty)[Tool call:".startsWith(normalized.slice(lastParen))) {
      return { kind: "partial" };
    }
    return null;
  }
  const candidate = normalized.slice(toolCallIndex);
  if (!isValidToolCallHeaderPrefix(candidate)) {
    return null;
  }
  const headerMatch = candidate.match(/^\[Tool call:\s*([^\]\n]+)\]\s*\nArguments:\s*/);
  if (!headerMatch) return { kind: "partial" };
  const name = headerMatch[1]?.trim();
  const rawArgs = candidate.slice(headerMatch[0].length).trim();
  if (!name || !rawArgs) return { kind: "partial" };
  const decoders = [
    (value: string) => value,
    (value: string) => {
      if (value.startsWith('"') && value.endsWith('"')) {
        const decoded = JSON.parse(value);
        return typeof decoded === "string" ? decoded : value;
      }
      return value;
    },
  ];
  for (const decode of decoders) {
    try {
      const decoded = decode(rawArgs);
      const parsed = JSON.parse(decoded);
      return { kind: "complete", name, args: stripZeroWidth(parsed) };
    } catch {}
  }
  return { kind: "partial" };
}

function containsTextualToolCallMarker(text: unknown): boolean {
  return (
    typeof text === "string" && text.replace(/[\u200B-\u200D\uFEFF]/g, "").includes("[Tool call:")
  );
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

  const results = [];
  const candidate = response.candidates?.[0];

  if (!candidate) {
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
        const accumulated = (state.textualToolCallBuffer || "") + part.text;
        const candidate = parseTextualToolCallCandidate(accumulated);

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

        if (state.textualToolCallBuffer) {
          const flushedText = state.textualToolCallBuffer + part.text;
          state.textualToolCallBuffer = "";
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

        results.push({
          id: `chatcmpl-${state.messageId}`,
          object: "chat.completion.chunk",
          created: Math.floor(Date.now() / 1000),
          model: state.model,
          choices: [
            {
              index: 0,
              delta: { content: part.text },
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
      } else if (!containsTextualToolCallMarker(remainingText)) {
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

    let finishReason = candidate.finishReason.toLowerCase();
    if (finishReason === "stop" && state.toolCalls.size > 0) {
      finishReason = "tool_calls";
    } else if (finishReason === "max_tokens") {
      finishReason = "length";
    }
    // Content blocked by Gemini safety filters — pass through as "content_filter"
    // so downstream clients can distinguish from normal completion.
    if (
      finishReason === "safety" ||
      finishReason === "recitation" ||
      finishReason === "blocklist"
    ) {
      finishReason = "content_filter";
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
register(FORMATS.GEMINI_CLI, FORMATS.OPENAI, null, geminiToOpenAIResponse);
register(FORMATS.ANTIGRAVITY, FORMATS.OPENAI, null, geminiToOpenAIResponse);
