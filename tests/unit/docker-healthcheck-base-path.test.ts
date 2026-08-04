import test from "node:test";
import assert from "node:assert/strict";
import { resolveHealthPath } from "../../scripts/dev/healthcheck.mjs";

test("resolveHealthPath keeps the default route at the domain root", () => {
  assert.equal(resolveHealthPath(""), "/api/monitoring/health");
  assert.equal(resolveHealthPath(undefined), "/api/monitoring/health");
});

test("resolveHealthPath prefixes the health route with OMNIROUTE_BASE_PATH", () => {
  assert.equal(resolveHealthPath("/omniroute/"), "/omniroute/api/monitoring/health");
  assert.equal(resolveHealthPath("/omniroute"), "/omniroute/api/monitoring/health");
});
