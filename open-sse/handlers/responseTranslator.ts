import { FORMATS } from "../translator/formats.ts";
import {
  buildGeminiThoughtSignatureKey,
  storeGeminiThoughtSignature,
} from "../services/geminiThoughtSignatureStore.ts";
import { normalizeOpenAICompatibleFinishReasonString } from "../utils/finishReason.ts";
import { containsTextualToolCallMarker } from "../utils/textualToolCall.ts";
import { stripObfuscationZeroWidth } from "../utils/zeroWidth.ts";
import { getAnyReasoningValue } from "../utils/reasoningFields.ts";
import {
  caseInsensitiveToolNameLookup,
  restoreOpenAIToolNames,
} from "../translator/helpers/toolCallHelper.ts";
import { restoreClaudeToolName } from "../services/claudeCodeToolRemapper.ts";
import { extractReplayableResponsesReasoningText } from "../services/reasoningInputPolicy.ts";
import { sanitizeToolId } from "../translator/helpers/schemaCoercion.ts";
import { stripEmptyOptionalToolArgs } from "../translator/response/openai-responses/pureHelpers.ts";

type JsonRecord = Record<string, unknown>;

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function toNumber(value: unknown, fallback = 0): number {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim().length > 0
        ? Number(value)
        : Number.NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

function firstPositiveNumber(...values: unknown[]): number {
  for (const value of values) {
    const parsed = toNumber(value, 0);
    if (parsed > 0) {
      return parsed;
    }
  }
  return 0;
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

function parseTextualToolCall(text: unknown): { name: string; args: unknown } | null {
  if (typeof text !== "string") return null;

  // Gemini/Antigravity sometimes imitates the request-side fallback with small
  // variations, e.g. a leading "(empty)" marker or zero-width chars inserted
  // into argument strings. Normalize those variants before parsing so the
  // response is still surfaced as a structured OpenAI tool call.
  const normalized = stripObfuscationZeroWidth(text);
  const match = normalized.match(
    /^[\s\S]*?\[Tool call:\s*([^\]\n]+)\]\s*\nArguments:\s*([\s\S]+?)\s*$/
  );
  if (!match) return null;
  const name = match[1]?.trim();
  const rawArgs = match[2]?.trim();
  if (!name || !rawArgs) return null;
  try {
    let args = JSON.parse(rawArgs);
    if (typeof args === "string") {
      const trimmed = args.trim();
      if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
        args = JSON.parse(trimmed);
      }
    }
    if (args && typeof args === "object" && !Array.isArray(args)) {
      return { name, args };
    }
  } catch {}
  return null;
}

function extractMessageOutputText(item: JsonRecord): string {
  if (!Array.isArray(item.content)) return "";
  let text = "";
  for (const part of item.content) {
    if (!part || typeof part !== "object") continue;
    const partObj = toRecord(part);
    if (partObj.type === "output_text" && typeof partObj.text === "string") {
      text += partObj.text;
    }
  }
  return text;
}

/**
 * T19: Pick the last non-empty message output text from Responses API output.
 * Falls back to the last message item even when all message texts are empty.
 */
function findBestMessageText(output: unknown[]): {
  text: string;
  selectedMessageIndex: number;
  messageItems: JsonRecord[];
} {
  const messageItems = output
    .map((item) => toRecord(item))
    .filter((item) => item.type === "message" && Array.isArray(item.content));

  for (let i = messageItems.length - 1; i >= 0; i -= 1) {
    const text = extractMessageOutputText(messageItems[i]);
    if (text.trim().length > 0) {
      return { text, selectedMessageIndex: i, messageItems };
    }
  }

  if (messageItems.length > 0) {
    const lastIndex = messageItems.length - 1;
    return {
      text: extractMessageOutputText(messageItems[lastIndex]),
      selectedMessageIndex: lastIndex,
      messageItems,
    };
  }

  return { text: "", selectedMessageIndex: -1, messageItems: [] };
}

/**
 * Translate non-streaming response to OpenAI format
 * Handles different provider response formats (Gemini, Claude, etc.)
 *
 * @param toolNameMap - Optional Map<prefixedName, originalName> for Claude OAuth tool name stripping
 * @param toolSchemas - Optional Map<toolName, parametersSchema> for schema-aware optional-arg cleanup
 */
