#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import next from "next";
import { bootstrapEnv } from "../build/bootstrap-env.mjs";
import { resolveRuntimePorts, withRuntimePortEnv } from "../build/runtime-env.mjs";
import { createOmnirouteWsBridge } from "./v1-ws-bridge.mjs";
import { createResponsesWsProxy } from "./responses-ws-proxy.mjs";
import { ensurePeerStampToken, stampPeerIp } from "./peer-stamp.mjs";
import methodGuard from "./http-method-guard.cjs";
import headResponseGuard from "./head-response-guard.cjs";
import { ensureNativeSqlite } from "./ensure-native-sqlite.mjs";
import { isTurbopackCacheCorruption, purgeAllTurbopackCaches } from "./turbopackCacheHeal.mjs";
import { randomUUID } from "node:crypto";
import { getMainServerTimeoutConfig } from "./main-server-timeouts.mjs";
import { createSystemdNotifier } from "./systemd-notify.mjs";
import { attachRequestStreamGuards, installProcessCrashGuard } from "./httpClientAbortGuard.mjs";

const { maybeHandleDisallowedMethod } = methodGuard;
const { wrapRequestListenerWithHeadResponseGuard } = headResponseGuard;

// Pre-read DATA_DIR from local .env before bootstrap resolves paths
if (!process.env.DATA_DIR) {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), ".env"), "utf8");
    const match = raw.match(/^DATA_DIR=(.+)$/m);
    if (match?.[1]?.trim()) process.env.DATA_DIR = match[1].trim();
  } catch {
    /* .env ausente ou ilegível — ok, bootstrap usa o padrão */
  }
}

// Add check for conflicting app/ directory (Issue #1206)
const rootAppDir = path.join(process.cwd(), "app");
if (fs.existsSync(rootAppDir) && fs.statSync(rootAppDir).isDirectory()) {
  console.error("\x1b[31m[FATAL ERROR]\x1b[0m Next.js App Router conflict detected!");
  console.error(`A root-level 'app/' directory was found at: ${rootAppDir}`);
  console.error("This conflicts with the 'src/app/' directory on Windows environments.");
  console.error("Next.js will serve 404s for all pages because it prefers the root 'app/' folder.");
  console.error("Please rename or delete the root 'app/' directory before starting OmniRoute.\n");
  process.exit(1);
}

const mode = process.argv[2] === "start" ? "start" : "dev";
const dev = mode === "dev";

// Self-heal a stale better-sqlite3 native binary after a Node version switch
// (nvm 22 <-> 24) before bootstrap touches the DB. No-op when the ABI matches.
if (dev) {
  ensureNativeSqlite();
}

const bootstrappedEnv = bootstrapEnv();
const runtimePorts = resolveRuntimePorts(bootstrappedEnv);
const mergedEnv = withRuntimePortEnv(bootstrappedEnv, runtimePorts);

for (const [key, value] of Object.entries(mergedEnv)) {
  if (value !== undefined) {
    process.env[key] = value;
  }
}

// E2E open-mode bootstrap (#11535). Test harnesses that boot THIS server (protocol
// clients E2E) rely on an auth-disabled "open" bootstrap so management endpoints such
// as /api/mcp/audit are genuinely exercised unauthenticated (200), not short-circuited
// by a stray credential. bootstrap-env.mjs deliberately drops empty strings from
// process.env/.env/server.env, so an INITIAL_PASSWORD="" injected by a harness cannot
// survive the merge above and any INITIAL_PASSWORD persisted in .env or server.env
// would leak back in (401 → green-shallow suite).
// Cleared to EMPTY STRING (not deleted): Next's env loader re-reads the repo .env
// during app prepare(), AFTER this point — an absent var would be re-populated from
// the file and src/instrumentation-node.ts would bcrypt-persist it as a real login
// (401s everywhere). An existing empty var is falsy to every consumer AND wins over
// dotenv's no-override load, mirroring run-next-playwright.mjs's open-mode overrides.
// Gated on the test-only env var so production boots are untouched.
if (process.env.OMNIROUTE_E2E_BOOTSTRAP_MODE === "open") {
  process.env.INITIAL_PASSWORD = "";
  process.env.OMNIROUTE_E2E_PASSWORD = "";
  process.env.OMNIROUTE_API_KEY = "";
}

