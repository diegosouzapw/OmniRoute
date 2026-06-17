/**
 * Live Dashboard WebSocket Server — Startup Script
 *
 * This script starts the live dashboard WebSocket server as a separate
 * process alongside the Next.js app. Run it with:
 *
 *   node scripts/start-ws-server.mjs
 *
 * Environment variables:
 *   LIVE_WS_PORT       — WebSocket server port (default: 20129)
 *   LIVE_WS_HOST       — WebSocket server host (default: 127.0.0.1)
 *   OMNIROUTE_DISABLE_LIVE_WS — Set to "1" or "true" to disable
 */

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

if (
  process.env.OMNIROUTE_DISABLE_LIVE_WS === "1" ||
  process.env.OMNIROUTE_DISABLE_LIVE_WS === "true"
) {
  console.log("[LiveWS] Disabled via OMNIROUTE_DISABLE_LIVE_WS");
  process.exit(0);
}

const BOOTSTRAPPED_ENV = "OMNIROUTE_LIVE_WS_BOOTSTRAPPED";

if (process.env[BOOTSTRAPPED_ENV] !== "1") {
  const result = spawnSync(process.execPath, ["--import", "tsx", fileURLToPath(import.meta.url)], {
    stdio: "inherit",
    env: {
      ...process.env,
      [BOOTSTRAPPED_ENV]: "1",
      // Prevent liveServer.ts from auto-starting on import; this script owns
      // process startup so errors propagate to the supervisor/CLI caller.
      OMNIROUTE_ENABLE_LIVE_WS: "0",
    },
  });

  if (result.signal) {
    process.kill(process.pid, result.signal);
  }

  process.exit(result.status ?? 1);
}

const { startLiveDashboardServer } = await import("../src/server/ws/liveServer.ts");

const port = parseInt(process.env.LIVE_WS_PORT || "20129", 10);
const host = process.env.LIVE_WS_HOST || "127.0.0.1";

console.log(`[LiveWS] Starting dashboard WebSocket server on ${host}:${port}...`);

startLiveDashboardServer(port, host)
  .then(() => {
    console.log(`[LiveWS] Dashboard WebSocket server listening on ws://${host}:${port}`);
    console.log("[LiveWS] Connect via: ws://localhost:%d?token=<api-key>", port);
    console.log("[LiveWS] Channels: requests, combo, credentials");
  })
  .catch((err) => {
    console.error("[LiveWS] Failed to start:", err);
    process.exit(1);
  });
