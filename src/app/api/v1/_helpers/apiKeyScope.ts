import { getApiKeyMetadata } from "@/lib/localDb";
import { extractApiKey } from "@/sse/services/auth";

export interface ApiKeyRequestScope {
  apiKey: string | null;
  apiKeyId: string | null;
  apiKeyMetadata: Awaited<ReturnType<typeof getApiKeyMetadata>>;
  rejection: Response | null;
}

export async function getApiKeyRequestScope(request: Request): Promise<ApiKeyRequestScope> {
  const apiKey = extractApiKey(request);
  if (!apiKey) {
    return { apiKey: null, apiKeyId: null, apiKeyMetadata: null, rejection: null };
  }

  const apiKeyMetadata = await getApiKeyMetadata(apiKey);
  return {
    apiKey,
    apiKeyId: apiKeyMetadata?.id || null,
    apiKeyMetadata,
    rejection: null,
  };
}
