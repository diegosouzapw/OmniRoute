/**
 * Shared helpers for persisting credential/session material (tokens, cookie jars) to disk
 * with restrictive permissions — 0700 directories, 0600 files — instead of inheriting the
 * process umask (typically 0755/0644).
 *
 * Mirrors the established pattern in src/lib/vncSession/service.ts::createProfileDir.
 * `chmodSync` is applied even on an already-existing directory so a dir created before this
 * hardening (or by any looser writer) is tightened rather than silently trusted.
 */

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

const SECURE_DIR_MODE = 0o700;
const SECURE_FILE_MODE = 0o600;

/** Create `dir` (recursively) with 0700 permissions, tightening it if it already exists. */
export function ensureSecureDir(dir: string): void {
  mkdirSync(dir, { recursive: true, mode: SECURE_DIR_MODE });
  chmodSync(dir, SECURE_DIR_MODE);
}

/** Write `data` to `path` as utf8 with 0600 permissions. */
export function writeSecureFile(path: string, data: string): void {
  writeFileSync(path, data, { encoding: "utf8", mode: SECURE_FILE_MODE });
}
