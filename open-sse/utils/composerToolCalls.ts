/**
 * Parser for Cursor Composer's DeepSeek-style inline tool call format.
 *
 * Composer (Cursor's `cu/composer-2.5*` models) emits tool calls inside its
 * normal text output using sentinel markers, e.g.:
 *
 *     Optional preamble text...
 *     <｜tool▁calls▁begin｜>
 *     <｜tool▁call▁begin｜>
 *     tool_name
 *     <｜tool▁sep｜>arg_name
 *     arg_value
 *     <｜tool▁sep｜>arg_name_2
 *     arg_value_2
 *     <｜tool▁call▁end｜>
 *     <｜tool▁call▁begin｜>
 *     other_tool
 *     <｜tool▁sep｜>arg
 *     value
 *     <｜tool▁call▁end｜>
 *     <｜tool▁calls▁end｜>
 *     Optional trailing text...
 *
 * Markers use full-width pipes (`｜`, U+FF5C) and small-triangle separator
 * (`▁`, U+2581). We also accept ASCII fallbacks (`<|tool_calls_begin|>` etc.)
 * defensively in case Cursor ever changes encoding.
 *
 * The parser converts this into the OpenAI Chat Completions `tool_calls`
 * shape and returns the residual content (preamble + trailing text) so the
 * caller can decide whether to surface it as the assistant's visible message.
 */

const FW = "[｜|]"; // full-width or ASCII pipe
const SEP = "[▁_]"; // full-width separator or ASCII underscore

// Match the outer tool-calls block, lazily.
const OUTER_RE = new RegExp(
  `<${FW}tool${SEP}calls${SEP}begin${FW}>([\\s\\S]*?)<${FW}tool${SEP}calls${SEP}end${FW}>`,
  "i"
);

// Match a single tool-call block.
const INNER_RE = new RegExp(
  `<${FW}tool${SEP}call${SEP}begin${FW}>([\\s\\S]*?)<${FW}tool${SEP}call${SEP}end${FW}>`,
  "gi"
);

// Match an arg separator.
const ARG_SEP_RE = new RegExp(`<${FW}tool${SEP}sep${FW}>`, "gi");

// Heuristic: any partial opening marker (start of `<｜tool` ... without the
// final `>`). Used by the streaming parser to know it must hold back text.
const PARTIAL_OPEN_MARKER_RE = new RegExp(
  `<${FW}?(?:t(?:o(?:o(?:l(?:${SEP}(?:c(?:a(?:l(?:l(?:s)?(?:${SEP}(?:b(?:e(?:g(?:i(?:n${FW}?>?)?)?)?)?)?)?)?)?)?)?)?)?)?)?)?$`,
  "i"
);

export interface ComposerToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
}

export interface ParseComposerResult {
  content: string;
  toolCalls: ComposerToolCall[];
}

export interface StreamingState {
  emitted: number;
  done: boolean;
}

export interface FeedChunkResult {
  safeDelta: string;
  ready: boolean;
  toolCalls: ComposerToolCall[];
  holdback: boolean;
}

// Detection helper
export function hasComposerToolCalls(text: string): boolean {
  if (!text || typeof text !== "string") return false;
  return OUTER_RE.test(text);
}

function generateToolCallId(index: number): string {
  // Format: call_<random>; mirrors what OpenAI clients expect.
  // Use crypto for deterministic-quality randomness (Hard Rule: no Math.random for IDs).
  const rand = crypto.randomUUID().replace(/-/g, "").slice(0, 10);
  return `call_${rand}${index}`;
}

/**
 * Parse a single inner tool-call block body (the text between
 * `<｜tool▁call▁begin｜>` and `<｜tool▁call▁end｜>`).
 *
 * Body shape:
 *   tool_name
 *   <｜tool▁sep｜>arg_name
 *   arg_value
 *   <｜tool▁sep｜>arg_name_2
 *   arg_value_2
 *
 * Returns {name, arguments} where arguments is a JSON string suitable for
 * the OpenAI tool_calls schema. Arg values are taken verbatim from the
 * text between one separator's argname-line and the next separator (or
 * end of body). We attempt to detect when a value is already valid JSON
 * (object/array/number/bool/null) and store it natively; otherwise we keep
 * it as a string.
 */
function parseInnerCall(body: string): { name: string; arguments: string } | null {
  // Body starts with the tool name on (typically) its own line, optionally
  // surrounded by whitespace, then the first `<｜tool▁sep｜>`.
  const trimmed = body.replace(/^\s+|\s+$/g, "");
  // Split by argument separator first to isolate name + arg blocks.
  const segments = trimmed.split(ARG_SEP_RE);
  // First segment is the tool name (and any preamble whitespace).
  const name = (segments.shift() ?? "").trim();
  if (!name) {
    return null;
  }
  const args: Record<string, unknown> = {};
  for (const seg of segments) {
    if (!seg) continue;
    // Each segment is `arg_name\nvalue\n...`. The arg name is the first
    // line; everything after the first newline is the value (verbatim,
    // including additional newlines).
    const idxNl = seg.indexOf("\n");
    let argName: string;
    let argValue: string;
    if (idxNl < 0) {
      argName = seg.trim();
      argValue = "";
    } else {
      argName = seg.slice(0, idxNl).trim();
      argValue = seg.slice(idxNl + 1);
    }
    if (!argName) continue;
    // Strip the trailing newline before the next separator (the separator
    // marker itself was already consumed by the split).
    argValue = argValue.replace(/\n+$/, "");
    // Attempt JSON parse so structured args (objects/arrays/numbers/bools)
    // come through as native JSON values rather than quoted strings.
    args[argName] = coerceArgValue(argValue);
  }
  return { name, arguments: JSON.stringify(args) };
}

