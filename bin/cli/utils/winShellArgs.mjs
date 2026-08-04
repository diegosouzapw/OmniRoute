/**
 * Argument escaping for child processes spawned with `shell: true` on Windows.
 *
 * The launchers (`omniroute launch`, `omniroute launch-codex`) must go through
 * cmd.exe on win32 because the target binaries are npm `.cmd` shims that Node
 * cannot exec directly (CVE-2024-27980). With `shell: true` Node joins argv with
 * plain spaces and no escaping at all (the DEP0190 warning), so anything with a
 * space, a quote or a cmd metacharacter reaches the child mangled.
 */

/** cmd.exe metacharacters that stay live inside a quoted argument. */
const WIN_META_CHARS = /([()\][%!^"`<>&|;, *?])/g;

/**
 * Escape one argument for a cmd.exe command line built by `shell: true`.
 *
 * Two layers, in order:
 *  1. the CRT argv rules the target binary parses (double the backslashes that
 *     precede a quote, escape embedded quotes, wrap in quotes);
 *  2. cmd.exe's metacharacters, caret-escaped — applied TWICE because the
 *     target is an npm `.cmd` shim that forwards `%*` to node, so the line is
 *     parsed by cmd a second time. Single-escaping truncated any argument at
 *     the first `&` or `|`. (Same rule as cross-spawn's doubleEscapeMetaChars.)
 *
 * @param {unknown} arg
 * @returns {string}
 */
export function escapeWindowsShellArg(arg) {
  const s = String(arg);
  if (s === "") return '""';
  let out = s.replace(/(\\*)"/g, '$1$1\\"').replace(/(\\*)$/, "$1$1");
  out = `"${out}"`;
  return out.replace(WIN_META_CHARS, "^$1").replace(WIN_META_CHARS, "^$1");
}

/**
 * Escape a whole argv for the `shell: true` path. Off Windows there is no shell,
 * so argv is passed through untouched.
 *
 * @param {string[]} args
 * @param {NodeJS.Platform|string} platform
 * @returns {string[]}
 */
export function quoteShellArgs(args, platform) {
  const list = [...(args ?? [])];
  return platform === "win32" ? list.map(escapeWindowsShellArg) : list;
}
