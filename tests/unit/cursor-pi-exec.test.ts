import assert from "node:assert/strict";
import test from "node:test";

import {
  decodeExecServerEvent,
  openAIToolsToMcpDefs,
} from "../../open-sse/utils/cursorAgentProtobuf.ts";
import {
  decodeFields,
  encodeMessage,
  encodeString,
  encodeUInt32Field,
} from "../../open-sse/utils/cursorAgentProtobuf/wire.ts";
import { newStreamCtx, processFrame } from "../../open-sse/executors/cursor.ts";
import { CursorSessionManager } from "../../open-sse/services/cursorSessionManager.ts";

const sources = [
  { field: 45, kind: "exec_pi_read", args: [encodeString(1, "/tmp/fixture.txt")] },
  { field: 46, kind: "exec_pi_bash", args: [encodeString(1, "pwd")] },
  {
    field: 47,
    kind: "exec_pi_edit",
    args: [
      encodeString(1, "/tmp/fixture.txt"),
      encodeMessage(2, [encodeString(1, "old"), encodeString(2, "new")]),
    ],
  },
  {
    field: 48,
    kind: "exec_pi_write",
    args: [encodeString(1, "/tmp/new.txt"), encodeString(2, "hello")],
  },
  {
    field: 49,
    kind: "exec_pi_grep",
    args: [encodeString(1, "marker"), encodeString(2, "/tmp")],
  },
  {
    field: 50,
    kind: "exec_pi_find",
    args: [encodeString(1, "*.ts"), encodeString(2, "/tmp")],
  },
  { field: 51, kind: "exec_pi_ls", args: [encodeString(1, "/tmp")] },
] as const;

function serverMessage(field: number, args: readonly Buffer[], id = 10): Buffer {
  return encodeMessage(2, [
    encodeUInt32Field(1, id),
    encodeString(15, `exec-${id}`),
    encodeMessage(field, [...args]),
  ]);
}

test("PI exec variants use Cursor CLI fields 45-51, including the edit replacements", () => {
  for (const source of sources) {
    const event = decodeExecServerEvent(serverMessage(source.field, source.args));
    assert.ok(event, `server field ${source.field}`);
    assert.equal(event.kind, source.kind);
    assert.equal(event.execMsgId, 10);
    assert.equal(event.execId, "exec-10");
    if (source.kind === "exec_pi_edit") {
      assert.deepEqual((event as { edits?: unknown }).edits, [{ oldText: "old", newText: "new" }]);
    }
  }
});

test("PI execs bridge to client tools and answer on result fields 46-52", () => {
  const defs = openAIToolsToMcpDefs([
    ...[
      ["read", { filePath: { type: "string" } }, ["filePath"]],
      ["bash", { command: { type: "string" } }, ["command"]],
      [
        "edit",
        {
          filePath: { type: "string" },
          oldString: { type: "string" },
          newString: { type: "string" },
        },
        ["filePath", "oldString", "newString"],
      ],
      [
        "write",
        { filePath: { type: "string" }, content: { type: "string" } },
        ["filePath", "content"],
      ],
      ["grep", { pattern: { type: "string" }, path: { type: "string" } }, ["pattern"]],
      ["glob", { pattern: { type: "string" }, path: { type: "string" } }, ["pattern"]],
    ].map(([name, properties, required]) => ({
      type: "function" as const,
      function: {
        name: name as string,
        parameters: {
          type: "object",
          properties: properties as Record<string, unknown>,
          required: required as string[],
        },
      },
    })),
  ]);
  const ctx = newStreamCtx("cursor/grok-4.7", () => {});
  const acked = new Set<string>();
  for (const [index, source] of sources.entries()) {
    processFrame(serverMessage(source.field, source.args, index + 1), ctx, acked, {
      mcpTools: defs,
    });
  }
  assert.equal(ctx.requiresColdResume, false);
  assert.deepEqual(
    ctx.toolCalls.map((call) => call.name),
    ["read", "bash", "edit", "write", "grep", "glob", "glob"]
  );

  const written: Buffer[] = [];
  const req = {
    write: (data: Buffer) => written.push(data),
    close: () => {},
  } as unknown as import("node:http2").ClientHttp2Stream;
  const client = { close: () => {} } as unknown as import("node:http2").ClientHttp2Session;
  const manager = new CursorSessionManager();
  const session = manager.open("pi-execs", client, req, new Map());
  session.pendingBuiltinExecs = ctx.pendingBuiltinExecs;
  for (const call of ctx.toolCalls) {
    assert.equal(manager.sendToolResult(session, call.id, "done", false), true);
  }
  assert.equal(written.length, 7);
  for (const [index, data] of written.entries()) {
    const agent = decodeFields(data.subarray(5)).find((field) => field.fieldNumber === 2);
    assert.ok(agent);
    const exec = decodeFields(agent.bytes);
    const result = exec.find((field) => field.fieldNumber === sources[index].field + 1);
    assert.ok(result, `PI response field ${sources[index].field + 1}`);
    const success = decodeFields(result.bytes).find((field) => field.fieldNumber === 1);
    assert.ok(success, `PI success ${sources[index].kind}`);
    assert.equal(
      decodeFields(success.bytes)
        .find((field) => field.fieldNumber === 1)
        ?.bytes.toString(),
      "done"
    );
  }
  manager.close(session);
});

