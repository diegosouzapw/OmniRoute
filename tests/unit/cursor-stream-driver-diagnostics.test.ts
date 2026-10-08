import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import test from "node:test";

import { driveCursorH2 } from "../../open-sse/executors/cursor/streamDriver.ts";
import { newStreamCtx, processFrame } from "../../open-sse/executors/cursor.ts";
import { encodeMessage } from "../../open-sse/utils/cursorAgentProtobuf/wire.ts";

test("a malformed complete frame fails with a diagnostic instead of timing out", async () => {
  const req = Object.assign(new EventEmitter(), {
    close: () => {},
    resume: () => {},
    pause: () => {},
  }) as unknown as import("node:http2").ClientHttp2Stream;
  const client = { close: () => {} } as unknown as import("node:http2").ClientHttp2Session;
  const frame = Buffer.alloc(6);
  frame.writeUInt32BE(1, 1);
  frame[5] = 0xff;
  const controller = new AbortController();
  const task = driveCursorH2(
    { req, client, initialBytes: frame },
    { endReason: null, leftoverBytes: Buffer.alloc(0), unknownExecField: null },
    {
      signal: controller.signal,
      debugEnabled: false,
      debugLog: () => {},
      onFrame: () => {
        throw new Error("synthetic parsing failure");
      },
    }
  );
  const result = await Promise.race([
    task.then(
      () => "completed",
      (error: Error) => error.message
    ),
    new Promise<string>((resolve) => setTimeout(() => resolve("timed out"), 150)),
  ]);
  if (result === "timed out") controller.abort();
  assert.match(result, /frame.*decod/i);
  assert.doesNotMatch(result, /synthetic parsing failure/);
});

test("malformed interaction updates cannot disappear into a debug-only log", () => {
  const invalid = encodeMessage(1, [Buffer.from([0x72, 0x05, 0xff])]);
  assert.throws(() =>
    processFrame(
      invalid,
      newStreamCtx("grok-4.7", () => {}),
      new Set()
    )
  );
});

test("unknown interaction fields are recorded without logging their payload", () => {
  const ctx = newStreamCtx("grok-4.7", () => {});
  processFrame(encodeMessage(1, [encodeMessage(63, [])]), ctx, new Set());
  assert.equal(ctx.lastUnknownUpdateField, 63);
});
