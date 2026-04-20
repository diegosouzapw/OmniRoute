#!/usr/bin/env node

import { spawn } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, renameSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import {
  resolveRuntimePorts,
  sanitizeColorEnv,
  spawnWithForwardedSignals,
  withRuntimePortEnv,
} from "./runtime-env.mjs";
import { bootstrapEnv } from "./bootstrap-env.mjs";

const mode = process.argv[2] === "start" ? "start" : "dev";
const cwd = process.cwd();
const appDir = join(cwd, "app");
const srcAppDir = join(cwd, "src", "app");
const appPage = join(appDir, "page.tsx");
const defaultBackupDir = join(cwd, "app.__qa_backup");
const backupDir = resolvePlaywrightAppBackupDir({
  cwd,
  baseBackupExists: existsSync(defaultBackupDir),
  appDirExists: existsSync(appDir),
});
const usingAlternativeBackupDir = backupDir !== defaultBackupDir;
const buildScript = join(cwd, "scripts", "build-next-isolated.mjs");
const standaloneServer = join(cwd, testDistDir(), "standalone", "server.js");
const rootStaticDir = join(cwd, testDistDir(), "static");
const rootPublicDir = join(cwd, "public");
const standaloneStaticDir = join(cwd, testDistDir(), "standalone", ".next", "static");
const standalonePublicDir = join(cwd, testDistDir(), "standalone", "public");

let appDirMoved = false;

function testDistDir() {
  return process.env.NEXT_DIST_DIR || ".next";
}

function resolvePlaywrightDataDir({ cwd, env, pid = process.pid }) {
  if (typeof env.DATA_DIR === "string" && env.DATA_DIR.trim().length > 0) {
    return env.DATA_DIR;
  }

  return join(cwd, ".tmp", "playwright-data", String(pid));
}

export function resolvePlaywrightAppBackupDir({
  cwd,
  baseBackupExists,
  appDirExists,
  pid = process.pid,
  now = Date.now(),
}) {
  const baseBackupDir = join(cwd, "app.__qa_backup");
  if (!baseBackupExists || !appDirExists) {
    return baseBackupDir;
  }

  return join(cwd, `app.__qa_backup.${pid}.${now}`);
}

function shouldMoveAppDir() {
  return existsSync(appDir) && !existsSync(appPage) && existsSync(srcAppDir);
}

export function directoryHasEntries(dirPath) {
  try {
    return readdirSync(dirPath).length > 0;
  } catch {
    return false;
  }
}

export function standaloneAssetsNeedSync({
  standaloneServerPath,
  rootStaticDirPath,
  standaloneStaticDirPath,
}) {
  return (
    existsSync(standaloneServerPath) &&
    existsSync(rootStaticDirPath) &&
    !directoryHasEntries(standaloneStaticDirPath)
  );
}

export function syncStandaloneRuntimeAssets({
  standaloneServerPath,
  rootStaticDirPath,
  standaloneStaticDirPath,
  rootPublicDirPath,
  standalonePublicDirPath,
  log = console,
}) {
  if (!existsSync(standaloneServerPath)) return false;

  let changed = false;

  if (existsSync(rootPublicDirPath) && !directoryHasEntries(standalonePublicDirPath)) {
    cpSync(rootPublicDirPath, standalonePublicDirPath, {
      recursive: true,
      force: true,
    });
    changed = true;
  }

  if (existsSync(rootStaticDirPath) && !directoryHasEntries(standaloneStaticDirPath)) {
    mkdirSync(dirname(standaloneStaticDirPath), {
      recursive: true,
    });
    cpSync(rootStaticDirPath, standaloneStaticDirPath, {
      recursive: true,
      force: true,
    });
    changed = true;
  }

  if (changed) {
    log.log("[Playwright WebServer] Rehydrated standalone static/public assets");
  }

  return changed;
}

function prepareAppDir() {
  if (!shouldMoveAppDir()) return;

  if (usingAlternativeBackupDir) {
    console.warn(
      "[Playwright WebServer] Existing app.__qa_backup detected; using a per-run backup dir instead."
    );
  }

  renameSync(appDir, backupDir);
  appDirMoved = true;
  console.log("[Playwright WebServer] Temporarily moved app/ to app.__qa_backup");
}

function restoreAppDir() {
  if (!appDirMoved) return;
  if (!existsSync(backupDir) || existsSync(appDir)) return;

  renameSync(backupDir, appDir);
  console.log("[Playwright WebServer] Restored app/ directory");
}

