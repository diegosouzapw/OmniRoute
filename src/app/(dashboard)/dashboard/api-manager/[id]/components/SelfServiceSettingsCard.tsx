"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SelfServiceQuotaSettings } from "../../components/SelfServiceQuotaSettings";
import type { QuotaProviderOption, SelfServiceQuota } from "../../selfServiceQuota";
import { safeApiErrorMessage } from "../apiKeyDetailsData";
import { sendJson } from "../useApiKeyDetails";
import { DetailsSection, SaveFeedback } from "./DetailsPrimitives";

/** Shared-quota providers + Anthropic header mode; every change is saved immediately. */
export function SelfServiceSettingsCard({
  keyId,
  settings,
  availableProviders,
  saved,
  onSaved,
}: {
  keyId: string;
  settings: SelfServiceQuota;
  availableProviders: QuotaProviderOption[];
  saved: boolean;
  onSaved: () => Promise<void>;
}) {
  const t = useTranslations("apiKeyDetails");
  const [pending, setPending] = useState<SelfServiceQuota | null>(null);
  const [error, setError] = useState<string | null>(null);

  const save = async (next: SelfServiceQuota) => {
    setPending(next);
    setError(null);
    const res = await sendJson(`/api/keys/${encodeURIComponent(keyId)}/self-service`, "PUT", next);
    if (res.ok) await onSaved();
    else setError(safeApiErrorMessage(res.body, t("saveFailed")));
    setPending(null);
  };

  return (
    <DetailsSection title={t("selfServiceTitle")} description={t("selfServiceDesc")} icon="tune">
      <div className="flex flex-col gap-2">
        <SelfServiceQuotaSettings
          value={pending ?? settings}
          onChange={(next) => void save(next)}
          providerOptions={availableProviders}
          disabled={pending !== null}
        />
        <SaveFeedback error={error} saved={saved && !error ? t("saved") : null} />
      </div>
    </DetailsSection>
  );
}
