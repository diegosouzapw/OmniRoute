import { execFile } from "child_process";
import { promisify } from "util";
import { existsSync } from "fs";
import path from "path";
import { PROJECT_ROOT } from "./autoUpdate";

const execFileAsync = promisify(execFile);

type ExecFileLike = (
  file: string,
  args: string[],
  options: { timeout?: number; cwd?: string }
) => Promise<{ stdout: string | Buffer }>;

type ExistsLike = (target: string) => boolean;

/**
 * Resolve the real install directory of the globally-installed `omniroute` package — the directory
 * that owns `node_modules/better-sqlite3` and so is the correct cwd for `npm rebuild`.
 *
 * Replaces the hardcoded `${globalRoot}/omniroute/app` assumption (Bug 3, security-report v3.8.15):
 * the global package root is `${npm root -g}/omniroute`, not `/omniroute/app`. We probe the real
 * layout (current root first, then the legacy `app/` sub-dir) and fall back to the package root.
 *
 * `execImpl`/`fsExists` are injectable so the resolution logic is unit-testable without a real
 * global install.
 */
export async function resolveGlobalOmniroutePath(
  execImpl: ExecFileLike = execFileAsync,
  fsExists: ExistsLike = existsSync
): Promise<string> {
  const result = await execImpl("npm", ["root", "-g"], {
    timeout: 10000,
    cwd: PROJECT_ROOT,
  });
  const globalRoot = String(result.stdout).trim();

  const packageRoot = path.join(globalRoot, "omniroute");
  // [current layout, legacy layout] — first whose package.json exists wins.
  const candidates = [packageRoot, path.join(packageRoot, "app")];

  for (const candidate of candidates) {
    if (fsExists(path.join(candidate, "package.json"))) {
      return candidate;
    }
  }

  return packageRoot;
}
