"use strict";

// =========================================================================
// IPv6 loopback listener for the standalone CommonJS `server.cjs` proxy.
// The MITM binds to 127.0.0.1 only (GHSA-qxg2-rm3h-4cxp), but the DNS spoof
// writes both `127.0.0.1 <host>` and `::1 <host>` to /etc/hosts, so a client
// that resolves `::1` first and does not fall back to IPv4 was refused. This
// second listener accepts on `::1` and hands every socket to the same server.
// Kept in its own module so it can be exercised directly by unit tests —
// `server.cjs` itself binds a port on load.
// =========================================================================

const MITM_IPV6_LOOPBACK_HOST = "::1";

/**
 * Listen on `[::1]:port` and forward each accepted socket to `server` via
 * `emit("connection")`, the same hand-off the CONNECT "target" tunnel uses.
 * A listen error (no IPv6 on the host, port taken on ::1) is logged and the
 * IPv4 listener keeps serving. The listener closes with `server`.
 *
 * @param {NodeJS.EventEmitter} server
 * @param {number} port
 * @param {(message: string) => void} log
 * @param {{ createServer: Function }} [netImpl] `net` by default; injectable for tests
 */
function listenIpv6Loopback(server, port, log, netImpl = require("net")) {
  const listener = netImpl.createServer((socket) => server.emit("connection", socket));
  listener.on("error", (error) => {
    log(
      `[MITM] IPv6 loopback listener on [${MITM_IPV6_LOOPBACK_HOST}]:${port} unavailable ` +
        `(${error.code || error.message}); serving IPv4 loopback only`
    );
  });
  server.once("close", () => listener.close());
  listener.listen(port, MITM_IPV6_LOOPBACK_HOST);
  return listener;
}

module.exports = { listenIpv6Loopback, MITM_IPV6_LOOPBACK_HOST };
