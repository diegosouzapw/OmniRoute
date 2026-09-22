/**
 * Request translation, tool maps, and dedup hash lifted out of handleChatCore.
 * Translation / tool / capability / quota early-returns stay here.
 */
import {
  extractRequestToolIdentityMap,
  resolveResponseToolNameMap,
} from "./requestToolIdentity.ts";
import {
  normalizeOpenAICompatibleTools,
  shouldNormalizeFunctionToolsOnly,
} from "./openAICompatibleTools.ts";
import { createTranslationFailureResult } from "./translationFailure.ts";
import { extractSystemRoleMessages, relocateDirectiveOnlyMessages } from "./claudeSystemRole.ts";
import {
  stampNativeResponsesPassthroughBody,
  redactPassthroughThinkingSignatures,
  isClaudeCodeSemanticPassthroughRequest,
} from "./passthroughHelpers.ts";
import { stripStore, usesClaudeBridge } from "./agentRouterProtocol.ts";
import { normalizeClaudeToolsForDispatch } from "./claudeToolDefaults.ts";
import { injectSystemPromptPreTranslation } from "../../services/systemPrompt.ts";
import { translateRequest } from "../../translator/index.ts";
import { applyReasoningRuleDirective } from "@/lib/reasoningRouting/policy";
import { withReasoningRuleContext } from "../../utils/reasoningRuleContext.ts";
import { FORMATS } from "../../translator/formats.ts";
import { sanitizeKiroTools } from "../../utils/kiroSanitizer.ts";
import { splitMisplacedToolResults } from "../../translator/helpers/claudeHelper.ts";
import { ensureCacheControlOnLastUserMessage } from "../../services/claudeCodeConstraints.ts";
import { createStreamController } from "../../utils/streamHandler.ts";
import * as streamFailure from "../../utils/streamFailureFinalization.ts";
import { applyResponsesPreviousResponseIdPolicy } from "../../utils/responsesStatePolicy.ts";
import { DEFAULT_THINKING_CLAUDE_SIGNATURE } from "../../config/defaultThinkingSignature.ts";
import {
  getStripTypesForProviderModel,
  stripIncompatibleMessageContent,
} from "../../services/modelStrip.ts";
import { shouldUseMidConversationSystem } from "../../executors/claudeIdentity.ts";
import { checkToolCallingRequiredButUnsupported } from "./toolCallingRequiredCheck.ts";
import { getUnsupportedParams } from "../../config/providerRegistry.ts";
import { buildClaudePassthroughToolNameMap } from "./passthroughToolNames.ts";
import { createErrorResult, sanitizeErrorMessage } from "../../utils/error.ts";
import {
  HTTP_STATUS,
  PROVIDER_MAX_TOKENS,
  STREAM_DISCONNECT_GRACE_PERIOD_MS,
} from "../../config/constants.ts";
import { trackPendingRequest } from "@/lib/usageDb";
import type { EnforceDecision } from "@/lib/quota/types";
import { writeCompressionAnalytics } from "./compressionAnalyticsWrite.ts";
import { getCacheControlSettings } from "@/lib/cacheControlSettings";
import {
  shouldPreserveCacheControl,
  resolveConnectionCacheOverride,
} from "../../utils/cacheControlPolicy.ts";
import { getModelNormalizeToolCallId, getModelPreserveOpenAIDeveloperRole } from "@/lib/db/models";
import { getClaudeCodeCompatibleRequestDefaults } from "@/lib/providers/requestDefaults";
import {
  buildClaudeCodeCompatibleRequest,
  resolveClaudeCodeCompatibleSessionId,
} from "../../services/claudeCodeCompatible.ts";
import { computeRequestHash, shouldDeduplicate } from "../../services/requestDedup.ts";
import { finalizePendingScope } from "@/lib/usage/pendingRequestScope";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags.ts";
import {
  checkRequestCapabilityFit,
  deriveRequestCapabilityRequirements,
  buildCapabilityMismatchMessage,
} from "@/shared/constants/capabilities/capabilityFilter.ts";
import { supportsMaxTokens, getResolvedModelCapabilities } from "@/lib/modelCapabilities.ts";
import type { ClaudeMessage } from "./claudeMessageTypes.ts";
import { normalizeClaudeUpstreamMessages as normalizeClaudeUpstreamMessagesFor } from "./claudeUpstreamMessages.ts";
import { resolveExecutionCredentials as resolveExecutionCredentialsFor } from "./executionCredentials.ts";
import { resolveExecutorWithProxy as resolveExecutorWithProxyFor } from "./executorProxy.ts";

