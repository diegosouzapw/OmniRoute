// scripts/dev/tls-options.mjs
//
// Pure, dependency-light helpers for OmniRoute's opt-in native HTTPS/TLS serving
// (#5242, Bug 1C). Kept side-effect-free and free of heavy imports so it can be
// imported both by the CLI (bin/cli/commands/serve.mjs) and by the standalone
// server wrapper (standalone-server-ws.mjs), and unit-tested in isolation.
//
// TLS is strictly opt-in: when neither cert nor key is provided the server
// behaves EXACTLY as before (plain HTTP). A misconfiguration (only one of the
// pair, or an unreadable path) NEVER crashes the server — it logs a warning and
// falls back to HTTP, preserving today's behavior and loopback/security posture.

import fs from "node:fs";
import http from "node:http";
import https from "node:https";

/**
 * Resolve TLS options from environment variables.
 *
 * Reads `OMNIROUTE_TLS_CERT` and `OMNIROUTE_TLS_KEY` (filesystem paths). Returns
 * `{ cert, key }` (file contents) only when BOTH are provided and readable.
 * Otherwise returns `null` so the caller serves plain HTTP — never throwing.
 *
 * @param {NodeJS.ProcessEnv} [env=process.env]
 * @param {{ readFileSync?: typeof fs.readFileSync, warn?: (msg: string) => void }} [deps]
 * @returns {{ cert: Buffer|string, key: Buffer|string, certPath: string, keyPath: string } | null}
 */
export function resolveTlsOptions(
  env = process.env,
  { readFileSync = fs.readFileSync, warn = (m) => console.warn(m) } = {}
) {
  const certPath = typeof env?.OMNIROUTE_TLS_CERT === "string" ? env.OMNIROUTE_TLS_CERT.trim() : "";
  const keyPath = typeof env?.OMNIROUTE_TLS_KEY === "string" ? env.OMNIROUTE_TLS_KEY.trim() : "";

  // Neither provided → plain HTTP, no warning (the common, default case).
  if (!certPath && !keyPath) return null;

  // Only one of the pair → never half-enable TLS. Warn + fall back to HTTP.
  if (!certPath || !keyPath) {
    warn(
      `[omniroute][tls] HTTPS not enabled: both OMNIROUTE_TLS_CERT and OMNIROUTE_TLS_KEY ` +
        `are required (only ${certPath ? "cert" : "key"} provided). Serving HTTP.`
    );
    return null;
  }

  // Both provided → read them. A bad/unreadable path falls back to HTTP rather
  // than crashing the server over a TLS misconfiguration.
  try {
    const cert = readFileSync(certPath);
    const key = readFileSync(keyPath);
    return { cert, key, certPath, keyPath };
  } catch (err) {
    warn(
      `[omniroute][tls] HTTPS not enabled: could not read TLS cert/key ` +
        `(${err?.code || err?.message || String(err)}). Serving HTTP.`
    );
    return null;
  }
}

/**
 * Create either an `https.Server` (when `tlsOptions` is provided) or an
 * `http.Server` (when it is `null`), forwarding the same request-listener /
 * options arguments the caller would otherwise pass to `http.createServer`.
 *
 * When TLS is enabled, any leading options object is merged with `cert`/`key`
 * and the trailing request listener is preserved, so existing wiring (WebSocket
 * `upgrade` handling, request wrappers) keeps working over TLS unchanged.
 *
 * @param {any[]} args - the args originally passed to http.createServer (options?, listener?)
 * @param {{ cert: Buffer|string, key: Buffer|string } | null} tlsOptions
 * @param {{ createHttp?: Function, createHttps?: Function }} [deps]
 * @returns {import("node:http").Server | import("node:https").Server}
 */
export function createServerListener(
  args,
  tlsOptions,
  { createHttp = http.createServer.bind(http), createHttps = https.createServer.bind(https) } = {}
) {
  const argList = Array.isArray(args) ? args : args === undefined ? [] : [args];

  if (!tlsOptions) return createHttp(...argList);

  const { cert, key } = tlsOptions;
  const lastFnIdx = argList.map((a) => typeof a === "function").lastIndexOf(true);
  const listener = lastFnIdx >= 0 ? argList[lastFnIdx] : undefined;
  const baseOpts =
    argList[0] && typeof argList[0] === "object" && !Buffer.isBuffer(argList[0]) ? argList[0] : {};
  const merged = { ...baseOpts, cert, key };
  return listener ? createHttps(merged, listener) : createHttps(merged);
}
