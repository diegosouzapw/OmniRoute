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
import {
  buildCompressionPreviewDiff,
  type HeatmapMode,
} from "@omniroute/open-sse/services/compression/diffHelper";
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
    .enum(["off", "lite", "standard", "aggressive", "ultra", "rtk", "stacked", "caveman"])
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
  // Playground risk-gate toggle → masks high-risk spans (secrets/keys) before compression and
  // restores them verbatim after, so they pass through byte-identical. Reported via
  // result.stats.riskGate (spansProtected + per-category counts).
  riskGate: z.object({ enabled: z.boolean() }).optional(),
  // Playground fuzzy near-duplicate toggle → injects `{ fuzzy: { enabled: true } }` into the
  // session-dedup step config (see buildStep).
  fuzzyDedup: z.object({ enabled: z.boolean() }).optional(),
  // Playground QuantumLock toggle. The studio is a dry-run, so when enabled we force a caching
  // context (provider: "anthropic") so the operator can SEE what would be stabilized; real
  // cache-hit gains only show in production provider telemetry.
  quantumLock: z.object({ enabled: z.boolean() }).optional(),
  // Saliency heatmap mode. When set, the response includes a per-token heatmap.
  // "ultra" uses scoreToken (0–1); "universal" uses kept/removed from the diff.
  // Omit to skip heatmap computation (normal preview path — no extra cost).
  heatmap: z.enum(["ultra", "universal"]).optional(),
});

function countTokens(text: string): number {
  return countTextTokens(text);
}

function riskGateStatsOf(result: { stats?: { riskGate?: unknown } }): unknown {
  return result.stats?.riskGate ?? null;
}

function quantumLockStatsOf(result: { stats?: { quantumLock?: unknown } | null }): unknown {
  return result.stats?.quantumLock ?? null;
}

function quantumExtras(quantumLock?: { enabled: boolean }) {
  return quantumLock?.enabled
    ? {
        configPatch: { quantumLock: { enabled: true } },
        applyOpts: { cachingContext: { provider: "anthropic" } },
      }
    : { configPatch: {}, applyOpts: {} };
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
    riskGate?: { enabled: boolean };
    quantumLock?: { enabled: boolean };
  }
) {
  // resolveRiskGate reads `options.riskGate ?? options.config.riskGate`. applyCompressionAsync
  // does not surface a top-level `riskGate` option, so thread it through the synthesized config
  // (CompressionConfig.riskGate) — uniform across all three branches and type-safe.
  // QuantumLock uses the same pattern: when enabled the studio forces cachingContext so the dry-run
  // badge shows what WOULD be stabilized in production (real caching gains show in telemetry only).
  if (opts.engineId) {
    const q = quantumExtras(opts.quantumLock);
    return applyCompressionAsync(requestBody, "stacked", {
      config: {
        stackedPipeline: [buildStep(opts.engineId, opts.fuzzyDedup)],
        ...(opts.fidelityGate ? { fidelityGate: opts.fidelityGate } : {}),
        ...(opts.riskGate ? { riskGate: opts.riskGate } : {}),
        ...q.configPatch,
      } as CompressionConfig,
      ...q.applyOpts,
    });
  }
  if (opts.pipeline) {
    const q = quantumExtras(opts.quantumLock);
    return applyCompressionAsync(requestBody, "stacked", {
      config: {
        stackedPipeline: opts.pipeline.map((engine) => buildStep(engine, opts.fuzzyDedup)),
        ...(opts.fidelityGate ? { fidelityGate: opts.fidelityGate } : {}),
        ...(opts.riskGate ? { riskGate: opts.riskGate } : {}),
        ...q.configPatch,
      } as CompressionConfig,
      ...q.applyOpts,
    });
  }
  const q = quantumExtras(opts.quantumLock);
  return applyCompression(requestBody, opts.effectiveMode, {
    config: {
      ...(opts.config as CompressionConfig | undefined),
      ...(opts.fidelityGate ? { fidelityGate: opts.fidelityGate } : {}),
      ...(opts.riskGate ? { riskGate: opts.riskGate } : {}),
      ...q.configPatch,
    } as CompressionConfig | undefined,
    ...q.applyOpts,
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

  const { messages, mode, engineId: rawEngineId, pipeline, config, fidelityGate, fuzzyDedup, riskGate, quantumLock, heatmap: heatmapMode } =
    parsed.data;
  // Alias: `mode: "caveman"` is a synonym for `engineId: "caveman"` (single-engine stacked run).
  // The caveman engine is not a top-level CompressionMode, but it IS a registered engine.
  const engineId = mode === "caveman" && !rawEngineId ? "caveman" : rawEngineId;
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
      riskGate,
      quantumLock,
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
    const diff = buildCompressionPreviewDiff(
      originalText,
      compressedText,
      result.stats,
      {},
      heatmapMode as HeatmapMode | undefined
    );

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
      riskGate: riskGateStatsOf(result),
      quantumLock: quantumLockStatsOf(result),
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
        ...(diff.fallbackReason && { fallbackReason: diff.fallbackReason }),
      },
      validationWarnings: diff.validationWarnings,
      validationErrors: diff.validationErrors,
      fallbackApplied: diff.fallbackApplied,
      ...(diff.fallbackReason && { fallbackReason: diff.fallbackReason }),
      ...(diff.heatmap ? { heatmap: diff.heatmap } : {}),
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