export interface TranslateAndDedupOptions {
  body: Record<string, unknown>;
  tokensCompressed: number;
  compressionAnalyticsWritePromise: Promise<void> | null;
  compressionResponseMeta: string | null;
  runPostTranslationCompression?:
    | ((input: Record<string, unknown>) => Promise<{
        compressedBody: Record<string, unknown>;
        tokensSaved: number;
        annotation?: string;
        analyticsPromise?: Promise<void>;
      }>)
    | null;
  preCompressionBody: Record<string, unknown>;
  credentials: Record<string, unknown> | null | undefined;
  log?: {
    debug?: (category: string, message: string) => void;
    info?: (category: string, message: string) => void;
    warn?: (category: string, message: string) => void;
    error?: (category: string, message: string) => void;
  } | null;
  clientRawRequest?: {
    headers?: Headers | Record<string, string>;
    signal?: AbortSignal;
  } | null;
  connectionId: string | null;
  apiKeyInfo: Record<string, unknown> | null | undefined;
  userAgent?: string | null;
  comboName?: string | null;
  comboStrategy?: string | null;
  isCombo?: boolean;
  comboStepId?: string | null;
  comboExecutionKey?: string | null;
  provider: string;
  model: string;
  modelInfo?: Record<string, unknown> | null;
  effectiveModel: string;
  alias?: string | null;
  sourceFormat: string;
  targetFormat: string;
  stream?: boolean;
  clientResponseFormat?: string | null;
  providerRequiresStreaming?: boolean;
  nativeCodexPassthrough?: boolean;
  nativeXaiResponsesPassthrough?: boolean;
  nativeResponsesPassthrough?: boolean;
  nativeOpenAICompatibleResponsesPassthrough?: boolean;
  isCodexResponsesEcho?: boolean;
  copilotCompatibleReasoning?: boolean;
  reasoningCacheScope?: string | null;
  reqLogger?: unknown;
  trace?: ((stage: string) => void) | null;
  traceId: string;
  skillRequestId?: string | null;
  pendingScope?: unknown;
  endpointPath?: string;
  effectiveServiceTier?: string | null;
  onDisconnect?: (event: { reason: string; duration: number }) => void;
  settings: Record<string, unknown>;
  reasoningRuleDirective?: unknown;
  trustedEffortContext?: unknown;
}

