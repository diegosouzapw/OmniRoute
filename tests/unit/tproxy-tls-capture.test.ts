/**
 * Fase 3 / Epic A — TLS-terminating capture for TPROXY (decrypt 2/N).
 *
 * The decrypt engine TLS-terminates an intercepted client socket with a per-SNI
 * leaf from the dynamic CA (#4173), feeds the plaintext to Node's HTTP parser,
 * captures the exchange (source "tproxy"), and forwards it re-encrypted. The
 * decrypt + capture path needs NO root/iptables/native addon, so it is proven
 * here with a real local TLS round-trip: a client that trusts the dynamic CA
 * connects, its request is decrypted + recorded, and the response from a real
 * local HTTPS upstream flows back. (The anti-loop forward — `realForward` via
 * `connectMarked` — is the only kernel-dependent piece, validated e2e on the VPS.)
 */
import test from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import tls from "node:tls";
import https from "node:https";
import {
  isTlsClientHello,
  resolveCaptureHost,
  buildForwardHeaders,
  createForward,
  createTlsCaptureServer,
} from "../../src/mitm/tproxy/tlsCapture.ts";
import { DynamicCertStore, generateMitmCa } from "../../src/mitm/tproxy/dynamicCert.ts";
import { globalTrafficBuffer } from "../../src/mitm/inspector/buffer.ts";

test("isTlsClientHello matches only the TLS handshake content-type byte (0x16)", () => {
  assert.equal(isTlsClientHello(0x16), true);
  assert.equal(isTlsClientHello(0x47), false); // 'G' (start of an HTTP GET)
  assert.equal(isTlsClientHello(0x00), false);
});

test("resolveCaptureHost prefers SNI, then Host header (port stripped), then dest IP", () => {
  assert.equal(resolveCaptureHost("api.example.com", "other:443", "1.2.3.4"), "api.example.com");
  assert.equal(resolveCaptureHost(undefined, "host.example:8443", "1.2.3.4"), "host.example");
  assert.equal(resolveCaptureHost("", "  ", "1.2.3.4"), "1.2.3.4");
});

test("buildForwardHeaders drops hop-by-hop, keeps auth, and pins host", () => {
  const out = buildForwardHeaders(
    {
      host: "old:443",
      connection: "keep-alive",
      "transfer-encoding": "chunked",
      "content-length": "10",
      authorization: "Bearer keep-me",
      accept: "application/json",
    },
    "api.example.com"
  );
  assert.equal(out.host, "api.example.com");
  assert.equal(out.authorization, "Bearer keep-me"); // upstream still authenticates
  assert.equal(out.accept, "application/json");
  assert.equal(out.connection, undefined);
  assert.equal(out["transfer-encoding"], undefined);
  assert.equal(out["content-length"], undefined);
});

async function startHttpsUpstream(): Promise<{ port: number; close: () => Promise<void> }> {
  const up = await generateMitmCa("test upstream"); // any self-signed key+cert pair
  const server = https.createServer({ key: up.key, cert: up.cert }, (req, res) => {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(`decrypted-roundtrip:${req.url ?? ""}`);
  });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", () => r()));
  const addr = server.address();
  const port = typeof addr === "object" && addr ? addr.port : 0;
  return {
    port,
    close: () =>
      new Promise<void>((res) => {
        server.closeAllConnections?.();
        server.close(() => res());
      }),
  };
}

function startEngineListener(
  certStore: DynamicCertStore,
  dest: { ip: string; port: number },
  forward: ReturnType<typeof createForward>
): Promise<{ port: number; close: () => Promise<void> }> {
  const engine = createTlsCaptureServer(certStore, { forward });
  const listener = net.createServer((sock) => engine.terminate(sock, dest));
  return new Promise((resolve) => {
    listener.listen(0, "127.0.0.1", () => {
      const addr = listener.address();
      const port = typeof addr === "object" && addr ? addr.port : 0;
      resolve({
        port,
        close: async () => {
          await new Promise<void>((r) => listener.close(() => r()));
          await engine.close();
        },
      });
    });
  });
}

function tlsRequest(
  port: number,
  servername: string,
  ca: string,
  rawRequest: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = tls.connect({ host: "127.0.0.1", port, ca, servername }, () => {
      client.write(rawRequest);
    });
    const chunks: Buffer[] = [];
    client.on("data", (c) => chunks.push(c));
    client.on("end", () => {
      client.destroy();
      resolve(Buffer.concat(chunks).toString("utf8"));
    });
    client.once("error", reject);
  });
}

