"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import type { TokenLimitRow } from "../apiKeyDetailsData";
import { DetailsSection, EmptyNote, SaveFeedback } from "./DetailsPrimitives";
import { TokenLimitForm } from "./TokenLimitForm";
import { TokenLimitList } from "./TokenLimitList";
import { NEW_TOKEN_LIMIT_DRAFT, toTokenLimitDraft } from "./tokenLimitsEditorTypes";
import { useTokenLimitsEditor } from "./useTokenLimitsEditor";

/** Per-key token budgets (`/api/usage/token-limits`), scoped globally, per provider or per model. */
export function TokenLimitsEditor({
  keyId,
  limits,
  providers,
  saved,
  onSaved,
}: {
  keyId: string;
  limits: TokenLimitRow[] | null;
  providers: string[];
  saved: boolean;
  onSaved: () => Promise<void>;
}) {
  const t = useTranslations("apiKeyDetails");
  const providerListId = useId();
  const editor = useTokenLimitsEditor({ keyId, onSaved });
  const { draft } = editor;

  return (
    <DetailsSection
      title={t("tokenLimitsTitle")}
      description={t("tokenLimitsDesc")}
      icon="data_usage"
      action={
        limits && !draft ? (
          <Button
            size="sm"
            icon="add"
            onClick={() => editor.setDraft({ ...NEW_TOKEN_LIMIT_DRAFT })}
          >
            {t("tokenLimitAdd")}
          </Button>
        ) : null
      }
    >
      {limits === null ? (
        <EmptyNote>{t("tokenLimitsUnavailable")}</EmptyNote>
      ) : (
        <div className="flex flex-col gap-3">
          {limits.length === 0 && !draft && <EmptyNote>{t("tokenLimitsEmpty")}</EmptyNote>}
          {limits.length > 0 && (
            <TokenLimitList
              limits={limits}
              saving={editor.saving}
              scopeText={editor.scopeText}
              onEdit={(row) => editor.setDraft(toTokenLimitDraft(row))}
              onDelete={editor.remove}
            />
          )}

          {draft && (
            <TokenLimitForm
              draft={draft}
              editing={editor.editing}
              providers={providers}
              providerListId={providerListId}
              saving={editor.saving}
              onUpdate={editor.update}
              onSubmit={editor.submit}
              onCancel={() => {
                editor.setDraft(null);
                editor.setError(null);
              }}
            />
          )}
          <SaveFeedback
            error={editor.error}
            saved={saved && !editor.error && !draft ? t("saved") : null}
          />
        </div>
      )}
    </DetailsSection>
  );
}
