import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../../../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rtk-toml-route-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../../src/lib/db/core.ts");
const settingsDb = await import("../../../../src/lib/db/settings.ts");
const importRoute = await import("../../../../src/app/api/context/rtk/import/route.ts");

const SAMPLE = `schema_version = 1
[filters.route-test]
description = "Route test"
match_command = "^route-test"
strip_lines_matching = ["^noise"]

[[tests.route-test]]
name = "removes noise"
input = "noise\\nkept"
expected = "kept"
`;

async function reset() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.INITIAL_PASSWORD;
}

async function post(body: unknown): Promise<Response> {
  return importRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/context/rtk/import", {
      method: "POST",
      body,
    })
  );
}

test.beforeEach(reset);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

test("POST requires management authentication when login is configured", async () => {
  process.env.INITIAL_PASSWORD = "rtk-toml-route-password";
  await settingsDb.updateSettings({ requireLogin: true });

  const response = await importRoute.POST(
    new Request("http://localhost/api/context/rtk/import", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "validate", content: SAMPLE }),
    })
  );

  assert.equal(response.status, 401);
});

test("validate returns tests and does not write filters.toml", async () => {
  const response = await post({ action: "validate", content: SAMPLE });
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.passed, true);
  assert.equal(body.filters[0].id, "route-test");
  assert.equal(body.outcomes[0].passed, true);
  assert.equal(fs.existsSync(path.join(TEST_DATA_DIR, "rtk", "filters.toml")), false);
});

test("install writes the global file, refuses implicit overwrite, and creates a backup", async () => {
  const first = await post({ action: "install", content: SAMPLE });
  assert.equal(first.status, 200);
  assert.equal(fs.readFileSync(path.join(TEST_DATA_DIR, "rtk", "filters.toml"), "utf8"), SAMPLE);

  const refused = await post({ action: "install", content: SAMPLE });
  assert.equal(refused.status, 400);

  const replacement = SAMPLE.replace("Route test", "Replacement");
  const replaced = await post({ action: "install", content: replacement, overwrite: true });
  const replacedBody = await replaced.json();
  assert.equal(replaced.status, 200);
  assert.equal(replacedBody.backupCreated, true);
  assert.equal(
    fs.readFileSync(path.join(TEST_DATA_DIR, "rtk", "filters.toml.bak"), "utf8"),
    SAMPLE
  );
});

test("invalid TOML, unsafe regex, failing tests, and oversized input return safe 400 errors", async () => {
  const inputs = [
    "not = [valid",
    `schema_version = 1\n[filters.bad]\nmatch_command = "(a+)+$"`,
    `schema_version = 1
[filters.bad]
match_command = "^bad"
strip_lines_matching = ["^noise"]
[[tests.bad]]
name = "fails"
input = "noise\\nkept"
expected = "wrong"`,
    "x".repeat(1024 * 1024 + 1),
  ];

  for (const content of inputs) {
    const response = await post({ action: "install", content });
    const body = await response.json();
    assert.equal(response.status, 400);
    assert.equal(typeof body.error?.message, "string");
    assert.ok(!body.error.message.includes(" at "));
    assert.ok(!body.error.message.includes(process.cwd()));
  }
});
