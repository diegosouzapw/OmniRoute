import type {
  CompressionConfig,
  CompressionMode,
  CompressionPipelineStep,
  CompressionResult,
  CompressionStats,
} from "./types.ts";
import { type FidelityGateConfig } from "./fidelityGate.ts";
import { gateAdvance } from "./fidelityGateStep.ts";
import type { CompressionEngineApplyOptions } from "./engines/types.ts";
import { applyLiteCompression } from "./lite.ts";
import { cavemanCompress } from "./caveman.ts";
import { compressAggressive } from "./aggressive.ts";
import { ultraCompress, ultraCompressHeuristic } from "./ultra.ts";
import { createCompressionStats } from "./stats.ts";
import { registerBuiltinCompressionEngines } from "./engines/index.ts";
import { getCompressionEngine, getEngineEntry } from "./engines/registry.ts";
import { applyRtkCompression } from "./engines/rtk/index.ts";
import { adaptBodyForCompression } from "./bodyAdapter.ts";
import {
  detectCachingContext,
  getCacheAwareStrategy,
  type CachingDetectionContext,
} from "./cachingAware.ts";
import { resolveCompressionPlan } from "./resolveCompressionPlan.ts";
import { deriveDefaultPlan, type DerivedPlan } from "./deriveDefaultPlan.ts";
import {
  withSource,
  planFromHeader,
  formatCompressionMeta,
  deriveDefaultPlanFromConfig,
  buildNamedComboLookup,
} from "./planResolution.ts";
import { resolveAdaptivePlan } from "./adaptiveCompression/resolveAdaptivePlan.ts";
import type { AdaptiveTelemetry } from "./adaptiveCompression/types.ts";
import type { RiskGateConfig } from "./riskGate/riskGate.ts";
import {
  resolveRiskGate,
  withRiskGate,
  withRiskGateAsync,
} from "./riskGate/strategyWrap.ts";

// Re-export so existing importers (resolver test + chatCore dynamic import) keep resolving.
export { planFromHeader, formatCompressionMeta, buildNamedComboLookup };

/** Named-combo map: combo id → its stacked pipeline (operator-defined profiles). */
type NamedCombos = Record<string, CompressionPipelineStep[]>;

export function checkComboOverride(
  config: CompressionConfig,
  comboId: string | null
): CompressionMode | null {
  if (!comboId || !config.comboOverrides) return null;
  return config.comboOverrides[comboId] ?? null;
}

export function shouldAutoTrigger(config: CompressionConfig, estimatedTokens: number): boolean {
  return config.autoTriggerTokens > 0 && estimatedTokens >= config.autoTriggerTokens;
}

/**
 * Resolves the effective compression plan (mode + derived stacked pipeline) WITHOUT
 * the caching-aware mode adjustment (that is layered on by {@link selectCompressionPlan}).
 *
 * Precedence — preserved from the historical {@link getEffectiveMode} ordering:
 *   1. master off                     → off
 *   2. routing-combo override (comboId)→ that mode (resolver honors it via ctx.comboId)
 *   3. active named profile (Phase 2)  → that combo's stacked pipeline (manual operator choice)
 *   4. auto-trigger (large prompt)     → autoTriggerMode, BEFORE the plain derived default
 *   5. derived default                 → resolveCompressionPlan (engines map → mode/pipeline)
 *
 * Step 3 is an EXPLICIT operator selection (`config.activeComboId` resolved against the
 * `combos` map): it beats auto-trigger (a manual choice outranks automatic escalation) but
 * stays below a routing-combo override (route-scoped is more specific). Step 4 mirrors the
 * historical behaviour: auto-trigger precedes the plain derived default but never a routing
 * override.
 *
 * `combos` defaults to `{}` so Phase-1 callers are unchanged; when supplied, chatCore passes
 * its DB-loaded named-combo map so the active profile can resolve here purely (no DB import).
 */
/** True when the adaptive resolver owns automatic-by-size escalation (D-C4). */
function adaptiveEnabled(config: CompressionConfig): boolean {
  const mode = config.contextBudget?.mode;
  return mode === "floor" || mode === "replace-autotrigger";
}

