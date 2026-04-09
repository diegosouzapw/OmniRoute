#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";

/**
 * This repository contains a legacy `app/` snapshot (packaging/runtime artifacts)
 * alongside the active Next.js source in `src/app/`. Next.js route discovery scans
 * both and fails the build on legacy files. We temporarily move the legacy folder
 * out of the project root during `next build`, then restore it in all outcomes.
 */

const projectRoot = process.cwd();
const legacyAppDir = path.join(projectRoot, "app");
const backupDir = path.join(projectRoot, `.app-build-backup-${process.pid}-${Date.now()}`);

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

export async function movePath(sourcePath, destinationPath, fsImpl = fs) {
  try {
    await fsImpl.rename(sourcePath, destinationPath);
  } catch (error) {
    if (error?.code !== "EXDEV") {
      throw error;
    }

    console.warn(
      `[build-next-isolated] EXDEV while moving ${sourcePath} -> ${destinationPath}; falling back to copy/remove`
    );
    await fsImpl.cp(sourcePath, destinationPath, {
      recursive: true,
      preserveTimestamps: true,
      force: false,
      errorOnExist: true,
    });
    await fsImpl.rm(sourcePath, { recursive: true, force: true });
  }
}

function runNextBuild() {
  return new Promise((resolve) => {
    const nextBin = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
    const child = spawn(process.execPath, [nextBin, "build"], {
      cwd: projectRoot,
      stdio: "inherit",
      env: process.env,
    });

    const forward = (signal) => {
      if (!child.killed) child.kill(signal);
    };

    process.on("SIGINT", forward);
    process.on("SIGTERM", forward);

    child.on("exit", (code, signal) => {
      process.off("SIGINT", forward);
      process.off("SIGTERM", forward);
      if (signal) {
        resolve({ code: 1, signal });
        return;
      }
      resolve({ code: code ?? 1, signal: null });
    });
  });
}

export async function main() {
  let moved = false;

  try {
    if (await exists(legacyAppDir)) {
      await movePath(legacyAppDir, backupDir);
      moved = true;
    }

    const result = await runNextBuild();
    if (result.code === 0 && (await exists(path.join(projectRoot, ".next", "standalone")))) {
      console.log("[build-next-isolated] Copying static assets for standalone server...");
      try {
        await fs.cp(
          path.join(projectRoot, "public"),
          path.join(projectRoot, ".next", "standalone", "public"),
          { recursive: true }
        );
        await fs.cp(
          path.join(projectRoot, ".next", "static"),
          path.join(projectRoot, ".next", "standalone", ".next", "static"),
          { recursive: true }
        );
      } catch (copyErr) {
        console.warn("[build-next-isolated] Non-fatal error copying static assets:", copyErr);
      }
    }
    process.exitCode = result.code;
  } catch (error) {
    console.error("[build-next-isolated] Build failed:", error);
    process.exitCode = 1;
  } finally {
    if (moved) {
      try {
        await movePath(backupDir, legacyAppDir);
      } catch (restoreError) {
        console.error(
          `[build-next-isolated] Failed to restore legacy app dir from ${backupDir}:`,
          restoreError
        );
        process.exitCode = 1;
      }
    }
  }
}

const entryScript = process.argv[1] ? pathToFileURL(process.argv[1]).href : null;

if (entryScript === import.meta.url) {
  await main();
}
