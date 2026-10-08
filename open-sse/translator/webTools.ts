// Tool-call translation for web-cookie providers (DeepSeek Web, Perplexity Web, etc.).
//
// The web UIs accept only a single plain prompt string and have no native function
// calling — they reply with tool invocations as raw text. To let agentic clients use
// these providers we (a) serialize the OpenAI `tools` array into a system-prompt
// contract on the request side, and (b) parse the upstream `<tool>{...}</tool>` text
// back into OpenAI `tool_calls` on the response side. (#2820)

export interface OpenAIToolCall {
  id: string;
  type: "function";
  function: { name: string; arguments: string };
}

import { findTagBlocks } from "../utils/tagBlocks.ts";

interface OpenAIToolDef {
  type?: string;
  function?: {
    name?: string;
    description?: string;
    parameters?: unknown;
  };
}

const TOOL_OPEN_RE = /<tool>/g;
const TOOL_CLOSE_RE = /<\/tool>/g;

export interface SerializeToolsToPromptOptions {
  /** Retained for callers that opt into the nonce-bound contract. */
  hardened?: boolean;
  /** Limit verbose client-tool descriptions without changing their parameter schemas. */
  descriptionMaxChars?: number;
}

// Some web-cookie models (e.g. ds-web) wrap calls as `<tool_call name="...">{json}</tool_call>`
// instead of the canonical `<tool>{json}</tool>`. Capture the JSON body — the real tool name
// lives there, never in the tag's `name="..."` attribute (#3260).
// The attribute run stops at `<` as well as `>`: with `[^>]*` an unterminated `<tool_call ` scanned
// to the end of the text from every such tag, so a run of them was quadratic again.
const TOOL_CALL_OPEN_RE = /<tool_call(?:\s[^<>]*)?>/g;
const TOOL_CALL_CLOSE_RE = /<\/tool_call>/g;

const DSML_INVOKE_RE =
  /<(?<dsml>｜｜DSML｜｜|\|DSML\|)\s*invoke\s+name=["']([^"']+)["']\s*>([\s\S]*?)<\/\k<dsml>\s*invoke\s*>/g;

function normalizeDsmlToolCalls(text: string): string {
  DSML_INVOKE_RE.lastIndex = 0;
  return text
    .replace(DSML_INVOKE_RE, (_match, _dsml: string, name: string, body: string) => {
      const parameters: Record<string, unknown> = {};
      const parameterRe =
        /<(?:｜｜DSML｜｜|\|DSML\|)\s*parameter\s+name=["']([^"']+)["'][^>]*>([\s\S]*?)(?:<\/?(?:｜｜DSML｜｜|\|DSML\|)\s*parameter\s*>|(?=<(?:｜｜DSML｜｜|\|DSML\|)\s*parameter\s+name=|<\/(?:｜｜DSML｜｜|\|DSML\|)\s*invoke\s*>))/g;
      let parameter: RegExpExecArray | null;
      while ((parameter = parameterRe.exec(body)) !== null) {
        const raw = parameter[2].trim();
        try {
          parameters[parameter[1]] = JSON.parse(raw);
        } catch {
          parameters[parameter[1]] = raw;
        }
      }
      if (Object.keys(parameters).length === 0) {
        try {
          const parsed = JSON.parse(body.trim() || "{}");
          if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            Object.assign(parameters, parsed);
          }
        } catch {
          // Leave malformed arguments empty; the surrounding parser remains fail-safe.
        }
      }
      return `<tool>{"name":${JSON.stringify(name)},"arguments":${JSON.stringify(parameters)}}</tool>`;
    })
    .replace(/<\/?(?:｜｜DSML｜｜|\|DSML\|)\s*calls\s*>/g, "");
}

// Per-request nonce binding for tool envelopes (#9343). Associates a random nonce
// with each tools[] array reference so the serializer and parser can share it
// without threading extra parameters through executor call chains.
const toolNonceMap = new WeakMap<object, string>();

