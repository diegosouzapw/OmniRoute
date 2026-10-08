import test from "node:test";
import assert from "node:assert/strict";
import { bridgeCursorBuiltinTool } from "../../open-sse/executors/cursor/builtinToolBridge.ts";
import {
  openAIToolsToMcpDefs,
  type ExecServerEvent,
  type OpenAITool,
} from "../../open-sse/utils/cursorAgentProtobuf.ts";

function defs(tools: OpenAITool[]) {
  return openAIToolsToMcpDefs(tools);
}

test("shape-fallback: custom-named shell tool matches by command property", () => {
  const customShell: OpenAITool = {
    type: "function",
    function: {
      name: "run_in_container",
      description: "Run command inside the container",
      parameters: {
        type: "object",
        properties: {
          cmd: { type: "string" },
          cwd: { type: "string" },
        },
        required: ["cmd"],
        additionalProperties: false,
      },
    },
  };
  const event: ExecServerEvent = {
    kind: "exec_shell",
    execMsgId: "msg-1",
    execId: "exec-1",
    command: "npm test",
    workingDir: "/workspace",
    timeout: 0,
    isBackground: false,
    hardTimeout: 0,
  };
  const bridged = bridgeCursorBuiltinTool(event, defs([customShell]));
  assert.ok(bridged);
  assert.equal(bridged.toolName, "run_in_container");
  assert.equal(bridged.arguments.cmd, "npm test");
  assert.equal(bridged.arguments.cwd, "/workspace");
});

test("shape-fallback: custom-named read tool matches by filePath property", () => {
  const customRead: OpenAITool = {
    type: "function",
    function: {
      name: "get_file_contents",
      description: "Read a file from disk",
      parameters: {
        type: "object",
        properties: {
          file_path: { type: "string" },
          offset: { type: "number" },
          limit: { type: "number" },
        },
        required: ["file_path"],
        additionalProperties: false,
      },
    },
  };
  const event: ExecServerEvent = {
    kind: "exec_read",
    execMsgId: "msg-1",
    execId: "exec-1",
    path: "/src/index.ts",
    offset: 10,
    limit: 50,
  };
  const bridged = bridgeCursorBuiltinTool(event, defs([customRead]));
  assert.ok(bridged);
  assert.equal(bridged.toolName, "get_file_contents");
  assert.equal(bridged.arguments.file_path, "/src/index.ts");
  assert.equal(bridged.arguments.offset, 10);
  assert.equal(bridged.arguments.limit, 50);
});

test("shape-fallback: custom-named grep tool matches by query property", () => {
  const customGrep: OpenAITool = {
    type: "function",
    function: {
      name: "search_symbol",
      description: "Search symbols in repo",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string" },
          dir: { type: "string" },
          include: { type: "string" },
        },
        required: ["query"],
        additionalProperties: false,
      },
    },
  };
  const event: ExecServerEvent = {
    kind: "exec_grep",
    execMsgId: "msg-1",
    execId: "exec-1",
    pattern: "handleChat",
    path: "src/",
    glob: "*.ts",
    outputMode: "content",
  };
  const bridged = bridgeCursorBuiltinTool(event, defs([customGrep]));
  assert.ok(bridged);
  assert.equal(bridged.toolName, "search_symbol");
  assert.equal(bridged.arguments.query, "handleChat");
  assert.equal(bridged.arguments.dir, "src/");
  assert.equal(bridged.arguments.include, "*.ts");
});

test("shape-fallback: custom-named ls tool matches by path property", () => {
  const customLs: OpenAITool = {
    type: "function",
    function: {
      name: "tree_list",
      description: "List directory tree",
      parameters: {
        type: "object",
        properties: {
          directory: { type: "string" },
          pattern: { type: "string" },
        },
        required: ["directory"],
        additionalProperties: false,
      },
    },
  };
  const event: ExecServerEvent = {
    kind: "exec_ls",
    execMsgId: "msg-1",
    execId: "exec-1",
    path: "/home/user/project",
  };
  const bridged = bridgeCursorBuiltinTool(event, defs([customLs]));
  assert.ok(bridged);
  assert.equal(bridged.toolName, "tree_list");
  assert.equal(bridged.arguments.directory, "/home/user/project");
  assert.equal(bridged.arguments.pattern, "*");
});

