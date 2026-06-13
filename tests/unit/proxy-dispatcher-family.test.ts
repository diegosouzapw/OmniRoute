import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import { __getSocksOptionsForTest, clearDispatcherCache } from "../../open-sse/utils/proxyDispatcher.ts";

afterEach(() => clearDispatcherCache());

describe("proxyDispatcher SOCKS5 host handling", () => {
  it("de-brackets an IPv6-literal SOCKS proxy host", () => {
    const opts = __getSocksOptionsForTest("socks5://[2001:db8::1]:1080");
    assert.equal(opts.host, "2001:db8::1");
    assert.equal(opts.port, 1080);
  });
  it("leaves an IPv4 SOCKS host unchanged", () => {
    const opts = __getSocksOptionsForTest("socks5://203.0.113.7:1080");
    assert.equal(opts.host, "203.0.113.7");
  });
});
