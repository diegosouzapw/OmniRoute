import test from "node:test";
import assert from "node:assert/strict";
import {
  bridgeCursorBuiltinTool,
  selectCursorBridgeTools,
} from "../../open-sse/executors/cursor/builtinToolBridge.ts";
import {
  openAIToolsToMcpDefs,
  type ExecServerEvent,
  type OpenAITool,
} from "../../open-sse/utils/cursorAgentProtobuf.ts";

function defs(tools: OpenAITool[]) {
  return openAIToolsToMcpDefs(tools);
}

const ptySpawn: OpenAITool = {
  type: "function",
  function: {
    name: "pty_spawn",
    description: "Spawn a PTY",
    parameters: {
      type: "object",
      properties: {
        command: { type: "string" },
        args: { type: "array", items: { type: "string" } },
        workdir: { type: "string" },
        description: { type: "string" },
        notifyOnExit: { type: "boolean" },
      },
      required: ["command", "args", "description"],
      additionalProperties: false,
    },
  },
};

const readTool: OpenAITool = {
  type: "function",
  function: {
    name: "read",
    description: "Read a file",
    parameters: {
      type: "object",
      properties: {
        filePath: { type: "string" },
        offset: { type: "number" },
        limit: { type: "number" },
      },
      required: ["filePath"],
      additionalProperties: false,
    },
  },
};

function shellEvent(overrides: Partial<ExecServerEvent> = {}): ExecServerEvent {
  return {
    kind: "exec_shell_stream",
    execMsgId: 1,
    execId: "exec-shell",
    command: "mktemp -d /tmp/file-tools-test-XXXXXX",
    workingDir: "/tmp",
    timeout: 0,
    isBackground: false,
    hardTimeout: 0,
    ...overrides,
  } as ExecServerEvent;
}

function bashTool(
  parameters: Record<string, unknown> = {
    type: "object",
    properties: { command: { type: "string" }, workdir: { type: "string" } },
    required: ["command"],
    additionalProperties: false,
  }
): OpenAITool {
  return { type: "function", function: { name: "bash", parameters } };
}

test("bridges Cursor shell_stream to pty_spawn with an explicit POSIX platform", () => {
  const result = bridgeCursorBuiltinTool(shellEvent(), defs([ptySpawn]), "posix");
  assert.deepEqual(result, {
    toolName: "pty_spawn",
    arguments: {
      command: "/bin/sh",
      args: ["-lc", "mktemp -d /tmp/file-tools-test-XXXXXX"],
      workdir: "/tmp",
      description: "Run Cursor-requested shell command",
      notifyOnExit: true,
    },
  });
});

test("restricts bridge candidates according to tool_choice", () => {
  const tools = defs([ptySpawn, readTool]);
  assert.equal(selectCursorBridgeTools(tools, "none"), undefined);
  assert.deepEqual(
    selectCursorBridgeTools(tools, {
      type: "function",
      function: { name: "read" },
    })?.map((tool) => tool.name),
    ["read"]
  );
  assert.deepEqual(
    selectCursorBridgeTools(tools, "auto")?.map((tool) => tool.name),
    ["pty_spawn", "read"]
  );
});

test("bridges Windows Cursor shell requests using the explicit client platform", () => {
  const command = "New-Item -ItemType Directory -Path $env:TEMP\\cursor-probe";
  const result = bridgeCursorBuiltinTool(
    shellEvent({ command, workingDir: "C:\\Users\\max\\project" }),
    defs([ptySpawn]),
    "windows"
  );
  assert.deepEqual(result, {
    toolName: "pty_spawn",
    arguments: {
      command: "powershell.exe",
      args: ["-NoProfile", "-NonInteractive", "-Command", command],
      workdir: "C:\\Users\\max\\project",
      description: "Run Cursor-requested shell command",
      notifyOnExit: true,
    },
  });
});

test("does not infer the interpreter from command text", () => {
  const result = bridgeCursorBuiltinTool(
    shellEvent({ command: "echo C:\\temp", workingDir: "/tmp" }),
    defs([ptySpawn]),
    "posix"
  );
  assert.equal(result?.arguments.command, "/bin/sh");
});

test("fails closed for pty_spawn when client platform is unknown", () => {
  assert.equal(bridgeCursorBuiltinTool(shellEvent(), defs([ptySpawn])), null);
});

test("prefers a synchronous bash-compatible tool for foreground shell requests", () => {
  const result = bridgeCursorBuiltinTool(shellEvent(), defs([ptySpawn, bashTool()]));
  assert.deepEqual(result, {
    toolName: "bash",
    arguments: {
      command: "mktemp -d /tmp/file-tools-test-XXXXXX",
      workdir: "/tmp",
    },
  });
});

test("uses a required compatible alias instead of the first optional alias", () => {
  const tool = bashTool({
    type: "object",
    properties: { command: { type: "string" }, cmd: { type: "string" } },
    required: ["cmd"],
  });
  assert.deepEqual(bridgeCursorBuiltinTool(shellEvent(), defs([tool])), {
    toolName: "bash",
    arguments: { cmd: "mktemp -d /tmp/file-tools-test-XXXXXX" },
  });
});

