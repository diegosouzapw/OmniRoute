import { EventEmitter } from "node:events";

/**
 * Keeps Next's own WebSocket upgrade listener off the custom HTTP server.
 *
 * `next()` (NextCustomServer.setupWebSocketHandler) attaches its router upgrade handler on the
 * first request it serves, to `options.httpServer || req.socket.server`. On the run-next.mjs
 * server that listener runs *alongside* the custom dispatcher, sees every upgrade, and
 * `socket.end()`s any whose path resolves to an app route (router-server.js: `if (matchedOutput)
 * return socket.end()`). `/v1/responses` and `/v1/ws` resolve to `/api/v1/...` app routes, so the
 * sockets the Responses WebSocket proxy and the /v1/ws bridge had already claimed were cut.
 *
 * Pass `target` as next()'s `httpServer`: Next then attaches to this relay instead, and the
 * dispatcher calls `forward()` only for upgrades nothing else claimed (e.g. dev HMR). Note that
 * `nextApp.getUpgradeHandler()` is a no-op in Next 16 (NextNodeServer.handleUpgrade is empty),
 * so this relay is the only path HMR upgrades reach Next's router.
 */
export function createNextUpgradeRelay() {
  const target = new EventEmitter();
  return {
    target,
    /** @returns true when Next's upgrade listener was attached and received the upgrade. */
    forward(req, socket, head) {
      if (target.listenerCount("upgrade") === 0) return false;
      target.emit("upgrade", req, socket, head);
      return true;
    },
  };
}
