import test from "node:test";
import assert from "node:assert/strict";
import { resolveHealthPath } from "../../scripts/dev/healthcheck.mjs";

// Issue #10311: the official Docker image's HEALTHCHECK (scripts/dev/healthcheck.mjs)
// must default to the lightweight lifecycle probe (/healthz) rather than the heavy
// /api/monitoring/health path (SQLite reads + deep monitoring aggregation on the same
// event loop as catalog rebuild / compression). This test asserts the expected fix.
test("resolveHealthPath defaults to the lightweight /healthz lifecycle probe, not the heavy monitoring path", () => {
  assert.equal(resolveHealthPath(""), "/healthz");
  assert.equal(resolveHealthPath(undefined), "/healthz");
});