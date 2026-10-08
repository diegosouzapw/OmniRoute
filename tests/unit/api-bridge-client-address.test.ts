/**
 * The API bridge listens on its own port and relays to the dashboard port over loopback.
 * The dashboard decides whether a request is local from the socket peer plus the presence of
 * forwarding headers, so the relay must say who the real client was: without that, every
 * remote client of the API port looks like the host itself and skips the loopback-only tier
 * and the IP filter. Client-supplied address headers must not survive the relay.
 */

import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import net from "node:net";
import os from "node:os";

const bridge = await import("../../src/lib/apiBridgeServer.ts");
const { stampPeerIp, PEER_IP_HEADER, VIA_PROXY_HEADER } =
  await import("../../scripts/dev/peer-stamp.mjs");
const { classifyStampedPeerLocality } = await import("../../src/server/authz/peerStamp.ts");

const STAMP_TOKEN = "api-bridge-client-address-token";
const ENV_KEYS = ["OMNIROUTE_PEER_STAMP_TOKEN", "OMNIROUTE_TRUST_PROXY"];
const originalEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));

function restoreEnv() {
  for (const key of ENV_KEYS) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
}

test.beforeEach(() => {
  restoreEnv();
  delete process.env.OMNIROUTE_TRUST_PROXY;
});

test.after(restoreEnv);

function localityAsSeenByDashboard(headers: Record<string, string | string[] | undefined>) {
  process.env.OMNIROUTE_PEER_STAMP_TOKEN = STAMP_TOKEN;
  // The dashboard's own server stamps the socket it accepted, which is the bridge on loopback.
  const inbound = { headers: { ...headers }, socket: { remoteAddress: "127.0.0.1" } };
  stampPeerIp(inbound);
  return classifyStampedPeerLocality(
    inbound.headers[PEER_IP_HEADER] as string,
    inbound.headers[VIA_PROXY_HEADER] as string,
    STAMP_TOKEN
  );
}

test("a remote client of the API port is relayed as a proxied request from its real address", () => {
  const relayed = bridge.buildBridgeRequestHeaders(
    { host: "api.example", "x-forwarded-for": "127.0.0.1", "x-real-ip": "127.0.0.1" },
    "203.0.113.9",
    20128
  );
  assert.equal(relayed["x-forwarded-for"], "203.0.113.9");
  assert.equal(relayed["x-real-ip"], undefined);
  assert.equal(relayed["cf-connecting-ip"], undefined);
  assert.equal(relayed.host, "127.0.0.1:20128");
  assert.equal(localityAsSeenByDashboard(relayed), "remote");
});

test("an IPv4-mapped peer address is relayed in its plain form", () => {
  const relayed = bridge.buildBridgeRequestHeaders({}, "::ffff:203.0.113.9", 20128);
  assert.equal(relayed["x-forwarded-for"], "203.0.113.9");
});

test("a request whose peer address is unknown is still marked as proxied", () => {
  const relayed = bridge.buildBridgeRequestHeaders({}, undefined, 20128);
  assert.equal(localityAsSeenByDashboard(relayed), "remote");
});

test("a local client of the API port keeps its headers and stays local", () => {
  for (const peer of ["127.0.0.1", "::1", "::ffff:127.0.0.1"]) {
    const relayed = bridge.buildBridgeRequestHeaders(
      { "x-forwarded-for": "198.51.100.4" },
      peer,
      20128
    );
    assert.equal(relayed["x-forwarded-for"], "198.51.100.4", peer);
  }
  const relayed = bridge.buildBridgeRequestHeaders({}, "127.0.0.1", 20128);
  assert.equal(localityAsSeenByDashboard(relayed), "loopback");
});

test("a client on a private address is not trusted to report its own forwarding headers", () => {
  for (const peer of ["10.1.2.3", "172.18.0.5", "192.168.1.20", "fd00::5"]) {
    const relayed = bridge.buildBridgeRequestHeaders(
      { "x-forwarded-for": "127.0.0.1", "x-real-ip": "127.0.0.1" },
      peer,
      20128
    );
    assert.equal(relayed["x-forwarded-for"], peer, peer);
    assert.equal(relayed["x-real-ip"], undefined, peer);
    assert.equal(localityAsSeenByDashboard(relayed), "remote", peer);
  }
});