// systemd sd_notify (Type=notify / WatchdogSec=): this process owns the
// watchdog pings — if its event loop blocks (freeze), the pings stop and
// systemd kills the service. No-op outside systemd (no NOTIFY_SOCKET).
// Created AFTER .env is merged so the OMNIROUTE_DISABLE_SD_NOTIFY opt-out
// documented in .env is honored on this path too.
const systemdNotifier = createSystemdNotifier();

// The mergedEnv copy above pulls NODE_ENV straight from `.env` — and the shipped
// `.env.example` default is `NODE_ENV=production`. Next's programmatic `next()`
// entry (unlike the `next` CLI) trusts that value verbatim, so `npm run dev`
// would boot the dev bundler with NODE_ENV=production. That desyncs Next's
// webpack CSS pipeline and `src/app/globals.css` reaches webpack's JS parser
// instead of PostCSS — failing as `Module parse failed: Unexpected character
// '@'` on the `@import "tailwindcss"` line. Force NODE_ENV to track the run
// mode, exactly like the `next` CLI does.
process.env.NODE_ENV = dev ? "development" : "production";
process.env.OMNIROUTE_INTERNAL_SCHEME = "http";

const { dashboardPort } = runtimePorts;
const hostname = process.env.HOST || "0.0.0.0";
// Turbopack by default in dev (matches the Next 16 CLI default and the production
// build default in build-next-isolated.mjs); OMNIROUTE_USE_TURBOPACK=0 is the
// webpack escape hatch. Under Bun, Turbopack native V8 bindings are unavailable,
// so Bun automatically disables Turbopack and uses Webpack.
const isBun = Boolean(process.versions.bun);
const useTurbopack = dev && mergedEnv.OMNIROUTE_USE_TURBOPACK !== "0" && !isBun;
process.env.OMNIROUTE_WS_BRIDGE_SECRET ||= randomUUID();
// Per-process secret used to prove the trusted peer-IP stamp came from this
// server (read by the authz middleware in the same process). See peer-stamp.mjs.
ensurePeerStampToken();

// Next 16 picks Turbopack by default in dev. Passing `turbopack: false` to the
// programmatic next() entry is *not* enough on its own:
//   - parseBundlerArgs (node_modules/next/dist/lib/bundler.js) sees no positive
//     bundler flag and falls back to `process.env.TURBOPACK = 'auto'`.
//   - next-dev-server.js then reads `process.env.TURBOPACK` directly and
//     starts Turbopack regardless of the option we passed.
// Force webpack by both passing `webpack: true` and clearing the env var.
// Mirrors the workaround PR #4052 applied for the production Docker build.
if (!useTurbopack) {
  delete process.env.TURBOPACK;
}
function createNextApp() {
  return next({
    dev,
    dir: process.cwd(),
    hostname,
    port: dashboardPort,
    turbopack: useTurbopack,
    webpack: !useTurbopack,
  });
}

// The custom HTTP server owns process exit. Application instrumentation still
// registers its cleanup function, but must not install a competing signal
// listener that can race this runner's async server/Next teardown.
globalThis.__omnirouteCustomServerOwnsShutdown = true;

let nextApp = createNextApp();

// Best-effort self-heal for a corrupted Turbopack persistent dev cache (#6289):
// on Windows an mmap of an SST cache file can fail ("os error 1455" / paging
// file too small), which Turbopack surfaces as a misleading module-resolve
// error. This is an UPSTREAM Turbopack cache-corruption bug — not our code.
// When `prepare()` rejects with that signature we purge the cache and retry
// ONCE. Caveat: the failure often surfaces as a runtime overlay rather than a
// `prepare()` rejection, so this cannot always intercept it — the reliable
// remedy remains manually deleting `.build/next/**/cache/turbopack`.
async function prepareWithHeal() {
  try {
    await nextApp.prepare();
  } catch (error) {
    const detail =
      error instanceof Error ? `${error.message}\n${error.stack ?? ""}` : String(error);
    if (!useTurbopack || !isTurbopackCacheCorruption(detail)) throw error;
    console.warn(
      "[Next] Turbopack dev cache looks corrupted (Windows mmap / os error 1455 — known upstream bug). Purging and retrying once…"
    );
    const removed = purgeAllTurbopackCaches();
    for (const dir of removed) console.warn(`[Next] purged Turbopack cache: ${dir}`);
    nextApp = createNextApp();
    await nextApp.prepare();
    console.warn("[Next] Turbopack dev cache purged; startup retry succeeded.");
  }
}

