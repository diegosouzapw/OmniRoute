import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { compressionPreviewConfigSchema } from "@/shared/validation/compressionConfigSchemas";
import {
  applyCompression,
  applyCompressionAsync,
} from "@omniroute/open-sse/services/compression/strategySelector";
import type {
  CompressionConfig,
  CompressionMode,
} from "@omniroute/open-sse/services/compression/types";
import { buildCompressionPreviewDiff } from "@omniroute/open-sse/services/compression/diffHelper";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { countTextTokens } from "@/shared/utils/tiktokenCounter";
import { ensureEngineBreakdown } from "@omniroute/open-sse/services/compression/engineBreakdown";

export const PreviewCompressionConfigSchema = compressionPreviewConfigSchema;

export const PreviewRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.string(),
        content: z.union([z.string(), z.array(z.unknown())]),
      })
    )
    .min(1),
  mode: z
    .enum(["off", "lite", "standard", "aggressive", "ultra", "rtk", "stacked"])
    .optional()
    .default("stacked"),
  engineId: z.string().optional(),
  pipeline: z.array(z.string()).min(1).optional(),
  config: PreviewCompressionConfigSchema.optional(),
  fidelityGate: z.object({ enabled: z.boolean() }).optional(),
});

function countTokens(text: string): number {
  return countTextTokens(text);
}

function messagesToText(messages: Array<{ role: string; content: unknown }>): string {
  return messages
    .map((m) => {
      const content = typeof m.content === "string" ? m.content : JSON.stringify(m.content);
      return `${m.role}: ${content}`;
    })
    .join("\n");
}

async function dispatchCompression(
  requestBody: Record<string, unknown>,
  opts: {
    engineId?: string;
    pipeline?: string[];
    effectiveMode: CompressionMode;
    config?: unknown;
    fidelityGate?: { enabled: boolean };
  }
) {
  if (opts.engineId) {
    return applyCompressionAsync(requestBody, "stacked", {
      config: {
        stackedPipeline: [{ engine: opts.engineId }],
        ...(opts.fidelityGate ? { fidelityGate: opts.fidelityGate } : {}),
      } as CompressionConfig,
    });
  }
  if (opts.pipeline) {
    return applyCompressionAsync(requestBody, "stacked", {
      config: {
        stackedPipeline: opts.pipeline.map((engine) => ({ engine })),
        ...(opts.fidelityGate ? { fidelityGate: opts.fidelityGate } : {}),
      } as CompressionConfig,
    });
  }
  return applyCompression(requestBody, opts.effectiveMode, {
    config: {
      ...(opts.config as CompressionConfig | undefined),
      ...(opts.fidelityGate ? { fidelityGate: opts.fidelityGate } : {}),
    } as CompressionConfig | undefined,
  });
}

export async function POST(req: Request) {
  const authError = await requireManagementAuth(req);
  if (authError) return authError;

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

  const { messages, mode, engineId, pipeline, config, fidelityGate } = parsed.data;
  const effectiveMode: CompressionMode = engineId || pipeline ? "stacked" : (mode as CompressionMode);
  const originalText = messagesToText(messages);
  const originalTokens = countTokens(originalText);

  try {
    const start = Date.now();
    const requestBody = { messages };
    const result = await dispatchCompression(requestBody as Record<string, unknown>, {
      engineId, pipeline, effectiveMode, config, fidelityGate,
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
    const engineBreakdown = result.stats ? ensureEngineBreakdown(result.stats) : [];
    const diff = buildCompressionPreviewDiff(originalText, compressedText, result.stats);

    return NextResponse.json({
      original: originalText,
      compressed: compressedText,
      originalTokens,
      compressedTokens,
      tokensSaved,
      savingsPct,
      techniquesUsed,
      engineBreakdown,
      durationMs,
      mode: effectiveMode,
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
    return NextResponse.json(
      { error: "Compression failed", details: sanitizeErrorMessage(msg) },
      { status: 500 }
    );
  }
}