function resolveBasePlan(
  config: CompressionConfig,
  comboId: string | null,
  estimatedTokens: number,
  combos: NamedCombos = {},
  header: string | null = null
): DerivedPlan {
  if (!config.enabled) return withSource({ mode: "off", stackedPipeline: [] }, "off");

  // Phase 3: an explicit, recognized header wins over every operator layer (Decision B).
  // The master switch above is the hard kill: a header cannot turn compression on.
  if (header) {
    const fromHeader = planFromHeader(config, header, combos);
    if (fromHeader) return fromHeader; // already tagged "request-header"
  }

  const comboMode = checkComboOverride(config, comboId);
  if (comboMode) {
    // A routing-combo "stacked" override still wants the configured stacked pipeline,
    // so route it through the resolver (which reads config.stackedPipeline for stacked).
    return withSource(resolveCompressionPlan(config, { comboId, combos }), "routing-override");
  }

  // Active profile: an EXPLICIT operator choice. Resolves regardless of enginesExplicit and
  // above auto-trigger (manual choice beats automatic escalation), but below a routing-combo
  // override (route-scoped is more specific).
  if (config.activeComboId && combos[config.activeComboId]) {
    return withSource(
      { mode: "stacked", stackedPipeline: combos[config.activeComboId] },
      "active-profile"
    );
  }

  if (!adaptiveEnabled(config) && shouldAutoTrigger(config, estimatedTokens)) {
    const mode = config.autoTriggerMode ?? "lite";
    return withSource(
      mode === "stacked"
        ? { mode, stackedPipeline: config.stackedPipeline ?? [] }
        : { mode, stackedPipeline: [] },
      "auto-trigger"
    );
  }

  const plan = deriveDefaultPlanFromConfig(config, comboId, combos);
  return withSource(plan, plan.mode === "off" ? "off" : "default");
}

/**
 * True when the EXPLICITLY-configured engines map (panel-saved) derives a multi-engine
 * stacked pipeline. chatCore uses this to know the panel's derived pipeline is authoritative
 * and the legacy default-combo fallback must NOT override it. Returns false for legacy
 * (non-explicit) installs so their historical default-combo path is preserved untouched.
 */
export function enginesMapDerivesStackedPipeline(config: CompressionConfig): boolean {
  if (!config.enginesExplicit) return false;
  const plan = deriveDefaultPlan(config.engines ?? {}, config.enabled !== false);
  return plan.mode === "stacked" && plan.stackedPipeline.length > 0;
}

/**
 * True when the config has an active named-combo selection that exists in the supplied combos
 * map. chatCore uses this to keep the legacy default-combo fallback from shadowing the
 * operator's active profile.
 */
export function activeComboResolves(config: CompressionConfig, combos: NamedCombos = {}): boolean {
  return Boolean(config.activeComboId && combos[config.activeComboId]);
}

export function getEffectiveMode(
  config: CompressionConfig,
  comboId: string | null,
  estimatedTokens: number,
  combos: NamedCombos = {},
  header: string | null = null
): CompressionMode {
  return resolveBasePlan(config, comboId, estimatedTokens, combos, header).mode as CompressionMode;
}

/**
 * Like {@link selectCompressionStrategy} but returns the full derived plan
 * (effective `mode` + `stackedPipeline`). When the resolver derives a `stacked`
 * plan from the per-engine toggle map, the pipeline is exposed here so the caller
 * can feed it to {@link applyCompressionAsync} (which reads config.stackedPipeline).
 * The caching-aware mode adjustment is applied to `mode` exactly as in
 * {@link selectCompressionStrategy}.
 */
/** Adaptive (Sub-project C) inputs + telemetry sink for selectCompressionPlan. */
export interface AdaptiveSelectOptions {
  modelContextLimit?: number | null;
  requestMaxTokens?: number | null;
  onAdaptive?: (telemetry: AdaptiveTelemetry) => void;
}

