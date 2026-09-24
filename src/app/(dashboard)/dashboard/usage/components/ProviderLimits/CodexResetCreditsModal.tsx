"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";
import { translateUsageOrFallback, type UsageTranslationValues } from "./i18nFallback";
import type { CodexResetCreditView } from "./useCodexResetCreditRedemption";

interface Props {
  credits: CodexResetCreditView[];
  availableCount: number;
  isOpen: boolean;
  loading: boolean;
  provider: string;
  onClose: () => void;
  onRedeem: (selectionToken: string) => Promise<void>;
}

function isGlmResetProvider(provider: string): boolean {
  return provider !== "codex";
}

export function getResetCreditWindowTitle(
  provider: string,
  credit: CodexResetCreditView,
  tr: (key: string, fallback: string, values?: UsageTranslationValues) => string
): string {
  if (!isGlmResetProvider(provider)) {
    return credit.title || tr("resetCreditDefaultTitle", "Full reset");
  }

  const windowTitle =
    credit.resetType === "WEEK"
      ? tr("glmResetCreditWeekTitle", "Weekly window reset")
      : tr("glmResetCreditFiveHourTitle", "5-hour window reset");
  return credit.title ? `${windowTitle} · ${credit.title}` : windowTitle;
}

export function getResetCreditConfirmation(
  provider: string,
  resetType: string | undefined,
  tr: (key: string, fallback: string, values?: UsageTranslationValues) => string
): string {
  if (!isGlmResetProvider(provider)) {
    return tr(
      "confirmRedeemResetCredit",
      "Redeeming immediately resets the eligible Codex usage windows and permanently consumes this credit."
    );
  }
  if (resetType === "WEEK") {
    return tr(
      "glmConfirmRedeemWeekResetCredit",
      "Redeeming immediately resets the weekly usage window and permanently consumes this card."
    );
  }
  if (resetType === "FIVE_HOUR") {
    return tr(
      "glmConfirmRedeemFiveHourResetCredit",
      "Redeeming immediately resets the 5-hour usage window and permanently consumes this card."
    );
  }
  return tr(
    "glmConfirmRedeemResetCredit",
    "Redeeming immediately resets the selected usage window and permanently consumes this card."
  );
}

