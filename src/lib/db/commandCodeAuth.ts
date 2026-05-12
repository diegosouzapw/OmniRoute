import { createHash, randomUUID } from "crypto";

import { getDbInstance, rowToCamel } from "./core";
import { decrypt, encrypt } from "./encryption";

export type CommandCodeAuthStatus = "pending" | "received" | "applied" | "expired";

export interface CommandCodeAuthMetadata {
  userId?: string;
  userName?: string;
  keyName?: string;
  receivedAt?: string;
}

export interface CommandCodeAuthSafeStatus {
  id: string;
  stateHash: string;
  status: CommandCodeAuthStatus;
  metadata: CommandCodeAuthMetadata | null;
  createdAt: string;
  expiresAt: string;
  receivedAt: string | null;
  appliedAt: string | null;
  updatedAt: string;
}

export interface ConsumedCommandCodeAuthSecret extends CommandCodeAuthSafeStatus {
  apiKey: string;
}

type DbRunResult = { changes?: number };
type DbStatement<TRow = unknown> = {
  get: (...params: unknown[]) => TRow | undefined;
  all: (...params: unknown[]) => TRow[];
  run: (...params: unknown[]) => DbRunResult;
};
type DbLike = {
  prepare: <TRow = unknown>(sql: string) => DbStatement<TRow>;
  transaction: <T extends (...args: unknown[]) => unknown>(fn: T) => T;
};

type AuthSessionRow = {
  id: string;
  state_hash: string;
  status: CommandCodeAuthStatus;
  encrypted_api_key?: string | null;
  metadata_json?: string | null;
  created_at: string;
  expires_at: string;
  received_at?: string | null;
  applied_at?: string | null;
  updated_at: string;
};

function db(): DbLike {
  return getDbInstance() as unknown as DbLike;
}

export function hashCommandCodeAuthState(state: string): string {
  return createHash("sha256").update(state, "utf8").digest("hex");
}

function nowIso(): string {
  return new Date().toISOString();
}

function parseMetadata(value: string | null | undefined): CommandCodeAuthMetadata | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as CommandCodeAuthMetadata;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function toSafeStatus(row: AuthSessionRow): CommandCodeAuthSafeStatus {
  const camel = rowToCamel(row) as Record<string, unknown>;
  return {
    id: String(camel.id),
    stateHash: String(camel.stateHash),
    status: camel.status as CommandCodeAuthStatus,
    metadata: parseMetadata(camel.metadataJson as string | null | undefined),
    createdAt: String(camel.createdAt),
    expiresAt: String(camel.expiresAt),
    receivedAt: (camel.receivedAt as string | null | undefined) ?? null,
    appliedAt: (camel.appliedAt as string | null | undefined) ?? null,
    updatedAt: String(camel.updatedAt),
  };
}

function markExpiredForState(stateHash: string, now = nowIso()): void {
  db()
    .prepare(
      `UPDATE command_code_auth_sessions
       SET status = 'expired', updated_at = ?
       WHERE state_hash = ? AND status IN ('pending', 'received') AND expires_at <= ?`
    )
    .run(now, stateHash, now);
}

export function createPendingCommandCodeAuthSession(input: {
  stateHash: string;
  expiresAt: string;
}): CommandCodeAuthSafeStatus {
  const id = randomUUID();
  const now = nowIso();
  db()
    .prepare(
      `INSERT INTO command_code_auth_sessions (
        id, state_hash, status, encrypted_api_key, metadata_json,
        created_at, expires_at, received_at, applied_at, updated_at
      ) VALUES (?, ?, 'pending', NULL, NULL, ?, ?, NULL, NULL, ?)`
    )
    .run(id, input.stateHash, now, input.expiresAt, now);

  const row = db()
    .prepare<AuthSessionRow>("SELECT * FROM command_code_auth_sessions WHERE id = ?")
    .get(id);
  if (!row) throw new Error("Failed to create Command Code auth session");
  return toSafeStatus(row);
}

export function markCommandCodeAuthSessionReceived(input: {
  stateHash: string;
  apiKey: string;
  metadata?: CommandCodeAuthMetadata;
}): CommandCodeAuthSafeStatus | null {
  const now = nowIso();
  markExpiredForState(input.stateHash, now);
  const metadata: CommandCodeAuthMetadata = {
    ...(input.metadata || {}),
    receivedAt: now,
  };
  const encryptedApiKey = encrypt(input.apiKey);
  db()
    .prepare(
      `UPDATE command_code_auth_sessions
       SET status = 'received', encrypted_api_key = ?, metadata_json = ?, received_at = ?, updated_at = ?
       WHERE state_hash = ? AND status IN ('pending', 'received') AND expires_at > ?`
    )
    .run(encryptedApiKey, JSON.stringify(metadata), now, now, input.stateHash, now);

  return getCommandCodeAuthSessionSafeStatus(input.stateHash);
}

export function getCommandCodeAuthSessionSafeStatus(
  stateHash: string
): CommandCodeAuthSafeStatus | null {
  markExpiredForState(stateHash);
  const row = db()
    .prepare<AuthSessionRow>("SELECT * FROM command_code_auth_sessions WHERE state_hash = ?")
    .get(stateHash);
  return row ? toSafeStatus(row) : null;
}

export function consumeCommandCodeAuthSecret(
  stateHash: string
): ConsumedCommandCodeAuthSecret | null {
  const database = db();
  return database.transaction(() => {
    const now = nowIso();
    database
      .prepare(
        `UPDATE command_code_auth_sessions
         SET status = 'expired', updated_at = ?
         WHERE state_hash = ? AND status IN ('pending', 'received') AND expires_at <= ?`
      )
      .run(now, stateHash, now);

    const row = database
      .prepare<AuthSessionRow>(
        `SELECT * FROM command_code_auth_sessions
         WHERE state_hash = ? AND status = 'received' AND expires_at > ? AND encrypted_api_key IS NOT NULL`
      )
      .get(stateHash, now);
    if (!row?.encrypted_api_key) return null;

    const apiKey = decrypt(row.encrypted_api_key);
    if (!apiKey) return null;

    const result = database
      .prepare(
        `UPDATE command_code_auth_sessions
         SET status = 'applied', encrypted_api_key = NULL, applied_at = ?, updated_at = ?
         WHERE id = ? AND status = 'received'`
      )
      .run(now, now, row.id);
    if (!result.changes) return null;

    return {
      ...toSafeStatus({
        ...row,
        status: "applied",
        encrypted_api_key: null,
        applied_at: now,
        updated_at: now,
      }),
      apiKey,
    };
  })() as ConsumedCommandCodeAuthSecret | null;
}

export function cleanupExpiredCommandCodeAuthSessions(now = nowIso()): number {
  const result = db()
    .prepare(
      `UPDATE command_code_auth_sessions
       SET status = 'expired', updated_at = ?
       WHERE status IN ('pending', 'received') AND expires_at <= ?`
    )
    .run(now, now);
  return result.changes ?? 0;
}
