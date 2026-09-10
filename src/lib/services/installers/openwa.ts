/**
 * open-wa (`@open-wa/wa-automate`) installer adapter for the ServiceSupervisor
 * framework.
 *
 * open-wa (https://github.com/open-wa/wa-automate-nodejs) is a WhatsApp Web
 * automation library published on npm as `@open-wa/wa-automate`, with a
 * documented CLI server mode (`wa-automate --port <port>`) that drives a
 * headless Chromium instance via Puppeteer. It is lifecycle-managed only —
 * like Mux, it is not an LLM proxy and has no Layer 4 executor/provider entry.
 *
 * It is installed the same way as every other embedded service — `npm
 * install` into a DATA_DIR-scoped directory via `runNpm` (Hard Rule #13: no
 * shell interpolation, array args + `env` option only) — never a git-clone +
 * build. The install pulls in Puppeteer's own Chromium download, which is
 * much larger/slower than a typical npm install, so a longer install timeout
 * is used than the shared default.
 *
 * The library is unofficial and unaffiliated with WhatsApp (Hippocratic +
 * Do No Harm license) — the connected number carries a ban risk from
 * WhatsApp's own automation detection. That risk is surfaced in the
 * dashboard tab, not enforced here.
 *
 * Binary location: $DATA_DIR/services/openwa/node_modules/@open-wa/wa-automate/bin/server.js
 * Data dir:         $DATA_DIR/services/openwa/data  (Chromium profile / WhatsApp session)
 * DB row:            version_manager WHERE tool = 'openwa'
 */

import fs from "node:fs";
import path from "node:path";
import { DATA_DIR } from "@/lib/db/core";
import { upsertVersionManagerTool } from "@/lib/db/versionManager";
import { runNpm, InstallError } from "./utils";

export const OPENWA_PACKAGE = "@open-wa/wa-automate";
export const OPENWA_DEFAULT_PORT = 8323;
export const OPENWA_INSTALL_DIR = path.join(DATA_DIR, "services", "openwa");

// Puppeteer's own Chromium download routinely exceeds the shared 5-minute
// default install timeout (`DEFAULT_TIMEOUT_MS` in `./utils`).
const INSTALL_TIMEOUT_MS = 600_000;

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

// In-memory latest-version cache, 1h TTL — mirrors mux.ts / ninerouter.ts.
let latestVersionCache: { value: string; expiresAt: number } | null = null;
const VERSION_CACHE_TTL_MS = 3_600_000;

function getServerPath(): string {
  return path.join(
    OPENWA_INSTALL_DIR,
    "node_modules",
    "@open-wa",
    "wa-automate",
    "bin",
    "server.js"
  );
}

function getInstalledPkgPath(): string {
  return path.join(OPENWA_INSTALL_DIR, "node_modules", "@open-wa", "wa-automate", "package.json");
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
    const { stdout } = await runNpm(["view", OPENWA_PACKAGE, "version"], { timeoutMs: 30_000 });
    const version = stdout.trim();
    if (version) {
      latestVersionCache = { value: version, expiresAt: Date.now() + VERSION_CACHE_TTL_MS };
    }
    return version || null;
  } catch {
    return null;
  }
}

/**
 * Download and install open-wa from npm.
 * Upserts the version_manager row with tool='openwa'.
 */
