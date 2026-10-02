"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { safeApiErrorMessage, withVisibilityScopes } from "../apiKeyDetailsData";
import type { KeyConfig } from "../apiKeyDetailsData";
import { sendJson } from "../useApiKeyDetails";
import { DetailsSection, EmptyNote, SaveFeedback } from "./DetailsPrimitives";

type Visibility = { selfUsage: boolean; accountQuota: boolean };

function VisibilitySwitch({
  checked,
  disabled,
  icon,
  label,
  description,
  onToggle,
}: {
  checked: boolean;
  disabled: boolean;
  icon: string;
  label: string;
  description: string;
  onToggle: () => void;
}) {
  const tc = useTranslations("common");
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="text-sm font-medium text-text-main">{label}</p>
        <p className="text-xs text-text-muted">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={onToggle}
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
          checked
            ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
            : "border-border bg-black/5 text-text-muted dark:bg-white/5"
        }`}
      >
        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
          {icon}
        </span>
        {checked ? tc("enabled") : tc("disabled")}
      </button>
    </div>
  );
}

/** What the key holder may read through /v1/me/status (the self-service scopes). */
export function VisibilityControls({
  keyId,
  keyConfig,
  visibility,
  saved,
  onSaved,
}: {
  keyId: string;
  keyConfig: KeyConfig | null;
  visibility: Visibility;
  saved: boolean;
  onSaved: () => Promise<void>;
}) {
  const t = useTranslations("apiKeyDetails");
  const tm = useTranslations("apiManager");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async (next: Visibility) => {
    if (!keyConfig) return;
    setSaving(true);
    setError(null);
    const res = await sendJson(`/api/keys/${encodeURIComponent(keyId)}`, "PATCH", {
      scopes: withVisibilityScopes(keyConfig.scopes, next),
    });
    if (res.ok) await onSaved();
    else setError(safeApiErrorMessage(res.body, t("saveFailed")));
    setSaving(false);
  };

  return (
    <DetailsSection
      title={t("visibilityTitle")}
      description={t("visibilityDesc")}
      icon="visibility"
    >
      {keyConfig ? (
        <div className="flex flex-col gap-3">
          <VisibilitySwitch
            checked={visibility.selfUsage}
            disabled={saving}
            icon="query_stats"
            label={tm("ownUsageVisibility")}
            description={tm("ownUsageVisibilityDesc")}
            onToggle={() =>
              void save({
                selfUsage: !visibility.selfUsage,
                accountQuota: visibility.selfUsage ? false : visibility.accountQuota,
              })
            }
          />
          <VisibilitySwitch
            checked={visibility.accountQuota}
            disabled={saving || !visibility.selfUsage}
            icon="account_balance"
            label={tm("sharedAccountQuotaVisibility")}
            description={t("accountQuotaVisibilityDesc")}
            onToggle={() => void save({ selfUsage: true, accountQuota: !visibility.accountQuota })}
          />
          <SaveFeedback error={error} saved={saved && !error ? t("saved") : null} />
        </div>
      ) : (
        <EmptyNote>{t("keyConfigUnavailable")}</EmptyNote>
      )}
    </DetailsSection>
  );
}
