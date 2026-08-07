/**
 * Dario (@askalf/dario) installer adapter for the ServiceSupervisor framework.
 *
 * Dario (https://github.com/askalf/dario) is a local, OpenAI- and
 * Anthropic-compatible proxy that authenticates with the operator's own
 * Claude Pro/Max subscription (Claude Code OAuth) and rebuilds every request
 * into Claude Code's exact wire shape so traffic bills to the subscription
 * pool rather than per-token API rates. It fills the same role for the
 * `claude` provider that CLIProxyAPI's "claude-native" deep-proxy mode does —
 * but Dario is npm-published (`@askalf/dario`, `"bin": {"dario":"./dist/cli.js"}`),
 * so it is installed like Mux/Bifrost/9Router — `npm install` into a
 * DATA_DIR-scoped directory via `runNpm` (Hard Rule #13: no shell
 * interpolation, array args + `env` option only) — NOT via the GitHub-release
 * binary-download machinery CLIProxyAPI uses.
 *
 * Binary location: $DATA_DIR/services/dario/node_modules/@askalf/dario/dist/cli.js
 * State dir:        $DATA_DIR/services/dario/home/.dario  (see HOME redirect below)
 * DB row:           version_manager WHERE tool = 'dario'
 */

import fs from "node:fs";
import path from "node:path";
import { DATA_DIR } from "@/lib/db/core";
import { upsertVersionManagerTool } from "@/lib/db/versionManager";
import { runNpm, InstallError } from "./utils";

export const DARIO_PACKAGE = "@askalf/dario";
export const DARIO_DEFAULT_PORT = 3456;
export const DARIO_INSTALL_DIR = path.join(DATA_DIR, "services", "dario");

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

// In-memory latest-version cache, 1h TTL — mirrors mux.ts / bifrost.ts.
let latestVersionCache: { value: string; expiresAt: number } | null = null;
const VERSION_CACHE_TTL_MS = 3_600_000;

// Resolve the install dir lazily from the *current* DATA_DIR so a runtime
// DATA_DIR override (operator env change, or a test's tmp-dir isolation) is
// honored — the module-level DARIO_INSTALL_DIR const is frozen at import
// (same reasoning as getBifrostInstallDir in bifrost.ts).
function getDarioInstallDir(): string {
  return process.env.DATA_DIR
    ? path.join(process.env.DATA_DIR, "services", "dario")
    : DARIO_INSTALL_DIR;
}

// Dario is a scoped package: @askalf/dario → node_modules/@askalf/dario/…
function getCliPath(): string {
  return path.join(getDarioInstallDir(), "node_modules", "@askalf", "dario", "dist", "cli.js");
}

function getInstalledPkgPath(): string {
  return path.join(getDarioInstallDir(), "node_modules", "@askalf", "dario", "package.json");
}

/**
 * Dario has no env var to relocate its state directory: `dist/accounts.js`
 * hardcodes `const DARIO_DIR = join(homedir(), '.dario')`. The only lever is
 * `homedir()` itself, which Node resolves from `HOME` on POSIX and
 * `USERPROFILE` on Windows. So we scope Dario's `.dario/` account+config store
 * under DATA_DIR by pointing HOME/USERPROFILE at a service-owned home dir —
 * keeping OAuth account files out of the real OS user's home the way MUX_ROOT
 * scopes Mux and DATA_DIR scopes 9Router. See resolveSpawnArgs() below.
 */
