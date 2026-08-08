import {
  asRecord,
  DevinAgenticBridgeError,
  estimateTokens,
  type AnthropicTool,
  type DevinPrompt,
} from "./types.ts";
import { createHash } from "node:crypto";

export const MAX_TOOL_RESULT_CHARS = 65536;

function stringifyContentValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (value == null) return "";
  return JSON.stringify(value);
}

function boundedToolResult(value: unknown): string {
  const text = stringifyContentValue(value);
  if (text.length <= MAX_TOOL_RESULT_CHARS) return text;
  const removed = text.length - MAX_TOOL_RESULT_CHARS;
  return `${text.slice(0, MAX_TOOL_RESULT_CHARS)}\n[TRUNCATED ${removed} CHARACTERS BY OMNIROUTE]`;
}

function serializeSystem(system: unknown): string[] {
  if (typeof system === "string" && system.trim()) return [`[System]\n${system}`];
  if (!Array.isArray(system)) return [];

  const parts: string[] = [];
  for (const block of system) {
    const record = asRecord(block);
    if (record.type === "text") {
      parts.push(String(record.text || ""));
    } else if (Object.keys(record).length > 0) {
      throw new DevinAgenticBridgeError(
        `Unsupported Anthropic system block type: ${String(record.type || "unknown")}`,
        "unsupported_system_block"
      );
    }
  }
  return parts.length > 0 ? [`[System]\n${parts.join("\n")}`] : [];
}

function serializeBlock(
  block: unknown,
  knownToolUses: Set<string>,
  tools: AnthropicTool[]
): string {
  const record = asRecord(block);
  const type = String(record.type || "");

  if (type === "text") return String(record.text || "");
  if (type === "thinking") return `[Thinking]\n${String(record.thinking || "")}`;
  if (type === "redacted_thinking") return "[Redacted Thinking]";
  if (type === "tool_use") {
    const id = String(record.id || "").trim();
    const name = String(record.name || "").trim();
    if (!id || knownToolUses.has(id)) {
      throw new DevinAgenticBridgeError(
        id ? `Duplicate Anthropic tool_use id: ${id}` : "Anthropic tool_use is missing id",
        id ? "duplicate_tool_use_id" : "missing_tool_use_id"
      );
    }
    const declared = tools.find((tool) => tool.name === name);
    if (!declared) {
      throw new DevinAgenticBridgeError(
        `Historical tool_use references undeclared tool: ${name || "unknown"}`,
        "undeclared_historical_tool"
      );
    }
    knownToolUses.add(id);
    return [
      "[Assistant Tool Use]",
      `id: ${id}`,
      `name: ${name}`,
      "arguments:",
      JSON.stringify(record.input || {}, null, 2),
    ].join("\n");
  }
  if (type === "tool_result") {
    const toolUseId = String(record.tool_use_id || "").trim();
    if (!toolUseId || !knownToolUses.has(toolUseId)) {
      throw new DevinAgenticBridgeError(
        `Anthropic tool_result references unknown tool_use id: ${toolUseId || "missing"}`,
        "orphan_tool_result"
      );
    }
    return [
      "[Tool Result]",
      `tool_use_id: ${toolUseId}`,
      `is_error: ${record.is_error === true ? "true" : "false"}`,
      "content:",
      boundedToolResult(record.content),
    ].join("\n");
  }
  if (type === "image") {
    throw new DevinAgenticBridgeError(
      "Anthropic image blocks are not supported by devin-cli-agentic",
      "unsupported_image_block"
    );
  }

  throw new DevinAgenticBridgeError(
    `Unsupported Anthropic content block type: ${type || "unknown"}`,
    "unsupported_content_block"
  );
}

