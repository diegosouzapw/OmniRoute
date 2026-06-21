/**
 * chatCore Codex quota-persistence builder (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Pure core of handleChatCore's persistCodexQuotaState: turns the upstream Codex quota response
 * headers into the next `providerSpecificData` payload (the codexQuotaState snapshot, plus — on a
 * 429 whose dual-window usage is past the exhaustion threshold — the per-scope cooldown timestamp,
 * the exhausted window, and the debug-log message). The handler keeps the impure parts byte-
 * identically: the DB write (updateProviderConnection), the preflight-cache invalidation on every
 * 429, the credentials mutation, and emitting the returned log line.
 */

import {
  parseCodexQuotaHeaders,
  getCodexModelScope,
  getCodexDualWindowCooldownMs,
} from "../../executors/codex.ts";

export type CodexQuotaPersistence = {
  /** The merged providerSpecificData to persist (existing data + codexQuotaState [+ 429 cooldown]). */
  nextProviderData: Record<string, unknown>;
  /** The CODEX debug-log message to emit when a 429 exhausted a window, else null. */
  exhaustionLog: string | null;
};

/**
 * Build the providerSpecificData update for a Codex quota response. Returns null when the response
 * carries no quota headers (nothing to persist). Pure: a function of the headers, the existing
 * provider data, the model used for scope resolution, and the upstream status.
 */
export function buildCodexQuotaPersistence(opts: {
  headers: Record<string, string>;
  existingProviderData: Record<string, unknown>;
  modelForScope: string;
  status: number;
}): CodexQuotaPersistence | null {
  const { headers, existingProviderData, modelForScope, status } = opts;

  const quota = parseCodexQuotaHeaders(headers);
  if (!quota) return null;

  const scope = getCodexModelScope(modelForScope);
  const quotaState = {
    usage5h: quota.usage5h,
    limit5h: quota.limit5h,
    resetAt5h: quota.resetAt5h,
    usage7d: quota.usage7d,
    limit7d: quota.limit7d,
    resetAt7d: quota.resetAt7d,
    scope,
    updatedAt: new Date().toISOString(),
  };

  const nextProviderData: Record<string, unknown> = {
    ...existingProviderData,
    codexQuotaState: quotaState,
  };

  let exhaustionLog: string | null = null;

  // T03/T09: on 429, persist exact reset time per scope to avoid global over-blocking.
  // Use dual-window cooldown to distinguish short-term and weekly Codex exhaustion.
  if (status === 429) {
    const { cooldownMs, window: exhaustedWindow } = getCodexDualWindowCooldownMs(quota);
    if (cooldownMs > 0) {
      const scopeUntil = new Date(Date.now() + cooldownMs).toISOString();
      const scopeMapRaw =
        existingProviderData &&
        typeof existingProviderData === "object" &&
        existingProviderData.codexScopeRateLimitedUntil &&
        typeof existingProviderData.codexScopeRateLimitedUntil === "object"
          ? existingProviderData.codexScopeRateLimitedUntil
          : {};

      nextProviderData.codexScopeRateLimitedUntil = {
        ...(scopeMapRaw as Record<string, unknown>),
        [scope]: scopeUntil,
      };
      nextProviderData.codexExhaustedWindow = exhaustedWindow;
      exhaustionLog = `Quota exhaustion on ${exhaustedWindow} window, cooldown until ${scopeUntil}`;
    }
  }

  return { nextProviderData, exhaustionLog };
}
