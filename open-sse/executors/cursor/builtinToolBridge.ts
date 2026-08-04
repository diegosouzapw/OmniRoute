import {
  decodeProtobufValue,
  type ChatMessage,
  type DecodedDelta,
  type ExecServerEvent,
  type McpToolDefinition,
} from "../../utils/cursorAgentProtobuf.ts";

export type CursorBuiltinToolBridge = {
  toolName: string;
  arguments: Record<string, unknown>;
};

export type CursorClientPlatform = "windows" | "posix";

export type CursorTodoHistoryItem = {
  content: string;
  priority?: string;
};

type CursorNativeTodoWrite = Extract<DecodedDelta, { kind: "native_todo_write" }>;

type OpenAIToolChoice =
  string | { type?: unknown; function?: { name?: unknown } } | null | undefined;

type JsonSchema = {
  type?: unknown;
  properties?: Record<string, unknown>;
  required?: unknown;
  additionalProperties?: unknown;
};

const DIRECT_SHELL_TOOL_NAMES = ["bash", "shell", "run_terminal_cmd"];
const TODO_WRITE_TOOL_NAMES = ["todowrite", "todo_write"];
const BRIDGE_DESCRIPTION = "Run Cursor-requested shell command";
const ROOT_SCHEMA_KEYS = new Set([
  "$schema",
  "$id",
  "$comment",
  "title",
  "description",
  "type",
  "properties",
  "required",
  "additionalProperties",
]);
const PROPERTY_ANNOTATION_KEYS = [
  "$comment",
  "title",
  "description",
  "default",
  "examples",
  "deprecated",
  "readOnly",
  "writeOnly",
] as const;
const SCALAR_PROPERTY_KEYS = new Set(["type", ...PROPERTY_ANNOTATION_KEYS]);
const ARRAY_PROPERTY_KEYS = new Set(["type", "items", ...PROPERTY_ANNOTATION_KEYS]);
const TODO_SCALAR_PROPERTY_KEYS = new Set(["type", "enum", ...PROPERTY_ANNOTATION_KEYS]);

