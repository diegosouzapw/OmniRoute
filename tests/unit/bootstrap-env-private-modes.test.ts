// GHSA-mh4f-3xj9-4gc4 (follow-up to GHSA-2pg2-xm9r-8544): bootstrapEnv() writes the
// generated JWT_SECRET / STORAGE_ENCRYPTION_KEY / API_KEY_SECRET into DATA_DIR/server.env.
// It created the file and the directory without an explicit mode, so under the usual
// umask 022 they came out 0644 / 0755 — readable by other local accounts (macOS `staff`,
// Debian 0755 homes, the Docker ./data bind mount). These cases pin private modes for a
// fresh write and the repair of a file an earlier version left world-readable.
// POSIX-only: Windows has no mode bits to check.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { bootstrapEnv } from "../../scripts/build/bootstrap-env.mjs";

const posix = process.platform !== "win32";
const mode = (p: string) => fs.statSync(p).mode & 0o777;
const SECRET_KEYS = ["JWT_SECRET", "STORAGE_ENCRYPTION_KEY", "API_KEY_SECRET"];

function withIsolatedEnv(fn: (dataDir: string) => void) {
  const originalCwd = process.cwd();
  const originalEnv = { ...process.env };
  const previousUmask = process.umask(0o022);
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-envmode-"));
  const home = path.join(root, "home");
  const cwd = path.join(root, "cwd");
  fs.mkdirSync(home, { recursive: true });
  fs.mkdirSync(cwd, { recursive: true });
  for (const key of [...SECRET_KEYS, "STORAGE_ENCRYPTION_KEY_VERSION", "DATA_DIR"]) {
    delete process.env[key];
  }
  delete process.env.XDG_CONFIG_HOME;
  process.env.HOME = home;
  process.chdir(cwd);
  try {
    fn(path.join(home, ".omniroute"));
  } finally {
    process.chdir(originalCwd);
    process.umask(previousUmask);
    for (const key of Object.keys(process.env)) if (!(key in originalEnv)) delete process.env[key];
    Object.assign(process.env, originalEnv);
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test(
  "a first run creates the data dir 0700 and server.env 0600 under umask 022",
  { skip: !posix },
  () => {
    withIsolatedEnv((dataDir) => {
      bootstrapEnv({ quiet: true });
      const serverEnv = path.join(dataDir, "server.env");
      assert.equal(mode(dataDir), 0o700);
      assert.equal(mode(serverEnv), 0o600);
      const written = fs.readFileSync(serverEnv, "utf8");
      for (const key of SECRET_KEYS) assert.match(written, new RegExp(`^${key}=\\S`, "m"));
    });
  }
);

test(
  "a server.env an earlier version left 0644 is tightened on the next start",
  { skip: !posix },
  () => {
    withIsolatedEnv((dataDir) => {
      bootstrapEnv({ quiet: true });
      const serverEnv = path.join(dataDir, "server.env");
      fs.chmodSync(serverEnv, 0o644);
      fs.chmodSync(dataDir, 0o755);

      // Nothing is missing, so nothing is rewritten — the repair must still happen.
      bootstrapEnv({ quiet: true });
      assert.equal(mode(serverEnv), 0o600);
      assert.equal(mode(dataDir) & 0o007, 0, "no world access to the data dir");
    });
  }
);

test(
  "rewriting an existing 0644 server.env to add a missing secret keeps it 0600",
  { skip: !posix },
  () => {
    withIsolatedEnv((dataDir) => {
      bootstrapEnv({ quiet: true });
      const serverEnv = path.join(dataDir, "server.env");
      fs.writeFileSync(
        serverEnv,
        fs.readFileSync(serverEnv, "utf8").replace(/^API_KEY_SECRET=.*\n/m, "")
      );
      fs.chmodSync(serverEnv, 0o644);
      bootstrapEnv({ quiet: true });
      assert.equal(mode(serverEnv), 0o600);
      assert.match(fs.readFileSync(serverEnv, "utf8"), /^API_KEY_SECRET=\S/m);
    });
  }
);
