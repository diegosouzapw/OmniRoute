import type { TokenLimitDraft } from "./tokenLimitsEditorTypes";

export interface TokenLimitDraftValidation {
  tokenLimit: number;
  scopeValue: string;
}

export type TokenLimitDraftValidationResult =
  | { ok: true; value: TokenLimitDraftValidation }
  | {
      ok: false;
      errorKey: "tokenLimitInvalid" | "tokenLimitScopeRequired" | "tokenLimitResetTimeInvalid";
    };

/** Pure validation for the token-limit draft form, kept outside the hook to stay short. */
export function validateTokenLimitDraft(draft: TokenLimitDraft): TokenLimitDraftValidationResult {
  const tokenLimit = Number(draft.tokenLimit);
  const scopeValue = draft.scopeType === "global" ? "" : draft.scopeValue.trim();
  if (!Number.isInteger(tokenLimit) || tokenLimit <= 0) {
    return { ok: false, errorKey: "tokenLimitInvalid" };
  }
  if (draft.scopeType !== "global" && !scopeValue) {
    return { ok: false, errorKey: "tokenLimitScopeRequired" };
  }
  if (!/^\d{2}:\d{2}$/.test(draft.resetTime)) {
    return { ok: false, errorKey: "tokenLimitResetTimeInvalid" };
  }
  return { ok: true, value: { tokenLimit, scopeValue } };
}
