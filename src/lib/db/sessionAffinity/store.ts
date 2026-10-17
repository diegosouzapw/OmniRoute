export type SessionAccountAffinityRecord = {
  connectionId: string;
  /** SHA-256 of resolveUsageAccountIdentity().accountKey; never a label or credential. */
  accountIdentity?: string;
  createdAt: string;
  lastUsedAt: string;
  expiresAt: string;
};

type Result<T> = T | Promise<T>;

/** SQLite stays synchronous; request callers await only Promise results (Redis). */
export interface SessionAffinityStore {
  readonly driver: "sqlite" | "redis";
  get(
    sessionKey: string,
    provider: string,
    ttlMs?: number,
    now?: number
  ): Result<SessionAccountAffinityRecord | null>;
  /** Rejected Redis CAS returns the current winner (null if gone); accepted/local writes return void. */
  upsert(
    sessionKey: string,
    provider: string,
    connectionId: string,
    now?: number,
    ttlMs?: number,
    accountIdentity?: string,
    /** Routing snapshot; null is an observed shared miss. Omit only for standalone mutations. */
    observed?: SessionAccountAffinityRecord | null
  ): Result<void | SessionAccountAffinityRecord | null>;
  touch(sessionKey: string, provider: string, now?: number, ttlMs?: number): Result<void>;
  delete(
    sessionKey: string,
    provider: string,
    observed?: SessionAccountAffinityRecord | null
  ): Result<void>;
  /** Conditional deletion, independent of the request's TTL setting (#6219). */
  evict(
    sessionKey: string,
    provider: string,
    connectionId: string,
    accountIdentity?: string
  ): Result<boolean>;
}