test("decrypts an intercepted HTTPS request and captures it as source 'tproxy'", async () => {
  globalTrafficBuffer.clear();
  const upstream = await startHttpsUpstream();
  const certStore = new DynamicCertStore("OmniRoute MITM CA (test)");
  const caPem = await certStore.getCaCertPem();
  // forward = direct TLS to the test upstream (no SO_MARK — native addon not needed
  // here). The test upstream uses a self-signed cert, so opt out of verification
  // explicitly (production `realForward` keeps the secure-by-default `true`).
  const forward = createForward((ip, port) => net.connect(port, ip), { rejectUnauthorized: false });
  const engine = await startEngineListener(
    certStore,
    { ip: "127.0.0.1", port: upstream.port },
    forward
  );

  try {
    const body = await tlsRequest(
      engine.port,
      "api.example.com",
      caPem,
      "GET /v1/models HTTP/1.1\r\n" +
        "Host: api.example.com\r\n" +
        "authorization: Bearer sk-supersecret-token-abcdef0123456789\r\n" +
        "Connection: close\r\n\r\n"
    );

    assert.match(body, /decrypted-roundtrip:\/v1\/models/, "client gets the upstream response");

    await new Promise((r) => setTimeout(r, 40)); // buffer.update runs on the async path
    const entry = globalTrafficBuffer.list().at(-1);
    assert.ok(entry, "an entry was captured");
    assert.equal(entry.source, "tproxy");
    assert.equal(entry.method, "GET");
    assert.equal(entry.host, "api.example.com", "host comes from the SNI servername");
    assert.equal(entry.path, "/v1/models");
    assert.equal(entry.status, 200);
    assert.match(entry.responseBody ?? "", /decrypted-roundtrip/, "decrypted body is captured");
    // the bearer token in the request must be masked in the buffer
    assert.ok(
      !JSON.stringify(entry.requestHeaders).includes("sk-supersecret-token-abcdef0123456789"),
      "request secret is masked in the captured headers"
    );
  } finally {
    await engine.close();
    await upstream.close();
  }
});

test("the forward dials its upstream through connectRaw — the bypass-marked seam (anti-loop regression)", async () => {
  // Regression for the bug the VPS e2e caught: `https.request({ createConnection })`
  // is silently IGNORED whenever an agent is present — and `agent: false` still
  // installs a fresh default Agent — so the forward opened its OWN unmarked socket.
  // On a TPROXY host that re-intercepts the proxy's own forward, that loops
  // infinitely. The fix puts the marked socket on the Agent's createConnection;
  // this asserts connectRaw (the anti-loop seam) is actually invoked.
  globalTrafficBuffer.clear();
  const upstream = await startHttpsUpstream();
  const certStore = new DynamicCertStore("OmniRoute MITM CA (test)");
  const caPem = await certStore.getCaCertPem();
  let connectRawCalls = 0;
  const forward = createForward(
    (ip, port) => {
      connectRawCalls += 1;
      return net.connect(port, ip);
    },
    { rejectUnauthorized: false }
  );
  const engine = await startEngineListener(
    certStore,
    { ip: "127.0.0.1", port: upstream.port },
    forward
  );

  try {
    const body = await tlsRequest(
      engine.port,
      "api.example.com",
      caPem,
      "GET /seam HTTP/1.1\r\nHost: api.example.com\r\nConnection: close\r\n\r\n"
    );
    assert.match(body, /decrypted-roundtrip:\/seam/, "client still gets the upstream response");
    assert.ok(
      connectRawCalls >= 1,
      "the forward MUST dial through connectRaw (the bypass-marked seam), not a default socket"
    );
  } finally {
    await engine.close();
    await upstream.close();
  }
});

test("a forward failure is recorded as an error entry and the client gets 502", async () => {
  globalTrafficBuffer.clear();
  const certStore = new DynamicCertStore("OmniRoute MITM CA (test)");
  const caPem = await certStore.getCaCertPem();
  const failingForward = () => Promise.reject(new Error("upstream unreachable"));
  const engine = await startEngineListener(
    certStore,
    { ip: "127.0.0.1", port: 1 },
    failingForward as ReturnType<typeof createForward>
  );

  try {
    const body = await tlsRequest(
      engine.port,
      "api.example.com",
      caPem,
      "GET /boom HTTP/1.1\r\nHost: api.example.com\r\nConnection: close\r\n\r\n"
    );
    assert.match(body, /502 Bad Gateway/, "client receives a 502 status line");

    await new Promise((r) => setTimeout(r, 40));
    const entry = globalTrafficBuffer.list().at(-1);
    assert.ok(entry);
    assert.equal(entry.source, "tproxy");
    assert.equal(entry.status, "error");
    assert.ok(entry.error && !entry.error.includes("at /"), "error is sanitized (no stack trace)");
  } finally {
    await engine.close();
  }
});
