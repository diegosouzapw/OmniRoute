import assert from "node:assert/strict";
import { test } from "node:test";
import { isLocalOnlyPath } from "../../src/server/authz/routeGuard.ts";

test("isLocalOnlyPath correctly classifies process-spawning endpoints under Tier 1 LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/services/dario/start"), true);
  assert.equal(isLocalOnlyPath("/api/mcp/stream"), true);
  assert.equal(isLocalOnlyPath("/api/cli-tools/runtime/status"), true);
  assert.equal(isLocalOnlyPath("/api/v1/chat/completions"), false);
});
