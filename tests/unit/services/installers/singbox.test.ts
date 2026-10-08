import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

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
  const cfg = singbox.generateDefaultSingboxConfig(31000) as {
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

// ── Stubbed-downloader contract tests ─────────────────────────────────────────────
// The archive layout and URL below follow the official SagerNet release assets:
//   https://github.com/SagerNet/sing-box/releases/download/v<ver>/sing-box-<ver>-<os>-<arch>.tar.gz
//   containing  sing-box-<ver>-<os>-<arch>/sing-box   (+ LICENSE).
// This proves our code matches that SHAPE with a locally built archive; it does NOT prove
// GitHub still serves that layout, nor that the pinned SHA256s match today's assets.

const hostPlatform = process.platform === "win32" ? "windows" : process.platform;
const hostArch = process.arch === "arm64" ? "arm64" : "amd64";
const PLATFORM_KEY = `${hostPlatform}-${hostArch}`;
const POSIX_HOST = process.platform === "linux" || process.platform === "darwin";

function buildReleaseArchive(opts: { withBinary: boolean }): { bytes: Buffer; sha256: string } {
  const version = singbox.SINGBOX_PINNED_VERSION;
  const stage = fs.mkdtempSync(path.join(os.tmpdir(), "singbox-fixture-"));
  const topDir = `sing-box-${version}-${hostPlatform}-${hostArch}`;
  fs.mkdirSync(path.join(stage, topDir));
  fs.writeFileSync(path.join(stage, topDir, "LICENSE"), "fixture license\n");
  if (opts.withBinary) {
    fs.writeFileSync(path.join(stage, topDir, "sing-box"), "#!/bin/sh\n# fixture archive entry\n");
  }
  const archive = path.join(stage, "release.tar.gz");
  execFileSync("tar", ["czf", archive, "-C", stage, topDir]);
  const bytes = fs.readFileSync(archive);
  fs.rmSync(stage, { recursive: true, force: true });
  return { bytes, sha256: crypto.createHash("sha256").update(bytes).digest("hex") };
}

function stubFetch(bytes: Buffer) {
  const urls: string[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (input: string | URL | Request) => {
    urls.push(String(input));
    return new Response(bytes, { status: 200 });
  }) as typeof fetch;
  return { urls, restore: () => (globalThis.fetch = original) };
}

test("singbox installer: pinned checksum table is well-formed and covers every release platform", () => {
  assert.match(singbox.SINGBOX_PINNED_VERSION, /^\d+\.\d+\.\d+$/);
  assert.deepEqual(Object.keys(singbox.SINGBOX_CHECKSUMS).sort(), [
    "darwin-amd64",
    "darwin-arm64",
    "linux-amd64",
    "linux-arm64",
    "windows-amd64",
  ]);
  for (const [key, sum] of Object.entries(singbox.SINGBOX_CHECKSUMS)) {
    assert.match(sum, /^[0-9a-f]{64}$/, `${key} must be a lowercase SHA256 hex digest`);
  }
});

test(
  "singbox installer: install() rejects an archive that has no sing-box binary after extraction",
  {
    skip: !POSIX_HOST,
  },
  async () => {
    const { bytes, sha256 } = buildReleaseArchive({ withBinary: false });
    const f = stubFetch(bytes);
    try {
      await assert.rejects(
        () =>
          singbox.installWithChecksums(singbox.SINGBOX_PINNED_VERSION, { [PLATFORM_KEY]: sha256 }),
        /binary not found/i
      );
      assert.equal(fs.existsSync(singbox.getBinPath()), false);
      assert.equal(await singbox.getInstalledVersion(), null);
    } finally {
      f.restore();
    }
  }
);

test(
  "singbox installer: a checksum mismatch deletes the downloaded archive and installs nothing",
  {
    skip: !POSIX_HOST,
  },
  async () => {
    const { bytes } = buildReleaseArchive({ withBinary: true });
    const f = stubFetch(bytes);
    try {
      await assert.rejects(
        () =>
          singbox.installWithChecksums(singbox.SINGBOX_PINNED_VERSION, {
            [PLATFORM_KEY]: "0".repeat(64),
          }),
        /checksum mismatch/i
      );
      const installDir = path.dirname(singbox.getBinPath());
      const leftovers = fs.readdirSync(installDir).filter((n) => n.endsWith(".tar.gz"));
      assert.deepEqual(leftovers, [], "the unverified archive must not be left on disk");
      assert.equal(fs.existsSync(singbox.getBinPath()), false);
    } finally {
      f.restore();
    }
  }
);

test(
  "singbox installer: verified archive → official URL, extracted real binary, config + manifest + DB row",
  {
    skip: !POSIX_HOST,
  },
  async () => {
    const { bytes, sha256 } = buildReleaseArchive({ withBinary: true });
    const f = stubFetch(bytes);
    try {
      const result = await singbox.installWithChecksums("latest", { [PLATFORM_KEY]: sha256 });

      assert.equal(
        result.installedVersion,
        singbox.SINGBOX_PINNED_VERSION,
        '"latest" resolves to the pinned release'
      );
      assert.deepEqual(f.urls, [
        `https://github.com/SagerNet/sing-box/releases/download/v${singbox.SINGBOX_PINNED_VERSION}/sing-box-${singbox.SINGBOX_PINNED_VERSION}-${PLATFORM_KEY}.tar.gz`,
      ]);

      const bin = singbox.getBinPath();
      assert.match(
        fs.readFileSync(bin, "utf8"),
        /fixture archive entry/,
        "binary comes from the archive, not a generated stub"
      );
      assert.ok((fs.statSync(bin).mode & 0o111) !== 0, "binary is executable");

      const installDir = path.dirname(bin);
      assert.deepEqual(
        fs
          .readdirSync(installDir)
          .filter((n) => n.endsWith(".tar.gz") || n.startsWith("sing-box-")),
        [],
        "downloaded archive and extraction dir are cleaned up"
      );
      assert.ok(fs.existsSync(singbox.getConfigPath()), "default config is written");
      assert.equal(await singbox.getInstalledVersion(), singbox.SINGBOX_PINNED_VERSION);

      const row = db
        .prepare("SELECT status, installed_version FROM version_manager WHERE tool = 'singbox'")
        .get() as { status: string; installed_version: string } | undefined;
      assert.equal(row?.installed_version, singbox.SINGBOX_PINNED_VERSION);
      assert.equal(row?.status, "stopped");
    } finally {
      f.restore();
    }
  }
);
