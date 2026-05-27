import fs from "node:fs";
import path from "node:path";
import { DATA_DIR } from "@/lib/db/core";
import { upsertVersionManagerTool } from "@/lib/db/versionManager";
import { runNpm, InstallError } from "./utils";

export const NINEROUTER_PACKAGE = "9router";
export const NINEROUTER_INSTALL_DIR = path.join(DATA_DIR, "services", "9router");

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

function getServerPath(): string {
  return path.join(NINEROUTER_INSTALL_DIR, "node_modules", "9router", "app", "server.js");
}

function getInstalledPkgPath(): string {
  return path.join(NINEROUTER_INSTALL_DIR, "node_modules", "9router", "package.json");
}

export async function getInstalledVersion(): Promise<string | null> {
  try {
    const raw = fs.readFileSync(getInstalledPkgPath(), "utf8");
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
    const { stdout } = await runNpm(["view", NINEROUTER_PACKAGE, "version"], { timeoutMs: 30_000 });
    const version = stdout.trim();
    if (version) {
      latestVersionCache = { value: version, expiresAt: Date.now() + VERSION_CACHE_TTL_MS };
    }
    return version || null;
  } catch {
    return null;
  }
}

export async function install(version = "latest"): Promise<InstallResult> {
  const startMs = Date.now();

  // Create install dir + minimal package.json (idempotent)
  fs.mkdirSync(NINEROUTER_INSTALL_DIR, { recursive: true });
  const hostPkgPath = path.join(NINEROUTER_INSTALL_DIR, "package.json");
  if (!fs.existsSync(hostPkgPath)) {
    fs.writeFileSync(
      hostPkgPath,
      JSON.stringify(
        { name: "omniroute-9router-host", version: "0.0.0", private: true, dependencies: {} },
        null,
        2
      ),
      "utf8"
    );
  }

  await runNpm(
    [
      "install",
      `${NINEROUTER_PACKAGE}@${version}`,
      "--omit=dev",
      "--no-audit",
      "--no-fund",
      "--prefix",
      NINEROUTER_INSTALL_DIR,
    ],
    { cwd: NINEROUTER_INSTALL_DIR }
  );

  const installedVersion = await getInstalledVersion();
  if (!installedVersion) {
    throw new InstallError(
      "Could not read installed version from node_modules/9router/package.json",
      "9router instalado mas versão não pôde ser lida.",
      500
    );
  }

  await upsertVersionManagerTool({
    tool: "9router",
    installedVersion,
    binaryPath: getServerPath(),
    status: "stopped",
  });

  // Invalidate cache so next getLatestVersion() re-fetches
  latestVersionCache = null;

  return {
    installedVersion,
    installPath: NINEROUTER_INSTALL_DIR,
    durationMs: Date.now() - startMs,
  };
}

export async function update(): Promise<InstallResult> {
  return install("latest");
}

export async function uninstall(): Promise<void> {
  const nmDir = path.join(NINEROUTER_INSTALL_DIR, "node_modules");
  if (fs.existsSync(nmDir)) {
    fs.rmSync(nmDir, { recursive: true, force: true });
  }
  await upsertVersionManagerTool({
    tool: "9router",
    status: "not_installed",
    installedVersion: null,
    binaryPath: null,
  });
}

export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs {
  const serverPath = getServerPath();
  // Next.js standalone dir ships its own node_modules — include them in NODE_PATH
  // so native addons (better-sqlite3) resolve correctly.
  const standaloneDir = path.dirname(serverPath);
  const bundledNm = path.join(standaloneDir, "node_modules");
  const existingNodePath = process.env.NODE_PATH ?? "";
  const nodePath = [bundledNm, existingNodePath].filter(Boolean).join(path.delimiter);

  return {
    command: process.execPath,
    args: ["--max-old-space-size=6144", serverPath],
    env: {
      ...process.env,
      PORT: String(port),
      HOSTNAME: "127.0.0.1",
      // API_KEY_SECRET is the HMAC secret 9router uses to generate/validate API keys.
      // OmniRoute generates this secret and can derive valid keys from it.
      API_KEY_SECRET: apiKey,
      DATA_DIR: path.join(NINEROUTER_INSTALL_DIR, "data"),
      NODE_ENV: "production",
      NODE_PATH: nodePath,
      // Embedded mode: skip MITM proxy and cloud tunnel startup
      DISABLE_MITM: "true",
      DISABLE_TUNNEL: "true",
    },
    cwd: standaloneDir,
  };
}
