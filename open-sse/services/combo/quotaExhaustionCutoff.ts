/**
 * Quota-exhaustion cutoff helpers for combo routing.
 *
 * Home of the opt-in per-(provider, connection, window) quota-exhaustion cutoff
 * shared by the "auto" strategy candidate builder (`buildAutoQuotaThresholds`,
 * consumed by combo.ts::buildAutoCandidates) and the per-target eligibility loop
 * (`resolveQuotaExhaustionCutoffForTarget`, consumed by combo.ts::handleComboChat
 * for every non-auto strategy). Extracted from combo.ts (#5923 Finding #4) to
 * keep the god-file under its frozen size cap; behavior is byte-identical.
 *
 * Pure leaf: this module never imports from the combo barrel. Threshold math and
 * cutoff evaluation are delegated to ./quotaPreflight.ts; the reset-aware quota
 * fetch/cache is delegated to ./quotaStrategies.ts.
 */

import {
  evaluateQuotaCutoff,
  getQuotaFetcher,
  type PreflightQuotaThresholds,
  type QuotaInfo,
} from "../quotaPreflight.ts";
import { getProviderConnectionById } from "../../../src/lib/db/providers";
import {
  resolveResilienceSettings,
  type ResilienceSettings,
} from "../../../src/lib/resilience/settings";
import { fetchResetAwareQuotaWithCache } from "./quotaStrategies.ts";
import type { ResetWindowConfig } from "./quotaScoring.ts";

function asThresholdMap(value: unknown): Record<string, number> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const result: Record<string, number> = {};
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    const numeric = Number(raw);
    if (key && Number.isFinite(numeric)) result[key] = numeric;
  }
  return result;
}

function quotaWindowLookupNames(provider: string, windowName: string): string[] {
  const names = [windowName];
  const lower = windowName.toLowerCase();
  if (lower !== windowName) names.push(lower);
  if (provider === "codex") {
    if (lower.includes("session") || lower === "5h" || lower === "five_hour") names.push("session");
    if (lower.includes("weekly") || lower === "7d" || lower === "seven_day") names.push("weekly");
    if (lower.includes("monthly") || lower === "30d") names.push("monthly");
  }
  return [...new Set(names)];
}

export function buildAutoQuotaThresholds(
  provider: string,
  connection: Record<string, unknown> | undefined,
  resilienceSettings: ResilienceSettings | null | undefined
): PreflightQuotaThresholds {
  const quotaPreflight = (resilienceSettings ?? resolveResilienceSettings(null))?.quotaPreflight;
  const defaultThresholdPercent = quotaPreflight?.defaultThresholdPercent ?? 2;
  const warnThresholdPercent = quotaPreflight?.warnThresholdPercent ?? 20;
  const providerWindowMap = asThresholdMap(quotaPreflight?.providerWindowDefaults?.[provider]);
  const perConnectionWindowOverrides = asThresholdMap(connection?.quotaWindowThresholds);

  return {
    resolveMinRemainingPercent: (windowName: string | null): number => {
      if (windowName !== null) {
        for (const lookupWindowName of quotaWindowLookupNames(provider, windowName)) {
          const override = perConnectionWindowOverrides[lookupWindowName];
          if (typeof override === "number") return override;
          const providerDefault = providerWindowMap[lookupWindowName];
          if (typeof providerDefault === "number") return providerDefault;
        }
      }
      return defaultThresholdPercent;
    },
    resolveWarnRemainingPercent: () => warnThresholdPercent,
  };
}

/**
 * #5923 (Finding #4) — Shared quota-exhaustion cutoff predicate, scoped strictly
 * per (provider, connectionId, model window). Extracted from the inline logic
 * that `buildAutoCandidates` has always used (fetch via the SAME
 * `fetchResetAwareQuotaWithCache` cache, evaluate via the SAME pure
 * `evaluateQuotaCutoff` + `buildAutoQuotaThresholds`), so priority/weighted/etc.
 * strategies honor the operator's configured quota cutoff instead of only the
 * "auto" strategy.
 *
 * Gated behind the SAME opt-in setting as the auto-strategy cutoff
 * (`resilienceSettings.quotaPreflight.enabled`) — when that setting is off this
 * is a no-op, exactly like the auto path. Never touches the provider circuit
 * breaker; a blocked result only means "skip this one connection", leaving
 * every sibling connection/model for the same provider fully eligible.
 */
export async function resolveQuotaExhaustionCutoffForTarget(
  provider: string,
  connectionId: string | undefined,
  resilienceSettings: ResilienceSettings | null | undefined,
  resetWindowConfig: ResetWindowConfig,
  comboName: string,
  log: { debug?: (...args: unknown[]) => void; warn?: (...args: unknown[]) => void }
): Promise<{ blocked: boolean; reason?: string }> {
  const quotaCutoffEnabled =
    (resilienceSettings ?? resolveResilienceSettings(null))?.quotaPreflight?.enabled === true;
  if (!quotaCutoffEnabled || !provider || !connectionId) return { blocked: false };

  const fetcher = getQuotaFetcher(provider);
  if (!fetcher) return { blocked: false };

  let connection: Record<string, unknown> | undefined;
  try {
    connection = (await getProviderConnectionById(connectionId)) as
      | Record<string, unknown>
      | undefined;
  } catch {
    connection = undefined;
  }

  try {
    const quota = await fetchResetAwareQuotaWithCache({
      provider,
      connectionId,
      connection,
      fetcher,
      config: resetWindowConfig,
      log,
      comboName,
    });
    const cutoffDecision = evaluateQuotaCutoff(
      quota as QuotaInfo | null,
      buildAutoQuotaThresholds(provider, connection, resilienceSettings)
    );
    if (!cutoffDecision.proceed) {
      return { blocked: true, reason: cutoffDecision.reason || "quota_exhausted" };
    }
  } catch {
    // Fail-open: never block routing because the preflight fetch itself errored.
    return { blocked: false };
  }
  return { blocked: false };
}
