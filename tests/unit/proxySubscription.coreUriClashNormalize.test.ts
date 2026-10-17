import test from "node:test";
import assert from "node:assert/strict";

const { normalizeSource } = await import("../../src/lib/proxySubscription/coreConfig/model.ts");
const { parseSubscription } = await import("../../src/lib/proxySubscription/parse.ts");

test("empty, malformed and out-of-table inputs report their reason without throwing", () => {
  assert.deepEqual(normalizeSource({ kind: "uri", value: "" }), {
    ok: false,
    reason: "source_not_singbox_shape",
  });
  assert.deepEqual(normalizeSource({ kind: "uri", value: "not a url" }), {
    ok: false,
    reason: "source_not_singbox_shape",
  });
  assert.deepEqual(normalizeSource({ kind: "uri", value: "unknown://u@host:1#x" }), {
    ok: false,
    reason: "source_not_singbox_shape",
  });
  assert.deepEqual(normalizeSource({ kind: "uri", value: "wireguard://key@host:51820#x" }), {
    ok: false,
    reason: "source_not_singbox_shape",
  });
});

test("alias spellings normalize through the same table", () => {
  const ss = normalizeSource({
    kind: "uri",
    value: "ss://YWVzLTI1Ni1nY206c2VjcmV0@127.0.0.1:8388#alias",
  });
  assert.equal(ss.ok, true);
  const fromAlias = normalizeSource({
    kind: "object",
    value: {
      type: "shadowsocks",
      server: "127.0.0.1",
      port: 8388,
      cipher: "aes-256-gcm",
      password: "secret",
    },
  });
  const fromShort = normalizeSource({
    kind: "object",
    value: {
      type: "ss",
      server: "127.0.0.1",
      port: 8388,
      method: "aes-256-gcm",
      password: "secret",
    },
  });
  assert.equal(fromAlias.ok, true);
  assert.equal(fromShort.ok, true);
  if (!fromAlias.ok || !fromShort.ok) return;
  assert.equal(fromAlias.node.type, fromShort.node.type);
  const hyAlias = normalizeSource({ kind: "uri", value: "hy2://secret@example.com:8443#alias" });
  const hyFull = normalizeSource({
    kind: "uri",
    value: "hysteria2://secret@example.com:8443#full",
  });
  assert.equal(hyAlias.ok, true);
  assert.equal(hyFull.ok, true);
  if (!hyAlias.ok || !hyFull.ok) return;
  assert.equal(hyAlias.node.type, hyFull.node.type);
});

test("bounded decoding rejects double-encoded credentials instead of guessing", () => {
  const doubleEncoded = normalizeSource({
    kind: "uri",
    value: "ss://YWVzLTI1Ni1nY206JTI1MjAlMjUyNTIwJTI1MjAlMjUyNTIw@example.com:8388#double",
  });
  assert.equal(doubleEncoded.ok, false);
  const plain = normalizeSource({
    kind: "uri",
    value: "ss://aes-256-gcm:secret@example.com:8388#plain",
  });
  assert.equal(plain.ok, true);
  if (!plain.ok) return;
  assert.equal(plain.node.credentials.method, "aes-256-gcm");
  assert.equal(plain.node.credentials.secret, "secret");
});

test("wire-affecting params reject the whole node with an explicit reason", () => {
  const hyObfs = normalizeSource({
    kind: "uri",
    value: "hy2://secret@example.com:8443?obfs=salamander&obfs-password=x#obfs",
  });
  assert.deepEqual(hyObfs, {
    ok: false,
    reason: "converter_unsupported",
    detail: "wire-param:obfs",
  });
  const alpn = normalizeSource({
    kind: "uri",
    value: "vless://11111111-2222-4333-8444-555555555555@example.com:443?security=tls&alpn=h2#alpn",
  });
  assert.deepEqual(alpn, {
    ok: false,
    reason: "converter_unsupported",
    detail: "wire-param:alpn",
  });
  const unknown = normalizeSource({
    kind: "uri",
    value: "vless://11111111-2222-4333-8444-555555555555@example.com:443?mystery=1#unknown",
  });
  assert.deepEqual(unknown, {
    ok: false,
    reason: "converter_unsupported",
    detail: "unknown-param:mystery",
  });
});

test("proven decorative params render and are reported instead of dropped silently", () => {
  const remarked = normalizeSource({
    kind: "uri",
    value: "vless://11111111-2222-4333-8444-555555555555@example.com:443?remark=hello#named",
  });
  assert.equal(remarked.ok, true);
  if (!remarked.ok) return;
  assert.deepEqual(remarked.dropped, ["remark"]);
  const noneEncryption = normalizeSource({
    kind: "uri",
    value: "vless://11111111-2222-4333-8444-555555555555@example.com:443?encryption=none#plain",
  });
  assert.equal(noneEncryption.ok, true);
  if (!noneEncryption.ok) return;
  assert.deepEqual(noneEncryption.dropped, ["encryption"]);
  const ciphered = normalizeSource({
    kind: "uri",
    value:
      "vless://11111111-2222-4333-8444-555555555555@example.com:443?encryption=aes-128-gcm#cipher",
  });
  assert.deepEqual(ciphered, {
    ok: false,
    reason: "converter_unsupported",
    detail: "wire-param:encryption",
  });
});

test("trojan without security still negotiates tls", () => {
  const res = normalizeSource({
    kind: "uri",
    value: "trojan://secret@example.com:443#plain",
  });
  assert.equal(res.ok, true);
  if (!res.ok) return;
  assert.equal(res.node.security.kind, "tls");
});

test("clash objects audit extra fields while the name stays decorative", () => {
  const named = normalizeSource({
    kind: "object",
    value: {
      name: "clash-trojan",
      type: "trojan",
      server: "203.0.113.11",
      port: 8443,
      password: "trojan-secret",
    },
  });
  assert.equal(named.ok, true);
  if (!named.ok) return;
  assert.deepEqual(named.dropped, ["name"]);
  const obfs = normalizeSource({
    kind: "object",
    value: {
      name: "clash-hy",
      type: "hysteria2",
      server: "203.0.113.14",
      port: 8443,
      password: "hy-secret",
      obfs: "salamander",
    },
  });
  assert.deepEqual(obfs, {
    ok: false,
    reason: "converter_unsupported",
    detail: "wire-param:obfs",
  });
});

test("normalizer agrees with the parser on server, port and protocol", () => {
  const raw = "vless://11111111-2222-4333-8444-555555555555@example.com:443?security=tls#agree";
  const parsed = parseSubscription(raw);
  assert.equal(parsed.needsCore.length, 1);
  const node = parsed.needsCore[0];
  assert.ok(node.source);
  const normalized = normalizeSource(node.source!);
  assert.equal(normalized.ok, true);
  if (!normalized.ok) return;
  assert.equal(normalized.node.server, node.host);
  assert.equal(normalized.node.serverPort, node.port);
  assert.equal(normalized.node.type, node.rawProtocol);
});
