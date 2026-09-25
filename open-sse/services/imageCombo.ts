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
 *
 * Kept as a sequential loop (rather than the parallel fan-out `executeImageCombo`
 * below uses) because it is also the shared loop for /v1/images/edits — retained
 * verbatim for that consumer (see src/app/api/v1/images/edits/route.ts).
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
 * 3. Run all images-capable targets concurrently (optional injected generator
 *    for tests); first healthy success wins, terminal errors surface last.
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
  log: typeof logger,
  options?: { generateImage?: typeof handleImageGeneration }
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

  // 3. Run every images-capable target concurrently; first healthy success wins.
  //
  //    Sequential priority execution means a slow first target (an AI Horde
  //    queue that can never fit the request budget, a provider that only
  //    fails after its full timeout) blocks every sibling behind it, so a
  //    starved-but-first provider turns a perfectly healthy combo into a
  //    long failure. Fanning out removes that serialization: whoever answers
  //    first wins, and a target that would have taken the full budget to fail
  //    no longer pre-empts a sibling that could have succeeded in seconds.
  //
  //    We deliberately race the first success against "all settled" instead of
  //    await-ing every target: once a success lands, the response returns
  //    immediately while any still-running siblings unwind on their own (each
  //    target self-bounds via its own timeout/abort). Promises that reject are
  //    caught below, so a late sibling failure cannot become an unhandled
  //    rejection after the caller already got a 200.
  let lastError: { status: number; error: string } | null = null;
  let terminalError: { status: number; error: string } | null = null;
  let successResult: { data: unknown; provider: string; model: string } | null = null;
  let fallbackCount = 0;
  let selectedProvider = "";
  let selectedModel = "";

  type ImageComboTarget = (typeof imageTargets)[number];

  let resolveFirstSuccess: (() => void) | null = null;
  const firstSuccess = new Promise<void>((resolve) => {
    resolveFirstSuccess = resolve;
  });

  const runTarget = async (target: ImageComboTarget): Promise<void> => {
    try {
      const { provider: targetProvider } = parseImageModel(target.modelStr);
      if (!targetProvider) {
        lastError = { status: 400, error: `Invalid image model: ${target.modelStr}` };
        fallbackCount += 1;
        return;
      }

      // Resolve provider credentials
      let credentials = null;
      try {
        credentials = await getProviderCredentialsWithQuotaPreflight(targetProvider);
      } catch {
        // DB unavailable — skip this target
        lastError = { status: 502, error: `Failed to resolve credentials for ${targetProvider}` };
        fallbackCount += 1;
        return;
      }

      if (!credentials) {
        lastError = { status: 400, error: `No credentials for image provider: ${targetProvider}` };
        fallbackCount += 1;
        return;
      }

      if (isAllRateLimitedCredentials(credentials)) {
        lastError = {
          status: 429,
          error: `[${targetProvider}] All accounts rate limited`,
        };
        fallbackCount += 1;
        return;
      }

      // Execute image generation for this target
      const result = (await (options?.generateImage ?? handleImageGeneration)({
        body: { ...body, model: target.modelStr },
        credentials,
        log,
        signal: auth.request?.signal || null,
      })) as ImageGenerationResult;

      if (result.success) {
        if (!successResult) {
          await clearRecoveredProviderState(credentials);
          selectedProvider = targetProvider;
          selectedModel = target.modelStr;
          successResult = {
            data: result.data,
            provider: targetProvider,
            model: target.modelStr,
          };
          // Ring the bell — the caller may stop waiting on this result.
          resolveFirstSuccess?.();
        }
        return;
      }

      // Classify the failure
      const status = result.status || 500;
      const error = typeof result.error === "string" ? result.error : "Image generation failed";
      const failure = { status, error: `[${targetProvider}] ${error}` };
      lastError = failure;

      // Terminal failures (400 bad model, 403 banned, 401 missing key) are the
      // most actionable signal when every target fails — keep one aside so it
      // can surface instead of a generic 5xx/429.
      if (status === 400 || status === 403 || status === 401) {
        if (!terminalError) terminalError = failure;
      }
      fallbackCount += 1;
    } catch (err) {
      // A late sibling may fail after the caller already got a 200 — record
      // it so it can still surface if nothing else succeeds, and never leak
      // the rejection after an early return.
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : "Image generation failed";
      if (!lastError) lastError = { status: 502, error: `[image combo] ${message}` };
      fallbackCount += 1;
    }
  };

  const tasks = imageTargets.map((target) => runTarget(target));
  // If a success lands first, stop waiting; if every target settles with no
  // success, the error path below reports the most useful failure.
  await Promise.race([firstSuccess, Promise.allSettled(tasks)]);

  // 4. Build response
  if (successResult) {
    // handleImageGeneration() already returns the public OpenAI images payload
    // ({ created, data: [...] }); count the images at that level (#12268).
    const payload = successResult.data as { created?: number; data?: unknown[] } | unknown[];
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
      fallbackAttempts: fallbackCount,
    });

    // Return the handler payload unchanged so the combo path matches the
    // direct-model path byte-for-byte; re-wrap only if a handler ever yields
    // a bare array (#12268).
    const responseBody = Array.isArray(payload)
      ? { created: Math.floor(Date.now() / 1000), data: payload }
      : payload;
    return new Response(JSON.stringify(responseBody), { status: 200, headers });
  }

  // All targets failed — prefer the terminal (400/403/401) error when one
  // exists; it is the actionable misconfiguration signal. Fall back to the
  // last failure otherwise.
  const reportedError = terminalError ?? lastError;
  const errorPayload = toJsonErrorPayload(
    reportedError?.error || "All combo targets failed",
    "Image combo targets all failed"
  );
  return new Response(JSON.stringify(errorPayload), {
    status: reportedError?.status || 502,
    headers: { "Content-Type": "application/json" },
  });
}
