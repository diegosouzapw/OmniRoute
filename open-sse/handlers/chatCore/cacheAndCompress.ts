/**
 * Semantic cache and proactive compression lifted out of handleChatCore.
 * HIT return and context-too-long stay here.
 */
import { injectMemoryAndSkills, mergeInjectedFallbackOwnerNames } from "./memorySkillsInjection.ts";
import { estimateFinalInputTokens } from "./contextEstimation.ts";
import { checkSemanticCache } from "./semanticCache.ts";
import { enforceOutputTokenBudget } from "./outputTokenBudget.ts";
import { sanitizeChatRequestBody } from "./sanitization.ts";
import {
  applyReasoningInputPolicy,
  resolveIncompatibleReasoningAction,
} from "../../services/reasoningInputPolicy.ts";
import {
  getHeaderValueCaseInsensitive,
  isNoMemoryRequested,
  resolveCompressionHeader,
} from "./headers.ts";
import { getCombosCached } from "./comboContextCache.ts";
import { resolveOmniGlyphTransport } from "../../services/compression/imageTransportPolicy.ts";
import { adaptBodyForCompression } from "../../services/compression/bodyAdapter.ts";
import { ensureEngineBreakdown } from "../../services/compression/engineBreakdown.ts";
import {
  createDisabledCompressionConfig,
  resolveCompressionSettings,
} from "./compressionSettings.ts";
import { isCompressionExcluded } from "../../services/compression/exclusions.ts";
import {
  isBuiltinStackedPipeline,
  isStackedCompressionCombo,
  type RuntimeCompressionCombo,
} from "./compressionComboPredicates.ts";
import { emitOutputStyleTelemetry } from "./outputStyleTelemetry.ts";
import { recordCompressionCacheStats } from "./compressionCacheStats.ts";
import { writeCavemanOutputAnalytics } from "./cavemanOutputAnalytics.ts";
import {
  compressContext,
  estimateTokens,
  getTokenLimit,
  getComboTargetTokenLimit,
  resolveComboContextLimit,
} from "../../services/contextManager.ts";
import type {
  CompressionConfig,
  CompressionPipelineStep,
  CompressionResult,
} from "../../services/compression/types.ts";
import { generateSessionId } from "../../services/sessionManager.ts";
import { getProactiveCompressionRatio } from "@/lib/db/compression";
import { forwardDashboardEventToLiveWs } from "./telemetryHelpers.ts";
import { resolveMemoryOwnerId } from "./memoryExtraction.ts";
import { FORMATS } from "../../translator/formats.ts";
import {
  getResolvedModelCapabilities,
  getExplicitModelOutputCap,
  resolveInputTokenCapForGate,
} from "@/lib/modelCapabilities.ts";
import { areContextWindowChecksDisabled } from "@/shared/utils/featureFlags.ts";
import { toPositiveInteger } from "../../services/reasoningTokenBuffer.ts";
import { createErrorResult } from "../../utils/error.ts";
import { HTTP_STATUS, DEFAULT_MAX_TOKENS } from "../../config/constants.ts";
import { logAuditEvent } from "@/lib/compliance";
import { emit } from "@/lib/events/eventBus";
import { trackPendingRequest } from "@/lib/usageDb";
import { writeCompressionAnalytics, writeCompressionSkip } from "./compressionAnalyticsWrite.ts";
import { resolveConnectionCacheOverride } from "../../utils/cacheControlPolicy.ts";

