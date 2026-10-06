/**
 * Persist Cursor OAuth credentials (deep-control login or improved import).
 */

import {
  createProviderConnection,
  getProviderConnections,
  updateProviderConnection,
} from "@/models";
import type { CursorTokenCredentials } from "./cursorLogin";

export type PersistCursorAuthMethod = "deep_control" | "imported" | "cursor-agent";

export type PersistCursorConnectionInput = CursorTokenCredentials & {
  machineId?: string | null;
  authMethod: PersistCursorAuthMethod;
};

function readAccountId(psd: unknown): string | null {
  if (!psd || typeof psd !== "object") return null;
  const rec = psd as Record<string, unknown>;
  for (const key of ["accountId", "userId"]) {
    const v = rec[key];
    if (typeof v === "string" && v.length > 0) return v;
  }
  return null;
}

/**
 * Create or update a Cursor connection. Prefers accountId (JWT sub) match for
 * multi-account safety; falls back to createProviderConnection email upsert.
 */
export async function persistCursorConnection(input: PersistCursorConnectionInput) {
  const providerSpecificData = {
    machineId: input.machineId || null,
    authMethod: input.authMethod,
    provider: input.authMethod === "deep_control" ? "Deep Control" : "Imported",
    accountId: input.accountId || null,
    userId: input.accountId || null,
    ...(input.accountId ? { username: input.accountId } : {}),
  };

  if (input.accountId) {
    const existing = (await getProviderConnections({ provider: "cursor" })) as Array<{
      id: string;
      providerSpecificData?: unknown;
    }>;
    const match = existing.find(
      (row) => readAccountId(row.providerSpecificData) === input.accountId
    );
    if (match) {
      return updateProviderConnection(match.id, {
        accessToken: input.accessToken,
        refreshToken: input.refreshToken,
        expiresAt: input.expiresAt.toISOString(),
        email: input.email || undefined,
        providerSpecificData,
        testStatus: "active",
        lastError: null,
        lastErrorType: null,
        errorCode: null,
      });
    }
  }

  return createProviderConnection({
    provider: "cursor",
    authType: "oauth",
    accessToken: input.accessToken,
    refreshToken: input.refreshToken,
    expiresAt: input.expiresAt.toISOString(),
    email: input.email || null,
    providerSpecificData,
    testStatus: "active",
  });
}
