/**
 * Connect-RPC ends a server stream with an end-of-stream frame (flag 0x02)
 * whose payload is JSON — `{}` on success, `{"error":{...}}` on failure — not
 * protobuf. Treating it as a malformed protobuf frame failed every such turn
 * with "cursor-agent frame decode failed (flag=2, size=2)".
 * Run: node --import tsx/esm --test tests/unit/cursor-stream-driver-end-stream.test.ts
 */

import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import test from "node:test";

import { driveCursorH2 } from "../../open-sse/executors/cursor/streamDriver.ts";

function frame(flag: number, payload: Buffer): Buffer {
  const header = Buffer.alloc(5);
  header[0] = flag;
  header.writeUInt32BE(payload.length, 1);
  return Buffer.concat([header, payload]);
}

function fakeH2() {
  const req = Object.assign(new EventEmitter(), {
    close: () => {},
    resume: () => {},
    pause: () => {},
  }) as unknown as import("node:http2").ClientHttp2Stream;
  const client = { close: () => {} } as unknown as import("node:http2").ClientHttp2Session;
  return { req, client };
}

type Ctx = {
  model: string;
  emittedRoleChunk: boolean;
  endReason: "turn_ended" | "kv_after_text" | "tool_calls" | "server_end" | null;
  leftoverBytes: Buffer;
  unknownExecField: number | null;
};

function drive(initialBytes: Buffer, onFrame: (payload: Buffer) => void = () => {}) {
  const { req, client } = fakeH2();
  const ctx: Ctx = {
    model: "grok-4.6",
    emittedRoleChunk: false,
    endReason: null,
    leftoverBytes: Buffer.alloc(0),
    unknownExecField: null,
  };
  const task = driveCursorH2({ req, client, initialBytes }, ctx as never, {
    debugEnabled: false,
    debugLog: () => {},
    onFrame: (payload) => onFrame(payload),
  });
  // The server closes the stream right after its end-of-stream frame.
  setImmediate(() => req.emit("end"));
  return { task, ctx };
}

test("a successful end-of-stream frame ends the turn instead of failing it", async () => {
  const seen: Buffer[] = [];
  const { task, ctx } = drive(frame(0x02, Buffer.from("{}")), (p) => seen.push(p));
  await task;
  assert.equal(ctx.endReason, "server_end");
  assert.equal(seen.length, 0, "the JSON trailer must not reach the protobuf frame handler");
});

test("frames before the end-of-stream frame are still handled", async () => {
  const seen: Buffer[] = [];
  const data = Buffer.from([0x0a, 0x00]);
  const { task } = drive(Buffer.concat([frame(0x00, data), frame(0x02, Buffer.from("{}"))]), (p) =>
    seen.push(p)
  );
  await task;
  assert.deepEqual(seen, [data]);
});

test("an end-of-stream error is reported with its Connect code", async () => {
  const trailer = JSON.stringify({ error: { code: "resource_exhausted", message: "slow down" } });
  const { task } = drive(frame(0x02, Buffer.from(trailer)));
  await assert.rejects(task, /resource_exhausted/);
});
