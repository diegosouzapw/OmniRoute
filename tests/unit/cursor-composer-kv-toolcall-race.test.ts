import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { PassThrough } from "node:stream";
import { gzipSync } from "node:zlib";

// Biting regression test for the tryScan settle race (#10215 follow-up):
// composer text → kv_server_message (kv_after_text) → exec_mcp ALL IN ONE
// h2 data buffer. tryScan used to settle on the FIRST endReason, splicing the
// exec_mcp frame off as "leftover" — client got finish_reason:"stop",
// content:null, zero tool_calls (live-reported composer failure 2026-09).
// The fix: kv_after_text is soft — keep scanning buffered bytes; a completing
// exec_mcp upgrades the turn to tool_calls.

const { CursorExecutor } = await import("../../open-sse/executors/cursor");

// ─── protobuf primitives ────────────────────────────────────────────────────
function v(n: number): Buffer {
  const out: number[] = [];
  while (n > 0x7f) {
    out.push((n & 0x7f) | 0x80);
    n >>>= 7;
  }
  out.push(n);
  return Buffer.from(out);
}
function tag(field: number, wireType: number): Buffer {
  return v((field << 3) | wireType);
}
function lenPrefixed(field: number, payload: Buffer): Buffer {
  return Buffer.concat([tag(field, 2), v(payload.length), payload]);
}
// 5-byte Connect-RPC frame header: flag byte (0x00 = uncompressed) + BE length
function frame(payload: Buffer): Buffer {
  const head = Buffer.alloc(5);
  head.writeUInt8(0, 0);
  head.writeUInt32BE(payload.length, 1);
  return Buffer.concat([head, payload]);
}

// ASM { interaction_update (1): { text_delta (1): { text (1): str } } }
function buildTextDelta(text: string): Buffer {
  return lenPrefixed(1, lenPrefixed(1, lenPrefixed(1, Buffer.from(text, "utf8"))));
}
// ASM { kv_server_message (4): { id (1): n, set_blob_args (3): {...} } }
function buildKvCheckpoint(kvId: number): Buffer {
  const setBlob = Buffer.concat([
    lenPrefixed(1, Buffer.from([1, 2, 3, 4])),
    lenPrefixed(2, Buffer.alloc(8)),
  ]);
  const ksm = Buffer.concat([Buffer.concat([tag(1, 0), v(kvId)]), lenPrefixed(3, setBlob)]);
  return lenPrefixed(4, ksm);
}
// ASM { exec_server_message (2): { id (1): n, mcp_args (11): { tool_name (5), args (2), tool_call_id (3) } } }
function buildExecMcp(toolName: string, toolCallId: string, path: string, execMsgId = 1): Buffer {
  const argEntry = lenPrefixed(
    2,
    Buffer.concat([lenPrefixed(1, Buffer.from("path")), lenPrefixed(2, Buffer.from(path))])
  );
  const mcpArgs = Buffer.concat([
    lenPrefixed(5, Buffer.from(toolName)),
    argEntry,
    lenPrefixed(3, Buffer.from(toolCallId)),
  ]);
  const esm = Buffer.concat([Buffer.concat([tag(1, 0), v(execMsgId)]), lenPrefixed(11, mcpArgs)]);
  return lenPrefixed(2, esm);
}

/** Minimal fake h2 stream pair — driveH2 only needs EventEmitter + noops. */
function fakeH2(initialBytes: Buffer) {
  const req = new EventEmitter() as EventEmitter & {
    close(): void;
    write(): boolean;
  };
  (req as unknown as { close(): void }).close = () => {};
  (req as unknown as { write(): boolean }).write = () => true;
  const client = new EventEmitter() as EventEmitter & { close(): void };
  (client as unknown as { close(): void }).close = () => {};
  return { req, client, initialBytes };
}

