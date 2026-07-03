/**
 * G-12: Smoke security tests for /api/services/ and /dashboard/providers/services/ route guard.
 *
 * Tests that `isLocalOnlyPath` and `isSpawnCapablePath` return the expected
 * values for all embedded-service prefixes — no running server required.
 *
 * Run as part of the integration/services suite:
 *   node --import tsx/esm --test tests/integration/services/*.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Import the actual module under test — no mocks needed.
import {
  isLocalOnlyPath,
  isLocalOnlyBypassableByManageScope,
  LOCAL_ONLY_API_PREFIXES,
  SPAWN_CAPABLE_PREFIXES,
} from "../../../src/server/authz/routeGuard.ts";

// ---------------------------------------------------------------------------
// isLocalOnlyPath — /api/services/* coverage
// ---------------------------------------------------------------------------

describe("isLocalOnlyPath — /api/services/* and /dashboard/providers/services/* are LOCAL_ONLY", () => {
  it("returns true for /api/services/9router/start", () => {
    assert.equal(isLocalOnlyPath("/api/services/9router/start"), true);
  });

  it("returns true for /api/services/cliproxy/install", () => {
    assert.equal(isLocalOnlyPath("/api/services/cliproxy/install"), true);
  });

  it("returns true for /api/services/9router/models", () => {
    assert.equal(isLocalOnlyPath("/api/services/9router/models"), true);
  });

  it("returns true for /api/services/9router/status", () => {
    assert.equal(isLocalOnlyPath("/api/services/9router/status"), true);
  });

  it("returns true for /api/services/9router/stop", () => {
    assert.equal(isLocalOnlyPath("/api/services/9router/stop"), true);
  });

  it("returns true for /api/services/cliproxy/start", () => {
    assert.equal(isLocalOnlyPath("/api/services/cliproxy/start"), true);
  });

  it("returns true for /api/services/cliproxy/status", () => {
    assert.equal(isLocalOnlyPath("/api/services/cliproxy/status"), true);
  });

  it("returns true for /api/services/bifrost/start", () => {
    assert.equal(isLocalOnlyPath("/api/services/bifrost/start"), true);
  });

  it("returns true for /api/services/bifrost/install", () => {
    assert.equal(isLocalOnlyPath("/api/services/bifrost/install"), true);
  });

  it("returns true for /api/services/bifrost/status", () => {
    assert.equal(isLocalOnlyPath("/api/services/bifrost/status"), true);
  });

  it("returns true for /api/services/ (root prefix)", () => {
    assert.equal(isLocalOnlyPath("/api/services/"), true);
  });

  it("returns true for /dashboard/providers/services/9router/embed/foo", () => {
    assert.equal(isLocalOnlyPath("/dashboard/providers/services/9router/embed/foo"), true);
  });

  it("returns true for /dashboard/providers/services/ (root prefix)", () => {
    assert.equal(isLocalOnlyPath("/dashboard/providers/services/"), true);
  });

  it("returns true for path with query string (raw path matching)", () => {
    // The path portion only (no query string) is what routeGuard receives.
    // This test validates that a path equal to the prefix works.
    assert.equal(isLocalOnlyPath("/api/services/9router/status"), true);
    // Confirm that if caller strips query string themselves before calling,
    // the behavior is correct.
    const rawWithQuery = "/api/services/9router/models?refresh=true";
    const pathOnly = rawWithQuery.split("?")[0];
    assert.equal(isLocalOnlyPath(pathOnly), true);
  });

  it("returns false for /api/services (no trailing slash — does NOT match prefix)", () => {
    // "/api/services" does not start with "/api/services/" — intentional behavior.
    assert.equal(isLocalOnlyPath("/api/services"), false);
  });

  it("returns false for /api/settings (unrelated route)", () => {
    assert.equal(isLocalOnlyPath("/api/settings"), false);
  });

  it("returns false for /api/providers (unrelated route)", () => {
    assert.equal(isLocalOnlyPath("/api/providers"), false);
  });
});

// ---------------------------------------------------------------------------
// isSpawnCapablePath — /api/services/* must NOT be bypassable by manage-scope
// ---------------------------------------------------------------------------

describe("isLocalOnlyBypassableByManageScope — /api/services/* is NOT bypassable (spawn-capable)", () => {
  it("returns false for /api/services/9router/install (spawn-capable)", () => {
    // Spawn-capable paths must never be bypassable — even when the DB kill-switch is on.
    assert.equal(isLocalOnlyBypassableByManageScope("/api/services/9router/install"), false);
  });

  it("returns false for /api/services/9router/start", () => {
    assert.equal(isLocalOnlyBypassableByManageScope("/api/services/9router/start"), false);
  });

  it("returns false for /api/services/ (root prefix)", () => {
    assert.equal(isLocalOnlyBypassableByManageScope("/api/services/"), false);
  });

  it("returns false for /api/services/cliproxy/install", () => {
    assert.equal(isLocalOnlyBypassableByManageScope("/api/services/cliproxy/install"), false);
  });

  it("returns false for /api/services/bifrost/install (spawn-capable)", () => {
    assert.equal(isLocalOnlyBypassableByManageScope("/api/services/bifrost/install"), false);
  });
});

// ---------------------------------------------------------------------------
// Constant integrity: LOCAL_ONLY_API_PREFIXES and SPAWN_CAPABLE_PREFIXES
// ---------------------------------------------------------------------------

describe("LOCAL_ONLY_API_PREFIXES constant integrity", () => {
  it("includes /api/services/ (T-10 hard rule)", () => {
    assert.ok(
      LOCAL_ONLY_API_PREFIXES.includes("/api/services/"),
      `Expected /api/services/ in LOCAL_ONLY_API_PREFIXES, got: ${JSON.stringify(LOCAL_ONLY_API_PREFIXES)}`
    );
  });

  it("includes /dashboard/providers/services/ (T-07 reverse proxy hard rule)", () => {
    assert.ok(
      LOCAL_ONLY_API_PREFIXES.includes("/dashboard/providers/services/"),
      `Expected /dashboard/providers/services/ in LOCAL_ONLY_API_PREFIXES, got: ${JSON.stringify(LOCAL_ONLY_API_PREFIXES)}`
    );
  });

  it("includes /api/mcp/ (pre-existing hard rule)", () => {
    assert.ok(
      LOCAL_ONLY_API_PREFIXES.includes("/api/mcp/"),
      "Expected /api/mcp/ in LOCAL_ONLY_API_PREFIXES"
    );
  });

  it("includes /api/cli-tools/runtime/ (pre-existing hard rule)", () => {
    assert.ok(
      LOCAL_ONLY_API_PREFIXES.includes("/api/cli-tools/runtime/"),
      "Expected /api/cli-tools/runtime/ in LOCAL_ONLY_API_PREFIXES"
    );
  });

  it("has exactly 5 entries (no silent regressions adding or removing prefixes)", () => {
    // 4 baseline entries (/api/mcp/, /api/cli-tools/runtime/, /api/services/,
    // /dashboard/providers/services/) + /api/copilot/ added in the v3.8.4
    // semgrep MCP hardening pass (commit 21f8dc4b3).
    assert.equal(
      LOCAL_ONLY_API_PREFIXES.length,
      5,
      `Expected 5 LOCAL_ONLY_API_PREFIXES, got ${LOCAL_ONLY_API_PREFIXES.length}: ${JSON.stringify(LOCAL_ONLY_API_PREFIXES)}`
    );
  });
});

describe("SPAWN_CAPABLE_PREFIXES constant integrity", () => {
  it("includes /api/services/ (can run npm install + spawn node)", () => {
    assert.ok(
      SPAWN_CAPABLE_PREFIXES.includes("/api/services/"),
      `Expected /api/services/ in SPAWN_CAPABLE_PREFIXES, got: ${JSON.stringify(SPAWN_CAPABLE_PREFIXES)}`
    );
  });

  it("includes /api/cli-tools/runtime/ (pre-existing spawn-capable)", () => {
    assert.ok(
      SPAWN_CAPABLE_PREFIXES.includes("/api/cli-tools/runtime/"),
      "Expected /api/cli-tools/runtime/ in SPAWN_CAPABLE_PREFIXES"
    );
  });

  it("has exactly 2 entries (no silent regressions)", () => {
    assert.equal(
      SPAWN_CAPABLE_PREFIXES.length,
      2,
      `Expected 2 SPAWN_CAPABLE_PREFIXES, got ${SPAWN_CAPABLE_PREFIXES.length}: ${JSON.stringify(SPAWN_CAPABLE_PREFIXES)}`
    );
  });

  it("does NOT include /api/mcp/ (bypassable, not spawn-capable)", () => {
    assert.ok(
      !SPAWN_CAPABLE_PREFIXES.includes("/api/mcp/"),
      "/api/mcp/ should NOT be in SPAWN_CAPABLE_PREFIXES"
    );
  });

  it("does NOT include /dashboard/providers/services/ (local-only but separate concern)", () => {
    assert.ok(
      !SPAWN_CAPABLE_PREFIXES.includes("/dashboard/providers/services/"),
      "/dashboard/providers/services/ should NOT be in SPAWN_CAPABLE_PREFIXES"
    );
  });
});