test("shape-fallback: custom-named write tool matches by path + contents properties", () => {
  const customWrite: OpenAITool = {
    type: "function",
    function: {
      name: "overwrite_file",
      description: "Write content to a file",
      parameters: {
        type: "object",
        properties: {
          filePath: { type: "string" },
          contents: { type: "string" },
        },
        required: ["filePath", "contents"],
        additionalProperties: false,
      },
    },
  };
  const event: ExecServerEvent = {
    kind: "exec_write",
    execMsgId: "msg-1",
    execId: "exec-1",
    path: "/tmp/foo.txt",
    fileText: "hello world",
    hasFileBytes: false,
    encodingHint: "utf-8",
  };
  const bridged = bridgeCursorBuiltinTool(event, defs([customWrite]));
  assert.ok(bridged);
  assert.equal(bridged.toolName, "overwrite_file");
  assert.equal(bridged.arguments.filePath, "/tmp/foo.txt");
  assert.equal(bridged.arguments.contents, "hello world");
});

test("shape-fallback: custom-named fetch tool matches by uri property", () => {
  const customFetch: OpenAITool = {
    type: "function",
    function: {
      name: "http_client_get",
      description: "Fetch web content",
      parameters: {
        type: "object",
        properties: {
          uri: { type: "string" },
        },
        required: ["uri"],
        additionalProperties: false,
      },
    },
  };
  const event: ExecServerEvent = {
    kind: "exec_fetch",
    execMsgId: "msg-1",
    execId: "exec-1",
    url: "https://example.com",
  };
  const bridged = bridgeCursorBuiltinTool(event, defs([customFetch]));
  assert.ok(bridged);
  assert.equal(bridged.toolName, "http_client_get");
  assert.equal(bridged.arguments.uri, "https://example.com");
});

test("shape-fallback: multiple ambiguous shape candidates fail closed", () => {
  const read1: OpenAITool = {
    type: "function",
    function: {
      name: "read_backend",
      parameters: {
        type: "object",
        properties: { path: { type: "string" } },
        required: ["path"],
        additionalProperties: false,
      },
    },
  };
  const read2: OpenAITool = {
    type: "function",
    function: {
      name: "read_frontend",
      parameters: {
        type: "object",
        properties: { path: { type: "string" } },
        required: ["path"],
        additionalProperties: false,
      },
    },
  };
  const event: ExecServerEvent = {
    kind: "exec_read",
    execMsgId: "msg-1",
    execId: "exec-1",
    path: "/tmp/foo",
  };
  // Two tools match the shape -> ambiguous -> fail closed (null)
  const bridged = bridgeCursorBuiltinTool(event, defs([read1, read2]));
  assert.equal(bridged, null);
});

test("name-exact wins over shape-fallback when both exist", () => {
  const exactRead: OpenAITool = {
    type: "function",
    function: {
      name: "read_file",
      parameters: {
        type: "object",
        properties: { path: { type: "string" } },
        required: ["path"],
        additionalProperties: false,
      },
    },
  };
  const genericRead: OpenAITool = {
    type: "function",
    function: {
      name: "custom_reader",
      parameters: {
        type: "object",
        properties: { path: { type: "string" } },
        required: ["path"],
        additionalProperties: false,
      },
    },
  };
  const event: ExecServerEvent = {
    kind: "exec_read",
    execMsgId: "msg-1",
    execId: "exec-1",
    path: "/tmp/foo",
  };
  // exactRead is in READ_TOOL_NAMES, so it must win over genericRead
  const bridged = bridgeCursorBuiltinTool(event, defs([exactRead, genericRead]));
  assert.ok(bridged);
  assert.equal(bridged.toolName, "read_file");
});

