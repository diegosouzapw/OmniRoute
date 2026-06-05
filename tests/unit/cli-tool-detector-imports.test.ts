import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

// #2509 — published npm builds were failing with `Cannot find module
// 'src/lib/cli-helper/tool-detector.js'` because CLI commands imported the
// helper via the `.js` extension while only the `.ts` source ships. Lock the
// import paths to the explicit `.ts` extension that tsx resolves directly,
// preventing future regressions.

const FILES_THAT_MUST_USE_TS_EXTENSION = [
  "bin/cli/commands/config.mjs",
  "bin/cli/commands/status.mjs",
  "bin/cli/commands/doctor.mjs",
  "src/lib/cli-helper/doctor/checks.ts",
];

const DISALLOWED_PATTERNS = ["cli-helper/tool-detector.js", "cli-helper/doctor/checks.js"];

for (const file of FILES_THAT_MUST_USE_TS_EXTENSION) {
  test(`${file} imports cli-helper modules with .ts extension (not .js)`, () => {
    const abs = join(ROOT, file);
    assert.ok(existsSync(abs), `${file} should exist`);
    const content = readFileSync(abs, "utf8");
    for (const bad of DISALLOWED_PATTERNS) {
      assert.ok(
        !content.includes(bad),
        `${file} must not import via "${bad}" — use the .ts extension so the published npm package (which ships only .ts source) can resolve via tsx. See #2509.`
      );
    }
  });
}

test("tool-detector.ts is reachable from dynamic import at runtime", async () => {
  const mod = await import("../../src/lib/cli-helper/tool-detector.ts");
  assert.equal(typeof mod.detectAllTools, "function");
  assert.equal(typeof mod.detectTool, "function");
});
