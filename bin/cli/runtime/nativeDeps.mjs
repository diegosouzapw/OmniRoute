import {
  existsSync,
  readFileSync,
  writeFileSync,
  openSync,
  readSync,
  closeSync,
  mkdirSync,
} from "node:fs";
import { join, sep } from "node:path";
import { spawnSync } from "node:child_process";
import { platform } from "node:os";
import { resolveDataDir } from "../data-dir.mjs";

const BETTER_SQLITE3_VERSION = "12.9.0";

function runtimeDir() {
  return join(resolveDataDir(), "runtime");
}

function runtimeModules() {
  return join(runtimeDir(), "node_modules");
}

export function ensureRuntimeDir() {
  const dir = runtimeDir();
  mkdirSync(dir, { recursive: true });
  const pkgPath = join(dir, "package.json");
  if (!existsSync(pkgPath)) {
    writeFileSync(
      pkgPath,
      JSON.stringify(
        {
          name: "omniroute-runtime",
          version: "1.0.0",
          private: true,
          description: "User-writable runtime deps for OmniRoute (native binaries)",
        },
        null,
        2
      )
    );
  }
  return dir;
}

export function getRuntimeNodeModules() {
  return runtimeModules();
}

export function hasModule(name) {
  return existsSync(join(runtimeModules(), name, "package.json"));
}

export function isBetterSqliteBinaryValid() {
  const binary = join(
    runtimeModules(),
    "better-sqlite3",
    "build",
    "Release",
    "better_sqlite3.node"
  );
  if (!existsSync(binary)) return false;
  try {
    const fd = openSync(binary, "r");
    const buf = Buffer.alloc(4);
    readSync(fd, buf, 0, 4, 0);
    closeSync(fd);
    const magic = buf.toString("hex");
    const os = platform();
    if (os === "linux") return magic.startsWith("7f454c46"); // ELF
    if (os === "darwin") return magic.startsWith("cffaedfe") || magic.startsWith("cefaedfe"); // Mach-O
    if (os === "win32") return magic.startsWith("4d5a"); // PE/MZ
    return true;
  } catch {
    return false;
  }
}

export function npmInstallRuntime(pkgs, opts = {}) {
  const cwd = ensureRuntimeDir();
  const npmArgs = ["install", ...pkgs, "--no-audit", "--no-fund", "--prefer-online", "--no-save"];
  // On Windows .cmd files cannot be executed without a shell; use cmd.exe /c explicitly
  // so we never set shell:true (which would propagate env and enable injection).
  const isWin = platform() === "win32";
  const [exe, args] = isWin ? ["cmd.exe", ["/c", "npm", ...npmArgs]] : ["npm", npmArgs];
  if (!opts.silent) {
    process.stdout.write(`[omniroute][runtime] npm ${npmArgs.join(" ")}\n`);
  }
  const res = spawnSync(exe, args, {
    cwd,
    stdio: opts.silent ? "ignore" : "inherit",
    timeout: opts.timeout ?? 180_000,
    shell: false,
    env: { ...process.env },
  });
  return res.status === 0;
}

/**
 * Ensure better-sqlite3 is installed and valid in the runtime dir.
 * Returns { betterSqlite: boolean }.
 */
export function ensureBetterSqliteRuntime({ silent = false, force = false } = {}) {
  ensureRuntimeDir();
  const valid = hasModule("better-sqlite3") && isBetterSqliteBinaryValid();
  if (valid && !force) {
    if (!silent) process.stdout.write("[omniroute][runtime] better-sqlite3 OK\n");
    return { betterSqlite: true };
  }
  const ok = npmInstallRuntime([`better-sqlite3@${BETTER_SQLITE3_VERSION}`], { silent });
  if (!ok && !silent) {
    process.stderr.write("[omniroute][runtime] better-sqlite3 install failed\n");
  }
  return { betterSqlite: ok && hasModule("better-sqlite3") && isBetterSqliteBinaryValid() };
}

/**
 * Build an env object with NODE_PATH extended to include the runtime node_modules.
 */
export function buildEnvWithRuntime(baseEnv = process.env) {
  const runtimeNm = runtimeModules();
  const existing = baseEnv.NODE_PATH || "";
  const parts = [runtimeNm, existing].filter(Boolean);
  return { ...baseEnv, NODE_PATH: parts.join(sep === "\\" ? ";" : ":") };
}
