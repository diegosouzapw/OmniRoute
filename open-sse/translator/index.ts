import { FORMATS } from "./formats.ts";
import {
  ensureToolCallIds,
  fixMissingToolResponses,
  stripOrphanedToolResults,
} from "./helpers/toolCallHelper.ts";
import {
  NON_ANTHROPIC_THINKING_PLACEHOLDER,
  prepareClaudeRequest,
} from "./helpers/claudeHelper.ts";
import { filterToOpenAIFormat } from "./helpers/openaiHelper.ts";
import {
  providerHonorsOpenAIFormatCacheControl,
  resolveConnectionCacheOverride,
} from "../utils/cacheControlPolicy.ts";
import { requiresAuthenticReasoningContent } from "../utils/reasoningContentInjector.ts";
import {
  coerceToolSchemas,
  injectEmptyReasoningContentForToolCalls,
  injectOptionalEnumOmissionForTools,
  sanitizeToolDescriptions,
} from "./helpers/schemaCoercion.ts";
import { getRequestTranslator, getResponseTranslator } from "./registry.ts";
import { bootstrapTranslatorRegistry } from "./bootstrap.ts";
import { hasThinkingConfig, normalizeThinkingConfig } from "../services/provider.ts";
import { applyThinkingBudget } from "../services/thinkingBudget.ts";
import { getResolvedModelCapabilities, supportsReasoning } from "../services/modelCapabilities.ts";
import { normalizeRoles } from "../services/roleNormalizer.ts";
import { hoistLeadingSystemMessage } from "./helpers/strictSystemHoist.ts";
import {
  lookupReasoning,
  recordReplay,
  requiresReasoningReplay,
} from "../services/reasoningCache.ts";
import { normalizeResponsesReasoningEffort } from "./request/openai-responses/helpers.ts";

bootstrapTranslatorRegistry();
export { register } from "./registry.ts";

function normalizeResponsesInputItem(item) {
  if (typeof item === "string") {
    return {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: item }],
    };
  }

  if (!item || typeof item !== "object") return item;

  if (item.type || item.role) {
    return item.type ? item : { type: "message", ...item };
  }

  if (typeof item.text === "string") {
    return {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: item.text }],
    };
  }

  return item;
}

// Promote a stray top-level Chat-Completions-shaped `reasoning_effort` into the
// Responses-shaped `reasoning:{effort}` object, in place, removing the top-level key.
// No-op when `reasoning` is already present (an explicit Responses-shaped value always
// wins) or when `reasoning_effort` is absent.
//
// This exists for the SAME-FORMAT lane (source === target === OPENAI_RESPONSES), where
// translateRequest's hub-and-spoke translation block is skipped entirely (#7631): a
// caller that lands a top-level `reasoning_effort` there — e.g. applyNoThinkingAlias
// on the OpenAI path, which runs upstream of model-format resolution and cannot know
// yet whether the target lane is Responses-native — would otherwise reach the upstream
// with BOTH an unrecognized top-level field AND no `reasoning.effort`, so suppression
// silently does not take effect. The cross-format path (openai -> openai-responses)
// already performs the equivalent promotion in toResponses.ts; this covers the lane
// that promotion never runs on.
function promoteStrayReasoningEffort(body) {
  if (!body || typeof body !== "object") return body;
  if (body.reasoning !== undefined) return body;
  if (body.reasoning_effort === undefined) return body;

  const effort = normalizeResponsesReasoningEffort(body.reasoning_effort);
  if (effort) {
    body.reasoning = { effort };
  }
  delete body.reasoning_effort;
  return body;
}

function normalizeOpenAIResponsesRequest(body) {
  if (!body || typeof body !== "object") return body;

  const normalized = promoteStrayReasoningEffort({ ...body });

  if (typeof normalized.input === "string") {
    normalized.input = [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: normalized.input }],
      },
    ];
    return normalized;
  }

  if (Array.isArray(normalized.input)) {
    normalized.input = normalized.input.map(normalizeResponsesInputItem);
    return normalized;
  }

  if (normalized.input && typeof normalized.input === "object") {
    normalized.input = [normalizeResponsesInputItem(normalized.input)];
    return normalized;
  }

  return normalized;
}

