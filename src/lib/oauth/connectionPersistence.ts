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
export function safeEqual(a: string | null | undefined, b: string | null | undefined): boolean {
  if (a == null || b == null) return a === b;
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/**
 * #7737: does this existing Codex connection represent the SAME account as the
 * incoming login? Prefer workspaceId when either side has one (Team plans).
 * When NEITHER side has a workspaceId (Personal-plan logins, or two accounts
 * that both lack a Team workspace), a bare email match is not enough to prove
 * it's the same account — two different ChatGPT accounts can share an email
 * alias. Require chatgptUserId to agree; otherwise treat it as a distinct
 * account so the caller falls through to createProviderConnection (which
 * already does this same disambiguation, added under #6706).
 */
function isSameCodexAccount(
  existingProviderData: Record<string, any> | null | undefined,
  incomingProviderData: Record<string, any> | null | undefined
): boolean {
  const incomingWorkspace = incomingProviderData?.workspaceId;
  const existingWorkspace = existingProviderData?.workspaceId;
  if (incomingWorkspace || existingWorkspace) {
    return safeEqual(existingWorkspace, incomingWorkspace);
  }
  const incomingUserId = incomingProviderData?.chatgptUserId;
  const existingUserId = existingProviderData?.chatgptUserId;
  return Boolean(incomingUserId) && safeEqual(existingUserId, incomingUserId);
}

/**
 * Find the existing OAuth connection (if any) that an incoming token payload
 * should be merged into, shared by every OAuth-completion call site
 * (persistOAuthConnection, and the exchange/poll/poll-callback branches in
 * `src/app/api/oauth/[provider]/[action]/route.ts`). Matches by explicit
 * connectionId first, then by same email + auth type — with Codex requiring
 * workspaceId/chatgptUserId agreement (#7737) to avoid silently overwriting
 * a different Codex account that merely shares an email.
 */
export function findExistingOAuthConnectionMatch(
  existing: Array<Record<string, any>>,
  provider: string,
  tokenData: Record<string, any>,
  connectionId?: string
): Record<string, any> | undefined {
  return existing.find((c) => {
    if (c.id && safeEqual(connectionId, c.id)) return true;
    // Email dedup only when the payload actually carries an email. Without this
    // guard `safeEqual(undefined, undefined)` is true, so an email-less payload
    // would false-match the first email-less connection of the provider.
    if (!tokenData.email) return false;
    if (!safeEqual(c.email, tokenData.email) || c.authType !== "oauth") return false;
    if (provider === "codex") {
      return isSameCodexAccount(c.providerSpecificData, tokenData.providerSpecificData);
    }
    return true;
  });
}

/**
 * Build the create payload for a brand-new OAuth connection.
 *
 * #5326: mirror the freshly computed `expiresAt` into `tokenExpiresAt` at creation
 * time. The dashboard token-health badge prefers `tokenExpiresAt` over `expiresAt`
 * (ConnectionRow.tsx: `connection.tokenExpiresAt || connection.expiresAt`). If
 * `tokenExpiresAt` stays null on a freshly created connection, the badge falls back
 * to the original grant clock and can flash a false amber/"Token Expired" until the
 * first background refresh writes both fields together. All refresh paths already
 * persist `expiresAt` and `tokenExpiresAt` in lockstep
 * (tokenHealthCheck onPersist, tokenRefresh.updateProviderCredentials); this makes
 * creation consistent with them.
 */
export function buildOAuthConnectionCreatePayload(
  provider: string,
  tokenData: Record<string, any>,
  expiresAt: string | null
) {
  return {
    provider,
    authType: "oauth" as const,
    ...tokenData,
    expiresAt,
    tokenExpiresAt: expiresAt,
    testStatus: "active" as const,
  };
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
  // A connectionId is an explicit "update THIS connection" signal (token refresh
  // / re-auth of a known connection); honor it even when the payload has no
  // top-level email. Some providers (e.g. GitHub Copilot) keep identity under
  // providerSpecificData, so gating dedup on tokenData.email alone created a
  // duplicate connection on every refresh (#8059).
  if (connectionId || tokenData.email) {
    const existing = await getProviderConnections({ provider });
    const match = findExistingOAuthConnectionMatch(existing, provider, tokenData, connectionId);
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
    connection = await createProviderConnection(
      buildOAuthConnectionCreatePayload(provider, tokenData, expiresAt)
    );
  }

  await syncToCloudIfEnabled();
  return connection;
}
