/**
 * Reverse the Windows `shell: true` argument escaping so assertions can be
 * written against the logical argv on every platform.
 *
 * `bin/cli/commands/run.mjs` escapes argv before spawning, because on win32 the
 * launchers must go through cmd.exe to run npm `.cmd` shims (CVE-2024-27980)
 * and Node's `shell: true` joins argv with no escaping at all (DEP0190). That
 * escaping is correct and deliberate, but it means `plan.args` holds
 * `^^^"--model^^^"` on Windows where it holds `--model` elsewhere.
 *
 * Tests care about *which* arguments a plan carries, not about how they survive
 * cmd.exe, so they normalise first. Keep this in sync with
 * `escapeWindowsShellArg` in bin/cli/utils/winShellArgs.mjs.
 */

/**
 * @param {unknown} arg
 * @returns {string}
 */
export function unescapeWindowsShellArg(arg) {
  let s = String(arg);
  // 1. undo the two caret passes applied to cmd.exe metacharacters
  s = s.replace(/\^(.)/g, "$1").replace(/\^(.)/g, "$1");
  // 2. drop the wrapping quotes added by the CRT argv layer
  if (s.length >= 2 && s.startsWith('"') && s.endsWith('"')) s = s.slice(1, -1);
  // 3. undo the doubled backslashes and the escaped embedded quotes in a single
  // left-to-right pass — two sequential global replaces would let the first
  // pass's output feed the second (e.g. an escaped-backslash-then-quote
  // sequence could be misread), which is exactly what js/double-escaping flags.
  s = s.replace(/\\\\|\\"/g, (m) => (m === "\\\\" ? "\\" : '"'));
  return s;
}

/**
 * Normalise a plan's argv to its logical form. A no-op off Windows.
 *
 * @param {unknown[]} args
 * @param {NodeJS.Platform|string} [platform]
 * @returns {string[]}
 */
export function logicalArgs(args, platform = process.platform) {
  const list = [...(args ?? [])].map(String);
  return platform === "win32" ? list.map(unescapeWindowsShellArg) : list;
}
