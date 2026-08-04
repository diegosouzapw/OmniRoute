/**
 * Known-install-path trust & candidate-matching helpers for cliRuntime.ts.
 *
 * Extracted from cliRuntime.ts (which is at its frozen file-size budget) so the
 * #7753/#7774 fixes don't grow that file. Both helpers are dependency-injected
 * (no import back into cliRuntime.ts) to avoid a circular module reference.
 */

export type PathWithinFn = (childPath: string, parentPath: string) => boolean;

/**
 * #7753 — nvm-windows/nvm/asdf/pyenv symlink-escape false positive.
 *
 * Check whether either the original (pre-resolution) candidate path or its
 * resolved realpath target falls within a trusted parent directory. Checking
 * both — not just the resolved target — credits that `commandPath` was already
 * constructed from a trusted root by `getKnownToolPaths()`, so a symlink/junction
 * placed there by a version manager (nvm-windows, nvm, asdf, pyenv) whose
 * resolved target lives in a private per-version store outside
 * `EXPECTED_PARENT_PATHS` is still recognized as legitimate. A symlink whose
 * ORIGINAL location is also untrusted (not reachable through the trusted-root
 * candidate generator) stays rejected.
 */
export const isLocationTrusted = async (
  commandPath: string,
  realPath: string,
  expectedParentPaths: string[],
  isPathWithin: PathWithinFn,
  realpath: (targetPath: string) => Promise<string>
): Promise<boolean> => {
  for (const parent of expectedParentPaths) {
    if (isPathWithin(commandPath, parent) || isPathWithin(realPath, parent)) {
      return true;
    }

    try {
      const resolvedParent = await realpath(parent);
      if (isPathWithin(commandPath, resolvedParent) || isPathWithin(realPath, resolvedParent)) {
        return true;
      }
    } catch {
      // Ignore missing/unresolvable parents and continue checking the remaining ones.
    }
  }
  return false;
};

export type KnownPathCheckResult = {
  installed: boolean;
  commandPath: string | null;
  reason: string | null;
};

/**
 * #7774 — known-path short-circuit hides a genuinely runnable binary.
 *
 * Walk the known-install-path candidates for a tool. A genuine positive
 * identification (installed, or installed-but-not-executable) returns
 * immediately. Any other failure reason (unsafe_path/symlink_escape/
 * suspicious_size/not_file/…) is only REMEMBERED, not returned — a single stray
 * artifact at one guessed location must not stop the remaining candidates (or
 * the PATH fallback in the caller) from being tried.
 */
export const findKnownPathMatch = async <T extends KnownPathCheckResult>(
  knownPaths: string[],
  checkKnownPath: (candidatePath: string) => Promise<T>
): Promise<{ match: T | null; bestFailure: T | null }> => {
  let bestFailure: T | null = null;
  for (const knownPath of knownPaths) {
    const result = await checkKnownPath(knownPath);
    if (result.installed) {
      return { match: result, bestFailure: null };
    }
    if (result.reason && result.reason !== "not_found" && !bestFailure) {
      bestFailure = result;
    }
  }
  return { match: null, bestFailure };
};