export function selectCompressionPlan(
  config: CompressionConfig,
  comboId: string | null,
  estimatedTokens: number,
  body?: Record<string, unknown>,
  context?: CachingDetectionContext,
  combos: NamedCombos = {},
  header: string | null = null,
  adaptiveOptions?: AdaptiveSelectOptions
): DerivedPlan {
  let plan = resolveBasePlan(config, comboId, estimatedTokens, combos, header);

  // Adaptive context-budget floor/escalation (D-C4): after the base plan, replacing the
  // (now-bypassed) auto-trigger branch. Pure resolver; chatCore supplies the model limit.
  if (adaptiveEnabled(config) && config.contextBudget) {
    const { plan: adaptivePlan, telemetry } = resolveAdaptivePlan({
      basePlan: plan,
      estimatedTokens,
      modelContextLimit: adaptiveOptions?.modelContextLimit ?? null,
      requestMaxTokens: adaptiveOptions?.requestMaxTokens ?? null,
      config: config.contextBudget,
    });
    plan = adaptivePlan;
    if (telemetry && adaptiveOptions?.onAdaptive) adaptiveOptions.onAdaptive(telemetry);
  }

  // Apply caching-aware adjustments to the mode if body is provided
  if (body) {
    const ctx = detectCachingContext(body, context);
    const cacheAware = getCacheAwareStrategy(plan.mode as CompressionMode, ctx);
    return { ...plan, mode: cacheAware.strategy as CompressionMode }; // ...plan preserves source
  }

  return plan;
}

export function selectCompressionStrategy(
  config: CompressionConfig,
  comboId: string | null,
  estimatedTokens: number,
  body?: Record<string, unknown>,
  context?: CachingDetectionContext,
  combos: NamedCombos = {},
  header: string | null = null
): CompressionMode {
  return selectCompressionPlan(config, comboId, estimatedTokens, body, context, combos, header)
    .mode as CompressionMode;
}

/**
 * #3890: honor the cache-aware `skipSystemPrompt` decision that `getCacheAwareStrategy`
 * already computes but that `selectCompressionStrategy` (which can only return a mode
 * string) previously discarded. In a caching context the system prompt is part of the
 * cacheable prefix, so compressing it breaks the upstream prompt cache. This forces
 * `preserveSystemPrompt` on for caching requests even when the operator turned it off,
 * and leaves non-caching requests untouched.
 */
export function resolveCacheAwareConfig(
  config: CompressionConfig,
  body?: Record<string, unknown>,
  context?: CachingDetectionContext
): CompressionConfig {
  if (!body) return config;
  const ctx = detectCachingContext(body, context);
  // Only `skipSystemPrompt` is consumed here, and it depends solely on `ctx.isCachingProvider`
  // (NOT on the strategy arg — see getCacheAwareStrategy), so the stored `defaultMode` is a safe
  // input even though it may be "off" for a panel-configured install. If getCacheAwareStrategy is
  // ever extended to key `skipSystemPrompt` on the mode, pass the resolved effective mode instead.
  const cacheAware = getCacheAwareStrategy(config.defaultMode, ctx);
  if (cacheAware.skipSystemPrompt && config.preserveSystemPrompt === false) {
    return { ...config, preserveSystemPrompt: true };
  }
  return config;
}

export function applyCompression(
  body: Record<string, unknown>,
  mode: CompressionMode,
  options?: {
    model?: string;
    supportsVision?: boolean | null;
    config?: CompressionConfig;
    principalId?: string;
    /**
     * Opt into the TV1 stacked bail-out (skip-on-throw + min-gain). Default off keeps the
     * legacy behavior. The combo proactive-fallback path enables it so a throwing engine is
     * skipped instead of silently dropping the target. Flows through to applyStackedCompression.
     */
    bailout?: BailoutConfig;
    /** Risk-gate mask/restore wrapper (opt-in, default off). Read via resolveRiskGate. */
    riskGate?: RiskGateConfig;
  }
): CompressionResult {
  return withRiskGate(body, resolveRiskGate(options), (b) => runCompression(b, mode, options));
}

