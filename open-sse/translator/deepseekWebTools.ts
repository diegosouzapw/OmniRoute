// DeepSeek-web-specific tool-call translation.
//
// chat.deepseek.com has no native function calling, so OmniRoute serializes the OpenAI
// `tools[]` into a prompt contract and parses the model's text reply back into OpenAI
// `tool_calls`. The canonical `webTools.ts` parser handles the well-behaved
// `<tool>{json}</tool>` / bare-JSON shapes used by most web-cookie providers, and it MUST
// stay untouched (it works for the others).
//
// DeepSeek, however, emits a much wider zoo of ad-hoc shapes:
//   <tool:todowrite>{json}</tool>            name in the tag suffix, body is the arguments
//   <tool_call>{id,type,params}</tool_call>  alternate key names (type → name, params → arguments)
//   <tool name="x">{json}</tool>             name in an attribute
//   <tool id="todo_write">{json}</tool>      tool name in the id attribute
//   <tool><tool ...>{json}</tool></tool>     doubled / nested wrappers
//   <tool id="1"><name>x</name><arguments>{json}</arguments></tool>   XML children
//   <tool:write><parameter name="content" content="...">             parameter style
//
// A single regex cannot robustly cover all of these (nesting + attributes + XML children),
// so this parser tokenizes the tool tags and walks them with a stack instead. It reuses the
// proven JSON-normalization / fuzzy-name-matching / range-stripping helpers from webTools.ts
// rather than duplicating them.

import {
  parseToolCallsFromText,
  parseLooseJsonObject,
  getRequestedToolNames,
  resolveRequestedToolName,
  toArgumentsString,
  stripRanges,
  type OpenAIToolCall,
  type RequestedToolName,
} from "./webTools.ts";

interface OpenAIToolDef {
  type?: string;
  function?: { name?: string; description?: string; parameters?: unknown };
}

// ── Stricter, compact tool-use prompt ───────────────────────────────────────

/**
 * Serialize an OpenAI `tools` array into a DeepSeek-specific system-prompt block.
 *
 * It is deliberately stricter than the generic `serializeToolsToPrompt`: DeepSeek tends to
 * (a) invent its own wrappers and (b) merely *describe* a plan instead of emitting a call.
 * The wording forces the single canonical `<tool>{json}</tool>` shape and forbids the
 * alternatives, while staying short to avoid wasting tokens.
 */
export function serializeDeepSeekToolPrompt(tools: unknown): string {
  if (!Array.isArray(tools) || tools.length === 0) return "";

  const lines: string[] = [];
  for (const t of tools as OpenAIToolDef[]) {
    const fn = t?.function;
    if (!fn?.name) continue;
    const desc = typeof fn.description === "string" && fn.description ? fn.description : "";
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
    "You can call tools. To call a tool, output ONLY this exact block (no markdown fence):",
    '<tool>{"name": "<tool_name>", "arguments": { ... }}</tool>',
    "Rules:",
    "- Use exactly <tool>...</tool>. Do NOT use <tool:name>, <tool_call>, <name>, <parameter>, id=/name= attributes, or code fences.",
    '- "name" must be one of the tools below; "arguments" must be a JSON object.',
    "- When a tool is needed, emit the <tool> block instead of only describing the plan.",
    "- Emit one <tool> block per call; you may put several blocks back to back.",
    "- If no tool is needed, just answer normally without any <tool> block.",
    "",
    "Available tools:",
    ...lines,
  ].join("\n");
}

// ── Tool-aware conversation prompt ───────────────────────────────────────────

interface ChatMessage {
  role: string;
  content?: unknown;
  tool_calls?: Array<{ id?: string; function?: { name?: string; arguments?: unknown } }>;
  tool_call_id?: string;
  name?: string;
}

function extractText(content: unknown): string {
  if (Array.isArray(content)) {
    return (content as Array<{ type?: string; text?: string }>)
      .filter((item) => item?.type === "text")
      .map((item) => item?.text ?? "")
      .join("\n");
  }
  return content == null ? "" : String(content);
}

/**
 * Build the single `prompt` string for an agentic (tool-using) DeepSeek-web turn.
 *
 * The web endpoint takes a flat prompt with no `messages[]`, so the legacy `messagesToPrompt`
 * only forwarded the last user message — which makes an agent loop amnesiac: on every turn the
 * follow-up messages carry no new *user* text, so DeepSeek only ever saw the original task and
 * kept restarting (re-creating todos, re-listing files…). This builder instead replays the WHOLE
 * trajectory — including the assistant's prior `<tool>` calls and each `role:"tool"` result — so
 * the model continues from where it left off instead of starting over.
 */
