/**
 * Parser/scrubber for DeepSeek-V4-Flash's non-standard "DSML" tool-call text
 * format.
 *
 * Background: DeepSeek-V4-Flash occasionally emits tool calls as inline text
 * wrapped in full-width-pipe (U+FF5C) markers instead of the standard OpenAI
 * `tool_calls` JSON. Two shapes appear in production call logs:
 *
 *   1. Complete block (call log 1787040934679-f8f772):
 *        <｜DSML｜:Read>
 *        <path>images/omniroute.png</path>
 *        </｜DSML｜:Read>
 *      The tool name follows a leading colon (`:Read`); child elements
 *      (`<path>`, `<parameter name="...">`) carry the arguments.
 *
 *   2. Stray closing markers with no opener (call logs 1787566395384-bab9ab,
 *      2026-08-20 22:59–23:49 run, 2026-08-23 22:51–23:38 run): the model
 *      starts a tool call, truncates it, and emits only the closers — sometimes
 *      trailing a system-prompt echo — then finishes with `stop` and no
 *      `tool_calls`:
 *        </｜DSML｜parameter>
 *        </｜DSML｜invoke>
 *        </｜DSML｜tool_calls>
 *      or a mixed ASCII/DSML variant:
 *        </parameter>
 *        </invoke>
 *        </｜DSML｜tool_calls>
 *
 * The openai-compatible path (default.ts + openai-to-claude.ts) never parsed
 * these, so the markers leaked to the client as visible content and the turn
 * ended incomplete. This module converts complete DSML blocks into OpenAI
 * `tool_calls` and strips stray closing markers from content so neither the
 * markers nor the tool-call grammar reach the client.
 *
 * Markers use full-width pipes `｜` (U+FF5C); we also accept the ASCII `|`
 * defensively. The marker body is the literal `DSML` followed by either a
 * colon-prefixed tool name (opening tag) or one of the structural words
 * `tool_calls` / `invoke` / `parameter` (structural closing tags).
 */

// Full-width or ASCII pipe — matches composerToolCalls.ts's FW class.
const FW = "[｜|]";

// Opening tool-call tag: <｜DSML｜:ToolName>  (colon + name, optional attrs).
const DSML_OPEN_RE = new RegExp(`<${FW}DSML${FW}:(\\w+)([^>]*)>`, "i");

// The matching closing tag for a tool named ToolName: </｜DSML｜:ToolName>.
function dsmlCloseRe(name: string): RegExp {
  return new RegExp(`</${FW}DSML${FW}:${name}\\s*>`, "i");
}

// A single child element carrying an argument: <path>value</path> (name only)
// or <parameter name="arg">value</parameter> (named). Value is verbatim inner
// text up to the matching close.
const DSML_CHILD_NAME_ONLY_RE = /<(\w+)>([\s\S]*?)<\/\1>/g;
const DSML_CHILD_NAMED_RE = /<parameter\s+name="([^"]*)"[^>]*>([\s\S]*?)<\/parameter>/gi;

// Source string for the stray-closer regex (kept as a constant so the pattern
// is buildable from the `FW` class without re-interpolating it inline). Each
// alternative matches the closer + any trailing newlines, so the marker and
// its separator are removed together while a leading newline (an echo's own
// trailing newline) stays intact.
const STRAY_CLOSE_SRC =
  `</${FW}DSML${FW}(?:tool_calls|invoke|parameter)\\s*>\\n*` + `|</(?:parameter|invoke)>\\n*`;

// Structural closing markers that appear with NO opener when a tool call is
// truncated: </｜DSML｜parameter>, </｜DSML｜invoke>, </｜DSML｜tool_calls>, plus
// the mixed ASCII variant </parameter> </invoke> </｜DSML｜tool_calls>. The
// closers are usually \n-separated and often trail a system-prompt echo, so
// each alternative also consumes the newline(s) that FOLLOW it — that keeps an
// echoed preamble intact while removing the marker together with its trailing
// separator newline. A leading newline before the first closer is NOT
// consumed, so the echo's own trailing newline is preserved.
const DSML_STRAY_CLOSE_RE = new RegExp(STRAY_CLOSE_SRC, "gi");