function getReasoningCacheRequestId(body: Record<string, unknown> | null | undefined): string {
  if (!body || typeof body !== "object") return "";

  const requestId =
    body._reasoningCacheRequestId ??
    body.reasoningCacheRequestId ??
    body.request_id ??
    body.requestId;
  return typeof requestId === "string" ? requestId.trim() : "";
}

function getAssistantMessageCacheKey(
  body: Record<string, unknown> | null | undefined,
  messageIndex: number
): string {
  const requestId = getReasoningCacheRequestId(body);
  return requestId ? `request:${requestId}:message:${messageIndex}` : "";
}

function hasNonEmptyReasoningContent(message: Record<string, unknown>): boolean {
  return typeof message.reasoning_content === "string" && message.reasoning_content.length > 0;
}

function isReasoningOnlyReplayTarget(provider: unknown, model: unknown): boolean {
  const normalizedProvider = String(provider ?? "")
    .trim()
    .toLowerCase();
  const normalizedModel = String(model ?? "")
    .trim()
    .toLowerCase();
  // DeepSeek V4 and Xiaomi MiMo both enforce "pass reasoning_content back on
  // subsequent turns" even on PLAIN (non-tool-call) assistant turns. Without
  // replaying on those turns the upstream 400s with "Param Incorrect: The
  // reasoning_content in the thinking mode must be passed back to the API."
  // (deepseek #1682, xiaomi-mimo 9router#1321/#1337).
  return (
    normalizedProvider === "deepseek" ||
    /(^|\/)deepseek/i.test(normalizedModel) ||
    normalizedProvider === "xiaomi-mimo" ||
    /(^|\/)mimo/i.test(normalizedModel) ||
    requiresAuthenticReasoningContent(normalizedProvider, normalizedModel)
  );
}

/** @param options.normalizeToolCallId - When true, use 9-char tool call ids (e.g. Mistral); when false, leave ids as-is */
/** @param options.preserveDeveloperRole - undefined/true: keep developer for OpenAI format (default); false: map to system */
/** @param options.preserveCacheControl - When true, preserve client-side cache_control markers (for Claude Code, etc.) */
// Translate request: source -> openai -> target
// Client-only assistant "echo" fields that strict OpenAI-compatible upstreams (e.g.
// Mistral) reject with 422 extra_forbidden when sent back as input history. They carry
// no value upstream and are dropped on the OpenAI target path (#1649). `audio` is
// deliberately NOT included: OpenAI audio models reference a prior assistant audio
// response by id on multi-turn, so stripping it would break that (Mistral never emits
// audio, so it is never present there).
const OPENAI_INCOMPATIBLE_ECHO_FIELDS = [
  "reasoning_content",
  "reasoning",
  "refusal",
  "annotations",
  "cache_control",
];

