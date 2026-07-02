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
import { ensureNativeSqlite } from "./ensure-native-sqlite.mjs";
import { randomUUID } from "node:crypto";

const { maybeHandleDisallowedMethod } = methodGuard;

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

const { dashboardPort } = runtimePorts;
const hostname = process.env.HOST || "0.0.0.0";
const useTurbopack = dev && mergedEnv.OMNIROUTE_USE_TURBOPACK === "1";
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
const nextApp = next({
  dev,
  dir: process.cwd(),
  hostname,
  port: dashboardPort,
  turbopack: useTurbopack,
  webpack: !useTurbopack,
});

async function start() {
  await nextApp.prepare();

  const requestHandler = nextApp.getRequestHandler();
  const upgradeHandler = nextApp.getUpgradeHandler();
  const responsesWsProxy = createResponsesWsProxy({
    baseUrl: `http://127.0.0.1:${dashboardPort}`,
    bridgeSecret: process.env.OMNIROUTE_WS_BRIDGE_SECRET,
  });
  const wsBridge = createOmnirouteWsBridge({
    baseUrl: `http://127.0.0.1:${dashboardPort}`,
  });

  const server = http.createServer((req, res) => {
    if (maybeHandleDisallowedMethod(req, res)) return;
    // Stamp the real TCP peer IP before Next sees the request, so the authz
    // middleware can decide LOCAL_ONLY locality without trusting the Host header.
    stampPeerIp(req);
    return requestHandler(req, res);
  });
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

  const shutdown = async (signal) => {
    try {
      await new Promise((resolve) => server.close(resolve));
      await nextApp.close();
    } catch (error) {
      console.error("[SHUTDOWN] Failed during signal:", signal, error);
    } finally {
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
  });
}

start().catch((error) => {
  console.error("[FATAL] Failed to start Next custom server:", error);
  process.exit(1);
});
