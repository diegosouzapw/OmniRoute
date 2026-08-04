/**
 * Gap 14 + Gap 15: structural loop guard + verbosity level, both living in the
 * testable `_internal/bypass.cjs` shim that server.cjs consumes.
 *
 * Gap 14 — the primary loop guard is the x-omniroute-source header; this is a
 * defense-in-depth backstop: if a forwarded request's resolved upstream is a
 * loopback address on the MITM's own listen port, dialing it re-enters this
 * server (infinite loop / fd storm). Detect and refuse.
 *
 * Gap 15 — MITM_VERBOSE controls how chatty the routing-decision log is.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const requireCjs = createRequire(import.meta.url);
const shim = requireCjs("../../src/mitm/_internal/bypass.cjs") as {
  isSelfLoopDestination: (ip: string, destPort: number, localPort: number) => boolean;
  parseVerboseLevel: (env: string | undefined) => number;
};

test("isSelfLoopDestination — loopback IPv4 on the listen port loops", () => {
  assert.equal(shim.isSelfLoopDestination("127.0.0.1", 443, 443), true);
});

test("isSelfLoopDestination — any 127.x.x.x on the listen port loops", () => {
  assert.equal(shim.isSelfLoopDestination("127.0.0.53", 443, 443), true);
});

test("isSelfLoopDestination — IPv6 loopback on the listen port loops", () => {
  assert.equal(shim.isSelfLoopDestination("::1", 443, 443), true);
});

test("isSelfLoopDestination — a real public IP never loops", () => {
  assert.equal(shim.isSelfLoopDestination("1.2.3.4", 443, 443), false);
});

test("isSelfLoopDestination — loopback on a DIFFERENT port does not loop", () => {
  assert.equal(shim.isSelfLoopDestination("127.0.0.1", 8080, 443), false);
});

test("parseVerboseLevel — defaults to 1 (log decisions) when unset/garbage", () => {
  assert.equal(shim.parseVerboseLevel(undefined), 1);
  assert.equal(shim.parseVerboseLevel("not-a-number"), 1);
});

test("parseVerboseLevel — honors explicit levels including 0 (silent)", () => {
  assert.equal(shim.parseVerboseLevel("0"), 0);
  assert.equal(shim.parseVerboseLevel("2"), 2);
});
