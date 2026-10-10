"use strict";

// =========================================================================
// Loopback peer guard for the standalone CommonJS `server.cjs` proxy
// (GHSA-qxg2-rm3h-4cxp). The listener stays dual-stack because the DNS spoof
// points target hosts at BOTH 127.0.0.1 and ::1, so the restriction lives on
// the accepted socket instead of the bind address. Kept in its own module so
// it can be unit-tested — `server.cjs` itself binds a port on load.
// =========================================================================

const net = require("net");

/**
 * True for 127.0.0.0/8, ::1 and IPv4-mapped loopback (::ffff:127.x.y.z).
 *
 * @param {string | null | undefined} address
 * @returns {boolean}
 */
function isLoopbackPeer(address) {
  if (typeof address !== "string" || address === "") return false;
  let addr = address.toLowerCase();
  if (addr.startsWith("::ffff:")) addr = addr.slice("::ffff:".length);
  if (net.isIPv4(addr)) return addr.startsWith("127.");
  return addr === "::1";
}

/**
 * Remote (non-loopback) clients are refused unless the operator opts in
 * explicitly, e.g. to share one MITM host across a trusted LAN.
 *
 * @param {NodeJS.ProcessEnv} env
 * @returns {boolean}
 */
function allowRemoteClients(env) {
  const raw = String((env && env.MITM_ALLOW_REMOTE_CLIENTS) || "")
    .trim()
    .toLowerCase();
  return raw === "1" || raw === "true";
}

/**
 * Destroy `socket` when its peer is not loopback (and remote clients are not
 * allowed). Returns whether the socket may proceed.
 *
 * @param {{ remoteAddress?: string | null, destroy: () => void }} socket
 * @param {NodeJS.ProcessEnv} [env]
 * @returns {boolean}
 */
function guardLoopbackPeer(socket, env = process.env) {
  if (isLoopbackPeer(socket.remoteAddress) || allowRemoteClients(env)) return true;
  socket.destroy();
  return false;
}

module.exports = { isLoopbackPeer, allowRemoteClients, guardLoopbackPeer };
