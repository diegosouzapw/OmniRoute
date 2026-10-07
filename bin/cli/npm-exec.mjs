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
//
// DEP0190 (Node ≥ 24): `normalizeSpawnArguments` also emits a deprecation warning
// whenever `shell` is set alongside a non-empty args array, because the shell only
// concatenates that argv onto the command instead of escaping it. So the argv-array
// form that #11335 needed is the one thing that cannot be used with the shell on
// win32 — the two fixes collided. `npmExecInvocation` resolves it by handing
// `execFile` the already-joined command line and an EMPTY args array, which is the
// same string Node would have built, minus the warning.

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

/**
 * A token that cannot change how a shell splits a command line: no whitespace, no
 * quote, no cmd.exe or POSIX metacharacter, no backslash. Covers every shape the
 * CLI actually spawns npm with — subcommands (`view`, `changelog`), flags
 * (`--prefer-online`), package names, scoped names (`@scope/pkg`), dist-tags and
 * semver ranges.
 */
const LITERAL_NPM_TOKEN = /^[A-Za-z0-9@._/:=+-]+$/;

/**
 * The `execFile` arguments for an npm call on `platform`, ready to spread:
 * `execFile(...npmExecInvocation(platform, npmBin(platform), args, options))`.
 *
 * Off Windows there is no shell, so the argv array is returned verbatim and the
 * tokens are not inspected at all — the platform that does not need a shell gets no
 * new restriction. On win32 the tokens are joined into a single command string and
 * the args array comes back EMPTY, which is the only shape that both spawns
 * `npm.cmd` (it needs the shell, #11335) and avoids DEP0190 (#15327): Node's
 * `normalizeSpawnArguments` warns on `shell` + a non-empty args array and then
 * builds `${file} ${args.join(" ")}` itself, so an empty array with a pre-joined
 * file produces byte-identical input to the shell.
 *
 * Hard Rule #13 is enforced here rather than assumed. Joining a command line is
 * only safe while every token is a literal, so a token outside
 * {@link LITERAL_NPM_TOKEN} throws instead of being concatenated — the call fails
 * loudly rather than letting the shell reinterpret a runtime value. A caller that
 * genuinely has one (a path, a user-supplied package name) must validate it first
 * and escape it with `escapeWindowsShellArg` from `./utils/winShellArgs.mjs`, or
 * pass it through the environment.
 *
 * @param {NodeJS.Platform} platform
 * @param {string} bin
 * @param {string[]} [args]
 * @param {{ timeoutMs?: number, stdio?: string }} [options]
 * @returns {[string, string[], Record<string, unknown>]}
 */
export function npmExecInvocation(
  platform = process.platform,
  bin = npmBin(platform),
  args = [],
  options = {}
) {
  const execOptions = npmExecOptions(platform, options);
  const tokens = [bin, ...(args ?? [])];

  if (execOptions.shell !== true) {
    return [tokens[0], tokens.slice(1), execOptions];
  }

  for (const token of tokens) {
    if (!LITERAL_NPM_TOKEN.test(token)) {
      throw new Error(
        `npmExecInvocation: refusing to join the non-literal token ${JSON.stringify(
          token
        )} into a win32 shell command line (Hard Rule #13) — validate it first, then escape it with escapeWindowsShellArg() from bin/cli/utils/winShellArgs.mjs, or pass it through the environment.`
      );
    }
  }

  return [tokens.join(" "), [], execOptions];
}
