import test from "node:test";
import assert from "node:assert/strict";

const { normalizeSource, buildCoreModel } =
  await import("../../src/lib/proxySubscription/coreConfig/model.ts");
const { projectCanonical, renderSingBox } =
  await import("../../src/lib/proxySubscription/coreConfig/singbox.ts");
const { parseSubscription } = await import("../../src/lib/proxySubscription/parse.ts");

const UUID = "11111111-2222-4333-8444-555555555555";

function uri(value: string) {
  return normalizeSource({ kind: "uri", value });
}

function obj(value: Record<string, unknown>) {
  return normalizeSource({ kind: "object", value });
}

function vmess(blob: Record<string, unknown>): string {
  return `vmess://${Buffer.from(JSON.stringify(blob)).toString("base64")}`;
}

function projected(value: string): Record<string, unknown> {
  const res = uri(value);
  assert.equal(res.ok, true, `expected ok, got ${JSON.stringify(res)}`);
  if (!res.ok) throw new Error("unreachable");
  return projectCanonical(res.node);
}

const VMESS_BASE = {
  v: "2",
  ps: "node",
  add: "vm.example.com",
  port: "443",
  id: UUID,
  aid: "0",
  net: "tcp",
  type: "none",
};

test("vmess links translate: the audit reads the decoded blob", () => {
  const plain = uri(vmess(VMESS_BASE));
  assert.equal(plain.ok, true, JSON.stringify(plain));
  if (!plain.ok) return;
  assert.equal(plain.node.type, "vmess");
  assert.equal(plain.node.server, "vm.example.com");
  assert.equal(plain.node.serverPort, 443);
  assert.deepEqual(plain.node.transport, { kind: "tcp" });
  assert.deepEqual(plain.node.security, { kind: "none" });
  assert.deepEqual(plain.node.credentials, { kind: "uuid", secret: UUID });
  assert.deepEqual(plain.dropped, ["aid", "ps", "type", "v"]);

  const ws = uri(
    vmess({ ...VMESS_BASE, net: "ws", path: "/ray", host: "cdn.example.com", tls: "tls" })
  );
  assert.equal(ws.ok, true, JSON.stringify(ws));
  if (!ws.ok) return;
  assert.deepEqual(ws.node.transport, { kind: "ws", path: "/ray", host: "cdn.example.com" });
  assert.equal(ws.node.security.kind, "tls");
  assert.equal(ws.node.security.serverName, "cdn.example.com");

  const grpc = uri(vmess({ ...VMESS_BASE, net: "grpc", path: "svc", type: "gun", scy: "auto" }));
  assert.equal(grpc.ok, true, JSON.stringify(grpc));
  if (!grpc.ok) return;
  assert.deepEqual(grpc.node.transport, { kind: "grpc", service: "svc" });
});

test("vmess stream camouflage and non-default ciphers reject the node", () => {
  assert.deepEqual(uri(vmess({ ...VMESS_BASE, type: "http" })), {
    ok: false,
    reason: "converter_unsupported",
    detail: "wire-param:type",
  });
  assert.deepEqual(uri(vmess({ ...VMESS_BASE, scy: "aes-128-gcm" })), {
    ok: false,
    reason: "converter_unsupported",
    detail: "wire-param:scy",
  });
  assert.deepEqual(uri(vmess({ ...VMESS_BASE, aid: "64" })), {
    ok: false,
    reason: "converter_unsupported",
    detail: "wire-param:aid",
  });
  assert.deepEqual(uri(vmess({ ...VMESS_BASE, mystery: "1" })), {
    ok: false,
    reason: "converter_unsupported",
    detail: "unknown-param:mystery",
  });
});

test("a vmess link in a feed renders as a sing-box outbound", () => {
  const parsed = parseSubscription(vmess(VMESS_BASE));
  const model = buildCoreModel(["socks5://127.0.0.1:1080 selector=a"], [
    ...parsed.nodes,
    ...parsed.needsCore,
  ] as never);
  const res = renderSingBox(model, null);
  assert.equal(res.ok, true);
  if (!res.ok) return;
  const out = JSON.parse(res.text) as { outbounds: Array<{ type: string; uuid?: string }> };
  assert.ok(
    out.outbounds.some((o) => o.type === "vmess" && o.uuid === UUID),
    res.text
  );
});

