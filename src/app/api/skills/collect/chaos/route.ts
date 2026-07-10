/**
 * POST /api/skills/collect/chaos
 *
 * Chaos Mode — spawn multiple models across providers for parallel or collaborative
 * task execution. Each active provider contributes one model instance; all models
 * work on the same task simultaneously (parallel) or in a chain where each sees
 * the previous model's output (collaborative).
 *
 * External API: uses Bearer token auth (API key with chaos_mode_enabled).
 *
 * Body (JSON):
 *   task: string                   // REQUIRED — the task/goal for all models
 *   providers?: string[]           // Optional filter — only these provider IDs
 *   mode?: "parallel" | "collaborative"  // Default: from global config
 *   systemPrompt?: string          // Optional custom system prompt override
 *   maxTokens?: number             // Optional — max_tokens per model call
 *
 * Returns:
 *   {
 *     task, mode, startedAt,
 *     totalProviders, totalResults,
 *     models: [{ providerId, providerName, modelId, status, content, error?, durationMs }],
 *     summary?: string
 *   }
 */
import { NextResponse } from "next/server";
import { z } from "zod";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { validateApiKey, getApiKeyMetadata } from "@/lib/localDb";
import { getChaosConfig } from "@/lib/chaos/chaosConfig";
import { executeChaosRun, type ChaosRunResult } from "@/lib/chaos/chaosExecutor";
import * as log from "@/sse/utils/logger";

export const dynamic = "force-dynamic";

// ── Schema ───────────────────────────────────────────────────────────────────

const chaosSchema = z.object({
  task: z.string().min(1, "task is required").max(100_000, "task too long"),
  providers: z.array(z.string().min(1)).max(50).optional(),
  mode: z.enum(["parallel", "collaborative"]).optional(),
  systemPrompt: z.string().max(10_000).optional(),
  maxTokens: z.number().int().min(256).max(128_000).optional(),
});

// ── Auth helpers ─────────────────────────────────────────────────────────────

/**
 * Extract Bearer token from Authorization header.
 */
function extractBearerToken(request: Request): string | null {
  const auth = request.headers.get("Authorization");
  if (!auth || !auth.startsWith("Bearer ")) return null;
  return auth.slice(7).trim();
}

/**
 * Verify API key has chaos mode enabled.
 * validateApiKey returns a plain boolean for BOTH the deployment-time env key and a
 * DB-backed key (see src/lib/db/apiKeys.ts::validateApiKey) — it never returns the
 * key record, so the env-key/DB-key distinction has to be made via getApiKeyMetadata,
 * whose synthesized env-key record is tagged `id: "env-key"` (src/lib/db/apiKeys.ts::
 * getApiKeyMetadata) and always carries "manage" scope.
 */
async function verifyChaosKey(bearerToken: string): Promise<{ ok: boolean; error?: string }> {
  const isValid = await validateApiKey(bearerToken);
  if (!isValid) {
    return { ok: false, error: "Invalid API key" };
  }

  const metadata = await getApiKeyMetadata(bearerToken);
  if (!metadata) {
    return { ok: false, error: "Invalid API key" };
  }

  // Env key has full access (see getApiKeyMetadata's synthesized "env-key" record).
  if (metadata.id === "env-key") {
    return { ok: true };
  }

  if (!metadata.chaosModeEnabled) {
    return {
      ok: false,
      error: "Chaos Mode is not enabled for this API key. Enable it in API Key settings.",
    };
  }

  return { ok: true };
}

// ── Main handler ─────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    // ── API Key auth check ─────────────────────────────────────────────
    const bearerToken = extractBearerToken(request);
    if (!bearerToken) {
      return NextResponse.json(
        buildErrorBody(401, "Missing or invalid Authorization header — Bearer token required"),
        { status: 401 }
      );
    }

    const auth = await verifyChaosKey(bearerToken);
    if (!auth.ok) {
      return NextResponse.json(buildErrorBody(403, auth.error!), { status: 403 });
    }

    // ── Parse request body ─────────────────────────────────────────────
    const rawBody = await request.json();
    const validation = validateBody(chaosSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(buildErrorBody(400, validation.error.message), {
        status: 400,
      });
    }

    const { task, providers, mode, systemPrompt, maxTokens } = validation.data;

    // ── Load global chaos config ───────────────────────────────────────
    const globalConfig = await getChaosConfig();
    if (!globalConfig.enabled) {
      return NextResponse.json(
        buildErrorBody(400, "Chaos Mode is not enabled globally. Enable it in Dashboard → Chaos Mode."),
        { status: 400 }
      );
    }

    // ── Execute via the shared executor ────────────────────────────────
    const result: ChaosRunResult = await executeChaosRun({
      task,
      providers,
      mode,
      systemPrompt,
      timeoutMs: globalConfig.timeoutMs,
      maxTokens: maxTokens || globalConfig.maxTokens,
      apiKey: bearerToken,
    });

    return NextResponse.json(result);
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    log.error("chaos", "Chaos external API error", err);
    return NextResponse.json(buildErrorBody(500, msg), { status: 500 });
  }
}
