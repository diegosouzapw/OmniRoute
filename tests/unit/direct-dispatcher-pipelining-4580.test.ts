import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  __getDefaultDispatcherOptionsForTest,
  __getProxyDispatcherOptionsForTest,
  getDefaultDispatcherConnectionLimit,
  clearDispatcherCache,
} from "../../open-sse/utils/proxyDispatcher.ts";

afterEach(() => clearDispatcherCache());

// #4580 — On the DIRECT egress path, concurrent same-provider requests serialized
// behind a long/streaming request. The proxy dispatcher already got pipelining:0 +
// a connections cap in #4288, but the first-attempt direct dispatcher
// (getDispatcherOptions → new Agent) kept undici's default pipelining (1), so long
// SSE streams bottlenecked the single pooled socket. The direct dispatcher now
// mirrors that fix while KEEPING keep-alive (a proxy-only concern was the 1ms TTL).

describe("#4580 direct dispatcher options", () => {
  it("disables pipelining so concurrent streams open separate sockets", () => {
    const opts = __getDefaultDispatcherOptionsForTest({});
    assert.equal(opts.pipelining, 0);
  });

  it("caps connections to a finite number (default 32)", () => {
    const opts = __getDefaultDispatcherOptionsForTest({});
    assert.equal(typeof opts.connections, "number");
    assert.equal(opts.connections, 32);
  });

  it("preserves keep-alive (NOT the 1ms TTL the proxy path forces)", () => {
    const direct = __getDefaultDispatcherOptionsForTest({});
    const proxy = __getProxyDispatcherOptionsForTest({});
    assert.equal(proxy.keepAliveTimeout, 1);
    assert.ok(
      (direct.keepAliveTimeout ?? 0) > 1,
      `direct keepAliveTimeout should stay > 1 (got ${direct.keepAliveTimeout})`
    );
  });

  it("connection limit honors OMNIROUTE_DIRECT_DISPATCHER_CONNECTIONS", () => {
    assert.equal(getDefaultDispatcherConnectionLimit({ OMNIROUTE_DIRECT_DISPATCHER_CONNECTIONS: "8" }), 8);
  });

  it("connection limit clamps invalid values to the default", () => {
    assert.equal(
      getDefaultDispatcherConnectionLimit({ OMNIROUTE_DIRECT_DISPATCHER_CONNECTIONS: "nonsense" }),
      32
    );
    assert.equal(getDefaultDispatcherConnectionLimit({}), 32);
  });
});
