import {
  decodeProtobufValue,
  type ExecServerEvent,
  type McpToolDefinition,
} from "../../utils/cursorAgentProtobuf.ts";

export type CursorBuiltinToolBridge = {
  toolName: string;
  arguments: Record<string, unknown>;
};

export type CursorClientPlatform = "windows" | "posix";

type OpenAIToolChoice =
  string | { type?: unknown; function?: { name?: unknown } } | null | undefined;

type JsonSchema = {
  type?: unknown;
  properties?: Record<string, unknown>;
  required?: unknown;
  additionalProperties?: unknown;
};

const DIRECT_SHELL_TOOL_NAMES = ["bash", "shell", "run_terminal_cmd"];
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

/** Restrict bridge candidates to the caller's OpenAI tool_choice contract. */
export function selectCursorBridgeTools(
  tools: McpToolDefinition[] | undefined,
  toolChoice: OpenAIToolChoice
): McpToolDefinition[] | undefined {
  if (toolChoice === "none") return undefined;
  const specificName =
    toolChoice &&
    typeof toolChoice === "object" &&
    toolChoice.type === "function" &&
    typeof toolChoice.function?.name === "string"
      ? toolChoice.function.name
      : undefined;
  return specificName ? tools?.filter((tool) => tool.name === specificName) : tools;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function hasOnlyKeys(value: Record<string, unknown>, allowed: Set<string>): boolean {
  return Object.keys(value).every((key) => allowed.has(key));
}

function schemaFor(tool: McpToolDefinition): JsonSchema | null {
  try {
    const decoded = decodeProtobufValue(tool.inputSchemaBytes);
    if (!isRecord(decoded) || decoded.type !== "object") return null;
    if (!hasOnlyKeys(decoded, ROOT_SCHEMA_KEYS)) return null;
    if (decoded.properties !== undefined && !isRecord(decoded.properties)) return null;
    if (
      decoded.required !== undefined &&
      (!Array.isArray(decoded.required) ||
        !decoded.required.every((key) => typeof key === "string"))
    ) {
      return null;
    }
    if (
      decoded.additionalProperties !== undefined &&
      typeof decoded.additionalProperties !== "boolean"
    ) {
      return null;
    }
    return decoded as JsonSchema;
  } catch {
    return null;
  }
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