function formatRelativeExpiry(expiresAt: string | null | undefined): string | null {
  if (!expiresAt) return null;
  const diffMs = new Date(expiresAt).getTime() - Date.now();
  if (!Number.isFinite(diffMs)) return null;
  if (diffMs <= 0) return "0m";

  const minutes = Math.max(1, Math.ceil(diffMs / 60_000));
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.ceil(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.ceil(hours / 24)}d`;
}

export function getCodexResetCreditExpiryLabel(
  expiresAt: string | null | undefined,
  locale?: string
): { absolute: string | null; relative: string | null } {
  if (!expiresAt) return { absolute: null, relative: null };
  const date = new Date(expiresAt);
  if (!Number.isFinite(date.getTime())) return { absolute: null, relative: null };
  return {
    absolute: date.toLocaleString(locale, { dateStyle: "medium", timeStyle: "short" }),
    relative: formatRelativeExpiry(expiresAt),
  };
}

function ResetCreditModalFooter({
  confirming,
  loading,
  onBack,
  onClose,
  onConfirm,
  tr,
}: {
  confirming: boolean;
  loading: boolean;
  onBack: () => void;
  onClose: () => void;
  onConfirm: () => void;
  tr: (key: string, fallback: string, values?: UsageTranslationValues) => string;
}) {
  if (!confirming) {
    return (
      <Button variant="ghost" onClick={onClose} disabled={loading}>
        {tr("close", "Close")}
      </Button>
    );
  }

  return (
    <>
      <Button variant="ghost" onClick={onBack} disabled={loading}>
        {tr("back", "Back")}
      </Button>
      <Button onClick={onConfirm} loading={loading}>
        {tr("confirmRedeemResetCreditButton", "Redeem credit")}
      </Button>
    </>
  );
}

function ResetCreditConfirmation({
  credit,
  provider,
  tr,
}: {
  credit: CodexResetCreditView;
  provider: string;
  tr: (key: string, fallback: string, values?: UsageTranslationValues) => string;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-amber-500">warning</span>
          <div>
            <p className="font-semibold text-text-main">
              {tr("confirmRedeemResetCreditTitle", "Redeem this reset credit?")}
            </p>
            <p className="mt-1 text-sm text-text-muted">
              {getResetCreditConfirmation(provider, credit.resetType, tr)}
            </p>
          </div>
        </div>
      </div>
      <CreditSummary credit={credit} provider={provider} tr={tr} />
    </div>
  );
}

function ResetCreditList({
  availableCount,
  credits,
  loading,
  onSelect,
  provider,
  tr,
}: {
  availableCount: number;
  credits: CodexResetCreditView[];
  loading: boolean;
  onSelect: (selectionToken: string) => void;
  provider: string;
  tr: (key: string, fallback: string, values?: UsageTranslationValues) => string;
}) {
  if (credits.length === 0) {
    return (
      <div className="rounded-lg border border-border p-5 text-center text-sm text-text-muted">
        {availableCount > 0
          ? tr(
              "resetCreditsDetailsUnavailable",
              "Credit details are currently unavailable. Refresh and try again."
            )
          : tr("noResetCreditsAvailable", "No reset credits are available.")}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {credits.map((credit, index) => (
        <div
          key={credit.selectionToken}
          className="flex flex-col gap-3 rounded-lg border border-border bg-bg-subtle/40 p-3 sm:flex-row sm:items-center"
        >
          <CreditSummary credit={credit} provider={provider} tr={tr} recommended={index === 0} />
          <Button
            size="sm"
            className="shrink-0"
            onClick={() => onSelect(credit.selectionToken)}
            disabled={loading}
          >
            {tr("redeemThisResetCredit", "Redeem")}
          </Button>
        </div>
      ))}
    </div>
  );
}

export default function CodexResetCreditsModal({
  credits,
  availableCount,
  isOpen,
  loading,
  provider,
  onClose,
  onRedeem,
}: Props) {
  const t = useTranslations("usage");
  const tr = (key: string, fallback: string, values?: UsageTranslationValues) =>
    translateUsageOrFallback(t, key, fallback, values);
  const [selectedCreditId, setSelectedCreditId] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  const selectedCredit = useMemo(
    () => credits.find((credit) => credit.selectionToken === selectedCreditId) ?? null,
    [credits, selectedCreditId]
  );

  const close = () => {
    if (loading) return;
    setConfirming(false);
    setSelectedCreditId(null);
    onClose();
  };

  const beginRedeem = (selectionToken: string) => {
    setSelectedCreditId(selectionToken);
    setConfirming(true);
  };

  const confirmRedeem = async () => {
    if (!selectedCreditId) return;
    await onRedeem(selectedCreditId);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      title={
        isGlmResetProvider(provider)
          ? tr("glmResetCreditsModalTitle", "GLM Coding Plan reset cards")
          : tr("resetCreditsModalTitle", "Codex reset credits")
      }
      size="lg"
      closeOnOverlay={!loading}
      footer={
        <ResetCreditModalFooter
          confirming={confirming}
          loading={loading}
          onBack={() => setConfirming(false)}
          onClose={close}
          onConfirm={confirmRedeem}
          tr={tr}
        />
      }
    >
      {confirming && selectedCredit ? (
        <ResetCreditConfirmation credit={selectedCredit} provider={provider} tr={tr} />
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-text-muted">
            {isGlmResetProvider(provider)
              ? tr(
                  "glmResetCreditsModalExplainer",
                  "Reset cards are ordered by expiration. Choose the 5-hour or weekly window you want to reset."
                )
              : tr(
                  "resetCreditsModalExplainer",
                  "Credits are ordered by expiration. Automatic redemption always uses the credit that expires first."
                )}
          </p>
          <ResetCreditList
            availableCount={availableCount}
            credits={credits}
            loading={loading}
            onSelect={beginRedeem}
            provider={provider}
            tr={tr}
          />
        </div>
      )}
    </Modal>
  );
}

function CreditSummary({
  credit,
  provider,
  recommended = false,
  tr,
}: {
  credit: CodexResetCreditView;
  provider: string;
  recommended?: boolean;
  tr: (key: string, fallback: string, values?: UsageTranslationValues) => string;
}) {
  const { absolute: expiry, relative: relativeExpiry } = getCodexResetCreditExpiryLabel(
    credit.expiresAt
  );

  return (
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-medium text-text-main">
          {getResetCreditWindowTitle(provider, credit, tr)}
        </span>
        {recommended && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            {tr("resetCreditExpiresFirst", "Expires first")}
          </span>
        )}
      </div>
      {credit.description && (
        <p className="mt-1 text-xs leading-relaxed text-text-muted">{credit.description}</p>
      )}
      <div className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
        <span className="material-symbols-outlined text-[15px]">schedule</span>
        {expiry ? (
          <span>
            {tr("resetCreditExpiresAt", `Expires ${expiry}`, { date: expiry })}
            {relativeExpiry ? ` (${relativeExpiry})` : ""}
          </span>
        ) : (
          <span>{tr("resetCreditNoExpiry", "No expiration date")}</span>
        )}
      </div>
    </div>
  );
}
