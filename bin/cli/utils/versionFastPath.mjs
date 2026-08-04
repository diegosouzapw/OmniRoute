/**
 * Decide whether a CLI invocation is a bare `--version`/`-V` query that should
 * short-circuit BEFORE the runtime polyfill import, env-file loading, and
 * Commander's command registration (~70 command modules) are loaded.
 *
 * Scope is intentionally narrow — only a single, unambiguous `--version`/`-V`
 * argument fast-paths. Anything else (extra args, a subcommand, `--help`,
 * global options like `--lang`/`--output` alongside it) falls through to the
 * normal Commander flow. Unlike `--version`, OmniRoute's `--help` output is
 * generated dynamically from every registered subcommand, so skipping
 * registration would change (truncate) the help text — that flag is
 * deliberately NOT fast-pathed here.
 *
 * Mirrors the intent of upstream 9router PR #2414 (fast-path help/version
 * before expensive self-heal hooks), adapted to OmniRoute's Commander-based
 * CLI where the equivalent expensive work is eager command registration
 * rather than npm-install-based runtime self-healing.
 *
 * @param {string[]} argv - process.argv (node + script + args).
 * @returns {boolean}
 */
export function isVersionFastPath(argv) {
  const args = Array.isArray(argv) ? argv.slice(2) : [];
  return args.length === 1 && (args[0] === "--version" || args[0] === "-V");
}
