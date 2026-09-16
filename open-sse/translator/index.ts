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
import { isInternalReasoningPlaceholder } from "../utils/reasoningPlaceholder.ts";
import {
  coerceToolSchemas,
  injectEmptyReasoningContentForToolCalls,
  injectOptionalEnumOmissionForTools,
  injectOptionalStringOmissionForTools,
  sanitizeToolDescriptions,
} from "./helpers/schemaCoercion.ts";
import { getRequestTranslator, getResponseTranslator } from "./registry.ts";
import { bootstrapTranslatorRegistry } from "./bootstrap.ts";
import { hasThinkingConfig, normalizeThinkingConfig } from "../services/provider.ts";
import { applyThinkingBudget } from "../services/thinkingBudget.ts";
import { applyReasoningRuleDirective } from "@/lib/reasoningRouting/policy";
import { getModelPreserveVideoUrl } from "@/lib/db/models/modelPreserveVideoUrl";
import { getResolvedModelCapabilities, supportsReasoning } from "../services/modelCapabilities.ts";
import { normalizeRoles } from "../services/roleNormalizer.ts";
import { hoistLeadingSystemMessage } from "./helpers/strictSystemHoist.ts";
import {
  buildAssistantMessageCacheKey,
  lookupReasoning,
  recordReplay,
  requiresReasoningReplay,
} from "../services/reasoningCache.ts";
import {
  normalizeResponsesReasoningEffort,
  RESPONSES_STORE_MARKER,
} from "./request/openai-responses/helpers.ts";
import { applyReasoningInputPolicy } from "../services/reasoningInputPolicy.ts";

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

  // #10165 safety net: if a chat-shaped body reached Responses normalization
  // without input, promote messages → input and map token/format fields.
  if (normalized.input == null && Array.isArray(normalized.messages)) {
    normalized.input = normalized.messages;
    delete normalized.messages;
  }
  if (normalized.max_output_tokens == null) {
    if (normalized.max_completion_tokens != null) {
      normalized.max_output_tokens = normalized.max_completion_tokens;
      delete normalized.max_completion_tokens;
    } else if (normalized.max_tokens != null) {
      normalized.max_output_tokens = normalized.max_tokens;
      delete normalized.max_tokens;
    }
  } else {
    delete normalized.max_tokens;
    delete normalized.max_completion_tokens;
  }
  if (normalized.response_format != null && normalized.text == null) {
    normalized.text = { format: normalized.response_format };
    delete normalized.response_format;
  } else if (normalized.response_format != null) {
    delete normalized.response_format;
  }

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
    requiresReasoningReplay({
      provider: normalizedProvider,
      model: normalizedModel,
      allowLegacyFallback: false,
    })
  );
}

/**
 * Upstreams that reject an ABSENT reasoning_content on replay turns, so the
 * placeholder must survive the cache miss.
 *
 * #9573/#9610 removed the placeholder globally because the model echoed it as
 * its own reasoning and stopped (empty turns). That holds for DeepSeek, where
 * an absent field was verified to be accepted — but Xiaomi MiMo still 400s
 * ("Param Incorrect: The reasoning_content in the thinking mode must be passed
 * back to the API", 9router#1321/#1337), so omitting the field there trades one
 * live bug for another. The opencode console gateways (opencode-go /
 * opencode-zen / opencode) enforce the same contract on their Responses
 * transport for deepseek/glm thinking models (production: 54× 400 "The
 * reasoning_text in the thinking mode must be passed back to the API" in one
 * day). Keep the placeholder only for those providers; the echo that comes
 * back is still stripped on the way in by isInternalReasoningPlaceholder(), so
 * it never re-poisons cache or history.
 */
function requiresReasoningContentPresence(provider: unknown, model: unknown): boolean {
  const normalizedProvider = String(provider ?? "")
    .trim()
    .toLowerCase();
  const normalizedModel = String(model ?? "")
    .trim()
    .toLowerCase();
  return (
    normalizedProvider === "xiaomi-mimo" ||
    /(^|\/)mimo/i.test(normalizedModel) ||
    ["opencode", "opencode-go", "opencode-zen"].includes(normalizedProvider)
  );
}

type OpenAIReplayOptions = {
  canReplayReasoningOnly: boolean;
  requiresExplicitReasoningReplay: boolean;
  provider: string;
  model: string;
  reasoningCacheScope?: string | null;
};

