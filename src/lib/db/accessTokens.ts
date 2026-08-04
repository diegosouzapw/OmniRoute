import { createHash, randomBytes, randomUUID } from "crypto";
import { getDbInstance } from "./core";
import { type AccessScope, normalizeScope } from "../accessTokens/scopes";

/**
 * CLI access tokens — scoped credentials for remote-mode management commands.
 * Distinct from `api_keys` (inference). Only the SHA-256 hash is persisted; the
 * plaintext secret is returned exactly once, at creation.
 *
 * Token format: `oma_live_<base64url(32 bytes)>`. The first chars are stored as
 * `token_prefix` so tokens can be listed/identified without revealing the secret.
 */

const TOKEN_RANDOM_BYTES = 32;
const TOKEN_SECRET_PREFIX = "oma_live_";
/** How many leading chars of the secret are kept for display (prefix). */
const DISPLAY_PREFIX_LEN = TOKEN_SECRET_PREFIX.length + 6;

export interface AccessTokenRecord {
  id: string;
  name: string;
  scope: AccessScope;
  tokenPrefix: string;
  createdAt: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
  revokedAt: string | null;
}

/** Result of validating a presented token on a request. */
export interface VerifiedAccessToken {
  id: string;
  name: string;
  scope: AccessScope;
}

interface AccessTokenRow {
  id: string;
  token_hash: string;
  token_prefix: string;
  name: string;
  scope: string;
  created_at: string;
  last_used_at: string | null;
  expires_at: string | null;
  revoked_at: string | null;
}

function rowToRecord(row: AccessTokenRow): AccessTokenRecord {
  return {
    id: row.id,
    name: row.name,
    scope: normalizeScope(row.scope),
    tokenPrefix: row.token_prefix,
    createdAt: row.created_at,
    lastUsedAt: row.last_used_at,
    expiresAt: row.expires_at,
    revokedAt: row.revoked_at,
  };
}

/**
 * Hash a token secret for storage/lookup.
 *
 * SHA-256 is intentional: these are high-entropy random secrets compared by exact
 * hash match for per-request validation, NOT user passwords. bcrypt/scrypt would
 * add ~100ms per request for no security gain. Mirrors `api_keys` hashing.
 * lgtm[js/insufficient-password-hash]
 */
export function hashAccessToken(secret: string): string {
  return createHash("sha256").update(secret).digest("hex"); // nosemgrep: insufficient-password-hash
}

/** True when an ISO timestamp is in the past (treats invalid dates as not-expired). */
function isExpired(expiresAt: string | null): boolean {
  if (!expiresAt) return false;
  const ts = new Date(expiresAt).getTime();
  return Number.isFinite(ts) && ts <= Date.now();
}

/**
 * Create a new access token. Returns the persisted record plus the plaintext
 * secret — the ONLY time the secret is available. Caller must show it once and
 * never store it server-side.
 */
export function createAccessToken(input: {
  name: string;
  scope?: AccessScope | string;
  expiresAt?: string | null;
}): { record: AccessTokenRecord; secret: string } {
  const name = (input.name ?? "").trim();
  if (!name) throw new Error("Access token name is required");

  const db = getDbInstance();
  const scope = normalizeScope(input.scope, "read");
  const secret = `${TOKEN_SECRET_PREFIX}${randomBytes(TOKEN_RANDOM_BYTES).toString("base64url")}`;
  const id = `tok_${randomUUID()}`;
  const tokenHash = hashAccessToken(secret);
  const tokenPrefix = secret.slice(0, DISPLAY_PREFIX_LEN);
  const createdAt = new Date().toISOString();
  const expiresAt = input.expiresAt ?? null;

  db.prepare(
    `INSERT INTO cli_access_tokens
       (id, token_hash, token_prefix, name, scope, created_at, expires_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(id, tokenHash, tokenPrefix, name, scope, createdAt, expiresAt);

  return {
    secret,
    record: {
      id,
      name,
      scope,
      tokenPrefix,
      createdAt,
      lastUsedAt: null,
      expiresAt,
      revokedAt: null,
    },
  };
}

/**
 * Validate a presented secret. Returns the token's identity + scope, or null when
 * the secret is unknown, revoked, or expired. Touches `last_used_at` on success.
 */
export function verifyAccessToken(secret: string | null | undefined): VerifiedAccessToken | null {
  if (!secret || typeof secret !== "string") return null;
  const db = getDbInstance();
  const row = db
    .prepare("SELECT * FROM cli_access_tokens WHERE token_hash = ?")
    .get(hashAccessToken(secret)) as AccessTokenRow | undefined;
  if (!row) return null;
  if (row.revoked_at) return null;
  if (isExpired(row.expires_at)) return null;

  // Best-effort usage stamp; never block validation on the write.
  try {
    db.prepare("UPDATE cli_access_tokens SET last_used_at = ? WHERE id = ?").run(
      new Date().toISOString(),
      row.id
    );
  } catch {
    /* non-fatal */
  }

  return { id: row.id, name: row.name, scope: normalizeScope(row.scope) };
}

/** List all tokens (masked — never includes the secret or its hash). */
export function listAccessTokens(): AccessTokenRecord[] {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT * FROM cli_access_tokens ORDER BY created_at DESC")
    .all() as AccessTokenRow[];
  return rows.map(rowToRecord);
}

/** Fetch one token's masked record by id, or null. */
export function getAccessToken(id: string): AccessTokenRecord | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM cli_access_tokens WHERE id = ?").get(id) as
    | AccessTokenRow
    | undefined;
  return row ? rowToRecord(row) : null;
}

/**
 * Revoke a token by id or by its display prefix. Idempotent: revoking an
 * already-revoked token is a no-op. Returns true when a row was newly revoked.
 */
export function revokeAccessToken(idOrPrefix: string): boolean {
  if (!idOrPrefix) return false;
  const db = getDbInstance();
  const res = db
    .prepare(
      `UPDATE cli_access_tokens SET revoked_at = ?
         WHERE (id = ? OR token_prefix = ?) AND revoked_at IS NULL`
    )
    .run(new Date().toISOString(), idOrPrefix, idOrPrefix);
  return res.changes > 0;
}
