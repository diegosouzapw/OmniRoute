import {
  decodeProtobufValue,
  type ChatMessage,
  type DecodedDelta,
  type ExecServerEvent,
  type McpToolDefinition,
} from "../../utils/cursorAgentProtobuf.ts";
import type { PiExecEvent } from "../../utils/cursorAgentProtobuf/pi.ts";
import type { ExtraExecEvent } from "../../utils/cursorAgentProtobuf/extraExec.ts";

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
const GREP_TOOL_NAMES = ["grep", "search", "ripgrep", "grep_search"];
const LS_TOOL_NAMES = ["glob", "ls", "list", "list_dir", "list_directory"];
const WRITE_TOOL_NAMES = ["write", "write_file", "create_file"];
const FETCH_TOOL_NAMES = ["webfetch", "web_fetch", "fetch"];
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
type SupportedPropertyType = "string" | "boolean" | "string[]" | "number";

function propertySupports(value: unknown, expected: SupportedPropertyType): boolean {
  if (!isRecord(value)) return false;
  if (expected === "string[]") {
    if (!hasOnlyKeys(value, ARRAY_PROPERTY_KEYS)) return false;
    if (value.type !== "array" || !isRecord(value.items)) return false;
    return hasOnlyKeys(value.items, SCALAR_PROPERTY_KEYS) && value.items.type === "string";
  }
  if (expected === "number") {
    // JSON Schema spells a millisecond field either way; both accept an integer.
    if (!hasOnlyKeys(value, SCALAR_PROPERTY_KEYS)) return false;
    return value.type === "integer" || value.type === "number";
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
  expected: SupportedPropertyType
): string | undefined {
  const required = new Set(requiredKeys(schema));
  return (
    names.find((name) => required.has(name) && propertySupports(properties[name], expected)) ??
    names.find((name) => propertySupports(properties[name], expected))
  );
}

function directShellBridge(
  event: Extract<
    ExecServerEvent,
    { kind: "exec_shell" | "exec_shell_stream" | "exec_mini_swe_bash" }
  >,
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
    // Cursor stamps a timeout (and a 24h hard timeout) on every shell exec it
    // emits. Refusing to bridge whenever either was set made this path
    // unreachable in practice — the harness got narration and no tool call.
    // Dropping them does not broaden execution: the command runs on the CLIENT
    // under its own limits, exactly like a tool_call from any other provider,
    // which carries no server-side timeout either. Map the value when the
    // declared tool can express it so the intent survives; otherwise the
    // client's own default applies.
    const timeoutKey = selectProperty(schema, properties, ["timeout"], "number");
    const timeoutMs = event.timeout > 0 ? event.timeout : 0;
    if (timeoutKey && timeoutMs > 0) args[timeoutKey] = timeoutMs;
    if (propertySupports(properties.description, "string")) {
      args.description = BRIDGE_DESCRIPTION;
    }
    if (hasAllRequired(schema, args)) return { toolName: tool.name, arguments: args };
  }
  return null;
}

