import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { readFileSync } from "node:fs";

import {
  OPTIONAL_PACK_NAMES,
  packInstallDir,
  packNodeModulesDir,
  packsRootDir,
  installedPackNodePaths,
  packMemberInstalled,
} from "../../open-sse/utils/optionalPacks.ts";

/**
 * Stage 7 (issue #10321) — runtime-side optional pack resolution.
 *
 * Helpers must be fail-open: absent packs never throw, and every path derives
 * from the same DATA_DIR contract as the rest of the runtime.
 */

function tmpDataDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "opt-pack-runtime-"));
}

test("packs dirs derive from DATA_DIR override without touching the real home", () => {
  const dataDir = tmpDataDir();
  assert.equal(packsRootDir(dataDir), path.join(dataDir, "packs"));
  assert.equal(packInstallDir("ml-runtime", dataDir), path.join(dataDir, "packs", "ml-runtime"));
  assert.equal(
    packNodeModulesDir("browser-runtime", dataDir),
    path.join(dataDir, "packs", "browser-runtime", "node_modules")
  );
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("installedPackNodePaths lists only packs with an existing node_modules dir, in manifest order", () => {
  const dataDir = tmpDataDir();
  assert.deepEqual(installedPackNodePaths(dataDir), []);

  // A marker file (not a node_modules dir) must not count as installed.
  fs.mkdirSync(path.join(dataDir, "packs", "ml-runtime"), { recursive: true });
  fs.writeFileSync(path.join(dataDir, "packs", "ml-runtime", "marker.txt"), "");
  assert.deepEqual(installedPackNodePaths(dataDir), []);

  fs.mkdirSync(packNodeModulesDir("browser-runtime", dataDir), { recursive: true });
  fs.mkdirSync(packNodeModulesDir("ml-runtime", dataDir), { recursive: true });
  assert.deepEqual(installedPackNodePaths(dataDir), [
    path.join(dataDir, "packs", "ml-runtime", "node_modules"),
    path.join(dataDir, "packs", "browser-runtime", "node_modules"),
  ]);
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("packMemberInstalled probes installed pack trees with optional node_modules prefix", () => {
  const dataDir = tmpDataDir();
  const memberPkg = path.join(
    packNodeModulesDir("ml-runtime", dataDir),
    "@atjsh",
    "llmlingua-2",
    "package.json"
  );
  fs.mkdirSync(path.dirname(memberPkg), { recursive: true });
  fs.writeFileSync(memberPkg, "{}");

  assert.equal(packMemberInstalled("@atjsh/llmlingua-2/package.json", dataDir), true);
  assert.equal(
    packMemberInstalled(path.join("@atjsh", "llmlingua-2", "package.json"), dataDir),
    true
  );
  assert.equal(packMemberInstalled("node_modules/@atjsh/llmlingua-2/package.json", dataDir), true);
  assert.equal(
    packMemberInstalled(
      path.join("node_modules", "@atjsh", "llmlingua-2", "package.json"),
      dataDir
    ),
    true
  );
  assert.equal(packMemberInstalled("@huggingface/transformers/package.json", dataDir), false);
  assert.equal(
    packMemberInstalled("@atjsh/llmlingua-2/package.json", path.join(dataDir, "absent")),
    false
  );
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("manifest and runtime pack lists stay in sync", async () => {
  // open-sse/utils/optionalPacks.ts embeds the names instead of importing the
  // build-side manifest (the server must not depend on build tooling), so the
  // two lists can drift — pin them together against the real module.
  const manifest = (await import("../../scripts/packs/optionalPackManifest.mjs")) as {
    OPTIONAL_PACKS: { name: string }[];
  };
  assert.deepEqual(
    [...OPTIONAL_PACK_NAMES],
    manifest.OPTIONAL_PACKS.map((p) => p.name)
  );
});

test("wiring: electron main prepends installed pack node_modules to the server NODE_PATH", () => {
  const mainJs = readFileSync(path.join(process.cwd(), "electron/main.js"), "utf8");
  assert.ok(
    mainJs.includes("resolvePackNodePaths(dataDir)"),
    "startNextServer must pass pack dirs into resolveServerNodePath"
  );
  // Packs must be prepended BEFORE existing entries so an installed pack can
  // never be shadowed by a stale bundled duplicate.
  const extraIdx = mainJs.indexOf("for (const packDir of extraDirs)");
  const unpackedIdx = mainJs.indexOf("app.asar.unpacked");
  assert.ok(
    extraIdx !== -1 && extraIdx < unpackedIdx,
    "pack dirs take precedence over bundle-resident copies"
  );
});

test("wiring: the LLMLingua gate also probes installed packs", () => {
  const worker = readFileSync(
    path.join(process.cwd(), "open-sse/services/compression/engines/llmlingua/worker.ts"),
    "utf8"
  );
  assert.ok(
    worker.includes("packMemberInstalled(GATE_DEP_REL)"),
    "depsAvailable must OR the pack probe with the ancestor walk"
  );
});
