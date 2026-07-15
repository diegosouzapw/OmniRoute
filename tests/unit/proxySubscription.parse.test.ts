import test from "node:test";
import assert from "node:assert/strict";

const parse = await import("../../src/lib/proxySubscription/parse.ts");
const { parseSubscription, redactedNodeSummary } = parse;

test("parses a Clash YAML subscription with direct + needs-core nodes", () => {
  const yaml = `
proxies:
  - name: "Direct HTTP"
    type: http
    server: 1.2.3.4
    port: 8080
    username: u
    password: p
  - name: "Direct SOCKS5"
    type: socks5
    server: 5.6.7.8
    port: 1080
  - name: "Shadowsocks node"
    type: ss
    server: 9.9.9.9
    port: 8388
  - name: "VMess node"
    type: vmess
    server: 11.11.11.11
    port: 443
`;
  const res = parseSubscription(yaml);
  assert.equal(res.format, "clash-yaml");
  // http + socks5 are directly usable
  assert.equal(res.nodes.length, 2);
  assert.deepEqual(res.nodes.map((n) => n.type).sort(), ["http", "socks5"]);
  // ss + vmess need a local core
  assert.equal(res.needsCore.length, 2);
  assert.deepEqual(
    res.needsCore.map((n) => n.rawProtocol).sort(),
    ["ss", "vmess"]
  );
});

test("decodes a base64-wrapped Clash YAML subscription", () => {
  const yaml = `proxies:
  - name: "B64 node"
    type: https
    server: 2.2.2.2
    port: 443
`;
  const b64 = Buffer.from(yaml, "utf-8").toString("base64");
  const res = parseSubscription(b64);
  assert.equal(res.format, "base64-lines");
  assert.equal(res.nodes.length, 1);
  assert.equal(res.nodes[0].type, "https");
  assert.equal(res.nodes[0].host, "2.2.2.2");
});

test("parses a V2Ray-style JSON array of URI strings", () => {
  const arr = [
    "socks5://127.0.0.1:1080",
    "ss://example.com:8388",
    "vmess://eyJhZGQiOiIxLjIuMy40IiwicG9ydCI6NDQzLCJ2IjoiMiJ9",
    "trojan://secretpass@5.5.5.5:443",
    "vless://uuid@6.6.6.6:443",
  ];
  const res = parseSubscription(JSON.stringify(arr));
  assert.equal(res.format, "v2ray-json");
  // socks5 direct; the rest need a local core
  assert.equal(res.nodes.length, 1);
  assert.equal(res.nodes[0].type, "socks5");
  assert.equal(res.needsCore.length, 4);
});

test("parses a plain list of URI lines", () => {
  const lines = [
    "http://user:pass@10.0.0.1:8080",
    "socks5://10.0.0.2:1080",
    "trojan://pw@10.0.0.3:443",
  ].join("\n");
  const res = parseSubscription(lines);
  assert.equal(res.format, "lines");
  assert.equal(res.nodes.length, 2);
  assert.equal(res.needsCore.length, 1);
  const http = res.nodes.find((n) => n.type === "http");
  assert.ok(http);
  assert.equal(http?.username, "user");
  assert.equal(http?.password, "pass");
});

test("parses Clash.Meta outbounds array", () => {
  const yaml = `
outbounds:
  - name: "meta-http"
    type: http
    server: 3.3.3.3
    port: 8080
  - name: "meta-vless"
    type: vless
    server: 4.4.4.4
    port: 443
`;
  const res = parseSubscription(yaml);
  assert.equal(res.nodes.length, 1);
  assert.equal(res.needsCore.length, 1);
  assert.equal(res.needsCore[0].rawProtocol, "vless");
});

test("returns empty for blank / unrecognized input", () => {
  assert.equal(parseSubscription("").format, "empty");
  const res = parseSubscription("just some random text that is not a subscription");
  assert.equal(res.format, "unknown");
  assert.equal(res.nodes.length, 0);
  assert.equal(res.needsCore.length, 0);
});

test("redactedNodeSummary excludes secrets for direct nodes", () => {
  const yaml = `
proxies:
  - name: "Direct HTTP"
    type: http
    server: 1.2.3.4
    port: 8080
    username: secretuser
    password: secretpass
`;
  const res = parseSubscription(yaml);
  const summary = redactedNodeSummary(res);
  assert.equal(summary.length, 1);
  assert.equal(summary[0].name, "Direct HTTP");
  assert.equal(summary[0].host, "1.2.3.4");
  assert.equal("username" in summary[0], false);
  assert.equal("password" in summary[0], false);
  assert.equal(summary[0].hasAuth, true);
});