function runCompression(
  body: Record<string, unknown>,
  mode: CompressionMode,
  options?: {
    model?: string;
    supportsVision?: boolean | null;
    config?: CompressionConfig;
    principalId?: string;
    bailout?: BailoutConfig;
    riskGate?: RiskGateConfig;
  }
): CompressionResult {
  if (mode === "off") {
    return { body, compressed: false, stats: null };
  }
  if (mode === "rtk") {
    return applyRtkCompression(body, {
      // Selecting the "rtk" mode IS the enable signal — run it even if the per-engine
      // rtkConfig.enabled flag is off (that flag gates stacked steps). (B-MODE-ENGINE-DECOUPLE)
      config: { ...(options?.config?.rtkConfig ?? {}), enabled: true },
    });
  }
  const adapter = adaptBodyForCompression(body);
  const compressionBody = adapter.body;
  if (mode === "lite") {
    const result = applyLiteCompression(compressionBody, {
      ...options,
      preserveSystemPrompt: options?.config?.preserveSystemPrompt !== false,
    });
    return adapter.adapted ? { ...result, body: adapter.restore(result.body) } : result;
  }
  if (mode === "stacked") {
    const result = applyStackedCompression(
      compressionBody,
      options?.config?.stackedPipeline,
      options
    );
    return adapter.adapted ? { ...result, body: adapter.restore(result.body) } : result;
  }
  if (mode === "standard") {
    const cavemanConfig = {
      ...(options?.config?.cavemanConfig ?? {}),
      ...(options?.config?.languageConfig?.enabled
        ? {
            language: options.config.languageConfig.defaultLanguage,
            autoDetectLanguage: options.config.languageConfig.autoDetect,
            enabledLanguagePacks: options.config.languageConfig.enabledPacks,
          }
        : {}),
      ...(options?.config?.preserveSystemPrompt !== false
        ? {
            compressRoles: (options?.config?.cavemanConfig?.compressRoles ?? ["user"]).filter(
              (role) => role !== "system"
            ),
          }
        : {}),
      // Selecting the "standard" mode runs caveman regardless of the per-engine
      // cavemanConfig.enabled flag (that flag gates stacked steps). (B-MODE-ENGINE-DECOUPLE)
      enabled: true,
    };
    const result = cavemanCompress(
      compressionBody as Parameters<typeof cavemanCompress>[0],
      cavemanConfig
    );
    return adapter.adapted ? { ...result, body: adapter.restore(result.body) } : result;
  }
  if (mode === "aggressive") {
    const messages = (compressionBody.messages ?? []) as Array<{
      role: string;
      content?: string | Array<{ type: string; text?: string }>;
      [key: string]: unknown;
    }>;
    if (!Array.isArray(messages) || messages.length === 0) {
      return { body, compressed: false, stats: null };
    }
    const aggressiveConfig = {
      ...(options?.config?.aggressive ?? {}),
      preserveSystemPrompt: options?.config?.preserveSystemPrompt !== false,
    };
    const result = compressAggressive(messages, aggressiveConfig);
    const compressedBody = { ...compressionBody, messages: result.messages };
    return {
      body: adapter.restore(compressedBody),
      compressed: result.stats.savingsPercent > 0,
      stats: createCompressionStats(
        compressionBody,
        compressedBody,
        mode,
        ["aggressive"],
        result.stats.rulesApplied,
        result.stats.durationMs
      ),
    };
  }
  if (mode === "ultra") {
    const messages = (compressionBody.messages ?? []) as Array<{
      role: string;
      content?: string | unknown[];
      [key: string]: unknown;
    }>;
    if (!Array.isArray(messages) || messages.length === 0) {
      return { body, compressed: false, stats: null };
    }
    const ultraConfig = {
      ...(options?.config?.ultra ?? {}),
      preserveSystemPrompt: options?.config?.preserveSystemPrompt !== false,
    };
    const result = ultraCompressHeuristic(messages, ultraConfig);
    const compressedBody = { ...compressionBody, messages: result.messages };
    return {
      body: adapter.restore(compressedBody),
      compressed: result.stats.savingsPercent > 0,
      stats: {
        ...createCompressionStats(
          compressionBody,
          compressedBody,
          mode,
          ["ultra"],
          result.stats.rulesApplied,
          result.stats.durationMs
        ),
        ultraTier: result.stats.ultraTier,
      },
    };
  }
  return { body, compressed: false, stats: null };
}

/**
 * Async entry point mirroring {@link applyCompression}. Only the stacked mode
 * can host async engines, so it routes through {@link applyStackedCompressionAsync};
 * every other mode delegates to the synchronous path unchanged. Call sites that
 * already run in an async context (e.g. chatCore) await this so a future
 * worker-thread engine can await without changing the surrounding code.
 */
export async function applyCompressionAsync(
  body: Record<string, unknown>,
  mode: CompressionMode,
  options?: {
    model?: string;
    supportsVision?: boolean | null;
    config?: CompressionConfig;
    principalId?: string;
    onEngineStep?: (step: StackedCompressionStep) => void;
  }
): Promise<CompressionResult> {
  if (mode === "stacked") {
    const adapter = adaptBodyForCompression(body);
    const result = await applyStackedCompressionAsync(
      adapter.body,
      options?.config?.stackedPipeline,
      options
    );
    return adapter.adapted ? { ...result, body: adapter.restore(result.body) } : result;
  }
  // Ultra's optional SLM (model) tier is async — route it here when a model is configured.
  if (mode === "ultra") {
    return applyUltraAsync(body, options);
  }
  return applyCompression(body, mode, options);
}

