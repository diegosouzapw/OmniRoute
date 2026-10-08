// Allow large audio/video file uploads — 5min for processing large files (up to 2GB)
export const maxDuration = 300;
import { handleAudioTranscription } from "@omniroute/open-sse/handlers/audioTranscription.ts";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import {
  parseTranscriptionModel,
  getTranscriptionProvider,
  audioModelAliasCandidates,
  findAlternateAudioProvider,
  listAlternateAudioModelIds,
  missingAudioProviderCredentialsMessage,
  AUDIO_TRANSCRIPTION_PROVIDERS,
} from "@omniroute/open-sse/config/audioRegistry.ts";
import { resolveDynamicAudioProviders } from "@/app/api/v1/_shared/audioProviderNodes";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";
import { attachOmniRouteMetaToResponse } from "@/domain/omnirouteResponseMeta";
import { generateRequestId } from "@/shared/utils/requestId";
import { getComboByName, getCombos } from "@/lib/db/combos";
import { getDatabaseSettings } from "@/lib/db/databaseSettings";
import { handleComboChat } from "@omniroute/open-sse/services/combo.ts";
import { log } from "@omniroute/open-sse/utils/logger.ts";
import { saveCallLog } from "@/lib/usageDb";

/**
 * Best-effort peek at a successful transcription response for upstream duration
 * usage (e.g. Scaleway's `usage: {type:"duration", seconds:N}`) so it is at least
 * visible/auditable on the call_logs row even before a per-second cost rule
 * consumes it (#13544). Never touches the original response body/stream — reads
 * a clone, and any parse failure is swallowed so logging never blocks the reply.
 */
export async function peekDurationUsage(
  response: Response
): Promise<{ type?: string; seconds?: number } | undefined> {
  try {
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) return undefined;
    const parsed = (await response.clone().json()) as { usage?: unknown } | null;
    const usage = parsed && typeof parsed === "object" ? parsed.usage : null;
    if (usage && typeof usage === "object" && (usage as { type?: unknown }).type === "duration") {
      return usage as { type?: string; seconds?: number };
    }
  } catch {
    // Best-effort only — the transcription response itself already succeeded.
  }
  return undefined;
}

/**
 * Copy a multipart body, swapping only the `model` field. Combo fan-out needs one
 * body per target, and the uploaded file part is reused as-is (a Blob can be read
 * more than once).
 */
function withModel(formData: FormData, modelStr: string): FormData {
  const next = new FormData();
  for (const [key, value] of formData.entries()) {
    if (key === "model") continue;
    next.append(key, value as string | Blob);
  }
  next.set("model", modelStr);
  return next;
}

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * Transcribe with one concrete `provider/model` string. Split out of POST so combo
 * fan-out can invoke it once per target.
 */
