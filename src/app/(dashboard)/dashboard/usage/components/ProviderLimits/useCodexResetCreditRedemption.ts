"use client";

import { useCallback, useRef, useState } from "react";

import { useNotificationStore } from "@/store/notificationStore";
import { parseQuotaData } from "./utils";
import type { UsageTranslationValues } from "./i18nFallback";

type TranslateUsage = (key: string, fallback: string, values?: UsageTranslationValues) => string;

export interface CodexResetCreditView {
  selectionToken: string;
  resetType?: string;
  status?: string;
  grantedAt?: string;
  expiresAt?: string | null;
  title?: string;
  description?: string;
}

interface ResetCreditPickerState {
  connectionId: string;
  provider: string;
  credits: CodexResetCreditView[];
  availableCount: number;
}

function createIdempotencyKey(): string {
  return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function useCodexResetCreditRedemption(
  tr: TranslateUsage,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string | null>>>,
  setQuotaData: React.Dispatch<React.SetStateAction<Record<string, any>>>,
  setLastRefreshedAt: React.Dispatch<React.SetStateAction<Record<string, string>>>
) {
  const notify = useNotificationStore();
  const [redeemingResetCreditId, setRedeemingResetCreditId] = useState<string | null>(null);
  const [loadingResetCreditsId, setLoadingResetCreditsId] = useState<string | null>(null);
  const [resetCreditPicker, setResetCreditPicker] = useState<ResetCreditPickerState | null>(null);
  const idempotencyKeysRef = useRef<Record<string, string>>({});

  const openCodexResetCredits = useCallback(
    async (connectionId: string, provider: string) => {
      if (provider !== "codex" || loadingResetCreditsId || redeemingResetCreditId) return;

      setLoadingResetCreditsId(connectionId);
      setErrors((prev) => ({ ...prev, [connectionId]: null }));

      try {
        const response = await fetch(
          `/api/usage/codex-reset-credit?connectionId=${encodeURIComponent(connectionId)}`,
          { cache: "no-store" }
        );
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || response.statusText);

        idempotencyKeysRef.current = {};
        setResetCreditPicker({
          connectionId,
          provider,
          credits: Array.isArray(data.credits) ? data.credits : [],
          availableCount: Number.isFinite(Number(data.availableCount))
            ? Number(data.availableCount)
            : 0,
        });
      } catch (error: any) {
        const message =
          error?.message || tr("resetCreditsLoadFailed", "Failed to load reset credits");
        setErrors((prev) => ({ ...prev, [connectionId]: message }));
        notify.error(message);
      } finally {
        setLoadingResetCreditsId(null);
      }
    },
    [loadingResetCreditsId, notify, redeemingResetCreditId, setErrors, tr]
  );

  const redeemCodexResetCredit = useCallback(
    async (selectionToken: string) => {
      const picker = resetCreditPicker;
      if (!picker || redeemingResetCreditId || !selectionToken) return;

      const idempotencyKey =
        idempotencyKeysRef.current[selectionToken] ??
        (idempotencyKeysRef.current[selectionToken] = createIdempotencyKey());

      setRedeemingResetCreditId(picker.connectionId);
      setErrors((prev) => ({ ...prev, [picker.connectionId]: null }));

      try {
        const response = await fetch("/api/usage/codex-reset-credit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            connectionId: picker.connectionId,
            idempotencyKey,
            creditId: selectionToken,
          }),
        });
        const data = await response.json().catch(() => ({}));

        if (!response.ok) throw new Error(data.error || response.statusText);

        const usage = data.usage || {};
        setQuotaData((prev) => ({
          ...prev,
          [picker.connectionId]: {
            quotas: parseQuotaData(picker.provider, usage),
            plan: usage.plan || null,
            message: usage.message || null,
            raw: usage,
            stale: usage._stale ? { since: usage._staleSince, reason: usage._staleReason } : null,
          },
        }));
        setLastRefreshedAt((prev) => ({
          ...prev,
          [picker.connectionId]: new Date().toISOString(),
        }));
        setResetCreditPicker(null);
        idempotencyKeysRef.current = {};
        notify.success(tr("resetCreditRedeemed", "Reset redeemed"));
      } catch (error: any) {
        const message =
          error?.message || tr("resetCreditRedeemFailed", "Failed to redeem reset credit");
        setErrors((prev) => ({ ...prev, [picker.connectionId]: message }));
        notify.error(message);
      } finally {
        setRedeemingResetCreditId(null);
      }
    },
    [
      notify,
      redeemingResetCreditId,
      resetCreditPicker,
      setErrors,
      setLastRefreshedAt,
      setQuotaData,
      tr,
    ]
  );

  return {
    closeResetCreditPicker: () => setResetCreditPicker(null),
    loadingResetCreditsId,
    openCodexResetCredits,
    redeemCodexResetCredit,
    redeemingResetCreditId,
    resetCreditPicker,
  };
}
