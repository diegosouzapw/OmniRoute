import { getCodexModelScope } from "@omniroute/open-sse/config/codexQuotaScopes.ts";
import { isCodexQuotaFilteringDisabled } from "@/lib/providers/codexQuotaFiltering";

export interface CodexPaidCredits {
  hasCredits: boolean;
  unlimited: boolean;
  overageLimitReached: boolean;
  /** Credit units, not a currency amount. Business accounts may omit the balance. */
  balance: number | null;
}

export function parseCodexPaidCredits(value: unknown): CodexPaidCredits | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const record = value as Record<string, unknown>;
  const balance =
    typeof record.balance === "number" ||
    (typeof record.balance === "string" && record.balance.trim() !== "")
      ? Number(record.balance)
      : NaN;
  return {
    hasCredits: (record.has_credits ?? record.hasCredits) === true,
    unlimited: record.unlimited === true,
    overageLimitReached: (record.overage_limit_reached ?? record.overageLimitReached) === true,
    balance: Number.isFinite(balance) ? balance : null,
  };
}

/**
 * Explicit billing consent (default off); Spark has a separate quota and is not covered here.
 * The full local quota-filtering opt-out (#15574: quotaPreflightEnabled=false AND
 * limitPolicy.enabled=false) takes precedence — that account is served unfiltered and the
 * upstream decides, so the credit-aware gate must not force a preflight on it.
 */
export function isCodexPaidCreditsEnabled(
  provider: string | null | undefined,
  providerSpecificData: unknown,
  requestedModel?: string | null
): boolean {
  const data = providerSpecificData as Record<string, unknown> | null | undefined;
  return (
    provider === "codex" &&
    data?.allowPaidCredits === true &&
    getCodexModelScope(requestedModel) !== "spark" &&
    !isCodexQuotaFilteringDisabled(provider, providerSpecificData)
  );
}

export function hasCodexPaidCredits(credits: CodexPaidCredits | undefined): boolean {
  if (!credits || credits.overageLimitReached) return false;
  return (
    credits.unlimited || (credits.hasCredits && (credits.balance === null || credits.balance > 0))
  );
}