export function translateNonStreamingResponse(
  responseBody: JsonRecord,
  targetFormat: string,
  sourceFormat: string,
  toolNameMap?: Map<string, string> | null,
  toolSchemas?: Map<string, JsonRecord> | null
): JsonRecord;
export function translateNonStreamingResponse(
  responseBody: unknown,
  targetFormat: string,
  sourceFormat: string,
  toolNameMap?: Map<string, string> | null,
  toolSchemas?: Map<string, JsonRecord> | null
): unknown;
export function translateNonStreamingResponse(
  responseBody: unknown,
  targetFormat: string,
  sourceFormat: string,
  toolNameMap?: Map<string, string> | null,
  toolSchemas?: Map<string, JsonRecord> | null
): unknown {
  // If already in source format, return as-is
  if (targetFormat === sourceFormat) {
    if (targetFormat === FORMATS.OPENAI) {
      restoreOpenAIToolNames(responseBody, toolNameMap);
    }
    return responseBody;
  }

  let intermediateOpenAI = responseBody;

  if (targetFormat === FORMATS.OPENAI) {
    restoreOpenAIToolNames(intermediateOpenAI, toolNameMap);
  }

  // Handle OpenAI Responses API format
  if (targetFormat === FORMATS.OPENAI_RESPONSES) {
    const responseRoot = toRecord(responseBody);
    const response =
      responseRoot.object === "response"
        ? responseRoot
        : toRecord(responseRoot.response ?? responseRoot);
    const output = Array.isArray(response.output) ? response.output : [];
    const usage = toRecord(response.usage ?? responseRoot.usage);

    const messageSelection = findBestMessageText(output);
    let textContent = messageSelection.text;
    let replayableReasoningContent = "";
    let reasoningSummary = "";
    const toolCalls: JsonRecord[] = [];

    for (const item of output) {
      if (!item || typeof item !== "object") continue;
      const itemObj = toRecord(item);

      if (itemObj.type === "message" && Array.isArray(itemObj.content)) {
        for (const part of itemObj.content) {
          if (!part || typeof part !== "object") continue;
          const partObj = toRecord(part);
          if (partObj.type === "summary_text" && typeof partObj.text === "string") {
            // #9500 — reasoning summary parts are discrete segments; join with "\n\n"
            // (matches extractThinkingFromContent convention) so they don't glue back-to-back.
            reasoningSummary += reasoningSummary ? `\n\n${partObj.text}` : partObj.text;
          }
        }
      } else if (itemObj.type === "reasoning") {
        const replayable = extractReplayableResponsesReasoningText(itemObj);
        if (replayable) {
          replayableReasoningContent += replayableReasoningContent
            ? `\n\n${replayable}`
            : replayable;
        }
        if (Array.isArray(itemObj.summary)) {
          for (const part of itemObj.summary) {
            const partObj = toRecord(part);
            if (partObj.type === "summary_text" && typeof partObj.text === "string") {
              reasoningSummary += reasoningSummary ? `\n\n${partObj.text}` : partObj.text;
            }
          }
        }
      } else if (itemObj.type === "function_call") {
        const callId =
          toString(itemObj.call_id) ||
          toString(itemObj.id) ||
          `call_${Date.now()}_${toolCalls.length}`;
        let argsToEmit = itemObj.arguments;
        const rawName = toString(itemObj.name);
        const toolSchema = toolSchemas?.get(rawName);
        if (toolSchema) {
          argsToEmit = stripEmptyOptionalToolArgs(argsToEmit, rawName, toolSchema);
        }
        if (argsToEmit != null && typeof argsToEmit === "object" && !Array.isArray(argsToEmit)) {
          const cleaned: JsonRecord = { ...(argsToEmit as JsonRecord) };
          for (const [k, v] of Object.entries(cleaned)) {
            if (v === "" || (Array.isArray(v) && v.length === 0)) delete cleaned[k];
          }
          argsToEmit = cleaned;
        }

        const fnArgs =
          typeof argsToEmit === "string" ? argsToEmit : JSON.stringify(argsToEmit || {});
        // Strip Claude OAuth proxy_ prefix using toolNameMap
        const resolvedName = caseInsensitiveToolNameLookup(rawName, toolNameMap) ?? rawName;
        toolCalls.push({
          id: callId,
          type: "function",
          function: {
            name: resolvedName,
            arguments: fnArgs,
          },
        });
      }
    }

    const message: JsonRecord = { role: "assistant" };
    if (textContent) {
      message.content = textContent;
    }
    if (replayableReasoningContent) {
      message.reasoning_content = replayableReasoningContent;
    }
    if (reasoningSummary) {
      message.reasoning_summary = [{ type: "summary_text", text: reasoningSummary }];
    }
    if (toolCalls.length > 0) {
      message.tool_calls = toolCalls;
    }
    if (
      (!message.content ||
        (typeof message.content === "string" && message.content.trim().length === 0)) &&
      toolCalls.length === 0 &&
      replayableReasoningContent &&
      replayableReasoningContent.trim().length > 0
    ) {
      message.content = replayableReasoningContent;
    } else if (message.content === undefined) {
      message.content = "";
    }

    if (process.env.DEBUG_RESPONSES_SSE_TO_JSON === "true") {
      console.log(
        `[ResponsesSSE] ${output.length} output items, ${messageSelection.messageItems.length} message items`
      );
      messageSelection.messageItems.forEach((item, idx) => {
        const textLen = extractMessageOutputText(item).length;
        console.log(`  [${idx}] text length: ${textLen}`);
      });
      console.log(`  → Selected message index: ${messageSelection.selectedMessageIndex}`);
      console.log(`  → Final text content length: ${textContent.length}`);
    }

    const createdAt = toNumber(response.created_at, Math.floor(Date.now() / 1000));
    const model = toString(response.model || responseRoot.model, "openai-responses");
    const finishReason = toolCalls.length > 0 ? "tool_calls" : "stop";

    const result: JsonRecord = {
      id: `chatcmpl-${toString(response.id, String(Date.now()))}`,
      object: "chat.completion",
      created: createdAt,
      model,
      choices: [
        {
          index: 0,
          message,
          finish_reason: finishReason,
        },
      ],
    };

    if (Object.keys(usage).length > 0) {
      const inputTokens = toNumber(usage.input_tokens, 0);
      const outputTokens = toNumber(usage.output_tokens, 0);
      const inputTokensDetails = toRecord(usage.input_tokens_details);
      const outputTokensDetails = toRecord(usage.output_tokens_details);
      const promptTokensDetails = toRecord(usage.prompt_tokens_details);
      const completionTokensDetails = toRecord(usage.completion_tokens_details);
      const cachedInputTokens = firstPositiveNumber(
        inputTokensDetails.cached_tokens,
        promptTokensDetails.cached_tokens,
        usage.cache_read_input_tokens
      );
      // `cache_write_tokens` is the alias emitted by the codex-chatgpt-web bridge
      // (input_tokens_details) and by OpenRouter/Devin Desktop (top level).
      const cacheCreationInputTokens = firstPositiveNumber(
        inputTokensDetails.cache_creation_tokens,
        promptTokensDetails.cache_creation_tokens,
        usage.cache_creation_input_tokens,
        inputTokensDetails.cache_write_tokens,
        promptTokensDetails.cache_write_tokens,
        usage.cache_write_tokens
      );
      const reasoningTokens = firstPositiveNumber(
        outputTokensDetails.reasoning_tokens,
        completionTokensDetails.reasoning_tokens,
        usage.reasoning_tokens
      );

      result.usage = {
        prompt_tokens: inputTokens,
        completion_tokens: outputTokens,
        total_tokens: inputTokens + outputTokens,
      };

      if (reasoningTokens > 0) {
        (result.usage as JsonRecord).completion_tokens_details = {
          reasoning_tokens: reasoningTokens,
        };
      }
      if (cachedInputTokens > 0 || cacheCreationInputTokens > 0) {
        (result.usage as JsonRecord).prompt_tokens_details = {};
        const promptDetails = (result.usage as JsonRecord).prompt_tokens_details as JsonRecord;
        if (cachedInputTokens > 0) {
          promptDetails.cached_tokens = cachedInputTokens;
        }
        if (cacheCreationInputTokens > 0) {
          promptDetails.cache_creation_tokens = cacheCreationInputTokens;
        }
      }
    }

    intermediateOpenAI = result;
  }

  // Handle Gemini/Antigravity format
  else if (targetFormat === FORMATS.GEMINI || targetFormat === FORMATS.ANTIGRAVITY) {
    const root = toRecord(responseBody);
    const response = toRecord(root.response ?? root);
    const candidates = Array.isArray(response.candidates) ? response.candidates : [];
    const usage = toRecord(response.usageMetadata ?? root.usageMetadata);
    const promptFeedback = toRecord(response.promptFeedback ?? root.promptFeedback);
    if (candidates.length > 0 || Object.keys(promptFeedback).length > 0) {
      const createdMs = Date.parse(toString(response.createTime));
      const created = Number.isFinite(createdMs)
        ? Math.floor(createdMs / 1000)
        : Math.floor(Date.now() / 1000);

      const choices =
        candidates.length > 0
          ? candidates.map((candidateValue, index) => {
              const candidate = toRecord(candidateValue);
              const content = toRecord(candidate.content);

              let textContent = "";
              const contentParts: JsonRecord[] = [];
              const toolCalls: JsonRecord[] = [];
              let reasoningContent = "";
              let pendingThoughtSignature = "";

              if (Array.isArray(content.parts)) {
                for (const part of content.parts) {
                  const partObj = toRecord(part);
                  if (partObj.thought === true && typeof partObj.text === "string") {
                    // #9500 — Gemini thinking parts are discrete segments; join with "\n\n"
                    // (matches extractThinkingFromContent convention) so they don't glue back-to-back.
                    reasoningContent += reasoningContent ? `\n\n${partObj.text}` : partObj.text;
                    continue;
                  }

                  // Capture thoughtSignature from thinking parts (Gemini thinking models)
                  // so it can be stored alongside any subsequent functionCall part.
                  const partThoughtSig = toString(
                    partObj.thoughtSignature ?? partObj.thought_signature
                  );
                  if (partThoughtSig) {
                    pendingThoughtSignature = partThoughtSig;
                  }

                  if (typeof partObj.text === "string") {
                    const textualToolCall = parseTextualToolCall(partObj.text);
                    if (textualToolCall) {
                      const toolCallId = `call_${toString(textualToolCall.name, "unknown")}_${Date.now()}_${toolCalls.length}`;
                      toolCalls.push({
                        id: toolCallId,
                        type: "function",
                        function: {
                          name: textualToolCall.name,
                          arguments: JSON.stringify(textualToolCall.args || {}),
                        },
                      });
                    } else if (!containsTextualToolCallMarker(partObj.text)) {
                      textContent += partObj.text;
                      contentParts.push({ type: "text", text: partObj.text });
                    }
                  }

                  const inlineData = toRecord(partObj.inlineData ?? partObj.inline_data);
                  if (typeof inlineData.data === "string" && inlineData.data.length > 0) {
                    const mimeType = toString(
                      inlineData.mimeType ?? inlineData.mime_type,
                      "image/png"
                    );
                    contentParts.push({
                      type: "image_url",
                      image_url: { url: `data:${mimeType};base64,${inlineData.data}` },
                    });
                  }

                  if (partObj.functionCall) {
                    const fn = toRecord(partObj.functionCall);
                    const rawName = toString(fn.name);
                    const restoredName =
                      caseInsensitiveToolNameLookup(rawName, toolNameMap) ?? rawName;
                    const nativeId = toString(fn.id);
                    const toolCallId =
                      nativeId.length > 0
                        ? nativeId
                        : `call_${toString(restoredName, "unknown")}_${Date.now()}_${toolCalls.length}`;

                    // Persist the thought signature so openai-to-gemini can
                    // resolve it on the next turn. Use the part-level field
                    // (part.thoughtSignature) and fall back to any signature
                    // captured from an earlier thinking-only part.
                    const sig = partThoughtSig || pendingThoughtSignature;
                    if (sig) {
                      const sigKey = buildGeminiThoughtSignatureKey(null, toolCallId);
                      storeGeminiThoughtSignature(sigKey, sig);
                    }

                    toolCalls.push({
                      id: toolCallId,
                      type: "function",
                      function: {
                        name: restoredName,
                        arguments: JSON.stringify(normalizeToolCallArgs(fn.args || {})),
                      },
                    });
                  }
                }
              }

              const message: JsonRecord = { role: "assistant" };
              if (contentParts.length === 1 && contentParts[0].type === "text") {
                message.content = contentParts[0].text;
              } else if (contentParts.length > 0) {
                message.content = contentParts;
              } else if (textContent) {
                message.content = textContent;
              }
              if (reasoningContent) {
                message.reasoning_content = reasoningContent;
              }
              if (toolCalls.length > 0) {
                message.tool_calls = toolCalls;
              }
              if (!message.content && !message.tool_calls) {
                message.content = "";
              }

              let finishReason = normalizeOpenAICompatibleFinishReasonString(
                toString(candidate.finishReason, "stop")
              );
              if (finishReason === "stop" && toolCalls.length > 0) {
                finishReason = "tool_calls";
              }

              return {
                index,
                message,
                finish_reason: finishReason,
              };
            })
          : [
              {
                index: 0,
                message: { role: "assistant", content: "" },
                finish_reason: "content_filter",
              },
            ];

      const result: JsonRecord = {
        id: `chatcmpl-${toString(response.responseId, String(Date.now()))}`,
        object: "chat.completion",
        created,
        model: toString(response.modelVersion, "gemini"),
        choices,
      };

      if (Object.keys(usage).length > 0) {
        const promptTokens = toNumber(usage.promptTokenCount, 0);
        const reasoningTokens = toNumber(usage.thoughtsTokenCount, 0);
        const completionTokens = toNumber(usage.candidatesTokenCount, 0) + reasoningTokens;

        result.usage = {
          prompt_tokens: promptTokens,
          completion_tokens: completionTokens,
          total_tokens: toNumber(usage.totalTokenCount, 0),
        };
        if (reasoningTokens > 0) {
          (result.usage as JsonRecord).completion_tokens_details = {
            reasoning_tokens: reasoningTokens,
          };
        }
        if (toNumber(usage.cachedContentTokenCount, 0) > 0) {
          (result.usage as JsonRecord).prompt_tokens_details = {
            cached_tokens: toNumber(usage.cachedContentTokenCount, 0),
          };
        }
      }

      intermediateOpenAI = result;
    }
  }

  // Handle Claude format
  else if (targetFormat === FORMATS.CLAUDE) {
    const root = toRecord(responseBody);
    const contentBlocks = Array.isArray(root.content) ? root.content : [];
    if (contentBlocks.length > 0) {
      let textContent = "";
      let thinkingContent = "";
      const toolCalls: JsonRecord[] = [];

      for (const block of contentBlocks) {
        const blockObj = toRecord(block);
        if (blockObj.type === "text") {
          textContent += toString(blockObj.text);
        } else if (blockObj.type === "thinking") {
          thinkingContent += toString(blockObj.thinking);
        } else if (blockObj.type === "tool_use") {
          const rawName = toString(blockObj.name);
          const strippedName = caseInsensitiveToolNameLookup(rawName, toolNameMap) ?? rawName;
          toolCalls.push({
            id: toString(blockObj.id, `call_${Date.now()}_${toolCalls.length}`),
            type: "function",
            function: {
              name: strippedName,
              arguments: JSON.stringify(blockObj.input || {}),
            },
          });
        }
      }

      // #9971: a content-less-but-valid Claude body (thinking / redacted_thinking
      // / tool_use-only, or a truncated extended-thinking-only stream) has blocks
      // but no final text. Surfacing it here helps correlate a live VPS capture
      // with detectMalformedNonStream's clause; the content itself is valid output
      // (see detectMalformedNonStream), so this is observation, not a decision.
      if (textContent.length === 0 && process.env.DEBUG_CLAUDE_NONSTREAM === "true") {
        console.log(
          `[ClaudeNonStream] ${contentBlocks.length} content block(s), empty textContent ` +
            `(thinking=${thinkingContent.length}, toolCalls=${toolCalls.length}); ` +
            `content-less-but-valid body preserved (not empty_choices)`
        );
      }

      const message: JsonRecord = { role: "assistant" };
      if (textContent) {
        message.content = textContent;
      }
      if (thinkingContent) {
        message.reasoning_content = thinkingContent;
      }
      if (toolCalls.length > 0) {
        message.tool_calls = toolCalls;
      }
      if (message.content === undefined) {
        message.content = "";
      }

      let finishReason = toString(root.stop_reason, "stop");
      if (finishReason === "end_turn") finishReason = "stop";
      if (finishReason === "tool_use") finishReason = "tool_calls";

      const result: JsonRecord = {
        id: `chatcmpl-${toString(root.id, String(Date.now()))}`,
        object: "chat.completion",
        created: Math.floor(Date.now() / 1000),
        model: toString(root.model, "claude"),
        choices: [
          {
            index: 0,
            message,
            finish_reason: finishReason,
          },
        ],
      };

      const usage = toRecord(root.usage);
      if (Object.keys(usage).length > 0) {
        // Mirror the streaming translator's usage contract (#1426/#2215):
        // cache_read folds into prompt_tokens (it is billed prompt input);
        // cache_creation stays out of prompt_tokens and is exposed via
        // prompt_tokens_details, alongside cached_tokens (OpenAI field name).
        const cachedTokens = toNumber(usage.cache_read_input_tokens, 0);
        const cacheCreationTokens = toNumber(usage.cache_creation_input_tokens, 0);
        const promptTokens = toNumber(usage.input_tokens, 0) + cachedTokens;
        const completionTokens = toNumber(usage.output_tokens, 0);
        const reasoningTokens = firstPositiveNumber(
          toRecord(usage.output_tokens_details).thinking_tokens,
          toRecord(usage.completion_tokens_details).reasoning_tokens,
          usage.reasoning_tokens
        );
        const usageOut: JsonRecord = {
          prompt_tokens: promptTokens,
          completion_tokens: completionTokens,
          total_tokens: promptTokens + completionTokens,
        };
        if (reasoningTokens > 0) {
          usageOut.reasoning_tokens = reasoningTokens;
          usageOut.completion_tokens_details = { reasoning_tokens: reasoningTokens };
        }
        if (cachedTokens > 0 || cacheCreationTokens > 0) {
          const details: JsonRecord = {};
          if (cachedTokens > 0) details.cached_tokens = cachedTokens;
          if (cacheCreationTokens > 0) details.cache_creation_tokens = cacheCreationTokens;
          usageOut.prompt_tokens_details = details;
        }
        result.usage = usageOut;
      }

      intermediateOpenAI = result;
    }
  }

  // Phase 3: Translate from OpenAI back to Client Source format
  if (sourceFormat === FORMATS.CLAUDE && sourceFormat !== targetFormat) {
    return convertOpenAINonStreamingToClaude(toRecord(intermediateOpenAI), toolNameMap ?? null);
  }

  // Gemini-family clients (Gemini, Antigravity): the streaming SSE path already
  // projects OpenAI chunks into the `{ response: { candidates: [...] } }` envelope
  // via the registered FORMATS.OPENAI -> FORMATS.ANTIGRAVITY translator
  // (translator/response/openai-to-antigravity.ts), but this non-streaming path had
  // no equivalent back-conversion step — it silently returned the raw OpenAI
  // chat.completion shape (leaking `choices[]`/`tool_calls` instead of
  // `candidates[]`/`functionCall`) to any non-streaming Gemini/Antigravity client.
  if (
    (sourceFormat === FORMATS.GEMINI || sourceFormat === FORMATS.ANTIGRAVITY) &&
    sourceFormat !== targetFormat
  ) {
    return convertOpenAINonStreamingToGeminiFamily(toRecord(intermediateOpenAI));
  }

  // Return intermediateOpenAI (which is either the raw response if unknown targetFormat, or an OpenAI compatible payload)
  return intermediateOpenAI;
}

