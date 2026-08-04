import test from "node:test";
import assert from "node:assert/strict";
import { isLocalOnlyPath } from "../../../src/server/authz/routeGuard.ts";

test("isLocalOnlyPath: /api/services/bifrost/start is local-only", () => {
  assert.equal(isLocalOnlyPath("/api/services/bifrost/start"), true);
});

test("isLocalOnlyPath: /api/services/bifrost/install is local-only", () => {
  assert.equal(isLocalOnlyPath("/api/services/bifrost/install"), true);
});

test("isLocalOnlyPath: /api/services/bifrost/status is local-only", () => {
  assert.equal(isLocalOnlyPath("/api/services/bifrost/status"), true);
});

test("isLocalOnlyPath: /api/services/bifrost/stop is local-only", () => {
  assert.equal(isLocalOnlyPath("/api/services/bifrost/stop"), true);
});

test("isLocalOnlyPath: /api/services/bifrost/auto-start is local-only", () => {
  assert.equal(isLocalOnlyPath("/api/services/bifrost/auto-start"), true);
});

test("isLocalOnlyPath: /api/services/bifrost/logs is local-only", () => {
  assert.equal(isLocalOnlyPath("/api/services/bifrost/logs"), true);
});
