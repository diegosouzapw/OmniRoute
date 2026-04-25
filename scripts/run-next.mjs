#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import next from "next";
import { bootstrapEnv } from "./bootstrap-env.mjs";
import { resolveRuntimePorts, withRuntimePortEnv } from "./runtime-env.mjs";
import { createOmnirouteWsBridge } from "./v1-ws-bridge.mjs";
import { createResponsesWsProxy } from "./responses-ws-proxy.mjs";
import { randomUUID } from "node:crypto";

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

const nextApp = next({
  dev,
  dir: process.cwd(),
  hostname,
  port: dashboardPort,
  turbopack: useTurbopack,
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

  const server = http.createServer((req, res) => requestHandler(req, res));
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
      console.error(`[SHUTDOWN] Failed during ${signal}:`, error);
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