const playwrightDataDir = resolvePlaywrightDataDir({
  cwd,
  env: process.env,
});
const bootstrapEnvVars = bootstrapEnv({
  quiet: true,
  dataDirOverride: playwrightDataDir,
});
const runtimePorts = resolveRuntimePorts(bootstrapEnvVars);
const bootstrapMode = process.env.OMNIROUTE_E2E_BOOTSTRAP_MODE || "auth";
const playwrightPassword =
  process.env.OMNIROUTE_E2E_PASSWORD || process.env.INITIAL_PASSWORD || "omniroute-e2e-password";
const testServerEnv = {
  ...sanitizeColorEnv(bootstrapEnvVars),
  ...sanitizeColorEnv(process.env),
  DATA_DIR: playwrightDataDir,
  NEXT_PUBLIC_OMNIROUTE_E2E_MODE: process.env.NEXT_PUBLIC_OMNIROUTE_E2E_MODE || "1",
  OMNIROUTE_DISABLE_BACKGROUND_SERVICES:
    process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES || "true",
  OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK: process.env.OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK || "true",
  OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK: process.env.OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK || "true",
  OMNIROUTE_HIDE_HEALTHCHECK_LOGS: process.env.OMNIROUTE_HIDE_HEALTHCHECK_LOGS || "true",
  ...(bootstrapMode === "open"
    ? {}
    : {
        INITIAL_PASSWORD: playwrightPassword,
        OMNIROUTE_E2E_PASSWORD: playwrightPassword,
      }),
  ...(process.env.OMNIROUTE_USE_TURBOPACK
    ? {
        OMNIROUTE_USE_TURBOPACK: process.env.OMNIROUTE_USE_TURBOPACK,
      }
    : {}),
};

export function shouldUseWebpackForPlaywrightDev({ mode, env }) {
  return mode === "dev" && env.OMNIROUTE_USE_TURBOPACK !== "1";
}

function runChild(command, args, env) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      env,
    });

    const forward = (signal) => {
      if (!child.killed) child.kill(signal);
    };

    process.on("SIGINT", forward);
    process.on("SIGTERM", forward);

    child.on("exit", (code, signal) => {
      process.off("SIGINT", forward);
      process.off("SIGTERM", forward);
      resolve({ code: code ?? 1, signal: signal ?? null });
    });
  });
}

async function runBuildForStart() {
  if (mode !== "start") return;
  if (process.env.OMNIROUTE_PLAYWRIGHT_SKIP_BUILD === "1") return;
  console.log("[Playwright WebServer] Building fresh standalone app for this run...");

  const buildEnv = withRuntimePortEnv(testServerEnv, runtimePorts);
  const result = await runChild(process.execPath, [buildScript], buildEnv);

  if (result.signal) {
    process.kill(process.pid, result.signal);
    return;
  }

  if (result.code !== 0) {
    process.exit(result.code);
  }
}

export async function main() {
  process.on("exit", restoreAppDir);
  process.on("uncaughtException", (error) => {
    restoreAppDir();
    throw error;
  });

  prepareAppDir();
  await runBuildForStart();

  if (mode === "start") {
    if (existsSync(standaloneServer)) {
      syncStandaloneRuntimeAssets({
        standaloneServerPath: standaloneServer,
        rootStaticDirPath: rootStaticDir,
        standaloneStaticDirPath: standaloneStaticDir,
        rootPublicDirPath: rootPublicDir,
        standalonePublicDirPath: standalonePublicDir,
      });

      spawnWithForwardedSignals(process.execPath, [standaloneServer], {
        stdio: "inherit",
        env: {
          ...withRuntimePortEnv(testServerEnv, runtimePorts),
          PORT: String(runtimePorts.dashboardPort),
          HOSTNAME: process.env.HOSTNAME || "127.0.0.1",
        },
      });
      return;
    }

    const args = [
      "./node_modules/next/dist/bin/next",
      "start",
      "--port",
      String(runtimePorts.dashboardPort),
    ];

    spawnWithForwardedSignals(process.execPath, args, {
      stdio: "inherit",
      env: withRuntimePortEnv(testServerEnv, runtimePorts),
    });
    return;
  }

  const args = [
    "./node_modules/next/dist/bin/next",
    mode,
    "--port",
    String(runtimePorts.dashboardPort),
  ];

  if (shouldUseWebpackForPlaywrightDev({ mode, env: testServerEnv })) {
    args.splice(2, 0, "--webpack");
  }

  spawnWithForwardedSignals(process.execPath, args, {
    stdio: "inherit",
    env: withRuntimePortEnv(testServerEnv, runtimePorts),
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