/**
 * Ultra mode with the optional local SLM (model) tier.
 *
 * When `config.ultra.modelPath` is set, the prose is routed through the llmlingua engine
 * (the real local-model compressor). The llmlingua backend fail-opens when the model is
 * absent (e.g. the ONNX model is not provisioned), so this degrades gracefully:
 *  - model present and it compresses  → return the SLM result (tagged "ultra-slm");
 *  - model absent / no gain / failure → fall back to `aggressive` when
 *    `slmFallbackToAggressive` is set, otherwise the heuristic ultra (`pruneByScore`).
 *
 * Without `modelPath` the behavior is byte-identical to the synchronous heuristic ultra.
 */
async function applyUltraAsync(
  body: Record<string, unknown>,
  options?: {
    model?: string;
    supportsVision?: boolean | null;
    config?: CompressionConfig;
    principalId?: string;
    onEngineStep?: (step: StackedCompressionStep) => void;
  }
): Promise<CompressionResult> {
  const ultraConfig = options?.config?.ultra;
  const modelPath = typeof ultraConfig?.modelPath === "string" ? ultraConfig.modelPath.trim() : "";

  // No explicit modelPath → run the two-tier ultra resolver (heuristic, or SLM when
  // config.ultraEngine === "slm" and the worker backend is available). This is the
  // Phase-4 (B) path; it fail-opens to the heuristic and records the resolved tier.
  if (!modelPath) {
    const adapter = adaptBodyForCompression(body);
    const messages = (adapter.body.messages ?? []) as Array<{
      role: string;
      content?: string | unknown[];
      [key: string]: unknown;
    }>;
    if (!Array.isArray(messages) || messages.length === 0) {
      return { body, compressed: false, stats: null };
    }
    const ultraConfig = {
      ...(options?.config?.ultra ?? {}),
      preserveSystemPrompt: options?.config?.preserveSystemPrompt !== false,
      ultraEngine: options?.config?.ultraEngine,
    };
    const result = await ultraCompress(messages, ultraConfig);
    const compressedBody = { ...adapter.body, messages: result.messages };
    return {
      body: adapter.restore(compressedBody),
      compressed: result.stats.savingsPercent > 0,
      stats: {
        ...createCompressionStats(
          adapter.body,
          compressedBody,
          "ultra",
          result.stats.techniquesUsed,
          result.stats.rulesApplied,
          result.stats.durationMs
        ),
        ultraTier: result.stats.ultraTier,
      },
    };
  }

  registerBuiltinCompressionEngines();
  const slmEngine = getCompressionEngine("llmlingua");
  if (slmEngine?.applyAsync) {
    const engineOptions: CompressionEngineApplyOptions = {
      model: options?.model,
      supportsVision: options?.supportsVision,
      config: options?.config,
      principalId: options?.principalId,
      stepConfig: {
        modelPath,
        ...(typeof ultraConfig?.compressionRate === "number"
          ? { compressionRate: ultraConfig.compressionRate }
          : {}),
      },
    };
    try {
      const slm = await slmEngine.applyAsync(body, engineOptions);
      if (slm.compressed && slm.stats) {
        // Attribute the result to ultra (the selected mode) while marking the SLM tier.
        return {
          ...slm,
          stats: {
            ...slm.stats,
            mode: "ultra",
            techniquesUsed: Array.from(new Set([...(slm.stats.techniquesUsed ?? []), "ultra-slm"])),
          },
        };
      }
    } catch {
      // llmlingua fail-opens internally, but guard anyway and use the configured fallback.
    }
  }

  // SLM tier unavailable or produced no gain → fall back per slmFallbackToAggressive.
  return applyCompression(
    body,
    ultraConfig?.slmFallbackToAggressive ? "aggressive" : "ultra",
    options
  );
}

function normalizePipelineStep(step: CompressionPipelineStep | string): CompressionPipelineStep {
  if (typeof step !== "string") return step;
  if (step === "standard") return { engine: "caveman" };
  if (step === "rtk") return { engine: "rtk" };
  if (step === "lite" || step === "aggressive" || step === "ultra") return { engine: step };
  return { engine: "caveman" };
}

