/**
 * POST /api/chaos/run — Unified Chaos Mode execution endpoint.
 *
 * Dashboard-friendly: uses the current management session (cookie) for auth.
 * Delegates all execution logic to the shared chaosExecutor library.
 *
 * Body (JSON):
 *   task: string          // REQUIRED — the task/goal
 *   providers?: string[]  // Optional — filter specific providers
 *   mode?: "parallel" | "collaborative"  // Optional — override global default
 *   systemPrompt?: string // Optional — override global system prompt
 *   maxTokens?: number    // Optional — override max_tokens per model call
 *
 * Returns the same shape as POST /api/skills/collect/chaos.
 */
import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { getChaosConfig } from "@/lib/chaos/chaosConfig";
import { executeChaosRun, type ChaosRunResult } from "@/lib/chaos/chaosExecutor";
import * as log from "@/sse/utils/logger";

export const dynamic = "force-dynamic";

const runSchema = z.object({
  task: z.string().min(1, "Task is required").max(100_000, "task too long"),
  providers: z.array(z.string().min(1)).max(50).optional(),
  mode: z.enum(["parallel", "collaborative"]).optional(),
  systemPrompt: z.string().max(10_000).optional(),
  maxTokens: z.number().int().min(256).max(128_000).optional(),
});

export async function POST(request: Request) {
  // Require dashboard management auth (cookie-based)
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    // Load global chaos config
    const globalConfig = await getChaosConfig();
    if (!globalConfig.enabled) {
      return NextResponse.json(
        buildErrorBody(400, "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."),
        { status: 400 }
      );
    }

    const rawBody = await request.json();
    const validation = validateBody(runSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(buildErrorBody(400, validation.error.message), { status: 400 });
    }

    const { task, providers, mode, systemPrompt, maxTokens } = validation.data;

    const result: ChaosRunResult = await executeChaosRun({
      task,
      providers,
      mode,
      systemPrompt,
      timeoutMs: globalConfig.timeoutMs,
      maxTokens: maxTokens || globalConfig.maxTokens,
    });

    return NextResponse.json(result);
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    log.error("chaos", "Chaos run error", err);
    return NextResponse.json(buildErrorBody(500, msg), { status: 500 });
  }
}
