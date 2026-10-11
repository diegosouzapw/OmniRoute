import { CODEBUDDY_CN_USER_AGENT } from "../../config/providerHeaderProfiles.ts";
import { fetchCodeBuddyQuotaFromEndpoint, type CodeBuddyUsageResult } from "./codebuddyShared.ts";

export const CN_USAGE_URL = "https://copilot.tencent.com/v2/billing/meter/get-user-resource";

export async function getCodeBuddyCnUsage(
  accessToken?: string,
  apiKey?: string,
  _providerSpecificData?: unknown
): Promise<CodeBuddyUsageResult> {
  return fetchCodeBuddyQuotaFromEndpoint(accessToken, apiKey, {
    url: CN_USAGE_URL,
    userAgent: CODEBUDDY_CN_USER_AGENT,
    ideType: "CLI",
    label: "CodeBuddy CN",
  });
}

export default getCodeBuddyCnUsage;
