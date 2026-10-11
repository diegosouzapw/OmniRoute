import type { TokenLimitRow } from "../apiKeyDetailsData";

export type ScopeType = TokenLimitRow["scopeType"];
export type ResetInterval = TokenLimitRow["resetInterval"];

export interface TokenLimitDraft {
  id?: string;
  scopeType: ScopeType;
  scopeValue: string;
  tokenLimit: string;
  resetInterval: ResetInterval;
  resetTime: string;
  enabled: boolean;
}

export const NEW_TOKEN_LIMIT_DRAFT: TokenLimitDraft = {
  scopeType: "global",
  scopeValue: "",
  tokenLimit: "",
  resetInterval: "monthly",
  resetTime: "00:00",
  enabled: true,
};

export const SCOPE_TYPES: ScopeType[] = ["global", "provider", "model"];
export const RESET_INTERVALS: ResetInterval[] = ["daily", "weekly", "monthly"];

export const SCOPE_TYPE_KEYS: Record<ScopeType, string> = {
  global: "scopeGlobal",
  provider: "scopeProvider",
  model: "scopeModel",
};

export const INTERVAL_KEYS: Record<ResetInterval, string> = {
  daily: "windowDaily",
  weekly: "windowWeekly",
  monthly: "windowMonthly",
};

export function toTokenLimitDraft(row: TokenLimitRow): TokenLimitDraft {
  return {
    id: row.id,
    scopeType: row.scopeType,
    scopeValue: row.scopeValue,
    tokenLimit: String(row.tokenLimit),
    resetInterval: row.resetInterval,
    resetTime: row.resetTime,
    enabled: row.enabled,
  };
}
