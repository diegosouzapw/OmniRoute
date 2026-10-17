import test from "node:test";
import assert from "node:assert/strict";

const { parseSubscription } = await import("../../src/lib/proxySubscription/parse.ts");
const { buildCoreModel } = await import("../../src/lib/proxySubscription/coreConfig/model.ts");
const { renderSingBox } = await import("../../src/lib/proxySubscription/coreConfig/singbox.ts");

const ENTRIES = ["socks5://127.0.0.1:1080 selector=a", "socks5://127.0.0.1:1081 selector=b"];

function renderFromFeed(body: string, entries: string[] = ENTRIES) {
  const parsed = parseSubscription(body);
  const model = buildCoreModel(entries, [...parsed.nodes, ...parsed.needsCore] as never);
  return renderSingBox(model, null);
}

test("a standard vless URI renders as an outbound", () => {
  const res = renderFromFeed(
    "vless://11111111-2222-4333-8444-555555555555@example.com:443?security=tls#std"
  );
  assert.equal(res.ok, true);
  if (!res.ok) return;
  const after = JSON.parse(res.text);
  const outbound = after.outbounds.find(
    (o: { type: string; server: string; server_port: number }) =>
      o.type === "vless" && o.server === "example.com" && o.server_port === 443
  );
  assert.ok(outbound, `expected a vless outbound, got: ${res.text}`);
  assert.equal(outbound.uuid, "11111111-2222-4333-8444-555555555555");
  assert.equal(res.skipped.filter((s) => s.reason === "converter_unsupported").length, 0);
});

test("a hysteria2 URI carrying obfs is rejected whole, never rendered bare", () => {
  const res = renderFromFeed(
    "hysteria2://secret@example.com:8443?obfs=salamander&obfs-password=x#obfs"
  );
  assert.equal(res.ok, true);
  if (!res.ok) return;
  const rejected = res.skipped.filter((s) => s.reason === "converter_unsupported");
  assert.equal(rejected.length, 1);
  assert.equal(rejected[0].detail, "wire-param:obfs");
  const after = JSON.parse(res.text);
  assert.equal(after.outbounds.filter((o: { type: string }) => o.type === "hysteria2").length, 0);
});

test("an unknown query param rejects by default with its name in the reason", () => {
  const res = renderFromFeed(
    "vless://11111111-2222-4333-8444-555555555555@example.com:443?mystery=1#unknown"
  );
  assert.equal(res.ok, true);
  if (!res.ok) return;
  const rejected = res.skipped.filter((s) => s.reason === "converter_unsupported");
  assert.equal(rejected.length, 1);
  assert.equal(rejected[0].detail, "unknown-param:mystery");
  const after = JSON.parse(res.text);
  assert.equal(after.outbounds.filter((o: { type: string }) => o.type === "vless").length, 0);
});

test("a URI with an unsupported flow is rejected with a reason, never degraded", () => {
  const res = renderFromFeed("vless://u@example.com:443?flow=xtls-rprx-vision-udp443#bad");
  assert.equal(res.ok, true);
  if (!res.ok) return;
  const rejected = res.skipped.filter((s) => s.reason === "converter_unsupported");
  assert.equal(rejected.length, 1);
  const after = JSON.parse(res.text);
  assert.equal(after.outbounds.filter((o: { type: string }) => o.type === "vless").length, 0);
});

test("clash trojan, ss, vmess and hysteria2 objects share the rendered shape", () => {
  const body = `proxies:
  - name: "clash-trojan"
    type: trojan
    server: 203.0.113.11
    port: 8443
    password: trojan-secret
  - name: "clash-ss"
    type: ss
    server: 203.0.113.12
    port: 8388
    cipher: aes-256-gcm
    password: ss-secret
  - name: "clash-vmess"
    type: vmess
    server: 203.0.113.13
    port: 443
    uuid: 11111111-2222-4333-8444-555555555555
  - name: "clash-hysteria2"
    type: hysteria2
    server: 203.0.113.14
    port: 8443
    password: hy-secret
`;
  const res = renderFromFeed(body);
  assert.equal(res.ok, true);
  if (!res.ok) return;
  const after = JSON.parse(res.text);
  const tags = after.outbounds.map((o: { tag: string }) => o.tag);
  for (const name of ["clash-trojan", "clash-ss", "clash-vmess", "clash-hysteria2"]) {
    const outbound = after.outbounds.find(
      (o: { tag: string }) => typeof o.tag === "string" && o.tag.includes(name)
    );
    assert.ok(outbound, `expected a rendered outbound for ${name}, got tags: ${tags.join(",")}`);
  }
  assert.equal(res.skipped.filter((s) => s.reason === "converter_unsupported").length, 0);
});

test("a mixed feed renders shaped, URI and clash nodes and skips the irreducible one", () => {
  const shaped: never = {
    name: "shaped",
    source: {
      kind: "object",
      value: { type: "vless", server: "10.9.0.9", server_port: 443, uuid: "u-shaped" },
    },
  } as never;
  const parsed = parseSubscription(
    "vless://11111111-2222-4333-8444-555555555555@example.com:443#std"
  );
  const clash = parseSubscription(`proxies:
  - name: "clash-trojan"
    type: trojan
    server: 203.0.113.11
    port: 8443
    password: trojan-secret
`);
  const irreducible: never = {
    name: "irreducible",
    source: {
      kind: "uri",
      value: "vless://u@example.com:443?flow=xtls-rprx-vision-udp443#irreducible",
    },
  } as never;
  const model = buildCoreModel(ENTRIES, [
    shaped,
    ...parsed.needsCore,
    ...clash.needsCore,
    irreducible,
  ] as never);
  const res = renderSingBox(model, null);
  assert.equal(res.ok, true);
  if (!res.ok) return;
  const after = JSON.parse(res.text);
  const renderedTypes = after.outbounds
    .filter((o: { type: string }) => o.type === "vless" || o.type === "trojan")
    .map((o: { type: string }) => o.type)
    .sort();
  assert.deepEqual(renderedTypes, ["trojan", "vless", "vless"]);
  const reasons = res.skipped.map((s) => s.reason).sort();
  assert.ok(reasons.includes("converter_unsupported"), `got: ${JSON.stringify(res.skipped)}`);
});

test("a decorative query param renders and is journaled once, never dropped silently", () => {
  const cap: string[] = [];
  const orig = console.warn;
  console.warn = (...args: unknown[]) => void cap.push(args.map(String).join(" "));
  try {
    const res = renderFromFeed(
      "vless://11111111-2222-4333-8444-555555555555@example.com:443?remark=hello#named"
    );
    assert.equal(res.ok, true);
    if (!res.ok) return;
    const after = JSON.parse(res.text);
    assert.ok(
      after.outbounds.some((o: { type: string }) => o.type === "vless"),
      `expected a vless outbound, got: ${res.text}`
    );
    assert.equal(res.skipped.length, 0);
    assert.equal(cap.length, 1);
    assert.ok(cap[0].includes("remark=1"), `got: ${cap.join("\n")}`);
  } finally {
    console.warn = orig;
  }
});
