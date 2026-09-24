// GHSA-2pg2-xm9r-8544: on first run the CLI created ~/.omniroute and wrote .env (which holds
// STORAGE_ENCRYPTION_KEY, the key to every credential in storage.sqlite) without an explicit
// mode, so under the common umask 002 the directory was 0775 and .env 0664 — any other local
// user could read the key and the database. These cases pin the private-by-default contract
// of the helpers bin/omniroute.mjs now uses. POSIX-only: Windows has no mode bits to check.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { ensurePrivateDataDir, writePrivateFile, tightenDataDirSecrets } =
  await import("../../bin/cli/privateDataDir.mjs");

const posix = process.platform !== "win32";
const mode = (p: string) => fs.statSync(p).mode & 0o777;

let root: string;
let previousUmask: number;

test.beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-perms-"));
  previousUmask = process.umask(0o002); // the umask from the report
});

test.afterEach(() => {
  process.umask(previousUmask);
  fs.rmSync(root, { recursive: true, force: true });
});

test("a fresh data dir is created 0700 even under umask 002", { skip: !posix }, () => {
  const dataDir = path.join(root, "fresh", ".omniroute");
  ensurePrivateDataDir(dataDir);
  assert.equal(mode(dataDir), 0o700);
});

test("the secrets file is written 0600 even under umask 002", { skip: !posix }, () => {
  const envPath = path.join(root, ".env");
  writePrivateFile(envPath, "STORAGE_ENCRYPTION_KEY=abc\n");
  assert.equal(mode(envPath), 0o600);
  assert.equal(fs.readFileSync(envPath, "utf8"), "STORAGE_ENCRYPTION_KEY=abc\n");
});

test("rewriting an existing world-readable secrets file also tightens it", { skip: !posix }, () => {
  const envPath = path.join(root, ".env");
  fs.writeFileSync(envPath, "OLD=1\n", { mode: 0o664 });
  fs.chmodSync(envPath, 0o664);
  writePrivateFile(envPath, "OLD=1\nSTORAGE_ENCRYPTION_KEY=abc\n");
  assert.equal(mode(envPath), 0o600);
});

test(
  "an existing install is repaired on startup: world bits off the dir, .env/server.env 0600",
  { skip: !posix },
  () => {
    const dataDir = path.join(root, ".omniroute");
    fs.mkdirSync(dataDir, { mode: 0o775 });
    fs.chmodSync(dataDir, 0o775);
    for (const name of [".env", "server.env"]) {
      fs.writeFileSync(path.join(dataDir, name), "K=v\n");
      fs.chmodSync(path.join(dataDir, name), 0o664);
    }

    tightenDataDirSecrets(dataDir);

    // Group bits are left alone on purpose: user-private groups are the norm and a deliberate
    // group share (e.g. a docker group) must not break on upgrade. "Other" is what leaked.
    assert.equal(mode(dataDir) & 0o007, 0, "no world access to the data dir");
    assert.equal(mode(path.join(dataDir, ".env")), 0o600);
    assert.equal(mode(path.join(dataDir, "server.env")), 0o600);
  }
);

test("repair is best-effort: a missing dir or file never throws", () => {
  assert.doesNotThrow(() => tightenDataDirSecrets(path.join(root, "does-not-exist")));
});