test("PI grep flags and multi-edit stay unavailable unless client tool can preserve semantics", () => {
  const ctx = newStreamCtx("cursor/grok-4.7", () => {});
  const defs = openAIToolsToMcpDefs([
    {
      type: "function",
      function: {
        name: "grep",
        parameters: {
          type: "object",
          properties: { pattern: { type: "string" } },
          required: ["pattern"],
        },
      },
    },
    {
      type: "function",
      function: {
        name: "edit",
        parameters: {
          type: "object",
          properties: {
            filePath: { type: "string" },
            oldString: { type: "string" },
            newString: { type: "string" },
          },
          required: ["filePath", "oldString", "newString"],
        },
      },
    },
  ]);
  const written: Buffer[] = [];
  const req = {
    write: (data: Buffer) => written.push(data),
  } as unknown as import("node:http2").ClientHttp2Stream;
  processFrame(
    serverMessage(49, [encodeString(1, "marker"), encodeUInt32Field(4, 1)], 1),
    ctx,
    new Set(),
    { mcpTools: defs, h2Req: req }
  );
  processFrame(
    serverMessage(
      47,
      [
        encodeString(1, "/tmp/f"),
        encodeMessage(2, [encodeString(1, "a"), encodeString(2, "b")]),
        encodeMessage(2, [encodeString(1, "c"), encodeString(2, "d")]),
      ],
      2
    ),
    ctx,
    new Set(),
    { mcpTools: defs, h2Req: req }
  );
  assert.equal(ctx.toolCalls.length, 0);
  assert.equal(written.length, 2, "unbridgeable execs must get typed errors instead of hanging");
  for (const [index, resultField] of [50, 48].entries()) {
    const agent = decodeFields(written[index].subarray(5)).find((part) => part.fieldNumber === 2);
    assert.ok(agent);
    const result = decodeFields(agent.bytes).find((part) => part.fieldNumber === resultField);
    assert.ok(result, `PI result field ${resultField}`);
    const error = decodeFields(result.bytes).find((part) => part.fieldNumber === 2);
    assert.ok(error, "typed PI error, not a success with fabricated output");
    assert.ok(decodeFields(error.bytes).find((part) => part.fieldNumber === 1)?.bytes.length);
  }
});

test("PI read range selects a compatible later alias without dropping offset or limit", () => {
  const ctx = newStreamCtx("cursor/grok-4.7", () => {});
  const defs = openAIToolsToMcpDefs([
    {
      type: "function",
      function: {
        name: "read",
        parameters: {
          type: "object",
          properties: { filePath: { type: "string" } },
          required: ["filePath"],
        },
      },
    },
    {
      type: "function",
      function: {
        name: "read_file",
        parameters: {
          type: "object",
          properties: {
            path: { type: "string" },
            offset: { type: "integer" },
            limit: { type: "integer" },
          },
          required: ["path"],
        },
      },
    },
  ]);
  processFrame(
    serverMessage(45, [
      encodeString(1, "/tmp/fixture.txt"),
      encodeUInt32Field(2, 4),
      encodeUInt32Field(3, 2),
    ]),
    ctx,
    new Set(),
    { mcpTools: defs }
  );
  assert.equal(ctx.toolCalls[0]?.name, "read_file");
  assert.deepEqual(JSON.parse(ctx.toolCalls[0].argumentsJson), {
    path: "/tmp/fixture.txt",
    offset: 4,
    limit: 2,
  });
});
