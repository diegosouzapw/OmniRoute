#!/usr/bin/env node

import { spawn } from "node:child_process";

function parsePort(value, fallback) {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 65535 ? parsed : fallback;
}

const mode = process.argv[2] === "start" ? "start" : "dev";

const basePort = parsePort(process.env.PORT || "20128", 20128);
const apiPort = parsePort(process.env.API_PORT || String(basePort), basePort);
const dashboardPort = parsePort(process.env.DASHBOARD_PORT || String(basePort), basePort);

const args = ["./node_modules/next/dist/bin/next", mode, "--port", String(dashboardPort)];
if (mode === "dev") {
  args.splice(2, 0, "--webpack");
}

const child = spawn(process.execPath, args, {
  stdio: "inherit",
  env: {
    ...process.env,
    OMNIROUTE_PORT: String(basePort),
    PORT: String(dashboardPort),
    DASHBOARD_PORT: String(dashboardPort),
    API_PORT: String(apiPort),
  },
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});

process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));
