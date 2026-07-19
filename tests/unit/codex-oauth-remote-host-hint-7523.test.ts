// Regression test for #7523: the Codex (and Windsurf/Devin) PKCE OAuth callback
// server binds the SERVER's loopback (localhost:PORT). When OmniRoute runs on a
// remote host (e.g. the VPS) and the operator drives the browser from a different
// machine, the provider redirects to the operator's OWN localhost:PORT — the
// login confirmation screen hangs forever with no explanation.
//
// buildRemoteOAuthHint() detects a non-loopback Host and surfaces the
// reverse-tunnel instruction so the start-callback-server response carries it
// (the UI shows it instead of a silent hang). Loopback access is unaffected.

import test from "node:test";
import assert from "node:assert/strict";

import { buildRemoteOAuthHint } from "../../src/app/api/oauth/[provider]/[action]/remoteOAuthHint.ts";

test("loopback Host → no remote hint (local access is unaffected)", () => {
  for (const host of ["localhost", "localhost:20128", "127.0.0.1:20128", "[::1]:20128", "::1"]) {
    const hint = buildRemoteOAuthHint(host, 1455);
    assert.equal(hint.remoteHost, false, `expected no hint for loopback host ${host}`);
  }
});

test("null Host → no remote hint (fail-open: never block a local flow on a missing header)", () => {
  const hint = buildRemoteOAuthHint(null, 1455);
  assert.equal(hint.remoteHost, false);
});

test("remote Host → returns the reverse-tunnel hint with the exact callback port", () => {
  const hint = buildRemoteOAuthHint("192.168.0.15:20128", 1455);
  assert.equal(hint.remoteHost, true);
  assert.ok(hint.remoteHost === true); // narrow the union
  // The tunnel must forward the SAME port the callback server bound, both sides.
  assert.equal(hint.tunnelCommand, "ssh -L 1455:127.0.0.1:1455 <user>@<omniroute-host>");
  assert.match(hint.message, /remote host \(192\.168\.0\.15:20128\)/);
  assert.match(hint.message, /hang/i);
});

test("remote Host honours a random callback port (Windsurf/Devin OS-assigned port)", () => {
  const hint = buildRemoteOAuthHint("omniroute.example.com", 54321);
  assert.ok(hint.remoteHost === true);
  assert.equal(hint.tunnelCommand, "ssh -L 54321:127.0.0.1:54321 <user>@<omniroute-host>");
});
