import assert from "node:assert/strict";
import { test } from "node:test";
import { assertManagedFixture } from "../_setup/managedProxyFixture.mjs";
assertManagedFixture();
const { renderManagedConfig, sourceOutbound } =
  await import("../../src/lib/services/managedProxy/config.ts");

const UUID = "11111111-1111-4111-8111-111111111111";

test(
  "saved VLESS links preserve TLS/transport and route distinct listeners on both cores",
  { timeout: 2000 },
  () => {
    const link = `vless://${UUID}@example.invalid:443?security=tls&type=ws&path=%2Fchat&host=cdn.invalid&sni=example.invalid`;
    const sing = sourceOutbound("singbox", link);
    assert.deepEqual(sing.transport, {
      type: "ws",
      path: "/chat",
      headers: { Host: "cdn.invalid" },
    });
    assert.deepEqual(sing.tls, { enabled: true, server_name: "example.invalid" });
    const xray = sourceOutbound("xray", link);
    assert.equal((xray.streamSettings as { security: string }).security, "tls");
    const entries = [
      { id: "a", port: 23001, outbound: sing },
      { id: "b", port: 23002, outbound: sing },
    ];
    const config = renderManagedConfig("singbox", entries);
    assert.equal((config.inbounds as unknown[]).length, 2);
    assert.deepEqual((config.route as { rules: unknown[] }).rules, [
      { inbound: ["in-a"], outbound: "out-a" },
      { inbound: ["in-b"], outbound: "out-b" },
    ]);
    assert.throws(() => sourceOutbound("singbox", link + "&insecure=1"), /TLS verification/);
    assert.throws(
      () => sourceOutbound("xray", link + "&invented=value"),
      /Unsupported option: invented/
    );
    assert.throws(
      () => sourceOutbound("singbox", link + "&%2Fcredential%3Asecret=x"),
      /Unsupported option name/
    );
    assert.throws(() => sourceOutbound("singbox", link + "&pbk=abc"), /REALITY options/);
    assert.throws(() => sourceOutbound("singbox", link + "&mode=auto"), /Unsupported option: mode/);
    const hy2 = sourceOutbound("singbox", "hy2://synthetic@127.0.0.1:443");
    assert.deepEqual(hy2.tls, { enabled: true, server_name: "127.0.0.1" });
    for (const option of ["mode=auto", "headerType=http", "congestion_control=bbr"]) {
      assert.throws(
        () => sourceOutbound("singbox", `hy2://synthetic@127.0.0.1:443?${option}`),
        /Unsupported|does not support/
      );
    }
    const vmess =
      "VMESS://" +
      Buffer.from(
        JSON.stringify({
          add: "127.0.0.1",
          port: 443,
          id: UUID,
          tls: true,
          net: "tcp",
          aid: 0,
          scy: "auto",
        })
      ).toString("base64");
    assert.deepEqual(sourceOutbound("singbox", vmess).tls, {
      enabled: true,
      server_name: "127.0.0.1",
    });
    const rejected =
      "vmess://" +
      Buffer.from(
        JSON.stringify({ add: "127.0.0.1", port: 443, id: UUID, tls: true, invented: "secret" })
      ).toString("base64");
    assert.throws(() => sourceOutbound("singbox", rejected), /Unsupported VMess option: invented/);
  }
);
