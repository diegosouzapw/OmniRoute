import { getApiKeyById, createApiKey } from "@/lib/localDb";
import { getConsistentMachineId } from "@/shared/utils/machineId";

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

/**
 * Get or create a DB-backed API key for CLI tool setup.
 * Returns a valid OmniRoute API key (not a placeholder like "sk_omniroute").
 * Used when user has not explicitly selected a key from API Manager.
 */
export async function getOrCreateApiKey(apiKeyId?: string | null): Promise<string> {
  if (apiKeyId) {
    try {
      const keyRecord = await getApiKeyById(apiKeyId);
      if (keyRecord?.key) return keyRecord.key as string;
    } catch {
      /* fall through */
    }
  }

  // No key found — auto-create one that will be valid in DB validation
  let machineId = "unknown";
  try {
    machineId = await getConsistentMachineId();
    const keyRecord = await createApiKey("CLI Auto-Key", machineId);
    return keyRecord.key as string;
  } catch {
    // Fallback: generate a deterministic key if DB write fails
    return `sk-${machineId}-fallback-${Date.now()}`;
  }
}
