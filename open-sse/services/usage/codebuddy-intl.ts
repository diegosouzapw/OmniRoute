import { CODEBUDDY_INTL_USER_AGENT } from "../../config/providerHeaderProfiles.ts";
import { fetchCodeBuddyQuotaFromEndpoint, type CodeBuddyUsageResult } from "./codebuddyShared.ts";

export const INTL_USAGE_URL = "https://www.codebuddy.ai/v2/billing/meter/get-user-resource";

export async function getCodeBuddyIntlUsage(
  accessToken?: string,
  apiKey?: string,
  _providerSpecificData?: unknown
): Promise<CodeBuddyUsageResult> {
  return fetchCodeBuddyQuotaFromEndpoint(accessToken, apiKey, {
    url: INTL_USAGE_URL,
    userAgent: CODEBUDDY_INTL_USER_AGENT,
    ideType: "IDE",
    label: "CodeBuddy Intl",
  });
}

export default getCodeBuddyIntlUsage;
