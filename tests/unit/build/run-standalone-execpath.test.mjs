import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const scriptPath = new URL("../../../scripts/dev/run-standalone.mjs", import.meta.url);
const scriptSrc = readFileSync(scriptPath, "utf8");

test("run-standalone.mjs spawns with process.execPath instead of hardcoded 'node'", () => {
  assert.doesNotMatch(
    scriptSrc,
    /spawnWithForwardedSignals\(\s*["']node["']/,
    "run-standalone.mjs must not spawn with hardcoded 'node' (breaks under Bun or non-standard Node PATHs)"
  );
  assert.match(
    scriptSrc,
    /spawnWithForwardedSignals\(\s*process\.execPath\s*,/,
    "run-standalone.mjs must spawn using process.execPath"
  );
});
