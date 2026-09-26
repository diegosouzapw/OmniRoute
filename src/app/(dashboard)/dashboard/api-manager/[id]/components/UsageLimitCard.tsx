"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import { UsageLimitSettings } from "../../components/UsageLimitSettings";
import { parseOptionalLimitInput, safeApiErrorMessage } from "../apiKeyDetailsData";
import type { KeyConfig } from "../apiKeyDetailsData";
import { sendJson } from "../useApiKeyDetails";
import { DetailsSection, EmptyNote, SaveFeedback } from "./DetailsPrimitives";

const toInput = (value: number | null) => (value === null ? "" : String(value));

/** Daily / weekly USD usage limit, persisted through PATCH /api/keys/[id]. */
export function UsageLimitCard({
  keyId,
  keyConfig,
  saved,
  onSaved,
}: {
  keyId: string;
  keyConfig: KeyConfig | null;
  saved: boolean;
  onSaved: () => Promise<void>;
}) {
  const t = useTranslations("apiKeyDetails");
  const tc = useTranslations("common");
  const [enabled, setEnabled] = useState(keyConfig?.usageLimitEnabled === true);
  const [daily, setDaily] = useState(toInput(keyConfig?.dailyUsageLimitUsd ?? null));
  const [weekly, setWeekly] = useState(toInput(keyConfig?.weeklyUsageLimitUsd ?? null));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    const dailyUsageLimitUsd = parseOptionalLimitInput(daily);
    const weeklyUsageLimitUsd = parseOptionalLimitInput(weekly);
    if (dailyUsageLimitUsd === undefined || weeklyUsageLimitUsd === undefined) {
      setError(t("invalidAmount"));
      return;
    }
    setSaving(true);
    setError(null);
    const res = await sendJson(`/api/keys/${encodeURIComponent(keyId)}`, "PATCH", {
      usageLimitEnabled: enabled,
      dailyUsageLimitUsd,
      weeklyUsageLimitUsd,
    });
    if (res.ok) await onSaved();
    else setError(safeApiErrorMessage(res.body, t("saveFailed")));
    setSaving(false);
  };

  return (
    <DetailsSection title={t("usageLimitTitle")} description={t("blankIsUnlimited")} icon="paid">
      {keyConfig ? (
        <div className="flex flex-col gap-3">
          <UsageLimitSettings
            enabled={enabled}
            dailyLimitUsd={daily}
            weeklyLimitUsd={weekly}
            enabledLabel={tc("enabled")}
            disabledLabel={tc("disabled")}
            onEnabledChange={setEnabled}
            onDailyLimitUsdChange={setDaily}
            onWeeklyLimitUsdChange={setWeekly}
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" icon="save" loading={saving} onClick={() => void save()}>
              {tc("save")}
            </Button>
            <SaveFeedback error={error} saved={saved && !error ? t("saved") : null} />
          </div>
        </div>
      ) : (
        <EmptyNote>{t("keyConfigUnavailable")}</EmptyNote>
      )}
    </DetailsSection>
  );
}
