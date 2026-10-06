import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #13679 PR B — src/lib/machineToken.ts::getActiveSalt() (mirrored in
// bin/cli/utils/cliToken.mjs) used to fall back to the checked-in literal default
// salt "omniroute-cli-auth-v1" whenever OMNIROUTE_CLI_SALT was unset. Since the CLI
// bearer token is HMAC-SHA256(raw machine-id, salt) and /etc/machine-id is commonly
// world-readable, every install that never set OMNIROUTE_CLI_SALT derived the SAME
// token from the same machine-id — any local user on that machine could compute it.
// The fix generates a random per-install salt on first use and persists it under
// DATA_DIR, so two installs on the same host (same underlying machine-id) diverge.

test("issue #13679 PR B: two fresh installs derive different CLI tokens from the same machine-id", async () => {
  const previousCliSalt = process.env.OMNIROUTE_CLI_SALT;
  const previousDataDir = process.env.DATA_DIR;
  delete process.env.OMNIROUTE_CLI_SALT; // exercise the default-salt path, not the explicit override

  const dataDirA = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fresh-install-a-"));
  const dataDirB = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fresh-install-b-"));

  try {
    // Each `?fresh*=` query gives tsx/esm a distinct module cache key, so each
    // "install" gets its own copy of machineToken.ts's module-level salt cache
    // instead of reusing whatever the other install already resolved.
    process.env.DATA_DIR = dataDirA;
    const { getMachineTokenSync: getTokenA } = await import(
      `../../src/lib/machineToken.ts?freshA=${Date.now()}-${Math.random()}`
    );
    const tokenA = getTokenA();

    process.env.DATA_DIR = dataDirB;
    const { getMachineTokenSync: getTokenB } = await import(
      `../../src/lib/machineToken.ts?freshB=${Date.now()}-${Math.random()}`
    );
    const tokenB = getTokenB();

    if (!tokenA || !tokenB) {
      // node-machine-id unavailable on this host/platform — nothing to assert.
      return;
    }

    assert.notEqual(
      tokenA,
      tokenB,
      "two fresh installs on the same machine must not derive the same CLI bearer " +
        "token from a shared checked-in default salt (fail-open on the literal default)"
    );

    const saltA = JSON.parse(
      fs.readFileSync(path.join(dataDirA, "cli-token-salt.json"), "utf8")
    ).salt;
    const saltB = JSON.parse(
      fs.readFileSync(path.join(dataDirB, "cli-token-salt.json"), "utf8")
    ).salt;
    assert.match(saltA, /^[0-9a-f]{64}$/, "persisted salt must be a random 64-char hex string");
    assert.match(saltB, /^[0-9a-f]{64}$/, "persisted salt must be a random 64-char hex string");
    assert.notEqual(saltA, saltB, "each install must generate its own random salt");
    assert.notEqual(saltA, "omniroute-cli-auth-v1", "must not persist the checked-in literal");
  } finally {
    if (previousCliSalt === undefined) delete process.env.OMNIROUTE_CLI_SALT;
    else process.env.OMNIROUTE_CLI_SALT = previousCliSalt;
    if (previousDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previousDataDir;
    fs.rmSync(dataDirA, { recursive: true, force: true });
    fs.rmSync(dataDirB, { recursive: true, force: true });
  }
});

test("issue #13679 PR B: a second process on the same install reads back the persisted salt (byte-compatible)", async () => {
  const previousCliSalt = process.env.OMNIROUTE_CLI_SALT;
  const previousDataDir = process.env.DATA_DIR;
  delete process.env.OMNIROUTE_CLI_SALT;

  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-same-install-"));
  process.env.DATA_DIR = dataDir;

  try {
    const { getMachineTokenSync: getTokenFirst } = await import(
      `../../src/lib/machineToken.ts?sameA=${Date.now()}-${Math.random()}`
    );
    const first = getTokenFirst();

    // A brand-new module instance (fresh module-level cache) simulates a second
    // process (e.g. a `omniroute` CLI invocation) starting up against the same
    // DATA_DIR after the salt file already exists.
    const { getMachineTokenSync: getTokenSecond } = await import(
      `../../src/lib/machineToken.ts?sameB=${Date.now()}-${Math.random()}`
    );
    const second = getTokenSecond();

    if (!first || !second) return; // node-machine-id unavailable on this host

    assert.equal(
      first,
      second,
      "two processes reading the same persisted DATA_DIR salt must derive the same token"
    );
  } finally {
    if (previousCliSalt === undefined) delete process.env.OMNIROUTE_CLI_SALT;
    else process.env.OMNIROUTE_CLI_SALT = previousCliSalt;
    if (previousDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previousDataDir;
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});