test("expanded allowlist aliases match directly: codebase_search, run_command, view, str_replace", () => {
  const codebaseSearch: OpenAITool = {
    type: "function",
    function: {
      name: "codebase_search",
      parameters: {
        type: "object",
        properties: { query: { type: "string" } },
        required: ["query"],
        additionalProperties: false,
      },
    },
  };
  const grepEvent: ExecServerEvent = {
    kind: "exec_grep",
    execMsgId: "m",
    execId: "e",
    pattern: "test",
    path: "",
    glob: "",
    outputMode: "content",
  };
  assert.equal(
    bridgeCursorBuiltinTool(grepEvent, defs([codebaseSearch]))?.toolName,
    "codebase_search"
  );

  const runCommand: OpenAITool = {
    type: "function",
    function: {
      name: "run_command",
      parameters: {
        type: "object",
        properties: { command: { type: "string" } },
        required: ["command"],
        additionalProperties: false,
      },
    },
  };
  const shellEvent: ExecServerEvent = {
    kind: "exec_shell",
    execMsgId: "m",
    execId: "e",
    command: "ls -la",
    workingDir: "",
    timeout: 0,
    isBackground: false,
    hardTimeout: 0,
  };
  assert.equal(bridgeCursorBuiltinTool(shellEvent, defs([runCommand]))?.toolName, "run_command");

  const viewTool: OpenAITool = {
    type: "function",
    function: {
      name: "view",
      parameters: {
        type: "object",
        properties: { filePath: { type: "string" } },
        required: ["filePath"],
        additionalProperties: false,
      },
    },
  };
  const readEvent: ExecServerEvent = {
    kind: "exec_read",
    execMsgId: "m",
    execId: "e",
    path: "/a.txt",
  };
  assert.equal(bridgeCursorBuiltinTool(readEvent, defs([viewTool]))?.toolName, "view");

  const patchTool: OpenAITool = {
    type: "function",
    function: {
      name: "apply_patch",
      parameters: {
        type: "object",
        properties: { path: { type: "string" }, content: { type: "string" } },
        required: ["path", "content"],
        additionalProperties: false,
      },
    },
  };
  const writeEvent: ExecServerEvent = {
    kind: "exec_write",
    execMsgId: "m",
    execId: "e",
    path: "/b.txt",
    fileText: "data",
    hasFileBytes: false,
    encodingHint: "utf-8",
  };
  assert.equal(bridgeCursorBuiltinTool(writeEvent, defs([patchTool]))?.toolName, "apply_patch");
});

test("generic client tool names are not Cursor bridge targets", () => {
  const shellTool = (name: string): OpenAITool => ({
    type: "function",
    function: {
      name,
      parameters: {
        type: "object",
        properties: { command: { type: "string" } },
        required: ["command"],
        additionalProperties: false,
      },
    },
  });
  const writeTool = (name: string): OpenAITool => ({
    type: "function",
    function: {
      name,
      parameters: {
        type: "object",
        properties: {
          path: { type: "string" },
          content: { type: "string" },
        },
        required: ["path", "content"],
        additionalProperties: false,
      },
    },
  });
  const fetchTool = (name: string): OpenAITool => ({
    type: "function",
    function: {
      name,
      parameters: {
        type: "object",
        properties: { url: { type: "string" } },
        required: ["url"],
        additionalProperties: false,
      },
    },
  });
  const shellEvent: ExecServerEvent = {
    kind: "exec_shell",
    execMsgId: "m",
    execId: "e",
    command: "ls -la",
    workingDir: "",
    timeout: 0,
    isBackground: false,
    hardTimeout: 0,
  };
  const writeEvent: ExecServerEvent = {
    kind: "exec_write",
    execMsgId: "m",
    execId: "e",
    path: "/b.txt",
    fileText: "data",
    hasFileBytes: false,
    encodingHint: "utf-8",
  };
  const fetchEvent: ExecServerEvent = {
    kind: "exec_fetch",
    execMsgId: "m",
    execId: "e",
    url: "https://example.com",
  };

  // These short names belong to other clients. A compatible schema must not
  // pull an ordinary tool call into the Cursor bridge.
  for (const name of ["exec", "run", "command"]) {
    assert.equal(bridgeCursorBuiltinTool(shellEvent, defs([shellTool(name)])), null, name);
  }
  for (const name of ["update", "edit"]) {
    assert.equal(bridgeCursorBuiltinTool(writeEvent, defs([writeTool(name)])), null, name);
  }
  assert.equal(bridgeCursorBuiltinTool(fetchEvent, defs([fetchTool("fetch")])), null, "fetch");

  assert.equal(
    bridgeCursorBuiltinTool(shellEvent, defs([shellTool("exec"), shellTool("run_in_container")]))
      ?.toolName,
    "run_in_container"
  );

  assert.equal(
    bridgeCursorBuiltinTool(shellEvent, defs([shellTool("run_terminal_cmd")]))?.toolName,
    "run_terminal_cmd"
  );
  assert.equal(
    bridgeCursorBuiltinTool(shellEvent, defs([shellTool("run_command")]))?.toolName,
    "run_command"
  );
  assert.equal(
    bridgeCursorBuiltinTool(writeEvent, defs([writeTool("edit_file")]))?.toolName,
    "edit_file"
  );
  assert.equal(
    bridgeCursorBuiltinTool(writeEvent, defs([writeTool("str_replace")]))?.toolName,
    "str_replace"
  );
  assert.equal(
    bridgeCursorBuiltinTool(fetchEvent, defs([fetchTool("web_fetch")]))?.toolName,
    "web_fetch"
  );
  assert.equal(
    bridgeCursorBuiltinTool(fetchEvent, defs([fetchTool("webfetch")]))?.toolName,
    "webfetch"
  );
});
