// A reverse proxy on the same host reaches OmniRoute from a loopback socket, so the only thing that
// tells its callers apart from a local operator is the forwarding headers it adds. These tests put a
// real listener (stamped like the custom server does) behind a real same-host proxy and read the
// locality verdict the authz pipeline would compute for what arrives.
import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import type { AddressInfo } from "node:net";

const ORIGINAL_STAMP_TOKEN = process.env.OMNIROUTE_PEER_STAMP_TOKEN;
process.env.OMNIROUTE_PEER_STAMP_TOKEN = "proxy-hop-stamp-token";

const peerStamp = await import("../../../scripts/dev/peer-stamp.mjs");
const { classifyStampedPeerLocality } = await import("../../../src/server/authz/peerStamp.ts");
const { hasProxyHopHeader } = await import("../../../src/server/authz/proxyHeaders.ts");
const { PEER_IP_HEADER, VIA_PROXY_HEADER, wrapRequestListenerWithPeerStamp } = peerStamp;

type Locality = "loopback" | "lan" | "remote";

function listen(server: http.Server): Promise<number> {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve((server.address() as AddressInfo).port));
  });
}

function close(server: http.Server): Promise<void> {
  return new Promise((resolve) => server.close(() => resolve()));
}

function request(port: number, headers: Record<string, string>): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: "127.0.0.1", port, path: "/", headers }, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve(body));
    });
    req.on("error", reject);
    req.end();
  });
}

let app: http.Server;
let appPort: number;

test.before(async () => {
  // The listener OmniRoute runs: every request is peer-stamped, then the locality is derived from
  // the stamp headers exactly as src/server/authz/pipeline.ts does.
  app = http.createServer(
    wrapRequestListenerWithPeerStamp((req: http.IncomingMessage, res: http.ServerResponse) => {
      const verdict: Locality = classifyStampedPeerLocality(
        (req.headers[PEER_IP_HEADER] as string) ?? null,
        (req.headers[VIA_PROXY_HEADER] as string) ?? null,
        process.env.OMNIROUTE_PEER_STAMP_TOKEN
      );
      res.end(verdict);
    })
  );
  appPort = await listen(app);
});

test.after(async () => {
  await close(app);
  if (ORIGINAL_STAMP_TOKEN === undefined) delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  else process.env.OMNIROUTE_PEER_STAMP_TOKEN = ORIGINAL_STAMP_TOKEN;
});

/** A same-host reverse proxy that forwards to the app with exactly `added` on top of the client's
 * request, the way `proxy_set_header` lines in an nginx server block do. */
async function throughProxy(added: Record<string, string>): Promise<Locality> {
  const proxy = http.createServer((clientReq, clientRes) => {
    const upstream = http.request(
      {
        host: "127.0.0.1",
        port: appPort,
        path: clientReq.url,
        method: clientReq.method,
        headers: { ...added },
      },
      (upstreamRes) => {
        clientRes.writeHead(upstreamRes.statusCode ?? 502);
        upstreamRes.pipe(clientRes);
      }
    );
    clientReq.pipe(upstream);
  });
  const proxyPort = await listen(proxy);
  try {
    return (await request(proxyPort, { host: "omni.example.com" })) as Locality;
  } finally {
    await close(proxy);
  }
}

test("a request made straight to the loopback listener is local", async () => {
  assert.equal(await request(appPort, {}), "loopback");
});

test("the documented nginx block (Host and X-Forwarded-Proto only) is not mistaken for the host", async () => {
  assert.equal(
    await throughProxy({ host: "omni.example.com", "x-forwarded-proto": "https" }),
    "remote"
  );
});

test("a proxy that sets only X-Forwarded-Host, X-Forwarded-Server or X-Forwarded-Port is remote", async () => {
  assert.equal(await throughProxy({ "x-forwarded-host": "omni.example.com" }), "remote");
  assert.equal(await throughProxy({ "x-forwarded-server": "proxy.internal" }), "remote");
  assert.equal(await throughProxy({ "x-forwarded-port": "443" }), "remote");
});

test("a proxy that sets only RFC 7239 Forwarded or Via is remote", async () => {
  assert.equal(await throughProxy({ forwarded: "for=203.0.113.7;proto=https" }), "remote");
  assert.equal(await throughProxy({ via: "1.1 edge" }), "remote");
});

test("a proxy that sets X-Forwarded-For or X-Real-IP is remote", async () => {
  assert.equal(await throughProxy({ "x-forwarded-for": "203.0.113.7" }), "remote");
  assert.equal(await throughProxy({ "x-real-ip": "203.0.113.7" }), "remote");
});

test("a proxy that adds no header at all cannot be told apart from a local caller", async () => {
  // Nothing in the request differs from a local one, so this stays local. The proxy examples in
  // the docs set the forwarding headers for that reason.
  assert.equal(await throughProxy({}), "loopback");
});

test("hasProxyHopHeader recognises every forwarding header a proxy sets by default", () => {
  for (const name of [
    "x-forwarded-for",
    "x-forwarded-host",
    "x-forwarded-proto",
    "x-forwarded-port",
    "x-forwarded-server",
    "x-forwarded-prefix",
    "x-real-ip",
    "forwarded",
    "via",
  ]) {
    assert.equal(hasProxyHopHeader({ [name]: "value" }), true, name);
  }
  assert.equal(hasProxyHopHeader({}), false);
  assert.equal(hasProxyHopHeader({ host: "localhost:20128", "user-agent": "curl" }), false);
  assert.equal(hasProxyHopHeader({ "x-forwarded-for": "" }), false);
});

test("the header lists in the custom server and the TypeScript side agree", () => {
  const names = [
    "x-forwarded-for",
    "x-forwarded-host",
    "x-forwarded-proto",
    "x-forwarded-port",
    "x-forwarded-server",
    "x-forwarded-prefix",
    "x-forwarded-anything-else",
    "x-real-ip",
    "forwarded",
    "via",
    "x-request-id",
    "cf-connecting-ip",
    "host",
    "authorization",
  ];
  for (const name of names) {
    assert.equal(
      peerStamp.hasProxyHopHeader({ [name]: "v" }),
      hasProxyHopHeader({ [name]: "v" }),
      name
    );
  }
});