/**
 * TV1 — Opt-in bail-out configuration for the stacked pipeline.
 * When enabled: a step that throws is silently skipped (verbatim kept);
 * a step whose gain is below minGainPercent is also skipped.
 * DEFAULT = disabled — behaviour is byte-identical to pre-TV1 when absent.
 */
interface BailoutConfig {
  enabled: boolean;
  /** Minimum savings percent required to advance currentBody. Default: 10. */
  minGainPercent?: number;
}

/** Per-engine progress emitted mid-pipeline by the stacked loops (F3.3 live streaming). */
export interface StackedCompressionStep {
  stepIndex: number;
  totalSteps: number;
  engine: string;
  state: "done" | "skipped";
  originalTokens: number;
  compressedTokens: number;
  savingsPercent: number;
  durationMs?: number;
}

interface StackOptions {
  model?: string;
  supportsVision?: boolean | null;
  config?: CompressionConfig;
  compressionComboId?: string | null;
  /** TV1 bail-out discipline (opt-in, default disabled). */
  bailout?: BailoutConfig;
  /** Opt-in per-step fidelity gate (default disabled). */
  fidelityGate?: FidelityGateConfig;
  /** Risk-gate mask/restore wrapper (opt-in, default off). Read via resolveRiskGate. */
  riskGate?: RiskGateConfig;
  /** Authenticated principal id — threaded through to CCR engine for store scoping. */
  principalId?: string;
  /** F3.3: called once per engine as it completes (live per-engine streaming). */
  onEngineStep?: (step: StackedCompressionStep) => void;
}

/** Emit a per-engine step to the live streaming callback (best-effort, no-op when unset). */
function reportEngineStep(
  onStep: ((step: StackedCompressionStep) => void) | undefined,
  stepIndex: number,
  totalSteps: number,
  engine: string,
  result: CompressionResult
): void {
  if (!onStep) return;
  const s = result.stats;
  onStep({
    stepIndex,
    totalSteps,
    engine,
    state: result.compressed ? "done" : "skipped",
    originalTokens: s?.originalTokens ?? 0,
    compressedTokens: s?.compressedTokens ?? s?.originalTokens ?? 0,
    savingsPercent: s?.savingsPercent ?? 0,
    ...(s?.durationMs !== undefined ? { durationMs: s.durationMs } : {}),
  });
}

/** Accumulates per-step telemetry across a stacked run (shared sync/async). */
export interface StackAccumulator {
  techniques: Set<string>;
  rules: Set<string>;
  breakdown: NonNullable<CompressionStats["engineBreakdown"]>;
  rtkRawOutputPointers: NonNullable<CompressionStats["rtkRawOutputPointers"]>;
  validationWarnings: Set<string>;
  validationErrors: Set<string>;
  fallbackApplied: boolean;
}

function createStackAccumulator(): StackAccumulator {
  return {
    techniques: new Set<string>(),
    rules: new Set<string>(),
    breakdown: [],
    rtkRawOutputPointers: [],
    validationWarnings: new Set<string>(),
    validationErrors: new Set<string>(),
    fallbackApplied: false,
  };
}

function resolveStackSteps(
  pipeline?: Array<CompressionPipelineStep | string>
): CompressionPipelineStep[] {
  return pipeline && pipeline.length > 0
    ? pipeline.map(normalizePipelineStep)
    : [
        { engine: "rtk", intensity: "standard" },
        { engine: "caveman", intensity: "full" },
      ];
}

function buildStepOptions(
  step: CompressionPipelineStep,
  options?: StackOptions
): CompressionEngineApplyOptions {
  return {
    ...options,
    compressionComboId: options?.compressionComboId ?? options?.config?.compressionComboId,
    principalId: options?.principalId,
    stepConfig: {
      ...(step.config ?? {}),
      ...(step.intensity ? { intensity: step.intensity } : {}),
    },
  };
}

/**
 * TV1 — Pure helper that decides whether a completed step should advance
 * `currentBody`. Called only when bailout is ENABLED; the sync/async loops
 * bypass this entirely on the default-off path (zero cost, zero behaviour change).
 *
 * Returns `{ advance: true }` when the step should be accepted, or
 * `{ advance: false }` when it should be skipped (verbatim kept).
 */
