/**
 * Shared upsert for OAuth provider connections, used by both the authenticated
 * OAuth route (`device-complete`) and the public Codex device-flow completion
 * endpoint. Mirrors the exchange/poll/poll-callback persistence: normalize the
 * display name, compute expiry, match an existing connection by id or email
 * (+ Codex workspaceId) and update it, else create a new one, then sync to Cloud.
 */
import { timingSafeEqual } from "crypto";
import {
  createProviderConnection,
  updateProviderConnection,
  getProviderConnections,
  isCloudEnabled,
} from "@/models";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";

/**
 * Constant-time string comparison to prevent timing-oracle attacks (CWE-208).
 * Handles null/undefined safely and different-length strings.
 */
function safeEqual(a: string | null | undefined, b: string | null | undefined): boolean {
  if (a == null || b == null) return a === b;
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

async function syncToCloudIfEnabled(): Promise<void> {
  try {
    const cloudEnabled = await isCloudEnabled();
    if (!cloudEnabled) return;
    const machineId = await getConsistentMachineId();
    await syncToCloud(machineId);
  } catch (error) {
    console.log("Error syncing to cloud after OAuth:", error);
  }
}

export async function persistOAuthConnection(
  provider: string,
  tokenData: any,
  connectionId?: string
) {
  // Normalize: if name is missing, use email or displayName as fallback label.
  if (!tokenData.name && (tokenData.email || tokenData.displayName)) {
    tokenData.name = tokenData.email || tokenData.displayName;
  }

  const expiresAt = tokenData.expiresIn
    ? new Date(Date.now() + tokenData.expiresIn * 1000).toISOString()
    : null;

  let connection: any;
  if (tokenData.email) {
    const existing = await getProviderConnections({ provider });
    const match = existing.find((c: any) => {
      if (c.id && safeEqual(connectionId, c.id)) return true;
      if (!safeEqual(c.email, tokenData.email) || c.authType !== "oauth") return false;
      // For Codex, also check workspaceId to avoid overwriting a different workspace.
      if (provider === "codex" && tokenData.providerSpecificData?.workspaceId) {
        const existingWorkspace = c.providerSpecificData?.workspaceId;
        return safeEqual(existingWorkspace, tokenData.providerSpecificData.workspaceId);
      }
      return true;
    });
    const matchId = typeof match?.id === "string" ? match.id : null;
    if (matchId) {
      connection = await updateProviderConnection(matchId, {
        ...tokenData,
        expiresAt,
        testStatus: "active",
        isActive: true,
      });
    }
  }
  if (!connection) {
    connection = await createProviderConnection({
      provider,
      authType: "oauth",
      ...tokenData,
      expiresAt,
      testStatus: "active",
    });
  }

  await syncToCloudIfEnabled();
  return connection;
}
