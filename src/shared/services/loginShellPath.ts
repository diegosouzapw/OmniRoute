// Login-shell PATH resolution (#3321).
//
// macOS GUI / Electron apps do NOT inherit the user's interactive shell PATH: a packaged
// app launched from Finder/Dock gets the truncated GUI PATH (/usr/bin:/bin:/usr/sbin:/sbin),
// missing Homebrew (/opt/homebrew/bin), nvm/volta shims, ~/.local/bin, etc. So any CLI
// detection (`which`, `command -v`) or CLI spawn run from that process can't find tools
// that ARE on the user's shell PATH — every CLI shows up as "not installed". We recover
// the real PATH by asking the user's login shell for it, then merge it into the lookup env.
//
// The pure helpers below are unit-tested with an injected shell runner; only the actual
// `$SHELL -ilc` spawn is platform-dependent.

import { execFileSync } from "node:child_process";
import path from "node:path";

/** Merge an extra PATH string into a base PATH: de-duped, base entries kept first. */
export function mergeShellPath(
  basePath: string,
  extraPath: string,
  delimiter: string = path.delimiter
): string {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const entry of [...basePath.split(delimiter), ...extraPath.split(delimiter)]) {
    const trimmed = entry.trim();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    out.push(trimmed);
  }
  return out.join(delimiter);
}

/** Extract the value of the `PATH=` line from `env`-style shell output. */
export function parseShellPathOutput(output: string): string | null {
  if (!output) return null;
  for (const line of output.split("\n")) {
    if (line.startsWith("PATH=")) {
      return line.slice("PATH=".length).trim() || null;
    }
  }
  return null;
}

export interface LoginShellPathOptions {
  platform?: NodeJS.Platform;
  shell?: string;
  /** Injectable shell runner (returns the raw stdout); defaults to a safe execFileSync. */
  runShell?: (shell: string) => string;
}

/**
 * Query the user's login shell for its PATH. Returns null on non-darwin platforms (where
 * the launching terminal already exports the full PATH), on failure, or when no PATH can
 * be parsed.
 *
 * Hard Rule #13-safe: the shell binary comes from `$SHELL` (OS-provided, not untrusted
 * input) and is validated against a strict charset; the command is a literal argv array
 * (`["-ilc", "command -p env"]`) with NO string interpolation.
 */
export function getLoginShellPath(opts: LoginShellPathOptions = {}): string | null {
  const platform = opts.platform ?? process.platform;
  if (platform !== "darwin") return null;
  const shell = opts.shell || process.env.SHELL || "/bin/zsh";
  if (!/^[\w./-]+$/.test(shell)) return null;
  const run =
    opts.runShell ||
    ((sh: string): string =>
      execFileSync(sh, ["-ilc", "command -p env"], {
        encoding: "utf8",
        timeout: 3000,
        stdio: ["ignore", "pipe", "ignore"],
      }));
  try {
    return parseShellPathOutput(run(shell));
  } catch {
    return null;
  }
}

// The `$SHELL -ilc` spawn costs ~100-500ms, so compute it once per process.
let cached: string | null | undefined;

/** Cached {@link getLoginShellPath} — computed once, reused for every detection/spawn. */
export function getCachedLoginShellPath(): string | null {
  if (cached === undefined) cached = getLoginShellPath();
  return cached;
}
