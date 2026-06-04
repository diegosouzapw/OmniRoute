import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { assembleStandalone } from "../../../scripts/build/assembleStandalone.mjs";

test("assembleStandalone copies standalone + static + public + sidecars into outDir", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "assemble-"));
  const distDir = path.join(tmp, ".build/next");
  const outDir = path.join(tmp, "dist");
  // minimal fake standalone tree
  fs.mkdirSync(path.join(distDir, "standalone"), { recursive: true });
  fs.writeFileSync(path.join(distDir, "standalone", "server.js"), "// server");
  fs.mkdirSync(path.join(distDir, "static"), { recursive: true });
  fs.writeFileSync(path.join(distDir, "static", "x.js"), "x");
  fs.mkdirSync(path.join(tmp, "public"), { recursive: true });
  fs.writeFileSync(path.join(tmp, "public", "logo.svg"), "<svg/>");

  assembleStandalone({ distDir, outDir, projectRoot: tmp, sanitizePaths: false, copyNatives: false });

  assert.ok(fs.existsSync(path.join(outDir, "server.js")), "server.js copied");
  assert.ok(fs.existsSync(path.join(outDir, ".next/static/x.js")), "static copied");
  assert.ok(fs.existsSync(path.join(outDir, "public/logo.svg")), "public copied");
  fs.rmSync(tmp, { recursive: true, force: true });
});
