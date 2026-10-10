import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skills-resolve-version-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");

const API_KEY_ID = "resolve-version-key";
const NAME = "versioned-skill";

function resetRegistryState() {
  skillRegistry["registeredSkills"].clear();
  skillRegistry["versionCache"].clear();
}

test.before(async () => {
  for (const version of ["1.0.0", "1.2.0", "2.0.0"]) {
    await skillRegistry.register({
      name: NAME,
      version,
      description: `version ${version}`,
      schema: { input: {}, output: {} },
      handler: "versioned-handler",
      enabled: true,
      apiKeyId: API_KEY_ID,
    });
  }
});

test.after(() => {
  resetRegistryState();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const resolve = (constraint: string) =>
  skillRegistry.resolveVersion(NAME, constraint, API_KEY_ID)?.version;

test("resolveVersion: >= picks the highest version at or above the base", () => {
  assert.equal(resolve(">=1.2.0"), "2.0.0");
  assert.equal(resolve(">=2.0.0"), "2.0.0");
  assert.equal(resolve(">=2.0.1"), undefined);
});

test("resolveVersion: <= picks the highest version at or below the base", () => {
  assert.equal(resolve("<=2.0.0"), "2.0.0");
  assert.equal(resolve("<=1.2.0"), "1.2.0");
  assert.equal(resolve("<=1.0.0"), "1.0.0");
  assert.equal(resolve("<=0.9.0"), undefined);
});

test("resolveVersion: == matches exactly one version", () => {
  assert.equal(resolve("==1.2.0"), "1.2.0");
  assert.equal(resolve("==9.9.9"), undefined);
});

test("resolveVersion: single-character operators and exact versions are unchanged", () => {
  assert.equal(resolve(">1.0.0"), "2.0.0");
  assert.equal(resolve("<2.0.0"), "1.2.0");
  assert.equal(resolve("^1.0.0"), "1.2.0");
  assert.equal(resolve("~1.2.0"), "1.2.0");
  assert.equal(resolve("1.0.0"), "1.0.0");
  assert.equal(resolve("3.0.0"), undefined);
});
