/**
 * Request front door lifted out of handleChatCore.
 * Bypass, classifier, and lifecycle early-returns live here.
 * Search-tool fallback stays with that front door.
 */
import { resolveChatCoreRequestSetup } from "./requestSetup.ts";
import { checkIdempotencyCache } from "./idempotency.ts";
import { checkLifecycle, resolveLifecycle } from "./modelLifecyclePolicy.ts";
import {
  shouldDefaultAllowClassifier,
  detectClassifierFormat,
  buildDefaultAllowClaudeMessage,
} from "./claudeClassifierCompat.ts";
import { getHeaderValueCaseInsensitive } from "./headers.ts";
import {
  isCodexOriginatedHeaders,
  isClaudeCodeOriginatedHeaders,
} from "../../config/codexIdentity.ts";
import { trackDevice, extractIpFromHeaders } from "../../services/deviceTracker.ts";
import { shouldUseNativeOpenAICompatibleResponsesPassthrough } from "./passthroughHelpers.ts";
import { checkResourcePressureGuard } from "../../utils/resourcePressure.ts";
import { resolveChatCoreRequestFormat } from "./requestFormat.ts";
import { resolveChatCoreTargetFormat } from "./targetFormat.ts";
import { injectSystemPrompt, injectCustomSystemPrompt } from "../../services/systemPrompt.ts";
import { FORMATS } from "../../translator/formats.ts";
import { collectCustomToolNamesForSourceFormat } from "../../translator/request/openai-responses/additionalTools.ts";
import { THINKING_MARKER_HEADER } from "../../utils/thinkCloseMarker.ts";
import { resolveAgentGoalPolicy } from "../../utils/agentGoalPolicy.ts";
import { createRequestLogger } from "../../utils/requestLogger.ts";
import { createPreparedRequestLogger } from "../../utils/providerRequestLogging.ts";
import { summarizeToolSources } from "../../utils/toolSources.ts";
import { applyClaudeEffortVariant } from "./claudeEffortVariant.ts";
import { REGISTRY } from "../../config/providerRegistry.ts";
import { resolveNoAuthEchoModel } from "./noAuthEchoModel.ts";
import { createErrorResult } from "../../utils/error.ts";
import { resolveResilienceSettings } from "@/lib/resilience/settings";
import { recordKeyHealthStatus as recordKeyHealthStatusFor } from "./keyHealth.ts";
import {
  persistAttemptLogs as persistAttemptLogsFor,
  type PersistAttemptLogsArgs,
} from "./attemptLogging.ts";
import { stageTrace } from "./stageTrace.ts";
import {
  getCallLogPipelineCaptureStreamChunks,
  getCallLogPipelineMaxSizeBytes,
} from "@/lib/logEnv";
import { logAuditEvent } from "@/lib/compliance";
import { emit } from "@/lib/events/eventBus";
import { handleBypassRequest } from "../../utils/bypassHandler.ts";
import { trackPendingRequest } from "@/lib/usageDb";
import { runPluginOnRequestHook } from "./pluginOnRequest.ts";
import { assertExclusiveConnectionLeaseFence } from "@/lib/db/exclusiveConnectionLeases";
import {
  logClientRawRequestRedacted,
  redactPendingBody,
} from "@/lib/guardrails/videoBridgeSnapshotRedaction";
import { getCachedSettings } from "@/lib/db/readCache";
import { applyCodexGlobalFastServiceTier } from "@/lib/providers/codexFastTier";
import { buildUpstreamHeadersForExecute as buildUpstreamHeadersForExecuteFor } from "./upstreamExecuteHeaders.ts";
import {
  resolveEffectiveServiceTier as resolveEffectiveServiceTierFor,
  resolveReportedServiceTier as resolveReportedServiceTierFor,
  type EffectiveServiceTier,
} from "./serviceTier.ts";
import { isCompactResponsesEndpoint } from "../../executors/codex.ts";
import { initializeRateLimits } from "../../services/rateLimitManager.ts";
import { resolveBackgroundTaskRedirect } from "./backgroundRedirect.ts";
import { prepareWebSearchFallbackBody } from "../../services/webSearchFallback.ts";
import { prepareWebFetchFallbackBody } from "../../services/webFetchInterception.ts";
import { resolveInterceptSearch, resolveInterceptFetch } from "@/lib/db/interceptionRules";
import { resolveExplicitStreamAlias, resolveStreamFlag } from "../../utils/aiSdkCompat.ts";
import { generateRequestId } from "@/shared/utils/requestId";
import { setGeminiThoughtSignatureMode } from "../../services/geminiThoughtSignatureStore.ts";
import { isModelScopeProvider } from "../../services/modelscopePolicy.ts";
import type { VideoBridgeLogRedactionEntry } from "@/lib/guardrails/videoBridge";

type VideoBridgeLogParam = { observed: boolean; redaction: VideoBridgeLogRedactionEntry[] } | null;