function serializeMessage(
  message: unknown,
  knownToolUses: Set<string>,
  tools: AnthropicTool[]
): string {
  const record = asRecord(message);
  const role = String(record.role || "user");
  if (role !== "user" && role !== "assistant") {
    throw new DevinAgenticBridgeError(
      `Unsupported Anthropic message role: ${role}`,
      "unsupported_role"
    );
  }
  // role was just narrowed to "user" | "assistant" by the guard above ("system" throws).
  const label = role === "assistant" ? "Assistant" : "User";
  const content = record.content;

  if (typeof content === "string") return `[${label}]\n${content}`;
  if (!Array.isArray(content)) return `[${label}]\n${stringifyContentValue(content)}`;

  return `[${label}]\n${content
    .map((block) => serializeBlock(block, knownToolUses, tools))
    .join("\n\n")}`;
}

function normalizeTools(tools: unknown): AnthropicTool[] {
  if (tools == null) return [];
  if (!Array.isArray(tools)) {
    throw new DevinAgenticBridgeError("Anthropic tools must be an array", "invalid_tools");
  }

  return tools.map((tool) => {
    const record = asRecord(tool);
    const name = typeof record.name === "string" ? record.name.trim() : "";
    if (!name) {
      throw new DevinAgenticBridgeError("Anthropic tool is missing name", "invalid_tool_name");
    }
    return {
      name,
      description: typeof record.description === "string" ? record.description : undefined,
      input_schema: asRecord(record.input_schema),
    };
  });
}

function serializeToolCatalog(tools: AnthropicTool[]): string[] {
  if (tools.length === 0) return [];
  return [
    [
      "[Available Tools]",
      "When a tool is required, respond with exactly one XML-wrapped JSON object:",
      '<tool>{"name":"ToolName","arguments":{}}</tool>',
      "Use only the tools listed below. Do not claim that a tool was executed.",
      "Do not execute tools inside Devin or emit ACP tool-call events; request them only with the XML envelope.",
      "Never describe a future tool action in plain text; emit the tool envelope instead.",
    ].join("\n"),
    ...tools.map((tool) =>
      [
        `[Tool] ${tool.name}`,
        tool.description ? `description: ${tool.description}` : "description:",
        "input_schema:",
        JSON.stringify(tool.input_schema || { type: "object", properties: {} }, null, 2),
      ].join("\n")
    ),
  ];
}

function serializeToolChoice(value: unknown, tools: AnthropicTool[]): string[] {
  if (value == null) return [];
  const choice = asRecord(value);
  const type = String(choice.type || "");
  if (type === "auto") return ["[Tool Choice]\nauto"];
  if (type === "any") return ["[Tool Choice]\nA tool call is required."];
  if (type === "none") return ["[Tool Choice]\nDo not call a tool."];
  if (type === "tool") {
    const name = String(choice.name || "").trim();
    if (!tools.some((tool) => tool.name === name)) {
      throw new DevinAgenticBridgeError(
        `tool_choice references unknown tool: ${name}`,
        "invalid_tool_choice"
      );
    }
    return [`[Tool Choice]\nCall exactly this tool: ${name}`];
  }
  throw new DevinAgenticBridgeError(
    `Unsupported Anthropic tool_choice type: ${type || "missing"}`,
    "invalid_tool_choice"
  );
}

export function serializeAnthropicForDevin(body: unknown): DevinPrompt {
  const record = asRecord(body);
  const messages = Array.isArray(record.messages) ? record.messages : [];
  const tools = normalizeTools(record.tools);
  const knownToolUses = new Set<string>();
  const sections: string[] = [
    ...serializeSystem(record.system),
    ...serializeToolCatalog(tools),
    ...serializeToolChoice(record.tool_choice, tools),
    ...messages.map((message) => serializeMessage(message, knownToolUses, tools)),
  ].filter((section) => section.trim().length > 0);

  if (sections.length === 0) {
    throw new DevinAgenticBridgeError("Anthropic request contains no messages", "empty_messages");
  }

  const text = sections.join("\n\n---\n\n");
  const idSeed = createHash("sha256").update(text).digest("hex").slice(0, 24);
  return { text, tools, inputTokensEstimate: estimateTokens(text), idSeed };
}
