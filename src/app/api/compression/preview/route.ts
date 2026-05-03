import { NextResponse } from "next/server";
import { z } from "zod";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { applyCompression } from "@omniroute/open-sse/services/compression/strategySelector";
import type {
  CompressionConfig,
  CompressionMode,
} from "@omniroute/open-sse/services/compression/types";
import { buildCompressionPreviewDiff } from "@omniroute/open-sse/services/compression/diffHelper";

const previewRtkConfigSchema = z
  .object({
    enabled: z.boolean().optional(),
    intensity: z.enum(["minimal", "standard", "aggressive"]).optional(),
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
    rawOutputRetention: z.enum(["never", "failures", "always"]).optional(),
    rawOutputMaxBytes: z.number().int().min(1024).max(10_000_000).optional(),
  })
  .strict();

const previewPipelineStepSchema = z
  .object({
    engine: z.enum(["lite", "caveman", "aggressive", "ultra", "rtk"]),
    intensity: z.string().optional(),
    config: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

export const PreviewCompressionConfigSchema = z
  .object({
    enabled: z.boolean().optional(),
    defaultMode: z
      .enum(["off", "lite", "standard", "aggressive", "ultra", "rtk", "stacked"])
      .optional(),
    preserveSystemPrompt: z.boolean().optional(),
    compressionComboId: z.string().nullable().optional(),
    rtkConfig: previewRtkConfigSchema.optional(),
    stackedPipeline: z.array(previewPipelineStepSchema).optional(),
    languageConfig: z
      .object({
        enabled: z.boolean().optional(),
        defaultLanguage: z.string().min(1).optional(),
        autoDetect: z.boolean().optional(),
        enabledPacks: z.array(z.string().min(1)).optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

export const PreviewRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.string(),
        content: z.union([z.string(), z.array(z.unknown())]),
      })
    )
    .min(1),
  mode: z.enum(["off", "lite", "standard", "aggressive", "ultra", "rtk", "stacked"]),
  config: PreviewCompressionConfigSchema.optional(),
});

function countTokens(text: string): number {
  return Math.ceil(text.split(/\s+/).filter(Boolean).length * 1.33);
}

function messagesToText(messages: Array<{ role: string; content: unknown }>): string {
  return messages
    .map((m) => {
      const content = typeof m.content === "string" ? m.content : JSON.stringify(m.content);
      return `${m.role}: ${content}`;
    })
    .join("\n");
}

export async function POST(req: Request) {
  const policy = await enforceApiKeyPolicy(req, "settings");
  if (policy.rejection) return policy.rejection;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = PreviewRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { messages, mode, config } = parsed.data;
  const originalText = messagesToText(messages);
  const originalTokens = countTokens(originalText);

  try {
    const start = Date.now();
    const requestBody = { messages };
    const result = await applyCompression(requestBody as Record<string, unknown>, mode, {
      config: config as CompressionConfig | undefined,
    });
    const durationMs = Date.now() - start;

    const compressedMessages = (result.body.messages ?? messages) as Array<{
      role: string;
      content: unknown;
    }>;
    const compressedText = messagesToText(compressedMessages);
    const compressedTokens = countTokens(compressedText);
    const tokensSaved = Math.max(0, originalTokens - compressedTokens);
    const savingsPct = originalTokens > 0 ? Math.round((tokensSaved / originalTokens) * 100) : 0;
    const techniquesUsed: string[] = result.stats?.techniquesUsed ?? [];
    const diff = buildCompressionPreviewDiff(originalText, compressedText, result.stats);

    return NextResponse.json({
      original: originalText,
      compressed: compressedText,
      originalTokens,
      compressedTokens,
      tokensSaved,
      savingsPct,
      techniquesUsed,
      durationMs,
      mode,
      intensity: null,
      outputMode: null,
      skippedReasons: [],
      diff: diff.segments,
      preservedBlocks: diff.preservedBlocks,
      ruleRemovals: diff.ruleRemovals,
      rulesApplied: diff.ruleRemovals,
      validation: {
        valid: diff.validationErrors.length === 0,
        errors: diff.validationErrors,
        warnings: diff.validationWarnings,
        fallbackApplied: diff.fallbackApplied,
      },
      validationWarnings: diff.validationWarnings,
      validationErrors: diff.validationErrors,
      fallbackApplied: diff.fallbackApplied,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[/api/compression/preview]", msg);
    return NextResponse.json({ error: "Compression failed", details: msg }, { status: 500 });
  }
}