export function buildToolConversationPrompt(
  messages: ChatMessage[],
  toolSystemPrompt: string
): string {
  const systemParts: string[] = [];
  if (toolSystemPrompt) systemParts.push(toolSystemPrompt);

  const lines: string[] = [];
  const callNameById = new Map<string, string>();
  let sawToolActivity = false;

  for (const m of messages) {
    if (m.role === "system") {
      const t = extractText(m.content).trim();
      if (t) systemParts.push(t);
    } else if (m.role === "user") {
      const t = extractText(m.content).trim();
      if (t) lines.push(`User: ${t}`);
    } else if (m.role === "assistant") {
      const t = extractText(m.content).trim();
      const calls = Array.isArray(m.tool_calls) ? m.tool_calls : [];
      const parts: string[] = [];
      if (t) parts.push(t);
      for (const c of calls) {
        const name = typeof c?.function?.name === "string" ? c.function.name : "";
        const rawArgs = c?.function?.arguments;
        const args =
          typeof rawArgs === "string" && rawArgs ? rawArgs : JSON.stringify(rawArgs ?? {});
        if (c?.id) callNameById.set(c.id, name);
        parts.push(`<tool>{"name": ${JSON.stringify(name)}, "arguments": ${args}}</tool>`);
        sawToolActivity = true;
      }
      if (parts.length) lines.push(`Assistant: ${parts.join("\n")}`);
    } else if (m.role === "tool") {
      const t = extractText(m.content).trim();
      const name = (m.tool_call_id && callNameById.get(m.tool_call_id)) || m.name || "tool";
      lines.push(`Tool result (${name}): ${t || "(no output)"}`);
      sawToolActivity = true;
    }
  }

  const parts: string[] = [];
  if (systemParts.length) parts.push(systemParts.join("\n\n"));
  if (lines.length) parts.push(lines.join("\n\n"));
  if (sawToolActivity) {
    // Anchor the model to the work already done so it advances instead of repeating it.
    parts.push(
      "Continue the task using the tool results above. Do NOT repeat tool calls that already " +
        "succeeded; perform the next step or give the final answer."
    );
  }

  return parts.join("\n\n").replace(/!\[.*?\]\(.*?\)/g, "");
}

// ── Tag tokenizer ────────────────────────────────────────────────────────────

interface TagToken {
  start: number;
  end: number;
  closing: boolean;
  suffix: string; // tool name after ':' in the tag (e.g. `<tool:bash>` → "bash")
  attrs: string; // raw attribute text inside the tag
}

// Matches an opening/closing <tool .../> or <tool_call .../> tag, optionally with a `:name`
// suffix and an attribute list. `tool_call` is listed first so it wins the alternation.
const TAG_TOKEN_RE = /<(\/?)(?:tool_call|tool)(:[A-Za-z0-9_.+-]+)?((?:\s[^>]*)?)\/?>/g;

function tokenizeToolTags(text: string): TagToken[] {
  const tokens: TagToken[] = [];
  let m: RegExpExecArray | null;
  TAG_TOKEN_RE.lastIndex = 0;
  while ((m = TAG_TOKEN_RE.exec(text)) !== null) {
    tokens.push({
      start: m.index,
      end: TAG_TOKEN_RE.lastIndex,
      closing: m[1] === "/",
      suffix: m[2] ? m[2].slice(1) : "",
      attrs: m[3] || "",
    });
  }
  return tokens;
}

interface ToolBlock {
  open: TagToken;
  close: TagToken;
  innerStart: number;
  innerEnd: number;
}

// Pair tags with a stack: every closing tag pairs with the nearest unmatched open. An open
// left unmatched at the end (e.g. the stray outer `<tool>` of a doubled wrapper, or a
// never-closed `<tool:write>` followed by `<parameter ...>`) gets a synthetic close at the end
// of the text so its body is still parsed; the doubled-wrapper outer is then dropped by the
// leaf filter.
function pairToolBlocks(tokens: TagToken[], textLen: number): ToolBlock[] {
  const blocks: ToolBlock[] = [];
  const stack: TagToken[] = [];
  for (const tok of tokens) {
    if (!tok.closing) {
      stack.push(tok);
      continue;
    }
    const open = stack.pop();
    if (!open) continue;
    blocks.push({ open, close: tok, innerStart: open.end, innerEnd: tok.start });
  }
  for (const open of stack) {
    const synthetic: TagToken = {
      start: textLen,
      end: textLen,
      closing: true,
      suffix: "",
      attrs: "",
    };
    blocks.push({ open, close: synthetic, innerStart: open.end, innerEnd: textLen });
  }
  return blocks;
}

// ── Attribute / XML-child helpers ────────────────────────────────────────────

