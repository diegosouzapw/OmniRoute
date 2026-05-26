/**
 * CLIProxyAPI installer adapter for the ServiceSupervisor framework.
 *
 * Wraps the existing binaryManager/releaseChecker infra (GitHub release download,
 * checksum verify, symlink) and exposes the same interface as ninerouter.ts so that
 * bootstrap.ts can treat both services uniformly.
 *
 * Binary location: $DATA_DIR/bin/cliproxyapi  (symlink → versioned dir)
 * Config:          $DATA_DIR/services/cliproxy/config.yaml
 * DB row:          version_manager WHERE tool = 'cliproxy'
 */

import fs from "node:fs";
import path from "node:path";
import { DATA_DIR } from "@/lib/db/core";
import { upsertVersionManagerTool } from "@/lib/db/versionManager";
import { getLatestRelease } from "@/lib/versionManager/releaseChecker.ts";
import { installVersion, getCurrentBinaryPath } from "@/lib/versionManager/binaryManager.ts";

export const CLIPROXY_DEFAULT_PORT = 8317;

const BIN_DIR = path.join(DATA_DIR, "bin");
const CONFIG_DIR = path.join(DATA_DIR, "services", "cliproxy");

let latestVersionCache: { value: string; expiresAt: number } | null = null;
const VERSION_CACHE_TTL_MS = 3_600_000;

export interface InstallResult {
  installedVersion: string;
  installPath: string;
  durationMs: number;
}

export interface SpawnArgs {
  command: string;
  args: string[];
  env: NodeJS.ProcessEnv;
  cwd: string;
}

/** Reads the installed version from the symlink target directory name. */
export async function getInstalledVersion(): Promise<string | null> {
  const binaryPath = await getCurrentBinaryPath(DATA_DIR);
  if (!binaryPath) return null;
  const dirName = path.basename(path.dirname(binaryPath));
  const m = dirName.match(/^cliproxyapi-(.+)$/);
  return m ? m[1] : null;
}

export async function getLatestVersion(): Promise<string | null> {
  if (latestVersionCache && latestVersionCache.expiresAt > Date.now()) {
    return latestVersionCache.value;
  }
  try {
    const release = await getLatestRelease();
    latestVersionCache = { value: release.version, expiresAt: Date.now() + VERSION_CACHE_TTL_MS };
    return release.version;
  } catch {
    return null;
  }
}

/**
 * Download and install CLIProxyAPI from GitHub releases.
 * Upserts the version_manager row with tool='cliproxy'.
 */
export async function install(version = "latest"): Promise<InstallResult> {
  const startMs = Date.now();

  const targetVersion = version === "latest" ? (await getLatestRelease()).version : version;

  const binaryPath = await installVersion(targetVersion, DATA_DIR);

  await upsertVersionManagerTool({
    tool: "cliproxy",
    installedVersion: targetVersion,
    binaryPath,
    status: "stopped",
    port: CLIPROXY_DEFAULT_PORT,
  });

  latestVersionCache = null;

  return {
    installedVersion: targetVersion,
    installPath: BIN_DIR,
    durationMs: Date.now() - startMs,
  };
}

export async function update(): Promise<InstallResult> {
  return install("latest");
}

/**
 * Build spawn args for ServiceSupervisor.start().
 *
 * Writes config.yaml synchronously — safe because the destination is a
 * DATA_DIR-controlled path (no user input) and the content is static.
 * ServiceSupervisor calls spawnArgs() synchronously just before spawn(), so
 * async file I/O is not available here.
 */
export function resolveSpawnArgs(port: number): SpawnArgs {
  const symlinkPath = path.join(BIN_DIR, "cliproxyapi");

  fs.mkdirSync(CONFIG_DIR, { recursive: true });
  const configPath = path.join(CONFIG_DIR, "config.yaml");
  fs.writeFileSync(configPath, `port: ${port}\nhost: 127.0.0.1\nlog_level: warn\n`, "utf8");

  return {
    command: symlinkPath,
    args: ["-c", configPath],
    env: { ...process.env },
    cwd: CONFIG_DIR,
  };
}
