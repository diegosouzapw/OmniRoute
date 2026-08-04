// Regression guard: POST /api/models/test must always return a STRING `error`,
// never an object. The Zod-validation and invalid-JSON paths used to return
// `{ error: <object> }` (Zod .format() / a details object). The dashboard renders
// that value directly in a toast, so an object froze the whole page (React #31).
// The "test a model → screen froze" bug.
//
// DB handles released in test.after (CLAUDE.md learning: unreleased SQLite
// handles hang node:test).

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-models-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/models/test/route.ts");

test.before(async () => {
  await settingsDb.updateSettings({ requireLogin: false });
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function post(body: unknown, rawText?: string) {
  return route.POST(
    new Request("http://localhost:20128/api/models/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: rawText !== undefined ? rawText : JSON.stringify(body),
    })
  );
}

test("Zod validation failure returns a STRING error (not an object)", async () => {
  // connectionId "" fails z.string().min(1).optional() -> validation error path
  const res = await post({ providerId: "openai", modelId: "gpt-4o", connectionId: "" });
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.equal(typeof body.error, "string", "error must be a string, never an object");
  assert.equal(body.status, "error");
  assert.match(body.error, /Invalid request/i);
});

test("missing required field returns a STRING error", async () => {
  const res = await post({ providerId: "openai" }); // no modelId
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.equal(typeof body.error, "string");
});

test("invalid JSON body returns a STRING error (not an object)", async () => {
  const res = await post(undefined, "{ not json ");
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.equal(typeof body.error, "string");
  assert.match(body.error, /Invalid JSON/i);
});
