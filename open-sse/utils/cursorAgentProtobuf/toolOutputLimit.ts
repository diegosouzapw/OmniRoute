/**
 * Size caps Cursor applies to tool results the agent host sends back.
 *
 * Cursor's own host writes an MCP text result over 40000 bytes to a file and
 * returns its location. A result sent inline above that size is cut at byte
 * 40000 server-side, with a notice telling the model not to retry and nothing
 * about where the cut fell, so the model guesses offsets and re-reads. A
 * ReadSuccess over 100000 characters is rejected outright. We fit results under
 * both caps ourselves, on a line boundary, and name the line the result stops
 * at so the model can continue from there.
 */

/** Below Cursor's 40000-byte inline MCP text limit, with room for its envelope. */
export const CURSOR_MCP_TEXT_MAX_BYTES = 38_000;
/** Below Cursor's 100000-character ReadSuccess content limit. */
export const CURSOR_READ_CONTENT_MAX_BYTES = 95_000;

const NOTICE_RESERVE_BYTES = 512;
// "12: x" (plain), "    12→x" (Claude Code), "00012| x" (OpenCode), "    12\tx" (cat -n).
const LINE_NUMBER = /^\s*(\d+)(?::|\||→|\t)/;

export type FittedToolOutput = { text: string; truncated: boolean };

export function fitCursorToolOutput(text: string, maxBytes: number): FittedToolOutput {
  const totalBytes = Buffer.byteLength(text, "utf8");
  if (totalBytes <= maxBytes) return { text, truncated: false };

  const lines = text.split("\n");
  const budget = maxBytes - NOTICE_RESERVE_BYTES;
  let keptBytes = 0;
  let kept = 0;
  while (kept < lines.length) {
    const next = Buffer.byteLength(lines[kept], "utf8") + (kept > 0 ? 1 : 0);
    if (keptBytes + next > budget) break;
    keptBytes += next;
    kept++;
  }

  if (kept === 0) {
    // A single line longer than the budget: cut it by bytes, dropping a
    // multi-byte character split at the boundary.
    const head = Buffer.from(lines[0], "utf8").subarray(0, budget).toString("utf8");
    const body = head.replace(/�$/, "");
    const notice =
      `\n\n[Output truncated by the router: the first line alone is longer than Cursor's ` +
      `${maxBytes}-byte limit for a tool result, so only its first ` +
      `${Buffer.byteLength(body, "utf8")} of ${totalBytes} bytes are shown. ` +
      `Request a narrower result to see the rest.]`;
    return { text: body + notice, truncated: true };
  }

  const body = lines.slice(0, kept).join("\n");
  const lastNumber = LINE_NUMBER.exec(lines[kept - 1])?.[1];
  const size =
    `first ${kept} of ${lines.length} lines, ${keptBytes} of ${totalBytes} bytes, ` +
    `because Cursor accepts at most ${maxBytes} bytes per tool result`;
  const notice =
    lastNumber !== undefined
      ? `\n\n[Output truncated by the router: this result ends at line ${Number(lastNumber)} ` +
        `(${size}). The remaining lines were not sent. To see them, continue from line ` +
        `${Number(lastNumber) + 1}, e.g. read again starting at that line with a smaller limit.]`
      : `\n\n[Output truncated by the router: showing the ${size}. The remaining lines were ` +
        `not sent. To see them, request the part after line ${kept} of this output or a ` +
        `narrower result.]`;
  return { text: body + notice, truncated: true };
}
