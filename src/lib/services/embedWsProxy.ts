/**
 * WebSocket reverse proxy for embedded service UIs.
 *
 * Runs a lightweight HTTP server (port EMBED_WS_PROXY_PORT, default 20131)
 * that accepts WebSocket upgrade requests and tunnels them to the matching
 * embedded service.
 *
 * URL pattern: WebSocket connect to host:20131/[name]/[...path]
 *   [name] → resolved via the services registry (e.g. "9router")
 *   [...path] → forwarded verbatim to the upstream WS endpoint
 *
 * Security:
 *   - Target host is always 127.0.0.1 and port comes from the registry — never
 *     from user input. No SSRF risk.
 *   - Server binds to 127.0.0.1 only (loopback) unless EMBED_WS_PROXY_HOST
 *     is set explicitly. The OmniRoute LOCAL_ONLY rule is enforced at the
 *     dashboard layer; the proxy itself is loopback-only as defence-in-depth.
 */

import http from "node:http";
import net from "node:net";
import type { IncomingMessage } from "node:http";

import { getSupervisor } from "./registry";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 20131;

declare global {
  var __omnirouteEmbedWsStarted: boolean | undefined;
}

/** Regex that matches /<name>/<path> or /<name> */
const PATH_RE = /^\/([^/?#]+)(\/.*)?$/;

function writeError(socket: net.Socket, status: number, message: string): void {
  if (!socket.writable || socket.destroyed) return;
  const body = Buffer.from(JSON.stringify({ error: message }), "utf8");
  const lines = [
    `HTTP/1.1 ${status} ${http.STATUS_CODES[status] ?? "Error"}`,
    "Connection: close",
    "Content-Type: application/json; charset=utf-8",
    `Content-Length: ${body.length}`,
    "",
    "",
  ];
  socket.write(lines.join("\r\n"));
  socket.end(body);
}

function proxyUpgrade(req: IncomingMessage, socket: net.Socket, head: Buffer): void {
  const rawUrl = req.url ?? "/";
  const match = PATH_RE.exec(rawUrl.split("?")[0]);

  if (!match) {
    writeError(socket, 400, "Invalid path");
    return;
  }

  const [, name, rest = "/"] = match;
  const supervisor = getSupervisor(name);

  if (!supervisor) {
    writeError(socket, 404, `Service '${name}' not found`);
    return;
  }

  const { state, port } = supervisor.getStatus();
  if (state !== "running") {
    writeError(socket, 503, `Service '${name}' is not running (state: ${state})`);
    return;
  }

  // Rebuild the search string if present
  const search = rawUrl.includes("?") ? rawUrl.slice(rawUrl.indexOf("?")) : "";
  const upstreamPath = `${rest}${search}`;

  const upstream = net.connect(port, "127.0.0.1");

  upstream.once("connect", () => {
    const requestLine = `${req.method ?? "GET"} ${upstreamPath} HTTP/${req.httpVersion}`;
    const lines: string[] = [requestLine];
    let wroteHost = false;

    for (let i = 0; i < req.rawHeaders.length; i += 2) {
      const name_ = req.rawHeaders[i];
      const value = req.rawHeaders[i + 1] ?? "";
      if (name_.toLowerCase() === "host") {
        lines.push(`Host: 127.0.0.1:${port}`);
        wroteHost = true;
      } else {
        lines.push(`${name_}: ${value}`);
      }
    }
    if (!wroteHost) lines.push(`Host: 127.0.0.1:${port}`);

    upstream.write(`${lines.join("\r\n")}\r\n\r\n`);
    if (head.length > 0) upstream.write(head);

    socket.pipe(upstream);
    upstream.pipe(socket);
  });

  upstream.on("error", (err) => {
    writeError(socket, 502, String(err.message));
  });

  socket.on("error", () => upstream.destroy());
  socket.on("close", () => upstream.destroy());
  upstream.on("close", () => socket.destroy());
}

/**
 * Start the embed WebSocket proxy server.
 * Idempotent — safe to call multiple times.
 */
export function initEmbedWsProxy(): void {
  if (globalThis.__omnirouteEmbedWsStarted) return;

  const host = process.env.EMBED_WS_PROXY_HOST ?? DEFAULT_HOST;
  const port = parseInt(process.env.EMBED_WS_PROXY_PORT ?? String(DEFAULT_PORT), 10);

  const server = http.createServer((_req, res) => {
    res.writeHead(426, "Upgrade Required", { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "upgrade_required", message: "Use WebSocket." }));
  });

  server.on("upgrade", proxyUpgrade);

  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`[EmbedWsProxy] Port ${port} is already in use — embed WS proxy disabled.`);
      return;
    }
    console.warn("[EmbedWsProxy] Failed to start:", err.message);
  });

  server.listen(port, host, () => {
    globalThis.__omnirouteEmbedWsStarted = true;
    console.log(`[EmbedWsProxy] Listening on ${host}:${port}`);
  });
}
