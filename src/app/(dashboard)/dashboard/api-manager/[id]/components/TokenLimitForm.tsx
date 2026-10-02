"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import type { TokenLimitDraft } from "./tokenLimitsEditorTypes";
import { TokenLimitFormFields } from "./TokenLimitFormFields";

/** Add/edit form for a single token-limit scope, used by {@link TokenLimitsEditor}. */
export function TokenLimitForm({
  draft,
  editing,
  providers,
  providerListId,
  saving,
  onUpdate,
  onSubmit,
  onCancel,
}: {
  draft: TokenLimitDraft;
  editing: boolean;
  providers: string[];
  providerListId: string;
  saving: boolean;
  onUpdate: (patch: Partial<TokenLimitDraft>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const t = useTranslations("apiKeyDetails");
  const tc = useTranslations("common");

  return (
    <form
      className="flex flex-col gap-3 rounded-lg border border-primary/30 bg-primary/5 p-3"
      aria-label={editing ? t("tokenLimitEditTitle") : t("tokenLimitAddTitle")}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <p className="text-sm font-medium text-text-main">
        {editing ? t("tokenLimitEditTitle") : t("tokenLimitAddTitle")}
      </p>
      <TokenLimitFormFields
        draft={draft}
        editing={editing}
        providerListId={providerListId}
        onUpdate={onUpdate}
      />
      <datalist id={providerListId}>
        {providers.map((provider) => (
          <option key={provider} value={provider} />
        ))}
      </datalist>
      <div className="flex flex-wrap items-center gap-2">
        <Button type="submit" size="sm" icon="save" loading={saving}>
          {tc("save")}
        </Button>
        <Button size="sm" variant="ghost" disabled={saving} onClick={onCancel}>
          {tc("cancel")}
        </Button>
      </div>
    </form>
  );
}
