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
import {
  hasDistinctMediaFallback,
  isTargetLocalMediaStatus,
  pinnedConnectionIds,
} from "./mediaComboFallback.ts";

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
  connectionId?: string | null;
  allowedConnectionIds?: string[] | null;
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

type TargetAttemptResult =
  | { outcome: "success"; provider: string; model: string; data: unknown }
  | { outcome: "terminal"; provider: string; status: number; error: string }
  | { outcome: "continue"; lastError: { status: number; error: string } };

async function resolveTargetCredentials<T extends ImageComboTarget>(
  provider: string,
  target: T,
  resolver: RunImageComboTargetsOptions<T>["resolveCredentials"]
): Promise<{ credentials: unknown; error?: never } | { credentials?: never; error: string }> {
  try {
    return { credentials: await resolver(provider, target) };
  } catch {
    return { error: `Failed to resolve credentials for ${provider}` };
  }
}

function getCredentialConnectionId(credentials: unknown): string | null {
  if (!credentials || typeof credentials !== "object" || !("connectionId" in credentials)) {
    return null;
  }
  return String((credentials as { connectionId?: unknown }).connectionId || "") || null;
}

function hasLaterDistinctTarget<T extends ImageComboTarget>(
  targets: T[],
  targetIndex: number,
  target: T,
  provider: string,
  credentials: unknown,
  resolveProvider: RunImageComboTargetsOptions<T>["resolveProvider"]
): boolean {
  return hasDistinctMediaFallback({
    currentProvider: provider,
    currentConnectionId: getCredentialConnectionId(credentials) || target.connectionId || null,
    remaining: targets.slice(targetIndex + 1).map((candidate) => ({
      target: candidate,
      provider: resolveProvider(candidate).provider,
    })),
  });
}

async function attemptImageComboTarget<T extends ImageComboTarget>(
  targets: T[],
  targetIndex: number,
  opts: RunImageComboTargetsOptions<T>,
  isRateLimited: (credentials: unknown) => boolean,
  failureLabel: string
): Promise<TargetAttemptResult> {
  const target = targets[targetIndex];
  const { provider, model } = opts.resolveProvider(target);
  if (!provider) {
    return {
      outcome: "continue",
      lastError: { status: 400, error: `Invalid image model: ${target.modelStr}` },
    };
  }

  const resolved = await resolveTargetCredentials(provider, target, opts.resolveCredentials);
  if (resolved.error) {
    return { outcome: "continue", lastError: { status: 502, error: resolved.error } };
  }
  const { credentials } = resolved;
  if (!credentials) {
    return {
      outcome: "continue",
      lastError: { status: 400, error: `No credentials for image provider: ${provider}` },
    };
  }
  if (isRateLimited(credentials)) {
    return {
      outcome: "continue",
      lastError: { status: 429, error: `[${provider}] All accounts rate limited` },
    };
  }

  const result = await opts.dispatch({ target, provider, model: model ?? "", credentials });
  if (result.success) {
    if (opts.onSuccess) await opts.onSuccess(credentials);
    return { outcome: "success", provider, model: model ?? "", data: result.data };
  }

  const status = result.status || 500;
  const error = typeof result.error === "string" ? result.error : failureLabel;
  const terminal =
    isTargetLocalMediaStatus(status) &&
    !hasLaterDistinctTarget(
      targets,
      targetIndex,
      target,
      provider,
      credentials,
      opts.resolveProvider
    );
  return terminal
    ? { outcome: "terminal", provider, status, error }
    : { outcome: "continue", lastError: { status, error: `[${provider}] ${error}` } };
}

