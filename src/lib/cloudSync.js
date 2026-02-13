import {
  getProviderConnections,
  getModelAliases,
  getCombos,
  getApiKeys,
  updateProviderConnection,
} from "@/lib/localDb";

const CLOUD_URL = process.env.CLOUD_URL || process.env.NEXT_PUBLIC_CLOUD_URL;
const CLOUD_SYNC_TIMEOUT_MS = Number(process.env.CLOUD_SYNC_TIMEOUT_MS || 12000);

export async function fetchWithTimeout(url, options = {}, timeoutMs = CLOUD_SYNC_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Sync data to Cloud (shared utility)
 * @param {string} machineId
 * @param {string|null} createdKey - Key created during enable
 */
export async function syncToCloud(machineId, createdKey = null) {
  if (!CLOUD_URL) {
    return { error: "NEXT_PUBLIC_CLOUD_URL is not configured" };
  }

  // Get current data from db
  const providers = await getProviderConnections();
  const modelAliases = await getModelAliases();
  const combos = await getCombos();
  const apiKeys = await getApiKeys();

  let response;
  try {
    // Send to Cloud
    response = await fetchWithTimeout(`${CLOUD_URL}/sync/${machineId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        providers,
        modelAliases,
        combos,
        apiKeys,
      }),
    });
  } catch (error) {
    const isTimeout = error?.name === "AbortError";
    return { error: isTimeout ? "Cloud sync timeout" : "Cloud sync request failed" };
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.log("Cloud sync failed:", errorText);
    return { error: "Cloud sync failed" };
  }

  const result = await response.json();

  // Update local db with tokens from Cloud (providers stored by ID)
  if (result.data && result.data.providers) {
    await updateLocalTokens(result.data.providers);
  }

  const responseData = {
    success: true,
    message: "Synced successfully",
    changes: result.changes,
  };

  if (createdKey) {
    responseData.createdKey = createdKey;
  }

  return responseData;
}

/**
 * Update local db with data from Cloud
 * Simple logic: if Cloud is newer, sync entire provider
 * cloudProviders is object keyed by provider ID
 */
async function updateLocalTokens(cloudProviders) {
  const localProviders = await getProviderConnections();

  for (const localProvider of localProviders) {
    const cloudProvider = cloudProviders[localProvider.id];
    if (!cloudProvider) continue;

    const cloudUpdatedAt = new Date(cloudProvider.updatedAt || 0).getTime();
    const localUpdatedAt = new Date(localProvider.updatedAt || 0).getTime();

    // Simple logic: if Cloud is newer, sync entire provider
    if (cloudUpdatedAt > localUpdatedAt) {
      const updates = {
        // Tokens
        accessToken: cloudProvider.accessToken,
        refreshToken: cloudProvider.refreshToken,
        expiresAt: cloudProvider.expiresAt,
        expiresIn: cloudProvider.expiresIn,

        // Provider specific data
        providerSpecificData:
          cloudProvider.providerSpecificData || localProvider.providerSpecificData,

        // Status fields
        testStatus: cloudProvider.status || "active",
        lastError: cloudProvider.lastError,
        lastErrorAt: cloudProvider.lastErrorAt,
        errorCode: cloudProvider.errorCode,
        rateLimitedUntil: cloudProvider.rateLimitedUntil,

        // Metadata
        updatedAt: cloudProvider.updatedAt,
      };

      await updateProviderConnection(localProvider.id, updates);
    }
  }
}

export { CLOUD_URL, CLOUD_SYNC_TIMEOUT_MS };
