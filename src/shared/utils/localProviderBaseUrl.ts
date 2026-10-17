import { LOCAL_PROVIDERS } from "@/shared/constants/providers/local";

/** Explicit connection URLs win; registered local defaults need no duplicate configuration. */
export function resolveLocalProviderBaseUrl(
  provider: string,
  configuredBaseUrl: unknown
): string | null {
  if (typeof configuredBaseUrl === "string" && configuredBaseUrl.trim()) {
    return configuredBaseUrl;
  }
  if (!Object.prototype.hasOwnProperty.call(LOCAL_PROVIDERS, provider)) return null;
  return LOCAL_PROVIDERS[provider as keyof typeof LOCAL_PROVIDERS].localDefault;
}
