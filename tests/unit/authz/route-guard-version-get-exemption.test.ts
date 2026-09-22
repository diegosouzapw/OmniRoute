/**
 * TDD regression guard for #5083 — Bug 2:
 * GET /api/system/version is blocked from LAN/remote hosts because the entire
 * path is in LOCAL_ONLY_API_PREFIXES for all methods. Only POST spawns child
 * processes (git/npm/pm2); GET only reads package.json + npm registry.
 *
 * Fix: isLocalOnlyPath(path, method) returns false for safe HTTP methods
 * when the path exactly matches LOCAL_ONLY_API_GET_EXEMPTIONS.
 *
 * Security invariant: POST /api/system/version MUST remain local-only.
 * All OTHER local-only prefixes (/api/mcp/, /api/services/, etc.) must
 * remain local-only for GET too (exemption is exact-match only).
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  isLocalOnlyPath,
  LOCAL_ONLY_API_GET_EXEMPTIONS,
} from "../../../src/server/authz/routeGuard.ts";

describe("isLocalOnlyPath — GET exemption for /api/system/version (#5083)", () => {
  // ── EXEMPTION APPLIES ──────────────────────────────────────────────────────

  test("GET /api/system/version is NOT local-only (no child process spawn)", () => {
    assert.equal(isLocalOnlyPath("/api/system/version", "GET"), false);
  });

  test("HEAD /api/system/version is NOT local-only (read-only method)", () => {
    assert.equal(isLocalOnlyPath("/api/system/version", "HEAD"), false);
  });

  test("OPTIONS /api/system/version is NOT local-only (CORS preflight)", () => {
    assert.equal(isLocalOnlyPath("/api/system/version", "OPTIONS"), false);
  });

  // ── SPAWN-CAPABLE METHODS REMAIN BLOCKED ──────────────────────────────────

  test("POST /api/system/version STAYS local-only (spawns git/npm/pm2)", () => {
    assert.equal(isLocalOnlyPath("/api/system/version", "POST"), true);
  });

  test("PUT /api/system/version stays local-only", () => {
    assert.equal(isLocalOnlyPath("/api/system/version", "PUT"), true);
  });

  test("PATCH /api/system/version stays local-only", () => {
    assert.equal(isLocalOnlyPath("/api/system/version", "PATCH"), true);
  });

  test("DELETE /api/system/version stays local-only", () => {
    assert.equal(isLocalOnlyPath("/api/system/version", "DELETE"), true);
  });

  // ── SAFE DEFAULT: no method arg → still blocked ─────────────────────────

  test("isLocalOnlyPath('/api/system/version') with NO method arg returns true (safe default)", () => {
    // Scripts like check-route-guard-membership call without a method; safe default
    // must be true so spawn-capable paths are never accidentally unblocked.
    assert.equal(isLocalOnlyPath("/api/system/version"), true);
  });

  // ── EXEMPTION IS EXACT-MATCH ONLY ─────────────────────────────────────────

  test("GET /api/system/version/extra is NOT exempted (prefix would be too broad)", () => {
    // The exemption applies only to the exact path — sub-paths are NOT exempted.
    assert.equal(isLocalOnlyPath("/api/system/version/extra", "GET"), true);
  });

  // ── OTHER LOCAL-ONLY PREFIXES UNAFFECTED BY GET EXEMPTION ─────────────────

  test("GET /api/mcp/ still local-only — exemption is NOT applied to /api/mcp/", () => {
    assert.equal(isLocalOnlyPath("/api/mcp/sse", "GET"), true);
  });

  test("GET /api/services/9router/start still local-only", () => {
    assert.equal(isLocalOnlyPath("/api/services/9router/start", "GET"), true);
  });

  test("GET /api/cli-tools/runtime/claude still local-only", () => {
    assert.equal(isLocalOnlyPath("/api/cli-tools/runtime/claude", "GET"), true);
  });

  test("GET /api/db-backups/exportAll still local-only (spawns tar)", () => {
    assert.equal(isLocalOnlyPath("/api/db-backups/exportAll", "GET"), true);
  });

  // ── EXEMPTION SET IS EXPORTED AND HOLDS EXACTLY THE REVIEWED PATHS ───────

  test("LOCAL_ONLY_API_GET_EXEMPTIONS contains /api/system/version", () => {
    assert.ok(LOCAL_ONLY_API_GET_EXEMPTIONS.has("/api/system/version"));
  });

  // Every entry here opens a local-only path to LAN/remote GET, so the set must
  // never grow by accident. Pinned by membership rather than by `size`: a count
  // cannot say WHICH path appeared, and it cannot see a substitution at all —
  // swapping /api/system/version for some other route keeps size at 1 and passes.
  // Adding a path is still meant to fail here; the fix is to add it to this list
  // in the same change, with the reason it is safe for a read-only method.
  //
  //   /api/system/version    — GET only reads package.json + the npm registry (#5083)
  //   /api/tunnels/cloudflared — GET is tunnel status; POST still spawns cloudflared
  //                              and stays local-only (#11531, and see
  //                              route-guard-tunnel-processes-local-only.test.ts)
  //   /api/services/{bifrost,cliproxy,dario,mux,openwa}/status — GET returns
  //                              sanitized lifecycle/version metadata only;
  //                              mutations remain local-only. 9router is omitted
  //                              because its status route can reveal a credential.
  test("LOCAL_ONLY_API_GET_EXEMPTIONS holds exactly the reviewed paths", () => {
    assert.deepEqual([...LOCAL_ONLY_API_GET_EXEMPTIONS].sort(), [
      "/api/services/bifrost/status",
      "/api/services/cliproxy/status",
      "/api/services/dario/status",
      "/api/services/mux/status",
      "/api/services/openwa/status",
      "/api/system/version",
      "/api/tunnels/cloudflared",
    ]);
  });
});