/**
 * Recently issued bindings. Agentic clients resend the previous contract inside the conversation
 * history, so on a continuation turn the model echoes the PREVIOUS turn's nonce while the parser
 * (keyed on the new `tools[]` reference) expects a fresh one. Without this window every
 * continuation tool call was rejected as a nonce mismatch and degraded to plain text — the tool
 * never ran. A binding that was never issued is still rejected, so the #9343 copy-attack guard
 * keeps its value.
 */
const recentToolNonces: string[] = [];
const RECENT_TOOL_NONCE_LIMIT = 12;

export function getToolNonce(tools: unknown): string {
  if (!Array.isArray(tools) || tools.length === 0) return "";
  let nonce = toolNonceMap.get(tools);
  if (!nonce) {
    nonce = Math.random().toString(36).slice(2, 10);
    toolNonceMap.set(tools, nonce);
    recentToolNonces.push(nonce);
    if (recentToolNonces.length > RECENT_TOOL_NONCE_LIMIT) recentToolNonces.shift();
  }
  return nonce;
}

/** True when the binding was issued recently (current or a previous turn). */
export function isRecentToolNonce(value: unknown): boolean {
  return typeof value === "string" && recentToolNonces.includes(value);
}

interface ToolParseCandidate {
  raw: string;
  start: number;
  end: number;
  requireRequestedTool: boolean;
}

export interface RequestedToolName {
  original: string;
  normalized: string;
}

function toRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function getRequestedToolNames(tools: unknown): RequestedToolName[] {
  if (!Array.isArray(tools)) return [];
  const names: RequestedToolName[] = [];
  const seen = new Set<string>();
  for (const tool of tools) {
    const record = toRecord(tool);
    const fn = toRecord(record?.function);
    const name = typeof fn?.name === "string" ? fn.name.trim() : "";
    if (!name || seen.has(name)) continue;
    seen.add(name);
    names.push({ original: name, normalized: normalizeToolName(name) });
  }
  return names;
}

function normalizeToolName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a) return b.length;
  if (!b) return a.length;
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  let current = Array<number>(b.length + 1);
  for (let i = 1; i <= a.length; i += 1) {
    current[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + cost);
    }
    const temp = previous;
    previous = current;
    current = temp;
  }
  return previous[b.length];
}

function scoreToolName(emitted: string, requested: RequestedToolName): number {
  if (emitted === requested.original) return 1;
  const normalized = normalizeToolName(emitted);
  if (!normalized || !requested.normalized) return 0;
  if (normalized === requested.normalized) return 0.98;

  const shorter = Math.min(normalized.length, requested.normalized.length);
  const longer = Math.max(normalized.length, requested.normalized.length);
  if (shorter >= 4) {
    if (normalized.includes(requested.normalized) || requested.normalized.includes(normalized)) {
      return 0.86 - (longer - shorter) / Math.max(longer, 1) / 4;
    }
  }

  const distance = levenshteinDistance(normalized, requested.normalized);
  const similarity = 1 - distance / Math.max(longer, 1);
  return similarity >= 0.72 ? similarity : 0;
}

export function resolveRequestedToolName(
  emitted: string,
  requestedTools: RequestedToolName[]
): string | null {
  if (requestedTools.length === 0) return emitted;

  let best: { name: string; score: number } | null = null;
  let secondBest = 0;
  for (const requested of requestedTools) {
    const score = scoreToolName(emitted, requested);
    if (!best || score > best.score) {
      secondBest = best?.score ?? 0;
      best = { name: requested.original, score };
    } else if (score > secondBest) {
      secondBest = score;
    }
  }

  if (!best || best.score < 0.72) return null;
  // Avoid correcting to an arbitrary tool when the fuzzy match is ambiguous.
  if (best.score < 0.98 && best.score - secondBest < 0.08) return null;
  return best.name;
}

