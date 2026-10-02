"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { safeApiErrorMessage } from "../apiKeyDetailsData";
import type { TokenLimitRow } from "../apiKeyDetailsData";
import { sendJson } from "../useApiKeyDetails";
import type { ScopeType, TokenLimitDraft } from "./tokenLimitsEditorTypes";
import { validateTokenLimitDraft } from "./validateTokenLimitDraft";

/** State + validation + save/delete handlers for {@link TokenLimitsEditor}. */
export function useTokenLimitsEditor({
  keyId,
  onSaved,
}: {
  keyId: string;
  onSaved: () => Promise<void>;
}) {
  const t = useTranslations("apiKeyDetails");
  const [draft, setDraft] = useState<TokenLimitDraft | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scopeText = (scopeType: ScopeType, scopeValue: string) =>
    scopeType === "global"
      ? t("scopeGlobal")
      : t(scopeType === "provider" ? "scopeProviderValue" : "scopeModelValue", {
          value: scopeValue,
        });

  const run = async (request: () => ReturnType<typeof sendJson>): Promise<boolean> => {
    setSaving(true);
    setError(null);
    const res = await request();
    if (res.ok) await onSaved();
    else setError(safeApiErrorMessage(res.body, t("saveFailed")));
    setSaving(false);
    return res.ok;
  };

  const submit = async () => {
    if (!draft) return;
    const validated = validateTokenLimitDraft(draft);
    if (validated.ok === false) {
      setError(t(validated.errorKey));
      return;
    }
    const { tokenLimit, scopeValue } = validated.value;
    const ok = await run(() =>
      sendJson("/api/usage/token-limits", "POST", {
        ...(draft.id && { id: draft.id }),
        apiKeyId: keyId,
        scopeType: draft.scopeType,
        scopeValue,
        tokenLimit,
        resetInterval: draft.resetInterval,
        resetTime: draft.resetTime,
        enabled: draft.enabled,
      })
    );
    if (ok) setDraft(null);
  };

  const remove = (row: TokenLimitRow) => {
    if (!window.confirm(t("tokenLimitDeleteConfirm"))) return;
    void run(() => sendJson(`/api/usage/token-limits?id=${encodeURIComponent(row.id)}`, "DELETE"));
  };

  const update = (patch: Partial<TokenLimitDraft>) =>
    setDraft((prev) => (prev ? { ...prev, ...patch } : prev));

  return {
    draft,
    setDraft,
    saving,
    error,
    setError,
    scopeText,
    submit: () => void submit(),
    remove,
    update,
    editing: Boolean(draft?.id),
  };
}
