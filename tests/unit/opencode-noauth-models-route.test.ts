import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-opencode-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// #3047 — OpenCode Free (no-auth) has no connection row, so the
// "Import from /models" button used to hit a 404 and silently no-op. The models
// route must serve the provider's catalog when called with a no-auth provider id.
test("models route serves the catalog for a no-auth provider id (#3047)", async () => {
  const response = await modelsRoute.GET(
    new Request("http://localhost/api/providers/opencode/models?refresh=true"),
    { params: { id: "opencode" } }
  );
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.provider, "opencode");
  assert.equal(body.source, "local_catalog");
  assert.ok(Array.isArray(body.models) && body.models.length > 0, "should return catalog models");
  assert.ok(
    body.models.every((m: { id?: unknown }) => typeof m.id === "string" && m.id.length > 0),
    "every model must have a non-empty id"
  );
});

test("models route still 404s for an unknown provider/connection id", async () => {
  const response = await modelsRoute.GET(
    new Request("http://localhost/api/providers/does-not-exist-xyz/models"),
    { params: { id: "does-not-exist-xyz" } }
  );
  assert.equal(response.status, 404);
});
