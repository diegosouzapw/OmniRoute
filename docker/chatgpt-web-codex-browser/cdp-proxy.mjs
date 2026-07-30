import http from "node:http";
import net from "node:net";

const listenPort = 9223;
const upstreamHost = "127.0.0.1";
const upstreamPort = 9222;

function proxyHeaders(headers) {
  const next = { ...headers, host: `${upstreamHost}:${upstreamPort}` };
  delete next.connection;
  delete next.upgrade;
  return next;
}

const server = http.createServer((request, response) => {
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

server.listen(listenPort, "0.0.0.0");