/** Read an attribute value, tolerating backslash-escaped quotes inside the value. */
function getAttr(attrs: string, name: string): string | null {
  const re = new RegExp(`\\b${name}\\s*=\\s*("|')`);
  const m = re.exec(attrs);
  if (!m) return null;
  const quote = m[1];
  let j = m.index + m[0].length;
  let out = "";
  while (j < attrs.length) {
    const ch = attrs[j];
    if (ch === "\\") {
      out += attrs[j + 1] ?? "";
      j += 2;
      continue;
    }
    if (ch === quote) break;
    out += ch;
    j += 1;
  }
  return out;
}

function getXmlChild(inner: string, tag: string): string | null {
  const m = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i").exec(inner);
  return m ? m[1].trim() : null;
}

// The body group is a tempered greedy token: `(?:(?!<parameter\b)[\s\S])*?` so an
// attribute-only `<parameter ...>` (no closing tag) cannot let the body matcher swallow a
// following `<parameter>...</parameter>` and drop that parameter.
const PARAM_TAG_RE = /<parameter\b([^>]*?)\/?>(?:((?:(?!<parameter\b)[\s\S])*?)<\/parameter>)?/gi;

/** Collect `<parameter name="x" content="y">` / `<parameter name="x">y</parameter>` into an object. */
function buildArgsFromParameters(inner: string): Record<string, unknown> | null {
  const out: Record<string, unknown> = {};
  let found = false;
  let m: RegExpExecArray | null;
  PARAM_TAG_RE.lastIndex = 0;
  while ((m = PARAM_TAG_RE.exec(inner)) !== null) {
    const attrs = m[1] || "";
    const body = m[2];
    const name = getAttr(attrs, "name");
    if (!name) continue;
    const value = getAttr(attrs, "content") ?? (typeof body === "string" ? body.trim() : "");
    out[name] = value;
    found = true;
  }
  return found ? out : null;
}

// ── Single-block extraction ──────────────────────────────────────────────────

interface ExtractedCall {
  name: string;
  arguments: string;
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

/**
 * Build a map of tool name → set of parameter property keys from the requested tools array.
 * Used by the nameless-block fallback to do conservative schema-based name resolution.
 */
function buildSchemaParamMap(requestedTools: unknown): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();
  if (!Array.isArray(requestedTools)) return map;
  for (const tool of requestedTools as OpenAIToolDef[]) {
    const fn = tool?.function;
    if (!fn?.name) continue;
    const params = fn.parameters as Record<string, unknown> | undefined;
    const props = params?.properties;
    if (props && typeof props === "object" && !Array.isArray(props)) {
      map.set(fn.name, new Set(Object.keys(props as Record<string, unknown>)));
    } else {
      map.set(fn.name, new Set());
    }
  }
  return map;
}

/**
 * Turn one tool block (tag name + inner text) into a name + JSON-string arguments.
 * Returns null when no plausible tool name can be recovered.
 */
function extractCall(
  tagName: string,
  innerRaw: string,
  requested: RequestedToolName[],
  schemaMap?: Map<string, Set<string>>
): ExtractedCall | null {
  const inner = innerRaw.trim();

  const nameChild = getXmlChild(inner, "name");
  const argsChild = getXmlChild(inner, "arguments") ?? getXmlChild(inner, "parameters");
  const paramObj = argsChild ? null : buildArgsFromParameters(inner);
  const hasXmlChildren = !!nameChild || !!argsChild || !!paramObj;

  const json = hasXmlChildren ? null : parseLooseJsonObject(inner);
  const jsonName = json ? (asString(json.name) ?? asString(json.type)) : null;

  const childResolved = nameChild ? resolveRequestedToolName(nameChild, requested) : null;
  const jsonResolved = jsonName ? resolveRequestedToolName(jsonName, requested) : null;
  const tagResolved = tagName ? resolveRequestedToolName(tagName, requested) : null;

  // Prefer a name that maps to a requested tool. The JSON body wins over the tag attribute
  // because DeepSeek sometimes emits a bogus tag name (e.g. name="skill", #3260).
  let name: string | null = null;
  let nameFromTag = false;
  const pick = (val: string | null, fromTag: boolean) => {
    if (!name && val) {
      name = val;
      nameFromTag = fromTag;
    }
  };
  pick(childResolved, false);
  pick(jsonResolved, false);
  pick(tagResolved, true);
  pick(nameChild, false);
  pick(jsonName, false);
  pick(tagName, true);

  // Shell-style `{ "command": "..." }` with no tag name: treat command as the tool name only
  // if it actually resolves to a requested tool (the value is otherwise the command itself).
  if (!name && !tagName && json) {
    const command = asString(json.command);
    const resolved = command ? resolveRequestedToolName(command, requested) : null;
    if (resolved) {
      name = resolved;
      nameFromTag = false;
    }
  }

  // Nameless-block fallback (#5154): when all explicit name-resolution paths fail but the
  // block has <parameter> children, try a conservative schema-based match. If exactly ONE
  // requested tool's parameter-schema keys are a superset of every extracted param name,
  // adopt that tool name. Zero matches or ambiguous (>1) → keep returning null to avoid
  // misattributing calls.
  if (!name && paramObj && schemaMap && schemaMap.size > 0) {
    const extractedKeys = Object.keys(paramObj);
    if (extractedKeys.length > 0) {
      const candidates: string[] = [];
      for (const [toolName, schemaKeys] of schemaMap) {
        if (schemaKeys.size > 0 && extractedKeys.every((k) => schemaKeys.has(k))) {
          candidates.push(toolName);
        }
      }
      if (candidates.length === 1) {
        name = candidates[0];
        nameFromTag = false;
      }
    }
  }

  if (!name) return null;

  let argsValue: unknown;
  if (argsChild) {
    argsValue = parseLooseJsonObject(argsChild) ?? argsChild;
  } else if (paramObj) {
    argsValue = paramObj;
  } else if (json) {
    if (json.arguments !== undefined) argsValue = json.arguments;
    else if (json.params !== undefined) argsValue = json.params;
    else if (nameFromTag) {
      // `<tool:bash>{"command": ...}` — the whole JSON object is the arguments payload.
      argsValue = json;
    } else {
      // Name came from the JSON body — the remaining keys are the arguments.
      const { name: _n, type: _t, id: _i, command: _c, arguments: _a, params: _p, ...rest } = json;
      argsValue = rest;
    }
  } else {
    argsValue = {};
  }

  return { name, arguments: toArgumentsString(argsValue) };
}

