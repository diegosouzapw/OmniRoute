// Tools whose meaningful prefix is two words (verb + subcommand).
const TWO_WORD_TOOLS = new Set([
  "git", "npm", "docker", "kubectl", "cargo", "go", "pip", "yarn", "pnpm", "bun",
]);

const ENV_ASSIGNMENT_RE = /^[A-Za-z_][A-Za-z0-9_]*=/;
// Command-injection signals: ; | & ` $(   (newline handled separately)
const INJECTION_RE = /[;|&`]|\$\(/;

/** Tokenize a shell command on whitespace, respecting simple single/double quotes. */
function tokenize(command: string): string[] {
  const tokens: string[] = [];
  let current = "";
  let quote: string | null = null;
  for (const ch of command) {
    if (quote) {
      if (ch === quote) quote = null;
      else current += ch;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (/\s/.test(ch)) {
      if (current) { tokens.push(current); current = ""; }
    } else {
      current += ch;
    }
  }
  if (current) tokens.push(current);
  return tokens;
}

export function extractCommandPrefix(command: string): string {
  if (typeof command !== "string" || !command.trim()) return "";
  if (INJECTION_RE.test(command) || command.includes("\n")) {
    return "command_injection_detected";
  }
  let tokens = tokenize(command);
  // Strip leading FOO=bar env assignments.
  while (tokens.length && ENV_ASSIGNMENT_RE.test(tokens[0])) tokens = tokens.slice(1);
  if (!tokens.length) return "";
  const head = tokens[0];
  // Only form a two-word prefix when the second token is an actual subcommand,
  // not a flag. We intentionally do not parse flag-arguments (e.g. `git -C <path>`);
  // for those we fall back to the single-word head (conservative, never wrong).
  if (TWO_WORD_TOOLS.has(head) && tokens.length > 1 && !tokens[1].startsWith("-")) {
    return `${head} ${tokens[1]}`;
  }
  return head;
}

const READ_COMMANDS = new Set(["cat", "head", "tail", "less", "more", "bat", "type"]);
const LISTING_COMMANDS = new Set(["ls", "dir", "find", "tree"]);
// grep flags that consume the NEXT arg (so it is not a filepath).
const GREP_ARG_FLAGS = new Set(["-e", "-f", "-m", "-A", "-B", "-C"]);

export function extractFilepathsFromCommand(command: string, _output = ""): string[] {
  if (typeof command !== "string" || !command.trim()) return [];
  const tokens = tokenize(command);
  if (!tokens.length) return [];
  const head = tokens[0];

  if (LISTING_COMMANDS.has(head)) return [];

  if (head === "grep") {
    const files: string[] = [];
    let patternConsumed = false;
    for (let i = 1; i < tokens.length; i++) {
      const tok = tokens[i];
      if (tok.startsWith("-")) {
        if (GREP_ARG_FLAGS.has(tok)) {
          i++; // skip this flag's argument
          // -e/-f supply the pattern itself, so the positional pattern is already consumed.
          if (tok === "-e" || tok === "-f") patternConsumed = true;
        }
        continue;
      }
      if (!patternConsumed) { patternConsumed = true; continue; } // first non-flag = pattern
      files.push(tok);
    }
    return files;
  }

  if (READ_COMMANDS.has(head)) {
    return tokens.slice(1).filter((t) => !t.startsWith("-"));
  }

  return [];
}
