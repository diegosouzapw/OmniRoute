/**
 * Image Combo Strategy Execution
 *
 * Executes a full Combo strategy for image generation requests. Expands combo
 * targets via resolveComboTargets(), filters to images-capable targets, runs
 * each target via handleImageGeneration() using a priority strategy, provides
 * per-credential resolution, and returns the first success or last failure.
 *
 * #9239
 */
import { getComboByName, getCombos } from "@/lib/db/combos";
import { resolveComboTargets } from "@omniroute/open-sse/services/combo.ts";
import { getImageModelEntry, parseImageModel } from "@omniroute/open-sse/config/imageRegistry.ts";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { isAllRateLimitedCredentials } from "@/app/api/v1/_shared/rateLimit";
import { handleImageGeneration } from "@omniroute/open-sse/handlers/imageGeneration.ts";
import { attachOmniRouteMetaHeaders } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";
import { calculateModalCost } from "@/lib/usage/costCalculator";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import * as logger from "@/sse/utils/logger";

/**
 * Caller-facing shape of handleImageGeneration(). The handler is untyped and
 * returns a wide inferred union across providers, so we narrow it to the two
 * discriminated arms this strategy actually consumes.
 */
type ImageGenerationResult =
  | { success: true; data?: unknown; status?: number; error?: string }
  | { success: false; data?: unknown; status?: number; error?: string };

/** Minimum shape a combo target must expose to be iterated. */
export interface ImageComboTarget {
  modelStr: string;
}

/** Normalized per-target dispatch result (success or classified failure). */
export interface ImageComboDispatchResult {
  success: boolean;
  data?: unknown;
  status?: number;
  error?: unknown;
}

/**
 * Outcome of iterating a combo's targets.
 * - `success`: a target produced an image; `data` is the handler payload.
 * - `terminal`: a target failed with a terminal status (400/401/403); the caller
 *   should surface it as a hard error and stop.
 * - `exhausted`: every target was skipped or failed non-terminally.
 */
export type RunImageComboTargetsResult =
  | { outcome: "success"; provider: string; model: string; data: unknown; fallbackCount: number }
  | { outcome: "terminal"; provider: string; status: number; error: string; fallbackCount: number }
  | {
      outcome: "exhausted";
      fallbackCount: number;
      lastError: { status: number; error: string } | null;
    };

export interface RunImageComboTargetsOptions<T extends ImageComboTarget> {
  /** Map a target to its `{ provider, model }`. An empty provider skips the target. */
  resolveProvider: (target: T) => { provider: string | null; model: string | null };
  /** Resolve credentials for a target. Throwing is treated as a transient skip. */
  resolveCredentials: (provider: string, target: T) => Promise<unknown>;
  /** Rate-limit predicate; defaults to isAllRateLimitedCredentials. */
  isRateLimited?: (credentials: unknown) => boolean;
  /** Perform the actual per-target work (generation or edit) with resolved credentials. */
  dispatch: (ctx: {
    target: T;
    provider: string;
    model: string;
    credentials: unknown;
  }) => Promise<ImageComboDispatchResult>;
  /** Invoked once on the winning target's credentials (e.g. clear recovered state). */
  onSuccess?: (credentials: unknown) => Promise<void>;
  /** Default error text when a dispatch failure carries no string error. */
  failureLabel?: string;
}

/**
 * Iterate combo targets in priority order, applying the shared skip / terminal
 * classification that both /v1/images/generations and /v1/images/edits rely on:
 *
 *  - missing credentials, DB errors, and rate-limited accounts are skipped
 *    (fall through to the next target) rather than terminating the request;
 *  - a 400/401/403 from an actual dispatch attempt is terminal (stop iterating);
 *  - any other dispatch failure (429/5xx) is non-terminal (try the next target);
 *  - the first success wins.
 *
 * The only generation-vs-edit differences are injected via `resolveProvider`,
 * `resolveCredentials`, and `dispatch`, so both routes share one loop (#12547).
 */
export async function runImageComboTargets<T extends ImageComboTarget>(
  targets: T[],
  opts: RunImageComboTargetsOptions<T>
): Promise<RunImageComboTargetsResult> {
  const isRateLimited = opts.isRateLimited ?? isAllRateLimitedCredentials;
  const failureLabel = opts.failureLabel ?? "Image generation failed";
  let lastError: { status: number; error: string } | null = null;
  let fallbackCount = 0;

  for (const target of targets) {
    const { provider, model } = opts.resolveProvider(target);
    if (!provider) {
      lastError = { status: 400, error: `Invalid image model: ${target.modelStr}` };
      fallbackCount += 1;
      continue;
    }

    // Resolve provider credentials
    let credentials: unknown = null;
    try {
      credentials = await opts.resolveCredentials(provider, target);
    } catch {
      // DB unavailable — skip this target
      lastError = { status: 502, error: `Failed to resolve credentials for ${provider}` };
      fallbackCount += 1;
      continue;
    }

    if (!credentials) {
      lastError = { status: 400, error: `No credentials for image provider: ${provider}` };
      fallbackCount += 1;
      continue;
    }

    if (isRateLimited(credentials)) {
      lastError = {
        status: 429,
        error: `[${provider}] All accounts rate limited`,
      };
      fallbackCount += 1;
      continue;
    }

    const result = await opts.dispatch({ target, provider, model: model ?? "", credentials });

    if (result.success) {
      if (opts.onSuccess) await opts.onSuccess(credentials);
      return {
        outcome: "success",
        provider,
        model: model ?? "",
        data: result.data,
        fallbackCount,
      };
    }

    // Classify the failure
    const status = result.status || 500;
    const error = typeof result.error === "string" ? result.error : failureLabel;

    // Terminal failures (400 bad model, 403 banned, etc.) — stop iterating
    // Non-terminal failures (429, 5xx) — try next target
    if (status === 400 || status === 403 || status === 401) {
      return { outcome: "terminal", provider, status, error, fallbackCount };
    }

    lastError = { status, error: `[${provider}] ${error}` };
    fallbackCount += 1;
  }

  return { outcome: "exhausted", fallbackCount, lastError };
}

