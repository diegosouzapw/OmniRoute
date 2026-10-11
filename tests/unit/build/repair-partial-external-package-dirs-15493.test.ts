import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { assembleStandalone } from "../../../scripts/build/assembleStandalone.mjs";

// #15493: the standalone tracer can ship a PARTIAL package dir (only some subdirs such as
// zod's v3/v4, no package.json / index.js). It is non-empty so the hollow-dir repair skipped
// it, and it shadowed the real install → MCP endpoints 500 on the Windows portable build.
test("assembleStandalone repairs a partially traced package dir that lacks package.json (#15493)", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "repair-partial-pkg-"));
  try {
    const projectRoot = path.join(tmp, "project");
    const distDir = path.join(projectRoot, ".next");
    const outDir = path.join(tmp, "dist");

    const sourcePkgDir = path.join(projectRoot, "node_modules", "zod");
    fs.mkdirSync(path.join(sourcePkgDir, "v4"), { recursive: true });
    fs.writeFileSync(path.join(sourcePkgDir, "package.json"), '{"name":"zod"}');
    fs.writeFileSync(path.join(sourcePkgDir, "index.js"), "module.exports = {};");
    fs.writeFileSync(path.join(sourcePkgDir, "v4", "index.js"), "module.exports = {};");

    const standaloneDir = path.join(distDir, "standalone");
    const partial = path.join(standaloneDir, "node_modules", "zod", "v4");
    fs.mkdirSync(partial, { recursive: true });
    fs.writeFileSync(path.join(partial, "index.js"), "// partial");
    fs.writeFileSync(path.join(standaloneDir, "server.js"), "// server");

    assembleStandalone({ distDir, outDir, projectRoot, copyNatives: true });

    const bundled = path.join(outDir, "node_modules", "zod");
    assert.ok(fs.existsSync(path.join(bundled, "package.json")), "package.json restored");
    assert.ok(fs.existsSync(path.join(bundled, "index.js")), "index.js restored");
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
