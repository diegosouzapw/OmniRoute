import http from "node:http";
import net from "node:net";
import { randomUUID } from "node:crypto";
import { createResponsesWsProxy } from "./responses-ws-proxy.mjs";
import { ensurePeerStampToken, wrapRequestListenerWithPeerStamp } from "./peer-stamp.mjs";
import { maybeHandleWebdav, WEBDAV_PREFIX } from "./webdav-handler.mjs";
import methodGuard from "./http-method-guard.cjs";
import headResponseGuard from "./head-response-guard.cjs";
import { resolveTlsOptions, createServerListener } from "./tls-options.mjs";
import { getMainServerTimeoutConfig } from "./main-server-timeouts.mjs";
import { createSystemdNotifier } from "./systemd-notify.mjs";
import { installProcessCrashGuard } from "./httpClientAbortGuard.mjs";

// Safety net (#12861): this is the actual production entry point (see the
// keepAliveTimeout comment below for why `run-next.mjs`-only fixes don't
// reach real installs). Without this, a client abort OR a recoverable
// upstream-fetch timeout that a retry path already handles (see
// open-sse/utils/directResponseStartTimeout.ts) can surface as an
// unhandledRejection -> uncaughtException and take the whole server down —
// exactly the asymmetry `run-next.mjs` already closed for dev. Benign errors
// are swallowed and logged; genuine bugs still crash loudly.
installProcessCrashGuard();

// systemd sd_notify (Type=notify / WatchdogSec=): this process is the one
// whose event loop can freeze (cold /v1/models rebuild), so it must own the
// watchdog pings — a blocked loop stops the pings and systemd kills the
// service. No-op outside systemd (no NOTIFY_SOCKET).
const systemdNotifier = createSystemdNotifier();
let systemdReadySent = false;

const originalCreateServer = http.createServer.bind(http);
const proxiesByPort = new Map();
/** Every server created through the patched factory (Next's main listener included). */
const createdServers = new Set();

// Shutdown ownership (same model as scripts/dev/run-next.mjs, #12074). Next's start-server
// registers SIGINT/SIGTERM handlers that server.close() and then process.exit(143) as soon as no
// connection is left. That raced OmniRoute's async cleanup (src/lib/gracefulShutdown.ts: spend
// batch flush, call-log flush, DB checkpoint) and usually won, so a SIGTERM (docker stop,
// systemctl stop, Ctrl+C) dropped that work. This wrapper owns process exit instead:
//   - NEXT_MANUAL_SIG_HANDLE tells Next not to install its handlers. Next reads it once, in its
//     'listening' handler; it is cleared right after (see the factory below) so spawned children
//     (embedded services, some of them Next apps) do not inherit it and ignore SIGTERM.
//   - __omnirouteCustomServerOwnsShutdown makes initGracefulShutdown() register its cleanup as
//     globalThis.__omnirouteRequestShutdown instead of installing competing signal listeners.
// Both must be set before ./server.js loads.
// Consequence: Next's own SIGTERM handler is disabled in standalone, so its nextServer.close()
// no longer runs and pending after() / waitUntil work is NOT awaited on shutdown. Anyone adding a
// data-writing after() must flush it in OmniRoute's shutdown (src/lib/gracefulShutdown.ts).
// Empty or unset counts as "not set" (an empty value is falsy for Next, which would install its
// handler and bring back the exit-143 race).
const ownsNextSignalEnv = !process.env.NEXT_MANUAL_SIG_HANDLE;
if (ownsNextSignalEnv) process.env.NEXT_MANUAL_SIG_HANDLE = "1";
globalThis.__omnirouteCustomServerOwnsShutdown = true;

// Bounded: gracefulShutdown waits up to SHUTDOWN_TIMEOUT_MS for in-flight requests, then cleans
// up; the margin covers the flush/checkpoint work.
const SHUTDOWN_CLEANUP_MARGIN_MS = 5000;
function resolveForceExitMs() {
  const drainMs = Number.parseInt(process.env.SHUTDOWN_TIMEOUT_MS || "30000", 10);
  return (Number.isFinite(drainMs) && drainMs >= 0 ? drainMs : 30000) + SHUTDOWN_CLEANUP_MARGIN_MS;
}

