import http from "http";
import type { IncomingHttpHeaders, IncomingMessage, ServerResponse } from "http";
import net from "net";
import { classifyIpScope } from "@/lib/ipUtils";
import { getRuntimePorts } from "@/lib/runtime/ports";
import { warnIfNonLoopbackWithoutApiKey } from "@/lib/startup/nonLoopbackApiKeyGuard";
import { getTrustProxyMode } from "@/server/origin/trustProxyMode";
import { getApiBridgeTimeoutConfig } from "@/shared/utils/runtimeTimeouts";
import {
  attachRequestStreamGuards,
  installProcessCrashGuard,
} from "@/shared/utils/httpClientAbortGuard.mjs";

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

// The dashboard tells a local caller from a remote one by the socket peer plus whether
// forwarding headers are present. This relay always connects from loopback, so a remote
// client has to be reported through them or it would be taken for the host itself.
//
//   local          loopback peer: its headers pass through, as for any local caller.
//   trusted-proxy  private-LAN peer that OMNIROUTE_TRUST_PROXY=private|lan names as a
//                  proxy: its headers pass through and its own address is appended.
//   remote         anyone else: everything it sent about forwarding is dropped and it
//                  is reported by the address of its connection.
type ClientPolicy =
  { kind: "local" } | { kind: "trusted-proxy"; peer: string } | { kind: "remote"; peer: string };

// Headers a client can use to claim an address, host or scheme other than its own.
const FORWARDING_HEADERS = new Set([
  "forwarded",
  "x-forwarded-for",
  "x-forwarded-host",
  "x-forwarded-proto",
  "x-forwarded-port",
  "x-real-ip",
  "cf-connecting-ip",
  "true-client-ip",
  "x-client-ip",
]);

function resolveClientPolicy(remoteAddress: string | undefined): ClientPolicy {
  const scope = classifyIpScope(remoteAddress);
  if (scope === "loopback") return { kind: "local" };
  const peer = remoteAddress ? remoteAddress.replace(/^::ffff:/, "") : "unknown";
  if (scope === "private" && getTrustProxyMode() === "private") {
    return { kind: "trusted-proxy", peer };
  }
  return { kind: "remote", peer };
}

export function buildBridgeRequestHeaders(
  headers: IncomingHttpHeaders,
  remoteAddress: string | undefined,
  dashboardPort: number
): IncomingHttpHeaders {
  const relayed: IncomingHttpHeaders = { ...headers, host: `127.0.0.1:${dashboardPort}` };
  const policy = resolveClientPolicy(remoteAddress);
  if (policy.kind === "remote") {
    for (const name of FORWARDING_HEADERS) delete relayed[name];
    relayed["x-forwarded-for"] = policy.peer;
  } else if (policy.kind === "trusted-proxy") {
    const chain = [headers["x-forwarded-for"], policy.peer].flat().filter(Boolean);
    relayed["x-forwarded-for"] = chain.join(", ");
  }
  return relayed;
}

function proxyRequest(req: IncomingMessage, res: ServerResponse, dashboardPort: number): void {
  const proxyTimeoutMs = getProxyTimeoutMs(req);
  const targetReq = http.request(
    {
      hostname: "127.0.0.1",
      port: dashboardPort,
      method: req.method,
      path: req.url,
      headers: buildBridgeRequestHeaders(req.headers, req.socket.remoteAddress, dashboardPort),
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

/** Header lines for an upgrade request relayed to the dashboard, from the client's raw headers. */
export function buildBridgeUpgradeHeaderLines(
  rawHeaders: string[],
  remoteAddress: string | undefined,
  dashboardPort: number
): string[] {
  const policy = resolveClientPolicy(remoteAddress);
  const headerLines: string[] = [];
  const forwardedFor: string[] = [];
  let wroteHost = false;

  for (let index = 0; index < rawHeaders.length; index += 2) {
    const name = rawHeaders[index];
    const rawValue = rawHeaders[index + 1] || "";
    const lowerName = name.toLowerCase();
    if (lowerName === "host") {
      headerLines.push(`Host: 127.0.0.1:${dashboardPort}`);
      wroteHost = true;
    } else if (policy.kind === "remote" && FORWARDING_HEADERS.has(lowerName)) {
      continue;
    } else if (policy.kind === "trusted-proxy" && lowerName === "x-forwarded-for") {
      forwardedFor.push(rawValue);
    } else {
      headerLines.push(`${name}: ${rawValue}`);
    }
  }

  if (!wroteHost) {
    headerLines.push(`Host: 127.0.0.1:${dashboardPort}`);
  }
  if (policy.kind === "remote") {
    headerLines.push(`X-Forwarded-For: ${policy.peer}`);
  } else if (policy.kind === "trusted-proxy") {
    headerLines.push(`X-Forwarded-For: ${[...forwardedFor, policy.peer].join(", ")}`);
  }
  return headerLines;
}

function proxyUpgrade(
  req: IncomingMessage,
  socket: net.Socket,
  head: Buffer,
  dashboardPort: number
) {
  // Built now: once the client disconnects, the socket no longer reports its address.
  const requestLine = `${req.method || "GET"} ${req.url || "/"} HTTP/${req.httpVersion || "1.1"}`;
  const headerLines = [
    requestLine,
    ...buildBridgeUpgradeHeaderLines(req.rawHeaders, req.socket.remoteAddress, dashboardPort),
  ];
  const upstream = net.connect(dashboardPort, "127.0.0.1");

  upstream.on("connect", () => {
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

export function createApiBridgeServer(dashboardPort: number): http.Server {
  const server = http.createServer((req, res) => {
    // Absorb client-abort errors (browser closes the socket during navigation/
    // HMR/bfcache) on the request/response streams so they never surface as an
    // uncaughtException that kills the server (#fix-dev-server-aborted).
    attachRequestStreamGuards(req, res);
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
  return server;
}

export function initApiBridgeServer(): void {
  // Safety net: a client aborting a connection can emit `Error: aborted`/
  // ECONNRESET on the request stream; without this the single missed listener
  // becomes an uncaughtException that kills the server. Benign aborts are
  // swallowed; genuine errors still crash loudly (#fix-dev-server-aborted).
  installProcessCrashGuard();
  if (globalThis.__omnirouteApiBridgeStarted) return;

  const { apiPort, dashboardPort } = getRuntimePorts();
  if (apiPort === dashboardPort) return;

  const host = process.env.API_HOST || "127.0.0.1";
  warnIfNonLoopbackWithoutApiKey("API bridge", host);

  const server = createApiBridgeServer(dashboardPort);
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
