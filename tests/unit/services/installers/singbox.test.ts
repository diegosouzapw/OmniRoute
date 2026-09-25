import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-singbox-installer-"));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

// DB bootstrap
const core = await import("../../../../src/lib/db/core.ts");
const db = core.getDbInstance();
db.prepare(
  `INSERT OR IGNORE INTO version_manager (tool, status, port, auto_start, auto_update, provider_expose)
   VALUES ('singbox', 'not_installed', 20140, 0, 0, 0)`
).run();

const singbox = await import("../../../../src/lib/services/installers/singbox.ts");

test("singbox installer: getInstalledVersion returns null when not installed", async () => {
  const version = await singbox.getInstalledVersion();
  assert.equal(version, null);
});

test("singbox installer: resolveSpawnArgs builds executable command", () => {
  const spawnArgs = singbox.resolveSpawnArgs(20140);
  assert.equal(spawnArgs.command, singbox.getBinPath());
  assert.deepEqual(spawnArgs.args, ["run", "-c", singbox.getConfigPath()]);
  assert.equal(spawnArgs.env.SINGBOX_PORT, "20140");
});

test("singbox installer: generateDefaultSingboxConfig wires a tproxy inbound on the given port", () => {
  const cfg = singbox.generateDefaultSingboxConfig(31000, 20128) as {
    inbounds: Array<{ type: string; listen_port: number }>;
  };
  const tproxyInbound = cfg.inbounds.find((i) => i.type === "tproxy");
  assert.ok(tproxyInbound, "config must declare a tproxy inbound");
  assert.equal(tproxyInbound?.listen_port, 31000);
});

test("singbox installer: install() refuses a version with no pinned checksum, without ever downloading", async () => {
  let fetchCalled = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    fetchCalled = true;
    throw new Error("must not be called for an unpinned version");
  }) as typeof fetch;

  try {
    await assert.rejects(
      () => singbox.install("9.9.9-not-pinned"),
      /no pinned checksum|checksum verificado/i
    );
    assert.equal(fetchCalled, false, "the pinned-version guard must run before any network call");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("singbox installer: install() rejects the pinned version when the downloaded archive fails checksum verification", async () => {
  const originalFetch = globalThis.fetch;
  const fakeArchiveBytes = Buffer.from("definitely not the real sing-box release archive");
  globalThis.fetch = (async () => new Response(fakeArchiveBytes, { status: 200 })) as typeof fetch;

  try {
    await assert.rejects(
      () => singbox.install(singbox.SINGBOX_PINNED_VERSION),
      /checksum mismatch/i
    );
    // no partial/tampered binary must ever be written or registered as installed
    assert.equal(fs.existsSync(singbox.getBinPath()), false);
    assert.equal(await singbox.getInstalledVersion(), null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("singbox installer: install() surfaces a download failure instead of silently installing a mock binary", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => new Response(null, { status: 503 })) as typeof fetch;

  try {
    await assert.rejects(
      () => singbox.install(singbox.SINGBOX_PINNED_VERSION),
      /download failed|falha ao baixar/i
    );
    assert.equal(fs.existsSync(singbox.getBinPath()), false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
