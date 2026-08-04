/**
 * Tests for electron/lib/resolveServerEntry.js (#3386)
 *
 * The Electron main process must launch `server-ws.mjs` (the peer-stamp wrapper)
 * instead of bare `server.js` so that LOCAL_ONLY routes (AgentBridge, MCP, services)
 * pass the loopback authz check.  This helper is unit-tested here with an injectable
 * existsSync so no filesystem or Electron binary is needed.
 *
 * TDD sequence:
 *   BEFORE the fix: main.js hardcodes "server.js" — the helper did not exist yet.
 *   AFTER the fix:  main.js delegates to resolveServerEntry(); tests verify both branches.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const { resolveServerEntry } = require("../../electron/lib/resolveServerEntry");

describe("resolveServerEntry (#3386 — Electron 403 LOCAL_ONLY fix)", () => {
  const FAKE_SERVER_DIR = "/fake/standalone";

  it("returns 'server-ws.mjs' when it exists in the server directory", () => {
    // existsSync returns true for the server-ws.mjs path, false for anything else
    const existsSyncFn = (p: string) => p === join(FAKE_SERVER_DIR, "server-ws.mjs");
    const result = resolveServerEntry(FAKE_SERVER_DIR, existsSyncFn);
    assert.equal(result, "server-ws.mjs", "should prefer server-ws.mjs when present");
  });

  it("falls back to 'server.js' when server-ws.mjs is absent", () => {
    // existsSync always returns false — simulates a build without the WS wrapper
    const existsSyncFn = (_p: string) => false;
    const result = resolveServerEntry(FAKE_SERVER_DIR, existsSyncFn);
    assert.equal(result, "server.js", "should fall back to server.js when server-ws.mjs is absent");
  });

  it("only checks for server-ws.mjs inside the given serverDir, not a parent dir", () => {
    const checked: string[] = [];
    const existsSyncFn = (p: string) => {
      checked.push(p);
      return false;
    };
    resolveServerEntry(FAKE_SERVER_DIR, existsSyncFn);
    assert.equal(checked.length, 1, "should only call existsSync once");
    assert.ok(
      checked[0].startsWith(FAKE_SERVER_DIR),
      `checked path "${checked[0]}" should be inside serverDir "${FAKE_SERVER_DIR}"`
    );
    assert.ok(
      checked[0].endsWith("server-ws.mjs"),
      `checked path "${checked[0]}" should end with "server-ws.mjs"`
    );
  });

  it("returns a plain filename (no directory component) in both branches", () => {
    const withWs = resolveServerEntry(FAKE_SERVER_DIR, () => true);
    const withoutWs = resolveServerEntry(FAKE_SERVER_DIR, () => false);
    assert.ok(!withWs.includes("/") && !withWs.includes("\\"), "server-ws.mjs result must be a bare filename");
    assert.ok(!withoutWs.includes("/") && !withoutWs.includes("\\"), "server.js result must be a bare filename");
  });
});
