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

  // 3. Iterate targets in priority order (first healthy target wins)
  let lastError: { status: number; error: string } | null = null;
  let successResult: { data: unknown; provider: string; model: string } | null = null;
  let fallbackCount = 0;
  let selectedProvider = "";
  let selectedModel = "";

  for (const target of imageTargets) {
    const { provider: targetProvider, model: targetModel } = parseImageModel(target.modelStr);
    if (!targetProvider) {
      lastError = { status: 400, error: `Invalid image model: ${target.modelStr}` };
      fallbackCount += 1;
      continue;
    }

    // Resolve provider credentials
    let credentials = null;
    try {
      credentials = await getProviderCredentialsWithQuotaPreflight(targetProvider);
    } catch {
      // DB unavailable — skip this target
      lastError = { status: 502, error: `Failed to resolve credentials for ${targetProvider}` };
      fallbackCount += 1;
      continue;
    }

    if (!credentials) {
      lastError = { status: 400, error: `No credentials for image provider: ${targetProvider}` };
      fallbackCount += 1;
      continue;
    }

    if (isAllRateLimitedCredentials(credentials)) {
      lastError = {
        status: 429,
        error: `[${targetProvider}] All accounts rate limited`,
      };
      fallbackCount += 1;
      continue;
    }

    // Execute image generation for this target
    const result = (await handleImageGeneration({
      body: { ...body, model: target.modelStr },
      credentials,
      log,
      signal: auth.request?.signal || null,
    })) as ImageGenerationResult;

    if (result.success) {
      await clearRecoveredProviderState(credentials);
      selectedProvider = targetProvider;
      selectedModel = target.modelStr;
      successResult = {
        data: result.data,
        provider: targetProvider,
        model: target.modelStr,
      };
      break;
    }

    // Classify the failure
    const status = result.status || 500;
    const error = typeof result.error === "string" ? result.error : "Image generation failed";

    // Terminal failures (400 bad model, 403 banned, etc.) — stop iterating
    // Non-terminal failures (429, 5xx) — try next target
    if (status === 400 || status === 403 || status === 401) {
      return errorResponse(status, `[${targetProvider}] ${error}`);
    }

    lastError = { status, error: `[${targetProvider}] ${error}` };
    fallbackCount += 1;
  }

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

  // All targets failed — return the last error
  const errorPayload = toJsonErrorPayload(
    lastError?.error || "All combo targets failed",
    "Image combo targets all failed"
  );
  return new Response(JSON.stringify(errorPayload), {
    status: lastError?.status || 502,
    headers: { "Content-Type": "application/json" },
  });
}
