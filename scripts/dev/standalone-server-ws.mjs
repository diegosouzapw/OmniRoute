import http from "node:http";
import { randomUUID } from "node:crypto";
import { createResponsesWsProxy } from "./responses-ws-proxy.mjs";
import { ensurePeerStampToken, wrapRequestListenerWithPeerStamp } from "./peer-stamp.mjs";
import { maybeHandleWebdav } from "./webdav-handler.mjs";

const originalCreateServer = http.createServer.bind(http);
const proxiesByPort = new Map();

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

/**
 * Wrap a request listener so WebDAV requests at /api/v1/webdav are handled
 * before the peer-stamp/Next.js layer sees them.
 * Returns true if the request was handled; the wrapped listener is never called.
 */
function wrapRequestListenerWithWebdav(listener) {
  return async function webdavAwareRequestHandler(req, res) {
    try {
      const handled = await maybeHandleWebdav(req, res);
      if (handled) return;
    } catch {
      // Never block a request on WebDAV errors — fall through to Next
    }
    return listener.call(this, req, res);
  };
}

http.createServer = function createServerWithResponsesWs(...args) {
  // Next's standalone server.js may pass its request listener directly to
  // createServer; wrap it so the real TCP peer IP is stamped before Next runs.
  const lastFnIdx = args.map((a) => typeof a === "function").lastIndexOf(true);
  if (lastFnIdx >= 0) {
    // WebDAV intercept wraps outermost (first to run), then peer-stamp, then Next.
    args[lastFnIdx] = wrapRequestListenerWithWebdav(
      wrapRequestListenerWithPeerStamp(args[lastFnIdx])
    );
  }

  const server = originalCreateServer(...args);
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
        wrapRequestListenerWithWebdav(wrapRequestListenerWithPeerStamp(listener))
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
        wrapRequestListenerWithWebdav(wrapRequestListenerWithPeerStamp(listener))
      );
    }
    return originalAddListener(eventName, listener);
  };

  return server;
};

await import("./server.js");
