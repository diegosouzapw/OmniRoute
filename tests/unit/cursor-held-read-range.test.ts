/**
 * A held Cursor read that carried a line range is forwarded to the client with
 * that range, so the client returns only those lines. The ReadSuccess sent back
 * must say the range is already applied (ReadSuccess.range_applied = 8);
 * otherwise Cursor treats the slice as the whole file, applies the offset again
 * and the model gets nothing back, so it keeps reading.
 * Run: node --import tsx/esm --test tests/unit/cursor-held-read-range.test.ts
 */
import assert from "node:assert/strict";
import test from "node:test";

import { newStreamCtx, processFrame } from "../../open-sse/executors/cursor.ts";
import { CursorSessionManager } from "../../open-sse/services/cursorSessionManager.ts";
import { openAIToolsToMcpDefs } from "../../open-sse/utils/cursorAgentProtobuf.ts";
import {
  decodeFields,
  encodeMessage,
  encodeString,
  encodeUInt32Field,
} from "../../open-sse/utils/cursorAgentProtobuf/wire.ts";

const readTool = openAIToolsToMcpDefs([
  {
    type: "function",
    function: {
      name: "read",
      parameters: {
        type: "object",
        properties: {
          filePath: { type: "string" },
          offset: { type: "number" },
          limit: { type: "number" },
        },
        required: ["filePath"],
      },
    },
  },
]);

// AgentServerMessage.exec_server_message(2) { id:1, exec_id:15, read_args:7 }
function readRequest(range?: { offset: number; limit: number }) {
  const args = [encodeString(1, "/repo/huge.py")];
  if (range) args.push(encodeUInt32Field(4, range.offset), encodeUInt32Field(5, range.limit));
  return encodeMessage(2, [
    encodeUInt32Field(1, 3),
    encodeString(15, "exec-read-3"),
    encodeMessage(7, args),
  ]);
}

function readSuccessFields(range?: { offset: number; limit: number }) {
  const ctx = newStreamCtx("cursor-grok-4.6-medium", () => {});
  processFrame(readRequest(range), ctx, new Set(), { mcpTools: readTool });
  assert.equal(ctx.toolCalls.length, 1);

  const frames: Buffer[] = [];
  const req = {
    write: (data: Buffer) => frames.push(data),
    close: () => {},
  } as unknown as import("node:http2").ClientHttp2Stream;
  const client = { close: () => {} } as unknown as import("node:http2").ClientHttp2Session;
  const manager = new CursorSessionManager();
  const session = manager.open("held-read", client, req, new Map());
  session.pendingBuiltinExecs = ctx.pendingBuiltinExecs;
  assert.equal(
    manager.sendToolResult(session, ctx.toolCalls[0].id, "2001: a\n2002: b", false),
    true
  );
  assert.equal(frames.length, 1);
  const acm = decodeFields(frames[0].subarray(5)).find((f) => f.fieldNumber === 2)!;
  const readResult = decodeFields(acm.bytes).find((f) => f.fieldNumber === 7)!;
  const success = decodeFields(readResult.bytes).find((f) => f.fieldNumber === 1)!;
  return { args: JSON.parse(ctx.toolCalls[0].argumentsJson), fields: decodeFields(success.bytes) };
}

test("a ranged held read tells Cursor the client already applied the range", () => {
  const { args, fields } = readSuccessFields({ offset: 2001, limit: 2000 });
  assert.deepEqual(args, { filePath: "/repo/huge.py", offset: 2001, limit: 2000 });
  assert.equal(fields.find((f) => f.fieldNumber === 8)?.varint, 1n, "range_applied");
  // Cursor rejects an offset past total_lines ("Offset 2001 is beyond file
  // length (2 lines)"), so the count must reach the end of the slice.
  assert.equal(fields.find((f) => f.fieldNumber === 3)?.varint, 2002n, "total_lines");
  assert.equal(fields.find((f) => f.fieldNumber === 2)?.bytes.toString(), "2001: a\n2002: b");
});

test("an unranged held read does not claim a range", () => {
  const { args, fields } = readSuccessFields();
  assert.deepEqual(args, { filePath: "/repo/huge.py" });
  assert.equal(
    fields.find((f) => f.fieldNumber === 8),
    undefined
  );
});
