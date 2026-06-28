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
import { summarizeEncoderCandidates } from "@omniroute/open-sse/services/compression/engines/headroom/encoderComparison";
import { DEFAULT_MIN_ROWS } from "@omniroute/open-sse/services/compression/engines/headroom/smartcrusher";

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
  // Playground fidelity-gate toggle. Only `enabled` is exposed on the API surface on purpose:
  // the advanced thresholds (minTokenSurvivalPercent / minJsonKeyPercent / checkNumericIntegrity
  // / checkDiffHunks on FidelityGateConfig) use their conservative defaults until the studio gets
  // a config panel for them.
  fidelityGate: z.object({ enabled: z.boolean() }).optional(),
  // Playground fuzzy near-duplicate toggle → injects `{ fuzzy: { enabled: true } }` into the
  // session-dedup step config (see buildStep).
  fuzzyDedup: z.object({ enabled: z.boolean() }).optional(),
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

function buildStep(engine: string, fuzzy?: { enabled: boolean }) {
  return engine === "session-dedup" && fuzzy?.enabled
    ? { engine, config: { fuzzy: { enabled: true } } }
    : { engine };
}

function headroomParticipates(
  engineId: string | undefined,
  pipeline: string[] | undefined,
  mode: CompressionMode
): boolean {
  // An explicit single-engine or pipeline override decides on its own terms:
  // headroom only participates if it is the engine / is named in the pipeline.
  // (effectiveMode is forced to "stacked" whenever engineId/pipeline is set, so we
  // must not fall through to the mode check for those — e.g. engineId:"lite".)
  if (engineId) return engineId === "headroom";
  if (pipeline) return pipeline.includes("headroom");
  return mode === "stacked";
}

async function dispatchCompression(
  requestBody: Record<string, unknown>,
  opts: {
    engineId?: string;
    pipeline?: string[];
    effectiveMode: CompressionMode;
    config?: unknown;
    fidelityGate?: { enabled: boolean };
    fuzzyDedup?: { enabled: boolean };
  }
) {
  if (opts.engineId) {
    return applyCompressionAsync(requestBody, "stacked", {
      config: {
        stackedPipeline: [buildStep(opts.engineId, opts.fuzzyDedup)],
        ...(opts.fidelityGate ? { fidelityGate: opts.fidelityGate } : {}),
      } as CompressionConfig,
    });
  }
  if (opts.pipeline) {
    return applyCompressionAsync(requestBody, "stacked", {
      config: {
        stackedPipeline: opts.pipeline.map((engine) => buildStep(engine, opts.fuzzyDedup)),
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

  const { messages, mode, engineId, pipeline, config, fidelityGate, fuzzyDedup } = parsed.data;
  const effectiveMode: CompressionMode =
    engineId || pipeline ? "stacked" : (mode as CompressionMode);
  const originalText = messagesToText(messages);
  const originalTokens = countTokens(originalText);

  try {
    const start = Date.now();
    const requestBody = { messages };
    const result = await dispatchCompression(requestBody as Record<string, unknown>, {
      engineId,
      pipeline,
      effectiveMode,
      config,
      fidelityGate,
      fuzzyDedup,
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

    const encoderComparison = headroomParticipates(engineId, pipeline, effectiveMode)
      ? summarizeEncoderCandidates(messages, DEFAULT_MIN_ROWS, countTextTokens)
      : null;

    return NextResponse.json({
      encoderComparison,
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
