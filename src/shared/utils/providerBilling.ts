import {
  GROK_BUILD_ADDITIONAL_CREDITS_URL,
  sanitizeGrokBillingStatus,
  type GrokBillingStatus,
} from "./grokBilling";
import {
  KIMI_CODE_ADDITIONAL_CREDITS_URL,
  sanitizeKimiBillingStatus,
  type KimiBillingStatus,
} from "./kimiBilling";

export type ProviderBillingStatus = GrokBillingStatus | KimiBillingStatus;

export const PROVIDER_BILLING_PROVIDERS = [
  "grok-cli",
  "kimi-coding",
  "kimi-coding-apikey",
] as const;

export function isProviderBillingProvider(provider: string | undefined): boolean {
  return (
    provider !== undefined && (PROVIDER_BILLING_PROVIDERS as readonly string[]).includes(provider)
  );
}

export function sanitizeProviderBillingStatus(value: unknown): ProviderBillingStatus | undefined {
  return sanitizeGrokBillingStatus(value) ?? sanitizeKimiBillingStatus(value);
}

export function isGrokBillingStatus(billing: ProviderBillingStatus): billing is GrokBillingStatus {
  return billing.additionalCreditsUrl === GROK_BUILD_ADDITIONAL_CREDITS_URL;
}

export function isKimiBillingStatus(billing: ProviderBillingStatus): billing is KimiBillingStatus {
  return billing.additionalCreditsUrl === KIMI_CODE_ADDITIONAL_CREDITS_URL;
}
