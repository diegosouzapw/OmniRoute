import assert from "node:assert/strict";
import test from "node:test";

import { newStreamCtx, processFrame } from "../../open-sse/executors/cursor.ts";
import { decodeExecServerEvent } from "../../open-sse/utils/cursorAgentProtobuf.ts";
import {
  decodeFields,
  encodeMessage,
  encodeString,
  encodeUInt32Field,
} from "../../open-sse/utils/cursorAgentProtobuf/wire.ts";

const variants = [
  {
    field: 18,
    kind: "exec_read_mcp_resource",
    args: [encodeString(1, "omniroute"), encodeString(2, "file:///missing")],
  },
  { field: 21, kind: "exec_record_screen", args: [encodeUInt32Field(1, 1)] },
  { field: 22, kind: "exec_computer_use", args: [encodeString(1, "tool-22")] },
  { field: 28, kind: "exec_subagent", args: [encodeString(6, "prior-agent")] },
  { field: 29, kind: "exec_redacted_read", args: [encodeString(1, "/private/file")] },
  { field: 30, kind: "exec_force_background_shell", args: [encodeString(1, "call-shell")] },
  { field: 31, kind: "exec_force_background_subagent", args: [encodeString(1, "call-agent")] },
  { field: 37, kind: "exec_subagent_await", args: [encodeString(1, "agent-37")] },
  { field: 38, kind: "exec_smart_mode_classifier", args: [] },
  { field: 40, kind: "exec_canvas_diagnostics", args: [encodeString(1, "/tmp/canvas")] },
  {
    field: 41,
    kind: "exec_shell_allowlist_precheck",
    args: [encodeString(1, "rm -rf /tmp/example")],
  },
  {
    field: 42,
    kind: "exec_mcp_allowlist_precheck",
    args: [encodeString(1, "external"), encodeString(2, "run")],
  },
  {
    field: 43,
    kind: "exec_web_fetch_allowlist_precheck",
    args: [encodeString(1, "https://example.com")],
  },
  { field: 53, kind: "exec_conversation_search", args: [encodeString(1, "search term")] },
  { field: 54, kind: "exec_agent_store_conflict", args: [] },
  { field: 56, kind: "exec_adopt", args: [encodeString(1, "source-56")] },
] as const;

function serverEvent(field: number, args: readonly Buffer[], id: number): Buffer {
  return encodeMessage(2, [
    encodeUInt32Field(1, id),
    encodeString(15, `exec-${id}`),
    encodeMessage(field, [...args]),
  ]);
}

test("Cursor CLI auxiliary execs are recognized and answered without hanging", () => {
  const ctx = newStreamCtx("cursor/grok-4.7", () => {});
  const responses: Buffer[] = [];
  const h2Req = {
    write: (data: Buffer) => responses.push(data),
  } as unknown as import("node:http2").ClientHttp2Stream;
  const acked = new Set<string>();

  for (const [index, variant] of variants.entries()) {
    const payload = serverEvent(variant.field, variant.args, index + 1);
    assert.equal(decodeExecServerEvent(payload)?.kind, variant.kind);
    processFrame(payload, ctx, acked, { h2Req });
  }

  assert.equal(ctx.toolCalls.length, 0, "no auxiliary exec runs a tool in the proxy");
  assert.equal(
    ctx.unknownExecField,
    null,
    "known auxiliary execs must not start the unknown watchdog"
  );
  assert.equal(responses.length, variants.length);
  for (const [index, frame] of responses.entries()) {
    const envelope = decodeFields(frame.subarray(5)).find((f) => f.fieldNumber === 2);
    assert.ok(envelope, "AgentClientMessage.exec_client_message");
    const exec = decodeFields(envelope.bytes);
    assert.equal(exec.find((f) => f.fieldNumber === 1)?.varint, BigInt(index + 1));
    const result = exec.find((f) => f.fieldNumber === variants[index].field);
    assert.ok(result, `ExecClientMessage result field ${variants[index].field}`);
    const fields = decodeFields(result.bytes);
    if (variants[index].field === 37) {
      const notFound = fields.find((f) => f.fieldNumber === 3);
      assert.ok(notFound);
      assert.equal(
        decodeFields(notFound.bytes)
          .find((f) => f.fieldNumber === 1)
          ?.bytes.toString(),
        "agent-37"
      );
    }
    if (variants[index].field === 56) {
      assert.equal(fields.find((f) => f.fieldNumber === 1)?.bytes.toString(), "source-56");
    }
    if (variants[index].field === 30 || variants[index].field === 31) {
      assert.equal(fields.find((f) => f.fieldNumber === 1)?.varint, 2n, "not found");
    } else if (variants[index].field >= 41 && variants[index].field <= 43) {
      assert.equal(fields.find((f) => f.fieldNumber === 1)?.varint, 0n, "not fully allowlisted");
    } else {
      const errorField =
        variants[index].field === 29 || variants[index].field === 37
          ? 3
          : variants[index].field === 18 || variants[index].field === 21
            ? 4
            : variants[index].field === 56
              ? 5
              : 2;
      assert.ok(
        fields.some((f) => f.fieldNumber === errorField),
        `typed failure ${variants[index].kind}`
      );
    }
  }
});

