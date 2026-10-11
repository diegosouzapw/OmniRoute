// @ts-nocheck
import type { RefreshLogger } from "../shared.ts";
import { refreshCodebuddyToken } from "./codebuddyShared.ts";

export async function refreshCodebuddyCnToken(
  refreshToken: string,
  log: RefreshLogger,
  proxyConfig: unknown = null
) {
  const { CODEBUDDY_CN_CONFIG } = await import("@/lib/oauth/constants/oauth");
  return refreshCodebuddyToken(CODEBUDDY_CN_CONFIG, refreshToken, log, proxyConfig, "CodeBuddy CN");
}
