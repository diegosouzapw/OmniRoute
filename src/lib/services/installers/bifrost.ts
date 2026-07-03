import fs from "node:fs";
import path from "node:path";
import { DATA_DIR } from "@/lib/db/core";
import { upsertVersionManagerTool } from "@/lib/db/versionManager";
import { runNpm, InstallError } from "./utils";

export const BIFROST_PACKAGE = "@maximhq/bifrost";
export const BIFROST_DEFAULT_PORT = 8080;
export const BIFROST_INSTALL_DIR = path.join(DATA_DIR, "services", "bifrost");

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

function getInstalledPkgPath(): string {
  return path.join(BIFROST_INSTALL_DIR, "node_modules", "@maximhq", "bifrost", "package.json");
}

function getBinPath(): string {
  return path.join(BIFROST_INSTALL_DIR, "node_modules", "@maximhq", "bifrost", "bin.js");
}

function getInstalledVersionSync(): string | null {
  try {
    const raw = fs.readFileSync(getInstalledPkgPath(), "utf8");
    const parsed = JSON.parse(raw) as { version?: string };
    return typeof parsed.version === "string" ? parsed.version : null;
  } catch {
    return null;
  }
}

export async function getInstalledVersion(): Promise<string | null> {
  return getInstalledVersionSync();
}

export async function getLatestVersion(): Promise<string | null> {
  if (latestVersionCache && latestVersionCache.expiresAt > Date.now()) {
    return latestVersionCache.value;
  }
  try {
    const { stdout } = await runNpm(["view", BIFROST_PACKAGE, "version"], { timeoutMs: 30_000 });
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
  fs.mkdirSync(BIFROST_INSTALL_DIR, { recursive: true });
  const hostPkgPath = path.join(BIFROST_INSTALL_DIR, "package.json");
  if (!fs.existsSync(hostPkgPath)) {
    fs.writeFileSync(
      hostPkgPath,
      JSON.stringify(
        { name: "omniroute-bifrost-host", version: "0.0.0", private: true, dependencies: {} },
        null,
        2
      ),
      "utf8"
    );
  }

  await runNpm(
    ["install", `${BIFROST_PACKAGE}@${version}`, "--omit=dev", "--no-audit", "--no-fund"],
    // `--prefix` via `prefix` (→ npm_config_prefix env) so paths with spaces survive Windows shell
    { cwd: BIFROST_INSTALL_DIR, prefix: BIFROST_INSTALL_DIR }
  );

  const installedVersion = await getInstalledVersion();
  if (!installedVersion) {
    throw new InstallError(
      "Could not read installed version from node_modules/@maximhq/bifrost/package.json",
      "Bifrost instalado mas versão não pôde ser lida.",
      500
    );
  }

  await upsertVersionManagerTool({
    tool: "bifrost",
    installedVersion,
    binaryPath: getBinPath(),
    status: "stopped",
    port: BIFROST_DEFAULT_PORT,
  });

  // Invalidate cache so next getLatestVersion() re-fetches
  latestVersionCache = null;

  return {
    installedVersion,
    installPath: BIFROST_INSTALL_DIR,
    durationMs: Date.now() - startMs,
  };
}

export async function update(): Promise<InstallResult> {
  return install("latest");
}

export function resolveSpawnArgs(port: number): SpawnArgs {
  const binPath = getBinPath();
  // Pin transport version to the installed npm version for reproducibility (spec §2b)
  const transportVersion = getInstalledVersionSync() ?? "latest";

  return {
    command: process.execPath,
    args: [
      binPath,
      "-port",
      String(port),
      "-host",
      "127.0.0.1",
      "-app-dir",
      BIFROST_INSTALL_DIR,
      "-log-level",
      "warn",
    ],
    env: {
      ...process.env,
      BIFROST_TRANSPORT_VERSION: transportVersion,
    },
    cwd: BIFROST_INSTALL_DIR,
  };
}
