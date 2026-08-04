import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Regression test for #6162: published `omniroute doctor` failed with
// "Could not run CLI tool checks: Cannot find package '@/shared'" because
// src/lib/cli-helper/*.ts files imported `@/shared/...` aliases that the
// CLI runtime (tsx + ESM `import()`) cannot resolve. Fix: replace
// `@/shared/...` with relative imports in the cli-helper files so they work
// in the published package without a compile step.
//
// Lock the fix by asserting that no cli-helper source file uses the
// `@/shared` alias any more, and that the runtime module load succeeds.

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const CLI_HELPER_FILES = [
  "src/lib/cli-helper/tool-detector.ts",
  "src/lib/cli-helper/claudeProfileAutoSync.ts",
  "src/lib/cli-helper/codexProfileAutoSync.ts",
  "src/lib/cli-helper/config-generator/opencode.ts",
];

for (const file of CLI_HELPER_FILES) {
  test(`${file} must not use @/shared path alias (fix for #6162)`, () => {
    const abs = join(ROOT, file);
    assert.ok(existsSync(abs), `${file} should exist`);
    const content = readFileSync(abs, "utf8");
    assert.ok(
      !/@\/shared/.test(content),
      `${file} must not import via "@/shared/..." alias — the published CLI runtime (tsx + ESM import) cannot resolve tsconfig path aliases. Use relative paths instead. See #6162.`
    );
  });
}

test("tool-detector.ts is importable at runtime (regression for #6162)", async () => {
  // This would have failed before the fix with
  // "Cannot find package '@/shared' imported from .../tool-detector.ts".
  const mod = await import("../../src/lib/cli-helper/tool-detector.ts");
  assert.equal(typeof mod.detectAllTools, "function");
  assert.equal(typeof mod.detectTool, "function");
});

test("claudeProfileAutoSync.ts is importable at runtime (regression for #6162)", async () => {
  const mod = await import("../../src/lib/cli-helper/claudeProfileAutoSync.ts");
  // The module exports at least the sync function; we don't care about its
  // specific name, only that the import resolves without throwing.
  assert.equal(typeof mod, "object");
});

test("codexProfileAutoSync.ts is importable at runtime (regression for #6162)", async () => {
  const mod = await import("../../src/lib/cli-helper/codexProfileAutoSync.ts");
  assert.equal(typeof mod, "object");
});

test("config-generator/opencode.ts is importable at runtime (regression for #6162)", async () => {
  const mod = await import("../../src/lib/cli-helper/config-generator/opencode.ts");
  assert.equal(typeof mod, "object");
});