function coerceArgValue(raw: string): unknown {
  if (raw === "") return "";
  const stripped = raw.trim();
  if (
    (stripped.startsWith("{") && stripped.endsWith("}")) ||
    (stripped.startsWith("[") && stripped.endsWith("]"))
  ) {
    try {
      return JSON.parse(stripped);
    } catch {
      // not valid JSON — fall through to string
    }
  }
  if (stripped === "true") return true;
  if (stripped === "false") return false;
  if (stripped === "null") return null;
  if (/^-?\d+$/.test(stripped)) {
    const n = Number(stripped);
    if (Number.isSafeInteger(n)) return n;
  }
  if (/^-?\d*\.\d+$/.test(stripped)) {
    const n = Number(stripped);
    if (Number.isFinite(n)) return n;
  }
  return raw;
}

/**
 * Parse a complete (non-streaming) Composer content string.
 *
 * Returns { content, toolCalls } where:
 *   - content: the residual visible text (preamble + trailing text combined
 *     and trimmed; empty string if nothing left).
 *   - toolCalls: array of OpenAI-shaped tool_calls; empty if none found.
 *
 * If the input has no tool-call block, returns { content: input, toolCalls: [] }.
 */
export function parseComposerToolCalls(text: string): ParseComposerResult {
  if (!text || typeof text !== "string") {
    return { content: text || "", toolCalls: [] };
  }

  const match = text.match(OUTER_RE);
  if (!match || match.index === undefined) {
    return { content: text, toolCalls: [] };
  }

  const preamble = text.slice(0, match.index);
  const trailing = text.slice(match.index + match[0].length);
  const block = match[1];

  const toolCalls: ComposerToolCall[] = [];
  let idx = 0;
  for (const innerMatch of block.matchAll(INNER_RE)) {
    const parsed = parseInnerCall(innerMatch[1]);
    if (!parsed) continue;
    toolCalls.push({
      id: generateToolCallId(idx),
      type: "function",
      function: parsed,
    });
    idx += 1;
  }

  const residual = (preamble + trailing).trim();
  return { content: residual, toolCalls };
}

/**
 * Streaming helper: feed it the *accumulated* content seen so far and it
 * returns what is safe to emit as visible text, plus whether tool calls
 * are now ready to be flushed.
 *
 *   { safeDelta, ready, toolCalls, holdback }
 *
 *   safeDelta: text delta that can be emitted to the client right now as a
 *     content delta (relative to how much was already emitted via state.emitted).
 *   ready: true once a complete `<｜tool▁calls▁end｜>` has been seen and
 *     toolCalls are parsed.
 *   toolCalls: parsed tool calls (only populated when ready=true).
 *   holdback: whether more bytes are being held back (an outer-block has
 *     opened but not yet closed, OR a partial opening marker is at the
 *     tail of the buffer).
 *
 * Usage pattern:
 *   const state = createStreamingState();
 *   for each frame: const out = feedStreamingChunk(state, accumulated);
 *     emit out.safeDelta as content delta;
 *     if (out.ready) emit out.toolCalls and stop emitting content.
 */
export function createStreamingState(): StreamingState {
  return {
    emitted: 0, // number of safe content chars already emitted
    done: false,
  };
}

export function feedStreamingChunk(state: StreamingState, accumulated: string): FeedChunkResult {
  if (state.done) {
    return { safeDelta: "", ready: false, toolCalls: [], holdback: false };
  }
  if (!accumulated) {
    return { safeDelta: "", ready: false, toolCalls: [], holdback: false };
  }

  // 1. Complete block already in buffer? Parse it.
  const m = accumulated.match(OUTER_RE);
  if (m && m.index !== undefined) {
    const preamble = accumulated.slice(0, m.index);
    const block = m[1];
    const toolCalls: ComposerToolCall[] = [];
    let idx = 0;
    for (const innerMatch of block.matchAll(INNER_RE)) {
      const parsed = parseInnerCall(innerMatch[1]);
      if (!parsed) continue;
      toolCalls.push({
        id: generateToolCallId(idx),
        type: "function",
        function: parsed,
      });
      idx += 1;
    }
    // Emit any preamble we haven't emitted yet.
    const safe = preamble;
    const safeDelta = safe.length > state.emitted ? safe.slice(state.emitted) : "";
    state.emitted = safe.length;
    state.done = true;
    return { safeDelta, ready: true, toolCalls, holdback: false };
  }

  // 2. Look for an opening-only marker. If found, everything before it is
  //    safe; everything after must be held until we see the closing marker.
  const openOnlyRe = new RegExp(`<${FW}tool${SEP}calls${SEP}begin${FW}>`, "i");
  const openMatch = accumulated.match(openOnlyRe);
  if (openMatch && openMatch.index !== undefined) {
    const safe = accumulated.slice(0, openMatch.index);
    const safeDelta = safe.length > state.emitted ? safe.slice(state.emitted) : "";
    state.emitted = safe.length;
    return { safeDelta, ready: false, toolCalls: [], holdback: true };
  }

  // 3. Partial opening marker at the tail? Hold back the suspicious tail.
  const tailMatch = accumulated.match(PARTIAL_OPEN_MARKER_RE);
  if (tailMatch && tailMatch.index !== undefined) {
    const safe = accumulated.slice(0, tailMatch.index);
    const safeDelta = safe.length > state.emitted ? safe.slice(state.emitted) : "";
    state.emitted = safe.length;
    return { safeDelta, ready: false, toolCalls: [], holdback: true };
  }

  // 4. No markers anywhere. Emit everything new.
  const safeDelta = accumulated.length > state.emitted ? accumulated.slice(state.emitted) : "";
  state.emitted = accumulated.length;
  return { safeDelta, ready: false, toolCalls: [], holdback: false };
}
