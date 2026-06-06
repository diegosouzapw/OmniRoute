// Tool-call translation for web-cookie providers (deepseek-web, chatgpt-web, ...).
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

interface OpenAIToolDef {
  type?: string;
  function?: {
    name?: string;
    description?: string;
    parameters?: unknown;
  };
}

const TOOL_BLOCK_RE = /<tool>\s*([\s\S]*?)\s*<\/tool>/g;
// Some web-cookie models (e.g. ds-web) wrap calls as `<tool_call name="...">{json}</tool_call>`
// instead of the canonical `<tool>{json}</tool>`. Capture the JSON body — the real tool name
// lives there, never in the tag's `name="..."` attribute (#3260).
const TOOL_CALL_TAG_RE = /<tool_call(?:\s+[^>]*)?\s*>\s*([\s\S]*?)\s*<\/tool_call>/g;

interface ToolParseCandidate {
  raw: string;
  start: number;
  end: number;
  requireRequestedTool: boolean;
}

interface RequestedToolName {
  original: string;
  normalized: string;
}

function toRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function getRequestedToolNames(tools: unknown): RequestedToolName[] {
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

function resolveRequestedToolName(emitted: string, requestedTools: RequestedToolName[]): string | null {
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

function parseLooseJsonObject(raw: string): Record<string, unknown> | null {
  const trimmed = stripCodeFence(raw);
  for (const candidate of [trimmed, normalizeLooseJson(trimmed)]) {
    try {
      return toRecord(JSON.parse(candidate));
    } catch {
      // Try the next, more permissive form.
    }
  }
  return null;
}

function findBareJsonCandidates(text: string): ToolParseCandidate[] {
  const candidates: ToolParseCandidate[] = [];
  let start = -1;
  let depth = 0;
  let quote: '"' | "'" | "" = "";
  let escaped = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];

    if (depth === 0 && ch !== "{") {
      continue;
    }

    if (escaped) {
      escaped = false;
      continue;
    }

    if (quote) {
      if (ch === "\\") {
        escaped = true;
      } else if (ch === quote) {
        quote = "";
      }
      continue;
    }

    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }

    if (ch === "{") {
      if (depth === 0) start = i;
      depth += 1;
      continue;
    }

    if (ch === "}" && depth > 0) {
      depth -= 1;
      if (depth === 0 && start >= 0) {
        const raw = text.slice(start, i + 1);
        if (/[{,]\s*["']?(name|command)["']?\s*:/i.test(raw) && /[{,]\s*["']?arguments["']?\s*:/i.test(raw)) {
          candidates.push({ raw, start, end: i + 1, requireRequestedTool: true });
        }
        start = -1;
      }
    }
  }

  return candidates;
}

function rangesOverlap(a: { start: number; end: number }, b: { start: number; end: number }): boolean {
  return a.start < b.end && b.start < a.end;
}

function stripRanges(text: string, ranges: Array<{ start: number; end: number }>): string {
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
    const end = removeWholeLine && nextLineBreak !== -1 ? nextLineBreak + 1 : removeWholeLine ? lineEnd : range.end;
    content = `${content.slice(0, start)}${content.slice(end)}`;
  }
  return content.replace(/\n{3,}/g, "\n\n").trim();
}

function toArgumentsString(value: unknown): string {
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
 */
export function serializeToolsToPrompt(tools: unknown): string {
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
    lines.push(`- ${fn.name}${desc ? `: ${desc}` : ""}${params ? `\n  parameters: ${params}` : ""}`);
  }

  if (lines.length === 0) return "";

  return [
    "You can call tools. To call a tool, reply with a single line containing a <tool> block",
    'with JSON: <tool>{"name": "<tool_name>", "arguments": { ... }}</tool>',
    "Only emit the <tool> block when you actually want to call a tool; otherwise answer normally.",
    "",
    "Available tools:",
    ...lines,
  ].join("\n");
}

/**
 * Parse `<tool>{...}</tool>` blocks out of upstream text into OpenAI `tool_calls`.
 * When a requested `tools[]` set is provided, also accepts bare JSON tool-call
 * objects emitted by web models that ignored the `<tool>` wrapper contract.
 * Returns the content with the blocks stripped, plus the tool calls (or null when
 * there are none). `arguments` is always a JSON *string*, matching the OpenAI API.
 *
 * `idSeed` makes generated ids deterministic for callers that need stability; when
 * omitted, ids are still unique within a single call (index-based).
 */
export function parseToolCallsFromText(
  text: string,
  idSeed = "call",
  requestedTools?: unknown
): { content: string; toolCalls: OpenAIToolCall[] | null } {
  const requestedToolNames = getRequestedToolNames(requestedTools);
  const canParseBareJson = requestedToolNames.length > 0;
  if (
    typeof text !== "string" ||
    (!text.includes("<tool>") && !text.includes("<tool_call") && !canParseBareJson)
  ) {
    return { content: text ?? "", toolCalls: null };
  }

  const candidates: ToolParseCandidate[] = [];
  const toolBlockRanges: Array<{ start: number; end: number }> = [];

  let blockMatch: RegExpExecArray | null;
  TOOL_BLOCK_RE.lastIndex = 0;
  while ((blockMatch = TOOL_BLOCK_RE.exec(text)) !== null) {
    const range = { start: blockMatch.index, end: TOOL_BLOCK_RE.lastIndex };
    toolBlockRanges.push(range);
    candidates.push({
      raw: blockMatch[1].trim(),
      start: range.start,
      end: range.end,
      requireRequestedTool: false,
    });
  }

  TOOL_CALL_TAG_RE.lastIndex = 0;
  while ((blockMatch = TOOL_CALL_TAG_RE.exec(text)) !== null) {
    const range = { start: blockMatch.index, end: TOOL_CALL_TAG_RE.lastIndex };
    toolBlockRanges.push(range);
    candidates.push({
      raw: blockMatch[1].trim(),
      start: range.start,
      end: range.end,
      requireRequestedTool: false,
    });
  }

  if (canParseBareJson) {
    for (const candidate of findBareJsonCandidates(text)) {
      if (!toolBlockRanges.some((range) => rangesOverlap(range, candidate))) {
        candidates.push(candidate);
      }
    }
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

  const content = stripRanges(text, acceptedRanges);
  return { content, toolCalls };
}

// ── Shared helpers for web-cookie executors ────────────────────────────────

interface ToolPrepResult {
  hasTools: boolean;
  requestedTools: unknown;
  effectiveMessages: Array<{ role: string; content: unknown }>;
}

/**
 * Extract tools from an OpenAI request body and prepend a tool-system-prompt
 * to the messages array when tools are present.  Every web-cookie executor
 * that wants tool-call support calls this once before building its upstream
 * request body.
 */
export function prepareToolMessages(
  bodyObj: Record<string, unknown>,
  messages: Array<{ role: string; content: unknown }>,
): ToolPrepResult {
  const requestedTools = bodyObj.tools;
  const hasTools = Array.isArray(requestedTools) && requestedTools.length > 0;
  if (!hasTools) return { hasTools: false, requestedTools, effectiveMessages: messages };

  const toolPrompt = serializeToolsToPrompt(requestedTools);
  return {
    hasTools: true,
    requestedTools,
    effectiveMessages: [{ role: "system", content: toolPrompt }, ...messages],
  };
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
  idSeed = "call",
): ToolCompletionResult {
  const { content, toolCalls } = parseToolCallsFromText(rawContent, `${idSeed}-${Date.now()}`, requestedTools);
  return {
    content,
    toolCalls,
    finishReason: toolCalls ? "tool_calls" : "stop",
  };
}
