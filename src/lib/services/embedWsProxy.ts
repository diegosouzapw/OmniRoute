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
 *   - Max 50 concurrent connections per service. The 51st request receives 503.
 *   - Idle timeout: 5 minutes without any data → both sockets are destroyed.
 *   - Hop-by-hop headers cookie/authorization/origin are stripped from the
 *     upgrade request; Authorization is replaced by Bearer <serviceApiKey>.
 */

import http from "node:http";
import net from "node:net";
import type { IncomingMessage } from "node:http";

import { getSupervisor } from "./registry";
import { getOrCreateApiKey } from "./apiKey";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 20131;

/** Maximum concurrent WebSocket bridges per service name. */
const MAX_CONNECTIONS_PER_SERVICE = 50;

/** Idle timeout in milliseconds (5 minutes). */
const IDLE_TIMEOUT_MS = 5 * 60 * 1000;

/** Headers to strip from the client upgrade request (case-insensitive). */
const STRIPPED_HEADERS = new Set(["cookie", "authorization", "origin"]);

declare global {
  var __omnirouteEmbedWsStarted: boolean | undefined;
}

/**
 * Tracks active client sockets per service name.
 * Used to enforce MAX_CONNECTIONS_PER_SERVICE.
 */
const activeConnections = new Map<string, Set<net.Socket>>();

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

/**
 * Register a client socket into the per-service active set.
 * Returns false (and writes 503) if the limit is already reached.
 */
function registerConnection(name: string, socket: net.Socket): boolean {
  let set = activeConnections.get(name);
  if (!set) {
    set = new Set();
    activeConnections.set(name, set);
  }
  if (set.size >= MAX_CONNECTIONS_PER_SERVICE) {
    writeError(
      socket,
      503,
      `Service '${name}' connection limit reached (max ${MAX_CONNECTIONS_PER_SERVICE})`
    );
    return false;
  }
  set.add(socket);
  return true;
}

/** Remove a client socket from the per-service active set. */
function unregisterConnection(name: string, socket: net.Socket): void {
  activeConnections.get(name)?.delete(socket);
}

/**
 * Build the filtered header list for the upstream upgrade request.
 * Strips cookie, authorization, and origin; rewrites host; injects Bearer token.
 */
function buildUpstreamHeaders(rawHeaders: string[], port: number, apiKey: string): string[] {
  const lines: string[] = [];
  let wroteHost = false;

  for (let i = 0; i < rawHeaders.length; i += 2) {
    const headerName = rawHeaders[i];
    const headerValue = rawHeaders[i + 1] ?? "";
    const lower = headerName.toLowerCase();

    if (lower === "host") {
      lines.push(`Host: 127.0.0.1:${port}`);
      wroteHost = true;
    } else if (!STRIPPED_HEADERS.has(lower)) {
      lines.push(`${headerName}: ${headerValue}`);
    }
    // cookie / authorization / origin are intentionally dropped here
  }

  if (!wroteHost) lines.push(`Host: 127.0.0.1:${port}`);

  // Always inject the service API key regardless of what the client sent
  lines.push(`Authorization: Bearer ${apiKey}`);

  return lines;
}

async function proxyUpgrade(req: IncomingMessage, socket: net.Socket, head: Buffer): Promise<void> {
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

  // Enforce max concurrent connections per service
  if (!registerConnection(name, socket)) {
    // writeError already written inside registerConnection
    return;
  }

  // Clean up connection tracking when the client socket closes
  socket.once("close", () => unregisterConnection(name, socket));
  socket.once("error", () => unregisterConnection(name, socket));

  // Fetch the service API key (never cached — key may rotate)
  const apiKey = await getOrCreateApiKey(name);

  // Rebuild the search string if present
  const search = rawUrl.includes("?") ? rawUrl.slice(rawUrl.indexOf("?")) : "";
  const upstreamPath = `${rest}${search}`;

  const upstream = net.connect(port, "127.0.0.1");

  // Idle timeout: reset on any data in either direction; destroy both on expiry
  let idleTimer: ReturnType<typeof setTimeout> | null = null;

  function resetIdleTimer(): void {
    if (idleTimer !== null) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      socket.destroy();
      upstream.destroy();
    }, IDLE_TIMEOUT_MS);
  }

  function clearIdleTimer(): void {
    if (idleTimer !== null) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }
  }

  upstream.once("connect", () => {
    const requestLine = `${req.method ?? "GET"} ${upstreamPath} HTTP/${req.httpVersion}`;
    const headerLines = buildUpstreamHeaders(req.rawHeaders, port, apiKey);
    upstream.write(`${requestLine}\r\n${headerLines.join("\r\n")}\r\n\r\n`);
    if (head.length > 0) upstream.write(head);

    // Start idle timer once the tunnel is live
    resetIdleTimer();

    socket.on("data", resetIdleTimer);
    upstream.on("data", resetIdleTimer);

    socket.pipe(upstream);
    upstream.pipe(socket);
  });

  upstream.on("error", () => {
    clearIdleTimer();
    writeError(socket, 502, "Upstream connection error");
  });

  socket.on("error", () => {
    clearIdleTimer();
    upstream.destroy();
  });

  socket.on("close", () => {
    clearIdleTimer();
    upstream.destroy();
  });

  upstream.on("close", () => {
    clearIdleTimer();
    socket.destroy();
  });
}

/**
 * Resolve the bind host for the embed WS proxy.
 *
 * `EMBED_WS_PROXY_HOST` takes precedence, but we fall back to `LIVE_WS_HOST`
 * so a single env var exposes BOTH WebSocket sockets (the Live dashboard server
 * on :20129 and this embed proxy on :20131) in Docker / behind a reverse proxy
 * or tunnel. Without this fallback the embed proxy stayed bound to 127.0.0.1
 * even when the operator set `LIVE_WS_HOST=0.0.0.0`, so the Live view was
 * permanently "disconnected" in headless deployments (#5110). Defaults to
 * loopback for safety when neither is set.
 */
export function resolveEmbedWsHost(): string {
  return process.env.EMBED_WS_PROXY_HOST ?? process.env.LIVE_WS_HOST ?? DEFAULT_HOST;
}

/**
 * Start the embed WebSocket proxy server.
 * Idempotent — safe to call multiple times.
 */
export function initEmbedWsProxy(): void {
  if (globalThis.__omnirouteEmbedWsStarted) return;

  const host = resolveEmbedWsHost();
  const port = parseInt(process.env.EMBED_WS_PROXY_PORT ?? String(DEFAULT_PORT), 10);

  const server = http.createServer((_req, res) => {
    res.writeHead(426, "Upgrade Required", { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "upgrade_required", message: "Use WebSocket." }));
  });

  server.on("upgrade", (req: IncomingMessage, socket: net.Socket, head: Buffer) => {
    proxyUpgrade(req, socket, head).catch((err: unknown) => {
      const msg = err instanceof Error ? err.message : String(err);
      writeError(socket, 500, `Internal proxy error: ${msg}`);
    });
  });

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

// ─── Exported for testing ────────────────────────────────────────────────────

export {
  activeConnections,
  registerConnection,
  unregisterConnection,
  buildUpstreamHeaders,
  MAX_CONNECTIONS_PER_SERVICE,
  IDLE_TIMEOUT_MS,
};