async function transcribeWithModel(
  formData: FormData,
  modelStr: string,
  startTime: number,
  apiKeyId?: string | null,
  apiKeyName?: string | null
): Promise<Response> {
  // Provider nodes eligible for transcription: this route's own audio type plus
  // general chat/responses gateways. Remote hosts are opt-in (default OFF).
  const dynamicProviders = await resolveDynamicAudioProviders(
    "/audio/transcriptions",
    "audio-transcriptions"
  );

  const parsed = parseTranscriptionModel(modelStr, dynamicProviders);
  let provider = parsed.provider;
  let resolvedModel = parsed.model;
  if (!provider) {
    return errorResponse(
      HTTP_STATUS.BAD_REQUEST,
      `Invalid transcription model: ${modelStr}. Use format: provider/model`
    );
  }

  // Check provider config — hardcoded first, then dynamic
  let providerConfig =
    getTranscriptionProvider(provider) || dynamicProviders.find((dp) => dp.id === provider) || null;

  // Get credentials — skip for local providers (authType: "none").
  // A dynamic node is addressed by its prefix but stores connections under the node
  // id, so credentials must be looked up under `credentialProviderId` when present.
  let credentials = null;
  if (providerConfig && providerConfig.authType !== "none") {
    const credentialKey = providerConfig.credentialProviderId || provider;
    // NOTE: the 2nd arg of this helper is `excludeConnectionId`, not "use this
    // connection" — a combo target's connectionId must never be passed here.
    credentials = await getProviderCredentialsWithQuotaPreflight(credentialKey);
    // Prefix match wins (`deepgram/nova-3` → native Deepgram). If that
    // provider has no credentials, retry gateways that list the same nested
    // model id (e.g. OpenRouter's `deepgram/nova-3`).
    if (!credentials) {
      const candidates = audioModelAliasCandidates(modelStr, provider, resolvedModel);
      const alternate = findAlternateAudioProvider(
        AUDIO_TRANSCRIPTION_PROVIDERS,
        provider,
        candidates
      );
      if (alternate) {
        const alternateCredentials = await getProviderCredentialsWithQuotaPreflight(
          alternate.provider
        );
        if (alternateCredentials && !isAllRateLimitedCredentials(alternateCredentials)) {
          provider = alternate.provider;
          resolvedModel = alternate.model;
          providerConfig = alternate.config;
          credentials = alternateCredentials;
        }
      }
    }
    if (!credentials) {
      const candidates = audioModelAliasCandidates(modelStr, provider, resolvedModel);
      return errorResponse(
        HTTP_STATUS.BAD_REQUEST,
        missingAudioProviderCredentialsMessage(
          provider,
          listAlternateAudioModelIds(AUDIO_TRANSCRIPTION_PROVIDERS, provider, candidates)
        )
      );
    }
    if (isAllRateLimitedCredentials(credentials)) {
      return rateLimitedProviderResponse(provider, credentials);
    }
  }

  let response = await handleAudioTranscription({
    formData,
    credentials,
    resolvedProvider: providerConfig,
    resolvedModel,
  });

  const connectionId = (credentials as { connectionId?: string } | null)?.connectionId || undefined;
  const logModel = `${provider}/${resolvedModel}`;

  if (response?.ok) {
    await clearRecoveredProviderState(credentials);
    const durationUsage = await peekDurationUsage(response);
    // No per-second pricing rule exists yet for transcription duration → cost 0
    // (ADD-only headers, body intact). The upstream usage is still persisted on
    // the call_logs row below so it is auditable ahead of that pricing rule.
    response = attachOmniRouteMetaToResponse(response, {
      provider,
      model: resolvedModel,
      costUsd: 0,
      latencyMs: Date.now() - startTime,
      requestId: generateRequestId(),
    });
    saveCallLog({
      method: "POST",
      path: "/v1/audio/transcriptions",
      status: 200,
      model: logModel,
      provider,
      connectionId,
      duration: Date.now() - startTime,
      responseBody: durationUsage ? { usage: durationUsage } : undefined,
      apiKeyId: apiKeyId || undefined,
      apiKeyName: apiKeyName || undefined,
    }).catch(() => {});
  } else if (response) {
    const errorText = await response
      .clone()
      .text()
      .catch(() => "");
    saveCallLog({
      method: "POST",
      path: "/v1/audio/transcriptions",
      status: response.status,
      model: logModel,
      provider,
      connectionId,
      duration: Date.now() - startTime,
      error: errorText.slice(0, 500),
      apiKeyId: apiKeyId || undefined,
      apiKeyName: apiKeyName || undefined,
    }).catch(() => {});
  }
  return response;
}

/**
 * POST /v1/audio/transcriptions — transcribe audio files
 * OpenAI Whisper API compatible (multipart/form-data)
 */
export async function POST(request) {
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Invalid multipart form data");
  }

  const startTime = Date.now();

  const model = formData.get("model");
  if (!model) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing model");
  }
  const modelStr = String(model);

  // Enforce API key policies (model restrictions + budget limits)
  const policy = await enforceApiKeyPolicy(request, modelStr);
  if (policy.rejection) return policy.rejection;

  // Forwarded into transcribeWithModel() (and combo fan-out below) so the
  // resulting call_logs row is attributable to the API key that made the
  // request, matching the pattern every other proxied route follows (#13544).
  const apiKeyId = policy.apiKeyInfo?.id || null;
  const apiKeyName = policy.apiKeyInfo?.name || null;

  // A bare name (no "/") may be a combo. /v1/models advertises combos, and chat and
  // embeddings both resolve them — resolving here too keeps the catalog honest and
  // frees callers from hardcoding a provider's internal model id.
  if (!modelStr.includes("/")) {
    try {
      const combo = await getComboByName(modelStr);
      if (combo) {
        let allCombos: Awaited<ReturnType<typeof getCombos>> = [];
        try {
          allCombos = await getCombos();
        } catch {}
        let settings = {};
        try {
          settings = getDatabaseSettings();
        } catch {}

        return handleComboChat({
          body: { model: modelStr } as any,
          combo: combo as any,
          handleSingleModel: async (_reqBody: any, targetModelStr: string) =>
            transcribeWithModel(
              withModel(formData, targetModelStr),
              targetModelStr,
              startTime,
              apiKeyId,
              apiKeyName
            ),
          isModelAvailable: undefined,
          log,
          settings,
          allCombos: allCombos as any,
          relayOptions: undefined,
          signal: undefined,
        } as any);
      }
    } catch (err) {
      log.error("AUDIO", `Combo resolution failed for ${modelStr}: ${err}`);
    }
  }

  return transcribeWithModel(formData, modelStr, startTime, apiKeyId, apiKeyName);
}
