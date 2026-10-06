import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import * as prebuildPlan from "../../scripts/build/electronRebuildPlan.mjs";

const {
  SQLITE_PREBUILD_ARCHS,
  SQLITE_PREBUILD_PLATFORMS,
  isSqlitePrebuildSupported,
  sqlitePrebuildFileName,
} = prebuildPlan;

// Since better-sqlite3 v13 (issue #10321 Stage 6) the Electron packaging no
// longer compiles the addon from source against the Electron headers: v13
// ships Node-API prebuilds for every packaged platform, and Node-API addons
// are ABI-independent (verified under electron 43 / NODE_MODULE_VERSION 148).
// These tests pin the prebuild selection logic that replaced the historical
// `npx node-gyp rebuild` spawn plan (whose win32 .cmd/shell quirk broke the
// v3.8.47 tag build — that entire code path is now gone).

test("prebuild file name mirrors better-sqlite3 lib/binding.js selection", () => {
  assert.equal(sqlitePrebuildFileName("darwin", "arm64"), "darwin-arm64.node");
  assert.equal(sqlitePrebuildFileName("darwin", "x64"), "darwin-x64.node");
  assert.equal(sqlitePrebuildFileName("win32", "x64"), "win32-x64.node");
  assert.equal(sqlitePrebuildFileName("win32", "arm64"), "win32-arm64.node");
});

test("linux resolves to the musl prebuild when glibcVersionRuntime is absent", () => {
  // glibc build (GitHub ubuntu runner): header carries the runtime glibc version
  assert.equal(
    sqlitePrebuildFileName("linux", "x64", { glibcVersionRuntime: "2.39" }),
    "linux-x64.node"
  );
  // musl build (Alpine): no glibcVersionRuntime -> linuxmusl prebuild
  assert.equal(sqlitePrebuildFileName("linux", "x64", {}), "linuxmusl-x64.node");
  assert.equal(sqlitePrebuildFileName("linux", "arm64", undefined), "linuxmusl-arm64.node");
});

test("prebuild support covers exactly the packaged platform/arch matrix", () => {
  for (const platform of ["darwin", "linux", "win32"]) {
    for (const arch of ["x64", "arm64"]) {
      assert.equal(isSqlitePrebuildSupported(platform, arch), true);
    }
  }
  assert.equal(isSqlitePrebuildSupported("freebsd", "x64"), false);
  assert.equal(isSqlitePrebuildSupported("darwin", "ia32"), false);
});

test("packaged platform matrix matches the shipped prebuild inventory", () => {
  // better-sqlite3 v13 prebuilds/: darwin/linux/linuxmusl/win32 × x64/arm64.
  // The build fails fast when the prebuild for the CURRENT platform is missing,
  // so this matrix must stay in sync with the npm tarball contents.
  assert.deepEqual(SQLITE_PREBUILD_PLATFORMS, ["darwin", "linux", "linuxmusl", "win32"]);
  assert.deepEqual(SQLITE_PREBUILD_ARCHS, ["x64", "arm64"]);
});

test("prebuild verification fails fast when the selected binary is missing", () => {
  const assertSqlitePrebuildExists = (
    prebuildPlan as typeof prebuildPlan & {
      assertSqlitePrebuildExists?: (
        moduleDir: string,
        platform: string,
        arch: string,
        reportHeader?: { glibcVersionRuntime?: string | null }
      ) => string | null;
    }
  ).assertSqlitePrebuildExists;
  assert.equal(typeof assertSqlitePrebuildExists, "function");

  const moduleDir = fs.mkdtempSync(path.join(os.tmpdir(), "sqlite-prebuild-"));
  try {
    assert.throws(
      () => assertSqlitePrebuildExists?.(moduleDir, "darwin", "arm64"),
      /better-sqlite3 prebuild missing for darwin-arm64/
    );

    const expected = path.join(moduleDir, "prebuilds", "darwin-arm64.node");
    fs.mkdirSync(path.dirname(expected), { recursive: true });
    fs.writeFileSync(expected, "napi");
    assert.equal(assertSqlitePrebuildExists?.(moduleDir, "darwin", "arm64"), expected);
  } finally {
    fs.rmSync(moduleDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
