/**
 * Host-availability checks for local-CLI providers (#14363).
 *
 * Providers flagged `isLocalCli` in the registry (zcode, auggie,
 * devin-cli-agentic, codex-app-server) only serve a request when something
 * outside OmniRoute exists on the machine running the server. Profile
 * generators use this to avoid writing profiles that fail on first use with
 * `spawn ... ENOENT` / 5xx.
 *
 * Dependency-free on purpose: bin/ runs without the Next.js path aliases, so the
 * server-side detectors (src/lib/cli-helper/tool-detector.ts, which pulls in
 * cliRuntime.ts and its `@/` imports) are not importable here. The binary
 * resolution below mirrors the executors' own discovery order
 * (open-sse/executors/zcode.ts defaultCommand(), auggie.ts resolveAuggieBin()).
 *
 * Fail closed: a local-CLI provider without a check here is reported as not
 * available, and callers offer `--include-local` to opt back in.
 */

import { existsSync, statSync } from "node:fs";
import os from "node:os";
import path from "node:path";

function isFile(p) {
  try {
    return statSync(p).isFile();
  } catch {
    return false;
  }
}

/**
 * Resolve `name` against PATH. On Windows, PATHEXT extensions are tried and
 * `%APPDATA%\npm` (where npm drops global .cmd shims, #6263) is searched too.
 * An absolute or relative path with a separator is checked as-is.
 * @returns {string|null}
 */
export function findExecutable(name, { env = process.env, platform = process.platform } = {}) {
  if (!name) return null;
  const pathMod = platform === "win32" ? path.win32 : path.posix;
  const hasSeparator = name.includes("/") || (platform === "win32" && name.includes("\\"));
  const exts =
    platform === "win32"
      ? [
          "",
          ...(env.PATHEXT || ".COM;.EXE;.BAT;.CMD")
            .split(";")
            .map((e) => e.trim())
            .filter(Boolean),
        ]
      : [""];

  if (hasSeparator) {
    for (const ext of exts) {
      if (isFile(name + ext)) return name + ext;
    }
    return null;
  }

  const dirs = String(env.PATH ?? env.Path ?? "")
    .split(pathMod.delimiter)
    .filter(Boolean);
  if (platform === "win32" && env.APPDATA) dirs.push(pathMod.join(env.APPDATA, "npm"));

  for (const dir of dirs) {
    for (const ext of exts) {
      const candidate = pathMod.join(dir, name + ext);
      if (isFile(candidate)) return candidate;
    }
  }
  return null;
}

function detectZcode({ env, platform, homedir }) {
  const runtimeRoot = env.ZCODE_SERVER_RUNTIME_ROOT || path.join(homedir, ".zcode", "server");
  const serverNode = env.ZCODE_SERVER_NODE || path.join(runtimeRoot, "node");
  const serverEntry = env.ZCODE_SERVER_ENTRY || path.join(runtimeRoot, "zcode-server.cjs");
  if (existsSync(serverNode) && existsSync(serverEntry)) return { available: true };
  const bin = env.ZCODE_BIN || "zcode";
  return findExecutable(bin, { env, platform })
    ? { available: true }
    : { available: false, reason: `binary not found (${bin})` };
}

function detectAuggie({ env, platform, homedir }) {
  const envBin = (env.AUGGIE_BIN || env.CLI_AUGGIE_BIN || "").trim();
  if (envBin) {
    return findExecutable(envBin, { env, platform })
      ? { available: true }
      : { available: false, reason: `binary not found (${envBin})` };
  }
  const installerPaths =
    platform === "win32"
      ? [
          path.join(
            env.LOCALAPPDATA || path.join(homedir, "AppData", "Local"),
            "auggie",
            "bin",
            "auggie.exe"
          ),
        ]
      : [
          path.join(homedir, ".local", "share", "auggie", "bin", "auggie"),
          path.join(homedir, ".auggie", "bin", "auggie"),
        ];
  if (installerPaths.some((p) => existsSync(p))) return { available: true };
  return findExecutable("auggie", { env, platform })
    ? { available: true }
    : { available: false, reason: "binary not found (auggie)" };
}

const DETECTORS = {
  zcode: detectZcode,
  auggie: detectAuggie,
};

/**
 * Is the local-CLI provider `providerId` usable on this host?
 * @param {string} providerId
 * @param {{env?:NodeJS.ProcessEnv, platform?:string, homedir?:string}} [ctx]
 * @returns {{available:boolean, reason?:string}}
 */
export function detectLocalCliProvider(providerId, ctx = {}) {
  const detector = DETECTORS[providerId];
  if (!detector) {
    return { available: false, reason: "no host availability check (use --include-local)" };
  }
  return detector({
    env: ctx.env ?? process.env,
    platform: ctx.platform ?? process.platform,
    homedir: ctx.homedir ?? os.homedir(),
  });
}
