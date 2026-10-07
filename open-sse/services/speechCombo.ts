/**
 * Speech Combo Strategy Execution
 *
 * Mirrors imageCombo for /v1/audio/speech: expands combo targets via
 * resolveComboTargets(), filters to speech-capable targets, runs each through
 * handleAudioSpeech() in priority order, and returns the first success or the
 * last failure.
 *
 * Unlike the image and video strategies, the speech handler returns a Response
 * carrying an audio stream rather than a JSON result object, so success is read
 * off `response.ok` and the upstream body is passed through untouched — only
 * ADD-only meta headers are attached, matching the direct route.
 */
import { getComboByName, getCombos } from "@/lib/db/combos";
import { resolveComboTargets } from "@omniroute/open-sse/services/combo.ts";
import { parseSpeechModel, getSpeechProvider } from "@omniroute/open-sse/config/audioRegistry.ts";
import { resolveDynamicAudioProviders } from "@/app/api/v1/_shared/audioProviderNodes";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import { isAllRateLimitedCredentials } from "@/app/api/v1/_shared/rateLimit";
import { handleAudioSpeech } from "@omniroute/open-sse/handlers/audioSpeech.ts";
import { attachOmniRouteMetaToResponse } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";
import { calculateModalCost } from "@/lib/usage/costCalculator";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";

/**
 * Execute a full combo strategy for a text-to-speech request.
 */
export async function executeSpeechCombo(
  comboName: string,
  body: Record<string, unknown>,
  startTime: number
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

  // Dynamic provider nodes are resolved once and reused for every target, the
  // same list the direct route builds.
  const dynamicProviders = await resolveDynamicAudioProviders("/audio/speech", "audio-speech");

  // Filter at model level, not provider level. parseSpeechModel resolves a
  // provider prefix without checking that the model behind it can speak, so a
  // chat model on a speech-capable provider (openai/gpt-4o) would otherwise be
  // accepted as a target and only fail once dispatched.
  const speechTargets = targets.filter((t) => {
    if (!t.modelStr) return false;
    const { provider, model } = parseSpeechModel(t.modelStr, dynamicProviders);
    if (!provider) return false;
    const config =
      getSpeechProvider(provider) || dynamicProviders.find((dp) => dp.id === provider) || null;
    if (!config) return false;
    // Dynamic provider nodes do not always enumerate their models; when the
    // list is absent there is nothing to check against, so the target stands.
    if (!Array.isArray(config.models) || config.models.length === 0) return true;
    return config.models.some((m: { id: string }) => m.id === model || m.id === t.modelStr);
  });

  if (speechTargets.length === 0) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `No speech-capable targets in combo "${comboName}"`
    );
  }

  let lastError: { status: number; error: string } | null = null;
  let fallbackCount = 0;

  for (const target of speechTargets) {
    const { provider: targetProvider, model: resolvedModel } = parseSpeechModel(
      target.modelStr,
      dynamicProviders
    );
    if (!targetProvider) {
      lastError = { status: 400, error: `Invalid speech model: ${target.modelStr}` };
      fallbackCount += 1;
      continue;
    }

    const providerConfig =
      getSpeechProvider(targetProvider) ||
      dynamicProviders.find((dp) => dp.id === targetProvider) ||
      null;

    let credentials = null;
    if (providerConfig && providerConfig.authType !== "none") {
      const credentialKey = providerConfig.credentialProviderId || targetProvider;
      try {
        credentials = await getProviderCredentialsWithQuotaPreflight(credentialKey);
      } catch {
        lastError = { status: 502, error: `Failed to resolve credentials for ${targetProvider}` };
        fallbackCount += 1;
        continue;
      }

      if (!credentials) {
        lastError = { status: 400, error: `No credentials for provider: ${targetProvider}` };
        fallbackCount += 1;
        continue;
      }

      if (isAllRateLimitedCredentials(credentials)) {
        lastError = { status: 429, error: `[${targetProvider}] All accounts rate limited` };
        fallbackCount += 1;
        continue;
      }
    }

    const response = await handleAudioSpeech({
      body: { ...body, model: target.modelStr },
      credentials,
      resolvedProvider: providerConfig,
      resolvedModel,
    });

    if (response?.ok) {
      await clearRecoveredProviderState(credentials);
      const characters = typeof body.input === "string" ? body.input.length : 0;
      const costUsd = await calculateModalCost(
        "audio",
        targetProvider,
        resolvedModel || target.modelStr,
        { characters }
      );
      return attachOmniRouteMetaToResponse(response, {
        provider: targetProvider,
        model: resolvedModel || target.modelStr,
        costUsd,
        latencyMs: Date.now() - startTime,
        requestId: generateRequestId(),
        strategy: "priority",
        fallbackAttempts: fallbackCount,
      });
    }

    const status = response?.status || 500;
    // The body is read only on the failure path, where it is small and about to
    // be discarded anyway; a successful audio stream is never consumed here.
    let error = `Speech generation failed (HTTP ${status})`;
    try {
      const text = await response?.clone().text();
      if (text) error = text.slice(0, 300);
    } catch {
      // non-text or already-consumed body — keep the status-line message
    }

    if (status === 400 || status === 401 || status === 403) {
      return errorResponse(status, `[${targetProvider}] ${error}`);
    }

    lastError = { status, error: `[${targetProvider}] ${error}` };
    fallbackCount += 1;
  }

  const errorPayload = toJsonErrorPayload(
    lastError?.error || "All combo targets failed",
    "Speech combo targets all failed"
  );
  return new Response(JSON.stringify(errorPayload), {
    status: lastError?.status || 502,
    headers: { "Content-Type": "application/json" },
  });
}
