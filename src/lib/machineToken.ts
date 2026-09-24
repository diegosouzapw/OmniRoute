import { createHash, createHmac, randomBytes } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import * as nodeModule from "node:module";
import { resolveDataDir, isTestContext } from "./dataPaths";

let machineIdSync: (original?: boolean) => string;
try {
  // Anchor runtime resolution to the process entrypoint. Turbopack rewrites
  // createRequire(import.meta.url) into an in-bundle resolver, which cannot load
  // external CommonJS packages from the installed standalone node_modules tree.
  const runtimeRequire = nodeModule.createRequire(process.argv[1] || process.cwd());
  const mod = runtimeRequire("node-machine-id");
  machineIdSync = mod.machineIdSync || mod.default?.machineIdSync;
} catch {
  machineIdSync = () => "";
}

// #13679 PR B: checked-in literal, used ONLY as a last-resort fallback (see
// getActiveSalt() below) — /etc/machine-id is commonly world-readable, so relying on
// this literal as the real default let any local user derive the same bearer token.
const BUILTIN_DEFAULT_SALT = "omniroute-cli-auth-v1";
const SALT_FILE_NAME = "cli-token-salt.json";
const PERSISTED_SALT_RE = /^[0-9a-f]{64}$/;

function saltFilePath(dataDir: string): string {
  return path.join(dataDir, SALT_FILE_NAME);
}

function readPersistedSalt(filePath: string): string | null {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed: unknown = JSON.parse(raw);
    const salt = (parsed as { salt?: unknown } | null)?.salt;
    if (typeof salt === "string" && PERSISTED_SALT_RE.test(salt)) return salt;
  } catch {
    // Missing, unreadable, or corrupt — fall through to (re)generation.
  }
  return null;
}

/**
 * Generate a random per-install salt on first use and persist it under DATA_DIR so
 * every process on this install (the server and every `omniroute` CLI invocation,
 * see the mirrored logic in bin/cli/utils/cliToken.mjs) converges on the same value.
 * The write uses the `wx` flag (fails if the file already exists) so a race between
 * two processes both hitting "no file yet" at once cannot clobber one another — the
 * loser just reads back what the winner wrote instead of overwriting it.
 */
function establishPersistedSalt(dataDir: string): string | null {
  const filePath = saltFilePath(dataDir);
  const existing = readPersistedSalt(filePath);
  if (existing) return existing;

  const generated = randomBytes(32).toString("hex");
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify({ salt: generated }), { flag: "wx", mode: 0o600 });
    return generated;
  } catch (err) {
    if ((err as NodeJS.ErrnoException | null)?.code === "EEXIST") {
      return readPersistedSalt(filePath);
    }
    return null;
  }
}

let cachedActiveSalt: string | null = null;

function getActiveSalt(): string {
  const envSalt = process.env.OMNIROUTE_CLI_SALT;
  if (envSalt) return envSalt;

  if (cachedActiveSalt) return cachedActiveSalt;

  const hasExplicitDataDir = !!process.env.DATA_DIR?.trim();
  // A test process that never opted into an explicit DATA_DIR must not write a salt
  // file into the operator's real home directory — mirrors the same class of guard
  // resolveWritableDataDir() applies for the DB (dataPaths.ts::isTestContext). Falling
  // back to the literal here only affects tests that forgot to set DATA_DIR; every
  // production path (server boot, packaged CLI) always has one.
  if (!hasExplicitDataDir && isTestContext()) {
    cachedActiveSalt = BUILTIN_DEFAULT_SALT;
    return cachedActiveSalt;
  }

  const dataDir = resolveDataDir();
  const persisted = establishPersistedSalt(dataDir);
  cachedActiveSalt = persisted ?? BUILTIN_DEFAULT_SALT;
  return cachedActiveSalt;
}

export function deriveMachineToken(rawId: string, salt: string): string {
  if (!rawId) return "";
  return createHmac("sha256", rawId).update(salt).digest("hex");
}

export function deriveLegacyCliToken(machineId: string, salt: string): string {
  if (!machineId) return "";
  return createHash("sha256")
    .update(machineId + salt)
    .digest("hex")
    .substring(0, 32);
}

let cached: string | null = null;
let cachedSalt: string | null = null;

export function getMachineTokenSync(salt?: string): string {
  const activeSalt = salt ?? getActiveSalt();
  try {
    // machineIdSync(true) returns the original unhashed hardware ID.
    const rawId = machineIdSync(true);
    if (!rawId) return "";
    if (activeSalt === cachedSalt && cached !== null) return cached;
    const token = deriveMachineToken(rawId, activeSalt);
    if (!salt) {
      cached = token;
      cachedSalt = activeSalt;
    }
    return token;
  } catch {
    return "";
  }
}

export function getLegacyCliTokenSync(salt?: string): string {
  const activeSalt = salt ?? getActiveSalt();
  try {
    const machineId = machineIdSync();
    return deriveLegacyCliToken(machineId, activeSalt);
  } catch {
    return "";
  }
}
