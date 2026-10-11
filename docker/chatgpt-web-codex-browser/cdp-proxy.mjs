import http from "node:http";
import net from "node:net";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const listenPort = Number(process.env.CDP_PROXY_LISTEN_PORT) || 9223;
const upstreamHost = "127.0.0.1";
const upstreamPort = Number(process.env.CDP_PROXY_UPSTREAM_PORT) || 9222;

// SECURITY (#13679, #14486): this proxy republishes Chromium's loopback CDP onto
// 0.0.0.0:9223 with no auth of its own — CDP grants full control over a
// live browser session (Runtime.evaluate, cookie theft, etc). Every
// request/WS-upgrade MUST present the shared secret as an
// `X-Omni-Cdp-Token: <token>` header before a single byte is forwarded
// upstream, mirroring docker/vnc-browser/chromium/cdp-bridge.py (#12571).
// The proxy FAILS CLOSED: with no token configured it rejects everything.
//
// Token source: CDP_PROXY_TOKEN, or — when that is empty and CDP_PROXY_TOKEN_FILE
// is set — a secret auto-generated on first start into that file (a volume
// shared read-only with the OmniRoute app container, which sends it back).
// The token value is never logged.
const TOKEN_HEADER = "x-omni-cdp-token";

function loadToken() {
  const fromEnv = process.env.CDP_PROXY_TOKEN || "";
  if (fromEnv) return fromEnv;
  const file = process.env.CDP_PROXY_TOKEN_FILE || "";
  if (!file) return "";
  try {
    const existing = readFileSync(file, "utf8").trim();
    if (existing) return existing;
  } catch {
    // fall through to generation
  }
  try {
    const generated = randomBytes(32).toString("hex");
    writeFileSync(file, generated + "\n", { mode: 0o644 });
    return generated;
  } catch {
    return "";
  }
}

const TOKEN = loadToken();

if (!TOKEN) {
  console.error(
    "[cdp-proxy] WARNING: no CDP_PROXY_TOKEN (or usable CDP_PROXY_TOKEN_FILE) configured — " +
      "failing CLOSED: every request is rejected until a token is set (#14486)."
  );
}

function hasValidToken(headers) {
  if (!TOKEN) return false;
  const presented = headers[TOKEN_HEADER];
  if (typeof presented !== "string") return false;
  const a = Buffer.from(presented);
  const b = Buffer.from(TOKEN);
  return a.length === b.length && timingSafeEqual(a, b);
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
