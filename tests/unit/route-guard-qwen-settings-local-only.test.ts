import test from "node:test";
import assert from "node:assert/strict";

import {
  isLocalOnlyBypassableByManageScope,
  isLocalOnlyPath,
} from "../../src/server/authz/routeGuard.ts";
import { SPAWN_CAPABLE_ROUTE_ROOTS } from "../../scripts/check/check-route-guard-membership.ts";

test("Qwen Code settings are local-only because GET probes a binary and writes touch ~/.qwen", () => {
  assert.equal(isLocalOnlyPath("/api/cli-tools/qwen-settings"), true);
  assert.equal(isLocalOnlyPath("/api/cli-tools/qwen-settings/"), true);
});

test("Qwen Code settings cannot be opened through the manage-scope bypass", () => {
  assert.equal(isLocalOnlyBypassableByManageScope("/api/cli-tools/qwen-settings"), false);
});

test("the spawn-capable route audit includes Qwen Code settings", () => {
  assert.ok(SPAWN_CAPABLE_ROUTE_ROOTS.includes("src/app/api/cli-tools/qwen-settings"));
});