test("background shell requests never downgrade to a synchronous bash tool", () => {
  const event = shellEvent({ kind: "exec_bg_shell", command: "node server.js" });
  const result = bridgeCursorBuiltinTool(event, defs([bashTool(), ptySpawn]), "posix");
  assert.equal(result?.toolName, "pty_spawn");
});

test("background-marked shell_stream requests never use a synchronous shell tool", () => {
  const event = shellEvent({ isBackground: true, command: "node server.js" });
  const result = bridgeCursorBuiltinTool(event, defs([bashTool(), ptySpawn]), "posix");
  assert.equal(result?.toolName, "pty_spawn");
});

test("fails closed rather than dropping Cursor timeout semantics", () => {
  assert.equal(
    bridgeCursorBuiltinTool(shellEvent({ timeout: 5_000 }), defs([bashTool(), ptySpawn]), "posix"),
    null
  );
  assert.equal(
    bridgeCursorBuiltinTool(
      shellEvent({ hardTimeout: 7_000 }),
      defs([bashTool(), ptySpawn]),
      "posix"
    ),
    null
  );
});

test("bridges exec_read to a schema-compatible read tool", () => {
  const event: ExecServerEvent = {
    kind: "exec_read",
    execMsgId: 2,
    execId: "read",
    path: "/tmp/test.txt",
  };
  assert.deepEqual(bridgeCursorBuiltinTool(event, defs([readTool])), {
    toolName: "read",
    arguments: { filePath: "/tmp/test.txt" },
  });
});

test("rejects type-incompatible and constrained schemas", () => {
  const wrongCommand = bashTool({
    type: "object",
    properties: { command: { type: "number" } },
    required: ["command"],
  });
  const patternedCommand = bashTool({
    type: "object",
    properties: { command: { type: "string", pattern: "^safe$" } },
    required: ["command"],
  });
  const dependentCommand = bashTool({
    type: "object",
    properties: { command: { type: "string" }, confirmation: { type: "string" } },
    required: ["command"],
    dependentRequired: { command: ["confirmation"] },
  });
  const constrainedRead: OpenAITool = {
    ...readTool,
    function: {
      ...readTool.function,
      parameters: {
        type: "object",
        properties: { filePath: { type: "string", minLength: 100 } },
        required: ["filePath"],
      },
    },
  };
  const wrongPtyArgs: OpenAITool = {
    ...ptySpawn,
    function: {
      ...ptySpawn.function,
      parameters: {
        type: "object",
        properties: {
          command: { type: "string" },
          args: { type: "array", items: { type: "string" }, minItems: 8 },
          description: { type: "string" },
        },
        required: ["command", "args", "description"],
      },
    },
  };
  const readEvent: ExecServerEvent = {
    kind: "exec_read",
    execMsgId: 2,
    execId: "read-constrained",
    path: "/x",
  };
  assert.equal(bridgeCursorBuiltinTool(shellEvent(), defs([wrongCommand])), null);
  assert.equal(bridgeCursorBuiltinTool(shellEvent(), defs([patternedCommand])), null);
  assert.equal(bridgeCursorBuiltinTool(shellEvent(), defs([dependentCommand])), null);
  assert.equal(bridgeCursorBuiltinTool(readEvent, defs([constrainedRead])), null);
  assert.equal(bridgeCursorBuiltinTool(shellEvent(), defs([wrongPtyArgs]), "posix"), null);
});

test("tries later aliases when an earlier name has an incompatible schema", () => {
  const incompatibleBash = bashTool({
    type: "object",
    properties: { command: { type: "number" } },
    required: ["command"],
  });
  const compatibleShell: OpenAITool = {
    type: "function",
    function: {
      name: "shell",
      parameters: {
        type: "object",
        properties: { command: { type: "string" } },
        required: ["command"],
      },
    },
  };
  assert.equal(
    bridgeCursorBuiltinTool(shellEvent(), defs([incompatibleBash, compatibleShell]))?.toolName,
    "shell"
  );

  const incompatibleRead: OpenAITool = {
    ...readTool,
    function: {
      ...readTool.function,
      parameters: {
        type: "object",
        properties: { filePath: { type: "number" } },
        required: ["filePath"],
      },
    },
  };
  const compatibleReadFile: OpenAITool = {
    type: "function",
    function: {
      name: "read_file",
      parameters: {
        type: "object",
        properties: { path: { type: "string" } },
        required: ["path"],
      },
    },
  };
  const readEvent: ExecServerEvent = {
    kind: "exec_read",
    execMsgId: 3,
    execId: "read-alias",
    path: "/tmp/a",
  };
  assert.equal(
    bridgeCursorBuiltinTool(readEvent, defs([incompatibleRead, compatibleReadFile]))?.toolName,
    "read_file"
  );
});

test("fails closed when no declared tool matches the built-in event", () => {
  const incompatible: OpenAITool = {
    type: "function",
    function: {
      name: "execute",
      parameters: {
        type: "object",
        properties: { code: { type: "string" } },
        required: ["code"],
      },
    },
  };
  assert.equal(bridgeCursorBuiltinTool(shellEvent(), defs([incompatible]), "posix"), null);
  assert.equal(
    bridgeCursorBuiltinTool(
      { kind: "exec_write", execMsgId: 2, execId: "write", path: "/tmp/a" },
      defs([readTool]),
      "posix"
    ),
    null
  );
});
