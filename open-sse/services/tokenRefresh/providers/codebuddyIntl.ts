// @ts-nocheck
import type { RefreshLogger } from "../shared.ts";
import { refreshCodebuddyToken } from "./codebuddyShared.ts";

export async function refreshCodebuddyIntlToken(
  refreshToken: string,
  log: RefreshLogger,
  proxyConfig: unknown = null
) {
  const { CODEBUDDY_INTL_CONFIG } = await import("@/lib/oauth/constants/oauth");
  return refreshCodebuddyToken(
    CODEBUDDY_INTL_CONFIG,
    refreshToken,
    log,
    proxyConfig,
    "CodeBuddy Intl"
  );
}
