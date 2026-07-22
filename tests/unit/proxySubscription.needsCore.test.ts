import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../src/lib/proxySubscription/needsCore.ts");
const { isNeedsCoreNode, countNeedsCoreNodes, NEEDS_CORE_PROTOCOLS } = mod;

test("direct nodes (http/https/socks5) are not needs-core", () => {
  assert.equal(isNeedsCoreNode({ type: "http", host: "1.2.3.4", port: 8080, rawProtocol: "http" }), false);
  assert.equal(isNeedsCoreNode({ type: "socks5", rawProtocol: "socks5" }), false);
  assert.equal(isNeedsCoreNode({ type: "https" }), false);
});

test("ss/vmess/trojan/vless/tuic/hysteria/wireguard summaries need a core", () => {
  for (const p of ["ss", "vmess", "trojan", "vless", "tuic", "hysteria", "wireguard"]) {
    assert.equal(isNeedsCoreNode({ rawProtocol: p, host: "1.1.1.1", port: 443 }), true, p);
  }
});

test("an unknown protocol string is not needs-core", () => {
  assert.equal(isNeedsCoreNode({ rawProtocol: "http", host: "x" }), false);
  assert.equal(isNeedsCoreNode({ rawProtocol: "something-else" }), false);
});

test("non-object / null / undefined are not needs-core", () => {
  assert.equal(isNeedsCoreNode(null), false);
  assert.equal(isNeedsCoreNode(undefined), false);
  assert.equal(isNeedsCoreNode("ss://x"), false);
  assert.equal(isNeedsCoreNode(42), false);
});

test("countNeedsCoreNodes tallies only core-needed nodes", () => {
  const nodes = [
    { type: "http", rawProtocol: "http" },
    { rawProtocol: "vmess" },
    { type: "socks5" },
    { rawProtocol: "trojan" },
    { rawProtocol: "notacore" },
    null,
  ];
  assert.equal(countNeedsCoreNodes(nodes), 2);
  assert.equal(countNeedsCoreNodes(null), 0);
  assert.equal(countNeedsCoreNodes([]), 0);
});

test("NEEDS_CORE_PROTOCOLS covers the expected set", () => {
  assert.deepEqual(
    [...NEEDS_CORE_PROTOCOLS].sort(),
    ["hysteria", "ss", "trojan", "tuic", "vmess", "vless", "wireguard"].sort()
  );
});
