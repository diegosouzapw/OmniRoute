/**
 * Video Combo Strategy Execution
 *
 * Mirrors imageCombo for /v1/videos/generations: expands combo targets via
 * resolveComboTargets(), filters to video-capable targets (built-in registry
 * models plus custom OpenAI-compatible provider nodes tagged with the
 * "videos" endpoint — same coverage as the direct route), runs each through
 * handleVideoGeneration() in priority order, and returns the first success or
 * the last failure.
 *
 * Terminal-vs-retryable classification matches the image strategy: 400/401/403
 * can advance only to a distinct provider/account (the failing target may have
 * a bad model or expired key), while same-account retries stop. A missing prompt against a
 * prompt-required target is an exception to that rule: it is per-target (some
 * combo targets may be prompt-optional I2V models), so it is treated as a
 * retryable skip rather than a terminal failure.
 */
import { getComboByName, getCombos } from "@/lib/db/combos";
import { resolveComboTargets } from "@omniroute/open-sse/services/combo.ts";
import { getVideoProvider } from "@omniroute/open-sse/config/videoRegistry.ts";
import { resolveVideoCredentialProvider } from "@omniroute/open-sse/handlers/videoGeneration/googleFlow.ts";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { isAllRateLimitedCredentials } from "@/app/api/v1/_shared/rateLimit";
import { handleVideoGeneration } from "@omniroute/open-sse/handlers/videoGeneration.ts";
import {
  isMediaGenerationFailure,
  promptRequiredResponse,
  successfulMediaGenerationResponse,
} from "@/app/api/v1/_shared/mediaGenerationRoute";
import type { MediaGenerationResultLike } from "@/app/api/v1/_shared/mediaGenerationRoute";
import {
  isVideoPromptOptional,
  resolveLocalOverrideCredentials,
  resolveVideoModelTarget,
} from "@/app/api/v1/_shared/videoModelResolution";
import type { VideoModelTarget } from "@/app/api/v1/_shared/videoModelResolution";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import * as logger from "@/sse/utils/logger";
import {
  hasDistinctMediaFallback,
  isTargetLocalMediaStatus,
  pinnedConnectionIds,
} from "./mediaComboFallback.ts";

/**
 * Execute a full combo strategy for a video generation request.
 */
