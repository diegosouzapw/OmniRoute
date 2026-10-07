import assert from "node:assert/strict";
import test from "node:test";

import { newStreamCtx, processFrame } from "../../open-sse/executors/cursor.ts";
import { CursorSessionManager } from "../../open-sse/services/cursorSessionManager.ts";
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

const command = "gcc --version";
const payload = encodeMessage(2, [
  encodeUInt32Field(1, 8),
  encodeString(15, "mini-swe-8"),
  encodeMessage(52, [encodeString(1, command), encodeString(2, "/tmp")]),
]);

function shellResultField(frame: Buffer) {
  const outer = decodeFields(frame.subarray(5)).find((field) => field.fieldNumber === 2);
  assert.ok(outer, "AgentClientMessage.exec_client_message");
  const result = decodeFields(outer.bytes).find((field) => field.fieldNumber === 55);
  assert.ok(result, "MiniSweAgentBashResult uses ExecClientMessage field 55");
  return decodeFields(result.bytes);
}

test("mini-SWE bash field 52 bridges to declared bash and returns ShellResult on field 55", () => {
  const event = decodeExecServerEvent(payload);
  assert.equal(event?.kind, "exec_mini_swe_bash");
  assert.equal((event as { command?: string }).command, command);

  const ctx = newStreamCtx("cursor/grok-4.7", () => {});
  const tools = openAIToolsToMcpDefs([
    {
      type: "function",
      function: {
        name: "bash",
        parameters: {
          type: "object",
          properties: { command: { type: "string" } },
          required: ["command"],
        },
      },
    },
  ]);
  processFrame(payload, ctx, new Set(), { mcpTools: tools });
  assert.equal(ctx.toolCalls[0]?.name, "bash");
  assert.equal(ctx.requiresColdResume, false);

  const written: Buffer[] = [];
  const req = {
    write: (data: Buffer) => written.push(data),
    close: () => {},
  } as unknown as import("node:http2").ClientHttp2Stream;
  const client = { close: () => {} } as unknown as import("node:http2").ClientHttp2Session;
  const manager = new CursorSessionManager();
  const session = manager.open("mini-swe", client, req, new Map());
  session.pendingBuiltinExecs = ctx.pendingBuiltinExecs;
  assert.equal(manager.sendToolResult(session, ctx.toolCalls[0].id, "gcc (GCC) 13.3", false), true);
  const success = shellResultField(written[0]).find((field) => field.fieldNumber === 1);
  assert.ok(success);
  assert.equal(
    decodeFields(success.bytes)
      .find((field) => field.fieldNumber === 5)
      ?.bytes.toString(),
    "gcc (GCC) 13.3"
  );
  manager.close(session);
});

test("mini-SWE bash without a declared client shell receives the field-55 rejection", () => {
  const written: Buffer[] = [];
  const req = {
    write: (data: Buffer) => written.push(data),
  } as unknown as import("node:http2").ClientHttp2Stream;
  const ctx = newStreamCtx("cursor/grok-4.7", () => {});
  processFrame(payload, ctx, new Set(), { h2Req: req });
  assert.equal(ctx.toolCalls.length, 0);
  assert.equal(written.length, 1);
  assert.equal(shellResultField(written[0]).find((field) => field.fieldNumber === 4)?.wireType, 2);
});
