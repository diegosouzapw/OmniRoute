#!/usr/bin/env node

import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { resolveRuntimePorts, withRuntimePortEnv } from "./runtime-env.mjs";
import { bootstrapEnv } from "./bootstrap-env.mjs";

const mode = process.argv[2] === "start" ? "start" : "dev";
const projectRoot = process.cwd();
const legacyAppDir = path.join(projectRoot, "app");
const srcAppDir = path.join(projectRoot, "src", "app");
const backupDir = path.join(projectRoot, `.app-dev-backup-${process.pid}-${Date.now()}`);

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function shouldMoveLegacyAppDir() {
  return (await exists(legacyAppDir)) && (await exists(srcAppDir));
}

async function movePath(sourcePath, destinationPath) {
  try {
    await fs.rename(sourcePath, destinationPath);
  } catch (error) {
    if (error?.code !== "EXDEV") {
      throw error;
    }

    await fs.cp(sourcePath, destinationPath, {
      recursive: true,
      preserveTimestamps: true,
      force: false,
      errorOnExist: true,
    });
    await fs.rm(sourcePath, { recursive: true, force: true });
  }
}

let movedLegacyAppDir = false;

async function restoreLegacyAppDir() {
  if (!movedLegacyAppDir) return;

  if ((await exists(backupDir)) && !(await exists(legacyAppDir))) {
    await movePath(backupDir, legacyAppDir);
  }
}

function runChild(command, args, options) {
  return new Promise((resolve) => {
    const child = spawn(command, args, options);

    const forward = (signal) => {
      if (!child.killed) {
        child.kill(signal);
      }
    };

    process.on("SIGINT", forward);
    process.on("SIGTERM", forward);

    child.on("exit", (code, signal) => {
      process.off("SIGINT", forward);
      process.off("SIGTERM", forward);
      resolve({ code: code ?? 0, signal: signal ?? null });
    });
  });
}

try {
  if (mode === "dev" && (await shouldMoveLegacyAppDir())) {
    await movePath(legacyAppDir, backupDir);
    movedLegacyAppDir = true;
    console.log("[run-next] Temporarily moved legacy app/ out of the way for dev mode");
  }

  // Load .env / server.env first so PORT / DASHBOARD_PORT from files affect --port below.
  const env = bootstrapEnv();
  const runtimePorts = resolveRuntimePorts(env);
  const { dashboardPort } = runtimePorts;

  const args = ["./node_modules/next/dist/bin/next", mode, "--port", String(dashboardPort)];

  // Default to Turbopack in dev. Opt into webpack only when explicitly requested.
  // Must read merged `env` from bootstrap — .env is not applied to process.env in the launcher.
  if (mode === "dev" && env.OMNIROUTE_USE_WEBPACK === "1") {
    args.splice(2, 0, "--webpack");
  }

  const result = await runChild(process.execPath, args, {
    stdio: "inherit",
    env: withRuntimePortEnv(env, runtimePorts),
  });

  await restoreLegacyAppDir();

  if (result.signal) {
    process.kill(process.pid, result.signal);
  }

  process.exit(result.code);
} catch (error) {
  try {
    await restoreLegacyAppDir();
  } catch (restoreError) {
    console.error(
      "[run-next] Failed to restore legacy app/ directory after startup error:",
      restoreError
    );
  }

  throw error;
}