export async function install(version = "latest"): Promise<InstallResult> {
  const startMs = Date.now();

  // Create install dir + minimal package.json (idempotent) — same shape as mux.ts.
  fs.mkdirSync(OPENWA_INSTALL_DIR, { recursive: true });
  const hostPkgPath = path.join(OPENWA_INSTALL_DIR, "package.json");
  if (!fs.existsSync(hostPkgPath)) {
    fs.writeFileSync(
      hostPkgPath,
      JSON.stringify(
        { name: "omniroute-openwa-host", version: "0.0.0", private: true, dependencies: {} },
        null,
        2
      ),
      "utf8"
    );
  }

  await runNpm(
    ["install", `${OPENWA_PACKAGE}@${version}`, "--omit=dev", "--no-audit", "--no-fund"],
    // `--prefix` is passed via `prefix` (→ npm_config_prefix env) instead of an
    // argv path so an install dir with spaces survives the Windows shell (#5379).
    { cwd: OPENWA_INSTALL_DIR, prefix: OPENWA_INSTALL_DIR, timeoutMs: INSTALL_TIMEOUT_MS }
  );

  const installedVersion = await getInstalledVersion();
  if (!installedVersion) {
    throw new InstallError(
      "Could not read installed version from node_modules/@open-wa/wa-automate/package.json",
      "open-wa instalado mas versão não pôde ser lida.",
      500
    );
  }

  await upsertVersionManagerTool({
    tool: "openwa",
    installedVersion,
    binaryPath: getServerPath(),
    status: "stopped",
    port: OPENWA_DEFAULT_PORT,
  });

  // Invalidate cache so next getLatestVersion() re-fetches
  latestVersionCache = null;

  return {
    installedVersion,
    installPath: OPENWA_INSTALL_DIR,
    durationMs: Date.now() - startMs,
  };
}

export async function update(): Promise<InstallResult> {
  return install("latest");
}

export async function uninstall(): Promise<void> {
  const nmDir = path.join(OPENWA_INSTALL_DIR, "node_modules");
  if (fs.existsSync(nmDir)) {
    fs.rmSync(nmDir, { recursive: true, force: true });
  }
  await upsertVersionManagerTool({
    tool: "openwa",
    status: "not_installed",
    installedVersion: null,
    binaryPath: null,
  });
}

/**
 * Build spawn args for ServiceSupervisor.start().
 *
 * Flags/env verified directly against the installed 4.76.0 package
 * (`dist/cli/cli-options.js`, `dist/cli/server.js`, `bin/config-schema.json`)
 * rather than trusted from web docs, which mix this stable v4 line with an
 * unreleased v5 alpha CLI surface:
 *
 * - `--host`/`-h` (default `"localhost"`) and `--port`/`-p` (default `8002`)
 *   set the bind address/port. open-wa binds to `127.0.0.1` explicitly (never
 *   `0.0.0.0`) — the dashboard route is already loopback-gated (Hard Rule
 *   #17), and this is defense-in-depth since a leaked port would expose
 *   direct WhatsApp send/receive control.
 * - The API key is a generic `WA_*`-prefixed env override
 *   (`dist/cli/setup.js::envArgs()` maps any `WA_<NAME>` env var onto the
 *   camelCased CLI option `<name>`), so `WA_KEY` maps onto the `--key`/`-k`
 *   flag — never passed as a CLI flag, so it never appears in
 *   `ps`/process listings. open-wa's own auth middleware
 *   (`dist/cli/server.js::setupAuthenticationLayer`) reads it back from a
 *   `key` or `api_key` HTTP header (not `Authorization: Bearer`) and
 *   explicitly exempts `/api-docs*` — the health probe route — from the
 *   check, so no auth header is needed for `healthUrl`.
 * - `--session-data-path` (env `WA_SESSION_DATA_PATH`, confirmed via
 *   `bin/config-schema.json`) is documented as "relative to the current
 *   working directory ... used to store and read your `.data.json` files" —
 *   passed as `"data"` (relative, per that documented usage) with `cwd` set
 *   to this service's DATA_DIR subfolder (like every other embedded
 *   service, instead of the OS user home directory), so the paired
 *   WhatsApp session survives restarts without a re-scanned QR code.
 * - Headless is already the default (`--headful` defaults to `false`) — no
 *   flag needed.
 */
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs {
  const serverPath = getServerPath();
  fs.mkdirSync(path.join(OPENWA_INSTALL_DIR, "data"), { recursive: true });

  return {
    command: process.execPath,
    args: [
      serverPath,
      "--port",
      String(port),
      "--host",
      "127.0.0.1",
      "--session-data-path",
      "data",
    ],
    env: {
      ...process.env,
      NODE_ENV: "production",
      WA_KEY: apiKey,
    },
    cwd: OPENWA_INSTALL_DIR,
  };
}