export function translateRequest(
  sourceFormat,
  targetFormat,
  model,
  body,
  stream = true,
  credentials = null,
  provider = null,
  reqLogger = null,
  options?: {
    normalizeToolCallId?: boolean;
    preserveDeveloperRole?: boolean;
    preserveCacheControl?: boolean;
    signatureNamespace?: string | null;
    preCompressionBody?: Record<string, unknown> | null;
    /** UA-detected GitHub Copilot client. Forwarded to translators via the
     *  transient `_copilotClient` credential flag (see openai-responses → openai). */
    copilotClient?: boolean;
  }
) {
  let result = body;
  const use9CharId = options?.normalizeToolCallId === true;
  const preserveDeveloperRole = options?.preserveDeveloperRole;
  const connectionCacheOverride = resolveConnectionCacheOverride(
    (credentials as { providerSpecificData?: unknown } | null)?.providerSpecificData
  );

  // Phase 2: Apply thinking budget control before normalization
  result = applyThinkingBudget(result);

  // Normalize thinking config: remove if lastMessage is not user
  normalizeThinkingConfig(result);

  // Ensure tool_calls have id; optionally normalize to 9-char for providers like Mistral
  ensureToolCallIds(result, { use9CharId });

  // Fix missing tool responses (insert empty tool_result if needed)
  fixMissingToolResponses(result);

  // Strip orphaned tool results (tool_result/role:tool with no matching tool_call)
  stripOrphanedToolResults(result);

  // Normalize roles: developer→system unless preserved, system→user for incompatible models.
  // This handles (1) sourceFormat openai with messages containing developer → non-openai target
  // or preserveDeveloperRole=false, and (2) all other paths where result.messages already exists.
  if (result.messages && Array.isArray(result.messages)) {
    result.messages = normalizeRoles(
      result.messages,
      provider || "",
      model || "",
      targetFormat,
      preserveDeveloperRole
    );
  }

  // #7293: hoist any system message at index > 0 onto index 0 for providers that reject
  // a non-first system role (systemMessageMustBeFirst() — same source of truth as the
  // memory-injection half, #6135/PR#6225). Runs for every path — including same-format
  // (OpenAI→OpenAI) passthrough, where none of the format-specific translators below
  // execute — so a client-injected mid-array system message (OpenCode/Kilo Code style
  // clients) is still normalized before reaching the upstream. No-op for non-strict
  // providers and for already-compliant requests (prompt-cache prefix stability).
  if (targetFormat === FORMATS.OPENAI && result.messages && Array.isArray(result.messages)) {
    result.messages = hoistLeadingSystemMessage(result.messages, provider);
  }

  // If same format, skip translation steps
  if (sourceFormat !== targetFormat) {
    // Check for direct translation path first (e.g., Claude → Gemini)
    const directTranslator = getRequestTranslator(sourceFormat, targetFormat);
    if (directTranslator && sourceFormat !== FORMATS.OPENAI && targetFormat !== FORMATS.OPENAI) {
      // Thread the routed provider id so target translators can apply provider-specific
      // quirks (e.g. Vertex rejects function_call.id — #3440).
      const directCredentials =
        provider != null
          ? {
              ...(credentials && typeof credentials === "object" ? credentials : {}),
              _provider: provider,
            }
          : credentials;
      result = directTranslator(model, result, stream, directCredentials);
    } else {
      // Fallback: hub-and-spoke via OpenAI
      // Step 1: source -> openai (if source is not openai)
      if (sourceFormat !== FORMATS.OPENAI) {
        const toOpenAI = getRequestTranslator(sourceFormat, FORMATS.OPENAI);
        if (toOpenAI) {
          // Forward Copilot UA marker to source→openai translators only.
          const hasTargetHint = targetFormat != null;
          // #2069 — forward the cache_control-preservation intent so the
          // source→openai translator (e.g. claudeToOpenAIRequest) keeps the
          // client's breakpoints — but ONLY for providers that honor explicit
          // OpenAI-format cache_control (DashScope/alibaba, Xiaomi MiMo). Generic
          // / implicit-cache OpenAI providers (openai/codex/azure) must still be
          // stripped.
          const preserveCacheControl =
            options?.preserveCacheControl === true &&
            providerHonorsOpenAIFormatCacheControl(provider, connectionCacheOverride);
          const step1Credentials =
            options?.copilotClient || hasTargetHint || preserveCacheControl
              ? {
                  ...(credentials && typeof credentials === "object" ? credentials : {}),
                  ...(options?.copilotClient ? { _copilotClient: true } : {}),
                  ...(hasTargetHint ? { _targetFormat: targetFormat } : {}),
                  ...(preserveCacheControl ? { _preserveCacheControl: true } : {}),
                }
              : credentials;
          result = toOpenAI(model, result, stream, step1Credentials);
          // Log OpenAI intermediate format
          reqLogger?.logOpenAIRequest?.(result);
        }
      }

      // Step 2: openai -> target (if target is not openai)
      if (targetFormat !== FORMATS.OPENAI) {
        const fromOpenAI = getRequestTranslator(FORMATS.OPENAI, targetFormat);
        if (fromOpenAI) {
          const hasNs = options?.signatureNamespace != null;
          const hasPreCompression = options?.preCompressionBody != null;
          const hasCopilot = options?.copilotClient === true;
          const hasProvider = provider != null;
          const translationCredentials =
            hasNs || hasPreCompression || hasCopilot || hasProvider
              ? {
                  ...(credentials && typeof credentials === "object" ? credentials : {}),
                  ...(hasNs ? { _signatureNamespace: options.signatureNamespace } : {}),
                  ...(hasPreCompression ? { _preCompressionBody: options.preCompressionBody } : {}),
                  ...(hasCopilot ? { _copilotClient: true } : {}),
                  // Routed provider id so target translators can apply provider-specific
                  // quirks (e.g. Vertex rejects function_call.id — #3440).
                  ...(hasProvider ? { _provider: provider } : {}),
                }
              : credentials;
          result = fromOpenAI(model, result, stream, translationCredentials);
        }
      }
    }
  }

  // Resolve reasoning-replay status up-front: it gates both the reasoning_content
  // strip in filterToOpenAIFormat below (#4849 must NOT strip client reasoning for
  // replay providers) and the cache re-injection further down.
  const normalizedProvider = String(provider ?? "");
  const normalizedModel = String(model ?? "");
  const isKimiCoding =
    normalizedProvider === "kimi-coding" || normalizedProvider === "kimi-coding-apikey";
  const requiresAuthenticReasoning = requiresAuthenticReasoningContent(
    normalizedProvider,
    normalizedModel
  );
  const resolvedCapabilities = getResolvedModelCapabilities({
    provider: normalizedProvider,
    model: normalizedModel,
  });
  const isReasoner = requiresReasoningReplay({
    provider: normalizedProvider,
    model: normalizedModel,
    thinkingEnabled: hasThinkingConfig(result),
    supportsReasoning: supportsReasoning({ provider: normalizedProvider, model: normalizedModel }),
    interleavedField: resolvedCapabilities?.interleavedField ?? null,
  });

  // Always normalize to clean OpenAI format when target is OpenAI
  // This handles hybrid requests (e.g., OpenAI messages + Claude tools)
  if (targetFormat === FORMATS.OPENAI) {
    // #2069 — preserve client cache_control breakpoints only for providers that
    // honor explicit OpenAI-format markers (DashScope/alibaba, Xiaomi MiMo) when
    // requested upstream; generic/implicit-cache OpenAI providers stay stripped.
    result = filterToOpenAIFormat(result, {
      preserveCacheControl:
        options?.preserveCacheControl === true &&
        providerHonorsOpenAIFormatCacheControl(provider, connectionCacheOverride),
      // #4849 regression guard: keep client reasoning_content for replay providers.
      preserveReasoningContent: isReasoner,
      // Moonshot's Chat API accepts its own OpenAI-compatible `video_url` block.
      preserveVideoUrl: normalizedProvider === "moonshot" || normalizedProvider === "kimi",
    });
  }

  // Final step: prepare request for Claude format endpoints
  // Preserve cache_control when:
  // 1. Claude passthrough mode (Claude → Claude), OR
  // 2. Explicitly requested via options (for caching-aware clients like Claude Code)
  if (targetFormat === FORMATS.CLAUDE) {
    const isClaudePassthrough = sourceFormat === FORMATS.CLAUDE;
    const preserveCache = isClaudePassthrough || options?.preserveCacheControl === true;
    result = prepareClaudeRequest(result, provider, preserveCache, model);
  }

  // Normalize openai-responses input shape for providers that require list input.
  if (targetFormat === FORMATS.OPENAI_RESPONSES) {
    result = normalizeOpenAIResponsesRequest(result);
  }

  // Second role normalization: only for OPENAI_RESPONSES. Here messages are built from input
  // after the translation step, so the first normalizeRoles (above) did not see them. For
  // sourceFormat openai with messages already on the body, the first block handles developer
  // → system (non-openai target or preserveDeveloperRole=false); no second pass needed.
  if (
    sourceFormat === FORMATS.OPENAI_RESPONSES &&
    result.messages &&
    Array.isArray(result.messages)
  ) {
    result.messages = normalizeRoles(
      result.messages,
      provider || "",
      model || "",
      targetFormat,
      preserveDeveloperRole
    );
  }

  if (result.tools !== undefined) {
    result.tools = coerceToolSchemas(result.tools);
    result.tools = sanitizeToolDescriptions(result.tools);
    if (targetFormat === FORMATS.OPENAI_RESPONSES) {
      result.tools = injectOptionalEnumOmissionForTools(result.tools);
    }
  }

  if (
    targetFormat === FORMATS.OPENAI &&
    !requiresAuthenticReasoning &&
    result.messages &&
    Array.isArray(result.messages)
  ) {
    result.messages = injectEmptyReasoningContentForToolCalls(result.messages, provider, model);
  }

  // Ensure unique tool_call ids on final payload (translators may have introduced duplicates)
  ensureToolCallIds(result, { use9CharId });
  fixMissingToolResponses(result);
  stripOrphanedToolResults(result);

  if (result.tools) {
    result.tools = coerceToolSchemas(result.tools);
    result.tools = sanitizeToolDescriptions(result.tools);
  }

  // Reasoning Replay Cache (#1628): Re-inject cached reasoning_content for
  // thinking-mode models (DeepSeek V4, Kimi K2, Qwen-Thinking, etc.) when
  // clients omit it from the conversation history. Without this, DeepSeek V4
  // returns 400: "The reasoning_content in the thinking mode must be passed
  // back to the API."
  // isReasoner / normalizedProvider / normalizedModel / resolvedCapabilities were
  // resolved up-front (before the OpenAI-format filter) so the #4849 reasoning strip
  // could honor reasoning-replay providers.
  if (isReasoner && !isKimiCoding && result.messages && Array.isArray(result.messages)) {
    const canReplayReasoningOnly = isReasoningOnlyReplayTarget(normalizedProvider, normalizedModel);

    for (const [messageIndex, msg] of result.messages.entries()) {
      if (msg.role !== "assistant") continue;
      // Moonshot `partial` messages are output prefixes, not completed prior
      // assistant turns. Never attach replayed or placeholder reasoning to them.
      if (msg.partial === true) {
        if (msg.reasoning_content === "") delete msg.reasoning_content;
        continue;
      }

      // Detect tool calls in either format
      const hasToolCalls = Array.isArray(msg.tool_calls) && msg.tool_calls.length > 0;
      // Claude format: tool_use lives in content[] blocks, not msg.tool_calls
      const hasToolUseBlocks =
        !hasToolCalls &&
        Array.isArray(msg.content) &&
        msg.content.some((b) => b?.type === "tool_use");

      // For DeepSeek replay targets, a plain (non-tool-call) assistant turn must
      // ALSO carry reasoning_content in thinking mode, or DeepSeek V4+ returns 400:
      // "The reasoning_content in the thinking mode must be passed back to the API."
      // Enter the replay path when the field is MISSING or empty (#1682) — not only
      // when it is already present (the previous gate only matched messages that
      // already had the field, so stripped-history turns from clients like Cursor
      // were skipped and forwarded without reasoning_content).
      const shouldReplayReasoningOnly =
        !hasToolCalls &&
        !hasToolUseBlocks &&
        canReplayReasoningOnly &&
        !hasNonEmptyReasoningContent(msg);

      if (!hasToolCalls && !hasToolUseBlocks && !shouldReplayReasoningOnly) {
        // Strip empty reasoning_content on non-tool-call messages we are NOT
        // replaying (e.g. non-DeepSeek targets); an empty string has no meaningful
        // value to send and may confuse some upstreams.
        if (msg.reasoning_content === "") {
          delete msg.reasoning_content;
        }
        continue;
      }

      if (hasToolUseBlocks) {
        // ── Claude-format message ──
        // Has tool_use blocks but no thinking block yet.
        // Reasoning models (Kimi K2, etc.) require a thinking block before tool_use
        // on multi-turn or they regenerate the same tool call infinitely.
        const hasThinkingBlock = msg.content.some(
          (b) => b?.type === "thinking" || b?.type === "redacted_thinking"
        );
        if (hasThinkingBlock) continue;

        const toolUseBlocks = msg.content.filter((b) => b?.type === "tool_use");
        const firstToolUseId = toolUseBlocks[0]?.id;
        const firstToolUseIdx = msg.content.findIndex((b) => b?.type === "tool_use");

        // Try reasoning cache first
        if (firstToolUseId) {
          const cached = lookupReasoning(firstToolUseId);
          if (cached) {
            msg.content.splice(firstToolUseIdx, 0, {
              type: "thinking",
              thinking: cached,
            });
            recordReplay();
            continue;
          }
        }
        if (requiresAuthenticReasoning) continue;
        // Fallback: inject placeholder (must be non-empty for kimi-coding)
        msg.content.splice(firstToolUseIdx, 0, {
          type: "thinking",
          thinking: NON_ANTHROPIC_THINKING_PLACEHOLDER,
        });
        continue;
      }

      // ── OpenAI-format message ──
      // Skip if client already provided real reasoning_content
      if (hasNonEmptyReasoningContent(msg)) {
        continue;
      }

      const cacheKey = hasToolCalls
        ? msg.tool_calls[0]?.id
        : getAssistantMessageCacheKey(result, 0);
      if (cacheKey) {
        const cached = lookupReasoning(cacheKey);
        if (cached) {
          msg.reasoning_content = cached;
          recordReplay();
          continue;
        }
      }

      // Native Moonshot K3/K2.7 accepts only the real prior reasoning. If it
      // was not supplied and the cache missed, leave it absent so upstream can
      // enforce its contract instead of corrupting history with a placeholder.
      if (requiresAuthenticReasoning) {
        if (msg.reasoning_content === "") delete msg.reasoning_content;
        continue;
      }

      // Cache miss fallback — use a non-empty placeholder.
      // Empty string causes DeepSeek V4+ to reject with 400:
      // "reasoning_content in the thinking mode must be passed back to the API."
      // Note: injectEmptyReasoningContentForToolCalls may have pre-set
      // reasoning_content="" before the cache lookup, so we check for
      // both undefined AND empty string here.
      //
      // Applies to tool-call messages AND to plain (non-tool-call) assistant turns
      // on DeepSeek replay targets (#1682). Without the placeholder on plain turns,
      // a multi-turn text conversation whose reasoning_content the client stripped
      // is forwarded to DeepSeek without the field and rejected with 400.
      if ((hasToolCalls || shouldReplayReasoningOnly) && !msg.reasoning_content) {
        msg.reasoning_content = NON_ANTHROPIC_THINKING_PLACEHOLDER;
      }
    }
  } else if (
    !isReasoner &&
    targetFormat === FORMATS.OPENAI &&
    result.messages &&
    Array.isArray(result.messages)
  ) {
    for (const msg of result.messages) {
      for (const field of OPENAI_INCOMPATIBLE_ECHO_FIELDS) {
        if (msg[field] !== undefined) {
          delete msg[field];
        }
      }
    }
  }

  return result;
}

