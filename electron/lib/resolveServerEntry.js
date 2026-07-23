/**
 * resolveServerEntry.js — pure helper for selecting the Next.js server entrypoint.
 *
 * The WS-aware wrapper `server-ws.mjs` installs the trusted peer-IP stamp
 * (peer-stamp.mjs) that the authz middleware needs to allow loopback/LAN access
 * to LOCAL_ONLY routes (AgentBridge, MCP, services, etc.).  Without it every
 * LOCAL_ONLY request returns 403.
 *
 * We prefer `server-ws.mjs` when it exists — mirroring run-standalone.mjs — and
 * fall back to the bare `server.js` only when the wrapper is absent (e.g. an
 * older build or a stripped bundle).
 *
 * Extracted as a pure helper so it can be unit-tested without importing the full
 * Electron main process (which requires the Electron binary).
 *
 * @param {string}   serverDir   - directory that contains server.js / server-ws.mjs
 * @param {Function} existsSyncFn - injectable fs.existsSync (for unit tests)
 * @returns {string} filename ("server-ws.mjs" or "server.js")
 */
function resolveServerEntry(serverDir, existsSyncFn) {
  const path = require("path");
  const wsEntry = path.join(serverDir, "server-ws.mjs");
  return existsSyncFn(wsEntry) ? "server-ws.mjs" : "server.js";
}

module.exports = { resolveServerEntry };
