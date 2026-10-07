import { persistCodexChildCooldown } from "@omniroute/open-sse/services/codexAccount/index.ts";
import { persistAntigravityPreflightFamilyLock } from "@omniroute/open-sse/services/antigravityFamilyCooldown.ts";
import { isAntigravityQuotaProvider } from "@omniroute/open-sse/services/antigravityQuotaFamily.ts";
import { cooldownUntilMs } from "@omniroute/open-sse/services/accountFallback.ts";
import { updateProviderConnection } from "@/lib/db/providers";

function parseFutureDateMs(value: string | null): number | null {
  if (!value) return null;
  const ms = cooldownUntilMs(value);
  if (!Number.isFinite(ms) || ms <= Date.now()) return null;
  return ms;
}

function quotaPreflightUnavailableUntil(resetAt?: string | null): string {
  const resetMs = parseFutureDateMs(resetAt ?? null);
  return new Date(resetMs ?? Date.now() + 5 * 60 * 1000).toISOString();
}

export async function markQuotaPreflightAccountUnavailable(
  provider: string,
  connectionId: string,
  preflight: { quotaPercent?: number; resetAt?: string | null },
  requestedModel: string | null
): Promise<string> {
  const unavailableUntil = quotaPreflightUnavailableUntil(preflight.resetAt ?? null);
  if (provider === "codex" && requestedModel?.trim()) {
    await persistCodexChildCooldown({
      connectionId,
      model: requestedModel,
      rateLimitedUntil: unavailableUntil,
    });
    return unavailableUntil;
  }

  if (isAntigravityQuotaProvider(provider) && requestedModel?.trim()) {
    await persistAntigravityPreflightFamilyLock({
      provider,
      connectionId,
      model: requestedModel,
      unavailableUntil,
    });
    return unavailableUntil;
  }

  const percentLabel = Number.isFinite(preflight.quotaPercent)
    ? `${Math.round((preflight.quotaPercent as number) * 100)}%`
    : "exhausted";
  const modelLabel = requestedModel ? ` for ${requestedModel}` : "";

  await updateProviderConnection(connectionId, {
    rateLimitedUntil: unavailableUntil,
    testStatus: "unavailable",
    lastError: `Quota preflight blocked${modelLabel}: ${percentLabel}`,
    lastErrorType: "quota_exhausted",
    lastErrorSource: "quota_preflight",
    errorCode: 429,
    lastErrorAt: new Date().toISOString(),
  });

  return unavailableUntil;
}