// Translate response chunk: target -> openai -> source
export function translateResponse(targetFormat, sourceFormat, chunk, state) {
  // If same format, return as-is — but never propagate the null/flush signal as a
  // literal `[null]`, which leaks an empty `data: null` SSE event between chunks and
  // crashes strict clients (#1052).
  if (sourceFormat === targetFormat) {
    return chunk == null ? [] : [chunk];
  }

  let results = [chunk];
  let openaiResults = null; // Store OpenAI intermediate results

  // Check for direct translation path first (e.g., Gemini → Claude)
  const directTranslator = getResponseTranslator(targetFormat, sourceFormat);
  if (directTranslator && targetFormat !== FORMATS.OPENAI && sourceFormat !== FORMATS.OPENAI) {
    const converted = directTranslator(chunk, state);
    if (converted) {
      results = Array.isArray(converted) ? converted : [converted];
    } else {
      results = [];
    }
    return results;
  }

  // Fallback: hub-and-spoke via OpenAI
  // Step 1: target -> openai (if target is not openai)
  if (targetFormat !== FORMATS.OPENAI) {
    const toOpenAI = getResponseTranslator(targetFormat, FORMATS.OPENAI);
    if (toOpenAI) {
      results = [];
      const converted = toOpenAI(chunk, state);
      if (converted) {
        results = Array.isArray(converted) ? converted : [converted];
        openaiResults = results; // Store OpenAI intermediate
      }
    }
  }

  // Step 2: openai -> source (if source is not openai)
  if (sourceFormat !== FORMATS.OPENAI) {
    const fromOpenAI = getResponseTranslator(FORMATS.OPENAI, sourceFormat);
    if (fromOpenAI) {
      const finalResults = [];
      for (const r of results) {
        const converted = fromOpenAI(r, state);
        if (converted) {
          finalResults.push(...(Array.isArray(converted) ? converted : [converted]));
        }
      }
      // Flush: pass null to source-format translator even when Step 1 produced no output.
      // This is critical for formats like openai-responses that emit terminal events
      // (e.g., response.completed with total_tokens) in their flush handler.
      if (chunk === null && results.length === 0) {
        const converted = fromOpenAI(null, state);
        if (converted) {
          finalResults.push(...(Array.isArray(converted) ? converted : [converted]));
        }
      }
      results = finalResults;
    }
  }

  // Attach OpenAI intermediate results for logging
  if (openaiResults && sourceFormat !== FORMATS.OPENAI && targetFormat !== FORMATS.OPENAI) {
    (results as { _openaiIntermediate?: unknown })._openaiIntermediate = openaiResults;
  }

  return results;
}

