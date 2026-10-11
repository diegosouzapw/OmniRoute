import { isClaudeExtraUsageAllowed } from "@/lib/providers/claudeExtraUsage";
import { isCodexPaidCreditsEnabled } from "@/lib/providers/codexPaidCredits";

/**
 * Billing opt-ins that let an account keep serving after its subscription window runs out:
 * Claude extra usage (`blockExtraUsage=false`) and Codex paid credits (`allowPaidCredits=true`).
 * Subscription-only snapshots must not skip such an account. For Codex the mandatory
 * credit-aware preflight decides instead.
 */
export function defersQuotaCutoff(
  provider: string | null | undefined,
  providerSpecificData: unknown,
  requestedModel?: string | null
): boolean {
  return (
    isClaudeExtraUsageAllowed(provider, providerSpecificData) ||
    isCodexPaidCreditsEnabled(provider, providerSpecificData, requestedModel)
  );
}

/** Codex paid-credit opt-in, read from a credentials record whose shape is only known at runtime. */
export function hasCodexCreditOptIn(
  provider: string | null | undefined,
  credentials: unknown,
  requestedModel?: string | null
): boolean {
  const providerSpecificData =
    credentials && typeof credentials === "object"
      ? (credentials as { providerSpecificData?: unknown }).providerSpecificData
      : undefined;
  return isCodexPaidCreditsEnabled(provider, providerSpecificData, requestedModel);
}
