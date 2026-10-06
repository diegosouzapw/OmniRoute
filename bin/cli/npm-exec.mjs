// Spawning npm from the CLI, on every platform.
//
// On Windows npm is `npm.cmd`, a batch wrapper. Node ≥ 24 refuses to spawn a
// `.cmd` without a shell (nodejs/node#52554), and a bare `npm` can additionally
// resolve to an extensionless shim that `CreateProcess` cannot execute — so the
// call fails with `EINVAL` or `ENOENT` while npm works fine in the same terminal.
// `src/lib/services/installers/utils.ts` already solves this for the server; this
// is the same rule for the `bin/cli` entry points, which cannot import TypeScript.
//
// SECURITY (Hard Rule #13): enabling the shell means the SHELL splits the command
// line, not `execFile`. Every argv element passed alongside these options must be
// a literal — never a runtime value — or it must be validated first. Callers that
// need to pass a user-supplied name have to guard it themselves.

/** The npm binary to spawn on this platform. */
export function npmBin(platform = process.platform) {
  const isBun = Boolean(process.versions.bun);
  if (platform === "win32") return isBun ? "bun.exe" : "npm.cmd";
  return isBun ? "bun" : "npm";
}

/**
 * `execFile` / `spawnSync` options for an npm call.
 *
 * @param {NodeJS.Platform} platform
 * @param {{ timeoutMs?: number, stdio?: string }} [options]
 */
export function npmExecOptions(platform = process.platform, options = {}) {
  const base = {};
  if (options.timeoutMs !== undefined) base.timeout = options.timeoutMs;
  if (options.stdio !== undefined) base.stdio = options.stdio;
  if (platform !== "win32") return { ...base, shell: false };
  return { ...base, shell: true, windowsHide: true };
}
