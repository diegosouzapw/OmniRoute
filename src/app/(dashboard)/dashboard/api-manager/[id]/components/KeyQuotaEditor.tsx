"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import { formatUsdCost } from "../../apiManagerPageUtils";
import type { KeyQuotaView } from "../apiKeyDetailsData";
import { DetailsSection, EmptyNote, SaveFeedback, formatCount } from "./DetailsPrimitives";
import { KeyQuotaFields } from "./KeyQuotaFields";
import { useKeyQuotaEditor } from "./useKeyQuotaEditor";

/** Per-key tpm / rpm / monthly USD quota (`/api/usage/key-quota`); blank = unlimited. */
export function KeyQuotaEditor({
  keyId,
  quota,
  saved,
  onSaved,
}: {
  keyId: string;
  quota: KeyQuotaView | null;
  saved: boolean;
  onSaved: () => Promise<void>;
}) {
  const t = useTranslations("apiKeyDetails");

  if (!quota) {
    return (
      <DetailsSection title={t("keyQuotaTitle")} icon="timer">
        <EmptyNote>{t("keyQuotaUnavailable")}</EmptyNote>
      </DetailsSection>
    );
  }

  return <KeyQuotaEditorBody keyId={keyId} quota={quota} saved={saved} onSaved={onSaved} />;
}

function KeyQuotaEditorBody({
  keyId,
  quota,
  saved,
  onSaved,
}: {
  keyId: string;
  quota: KeyQuotaView;
  saved: boolean;
  onSaved: () => Promise<void>;
}) {
  const t = useTranslations("apiKeyDetails");
  const tc = useTranslations("common");
  const locale = useLocale();
  const editor = useKeyQuotaEditor({
    keyId,
    quota,
    onSaved,
    saveFailedMessage: t("saveFailed"),
    invalidAmountMessage: t("invalidAmount"),
  });

  const fields = [
    {
      id: "tpm",
      label: t("keyQuotaTpm"),
      value: editor.tpm,
      onChange: editor.setTpm,
      step: "1",
      usage: t("usedThisMinute", { value: formatCount(quota.tpmUsed, locale) }),
      exceeded: quota.tpmExceeded,
    },
    {
      id: "rpm",
      label: t("keyQuotaRpm"),
      value: editor.rpm,
      onChange: editor.setRpm,
      step: "1",
      usage: t("usedThisMinute", { value: formatCount(quota.rpmUsed, locale) }),
      exceeded: quota.rpmExceeded,
    },
    {
      id: "monthly",
      label: t("keyQuotaMonthlyUsd"),
      value: editor.monthly,
      onChange: editor.setMonthly,
      step: "0.01",
      usage: t("usedThisMonth", { value: formatUsdCost(quota.monthlyUsedUsd, locale) }),
      exceeded: quota.monthlyExceeded,
    },
  ];

  return (
    <DetailsSection title={t("keyQuotaTitle")} description={t("blankIsUnlimited")} icon="timer">
      <div className="flex flex-col gap-3">
        <KeyQuotaFields fields={fields} />
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" icon="save" loading={editor.saving} onClick={editor.save}>
            {tc("save")}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            icon="restart_alt"
            disabled={editor.saving}
            onClick={() => editor.clear(t("keyQuotaClearConfirm"))}
          >
            {t("keyQuotaClear")}
          </Button>
          <SaveFeedback error={editor.error} saved={saved && !editor.error ? t("saved") : null} />
        </div>
      </div>
    </DetailsSection>
  );
}
