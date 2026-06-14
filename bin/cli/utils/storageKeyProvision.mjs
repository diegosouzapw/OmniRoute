/**
 * Decide whether a CLI invocation should provision (generate + persist) the
 * STORAGE_ENCRYPTION_KEY into DATA_DIR/.env.
 *
 * Purely informational invocations must NOT create `~/.omniroute/.env` or write
 * a key — they never touch encrypted storage. Generating a 32-byte key and a
 * `.env` file just to print `omniroute --version` (or `--help`) is a surprising
 * side effect: a read-only command should not mutate the data dir.
 *
 * Returns FALSE only for: `--version`/`-V` or `--help`/`-h` anywhere in the args,
 * and the `help`/`completion` subcommands.
 *
 * Returns TRUE for everything else, INCLUDING a bare `omniroute` (no args) — the
 * `serve` command is `isDefault: true`, so a bare invocation starts the server,
 * which needs the encryption key. This preserves the #1622 persistence fix
 * (key generated on first real run and reused across restarts).
 *
 * @param {string[]} argv - process.argv (node + script + args).
 * @returns {boolean}
 */
const INFO_FLAGS = new Set(["-h", "--help", "-V", "--version"]);
const INFO_COMMANDS = new Set(["help", "completion"]);

export function shouldProvisionStorageKey(argv) {
  const args = Array.isArray(argv) ? argv.slice(2) : [];
  // Bare `omniroute` runs the default `serve` command → must provision.
  if (args.length === 0) return true;
  if (args.some((a) => INFO_FLAGS.has(a))) return false;
  if (INFO_COMMANDS.has(args[0])) return false;
  return true;
}