test("tryScan: kv_after_text must not settle away a same-buffer exec_mcp (composer)", async () => {
  const executor = new CursorExecutor("cursor");
  const driveH2 = (
    executor as unknown as {
      driveH2: (
        h2: ReturnType<typeof fakeH2>,
        ctx: { toolCalls: unknown[]; endReason: string | null; totalText: string },
        mcpTools: undefined,
        blobStore: undefined,
        clientPlatform: undefined,
        todoHistory: undefined,
        signal?: AbortSignal
      ) => Promise<void>;
    }
  ).driveH2;

  // The { newStreamCtx } import in the other test file gives a real ctx; here
  // rebuild via the exported factory to keep the same shape.
  const { newStreamCtx } = await import("../../open-sse/executors/cursor");
  const ctx = newStreamCtx("cursor/composer-2.5-fast", () => {});

  // ONE buffer: text | kv checkpoint | exec_mcp — the exact racy layout.
  const wire = Buffer.concat([
    frame(buildTextDelta("Reading package.json to find the package name.")),
    frame(buildKvCheckpoint(1)),
    frame(buildExecMcp("read_file", "call_race_1", "package.json")),
  ]);

  const h2 = fakeH2(wire);
  const result = await Promise.race([
    driveH2(h2, ctx, undefined, undefined, undefined, undefined),
    new Promise<never>((_, rej) =>
      setTimeout(() => rej(new Error("driveH2 did not settle (grace/safety timer leak?)")), 8000)
    ),
  ]);

  assert.equal(ctx.toolCalls.length, 1, "tool call after kv checkpoint must be surfaced");
  assert.equal(ctx.toolCalls[0] instanceof Object, true);
  assert.equal(ctx.endReason, "tool_calls", "turn must upgrade to tool_calls");
  assert.equal(result, undefined, "settles void like upstream onEnd");
});

test("tryScan: plain chat (kv checkpoint, clean buffer end) still settles on kv_after_text", async () => {
  const executor = new CursorExecutor("cursor");
  const { newStreamCtx } = await import("../../open-sse/executors/cursor");
  const ctx = newStreamCtx("cursor/composer-2.5-fast", () => {});
  const driveH2 = (
    executor as unknown as {
      driveH2: (
        h2: ReturnType<typeof fakeH2>,
        ctx: ReturnType<typeof newStreamCtx>,
        mcpTools: undefined,
        blobStore: undefined,
        clientPlatform: undefined,
        todoHistory: undefined,
        signal?: AbortSignal
      ) => Promise<void>;
    }
  ).driveH2;

  const wire = Buffer.concat([frame(buildTextDelta("PONG")), frame(buildKvCheckpoint(2))]);
  const h2 = fakeH2(wire);
  const result = await Promise.race([
    driveH2(h2, ctx, undefined, undefined, undefined, undefined),
    new Promise<never>((_, rej) =>
      setTimeout(() => rej(new Error("plain-chat turn did not settle")), 8000)
    ),
  ]);
  assert.equal(ctx.endReason, "kv_after_text");
  assert.equal(ctx.toolCalls.length, 0);
  assert.equal(result, undefined);
});

test("driveH2 buffers upstream frames while waiting for a client tool result", async () => {
  const { newStreamCtx } = await import("../../open-sse/executors/cursor");
  const req = new PassThrough();
  const client = new EventEmitter() as EventEmitter & { close(): void };
  client.close = () => {};
  const h2 = { req, client, initialBytes: Buffer.alloc(0) };
  const executor = new CursorExecutor("cursor");
  const driveH2 = (
    executor as unknown as {
      driveH2: (
        stream: typeof h2,
        ctx: ReturnType<typeof newStreamCtx>,
        tools: undefined,
        blobs: undefined,
        platform: undefined,
        todos: undefined
      ) => Promise<void>;
    }
  ).driveH2;

  const first = newStreamCtx("cursor/grok-4.7", () => {});
  const waiting = driveH2(h2, first, undefined, undefined, undefined, undefined);
  const nextFrame = frame(buildExecMcp("write_file", "call_2", "snake.c"));
  req.write(
    Buffer.concat([frame(buildExecMcp("read_file", "call_1", "snake.c")), nextFrame.subarray(0, 3)])
  );
  await waiting;
  assert.equal(first.endReason, "tool_calls");
  assert.equal(req.isPaused(), true, "do not drop server data while no data listener is attached");
  assert.deepEqual(first.leftoverBytes, nextFrame.subarray(0, 3), "preserve partial frame");

  req.write(nextFrame.subarray(3));
  const second = newStreamCtx("cursor/grok-4.7", () => {});
  h2.initialBytes = first.leftoverBytes;
  await driveH2(h2, second, undefined, undefined, undefined, undefined);
  assert.equal(second.toolCalls.length, 1, "buffered frame must be handled on resume");
  req.destroy();
});

