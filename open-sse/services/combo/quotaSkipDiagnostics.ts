/**
 * Redacted-safe quota-window skip rows for ALL_TARGETS_SKIPPED 503 bodies.
 * Connection ids are prefix-only (8 chars). Labels match AUTH / usage API.
 */

import { getQuotaCache } from "@/domain/quotaCache";
import { formatQuotaWindowLabel } from "../quotaWindowLabel.ts";

export type QuotaSkipTarget = {
  provider?: string;
  model?: string;
  modelStr?: string;
  // `string | null`, not `string | undefined`: ResolvedComboTarget carries null for an
  // unpinned target, and this module only reads the field. Line 29 already narrows with
  // `typeof === "string"`, so null costs nothing here (TS2345 under typecheck:core).
  connectionId?: string | null;
};

export type QuotaSkipExclusion = {
  provider: string;
  model?: string;
  reason: string;
};

const EXHAUSTED_USED_PERCENT = 99;

export function collectQuotaWindowExclusions(targets: QuotaSkipTarget[]): QuotaSkipExclusion[] {
  const seen = new Set<string>();
  const out: QuotaSkipExclusion[] = [];

  for (const target of targets) {
    const connectionId = typeof target.connectionId === "string" ? target.connectionId : "";
    if (!connectionId) continue;
    const entry = getQuotaCache(connectionId);
    if (!entry?.quotas) continue;

    const provider =
      typeof target.provider === "string" && target.provider ? target.provider : "unknown";
    const model =
      (typeof target.modelStr === "string" && target.modelStr) ||
      (typeof target.model === "string" && target.model) ||
      undefined;
    const connPrefix = connectionId.slice(0, 8);

    for (const [key, quota] of Object.entries(entry.quotas)) {
      const remaining = quota.remainingPercentage;
      if (typeof remaining !== "number" || !Number.isFinite(remaining)) continue;
      const used = Math.max(0, Math.min(100, 100 - remaining));
      if (used < EXHAUSTED_USED_PERCENT) continue;

      const label = formatQuotaWindowLabel({
        key,
        displayName: quota.displayName,
        windowSeconds: quota.windowSeconds,
      });
      const reason = `quota:${label} ${Math.round(used)}% conn:${connPrefix}`;
      const dedupe = `${provider}|${model ?? ""}|${reason}`;
      if (seen.has(dedupe)) continue;
      seen.add(dedupe);
      out.push({
        provider,
        ...(model ? { model } : {}),
        reason,
      });
    }
  }

  return out;
}

export function formatQuotaSkipMessage(exclusions: QuotaSkipExclusion[]): string | null {
  if (exclusions.length === 0) return null;
  const windows = [...new Set(exclusions.map((row) => row.reason.replace(/^quota:/, "")))];
  return windows.slice(0, 4).join("; ");
}
