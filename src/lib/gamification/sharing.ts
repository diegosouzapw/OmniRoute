/**
 * Token sharing — transfer tokens between API keys.
 *
 * @module lib/gamification/sharing
 */

import crypto from "crypto";

/**
 * Transfer tokens from one API key to another.
 * Uses double-entry ledger with idempotency key.
 */
export async function transferTokens(
  fromApiKeyId: string,
  toApiKeyId: string,
  amount: number,
  reason?: string,
  idempotencyKey?: string
): Promise<{ success: boolean; idempotencyKey: string; error?: string }> {
  if (fromApiKeyId === toApiKeyId) {
    return { success: false, idempotencyKey: "", error: "Cannot transfer to yourself" };
  }
  if (amount <= 0) {
    return { success: false, idempotencyKey: "", error: "Amount must be positive" };
  }

  const key = idempotencyKey || crypto.randomUUID();

  try {
    const { transferTokens: dbTransfer } = await import("../db/gamification");
    const result = dbTransfer(fromApiKeyId, toApiKeyId, amount, reason || "transfer", key);
    if (!result.success) {
      return { success: false, idempotencyKey: key, error: result.error };
    }
    return { success: true, idempotencyKey: key };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, idempotencyKey: key, error: message };
  }
}

/**
 * Get token balance for an API key.
 */
export async function getBalance(apiKeyId: string): Promise<number> {
  const { getBalance: dbGetBalance } = await import("../db/gamification");
  return dbGetBalance(apiKeyId);
}

/**
 * Get transfer history for an API key.
 */
export async function getHistory(apiKeyId: string, limit: number = 20) {
  const { getHistory: dbGetHistory } = await import("../db/gamification");
  return dbGetHistory(apiKeyId, limit);
}