test("execute_hook mirrors each hook variant with an empty response and no permission override", () => {
  for (const hookField of [1, 2, 3, 4, 5, 6, 7, 8, 9, 11]) {
    const payload = serverEvent(27, [encodeMessage(1, [encodeMessage(hookField, [])])], hookField);
    const event = decodeExecServerEvent(payload);
    assert.equal(event?.kind, "exec_execute_hook");
    if (event?.kind !== "exec_execute_hook") continue;
    assert.equal(event.hookField, hookField);
    const written: Buffer[] = [];
    const req = {
      write: (data: Buffer) => written.push(data),
    } as unknown as import("node:http2").ClientHttp2Stream;
    processFrame(
      payload,
      newStreamCtx("cursor/grok-4.7", () => {}),
      new Set(),
      { h2Req: req }
    );
    assert.equal(written.length, 1);
    const envelope = decodeFields(written[0].subarray(5)).find((field) => field.fieldNumber === 2);
    assert.ok(envelope);
    const result = decodeFields(envelope.bytes).find((field) => field.fieldNumber === 27);
    assert.ok(result);
    const response = decodeFields(result.bytes).find((field) => field.fieldNumber === 1);
    assert.ok(response);
    const echoed = decodeFields(response.bytes).find((field) => field.fieldNumber === hookField);
    assert.ok(echoed);
    assert.deepEqual(decodeFields(echoed.bytes), [], "no synthetic approval or hook output");
  }
});

test("unavailable git diff throws on ExecClientControlMessage instead of inventing an empty diff", () => {
  const payload = serverEvent(44, [encodeString(1, "/tmp/work"), encodeString(2, "HEAD")], 44);
  assert.equal(decodeExecServerEvent(payload)?.kind, "exec_git_diff");
  const written: Buffer[] = [];
  const req = {
    write: (data: Buffer) => written.push(data),
  } as unknown as import("node:http2").ClientHttp2Stream;
  const ctx = newStreamCtx("cursor/grok-4.7", () => {});
  processFrame(payload, ctx, new Set(), { h2Req: req });
  assert.equal(written.length, 1);
  const control = decodeFields(written[0].subarray(5)).find((field) => field.fieldNumber === 5);
  assert.ok(control, "AgentClientMessage.exec_client_control_message");
  const thrown = decodeFields(control.bytes).find((field) => field.fieldNumber === 2);
  assert.ok(thrown, "ExecClientControlMessage.throw");
  const fields = decodeFields(thrown.bytes);
  assert.equal(fields.find((field) => field.fieldNumber === 1)?.varint, 44n);
  assert.ok(fields.find((field) => field.fieldNumber === 2)?.bytes.length);
  assert.equal(ctx.unknownExecField, 44, "retain bounded watchdog if throw goes unanswered");
});

test("agent.v1 exec field inventory recognizes all 41 verified variants", () => {
  const known = [
    2, 3, 4, 5, 7, 8, 9, 10, 11, 14, 16, 17, 18, 20, 21, 22, 23, 27, 28, 29, 30, 31, 36, 37, 38, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 56,
  ];
  assert.equal(known.length, 41);
  for (const field of known) {
    const event = decodeExecServerEvent(serverEvent(field, [], field));
    assert.ok(event && event.kind !== "exec_unknown", `field ${field} must have a decoder`);
  }
});
