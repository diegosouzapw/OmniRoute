import {
  isXiaomiTokenPlanProvider,
  resolveXiaomiTokenPlanBaseUrl,
  resolveXiaomiTokenPlanRegion,
  xiaomiTokenPlanOrigin,
} from "@/shared/constants/xiaomiTokenPlanRegions";
import { normalizeXiaomiMimoChatUrl } from "./urlNormalizers.ts";

type CredentialsLike = { providerSpecificData?: unknown } | null | undefined;

/**
 * Alternate-protocol endpoints are registered against the Singapore cluster
 * origin; a Token Plan connection re-points them at its selected cluster.
 * Custom base URLs never reach here (manual override keeps precedence upstream).
 */
export function xiaomiAlternateUrl(
  providerId: string,
  url: string,
  credentials: CredentialsLike
): string {
  const base = isXiaomiTokenPlanProvider(providerId)
    ? url.replace(
        "https://token-plan-sgp.xiaomimimo.com",
        xiaomiTokenPlanOrigin(resolveXiaomiTokenPlanRegion(credentials?.providerSpecificData))
      )
    : url;
  return base.replace(/\/$/, "");
}

/**
 * Chat URL for "xiaomi-mimo" and "xiaomi-mimo-token-plan": the normal provider
 * keeps the executor's default base-URL resolution, a Token Plan connection
 * resolves its regional cluster root (custom base URL keeps precedence).
 */
export function xiaomiMimoChatUrl(
  providerId: string,
  credentials: CredentialsLike,
  defaultBaseUrl: () => string
): string {
  return normalizeXiaomiMimoChatUrl(
    isXiaomiTokenPlanProvider(providerId)
      ? resolveXiaomiTokenPlanBaseUrl(credentials?.providerSpecificData)
      : defaultBaseUrl()
  );
}
