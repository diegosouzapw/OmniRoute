import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  isLocalOnlyPath,
  isLocalOnlyBypassableByManageScope,
} from "@/server/authz/routeGuard";

// Security guard: the discovery surface must be strict-loopback only. If someone
// removes "/api/discovery/" from LOCAL_ONLY_API_PREFIXES, or adds it to the
// manage-scope bypass list, these assertions fail — the scan route makes
// outbound probes (SSRF-adjacent) and must never be tunnel-reachable.
describe("discovery routes are strict local-only", () => {
  for (const path of [
    "/api/discovery/results",
    "/api/discovery/results/42",
    "/api/discovery/scan",
    "/api/discovery/verify/42",
  ]) {
    test(`isLocalOnlyPath("${path}") === true`, () => {
      assert.equal(isLocalOnlyPath(path), true);
    });

    test(`"${path}" is NOT bypassable by manage-scope (strict loopback)`, () => {
      assert.equal(isLocalOnlyBypassableByManageScope(path), false);
    });
  }
});
