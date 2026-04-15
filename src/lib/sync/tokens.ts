import { createHash, randomBytes } from "crypto";
import {
  createSyncTokenRecord,
  getSyncTokenByHash,
  listSyncTokens,
  revokeSyncToken,
  touchSyncTokenLastUsed,
  type SyncTokenRecord,
} from "@/lib/db/syncTokens";
import { getApiKeyMetadata } from "@/lib/db/apiKeys";

function normalizeToken(rawToken: string | null | undefined) {
  if (typeof rawToken !== "string") return null;
  const token = rawToken.trim();
  return token.length > 0 ? token : null;
}

export function hashSyncToken(rawToken: string) {
  return createHash("sha256").update(rawToken).digest("hex");
}

export function generatePlaintextSyncToken() {
  return `osync_${randomBytes(32).toString("base64url")}`;
}

export async function issueSyncToken(params: { name: string; syncApiKeyId?: string | null }) {
  const plaintextToken = generatePlaintextSyncToken();
  const record = await createSyncTokenRecord({
    name: params.name,
    tokenHash: hashSyncToken(plaintextToken),
    syncApiKeyId: params.syncApiKeyId || null,
  });

  return {
    token: plaintextToken,
    record,
  };
}

export async function validateSyncToken(rawToken: string | null | undefined) {
  const token = normalizeToken(rawToken);
  if (!token) return null;

  const record = await getSyncTokenByHash(hashSyncToken(token));
  if (!record || record.revokedAt) return null;
  return record;
}

export async function markSyncTokenUsed(record: SyncTokenRecord) {
  await touchSyncTokenLastUsed(record.id);
}

export async function listSyncTokenSummaries() {
  const records = await listSyncTokens();
  return records.map((record) => ({
    id: record.id,
    name: record.name,
    syncApiKeyId: record.syncApiKeyId,
    revokedAt: record.revokedAt,
    lastUsedAt: record.lastUsedAt,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  }));
}

export async function revokeSyncTokenById(id: string) {
  const revoked = await revokeSyncToken(id);
  if (!revoked) return null;
  return {
    id: revoked.id,
    name: revoked.name,
    syncApiKeyId: revoked.syncApiKeyId,
    revokedAt: revoked.revokedAt,
    lastUsedAt: revoked.lastUsedAt,
    createdAt: revoked.createdAt,
    updatedAt: revoked.updatedAt,
  };
}

export async function resolveSyncApiKeyIdFromManagementRequest(request: Request) {
  const authHeader = request.headers.get("authorization") || request.headers.get("Authorization");
  if (typeof authHeader !== "string") return null;
  const trimmedHeader = authHeader.trim();
  if (!trimmedHeader.toLowerCase().startsWith("bearer ")) return null;

  const apiKey = trimmedHeader.slice(7).trim();
  if (!apiKey) return null;

  const metadata = await getApiKeyMetadata(apiKey);
  return metadata?.id || null;
}

export function getSyncTokenFromRequest(request: Request) {
  const explicitHeader = request.headers.get("x-sync-token");
  if (typeof explicitHeader === "string" && explicitHeader.trim().length > 0) {
    return explicitHeader.trim();
  }

  const authHeader = request.headers.get("authorization") || request.headers.get("Authorization");
  if (typeof authHeader !== "string") return null;
  const trimmedHeader = authHeader.trim();
  if (!trimmedHeader.toLowerCase().startsWith("bearer ")) return null;
  return trimmedHeader.slice(7).trim() || null;
}
