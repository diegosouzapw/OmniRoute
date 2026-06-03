import { z } from "zod";

export const compressionModeSchema = z.enum([
  "off",
  "lite",
  "standard",
  "aggressive",
  "ultra",
  "rtk",
  "stacked",
]);

export const cavemanIntensitySchema = z.enum(["lite", "full", "ultra"]);
export const rtkIntensitySchema = z.enum(["minimal", "standard", "aggressive"]);
export const rtkRawOutputRetentionSchema = z.enum(["never", "failures", "always"]);

export const cavemanConfigSchema = z
  .object({
    enabled: z.boolean().optional(),
    compressRoles: z.array(z.enum(["user", "assistant", "system"])).optional(),
    skipRules: z.array(z.string()).optional(),
    minMessageLength: z.number().int().min(0).optional(),
    preservePatterns: z.array(z.string()).optional(),
    intensity: cavemanIntensitySchema.optional(),
  })
  .strict();

export const cavemanOutputModeSchema = z
  .object({
    enabled: z.boolean().optional(),
    intensity: cavemanIntensitySchema.optional(),
    autoClarity: z.boolean().optional(),
  })
  .strict();

export const rtkConfigSchema = z
  .object({
    enabled: z.boolean().optional(),
    intensity: rtkIntensitySchema.optional(),
    applyToToolResults: z.boolean().optional(),
    applyToCodeBlocks: z.boolean().optional(),
    applyToAssistantMessages: z.boolean().optional(),
    enabledFilters: z.array(z.string()).optional(),
    disabledFilters: z.array(z.string()).optional(),
    maxLinesPerResult: z.number().int().min(0).max(100000).optional(),
    maxCharsPerResult: z.number().int().min(0).max(1000000).optional(),
    deduplicateThreshold: z.number().int().min(2).max(100).optional(),
    customFiltersEnabled: z.boolean().optional(),
    trustProjectFilters: z.boolean().optional(),
    rawOutputRetention: rtkRawOutputRetentionSchema.optional(),
    rawOutputMaxBytes: z.number().int().min(1024).max(10_000_000).optional(),
  })
  .strict();

export const languageConfigSchema = z
  .object({
    enabled: z.boolean().optional(),
    defaultLanguage: z.string().trim().min(1).optional(),
    autoDetect: z.boolean().optional(),
    enabledPacks: z.array(z.string().trim().min(1)).optional(),
  })
  .strict();

export const aggressiveConfigSchema = z
  .object({
    thresholds: z
      .object({
        fullSummary: z.number().int().min(1).max(100).optional(),
        moderate: z.number().int().min(1).max(100).optional(),
        light: z.number().int().min(1).max(100).optional(),
        verbatim: z.number().int().min(1).max(100).optional(),
      })
      .strict()
      .optional(),
    toolStrategies: z
      .object({
        fileContent: z.boolean().optional(),
        grepSearch: z.boolean().optional(),
        shellOutput: z.boolean().optional(),
        json: z.boolean().optional(),
        errorMessage: z.boolean().optional(),
      })
      .strict()
      .optional(),
    summarizerEnabled: z.boolean().optional(),
    maxTokensPerMessage: z.number().int().min(256).max(32768).optional(),
    minSavingsThreshold: z.number().min(0).max(1).optional(),
    preserveSystemPrompt: z.boolean().optional(),
  })
  .strict();

export const ultraConfigSchema = z
  .object({
    enabled: z.boolean().optional(),
    compressionRate: z.number().min(0).max(1).optional(),
    minScoreThreshold: z.number().min(0).max(1).optional(),
    slmFallbackToAggressive: z.boolean().optional(),
    modelPath: z.string().trim().min(1).optional(),
    maxTokensPerMessage: z.number().int().min(0).max(32768).optional(),
    preserveSystemPrompt: z.boolean().optional(),
  })
  .strict();

const noConfigSchema = z.object({}).strict();

export const stackedPipelineStepSchema = z.discriminatedUnion("engine", [
  z
    .object({
      engine: z.literal("lite"),
      intensity: z.literal("lite").optional(),
      config: noConfigSchema.optional(),
    })
    .strict(),
  z
    .object({
      engine: z.literal("caveman"),
      intensity: cavemanIntensitySchema.optional(),
      config: cavemanConfigSchema.optional(),
    })
    .strict(),
  z
    .object({
      engine: z.literal("aggressive"),
      intensity: z.literal("standard").optional(),
      config: aggressiveConfigSchema.optional(),
    })
    .strict(),
  z
    .object({
      engine: z.literal("ultra"),
      intensity: z.literal("ultra").optional(),
      config: ultraConfigSchema.optional(),
    })
    .strict(),
  z
    .object({
      engine: z.literal("rtk"),
      intensity: rtkIntensitySchema.optional(),
      config: rtkConfigSchema.optional(),
    })
    .strict(),
]);

export const compressionSettingsUpdateSchema = z
  .object({
    enabled: z.boolean().optional(),
    defaultMode: compressionModeSchema.optional(),
    autoTriggerMode: compressionModeSchema.optional(),
    autoTriggerTokens: z.number().int().min(0).optional(),
    cacheMinutes: z.number().int().min(1).max(60).optional(),
    preserveSystemPrompt: z.boolean().optional(),
    mcpDescriptionCompressionEnabled: z.boolean().optional(),
    comboOverrides: z.record(z.string(), compressionModeSchema).optional(),
    compressionComboId: z.string().trim().min(1).nullable().optional(),
    stackedPipeline: z.array(stackedPipelineStepSchema).optional(),
    cavemanConfig: cavemanConfigSchema.optional(),
    cavemanOutputMode: cavemanOutputModeSchema.optional(),
    rtkConfig: rtkConfigSchema.optional(),
    languageConfig: languageConfigSchema.optional(),
    aggressive: aggressiveConfigSchema.optional(),
    ultra: ultraConfigSchema.optional(),
  })
  .strict();

export const compressionPreviewConfigSchema = compressionSettingsUpdateSchema;
