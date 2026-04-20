#!/usr/bin/env node

import { spawn } from "node:child_process";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { sanitizeColorEnv } from "./runtime-env.mjs";

function parsePort(value, fallback) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 65535 ? parsed : fallback;
}

const explicitBaseUrl = process.env.OMNIROUTE_BASE_URL || "";
const isolatedPort = parsePort(
  process.env.DASHBOARD_PORT || process.env.PORT,
  22000 + (process.pid % 1000)
);
const isolatedDataDir =
  process.env.DATA_DIR || join(process.cwd(), ".tmp", "ecosystem-data", String(process.pid));
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
    if (await isServerReady()) {
      return;
    }
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
  };

  if (!(await isServerReady())) {
    serverProcess = spawn(process.execPath, ["scripts/run-next-playwright.mjs", "dev"], {
      stdio: "inherit",
      env: testEnv,
    });
    startedHere = true;
    await waitForServerReady();
  }

  const vitestProcess = spawn(
    process.execPath,
    ["./node_modules/vitest/vitest.mjs", "run", "tests/e2e/ecosystem.test.ts"],
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
  console.error("[test:ecosystem] Failed:", error?.message || error);
  process.exit(1);
});