test("shadowsocks base64 userinfo decodes the same with or without padding", () => {
  // Lengths 21, 25 and 26 cover the three base64 padding cases (none, ==, =).
  for (const plain of [
    "aes-256-gcm:password1",
    "chacha20-ietf-poly1305:pw",
    "2022-blake3-aes-128-gcm:a2V5",
    "aes-128-gcm:passw",
  ]) {
    const [method, secret] = [
      plain.slice(0, plain.indexOf(":")),
      plain.slice(plain.indexOf(":") + 1),
    ];
    const padded = Buffer.from(plain).toString("base64");
    const unpadded = padded.replace(/=+$/, "");
    const urlSafe = unpadded.replace(/\+/g, "-").replace(/\//g, "_");
    for (const blob of [padded, unpadded, urlSafe]) {
      const res = uri(`ss://${blob}@ss.example.com:8388#n`);
      assert.equal(res.ok, true, `${blob}: ${JSON.stringify(res)}`);
      if (!res.ok) continue;
      assert.deepEqual(res.node.credentials, { kind: "method-password", method, secret }, blob);
    }
  }
});

test("shadowsocks rejects ciphers outside the supported list", () => {
  const blob = Buffer.from("rc4-md5:pw").toString("base64");
  assert.deepEqual(uri(`ss://${blob}@ss.example.com:8388#n`), {
    ok: false,
    reason: "converter_unsupported",
    detail: "wire-param:method",
  });
  const plain = uri("ss://2022-blake3-aes-128-gcm:a2V5%3D@ss.example.com:8388#n");
  assert.equal(plain.ok, true, JSON.stringify(plain));
  if (!plain.ok) return;
  assert.equal(plain.node.credentials.secret, "a2V5=");
});

test("hysteria2 always negotiates TLS and never gets a uTLS block", () => {
  const out = projected("hysteria2://pw@hy.example.com:443?sni=sni.example.com&insecure=1#n");
  assert.deepEqual(out.tls, { enabled: true, server_name: "sni.example.com", insecure: true });
  const alias = projected("hy2://pw@hy.example.com:443#n");
  assert.deepEqual(alias.tls, { enabled: true, server_name: "hy.example.com" });
  assert.deepEqual(uri("hysteria2://pw@hy.example.com:443?security=none#n"), {
    ok: false,
    reason: "converter_unsupported",
    detail: "wire-param:security",
  });
  assert.deepEqual(uri("hysteria2://pw@hy.example.com:443?type=ws#n"), {
    ok: false,
    reason: "converter_unsupported",
    detail: "wire-param:type",
  });
  const clash = obj({
    name: "h",
    type: "hysteria2",
    server: "hy.example.com",
    port: 443,
    password: "pw",
    sni: "s.example.com",
  });
  assert.equal(clash.ok, true, JSON.stringify(clash));
  if (!clash.ok) return;
  assert.equal(clash.node.security.kind, "tls");
  assert.equal(clash.node.security.serverName, "s.example.com");
});

test("a Clash `tls: true` flag keeps TLS and reads `servername`", () => {
  const base = { name: "v", type: "vless", server: "v.example.com", port: 443, uuid: UUID };
  const on = obj({ ...base, tls: true, servername: "sni.example.com" });
  assert.equal(on.ok, true, JSON.stringify(on));
  if (!on.ok) return;
  assert.equal(on.node.security.kind, "tls");
  assert.equal(on.node.security.serverName, "sni.example.com");
  const off = obj({ ...base, tls: false });
  assert.equal(off.ok, true);
  if (!off.ok) return;
  assert.equal(off.node.security.kind, "none");
  assert.deepEqual(obj({ ...base, tls: "yes" }), {
    ok: false,
    reason: "converter_unsupported",
    detail: "wire-param:tls",
  });
});

test("IPv6 literals lose the URL brackets", () => {
  const out = projected(`vless://${UUID}@[2001:db8::1]:443?security=tls&sni=v.example.com#n`);
  assert.equal(out.server, "2001:db8::1");
  const ss = uri(`ss://${Buffer.from("aes-256-gcm:pw").toString("base64")}@[2001:db8::2]:8388#n`);
  assert.equal(ss.ok, true);
  if (!ss.ok) return;
  assert.equal(ss.node.server, "2001:db8::2");
});

test("Reality needs its public key", () => {
  assert.deepEqual(uri(`vless://${UUID}@r.example.com:443?security=reality&sni=a.example.com#n`), {
    ok: false,
    reason: "converter_unsupported",
    detail: "wire-param:pbk",
  });
  const out = projected(
    `vless://${UUID}@r.example.com:443?security=reality&sni=a.example.com&pbk=KEY&sid=ab&flow=xtls-rprx-vision#n`
  );
  assert.deepEqual(out.tls, {
    enabled: true,
    server_name: "a.example.com",
    reality: { enabled: true, public_key: "KEY", short_id: "ab" },
    utls: { enabled: true, fingerprint: "chrome" },
  });
  assert.equal(out.flow, "xtls-rprx-vision");
});

test("uTLS is set only when the source asks for a fingerprint", () => {
  const bare = projected(`vless://${UUID}@v.example.com:443?security=tls#n`);
  assert.deepEqual(bare.tls, { enabled: true, server_name: "v.example.com" });
  const fp = projected(`vless://${UUID}@v.example.com:443?security=tls&fp=firefox#n`);
  assert.deepEqual((fp.tls as { utls: unknown }).utls, { enabled: true, fingerprint: "firefox" });
});

const CLASH_FEED = `proxies:
  - name: "reality"
    type: vless
    server: r.example.com
    port: 443
    uuid: ${UUID}
    network: tcp
    udp: true
    tls: true
    flow: xtls-rprx-vision
    servername: www.example.com
    client-fingerprint: chrome
    reality-opts:
      public-key: KEY
      short-id: ab
  - name: "vmess-ws"
    type: vmess
    server: vm.example.com
    port: 443
    uuid: ${UUID}
    alterId: 0
    cipher: auto
    udp: true
    tls: true
    skip-cert-verify: false
    servername: cdn.example.com
    network: ws
    ws-opts:
      path: /ray
      headers:
        Host: cdn.example.com
  - name: "trojan-grpc"
    type: trojan
    server: t.example.com
    port: 443
    password: pw
    udp: true
    sni: t.example.com
    network: grpc
    grpc-opts:
      grpc-service-name: svc
  - name: "ss"
    type: ss
    server: ss.example.com
    port: 8388
    cipher: aes-256-gcm
    password: pw
    udp: true
  - name: "hy2"
    type: hysteria2
    server: hy.example.com
    port: 443
    password: pw
    sni: hy.example.com
    skip-cert-verify: true
`;

test("a realistic Clash feed renders every supported node", () => {
  const parsed = parseSubscription(CLASH_FEED);
  const nodes = [...parsed.nodes, ...parsed.needsCore];
  assert.equal(nodes.length, 5);
  for (const node of nodes) {
    const res = normalizeSource(node.source!);
    assert.equal(res.ok, true, `${node.name}: ${JSON.stringify(res)}`);
  }
  const model = buildCoreModel(["socks5://127.0.0.1:1080 selector=a"], nodes as never);
  const res = renderSingBox(model, null);
  assert.equal(res.ok, true);
  if (!res.ok) return;
  assert.deepEqual(
    res.skipped.filter((s) => s.reason !== "empty_group"),
    []
  );
  const out = JSON.parse(res.text) as { outbounds: Array<Record<string, unknown>> };
  const vm = out.outbounds.find((o) => o.type === "vmess")!;
  assert.deepEqual(vm.transport, {
    type: "ws",
    path: "/ray",
    headers: { Host: "cdn.example.com" },
  });
  assert.equal((vm.tls as { server_name: string }).server_name, "cdn.example.com");
});

test("Clash fields without a projection still reject the node", () => {
  const base = { name: "v", type: "vmess", server: "v.example.com", port: 443, uuid: UUID };
  assert.deepEqual(
    obj({ ...base, network: "ws", "ws-opts": { path: "/", "max-early-data": 2048 } }),
    {
      ok: false,
      reason: "converter_unsupported",
      detail: "wire-param:ws-opts.max-early-data",
    }
  );
  assert.deepEqual(obj({ ...base, alterId: 64 }), {
    ok: false,
    reason: "converter_unsupported",
    detail: "wire-param:alterId",
  });
  assert.deepEqual(obj({ ...base, cipher: "aes-128-gcm" }), {
    ok: false,
    reason: "converter_unsupported",
    detail: "wire-param:cipher",
  });
  // Clash `fingerprint` pins the certificate, unlike `client-fingerprint`.
  assert.deepEqual(obj({ ...base, tls: true, fingerprint: "ab:cd" }), {
    ok: false,
    reason: "converter_unsupported",
    detail: "wire-param:fingerprint",
  });
});
