import test from "node:test";
import assert from "node:assert/strict";
import { resolveHealthPath } from "../../scripts/dev/healthcheck.mjs";

test("resolveHealthPath keeps the default lightweight /healthz route at the domain root (#10311)", () => {
  assert.equal(resolveHealthPath(""), "/healthz");
  assert.equal(resolveHealthPath(undefined), "/healthz");
});

test("resolveHealthPath prefixes the health route with OMNIROUTE_BASE_PATH", () => {
  assert.equal(resolveHealthPath("/omniroute/"), "/omniroute/healthz");
  assert.equal(resolveHealthPath("/omniroute"), "/omniroute/healthz");
});

test("resolveHealthPath honors an explicit OMNIROUTE_HEALTHCHECK_PATH override", () => {
  assert.equal(resolveHealthPath(undefined, "/api/monitoring/health"), "/api/monitoring/health");
  assert.equal(
    resolveHealthPath("/omniroute", "/api/monitoring/health"),
    "/omniroute/api/monitoring/health"
  );
});

test("resolveHealthPath ignores an invalid/empty OMNIROUTE_HEALTHCHECK_PATH and falls back to /healthz", () => {
  assert.equal(resolveHealthPath("", "  "), "/healthz");
  assert.equal(resolveHealthPath("", "/../etc/passwd"), "/healthz");
  assert.equal(resolveHealthPath("", "/health?utm=1"), "/healthz");
});
