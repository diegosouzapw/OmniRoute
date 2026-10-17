"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/shared/components";
import {
  GITHUB_CREDIT_LIMIT_FIELD,
  parseGitHubCreditLimitInput,
} from "@omniroute/open-sse/services/githubCreditLimit.ts";

type CreditLimitConnection = {
  id?: string;
  provider?: string;
  providerSpecificData?: Record<string, unknown>;
} | null;

function initialDraft(connection: CreditLimitConnection): string {
  const value = connection?.providerSpecificData?.[GITHUB_CREDIT_LIMIT_FIELD];
  return typeof value === "number" ? String(value) : "";
}

/**
 * Edit-form draft for the GitHub Copilot local AI Credits cutoff
 * (`providerSpecificData.githubCreditLimit`). Self-contained so the frozen
 * EditConnectionModal only wires it: render `field`, then `applyTo()` the
 * providerSpecificData patch before saving — it returns false (and sets
 * `error`) when the entered value is not a non-negative number. Blank sends an
 * explicit `null` so the PUT merge clears a previously stored limit.
 */
export function useGitHubCreditLimitDraft(connection: CreditLimitConnection): {
  field: ReactNode;
  error: string;
  applyTo: (providerSpecificData: Record<string, unknown> | undefined) => boolean;
} {
  const t = useTranslations("providers");
  const isGithub = connection?.provider === "github";
  const [draft, setDraft] = useState({ id: connection?.id, value: initialDraft(connection) });
  // Re-seed when the modal switches to another connection (render-time reset, no effect).
  if (draft.id !== connection?.id) {
    setDraft({ id: connection?.id, value: initialDraft(connection) });
  }

  const field = isGithub ? (
    <Input
      label={t("aiCreditsLimit")}
      type="number"
      min={0}
      step="any"
      value={draft.value}
      onChange={(e) => setDraft({ id: connection?.id, value: e.target.value })}
      placeholder={t("aiCreditsLimitPlaceholder")}
      hint={t("aiCreditsLimitHint")}
    />
  ) : null;

  return {
    field,
    error: t("aiCreditsLimitInvalid"),
    applyTo: (providerSpecificData) => {
      if (!isGithub || !providerSpecificData) return true;
      const parsed = parseGitHubCreditLimitInput(draft.value);
      if (parsed.invalid) return false;
      providerSpecificData[GITHUB_CREDIT_LIMIT_FIELD] = parsed.value;
      return true;
    },
  };
}
