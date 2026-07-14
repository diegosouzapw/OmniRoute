#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const dataDir = path.join(repoRoot, ".tmp", "local-dev-20129");
const dashboardPort = process.env.DASHBOARD_PORT || "20129";

fs.mkdirSync(dataDir, { recursive: true });

const env = {
  ...process.env,
  DATA_DIR: dataDir,
  DASHBOARD_PORT: dashboardPort,
  PORT: dashboardPort,
};

console.log(`[dev:local] DATA_DIR=${dataDir}`);
console.log(`[dev:local] Dashboard=http://localhost:${dashboardPort}/dashboard/onboarding`);
console.log("[dev:local] Uses an isolated SQLite dir so repo dev does not touch ~/.omniroute/");

const result = spawnSync(
  process.execPath,
  ["--max-old-space-size=8192", path.join(repoRoot, "scripts/dev/run-next.mjs"), "dev"],
  {
    cwd: repoRoot,
    env,
    stdio: "inherit",
  }
);

process.exit(result.status ?? 1);