function decideStep(result: CompressionResult, bailout: BailoutConfig): { advance: boolean } {
  if (!result.compressed) return { advance: false };
  // Clamp: a negative minGainPercent would mean "always advance" (invalid state).
  const minGain = Math.max(0, bailout.minGainPercent ?? 10);
  const gain = result.stats?.savingsPercent ?? 0;
  if (gain < minGain) return { advance: false };
  return { advance: true };
}

/** Folds one engine result into the accumulator (telemetry + breakdown entry). */
function mergeStackStep(acc: StackAccumulator, engineId: string, result: CompressionResult): void {
  if (!result.stats) return;
  result.stats.techniquesUsed.forEach((technique) => acc.techniques.add(technique));
  result.stats.rulesApplied?.forEach((rule) => acc.rules.add(rule));
  result.stats.rtkRawOutputPointers?.forEach((pointer) => acc.rtkRawOutputPointers.push(pointer));
  result.stats.validationWarnings?.forEach((warning) => acc.validationWarnings.add(warning));
  result.stats.validationErrors?.forEach((error) => acc.validationErrors.add(error));
  acc.fallbackApplied = acc.fallbackApplied || result.stats.fallbackApplied === true;
  acc.breakdown.push({
    engine: engineId,
    originalTokens: result.stats.originalTokens,
    compressedTokens: result.stats.compressedTokens,
    savingsPercent: result.stats.savingsPercent,
    techniquesUsed: result.stats.techniquesUsed,
    ...(result.stats.rulesApplied ? { rulesApplied: result.stats.rulesApplied } : {}),
    ...(result.stats.durationMs !== undefined ? { durationMs: result.stats.durationMs } : {}),
  });
}

function finalizeStackedResult(
  originalBody: Record<string, unknown>,
  currentBody: Record<string, unknown>,
  compressed: boolean,
  acc: StackAccumulator,
  start: number,
  compressionComboId: string | null | undefined
): CompressionResult {
  const stats = createCompressionStats(
    originalBody,
    currentBody,
    "stacked",
    Array.from(acc.techniques),
    acc.rules.size > 0 ? Array.from(acc.rules) : undefined,
    Math.round((performance.now() - start) * 100) / 100
  );
  stats.engine = "stacked";
  stats.compressionComboId = compressionComboId ?? null;
  stats.engineBreakdown = acc.breakdown;
  if (acc.validationWarnings.size > 0) {
    stats.validationWarnings = Array.from(acc.validationWarnings);
  }
  if (acc.validationErrors.size > 0) {
    stats.validationErrors = Array.from(acc.validationErrors);
  }
  if (acc.fallbackApplied) {
    stats.fallbackApplied = true;
  }
  if (acc.rtkRawOutputPointers.length > 0) {
    const seenPointers = new Set<string>();
    stats.rtkRawOutputPointers = acc.rtkRawOutputPointers.filter((pointer) => {
      if (seenPointers.has(pointer.id)) return false;
      seenPointers.add(pointer.id);
      return true;
    });
  }
  return { body: currentBody, compressed, stats };
}

export function applyStackedCompression(
  body: Record<string, unknown>,
  pipeline?: Array<CompressionPipelineStep | string>,
  options?: StackOptions
): CompressionResult {
  return withRiskGate(body, resolveRiskGate(options), (b) =>
    runStackedCompression(b, pipeline, options)
  );
}