test("coalesced compressed exec after a tool call is decoded before suspending", async () => {
  const { newStreamCtx } = await import("../../open-sse/executors/cursor");
  const executor = new CursorExecutor("cursor");
  const driveH2 = (
    executor as unknown as {
      driveH2: (
        h2: ReturnType<typeof fakeH2>,
        ctx: ReturnType<typeof newStreamCtx>,
        tools: undefined,
        blobs: undefined,
        platform: undefined,
        todos: undefined
      ) => Promise<void>;
    }
  ).driveH2;
  const zipped = frame(gzipSync(buildExecMcp("write_file", "call_2", "snake.c", 2)));
  zipped[0] = 1; // Connect-RPC compressed-frame flag
  const wire = Buffer.concat([frame(buildExecMcp("read_file", "call_1", "snake.c")), zipped]);
  const ctx = newStreamCtx("cursor/grok-4.7", () => {});
  await driveH2(fakeH2(wire), ctx, undefined, undefined, undefined, undefined);
  assert.equal(ctx.toolCalls.length, 2, "both parallel calls must be returned to opencode");
  assert.equal(
    ctx.pendingToolCalls.size,
    2,
    "both replies must stay pending on the same h2 stream"
  );
});

// ASM { interaction_update (1): { tool_call_started (2) | tool_call_completed (3): { call_id (1) } } }
function buildToolCallUpdate(field: 2 | 3, callId: string): Buffer {
  return lenPrefixed(1, lenPrefixed(field, lenPrefixed(1, Buffer.from(callId))));
}

test("composer: kv checkpoint after a Cursor-internal tool call does not end the turn", async () => {
  // Live 2026-10-01 (OpenCode, composer-2.5-fast): composer narrates one line,
  // runs its internal get_mcp_tools call (served through exec mcp_state),
  // Cursor saves KV blobs, and only then sends the exec_mcp for the client
  // tool. Ending the turn on that KV checkpoint returned the narration with
  // finish_reason "stop" and no tool call.
  const { newStreamCtx } = await import("../../open-sse/executors/cursor");
  const req = new PassThrough();
  const client = new EventEmitter() as EventEmitter & { close(): void };
  client.close = () => {};
  const h2 = { req, client, initialBytes: Buffer.alloc(0) };
  const executor = new CursorExecutor("cursor");
  const driveH2 = (
    executor as unknown as {
      driveH2: (
        stream: typeof h2,
        ctx: ReturnType<typeof newStreamCtx>,
        tools: undefined,
        blobs: undefined,
        platform: undefined,
        todos: undefined
      ) => Promise<void>;
    }
  ).driveH2;

  const ctx = newStreamCtx("cursor/composer-2.5-fast", () => {});
  const running = driveH2(h2, ctx, undefined, undefined, undefined, undefined);
  req.write(
    Buffer.concat([
      frame(buildTextDelta("Searching the web for that.")),
      frame(buildToolCallUpdate(2, "tool_get_mcp_tools")),
      frame(buildToolCallUpdate(3, "tool_get_mcp_tools")),
      frame(buildKvCheckpoint(4)),
    ])
  );
  // The client tool call arrives in a later TCP segment, past the KV grace window.
  await new Promise((r) => setTimeout(r, 50));
  req.write(frame(buildExecMcp("websearch", "call_websearch_1", "query")));

  await Promise.race([
    running,
    new Promise<never>((_, rej) =>
      setTimeout(() => rej(new Error("turn did not settle on the exec_mcp")), 8000)
    ),
  ]);
  assert.equal(ctx.toolCalls.length, 1, "exec_mcp after the internal tool must be surfaced");
  assert.equal(ctx.endReason, "tool_calls");
  req.destroy();
});

// ASM { interaction_update (1): { thinking_delta (4): { text (1): str } } } — composer's visible channel
function buildThinkingDelta(text: string): Buffer {
  return lenPrefixed(1, lenPrefixed(4, lenPrefixed(1, Buffer.from(text, "utf8"))));
}
// ASM { interaction_update (1): { turn_ended (14): {} } }
function buildTurnEnded(): Buffer {
  return lenPrefixed(1, lenPrefixed(14, Buffer.alloc(0)));
}