test("a remote client cannot pass on any header that claims another address, host or scheme", () => {
  const relayed = bridge.buildBridgeRequestHeaders(
    {
      forwarded: "for=5.5.5.5;host=evil.example;proto=https",
      "x-forwarded-host": "evil.example",
      "x-forwarded-proto": "https",
      "x-forwarded-port": "443",
      "true-client-ip": "5.5.5.5",
      "x-client-ip": "5.5.5.5",
      "x-real-ip": "5.5.5.5",
      "cf-connecting-ip": "5.5.5.5",
      "x-forwarded-for": "5.5.5.5",
      authorization: "Bearer keep-me",
    },
    "203.0.113.9",
    20128
  );
  assert.deepEqual(Object.keys(relayed).sort(), ["authorization", "host", "x-forwarded-for"]);
  assert.equal(relayed["x-forwarded-for"], "203.0.113.9");
});

test("a loopback client keeps every forwarding header it sent", () => {
  const sent = {
    "x-forwarded-for": "198.51.100.4",
    "x-real-ip": "198.51.100.4",
    "cf-connecting-ip": "198.51.100.4",
    "x-forwarded-proto": "https",
  };
  const relayed = bridge.buildBridgeRequestHeaders(sent, "127.0.0.1", 20128);
  assert.deepEqual({ ...relayed, host: undefined }, { ...sent, host: undefined });
});

test("with OMNIROUTE_TRUST_PROXY=private a private-LAN proxy keeps its chain and is appended to it", () => {
  process.env.OMNIROUTE_TRUST_PROXY = "private";
  const relayed = bridge.buildBridgeRequestHeaders(
    { "x-forwarded-for": "198.51.100.4", "x-forwarded-proto": "https" },
    "172.18.0.5",
    20128
  );
  assert.equal(relayed["x-forwarded-for"], "198.51.100.4, 172.18.0.5");
  assert.equal(relayed["x-forwarded-proto"], "https");
  assert.equal(localityAsSeenByDashboard(relayed), "remote");
});

test("a trusted private-LAN proxy that sends no chain is still reported by its own address", () => {
  process.env.OMNIROUTE_TRUST_PROXY = "lan";
  const relayed = bridge.buildBridgeRequestHeaders({}, "10.0.0.7", 20128);
  assert.equal(relayed["x-forwarded-for"], "10.0.0.7");
});

test("OMNIROUTE_TRUST_PROXY does not extend trust to a public peer or, in loopback mode, a private one", () => {
  for (const [mode, peer] of [
    ["private", "203.0.113.9"],
    ["loopback", "172.18.0.5"],
    ["true", "192.168.1.20"],
  ]) {
    process.env.OMNIROUTE_TRUST_PROXY = mode;
    const relayed = bridge.buildBridgeRequestHeaders(
      { "x-forwarded-for": "198.51.100.4" },
      peer,
      20128
    );
    assert.equal(relayed["x-forwarded-for"], peer, `${mode} ${peer}`);
  }
});

test("the upgrade headers of a remote client drop what it claims and name its own address", () => {
  const lines = bridge.buildBridgeUpgradeHeaderLines(
    [
      "Host",
      "api.example",
      "Upgrade",
      "websocket",
      "X-Forwarded-For",
      "198.51.100.77",
      "X-Real-IP",
      "198.51.100.77",
      "Forwarded",
      "for=198.51.100.77",
      "X-Forwarded-Host",
      "evil.example",
    ],
    "203.0.113.9",
    20128
  );
  assert.deepEqual(lines, [
    "Host: 127.0.0.1:20128",
    "Upgrade: websocket",
    "X-Forwarded-For: 203.0.113.9",
  ]);
});

test("the upgrade headers of a loopback client pass through unchanged", () => {
  const lines = bridge.buildBridgeUpgradeHeaderLines(
    ["Host", "localhost:1", "X-Forwarded-For", "198.51.100.4", "X-Real-IP", "198.51.100.4"],
    "::1",
    20128
  );
  assert.deepEqual(lines, [
    "Host: 127.0.0.1:20128",
    "X-Forwarded-For: 198.51.100.4",
    "X-Real-IP: 198.51.100.4",
  ]);
});