function runStackedCompression(
  body: Record<string, unknown>,
  pipeline?: Array<CompressionPipelineStep | string>,
  options?: StackOptions
): CompressionResult {
  const steps = resolveStackSteps(pipeline);
  registerBuiltinCompressionEngines();

  let currentBody = body;
  let compressed = false;
  const acc = createStackAccumulator();
  const start = performance.now();

  const bailout = options?.bailout;
  const fidelityGate = options?.fidelityGate ?? options?.config?.fidelityGate;
  const onStep = options?.onEngineStep;
  const totalSteps = steps.length;
  let stepIdx = 0;

  for (const step of steps) {
    const engine = getCompressionEngine(step.engine);
    if (!engine) continue;
    // Respect the registry enabled flag: a step naming a disabled engine is skipped, so an
    // operator can turn an engine off (setEngineEnabled) without editing every pipeline.
    if (getEngineEntry(step.engine)?.enabled === false) continue;

    // TV1: when bail-out is ENABLED, wrap apply() and apply skip rules.
    // When DISABLED (default), the code path below is identical to pre-TV1.
    if (bailout?.enabled) {
      let result: CompressionResult;
      try {
        result = engine.apply(currentBody, buildStepOptions(step, options));
      } catch (err) {
        // Failure bail-out: keep the verbatim body for this step, but RECORD the
        // failure so a crashing engine is visible in telemetry (not silently gone).
        acc.validationErrors.add(
          `${step.engine}: bailed out — ${err instanceof Error ? err.message : String(err)}`
        );
        acc.fallbackApplied = true;
        continue;
      }
      mergeStackStep(acc, step.engine, result);
      if (decideStep(result, bailout).advance && gateAdvance(result, currentBody, fidelityGate, acc, step.engine)) {
        currentBody = result.body;
        compressed = true;
      }
    } else {
      const result = engine.apply(currentBody, buildStepOptions(step, options));
      mergeStackStep(acc, step.engine, result);
      if (result.compressed && gateAdvance(result, currentBody, fidelityGate, acc, step.engine)) {
        currentBody = result.body;
        compressed = true;
      }
      reportEngineStep(onStep, stepIdx++, totalSteps, step.engine, result);
    }
  }

  return finalizeStackedResult(
    body,
    currentBody,
    compressed,
    acc,
    start,
    options?.compressionComboId ?? options?.config?.compressionComboId
  );
}

/**
 * Async sibling of {@link applyStackedCompression} (H10). Awaits engines that
 * expose `applyAsync` (e.g. worker-thread models) and runs synchronous engines
 * inline. Behaviour is otherwise identical: same step order, same accumulated
 * telemetry, same final stats — so sync-only pipelines yield the same result.
 */
export async function applyStackedCompressionAsync(
  body: Record<string, unknown>,
  pipeline?: Array<CompressionPipelineStep | string>,
  options?: StackOptions
): Promise<CompressionResult> {
  return withRiskGateAsync(body, resolveRiskGate(options), (b) =>
    runStackedCompressionAsync(b, pipeline, options)
  );
}

async function runStackedCompressionAsync(
  body: Record<string, unknown>,
  pipeline?: Array<CompressionPipelineStep | string>,
  options?: StackOptions
): Promise<CompressionResult> {
  const steps = resolveStackSteps(pipeline);
  registerBuiltinCompressionEngines();

  let currentBody = body;
  let compressed = false;
  const acc = createStackAccumulator();
  const start = performance.now();

  const bailout = options?.bailout;
  const fidelityGate = options?.fidelityGate ?? options?.config?.fidelityGate;
  const onStep = options?.onEngineStep;
  const totalSteps = steps.length;
  let stepIdx = 0;

  for (const step of steps) {
    const engine = getCompressionEngine(step.engine);
    if (!engine) continue;
    // Respect the registry enabled flag (same as the sync loop) — keep both in lockstep.
    if (getEngineEntry(step.engine)?.enabled === false) continue;
    const stepOptions = buildStepOptions(step, options);

    // TV1: same bail-out discipline as the sync loop (opt-in, default off).
    if (bailout?.enabled) {
      let result: CompressionResult;
      try {
        result = engine.applyAsync
          ? await engine.applyAsync(currentBody, stepOptions)
          : engine.apply(currentBody, stepOptions);
      } catch (err) {
        // Failure bail-out: keep the verbatim body, but RECORD the failure so a
        // crashing engine is visible in telemetry (not silently gone).
        acc.validationErrors.add(
          `${step.engine}: bailed out — ${err instanceof Error ? err.message : String(err)}`
        );
        acc.fallbackApplied = true;
        continue;
      }
      mergeStackStep(acc, step.engine, result);
      if (decideStep(result, bailout).advance && gateAdvance(result, currentBody, fidelityGate, acc, step.engine)) {
        currentBody = result.body;
        compressed = true;
      }
    } else {
      const result = engine.applyAsync
        ? await engine.applyAsync(currentBody, stepOptions)
        : engine.apply(currentBody, stepOptions);
      mergeStackStep(acc, step.engine, result);
      if (result.compressed && gateAdvance(result, currentBody, fidelityGate, acc, step.engine)) {
        currentBody = result.body;
        compressed = true;
      }
      reportEngineStep(onStep, stepIdx++, totalSteps, step.engine, result);
    }
  }

  return finalizeStackedResult(
    body,
    currentBody,
    compressed,
    acc,
    start,
    options?.compressionComboId ?? options?.config?.compressionComboId
  );
}
