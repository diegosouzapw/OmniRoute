/**
 * OmniRoute — cross-platform spawning of locally installed build tools.
 *
 * WHY: `node_modules/.bin/<tool>` (no extension) is a POSIX shell script. On
 * Windows the executable shim is `<tool>.cmd`, so `execFileSync(join(ROOT,
 * "node_modules", ".bin", "esbuild"), …)` dies with
 *
 *   Error: spawnSync C:\…\node_modules\.bin\esbuild ENOENT
 *
 * and — because the `postbuild` hook runs after a SUCCESSFUL `next build` — the
 * operator sees "✓ Compiled successfully" immediately followed by a failed
 * `npm run build`, with a complete `.build/next/standalone` tree on disk.
 *
 * Switching to `<tool>.cmd` alone is not enough: since the CVE-2024-27980
 * hardening, Node >= 20 refuses to spawn a `.cmd`/`.bat` without a shell
 * (EINVAL), and `shell: true` in turn disables argument escaping (DEP0190).
 *
 * So the preferred path avoids the shim entirely: read the tool's own `bin`
 * entry from its package.json and run THAT with this Node binary — no shim, no
 * shell, nothing to escape, identical behaviour on every platform. The `.bin`
 * shim stays only as a last resort for a tool that is not resolvable inside the
 * local dependency tree.
 *
 * These helpers were private to `scripts/build/prepublish.ts`, where the same
 * Windows failure was already fixed; they live here so plain-`node` build
 * scripts (`postbuild` → colocate-standalone.mjs) can share one implementation
 * instead of re-learning the same lesson. `planBuildToolSpawn()` takes the
 * platform as a parameter — like `resolveNextBuildEnv()` in
 * build-next-isolated.mjs — so the Windows behaviour is unit-testable from CI's
 * Linux runners.
 */
import { execFileSync } from "node:child_process";
import { closeSync, existsSync, openSync, readFileSync, readSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(dirname(fileURLToPath(import.meta.url))));

/**
 * Absolute path of a tool's own `bin` entry inside the local dependency tree,
 * or `null` when the package (or the entry it advertises) is not there.
 *
 * @param {string} packageName Package that ships the tool, e.g. `"esbuild"`.
 * @param {string} binName Key in that package's `bin` map, e.g. `"esbuild"`.
 * @param {string} [root] Directory holding `node_modules` (defaults to repo root).
 * @returns {string | null}
 */
export function resolveLocalBinEntry(packageName, binName, root = ROOT) {
  try {
    const packageJsonPath = join(root, "node_modules", packageName, "package.json");
    if (!existsSync(packageJsonPath)) return null;
    const meta = JSON.parse(readFileSync(packageJsonPath, "utf8"));
    const relative = typeof meta.bin === "string" ? meta.bin : meta.bin?.[binName];
    if (!relative) return null;
    const absolute = join(root, "node_modules", packageName, relative);
    return existsSync(absolute) ? absolute : null;
  } catch {
    return null;
  }
}

/**
 * Does this file start with an executable image's magic bytes?
 *
 * esbuild >= 0.25 ships `bin/esbuild` as the NATIVE platform executable on
 * Linux/macOS (ELF / Mach-O) instead of a JS shim — handing that to
 * `process.execPath` makes Node parse machine code as JavaScript and die with
 * "SyntaxError: Invalid or unexpected token". Native entries must be executed
 * directly; JS entries go through this Node binary.
 *
 * @param {string} entryPath
 * @returns {boolean}
 */
export function isNativeExecutable(entryPath) {
  try {
    const fd = openSync(entryPath, "r");
    const head = Buffer.alloc(4);
    readSync(fd, head, 0, 4, 0);
    closeSync(fd);
    return (
      (head[0] === 0x7f && head[1] === 0x45 && head[2] === 0x4c && head[3] === 0x46) || // ELF
      head.readUInt32BE(0) === 0xfeedfacf || // Mach-O 64
      head.readUInt32BE(0) === 0xcffaedfe || // Mach-O 64 (LE on disk)
      (head[0] === 0x4d && head[1] === 0x5a) // PE (Windows MZ)
    );
  } catch {
    return false;
  }
}

/**
 * `cmd.exe` receives one flat command line, and Node does NOT escape arguments
 * when `shell` is set, so anything holding whitespace has to be quoted here.
 * Build arguments carry absolute paths, and `C:\Users\First Last\…` is an
 * ordinary Windows home directory.
 *
 * @param {string} value
 * @returns {string}
 */
function quoteForShell(value) {
  if (!/\s/.test(value) || value.startsWith('"')) return value;
  return `"${value}"`;
}

/**
 * Decide HOW to spawn a build tool. Pure: no filesystem access, no `process`
 * inspection beyond `execPath`, platform injected — so a Linux test can assert
 * the Windows plan.
 *
 * @param {object} input
 * @param {string} input.binName Tool name as it appears in `node_modules/.bin`.
 * @param {readonly string[]} input.args Arguments for the tool.
 * @param {string | null} [input.entryPath] Result of {@link resolveLocalBinEntry}.
 * @param {boolean} [input.entryIsNative] Result of {@link isNativeExecutable}.
 * @param {string} [input.root] Directory holding `node_modules`.
 * @param {string} [input.platform] `process.platform` value to plan for.
 * @returns {{ file: string, args: string[], shell: boolean }} `file`/`args` are
 *   already shell-quoted when `shell` is true, and must be passed together.
 */
export function planBuildToolSpawn({
  binName,
  args,
  entryPath = null,
  entryIsNative = false,
  root = ROOT,
  platform = process.platform,
}) {
  // Preferred: the tool's own entry point, spawned with no shim and no shell.
  if (entryPath) {
    return entryIsNative
      ? { file: entryPath, args: [...args], shell: false }
      : { file: process.execPath, args: [entryPath, ...args], shell: false };
  }

  // Last resort: the `node_modules/.bin` shim. On Windows that means the `.cmd`
  // variant, which Node only spawns through a shell (see the module header).
  const isWindows = platform === "win32";
  const shim = join(root, "node_modules", ".bin", isWindows ? `${binName}.cmd` : binName);
  return isWindows
    ? { file: quoteForShell(shim), args: args.map(quoteForShell), shell: true }
    : { file: shim, args: [...args], shell: false };
}

/**
 * Run a locally installed build tool, synchronously, on any platform.
 *
 * @param {string} packageName Package that ships the tool, e.g. `"esbuild"`.
 * @param {string} binName Key in that package's `bin` map, e.g. `"esbuild"`.
 * @param {readonly string[]} args Arguments for the tool.
 * @param {import("node:child_process").ExecFileSyncOptions} [options] Passed to `execFileSync`.
 * @returns {void}
 */
export function runBuildTool(packageName, binName, args, options = {}) {
  const entryPath = resolveLocalBinEntry(packageName, binName);
  const plan = planBuildToolSpawn({
    binName,
    args,
    entryPath,
    entryIsNative: entryPath ? isNativeExecutable(entryPath) : false,
  });
  execFileSync(plan.file, plan.args, plan.shell ? { ...options, shell: true } : options);
}
