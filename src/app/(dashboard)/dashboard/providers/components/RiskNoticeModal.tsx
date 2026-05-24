"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";

import { Button, Modal } from "@/shared/components";
import type { RiskNoticeVariant } from "@/shared/constants/providers";

import { useRiskAcknowledged } from "../hooks/useRiskAcknowledged";

interface RiskNoticeModalProps {
  variant: RiskNoticeVariant;
  providerId: string;
  providerName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function RiskNoticeModal({
  variant,
  providerId,
  providerName,
  onConfirm,
  onCancel,
}: RiskNoticeModalProps) {
  const t = useTranslations("providers.riskNotice");
  const checkboxId = useId();
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const { acknowledge } = useRiskAcknowledged(providerId);

  return (
    <Modal isOpen onClose={onCancel} title={t("title")} size="md">
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-3 rounded-lg border border-amber-500/25 bg-amber-500/10 p-4">
          <span
            className="material-symbols-outlined mt-0.5 text-[28px] leading-none text-amber-500"
            aria-hidden="true"
          >
            info
          </span>
          <div className="min-w-0 text-text-main">
            <p className="mb-2 text-sm font-semibold">{providerName}</p>
            <p className="whitespace-pre-line text-sm leading-6 text-text-muted">{t(variant)}</p>
          </div>
        </div>

        <label
          htmlFor={checkboxId}
          className="flex cursor-pointer items-center gap-2 text-xs text-text-muted"
        >
          <input
            id={checkboxId}
            type="checkbox"
            checked={dontShowAgain}
            onChange={(event) => {
              const checked = event.target.checked;
              setDontShowAgain(checked);
              if (checked) acknowledge();
            }}
            className="size-4 rounded border-border text-primary focus:ring-primary/30"
          />
          {t("dontShowAgain")}
        </label>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>
            {t("cancel")}
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {t("understand")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
