import { getApiKeyMetadata } from "@/lib/localDb";
import { extractApiKey } from "@/sse/services/auth";
import { isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";

export interface ApiKeyRequestScope {
  apiKey: string | null;
  apiKeyId: string | null;
  apiKeyMetadata: Awaited<ReturnType<typeof getApiKeyMetadata>>;
  rejection: Response | null;
  isSessionAuth: boolean;
}

export async function getApiKeyRequestScope(request: Request): Promise<ApiKeyRequestScope> {
  const isSessionAuth = await isDashboardSessionAuthenticated(request);
  const apiKey = extractApiKey(request);
  if (!apiKey) {
    return { apiKey: null, apiKeyId: null, apiKeyMetadata: null, rejection: null, isSessionAuth };
  }

  const apiKeyMetadata = await getApiKeyMetadata(apiKey);
  return {
    apiKey,
    apiKeyId: apiKeyMetadata?.id || null,
    apiKeyMetadata,
    rejection: null,
    isSessionAuth,
  };
}
