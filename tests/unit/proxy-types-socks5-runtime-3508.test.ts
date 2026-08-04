import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildProxyTypes } from "../../src/shared/components/ProxyConfigModal.tsx";

describe("buildProxyTypes — #3508 runtime socks5 flag", () => {
  it("includes socks5 when socks5Enabled is true", () => {
    const types = buildProxyTypes(true);
    const values = types.map((t) => t.value);
    assert.ok(values.includes("socks5"), "socks5 should be present when enabled");
    assert.ok(values.includes("http"), "http should always be present");
    assert.ok(values.includes("https"), "https should always be present");
  });

  it("excludes socks5 when socks5Enabled is false", () => {
    const types = buildProxyTypes(false);
    const values = types.map((t) => t.value);
    assert.ok(!values.includes("socks5"), "socks5 should be absent when disabled");
    assert.ok(values.includes("http"), "http should always be present");
    assert.ok(values.includes("https"), "https should always be present");
  });

  it("returns a new array each call (no shared mutation)", () => {
    const a = buildProxyTypes(true);
    const b = buildProxyTypes(false);
    assert.notStrictEqual(a, b);
    assert.equal(a.length, 3);
    assert.equal(b.length, 2);
  });
});