export async function executeVideoCombo(
  comboName: string,
  body: Record<string, unknown>,
  auth: {
    request: Request;
    policy: { apiKeyInfo?: { id?: string; name?: string } | null };
  },
  startTime: number,
  log: typeof logger
): Promise<Response> {
  const combo = await getComboByName(comboName);
  if (!combo) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `Combo not found: ${comboName}`);
  }

  const allCombos = await getCombos();
  const targets = resolveComboTargets(combo as never, allCombos as never);
  if (!targets || targets.length === 0) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `Combo "${comboName}" has no usable targets`);
  }

  // Resolve every target once — built-in registry first, then custom
  // OpenAI-compatible provider nodes tagged with the "videos" endpoint —
  // and filter to video-capable ones. Resolving up front (rather than in the
  // execution loop below) lets prompt validation run against the real
  // expanded target set instead of the unresolved combo name.
  const videoTargets: Array<{
    target: (typeof targets)[number];
    modelStr: string;
    resolved: VideoModelTarget;
  }> = [];
  for (const t of targets) {
    if (!t.modelStr) continue;
    const resolved = await resolveVideoModelTarget(t.modelStr);
    if (resolved.provider) {
      videoTargets.push({ target: t, modelStr: t.modelStr, resolved });
    }
  }

  if (videoTargets.length === 0) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No video-capable targets in combo "${comboName}"`
    );
  }

  let lastError: { status: number; error: string } | null = null;
  let fallbackCount = 0;

  for (let targetIndex = 0; targetIndex < videoTargets.length; targetIndex += 1) {
    const { target, modelStr, resolved } = videoTargets[targetIndex];
    const { provider: targetProvider, model: targetModel, isCustomModel } = resolved;
    if (!targetProvider) {
      lastError = { status: 400, error: `Invalid video model: ${modelStr}` };
      fallbackCount += 1;
      continue;
    }

    // Prompt requirements are per-target: some combo targets (I2V models) are
    // prompt-optional and others are not, so a missing prompt only rules out
    // this target rather than the whole combo.
    if (!isVideoPromptOptional(resolved)) {
      const promptError = promptRequiredResponse(body);
      if (promptError) {
        lastError = { status: 400, error: `[${targetProvider}] Prompt is required` };
        fallbackCount += 1;
        continue;
      }
    }

    // Local providers (authType "none") carry no credential by default, but a
    // configured per-connection override (e.g. a ComfyUI base URL) must still
    // be honored, exactly as the direct route treats them.
    const providerConfig = getVideoProvider(targetProvider);
    let credentials = null;
    if (providerConfig && providerConfig.authType !== "none") {
      try {
        credentials = await getProviderCredentialsWithQuotaPreflight(
          resolveVideoCredentialProvider(targetProvider),
          null,
          pinnedConnectionIds(target),
          targetModel
        );
      } catch {
        lastError = { status: 502, error: `Failed to resolve credentials for ${targetProvider}` };
        fallbackCount += 1;
        continue;
      }

      if (!credentials) {
        lastError = { status: 400, error: `No credentials for video provider: ${targetProvider}` };
        fallbackCount += 1;
        continue;
      }

      if (isAllRateLimitedCredentials(credentials)) {
        lastError = { status: 429, error: `[${targetProvider}] All accounts rate limited` };
        fallbackCount += 1;
        continue;
      }
    } else if (isCustomModel) {
      try {
        credentials = await getProviderCredentialsWithQuotaPreflight(
          targetProvider,
          null,
          pinnedConnectionIds(target),
          targetModel
        );
      } catch {
        lastError = { status: 502, error: `Failed to resolve credentials for ${targetProvider}` };
        fallbackCount += 1;
        continue;
      }

      if (!credentials) {
        lastError = {
          status: 400,
          error: `No credentials for custom video provider: ${targetProvider}`,
        };
        fallbackCount += 1;
        continue;
      }

      if (isAllRateLimitedCredentials(credentials)) {
        lastError = { status: 429, error: `[${targetProvider}] All accounts rate limited` };
        fallbackCount += 1;
        continue;
      }
    } else if (providerConfig?.authType === "none") {
      credentials = await resolveLocalOverrideCredentials(targetProvider);
    }

    const result: MediaGenerationResultLike = await handleVideoGeneration({
      body: { ...body, model: modelStr },
      credentials,
      log,
      ...(isCustomModel && { resolvedProvider: targetProvider }),
    });

    if (!isMediaGenerationFailure(result)) {
      await clearRecoveredProviderState(credentials);
      return successfulMediaGenerationResponse({
        result: { data: result.data },
        billingMode: "video",
        provider: targetProvider,
        model: modelStr,
        startTime,
        duration: body.duration,
        strategy: "priority",
        fallbackAttempts: fallbackCount,
      });
    }

    const status = (result as { status?: number }).status || 500;
    const error =
      typeof (result as { error?: unknown }).error === "string"
        ? (result as { error: string }).error
        : "Video generation failed";

    if (isTargetLocalMediaStatus(status)) {
      const credentialConnectionId =
        credentials && typeof credentials === "object" && "connectionId" in credentials
          ? String((credentials as { connectionId?: unknown }).connectionId || "") || null
          : null;
      const connectionId = credentialConnectionId || target.connectionId || null;
      const hasDistinctFallback = hasDistinctMediaFallback({
        currentProvider: targetProvider,
        currentConnectionId: connectionId,
        remaining: videoTargets.slice(targetIndex + 1).map((candidate) => ({
          target: candidate.target,
          provider: candidate.resolved.provider,
        })),
      });
      if (!hasDistinctFallback) {
        return errorResponse(status, `[${targetProvider}] ${error}`);
      }
    }

    lastError = { status, error: `[${targetProvider}] ${error}` };
    fallbackCount += 1;
  }

  const errorPayload = toJsonErrorPayload(
    lastError?.error || "All combo targets failed",
    "Video combo targets all failed"
  );
  return new Response(JSON.stringify(errorPayload), {
    status: lastError?.status || 502,
    headers: { "Content-Type": "application/json" },
  });
}
