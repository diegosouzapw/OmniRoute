import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mgmt-pwd-insecure-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const managementPassword = await import("../../src/lib/auth/managementPassword.ts");

function makeLogger() {
  const warnings: string[] = [];
  return {
    warnings,
    log() {},
    warn: (...args: unknown[]) => {
      warnings.push(args.map((a) => String(a)).join(" "));
    },
  };
}

test.afterEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("warns when bootstrapping the management password with the CHANGEME default (Seg2)", async () => {
  const logger = makeLogger();

  const result = await managementPassword.ensurePersistentManagementPasswordHash({
    settings: {},
    initialPassword: "CHANGEME",
    logger,
  });

  // It still bootstraps (does not hard-reject — would break local dev), but it must warn loudly.
  assert.equal(managementPassword.isBcryptHash(result.hash), true);
  assert.equal(
    logger.warnings.some((line) => line.includes("CHANGEME")),
    true,
    "expected a security warning mentioning the CHANGEME default"
  );
});

test("does not warn when bootstrapping with a strong password", async () => {
  const logger = makeLogger();

  const result = await managementPassword.ensurePersistentManagementPasswordHash({
    settings: {},
    initialPassword: "a-strong-unique-password",
    logger,
  });

  assert.equal(managementPassword.isBcryptHash(result.hash), true);
  assert.equal(logger.warnings.length, 0, "did not expect any security warning for a strong password");
});
