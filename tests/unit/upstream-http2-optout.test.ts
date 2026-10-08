import test from "node:test";
import assert from "node:assert/strict";
import {
  __getDefaultDispatcherOptionsForTest,
  __getProxyDispatcherOptionsForTest,
  __getDispatcherOptionsForTest,
} from "../../open-sse/utils/proxyDispatcher.ts";

test("#15313: direct and proxy dispatchers disable HTTP/2 on explicit opt-out", () => {
  for (const value of ["false", "0", "no", "off", " FALSE "]) {
    const env = { OMNIROUTE_UPSTREAM_HTTP2_ENABLED: value };
    const direct = __getDefaultDispatcherOptionsForTest(env);
    assert.equal(direct.allowH2, false);
    assert.equal(direct.connect?.allowH2, false);
    const proxy = __getProxyDispatcherOptionsForTest(env);
    assert.equal(proxy.allowH2, false);
    assert.equal(proxy.connect?.allowH2, false);
    assert.equal(proxy.requestTls?.allowH2, false);
    assert.equal(proxy.proxyTls?.allowH2, false);
    assert.equal(proxy.connections, 32);
    assert.equal(proxy.pipelining, 4);
    assert.equal(proxy.keepAliveTimeout, 30_000);
    assert.equal(proxy.keepAliveMaxTimeout, 60_000);
  }
});

test("HTTP/2 stays enabled by default, including empty and unknown flag values", () => {
  for (const value of [undefined, "", "true", "1", "yes", "on", "unknown"]) {
    const env = { OMNIROUTE_UPSTREAM_HTTP2_ENABLED: value };
    assert.equal(__getDefaultDispatcherOptionsForTest(env).allowH2, true);
    const proxy = __getProxyDispatcherOptionsForTest(env);
    assert.equal(proxy.allowH2, true);
    assert.equal(proxy.requestTls?.allowH2, true);
    assert.equal(proxy.proxyTls?.allowH2, true);
  }
});

test("HTTP/1 opt-out preserves local-egress family and keep-alive settings", () => {
  const previous = process.env.OMNIROUTE_UPSTREAM_HTTP2_ENABLED;
  process.env.OMNIROUTE_UPSTREAM_HTTP2_ENABLED = "false";
  try {
    const options = __getDispatcherOptionsForTest("host.docker.internal");
    assert.equal(options.allowH2, false);
    assert.equal(options.connect?.allowH2, false);
    assert.equal(options.connect?.autoSelectFamily, true);
    assert.equal(options.connect?.autoSelectFamilyAttemptTimeout, 200);
    assert.equal(options.keepAliveMaxTimeout, 1000);
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_UPSTREAM_HTTP2_ENABLED;
    else process.env.OMNIROUTE_UPSTREAM_HTTP2_ENABLED = previous;
  }
});
