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
 * stop the walk (a bad model or a banned key will not get better on the next
 * target), everything else advances. A missing prompt against a
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
  const videoTargets: Array<{ modelStr: string; resolved: VideoModelTarget }> = [];
  for (const t of targets) {
    if (!t.modelStr) continue;
    const resolved = await resolveVideoModelTarget(t.modelStr);
    if (resolved.provider) {
      videoTargets.push({ modelStr: t.modelStr, resolved });
    }
  }

  if (videoTargets.length === 0) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No video-capable targets in combo "${comboName}"`
    );
  }

  // 3. Run every video-capable target concurrently; first healthy success wins.
  //
  //    Sequential priority execution means a slow first target (a provider
  //    that only fails after its full timeout, a queue that cannot fit the
  //    request budget) blocks every sibling behind it, so a starved-but-first
  //    provider turns a perfectly healthy combo into a long failure. Fanning
  //    out removes that serialization: whoever answers first wins, and a
  //    target that would have taken the full budget to fail no longer
  //    pre-empts a sibling that could have succeeded in seconds.
  //
  //    We race the first success against "all settled" instead of await-ing
  //    every target: once a success lands, the response returns immediately
  //    while any still-running siblings unwind on their own. Promises that
  //    reject are caught below, so a late sibling failure cannot become an
  //    unhandled rejection after the caller already got a 200.
  let lastError: { status: number; error: string } | null = null;
  let terminalError: { status: number; error: string } | null = null;
  let fallbackCount = 0;

  let resolveFirstSuccess: (() => void) | null = null;
  const firstSuccess = new Promise<void>((resolve) => {
    resolveFirstSuccess = resolve;
  });

  const runTarget = async (modelStr: string, resolved: VideoModelTarget): Promise<void> => {
    try {
      const { provider: targetProvider, model: targetModel, isCustomModel } = resolved;
      if (!targetProvider) {
        lastError = { status: 400, error: `Invalid video model: ${modelStr}` };
        fallbackCount += 1;
        return;
      }

      // Prompt requirements are per-target: some combo targets (I2V models) are
      // prompt-optional and others are not, so a missing prompt only rules out
      // this target rather than the whole combo.
      if (!isVideoPromptOptional(resolved)) {
        const promptError = promptRequiredResponse(body);
        if (promptError) {
          lastError = { status: 400, error: `[${targetProvider}] Prompt is required` };
          fallbackCount += 1;
          return;
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
            resolveVideoCredentialProvider(targetProvider)
          );
        } catch {
          lastError = { status: 502, error: `Failed to resolve credentials for ${targetProvider}` };
          fallbackCount += 1;
          return;
        }

        if (!credentials) {
          lastError = { status: 400, error: `No credentials for video provider: ${targetProvider}` };
          fallbackCount += 1;
          return;
        }

        if (isAllRateLimitedCredentials(credentials)) {
          lastError = { status: 429, error: `[${targetProvider}] All accounts rate limited` };
          fallbackCount += 1;
          return;
        }
      } else if (isCustomModel) {
        try {
          credentials = await getProviderCredentialsWithQuotaPreflight(
            targetProvider,
            null,
            null,
            targetModel
          );
        } catch {
          lastError = { status: 502, error: `Failed to resolve credentials for ${targetProvider}` };
          fallbackCount += 1;
          return;
        }

        if (!credentials) {
          lastError = {
            status: 400,
            error: `No credentials for custom video provider: ${targetProvider}`,
          };
          fallbackCount += 1;
          return;
        }

        if (isAllRateLimitedCredentials(credentials)) {
          lastError = { status: 429, error: `[${targetProvider}] All accounts rate limited` };
          fallbackCount += 1;
          return;
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
        // Attach the selected provider/model to a shared closure so the
        // success path after the race can construct the response.
        selectedProvider = targetProvider;
        selectedModel = modelStr;
        selectedResult = result;
        selectedFallbackCount = fallbackCount;
        resolveFirstSuccess?.();
        return;
      }

      const status = (result as { status?: number }).status || 500;
      const error =
        typeof (result as { error?: unknown }).error === "string"
          ? (result as { error: string }).error
          : "Video generation failed";
      const failure = { status, error: `[${targetProvider}] ${error}` };
      lastError = failure;

      // Terminal failures (400 bad model, 401 missing key, 403 banned) are the
      // most actionable signal when every target fails — keep one aside so it
      // can surface instead of a generic 5xx/429.
      if (status === 400 || status === 401 || status === 403) {
        if (!terminalError) terminalError = failure;
      }
      fallbackCount += 1;
    } catch (err) {
      // A late sibling may fail after the caller already got a 200 — record
      // it so it can still surface if nothing else succeeds, and never leak
      // the rejection after an early return.
      const message =
        err instanceof Error ? err.message : typeof err === "string" ? err : "Video generation failed";
      if (!lastError) lastError = { status: 502, error: `[video combo] ${message}` };
      fallbackCount += 1;
    }
  };

  // Shared state for the first success captured inside runTarget
  let selectedProvider = "";
  let selectedModel = "";
  let selectedResult: MediaGenerationResultLike | null = null;
  let selectedFallbackCount = 0;

  const tasks = videoTargets.map(({ modelStr, resolved }) => runTarget(modelStr, resolved));
  await Promise.race([firstSuccess, Promise.allSettled(tasks)]);

  if (selectedResult) {
    return successfulMediaGenerationResponse({
      result: { data: selectedResult.data },
      billingMode: "video",
      provider: selectedProvider,
      model: selectedModel,
      startTime,
      duration: body.duration,
      strategy: "priority",
      fallbackAttempts: selectedFallbackCount,
    });
  }

  // All targets failed — prefer the terminal (400/401/403) error when one
  // exists; it is the actionable misconfiguration signal. Fall back to the
  // last failure otherwise.
  const reportedError = terminalError ?? lastError;
  const errorPayload = toJsonErrorPayload(
    reportedError?.error || "All combo targets failed",
    "Video combo targets all failed"
  );
  return new Response(JSON.stringify(errorPayload), {
    status: reportedError?.status || 502,
    headers: { "Content-Type": "application/json" },
  });
}
