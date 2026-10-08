import {
  fchmodSync,
  closeSync,
  constants,
  fsyncSync,
  mkdirSync,
  openSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { randomBytes } from "node:crypto";
import { basename, dirname, join } from "node:path";

/**
 * Atomically replace a credential-bearing file without following a destination
 * symlink. The temporary file is private from its first filesystem operation.
 */
export function writePrivateFileAtomic(path, content, { mode = 0o600 } = {}) {
  const directory = dirname(path);
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  const suffix = randomBytes(8).toString("hex");
  const temporary = join(directory, `.${basename(path)}.${process.pid}.${suffix}.tmp`);
  let descriptor;

  try {
    descriptor = openSync(
      temporary,
      constants.O_CREAT | constants.O_EXCL | constants.O_WRONLY | constants.O_NOFOLLOW,
      mode
    );
    writeFileSync(descriptor, String(content), "utf8");
    fchmodSync(descriptor, mode);
    fsyncSync(descriptor);
    closeSync(descriptor);
    descriptor = undefined;
    renameSync(temporary, path);
  } catch (error) {
    if (descriptor !== undefined) {
      try {
        closeSync(descriptor);
      } catch {}
    }
    try {
      unlinkSync(temporary);
    } catch {}
    throw error;
  }
}