export async function runCacheAndCompress({
  body,
  credentials,
  log,
  clientRawRequest,
  connectionId,
  apiKeyInfo,
  comboName,
  isCombo,
  routingComboId,
  comboStepId,
  comboExecutionKey,
  reasoningTransportFallback,
  provider,
  model,
  startTime,
  traceId,
  getCurrentConnectionId,
  tokensCompressed,
  effectiveServiceTier,
  sourceFormat,
  nativeCodexPassthrough,
  backgroundReason,
  effectiveModel,
  targetFormat,
  preConversionClientToolNames,
  webSearchFallbackPlan,
  webFetchFallbackPlan,
  skillRequestId,
  compressionAnalyticsWritePromise,
  persistAttemptLogs,
  stream,
  semanticCacheEnabled,
  reqLogger,
}) {
  // ── Phase 9.1: Semantic cache check (temp=0, any streaming mode) ──
  const cacheHit = await checkSemanticCache({
    semanticCacheEnabled,
    body,
    clientRawRequest,
    model,
    provider,
    stream: !!stream,
    reqLogger,
    effectiveServiceTier,
    connectionId,
    startTime,
    log,
    persistAttemptLogs,
    apiKeyId: apiKeyInfo?.id ?? undefined,
    cacheDefaultMode: (apiKeyInfo as { cacheDefaultMode?: "legacy" | "bypass" } | null)
      ?.cacheDefaultMode,
  });
  if (cacheHit) {
    return { kind: "return" as const, value: cacheHit };
  }

  const reasoningInputFormat =
    sourceFormat === FORMATS.OPENAI_RESPONSES
      ? "responses"
      : sourceFormat === FORMATS.OPENAI
        ? "chat"
        : null;
  if (reasoningInputFormat && body && typeof body === "object") {
    const policy = applyReasoningInputPolicy(
      body as Record<string, unknown>,
      reasoningInputFormat,
      {
        provider,
        preserveEncryptedReasoning:
          credentials?.providerSpecificData?.preserveEncryptedReasoning === true,
        onIncompatibleReasoning: resolveIncompatibleReasoningAction({
          reasoningTransportFallback,
          // #11178 regressed combo steps whose combo record carries no explicit
          // stepId/executionKey (plain model-list combos): their explicit
          // `reasoningTransportFallback: "skip"` config was silently degraded to
          // "drop". `isCombo` is the combo marker; step ids are optional
          // finer-grained metadata that plain combos never set.
          isComboStep: Boolean(isCombo) || Boolean(comboStepId || comboExecutionKey),
          headers: clientRawRequest?.headers ?? null,
        }),
      }
    );
    if (policy.incompatibleReasoning) {
      trackPendingRequest(model, provider, connectionId, false);
      return {
        kind: "return" as const,
        value: createErrorResult(
          HTTP_STATUS.BAD_REQUEST,
          "Reasoning continuation is not compatible with the selected target"
        ),
      };
    }
  }

  body = sanitizeChatRequestBody(body, sourceFormat, targetFormat);
  // Per-request opt-out: clients that manage their own context send
  // `x-omniroute-no-memory: true` to skip memory+skills injection (a null owner
  // disables both branches in injectMemoryAndSkills). See PRD-2026-06-19-no-memory-header.
  const memoryOwnerId = isNoMemoryRequested(clientRawRequest?.headers ?? null)
    ? null
    : resolveMemoryOwnerId(apiKeyInfo as Record<string, unknown> | null);
  const injectionResult = await injectMemoryAndSkills({
    body,
    memoryOwnerId,
    provider,
    effectiveModel,
    sourceFormat,
    targetFormat,
    backgroundReason,
    log,
  });
  body = injectionResult.body;
  const memorySettings = injectionResult.memorySettings;

  // Merge web-search/web-fetch fallback tool names into the builtin owner set.
  // injectMemoryAndSkills only tracks memory tools; the fallback names were
  // injected into body.tools by prepareWebSearchFallbackBody/prepareWebFetchFallbackBody
  // above, so they must be carried into the owner provenance chain here.
  const mergedOwnerNames = mergeInjectedFallbackOwnerNames(
    injectionResult,
    [webSearchFallbackPlan, webFetchFallbackPlan],
    preConversionClientToolNames
  );
  injectionResult.builtinToolNames = mergedOwnerNames.builtinToolNames;

  // Translate request (pass reqLogger for intermediate logging)
  // ── Proactive Context Compression (Phase 4) ──
  // Check if context exceeds 70% of limit and compress proactively before sending to provider.
  // This prevents "prompt too long" errors for large-but-not-full contexts.
  const compressionBody = body
    ? adaptBodyForCompression(body as Record<string, unknown>).body
    : null;
  const allMessages = compressionBody?.messages || body?.contents || body?.request?.contents || [];
  let cavemanOutputModeApplied = false;
  let cavemanOutputModeIntensity: string | null = null;
  let preCompressionBody: typeof body | null = null;
  let compressionResponseMeta: string | null = null;
  // OmniGlyph 1.3.x has native OpenAI Chat/Responses transformers. When the
  // inbound protocol differs from the provider wire, defer only that engine to
  // the post-translation body; the text engines still run in their legacy lane.
  let runPostTranslationCompression:
    ((input: Record<string, unknown>) => Promise<CompressionResult>) | null = null;
  // Delegated Context Editing (Claude only): captured at the canonical compression
  // settings read below, then threaded to executor.execute() further down. Lives at
  // function scope because the read happens inside the per-message compression block.
  let contextEditingEnabled = false;
  // The dashboard's global compression switch must also control the built-in
  // reactive and last-resort compaction passes. Otherwise an operator selecting
  // "off" still has large histories rewritten by trim_tools/purify_history.
  let reactiveContextCompactionEnabled = false;
  // Hoisted to function scope (not just the compression-block scope below) so the
  // combo-resolved override survives to the final enforceOutputTokenBudget() call
  // further down — see #8378 (context limit resolved by the combo was silently
  // discarded because it only existed inside this `if` block).
  let contextLimit = getTokenLimit(provider, effectiveModel);
  if (body && Array.isArray(allMessages) && allMessages.length > 0) {
    let estimatedTokens = estimateTokens(allMessages);
    const compressionSettingsResult = await resolveCompressionSettings(log);
    const compressionSettings: CompressionConfig | null = compressionSettingsResult.settings;
    // #8034 — operator-named model/endpoint exclusions bypass the whole pipeline, exactly
    // like compression being globally disabled, so the body is provably byte-identical.
    // Native Codex passthrough is deliberately NOT part of this exclusion: prompt
    // compression runs through adaptBodyForCompression() (Responses input[] → messages
    // → restore) with codex tool-output eligibility guards, so native contexts still
    // compress (regression: #8933 introduced the passthrough bypass, landed on release
    // via #11088, silencing codex analytics to skip_reason='excluded'). Reactive
    // compaction + combo overflow fail-fast below still bypass native passthrough —
    // intentionally left for follow-up. Operators who want byte-identical passthrough
    // can add `codex/*` to the exclusions list.
    const compressionExcluded = isCompressionExcluded(
      { provider, model: effectiveModel },
      compressionSettings?.exclusions
    );
    // A per-key opt-out is a request-scoped hard kill for prompt compression. It
    // deliberately does not disable the independent reactive context-fit safety
    // passes, matching the existing x-omniroute-compression: off contract.
    const apiKeyCompressionEnabled = apiKeyInfo?.compressionEnabled !== false;
    let promptCompressionEnabled =
      compressionSettingsResult.enabled && !compressionExcluded && apiKeyCompressionEnabled;
    reactiveContextCompactionEnabled = compressionSettingsResult.enabled && !compressionExcluded;
    contextEditingEnabled = compressionSettingsResult.contextEditingEnabled;
    if (!apiKeyCompressionEnabled) {
      log?.debug?.("COMPRESSION", "Prompt compression disabled for this API key");
    }
    if (compressionExcluded) {
      void writeCompressionSkip(
        {
          stats: {
            originalTokens: estimatedTokens,
            compressedTokens: estimatedTokens,
            savingsPercent: 0,
            techniquesUsed: [],
            mode: "off",
            timestamp: Date.now(),
          },
          provider,
          effectiveModel,
          effectiveServiceTier,
          comboName,
          mode: "off",
          compressionComboId: null,
          skillRequestId,
          cavemanOutputModeApplied: false,
          cavemanOutputModeIntensity: null,
          log,
        },
        "excluded"
      );
    }

    // --- Modular Compression Pipeline (Phase 1 Lite + Phase 2 Standard/Caveman + Phase 3 Aggressive) ---
    // Runs BEFORE the existing reactive compressContext() to proactively reduce tokens.
    try {
      const {
        selectCompressionStrategy,
        selectCompressionPlan,
        enginesMapDerivesStackedPipeline,
        activeComboResolves,
        applyCompressionAsync,
        resolveCacheAwareConfig,
        formatCompressionMeta,
        buildNamedComboLookup,
        formatCompressionAnnotation,
      } = await import("../../services/compression/strategySelector.ts");
      const { trackCompressionStats } = await import("../../services/compression/stats.ts");
      let config: CompressionConfig = compressionSettings ?? createDisabledCompressionConfig();
      if (compressionExcluded || !apiKeyCompressionEnabled) {
        config = { ...config, enabled: false };
      }
      if (!promptCompressionEnabled || !compressionSettings) {
        log?.debug?.("COMPRESSION", "Prompt compression disabled or unavailable");
      }
      let compressionComboKey = comboName ?? null;
      let compressionComboApplied = false;
      const applyCompressionComboConfig = (
        compressionCombo: RuntimeCompressionCombo | null,
        routingOverrideIds: string[] = []
      ): boolean => {
        if (!compressionCombo || compressionCombo.pipeline.length === 0) return false;
        const comboLanguagePacks = [
          ...new Set(
            compressionCombo.languagePacks
              .map((pack) => pack.trim())
              .filter((pack) => pack.length > 0)
          ),
        ];
        const comboOutputIntensity = (
          ["lite", "full", "ultra"].includes(compressionCombo.outputModeIntensity)
            ? compressionCombo.outputModeIntensity
            : (config.cavemanOutputMode?.intensity ?? "full")
        ) as "lite" | "full" | "ultra";
        const comboDefaultLanguage =
          comboLanguagePacks.find((pack) => pack === config.languageConfig?.defaultLanguage) ??
          comboLanguagePacks[0] ??
          config.languageConfig?.defaultLanguage ??
          "en";
        const comboOverrides = { ...(config.comboOverrides ?? {}) };
        for (const id of routingOverrideIds) {
          if (id) comboOverrides[id] = "stacked";
        }
        config = {
          ...config,
          compressionComboId: compressionCombo.id,
          stackedPipeline: compressionCombo.pipeline,
          languageConfig: {
            ...(config.languageConfig ?? {
              enabled: false,
              defaultLanguage: "en",
              autoDetect: true,
              enabledPacks: ["en"],
            }),
            enabled: true,
            defaultLanguage: comboDefaultLanguage,
            enabledPacks:
              comboLanguagePacks.length > 0
                ? comboLanguagePacks
                : (config.languageConfig?.enabledPacks ?? ["en"]),
          },
          cavemanOutputMode: {
            ...(config.cavemanOutputMode ?? {
              enabled: false,
              intensity: "full",
              autoClarity: true,
            }),
            enabled: compressionCombo.outputMode,
            intensity: comboOutputIntensity,
          },
          comboOverrides,
        };
        compressionComboApplied = true;
        return true;
      };
      if ((isCombo && comboName) || routingComboId) {
        try {
          const { getComboByName } = await import("@/lib/db/combos");
          let comboConfig = await getComboByName(comboName);
          if (!comboConfig && comboName?.startsWith("combo/")) {
            comboConfig = await getComboByName(comboName.substring(6));
          }
          const comboRuntimeConfig =
            comboConfig?.config && typeof comboConfig.config === "object"
              ? (comboConfig.config as Record<string, unknown>)
              : {};
          const comboMode =
            typeof comboRuntimeConfig.compressionMode === "string"
              ? comboRuntimeConfig.compressionMode
              : typeof comboConfig?.compressionOverride === "string"
                ? comboConfig.compressionOverride
                : null;
          if (
            comboMode === "off" ||
            comboMode === "lite" ||
            comboMode === "standard" ||
            comboMode === "aggressive" ||
            comboMode === "ultra" ||
            comboMode === "rtk" ||
            comboMode === "stacked"
          ) {
            config = {
              ...config,
              comboOverrides: {
                ...(config.comboOverrides ?? {}),
                ...(comboName ? { [comboName]: comboMode } : {}),
                ...(comboConfig?.id ? { [String(comboConfig.id)]: comboMode } : {}),
              },
            };
            compressionComboKey = comboName;
          }
          const routingComboIds = [
            comboConfig?.id,
            comboName,
            routingComboId,
            comboName?.startsWith("combo/") ? comboName.substring(6) : null,
          ].filter((id): id is string => typeof id === "string" && id.length > 0);
          if (routingComboIds.length > 0) {
            const { getCompressionComboForRoutingCombo } =
              await import("../../../src/lib/db/compressionCombos.ts");
            const assignedCompressionCombo =
              routingComboIds
                .map((id) => getCompressionComboForRoutingCombo(id))
                .find((combo) => combo !== null) ?? null;
            if (
              applyCompressionComboConfig(
                assignedCompressionCombo as RuntimeCompressionCombo | null,
                routingComboIds
              )
            ) {
              compressionComboKey = comboName;
            }
          }
        } catch (err) {
          log?.debug?.(
            "COMPRESSION",
            "Combo compression override lookup skipped: " +
              (err instanceof Error ? err.message : String(err))
          );
        }
      }
      let namedCombos: Record<string, CompressionPipelineStep[]> = {};
      try {
        const { listCompressionCombos } = await import("../../../src/lib/db/compressionCombos.ts");
        namedCombos = buildNamedComboLookup(listCompressionCombos());
      } catch (err) {
        log?.debug?.(
          "COMPRESSION",
          "Named combos load skipped: " + (err instanceof Error ? err.message : String(err))
        );
      }
      // Phase 3: per-request override. Unknown values fall through in the resolver (never error).
      const compressionHeader = resolveCompressionHeader(clientRawRequest?.headers ?? null);
      if (compressionHeader) {
        log?.debug?.("COMPRESSION", `x-omniroute-compression header: ${compressionHeader}`);
      }
      const connectionCacheOverride = resolveConnectionCacheOverride(
        credentials?.providerSpecificData
      );
      const modeBeforeOutputTransform = selectCompressionStrategy(
        config,
        compressionComboKey,
        estimatedTokens,
        body as Record<string, unknown>,
        { provider, targetFormat, model: effectiveModel, connectionCacheOverride },
        namedCombos,
        compressionHeader
      );
      if (
        modeBeforeOutputTransform === "stacked" &&
        !compressionComboApplied &&
        !config.compressionComboId &&
        isBuiltinStackedPipeline(config.stackedPipeline) &&
        // Don't let the legacy default combo override a panel-configured engines map: when the
        // operator's explicit engines derive their own stacked pipeline, that pipeline (applied
        // below from compressionPlan.stackedPipeline) is authoritative. Legacy/backfilled
        // installs (enginesExplicit false) still fall through to the seeded default combo.
        !enginesMapDerivesStackedPipeline(config) &&
        // Never let the legacy seeded default combo shadow the operator's active profile.
        !activeComboResolves(config, namedCombos)
      ) {
        try {
          const { getDefaultCompressionCombo } =
            await import("../../../src/lib/db/compressionCombos.ts");
          const defaultCompressionCombo = getDefaultCompressionCombo();
          if (
            isStackedCompressionCombo(defaultCompressionCombo as RuntimeCompressionCombo | null) &&
            applyCompressionComboConfig(defaultCompressionCombo as RuntimeCompressionCombo | null)
          ) {
            log?.debug?.(
              "COMPRESSION",
              `Default compression combo applied: ${defaultCompressionCombo?.id}`
            );
          }
        } catch (err) {
          log?.debug?.(
            "COMPRESSION",
            "Default compression combo lookup skipped: " +
              (err instanceof Error ? err.message : String(err))
          );
        }
      }
      // Phase 4A: unified output styles (supersedes cavemanOutputMode via the back-compat shim).
      let outputStyleResult:
        import("../../services/compression/outputStyles/apply.ts").OutputStylesResult | null = null;
      if (config.enabled && compressionHeader?.trim().toLowerCase() !== "off") {
        try {
          const { resolveOutputStyleSelection } =
            await import("../../services/compression/outputStyles/backCompat.ts");
          const selection = resolveOutputStyleSelection(config);
          if (selection.length > 0) {
            const { applyOutputStyles, resolveOutputStyleLanguage } =
              await import("../../services/compression/outputStyles/apply.ts");
            const outputStyleLanguage = resolveOutputStyleLanguage(
              config.languageConfig,
              body as Parameters<typeof resolveOutputStyleLanguage>[1]
            );
            outputStyleResult = applyOutputStyles(
              body as Parameters<typeof applyOutputStyles>[0],
              selection,
              outputStyleLanguage
            );
            if (outputStyleResult.applied) {
              body = outputStyleResult.body as typeof body;
              cavemanOutputModeApplied = true;
              cavemanOutputModeIntensity =
                outputStyleResult.appliedStyles?.map((s) => `${s.id}:${s.level}`).join(",") ?? null;
              estimatedTokens = estimateTokens(body?.messages ?? body?.input ?? []);
              log?.debug?.("COMPRESSION", "Output styles applied");
            } else if (
              outputStyleResult.skippedReason &&
              outputStyleResult.skippedReason !== "no_styles"
            ) {
              log?.debug?.(
                "COMPRESSION",
                `Output styles skipped: ${outputStyleResult.skippedReason}`
              );
            }
          }
        } catch (err) {
          log?.debug?.(
            "COMPRESSION",
            "Output styles skipped: " + (err instanceof Error ? err.message : String(err))
          );
        }
      }
      const compressionInputBody = body as Record<string, unknown>;
      // Adaptive context-budget (Sub-project C): model context window + request max_tokens drive
      // the budget target. getTokenLimit is already imported; provider/effectiveModel resolved above.
      const adaptiveModelContextLimit =
        provider && effectiveModel ? getTokenLimit(provider, effectiveModel) : null;
      const requestMaxTokens =
        typeof (compressionInputBody as Record<string, unknown>)?.max_tokens === "number"
          ? ((compressionInputBody as Record<string, unknown>).max_tokens as number)
          : null;
      let adaptiveTelemetry:
        import("../../services/compression/adaptiveCompression/types.ts").AdaptiveTelemetry | null =
        null;
      const compressionPlan = selectCompressionPlan(
        config,
        compressionComboKey,
        estimatedTokens,
        compressionInputBody,
        { provider, targetFormat, model: effectiveModel, connectionCacheOverride },
        namedCombos,
        compressionHeader,
        {
          modelContextLimit: adaptiveModelContextLimit,
          requestMaxTokens: requestMaxTokens,
          onAdaptive: (t) => {
            adaptiveTelemetry = t;
          },
        }
      );
      const mode = compressionPlan.mode as CompressionConfig["defaultMode"];
      if (adaptiveTelemetry && adaptiveTelemetry.fit === false) {
        log?.warn?.(
          "COMPRESSION",
          `adaptive budget-exceeded: target=${adaptiveTelemetry.target} headroomAfter=${adaptiveTelemetry.headroomAfter} stages=${adaptiveTelemetry.stagesApplied.join(",")} (best-effort plan sent, content preserved)`
        );
      }
      compressionResponseMeta = formatCompressionMeta(compressionPlan);
      // When the per-engine toggle map derives a stacked pipeline (and no named/routing
      // combo already set config.stackedPipeline), feed that derived pipeline through so
      // applyCompressionAsync (which reads config.stackedPipeline for stacked mode) runs the
      // engines the operator actually toggled on instead of the built-in rtk+caveman default.
      if (
        mode === "stacked" &&
        compressionPlan.stackedPipeline.length > 0 &&
        !compressionComboApplied &&
        !config.compressionComboId
      ) {
        config = {
          ...config,
          stackedPipeline: compressionPlan.stackedPipeline as CompressionConfig["stackedPipeline"],
        };
      }
      let compressionAnalyticsRecorded = false;
      if (mode !== "off") {
        // #3890: in a caching context, never compress the system prompt (cacheable prefix)
        // even if the operator disabled preserveSystemPrompt — honors the cache-aware flag
        // that selectCompressionStrategy can only partially apply via the mode string.
        const cacheCtx = { provider, targetFormat, model: effectiveModel, connectionCacheOverride };
        const compressionConfig = resolveCacheAwareConfig(config, compressionInputBody, cacheCtx);
        const compressionPrincipalId = apiKeyInfo?.id ? String(apiKeyInfo.id) : undefined;
        const compressionOptions = {
          model: effectiveModel,
          // #7237: feed the AUTHORITATIVE capability (model spec / models.dev sync / DB
          // override, with the conservative model-id fragment heuristic only as its
          // last-resort fallback) instead of calling the heuristic directly here. The
          // heuristic alone wrongly returned false for e.g. gpt-5.5 (registered
          // supportsVision:true in modelSpecs but absent from the deliberately-conservative
          // fragment list), and lite.ts's gate (`supportsVision !== false`) treated that
          // false as "strip every image_url block". Resolves to `null` for genuinely unknown
          // models, which is intentionally NOT `false` so the gate still preserves images.
          supportsVision: getResolvedModelCapabilities({ provider, model: effectiveModel })
            .supportsVision,
          // OmniGlyph uses a measured provider/image-fidelity allowlist. Direct HTTP
          // alone is not proof that a route preserves PNG bytes and dimensions.
          ...resolveOmniGlyphTransport(provider),
          // Sem o provider, a contabilidade do OmniGlyph cai para `unknown` e
          // recusa deduzir a semântica de cache (Anthropic usa buckets disjuntos,
          // OpenAI reporta cached como subconjunto do input).
          provider,
          sourceFormat,
          targetFormat,
          compressionStage: "pre-translation" as const,
          config: compressionConfig,
          cachingContext: cacheCtx,
          principalId: compressionPrincipalId,
          // F3.3: stream per-engine progress live (best-effort) before compression.completed.
          onEngineStep: (s) => {
            try {
              const stepPayload = {
                requestId: traceId,
                comboId: null,
                mode,
                stepIndex: s.stepIndex,
                totalSteps: s.totalSteps,
                engine: s.engine,
                state: s.state,
                originalTokens: s.originalTokens,
                compressedTokens: s.compressedTokens,
                savingsPercent: s.savingsPercent,
                ...(s.durationMs !== undefined ? { durationMs: s.durationMs } : {}),
                timestamp: Date.now(),
              };
              emit("compression.step", stepPayload);
              void forwardDashboardEventToLiveWs("compression.step", stepPayload);
            } catch (_stepErr) {
              // best-effort live event — never fail the request
            }
          },
        };
        const runCompression = (input: Record<string, unknown>) =>
          applyCompressionAsync(input, mode, compressionOptions);
        const omniglyphSelected =
          mode === "omniglyph" ||
          (mode === "stacked" &&
            Array.isArray(compressionConfig.stackedPipeline) &&
            compressionConfig.stackedPipeline.some((step) =>
              typeof step === "string" ? step === "omniglyph" : step.engine === "omniglyph"
            ));
        if (
          omniglyphSelected &&
          (targetFormat === FORMATS.CLAUDE ||
            targetFormat === FORMATS.OPENAI ||
            targetFormat === FORMATS.OPENAI_RESPONSES) &&
          !(sourceFormat === FORMATS.CLAUDE && targetFormat === FORMATS.CLAUDE)
        ) {
          runPostTranslationCompression = (input) =>
            applyCompressionAsync(input, mode, {
              ...compressionOptions,
              compressionStage: "post-translation" as const,
            });
        }
        let result: CompressionResult;
        if (compressionConfig.liveZone?.enabled === true) {
          const { applyLiveZoneCompression } =
            await import("../../services/compression/liveZone.ts");
          const explicitSessionId =
            clientRawRequest?.headers && typeof clientRawRequest.headers.get === "function"
              ? clientRawRequest.headers.get("x-omniroute-session-id")
              : getHeaderValueCaseInsensitive(
                  clientRawRequest?.headers ?? null,
                  "x-omniroute-session-id"
                );
          const liveZoneSessionId =
            explicitSessionId ||
            generateSessionId(compressionInputBody, {
              provider,
              connectionId: getCurrentConnectionId() ?? undefined,
            }) ||
            undefined;
          result = await applyLiveZoneCompression(
            compressionInputBody,
            {
              principalId: compressionPrincipalId,
              sessionId: liveZoneSessionId,
              variant: {
                mode,
                provider,
                model: effectiveModel,
                config: compressionConfig,
                cachePrefix: {
                  system: compressionInputBody.system,
                  systemInstruction: compressionInputBody.systemInstruction,
                  system_instruction: compressionInputBody.system_instruction,
                  instructions: compressionInputBody.instructions,
                  tools: compressionInputBody.tools,
                  toolChoice: compressionInputBody.tool_choice,
                },
              },
              ttlMinutes: compressionConfig.cacheMinutes,
            },
            runCompression
          );
        } else {
          result = await runCompression(compressionInputBody);
        }
        if (result.stats) {
          const annotation = formatCompressionAnnotation(result.stats);
          if (annotation) {
            compressionResponseMeta = `${compressionResponseMeta}; ${annotation}`;
          }
          if (result.compressed) {
            body = result.body as typeof body;
            estimatedTokens = result.stats.compressedTokens;
            tokensCompressed = Math.max(
              0,
              result.stats.originalTokens - result.stats.compressedTokens
            );
          }

          // Fire-and-forget: emit live compression event for dashboard (U5).
          // Guard: only emit when compression actually ran and produced stats.
          if (result.compressed && result.stats) {
            try {
              const compressionCompletedPayload = {
                requestId: traceId,
                comboId: result.stats.compressionComboId ?? null,
                mode,
                originalTokens: result.stats.originalTokens,
                compressedTokens: result.stats.compressedTokens,
                savingsPercent: result.stats.savingsPercent,
                // Single-engine modes leave engineBreakdown empty; synthesize a 1-entry
                // breakdown so the studio shows a real engine node instead of an empty pipeline.
                engineBreakdown: ensureEngineBreakdown(result.stats),
                validationWarnings: result.stats.validationWarnings,
                fallbackApplied: result.stats.fallbackApplied,
                ...(adaptiveTelemetry ? { adaptive: adaptiveTelemetry } : {}),
                timestamp: Date.now(),
              };
              emit("compression.completed", compressionCompletedPayload);
              void forwardDashboardEventToLiveWs(
                "compression.completed",
                compressionCompletedPayload
              );
            } catch (_emitErr) {
              // never propagate into the hot path — but log like the sibling
              // fire-and-forget blocks so a throwing event bus isn't fully silent.
              log?.debug?.(
                "COMPRESSION",
                "compression.completed emit skipped: " +
                  (_emitErr instanceof Error ? _emitErr.message : String(_emitErr))
              );
            }
          }

          if (result.compressed || result.stats.fallbackApplied || cavemanOutputModeApplied) {
            trackCompressionStats(result.stats);
            compressionAnalyticsRecorded = true;
            compressionAnalyticsWritePromise = writeCompressionAnalytics({
              stats: result.stats,
              provider,
              effectiveModel,
              effectiveServiceTier,
              comboName,
              mode,
              compressionComboId: config.compressionComboId,
              skillRequestId,
              cavemanOutputModeApplied,
              cavemanOutputModeIntensity,
              log,
            });
            await compressionAnalyticsWritePromise;
          } else {
            // Compression was attempted (mode active, engines ran) but produced no
            // recordable saving — e.g. a Stacked RTK→Caveman pipeline on already-compact
            // context. Record a skip row so analytics can distinguish "ran but saved
            // nothing" from "never ran" instead of dropping it silently (#4268).
            compressionAnalyticsRecorded = true;
            compressionAnalyticsWritePromise = writeCompressionSkip(
              {
                stats: result.stats,
                provider,
                effectiveModel,
                effectiveServiceTier,
                comboName,
                mode,
                compressionComboId: config.compressionComboId,
                skillRequestId,
                cavemanOutputModeApplied,
                cavemanOutputModeIntensity,
                log,
              },
              "no_savings"
            );
            await compressionAnalyticsWritePromise;
          }

          if (result.compressed) {
            recordCompressionCacheStats({
              compressionInputBody,
              provider,
              targetFormat,
              effectiveModel,
              mode,
              stats: result.stats,
              connectionCacheOverride,
              log,
            });
            log?.info?.(
              "COMPRESSION",
              `Prompt compressed (${mode}): ${result.stats.originalTokens} -> ${result.stats.compressedTokens} tokens (${result.stats.savingsPercent}% saved, techniques: ${result.stats.techniquesUsed.join(",")})`
            );
          }
        }
      }
      if (cavemanOutputModeApplied && !compressionAnalyticsRecorded) {
        compressionAnalyticsWritePromise = writeCavemanOutputAnalytics({
          comboName,
          provider,
          compressionComboId: config.compressionComboId,
          estimatedTokens,
          skillRequestId,
          cavemanOutputModeIntensity,
          log,
        });
        await compressionAnalyticsWritePromise;
      }
      emitOutputStyleTelemetry({
        outputStyleResult,
        skillRequestId,
        traceId,
        effectiveModel,
        provider,
        compressionComboId: config.compressionComboId,
        estimatedTokens,
        log,
      });
    } catch (err) {
      log?.warn?.(
        "COMPRESSION",
        "Compression pipeline error (non-fatal): " +
          (err instanceof Error ? err.message : String(err))
      );
    }
    // --- End Modular Compression Pipeline ---

    if (!promptCompressionEnabled) {
      log?.debug?.(
        "CONTEXT",
        "Prompt Compression engines disabled; reactive context compaction still applies when over threshold"
      );
    }
    if (isCombo && comboName) {
      log?.info?.("CONTEXT", `Attempting to resolve combo limits for comboName=${comboName}`);
      try {
        const { getComboByName } = await import("@/lib/db/combos");
        const { resolveComboTargets } = await import("../../services/combo.ts");
        let comboConfig = await getComboByName(comboName);
        if (!comboConfig && comboName.startsWith("combo/")) {
          comboConfig = await getComboByName(comboName.substring(6));
        }
        let comboTargetLimits: number[] = [];
        if (comboConfig) {
          const allCombosData = await getCombosCached();
          const targets = resolveComboTargets(
            comboConfig as unknown as { name: string; models: unknown[] },
            allCombosData as unknown as { name: string; models: unknown[] }[]
          );
          // Fall back to ResolvedComboTarget.provider when modelStr lacks a
          // provider/ prefix — parseModel alone returns provider:null (#8716).
          comboTargetLimits = targets
            .map((t: { modelStr?: string; provider?: string }) =>
              getComboTargetTokenLimit({ modelStr: t.modelStr, provider: t.provider })
            )
            .filter(
              (limit): limit is number =>
                typeof limit === "number" && Number.isFinite(limit) && limit > 0
            );
        }
        // chatCore executes per concrete target (handleSingleModel resolves
        // provider/effectiveModel before delegating). Compress against THIS
        // target's window; min(...allTargets) is only a defensive fallback —
        // the old unconditional min compressed a 1M-target request at the
        // smallest sibling's window ("agent keeps forgetting things").
        // An explicit `context_length` on the combo record (Agent Features →
        // Context length) is an operator declaration and outranks the inferred
        // per-target window — see resolveComboContextLimit().
        const rawComboContextLength = (comboConfig as { context_length?: unknown } | null)
          ?.context_length;
        const comboContextLength =
          typeof rawComboContextLength === "number" &&
          Number.isFinite(rawComboContextLength) &&
          rawComboContextLength > 0
            ? rawComboContextLength
            : null;
        const resolved = resolveComboContextLimit({
          provider,
          model: effectiveModel,
          comboTargetLimits,
          comboContextLength,
        });
        contextLimit = resolved.limit;
        log?.info?.(
          "CONTEXT",
          `Combo context limit: ${resolved.limit} (source=${resolved.source})`
        );
      } catch (err) {
        log?.warn?.("CONTEXT", "Failed to resolve combo limits for compression: " + err);
      }
    }

    const COMPRESSION_THRESHOLD = getProactiveCompressionRatio();
    let reservedTokens = 0;
    if (Array.isArray(body.tools)) {
      reservedTokens = estimateTokens(body.tools);
    }
    const threshold = Math.max(
      1,
      Math.floor((Math.max(1, contextLimit) - reservedTokens) * COMPRESSION_THRESHOLD)
    );

    log?.debug?.(
      "CONTEXT",
      `Checking compression: ${estimatedTokens} tokens vs ${threshold} threshold (${contextLimit} limit, ${reservedTokens} reserved)`
    );

    // Capture pre-compression body so translators can access original message
    // content even after compression alters it (e.g. stable Kiro conversationId).
    preCompressionBody = body;

    // Reactive context compaction is independent of optional prompt-compression
    // engines (Caveman/RTK). Codex Desktop / Responses clients need this path even
    // when those engines are off, otherwise multi-turn image sessions hard-reject
    // at the budget check below (#8560).
    if (
      reactiveContextCompactionEnabled &&
      !nativeCodexPassthrough &&
      estimatedTokens > threshold
    ) {
      log?.info?.(
        "CONTEXT",
        `Proactive compression triggered: ${estimatedTokens} tokens > ${threshold} threshold (${contextLimit} limit)`
      );

      // Adapt Responses `input[]` → messages so compressContext can run, then restore.
      const ctxAdapter = adaptBodyForCompression(body as Record<string, unknown>);
      const compressionResult = compressContext(ctxAdapter.body, {
        provider,
        model: effectiveModel,
        maxTokens: threshold,
        reserveTokens: 0,
      });

      if (compressionResult.compressed && compressionResult.body) {
        body = ctxAdapter.adapted
          ? ctxAdapter.restore(compressionResult.body as Record<string, unknown>, {
              dropMissingMappedItems: true,
            })
          : compressionResult.body;
        const stats = compressionResult.stats;
        tokensCompressed = Math.max(0, (stats?.original ?? 0) - (stats?.final ?? 0));
        const layersInfo =
          stats && "layers" in stats && Array.isArray(stats.layers)
            ? ` (layers: ${stats.layers.map((l: { name: string }) => l.name).join(", ")})`
            : "";

        log?.info?.(
          "CONTEXT",
          `Context compressed: ${stats.original} → ${stats.final} tokens${layersInfo}`
        );

        logAuditEvent({
          action: "context.proactive_compression",
          actor: apiKeyInfo?.name || "system",
          target: connectionId || provider || "chat",
          details: {
            provider,
            model: effectiveModel,
            original_tokens: stats.original,
            final_tokens: stats.final,
            layers: "layers" in stats ? stats.layers : undefined,
          },
        });
      } else {
        log?.debug?.("CONTEXT", `Compression not applied: context already fits within target`);
      }
    }
  } else {
    log?.debug?.(
      "CONTEXT",
      `Skipping compression check: body=${!!body}, hasMessages=${Array.isArray(allMessages)}`
    );
  }

  // Re-check the concrete target after all compression passes. Combo compatibility
  // filtering is advisory and may preserve an all-incompatible pool; this is the
  // hard boundary that prevents a too-large prompt (or a negative token budget)
  // from reaching an OpenAI-compatible upstream such as NVIDIA NIM.
  let finalEstimatedInputTokens = estimateFinalInputTokens(body as Record<string, unknown>);
  // Reuse the already-resolved `contextLimit` (may have been narrowed to the
  // per-target combo window above, resolveComboContextLimit) instead of a bare
  // getTokenLimit(provider, effectiveModel) re-fetch, which would silently
  // discard that combo-aware override and re-widen the last-resort budget.
  const finalContextLimit = contextLimit;
  const toolsReserve = Array.isArray(body?.tools) ? estimateTokens(body.tools) : 0;

  // Last-resort compaction against the concrete input budget (not the 70% threshold).
  // Covers cases where the proactive pass was skipped or still left the request oversized (#8560).
  if (
    reactiveContextCompactionEnabled &&
    !nativeCodexPassthrough &&
    finalEstimatedInputTokens >= finalContextLimit &&
    body
  ) {
    const lastResortTarget = Math.max(1, finalContextLimit - toolsReserve - 1);
    const lastResortAdapter = adaptBodyForCompression(body as Record<string, unknown>);
    const lastResortResult = compressContext(lastResortAdapter.body, {
      provider,
      model: effectiveModel,
      maxTokens: lastResortTarget,
      reserveTokens: 0,
    });
    if (lastResortResult.compressed && lastResortResult.body) {
      body = lastResortAdapter.adapted
        ? lastResortAdapter.restore(lastResortResult.body as Record<string, unknown>, {
            dropMissingMappedItems: true,
          })
        : lastResortResult.body;
      finalEstimatedInputTokens = estimateFinalInputTokens(body as Record<string, unknown>);
      log?.info?.(
        "CONTEXT",
        `Last-resort context compaction: ${lastResortResult.stats?.original} → ${lastResortResult.stats?.final} tokens ` +
          `(re-estimated input ${finalEstimatedInputTokens}, limit ${finalContextLimit})`
      );
    }
  }

  const modelOutputCap = toPositiveInteger(
    getExplicitModelOutputCap({ provider, model: effectiveModel })
  );
  const contextWindowChecksDisabled = areContextWindowChecksDisabled();
  const outputBudget = enforceOutputTokenBudget(
    body as Record<string, unknown>,
    finalEstimatedInputTokens,
    contextWindowChecksDisabled ? Number.MAX_SAFE_INTEGER : finalContextLimit,
    targetFormat === FORMATS.CLAUDE && sourceFormat !== FORMATS.CLAUDE ? DEFAULT_MAX_TOKENS : 0,
    modelOutputCap,
    contextWindowChecksDisabled
      ? null
      : toPositiveInteger(
          resolveInputTokenCapForGate({ provider, model: effectiveModel }, { isCombo })
        )
  );
  if (outputBudget.ok === false) {
    const exceededInputCap = outputBudget.maxInputTokens !== undefined;
    const message =
      `Input exceeds ${exceededInputCap ? "maximum input tokens" : "context window"} for ${provider}/${effectiveModel}: ` +
      `estimated ${outputBudget.estimatedInputTokens} input tokens, ${exceededInputCap ? `max input ${outputBudget.maxInputTokens}` : `limit ${outputBudget.contextLimit}`}. ` +
      `Reduce the prompt or route to a model with a larger ${exceededInputCap ? "input limit" : "context window"}.`;
    log?.warn?.("CONTEXT", message);
    trackPendingRequest(model, provider, connectionId, false);
    return {
      kind: "return" as const,
      value: createErrorResult(
        HTTP_STATUS.BAD_REQUEST,
        message,
        null,
        "context_length_exceeded",
        "invalid_request_error"
      ),
    };
  }
  if (outputBudget.adjustedFields.length > 0) {
    // A field can also be adjusted by *removal* (invalid/non-positive value), which
    // the cap did not cause — so state the ceiling in effect rather than claiming
    // the cap drove this particular adjustment.
    const modelCapIsBinding =
      modelOutputCap != null && modelOutputCap < outputBudget.availableOutputTokens;
    log?.info?.(
      "CONTEXT",
      `Adjusted invalid or oversized output token fields (${outputBudget.adjustedFields.join(", ")}); ` +
        `${outputBudget.availableOutputTokens} tokens remain for output` +
        (modelCapIsBinding
          ? ` (output ceiling in effect: ${modelOutputCap}, ${provider}/${effectiveModel}'s own cap)`
          : "")
    );
  }
  body = outputBudget.body;

  return {
    kind: "continue" as const,
    continue: {
      body,
      tokensCompressed,
      compressionAnalyticsWritePromise,
      injectionResult,
      memoryOwnerId,
      memorySettings,
      compressionResponseMeta,
      contextEditingEnabled,
      preCompressionBody,
      runPostTranslationCompression,
    },
  };
}

export type CacheCompressResult = Awaited<ReturnType<typeof runCacheAndCompress>>;
export type Continue2 = Extract<CacheCompressResult, { kind: "continue" }>["continue"];
