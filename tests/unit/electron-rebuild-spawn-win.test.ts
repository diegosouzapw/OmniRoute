import { test } from "node:test";
import assert from "node:assert/strict";
import { buildRebuildSpawnPlan } from "../../scripts/build/electronRebuildPlan.mjs";

// Regression: v3.8.47 tag build — spawnSync("npx.cmd", ...) WITHOUT shell:true fails with
// status null on Windows runners (Node's CVE-2024-27980 hardening blocks spawning .cmd/.bat
// without a shell), killing the better-sqlite3 Electron-ABI rebuild:
// "[electron] better-sqlite3 rebuild against electron 43.1.0 failed (exit null)".

test("win32 rebuild plan spawns through a shell (cmd shims need it since CVE-2024-27980)", () => {
  const plan = buildRebuildSpawnPlan("win32");
  assert.equal(plan.command, "npx.cmd");
  assert.equal(plan.shell, true);
  assert.deepEqual(plan.args, ["--yes", "node-gyp", "rebuild"]);
});

test("posix rebuild plan spawns npx directly, no shell", () => {
  const plan = buildRebuildSpawnPlan("linux");
  assert.equal(plan.command, "npx");
  assert.equal(plan.shell, false);
  assert.deepEqual(plan.args, ["--yes", "node-gyp", "rebuild"]);
});