/**
 * Resolve reasoning/thinking text off a non-streaming OpenAI-format message object.
 * Delegates to the shared reasoning-field resolver (`open-sse/utils/reasoningFields.ts`)
 * so every reasoning alias — DeepSeek-style `reasoning_content`, the OpenRouter/StepFun
 * `reasoning` string, GitHub Copilot's `reasoning_text`, `thinking`/`thought`, and
 * `reasoning_details[]` (array of { text | content }) — is read from one place instead
 * of a divergent local copy. Mirrors the streaming translator's fallback chain in
 * open-sse/translator/response/openai-to-claude.ts.
 */
function resolveReasoningText(messageObj: JsonRecord): string {
  return getAnyReasoningValue(messageObj);
}

/**
 * Helper to convert an OpenAI chat.completion JSON object to Claude format for non-streaming.
 *
 * `toolNameMap` carries request-side aliases; when it does not resolve a name,
 * `restoreClaudeToolName` upgrades known Claude Code tools to their canonical
 * PascalCase ("bash" → "Bash", "croncreate" → "CronCreate"). Without this, a
 * non-streaming upstream JSON body (or a stream:true request the upstream
 * answered with application/json) reaches Claude Code with lowercase tool_use
 * names the CLI rejects as "No such tool available".
 */
function convertOpenAINonStreamingToClaude(
  openaiResponse: JsonRecord,
  toolNameMap?: Map<string, string> | null
): JsonRecord {
  const choices = openaiResponse.choices as unknown[] | undefined;
  const isChoicesArray = Array.isArray(choices);
  if (!isChoicesArray && openaiResponse.object !== "chat.completion") {
    return openaiResponse; // If it doesn't look like OpenAI, return as-is
  }

  const choice = isChoicesArray ? choices[0] : null;
  const choiceObj = choice ? toRecord(choice) : {};
  const messageObj = choiceObj.message ? toRecord(choiceObj.message) : {};

  const content: JsonRecord[] = [];

  let hasTextOrReasoning = false;

  const reasoningText = resolveReasoningText(messageObj);
  if (reasoningText) {
    hasTextOrReasoning = true;
    content.push({
      type: "thinking",
      thinking: reasoningText,
    });
  }

  // Always include text if it exists (even empty string), or if there are no tool calls and no reasoning
  const hasToolCalls = Array.isArray(messageObj.tool_calls) && messageObj.tool_calls.length > 0;

  if (messageObj.content !== undefined && messageObj.content !== null) {
    hasTextOrReasoning = true;
    const resolvedText = toString(messageObj.content);
    content.push({
      type: "text",
      text: resolvedText === "" ? "(empty response)" : resolvedText,
    });
  } else if (!hasTextOrReasoning) {
    content.push({
      type: "text",
      text: "(empty response)",
    });
  }

  if (Array.isArray(messageObj.tool_calls)) {
    for (const tool of messageObj.tool_calls) {
      const toolObj = toRecord(tool);
      const fn = toRecord(toolObj.function);
      const rawId = toString(toolObj.id, `call_${Date.now()}`);
      content.push({
        type: "tool_use",
        id: sanitizeToolId(rawId),
        name: restoreClaudeToolName(toString(fn.name), toolNameMap ?? null),
        input:
          typeof fn.arguments === "string" ? JSON.parse(fn.arguments || "{}") : fn.arguments || {},
      });
    }
  }

  let stopReason = toString(choiceObj.finish_reason, "end_turn");
  if (stopReason === "stop") stopReason = "end_turn";
  if (stopReason === "tool_calls") stopReason = "tool_use";

  const usageSrc = toRecord(openaiResponse.usage);
  const promptTokens = toNumber(usageSrc.prompt_tokens, 0);
  const outputTokens = toNumber(usageSrc.completion_tokens, 0);

  // Extract cache tokens from prompt_tokens_details (mirrors the streaming
  // translator in open-sse/translator/response/openai-to-claude.ts lines 119-148).
  const promptDetails = toRecord(usageSrc.prompt_tokens_details);
  const cachedTokens = toNumber(promptDetails.cached_tokens, 0);
  const cacheCreationTokens = toNumber(promptDetails.cache_creation_tokens, 0);

  // OpenAI's prompt_tokens includes all prompt-side tokens (cached + non-cached).
  // Claude expects input_tokens to be only non-cached tokens, with cached tokens
  // exposed separately as cache_read_input_tokens.
  const inputTokens = promptTokens - cachedTokens - cacheCreationTokens;

  const usage: JsonRecord = {
    input_tokens: inputTokens,
    output_tokens: outputTokens,
  };

  // Add cache_read_input_tokens if present
  if (cachedTokens > 0) {
    usage.cache_read_input_tokens = cachedTokens;
  }

  // Add cache_creation_input_tokens if present
  if (cacheCreationTokens > 0) {
    usage.cache_creation_input_tokens = cacheCreationTokens;
  }

  const claudeResponse: JsonRecord = {
    id: toString(openaiResponse.id, `msg_${Date.now()}`),
    type: "message",
    role: "assistant",
    model: toString(openaiResponse.model, "claude"),
    content,
    stop_reason: stopReason,
    stop_sequence: null,
    usage,
  };

  return claudeResponse;
}