function replayOpenAIReasoningMessage(
  messages: Array<Record<string, unknown>>,
  messageIndex: number,
  options: OpenAIReplayOptions
): void {
  const message = messages[messageIndex];
  if (!message || message.role !== "assistant") return;

  // Moonshot `partial` messages are output prefixes, not completed prior turns.
  if (message.partial === true) {
    if (message.reasoning_content === "") delete message.reasoning_content;
    return;
  }

  if (
    !hasNonEmptyReasoningContent(message) &&
    typeof message.reasoning === "string" &&
    message.reasoning.trim().length > 0
  ) {
    message.reasoning_content = message.reasoning;
  }

  const toolCalls = Array.isArray(message.tool_calls) ? message.tool_calls : [];
  const hasToolCalls = toolCalls.length > 0;
  const shouldReplayReasoningOnly =
    !hasToolCalls && options.canReplayReasoningOnly && !hasNonEmptyReasoningContent(message);

  if (!hasToolCalls && !shouldReplayReasoningOnly) {
    if (
      message.reasoning_content === "" ||
      isInternalReasoningPlaceholder(message.reasoning_content)
    ) {
      delete message.reasoning_content;
    }
    return;
  }

  if (hasNonEmptyReasoningContent(message)) {
    if (!isInternalReasoningPlaceholder(message.reasoning_content)) return;
    delete message.reasoning_content;
  }

  const firstToolCall =
    toolCalls[0] && typeof toolCalls[0] === "object" && !Array.isArray(toolCalls[0])
      ? (toolCalls[0] as Record<string, unknown>)
      : null;
  const cacheKey = hasToolCalls
    ? typeof firstToolCall?.id === "string"
      ? firstToolCall.id
      : ""
    : buildAssistantMessageCacheKey(options.reasoningCacheScope, messages, messageIndex);
  if (cacheKey) {
    const cached = lookupReasoning(cacheKey);
    if (cached) {
      message.reasoning_content = cached;
      recordReplay();
      return;
    }
  }

  if (options.requiresExplicitReasoningReplay) {
    if (message.reasoning_content === "") delete message.reasoning_content;
    // Presence-enforcing upstreams (opencode console gateways, Xiaomi MiMo)
    // 400 when a thinking-mode replay turn lacks the reasoning field — even on
    // a reasoning-cache miss, where the original summary is unavailable. Emit
    // the internal sentinel so the Responses converter still emits the
    // reasoning_text item; the echo coming back is stripped on the way in by
    // isInternalReasoningPlaceholder(), so it never re-poisons cache or
    // history (#9573). DeepSeek itself accepts an ABSENT field — untouched.
    if (
      !message.reasoning_content &&
      (hasToolCalls || shouldReplayReasoningOnly) &&
      requiresReasoningContentPresence(options.provider, options.model)
    ) {
      message.reasoning_content = NON_ANTHROPIC_THINKING_PLACEHOLDER;
    }
    return;
  }

  if ((hasToolCalls || shouldReplayReasoningOnly) && !message.reasoning_content) {
    if (requiresReasoningContentPresence(options.provider, options.model)) {
      message.reasoning_content = NON_ANTHROPIC_THINKING_PLACEHOLDER;
    } else {
      delete message.reasoning_content;
    }
  }
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
    reasoningCacheScope?: string | null;
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
  const normalizedProvider = String(provider ?? "");
  const normalizedModel = String(model ?? "");
  const isKimiCoding =
    normalizedProvider === "kimi-coding" || normalizedProvider === "kimi-coding-apikey";

  // GLM-family upstreams (Z.AI / Zhipu console gateways) reject messages arrays
  // with no role:"user" turn (400 [1214] "The messages parameter is illegal").
  // Pure tool-loop continuations from coding agents produce exactly that shape
  // after Claude→OpenAI conversion, so flag those providers to have the source→
  // openai translator append a synthetic user turn when none survives.
  const isGlmFamilyUpstream =
    ["opencode-go", "opencode-zen"].includes(normalizedProvider) ||
    /glm|zhipu|z-ai/i.test(normalizedModel);

  // Phase 2: Apply thinking budget control before normalization
  result = applyThinkingBudget(result);
  // Explicit reasoning-routing policies are final. The marker is internal and is
  // consumed here before any provider translation can see it.
  result = applyReasoningRuleDirective(result);

  // Normalize thinking config: remove if lastMessage is not user
  normalizeThinkingConfig(result);

  // Resolve the replay contract before Responses input is converted: conversion
  // must know whether reasoning items are protocol history rather than display metadata.
  const resolvedCapabilities = getResolvedModelCapabilities({
    provider: normalizedProvider,
    model: normalizedModel,
  });
  const replayRequirements = {
    provider: normalizedProvider,
    model: normalizedModel,
    thinkingEnabled: hasThinkingConfig(result),
    supportsReasoning: supportsReasoning({
      provider: normalizedProvider,
      model: normalizedModel,
    }),
    interleavedField: resolvedCapabilities?.interleavedField ?? null,
  };
  const isReasoner = requiresReasoningReplay(replayRequirements);
  const requiresExplicitReasoningReplay = requiresReasoningReplay({
    ...replayRequirements,
    allowLegacyFallback: false,
  });
  const preserveResponsesReasoning = sourceFormat === FORMATS.OPENAI_RESPONSES && isReasoner;

  // Ensure tool_calls have id; optionally normalize to 9-char for providers like Mistral
  ensureToolCallIds(result, { use9CharId });

  // Fix missing tool responses (insert empty tool_result if needed)
  fixMissingToolResponses(result);

  // Claude reconciliation preserves orphaned tool output as labelled user text.
  // Keep the raw result carriers until the target translator can perform that
  // lossless conversion; other target formats retain the strict orphan filter.
  if (targetFormat !== FORMATS.CLAUDE) {
    stripOrphanedToolResults(result);
  }

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

  // GLM-family upstreams (Z.AI / Zhipu console gateways) reject messages arrays
  // with no role:"user" turn (400 [1214] "The messages parameter is illegal") —
  // ALSO on the SAME-FORMAT (openai→openai) lane, where no source→openai
  // translator runs to apply the _ensureUserTurn credential flag. Agent
  // tool-loop continuations reach exactly that shape when every inbound user
  // turn was tool_result-only and context compression evicted the original
  // prompt (production evidence: opencode-go/glm-5.3-flash, 37× in one day).
  // Mirrors claude-to-openai.ts's _ensureUserTurn branch: appending at the end
  // keeps every earlier byte identical for upstream prompt caches.
  if (
    isGlmFamilyUpstream &&
    targetFormat === FORMATS.OPENAI &&
    Array.isArray(result.messages) &&
    !result.messages.some(
      (m) => m && typeof m === "object" && (m as Record<string, unknown>).role === "user"
    )
  ) {
    result.messages.push({ role: "user", content: "(continue)" });
  }

  if (
    sourceFormat === FORMATS.OPENAI &&
    targetFormat === FORMATS.OPENAI_RESPONSES &&
    isReasoner &&
    Array.isArray(result.messages)
  ) {
    const messages = result.messages as Array<Record<string, unknown>>;
    const replayOptions: OpenAIReplayOptions = {
      canReplayReasoningOnly: isReasoningOnlyReplayTarget(normalizedProvider, normalizedModel),
      requiresExplicitReasoningReplay,
      provider: normalizedProvider,
      model: normalizedModel,
      reasoningCacheScope: options?.reasoningCacheScope,
    };
    for (let messageIndex = 0; messageIndex < messages.length; messageIndex += 1) {
      replayOpenAIReasoningMessage(messages, messageIndex, replayOptions);
    }
  }

  // If same format, skip translation steps
  if (sourceFormat !== targetFormat) {
    // Check for direct translation path first (e.g., Claude → Gemini)
    const directTranslator = getRequestTranslator(sourceFormat, targetFormat);
    if (directTranslator && sourceFormat !== FORMATS.OPENAI && targetFormat !== FORMATS.OPENAI) {
      // Thread the routed provider id so target translators can apply provider-specific
      // quirks (e.g. Vertex rejects function_call.id — #3440).
      // Also thread signatureNamespace so Claude→Gemini can re-attach cached
      // thoughtSignature on tool-use history (#8979 / #2504 parity with the hub path).
      const hasNs = options?.signatureNamespace != null;
      const hasProvider = provider != null;
      const directCredentials =
        hasNs || hasProvider
          ? {
              ...(credentials && typeof credentials === "object" ? credentials : {}),
              ...(hasProvider ? { _provider: provider } : {}),
              ...(hasNs ? { _signatureNamespace: options.signatureNamespace } : {}),
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
            options?.copilotClient ||
            hasTargetHint ||
            preserveCacheControl ||
            preserveResponsesReasoning ||
            isGlmFamilyUpstream
              ? {
                  ...(credentials && typeof credentials === "object" ? credentials : {}),
                  ...(options?.copilotClient ? { _copilotClient: true } : {}),
                  ...(hasTargetHint ? { _targetFormat: targetFormat } : {}),
                  ...(preserveCacheControl ? { _preserveCacheControl: true } : {}),
                  ...(preserveResponsesReasoning ? { _preserveReasoningContent: true } : {}),
                  ...(isGlmFamilyUpstream ? { _ensureUserTurn: true } : {}),
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
          // #9780 — carry the Responses namespace identity map across the pivot.
          // Target translators return a brand-new object (buildKiroPayload et
          // al.), dropping the non-enumerable property step 1 attached; the
          // #7936 seam then gets null and namespace sub-tool calls come back
          // flattened, which Codex rejects with `unsupported call: <name>`.
          const identityMap = (result as Record<string, unknown>)._namespaceToolIdentityMap;
          const translated = fromOpenAI(model, result, stream, translationCredentials);
          if (
            identityMap instanceof Map &&
            translated &&
            typeof translated === "object" &&
            !((translated as Record<string, unknown>)._namespaceToolIdentityMap instanceof Map)
          ) {
            Object.defineProperty(translated, "_namespaceToolIdentityMap", {
              value: identityMap,
              enumerable: false,
              configurable: true,
              writable: true,
            });
          }
          result = translated;
        }
      }
    }
  }

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
      // Per-provider/model preserveVideoUrl flag from compat overrides.
      // Falls back to true for moonshot/kimi when unset (legacy behavior).
      preserveVideoUrl:
        getModelPreserveVideoUrl(normalizedProvider, normalizedModel) ??
        (normalizedProvider === "moonshot" || normalizedProvider === "kimi"),
    });
  }

  // Final step: prepare request for Claude format endpoints
  // Preserve cache_control when:
  // 1. Claude passthrough mode (Claude → Claude), OR
  // 2. Explicitly requested via options (for caching-aware clients like Claude Code)
  // When preserve-mode has nothing to preserve (the client sent no cache_control
  // anywhere), fall back to the standard heuristic so the request never ships
  // with zero prompt-cache breakpoints. Translator-path only — the CC relay
  // path keeps its "never supplement" contract.
  if (targetFormat === FORMATS.CLAUDE) {
    const isClaudePassthrough = sourceFormat === FORMATS.CLAUDE;
    const preserveCache = isClaudePassthrough || options?.preserveCacheControl === true;
    result = prepareClaudeRequest(result, provider, preserveCache, model, {
      fallbackToHeuristicWhenNoMarkers: true,
    });
  }

  // Normalize openai-responses input shape for providers that require list input.
  if (targetFormat === FORMATS.OPENAI_RESPONSES) {
    result = normalizeOpenAIResponsesRequest(result);
    // #12128: Sanitize reasoning input items for Responses targets (strip plaintext content for opaque backends)
    applyReasoningInputPolicy(result as Record<string, unknown>, "responses", {
      provider,
      preserveEncryptedReasoning:
        (credentials as { providerSpecificData?: { preserveEncryptedReasoning?: boolean } } | null)
          ?.providerSpecificData?.preserveEncryptedReasoning === true,
      onIncompatibleReasoning: "drop",
    });
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
    // Plain-string omission must run before coerceToolSchemas() strips `default`,
    // so defaulted optional strings stay unsentinelled. Enum injection stays after
    // coercion to preserve the #7023 pipeline.
    if (targetFormat === FORMATS.OPENAI_RESPONSES) {
      result.tools = injectOptionalStringOmissionForTools(result.tools);
    }
    result.tools = coerceToolSchemas(result.tools);
    result.tools = sanitizeToolDescriptions(result.tools);
    if (targetFormat === FORMATS.OPENAI_RESPONSES) {
      result.tools = injectOptionalEnumOmissionForTools(result.tools);
    }
  }

  if (
    targetFormat === FORMATS.OPENAI &&
    !requiresExplicitReasoningReplay &&
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
  if (isReasoner && result.messages && Array.isArray(result.messages)) {
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
        // Strip empty or placeholder reasoning_content on non-tool-call messages
        // we are NOT replaying. The placeholder is request scaffolding, never
        // real reasoning — forwarding it makes the model continue its chain of
        // thought FROM that text (echo → empty stop, #9573).
        if (msg.reasoning_content === "" || isInternalReasoningPlaceholder(msg.reasoning_content)) {
          delete msg.reasoning_content;
        }
        continue;
      }

      if (hasToolUseBlocks) {
        // ── Claude-format message ──
        // Has tool_use blocks but no thinking block yet.
        // Reasoning models (Kimi K2, etc.) require a thinking block before tool_use
        // on multi-turn or they regenerate the same tool call infinitely.
        const thinkingBlock = msg.content.find(
          (b) => b?.type === "thinking" || b?.type === "redacted_thinking"
        );
        const hasNonEmptyClientThinking =
          thinkingBlock?.type === "thinking" &&
          typeof thinkingBlock.thinking === "string" &&
          thinkingBlock.thinking.trim().length > 0;
        if (thinkingBlock && (!isKimiCoding || hasNonEmptyClientThinking)) continue;

        const toolUseBlocks = msg.content.filter((b) => b?.type === "tool_use");
        const firstToolUseId = toolUseBlocks[0]?.id;
        const firstToolUseIdx = msg.content.findIndex((b) => b?.type === "tool_use");

        // Client reasoning wins above. Otherwise try authentic replay before
        // retaining Kimi Code's empty protocol marker as the final fallback.
        if (firstToolUseId) {
          const cached = lookupReasoning(firstToolUseId);
          if (cached) {
            if (thinkingBlock) {
              thinkingBlock.type = "thinking";
              thinkingBlock.thinking = cached;
              delete thinkingBlock.data;
              delete thinkingBlock.signature;
            } else {
              msg.content.splice(firstToolUseIdx, 0, {
                type: "thinking",
                thinking: cached,
              });
            }
            recordReplay();
            continue;
          }
        }
        if (isKimiCoding) {
          if (thinkingBlock) {
            thinkingBlock.type = "thinking";
            thinkingBlock.thinking = "";
            delete thinkingBlock.data;
            delete thinkingBlock.signature;
          } else {
            msg.content.splice(firstToolUseIdx, 0, { type: "thinking", thinking: "" });
          }
          continue;
        }
        if (requiresExplicitReasoningReplay) continue;
        msg.content.splice(firstToolUseIdx, 0, {
          type: "thinking",
          thinking: NON_ANTHROPIC_THINKING_PLACEHOLDER,
        });
        continue;
      }

      // ── OpenAI-format message ──
      replayOpenAIReasoningMessage(result.messages, messageIndex, {
        canReplayReasoningOnly,
        requiresExplicitReasoningReplay,
        provider: normalizedProvider,
        model: normalizedModel,
        reasoningCacheScope: options?.reasoningCacheScope,
      });
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

  // #<store-marker-leak>: a Responses-source request stashes the client's
  // `store` intent under this internal marker (see the Responses -> OpenAI
  // step above) so a later OpenAI -> Responses re-conversion can restore it
  // as `store`. When the destination stays in Chat Completions shape (no
  // such re-conversion happens), nothing else consumes the marker, and it
  // was leaking verbatim into the real upstream request body — e.g. OpenAI
  // itself rejects it with "Unknown parameter: '_omnirouteResponsesStore'".
  // Always drop it here: any handler that still needs the client's original
  // `store` value would have already read the marker before this point.
  if (RESPONSES_STORE_MARKER in result) {
    delete result[RESPONSES_STORE_MARKER];
  }

  // #7293 follow-up: the pre-translation hoist above normalizes the *source*
  // message array, which a target translator can then undo. `claudeToOpenAI`
  // pushes `body.system` as a fresh leading system message before appending the
  // converted messages, so an already-hoisted system lands at index 1 again;
  // a Responses-source request has no `messages` at all until translation, so
  // the earlier call is a no-op for it. Re-run on the final outbound array —
  // it is the only shape the upstream actually sees. Idempotent: same array
  // reference for non-strict providers and already-compliant requests, so
  // prompt-cache prefixes stay stable.
  if (targetFormat === FORMATS.OPENAI && result.messages && Array.isArray(result.messages)) {
    result.messages = hoistLeadingSystemMessage(result.messages, provider);
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
      funcArgsEscapeState: {},
      funcNames: {},
      funcCallIds: {},
      funcArgsDone: {},
      funcItemAdded: {},
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