export async function runRequestPrelude({
  body,
  modelInfo,
  credentials,
  log,
  clientRawRequest,
  connectionId,
  apiKeyInfo = null,
  userAgent,
  comboName,
  sessionAffinityKey = null,
  comboStepId = null,
  comboExecutionKey = null,
  cachedSettings = null,
  correlationId = null,
  conversationId = null,
  modelPinned = false,
  skipResourcePressureGuard = false,
  managedLease = null,
  videoBridgeLog = undefined,
}) {
  let { provider, model, extendedContext } = modelInfo;
  // #12150 P1b: true iff the video-bridge guardrail rendered >=1 transcript
  // cue into a replaced part of this request. Gates both request- and
  // response-derived Memory extraction
  // (chatCore/memoryExtraction.ts::runMemoryExtractionGate).
  const videoBridgeObserved: boolean =
    (videoBridgeLog as VideoBridgeLogParam | undefined)?.observed === true;
  const resilienceSettings = resolveResilienceSettings(cachedSettings);
  if (!skipResourcePressureGuard) {
    try {
      const pressureGuard = checkResourcePressureGuard();
      if (pressureGuard) return { kind: "return" as const, value: pressureGuard };
    } catch {
      /* fail open */
    }
  }
  // Per-request model-routing metadata (first extracted slice of the request-setup phase).
  const { apiFormat, customModelTargetFormat, requestedModel } = resolveChatCoreRequestSetup(
    modelInfo,
    body,
    model
  );
  const isModelScope = () => isModelScopeProvider(provider, credentials?.providerSpecificData);
  const startTime = Date.now();
  // Per-request trace id + checkpoint helper. Lets us see exactly which await
  // a hung request was sitting on in `[STAGE_TRACE]` log lines. Uses crypto RNG
  // (not Math.random) purely to satisfy CodeQL js/insecure-randomness — this id
  // is a log-correlation token, not a security secret.
  const traceId = globalThis.crypto.randomUUID().slice(0, 6);
  // Emit request.started event for real-time dashboard
  setImmediate(() => {
    emit("request.started", {
      id: traceId,
      model: model || "unknown",
      provider: provider || "unknown",
      timestamp: startTime,
      comboName: comboName || undefined,
    });
  });
  const traceEnabled = process.env.OMNIROUTE_TRACE === "true" || process.env.DEBUG === "true";
  // Stage trace extracted to chatCore/stageTrace.ts (#3501); bind the per-request inputs once so the
  // call sites stay byte-identical.
  const trace = (label: string, extra?: Record<string, unknown>) =>
    stageTrace(label, extra, { traceEnabled, startTime, traceId, log });
  const getCurrentConnectionId = () => {
    const credentialConnectionId =
      typeof credentials?.connectionId === "string" && credentials.connectionId.trim().length > 0
        ? credentials.connectionId.trim()
        : null;
    return credentialConnectionId || connectionId || null;
  };
  const assertManagedLeaseFence = (attemptConnectionId: string | null | undefined) => {
    if (!managedLease) return;
    if (!attemptConnectionId) {
      throw Object.assign(new Error("Managed lease connection is unavailable"), {
        code: "LEASE_CONNECTION_MISMATCH",
        status: 409,
      });
    }
    const fence = assertExclusiveConnectionLeaseFence({
      leaseOwnerId: managedLease.context.leaseOwnerId,
      generation: managedLease.context.generation,
      apiKeyId: managedLease.apiKeyId,
      connectionId: attemptConnectionId,
    });
    if (fence.kind === "VALID") return;
    const code =
      fence.kind === "REQUIRED"
        ? "LEASE_REQUIRED"
        : fence.kind === "STALE"
          ? "LEASE_FENCE_STALE"
          : fence.kind === "AUTHORIZATION_MISMATCH"
            ? "LEASE_AUTHORIZATION_MISMATCH"
            : "LEASE_CONNECTION_MISMATCH";
    throw Object.assign(new Error("Managed lease request fence rejected the dispatch"), {
      code,
      status: 409,
    });
  };
  const isManagedLeaseFenceError = (error: unknown): boolean =>
    managedLease !== null &&
    typeof (error as { code?: unknown })?.code === "string" &&
    String((error as { code: string }).code).startsWith("LEASE_");
  const managedLeaseFenceErrorResult = (error: unknown) => {
    const code = (error as { code: string }).code;
    return {
      ...createErrorResult(409, "Managed lease request fence rejected the dispatch", null, code),
      errorType: "lease_error",
      errorCode: code,
    };
  };
  let tokensCompressed: number | null = null;
  body = injectSystemPrompt(body);
  // ── Per-endpoint custom system prompt (port of upstream #2063) ──
  // Reads from cachedSettings if available (passed in from combo/chat layer)
  // to avoid an extra DB read on the hot path. Falls through to getCachedSettings()
  // only when this function is called outside the normal chat dispatch.
  {
    const _s = cachedSettings ?? (await getCachedSettings());
    if (
      _s.customSystemPromptEnabled === true &&
      typeof _s.customSystemPrompt === "string" &&
      _s.customSystemPrompt
    ) {
      body = injectCustomSystemPrompt(body as Record<string, unknown>, _s.customSystemPrompt);
      log?.debug?.("CUSTOMSP", "custom system prompt injected");
    }
  }
  // ── Plugin onRequest hook ──
  // Dynamic import cached by Node.js after first call — minimal overhead
  const pluginGate = await runPluginOnRequestHook({
    requestId: traceId,
    body,
    model,
    provider,
    apiKeyInfo,
    headers: clientRawRequest?.headers,
    log,
  });
  if (pluginGate.blocked === true) {
    return {
      kind: "return" as const,
      value: {
        success: false,
        status: 403,
        // Label the source: this 403 is our own policy decision, not the provider
        // rejecting us. Unlabelled, it is indistinguishable from a real upstream 403
        // and gets the connection banned. Matches the type already sent to the client
        // in pluginOnRequest.ts.
        errorType: "plugin_block",
        errorCode: "plugin_block",
        error: "Request blocked by plugin",
        response: pluginGate.response,
      },
    };
  }
  if (pluginGate.body) {
    body = pluginGate.body;
  }
  // Per-API-key device/connection tracking (port of upstream 9router#931,
  // thanks @mugnimaestra). In-memory only, never blocks the request path.
  if (apiKeyInfo?.id) {
    trackDevice(
      apiKeyInfo.id,
      extractIpFromHeaders(clientRawRequest?.headers ?? null),
      userAgent ?? null
    );
  }
  const agentGoalPolicy = resolveAgentGoalPolicy(body, clientRawRequest?.headers ?? null);
  if (agentGoalPolicy.detected) {
    log?.debug?.(
      "AGENT_GOAL",
      `long-running goal mode enabled: readinessMax=${agentGoalPolicy.readinessMaxTimeoutMs}ms streamRecovery=${agentGoalPolicy.streamRecoveryEnabled}`
    );
  }
  let effectiveServiceTier: EffectiveServiceTier = "standard";
  // Codex service-tier resolvers extracted to chatCore/serviceTier.ts (#3501); bind the per-request
  // provider/credentials once and delegate so the existing call sites stay byte-identical.
  const resolveEffectiveServiceTier = (requestBody?: unknown): EffectiveServiceTier =>
    resolveEffectiveServiceTierFor(provider, credentials?.providerSpecificData, requestBody);
  const resolveReportedServiceTier = (
    payload?: unknown,
    maxDepth = 3
  ): EffectiveServiceTier | null => resolveReportedServiceTierFor(provider, payload, maxDepth);
  // Key-health updater extracted to chatCore/keyHealth.ts (#3501); bind the per-request log once
  // and delegate so the existing call sites stay byte-identical.
  const recordKeyHealthStatus = (
    status: number,
    creds: Record<string, unknown> | null | undefined,
    transport?: string,
    failureDetail?: string
  ): void => recordKeyHealthStatusFor(status, creds, log, transport, failureDetail);
  // ── Phase 9.2: Idempotency check ──
  // Resolve the idempotency key once here and reuse it at the Phase 9.2 save site below,
  // rather than re-deriving it. (#3821-review LEDGER-6)
  const { hit: idempotencyHit, idempotencyKey } = await checkIdempotencyCache({
    clientRawRequest,
    provider,
    model,
    // NEXA fusion-idempotency fix: body.messages feeds the key digest so combo-internal
    // sub-requests (fusion panel + judge re-enter chatCore sharing the client's headers)
    // can never collide on the raw Idempotency-Key/x-request-id header key.
    body,
    effectiveServiceTier,
    startTime,
    log,
  });
  if (idempotencyHit) {
    return { kind: "return" as const, value: idempotencyHit };
  }
  // T07: Inject connectionId into credentials so executors can rotate API keys
  // using providerSpecificData.extraApiKeys (API Key Round-Robin feature)
  if (connectionId && credentials && !credentials.connectionId) {
    credentials.connectionId = connectionId;
  }
  // Endpoint/format resolution extracted to chatCore/requestFormat.ts (#3501); pure derivation
  // from the inbound request, destructured so every downstream use stays byte-identical.
  const {
    endpointPath,
    sourceFormat,
    isResponsesEndpoint,
    nativeCodexPassthrough,
    nativeXaiResponsesPassthrough,
    isDroidCLI,
    isOpencodeClient,
    copilotCompatibleReasoning,
    clientResponseFormat,
  } = resolveChatCoreRequestFormat({ clientRawRequest, body, provider, userAgent });
  const nativeOpenAICompatibleResponsesPassthrough =
    shouldUseNativeOpenAICompatibleResponsesPassthrough({
      provider,
      sourceFormat,
      endpointPath,
      providerSpecificData: credentials?.providerSpecificData,
    });
  const responsesInputItems = Array.isArray(body?.input) ? body.input : [];
  const customToolNames = collectCustomToolNamesForSourceFormat(
    sourceFormat,
    FORMATS.OPENAI_RESPONSES,
    body?.tools,
    responsesInputItems
  );

  const requestedLifecycleError = checkLifecycle(provider, model, log);
  if (requestedLifecycleError) return { kind: "return" as const, value: requestedLifecycleError };

  // Check for bypass patterns (warmup, skip) - return fake response
  const bypassResponse = handleBypassRequest(body, model, userAgent);
  if (bypassResponse) {
    return { kind: "return" as const, value: bypassResponse };
  }

  // ── Claude Code auto-mode classifier compat (opt-in, default "off") ──
  // Claude Code's `--permission-mode auto` sends an internal classifier request that
  // requires the response to START with `<block>no</block>`/`<block>yes</block>`.
  // When a combo/fallback route sends that call to a cheap model returning 200 with
  // empty content, Claude Code fails closed on every gated action. Detect the
  // classifier request and short-circuit with a synthetic ALLOW response, WITHOUT
  // calling the upstream provider. See chatCore/claudeClassifierCompat.ts.
  {
    const classifierSettings = cachedSettings ?? (await getCachedSettings());
    if (
      shouldDefaultAllowClassifier(
        sourceFormat,
        body as Record<string, unknown>,
        classifierSettings.claudeClassifierCompat as string | undefined
      )
    ) {
      const classifierFormat = detectClassifierFormat(body as Record<string, unknown>);
      log?.warn?.(
        "CHAT",
        `classifier compat=${classifierSettings.claudeClassifierCompat} format=${classifierFormat} | short-circuit default-allow`
      );
      return {
        kind: "return" as const,
        value: buildDefaultAllowClaudeMessage(requestedModel, classifierFormat),
      };
    }
  }

  // Detect source format and get target format
  // Model-specific targetFormat takes priority over provider default

  // ── Background Task Redirection (T41) — decision extracted to chatCore/backgroundRedirect.ts (#3501)
  // backgroundReason is the detection signal (threaded into memory/skills injection below); redirect
  // is the actual model downgrade to apply, if any.
  const { backgroundReason, redirect: bgRedirect } = resolveBackgroundTaskRedirect({
    body,
    headers: clientRawRequest?.headers,
    model,
  });
  if (bgRedirect) {
    const originalModel = model;
    log?.info?.(
      "BACKGROUND",
      `Background task redirect (${bgRedirect.reason}): ${originalModel} → ${bgRedirect.degradedModel}`
    );
    model = bgRedirect.degradedModel;
    if (body && typeof body === "object") {
      body.model = model;
    }

    logAuditEvent({
      action: "routing.background_task_redirect",
      actor: apiKeyInfo?.name || "system",
      target: connectionId || provider || "chat",
      details: {
        original_model: originalModel,
        redirected_to: bgRedirect.degradedModel,
        reason: bgRedirect.reason,
      },
    });
  }

  // Custom aliases remain explicit; lifecycle replacements are advisory and never silently routed.
  let [resolvedModel, effectiveModel, routedLifecycleError] = resolveLifecycle(
    provider,
    model,
    log
  );
  if (routedLifecycleError) return { kind: "return" as const, value: routedLifecycleError };

  // Effort-variant model ids: the Claude / Claude-Code model picker (e.g. VS Code's
  // "Effort" slider) advertises claude-...-{low,medium,high,xhigh,max}. Anthropic has
  // no such model, so the suffixed id 404s upstream. Strip it back to the real base id
  // (forwarded as the upstream model via finalModelToUpstream below) and surface the
  // level as reasoning_effort so the OpenAI→Claude translator / Claude-Code bridge turn
  // it into Claude thinking/effort config. An explicit client-supplied effort always
  // wins; native Claude passthrough is left untouched (it carries its own `thinking`),
  // and non-thinking base models are cleaned up later by normalizeThinkingForModel().
  // Extracted to chatCore/claudeEffortVariant.ts (#3501); mutates body in place and returns the
  // stripped model + an optional log line. The strip is unconditional (byte-identical to the
  // original behavior) for the claude/Claude-Code-compatible lane; for any other provider it
  // additionally requires isKnownClaudeEffortBaseModel(baseModel) to verify the base id is a
  // real, effort-capable Claude model before stripping (vertex-claude-catalog-dispatch fix).
  {
    const effortVariant = applyClaudeEffortVariant({
      provider,
      effectiveModel,
      body,
      sourceFormat,
    });
    effectiveModel = effortVariant.effectiveModel;
    if (effortVariant.log) {
      log?.info?.("PARAMS", effortVariant.log);
    }
  }

  // Wire target-format resolution extracted to chatCore/targetFormat.ts (#3501); `alias` is reused
  // downstream when stripping the alias/ prefix off the upstream model id.
  const { alias, targetFormat } = resolveChatCoreTargetFormat({
    provider,
    resolvedModel,
    apiFormat,
    sourceFormat,
    customModelTargetFormat,
    providerSpecificData: credentials?.providerSpecificData,
    nativeXaiResponsesPassthrough,
    nativeOpenAICompatibleResponsesPassthrough,
  });
  const nativeResponsesPassthrough =
    nativeCodexPassthrough ||
    nativeXaiResponsesPassthrough ||
    nativeOpenAICompatibleResponsesPassthrough;

  const initialProviderRequest =
    body && typeof body === "object" && !Array.isArray(body)
      ? {
          ...(body as Record<string, unknown>),
          model:
            typeof (body as Record<string, unknown>).model === "string"
              ? (body as Record<string, unknown>).model
              : effectiveModel,
        }
      : body;

  // Track pending requests before slower optional enrichment (settings, logging,
  // compression) so internal usage/runtime counters stay accurate even when
  // upstream never returns response headers.
  // Use credentials.connectionId as a fallback so that requests without an
  // explicit session-level connectionId still register in the pendingRequests map.
  const pendingConnId = connectionId || credentials?.connectionId || null;
  const pendingRequestId =
    trackPendingRequest(model, provider, pendingConnId, true, {
      clientEndpoint: clientRawRequest?.endpoint || "/v1/chat/completions",
      clientRequest: redactPendingBody(clientRawRequest?.body ?? body, videoBridgeObserved),
      providerRequest: initialProviderRequest,
      stage: "registered",
      correlationId,
      sessionTag: conversationId || null,
    }) || generateRequestId();

  // Initialize rate limit settings from persisted DB (once, lazy)
  await initializeRateLimits();

  // #3384: per-model interception rule (src/lib/db/interceptionRules.ts) overrides the
  // native-bypass defaults below when the operator explicitly configured it for this
  // provider/model pair; undefined falls through to the existing bypass logic.
  const interceptSearchOverride = resolveInterceptSearch(provider, effectiveModel);

  // Capture client tool names BEFORE fallback injection so the owner-provenance
  // merge can distinguish tools the client already declared from synthetic tools
  // added by the fallback preparer. Without this, a client function named
  // `omniroute_web_search` (colliding with the fallback tool name) would be
  // marked server-owned even though the client owns it.
  const preConversionClientToolNames: string[] = (
    Array.isArray((body as Record<string, unknown>).tools)
      ? ((body as Record<string, unknown>).tools as unknown[])
      : []
  )
    .map((tool) => {
      if (!tool || typeof tool !== "object") return "";
      const record = tool as Record<string, unknown>;
      if (typeof record.name === "string") return record.name;
      const fn = record.function;
      if (
        fn &&
        typeof fn === "object" &&
        typeof (fn as Record<string, unknown>).name === "string"
      ) {
        return (fn as Record<string, unknown>).name as string;
      }
      return "";
    })
    .filter(Boolean);

  const { body: bodyWithWebSearchFallback, fallback: webSearchFallbackPlan } =
    prepareWebSearchFallbackBody(body as Record<string, unknown>, {
      provider,
      sourceFormat,
      targetFormat,
      nativeCodexPassthrough: nativeResponsesPassthrough,
      interceptSearchOverride,
    });
  if (webSearchFallbackPlan.enabled) {
    body = bodyWithWebSearchFallback as typeof body;
    // Server-side web-search execution cannot be injected into an arbitrary
    // client SSE stream (streaming interception is not implemented — #9725), so
    // a stream:true OpenAI Responses request whose web_search tool was converted
    // to the fallback is executed non-streaming: the assembled response then
    // carries the executed results (function_call_output + web_search_call) and
    // JSON-tolerating Responses clients (pi-web-access) consume it directly.
    if (
      sourceFormat === FORMATS.OPENAI_RESPONSES &&
      (body as Record<string, unknown>).stream === true
    ) {
      (body as Record<string, unknown>).stream = false;
      log?.info?.("TOOLS", `web_search fallback forced non-streaming response for ${provider}`);
    }
    log?.info?.(
      "TOOLS",
      `Converted ${webSearchFallbackPlan.convertedToolCount} web_search tool(s) to OmniRoute fallback for ${provider}`
    );
  }
  // #7339: interceptFetch (Phase 3-4 of #3384) — same per-model rule + native-bypass
  // pattern as interceptSearch directly above.
  const interceptFetchOverride = resolveInterceptFetch(provider, effectiveModel);
  const { body: bodyWithWebFetchFallback, fallback: webFetchFallbackPlan } =
    prepareWebFetchFallbackBody(body as Record<string, unknown>, {
      provider,
      sourceFormat,
      targetFormat,
      nativeCodexPassthrough: nativeResponsesPassthrough,
      interceptFetchOverride,
    });
  if (webFetchFallbackPlan.enabled) {
    body = bodyWithWebFetchFallback as typeof body;
    log?.info?.(
      "TOOLS",
      `Converted ${webFetchFallbackPlan.convertedToolCount} web_fetch tool(s) to OmniRoute fallback for ${provider}`
    );
  }
  const noLogEnabled = apiKeyInfo?.noLog === true;
  // Consolidate settings reads — fetch once, reuse throughout the request
  const settings = cachedSettings ?? (await getCachedSettings());
  // Opt-in tool-source diagnostics (#1825): summarize the request's tool definitions
  // (count + MCP/hosted/client source breakdown + first names) as a single debug line.
  if (settings.logToolSources === true) {
    const toolSummary = summarizeToolSources((body as { tools?: unknown }).tools);
    if (toolSummary) log?.debug?.("TOOLS", toolSummary);
  }
  // #1311 (opt-in): echo the client-requested alias/combo name in the response `model`
  // field instead of the upstream model, so strict clients (Claude Desktop) that validate
  // response.model === request.model stop rejecting alias/combo requests with a 401.
  // #3697: always echo it for Codex CLI clients on the Responses API — regardless of the
  // opt-in setting — since the Codex CLI status line/model button reads `response.model`
  // to display the active model + reasoning effort (e.g. `gpt-5.5-xhigh`). Detection is by
  // request headers (originator/User-Agent), not by the routed provider, so it still fires
  // when `codex/gpt-5.5-xhigh` is routed through a combo to a non-codex upstream.
  const isCodexResponsesEcho =
    (isResponsesEndpoint || sourceFormat === FORMATS.OPENAI_RESPONSES) &&
    isCodexOriginatedHeaders(clientRawRequest?.headers);

  // Detect Claude Code CLI so we can auto-enable model echo — this prevents
  // session restore failures when the resolved upstream model (e.g.
  // `oc/nemotron-3-ultra-free`) is not recognized by the client on `--resume`.
  const isClaudeCodeClient = isClaudeCodeOriginatedHeaders(clientRawRequest?.headers);

  let echoModel =
    (settings.echoRequestedModelName === true || isCodexResponsesEcho || isClaudeCodeClient) &&
    typeof requestedModel === "string" &&
    requestedModel
      ? requestedModel
      : null;
  // Auto-echo the listing-valid form for bare requests to noAuth catalog
  // providers so clients validating response.model against /v1/models don't warn.
  echoModel = resolveNoAuthEchoModel(requestedModel, provider) ?? echoModel;
  const detailedLoggingEnabled =
    !noLogEnabled &&
    (settings.call_log_pipeline_enabled === true ||
      settings.call_log_pipeline_enabled === "1" ||
      settings.call_log_pipeline_enabled === "true");
  const capturePipelineStreamChunks =
    detailedLoggingEnabled && getCallLogPipelineCaptureStreamChunks();
  const skillRequestId = generateRequestId();
  let compressionAnalyticsWritePromise: Promise<void> | null = null;
  // #8249: raw header value, kept separate from `pipelineSessionId`'s skillRequestId fallback
  // below so call_logs.session_tag is only ever set when the caller explicitly supplied the
  // header — never synthesized from the internal per-request skillRequestId.
  const explicitSessionIdHeader =
    (clientRawRequest?.headers && typeof clientRawRequest.headers.get === "function"
      ? clientRawRequest.headers.get("x-omniroute-session-id")
      : getHeaderValueCaseInsensitive(
          clientRawRequest?.headers ?? null,
          "x-omniroute-session-id"
        )) || null;
  const pipelineSessionId = explicitSessionIdHeader || skillRequestId;
  const reasoningReplaySessionKey = sessionAffinityKey || explicitSessionIdHeader;
  const reasoningCacheScope = reasoningReplaySessionKey
    ? `api-key:${String(apiKeyInfo?.id ?? "local")}\x1f${String(reasoningReplaySessionKey)}`
    : null;
  // persistAttemptLogs extracted to chatCore/attemptLogging.ts (#3501); bind the per-request context
  // once so the 16 call sites keep passing only the per-attempt args (byte-identical).
  const persistAttemptLogs = (args: PersistAttemptLogsArgs) =>
    persistAttemptLogsFor(args, {
      traceId,
      provider,
      connectionId,
      model,
      skillRequestId,
      detailedLoggingEnabled,
      reqLogger,
      pendingRequestId,
      clientRawRequest,
      requestedModel,
      credentials,
      startTime,
      body,
      sourceFormat,
      targetFormat,
      comboName,
      comboStepId,
      comboExecutionKey,
      tokensCompressed,
      apiKeyInfo,
      noLogEnabled,
      correlationId,
      modelPinned,
      // Resolved conversationId (open-sse/services/conversationTracker.ts) wins when
      // present — it's populated for every request now, not just ones where the
      // client explicitly sent x-omniroute-session-id. The raw header remains a
      // fallback for any caller that somehow bypassed conversationId resolution.
      sessionTag: conversationId || explicitSessionIdHeader,
      // #12150 P1b surface 1: undefined for every non-video request (byte-identical
      // to before this param existed) — see applyVideoBridgeLogRedaction.
      videoBridgeLogRedaction: (videoBridgeLog as VideoBridgeLogParam | undefined)?.redaction,
      // #12150 P2 surface 2: mark the persisted call_logs row so
      // resolvePreviousResponseState refuses to rehydrate a snapshot whose video
      // transcript was redacted. false for every non-video request.
      videoContentRemoved: videoBridgeObserved,
    });

  // Primary path: merge client model id + alias target so config on either key applies; resolved
  // id wins on same header name. T5 family fallback uses only (nextModel, resolveModelAlias(next))
  // so A-model headers are not sent to B — see buildUpstreamHeadersForExecute.
  const connectionCustomUserAgent =
    credentials?.providerSpecificData &&
    typeof credentials.providerSpecificData === "object" &&
    typeof credentials.providerSpecificData.customUserAgent === "string"
      ? credentials.providerSpecificData.customUserAgent.trim()
      : "";

  // #8369: connection-level custom upstream headers from provider_specific_data.
  const connectionCustomHeaders =
    credentials?.providerSpecificData &&
    typeof credentials.providerSpecificData === "object" &&
    typeof credentials.providerSpecificData.customHeaders === "object" &&
    !Array.isArray(credentials.providerSpecificData.customHeaders)
      ? (credentials.providerSpecificData.customHeaders as Record<string, string>)
      : undefined;

  // Upstream extra-header building extracted to chatCore/upstreamExecuteHeaders.ts (#3501); bind the
  // per-request inputs once and delegate so the existing call sites stay byte-identical.
  const buildUpstreamHeadersForExecute = (modelToCall: string): Record<string, string> =>
    buildUpstreamHeadersForExecuteFor({
      modelToCall,
      effectiveModel,
      provider,
      model,
      resolvedModel,
      sourceFormat,
      connectionCustomUserAgent,
      connectionCustomHeaders,
      settings,
    });

  // Default to false unless client explicitly sets stream: true (OpenAI spec compliant)
  const acceptHeader =
    clientRawRequest?.headers && typeof clientRawRequest.headers.get === "function"
      ? clientRawRequest.headers.get("accept") || clientRawRequest.headers.get("Accept")
      : clientRawRequest?.headers?.["accept"] || clientRawRequest?.headers?.["Accept"];
  const streamUserAgent = [
    typeof userAgent === "string" ? userAgent : "",
    getHeaderValueCaseInsensitive(clientRawRequest?.headers ?? null, "user-agent") || "",
  ]
    .filter(Boolean)
    .join(" ");

  // Explicit per-request opt-in/out for the `</think>` close marker
  // (#5312 / #5245): `x-omniroute-thinking-marker: off` suppresses it for
  // reasoning_content-native clients (e.g. Cursor's OpenAI path) that the UA
  // allowlist does not cover; absent the header, the UA policy applies.
  const thinkingMarkerHeader = getHeaderValueCaseInsensitive(
    clientRawRequest?.headers ?? null,
    THINKING_MARKER_HEADER
  );

  const explicitStreamAlias = resolveExplicitStreamAlias(body);

  // Remove non-standard non-stream aliases before provider translation/execution.
  // They are accepted for compatibility at the OmniRoute API boundary only.
  if (body && typeof body === "object") {
    const b = body as Record<string, unknown>;
    if (explicitStreamAlias !== undefined) {
      b.stream = explicitStreamAlias;
    }

    delete b.non_stream;
    delete b.disable_stream;
    delete b.disable_streaming;
    delete b.streaming;
  }

  // Codex /responses/compact is JSON-only: Codex CLI does not send stream=false,
  // so route shape must override the usual Accept/header fallback.
  // sourceFormat="claude" applies the Anthropic Messages spec default (stream=false
  // when body omits stream), preventing STREAM_EARLY_EOF on /v1/messages when
  // clients send Accept: */* without an explicit stream flag.
  // providerRequiresStreaming: providers with forceStream:true (cline/clinepass)
  // only implement upstream streaming — a non-streaming request returns
  // "generateText is not implemented" / an empty body. This flag forces the
  // UPSTREAM request to stream (see `upstreamStream` below), but it MUST NOT
  // force the client-facing `stream` flag: a stream:false client (e.g. the
  // model-test button, plain JSON API callers) still expects a JSON response.
  // The client-side `if (!stream)` branch drains the forced upstream SSE and
  // converts it back to JSON via readNonStreamingResponseBody. Passing this
  // flag into resolveStreamFlag would force `stream=true` and skip that
  // conversion, yielding STREAM_EARLY_EOF for JSON callers. (#2081, #6126)
  const providerRequiresStreaming = REGISTRY[provider]?.forceStream === true;
  const stream =
    nativeCodexPassthrough && isCompactResponsesEndpoint(endpointPath)
      ? false
      : resolveStreamFlag(body?.stream, acceptHeader, sourceFormat, {
          userAgent: streamUserAgent,
          streamDefaultMode: apiKeyInfo?.streamDefaultMode,
        });

  // `settings` is already consolidated once near the top of handleChatCore
  // (the "fetch once, reuse" const). A second `const settings` here was a
  // duplicate same-scope declaration that broke the esbuild/tsx transform
  // ("settings has already been declared") and the production build. Reuse it.
  credentials = applyCodexGlobalFastServiceTier(provider, credentials, settings, {
    model: requestedModel,
    body: body && typeof body === "object" ? (body as Record<string, unknown>) : null,
  });
  effectiveServiceTier = resolveEffectiveServiceTier(body);
  setGeminiThoughtSignatureMode(settings.antigravitySignatureCacheMode);
  const semanticCacheEnabled = settings.semanticCacheEnabled !== false;

  const reqLogger = await createRequestLogger(sourceFormat, targetFormat, model, {
    enabled: detailedLoggingEnabled,
    captureStreamChunks: capturePipelineStreamChunks,
    maxStreamChunkBytes: getCallLogPipelineMaxSizeBytes(),
    requestId: pendingRequestId,
    model,
    provider: provider || undefined,
    connectionId: connectionId || credentials?.connectionId || undefined,
  });
  const pendingScope = { id: pendingRequestId, model, provider, connectionId: pendingConnId };
  const providerRequestCapture = createPreparedRequestLogger(reqLogger, pendingScope);
  // 0. Log client raw request (before format conversion) — redacts video transcript
  // cues in the logged copy only; see videoBridgeSnapshotRedaction.ts.
  logClientRawRequestRedacted(reqLogger, clientRawRequest, videoBridgeObserved);
  const reasoningRouteDecision =
    body && typeof body === "object"
      ? (body as Record<string, unknown>)._omnirouteReasoningRouteTrace
      : null;
  if (reasoningRouteDecision) {
    reqLogger.logRouteDecision(reasoningRouteDecision);
    body = { ...(body as Record<string, unknown>) };
    delete (body as Record<string, unknown>)._omnirouteReasoningRouteTrace;
  }

  log?.debug?.("FORMAT", `${sourceFormat} → ${targetFormat} | stream=${stream}`);

  // Preserve original body for cache signature — the body variable is mutated
  // multiple times below (sanitization, memory/skills injection) before the
  // cache store path runs at Phase 9.1 (non-streaming) / Phase 9.2 (streaming).
  // Without this snapshot, the write-time signature differs from the read-time
  // one, producing 0% hit rate. (#cache-signature-asymmetry)
  const bodyForCacheWrite = body;

  return {
    kind: "continue" as const,
    continue: {
      body,
      credentials,
      provider,
      model,
      extendedContext,
      videoBridgeObserved,
      resilienceSettings,
      requestedModel,
      isModelScope,
      startTime,
      traceId,
      traceEnabled,
      trace,
      getCurrentConnectionId,
      assertManagedLeaseFence,
      isManagedLeaseFenceError,
      managedLeaseFenceErrorResult,
      tokensCompressed,
      agentGoalPolicy,
      effectiveServiceTier,
      resolveEffectiveServiceTier,
      resolveReportedServiceTier,
      recordKeyHealthStatus,
      idempotencyKey,
      endpointPath,
      sourceFormat,
      isResponsesEndpoint,
      nativeCodexPassthrough,
      nativeXaiResponsesPassthrough,
      isDroidCLI,
      isOpencodeClient,
      copilotCompatibleReasoning,
      clientResponseFormat,
      nativeOpenAICompatibleResponsesPassthrough,
      customToolNames,
      backgroundReason,
      effectiveModel,
      alias,
      targetFormat,
      nativeResponsesPassthrough,
      pendingConnId,
      pendingRequestId,
      preConversionClientToolNames,
      webSearchFallbackPlan,
      webFetchFallbackPlan,
      settings,
      isCodexResponsesEcho,
      echoModel,
      skillRequestId,
      compressionAnalyticsWritePromise,
      pipelineSessionId,
      reasoningCacheScope,
      persistAttemptLogs,
      buildUpstreamHeadersForExecute,
      streamUserAgent,
      thinkingMarkerHeader,
      providerRequiresStreaming,
      stream,
      semanticCacheEnabled,
      reqLogger,
      pendingScope,
      providerRequestCapture,
      bodyForCacheWrite,
    },
  };
}

export type PreludeResult = Awaited<ReturnType<typeof runRequestPrelude>>;
export type Continue1 = Extract<PreludeResult, { kind: "continue" }>["continue"];
