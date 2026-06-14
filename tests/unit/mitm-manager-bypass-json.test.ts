/**
 * Tests for `writeBypassJson()` in src/mitm/manager.ts.
 *
 * The function persists user bypass patterns to `<DATA_DIR>/mitm/bypass.json`
 * which is read by `src/mitm/server.cjs` at boot to drive the CONNECT
 * handler's bypass routing decision.
 *
 * Plan reference: 11-agent-bridge.plan.md §4.6 + master-plan-group-A.md §3.5.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-mitm-bypass-json-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const bypassDb = await import("../../src/lib/db/agentBridgeBypass.ts");
const manager = await import("../../src/mitm/manager.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: unknown) {
      const code = (error as { code?: string } | null)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("writeBypassJson — creates mitm/ dir and writes JSON file", () => {
  manager.writeBypassJson(["custom.example.com"]);
  const file = path.join(TEST_DATA_DIR, "mitm", "bypass.json");
  assert.ok(fs.existsSync(file), "bypass.json must exist after write");
  const payload = JSON.parse(fs.readFileSync(file, "utf-8"));
  assert.equal(payload.version, 1);
  assert.ok(typeof payload.generatedAt === "string");
  assert.deepEqual(payload.patterns, ["custom.example.com"]);
});

test("writeBypassJson — empty array writes empty patterns", () => {
  manager.writeBypassJson([]);
  const file = path.join(TEST_DATA_DIR, "mitm", "bypass.json");
  const payload = JSON.parse(fs.readFileSync(file, "utf-8"));
  assert.deepEqual(payload.patterns, []);
});

test("writeBypassJson — pulls from DB when no patterns argument passed", () => {
  // Seed user patterns via the DB module.
  bypassDb.replaceUserBypassPatterns(["*.from-db.example.com", "literal.com"]);
  manager.writeBypassJson();
  const file = path.join(TEST_DATA_DIR, "mitm", "bypass.json");
  const payload = JSON.parse(fs.readFileSync(file, "utf-8"));
  assert.deepEqual(
    payload.patterns.sort(),
    ["*.from-db.example.com", "literal.com"].sort()
  );
});

test("writeBypassJson — does NOT write default patterns (those live in server.cjs)", () => {
  // Seed defaults via the DB module — these should NOT appear in the JSON.
  bypassDb.seedDefaultBypassPatterns([
    "*.bank.test",
    "*.gov.test",
    "okta.com",
    "auth0.com",
  ]);
  manager.writeBypassJson();
  const file = path.join(TEST_DATA_DIR, "mitm", "bypass.json");
  const payload = JSON.parse(fs.readFileSync(file, "utf-8"));
  // No user patterns were set → user-only output is empty.
  assert.deepEqual(payload.patterns, []);
});

test("writeBypassJson — JSON is well-formed and overwrites previous file", () => {
  manager.writeBypassJson(["first.com"]);
  manager.writeBypassJson(["second.com", "third.com"]);
  const file = path.join(TEST_DATA_DIR, "mitm", "bypass.json");
  const payload = JSON.parse(fs.readFileSync(file, "utf-8"));
  assert.deepEqual(payload.patterns, ["second.com", "third.com"]);
});
