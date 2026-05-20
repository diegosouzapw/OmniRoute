/**
 * Invite/redeem tokens for server connection.
 *
 * @module lib/gamification/invites
 */

import crypto from "crypto";

/**
 * Generate an invite code (8-char alphanumeric, human-readable).
 */
function generateInviteCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  const bytes = crypto.randomBytes(8);
  for (let i = 0; i < 8; i++) {
    code += chars[bytes[i] % chars.length];
  }
  return code;
}

/**
 * Hash a token for storage (SHA-256).
 */
function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Create an invite token for server connection.
 * Returns the plaintext code (show to user) and token (for redemption).
 */
export async function createInvite(
  createdByApiKeyId: string,
  serverUrl?: string,
  maxUses: number = 1
): Promise<{ code: string; token: string }> {
  const code = generateInviteCode();
  const token = crypto.randomBytes(32).toString("base64url");
  const tokenHash = hashToken(token);
  const id = crypto.randomUUID();

  const { createInviteToken } = await import("../db/gamification");
  createInviteToken(id, code, tokenHash, createdByApiKeyId, serverUrl, maxUses);

  return { code, token };
}

/**
 * Redeem an invite code. Returns server info if successful.
 */
export async function redeemInvite(
  code: string,
  usedByApiKeyId: string
): Promise<{ success: boolean; serverUrl?: string; error?: string }> {
  const { getInviteByCode, redeemInvite: dbRedeem } = await import("../db/gamification");

  const invite = getInviteByCode(code);
  if (!invite) {
    return { success: false, error: "Invalid invite code" };
  }

  if (invite.revokedAt) {
    return { success: false, error: "Invite has been revoked" };
  }

  if (invite.expiresAt && new Date(invite.expiresAt) < new Date()) {
    return { success: false, error: "Invite has expired" };
  }

  if (invite.useCount >= invite.maxUses) {
    return { success: false, error: "Invite has been fully redeemed" };
  }

  if (invite.createdBy === usedByApiKeyId) {
    return { success: false, error: "Cannot redeem your own invite" };
  }

  const redeemed = dbRedeem(code, usedByApiKeyId);
  if (!redeemed) {
    return { success: false, error: "Failed to redeem invite" };
  }

  return { success: true, serverUrl: invite.serverUrl || undefined };
}

/**
 * List invites created by an API key.
 */
export async function listInvites(apiKeyId: string) {
  const db = (await import("../db/core")).getDbInstance();

  const rows = db
    .prepare(
      `SELECT id, code, server_url, max_uses, use_count, expires_at, revoked_at, created_at
       FROM invite_tokens WHERE created_by = ? ORDER BY created_at DESC`
    )
    .all(apiKeyId) as Array<{
    id: string;
    code: string;
    server_url: string | null;
    max_uses: number;
    use_count: number;
    expires_at: string | null;
    revoked_at: string | null;
    created_at: string;
  }>;

  return rows.map((r) => ({
    id: r.id,
    code: r.code,
    serverUrl: r.server_url,
    maxUses: r.max_uses,
    useCount: r.use_count,
    expiresAt: r.expires_at,
    revokedAt: r.revoked_at,
    createdAt: r.created_at,
  }));
}

/**
 * Revoke an invite token.
 */
export async function revokeInvite(inviteId: string): Promise<boolean> {
  const { revokeInvite: dbRevoke } = await import("../db/gamification");
  dbRevoke(inviteId);
  return true;
}
