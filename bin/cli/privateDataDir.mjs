// Private-by-default helpers for the OmniRoute data directory (GHSA-2pg2-xm9r-8544).
//
// DATA_DIR holds `.env` (STORAGE_ENCRYPTION_KEY — the key to every credential in
// storage.sqlite) and the database itself. Creating them without an explicit mode lets the
// process umask decide; under the common umask 002 that is 0775 / 0664, i.e. readable by
// every local user. These helpers make the private mode explicit, the same convention the
// CLI already follows elsewhere (contexts.mjs, model-preferences.mjs, setup-qwen.mjs).
//
// chmod is best-effort on purpose: on Windows it is a no-op, and a DATA_DIR owned by another
// user (a bind mount, a shared volume) must not stop the server from starting.

import { chmodSync, existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SECRET_FILES = [".env", "server.env"];

/** Create the data directory owner-only (0700). No-op when it already exists. */
export function ensurePrivateDataDir(dataDir) {
  if (existsSync(dataDir)) return;
  mkdirSync(dataDir, { recursive: true, mode: 0o700 });
  // `mode` is still filtered by the umask on some platforms; pin it explicitly.
  try {
    chmodSync(dataDir, 0o700);
  } catch {
    /* best-effort — see header */
  }
}

/** Write a secrets file owner-only (0600), tightening it if it already existed. */
export function writePrivateFile(filePath, content) {
  writeFileSync(filePath, content, { encoding: "utf-8", mode: 0o600 });
  // `mode` only applies when the file is created — an existing 0664 file keeps its bits.
  try {
    chmodSync(filePath, 0o600);
  } catch {
    /* best-effort — see header */
  }
}

/**
 * Repair an existing install on startup: drop "other" access from the data dir and make the
 * secrets files 0600. Group bits on the directory are left alone — user-private groups are
 * the norm, and a deliberate group share must not break on upgrade; world access is what
 * leaked. Never throws.
 */
export function tightenDataDirSecrets(dataDir) {
  try {
    if (!existsSync(dataDir)) return;
    const current = statSync(dataDir).mode & 0o777;
    if (current & 0o007) chmodSync(dataDir, current & ~0o007);
  } catch {
    /* best-effort — see header */
  }
  for (const name of SECRET_FILES) {
    try {
      const filePath = join(dataDir, name);
      if (existsSync(filePath)) chmodSync(filePath, 0o600);
    } catch {
      /* best-effort — see header */
    }
  }
}
