import { describe, it } from "node:test";
import assert from "node:assert";
import { egressLabel } from "../../open-sse/executors/opencodeEgressThrottle.ts";

// Rotation log lines must name the egress really applied to each attempt as
// `(proxy <host>:<port>)`, and `(proxy direct)` only when no proxy applies.
// Host and port only: member keys carry user info and must never leak.
describe("rotation egress label", () => {
  it("names a dedicated proxy host and port", () => {
    assert.strictEqual(
      egressLabel({ proxy: { host: "127.0.0.1", port: 8080 } }),
      "(proxy 127.0.0.1:8080)"
    );
  });

  it("reports direct without a proxy and without a reader", () => {
    assert.strictEqual(egressLabel({ proxy: null }), "(proxy direct)");
  });

  it("keeps an explicit default port", () => {
    assert.strictEqual(egressLabel({ proxy: { host: "h", port: 80 } }), "(proxy h:80)");
  });

  it("names the pool member for a proxyless account", () => {
    const label = egressLabel({ proxy: null, fingerprint: "fp-a" }, () => "http://@pool:8080");
    assert.strictEqual(label, "(proxy pool:8080)");
  });

  it("never leaks user info from member keys", () => {
    const label = egressLabel({ proxy: null, fingerprint: "fp-a" }, () => "http://user@host:1234");
    assert.strictEqual(label, "(proxy host:1234)");
    assert.ok(!label.includes("@") && !label.includes("//"));
  });

  it("falls back to direct when the reader throws or the key is malformed", () => {
    assert.strictEqual(
      egressLabel({ proxy: null, fingerprint: "fp-a" }, () => {
        throw new Error("reader down");
      }),
      "(proxy direct)"
    );
    assert.strictEqual(
      egressLabel({ proxy: null, fingerprint: "fp-a" }, () => "not a key"),
      "(proxy direct)"
    );
  });
});