// Check if translation needed
export function needsTranslation(sourceFormat, targetFormat) {
  return sourceFormat !== targetFormat;
}

// Initialize state for streaming response based on format
export function initState(sourceFormat) {
  // Base state for all formats
  const base = {
    messageId: null,
    model: null,
    textBlockStarted: false,
    thinkingBlockStarted: false,
    inThinkingBlock: false,
    currentBlockIndex: null,
    toolCalls: new Map(),
    finishReason: null,
    finishReasonSent: false,
    usage: null,
    contentBlockIndex: -1,
  };

  // Add openai-responses specific fields
  if (sourceFormat === FORMATS.OPENAI_RESPONSES) {
    return {
      ...base,
      seq: 0,
      responseId: `resp_${Date.now()}`,
      created: Math.floor(Date.now() / 1000),
      started: false,
      msgTextBuf: {},
      msgItemAdded: {},
      msgContentAdded: {},
      msgItemDone: {},
      reasoningId: "",
      reasoningIndex: -1,
      reasoningBuf: "",
      reasoningPartAdded: false,
      reasoningDone: false,
      inThinking: false,
      parseTextualReasoningTags: false,
      funcArgsBuf: {},
      funcNames: {},
      funcCallIds: {},
      funcArgsDone: {},
      funcItemDone: {},
      completedOutputItems: [],
      completedSent: false,
    };
  }

  return base;
}

// Initialize all translators (no-op, kept for backward compatibility)
export function initTranslators() {
  bootstrapTranslatorRegistry();
}