/** Restrict bridge candidates to the caller's OpenAI tool_choice contract. */
export function selectCursorBridgeTools(
  tools: McpToolDefinition[] | undefined,
  toolChoice: OpenAIToolChoice
): McpToolDefinition[] | undefined {
  if (toolChoice === "none") return undefined;
  if (
    toolChoice === undefined ||
    toolChoice === null ||
    toolChoice === "auto" ||
    toolChoice === "required"
  ) {
    return tools;
  }
  if (
    !isRecord(toolChoice) ||
    toolChoice.type !== "function" ||
    !isRecord(toolChoice.function) ||
    typeof toolChoice.function.name !== "string" ||
    !toolChoice.function.name
  ) {
    return undefined;
  }
  return tools?.filter((tool) => tool.name === toolChoice.function.name);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function hasOnlyKeys(value: Record<string, unknown>, allowed: Set<string>): boolean {
  return Object.keys(value).every((key) => allowed.has(key));
}

function schemaFor(tool: McpToolDefinition): JsonSchema | null {
  try {
    return objectSchema(decodeProtobufValue(tool.inputSchemaBytes));
  } catch {
    return null;
  }
}

function objectSchema(value: unknown): JsonSchema | null {
  if (!isRecord(value) || value.type !== "object") return null;
  if (!hasOnlyKeys(value, ROOT_SCHEMA_KEYS)) return null;
  if (value.properties !== undefined && !isRecord(value.properties)) return null;
  if (
    value.required !== undefined &&
    (!Array.isArray(value.required) || !value.required.every((key) => typeof key === "string"))
  ) {
    return null;
  }
  if (value.additionalProperties !== undefined && typeof value.additionalProperties !== "boolean") {
    return null;
  }
  return value as JsonSchema;
}

function schemaProperties(schema: JsonSchema): Record<string, unknown> {
  return isRecord(schema.properties) ? schema.properties : {};
}

function requiredKeys(schema: JsonSchema): string[] {
  return Array.isArray(schema.required)
    ? schema.required.filter((key): key is string => typeof key === "string")
    : [];
}

function hasAllRequired(schema: JsonSchema, args: Record<string, unknown>): boolean {
  return requiredKeys(schema).every((key) => Object.prototype.hasOwnProperty.call(args, key));
}

/**
 * Accept only the small schema subset for which generated values are proven
 * valid. Any validation keyword we do not implement (pattern, format, length,
 * conditionals, refs, dependentRequired, and so on) fails closed.
 */
function propertySupports(value: unknown, expected: "string" | "boolean" | "string[]"): boolean {
  if (!isRecord(value)) return false;
  if (expected === "string[]") {
    if (!hasOnlyKeys(value, ARRAY_PROPERTY_KEYS)) return false;
    if (value.type !== "array" || !isRecord(value.items)) return false;
    return hasOnlyKeys(value.items, SCALAR_PROPERTY_KEYS) && value.items.type === "string";
  }
  return hasOnlyKeys(value, SCALAR_PROPERTY_KEYS) && value.type === expected;
}

function propertyAcceptsString(value: unknown, actual: string): boolean {
  if (!isRecord(value) || !hasOnlyKeys(value, TODO_SCALAR_PROPERTY_KEYS)) return false;
  if (value.type !== "string") return false;
  if (value.enum === undefined) return true;
  return (
    Array.isArray(value.enum) &&
    value.enum.every((entry) => typeof entry === "string") &&
    value.enum.includes(actual)
  );
}

function namedTools(tools: McpToolDefinition[], names: string[]): McpToolDefinition[] {
  const out: McpToolDefinition[] = [];
  for (const name of names) {
    out.push(...tools.filter((tool) => tool.name.toLowerCase() === name));
  }
  return out;
}

function selectProperty(
  schema: JsonSchema,
  properties: Record<string, unknown>,
  names: string[],
  expected: "string" | "boolean" | "string[]"
): string | undefined {
  const required = new Set(requiredKeys(schema));
  return (
    names.find((name) => required.has(name) && propertySupports(properties[name], expected)) ??
    names.find((name) => propertySupports(properties[name], expected))
  );
}

function directShellBridge(
  event: Extract<ExecServerEvent, { kind: "exec_shell" | "exec_shell_stream" }>,
  tools: McpToolDefinition[]
): CursorBuiltinToolBridge | null {
  for (const tool of namedTools(tools, DIRECT_SHELL_TOOL_NAMES)) {
    const schema = schemaFor(tool);
    if (!schema) continue;
    const properties = schemaProperties(schema);
    const commandKey = selectProperty(schema, properties, ["command", "cmd"], "string");
    if (!commandKey) continue;

    const args: Record<string, unknown> = { [commandKey]: event.command };
    const cwdKey = selectProperty(
      schema,
      properties,
      ["workdir", "cwd", "workingDirectory", "working_directory"],
      "string"
    );
    if (cwdKey && event.workingDir) args[cwdKey] = event.workingDir;
    if (propertySupports(properties.description, "string")) {
      args.description = BRIDGE_DESCRIPTION;
    }
    if (hasAllRequired(schema, args)) return { toolName: tool.name, arguments: args };
  }
  return null;
}

function ptySpawnBridge(
  event: Extract<ExecServerEvent, { kind: "exec_shell" | "exec_shell_stream" | "exec_bg_shell" }>,
  tools: McpToolDefinition[],
  platform: CursorClientPlatform | undefined
): CursorBuiltinToolBridge | null {
  if (!platform) return null;
  for (const tool of namedTools(tools, ["pty_spawn"])) {
    const schema = schemaFor(tool);
    if (!schema) continue;
    const properties = schemaProperties(schema);
    if (
      !propertySupports(properties.command, "string") ||
      !propertySupports(properties.args, "string[]") ||
      !propertySupports(properties.description, "string")
    ) {
      continue;
    }

    const windows = platform === "windows";
    const args: Record<string, unknown> = {
      command: windows ? "powershell.exe" : "/bin/sh",
      args: windows
        ? ["-NoProfile", "-NonInteractive", "-Command", event.command]
        : ["-lc", event.command],
      description: BRIDGE_DESCRIPTION,
    };
    const cwdKey = selectProperty(
      schema,
      properties,
      ["workdir", "cwd", "workingDirectory", "working_directory"],
      "string"
    );
    if (cwdKey && event.workingDir) args[cwdKey] = event.workingDir;
    if (propertySupports(properties.notifyOnExit, "boolean")) args.notifyOnExit = true;
    if (hasAllRequired(schema, args)) return { toolName: tool.name, arguments: args };
  }
  return null;
}

function readBridge(
  event: Extract<ExecServerEvent, { kind: "exec_read" }>,
  tools: McpToolDefinition[]
): CursorBuiltinToolBridge | null {
  for (const tool of namedTools(tools, ["read", "read_file"])) {
    const schema = schemaFor(tool);
    if (!schema) continue;
    const properties = schemaProperties(schema);
    const pathKey = selectProperty(schema, properties, ["filePath", "path", "file_path"], "string");
    if (!pathKey) continue;
    const args: Record<string, unknown> = { [pathKey]: event.path };
    if (hasAllRequired(schema, args)) return { toolName: tool.name, arguments: args };
  }
  return null;
}

/**
 * Recover priorities from the latest structured external TodoWrite call in
 * OpenAI history. Cursor's native TodoItem wire schema has no priority field,
 * so the bridge may preserve a prior declared value but must never invent one.
 */
export function extractLatestTodoHistory(
  messages: ChatMessage[]
): CursorTodoHistoryItem[] | undefined {
  for (let messageIndex = messages.length - 1; messageIndex >= 0; messageIndex -= 1) {
    const message = messages[messageIndex];
    if (message.role !== "assistant") continue;
    const calls = message.tool_calls;
    if (!Array.isArray(calls)) continue;
    for (let callIndex = calls.length - 1; callIndex >= 0; callIndex -= 1) {
      const call = calls[callIndex];
      if (
        !isRecord(call) ||
        !isRecord(call.function) ||
        typeof call.function.name !== "string" ||
        !call.function.name ||
        typeof call.function.arguments !== "string"
      ) {
        return undefined;
      }
      if (!TODO_WRITE_TOOL_NAMES.includes(call.function.name.toLowerCase())) continue;
      let parsed: unknown;
      try {
        parsed = JSON.parse(call.function.arguments);
      } catch {
        return undefined;
      }
      if (!isRecord(parsed) || !Array.isArray(parsed.todos)) return undefined;
      const out: CursorTodoHistoryItem[] = [];
      const contents = new Set<string>();
      for (const value of parsed.todos) {
        if (!isRecord(value) || typeof value.content !== "string" || !value.content) {
          return undefined;
        }
        if (contents.has(value.content)) return undefined;
        contents.add(value.content);
        if (
          value.priority !== undefined &&
          (typeof value.priority !== "string" || !value.priority)
        ) {
          return undefined;
        }
        out.push({
          content: value.content,
          ...(typeof value.priority === "string" ? { priority: value.priority } : {}),
        });
      }
      return out;
    }
  }
  return undefined;
}

/**
 * Surface Cursor's native TodoWrite as a declared OpenAI TodoWrite call.
 * OpenCode's todowrite replaces the complete list, so native merge=true is
 * accepted only when the payload's content set exactly matches structured
 * history and is therefore provably a complete replacement.
 */
export function bridgeCursorNativeTodoWrite(
  event: CursorNativeTodoWrite,
  tools: McpToolDefinition[],
  history: CursorTodoHistoryItem[] | undefined
): CursorBuiltinToolBridge | null {
  const nativeContents = new Set<string>();
  for (const item of event.todos) {
    if (nativeContents.has(item.content)) return null;
    nativeContents.add(item.content);
  }

  const historyByContent = new Map<string, CursorTodoHistoryItem>();
  for (const item of history ?? []) {
    if (historyByContent.has(item.content)) return null;
    historyByContent.set(item.content, item);
  }
  if (
    event.merge &&
    (!history ||
      historyByContent.size !== nativeContents.size ||
      [...nativeContents].some((content) => !historyByContent.has(content)))
  ) {
    return null;
  }

  for (const tool of namedTools(tools, TODO_WRITE_TOOL_NAMES)) {
    const schema = schemaFor(tool);
    if (!schema) continue;
    const properties = schemaProperties(schema);
    const todosProperty = properties.todos;
    if (
      !isRecord(todosProperty) ||
      !hasOnlyKeys(todosProperty, ARRAY_PROPERTY_KEYS) ||
      todosProperty.type !== "array" ||
      !isRecord(todosProperty.items)
    ) {
      continue;
    }
    const itemSchema = objectSchema(todosProperty.items);
    if (!itemSchema) continue;
    const itemProperties = schemaProperties(itemSchema);
    if (!isRecord(itemProperties.content) || !isRecord(itemProperties.status)) continue;

    const bridgedTodos: Array<Record<string, unknown>> = [];
    let compatible = true;
    for (const item of event.todos) {
      if (
        !propertyAcceptsString(itemProperties.content, item.content) ||
        !propertyAcceptsString(itemProperties.status, item.status)
      ) {
        compatible = false;
        break;
      }
      const bridged: Record<string, unknown> = {
        content: item.content,
        status: item.status,
      };
      const priority = historyByContent.get(item.content)?.priority;
      if (priority && propertyAcceptsString(itemProperties.priority, priority)) {
        bridged.priority = priority;
      }
      if (!hasAllRequired(itemSchema, bridged)) {
        compatible = false;
        break;
      }
      bridgedTodos.push(bridged);
    }
    if (!compatible) continue;
    const args: Record<string, unknown> = { todos: bridgedTodos };
    if (hasAllRequired(schema, args)) return { toolName: tool.name, arguments: args };
  }
  return null;
}

/**
 * Convert a Cursor-native built-in request into a declared external tool call.
 * Only event variants whose complete arguments are decoded are supported.
 * Unknown or constrained schemas fail closed and retain typed rejection.
 */
export function bridgeCursorBuiltinTool(
  event: ExecServerEvent,
  tools: McpToolDefinition[],
  platform?: CursorClientPlatform
): CursorBuiltinToolBridge | null {
  if (event.kind === "exec_read") return readBridge(event, tools);
  if (
    event.kind !== "exec_shell" &&
    event.kind !== "exec_shell_stream" &&
    event.kind !== "exec_bg_shell"
  ) {
    return null;
  }
  if (!event.command.trim()) return null;
  // The external schemas supported here do not expose Cursor's timeout or
  // hard-timeout semantics. Dropping either limit could broaden execution, so
  // preserve the native typed rejection instead of emitting an unsafe call.
  if (event.timeout > 0 || event.hardTimeout > 0) return null;
  const background = event.kind === "exec_bg_shell" || event.isBackground;
  if (background) return ptySpawnBridge(event, tools, platform);
  return directShellBridge(event, tools) ?? ptySpawnBridge(event, tools, platform);
}
