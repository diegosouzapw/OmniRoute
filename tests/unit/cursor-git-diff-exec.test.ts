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
import { encodeGitDiffResult } from "../../open-sse/utils/cursorAgentProtobuf/gitDiff.ts";

const request = encodeMessage(2, [
  encodeUInt32Field(1, 44),
  encodeString(15, "exec-diff-44"),
  encodeMessage(44, [encodeString(1, "/tmp/project"), encodeUInt32Field(8, 3)]),
]);

test("default git_diff_request delegates a read-only diff to a declared client bash", () => {
  const ctx = newStreamCtx("cursor/grok-4.7", () => {});
  const tools = openAIToolsToMcpDefs([
    {
      type: "function",
      function: {
        name: "bash",
        parameters: {
          type: "object",
          properties: { command: { type: "string" }, workdir: { type: "string" } },
          required: ["command"],
        },
      },
    },
  ]);
  processFrame(request, ctx, new Set(), { mcpTools: tools });
  assert.equal(ctx.toolCalls.length, 1);
  assert.equal(ctx.toolCalls[0].name, "bash");
  assert.deepEqual(JSON.parse(ctx.toolCalls[0].argumentsJson), {
    command: "git diff HEAD --",
    workdir: "/tmp/project",
  });
  assert.equal(ctx.requiresColdResume, false);

  const frames: Buffer[] = [];
  const req = {
    write: (data: Buffer) => frames.push(data),
    close: () => {},
  } as unknown as import("node:http2").ClientHttp2Stream;
  const client = { close: () => {} } as unknown as import("node:http2").ClientHttp2Session;
  const manager = new CursorSessionManager();
  const session = manager.open("git-diff", client, req, new Map());
  session.pendingBuiltinExecs = ctx.pendingBuiltinExecs;
  const patch =
    "diff --git a/foo.c b/foo.c\nindex 0123456..abcdef0 100644\n--- a/foo.c\n+++ b/foo.c\n@@ -1 +1 @@\n-old\n+new\n";
  assert.equal(manager.sendToolResult(session, ctx.toolCalls[0].id, patch, false), true);
  assert.equal(frames.length, 1);

  const agent = decodeFields(frames[0].subarray(5)).find((field) => field.fieldNumber === 2);
  assert.ok(agent);
  const result = decodeFields(agent.bytes).find((field) => field.fieldNumber === 44);
  assert.ok(result, "ExecClientMessage.git_diff_response");
  const diff = decodeFields(result.bytes).find((field) => field.fieldNumber === 1);
  assert.ok(diff, "GetDiffResponse.diff");
  const fields = decodeFields(diff.bytes);
  assert.equal(fields.find((field) => field.fieldNumber === 2)?.varint, 1n, "DIFF_TO_HEAD");
  const file = decodeFields(fields.find((field) => field.fieldNumber === 1)!.bytes);
  assert.equal(file.find((field) => field.fieldNumber === 1)?.bytes.toString(), "foo.c");
  assert.equal(file.find((field) => field.fieldNumber === 2)?.bytes.toString(), "foo.c");
  assert.equal(file.find((field) => field.fieldNumber === 4)?.varint, 1n);
  assert.equal(file.find((field) => field.fieldNumber === 5)?.varint, 1n);
  const chunk = decodeFields(file.find((field) => field.fieldNumber === 3)!.bytes);
  assert.ok(
    chunk
      .find((field) => field.fieldNumber === 1)
      ?.bytes.toString()
      .includes("+new")
  );
  manager.close(session);
});

test("clean git diff stays empty, while a failed command reports a control error", () => {
  const clean = encodeGitDiffResult(12, "clean-diff", "(no output)");
  const exec = decodeFields(clean.subarray(5)).find((field) => field.fieldNumber === 2);
  assert.ok(exec);
  const result = decodeFields(exec.bytes).find((field) => field.fieldNumber === 44);
  assert.ok(result);
  const response = decodeFields(result.bytes);
  const diff = decodeFields(response.find((field) => field.fieldNumber === 1)!.bytes);
  assert.equal(
    diff.some((field) => field.fieldNumber === 1),
    false
  );
  assert.equal(response.find((field) => field.fieldNumber === 5)?.varint, 0n);

  const invalid = encodeGitDiffResult(13, "failed-diff", "fatal: not a git repository");
  const control = decodeFields(invalid.subarray(5)).find((field) => field.fieldNumber === 5);
  assert.ok(control, "a failed git command must not masquerade as an empty diff");
  const thrown = decodeFields(control.bytes).find((field) => field.fieldNumber === 2);
  assert.ok(thrown);
  assert.equal(decodeFields(thrown.bytes).find((field) => field.fieldNumber === 1)?.varint, 13n);
});

test("a client bash error cannot be reported to Cursor as a clean git diff", () => {
  const ctx = newStreamCtx("cursor/grok-4.7", () => {});
  const tools = openAIToolsToMcpDefs([
    {
      type: "function",
      function: {
        name: "bash",
        parameters: {
          type: "object",
          properties: { command: { type: "string" }, workdir: { type: "string" } },
          required: ["command"],
        },
      },
    },
  ]);
  processFrame(request, ctx, new Set(), { mcpTools: tools });
  const frames: Buffer[] = [];
  const req = {
    write: (data: Buffer) => frames.push(data),
    close: () => {},
  } as unknown as import("node:http2").ClientHttp2Stream;
  const client = { close: () => {} } as unknown as import("node:http2").ClientHttp2Session;
  const manager = new CursorSessionManager();
  const session = manager.open("failed-git-diff", client, req, new Map());
  session.pendingBuiltinExecs = ctx.pendingBuiltinExecs;
  assert.equal(manager.sendToolResult(session, ctx.toolCalls[0].id, "(no output)", true), true);
  assert.ok(
    decodeFields(frames[0].subarray(5)).some((field) => field.fieldNumber === 5),
    "client errors must produce ExecClientControlMessage.throw"
  );
  manager.close(session);
});

test("binary and mode-only changes cannot be encoded as empty textual patches", () => {
  for (const patch of [
    "diff --git a/icon.png b/icon.png\nindex aabbccc..ddeeff0 100644\nBinary files a/icon.png and b/icon.png differ\n",
    "diff --git a/script.sh b/script.sh\nold mode 100644\nnew mode 100755\n",
  ]) {
    const result = encodeGitDiffResult(14, "unsupported-patch", patch);
    assert.ok(
      decodeFields(result.subarray(5)).some((field) => field.fieldNumber === 5),
      "unsupported changes must produce ExecClientControlMessage.throw"
    );
  }
});