let shutdownStarted = false;
async function shutdown(signal) {
  // Duplicate signals are normal (a terminal Ctrl+C reaches both this process and the parent
  // launcher, which forwards SIGTERM too); the force-exit timer bounds the whole sequence.
  if (shutdownStarted) return;
  shutdownStarted = true;
  const forceExitMs = resolveForceExitMs();
  const forceExitTimer = setTimeout(() => {
    console.warn(`[Shutdown] Cleanup still running after ${forceExitMs}ms; forcing exit.`);
    process.exit(0);
  }, forceExitMs);
  forceExitTimer.unref?.();
  systemdNotifier.stopping();
  try {
    // Stop accepting connections; in-flight requests keep running until the drain below.
    for (const server of createdServers) {
      if (server.listening) server.close(() => {});
      server.closeIdleConnections?.();
    }
  } catch (error) {
    console.error("[Shutdown] Closing HTTP servers failed:", error?.message ?? error);
  }
  try {
    // Undefined when instrumentation never got that far (signal during boot): just exit.
    await globalThis.__omnirouteRequestShutdown?.(signal);
  } catch (error) {
    console.error("[Shutdown] Cleanup failed during", signal, error?.message ?? error);
  } finally {
    clearTimeout(forceExitTimer);
    // One macrotask before exit (#13306: let sql.js/libuv teardown settle on Windows).
    setTimeout(() => process.exit(0), 0);
  }
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
// #8045: Windows maps console-window close to SIGHUP; gracefulShutdown used to handle it here.
process.on("SIGHUP", () => void shutdown("SIGHUP"));

const { wrapRequestListenerWithMethodGuard } = methodGuard;
const { wrapRequestListenerWithHeadResponseGuard } = headResponseGuard;

// Opt-in native HTTPS (#5242). Resolved once at boot: when both OMNIROUTE_TLS_CERT
// and OMNIROUTE_TLS_KEY point at readable files we terminate TLS on the same
// listener Next binds to (so WS `upgrade` / request wrappers keep working over
// TLS). Absent or misconfigured → null → identical plain-HTTP behavior as before.
const tlsOptions = resolveTlsOptions(process.env);
process.env.OMNIROUTE_INTERNAL_SCHEME = tlsOptions ? "https" : "http";
if (tlsOptions) {
  console.log(`[omniroute][tls] HTTPS enabled — terminating TLS with cert=${tlsOptions.certPath}`);
}

process.env.OMNIROUTE_WS_BRIDGE_SECRET ||= randomUUID();
// Per-process secret proving the trusted peer-IP stamp came from this server.
ensurePeerStampToken();

function getPort(server) {
  const address = server.address?.();
  if (address && typeof address === "object" && typeof address.port === "number") {
    return address.port;
  }
  const rawPort = process.env.PORT || process.env.DASHBOARD_PORT || "3000";
  const parsed = Number.parseInt(rawPort, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 3000;
}

function getProxy(server) {
  const port = getPort(server);
  const existing = proxiesByPort.get(port);
  if (existing) return existing;

  const proxy = createResponsesWsProxy({
    baseUrl: `http://127.0.0.1:${port}`,
    bridgeSecret: process.env.OMNIROUTE_WS_BRIDGE_SECRET,
  });
  proxiesByPort.set(port, proxy);
  return proxy;
}

function deriveLiveWsPath() {
  const publicUrl = process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL;
  if (!publicUrl) return "/live-ws";
  if (!publicUrl.startsWith("ws://") && !publicUrl.startsWith("wss://")) return "/live-ws";
  try {
    const parsed = new URL(publicUrl);
    const pathname = parsed.pathname;
    return pathname && pathname !== "/" ? pathname : "/live-ws";
  } catch {
    return "/live-ws";
  }
}

const LIVE_WS_PATH = deriveLiveWsPath();

function proxyLiveWs(req, socket, head) {
  const targetPort = parseInt(process.env.LIVE_WS_PORT || "20132", 10);
  const targetSocket = net.connect(targetPort, "127.0.0.1", () => {
    let rawRequest = `${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`;
    for (const [key, val] of Object.entries(req.headers)) {
      if (Array.isArray(val)) {
        for (const v of val) rawRequest += `${key}: ${v}\r\n`;
      } else {
        rawRequest += `${key}: ${val}\r\n`;
      }
    }
    rawRequest += "\r\n";
    targetSocket.write(rawRequest);
    if (head && head.length > 0) targetSocket.write(head);
    targetSocket.pipe(socket);
    socket.pipe(targetSocket);
  });

  targetSocket.on("error", () => !socket.destroyed && socket.destroy());
  socket.on("error", () => !targetSocket.destroyed && targetSocket.destroy());
}

function wrapUpgradeListener(server, listener) {
  return async function responsesWsAwareUpgrade(req, socket, head) {
    try {
      // If this server IS the LiveWS server (port 20132), the ws library's
      // own upgrade handler should process the request directly — proxying
      // /live-ws back to 127.0.0.1:20132 would create an infinite self-loop.
      const liveWsPort = parseInt(process.env.LIVE_WS_PORT || "20132", 10);
      if (getPort(server) === liveWsPort) {
        return listener.call(this, req, socket, head);
      }

      const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
      if (url.pathname === LIVE_WS_PATH || url.pathname.startsWith(LIVE_WS_PATH + "/")) {
        proxyLiveWs(req, socket, head);
        return;
      }
      const handled = await getProxy(server).handleUpgrade(req, socket, head);
      if (handled) return;
      return listener.call(this, req, socket, head);
    } catch (error) {
      if (!socket.destroyed) {
        socket.destroy(error instanceof Error ? error : undefined);
      }
      console.error("[Responses WS] Upgrade handling failed:", error);
    }
  };
}

/**
 * Wrap a request listener so WebDAV requests at /api/v1/webdav are handled
 * before the peer-stamp/Next.js layer sees them.
 * Returns true if the request was handled; the wrapped listener is never called.
 */
function wrapRequestListenerWithWebdav(listener) {
  return function webdavAwareRequestHandler(req, res) {
    if (!(req.url || "").startsWith(WEBDAV_PREFIX)) {
      return listener.call(this, req, res);
    }
    const self = this;
    (async () => {
      try {
        const handled = await maybeHandleWebdav(req, res);
        if (handled) return;
      } catch {
        // Never block a request on WebDAV errors — fall through to Next
      }
      return listener.call(self, req, res);
    })();
  };
}

http.createServer = function createServerWithResponsesWs(...args) {
  // Next's standalone server.js may pass its request listener directly to
  // createServer; wrap it so the real TCP peer IP is stamped before Next runs.
  const lastFnIdx = args.map((a) => typeof a === "function").lastIndexOf(true);
  if (lastFnIdx >= 0) {
    // Method guard runs before Next because Next 16 rejects TRACE while constructing requests.
    // Head-response guard wraps outermost so it sees (and can force-close) every
    // HEAD request regardless of which inner layer ends up handling it (#6400).
    args[lastFnIdx] = wrapRequestListenerWithHeadResponseGuard(
      wrapRequestListenerWithMethodGuard(
        wrapRequestListenerWithWebdav(wrapRequestListenerWithPeerStamp(args[lastFnIdx]))
      )
    );
  }

  // When TLS is configured, return an https.Server (terminating TLS on the same
  // listener); otherwise the original http.Server. The downstream .on/.addListener
  // patches below apply identically to both (https.Server extends http.Server).
  const server = createServerListener(args, tlsOptions, { createHttp: originalCreateServer });
  createdServers.add(server);
  server.once("close", () => createdServers.delete(server));
  // Node's http.Server default keepAliveTimeout (5_000ms) races pooled
  // keep-alive HTTP clients that idle longer than that between requests (e.g.
  // the JVM java.net.http.HttpClient used by JetBrains AI Assistant), which
  // reuse a socket the server already tore down and get 0 response bytes back
  // (#7003). This wrapper is what `omniroute serve` / Docker / Electron actually
  // spawn in production (run-standalone.mjs prefers server-ws.mjs over the bare
  // Next server.js), so it needs the same fix already wired into run-next.mjs
  // (the dev-only entry point) — otherwise real installs never got it. Raise
  // both timeouts well above any realistic client idle-pool window, mirroring
  // src/lib/apiBridgeServer.ts's pattern.
  const mainServerTimeouts = getMainServerTimeoutConfig();
  server.keepAliveTimeout = mainServerTimeouts.keepAliveTimeoutMs;
  server.headersTimeout = mainServerTimeouts.headersTimeoutMs;
  const originalOn = server.on.bind(server);
  const originalAddListener = server.addListener.bind(server);

  server.on = function patchedOn(eventName, listener) {
    if (eventName === "upgrade" && typeof listener === "function") {
      return originalOn(eventName, wrapUpgradeListener(server, listener));
    }
    // …or it may attach the handler via server.on("request"): wrap that too.
    if (eventName === "request" && typeof listener === "function") {
      return originalOn(
        eventName,
        wrapRequestListenerWithHeadResponseGuard(
          wrapRequestListenerWithMethodGuard(
            wrapRequestListenerWithWebdav(wrapRequestListenerWithPeerStamp(listener))
          )
        )
      );
    }
    return originalOn(eventName, listener);
  };

  server.addListener = function patchedAddListener(eventName, listener) {
    if (eventName === "upgrade" && typeof listener === "function") {
      return originalAddListener(eventName, wrapUpgradeListener(server, listener));
    }
    if (eventName === "request" && typeof listener === "function") {
      return originalAddListener(
        eventName,
        wrapRequestListenerWithHeadResponseGuard(
          wrapRequestListenerWithMethodGuard(
            wrapRequestListenerWithWebdav(wrapRequestListenerWithPeerStamp(listener))
          )
        )
      );
    }
    return originalAddListener(eventName, listener);
  };

  // sd_notify READY once the main listener is actually accepting, then arm
  // the watchdog keep-alive interval (unref'd — never keeps the process up).
  server.once("listening", () => {
    // Next reads NEXT_MANUAL_SIG_HANDLE synchronously in its own 'listening' handler, which runs
    // right after this one; clear it on the next turn so child processes never inherit it.
    if (ownsNextSignalEnv) {
      setImmediate(() => {
        delete process.env.NEXT_MANUAL_SIG_HANDLE;
      });
    }
    if (systemdReadySent) return;
    systemdReadySent = true;
    systemdNotifier.ready();
    systemdNotifier.startWatchdog();
  });

  return server;
};

await import("./server.js");
