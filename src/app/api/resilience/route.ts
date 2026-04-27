import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";
import {
  buildLegacyResilienceCompat,
  mergeResilienceSettings,
  resolveResilienceSettings,
  type ResilienceSettings,
  type ResilienceSettingsPatch,
} from "@/lib/resilience/settings";
import { updateResilienceSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

function normalizeLegacyPatch(body: JsonRecord): ResilienceSettingsPatch {
  const profiles = asRecord(body.profiles);
  const defaults = asRecord(body.defaults);
  const oauth = asRecord(profiles.oauth);
  const apikey = asRecord(profiles.apikey);

  const patch: ResilienceSettingsPatch = {};

  if (Object.keys(defaults).length > 0) {
    patch.requestQueue = {
      ...(typeof defaults.requestsPerMinute === "number"
        ? { requestsPerMinute: defaults.requestsPerMinute }
        : {}),
      ...(typeof defaults.minTimeBetweenRequests === "number"
        ? { minTimeBetweenRequestsMs: defaults.minTimeBetweenRequests }
        : {}),
      ...(typeof defaults.concurrentRequests === "number"
        ? { concurrentRequests: defaults.concurrentRequests }
        : {}),
    };
  }

  if (Object.keys(oauth).length > 0 || Object.keys(apikey).length > 0) {
    const buildLegacyCooldownPatch = (profile: JsonRecord) => {
      const cooldownCandidates = [
        typeof profile.transientCooldown === "number" ? profile.transientCooldown : null,
        typeof profile.rateLimitCooldown === "number" && profile.rateLimitCooldown > 0
          ? profile.rateLimitCooldown
          : null,
      ].filter((value): value is number => typeof value === "number");

      return {
        ...(cooldownCandidates.length > 0
          ? { baseCooldownMs: Math.max(...cooldownCandidates) }
          : {}),
        ...(typeof profile.rateLimitCooldown === "number"
          ? { useUpstreamRetryHints: profile.rateLimitCooldown === 0 }
          : {}),
        ...(typeof profile.maxBackoffLevel === "number"
          ? { maxBackoffSteps: profile.maxBackoffLevel }
          : {}),
      };
    };

    patch.connectionCooldown = {
      ...(Object.keys(oauth).length > 0
        ? {
            oauth: buildLegacyCooldownPatch(oauth),
          }
        : {}),
      ...(Object.keys(apikey).length > 0
        ? {
            apikey: buildLegacyCooldownPatch(apikey),
          }
        : {}),
    };

    patch.providerBreaker = {
      ...(Object.keys(oauth).length > 0
        ? {
            oauth: {
              ...(typeof oauth.circuitBreakerThreshold === "number"
                ? { failureThreshold: oauth.circuitBreakerThreshold }
                : {}),
              ...(typeof oauth.circuitBreakerReset === "number"
                ? { resetTimeoutMs: oauth.circuitBreakerReset }
                : {}),
            },
          }
        : {}),
      ...(Object.keys(apikey).length > 0
        ? {
            apikey: {
              ...(typeof apikey.circuitBreakerThreshold === "number"
                ? { failureThreshold: apikey.circuitBreakerThreshold }
                : {}),
              ...(typeof apikey.circuitBreakerReset === "number"
                ? { resetTimeoutMs: apikey.circuitBreakerReset }
                : {}),
            },
          }
        : {}),
    };
  }

  return patch;
}

async function syncRuntimeSettings(resilienceSettings: ResilienceSettings) {
  const { applyRequestQueueSettings } =
    await import("@omniroute/open-sse/services/rateLimitManager");
  await applyRequestQueueSettings(resilienceSettings.requestQueue);
}

/**
 * GET /api/resilience — Get current resilience configuration
 */
export async function GET() {
  try {
    const settings = await getSettings();
    const resilience = resolveResilienceSettings(settings);

    return NextResponse.json({
      requestQueue: resilience.requestQueue,
      connectionCooldown: resilience.connectionCooldown,
      providerBreaker: resilience.providerBreaker,
      waitForCooldown: {
        enabled: resilience.waitForCooldown.enabled,
        maxRetries: resilience.waitForCooldown.maxRetries,
        maxRetryWaitSec: resilience.waitForCooldown.maxRetryWaitSec,
      },
      legacy: buildLegacyResilienceCompat(resilience),
    });
  } catch (err: unknown) {
    console.error("[API] GET /api/resilience error:", err);
    return NextResponse.json(
      { error: getErrorMessage(err, "Failed to load resilience settings") },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/resilience — Update resilience configuration
 */
export async function PATCH(request) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(updateResilienceSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const body = validation.data as JsonRecord;
    const currentSettings = await getSettings();
    const currentResilience = resolveResilienceSettings(currentSettings);
    const nextResilience = mergeResilienceSettings(currentResilience, {
      ...(body.requestQueue
        ? { requestQueue: body.requestQueue as ResilienceSettingsPatch["requestQueue"] }
        : {}),
      ...(body.connectionCooldown
        ? {
            connectionCooldown:
              body.connectionCooldown as ResilienceSettingsPatch["connectionCooldown"],
          }
        : {}),
      ...(body.providerBreaker
        ? { providerBreaker: body.providerBreaker as ResilienceSettingsPatch["providerBreaker"] }
        : {}),
      ...(body.waitForCooldown
        ? { waitForCooldown: body.waitForCooldown as ResilienceSettingsPatch["waitForCooldown"] }
        : {}),
      ...normalizeLegacyPatch(body),
    });

    await updateSettings({
      resilienceSettings: nextResilience,
      requestRetry: nextResilience.waitForCooldown.maxRetries,
      maxRetryIntervalSec: nextResilience.waitForCooldown.maxRetryWaitSec,
    });
    await syncRuntimeSettings(nextResilience);

    return NextResponse.json({
      ok: true,
      requestQueue: nextResilience.requestQueue,
      connectionCooldown: nextResilience.connectionCooldown,
      providerBreaker: nextResilience.providerBreaker,
      waitForCooldown: {
        enabled: nextResilience.waitForCooldown.enabled,
        maxRetries: nextResilience.waitForCooldown.maxRetries,
        maxRetryWaitSec: nextResilience.waitForCooldown.maxRetryWaitSec,
      },
      legacy: buildLegacyResilienceCompat(nextResilience),
    });
  } catch (err: unknown) {
    console.error("[API] PATCH /api/resilience error:", err);
    return NextResponse.json(
      { error: getErrorMessage(err, "Failed to save resilience settings") },
      { status: 500 }
    );
  }
}
