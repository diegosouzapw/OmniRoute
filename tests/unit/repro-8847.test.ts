import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { syncStandaloneNativeAssets } from "../../scripts/build/assembleStandalone.mjs";

/**
 * Repro #8847: better-sqlite3 prebuilds are not included in the standalone
 * bundle, so the bundled app fails when the platform's prebuild is needed
 * (e.g. under Bun, which resolves the native binary via prebuilds/ rather
 * than build/Release/).
 *
 * The test creates a synthetic node_modules/better-sqlite3/ tree with both
 * the compiled build/Release/ binary AND the prebuilds/ directory, then
 * confirms that syncStandaloneNativeAssets copies both into the standalone
 * output. On the unfixed code this fails because NATIVE_ASSET_ENTRIES only
 * lists better-sqlite3/build/.
 */
test("repro-8847: better-sqlite3 prebuilds are bundled alongside the compiled binary", async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "repro-8847-"));
  const projectRoot = path.join(tmp, "src-root");

  // Seed better-sqlite3 with both build/Release/ and prebuilds/.
  const bsqlDir = path.join(projectRoot, "node_modules", "better-sqlite3");
  fs.mkdirSync(path.join(bsqlDir, "build", "Release"), { recursive: true });
  fs.writeFileSync(
    path.join(bsqlDir, "build", "Release", "better_sqlite3.node"),
    "// native binary placeholder"
  );
  fs.mkdirSync(path.join(bsqlDir, "prebuilds"), { recursive: true });
  for (const target of [
    "darwin-arm64.node",
    "darwin-x64.node",
    "linux-arm64.node",
    "linux-x64.node",
    "linuxmusl-arm64.node",
    "linuxmusl-x64.node",
    "win32-arm64.node",
    "win32-x64.node",
  ]) {
    fs.writeFileSync(path.join(bsqlDir, "prebuilds", target), `// ${target}`);
  }

  const outDir = path.join(tmp, "standalone");
  fs.mkdirSync(outDir, { recursive: true });

  // Act: copy native assets into the standalone output.
  await syncStandaloneNativeAssets(projectRoot, fs.promises, { log() {} }, outDir);

  // Assert: the compiled build/Release/ binary was copied.
  assert.ok(
    fs.existsSync(
      path.join(outDir, "node_modules", "better-sqlite3", "build", "Release", "better_sqlite3.node")
    ),
    "compiled native binary (build/Release/) must be in the standalone bundle"
  );

  // Assert: the prebuilds/ directory was also copied.
  const prebuildsDir = path.join(outDir, "node_modules", "better-sqlite3", "prebuilds");
  assert.ok(fs.existsSync(prebuildsDir), "prebuilds/ directory must be in the standalone bundle");

  // Assert: at least one prebuild file was copied.
  assert.ok(
    fs.existsSync(path.join(prebuildsDir, "linux-x64.node")),
    "linux-x64 prebuild must be in the standalone bundle"
  );

  fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
