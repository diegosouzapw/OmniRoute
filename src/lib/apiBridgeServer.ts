import http from "http";
import type { IncomingMessage, ServerResponse } from "http";
import net from "net";
import { getRuntimePorts } from "@/lib/runtime/ports";
import { getApiBridgeTimeoutConfig } from "@/shared/utils/runtimeTimeouts";

const API_BRIDGE_TIMEOUTS = getApiBridgeTimeoutConfig(process.env, (message) => {
  console.warn(`[API Bridge] ${message}`);
});

const OPENAI_COMPAT_PATHS = [
  /^\/v1(?:\/|$)/,
  /^\/chat\/completions(?:\?|$)/,
  /^\/responses(?:\?|$)/,
  /^\/models(?:\?|$)/,
  /^\/codex(?:\/|\?|$)/,
  /^\/api\/oauth(?:\/|$)/,
  /^\/callback(?:\?|$)/,
];

function isOpenAiCompatiblePath(pathname: string): boolean {
  return OPENAI_COMPAT_PATHS.some((pattern) => pattern.test(pathname));
}

function requestWantsStreaming(req: IncomingMessage): boolean {
  const accept = String(req.headers.accept || "").toLowerCase();
  if (accept.includes("text/event-stream")) return true;

  const pathname = (req.url || "/").split("?")[0] || "/";
  return /^\/(?:v1\/)?(?:responses|chat\/completions)(?:\/|$)/.test(pathname);
}

function getProxyTimeoutMs(req: IncomingMessage): number {
  if (!requestWantsStreaming(req)) return API_BRIDGE_TIMEOUTS.proxyTimeoutMs;

  return Math.max(API_BRIDGE_TIMEOUTS.proxyTimeoutMs, API_BRIDGE_TIMEOUTS.serverRequestTimeoutMs);
}

function proxyRequest(req: IncomingMessage, res: ServerResponse, dashboardPort: number): void {
  const proxyTimeoutMs = getProxyTimeoutMs(req);
  const targetReq = http.request(
    {
      hostname: "127.0.0.1",
      port: dashboardPort,
      method: req.method,
      path: req.url,
      headers: {
        ...req.headers,
        host: `127.0.0.1:${dashboardPort}`,
      },
      timeout: proxyTimeoutMs,
    },
    (targetRes) => {
      const contentType = String(targetRes.headers["content-type"] || "").toLowerCase();
      if (contentType.includes("text/event-stream")) {
        targetReq.setTimeout(0);
      }

      res.writeHead(targetRes.statusCode || 502, targetRes.headers);
      targetRes.pipe(res);
    }
  );

  targetReq.on("timeout", () => {
    targetReq.destroy();
    if (res.headersSent) return;
    res.writeHead(504, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        error: "api_bridge_timeout",
        detail: `Proxy request timed out after ${proxyTimeoutMs}ms`,
      })
    );
  });

  targetReq.on("error", (error) => {
    if (res.headersSent) return;
    res.writeHead(502, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        error: "api_bridge_unavailable",
        detail: String(error.message || error),
      })
    );
  });

  req.on("aborted", () => {
    targetReq.destroy();
  });

  req.pipe(targetReq);
}

function writeUpgradeProxyError(socket: net.Socket, status: number, body: string): void {
  if (!socket.writable || socket.destroyed) return;
  const buffer = Buffer.from(body, "utf8");
  const response = [
    `HTTP/1.1 ${status} ${http.STATUS_CODES[status] || "Error"}`,
    "Connection: close",
    "Content-Type: application/json; charset=utf-8",
    `Content-Length: ${buffer.length}`,
    "",
    "",
  ].join("\r\n");

  socket.write(response);
  socket.end(buffer);
}

function proxyUpgrade(
  req: IncomingMessage,
  socket: net.Socket,
  head: Buffer,
  dashboardPort: number
) {
  const upstream = net.connect(dashboardPort, "127.0.0.1");

  upstream.on("connect", () => {
    const requestLine = `${req.method || "GET"} ${req.url || "/"} HTTP/${req.httpVersion || "1.1"}`;
    const headerLines: string[] = [requestLine];
    let wroteHost = false;

    for (let index = 0; index < req.rawHeaders.length; index += 2) {
      const name = req.rawHeaders[index];
      const rawValue = req.rawHeaders[index + 1] || "";
      if (name.toLowerCase() === "host") {
        headerLines.push(`Host: 127.0.0.1:${dashboardPort}`);
        wroteHost = true;
      } else {
        headerLines.push(`${name}: ${rawValue}`);
      }
    }

    if (!wroteHost) {
      headerLines.push(`Host: 127.0.0.1:${dashboardPort}`);
    }

    upstream.write(`${headerLines.join("\r\n")}\r\n\r\n`);
    if (head.length > 0) {
      upstream.write(head);
    }

    socket.pipe(upstream);
    upstream.pipe(socket);
  });

  upstream.on("error", (error) => {
    writeUpgradeProxyError(
      socket,
      502,
      JSON.stringify({
        error: "api_bridge_upgrade_failed",
        detail: String(error.message || error),
      })
    );
  });

  socket.on("error", () => {
    upstream.destroy();
  });

  socket.on("close", () => {
    upstream.destroy();
  });
}

declare global {
  var __omnirouteApiBridgeStarted: boolean | undefined;
}

export function initApiBridgeServer(): void {
  if (globalThis.__omnirouteApiBridgeStarted) return;

  const { apiPort, dashboardPort } = getRuntimePorts();
  if (apiPort === dashboardPort) return;

  const host = process.env.API_HOST || "127.0.0.1";

  const server = http.createServer((req, res) => {
    const rawUrl = req.url || "/";
    const pathname = rawUrl.split("?")[0] || "/";

    if (!isOpenAiCompatiblePath(pathname)) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          error: "not_found",
          message: "API port only serves OpenAI-compatible routes.",
        })
      );
      return;
    }

    proxyRequest(req, res, dashboardPort);
  });
  server.requestTimeout = API_BRIDGE_TIMEOUTS.serverRequestTimeoutMs;
  server.headersTimeout = API_BRIDGE_TIMEOUTS.serverHeadersTimeoutMs;
  server.keepAliveTimeout = API_BRIDGE_TIMEOUTS.serverKeepAliveTimeoutMs;
  server.setTimeout(API_BRIDGE_TIMEOUTS.serverSocketTimeoutMs);
  server.on("upgrade", (req, socket, head) => {
    const rawUrl = req.url || "/";
    const pathname = rawUrl.split("?")[0] || "/";

    if (!isOpenAiCompatiblePath(pathname)) {
      writeUpgradeProxyError(
        socket,
        404,
        JSON.stringify({
          error: "not_found",
          message: "API port only serves OpenAI-compatible routes.",
        })
      );
      return;
    }

    proxyUpgrade(req, socket, head, dashboardPort);
  });

  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error?.code === "EADDRINUSE") {
      console.warn(
        `[API Bridge] Port ${apiPort} is already in use. API bridge disabled. (dashboard: ${dashboardPort})`
      );
      return;
    }
    console.warn("[API Bridge] Failed to start:", error?.message || error);
  });

  server.listen(apiPort, host, () => {
    globalThis.__omnirouteApiBridgeStarted = true;
    console.log(`[API Bridge] Listening on ${host}:${apiPort} -> dashboard:${dashboardPort}`);
  });
}