/**
 * Iterate combo targets in priority order, applying the shared skip / terminal
 * classification that both /v1/images/generations and /v1/images/edits rely on:
 *
 *  - missing credentials, DB errors, and rate-limited accounts are skipped
 *    (fall through to the next target) rather than terminating the request;
 *  - a 400/401/403 from an actual dispatch attempt advances only when a later
 *    target uses a distinct provider/account; otherwise it is terminal;
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

  for (let targetIndex = 0; targetIndex < targets.length; targetIndex += 1) {
    const attempt = await attemptImageComboTarget(
      targets,
      targetIndex,
      opts,
      isRateLimited,
      failureLabel
    );
    if (attempt.outcome === "success") {
      return {
        outcome: "success",
        provider: attempt.provider,
        model: attempt.model,
        data: attempt.data,
        fallbackCount,
      };
    }
    if (attempt.outcome === "terminal") {
      return { ...attempt, fallbackCount };
    }
    lastError = attempt.lastError;
    fallbackCount += 1;
  }

  return { outcome: "exhausted", fallbackCount, lastError };
}

async function resolveImageComboTargets(
  comboName: string
): Promise<{ targets: ImageComboTarget[] } | { error: Response }> {
  const combo = await getComboByName(comboName);
  if (!combo) {
    return { error: errorResponse(HTTP_STATUS.BAD_REQUEST, `Combo not found: ${comboName}`) };
  }
  const targets = resolveComboTargets(combo as never, (await getCombos()) as never);
  if (!targets?.length) {
    return {
      error: errorResponse(HTTP_STATUS.BAD_REQUEST, `Combo "${comboName}" has no usable targets`),
    };
  }
  const imageTargets = targets.filter(
    (target) => Boolean(target.modelStr) && getImageModelEntry(target.modelStr) !== null
  );
  return imageTargets.length > 0
    ? { targets: imageTargets }
    : {
        error: errorResponse(
          HTTP_STATUS.BAD_REQUEST,
          `No images-capable targets in combo "${comboName}"`
        ),
      };
}

async function runImageGenerationTargets(
  targets: ImageComboTarget[],
  body: Record<string, unknown>,
  auth: { request: Request },
  log: typeof logger
): Promise<RunImageComboTargetsResult> {
  return runImageComboTargets(targets, {
    resolveProvider: (target) => parseImageModel(target.modelStr),
    resolveCredentials: (provider, target) =>
      getProviderCredentialsWithQuotaPreflight(
        provider,
        null,
        pinnedConnectionIds(target),
        parseImageModel(target.modelStr).model
      ),
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
}

async function buildImageSuccessResponse(
  run: Extract<RunImageComboTargetsResult, { outcome: "success" }>,
  body: Record<string, unknown>,
  startTime: number
): Promise<Response> {
  const payload = run.data as { created?: number; data?: unknown[] } | unknown[];
  const images = Array.isArray(payload) ? payload : payload?.data;
  const n = Math.max(Number(body.n) || 1, images?.length || 0);
  const costUsd = await calculateModalCost("image", run.provider, run.model, { n });
  const headers = new Headers({ "Content-Type": "application/json" });
  attachOmniRouteMetaHeaders(headers, {
    provider: run.provider,
    model: run.model,
    costUsd,
    latencyMs: Date.now() - startTime,
    requestId: generateRequestId(),
    strategy: "priority",
    fallbackAttempts: run.fallbackCount,
  });
  const responseBody = Array.isArray(payload)
    ? { created: Math.floor(Date.now() / 1000), data: payload }
    : payload;
  return new Response(JSON.stringify(responseBody), { status: 200, headers });
}

function buildImageExhaustedResponse(
  run: Extract<RunImageComboTargetsResult, { outcome: "exhausted" }>
): Response {
  const errorPayload = toJsonErrorPayload(
    run.lastError?.error || "All combo targets failed",
    "Image combo targets all failed"
  );
  return new Response(JSON.stringify(errorPayload), {
    status: run.lastError?.status || 502,
    headers: { "Content-Type": "application/json" },
  });
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
  const resolved = await resolveImageComboTargets(comboName);
  if ("error" in resolved) return resolved.error;
  const run = await runImageGenerationTargets(resolved.targets, body, auth, log);
  if (run.outcome === "terminal") {
    return errorResponse(run.status, `[${run.provider}] ${run.error}`);
  }
  return run.outcome === "success"
    ? buildImageSuccessResponse(run, body, startTime)
    : buildImageExhaustedResponse(run);
}
