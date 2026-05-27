/**
 * Live Dashboard WebSocket Server — Startup Script
 *
 * This script starts the live dashboard WebSocket server as a separate
 * process alongside the Next.js app. Run it with:
 *
 *   node scripts/start-ws-server.js
 *
 * Or use the built-in auto-start in src/server/ws/liveServer.ts.
 *
 * Environment variables:
 *   LIVE_WS_PORT       — WebSocket server port (default: 20129)
 *   OMNIROUTE_DISABLE_LIVE_WS — Set to "1" or "true" to disable
 */

if (
  process.env.OMNIROUTE_DISABLE_LIVE_WS === "1" ||
  process.env.OMNIROUTE_DISABLE_LIVE_WS === "true"
) {
  console.log("[LiveWS] Disabled via OMNIROUTE_DISABLE_LIVE_WS");
  process.exit(0);
}

// Register tsx to handle TypeScript imports
import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("tsx", pathToFileURL("./"));

const { startLiveDashboardServer } = await import("../src/server/ws/liveServer");

const port = parseInt(process.env.LIVE_WS_PORT || "20129", 10);

console.log(`[LiveWS] Starting dashboard WebSocket server on port ${port}...`);

startLiveDashboardServer(port)
  .then((server) => {
    console.log(`[LiveWS] Dashboard WebSocket server listening on ws://0.0.0.0:${port}`);
    console.log(`[LiveWS] Connect via: ws://localhost:${port}?token=<api-key>`);
    console.log(`[LiveWS] Channels: requests, combo, credentials`);
  })
  .catch((err) => {
    console.error("[LiveWS] Failed to start:", err);
    process.exit(1);
  });