async function start() {
  // Safety net: a client aborting a connection (browser navigation, HMR reconnect,
  // Back/Forward cache) can emit `Error: aborted`/`ECONNRESET` on the request
  // stream. Without this the single missed listener becomes an uncaughtException
  // that takes the whole server down — surfacing as a wall of ERR_CONNECTION_REFUSED
  // after login. Benign aborts are swallowed; genuine errors still crash loudly.
  installProcessCrashGuard();

  await prepareWithHeal();

  const requestHandler = nextApp.getRequestHandler();
  const upgradeHandler = nextApp.getUpgradeHandler();
  const responsesWsProxy = createResponsesWsProxy({
    baseUrl: `http://127.0.0.1:${dashboardPort}`,
    bridgeSecret: process.env.OMNIROUTE_WS_BRIDGE_SECRET,
  });
  const wsBridge = createOmnirouteWsBridge({
    baseUrl: `http://127.0.0.1:${dashboardPort}`,
  });

  const server = http.createServer(
    wrapRequestListenerWithHeadResponseGuard((req, res) => {
      // Absorb client-abort errors (browser closes the socket during
      // navigation/HMR/bfcache) on the request/response streams so they never
      // surface as an uncaughtException that kills the whole server (#fix-dev-server-aborted).
      attachRequestStreamGuards(req, res);
      if (maybeHandleDisallowedMethod(req, res)) return;
      // Stamp the real TCP peer IP before Next sees the request, so the authz
      // middleware can decide LOCAL_ONLY locality without trusting the Host header.
      stampPeerIp(req);
      return requestHandler(req, res);
    })
  );
  // Node's http.Server default keepAliveTimeout (5_000ms) races pooled
  // keep-alive HTTP clients that idle longer than that between requests (e.g.
  // the JVM java.net.http.HttpClient used by JetBrains AI Assistant), which
  // reuse a socket the server already tore down and get 0 response bytes back
  // (#7003). Raise both timeouts well above any realistic client idle-pool
  // window, mirroring src/lib/apiBridgeServer.ts's pattern.
  const mainServerTimeouts = getMainServerTimeoutConfig();
  server.keepAliveTimeout = mainServerTimeouts.keepAliveTimeoutMs;
  server.headersTimeout = mainServerTimeouts.headersTimeoutMs;
  server.on("upgrade", async (req, socket, head) => {
    try {
      const responsesWsHandled = await responsesWsProxy.handleUpgrade(req, socket, head);
      if (responsesWsHandled) return;
      const handled = await wsBridge.handleUpgrade(req, socket, head);
      if (handled) return;
      await upgradeHandler(req, socket, head);
    } catch (error) {
      if (!socket.destroyed) {
        socket.destroy(error instanceof Error ? error : undefined);
      }
      console.error("[WS] Upgrade handling failed:", error);
    }
  });

  server.on("error", (error) => {
    console.error("[FATAL] Next custom server failed:", error);
    process.exit(1);
  });

  let isShuttingDown = false;
  const shutdown = async (signal) => {
    if (isShuttingDown) {
      // Second Ctrl+C / signal forces immediate exit
      process.exit(1);
    }
    isShuttingDown = true;

    // Safety net: force exit after 2s if keep-alive sockets or Next.js app close hangs
    const forceExitTimer = setTimeout(() => {
      process.exit(0);
    }, 2000);
    forceExitTimer.unref?.();

    systemdNotifier.stopping();
    try {
      server.closeIdleConnections?.();
      server.closeAllConnections?.();
      await new Promise((resolve) => server.close(resolve));
      await globalThis.__omnirouteRequestShutdown?.(signal);
      await nextApp.close();
    } catch (error) {
      console.error("[SHUTDOWN] Failed during signal:", signal, error);
    } finally {
      clearTimeout(forceExitTimer);
      process.exit(0);
    }
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));

  server.listen(dashboardPort, hostname, () => {
    const bundler = dev ? (useTurbopack ? "turbopack" : "webpack") : "production";
    console.log(
      `[Next] ${mode} server listening on http://${hostname}:${dashboardPort} (${bundler})`
    );
    systemdNotifier.ready();
    systemdNotifier.startWatchdog();
  });
}

start().catch((error) => {
  console.error("[FATAL] Failed to start Next custom server:", error);
  process.exit(1);
});
