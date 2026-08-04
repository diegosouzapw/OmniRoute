/**
 * Quote-aware composite-command splitter.
 *
 * Splits a shell command string on top-level `&&`, `||`, or `;` separators
 * (i.e. those NOT inside single quotes, double quotes, backtick subshells,
 * or `$(...)` subshells) and returns the LAST significant segment (trimmed).
 *
 * - No separator found → returns the input unchanged.
 * - Last segment is empty (e.g. trailing `&&`) → falls back to the previous non-empty one.
 * - O(n) char-by-char scan; zero RegExp over the full input (anti-ReDoS).
 */
export function lastCommandSegment(command: string): string {
  if (!command) return command;

  const segments: string[] = [];
  let current = 0; // start index of the current segment
  let depth = 0; // nesting depth for $(...) / (...)
  let inSingle = false;
  let inDouble = false;
  let inBacktick = false;

  const push = (end: number): void => {
    segments.push(command.slice(current, end));
  };

  for (let i = 0; i < command.length; i++) {
    const ch = command[i];

    // ── quote / subshell state tracking ──────────────────────────────────
    if (inSingle) {
      if (ch === "'") inSingle = false;
      continue;
    }
    if (inBacktick) {
      if (ch === "`") inBacktick = false;
      continue;
    }
    if (inDouble) {
      if (ch === '"') inDouble = false;
      // $( inside double-quotes still opens a subshell
      if (ch === "$" && command[i + 1] === "(") {
        depth++;
        i++; // skip the '('
      }
      continue;
    }
    if (depth > 0) {
      if (ch === "(") depth++;
      else if (ch === ")") depth--;
      continue;
    }

    // ── open new quote / subshell context ────────────────────────────────
    if (ch === "'") {
      inSingle = true;
      continue;
    }
    if (ch === '"') {
      inDouble = true;
      continue;
    }
    if (ch === "`") {
      inBacktick = true;
      continue;
    }
    if (ch === "$" && command[i + 1] === "(") {
      depth++;
      i++; // skip the '('
      continue;
    }
    if (ch === "(") {
      depth++;
      continue;
    }

    // ── top-level separator detection ─────────────────────────────────────
    if (ch === "&" && command[i + 1] === "&") {
      push(i);
      i += 1; // skip second '&'
      current = i + 1;
      continue;
    }
    if (ch === "|" && command[i + 1] === "|") {
      push(i);
      i += 1; // skip second '|'
      current = i + 1;
      continue;
    }
    if (ch === ";") {
      push(i);
      current = i + 1;
      continue;
    }
  }

  // push the remainder
  push(command.length);

  if (segments.length === 1) {
    // no top-level separator found → return unchanged
    return command;
  }

  // find the last non-empty (after trim) segment
  for (let i = segments.length - 1; i >= 0; i--) {
    const trimmed = segments[i].trim();
    if (trimmed) return trimmed;
  }

  return command;
}
