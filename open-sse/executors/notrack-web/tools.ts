import type { OpenAITool } from "./types.ts";

/** Build the tool contract system prompt describing how to emit `<tool_call>` blocks. */
export function buildToolSystemPrompt(tools: OpenAITool[], toolChoice: unknown): string {
  const lines = toolContractPreamble();
  for (const t of tools) appendToolLine(lines, t);
  if (typeof toolChoice === "string" && toolChoice !== "auto" && toolChoice !== "none") {
    lines.push("", `Tool choice for this request: ${toolChoice}`);
  }
  return lines.join("\n");
}

function toolContractPreamble(): string[] {
  return [
    "The client provides tools beyond your built-in ones. They are NOT in your native " +
      "tool registry; they are invoked via a plain-text protocol: the client parses your " +
      "reply and executes the tool on the user machine. Treat these client tools as fully " +
      "available to you; never claim they are unavailable.",
    "",
    "To call a tool, emit a single line containing a <\\u200btool_call> block with a JSON " +
      'object of the form `{"name": "<tool_name>", "arguments": { ... } }`. Example:',
    '<\u200btool_call>{"name": "get_weather", "arguments": {"city": "Tokyo"}}</\u200btool_call>',
    "",
    "When a tool result comes back, it will be rendered as `[Tool Result: <tool_name>]\\n<content>`. " +
      "Use that content to continue the answer. Only emit one <\\u200btool_call> block when you " +
      "actually want to call a tool; otherwise answer normally.",
    "",
    "Available tools:",
  ];
}

function appendToolLine(lines: string[], t: OpenAITool): void {
  const fn = t.function;
  if (!fn || typeof fn.name !== "string") return;
  const desc = typeof fn.description === "string" && fn.description ? fn.description : "";
  let params = "";
  if (fn.parameters !== undefined) {
    try {
      params = JSON.stringify(fn.parameters);
    } catch {
      params = "";
    }
  }
  lines.push(`- ${fn.name}${desc ? `: ${desc}` : ""}${params ? `\n  parameters: ${params}` : ""}`);
}

/**
 * Parse `<tool_call>{...}</tool_call>` envelopes (zero-width-space variant
 * used by the Python reference) out of an upstream response into OpenAI
 * `tool_calls`. Mirrors the Python `parse_tool_calls` shape.
 */
export function parseToolCallBlocks(
  rawContent: string,
  idSeed: string
): { content: string; toolCalls: Array<Record<string, unknown>> | null } {
  if (!rawContent || !rawContent.includes("<\u200btool_call")) {
    return { content: rawContent || "", toolCalls: null };
  }

  const TAG_OPEN = "<\u200btool_call>";
  const TAG_CLOSE = "</\u200btool_call>";
  const re = new RegExp(`${TAG_OPEN}\\s*([\\s\\S]*?)\\s*${TAG_CLOSE}`, "g");
  const { calls, ranges } = collectToolCallMatches(re, rawContent, idSeed);
  if (calls.length === 0) return { content: rawContent, toolCalls: null };
  return { content: stripToolCallRanges(rawContent, ranges), toolCalls: calls };
}

function collectToolCallMatches(
  re: RegExp,
  rawContent: string,
  idSeed: string
): { calls: Array<Record<string, unknown>>; ranges: Array<[number, number]> } {
  const calls: Array<Record<string, unknown>> = [];
  const ranges: Array<[number, number]> = [];
  let match: RegExpExecArray | null;
  while ((match = re.exec(rawContent)) !== null) {
    const parsed = parseToolCallBody(match[1].trim());
    if (!parsed) continue;
    calls.push({
      id: `${idSeed}_${calls.length}`,
      type: "function",
      function: { name: parsed.name, arguments: parsed.args },
    });
    ranges.push([match.index, re.lastIndex]);
  }
  return { calls, ranges };
}

function parseToolCallBody(body: string): { name: string; args: string } | null {
  let parsed: Record<string, unknown> | null = null;
  try {
    const v = JSON.parse(body);
    if (v && typeof v === "object" && !Array.isArray(v)) parsed = v as Record<string, unknown>;
  } catch {
    return null;
  }
  if (!parsed) return null;
  const name = typeof parsed.name === "string" ? parsed.name : null;
  if (!name) return null;
  return { name, args: stringifyToolArgs(parsed.arguments) };
}

function stringifyToolArgs(value: unknown): string {
  if (typeof value === "string") return value;
  if (value === undefined) return "{}";
  try {
    return JSON.stringify(value);
  } catch {
    return "{}";
  }
}

function stripToolCallRanges(rawContent: string, ranges: Array<[number, number]>): string {
  ranges.sort((a, b) => b[0] - a[0]);
  let cleaned = rawContent;
  for (const [start, end] of ranges) {
    cleaned = `${cleaned.slice(0, start)}${cleaned.slice(end)}`;
  }
  return cleaned.replace(/\n{3,}/g, "\n\n").trim();
}

/**
 * Best-effort JSON extraction for `response_format=json_object` / `json_schema`.
 * Mirrors the Python `extract_json` helper.
 */
export function extractJsonObject(raw: string): unknown | null {
  if (!raw) return null;
  let text = raw.trim();
  if (text.startsWith("```")) {
    text = text
      .replace(/^```(?:json|javascript|js|python)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
  }
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) return null;
  try {
    return JSON.parse(text.slice(firstBrace, lastBrace + 1));
  } catch {
    return null;
  }
}
