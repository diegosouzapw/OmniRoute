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
 * Returns the content with the blocks stripped, plus the tool calls (or null when
 * there are none). `arguments` is always a JSON *string*, matching the OpenAI API.
 *
 * `idSeed` makes generated ids deterministic for callers that need stability; when
 * omitted, ids are still unique within a single call (index-based).
 */
export function parseToolCallsFromText(
  text: string,
  idSeed = "call"
): { content: string; toolCalls: OpenAIToolCall[] | null } {
  if (typeof text !== "string" || !text.includes("<tool>")) {
    return { content: text ?? "", toolCalls: null };
  }

  const toolCalls: OpenAIToolCall[] = [];
  let match: RegExpExecArray | null;
  TOOL_BLOCK_RE.lastIndex = 0;
  while ((match = TOOL_BLOCK_RE.exec(text)) !== null) {
    const raw = match[1].trim();
    let parsed: { name?: unknown; arguments?: unknown } | null = null;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = null;
    }
    const name = parsed && typeof parsed.name === "string" ? parsed.name : null;
    if (!name) continue;
    let args = "{}";
    if (parsed && parsed.arguments !== undefined) {
      args =
        typeof parsed.arguments === "string"
          ? parsed.arguments
          : JSON.stringify(parsed.arguments);
    }
    toolCalls.push({
      id: `${idSeed}_${toolCalls.length}`,
      type: "function",
      function: { name, arguments: args },
    });
  }

  if (toolCalls.length === 0) {
    return { content: text, toolCalls: null };
  }

  const content = text.replace(TOOL_BLOCK_RE, "").replace(/\n{3,}/g, "\n\n").trim();
  return { content, toolCalls };
}
