import bcrypt from "bcryptjs";
import argon2 from "@node-rs/argon2";
import { getSettings, updateSettings } from "@/lib/db/settings";

// OWASP Argon2id parameters (RFC 9106 high-memory profile).
const ARGON2_PARAMS = {
  algorithm: argon2.Algorithm.Argon2id,
  memoryCost: 19456, // 19 MiB — above OWASP minimum, friendlier on small VPS hosts.
  timeCost: 2,
  parallelism: 1,
} as const;

// Matches any bcrypt variant: $2a$, $2b$, $2y$, $2x$. The trailing base64 salt+hash is intentionally
// not length-pinned here — `bcrypt.compare()` validates the full structure at verify time, and we
// only need a prefix match to route the verify path.
const BCRYPT_HASH_PATTERN = /^\$2[abxy]\$\d{2}\$/;

// Matches any argon2 hash (id, i, or d variant).
const ARGON2_HASH_PATTERN = /^\$argon2(id|i|d)\$v=\d+\$/;

// Matches argon2id + argon2i (modern recommendations). Excludes argon2d (legacy data-independent).
const ARGON2ID_HASH_PATTERN = /^\$argon2(id|i)\$v=\d+\$/;

// Well-known placeholder shipped in `.env.example` (INITIAL_PASSWORD=CHANGEME). Bootstrapping
// with it leaves the dashboard open to anyone, so we warn loudly on boot (Seg2 hardening).
const INSECURE_DEFAULT_PASSWORDS = new Set(["CHANGEME"]);

type JsonRecord = Record<string, unknown>;

type MigrationSource = "stored_hash" | "stored_plaintext" | "env" | "missing";

interface EnsureManagementPasswordOptions {
  initialPassword?: string | null;
  logger?: Pick<Console, "log"> & Partial<Pick<Console, "warn">>;
  settings?: JsonRecord;
  source?: string;
}

export interface EnsuredManagementPassword {
  hash: string | null;
  migrated: boolean;
  settings: JsonRecord;
  source: MigrationSource;
}

function getInitialPasswordValue(value: string | null | undefined) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

export function getStoredManagementPassword(settings: JsonRecord | null | undefined) {
  return typeof settings?.password === "string" ? settings.password : "";
}

export function hasManagementPasswordConfigured(settings: JsonRecord | null | undefined) {
  return (
    getStoredManagementPassword(settings).length > 0 ||
    getInitialPasswordValue(process.env.INITIAL_PASSWORD) !== null
  );
}

export function isArgon2Hash(value: unknown): value is string {
  return typeof value === "string" && ARGON2_HASH_PATTERN.test(value);
}

export function isBcryptHash(value: unknown): value is string {
  return typeof value === "string" && BCRYPT_HASH_PATTERN.test(value);
}

export function isArgon2idHash(value: unknown): value is string {
  return typeof value === "string" && ARGON2ID_HASH_PATTERN.test(value);
}

function validatePassword(password: unknown): asserts password is string {
  if (typeof password !== "string" || password.length === 0) {
    throw new TypeError("hashManagementPassword requires a non-empty string");
  }
}

export async function hashManagementPassword(password: string): Promise<string> {
  validatePassword(password);
  return argon2.hash(password, ARGON2_PARAMS);
}

export async function verifyManagementPassword(
  password: string,
  storedHash: string,
  upgrader: (nextHash: string) => Promise<void> = async (nextHash) => {
    await updateSettings({ managementPasswordHash: nextHash });
  },
): Promise<boolean> {
  if (!storedHash) return false;
  if (isArgon2idHash(storedHash)) {
    try {
      return await argon2.verify(storedHash, password);
    } catch {
      return false;
    }
  }
  if (isBcryptHash(storedHash)) {
    let ok = false;
    try {
      ok = await bcrypt.compare(password, storedHash);
    } catch {
      return false;
    }
    if (!ok) return false;
    // Transparent upgrade: re-hash with argon2 on next successful login.
    const upgraded = await argon2.hash(password, ARGON2_PARAMS);
    try {
      await upgrader(upgraded);
    } catch {
      // Upgrade write failed; auth still succeeded — caller decides whether to surface.
    }
    return true;
  }
  return false;
}

export async function ensurePersistentManagementPasswordHash(
  options: EnsureManagementPasswordOptions = {},
): Promise<EnsuredManagementPassword> {
  const settings = options.settings ?? ((await getSettings()) as JsonRecord);
  const storedPassword = getStoredManagementPassword(settings);

  if (isBcryptHash(storedPassword)) {
    return {
      hash: storedPassword,
      migrated: false,
      settings,
      source: "stored_hash",
    };
  }

  const bootstrapPassword =
    storedPassword ||
    getInitialPasswordValue(options.initialPassword ?? process.env.INITIAL_PASSWORD);

  if (bootstrapPassword && INSECURE_DEFAULT_PASSWORDS.has(bootstrapPassword)) {
    const warn = options.logger?.warn?.bind(options.logger) ?? console.warn;
    warn(
      '[AUTH][SECURITY] Management password is set to the well-known default "CHANGEME" ' +
        "(INITIAL_PASSWORD in .env.example). Anyone can sign in to the dashboard with it — " +
        "change it immediately via the dashboard or a strong INITIAL_PASSWORD.",
    );
  }

  if (!bootstrapPassword) {
    return {
      hash: null,
      migrated: false,
      settings,
      source: "missing",
    };
  }

  const passwordHash = await hashManagementPassword(bootstrapPassword);
  const updates: JsonRecord = { password: passwordHash };

  if (settings.setupComplete !== true) {
    updates.setupComplete = true;
  }
  if (!storedPassword) {
    updates.requireLogin = true;
  }

  const nextSettings = (await updateSettings(updates)) as JsonRecord;
  if (options.logger) {
    const context = options.source ? ` during ${options.source}` : "";
    const migrationSource = storedPassword ? "stored plaintext password" : "INITIAL_PASSWORD";
    options.logger.log(`[AUTH] Migrated ${migrationSource} to argon2id hash${context}`);
  }

  return {
    hash: getStoredManagementPassword(nextSettings) || passwordHash,
    migrated: true,
    settings: nextSettings,
    source: storedPassword ? "stored_plaintext" : "env",
  };
}
