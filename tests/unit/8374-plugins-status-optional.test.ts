/**
 * Regression test for #8374 — GET /api/plugins returns "Invalid status value"
 * when no `?status=` filter is passed.
 *
 * Root cause: `URLSearchParams.get("status")` returns `null` (not `undefined`)
 * when the query param is absent. `z.enum([...]).optional()` widens the schema
 * to accept `undefined`, but NOT `null` — so `safeParse(null)` fails and the
 * route returns HTTP 400, even though the caller passed no filter at all.
 *
 * Fix: coerce `null` -> `undefined` before handing it to Zod, matching the
 * repo's own established idiom (see registered-keys/route.ts,
 * suggested-models/route.ts, quota/preview/route.ts).
 */

import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";

// Hermetic DB: isolate from the shared dev DATA_DIR so this test never
// touches or depends on real plugin rows, and so a fresh install has no
// configured password (isAuthRequired() -> false -> GET reachable directly).
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plugins-8374-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const pluginsDb = await import("../../src/lib/db/plugins.ts");
const { GET } = await import("../../src/app/api/plugins/route.ts");

before(() => {
  pluginsDb.insertPlugin({
    id: "test-plugin-8374",
    name: "test-plugin-8374",
    version: "1.0.0",
    main: "index.js",
    manifest: {},
    status: "active",
    pluginDir: "/tmp/test-plugin-8374",
  });
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

test("BUG #8374: GET /api/plugins with no ?status= returns 200, not 400", async () => {
  // @ts-ignore - handler accepts NextRequest at runtime
  const req = new NextRequest("http://localhost:3000/api/plugins");
  const res = await GET(req);
  const body = await res.json();
  assert.equal(res.status, 200, `expected 200, got ${res.status}: ${JSON.stringify(body)}`);
  assert.ok(Array.isArray(body.plugins), "response body must contain a plugins array");
});

test("GET /api/plugins with a valid ?status= filter still works and filters", async () => {
  // @ts-ignore
  const req = new NextRequest("http://localhost:3000/api/plugins?status=active");
  const res = await GET(req);
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.ok(
    body.plugins.every((p: { status: string }) => p.status === "active"),
    "all returned plugins must have the requested status"
  );
  assert.ok(
    body.plugins.some((p: { id: string }) => p.id === "test-plugin-8374"),
    "the seeded active plugin must be present in the filtered result"
  );
});

test("GET /api/plugins with an invalid ?status= still returns 400", async () => {
  // @ts-ignore
  const req = new NextRequest("http://localhost:3000/api/plugins?status=bogus");
  const res = await GET(req);
  const body = await res.json();
  assert.equal(res.status, 400);
  assert.equal(body.error, "Invalid status value");
});
