import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";

const mod = await import("../../src/lib/system/globalPackagePath.ts");

const GLOBAL_ROOT = "/usr/lib/node_modules";
const PACKAGE_ROOT = path.join(GLOBAL_ROOT, "omniroute");
const LEGACY_ROOT = path.join(PACKAGE_ROOT, "app");

function execStub(stdout: string) {
  return async () => ({ stdout });
}

test("resolves the package root when its package.json exists (Bug3)", async () => {
  const exists = (target: string) => target === path.join(PACKAGE_ROOT, "package.json");
  const result = await mod.resolveGlobalOmniroutePath(execStub(`${GLOBAL_ROOT}\n`), exists);
  assert.equal(result, PACKAGE_ROOT);
});

test("falls back to the legacy app/ layout when only it has a package.json", async () => {
  const exists = (target: string) => target === path.join(LEGACY_ROOT, "package.json");
  const result = await mod.resolveGlobalOmniroutePath(execStub(GLOBAL_ROOT), exists);
  assert.equal(result, LEGACY_ROOT);
});

test("defaults to the package root when neither layout is present", async () => {
  const exists = () => false;
  const result = await mod.resolveGlobalOmniroutePath(execStub(GLOBAL_ROOT), exists);
  assert.equal(result, PACKAGE_ROOT);
});

test("trims whitespace from the npm root -g output", async () => {
  const exists = (target: string) => target === path.join(PACKAGE_ROOT, "package.json");
  const result = await mod.resolveGlobalOmniroutePath(execStub(`  ${GLOBAL_ROOT}  \n`), exists);
  assert.equal(result, PACKAGE_ROOT);
});