const OPENAI_TO_GEMINI_FINISH_REASON: Record<string, string> = {
  stop: "STOP",
  length: "MAX_TOKENS",
  tool_calls: "STOP",
  content_filter: "SAFETY",
};

/**
 * Parse an OpenAI tool-call `arguments` payload into a Gemini `functionCall.args`
 * object. Never throws: a provider emitting malformed/truncated JSON must not take
 * down the whole non-streaming response path, so an unparseable payload degrades to
 * `{}` (matching the streaming Gemini translator's behaviour).
 */
function parseFunctionCallArgs(args: unknown): Record<string, unknown> {
  if (typeof args !== "string") return toRecord(args);
  try {
    return toRecord(JSON.parse(args || "{}"));
  } catch {
    return {};
  }
}

/**
 * Helper to convert an OpenAI chat.completion JSON object into the Gemini/Antigravity
 * `{ response: { candidates: [...] } }` envelope for non-streaming clients. Mirrors the
 * shape already produced for streaming by the registered
 * FORMATS.OPENAI -> FORMATS.ANTIGRAVITY translator
 * (translator/response/openai-to-antigravity.ts) so both paths agree.
 */
function convertOpenAINonStreamingToGeminiFamily(openaiResponse: JsonRecord): JsonRecord {
  const choices = openaiResponse.choices as unknown[] | undefined;
  const isChoicesArray = Array.isArray(choices);
  if (!isChoicesArray && openaiResponse.object !== "chat.completion") {
    return openaiResponse; // If it doesn't look like OpenAI, return as-is
  }

  const choice = isChoicesArray ? toRecord(choices[0]) : {};
  const messageObj = toRecord(choice.message);

  const parts: JsonRecord[] = [];
  const reasoningText = resolveReasoningText(messageObj);
  if (reasoningText) {
    parts.push({ text: reasoningText, thought: true });
  }
  if (typeof messageObj.content === "string" && messageObj.content.length > 0) {
    parts.push({ text: messageObj.content });
  }
  const toolCalls = Array.isArray(messageObj.tool_calls) ? messageObj.tool_calls : [];
  for (const toolCall of toolCalls) {
    const toolObj = toRecord(toolCall);
    const fn = toRecord(toolObj.function);
    parts.push({
      functionCall: {
        name: toString(fn.name),
        args: parseFunctionCallArgs(fn.arguments),
      },
    });
  }
  if (parts.length === 0) parts.push({ text: "" });

  const finishReason =
    OPENAI_TO_GEMINI_FINISH_REASON[toString(choice.finish_reason, "stop")] ?? "STOP";

  const usageSrc = toRecord(openaiResponse.usage);
  const promptTokens = toNumber(usageSrc.prompt_tokens, 0);
  const completionTokens = toNumber(usageSrc.completion_tokens, 0);

  const geminiResponse: JsonRecord = {
    response: {
      candidates: [
        {
          content: { role: "model", parts },
          finishReason,
          index: 0,
        },
      ],
      usageMetadata: {
        promptTokenCount: promptTokens,
        candidatesTokenCount: completionTokens,
        totalTokenCount: toNumber(usageSrc.total_tokens, promptTokens + completionTokens),
      },
      modelVersion: toString(openaiResponse.model, "unknown"),
      responseId: toString(openaiResponse.id, `resp_${Date.now()}`),
    },
  };

  return geminiResponse;
}
