"use client";

import { useCallback, useState } from "react";

import { useNotificationStore } from "@/store/notificationStore";
import { parseQuotaData } from "./utils";
import type { UsageTranslationValues } from "./i18nFallback";

type TranslateUsage = (key: string, fallback: string, values?: UsageTranslationValues) => string;

export function useCodexResetCreditRedemption(
  tr: TranslateUsage,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string | null>>>,
  setQuotaData: React.Dispatch<React.SetStateAction<Record<string, any>>>,
  setLastRefreshedAt: React.Dispatch<React.SetStateAction<Record<string, string>>>
) {
  const notify = useNotificationStore();
  const [redeemingResetCreditId, setRedeemingResetCreditId] = useState<string | null>(null);

  const redeemCodexResetCredit = useCallback(
    async (connectionId: string, provider: string) => {
      if (provider !== "codex" || redeemingResetCreditId) return;

      const confirmed = window.confirm(
        tr(
          "confirmRedeemResetCredit",
          "Redeem one Codex reset credit for this account? This consumes one reset credit."
        )
      );
      if (!confirmed) return;

      const idempotencyKey =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      setRedeemingResetCreditId(connectionId);
      setErrors((prev) => ({ ...prev, [connectionId]: null }));

      try {
        const response = await fetch("/api/usage/codex-reset-credit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ connectionId, idempotencyKey }),
        });
        const data = await response.json().catch(() => ({}));

        if (!response.ok) throw new Error(data.error || response.statusText);

        const usage = data.usage || {};
        setQuotaData((prev) => ({
          ...prev,
          [connectionId]: {
            quotas: parseQuotaData(provider, usage),
            plan: usage.plan || null,
            message: usage.message || null,
            raw: usage,
            stale: usage._stale ? { since: usage._staleSince, reason: usage._staleReason } : null,
          },
        }));
        setLastRefreshedAt((prev) => ({ ...prev, [connectionId]: new Date().toISOString() }));
        notify.success(tr("resetCreditRedeemed", "Reset redeemed"));
      } catch (error: any) {
        const message =
          error?.message || tr("resetCreditRedeemFailed", "Failed to redeem reset credit");
        setErrors((prev) => ({ ...prev, [connectionId]: message }));
        notify.error(message);
      } finally {
        setRedeemingResetCreditId(null);
      }
    },
    [notify, redeemingResetCreditId, setErrors, setLastRefreshedAt, setQuotaData, tr]
  );

  return { redeemCodexResetCredit, redeemingResetCreditId };
}
