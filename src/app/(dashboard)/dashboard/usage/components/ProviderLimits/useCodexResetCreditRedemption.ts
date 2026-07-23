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

type SetErrors = React.Dispatch<React.SetStateAction<Record<string, string | null>>>;
type SetQuotaData = React.Dispatch<React.SetStateAction<Record<string, any>>>;
type SetLastRefreshedAt = React.Dispatch<React.SetStateAction<Record<string, string>>>;

interface ResetCreditRequestState {
  idempotencyKeysRef: React.MutableRefObject<Record<string, string>>;
  redeemingResetCreditId: string | null;
  resetCreditPicker: ResetCreditPickerState | null;
  setErrors: SetErrors;
  setLastRefreshedAt: SetLastRefreshedAt;
  setQuotaData: SetQuotaData;
  setRedeemingResetCreditId: React.Dispatch<React.SetStateAction<string | null>>;
  setResetCreditPicker: React.Dispatch<React.SetStateAction<ResetCreditPickerState | null>>;
  tr: TranslateUsage;
}

function createIdempotencyKey(): string {
  return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getRequestErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

function useOpenCodexResetCredits(
  loadingResetCreditsId: string | null,
  redeemingResetCreditId: string | null,
  setErrors: SetErrors,
  setLoadingResetCreditsId: React.Dispatch<React.SetStateAction<string | null>>,
  setResetCreditPicker: React.Dispatch<React.SetStateAction<ResetCreditPickerState | null>>,
  idempotencyKeysRef: React.MutableRefObject<Record<string, string>>,
  tr: TranslateUsage
) {
  const notify = useNotificationStore();
  return useCallback(
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
      } catch (error) {
        const message = getRequestErrorMessage(
          error,
          tr("resetCreditsLoadFailed", "Failed to load reset credits")
        );
        setErrors((prev) => ({ ...prev, [connectionId]: message }));
        notify.error(message);
      } finally {
        setLoadingResetCreditsId(null);
      }
    },
    [
      idempotencyKeysRef,
      loadingResetCreditsId,
      notify,
      redeemingResetCreditId,
      setErrors,
      setLoadingResetCreditsId,
      setResetCreditPicker,
      tr,
    ]
  );
}

function useRedeemCodexResetCredit(state: ResetCreditRequestState) {
  const notify = useNotificationStore();
  return useCallback(
    async (selectionToken: string) => {
      const picker = state.resetCreditPicker;
      if (!picker || state.redeemingResetCreditId || !selectionToken) return;
      const idempotencyKey =
        state.idempotencyKeysRef.current[selectionToken] ??
        (state.idempotencyKeysRef.current[selectionToken] = createIdempotencyKey());
      state.setRedeemingResetCreditId(picker.connectionId);
      state.setErrors((prev) => ({ ...prev, [picker.connectionId]: null }));
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
        state.setQuotaData((prev) => ({
          ...prev,
          [picker.connectionId]: {
            quotas: parseQuotaData(picker.provider, usage),
            plan: usage.plan || null,
            message: usage.message || null,
            raw: usage,
            stale: usage._stale ? { since: usage._staleSince, reason: usage._staleReason } : null,
          },
        }));
        state.setLastRefreshedAt((prev) => ({
          ...prev,
          [picker.connectionId]: new Date().toISOString(),
        }));
        state.setResetCreditPicker(null);
        state.idempotencyKeysRef.current = {};
        notify.success(state.tr("resetCreditRedeemed", "Reset redeemed"));
      } catch (error) {
        const message = getRequestErrorMessage(
          error,
          state.tr("resetCreditRedeemFailed", "Failed to redeem reset credit")
        );
        state.setErrors((prev) => ({ ...prev, [picker.connectionId]: message }));
        notify.error(message);
      } finally {
        state.setRedeemingResetCreditId(null);
      }
    },
    [notify, state]
  );
}

export function useCodexResetCreditRedemption(
  tr: TranslateUsage,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string | null>>>,
  setQuotaData: React.Dispatch<React.SetStateAction<Record<string, any>>>,
  setLastRefreshedAt: React.Dispatch<React.SetStateAction<Record<string, string>>>
) {
  const [redeemingResetCreditId, setRedeemingResetCreditId] = useState<string | null>(null);
  const [loadingResetCreditsId, setLoadingResetCreditsId] = useState<string | null>(null);
  const [resetCreditPicker, setResetCreditPicker] = useState<ResetCreditPickerState | null>(null);
  const idempotencyKeysRef = useRef<Record<string, string>>({});

  const openCodexResetCredits = useOpenCodexResetCredits(
    loadingResetCreditsId,
    redeemingResetCreditId,
    setErrors,
    setLoadingResetCreditsId,
    setResetCreditPicker,
    idempotencyKeysRef,
    tr
  );
  const redeemCodexResetCredit = useRedeemCodexResetCredit({
    idempotencyKeysRef,
    redeemingResetCreditId,
    resetCreditPicker,
    setErrors,
    setLastRefreshedAt,
    setQuotaData,
    setRedeemingResetCreditId,
    setResetCreditPicker,
    tr,
  });

  return {
    closeResetCreditPicker: () => setResetCreditPicker(null),
    loadingResetCreditsId,
    openCodexResetCredits,
    redeemCodexResetCredit,
    redeemingResetCreditId,
    resetCreditPicker,
  };
}
