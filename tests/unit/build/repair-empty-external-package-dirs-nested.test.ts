import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { assembleStandalone } from "../../../scripts/build/assembleStandalone.mjs";

// #7346: on macOS (and Linux AppImage) Electron builds, Turbopack's standalone tracer can leave
// a hollow (directory exists, contains zero files) externalized-package directory behind. #9913
// added `repairEmptyExternalPackageDirs` to overlay the real source package on top of a hollow
// bundle dir — but it only scans the TOP-LEVEL `<outDir>/node_modules`. This project builds with
// a custom, non-default `distDir` (".build/next", see next.config.mjs), and Next's standalone
// tracer also emits a SECOND, nested `node_modules` under `<outDir>/<relDistDir>/node_modules`
// (the same location `materializeBundledSymlinks` already treats as a distinct target — see
// assembleStandalone() step 7). A hollow externalized package dir landing in that nested
// location is never repaired, which reproduces the exact ERR_MODULE_NOT_FOUND class reported on
// #7346 even after #6794/#7353/#9913 all landed.
test("assembleStandalone repairs a hollow externalized package dir in the nested <distDir> node_modules, not just the top-level one", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "repair-nested-empty-pkg-"));
  const projectRoot = path.join(tmp, "project");
  const relDistDir = ".build/next";
  const distDir = path.join(projectRoot, relDistDir);
  const outDir = path.join(tmp, "dist");

  // Real source package the repair should copy from.
  const sourcePkgDir = path.join(projectRoot, "node_modules", "some-nested-pkg");
  fs.mkdirSync(sourcePkgDir, { recursive: true });
  fs.writeFileSync(path.join(sourcePkgDir, "package.json"), '{"name":"some-nested-pkg"}');
  fs.writeFileSync(path.join(sourcePkgDir, "index.js"), "module.exports = {};");

  // Fake standalone tree with a hollow externalized package dir under the NESTED
  // <relDistDir>/node_modules (directory exists but contains zero files — the exact
  // "hollow" shape repairEmptyExternalPackageDirs already repairs at the top level).
  const standaloneDir = path.join(distDir, "standalone");
  fs.mkdirSync(standaloneDir, { recursive: true });
  fs.writeFileSync(path.join(standaloneDir, "server.js"), "// server");
  const hollowNestedPkgDir = path.join(
    standaloneDir,
    relDistDir,
    "node_modules",
    "some-nested-pkg"
  );
  fs.mkdirSync(hollowNestedPkgDir, { recursive: true });

  assembleStandalone({
    distDir,
    outDir,
    projectRoot,
    copyNatives: true,
  });

  const repairedIndexPath = path.join(
    outDir,
    relDistDir,
    "node_modules",
    "some-nested-pkg",
    "index.js"
  );
  assert.ok(
    fs.existsSync(repairedIndexPath),
    "hollow nested externalized package dir must be repaired with the real source package (index.js present)"
  );

  fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
