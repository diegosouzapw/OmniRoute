// #14355 — isBetterSqliteBinaryValid() only checked build/Release/
// better_sqlite3.node (the node-gyp layout), so a native binary installed
// under prebuilds/<platform>-<arch>.node (what newer better-sqlite3
// versions produce, and what doctor.mjs already recognized separately)
// reported valid: false even though the binary was present and loading
// fine — the exact inconsistency between `doctor` and `runtime check` this
// issue was filed over.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync, rmSync, existsSync, copyFileSync } from "node:fs";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const originalDataDir = process.env.DATA_DIR;

async function withFakeDataDir(fn: (dataDir: string) => Promise<void> | void) {
  const dataDir = mkdtempSync(join(tmpdir(), "omniroute-prebuilds-valid-"));
  process.env.DATA_DIR = dataDir;
  try {
    await fn(dataDir);
  } finally {
    if (originalDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = originalDataDir;
    rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

test("isBetterSqliteBinaryValid recognizes a real, loadable binary under prebuilds/<platform>-<arch>.node", async () => {
  await withFakeDataDir(async () => {
    const { getRuntimeNodeModules, isBetterSqliteBinaryValid, prebuiltBinaryName } = await import(
      "../../bin/cli/runtime/nativeDeps.mjs"
    );

    const realBinary = join(
      process.cwd(),
      "node_modules",
      "better-sqlite3",
      "build",
      "Release",
      "better_sqlite3.node"
    );
    if (!existsSync(realBinary)) {
      // Ambient runtime without a compiled better-sqlite3 binary — nothing to assert here,
      // matching the same escape hatch cli-runtime.test.ts already uses.
      return;
    }

    const nm = getRuntimeNodeModules();
    const prebuildDir = join(nm, "better-sqlite3", "prebuilds");
    mkdirSync(prebuildDir, { recursive: true });
    copyFileSync(realBinary, join(prebuildDir, prebuiltBinaryName()));

    // No build/Release layout exists at all — only prebuilds/.
    const result = isBetterSqliteBinaryValid();
    assert.equal(
      result,
      true,
      "a real, loadable binary under prebuilds/ must be recognized, not just build/Release/"
    );
  });
});

test("isBetterSqliteBinaryValid rejects a prebuilds/ file that only has correct magic bytes but wrong ABI", async () => {
  await withFakeDataDir(async () => {
    const { getRuntimeNodeModules, isBetterSqliteBinaryValid, prebuiltBinaryName } = await import(
      "../../bin/cli/runtime/nativeDeps.mjs"
    );
    const { platform } = await import("node:os");

    const nm = getRuntimeNodeModules();
    const prebuildDir = join(nm, "better-sqlite3", "prebuilds");
    mkdirSync(prebuildDir, { recursive: true });

    const os = platform();
    const magicByPlatform: Record<string, number[]> = {
      linux: [0x7f, 0x45, 0x4c, 0x46],
      darwin: [0xcf, 0xfa, 0xed, 0xfe],
      win32: [0x4d, 0x5a],
    };
    const magic = magicByPlatform[os] ?? magicByPlatform.linux;
    writeFileSync(
      join(prebuildDir, prebuiltBinaryName()),
      Buffer.concat([Buffer.from(magic), Buffer.alloc(64, 0)])
    );

    const result = isBetterSqliteBinaryValid();
    assert.equal(
      result,
      false,
      "a prebuilds/ file with the right header but wrong ABI must still be rejected"
    );
  });
});

test("isBetterSqliteBinaryValid prefers build/Release when both layouts happen to exist", async () => {
  await withFakeDataDir(async () => {
    const { getRuntimeNodeModules, isBetterSqliteBinaryValid, prebuiltBinaryName } = await import(
      "../../bin/cli/runtime/nativeDeps.mjs"
    );

    const realBinary = join(
      process.cwd(),
      "node_modules",
      "better-sqlite3",
      "build",
      "Release",
      "better_sqlite3.node"
    );
    if (!existsSync(realBinary)) return;

    const nm = getRuntimeNodeModules();
    const buildDir = join(nm, "better-sqlite3", "build", "Release");
    mkdirSync(buildDir, { recursive: true });
    copyFileSync(realBinary, join(buildDir, "better_sqlite3.node"));

    // A garbage prebuilds/ entry alongside a real build/Release binary must
    // not cause a false negative — the valid one is still found.
    const prebuildDir = join(nm, "better-sqlite3", "prebuilds");
    mkdirSync(prebuildDir, { recursive: true });
    writeFileSync(join(prebuildDir, prebuiltBinaryName()), Buffer.alloc(4, 0));

    const result = isBetterSqliteBinaryValid();
    assert.equal(result, true, "the valid build/Release binary must still be found and accepted");
  });
});

test("isBetterSqliteBinaryValid returns false when neither layout has a binary", async () => {
  await withFakeDataDir(async () => {
    const { isBetterSqliteBinaryValid } = await import("../../bin/cli/runtime/nativeDeps.mjs");
    assert.equal(isBetterSqliteBinaryValid(), false);
  });
});
