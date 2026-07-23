import {
  getCodexDualWindowCooldownMs,
  getCodexModelScope,
  parseCodexQuotaHeaders,
} from "../../executors/codex.ts";
import { updateCodexScopedQuotaState } from "@/lib/db/providers";
import type { CodexQuotaScope } from "../../config/codexQuotaScopes.ts";

export interface PersistCodexChildQuotaResult {
  readonly scope: CodexQuotaScope;
  readonly providerSpecificData: Record<string, unknown>;
  readonly exhaustionLog: string | null;
}

/** Parse and atomically persist one virtual child's quota response evidence. */
export async function persistCodexChildQuotaResponse(params: {
  connectionId: string;
  model: string;
  headers: Record<string, string>;
  status: number;
  fallbackRateLimitedUntil?: string | null;
}): Promise<PersistCodexChildQuotaResult | null> {
  if (params.model.trim().length === 0) return null;
  const quota = parseCodexQuotaHeaders(params.headers);
  if (!quota) return null;

  const scope = getCodexModelScope(params.model);
  const quotaState = {
    usage5h: quota.usage5h,
    limit5h: quota.limit5h,
    resetAt5h: quota.resetAt5h,
    usage7d: quota.usage7d,
    limit7d: quota.limit7d,
    resetAt7d: quota.resetAt7d,
    observedAt: new Date().toISOString(),
  };
  let exhaustedWindow: "5h" | "7d" | undefined;
  let rateLimitedUntil: string | undefined;

  if (params.status === 429) {
    const exhausted = getCodexDualWindowCooldownMs(quota);
    if (exhausted.cooldownMs > 0 && exhausted.window !== "none") {
      exhaustedWindow = exhausted.window;
      rateLimitedUntil =
        exhausted.window === "7d" ? (quota.resetAt7d ?? undefined) : (quota.resetAt5h ?? undefined);
    } else if (params.fallbackRateLimitedUntil) {
      rateLimitedUntil = params.fallbackRateLimitedUntil;
    }
  }

  const providerSpecificData = await updateCodexScopedQuotaState(params.connectionId, scope, {
    quotaState,
    ...(exhaustedWindow ? { exhaustedWindow } : {}),
    ...(rateLimitedUntil
      ? {
          rateLimitedUntil,
          rateLimitSource: exhaustedWindow ? ("quota_reset" as const) : ("fallback" as const),
        }
      : {}),
  });
  if (!providerSpecificData) return null;

  return {
    scope,
    providerSpecificData,
    exhaustionLog:
      exhaustedWindow && rateLimitedUntil
        ? `Quota exhaustion on ${exhaustedWindow} window, cooldown until ${rateLimitedUntil}`
        : null,
  };
}