test("the upgrade headers of a trusted private-LAN proxy carry its chain plus its own address", () => {
  process.env.OMNIROUTE_TRUST_PROXY = "private";
  const lines = bridge.buildBridgeUpgradeHeaderLines(
    ["Host", "api.example", "X-Forwarded-For", "198.51.100.4", "X-Forwarded-For", "203.0.113.3"],
    "192.168.1.20",
    20128
  );
  assert.deepEqual(lines, [
    "Host: 127.0.0.1:20128",
    "X-Forwarded-For: 198.51.100.4, 203.0.113.3, 192.168.1.20",
  ]);
});

async function waitFor(condition: () => boolean, ms = 5000) {
  const deadline = Date.now() + ms;
  while (!condition()) {
    if (Date.now() > deadline) throw new Error("timed out waiting for the relayed request");
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
}

const externalAddress = Object.values(os.networkInterfaces())
  .flat()
  .find((entry) => entry && entry.family === "IPv4" && !entry.internal)?.address;

test(
  "over real sockets the dashboard receives the client's own address",
  { skip: externalAddress ? false : "no non-loopback IPv4 interface" },
  async () => {
    const received: http.IncomingHttpHeaders[] = [];
    const dashboard = http.createServer((req, res) => {
      received.push(req.headers);
      res.end("ok");
    });
    await new Promise<void>((resolve) => dashboard.listen(0, "127.0.0.1", resolve));
    const dashboardPort = (dashboard.address() as net.AddressInfo).port;
    const apiServer = bridge.createApiBridgeServer(dashboardPort);
    await new Promise<void>((resolve) => apiServer.listen(0, "0.0.0.0", resolve));
    const apiPort = (apiServer.address() as net.AddressInfo).port;

    const call = (host: string) =>
      new Promise<void>((resolve, reject) => {
        const req = http.request(
          {
            host,
            port: apiPort,
            path: "/v1/models",
            headers: { "x-forwarded-for": "198.51.100.77", "x-real-ip": "198.51.100.77" },
          },
          (res) => {
            res.resume();
            res.on("end", resolve);
          }
        );
        req.on("error", reject);
        req.end();
      });

    try {
      await call(externalAddress as string);
      await call("127.0.0.1");
    } finally {
      apiServer.close();
      apiServer.closeAllConnections();
      dashboard.close();
      dashboard.closeAllConnections();
    }

    assert.equal(received.length, 2);
    assert.equal(received[0]["x-forwarded-for"], externalAddress);
    assert.equal(received[0]["x-real-ip"], undefined);
    assert.equal(received[1]["x-forwarded-for"], "198.51.100.77");
  }
);

test(
  "an upgrade request reaches the dashboard with the client's own address",
  { skip: externalAddress ? false : "no non-loopback IPv4 interface" },
  async () => {
    let captured = "";
    const dashboard = net.createServer((socket) => {
      socket.on("data", (chunk) => {
        captured += chunk.toString("utf8");
      });
    });
    await new Promise<void>((resolve) => dashboard.listen(0, "127.0.0.1", resolve));
    const dashboardPort = (dashboard.address() as net.AddressInfo).port;
    const apiServer = bridge.createApiBridgeServer(dashboardPort);
    await new Promise<void>((resolve) => apiServer.listen(0, "0.0.0.0", resolve));
    const apiPort = (apiServer.address() as net.AddressInfo).port;

    const client = net.connect(apiPort, externalAddress as string);
    try {
      await new Promise<void>((resolve, reject) => {
        client.on("error", reject);
        client.on("connect", () => {
          client.write(
            [
              "GET /v1/ws HTTP/1.1",
              `Host: ${externalAddress}:${apiPort}`,
              "Connection: Upgrade",
              "Upgrade: websocket",
              "Sec-WebSocket-Version: 13",
              "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==",
              "X-Forwarded-For: 198.51.100.77",
              "X-Real-IP: 198.51.100.77",
              "",
              "",
            ].join("\r\n")
          );
          resolve();
        });
      });
      await waitFor(() => captured.includes("\r\n\r\n"));
    } finally {
      client.destroy();
      apiServer.close();
      apiServer.closeAllConnections();
      dashboard.close();
    }

    assert.match(captured, new RegExp(`X-Forwarded-For: ${externalAddress}\\r\\n`));
    assert.doesNotMatch(captured, /198\.51\.100\.77/);
    assert.doesNotMatch(captured, /X-Real-IP/i);
  }
);
