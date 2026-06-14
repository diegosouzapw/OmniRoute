import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolveTlsClientProxyUrl } from "../../open-sse/services/tlsClientProxy.ts";

describe("resolveTlsClientProxyUrl — fail-closed", () => {
  it("returns the per-call override verbatim", () => {
    assert.equal(
      resolveTlsClientProxyUrl("https://grok.com", "http://p:8080", () => null),
      "http://p:8080"
    );
  });
  it("returns undefined when no proxy is configured (direct is legitimate)", () => {
    assert.equal(
      resolveTlsClientProxyUrl("https://grok.com", undefined, () => ({
        source: "direct",
        proxyUrl: null,
      })),
      undefined
    );
  });
  it("returns the resolved proxy url when one is configured", () => {
    assert.equal(
      resolveTlsClientProxyUrl("https://grok.com", undefined, () => ({
        source: "context",
        proxyUrl: "socks5://p:1080",
      })),
      "socks5://p:1080"
    );
  });
  it("THROWS (fail-closed) when resolution throws — never silently direct", () => {
    assert.throws(
      () =>
        resolveTlsClientProxyUrl("https://grok.com", undefined, () => {
          throw new Error("SOCKS5 disabled");
        }),
      /proxy resolution failed/i
    );
  });
});
