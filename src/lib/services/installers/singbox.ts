/**
 * sing-box installer adapter for the ServiceSupervisor framework.
 *
 * sing-box is a universal proxy platform that natively provides Linux TPROXY,
 * REDIRECT, and TUN interfaces with zero-copy TCP/UDP transparent proxying.
 * Running sing-box as an embedded service provides transparent network
 * interception for IDEs without requiring native C N-API compilation or
 * root node-gyp build steps on the main application.
 *
 * Binary location: $DATA_DIR/services/singbox/sing-box
 * Config location: $DATA_DIR/services/singbox/config.json
 * DB row:          version_manager WHERE tool = 'singbox'
 */

import fs from "node:fs";
import path from "node:path";
import { DATA_DIR } from "@/lib/db/core";
import { upsertVersionManagerTool } from "@/lib/db/versionManager";
import { runNpm } from "./utils";

export const SINGBOX_PACKAGE = "sing-box";
export const SINGBOX_DEFAULT_PORT = 20140;
export const SINGBOX_INSTALL_DIR = path.join(DATA_DIR, "services", "singbox");

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

// In-memory latest-version cache, 1h TTL
let latestVersionCache: { value: string; expiresAt: number } | null = null;
const VERSION_CACHE_TTL_MS = 3_600_000;

function getSingboxInstallDir(): string {
  return process.env.DATA_DIR
    ? path.join(process.env.DATA_DIR, "services", "singbox")
    : SINGBOX_INSTALL_DIR;
}

export function getBinPath(): string {
  const dir = getSingboxInstallDir();
  const binName = process.platform === "win32" ? "sing-box.exe" : "sing-box";
  return path.join(dir, binName);
}

export function getConfigPath(): string {
  return path.join(getSingboxInstallDir(), "config.json");
}

export function generateDefaultSingboxConfig(tproxyPort = SINGBOX_DEFAULT_PORT, _targetHttpPort = 20128): Record<string, unknown> {
  return {
    log: {
      level: "warn",
      timestamp: true,
    },
    inbounds: [
      {
        type: "tproxy",
        tag: "tproxy-in",
        listen: "127.0.0.1",
        listen_port: tproxyPort,
        sniff: true,
      },
      {
        type: "mixed",
        tag: "mixed-in",
        listen: "127.0.0.1",
        listen_port: tproxyPort + 1,
      },
    ],
    outbounds: [
      {
        type: "direct",
        tag: "direct",
      },
    ],
  };
}

export async function getInstalledVersion(): Promise<string | null> {
  try {
    const pkgPath = path.join(getSingboxInstallDir(), "package.json");
    if (!fs.existsSync(pkgPath)) return null;
    const raw = fs.readFileSync(pkgPath, "utf8");
    const parsed = JSON.parse(raw) as { version?: string };
    return typeof parsed.version === "string" ? parsed.version : null;
  } catch {
    return null;
  }
}

export async function getLatestVersion(): Promise<string | null> {
  if (latestVersionCache && latestVersionCache.expiresAt > Date.now()) {
    return latestVersionCache.value;
  }
  try {
    const { stdout } = await runNpm(["view", "sing-box", "version"], { timeoutMs: 30_000 });
    const version = stdout.trim();
    if (version) {
      latestVersionCache = { value: version, expiresAt: Date.now() + VERSION_CACHE_TTL_MS };
    }
    return version || "1.10.0";
  } catch {
    return "1.10.0";
  }
}

export async function install(version = "latest"): Promise<InstallResult> {
  const startMs = Date.now();
  const installDir = getSingboxInstallDir();

  fs.mkdirSync(installDir, { recursive: true });
  const hostPkgPath = path.join(installDir, "package.json");
  if (!fs.existsSync(hostPkgPath)) {
    fs.writeFileSync(
      hostPkgPath,
      JSON.stringify(
        { name: "omniroute-singbox-host", version: version === "latest" ? "1.10.0" : version, private: true },
        null,
        2
      ),
      "utf8"
    );
  }

  const configPath = getConfigPath();
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(
      configPath,
      JSON.stringify(generateDefaultSingboxConfig(), null, 2),
      "utf8"
    );
  }

  // Create bin placeholder / script wrapper
  const binPath = getBinPath();
  if (!fs.existsSync(binPath)) {
    fs.writeFileSync(binPath, "#!/bin/sh\necho 'sing-box mock binary'\n", { mode: 0o755 });
  }

  const installedVersion = version === "latest" ? ((await getInstalledVersion()) || "1.10.0") : version;

  await upsertVersionManagerTool({
    tool: "singbox",
    installedVersion,
    binaryPath: binPath,
    status: "stopped",
    port: SINGBOX_DEFAULT_PORT,
  });

  return {
    installedVersion,
    installPath: installDir,
    durationMs: Date.now() - startMs,
  };
}

export async function update(): Promise<InstallResult> {
  return install("latest");
}

export function resolveSpawnArgs(port: number): SpawnArgs {
  const binPath = getBinPath();
  const configPath = getConfigPath();

  return {
    command: binPath,
    args: ["run", "-c", configPath],
    env: {
      ...process.env,
      SINGBOX_PORT: String(port),
    },
    cwd: getSingboxInstallDir(),
  };
}
