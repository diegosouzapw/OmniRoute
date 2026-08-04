/**
 * Security regression: when OmniRoute itself runs behind an external reverse
 * proxy (nginx / Caddy / Cloudflare Tunnel), `req.socket.remoteAddress` is the
 * proxy hop — usually 127.0.0.1 — not the real end-user.
 *
 * Previously, the custom server stamped the loopback socket as the trusted
 * peer IP, so `classifyHostLocality()` returned "loopback" for every remote
 * caller arriving via the proxy → the LOCAL_ONLY route guard (which gates
 * spawn-capable routes like `/api/cli-tools/runtime/*`, `/api/services/*`,
 * `/api/plugins/*`, `/api/system/version`) was effectively bypassed. A leaked
 * JWT over the public tunnel could trigger child-process spawning.
 *
 * Fix (mirrors upstream decolua/9router commit da667836): the custom server
 * detects forwarding headers (`x-forwarded-for` / `x-real-ip`) and stamps a
 * token-protected `via-proxy` marker. When the marker is present, locality
 * derived from a loopback socket is downgraded to "remote" (fail closed).
 *
 * Hard Rules #15, #17 + Rule #18 (TDD before fix).
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  resolveStampedPeer,
  resolveStampedViaProxy,
  classifyStampedPeerLocality,
} from "../../src/server/authz/peerStamp.ts";

const TOK = "process-secret-token-abc";

test("resolveStampedViaProxy: returns true only for the correctly-tokened stamp", () => {
  assert.equal(resolveStampedViaProxy(`${TOK}|1`, TOK), true);
  assert.equal(resolveStampedViaProxy(`${TOK}|0`, TOK), false);
  assert.equal(resolveStampedViaProxy(null, TOK), false);
  assert.equal(resolveStampedViaProxy("", TOK), false);
});

test("resolveStampedViaProxy: rejects forged / un-tokened values", () => {
  assert.equal(resolveStampedViaProxy("1", TOK), false, "raw client value (no token)");
  assert.equal(resolveStampedViaProxy("wrong-token|1", TOK), false, "forged token");
  assert.equal(resolveStampedViaProxy(`${TOK}|1`, undefined), false, "no process token");
});

test("classifyStampedPeerLocality: loopback socket WITHOUT a proxy stamp stays loopback", () => {
  // Local CLI / dashboard hit — the normal happy path.
  assert.equal(
    classifyStampedPeerLocality(`${TOK}|127.0.0.1`, null, TOK),
    "loopback"
  );
  assert.equal(classifyStampedPeerLocality(`${TOK}|::1`, null, TOK), "loopback");
});

test("classifyStampedPeerLocality: loopback socket WITH a proxy stamp is REMOTE (fail closed)", () => {
  // OmniRoute is behind nginx/Caddy/Cloudflare; the socket peer is the proxy.
  // The real end-user is somewhere on the public internet → must not be trusted
  // as local, otherwise the LOCAL_ONLY spawn-capable surface is reachable from
  // a tunnel.
  assert.equal(
    classifyStampedPeerLocality(`${TOK}|127.0.0.1`, `${TOK}|1`, TOK),
    "remote",
    "loopback socket + via-proxy stamp must NOT be classified as local"
  );
  assert.equal(
    classifyStampedPeerLocality(`${TOK}|::1`, `${TOK}|1`, TOK),
    "remote"
  );
  assert.equal(
    classifyStampedPeerLocality(`${TOK}|::ffff:127.0.0.1`, `${TOK}|1`, TOK),
    "remote"
  );
});

test("classifyStampedPeerLocality: private-LAN socket WITH a proxy stamp is still REMOTE", () => {
  // Caddy/nginx running on a LAN box in front of OmniRoute. We do not know how
  // the proxy is exposed (it could be tunneled to the public internet), so any
  // proxy hop downgrades locality to remote.
  assert.equal(
    classifyStampedPeerLocality(`${TOK}|192.168.0.15`, `${TOK}|1`, TOK),
    "remote"
  );
});

test("classifyStampedPeerLocality: public-IP socket is remote regardless of stamp", () => {
  assert.equal(
    classifyStampedPeerLocality(`${TOK}|8.8.8.8`, null, TOK),
    "remote"
  );
  assert.equal(
    classifyStampedPeerLocality(`${TOK}|8.8.8.8`, `${TOK}|1`, TOK),
    "remote"
  );
});

test("classifyStampedPeerLocality: missing / forged peer stamp fails closed to remote", () => {
  assert.equal(classifyStampedPeerLocality(null, null, TOK), "remote");
  assert.equal(classifyStampedPeerLocality("forged|127.0.0.1", null, TOK), "remote");
});

test("classifyStampedPeerLocality: untrusted (un-tokened) via-proxy header is ignored", () => {
  // A remote attacker who guesses the via-proxy header name but cannot mint the
  // token must NOT be able to flip the locality verdict by themselves; the
  // safety direction is OK (downgrade), but the inverse — pretending no proxy
  // exists when one does — would only be exploitable if the attacker controlled
  // BOTH headers, which the token gate prevents. We assert the bypass attempt
  // (un-tokened via-proxy hint) does not leak into the verdict for the normal
  // local-CLI case.
  assert.equal(
    classifyStampedPeerLocality(`${TOK}|127.0.0.1`, "1", TOK),
    "loopback",
    "un-tokened via-proxy hint is ignored (== false) — local CLI keeps loopback"
  );
});
