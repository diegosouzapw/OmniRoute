"use client";

import { useTranslations } from "next-intl";
import { Input, Select } from "@/shared/components";
import type { ResetInterval, ScopeType, TokenLimitDraft } from "./tokenLimitsEditorTypes";
import {
  INTERVAL_KEYS,
  RESET_INTERVALS,
  SCOPE_TYPES,
  SCOPE_TYPE_KEYS,
} from "./tokenLimitsEditorTypes";

/** Scope/amount/interval/reset-time inputs inside {@link TokenLimitForm}. */
export function TokenLimitFormFields({
  draft,
  editing,
  providerListId,
  onUpdate,
}: {
  draft: TokenLimitDraft;
  editing: boolean;
  providerListId: string;
  onUpdate: (patch: Partial<TokenLimitDraft>) => void;
}) {
  const t = useTranslations("apiKeyDetails");
  const tc = useTranslations("common");

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Select
        label={t("tokenLimitScope")}
        value={draft.scopeType}
        placeholder=""
        disabled={editing}
        hint={editing ? t("tokenLimitScopeLocked") : undefined}
        options={SCOPE_TYPES.map((value) => ({ value, label: t(SCOPE_TYPE_KEYS[value]) }))}
        onChange={(event) => onUpdate({ scopeType: event.target.value as ScopeType })}
      />
      {draft.scopeType !== "global" && (
        <Input
          label={draft.scopeType === "provider" ? t("scopeProvider") : t("scopeModel")}
          value={draft.scopeValue}
          disabled={editing}
          list={draft.scopeType === "provider" ? providerListId : undefined}
          placeholder={
            draft.scopeType === "provider"
              ? t("tokenLimitProviderPlaceholder")
              : t("tokenLimitModelPlaceholder")
          }
          onChange={(event) => onUpdate({ scopeValue: event.target.value })}
        />
      )}
      <Input
        label={t("tokenLimitAmount")}
        type="number"
        min={1}
        step="1"
        inputMode="numeric"
        required
        value={draft.tokenLimit}
        onChange={(event) => onUpdate({ tokenLimit: event.target.value })}
      />
      <Select
        label={t("tokenLimitInterval")}
        value={draft.resetInterval}
        placeholder=""
        options={RESET_INTERVALS.map((value) => ({ value, label: t(INTERVAL_KEYS[value]) }))}
        onChange={(event) => onUpdate({ resetInterval: event.target.value as ResetInterval })}
      />
      <Input
        label={t("tokenLimitResetTime")}
        type="time"
        value={draft.resetTime}
        onChange={(event) => onUpdate({ resetTime: event.target.value })}
      />
      <label className="flex items-center gap-2 self-end pb-2 text-sm text-text-main">
        <input
          type="checkbox"
          checked={draft.enabled}
          onChange={(event) => onUpdate({ enabled: event.target.checked })}
        />
        {tc("enabled")}
      </label>
    </div>
  );
}