export function getDarioHomeDir(): string {
  return path.join(getDarioInstallDir(), "home");
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
    const { stdout } = await runNpm(["view", DARIO_PACKAGE, "version"], { timeoutMs: 30_000 });
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
 * Download and install Dario from npm.
 * Upserts the version_manager row with tool='dario'.
 */
export async function install(version = "latest"): Promise<InstallResult> {
  const startMs = Date.now();
  const installDir = getDarioInstallDir();

  // Create install dir + minimal package.json (idempotent) — same shape as mux/bifrost.
  fs.mkdirSync(installDir, { recursive: true });
  const hostPkgPath = path.join(installDir, "package.json");
  if (!fs.existsSync(hostPkgPath)) {
    fs.writeFileSync(
      hostPkgPath,
      JSON.stringify(
        { name: "omniroute-dario-host", version: "0.0.0", private: true, dependencies: {} },
        null,
        2
      ),
      "utf8"
    );
  }

  await runNpm(
    ["install", `${DARIO_PACKAGE}@${version}`, "--omit=dev", "--no-audit", "--no-fund"],
    // `--prefix` is passed via `prefix` (→ npm_config_prefix env) instead of an
    // argv path so an install dir with spaces survives the Windows shell (#5379).
    { cwd: installDir, prefix: installDir }
  );

  const installedVersion = await getInstalledVersion();
  if (!installedVersion) {
    throw new InstallError(
      "Could not read installed version from node_modules/@askalf/dario/package.json",
      "Dario instalado mas versão não pôde ser lida.",
      500
    );
  }

  await upsertVersionManagerTool({
    tool: "dario",
    installedVersion,
    binaryPath: getCliPath(),
    status: "stopped",
    port: DARIO_DEFAULT_PORT,
  });

  // Invalidate cache so next getLatestVersion() re-fetches
  latestVersionCache = null;

  return {
    installedVersion,
    installPath: installDir,
    durationMs: Date.now() - startMs,
  };
}

export async function update(): Promise<InstallResult> {
  return install("latest");
}

/**
 * Build spawn args for ServiceSupervisor.start().
 *
 * Dario binds to 127.0.0.1 explicitly (never 0.0.0.0) — defense-in-depth
 * matching mux.ts / bifrost.ts, and because Dario adds/removes real Claude
 * OAuth credentials over its admin API. `apiKey` becomes DARIO_ADMIN_TOKEN:
 * with DARIO_ADMIN=1 the proxy mounts its `/admin/*` control plane (headless
 * OAuth login-start/complete, account list/remove), and every admin call must
 * carry `Authorization: Bearer <DARIO_ADMIN_TOKEN>` even on loopback. The
 * token is passed via env (Dario's documented form), never as a CLI arg, so it
 * never appears in `ps`/process listings.
 *
 * Before any account is configured Dario still starts fine — LLM routes 503
 * with `{"error":"No account configured"}` and /health returns 503 "degraded"
 * until the first account lands. That is the expected pre-OAuth state, not a
 * startup failure (ServiceSupervisor.waitForHealthy tolerates it).
 */
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs {
  const cliPath = getCliPath();
  const installDir = getDarioInstallDir();

  // Scope Dario's `~/.dario` state under DATA_DIR by redirecting the home dir
  // (Dario hardcodes join(homedir(),'.dario') with no env override — see
  // getDarioHomeDir()). Create it up front so the child never falls back to a
  // real home path if the redirect var is somehow dropped.
  const darioHome = getDarioHomeDir();
  fs.mkdirSync(darioHome, { recursive: true });

  return {
    command: process.execPath,
    args: [cliPath, "proxy", "--host", "127.0.0.1", "--port", String(port)],
    env: {
      ...process.env,
      NODE_ENV: "production",
      // Home redirect → Dario's ~/.dario lands under DATA_DIR/services/dario/home.
      HOME: darioHome,
      USERPROFILE: darioHome,
      // Loopback bind (redundant with the CLI flags above; belt-and-braces).
      DARIO_HOST: "127.0.0.1",
      DARIO_PORT: String(port),
      // Headless admin control plane (OAuth login + account management).
      DARIO_ADMIN: "1",
      DARIO_ADMIN_TOKEN: apiKey,
      // Run as a SINGLE Node process — do NOT let Dario relaunch itself under
      // Bun. When Bun is present Dario re-execs the proxy as a `bun run` child
      // (closer TLS fingerprint to Claude Code), but that child becomes the
      // real port holder while ServiceSupervisor only tracks — and SIGTERMs —
      // the Node parent. On stop the Bun child orphaned and kept binding the
      // port, so the next start fast-crashed with EADDRINUSE ("already
      // running"). Clean, deterministic lifecycle for a supervised embedded
      // service outweighs the stealth benefit here. Tradeoff: the proxy-mode
      // TLS ClientHello diverges from Claude Code's; if that ever proves to
      // matter for a real account, revisit with process-group kill semantics
      // in ServiceSupervisor rather than re-enabling the orphan.
      DARIO_NO_BUN: "1",
      // Silence the companion "Bun not installed → TLS fingerprint diverges"
      // startup warning so it doesn't spam the log ring buffer every boot.
      DARIO_QUIET_TLS: "1",
    },
    cwd: installDir,
  };
}
