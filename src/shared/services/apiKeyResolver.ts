import { getApiKeyById } from "@/lib/db/apiKeys";

export async function resolveApiKey(
  apiKeyId?: string | null,
  apiKey?: string | null
): Promise<string> {
  if (apiKeyId) {
    try {
      const keyRecord = await getApiKeyById(apiKeyId);
      if (keyRecord?.key) return keyRecord.key as string;
    } catch {
      /* fall through */
    }
  }
  return apiKey || "sk_omniroute";
}
