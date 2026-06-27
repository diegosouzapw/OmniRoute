import test from "node:test";
import assert from "node:assert/strict";

import { resolveSocksHandshakeTimeoutMs } from "../../open-sse/utils/socksConnectorWithFamily.ts";

// #5109 — SOCKS5 residential proxies that work in curl fail under concurrency-100
// with "[Proxy Fast-Fail] Proxy unreachable" while the egress IP is valid. One
// contributing factor is the SOCKS5 handshake timeout being hardcoded at 10s:
// under a saturated per-host connection pool the real handshake can exceed 10s
// even though the proxy is reachable. The timeout is now operator-tunable so a
// high-concurrency deployment can raise it without a code change.
test("#5109: defaults to 10s when the env var is unset", () => {
  assert.equal(resolveSocksHandshakeTimeoutMs({}), 10_000);
});

test("#5109: honours a valid SOCKS_HANDSHAKE_TIMEOUT_MS override", () => {
  assert.equal(resolveSocksHandshakeTimeoutMs({ SOCKS_HANDSHAKE_TIMEOUT_MS: "30000" }), 30_000);
});

test("#5109: falls back to the default for non-numeric / non-positive values", () => {
  assert.equal(resolveSocksHandshakeTimeoutMs({ SOCKS_HANDSHAKE_TIMEOUT_MS: "abc" }), 10_000);
  assert.equal(resolveSocksHandshakeTimeoutMs({ SOCKS_HANDSHAKE_TIMEOUT_MS: "0" }), 10_000);
  assert.equal(resolveSocksHandshakeTimeoutMs({ SOCKS_HANDSHAKE_TIMEOUT_MS: "-5" }), 10_000);
});

test("#5109: clamps an excessive override to the 120s ceiling", () => {
  assert.equal(resolveSocksHandshakeTimeoutMs({ SOCKS_HANDSHAKE_TIMEOUT_MS: "999999" }), 120_000);
});
