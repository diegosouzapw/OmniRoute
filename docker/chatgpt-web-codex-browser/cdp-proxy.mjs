import http from "node:http";
import net from "node:net";

const listenPort = 9223;
const upstreamHost = "127.0.0.1";
const upstreamPort = 9222;

// SECURITY (#13679): this proxy republishes Chromium's loopback CDP onto
// 0.0.0.0:9223 with no auth of its own — CDP grants full control over a
// live browser session (Runtime.evaluate, cookie theft, etc). When the
// operator sets CDP_PROXY_TOKEN, every request/WS-upgrade MUST present it as
// an `X-Omni-Cdp-Token: <token>` header before a single byte is forwarded
// upstream, mirroring the gate docker/vnc-browser/chromium/cdp-bridge.py
// already has (#12571). Left unset, the proxy keeps its historical
// zero-config behavior — the primary mitigation for the shared-bridge risk
// is docker-compose.yml isolating this service onto its own network so no
// unrelated sibling container can reach it at all.
const TOKEN = process.env.CDP_PROXY_TOKEN || "";
const TOKEN_HEADER = "x-omni-cdp-token";

if (!TOKEN) {
  console.error(
    "[cdp-proxy] WARNING: running without CDP_PROXY_TOKEN — every request is forwarded " +
      "unauthenticated. Set CDP_PROXY_TOKEN to require an X-Omni-Cdp-Token header (#13679)."
  );
}

function hasValidToken(headers) {
  if (!TOKEN) return true;
  return headers[TOKEN_HEADER] === TOKEN;
}

function proxyHeaders(headers) {
  const next = { ...headers, host: `${upstreamHost}:${upstreamPort}` };
  delete next.connection;
  delete next.upgrade;
  return next;
}

const server = http.createServer((request, response) => {
  if (!hasValidToken(request.headers)) {
    response.writeHead(403, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "missing or invalid X-Omni-Cdp-Token" }));
    return;
  }
  const upstream = http.request(
    {
      host: upstreamHost,
      port: upstreamPort,
      method: request.method,
      path: request.url,
      headers: proxyHeaders(request.headers),
    },
    (upstreamResponse) => {
      const chunks = [];
      upstreamResponse.on("data", (chunk) => chunks.push(chunk));
      upstreamResponse.on("end", () => {
        let body = Buffer.concat(chunks);
        const contentType = String(upstreamResponse.headers["content-type"] || "");
        if (contentType.includes("application/json")) {
          body = Buffer.from(
            body
              .toString("utf8")
              .replaceAll(`ws://${upstreamHost}:${upstreamPort}`, `ws://${request.headers.host}`)
          );
        }
        const headers = { ...upstreamResponse.headers, "content-length": String(body.length) };
        response.writeHead(upstreamResponse.statusCode || 502, headers);
        response.end(body);
      });
    }
  );
  upstream.on("error", () => {
    response.writeHead(503, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: "CDP browser is starting" }));
  });
  request.pipe(upstream);
});

server.on("upgrade", (request, socket, head) => {
  if (!hasValidToken(request.headers)) {
    socket.destroy();
    return;
  }
  const upstream = net.connect(upstreamPort, upstreamHost, () => {
    const upgradeHeaders = {
      ...request.headers,
      host: `${upstreamHost}:${upstreamPort}`,
      connection: "Upgrade",
      upgrade: "websocket",
    };
    const headers = Object.entries(upgradeHeaders)
      .flatMap(([name, value]) =>
        Array.isArray(value) ? value.map((item) => `${name}: ${item}`) : [`${name}: ${value}`]
      )
      .join("\r\n");
    upstream.write(
      `${request.method} ${request.url} HTTP/${request.httpVersion}\r\n${headers}\r\n\r\n`
    );
    if (head.length > 0) upstream.write(head);
    socket.pipe(upstream).pipe(socket);
  });
  upstream.on("error", () => socket.destroy());
});

server.listen(listenPort, "0.0.0.0", () => {
  console.error(`[cdp-proxy] listening on 0.0.0.0:${listenPort}`);
});