function ptySpawnBridge(
  event: Extract<
    ExecServerEvent,
    { kind: "exec_shell" | "exec_shell_stream" | "exec_bg_shell" | "exec_mini_swe_bash" }
  >,
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
 * Cursor routes work onto its own built-in tools (Grep, Ls, Write, Fetch) even
 * when the client declared equivalents. Each unbridged variant used to end the
 * turn with a typed rejection and no tool call, so a harness like opencode saw
 * an empty answer and retried the same step forever.
 *
 * Every bridge below fails closed: it emits a call only when a declared tool
 * can express the request, and never invents arguments Cursor did not send.
 */
function grepBridge(
  event: Extract<ExecServerEvent, { kind: "exec_grep" }>,
  tools: McpToolDefinition[]
): CursorBuiltinToolBridge | null {
  if (event.outputMode && !["content", "files_with_matches", "count"].includes(event.outputMode))
    return null;
  // Cursor reuses the grep channel for FILE SEARCH: an empty pattern with a
  // glob ("", "**/*") means "list matching files", not "search contents".
  // Requiring a pattern left those execs unbridged, so the agent could never
  // discover files and stalled on its very first exploration step.
  if (!event.pattern.trim()) {
    if (!event.glob.trim()) return null;
    for (const tool of namedTools(tools, LS_TOOL_NAMES)) {
      const schema = schemaFor(tool);
      if (!schema) continue;
      const properties = schemaProperties(schema);
      const patternKey = selectProperty(schema, properties, ["pattern", "glob"], "string");
      if (!patternKey) continue;

      const args: Record<string, unknown> = { [patternKey]: event.glob };
      const pathKey = selectProperty(schema, properties, ["path", "dir", "directory"], "string");
      if (pathKey && event.path) args[pathKey] = event.path;
      if (hasAllRequired(schema, args)) return { toolName: tool.name, arguments: args };
    }
    return null;
  }
  for (const tool of namedTools(tools, GREP_TOOL_NAMES)) {
    const schema = schemaFor(tool);
    if (!schema) continue;
    const properties = schemaProperties(schema);
    const patternKey = selectProperty(schema, properties, ["pattern", "query", "regex"], "string");
    if (!patternKey) continue;

    const args: Record<string, unknown> = { [patternKey]: event.pattern };
    const pathKey = selectProperty(schema, properties, ["path", "dir", "directory"], "string");
    if (pathKey && event.path) args[pathKey] = event.path;
    const globKey = selectProperty(
      schema,
      properties,
      ["include", "glob", "filePattern"],
      "string"
    );
    if (globKey && event.glob) args[globKey] = event.glob;
    if (hasAllRequired(schema, args)) return { toolName: tool.name, arguments: args };
  }
  return null;
}

function lsBridge(
  event: Extract<ExecServerEvent, { kind: "exec_ls" }>,
  tools: McpToolDefinition[]
): CursorBuiltinToolBridge | null {
  if (!event.path.trim()) return null;
  for (const tool of namedTools(tools, LS_TOOL_NAMES)) {
    const schema = schemaFor(tool);
    if (!schema) continue;
    const properties = schemaProperties(schema);
    const pathKey = selectProperty(schema, properties, ["path", "dir", "directory"], "string");
    if (!pathKey) continue;

    const args: Record<string, unknown> = { [pathKey]: event.path };
    // opencode's `glob` requires a pattern; list everything under the path.
    const patternKey = selectProperty(schema, properties, ["pattern", "glob"], "string");
    if (patternKey) args[patternKey] = "*";
    if (hasAllRequired(schema, args)) return { toolName: tool.name, arguments: args };
  }
  return null;
}

function writeBridge(
  event: Extract<ExecServerEvent, { kind: "exec_write" }>,
  tools: McpToolDefinition[]
): CursorBuiltinToolBridge | null {
  if (
    !event.path.trim() ||
    event.hasFileBytes ||
    (event.encodingHint && !["utf8", "utf-8"].includes(event.encodingHint.toLowerCase()))
  )
    return null;
  for (const tool of namedTools(tools, WRITE_TOOL_NAMES)) {
    const schema = schemaFor(tool);
    if (!schema) continue;
    const properties = schemaProperties(schema);
    const pathKey = selectProperty(schema, properties, ["filePath", "path", "file_path"], "string");
    const contentKey = selectProperty(
      schema,
      properties,
      ["content", "contents", "text", "file_text"],
      "string"
    );
    if (!pathKey || !contentKey) continue;

    const args: Record<string, unknown> = { [pathKey]: event.path, [contentKey]: event.fileText };
    if (hasAllRequired(schema, args)) return { toolName: tool.name, arguments: args };
  }
  return null;
}

function fetchBridge(
  event: Extract<ExecServerEvent, { kind: "exec_fetch" }>,
  tools: McpToolDefinition[]
): CursorBuiltinToolBridge | null {
  if (!event.url.trim()) return null;
  for (const tool of namedTools(tools, FETCH_TOOL_NAMES)) {
    const schema = schemaFor(tool);
    if (!schema) continue;
    const properties = schemaProperties(schema);
    const urlKey = selectProperty(schema, properties, ["url", "uri", "link"], "string");
    if (!urlKey) continue;

    const args: Record<string, unknown> = { [urlKey]: event.url };
    if (hasAllRequired(schema, args)) return { toolName: tool.name, arguments: args };
  }
  return null;
}

/** Bridge PI built-ins only when the declared client schema preserves their arguments. */
export function bridgeCursorPiTool(
  event: PiExecEvent,
  tools: McpToolDefinition[]
): CursorBuiltinToolBridge | null {
  const base = { execMsgId: event.execMsgId, execId: event.execId };
  switch (event.kind) {
    case "exec_pi_read": {
      if (!event.path.trim()) return null;
      for (const tool of namedTools(tools, ["read", "read_file"])) {
        const schema = schemaFor(tool);
        if (!schema) continue;
        const properties = schemaProperties(schema);
        const pathKey = selectProperty(
          schema,
          properties,
          ["filePath", "path", "file_path"],
          "string"
        );
        if (!pathKey) continue;
        const args: Record<string, unknown> = { [pathKey]: event.path };
        let compatible = true;
        for (const key of ["offset", "limit"] as const) {
          if (event[key] <= 0) continue;
          if (!propertySupports(properties[key], "number")) {
            compatible = false;
            break;
          }
          args[key] = event[key];
        }
        if (compatible && hasAllRequired(schema, args))
          return { toolName: tool.name, arguments: args };
      }
      return null;
    }
    case "exec_pi_bash": {
      const bridge = bridgeCursorBuiltinTool(
        {
          ...base,
          kind: "exec_shell",
          command: event.command,
          workingDir: "",
          timeout: event.timeout,
          isBackground: false,
          hardTimeout: 0,
        },
        tools
      );
      return event.timeout > 0 && bridge?.arguments.timeout === undefined ? null : bridge;
    }
    case "exec_pi_edit": {
      if (!event.path.trim() || event.edits.length !== 1 || !event.edits[0].oldText) return null;
      for (const tool of namedTools(tools, ["edit"])) {
        const schema = schemaFor(tool);
        if (!schema) continue;
        const properties = schemaProperties(schema);
        const pathKey = selectProperty(schema, properties, ["filePath", "path"], "string");
        const oldKey = selectProperty(schema, properties, ["oldString", "old_text"], "string");
        const newKey = selectProperty(schema, properties, ["newString", "new_text"], "string");
        if (!pathKey || !oldKey || !newKey) continue;
        const args = {
          [pathKey]: event.path,
          [oldKey]: event.edits[0].oldText,
          [newKey]: event.edits[0].newText,
        };
        if (hasAllRequired(schema, args)) return { toolName: tool.name, arguments: args };
      }
      return null;
    }
    case "exec_pi_write":
      return bridgeCursorBuiltinTool(
        { ...base, kind: "exec_write", path: event.path, fileText: event.content },
        tools
      );
    case "exec_pi_grep": {
      if (event.ignoreCase || event.literal || event.context || event.limit) return null;
      const bridge = bridgeCursorBuiltinTool(
        {
          ...base,
          kind: "exec_grep",
          pattern: event.pattern,
          path: event.path,
          glob: event.glob,
          outputMode: "content",
        },
        tools
      );
      if (
        event.glob &&
        !["include", "glob", "filePattern"].some((key) => bridge?.arguments[key] === event.glob)
      ) {
        return null;
      }
      return bridge;
    }
    case "exec_pi_find":
      return event.limit
        ? null
        : bridgeCursorBuiltinTool(
            { ...base, kind: "exec_grep", pattern: "", path: event.path, glob: event.pattern },
            tools
          );
    case "exec_pi_ls":
      return event.limit
        ? null
        : bridgeCursorBuiltinTool({ ...base, kind: "exec_ls", path: event.path || "." }, tools);
  }
}

/** Only the plain working-tree patch has a lossless client-side git equivalent. */
export function bridgeCursorGitDiff(
  event: Extract<ExtraExecEvent, { kind: "exec_git_diff" }>,
  tools: McpToolDefinition[]
): CursorBuiltinToolBridge | null {
  if (
    !event.cwd ||
    event.ref ||
    event.baseRef ||
    event.outputFormat !== 3 ||
    event.targetPaths.length ||
    event.mergeBase ||
    event.maxUntrackedFiles ||
    event.submoduleRecurseDepth ||
    event.includeSpaceChanges ||
    event.committedOnly ||
    event.computePatchId ||
    event.returnHeadSha ||
    event.hasAdvancedLimits
  )
    return null;
  for (const tool of namedTools(tools, DIRECT_SHELL_TOOL_NAMES)) {
    const schema = schemaFor(tool);
    if (!schema) continue;
    const properties = schemaProperties(schema);
    const commandKey = selectProperty(schema, properties, ["command", "cmd"], "string");
    const cwdKey = selectProperty(
      schema,
      properties,
      ["workdir", "cwd", "workingDirectory", "working_directory"],
      "string"
    );
    if (!commandKey || !cwdKey) continue;
    const args: Record<string, unknown> = { [commandKey]: "git diff HEAD --", [cwdKey]: event.cwd };
    if (propertySupports(properties.description, "string"))
      args.description = "Inspect Cursor working-tree diff";
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
  if (event.kind === "exec_grep") return grepBridge(event, tools);
  if (event.kind === "exec_ls") return lsBridge(event, tools);
  if (event.kind === "exec_write") return writeBridge(event, tools);
  if (event.kind === "exec_fetch") return fetchBridge(event, tools);
  if (
    event.kind !== "exec_shell" &&
    event.kind !== "exec_shell_stream" &&
    event.kind !== "exec_mini_swe_bash" &&
    event.kind !== "exec_bg_shell"
  ) {
    return null;
  }
  if (!event.command.trim()) return null;
  const background = event.kind === "exec_bg_shell" || event.isBackground;
  if (background) return ptySpawnBridge(event, tools, platform);
  return directShellBridge(event, tools) ?? ptySpawnBridge(event, tools, platform);
}
