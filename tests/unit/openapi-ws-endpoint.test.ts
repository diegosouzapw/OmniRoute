import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import * as yaml from "js-yaml";

// Regression guard: the OpenAI-compatible chat WebSocket endpoint (/api/v1/ws)
// must be documented in openapi.yaml so it shows up on the dashboard's
// "API Endpoints" page (which renders /api/openapi/spec, parsed from this file).
// The route (src/app/api/v1/ws/route.ts) shipped in v3.6.6 but was never listed
// in the spec, so it was invisible in the endpoints reference.

const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const spec = yaml.load(readFileSync(ROOT + "docs/reference/openapi.yaml", "utf8")) as {
  paths: Record<string, Record<string, { tags?: string[]; security?: unknown[]; responses?: Record<string, unknown> }>>;
};

test("openapi.yaml documents the /api/v1/ws chat WebSocket endpoint", () => {
  const entry = spec.paths["/api/v1/ws"];
  assert.ok(entry, "/api/v1/ws must be present in openapi.yaml paths");
  assert.ok(entry.get, "/api/v1/ws must document the GET (handshake/upgrade) operation");
});

test("/api/v1/ws is tagged, authenticated and documents the WS upgrade responses", () => {
  const op = spec.paths["/api/v1/ws"].get;
  assert.ok((op.tags ?? []).length > 0, "should be tagged so it groups on the endpoints page");
  assert.ok(Array.isArray(op.security) && op.security.length > 0, "should require auth (BearerAuth)");
  const responses = op.responses ?? {};
  for (const code of ["101", "426"]) {
    assert.ok(code in responses, `should document the ${code} WebSocket response`);
  }
});
