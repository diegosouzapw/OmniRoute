import test from "node:test";
import assert from "node:assert/strict";
import { isLocalOnlyPath } from "../../../src/server/authz/routeGuard.ts";

const SAFE_REMOTE_STATUS_PATHS = [
  "/api/services/bifrost/status",
  "/api/services/cliproxy/status",
  "/api/services/dario/status",
  "/api/services/mux/status",
  "/api/services/openwa/status",
] as const;

test("exact non-secret embedded-service status GETs are remotely readable", () => {
  for (const path of SAFE_REMOTE_STATUS_PATHS) {
    assert.equal(isLocalOnlyPath(path, "GET"), false, `${path} GET should be exempt`);
    assert.equal(isLocalOnlyPath(path, "HEAD"), false, `${path} HEAD should be exempt`);
    assert.equal(isLocalOnlyPath(path, "OPTIONS"), false, `${path} OPTIONS should be exempt`);
  }
});

test("status exemptions never allow lifecycle mutations", () => {
  for (const path of SAFE_REMOTE_STATUS_PATHS) {
    assert.equal(isLocalOnlyPath(path, "POST"), true, `${path} POST must stay local-only`);
    assert.equal(isLocalOnlyPath(path, "PUT"), true, `${path} PUT must stay local-only`);
    assert.equal(isLocalOnlyPath(path, "DELETE"), true, `${path} DELETE must stay local-only`);
  }
});

test("arbitrary service routes and near-matches remain local-only", () => {
  assert.equal(isLocalOnlyPath("/api/services/bifrost/start", "GET"), true);
  assert.equal(isLocalOnlyPath("/api/services/bifrost/status/extra", "GET"), true);
  assert.equal(isLocalOnlyPath("/api/services/unknown/status", "GET"), true);
  assert.equal(isLocalOnlyPath("/api/services/9router/status", "GET"), true);
});

test("9router status stays local-only because its GET handler can reveal a plaintext key", () => {
  assert.equal(isLocalOnlyPath("/api/services/9router/status", "GET"), true);
  assert.equal(isLocalOnlyPath("/api/services/9router/status", "POST"), true);
});
