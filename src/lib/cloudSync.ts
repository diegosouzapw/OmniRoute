import crypto from "crypto";
import { getProviderConnections, updateProviderConnection } from "@/lib/localDb";
import { buildConfigSyncEnvelope, toLegacyCloudSyncPayload } from "@/lib/sync/bundle";

const CLOUD_URL = process.env.CLOUD_URL || process.env.NEXT_PUBLIC_CLOUD_URL;
const CLOUD_SYNC_TIMEOUT_MS = Number(process.env.CLOUD_SYNC_TIMEOUT_MS || 12000);
const CLOUD_SYNC_SECRET = process.env.OMNIROUTE_CLOUD_SYNC_SECRET || "";

// Opt-in: only when explicitly set to "true" will updateLocalTokens overwrite
// accessToken/refreshToken/providerSpecificData from the Cloud response. Default
// behaviour from v3.8.6 onward syncs only non-credential metadata (expiresAt,
// status, lastError*, rateLimitedUntil, updatedAt) so a misconfigured or
// hostile CLOUD_URL cannot silently swap user OAuth tokens.
const CLOUD_SYNC_SECRETS_ENABLED = process.env.OMNIROUTE_CLOUD_SYNC_SECRETS === "true";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function toDateMs(value: unknown): number {
  if (typeof value === "string" || typeof value === "number" || value instanceof Date) {
    const parsed = new Date(value).getTime();
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

// SECURITY-AUDITOR-NOTE: HMAC signature verification of the Cloud response.
// Closes the silent-credential-swap surface flagged by Socket.dev (finding for
// `app/.next/server/app/api/keys/[id]/route.js`). Two-leg defence:
//   1. The Cloud endpoint signs each response body with
//      `HMAC-SHA256(OMNIROUTE_CLOUD_SYNC_SECRET, rawBody)` and returns the hex
//      digest in `X-Cloud-Sig`.
//   2. We verify the signature with `crypto.timingSafeEqual` before parsing the
//      JSON, so a MITM on the CLOUD_URL channel — or a misconfigured CLOUD_URL
//      pointing at an attacker — cannot inject providers/tokens.
// If `OMNIROUTE_CLOUD_SYNC_SECRET` is unset, signature validation is logged but
// not enforced (back-compat for users on v3.8.x who haven't issued a shared
// secret yet). The enforce-by-default switch will flip in v3.9.
export function verifyCloudSignature(rawBody: string, sigHeader: string | null): boolean {
  if (!CLOUD_SYNC_SECRET) {
    if (sigHeader) {
      // We can't verify, but the server is at least trying. Pass through.
      return true;
    }
    console.warn(
      "[cloudSync] OMNIROUTE_CLOUD_SYNC_SECRET is not set and the Cloud response carries no X-Cloud-Sig. " +
        "Token sync runs in legacy unverified mode — set the secret to enforce HMAC verification."
    );
    return true;
  }
  if (!sigHeader) {
    console.warn("[cloudSync] Cloud response missing X-Cloud-Sig — rejecting payload.");
    return false;
  }
  const expected = crypto.createHmac("sha256", CLOUD_SYNC_SECRET).update(rawBody).digest("hex");
  try {
    const expectedBuf = Buffer.from(expected, "hex");
    const actualBuf = Buffer.from(sigHeader, "hex");
    if (expectedBuf.length !== actualBuf.length) return false;
    return crypto.timingSafeEqual(expectedBuf, actualBuf);
  } catch {
    return false;
  }
}

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

  // Keep legacy field names for upstream compatibility, but derive them
  // from a canonical sync bundle with deterministic version hashing.
  const { version, bundle } = await buildConfigSyncEnvelope();
  const legacyPayload = toLegacyCloudSyncPayload(bundle);

  let response;
  try {
    // Send to Cloud
    response = await fetchWithTimeout(`${CLOUD_URL}/sync/${machineId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...legacyPayload,
        version,
      }),
    });
  } catch (error) {
    const isTimeout = error?.name === "AbortError";
    return { error: isTimeout ? "Cloud sync timeout" : "Cloud sync request failed" };
  }

  if (!response.ok) {
    const errorText = await response.text();
    const truncated = errorText.length > 200 ? errorText.slice(0, 200) + "…" : errorText;
    console.log("Cloud sync failed", { status: response.status, body: truncated });
    return { error: "Cloud sync failed" };
  }

  // Read the raw body so we can verify the signature before trusting any
  // JSON-parsed field. Order matters: parse only after verification passes.
  const rawBody = await response.text();
  const sigHeader = response.headers.get("X-Cloud-Sig");
  if (!verifyCloudSignature(rawBody, sigHeader)) {
    return { error: "Cloud sync signature verification failed" };
  }

  let result: any;
  try {
    result = JSON.parse(rawBody);
  } catch {
    return { error: "Cloud sync response is not valid JSON" };
  }

  // Update local db with tokens from Cloud (providers stored by ID)
  if (result?.data?.providers) {
    await updateLocalTokens(result.data.providers);
  }

  const responseData: any = {
    success: true,
    message: "Synced successfully",
    changes: result.changes,
    version,
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
 *
 * SECURITY-AUDITOR-NOTE: This function appears in Socket.dev finding for
 * `app/.next/server/app/api/keys/[id]/route.js`. From v3.8.6 onward,
 * `accessToken` / `refreshToken` / `providerSpecificData` are only synced when
 * `OMNIROUTE_CLOUD_SYNC_SECRETS=true`. The default mode syncs non-credential
 * metadata only. Combined with `verifyCloudSignature()` above, this closes the
 * silent-credential-overwrite path. See docs/security/SOCKET_DEV_FINDINGS.md §5.
 */
async function updateLocalTokens(cloudProviders: unknown) {
  const cloudProvidersMap = asRecord(cloudProviders);
  const localProviders = await getProviderConnections();

  for (const localProviderRaw of localProviders as unknown[]) {
    const localProvider = asRecord(localProviderRaw);
    const localProviderId = toStringOrNull(localProvider.id);
    if (!localProviderId) continue;

    const cloudProvider = asRecord(cloudProvidersMap[localProviderId]);
    if (Object.keys(cloudProvider).length === 0) continue;

    const cloudUpdatedAt = toDateMs(cloudProvider.updatedAt);
    const localUpdatedAt = toDateMs(localProvider.updatedAt);

    if (cloudUpdatedAt > localUpdatedAt) {
      const updates: Record<string, unknown> = {
        // Non-credential metadata — always synced.
        expiresAt: cloudProvider.expiresAt,
        expiresIn: cloudProvider.expiresIn,
        testStatus: cloudProvider.status || "active",
        lastError: cloudProvider.lastError,
        lastErrorAt: cloudProvider.lastErrorAt,
        errorCode: cloudProvider.errorCode,
        rateLimitedUntil: cloudProvider.rateLimitedUntil,
        updatedAt: cloudProvider.updatedAt,
      };

      // Credentials and providerSpecificData are only overwritten when the
      // operator has explicitly opted in to remote credential sync. Default
      // OFF closes the silent-swap surface.
      if (CLOUD_SYNC_SECRETS_ENABLED) {
        updates.accessToken = cloudProvider.accessToken;
        updates.refreshToken = cloudProvider.refreshToken;
        updates.providerSpecificData =
          cloudProvider.providerSpecificData || localProvider.providerSpecificData;
      }

      await updateProviderConnection(localProviderId, updates);
    }
  }
}

export { CLOUD_URL, CLOUD_SYNC_TIMEOUT_MS, CLOUD_SYNC_SECRETS_ENABLED };
