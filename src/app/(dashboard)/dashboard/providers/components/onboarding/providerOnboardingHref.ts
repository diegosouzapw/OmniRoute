import type { OnboardingConnection } from "./providerOnboardingApi";

export interface OnboardingSummaryAction {
  href: string | null;
  label: string;
}

/**
 * Minimum surface area required to compute the dashboard details href.
 * Accepts either a full {@link OnboardingConnection} or any partial that
 * exposes the server-assigned UUID under `id`.
 */
export type HrefConnection = Pick<OnboardingConnection, "id"> & {
  provider?: string;
};

/**
 * Build the "open provider details" link target for the onboarding wizard
 * success card. The dashboard detail route is keyed by the connection's
 * server-assigned UUID (`OnboardingConnection.id`), not by the provider
 * category (`connection.provider` is e.g. "openai-compatible" and is shared
 * across many connections).
 *
 * Returns `null` if no usable id is present so callers can hide the action
 * entirely rather than linking to a 404.
 */
export function buildProviderDetailsHref(
  connection: HrefConnection | null | undefined
): string | null {
  const id = connection?.id?.trim();
  if (!id) return null;
  return `/dashboard/providers/${encodeURIComponent(id)}`;
}