async function driveComposer(wire: Buffer) {
  const { newStreamCtx } = await import("../../open-sse/executors/cursor");
  const executor = new CursorExecutor("cursor");
  const driveH2 = (
    executor as unknown as {
      driveH2: (
        h2: ReturnType<typeof fakeH2>,
        ctx: ReturnType<typeof newStreamCtx>,
        tools: undefined,
        blobs: undefined,
        platform: undefined,
        todos: undefined
      ) => Promise<void>;
    }
  ).driveH2;
  const ctx = newStreamCtx("cursor/composer-2.5-fast", () => {});
  await Promise.race([
    driveH2(fakeH2(wire), ctx, undefined, undefined, undefined, undefined),
    new Promise<never>((_, rej) => setTimeout(() => rej(new Error("turn did not settle")), 8000)),
  ]);
  return ctx;
}

for (const [kind, build] of [
  ["text", buildTextDelta],
  ["thinking", buildThinkingDelta],
] as const) {
  test(`composer: ${kind} after an internal tool call still ends the turn on the kv checkpoint`, async () => {
    const ctx = await driveComposer(
      Buffer.concat([
        frame(buildTextDelta("Checking.")),
        frame(buildToolCallUpdate(2, "tool_get_mcp_tools")),
        frame(buildToolCallUpdate(3, "tool_get_mcp_tools")),
        frame(build(" No tool fits, here is the answer.")),
        frame(buildKvCheckpoint(5)),
      ])
    );
    assert.equal(ctx.endReason, "kv_after_text");
    assert.equal(ctx.toolCalls.length, 0);
  });
}

test("composer: turn_ended after an internal tool call and its kv save ends the turn", async () => {
  const ctx = await driveComposer(
    Buffer.concat([
      frame(buildTextDelta("Checking.")),
      frame(buildToolCallUpdate(2, "tool_get_mcp_tools")),
      frame(buildToolCallUpdate(3, "tool_get_mcp_tools")),
      frame(buildKvCheckpoint(6)),
      frame(buildTurnEnded()),
    ])
  );
  assert.equal(ctx.endReason, "turn_ended");
  assert.equal(ctx.toolCalls.length, 0);
});

// ASM { interaction_update (1): { partial_tool_call (7): { call_id (1) } } }
function buildPartialToolCall(callId: string): Buffer {
  return lenPrefixed(1, lenPrefixed(7, lenPrefixed(1, Buffer.from(callId))));
}
// ASM { interaction_update (1): { <field 27, not in the published proto>: { 1: 1 } } }
function buildUpdateField27(): Buffer {
  return lenPrefixed(1, lenPrefixed(27, Buffer.concat([tag(1, 0), v(1)])));
}

test("composer: kv checkpoint while a client tool call is still streaming does not end the turn", async () => {
  // Live 2026-10-01 (frame debug on): text → partial_tool_call → update 27 →
  // KV save → end=kv_after_text mcp=0. tool_call_started and the exec_mcp come
  // after the KV save, so the turn must still be open for them.
  const { newStreamCtx } = await import("../../open-sse/executors/cursor");
  const req = new PassThrough();
  const client = new EventEmitter() as EventEmitter & { close(): void };
  client.close = () => {};
  const h2 = { req, client, initialBytes: Buffer.alloc(0) };
  const executor = new CursorExecutor("cursor");
  const driveH2 = (
    executor as unknown as {
      driveH2: (
        stream: typeof h2,
        ctx: ReturnType<typeof newStreamCtx>,
        tools: undefined,
        blobs: undefined,
        platform: undefined,
        todos: undefined
      ) => Promise<void>;
    }
  ).driveH2;

  const ctx = newStreamCtx("cursor/composer-2.5-fast", () => {});
  const running = driveH2(h2, ctx, undefined, undefined, undefined, undefined);
  req.write(
    Buffer.concat([
      frame(buildTextDelta("Searching the web for that.")),
      frame(buildPartialToolCall("tool_websearch")),
      frame(buildUpdateField27()),
      frame(buildKvCheckpoint(7)),
    ])
  );
  await new Promise((r) => setTimeout(r, 50));
  req.write(
    Buffer.concat([
      frame(buildToolCallUpdate(2, "tool_websearch")),
      frame(buildExecMcp("websearch", "call_websearch_2", "query")),
    ])
  );

  await Promise.race([
    running,
    new Promise<never>((_, rej) =>
      setTimeout(() => rej(new Error("turn did not settle on the exec_mcp")), 8000)
    ),
  ]);
  assert.equal(ctx.toolCalls.length, 1, "exec_mcp after the KV save must be surfaced");
  assert.equal(ctx.endReason, "tool_calls");
  req.destroy();
});