function stripCodeFence(value: string): string {
  return value
    .trim()
    .replace(/^```(?:json|javascript|js|python)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function convertSingleQuotedStrings(value: string): string {
  let result = "";
  let inSingle = false;
  let inDouble = false;
  let escaped = false;

  for (const ch of value) {
    if (escaped) {
      result += ch === '"' && inSingle ? '\\"' : ch;
      escaped = false;
      continue;
    }

    if (ch === "\\") {
      result += ch;
      escaped = true;
      continue;
    }

    if (ch === '"') {
      if (inSingle) {
        result += '\\"';
      } else {
        inDouble = !inDouble;
        result += ch;
      }
      continue;
    }

    if (ch === "'" && !inDouble) {
      inSingle = !inSingle;
      result += '"';
      continue;
    }

    result += ch;
  }

  return result;
}

function replacePythonLiterals(value: string): string {
  let result = "";
  let inString = false;
  let escaped = false;
  let token = "";

  const flushToken = () => {
    if (token === "True") result += "true";
    else if (token === "False") result += "false";
    else if (token === "None") result += "null";
    else result += token;
    token = "";
  };

  for (const ch of value) {
    if (escaped) {
      if (token) flushToken();
      result += ch;
      escaped = false;
      continue;
    }

    if (ch === "\\") {
      if (token) flushToken();
      result += ch;
      escaped = inString;
      continue;
    }

    if (ch === '"') {
      if (token) flushToken();
      inString = !inString;
      result += ch;
      continue;
    }

    if (!inString && /[A-Za-z]/.test(ch)) {
      token += ch;
      continue;
    }

    if (token) flushToken();
    result += ch;
  }

  if (token) flushToken();
  return result;
}

function normalizeLooseJson(value: string): string {
  return replacePythonLiterals(convertSingleQuotedStrings(value))
    .replace(/([{,]\s*)([A-Za-z_][A-Za-z0-9_-]*)(\s*:)/g, '$1"$2"$3')
    .replace(/,\s*([}\]])/g, "$1");
}

/**
 * Repair the two malformations ChatGPT Web reliably produces when it copies a tool contract
 * that carries a large payload (for example a whole HTML file):
 *
 *   1. the binding is emitted *after* the object instead of inside it —
 *      `{"name":"write","arguments":{…}}_nonce":"abc"}`;
 *   2. string values contain unescaped quotes — `"content":"<!doctype html><html lang="en">"`.
 *
 * Both make the payload invalid JSON, so the call would otherwise degrade to plain text and the
 * client would never execute the tool. The binding is preserved (and still validated by the
 * caller) rather than discarded, so the #9343 copy-attack guard keeps working.
 */
export function repairToolEnvelopeJson(raw: string): string | null {
  let text = stripCodeFence(raw).trim();

  // Shape 1: the binding emitted after the object instead of inside it.
  const nonceAt = text.lastIndexOf("_nonce");
  let trailingNonce: string | null = null;
  if (nonceAt > 0) {
    const binding = text.slice(nonceAt).match(/^_nonce"?\s*:\s*"([^"]*)"/);
    if (binding) {
      trailingNonce = binding[1];
      text = text.slice(0, nonceAt).replace(/[,\s]+$/, "");
    }
  }

  // Only repair a structurally COMPLETE envelope. A body cut off mid-value (no closing
  // brace) is a truncated reply, not a malformed one: "repairing" it fabricates a call with
  // half-empty arguments (e.g. `{"filePath":""}`) and suppresses the parse-failure retry.
  if (!text.endsWith("}")) return null;

  const name = text.match(/"name"\s*:\s*"([^"]+)"/)?.[1];
  if (!name) return null;

  // Shape 2: string arguments contain unescaped quotes (a whole HTML document, a shell
  // command). Delimit each value by the NEXT KEY rather than by quotes, so stray `"` inside a
  // value cannot truncate or desynchronise it.
  const argsAt = text.search(/"arguments"\s*:\s*\{/);
  let argsText = argsAt === -1 ? "" : text.slice(text.indexOf("{", argsAt));
  if (argsText) {
    // End the arguments object at its FIRST closing quote (`"}` / `"}}`). Using the last match
    // picked up the tail of a key that follows `arguments`, which is how `*** End Patch"},`
    // reached OpenCode and broke apply_patch verification.
    const firstClose = argsText.search(/"\}{1,3}/);
    if (firstClose > 0) argsText = argsText.slice(0, firstClose + 1);
  }
  const args: Record<string, unknown> = {};
  if (argsText) {
    // Top-level keys are exactly the quoted names that follow `{` or `","`, i.e. the object's
    // own structure. Scanning for that literal shape avoids matching HTML attributes like
    // `lang="en"` that live inside a string value.
    const keyRe = /(?:\{|",)\s*"([^"]+)"\s*:/g;
    const marks: Array<{ key: string; valueStart: number; next: number }> = [];
    let match: RegExpExecArray | null;
    while ((match = keyRe.exec(argsText)) !== null) {
      if (match[1] === "arguments") continue;
      marks.push({
        key: match[1],
        valueStart: match.index + match[0].length,
        next: argsText.length,
      });
    }
    for (let index = 0; index + 1 < marks.length; index += 1) {
      // The next key's `","name":"` marker ends this value: everything up to the `"` that
      // closes the value belongs to it.
      const nextKeyMarker = argsText.indexOf(
        `","${marks[index + 1].key}":"`,
        marks[index].valueStart
      );
      if (nextKeyMarker !== -1) marks[index].next = nextKeyMarker + 1;
    }
    for (let index = 0; index < marks.length; index += 1) {
      const mark = marks[index];
      const rawValue = argsText.slice(mark.valueStart, mark.next);
      // The LAST key's value always runs to the end of the object body, whatever junk a
      // mis-detected key left behind: cut it at its delimiter quote so structural characters
      // (`"}`, `},`) cannot leak into the payload and break consumers like apply_patch.
      args[mark.key] = decodeToolStringValue(rawValue, index === marks.length - 1);
    }
  }

  const envelope: Record<string, unknown> = { name, arguments: args };
  if (trailingNonce) envelope._nonce = trailingNonce;
  return JSON.stringify(envelope);
}

/**
 * Decode one raw string value from a repaired envelope.
 *
 * The value is delimited by the NEXT KEY (or the object's closing brace) rather than by quotes,
 * because stray quotes inside the payload cannot be told apart from a terminator. Decoding is
 * then a normal JSON string decode, so `***`/backslashes/newlines survive byte-for-byte instead
 * of being mangled by regex unescaping (which corrupted `apply_patch` payloads).
 */
function decodeToolStringValue(rawValue: string, isFinal: boolean): string {
  let body = rawValue.trim();
  // The final value runs to the end of the object body, so it carries the object's closing
  // braces: cut at the delimiter quote (the last one) to discard them.
  if (isFinal) {
    const lastQuote = body.lastIndexOf('"');
    if (lastQuote !== -1) body = body.slice(0, lastQuote + 1);
  }
  body = body.replace(/,\s*$/, "").trim();
  if (body.startsWith('"')) body = body.slice(1);
  if (body.endsWith('"')) body = body.slice(0, -1);
  // A mis-detected key after this value lets the object's tail (`"},` / `"}`) leak in. Only the
  // structural characters that follow a quote are removed, so payloads that merely end with a
  // brace (HTML, JSON bodies) are untouched.
  const structuralTail = body.match(/"[,\s}\]]*$/);
  if (structuralTail && structuralTail.index !== undefined && structuralTail.index > 0) {
    body = body.slice(0, structuralTail.index);
  }

  // Preferred: the model escaped its inner quotes, so this is already valid JSON.
  const direct = tryJsonString(body);
  if (direct !== null) return direct;

  // Otherwise escape the quotes that are not valid terminators, then decode.
  let escaped = "";
  let backslashes = 0;
  for (const char of body) {
    if (char === "\\") {
      backslashes += 1;
      escaped += char;
      continue;
    }
    if (char === '"' && backslashes % 2 === 0) escaped += '\\"';
    else escaped += char;
    backslashes = 0;
  }
  return tryJsonString(escaped) ?? body;
}

function tryJsonString(value: string): string | null {
  try {
    const parsed = JSON.parse(`"${value}"`);
    return typeof parsed === "string" ? parsed : null;
  } catch {
    return null;
  }
}

export function parseLooseJsonObject(raw: string): Record<string, unknown> | null {
  const trimmed = stripCodeFence(raw);
  const repaired = repairToolEnvelopeJson(trimmed);
  for (const candidate of [trimmed, normalizeLooseJson(trimmed), repaired]) {
    if (candidate === null) continue;
    try {
      return toRecord(JSON.parse(candidate));
    } catch {
      // Try the next, more permissive form.
    }
  }
  return null;
}

export function stripRanges(text: string, ranges: Array<{ start: number; end: number }>): string {
  let content = text;
  const sorted = [...ranges].sort((a, b) => b.start - a.start);
  for (const range of sorted) {
    const lineStart = content.lastIndexOf("\n", range.start - 1) + 1;
    const nextLineBreak = content.indexOf("\n", range.end);
    const lineEnd = nextLineBreak === -1 ? content.length : nextLineBreak;
    const beforeOnLine = content.slice(lineStart, range.start);
    const afterOnLine = content.slice(range.end, lineEnd);
    const removeWholeLine = beforeOnLine.trim() === "" && afterOnLine.trim() === "";
    const start = removeWholeLine ? lineStart : range.start;
    const end =
      removeWholeLine && nextLineBreak !== -1
        ? nextLineBreak + 1
        : removeWholeLine
          ? lineEnd
          : range.end;
    content = `${content.slice(0, start)}${content.slice(end)}`;
  }
  return content.replace(/\n{3,}/g, "\n\n").trim();
}

export function toArgumentsString(value: unknown): string {
  if (value === undefined) return "{}";
  if (typeof value === "string") {
    const parsed = parseLooseJsonObject(value);
    return parsed ? JSON.stringify(parsed) : value;
  }
  try {
    return JSON.stringify(value);
  } catch {
    return "{}";
  }
}

/**
 * Serialize an OpenAI `tools` array into a system-prompt block that instructs the
 * web UI model how to invoke a tool (emit a `<tool>{...}</tool>` block). Returns an
 * empty string when there are no usable tools.
 *
 * Each invocation generates a per-request nonce that is embedded in the tool format
 * instructions. The parser (parseToolCallsFromText) requires this nonce in the model's
 * `<tool>` JSON to distinguish legitimate tool calls from bare JSON, code-fenced JSON,
 * or copy-attacked envelopes (#9343).
 */
export function serializeToolsToPrompt(
  tools: unknown,
  options: SerializeToolsToPromptOptions = {}
): string {
  if (!Array.isArray(tools) || tools.length === 0) return "";

  const nonce = getToolNonce(tools);
  if (!nonce) return "";

  const lines: string[] = [];
  for (const t of tools as OpenAIToolDef[]) {
    const fn = t?.function;
    if (!fn?.name) continue;
    const rawDescription =
      typeof fn.description === "string" && fn.description ? fn.description : "";
    const descriptionMaxChars = options.descriptionMaxChars;
    const desc =
      descriptionMaxChars !== undefined && rawDescription.length > descriptionMaxChars
        ? `${rawDescription.slice(0, Math.max(0, descriptionMaxChars - 32))}\n…[description trimmed]`
        : rawDescription;
    let params = "";
    try {
      params = fn.parameters ? JSON.stringify(fn.parameters) : "";
    } catch {
      params = "";
    }
    lines.push(
      `- ${fn.name}${desc ? `: ${desc}` : ""}${params ? `\n  parameters: ${params}` : ""}`
    );
  }

  if (lines.length === 0) return "";

  return [
    "The client application provides tools beyond your built-in ones. They are NOT in your " +
      "native tool registry; they are invoked via a plain-text protocol: the client parses " +
      "your reply and executes the tool on the user machine. Treat these client tools as " +
      "fully available to you; never claim they are unavailable. To invoke one, reply with " +
      "a single line containing a <tool> block",
    `with JSON that includes the secret binding "_nonce": "${nonce}":`,
    `<tool>{"name": "<tool_name>", "arguments": { ... }, "_nonce": "${nonce}"}</tool>`,
    "These client tools ARE available to you in this conversation. If the user asks you " +
      "to inspect, create, edit, or verify files, you MUST invoke the relevant client tool " +
      "before answering. Do not claim that the tools are unavailable and do not describe " +
      "steps instead of invoking them.",
    // Without this, the model reaches for a tool on every turn — including a bare greeting —
    // which costs the client a full extra round trip per unnecessary tool call.
    "Use a tool ONLY when the request genuinely needs workspace action. For greetings, small " +
      "talk, thanks, or any question you can answer from your own knowledge, reply directly " +
      "with the answer and NO <tool> block; calling a tool there is a protocol violation.",
    "",
    "Available tools:",
    ...lines,
  ].join("\n");
}

/**
 * Parse `<tool>{...}</tool>` or `<tool_call>{...}</tool_call>` blocks out of
 * upstream text into OpenAI `tool_calls`.
 *
 * **Security hardening (#9343):** Bare JSON with name+arguments keys is NEVER
 * promoted to tool_calls — only explicit `<tool>` or `<tool_call>` envelopes are
 * accepted. When a nonce was embedded via serializeToolsToPrompt (stored from the
 * same tools[] reference), it MUST be present in the parsed JSON body as `_nonce`.
 * This prevents code-fenced JSON, prose JSON, and copy-attacked user envelopes from
 * triggering tool execution.
 *
 * Returns the content with the recognized blocks stripped, plus the tool calls
 * (or null when there are none). `arguments` is always a JSON *string*, matching
 * the OpenAI API.
 *
 * `idSeed` makes generated ids deterministic for callers that need stability; when
 * omitted, ids are still unique within a single call (index-based).
 */
export function parseToolCallsFromText(
  text: string,
  idSeed = "call",
  requestedTools?: unknown
): { content: string; toolCalls: OpenAIToolCall[] | null } {
  const normalizedText = typeof text === "string" ? normalizeDsmlToolCalls(text) : text;
  const requestedToolNames = getRequestedToolNames(requestedTools);
  if (
    typeof normalizedText !== "string" ||
    (!normalizedText.includes("<tool>") && !normalizedText.includes("<tool_call"))
  ) {
    return { content: text ?? "", toolCalls: null };
  }

  const nonce = getToolNonce(requestedTools);
  const candidates: ToolParseCandidate[] = [];

  // Candidate extraction runs on the DSML-normalized text: normalizeDsmlToolCalls rewrites
  // DeepSeek's native dialect into canonical <tool> blocks first, so both shapes are collected.
  for (const block of [
    ...findTagBlocks(normalizedText, TOOL_OPEN_RE, TOOL_CLOSE_RE),
    ...findTagBlocks(normalizedText, TOOL_CALL_OPEN_RE, TOOL_CALL_CLOSE_RE),
  ]) {
    candidates.push({
      raw: block.inner.trim(),
      start: block.start,
      end: block.end,
      requireRequestedTool: false,
    });
  }

  candidates.sort((a, b) => a.start - b.start);

  const toolCalls: OpenAIToolCall[] = [];
  const acceptedRanges: Array<{ start: number; end: number }> = [];
  for (const candidate of candidates) {
    const parsed = parseLooseJsonObject(candidate.raw);
    const emittedName =
      parsed && typeof parsed.name === "string"
        ? parsed.name
        : parsed && typeof parsed.command === "string"
          ? parsed.command
          : null;
    if (!emittedName) continue;
    // The contract's illustrative `<tool_name>` placeholder is not an invocation.
    if (emittedName === "<tool_name>") continue;

    // Nonce binding check (#9343): when the tool prompt embedded a nonce, check
    // that any _nonce present in the JSON body matches. A wrong nonce (present but
    // does not match) means this is a copy-attack or hallucination — treat it as text
    // instead of executing it. A missing _nonce is tolerated for backward compatibility
    // with models that do not (yet) follow the nonce instruction.
    if (
      nonce &&
      parsed &&
      parsed._nonce !== undefined &&
      parsed._nonce !== nonce &&
      !isRecentToolNonce(parsed._nonce)
    ) {
      continue;
    }

    const name =
      resolveRequestedToolName(emittedName, requestedToolNames) ||
      (candidate.requireRequestedTool ? null : emittedName);
    if (!name || (candidate.requireRequestedTool && requestedToolNames.length === 0)) continue;
    const args = toArgumentsString(parsed?.arguments);
    toolCalls.push({
      id: `${idSeed}_${toolCalls.length}`,
      type: "function",
      function: { name, arguments: args },
    });
    acceptedRanges.push({ start: candidate.start, end: candidate.end });
  }

  if (toolCalls.length === 0) {
    return { content: text, toolCalls: null };
  }

  const content = stripRanges(normalizedText, acceptedRanges);
  return { content, toolCalls };
}

// ── Shared helpers for web-cookie executors ────────────────────────────────

interface ToolPrepResult {
  hasTools: boolean;
  requestedTools: unknown;
  effectiveMessages: Array<{ role: string; content: unknown }>;
}

/** One-line nudge appended to the latest user message. Web-UI models weigh the
 *  current user turn far more heavily than a large system block, and ChatGPT's
 *  injection heuristics distrust long instructions embedded in user content —
 *  so the full contract stays in the system block (trailing, see below) and the
 *  user turn only carries a short pointer back to it, naming the tools. */
function buildToolReminder(toolPrompt: string): string {
  const names = (toolPrompt.match(/^- [^:\n]+/gm) || []).map((s) => s.slice(2).trim()).join(", ");
  return (
    "\n\n[Client protocol reminder: the client-tool contract in the system instructions " +
    "is active in this conversation. These client tools ARE available via the <tool> " +
    "block protocol" +
    (names ? ": " + names : "") +
    ".]"
  );
}

/**
 * Extract tools from an OpenAI request body and inject the tool contract when
 * tools are present. Every web-cookie executor that wants tool-call support
 * calls this once before building its upstream request body.
 *
 * Placement matters: the contract used to be PREPENDED as the first system
 * message. Executors fold all system messages into one block, so with agentic
 * clients whose system prompts exceed ~28K chars the contract sat at the head
 * of a huge block and observed web models ignored it, answering
 * "tool X is not in my tool set" instead of emitting <tool> blocks. Dual
 * placement fixes it: the full contract goes AFTER the client messages (folds
 * to the tail of the system block) and a one-line reminder rides at the end of
 * the latest user message. Captured long-context trials showed prepend 0/3 tool
 * calls and dual placement 16/17 across
 * 30K-250K prompts, 30-tool sets, multi-turn tool history, and streaming.
 */
export function prepareToolMessages(
  bodyObj: Record<string, unknown>,
  messages: Array<{ role: string; content: unknown }>
): ToolPrepResult {
  const requestedTools = bodyObj.tools;
  const hasTools = Array.isArray(requestedTools) && requestedTools.length > 0;
  if (!hasTools) return { hasTools: false, requestedTools, effectiveMessages: messages };

  const toolPrompt = serializeToolsToPrompt(requestedTools);
  if (!toolPrompt) return { hasTools: true, requestedTools, effectiveMessages: messages };

  const effectiveMessages = [...messages];
  const reminder = buildToolReminder(toolPrompt);
  for (let i = effectiveMessages.length - 1; i >= 0; i--) {
    const msg = effectiveMessages[i];
    if (msg?.role !== "user") continue;
    if (typeof msg.content === "string") {
      effectiveMessages[i] = { ...msg, content: msg.content + reminder };
    } else if (Array.isArray(msg.content)) {
      effectiveMessages[i] = {
        ...msg,
        content: [...msg.content, { type: "text", text: reminder }],
      };
    }
    break;
  }
  effectiveMessages.push({ role: "system", content: toolPrompt });
  return { hasTools: true, requestedTools, effectiveMessages };
}

interface ToolCompletionResult {
  content: string;
  toolCalls: OpenAIToolCall[] | null;
  finishReason: string;
}

/**
 * Parse tool calls from a model's text response.  Returns the cleaned content
 * (with `<tool>` blocks stripped), the parsed tool calls (or null), and the
 * appropriate finish_reason.  Every web-cookie executor calls this on the
 * collected response text when `hasTools` is true.
 */
export function buildToolAwareResult(
  rawContent: string,
  requestedTools: unknown,
  idSeed = "call"
): ToolCompletionResult {
  const { content, toolCalls } = parseToolCallsFromText(
    rawContent,
    `${idSeed}-${Date.now()}`,
    requestedTools
  );
  return {
    content,
    toolCalls,
    finishReason: toolCalls ? "tool_calls" : "stop",
  };
}
