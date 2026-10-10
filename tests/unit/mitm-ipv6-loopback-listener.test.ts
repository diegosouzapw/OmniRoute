// GHSA-qxg2 follow-up: the MITM binds to 127.0.0.1 only, but the DNS spoof
// writes both `127.0.0.1 <host>` and `::1 <host>` (src/mitm/dns/dnsConfig.ts).
// A client that resolves `::1` first and does not fall back to IPv4 got
// ECONNREFUSED. The fix adds a second listener on `::1` that hands every socket
// to the same server — still loopback-only, never a wildcard bind.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import path from "node:path";
import { EventEmitter } from "node:events";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const {
  listenIpv6Loopback,
  MITM_IPV6_LOOPBACK_HOST,
} = require("../../src/mitm/_internal/loopbackListen.cjs");

const here = path.dirname(fileURLToPath(import.meta.url));

function hasIpv6Loopback(): Promise<boolean> {
  return new Promise((resolve) => {
    const probe = net.createServer();
    probe.once("error", () => resolve(false));
    probe.listen(0, "::1", () => probe.close(() => resolve(true)));
  });
}

function getVia(host: string, port: number): Promise<string> {
  return new Promise((resolve, reject) => {
    http
      .get({ host, port, path: "/" }, (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => resolve(body));
      })
      .on("error", reject);
  });
}

test("the IPv6 loopback host is ::1, never a wildcard", () => {
  assert.equal(MITM_IPV6_LOOPBACK_HOST, "::1");
});

test("a client connecting to ::1 is served by the same server bound on 127.0.0.1", async (t) => {
  if (!(await hasIpv6Loopback())) {
    t.skip("no IPv6 loopback on this host");
    return;
  }
  const server = http.createServer((_req, res) => res.end("served"));
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = (server.address() as net.AddressInfo).port;
  const v6 = listenIpv6Loopback(server, port, () => {});
  try {
    await new Promise<void>((resolve) => v6.once("listening", resolve));
    assert.equal((v6.address() as net.AddressInfo).address, "::1");
    assert.equal(await getVia("::1", port), "served");
    assert.equal(await getVia("127.0.0.1", port), "served");
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
  // Closing the main server also closes the ::1 listener.
  assert.equal(v6.listening, false);
});

test("a host without IPv6 keeps running: the listen error is logged, not thrown", () => {
  const logs: string[] = [];
  const fakeListener = new EventEmitter() as EventEmitter & {
    listen: () => void;
    close: () => void;
  };
  fakeListener.listen = () => {};
  fakeListener.close = () => {};
  const fakeNet = { createServer: () => fakeListener };
  listenIpv6Loopback(new EventEmitter(), 443, (m: string) => logs.push(m), fakeNet);
  const err = Object.assign(new Error("address not available"), { code: "EADDRNOTAVAIL" });
  assert.doesNotThrow(() => fakeListener.emit("error", err));
  assert.equal(logs.length, 1);
  assert.match(logs[0], /::1/);
  assert.match(logs[0], /EADDRNOTAVAIL/);
});

test("server.cjs keeps the 127.0.0.1 bind and adds only the ::1 loopback listener", () => {
  const src = fs.readFileSync(path.join(here, "../../src/mitm/server.cjs"), "utf8");
  assert.match(src, /const MITM_LISTEN_HOST = "127\.0\.0\.1";/);
  assert.match(src, /server\.listen\(LOCAL_PORT, MITM_LISTEN_HOST,/);
  assert.match(src, /listenIpv6Loopback\(server, LOCAL_PORT,/);
  assert.doesNotMatch(src, /listen\([^)]*["'](?:0\.0\.0\.0|::)["']/);
});