// Partial opening marker at the very tail of a (streaming) chunk: a `<｜DSML｜`
// that never closes — hold it back so it cannot leak as visible text and can
// be re-evaluated once more bytes arrive.
const DSML_PARTIAL_OPEN_RE = new RegExp(`(<${FW}DSML${FW}[^<]*)$`, "i");

export interface DsmlToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

export interface ParseDsmlResult {
  content: string;
  toolCalls: DsmlToolCall[];
  /** Partial opening marker held back for the next chunk (streaming-safe). */
  holdback: string;
}

/**
 * Parse a complete (non-streaming) DSML content string into OpenAI tool calls
 * + scrubbed content. Complete `<｜DSML｜:Tool>` blocks become tool calls;
 * stray closing markers are removed; everything else passes through.
 */
export function parseDsmlToolCalls(text: string): ParseDsmlResult {
  if (!text || typeof text !== "string") {
    return { content: text || "", toolCalls: [], holdback: "" };
  }

  let remaining = text;
  const toolCalls: DsmlToolCall[] = [];
  let cleaned = "";

  while (remaining.length > 0) {
    const openMatch = remaining.match(DSML_OPEN_RE);
    if (!openMatch || openMatch.index === undefined) {
      // No more complete openers. Strip stray closing markers from the tail
      // (and a trailing partial opener, if any).
      let tail = remaining.replace(DSML_STRAY_CLOSE_RE, "");
      const partial = tail.match(DSML_PARTIAL_OPEN_RE);
      let holdback = "";
      if (partial) {
        tail = tail.slice(0, partial.index);
        holdback = partial[1];
      }
      cleaned += tail;
      return { content: cleaned, toolCalls, holdback };
    }

    // Emit any text before the opener (stray closers already removed).
    const before = remaining.slice(0, openMatch.index).replace(DSML_STRAY_CLOSE_RE, "");
    cleaned += before;

    const toolName = openMatch[1];
    const afterOpen = remaining.slice(openMatch.index + openMatch[0].length);
    const closeRe = dsmlCloseRe(toolName);
    const closeMatch = afterOpen.match(closeRe);
    if (!closeMatch) {
      // Opener without a closer — incomplete block. Treat the opener itself
      // as held-back (drop it from content) rather than leaking the marker.
      return { content: cleaned, toolCalls, holdback: openMatch[0] + afterOpen };
    }

    const inner = afterOpen.slice(0, closeMatch.index);
    const args = parseDsmlArgs(inner);
    toolCalls.push({
      id: `call_dsml_${crypto.randomUUID().replace(/-/g, "").slice(0, 10)}`,
      type: "function",
      function: { name: toolName, arguments: JSON.stringify(args) },
    });

    remaining = afterOpen.slice(closeMatch.index + closeMatch[0].length);
  }

  return { content: cleaned, toolCalls, holdback: "" };
}

/**
 * Extract arguments from a DSML block body. Named `<parameter name="x">`
 * children win; bare `<tag>value</tag>` children fall back to the tag name as
 * the argument key.
 */
function parseDsmlArgs(inner: string): Record<string, unknown> {
  const args: Record<string, unknown> = {};
  // Named parameters first (explicit argument names).
  const namedRe = new RegExp(DSML_CHILD_NAMED_RE);
  let m;
  const consumed = new Set<string>();
  while ((m = namedRe.exec(inner)) !== null) {
    args[m[1]] = m[2].trim();
    consumed.add(m[0]);
  }
  // Bare-name children that were not part of a named <parameter>.
  const bareRe = new RegExp(DSML_CHILD_NAME_ONLY_RE);
  while ((m = bareRe.exec(inner)) !== null) {
    if (consumed.has(m[0])) continue;
    // Skip nested children already captured by an outer bare element.
    let nested = false;
    for (const c of consumed) {
      if (c.includes(m[0]) && c !== m[0]) {
        nested = true;
        break;
      }
    }
    if (nested) continue;
    args[m[1]] = m[2].trim();
    consumed.add(m[0]);
  }
  return args;
}

/** Cheap detection used by callers to decide whether to run the full parser. */
export function hasDsmlToolCalls(text: string): boolean {
  if (!text || typeof text !== "string") return false;
  return /[/]?[｜|]DSML[｜|]/.test(text);
}
