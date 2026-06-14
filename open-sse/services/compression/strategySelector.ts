import type {
  CompressionConfig,
  CompressionMode,
  CompressionPipelineStep,
  CompressionResult,
  CompressionStats,
} from "./types.ts";
import type { CompressionEngineApplyOptions } from "./engines/types.ts";
import { applyLiteCompression } from "./lite.ts";
import { cavemanCompress } from "./caveman.ts";
import { compressAggressive } from "./aggressive.ts";
import { ultraCompress } from "./ultra.ts";
import { createCompressionStats } from "./stats.ts";
import { registerBuiltinCompressionEngines } from "./engines/index.ts";
import { getCompressionEngine } from "./engines/registry.ts";
import { applyRtkCompression } from "./engines/rtk/index.ts";
import { adaptBodyForCompression } from "./bodyAdapter.ts";
import {
  detectCachingContext,
  getCacheAwareStrategy,
  type CachingDetectionContext,
} from "./cachingAware.ts";

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

export function getEffectiveMode(
  config: CompressionConfig,
  comboId: string | null,
  estimatedTokens: number
): CompressionMode {
  if (!config.enabled) return "off";

  const comboMode = checkComboOverride(config, comboId);
  if (comboMode) return comboMode;

  if (shouldAutoTrigger(config, estimatedTokens)) return config.autoTriggerMode ?? "lite";

  return config.defaultMode;
}

export function selectCompressionStrategy(
  config: CompressionConfig,
  comboId: string | null,
  estimatedTokens: number,
  body?: Record<string, unknown>,
  context?: CachingDetectionContext
): CompressionMode {
  const selectedMode = getEffectiveMode(config, comboId, estimatedTokens);

  // Apply caching-aware adjustments if body is provided
  if (body) {
    const ctx = detectCachingContext(body, context);
    const cacheAware = getCacheAwareStrategy(selectedMode, ctx);
    return cacheAware.strategy as CompressionMode;
  }

  return selectedMode;
}

export function applyCompression(
  body: Record<string, unknown>,
  mode: CompressionMode,
  options?: { model?: string; supportsVision?: boolean | null; config?: CompressionConfig }
): CompressionResult {
  if (mode === "off") {
    return { body, compressed: false, stats: null };
  }
  if (mode === "rtk") {
    return applyRtkCompression(body, {
      config: options?.config?.rtkConfig,
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
    const result = ultraCompress(messages, ultraConfig);
    const compressedBody = { ...compressionBody, messages: result.messages };
    return {
      body: adapter.restore(compressedBody),
      compressed: result.stats.savingsPercent > 0,
      stats: createCompressionStats(
        compressionBody,
        compressedBody,
        mode,
        ["ultra"],
        result.stats.rulesApplied,
        result.stats.durationMs
      ),
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
  options?: { model?: string; supportsVision?: boolean | null; config?: CompressionConfig }
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
  return applyCompression(body, mode, options);
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

interface StackOptions {
  model?: string;
  supportsVision?: boolean | null;
  config?: CompressionConfig;
  compressionComboId?: string | null;
  /** TV1 bail-out discipline (opt-in, default disabled). */
  bailout?: BailoutConfig;
}

/** Accumulates per-step telemetry across a stacked run (shared sync/async). */
interface StackAccumulator {
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
  const minGain = bailout.minGainPercent ?? 10;
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
  const steps = resolveStackSteps(pipeline);
  registerBuiltinCompressionEngines();

  let currentBody = body;
  let compressed = false;
  const acc = createStackAccumulator();
  const start = performance.now();

  const bailout = options?.bailout;

  for (const step of steps) {
    const engine = getCompressionEngine(step.engine);
    if (!engine) continue;

    // TV1: when bail-out is ENABLED, wrap apply() and apply skip rules.
    // When DISABLED (default), the code path below is identical to pre-TV1.
    if (bailout?.enabled) {
      let result: CompressionResult;
      try {
        result = engine.apply(currentBody, buildStepOptions(step, options));
      } catch {
        // Failure bail-out: treat as no-op (verbatim kept for this step).
        continue;
      }
      mergeStackStep(acc, step.engine, result);
      if (decideStep(result, bailout).advance) {
        currentBody = result.body;
        compressed = true;
      }
    } else {
      const result = engine.apply(currentBody, buildStepOptions(step, options));
      mergeStackStep(acc, step.engine, result);
      if (result.compressed) {
        currentBody = result.body;
        compressed = true;
      }
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
  const steps = resolveStackSteps(pipeline);
  registerBuiltinCompressionEngines();

  let currentBody = body;
  let compressed = false;
  const acc = createStackAccumulator();
  const start = performance.now();

  const bailout = options?.bailout;

  for (const step of steps) {
    const engine = getCompressionEngine(step.engine);
    if (!engine) continue;
    const stepOptions = buildStepOptions(step, options);

    // TV1: same bail-out discipline as the sync loop (opt-in, default off).
    if (bailout?.enabled) {
      let result: CompressionResult;
      try {
        result = engine.applyAsync
          ? await engine.applyAsync(currentBody, stepOptions)
          : engine.apply(currentBody, stepOptions);
      } catch {
        // Failure bail-out: verbatim kept, continue to next engine.
        continue;
      }
      mergeStackStep(acc, step.engine, result);
      if (decideStep(result, bailout).advance) {
        currentBody = result.body;
        compressed = true;
      }
    } else {
      const result = engine.applyAsync
        ? await engine.applyAsync(currentBody, stepOptions)
        : engine.apply(currentBody, stepOptions);
      mergeStackStep(acc, step.engine, result);
      if (result.compressed) {
        currentBody = result.body;
        compressed = true;
      }
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
