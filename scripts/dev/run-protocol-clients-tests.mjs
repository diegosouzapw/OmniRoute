#!/usr/bin/env node

import { spawn } from "node:child_process";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { sanitizeColorEnv } from "../build/runtime-env.mjs";

function parsePort(value, fallback) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 65535 ? parsed : fallback;
}

const explicitBaseUrl = process.env.OMNIROUTE_BASE_URL || "";
const isolatedPort = parsePort(
  process.env.DASHBOARD_PORT || process.env.PORT,
  23000 + (process.pid % 1000)
);
const isolatedDataDir =
  process.env.DATA_DIR || join(process.cwd(), ".tmp", "protocol-clients-data", String(process.pid));
const port = explicitBaseUrl ? null : isolatedPort;
const baseUrl = explicitBaseUrl || `http://127.0.0.1:${isolatedPort}`;
const healthUrl = `${baseUrl}/api/monitoring/health`;
const maxWaitMs = Number(process.env.ECOSYSTEM_SERVER_WAIT_MS || 180000);
const pollMs = 2000;

async function isServerReady() {
  const timeout = AbortSignal.timeout(2000);
  try {
    const res = await fetch(healthUrl, { signal: timeout });
    return res.ok;
  } catch {
    return false;
  }
}

async function waitForServerReady() {
  const maxAttempts = Math.ceil(maxWaitMs / pollMs);
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    if (await isServerReady()) return;
    await delay(pollMs);
  }
  throw new Error(`Timed out waiting for ${healthUrl} after ${maxWaitMs}ms`);
}

async function main() {
  let serverProcess = null;
  let startedHere = false;
  const testEnv = {
    ...sanitizeColorEnv(process.env),
    DATA_DIR: isolatedDataDir,
    ...(explicitBaseUrl
      ? {}
      : {
          PORT: String(port),
          DASHBOARD_PORT: String(port),
          API_PORT: String(port),
          OMNIROUTE_BASE_URL: baseUrl,
        }),
    OMNIROUTE_E2E_BOOTSTRAP_MODE: process.env.OMNIROUTE_E2E_BOOTSTRAP_MODE || "open",
    // Pin the custom server's bind address to loopback (#11535). The bootstrap
    // loopback verdict (apiAuth.isLoopbackRequest) comes from the peer stamp the
    // custom server writes from the real TCP socket (GHSA-7pq4-8pvv-rx7r), never
    // from nextUrl.hostname / Host — the pin keeps the harness's own clients on a
    // loopback socket so that stamp resolves to 127.0.0.1.
    HOST: process.env.HOST || "127.0.0.1",
  };

  if (!(await isServerReady())) {
    // Boot the REAL custom server (run-next.mjs), not the bare `next dev` CLI.
    // Only the custom Node server stamps the trusted PEER_IP_HEADER from the TCP
    // socket; without that stamp the authz middleware fails closed on locality and
    // every LOCAL_ONLY route (e.g. /api/mcp/audit) answers 403 even from loopback
    // (#11535). run-next.mjs honors OMNIROUTE_E2E_BOOTSTRAP_MODE=open by clearing
    // bootstrap credentials after its env merge, keeping the audit assertions live
    // (200) instead of masking them behind a 401. The Playwright webServer runner is
    // intentionally left untouched — it serves the whole blocking test-e2e suite.
    serverProcess = spawn(process.execPath, ["scripts/dev/run-next.mjs", "dev"], {
      stdio: "inherit",
      env: testEnv,
    });
    startedHere = true;
    await waitForServerReady();
  }

  const vitestProcess = spawn(
    process.execPath,
    [
      "./node_modules/vitest/vitest.mjs",
      "run",
      // Without --config, Vitest loads vitest.config.ts, whose exclude list drops
      // this file — the run then dies with "No test files found". The config also
      // sets environment: node, so the flag is no longer needed here.
      "--config",
      "vitest.e2e-live.config.ts",
      "tests/e2e/protocol-clients.test.ts",
    ],
    {
      stdio: "inherit",
      env: testEnv,
    }
  );

  const exitCode = await new Promise((resolve) => {
    vitestProcess.on("exit", (code, signal) => {
      if (signal) {
        resolve(1);
        return;
      }
      resolve(code ?? 1);
    });
  });

  if (startedHere && serverProcess) {
    serverProcess.kill("SIGTERM");
    await delay(1000);
    if (!serverProcess.killed) {
      serverProcess.kill("SIGKILL");
    }
  }

  process.exit(exitCode);
}

main().catch((error) => {
  console.error("[test:protocols:e2e] Failed:", error?.message || error);
  process.exit(1);
});