// ── Public parser ─────────────────────────────────────────────────────────────

/**
 * Parse a DeepSeek-web text reply into OpenAI `tool_calls`. Returns the surrounding text with the recognized blocks stripped (so it can
 * still be streamed to the client) plus the parsed calls, or `null` when none are present.
 *
 * Falls back to the canonical `webTools.parseToolCallsFromText` for tag-free replies so that
 * bare-JSON and plain `<tool>` behavior stays identical to the shared implementation.
 */
export function parseDeepSeekToolCalls(
  text: string,
  idSeed = "call",
  requestedTools?: unknown
): { content: string; toolCalls: OpenAIToolCall[] | null } {
  if (typeof text !== "string" || text.length === 0) {
    return { content: text ?? "", toolCalls: null };
  }

  const tokens = tokenizeToolTags(text);
  if (tokens.length === 0) {
    // No DeepSeek-specific tags — defer to the proven canonical parser (bare JSON, etc.).
    return parseToolCallsFromText(text, idSeed, requestedTools);
  }

  const requested = getRequestedToolNames(requestedTools);
  const schemaMap = buildSchemaParamMap(requestedTools);
  const blocks = pairToolBlocks(tokens, text.length);

  // Only extract from leaf blocks (no other block nested inside), so a doubled
  // `<tool><tool>...</tool></tool>` wrapper yields a single call from the inner block.
  const isLeaf = (b: ToolBlock) =>
    !blocks.some((o) => o !== b && o.open.start >= b.innerStart && o.close.end <= b.innerEnd);

  const toolCalls: OpenAIToolCall[] = [];
  const acceptedRanges: Array<{ start: number; end: number }> = [];

  for (const block of blocks.filter(isLeaf).sort((a, b) => a.open.start - b.open.start)) {
    const tagName =
      block.open.suffix ||
      getAttr(block.open.attrs, "name") ||
      getAttr(block.open.attrs, "id") ||
      "";
    const inner = text.slice(block.innerStart, block.innerEnd);
    const call = extractCall(tagName, inner, requested, schemaMap);
    if (!call) continue;
    toolCalls.push({
      id: `${idSeed}_${toolCalls.length}`,
      type: "function",
      function: { name: call.name, arguments: call.arguments },
    });
    acceptedRanges.push({ start: block.open.start, end: block.close.end });
  }

  if (toolCalls.length === 0) {
    // Tags were present but none parsed (e.g. malformed) — try the canonical bare-JSON path.
    return parseToolCallsFromText(text, idSeed, requestedTools);
  }

  // Strip the accepted blocks plus any stray tool tags left outside them (the unmatched outer
  // `<tool>` of a doubled wrapper, leftover `</tool>` of a non-leaf wrapper, etc.).
  const within = (tok: TagToken) =>
    acceptedRanges.some((r) => tok.start >= r.start && tok.end <= r.end);
  const ranges = [
    ...acceptedRanges,
    ...tokens.filter((t) => !within(t)).map((t) => ({ start: t.start, end: t.end })),
  ];

  return { content: stripRanges(text, ranges), toolCalls };
}
