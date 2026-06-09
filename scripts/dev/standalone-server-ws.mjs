import http from "node:http";
import { randomUUID } from "node:crypto";
import { createResponsesWsProxy } from "./responses-ws-proxy.mjs";
import { ensurePeerStampToken, wrapRequestListenerWithPeerStamp } from "./peer-stamp.mjs";

const originalCreateServer = http.createServer.bind(http);
const proxiesByPort = new Map();

// #3416: keep the event loop alive across the async startServer() gap. Next's
// standalone server.js calls startServer() fire-and-forget; under systemd (Type=simple,
// no TTY, fast exec) this module can finish evaluating before server.listen() binds,
// leaving zero active handles so Node exits 0 — which systemd reads as a clean exit and
// restarts, cycling the service (active → deactivated → restart …). A ref'd no-op
// interval holds the loop until the HTTP server reaches "listening" (its socket then
// keeps the loop alive), with a safety timeout so a server that never binds still exits
// naturally instead of hanging.
let __startupKeepAlive = null;
let __startupKeepAliveTimeout = null;
function clearStartupKeepAlive() {
  if (__startupKeepAlive) {
    clearInterval(__startupKeepAlive);
    __startupKeepAlive = null;
  }
  if (__startupKeepAliveTimeout) {
    clearTimeout(__startupKeepAliveTimeout);
    __startupKeepAliveTimeout = null;
  }
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

function wrapUpgradeListener(server, listener) {
  return async function responsesWsAwareUpgrade(req, socket, head) {
    try {
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

http.createServer = function createServerWithResponsesWs(...args) {
  // Next's standalone server.js may pass its request listener directly to
  // createServer; wrap it so the real TCP peer IP is stamped before Next runs.
  const lastFnIdx = args.map((a) => typeof a === "function").lastIndexOf(true);
  if (lastFnIdx >= 0) {
    args[lastFnIdx] = wrapRequestListenerWithPeerStamp(args[lastFnIdx]);
  }

  const server = originalCreateServer(...args);
  // Once the server is actually listening its socket keeps the loop alive, so the
  // startup keep-alive is no longer needed (#3416).
  server.once("listening", clearStartupKeepAlive);
  const originalOn = server.on.bind(server);
  const originalAddListener = server.addListener.bind(server);

  server.on = function patchedOn(eventName, listener) {
    if (eventName === "upgrade" && typeof listener === "function") {
      return originalOn(eventName, wrapUpgradeListener(server, listener));
    }
    // …or it may attach the handler via server.on("request"): wrap that too.
    if (eventName === "request" && typeof listener === "function") {
      return originalOn(eventName, wrapRequestListenerWithPeerStamp(listener));
    }
    return originalOn(eventName, listener);
  };

  server.addListener = function patchedAddListener(eventName, listener) {
    if (eventName === "upgrade" && typeof listener === "function") {
      return originalAddListener(eventName, wrapUpgradeListener(server, listener));
    }
    if (eventName === "request" && typeof listener === "function") {
      return originalAddListener(eventName, wrapRequestListenerWithPeerStamp(listener));
    }
    return originalAddListener(eventName, listener);
  };

  return server;
};

// Start the keep-alive immediately before handing off to Next's standalone server,
// so the loop survives the async window before server.listen() binds (#3416). It is
// cleared on the "listening" event (above) or after a safety window if the server
// never binds.
__startupKeepAlive = setInterval(() => {}, 1000);
__startupKeepAliveTimeout = setTimeout(clearStartupKeepAlive, 60_000);
__startupKeepAliveTimeout.unref?.();

await import("./server.js");
