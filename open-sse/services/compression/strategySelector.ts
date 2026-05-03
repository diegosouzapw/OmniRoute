import type {
  CompressionConfig,
  CompressionMode,
  CompressionPipelineStep,
  CompressionResult,
  CompressionStats,
} from "./types.ts";
import { applyLiteCompression } from "./lite.ts";
import { cavemanCompress } from "./caveman.ts";
import { compressAggressive } from "./aggressive.ts";
import { ultraCompress } from "./ultra.ts";
import { createCompressionStats } from "./stats.ts";
import { registerBuiltinCompressionEngines } from "./engines/index.ts";
import { getCompressionEngine } from "./engines/registry.ts";
import { applyRtkCompression } from "./engines/rtk/index.ts";
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
  if (mode === "lite") {
    return applyLiteCompression(body, {
      ...options,
      preserveSystemPrompt: options?.config?.preserveSystemPrompt !== false,
    });
  }
  if (mode === "rtk") {
    return applyRtkCompression(body, {
      config: options?.config?.rtkConfig,
    });
  }
  if (mode === "stacked") {
    return applyStackedCompression(body, options?.config?.stackedPipeline, options);
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
    return cavemanCompress(body as Parameters<typeof cavemanCompress>[0], cavemanConfig);
  }
  if (mode === "aggressive") {
    const messages = (body.messages ?? []) as Array<{
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
    const compressedBody = { ...body, messages: result.messages };
    return {
      body: compressedBody,
      compressed: result.stats.savingsPercent > 0,
      stats: createCompressionStats(
        body,
        compressedBody,
        mode,
        ["aggressive"],
        result.stats.rulesApplied,
        result.stats.durationMs
      ),
    };
  }
  if (mode === "ultra") {
    const messages = (body.messages ?? []) as Array<{
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
    const compressedBody = { ...body, messages: result.messages };
    return {
      body: compressedBody,
      compressed: result.stats.savingsPercent > 0,
      stats: createCompressionStats(
        body,
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

function normalizePipelineStep(step: CompressionPipelineStep | string): CompressionPipelineStep {
  if (typeof step !== "string") return step;
  if (step === "standard") return { engine: "caveman" };
  if (step === "rtk") return { engine: "rtk" };
  if (step === "lite" || step === "aggressive" || step === "ultra") return { engine: step };
  return { engine: "caveman" };
}

export function applyStackedCompression(
  body: Record<string, unknown>,
  pipeline?: Array<CompressionPipelineStep | string>,
  options?: {
    model?: string;
    supportsVision?: boolean | null;
    config?: CompressionConfig;
    compressionComboId?: string | null;
  }
): CompressionResult {
  const steps =
    pipeline && pipeline.length > 0
      ? pipeline.map(normalizePipelineStep)
      : [
          { engine: "rtk" as const, intensity: "standard" as const },
          { engine: "caveman" as const, intensity: "full" as const },
        ];
  registerBuiltinCompressionEngines();

  let currentBody = body;
  let compressed = false;
  const techniques = new Set<string>();
  const rules = new Set<string>();
  const breakdown: NonNullable<CompressionStats["engineBreakdown"]> = [];
  const rtkRawOutputPointers: NonNullable<CompressionStats["rtkRawOutputPointers"]> = [];
  const validationWarnings = new Set<string>();
  const validationErrors = new Set<string>();
  let fallbackApplied = false;
  const start = performance.now();

  for (const step of steps) {
    const engine = getCompressionEngine(step.engine);
    if (!engine) continue;
    const result = engine.apply(currentBody, {
      ...options,
      compressionComboId: options?.compressionComboId ?? options?.config?.compressionComboId,
      stepConfig: {
        ...(step.config ?? {}),
        ...(step.intensity ? { intensity: step.intensity } : {}),
      },
    });
    if (result.stats) {
      result.stats.techniquesUsed.forEach((technique) => techniques.add(technique));
      result.stats.rulesApplied?.forEach((rule) => rules.add(rule));
      result.stats.rtkRawOutputPointers?.forEach((pointer) => {
        rtkRawOutputPointers.push(pointer);
      });
      result.stats.validationWarnings?.forEach((warning) => validationWarnings.add(warning));
      result.stats.validationErrors?.forEach((error) => validationErrors.add(error));
      fallbackApplied = fallbackApplied || result.stats.fallbackApplied === true;
      breakdown.push({
        engine: step.engine,
        originalTokens: result.stats.originalTokens,
        compressedTokens: result.stats.compressedTokens,
        savingsPercent: result.stats.savingsPercent,
        techniquesUsed: result.stats.techniquesUsed,
        ...(result.stats.rulesApplied ? { rulesApplied: result.stats.rulesApplied } : {}),
        ...(result.stats.durationMs !== undefined ? { durationMs: result.stats.durationMs } : {}),
      });
    }
    if (result.compressed) {
      currentBody = result.body;
      compressed = true;
    }
  }

  const stats = createCompressionStats(
    body,
    currentBody,
    "stacked",
    Array.from(techniques),
    rules.size > 0 ? Array.from(rules) : undefined,
    Math.round((performance.now() - start) * 100) / 100
  );
  stats.engine = "stacked";
  stats.compressionComboId =
    options?.compressionComboId ?? options?.config?.compressionComboId ?? null;
  stats.engineBreakdown = breakdown;
  if (validationWarnings.size > 0) {
    stats.validationWarnings = Array.from(validationWarnings);
  }
  if (validationErrors.size > 0) {
    stats.validationErrors = Array.from(validationErrors);
  }
  if (fallbackApplied) {
    stats.fallbackApplied = true;
  }
  if (rtkRawOutputPointers.length > 0) {
    const seenPointers = new Set<string>();
    stats.rtkRawOutputPointers = rtkRawOutputPointers.filter((pointer) => {
      if (seenPointers.has(pointer.id)) return false;
      seenPointers.add(pointer.id);
      return true;
    });
  }

  return {
    body: currentBody,
    compressed,
    stats,
  };
}
