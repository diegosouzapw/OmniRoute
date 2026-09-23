/**
 * Regression test for #14092 — GET /v1/providers/:provider/models re-serialized
 * a filtered subset of the catalog but forwarded the upstream headers verbatim,
 * keeping a stale `content-length` (full catalog size) so the body never
 * completed on the wire and the dashboard dropdown stayed on loading forever.
 *
 * The fix strips length-describing headers and lets the runtime recompute them.
 * This test asserts the invariant directly: a declared `content-length`, when
 * present, must equal the actual body size.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-14092-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const routeModule = await import("../../src/app/api/v1/providers/[provider]/models/route.ts");

test.beforeEach(() => {
  core.resetDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function callGET(provider: string) {
  return routeModule.GET(new Request(`http://localhost/api/v1/providers/${provider}/models`), {
    params: Promise.resolve({ provider }),
  });
}

test("#14092: filtered provider models carry no stale content-length", async () => {
  let saw200 = false;
  for (const provider of ["openai", "anthropic"]) {
    const res = await callGET(provider);
    if (res.status !== 200) continue;
    saw200 = true;
    const text = await res.text();
    const declared = res.headers.get("content-length");
    assert.ok(
      declared === null || Number(declared) === Buffer.byteLength(text),
      `${provider}: content-length ${declared} must match actual body of ${Buffer.byteLength(text)} bytes`
    );
  }
  assert.equal(saw200, true, "at least one provider must 200 (else the test proves nothing)");
});