/**
 * Execute a full combo strategy for an image generation request.
 *
 * 1. Resolve combo targets via resolveComboTargets.
 * 2. Filter to images-capable targets (those with an entry in the image registry).
 * 3. Iterate targets in priority order; for each target, resolve credentials and
 *    call handleImageGeneration. Return the first success or the last failure.
 * 4. Attach combo name, selected target, and fallback count to response headers.
 */
export async function executeImageCombo(
  comboName: string,
  body: Record<string, unknown>,
  auth: {
    request: Request;
    policy: { apiKeyInfo?: { id?: string; name?: string } | null };
  },
  startTime: number,
  log: typeof logger
): Promise<Response> {
  // 1. Resolve combo targets
  const combo = await getComboByName(comboName);
  if (!combo) {
    // Model name is not a combo; the caller should handle this as a direct model
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `Combo not found: ${comboName}`);
  }

  const allCombos = await getCombos();
  const targets = resolveComboTargets(combo as never, allCombos as never);
  if (!targets || targets.length === 0) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, `Combo "${comboName}" has no usable targets`);
  }

  // 2. Filter to images-capable targets
  const imageTargets = targets.filter((t) => {
    if (!t.modelStr) return false;
    const entry = getImageModelEntry(t.modelStr);
    return entry !== null;
  });

  if (imageTargets.length === 0) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No images-capable targets in combo "${comboName}"`
    );
  }

  // 3. Iterate targets in priority order (first healthy target wins).
  //    The skip / terminal classification lives in the shared runImageComboTargets
  //    loop; generation only injects its own dispatch (handleImageGeneration) so
  //    /v1/images/edits can reuse the exact same iteration semantics (#12547).
  const run = await runImageComboTargets(imageTargets, {
    resolveProvider: (target) => parseImageModel(target.modelStr),
    resolveCredentials: (provider) => getProviderCredentialsWithQuotaPreflight(provider),
    dispatch: async ({ target, credentials }) =>
      (await handleImageGeneration({
        body: { ...body, model: target.modelStr },
        credentials,
        log,
        signal: auth.request?.signal || null,
      })) as ImageGenerationResult,
    onSuccess: async (credentials) => {
      await clearRecoveredProviderState(credentials as never);
    },
    failureLabel: "Image generation failed",
  });

  // Terminal failure (400 bad model, 401/403 banned, etc.) — surface as a hard error.
  if (run.outcome === "terminal") {
    return errorResponse(run.status, `[${run.provider}] ${run.error}`);
  }

  // 4. Build response
  if (run.outcome === "success") {
    const selectedProvider = run.provider;
    const selectedModel = run.model;
    // handleImageGeneration() already returns the public OpenAI images payload
    // ({ created, data: [...] }); count the images at that level (#12268).
    const payload = run.data as { created?: number; data?: unknown[] } | unknown[];
    const images = Array.isArray(payload) ? payload : payload?.data;
    const n = Math.max(Number(body.n) || 1, images?.length || 0);
    const costUsd = await calculateModalCost("image", selectedProvider, selectedModel, { n });

    const headers = new Headers({ "Content-Type": "application/json" });
    attachOmniRouteMetaHeaders(headers, {
      provider: selectedProvider,
      model: selectedModel,
      costUsd,
      latencyMs: Date.now() - startTime,
      requestId: generateRequestId(),
      strategy: "priority",
      fallbackAttempts: run.fallbackCount,
    });

    // Return the handler payload unchanged so the combo path matches the
    // direct-model path byte-for-byte; re-wrap only if a handler ever yields
    // a bare array (#12268).
    const responseBody = Array.isArray(payload)
      ? { created: Math.floor(Date.now() / 1000), data: payload }
      : payload;
    return new Response(JSON.stringify(responseBody), { status: 200, headers });
  }

  // All targets failed — return the last error
  const errorPayload = toJsonErrorPayload(
    run.lastError?.error || "All combo targets failed",
    "Image combo targets all failed"
  );
  return new Response(JSON.stringify(errorPayload), {
    status: run.lastError?.status || 502,
    headers: { "Content-Type": "application/json" },
  });
}
