/**
 * Live Dashboard WebSocket Server — Startup Script
 *
 * This script starts the live dashboard WebSocket server as a separate
 * process alongside the Next.js app. Run it with:
 *
 *   node scripts/start-ws-server.mjs
 *
 * Environment variables:
 *   LIVE_WS_PORT       — WebSocket server port (default: 20132)
 *   LIVE_WS_HOST       — WebSocket server host (default: 127.0.0.1)
 *   OMNIROUTE_ENABLE_LIVE_WS — Set to "0" or "false" to disable
 */

import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const BOOTSTRAPPED_ENV = "OMNIROUTE_LIVE_WS_BOOTSTRAPPED";

/**
 * Package root for the launcher = the directory above `scripts/`, where
 * `package.json` and `tsconfig.json` (which defines the `@/*` path aliases)
 * live. Derived from the script URL so it is correct no matter where the
 * process was launched from.
 */
export function resolvePackageRoot(scriptUrl) {
  return join(dirname(fileURLToPath(scriptUrl)), "..");
}

/**
 * Build the re-spawn spec for the bootstrap stage. The sidecar is launched with
 * `node --import tsx <self>`; #4055: without `cwd` pinned to the package root, a
 * launch from outside the package dir (global npm / homebrew, or a
 * systemd/launchd unit started from $HOME) fails with
 * `ERR_MODULE_NOT_FOUND: Cannot find package 'tsx'`, and even from the package
 * dir tsx cannot resolve the tsconfig `@/*` aliases. Pinning `cwd` to the
 * package root fixes both — tsx and tsconfig are both discovered there.
 */
export function buildSidecarSpawn(scriptUrl, env = process.env) {
  return {
    command: process.execPath,
    args: ["--import", "tsx", fileURLToPath(scriptUrl)],
    options: {
      // #4055: pin cwd to the package root so `node --import tsx` resolves the
      // `tsx` package and the tsconfig `@/*` aliases regardless of where the
      // process manager (npm-global / homebrew / systemd / launchd) launched us.
      cwd: resolvePackageRoot(scriptUrl),
      stdio: "inherit",
      env: {
        ...env,
        [BOOTSTRAPPED_ENV]: "1",
        // Prevent liveServer.ts from auto-starting on import; this script owns
        // process startup so errors propagate to the supervisor/CLI caller.
        OMNIROUTE_ENABLE_LIVE_WS: "0",
      },
    },
  };
}

async function main() {
  // The operator disable gate only applies to the OUTER invocation: the bootstrapped
  // child is re-spawned with OMNIROUTE_ENABLE_LIVE_WS="0" purely to stop liveServer.ts
  // auto-starting on import (this script owns startup), so honoring the gate there
  // made the standalone script exit 0 without ever listening (#6072 regression).
  if (
    process.env[BOOTSTRAPPED_ENV] !== "1" &&
    (process.env.OMNIROUTE_ENABLE_LIVE_WS === "0" ||
      process.env.OMNIROUTE_ENABLE_LIVE_WS?.toLowerCase() === "false")
  ) {
    console.log("[LiveWS] Disabled via OMNIROUTE_ENABLE_LIVE_WS");
    process.exit(0);
  }

  if (process.env[BOOTSTRAPPED_ENV] !== "1") {
    const { command, args, options } = buildSidecarSpawn(import.meta.url);
    const result = spawnSync(command, args, options);

    if (result.signal) {
      process.kill(process.pid, result.signal);
    }

    process.exit(result.status ?? 1);
  }

  const { startLiveDashboardServer } = await import("../src/server/ws/liveServer.ts");

  const port = parseInt(process.env.LIVE_WS_PORT || "20132", 10);
  const host = process.env.LIVE_WS_HOST || "127.0.0.1";

  console.log(`[LiveWS] Starting dashboard WebSocket server on ${host}:${port}...`);

  try {
    await startLiveDashboardServer(port, host);
    console.log(`[LiveWS] Dashboard WebSocket server listening on ws://${host}:${port}`);
    console.log("[LiveWS] Connect via: ws://localhost:%d?token=<api-key>", port);
    console.log("[LiveWS] Channels: requests, combo, credentials");
  } catch (err) {
    console.error("[LiveWS] Failed to start:", err);
    process.exit(1);
  }
}

// Only run when invoked as the entry point — importing this module (e.g. from a
// unit test exercising the spawn-spec helpers) must not spawn or exit.
const invokedPath = process.argv[1] ? pathToFileURL(process.argv[1]).href : "";
if (import.meta.url === invokedPath) {
  await main();
}
