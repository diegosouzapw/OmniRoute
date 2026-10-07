import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { resolveDataDir } from "../data-dir.mjs";

// #13679 PR B: checked-in literal, used ONLY as a last-resort fallback (see
// getActiveSalt() below) — /etc/machine-id is commonly world-readable, so relying on
// this literal as the real default let any local user derive the same bearer token.
const BUILTIN_DEFAULT_SALT = "omniroute-cli-auth-v1";
const SALT_FILE_NAME = "cli-token-salt.json";
const PERSISTED_SALT_RE = /^[0-9a-f]{64}$/;
export const CLI_TOKEN_HEADER = "x-omniroute-cli-token";

let _cached = null;
let _cachedSalt = null;
let _cachedActiveSalt = null;

/** A `node --test` (or vitest) process that never opted into an explicit DATA_DIR must
 *  not write a salt file into the operator's real home directory. Mirrors
 *  dataPaths.ts::isTestContext() on the TS side. */
function isTestContext() {
  return (
    process.env.NODE_ENV === "test" ||
    !!process.env.VITEST ||
    !!process.env.NODE_TEST_CONTEXT ||
    process.execArgv.includes("--test") ||
    process.argv.includes("--test")
  );
}

function saltFilePath(dataDir) {
  return path.join(dataDir, SALT_FILE_NAME);
}

function readPersistedSalt(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);
    const salt = parsed && typeof parsed === "object" ? parsed.salt : undefined;
    if (typeof salt === "string" && PERSISTED_SALT_RE.test(salt)) return salt;
  } catch {
    // Missing, unreadable, or corrupt — fall through to (re)generation.
  }
  return null;
}

/** Mirrors establishPersistedSalt() in src/lib/machineToken.ts — same resolution
 *  order, same salt file, same `wx`-flag create-race handling — so the CLI and the
 *  server converge on the same bearer token (docs/security/CLI_TOKEN.md). */
function establishPersistedSalt(dataDir) {
  const filePath = saltFilePath(dataDir);
  const existing = readPersistedSalt(filePath);
  if (existing) return existing;

  const generated = crypto.randomBytes(32).toString("hex");
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify({ salt: generated }), { flag: "wx", mode: 0o600 });
    return generated;
  } catch (err) {
    if (err && err.code === "EEXIST") return readPersistedSalt(filePath);
    return null;
  }
}

/** Mirrors getActiveSalt() in src/lib/machineToken.ts so a rotated
 *  OMNIROUTE_CLI_SALT reaches the CLI too (docs/security/CLI_TOKEN.md). */
function getActiveSalt() {
  const envSalt = process.env.OMNIROUTE_CLI_SALT;
  if (envSalt) return envSalt;

  if (_cachedActiveSalt) return _cachedActiveSalt;

  const hasExplicitDataDir = !!(process.env.DATA_DIR && process.env.DATA_DIR.trim());
  if (!hasExplicitDataDir && isTestContext()) {
    _cachedActiveSalt = BUILTIN_DEFAULT_SALT;
    return _cachedActiveSalt;
  }

  const dataDir = resolveDataDir();
  const persisted = establishPersistedSalt(dataDir);
  _cachedActiveSalt = persisted || BUILTIN_DEFAULT_SALT;
  return _cachedActiveSalt;
}

export function deriveCliToken(machineIdModule, salt) {
  try {
    // node-machine-id is CommonJS: under `await import()` its exports land on
    // `.default`, so destructuring `machineIdSync` off the namespace yields
    // undefined and calling it throws — which the catch below turned into an
    // empty token, silently disabling CLI auth for every management request.
    // Same resolution order as src/lib/machineToken.ts.
    const machineIdSync = machineIdModule?.machineIdSync || machineIdModule?.default?.machineIdSync;
    if (typeof machineIdSync !== "function") return "";
    // machineIdSync(true) returns the original unhashed hardware ID — mirrors
    // getMachineTokenSync() in src/lib/machineToken.ts (#10148 cliToken hardening).
    const rawId = machineIdSync(true);
    if (!rawId) return "";
    return crypto.createHmac("sha256", rawId).update(salt).digest("hex");
  } catch {
    return "";
  }
}

export async function getCliToken() {
  const salt = getActiveSalt();
  if (_cached !== null && _cachedSalt === salt) return _cached;
  try {
    const imported = await import("node-machine-id");
    const token = deriveCliToken(imported, salt);
    if (!token) {
      // Swallowing here changes control flow (every management call goes out
      // unauthenticated and 401s), so leave a breadcrumb rather than failing mute.
      console.debug("[CLI_TOKEN] machine-id resolution failed, CLI auth disabled");
    }
    _cached = token;
  } catch (e) {
    console.debug("[CLI_TOKEN] machine-id resolution failed, CLI auth disabled:", e);
    _cached = "";
  }
  _cachedSalt = salt;
  return _cached;
}