export async function runTranslateAndDedup({
  body,
  tokensCompressed: tokensCompressedIn,
  compressionAnalyticsWritePromise: compressionAnalyticsWritePromiseIn,
  compressionResponseMeta: compressionResponseMetaIn,
  runPostTranslationCompression,
  preCompressionBody,
  credentials,
  log,
  clientRawRequest,
  connectionId,
  apiKeyInfo,
  userAgent,
  comboName,
  comboStrategy,
  isCombo,
  comboStepId,
  comboExecutionKey,
  provider,
  model,
  modelInfo,
  effectiveModel,
  alias,
  sourceFormat,
  targetFormat,
  stream,
  clientResponseFormat,
  providerRequiresStreaming,
  nativeCodexPassthrough,
  nativeXaiResponsesPassthrough,
  nativeResponsesPassthrough,
  nativeOpenAICompatibleResponsesPassthrough,
  isCodexResponsesEcho,
  copilotCompatibleReasoning,
  reasoningCacheScope,
  reqLogger,
  trace,
  traceId,
  skillRequestId,
  pendingScope,
  endpointPath,
  effectiveServiceTier,
  onDisconnect,
  settings,
  reasoningRuleDirective,
  trustedEffortContext,
}: TranslateAndDedupOptions) {
  let tokensCompressed = tokensCompressedIn;
  let compressionAnalyticsWritePromise = compressionAnalyticsWritePromiseIn;
  let compressionResponseMeta = compressionResponseMetaIn;
  let reasoningReplayHistory: unknown[] | null = null;
  let translatedBody = body;
  const isClaudePassthrough = sourceFormat === FORMATS.CLAUDE && targetFormat === FORMATS.CLAUDE;
  const isClaudeCodeCompatible = usesClaudeBridge(provider, targetFormat, credentials);
  const isClaudeCodeSemanticPassthrough = isClaudeCodeSemanticPassthroughRequest({
    provider,
    sourceFormat,
    targetFormat,
    headers: clientRawRequest?.headers,
    userAgent,
  });
  // `forceStream` providers (e.g. Cline / ClinePass) only implement upstream
  // streaming -- a non-streaming request returns "generateText is not implemented"
  // / an empty body. Force the upstream request to stream even when the client
  // wants JSON; the non-streaming branch below accumulates the SSE and converts
  // it back to JSON (same mechanism already used for Claude-Code-compatible
  // providers via isClaudeCodeCompatible).
  const upstreamStream = stream || isClaudeCodeCompatible || providerRequiresStreaming;
  let ccSessionId: string | null = null;
  const stripTypes = getStripTypesForProviderModel(provider || "", model || "");

  if (Array.isArray(translatedBody?.messages) && stripTypes.length > 0) {
    const stripResult = stripIncompatibleMessageContent(translatedBody.messages, stripTypes);
    if (stripResult.removedParts > 0) {
      translatedBody = {
        ...translatedBody,
        messages: stripResult.messages,
      };
      log?.warn?.(
        "CONTENT",
        `Stripped ${stripResult.removedParts} incompatible content part(s) for ${provider}/${model}`
      );
    }
  }

  // Determine if we should preserve client-side cache_control headers
  // Fetch settings from DB to get user preference
  const cacheControlMode = await getCacheControlSettings().catch(() => "auto" as const);
  const connectionCacheOverride = resolveConnectionCacheOverride(credentials?.providerSpecificData);
  const preserveCacheControl = shouldPreserveCacheControl({
    userAgent,
    isCombo,
    comboStrategy,
    targetProvider: provider,
    targetFormat,
    settings: { alwaysPreserveClientCache: cacheControlMode },
    connectionCacheOverride,
  });

  if (preserveCacheControl) {
    log?.debug?.(
      "CACHE",
      `Preserving client cache_control (client=${userAgent?.substring(0, 20)}, combo=${isCombo}, strategy=${comboStrategy}, provider=${provider})`
    );
  }

  // extractSystemMessagesToBody + normalizeClaudeUpstreamMessages extracted to
  // chatCore/claudeUpstreamMessages.ts (#3501); bind `log` once so the call sites stay byte-identical.
  const normalizeClaudeUpstreamMessages = (
    payload: Record<string, unknown>,
    options?: { preserveToolResultBlocks?: boolean }
  ) => normalizeClaudeUpstreamMessagesFor(payload, options, log);

  try {
    if (nativeResponsesPassthrough) {
      translatedBody = stampNativeResponsesPassthroughBody(
        applyReasoningRuleDirective(body, "openai-responses") as Record<string, unknown>,
        nativeCodexPassthrough
          ? "codex"
          : nativeXaiResponsesPassthrough
            ? "xai"
            : "openai-compatible"
      );
      log?.debug?.(
        "FORMAT",
        nativeCodexPassthrough
          ? "native codex passthrough enabled"
          : nativeXaiResponsesPassthrough
            ? "native xAI Responses Agent Tools passthrough enabled"
            : "native openai-compatible Responses passthrough enabled"
      );
    } else if (isClaudeCodeCompatible) {
      let normalizedForCc = { ...body };

      // Claude Code-compatible providers expect Anthropic Messages-shaped payloads,
      // but we extract only role/text/max_tokens/effort from an OpenAI-like view first.
      if (sourceFormat === FORMATS.CLAUDE && isClaudeCodeSemanticPassthrough) {
        normalizedForCc = applyReasoningRuleDirective(
          normalizedForCc,
          "claude"
        ) as typeof normalizedForCc;
        log?.debug?.("FORMAT", "claude-code semantic passthrough enabled for compatible bridge");
      } else if (sourceFormat !== FORMATS.OPENAI) {
        const normalizeToolCallId = getModelNormalizeToolCallId(
          provider || "",
          model || "",
          sourceFormat
        );
        const preserveDeveloperRole = getModelPreserveOpenAIDeveloperRole(
          provider || "",
          model || "",
          sourceFormat
        );
        normalizedForCc = translateRequest(
          sourceFormat,
          FORMATS.OPENAI,
          model,
          { ...body },
          stream,
          credentials,
          provider,
          reqLogger,
          {
            normalizeToolCallId,
            preserveDeveloperRole,
            preserveCacheControl,
            copilotClient: copilotCompatibleReasoning,
            reasoningCacheScope,
          }
        );
      }

      ccSessionId = resolveClaudeCodeCompatibleSessionId(clientRawRequest?.headers);
      const ccRequestDefaults = getClaudeCodeCompatibleRequestDefaults(
        credentials?.providerSpecificData
      );
      // OpenAI-shaped bridge requests skip translateRequest too.
      if (sourceFormat === FORMATS.OPENAI) {
        normalizedForCc = applyReasoningRuleDirective(normalizedForCc) as typeof normalizedForCc;
      }
      translatedBody = buildClaudeCodeCompatibleRequest({
        sourceBody: body,
        normalizedBody: normalizedForCc,
        claudeBody: sourceFormat === FORMATS.CLAUDE ? body : null,
        model,
        stream: upstreamStream,
        sessionId: ccSessionId,
        cwd: process.cwd(),
        now: new Date(),
        preserveCacheControl,
        preserveClaudeMessages: sourceFormat === FORMATS.CLAUDE && isClaudeCodeSemanticPassthrough,
        summarizeThinking: ccRequestDefaults.summarizeThinking === true,
      });
      log?.debug?.("FORMAT", "claude-code-compatible bridge enabled");

      if (isClaudeCodeSemanticPassthrough) {
        // Semantic passthrough: only lift system/developer role messages
        // without converting file/document blocks, tool history, etc.
        extractSystemRoleMessages(translatedBody);
      } else {
        // Non-CC path: full normalization including content type conversion.
        // Preserve tool_result blocks only when the upstream target speaks the
        // Anthropic Messages format -- OpenAI-compatible gateways reject them
        // and return 503. See issue #13971.
        normalizeClaudeUpstreamMessages(translatedBody, {
          preserveToolResultBlocks: targetFormat === FORMATS.CLAUDE,
        });
      }
    } else if (isClaudePassthrough) {
      // Pure passthrough: forward the body as-is without OpenAI round-trip.
      // The Claude->OpenAI->Claude double translation was lossy and corrupted
      // payloads at high context (150+ msgs, 100+ tools). Fix: #1359.
      // Claude Code sends well-formed Messages API payloads -- trust them
      // regardless of combo strategy or cache_control settings.
      translatedBody = applyReasoningRuleDirective({ ...body }, "claude");
      translatedBody._disableToolPrefix = true;

      // Sanitize historical thinking-block signatures for Anthropic-native Claude OAuth.
      // Only Anthropic's first-party API validates these signatures (token-bound); third-party
      // Claude-shape providers do not. See redactPassthroughThinkingSignatures + issue #2454.
      if (provider === "claude") {
        translatedBody.messages = redactPassthroughThinkingSignatures(
          translatedBody.messages,
          DEFAULT_THINKING_CLAUDE_SIGNATURE
        ) as typeof translatedBody.messages;

        // Anthropic API rejects requests with both temperature and top_p.
        // VS Code Claude extension and similar clients send both; strip top_p.
        if (translatedBody.temperature !== undefined && translatedBody.top_p !== undefined) {
          delete translatedBody.top_p;
        }
      }

      // Legacy models reject role:"system" messages. Supported models accept
      // them behind a beta, and hoisting them breaks the prompt cache prefix.
      if (isClaudeCodeSemanticPassthrough) {
        if (
          provider !== "claude" ||
          !shouldUseMidConversationSystem(translatedBody, effectiveModel)
        ) {
          extractSystemRoleMessages(translatedBody);
        } else {
          // The mid-conversation-system path keeps system-role messages inside
          // messages[], but a directive-only message (content: [] +
          // output_config) at messages[0] is rejected by Anthropic. Move it past
          // the first real turn; Anthropic accepts the form at any other position.
          relocateDirectiveOnlyMessages(translatedBody);
        }
        if (Array.isArray(translatedBody.messages)) {
          translatedBody.messages = splitMisplacedToolResults(
            translatedBody.messages as ClaudeMessage[]
          ) as typeof translatedBody.messages;
        }
        if (provider === "claude") {
          ensureCacheControlOnLastUserMessage(translatedBody);
        }
      } else {
        // Same guard as the CC-bridge path: only preserve tool_result blocks
        // for Anthropic-native targets. See issue #13971. This branch only runs
        // under isClaudePassthrough (sourceFormat === targetFormat === CLAUDE,
        // defined above), so targetFormat === FORMATS.CLAUDE always holds here --
        // the guard is a no-op on this call site, kept for symmetry with the
        // CC-bridge one above rather than a change to code the issue said not
        // to touch.
        normalizeClaudeUpstreamMessages(translatedBody, {
          preserveToolResultBlocks: targetFormat === FORMATS.CLAUDE,
        });
      }

      log?.debug?.("FORMAT", `claude passthrough (preserveCache=${preserveCacheControl})`);

      // Migrate deprecated top-level `output_format` -> `output_config.format`.
      // Anthropic returns a 400 on the legacy field; some clients (e.g. ForgeCode)
      // still emit it. Preserves an existing output_config.format if present.
      if (translatedBody.output_format !== undefined) {
        const oc =
          translatedBody.output_config && typeof translatedBody.output_config === "object"
            ? (translatedBody.output_config as Record<string, unknown>)
            : {};
        if (oc.format === undefined) oc.format = translatedBody.output_format;
        translatedBody.output_config = oc;
        delete translatedBody.output_format;
      }

      // Fix #1719: Strip output_config.format for non-Anthropic Claude-compatible providers.
      // Third-party Claude endpoints (MiniMax, DeepSeek via aggregators) reject this field
      // with 400 errors since they don't support Anthropic's structured output / json_schema.
      if (
        provider !== "claude" &&
        translatedBody.output_config &&
        typeof translatedBody.output_config === "object"
      ) {
        const oc = translatedBody.output_config as Record<string, unknown>;
        delete oc.format;
        if (Object.keys(oc).length === 0) {
          delete translatedBody.output_config;
        }
      }
    } else {
      translatedBody = { ...body };

      // Issue #199 + #618: Always disable tool name prefix in Claude passthrough.
      // The proxy_ prefix was designed for OpenAI->Claude translation to avoid
      // conflicts with Claude OAuth tools, but in the passthrough path the tools
      // are already in Claude format. Applying the prefix turns "Bash" into
      // "proxy_Bash", which Claude rejects ("No such tool available: proxy_Bash").
      //
      // #618's actual traffic was real Claude Code talking to first-party Anthropic
      // (provider "claude") reaching this fallback branch instead of the dedicated
      // Claude Code bridge/passthrough branches above. Scoping the disable to
      // `provider === "claude"` keeps that fix intact while no longer blanket-applying
      // it to every other provider that merely targets Claude's wire format -- a
      // third-party provider's own ordinary (non-Claude-native) tool names, e.g.
      // GitHub Copilot's own client-executed "web_fetch" tool, were passing through
      // unprefixed here and colliding with Claude's reserved tool namespace, since
      // they were never "already in Claude format" the way this comment assumes.
      // See #13835.
      if (targetFormat === FORMATS.CLAUDE) {
        if (provider === "claude") {
          translatedBody._disableToolPrefix = true;
        }
        normalizeClaudeUpstreamMessages(translatedBody);
      }

      // OpenAI-compatible providers only support function tools.
      // Non-function tool types (computer, mcp, web_search, custom, etc.) are handled:
      //   - tools with a name -> converted to function format in-place before translation
      //   - tools without a name AND without .function -> dropped (unconvertible)
      // This must happen before translateRequest, which validates and throws on unknown types.
      // Skip normalization when we are in native openai-compatible Responses passthrough mode
      // to preserve native tool definitions (exec with lark grammar, collaboration namespace, etc.).
      // #13789: built-in providers observed to reject non-function tool types (agentrouter GLM:
      // `400 tools[0].type:type is illegal`) are normalized too, via a conservative allowlist
      // in shouldNormalizeFunctionToolsOnly that keeps openai's own `custom` tools untouched.
      if (
        !nativeOpenAICompatibleResponsesPassthrough &&
        shouldNormalizeFunctionToolsOnly(provider, targetFormat) &&
        Array.isArray(translatedBody.tools)
      ) {
        const normalized = normalizeOpenAICompatibleTools(
          translatedBody.tools as Record<string, unknown>[],
          sourceFormat
        );
        translatedBody.tools = normalized.tools;
        const { dropped } = normalized;
        if (dropped > 0) {
          log?.debug?.(
            "TOOLS",
            `Dropped ${dropped} unconvertible tool(s) for ${provider} (function-tools-only)`
          );
        }
      }

      const normalizeToolCallId = getModelNormalizeToolCallId(
        provider || "",
        model || "",
        sourceFormat
      );
      const preserveDeveloperRole = getModelPreserveOpenAIDeveloperRole(
        provider || "",
        model || "",
        sourceFormat
      );
      // Carrier-less targets (kiro / antigravity) have no post-translation
      // system carrier for the single pass at ~3068 to write into -- inject
      // into the client body BEFORE translation so their user-merge /
      // relocation paths carry the global prompt (baseline coverage of the
      // removed pre-translation pass). The gate writes ONE carrier only.
      translatedBody = injectSystemPromptPreTranslation(translatedBody, { targetFormat });
      translatedBody = translateRequest(
        sourceFormat,
        targetFormat,
        model,
        translatedBody,
        stream,
        credentials,
        provider,
        reqLogger,
        {
          normalizeToolCallId,
          preserveDeveloperRole,
          preserveCacheControl,
          signatureNamespace: connectionId,
          copilotClient: copilotCompatibleReasoning,
          reasoningCacheScope,
          onReasoningReplayHistory: (messages) => {
            reasoningReplayHistory = messages;
          },
          ...(preCompressionBody ? { preCompressionBody } : {}),
        }
      );
    }
  } catch (error) {
    // -- Plugin onError hook --
    try {
      const { runOnError } = await import("@/lib/plugins/hooks");
      await runOnError(
        { requestId: traceId, body, model, provider, apiKeyInfo, metadata: {} },
        error instanceof Error ? error : new Error(String(error))
      );
    } catch (pluginErr) {
      const pluginErrorMessage = sanitizeErrorMessage(pluginErr) || "Plugin onError hook failed";
      log?.debug?.("PLUGIN", `onError hook error (non-fatal): ${pluginErrorMessage}`);
    }

    let parsedStatus = Number.NaN;
    try {
      parsedStatus = Number(error?.statusCode);
    } catch {
      // Hostile thrown values may expose Symbols or throwing status accessors.
    }
    const statusCode =
      Number.isInteger(parsedStatus) && parsedStatus >= 400 && parsedStatus <= 599
        ? parsedStatus
        : HTTP_STATUS.SERVER_ERROR;
    let message = "Invalid request";
    try {
      const candidate = error?.message;
      message =
        (typeof candidate === "string" ? candidate : sanitizeErrorMessage(candidate)) || message;
    } catch {
      // Hostile thrown values may expose throwing property accessors.
    }
    let errorType: string | null = null;
    try {
      const candidate = error?.errorType;
      errorType = typeof candidate === "string" ? candidate : null;
    } catch {
      // Hostile thrown values may expose throwing classification accessors.
    }
    const result = createTranslationFailureResult(statusCode, message, errorType);
    log?.warn?.("TRANSLATE", `Request translation failed: ${result.error}`);

    trackPendingRequest(model, provider, connectionId, false);
    return { kind: "return" as const, value: result };
  }

  // The latest OmniGlyph release has protocol-native OpenAI transforms. Run
  // the deferred stage only after translation so Chat/Responses receives the
  // exact provider wire shape (and so a source->target conversion never embeds
  // Anthropic image blocks into an OpenAI request, or vice versa).
  if (runPostTranslationCompression && translatedBody && typeof translatedBody === "object") {
    const transientFields = new Map<string, unknown>();
    const postInput = { ...(translatedBody as Record<string, unknown>) };
    for (const [key, value] of Object.entries(postInput)) {
      // Translators keep response-side aliases in Maps under private keys. They
      // are not JSON request fields and would otherwise be stringified to `{}`
      // by the OmniGlyph library wrapper; restore them after the wire transform.
      if (key.startsWith("_") && value instanceof Map) {
        transientFields.set(key, value);
        delete postInput[key];
      }
    }
    try {
      const [{ formatCompressionAnnotation }, { trackCompressionStats }] = await Promise.all([
        import("../services/compression/strategySelector.ts"),
        import("../services/compression/stats.ts"),
      ]);
      const postResult = await runPostTranslationCompression(postInput);
      if (postResult.compressed) {
        translatedBody = {
          ...(postResult.body as typeof translatedBody),
          ...Object.fromEntries(transientFields),
        };
        tokensCompressed += Math.max(
          0,
          (postResult.stats?.originalTokens ?? 0) - (postResult.stats?.compressedTokens ?? 0)
        );
        if (postResult.stats) {
          const annotation = formatCompressionAnnotation(postResult.stats);
          if (annotation) {
            compressionResponseMeta = compressionResponseMeta
              ? `${compressionResponseMeta}; ${annotation}`
              : annotation;
          }
          trackCompressionStats(postResult.stats);
          compressionAnalyticsWritePromise = writeCompressionAnalytics({
            stats: postResult.stats,
            provider,
            effectiveModel,
            effectiveServiceTier,
            comboName,
            mode: postResult.stats.mode,
            compressionComboId: postResult.stats.compressionComboId ?? null,
            skillRequestId,
            cavemanOutputModeApplied: false,
            cavemanOutputModeIntensity: null,
            log,
          });
          await compressionAnalyticsWritePromise;
        }
        log?.info?.(
          "COMPRESSION",
          `Post-translation OmniGlyph applied (${sourceFormat} -> ${targetFormat})`
        );
      }
    } catch (error) {
      // Compression is deliberately fail-open. A provider-shaped transform
      // must never turn an otherwise valid translated request into a 500.
      log?.warn?.(
        "COMPRESSION",
        "Post-translation OmniGlyph skipped: " +
          (error instanceof Error ? error.message : String(error))
      );
    }
  }

  trace?.("post_translation");

  // Keep the request translator's namespace identities separate from toolNameMap:
  // the latter is a Kiro/Claude passthrough alias channel with string values,
  // while namespace identities carry `{namespace, name}` for the #7936 response
  // seam. Extract first because Kiro merge may reuse `_toolNameMap` below.
  const requestToolIdentityMap = extractRequestToolIdentityMap(translatedBody);

  // Kiro: sanitize tool schemas before dispatch. Kiro returns 400 "Improperly
  // formed request" for unsupported JSON-Schema keywords (anyOf/$ref/if-then,
  // etc.) and tool names >64 chars. Strip those keys and hash-truncate long
  // names; merge the truncated->original nameMap into the existing
  // `_toolNameMap` so kiro-to-openai maps streamed tool-call names back (#1375).
  if (targetFormat === FORMATS.KIRO) {
    const kiroTools =
      translatedBody?.conversationState?.currentMessage?.userInputMessage?.userInputMessageContext
        ?.tools;
    if (kiroTools) {
      const { tools: sanitizedKiroTools, nameMap: kiroNameMap } = sanitizeKiroTools(kiroTools);
      translatedBody.conversationState.currentMessage.userInputMessage.userInputMessageContext.tools =
        sanitizedKiroTools;
      if (kiroNameMap.size > 0) {
        const existing =
          translatedBody._toolNameMap instanceof Map
            ? translatedBody._toolNameMap
            : new Map<string, string>();
        kiroNameMap.forEach((original, truncated) => existing.set(truncated, original));
        translatedBody._toolNameMap = existing;
      }
    }
  }

  // Claude: strict Anthropic-compatible gateways (e.g. MiniMax) reject tool
  // definitions that omit the required `type` discriminator with HTTP 400. Default
  // a missing `type` to "custom" before dispatch, mirroring Anthropic's own
  // inference, so legacy Claude-format tool payloads survive strict gateways (#2195).
  // AgentRouter is the opposite quirk: its Rust deserializer only accepts versioned
  // tool types and 400s on `type: "custom"` -- there the discriminator is stripped
  // instead (see claudeToolDefaults.ts).
  if (targetFormat === FORMATS.CLAUDE && Array.isArray(translatedBody.tools)) {
    translatedBody.tools = normalizeClaudeToolsForDispatch(
      translatedBody.tools,
      provider
    ) as typeof translatedBody.tools;
  }

  // Extract toolNameMap for response translation (Claude OAuth)
  const translatedToolNameMap = translatedBody._toolNameMap;
  const nativeClaudeToolNameMap = isClaudePassthrough
    ? buildClaudePassthroughToolNameMap(body)
    : null;
  // Resolution order matters: `_toolNameMap` was already deleted by
  // `extractRequestToolIdentityMap`, so Gemini/Antigravity depend on the
  // `requestToolIdentityMap` fallback inside this helper (#9568 / #7936).
  const toolNameMap = resolveResponseToolNameMap(
    translatedToolNameMap,
    nativeClaudeToolNameMap,
    requestToolIdentityMap
  );
  delete translatedBody._toolNameMap;
  delete translatedBody._disableToolPrefix;

  // Update model in body -- use resolved alias so the provider gets the correct model ID (#472)
  // Strip provider/alias prefix if it exactly matches the routing prefix so upstream receives the raw model name (#1261)
  let finalModelToUpstream = effectiveModel;
  // Defense-in-depth: only string-strip when effectiveModel is actually a string.
  // The API guards `model` via Zod (z.string()), but internal callers could pass a
  // non-string and a bare `.startsWith` would crash with `startsWith is not a
  // function` (same class as #2359 / #2463). Mirrors 9router's `?.startsWith?.()`.
  if (typeof finalModelToUpstream === "string") {
    if (finalModelToUpstream.startsWith(`${provider}/`)) {
      finalModelToUpstream = finalModelToUpstream.slice(provider.length + 1);
    } else if (alias && finalModelToUpstream.startsWith(`${alias}/`)) {
      finalModelToUpstream = finalModelToUpstream.slice(alias.length + 1);
    }
  }
  translatedBody.model = finalModelToUpstream;

  const previousResponseIdPolicy = applyResponsesPreviousResponseIdPolicy(translatedBody, {
    mode: settings.responsesPreviousResponseIdMode,
    provider,
    sourceFormat,
    targetFormat,
    credentials,
  });
  translatedBody = previousResponseIdPolicy.body as typeof translatedBody;

  // #1789: Prevent output_config.effort from overriding effort encoded in model name (Codex)
  if (provider === "codex" || provider?.startsWith("codex")) {
    const hasEffortSuffix = finalModelToUpstream.match(/-(low|medium|high|xhigh)$/i);
    if (
      hasEffortSuffix &&
      translatedBody.output_config &&
      typeof translatedBody.output_config === "object"
    ) {
      const oc = translatedBody.output_config as Record<string, unknown>;
      if (oc.effort) {
        log?.warn?.(
          "PARAMS",
          `Stripped output_config.effort="${oc.effort}" because model "${finalModelToUpstream}" already encodes effort`
        );
        delete oc.effort;
        if (Object.keys(oc).length === 0) {
          delete translatedBody.output_config;
        }
      }
    }
  }

  // Strip unsupported parameters for reasoning models (o1, o3, etc.) and any
  // provider that can't accept them at all (e.g. AI Horde's raw completion
  // backends). When "tools" is among them, also flattens leftover
  // tool_calls/tool-result messages in history (from a combo failover away
  // from a tool-capable model) -- those message shapes break non-tool-calling
  // backends just as much as a live `tools` param does.
  const unsupported = getUnsupportedParams(provider, model);

  // Direct/pinned requests (isCombo: false) have no other target to fail
  // over to. Combo requests are already kept off a tool-incapable target by
  // filterTargetsByRequestCompatibility before ever reaching this point, so
  // this only fires for the case that filter can't protect: a client
  // explicitly asking for this exact model. A clear error beats a 200 that
  // silently can't do what was asked (the model narrates a fake tool call
  // instead -- live incident: AI Horde/Behemoth-X-123B).
  const toolCallingCheck = checkToolCallingRequiredButUnsupported(
    translatedBody,
    unsupported,
    isCombo,
    model
  );
  if (toolCallingCheck.blocked) {
    trackPendingRequest(model, provider, connectionId, false);
    return {
      kind: "return" as const,
      value: createErrorResult(400, toolCallingCheck.message!, null, "tool_calling_not_supported"),
    };
  }

  // Rename max_tokens to max_completion_tokens if not supported (#1961)
  if (!supportsMaxTokens({ provider, model })) {
    if (translatedBody.max_tokens !== undefined) {
      if (translatedBody.max_completion_tokens === undefined) {
        translatedBody.max_completion_tokens = translatedBody.max_tokens;
      }
      delete translatedBody.max_tokens;
      log?.debug?.("PARAMS", `Renamed max_tokens to max_completion_tokens for ${model}`);
    }
  } else if (translatedBody.max_completion_tokens !== undefined) {
    // Symmetric case (#6912): some providers/models (e.g. Volcengine Ark /
    // DeepSeek) only document the legacy `max_tokens` field and silently
    // ignore an unrecognized `max_completion_tokens`, so a client sending the
    // newer field alone would have it dropped upstream with no cap applied.
    if (translatedBody.max_tokens === undefined) {
      translatedBody.max_tokens = translatedBody.max_completion_tokens;
    }
    delete translatedBody.max_completion_tokens;
    log?.debug?.("PARAMS", `Renamed max_completion_tokens to max_tokens for ${model}`);
  }

  stripStore(
    translatedBody,
    provider,
    targetFormat,
    credentials?.providerSpecificData as Record<string, unknown> | null | undefined
  );

  // Chat clients may send stream_options.include_usage, but OpenAI Responses
  // upstreams (including Azure AI Foundry /responses) reject stream_options.
  if (targetFormat === FORMATS.OPENAI_RESPONSES && "stream_options" in translatedBody) {
    delete translatedBody.stream_options;
  }

  // Provider-specific max_tokens caps (#711)
  // Some providers reject requests when max_tokens exceeds their API limit.
  // Cap before sending to avoid upstream HTTP 400 errors.
  const providerCap = PROVIDER_MAX_TOKENS[provider];
  if (providerCap) {
    for (const field of ["max_tokens", "max_completion_tokens"] as const) {
      if (typeof translatedBody[field] === "number" && translatedBody[field] > providerCap) {
        log?.debug?.(
          "PARAMS",
          `Capping ${field} from ${translatedBody[field]} to ${providerCap} for ${provider}`
        );
        translatedBody[field] = providerCap;
      }
    }
  }

  // Resolve executor with optional upstream proxy (CLIProxyAPI) routing.
  // mode="native" (default): returns the native executor unchanged.
  // mode="cliproxyapi": returns the CLIProxyAPI executor instead.
  // mode="fallback": returns a wrapper that tries native first, falls back to CLIProxyAPI on 5xx/network errors.

  // #6339: pass the resolved connection's providerSpecificData so a per-connection
  // cliproxyapiMode="claude-native" override can deep-route this single connection
  // through CLIProxyAPI regardless of the provider-level upstream_proxy_config mode.
  const resolveExecutorWithProxy = (prov: string) =>
    resolveExecutorWithProxyFor(
      prov,
      log,
      (credentials?.providerSpecificData as Record<string, unknown> | null | undefined) ?? null
    );

  // === Quota Share enforcement PRE-hook (B/F7) ===
  // Runs after provider/model/credentials/apiKeyInfo are fully resolved,
  // before dispatcher. Fail-open per B16: errors -> allow.
  let quotaSoftDeprioritize = false;
  if (apiKeyInfo?.id && credentials?.connectionId) {
    try {
      const { enforceQuotaShare } = await import("@/lib/quota/enforce");
      const decision = await enforceQuotaShare({
        apiKeyId: apiKeyInfo.id,
        connectionId: credentials.connectionId,
        provider: provider ?? "unknown",
        // Resolved model id (post background-redirect / alias) -- the same scope the
        // router/log use. Operators configure per-(key,model) caps against THIS id.
        model: model || undefined,
        estimatedCost: {},
      }).catch((err: unknown): EnforceDecision => {
        log?.warn?.(
          "QUOTA_SHARE",
          `enforceQuotaShare failed; fail-open: ${err instanceof Error ? err.message : String(err)}`
        );
        return { kind: "allow" as const };
      });

      if (decision.kind === "block") {
        const { buildErrorBody } = await import("../utils/error.ts");
        log?.warn?.(
          "QUOTA_SHARE",
          `[quotaShare] blocked apiKeyId=${apiKeyInfo.id} provider=${provider ?? "unknown"}: ${decision.reason}`
        );
        // Finalize the pending-request slot registered at handler entry -- this
        // return path never reaches the upstream, and without the decrement the
        // pending detail lingers as an orphaned status-0 call-log row until the
        // reaper sweeps it (mirrors the other pre-upstream error returns).
        trackPendingRequest(
          model,
          provider,
          connectionId || credentials?.connectionId || null,
          false
        );
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (decision.retryAfterSeconds) {
          headers["Retry-After"] = String(decision.retryAfterSeconds);
        }
        return {
          kind: "return" as const,
          value: new Response(JSON.stringify(buildErrorBody(429, decision.reason)), {
            status: 429,
            headers,
          }),
        };
      }

      if (decision.kind === "allow" && decision.deprioritize) {
        quotaSoftDeprioritize = true;
        log?.info?.(
          "QUOTA_SHARE",
          `[quotaShare] soft deprioritize active for apiKeyId=${apiKeyInfo.id} provider=${provider ?? "unknown"}`
        );
      }
    } catch (err) {
      // Outer fail-open guard -- should not be reached (inner .catch covers it)
      log?.warn?.(
        "QUOTA_SHARE",
        `[quotaShare] enforceQuotaShare unexpected error; fail-open: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
  // G2: Propagate soft penalty to the current candidate so combo scoring can deprioritize.
  if (quotaSoftDeprioritize && isCombo && comboStepId) {
    try {
      const { setCandidateQuotaSoftPenalty } = await import("../services/combo");
      setCandidateQuotaSoftPenalty(comboExecutionKey, comboStepId, true);
    } catch (err) {
      log?.warn?.(
        "QUOTA_SHARE",
        `[quotaShare] could not set soft penalty on candidate: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
  // === /Quota Share enforcement PRE-hook ===
  if (isFeatureFlagEnabled("CAPABILITY_FILTER_ENABLED")) {
    const fit = checkRequestCapabilityFit(
      getResolvedModelCapabilities({ provider, model: effectiveModel }),
      deriveRequestCapabilityRequirements(body as Record<string, unknown>),
      provider
    );
    if (!fit.compatible) {
      const msg = buildCapabilityMismatchMessage(fit.terminalReason!, provider, effectiveModel);
      log?.warn?.("CAPABILITY", msg);
      trackPendingRequest(model, provider, connectionId, false);
      return {
        kind: "return" as const,
        value: createErrorResult(400, msg, null, fit.terminalReason, "invalid_request_error"),
      };
    }
  }
  // Get executor for this provider (with optional upstream proxy routing)
  const executor = await resolveExecutorWithProxy(provider);
  const getExecutionCredentials = () =>
    withReasoningRuleContext(
      resolveExecutionCredentialsFor({
        credentials,
        nativeCodexPassthrough: nativeResponsesPassthrough,
        endpointPath,
        targetFormat,
        provider,
        ccSessionId,
        modelInfo,
      }),
      reasoningRuleDirective
    );

  let onPipelineStreamError: streamFailure.PipelineStreamErrorHandler | null = null;
  let onClientDisconnectFinalize:
    ((event: { reason: string; duration: number }) => boolean) | null = null;

  const bindPipelineStreamError = (handler: streamFailure.PipelineStreamErrorHandler | null) => {
    onPipelineStreamError = handler;
  };
  const bindClientDisconnectFinalize = (
    handler: ((event: { reason: string; duration: number }) => boolean) | null
  ) => {
    onClientDisconnectFinalize = handler;
  };

  // Create stream controller for disconnect detection
  const streamController = createStreamController({
    onDisconnect: (event) => {
      let finalized = false;
      try {
        finalized = onClientDisconnectFinalize?.(event) === true;
      } catch {}
      if (!finalized) {
        try {
          finalizePendingScope(pendingScope, {
            status: 499,
            error: `Client disconnected: ${event.reason}`,
            errorCode: "client_disconnected",
          });
          finalized = true;
        } catch {}
      }
      try {
        onDisconnect?.(event);
      } catch {}
      return finalized;
    },
    onError: (event) => onPipelineStreamError?.(event),
    provider,
    model,
    connectionId,
    clientResponseFormat,
    clientAbortSignal: clientRawRequest?.signal,
    allowCompletedToolHandoffGrace: isCodexResponsesEcho,
    clientDisconnectGracePeriodMs: STREAM_DISCONNECT_GRACE_PERIOD_MS,
  });

  const dedupRequestBody = { ...translatedBody, model: `${provider}/${model}`, stream };
  const dedupEnabled = shouldDeduplicate(dedupRequestBody);
  // Namespaced by the calling API key: dedup hands the SAME response object to
  // every joiner, so a shared hash across keys is a cross-principal response
  // leak (GHSA-6c7w-56xp-wpc6).
  const dedupHash = dedupEnabled
    ? computeRequestHash(dedupRequestBody, apiKeyInfo?.id, trustedEffortContext)
    : null;

  return {
    kind: "continue" as const,
    continue: {
      translatedBody,
      tokensCompressed,
      compressionAnalyticsWritePromise,
      compressionResponseMeta,
      reasoningReplayHistory,
      dedupEnabled,
      dedupHash,
      toolNameMap,
      requestToolIdentityMap,
      streamController,
      executor,
      getExecutionCredentials,
      upstreamStream,
      isClaudeCodeCompatible,
      isClaudePassthrough,
      preserveCacheControl,
      bindPipelineStreamError,
      bindClientDisconnectFinalize,
    },
  };
}

export type TranslateDedupResult = Awaited<ReturnType<typeof runTranslateAndDedup>>;
export type Continue3 = Extract<TranslateDedupResult, { kind: "continue" }>["continue"];
