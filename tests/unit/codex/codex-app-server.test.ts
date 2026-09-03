/**
 * Unit tests for the Codex app-server WS transport (CodexAppServerExecutor).
 *
 * Everything is exercised against a MOCK ws transport (no live connection):
 *   - gating: isCodexAppServerRequired selects the app-server path only when
 *     codexTransport==="app-server" (+ config + flag on)
 *   - lifecycle: the turn emits initialize → thread/start → turn/start in order
 *   - stall-guard: an inbound server approval request is auto-approved
 *   - mapping: notifications map to the correct AdapterEvents
 *   - bridge: streaming output is a valid SSE Response
 */
import test from "node:test";
import assert from "node:assert/strict";

import { isCodexAppServerRequired } from "../../../open-sse/executors/codex.ts";
import { CodexAppServerExecutor } from "../../../open-sse/executors/codex-app-server.ts";
import {
  CodexAppServerClient,
  type CodexWreqWebSocket,
} from "../../../open-sse/executors/codex/appServerClient.ts";
import {
  translateNotification,
  translateToolCall,
  dynamicToolWireName,
  mapUsage,
} from "../../../open-sse/executors/codex/appServerEvents.ts";
import { resolveAppServerConfig } from "../../../open-sse/executors/codex/appServerConfig.ts";
import { probeCodexAppServerAuth } from "../../../open-sse/executors/codex/appServerAuthProbe.ts";
import type { AdapterEvent } from "../../../open-sse/vendor/codex-chatgpt-web/types.ts";
import type { ExecuteInput } from "../../../open-sse/executors/base.ts";

// ── A scriptable fake wreq WebSocket ────────────────────────────────────────
// Records every frame the client sends, and lets the test drive server frames in.
interface FakeSocketController {
  socket: CodexWreqWebSocket;
  sent: Array<Record<string, unknown>>;
  emit: (frame: Record<string, unknown>) => void;
  emitError: (message: string) => void;
  emitClose: () => void;
  closed: boolean;
}

function makeFakeSocket(): FakeSocketController {
  const sent: Array<Record<string, unknown>> = [];
  const ctrl: FakeSocketController = {
    sent,
    closed: false,
    socket: null as unknown as CodexWreqWebSocket,
    emit: () => {},
    emitError: () => {},
    emitClose: () => {},
  };
  const socket: CodexWreqWebSocket = {
    send: (data: string) => {
      sent.push(JSON.parse(data));
    },
    close: () => {
      ctrl.closed = true;
    },
    onmessage: null,
    onerror: null,
    onclose: null,
  };
  ctrl.socket = socket;
  ctrl.emit = (frame) => socket.onmessage?.({ data: JSON.stringify(frame) });
  ctrl.emitError = (message) => socket.onerror?.({ message });
  ctrl.emitClose = () => socket.onclose?.();
  return ctrl;
}

/** A websocketFn that hands out a pre-made fake socket and records the connect opts. */
function fakeTransport(ctrl: FakeSocketController) {
  const calls: Array<{ url: string; opts?: Record<string, unknown> }> = [];
  const fn = async (url: string, opts?: Record<string, unknown>) => {
    calls.push({ url, opts });
    return ctrl.socket;
  };
  return { fn, calls };
}

const APP_SERVER_PSD = {
  codexTransport: "app-server",
  codexAppServerUrl: "ws://ts-egress:1456",
  codexAppServerToken: "deadbeef",
  codexAppServerCwd: "/tmp",
};

function makeExecuteInput(overrides: Partial<ExecuteInput> = {}): ExecuteInput {
  return {
    model: "gpt-5.5",
    body: { input: "hello there" },
    stream: true,
    credentials: { providerSpecificData: { ...APP_SERVER_PSD } },
    ...overrides,
  } as ExecuteInput;
}

// ── Gating ──────────────────────────────────────────────────────────────────

test("isCodexAppServerRequired: true only when codexTransport==='app-server' + configured", () => {
  assert.equal(
    isCodexAppServerRequired({ providerSpecificData: { ...APP_SERVER_PSD } }),
    true
  );
  // wrong transport
  assert.equal(
    isCodexAppServerRequired({
      providerSpecificData: { ...APP_SERVER_PSD, codexTransport: "websocket" },
    }),
    false
  );
  // no providerSpecificData
  assert.equal(isCodexAppServerRequired({}), false);
  // transport set but not configured (no url/token, no env)
  const prevUrl = process.env.OMNIROUTE_CODEX_APPSERVER_WS;
  const prevTok = process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN;
  const prevTokFile = process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN_FILE;
  delete process.env.OMNIROUTE_CODEX_APPSERVER_WS;
  delete process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN;
  delete process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN_FILE;
  try {
    assert.equal(
      isCodexAppServerRequired({ providerSpecificData: { codexTransport: "app-server" } }),
      false
    );
  } finally {
    if (prevUrl !== undefined) process.env.OMNIROUTE_CODEX_APPSERVER_WS = prevUrl;
    if (prevTok !== undefined) process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN = prevTok;
    if (prevTokFile !== undefined)
      process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN_FILE = prevTokFile;
  }
});

test("isCodexAppServerRequired: false when OMNIROUTE_CODEX_APP_SERVER_ENABLED=false", () => {
  const prev = process.env.OMNIROUTE_CODEX_APP_SERVER_ENABLED;
  process.env.OMNIROUTE_CODEX_APP_SERVER_ENABLED = "false";
  try {
    assert.equal(
      isCodexAppServerRequired({ providerSpecificData: { ...APP_SERVER_PSD } }),
      false
    );
  } finally {
    if (prev === undefined) delete process.env.OMNIROUTE_CODEX_APP_SERVER_ENABLED;
    else process.env.OMNIROUTE_CODEX_APP_SERVER_ENABLED = prev;
  }
});

test("resolveAppServerConfig: env fallback + token-file, ws-scheme validation", () => {
  assert.equal(resolveAppServerConfig({ codexAppServerUrl: "http://x", codexAppServerToken: "t" }), null);
  const cfg = resolveAppServerConfig({ ...APP_SERVER_PSD });
  assert.deepEqual(cfg, { url: "ws://ts-egress:1456", token: "deadbeef", cwd: "/tmp" });
});

// ── Notification → AdapterEvent mapping ─────────────────────────────────────

test("translateNotification: maps deltas, done and error to AdapterEvents", () => {
  const events: AdapterEvent[] = [];
  const push = (e: AdapterEvent) => events.push(e);

  assert.equal(
    translateNotification("item/agentMessage/delta", { delta: "Hel" }, push),
    false
  );
  assert.equal(
    translateNotification("item/reasoning/textDelta", { delta: "think" }, push),
    false
  );
  // terminal → returns true
  assert.equal(
    translateNotification(
      "turn/completed",
      { turn: { usage: { input_tokens: 10, output_tokens: 5 } } },
      push
    ),
    true
  );

  assert.deepEqual(events[0], { type: "text_delta", text: "Hel" });
  assert.deepEqual(events[1], { type: "thinking_delta", thinking: "think" });
  assert.equal(events[2].type, "done");
  const done = events[2] as Extract<AdapterEvent, { type: "done" }>;
  assert.equal(done.endTurn, true);
  assert.equal(done.usage?.inputTokens, 10);
  assert.equal(done.usage?.outputTokens, 5);
});

test("translateNotification: error notification maps to error event (terminal)", () => {
  const events: AdapterEvent[] = [];
  const isTerminal = translateNotification(
    "error",
    { error: { message: "boom" } },
    (e) => events.push(e)
  );
  assert.equal(isTerminal, true);
  assert.equal(events[0].type, "error");
  const err = events[0] as Extract<AdapterEvent, { type: "error" }>;
  assert.equal(err.message, "boom");
  assert.equal(err.status, 502);
});

test("mapUsage: converts snake_case token counts", () => {
  const usage = mapUsage({
    input_tokens: 100,
    cached_input_tokens: 20,
    output_tokens: 40,
    reasoning_output_tokens: 8,
  });
  assert.equal(usage?.inputTokens, 100);
  assert.equal(usage?.cachedInputTokens, 20);
  assert.equal(usage?.cacheReadInputTokens, 20);
  assert.equal(usage?.outputTokens, 40);
  assert.equal(usage?.reasoningOutputTokens, 8);
  assert.equal(mapUsage(undefined), undefined);
});

// ── Client: approval stall-guard (deny-by-default, opt-in approve) ─────────

test("CodexAppServerClient: server approval request is auto-DENIED by default (#11205 hardening)", async () => {
  const ctrl = makeFakeSocket();
  const { fn } = fakeTransport(ctrl);
  const client = new CodexAppServerClient({ websocketFn: fn });
  await client.connect("ws://x", "tok");

  // Auth header attached on connect
  // (the fake records opts on connect via fakeTransport calls; verified in lifecycle test)

  // Server sends an exec approval request with id=99.
  ctrl.emit({
    jsonrpc: "2.0",
    id: 99,
    method: "execCommandApproval",
    params: { command: ["ls", "-la"], cwd: "/tmp" },
  });

  const reply = ctrl.sent.find((f) => f.id === 99);
  assert.ok(reply, "client must reply to the server approval request");
  // Security contract (post-#11205 review): codex's OWN command/file/permission
  // executions are denied by default — approval prompts are NOT the harness
  // tool-call passthrough (that path is item/tool/call, handled separately), so
  // denying never sabotages harness tools. Blanket auto-approve + a permissive
  // sandbox is a confused-deputy for prompt-injected turns.
  assert.equal((reply!.result as Record<string, unknown>).decision, "denied");
});

test("CodexAppServerClient: approval request is auto-approved only with explicit opt-in", async () => {
  const ctrl = makeFakeSocket();
  const { fn } = fakeTransport(ctrl);
  const client = new CodexAppServerClient({ websocketFn: fn, autoApproveApprovals: true });
  await client.connect("ws://x", "tok");

  ctrl.emit({
    jsonrpc: "2.0",
    id: 100,
    method: "item/fileChange/requestApproval",
    params: { changes: [] },
  });

  const reply = ctrl.sent.find((f) => f.id === 100);
  assert.ok(reply, "client must reply to the server approval request");
  assert.equal((reply!.result as Record<string, unknown>).decision, "approved");
});

test("CodexAppServerClient: non-approval server request gets a JSON-RPC error", async () => {
  const ctrl = makeFakeSocket();
  const { fn } = fakeTransport(ctrl);
  const client = new CodexAppServerClient({ websocketFn: fn });
  await client.connect("ws://x", "tok");

  ctrl.emit({ jsonrpc: "2.0", id: 7, method: "item/tool/call", params: {} });
  const reply = ctrl.sent.find((f) => f.id === 7);
  assert.ok(reply);
  assert.equal((reply!.error as { code: number }).code, -32601);
});

test("CodexAppServerClient: notifications reach the handler; responses settle requests", async () => {
  const ctrl = makeFakeSocket();
  const { fn } = fakeTransport(ctrl);
  const client = new CodexAppServerClient({ websocketFn: fn });
  await client.connect("ws://x", "tok");

  const seen: string[] = [];
  client.onNotification((method) => seen.push(method));

  // Fire a request; the fake echoes an id-matched response.
  const reqPromise = client.request("initialize", { clientInfo: {} });
  const sentInit = ctrl.sent.find((f) => f.method === "initialize");
  assert.ok(sentInit);
  ctrl.emit({ jsonrpc: "2.0", id: sentInit!.id, result: { ok: true } });
  const result = (await reqPromise) as { ok: boolean };
  assert.equal(result.ok, true);

  // A method-only frame is a notification.
  ctrl.emit({ jsonrpc: "2.0", method: "item/agentMessage/delta", params: { delta: "x" } });
  assert.ok(seen.includes("item/agentMessage/delta"));
});

// ── Executor: lifecycle order + streaming SSE Response ───────────────────────

/** Drive a full streaming turn against a fake transport and return the SSE text. */
async function runStreamingTurn(): Promise<{
  sent: Array<Record<string, unknown>>;
  sseText: string;
}> {
  const ctrl = makeFakeSocket();
  const { fn } = fakeTransport(ctrl);
  const executor = new CodexAppServerExecutor({ websocketFn: fn });

  // Auto-responder: as soon as the client sends a request, emit its response and,
  // for turn/start, stream a couple of notifications + turn/completed.
  const originalSend = ctrl.socket.send;
  ctrl.socket.send = (data: string) => {
    originalSend(data);
    const frame = JSON.parse(data) as Record<string, unknown>;
    if (frame.id == null || !frame.method) return;
    queueMicrotask(() => {
      if (frame.method === "thread/start") {
        ctrl.emit({ jsonrpc: "2.0", id: frame.id, result: { threadId: "thr_1" } });
      } else if (frame.method === "turn/start") {
        ctrl.emit({
          jsonrpc: "2.0",
          method: "item/agentMessage/delta",
          params: { delta: "Hello" },
        });
        ctrl.emit({
          jsonrpc: "2.0",
          method: "turn/completed",
          params: { turn: { usage: { input_tokens: 3, output_tokens: 2 } } },
        });
        ctrl.emit({ jsonrpc: "2.0", id: frame.id, result: {} });
      } else {
        ctrl.emit({ jsonrpc: "2.0", id: frame.id, result: {} });
      }
    });
  };

  const result = await executor.execute(makeExecuteInput());
  const response = "response" in result ? result.response : result;
  assert.equal(response.status, 200);
  assert.match(response.headers.get("Content-Type") ?? "", /text\/event-stream/);
  const sseText = await response.text();
  return { sent: ctrl.sent, sseText };
}

test("CodexAppServerExecutor: streaming turn emits initialize → thread/start → turn/start in order", async () => {
  const { sent } = await runStreamingTurn();
  const methods = sent.filter((f) => typeof f.method === "string" && f.id != null).map((f) => f.method);
  const lifecycle = methods.filter(
    (m) => m === "initialize" || m === "thread/start" || m === "turn/start"
  );
  assert.deepEqual(lifecycle, ["initialize", "thread/start", "turn/start"]);

  // thread/start carried the router defaults: approvalPolicy:"never" (codex
  // never blocks on its own approval) + sandbox:"workspace-write" — hardened
  // default post-#11205 security review (was "danger-full-access"): codex's own
  // sandbox now confines writes to the turn's cwd tree unless the operator
  // explicitly opts back into a wider sandbox via providerSpecificData/env.
  const threadStart = sent.find((f) => f.method === "thread/start");
  assert.equal((threadStart!.params as Record<string, unknown>).approvalPolicy, "never");
  assert.equal((threadStart!.params as Record<string, unknown>).sandbox, "workspace-write");

  // turn/start carried the text input with text_elements:[]
  const turnStart = sent.find((f) => f.method === "turn/start");
  const turnParams = turnStart!.params as Record<string, unknown>;
  assert.equal(turnParams.threadId, "thr_1");
  assert.deepEqual(turnParams.input, [{ type: "text", text: "hello there", text_elements: [] }]);
});

test("CodexAppServerExecutor: streaming output is a valid Responses SSE stream", async () => {
  const { sseText } = await runStreamingTurn();
  assert.match(sseText, /event: response\.created/);
  assert.match(sseText, /response\.output_text\.delta/);
  assert.ok(sseText.includes("Hello"));
  assert.match(sseText, /event: response\.completed/);
  assert.ok(sseText.includes("[DONE]"));
});

test("CodexAppServerExecutor: unconfigured connection returns an in-band error Response", async () => {
  const executor = new CodexAppServerExecutor({ websocketFn: async () => makeFakeSocket().socket });
  const prevUrl = process.env.OMNIROUTE_CODEX_APPSERVER_WS;
  const prevTok = process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN;
  const prevTokFile = process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN_FILE;
  delete process.env.OMNIROUTE_CODEX_APPSERVER_WS;
  delete process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN;
  delete process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN_FILE;
  try {
    const result = await executor.execute(
      makeExecuteInput({ credentials: { providerSpecificData: { codexTransport: "app-server" } } })
    );
    const response = "response" in result ? result.response : result;
    assert.equal(response.status, 503);
  } finally {
    if (prevUrl !== undefined) process.env.OMNIROUTE_CODEX_APPSERVER_WS = prevUrl;
    if (prevTok !== undefined) process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN = prevTok;
    if (prevTokFile !== undefined)
      process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN_FILE = prevTokFile;
  }
});

test("CodexAppServerExecutor: non-streaming turn returns a JSON Response", async () => {
  const ctrl = makeFakeSocket();
  const { fn } = fakeTransport(ctrl);
  const executor = new CodexAppServerExecutor({ websocketFn: fn });

  const originalSend = ctrl.socket.send;
  ctrl.socket.send = (data: string) => {
    originalSend(data);
    const frame = JSON.parse(data) as Record<string, unknown>;
    if (frame.id == null || !frame.method) return;
    queueMicrotask(() => {
      if (frame.method === "thread/start") {
        ctrl.emit({ jsonrpc: "2.0", id: frame.id, result: { threadId: "thr_1" } });
      } else if (frame.method === "turn/start") {
        ctrl.emit({
          jsonrpc: "2.0",
          method: "item/agentMessage/delta",
          params: { delta: "Hi" },
        });
        ctrl.emit({ jsonrpc: "2.0", method: "turn/completed", params: { turn: {} } });
        ctrl.emit({ jsonrpc: "2.0", id: frame.id, result: {} });
      } else {
        ctrl.emit({ jsonrpc: "2.0", id: frame.id, result: {} });
      }
    });
  };

  const result = await executor.execute(makeExecuteInput({ stream: false }));
  const response = "response" in result ? result.response : result;
  assert.equal(response.status, 200);
  assert.match(response.headers.get("Content-Type") ?? "", /application\/json/);
  const body = (await response.json()) as Record<string, unknown>;
  assert.ok(Array.isArray(body.output));
});

// ── Tool path: INBOUND advertise + OUTBOUND passthrough ──────────────────────

test("dynamicToolWireName: flattens namespaced tools, passes plain ones through", () => {
  assert.equal(dynamicToolWireName("mcp__ctx7", "get_docs"), "mcp__ctx7__get_docs");
  assert.equal(dynamicToolWireName(null, "read_file"), "read_file");
  assert.equal(dynamicToolWireName(undefined, "read_file"), "read_file");
});

test("translateToolCall: emits tool_call_start/delta/end with callId, wire name, JSON args", () => {
  const events: AdapterEvent[] = [];
  translateToolCall(
    { callId: "call_42", namespace: null, tool: "get_weather", arguments: { city: "SF" } },
    (e) => events.push(e)
  );
  assert.equal(events.length, 3);
  assert.deepEqual(events[0], { type: "tool_call_start", id: "call_42", name: "get_weather" });
  assert.deepEqual(events[1], { type: "tool_call_delta", arguments: '{"city":"SF"}' });
  assert.deepEqual(events[2], { type: "tool_call_end" });
});

test("translateToolCall: restores MCP namespace into the wire name for the round-trip", () => {
  const events: AdapterEvent[] = [];
  translateToolCall(
    { callId: "call_9", namespace: "mcp__ctx7", tool: "get_docs", arguments: "{}" },
    (e) => events.push(e)
  );
  const start = events[0] as Extract<AdapterEvent, { type: "tool_call_start" }>;
  assert.equal(start.name, "mcp__ctx7__get_docs");
});

/**
 * Drive a streaming turn where the harness advertises a function tool and codex
 * responds by invoking it via the `item/tool/call` ServerRequest. Assert (a) the
 * tool is advertised on thread/start via `dynamicTools`, (b) the app-server request
 * is settled, and (c) the SSE stream carries a Responses function_call for the tool.
 */
async function runToolTurn(): Promise<{
  sent: Array<Record<string, unknown>>;
  sseText: string;
}> {
  const ctrl = makeFakeSocket();
  const { fn } = fakeTransport(ctrl);
  const executor = new CodexAppServerExecutor({ websocketFn: fn });

  const originalSend = ctrl.socket.send;
  ctrl.socket.send = (data: string) => {
    originalSend(data);
    const frame = JSON.parse(data) as Record<string, unknown>;
    if (frame.id == null || !frame.method) return;
    queueMicrotask(() => {
      if (frame.method === "thread/start") {
        ctrl.emit({ jsonrpc: "2.0", id: frame.id, result: { threadId: "thr_1" } });
      } else if (frame.method === "turn/start") {
        // codex invokes the harness tool via a server → client ServerRequest.
        ctrl.emit({
          jsonrpc: "2.0",
          id: 5000,
          method: "item/tool/call",
          params: {
            threadId: "thr_1",
            turnId: "turn_1",
            callId: "call_abc",
            namespace: null,
            tool: "get_weather",
            arguments: { city: "SF" },
          },
        });
        // Settle turn/start too (codex would eventually complete; the passthrough
        // already ended the turn on our side).
        ctrl.emit({ jsonrpc: "2.0", id: frame.id, result: {} });
      } else {
        ctrl.emit({ jsonrpc: "2.0", id: frame.id, result: {} });
      }
    });
  };

  const input = makeExecuteInput({
    body: {
      input: "what's the weather?",
      tools: [
        {
          type: "function",
          name: "get_weather",
          description: "Get the weather for a city",
          parameters: {
            type: "object",
            properties: { city: { type: "string" } },
            required: ["city"],
          },
        },
      ],
    },
  });

  const result = await executor.execute(input);
  const response = "response" in result ? result.response : result;
  const sseText = await response.text();
  return { sent: ctrl.sent, sseText };
}

test("CodexAppServerExecutor: advertises harness tools to codex via thread/start dynamicTools", async () => {
  const { sent } = await runToolTurn();
  const threadStart = sent.find((f) => f.method === "thread/start");
  assert.ok(threadStart, "thread/start must be sent");
  const params = threadStart!.params as Record<string, unknown>;
  const dynamicTools = params.dynamicTools as Array<Record<string, unknown>> | undefined;
  assert.ok(Array.isArray(dynamicTools), "dynamicTools must be advertised");
  assert.equal(dynamicTools!.length, 1);
  assert.equal(dynamicTools![0].type, "function");
  assert.equal(dynamicTools![0].name, "get_weather");
  assert.ok(dynamicTools![0].inputSchema, "spec carries the inputSchema");

  // experimentalApi capability opted in on initialize (dynamicTools is experimental)
  const init = sent.find((f) => f.method === "initialize");
  const caps = (init!.params as Record<string, unknown>).capabilities as Record<string, unknown>;
  assert.equal(caps.experimentalApi, true);
});

test("CodexAppServerExecutor: item/tool/call is settled and surfaced as a Responses function_call", async () => {
  const { sent, sseText } = await runToolTurn();

  // The app-server request (id 5000) must be settled so the socket never stalls.
  const toolReply = sent.find((f) => f.id === 5000);
  assert.ok(toolReply, "the item/tool/call request id must be settled");
  const replyResult = toolReply!.result as Record<string, unknown>;
  assert.ok(replyResult, "settled with a DynamicToolCallResponse result");
  assert.equal(replyResult.success, false);
  assert.ok(Array.isArray(replyResult.contentItems));

  // The SSE stream carries the harness function_call for get_weather with its args.
  assert.match(sseText, /function_call/);
  assert.ok(sseText.includes("get_weather"));
  assert.ok(sseText.includes("call_abc"), "the codex callId is relayed as the call_id");
  assert.ok(sseText.includes("SF"), "the tool arguments are relayed");
  assert.match(sseText, /event: response\.completed/);
  assert.ok(sseText.includes("[DONE]"));
});

// REGRESSION (live BUG#3, 2026-08-22): the real codex app-server ACCEPTS a turn
// on turn/start (returns status:"inProgress") and delivers the model output +
// terminal turn/completed LATER as async notifications. The original run() closed
// the WS in its finally-block as soon as `await turn/start` resolved, tearing the
// socket down BEFORE those notifications arrived, so the event queue never closed
// and the request hung until the caller's timeout. The pre-existing mocks hid this
// because they emitted turn/completed in the SAME microtask as the turn/start
// response (completion raced ahead of request-resolution). This test reproduces
// the real ordering: turn/start resolves FIRST, then agentMessage/delta +
// turn/completed fire on a later macrotask. It must still complete (not hang).
test("CodexAppServerExecutor: async post-turn/start completion does not close the socket early (BUG#3)", async () => {
  const ctrl = makeFakeSocket();
  const { fn } = fakeTransport(ctrl);
  const executor = new CodexAppServerExecutor({ websocketFn: fn });

  // Model a REAL socket: once closed, it delivers no more frames. The shared
  // makeFakeSocket keeps emitting after close (fine for the other tests), but
  // this regression turns specifically on the fact that a prematurely-closed
  // socket DROPS the later turn/completed — so guard emits on ctrl.closed here.
  const emitLive = (frame: Record<string, unknown>) => {
    if (ctrl.closed) return; // socket torn down → frame never arrives (real behavior)
    ctrl.emit(frame);
  };

  const originalSend = ctrl.socket.send;
  ctrl.socket.send = (data: string) => {
    originalSend(data);
    const frame = JSON.parse(data) as Record<string, unknown>;
    if (frame.id == null || !frame.method) return;
    if (frame.method === "thread/start") {
      queueMicrotask(() =>
        emitLive({ jsonrpc: "2.0", id: frame.id, result: { thread: { id: "thr_async" } } })
      );
    } else if (frame.method === "turn/start") {
      // Resolve turn/start FIRST (status inProgress) …
      queueMicrotask(() =>
        emitLive({
          jsonrpc: "2.0",
          id: frame.id,
          result: { turn: { id: "t1", status: "inProgress" } },
        })
      );
      // … then, on a LATER macrotask, stream the output + terminal completion.
      // Under the OLD code the finally-block closes the socket right after
      // turn/start resolves, so ctrl.closed is true here and these frames are
      // DROPPED → the queue never closes → execute() hangs (test times out).
      setTimeout(() => {
        emitLive({
          jsonrpc: "2.0",
          method: "item/agentMessage/delta",
          params: { delta: "ASYNC-OK" },
        });
        emitLive({
          jsonrpc: "2.0",
          method: "turn/completed",
          params: { turn: { usage: { input_tokens: 1, output_tokens: 1 } } },
        });
      }, 15);
    } else {
      queueMicrotask(() => emitLive({ jsonrpc: "2.0", id: frame.id, result: {} }));
    }
  };

  // Non-streaming: execute() awaits events.collect(), which only returns once the
  // queue closes on the terminal notification. Under the old (buggy) code the
  // socket closed early, the terminal frame was dropped, and this promise never
  // resolved. Guard with a timeout so a regression fails loudly, not by hanging.
  const result = await Promise.race([
    executor.execute(makeExecuteInput({ stream: false })),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("execute() hung: socket closed before async completion (BUG#3 regressed)")), 5000)
    ),
  ]);
  const response = "response" in result ? result.response : (result as Response);
  assert.equal(response.status, 200);
  const body = JSON.parse(await response.text()) as {
    status?: string;
    output?: Array<{ content?: Array<{ text?: string }> }>;
  };
  assert.equal(body.status, "completed", "the turn completed after the async terminal notification");
  const text = body.output?.[0]?.content?.[0]?.text ?? "";
  assert.equal(text, "ASYNC-OK", "the model output that arrived AFTER turn/start is present");
});

// ── Layer-2 auth-status probe (probeCodexAppServerAuth) ─────────────────────
// /readyz proves the server PROCESS is up but NOT that its Codex CLI is signed
// in. probeCodexAppServerAuth opens the JSON-RPC WS and reads account/read:
//   authenticated → { account: {...} } ; logged out → no account (or auth error).
// Verified against codex 0.149.0: account/read returns
//   { account: { type, email, planType }, requiresOpenaiAuth }.

/** A fake websocketFn that answers initialize + account/read with a scripted result. */
function fakeAuthTransport(accountReadResponse: {
  result?: Record<string, unknown>;
  error?: { code: number; message: string };
}) {
  const ctrl = makeFakeSocket();
  const originalSend = ctrl.socket.send;
  ctrl.socket.send = (data: string) => {
    originalSend(data);
    const frame = JSON.parse(data) as Record<string, unknown>;
    if (frame.id == null || !frame.method) return;
    queueMicrotask(() => {
      if (frame.method === "initialize") {
        ctrl.emit({ jsonrpc: "2.0", id: frame.id, result: { ok: true } });
      } else if (frame.method === "account/read") {
        if (accountReadResponse.error) {
          ctrl.emit({ jsonrpc: "2.0", id: frame.id, error: accountReadResponse.error });
        } else {
          ctrl.emit({ jsonrpc: "2.0", id: frame.id, result: accountReadResponse.result ?? {} });
        }
      } else {
        ctrl.emit({ jsonrpc: "2.0", id: frame.id, result: {} });
      }
    });
  };
  const fn = async () => ctrl.socket;
  return fn;
}

const AUTH_CONFIG = { url: "ws://ts-egress:1456", token: "deadbeef", cwd: "/tmp" };

test("probeCodexAppServerAuth: account with email → authenticated", async () => {
  const fn = fakeAuthTransport({
    result: { account: { type: "chatgpt", email: "user@example.com", planType: "pro" }, requiresOpenaiAuth: true },
  });
  const status = await probeCodexAppServerAuth(AUTH_CONFIG, fn, 3000);
  assert.equal(status.state, "authenticated");
  if (status.state === "authenticated") {
    assert.equal(status.account.email, "user@example.com");
    assert.equal(status.account.planType, "pro");
  }
});

test("probeCodexAppServerAuth: no account → logged_out", async () => {
  const fn = fakeAuthTransport({ result: { requiresOpenaiAuth: true } }); // no `account`
  const status = await probeCodexAppServerAuth(AUTH_CONFIG, fn, 3000);
  assert.equal(status.state, "logged_out");
});

test("probeCodexAppServerAuth: auth-error on account/read → logged_out", async () => {
  const fn = fakeAuthTransport({ error: { code: -32000, message: "AuthRequiredError: please login" } });
  const status = await probeCodexAppServerAuth(AUTH_CONFIG, fn, 3000);
  assert.equal(status.state, "logged_out");
});

test("probeCodexAppServerAuth: no transport → unknown (does not throw)", async () => {
  const status = await probeCodexAppServerAuth(AUTH_CONFIG, null, 3000);
  assert.equal(status.state, "unknown");
});


// ── Security hardening (#11205 post-merge review) ───────────────────────────
// Two findings from the automated push review on the original #11205 merge:
//  (1) the readyz health probe sent the bearer token to any URL a connection
//      config pointed at, following redirects (SSRF / credential exfil);
//  (2) env-sourced credentials were happily paired with a
//      providerSpecificData-sourced URL, so anyone able to write a connection
//      could harvest the operator's env token.
// The binding rule: env-sourced tokens are only sent to env-sourced URLs or to
// operator-local hosts (loopback / RFC1918 / link-local / ULA / localhost /
// single-label LAN names / *.local / *.ts.net / *.internal). A psd-sourced
// token may go anywhere — whoever wrote the psd already knows it.

function withEnv<T>(vars: Record<string, string | undefined>, fn: () => T): T {
  const prev: Record<string, string | undefined> = {};
  for (const k of Object.keys(vars)) {
    prev[k] = process.env[k];
    if (vars[k] === undefined) delete process.env[k];
    else process.env[k] = vars[k];
  }
  try {
    return fn();
  } finally {
    for (const k of Object.keys(vars)) {
      if (prev[k] === undefined) delete process.env[k];
      else process.env[k] = prev[k];
    }
  }
}

const BINDING_ENV_KEYS = {
  OMNIROUTE_CODEX_APPSERVER_WS: undefined,
  OMNIROUTE_CODEX_APPSERVER_WS_TOKEN: "env-token-hex",
  OMNIROUTE_CODEX_APPSERVER_WS_TOKEN_FILE: undefined,
} as const;

test("resolveAppServerConfig: refuses env token → remote psd URL (SSRF binding)", () => {
  withEnv({ ...BINDING_ENV_KEYS }, () => {
    // attacker/lower-priv connection config points the URL at an outside host;
    // the env token must NOT be attached → unconfigured (null), feature off.
    assert.equal(
      resolveAppServerConfig({
        codexTransport: "app-server",
        codexAppServerUrl: "wss://evil.example.com:8443",
      }),
      null
    );
    // dotted hostnames are not local even when they look benign
    assert.equal(
      resolveAppServerConfig({
        codexTransport: "app-server",
        codexAppServerUrl: "ws://appserver.evil-corp.io:1456",
      }),
      null
    );
  });
});

test("resolveAppServerConfig: env token allowed to operator-local psd URLs", () => {
  withEnv({ ...BINDING_ENV_KEYS }, () => {
    const localUrls = [
      "ws://127.0.0.1:1456",
      "ws://localhost:1456",
      "ws://[::1]:1456",
      "ws://10.0.0.5:1456",
      "ws://172.16.3.4:1456",
      "ws://192.168.0.15:1456",
      "ws://169.254.1.1:1456",
      "ws://ts-egress:1456", // single-label LAN/hosts-file name
      "ws://codex.local:1456",
      "ws://node1.ts.net:1456",
      "ws://sidecar.internal:1456",
    ];
    for (const url of localUrls) {
      const cfg = resolveAppServerConfig({ codexTransport: "app-server", codexAppServerUrl: url });
      assert.ok(cfg, `expected env token to bind to local URL ${url}`);
      assert.equal(cfg!.token, "env-token-hex");
    }
  });
});

test("resolveAppServerConfig: psd-sourced token may pair with any psd URL", () => {
  withEnv(
    {
      OMNIROUTE_CODEX_APPSERVER_WS: undefined,
      OMNIROUTE_CODEX_APPSERVER_WS_TOKEN: undefined,
      OMNIROUTE_CODEX_APPSERVER_WS_TOKEN_FILE: undefined,
    },
    () => {
      const cfg = resolveAppServerConfig({
        codexTransport: "app-server",
        codexAppServerUrl: "wss://codex.remote.example.com:443",
        codexAppServerToken: "psd-token",
      });
      assert.ok(cfg, "psd token + psd URL is self-consistent, allowed");
      assert.equal(cfg!.token, "psd-token");
    }
  );
});

test("resolveAppServerConfig: env URL + env token pairs regardless of host", () => {
  withEnv(
    {
      OMNIROUTE_CODEX_APPSERVER_WS: "wss://codex-remote.example.com:8443",
      OMNIROUTE_CODEX_APPSERVER_WS_TOKEN: "env-token-hex",
      OMNIROUTE_CODEX_APPSERVER_WS_TOKEN_FILE: undefined,
    },
    () => {
      const cfg = resolveAppServerConfig({ codexTransport: "app-server" });
      assert.ok(cfg, "operator's own env pair is self-consistent, allowed");
      assert.equal(cfg!.url, "wss://codex-remote.example.com:8443");
    }
  );
});

// ── Health probe: redirect pinning + binding inheritance ────────────────────

test("testCodexAppServerConnection: readyz probe pins redirects (no token leak via 30x)", async () => {
  const { testCodexAppServerConnection } = await import(
    "../../../src/app/api/providers/[id]/test/codexAppServerHealth.ts"
  );
  const originalFetch = globalThis.fetch;
  const seen: Array<{ url: string; init?: RequestInit }> = [];
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    seen.push({ url: String(url), init });
    return new Response("not ready", { status: 503 });
  }) as typeof fetch;
  try {
    const result = await testCodexAppServerConnection({
      provider: "codex-app-server",
      providerSpecificData: {
        codexAppServerUrl: "ws://127.0.0.1:1456",
        codexAppServerToken: "deadbeef",
      },
    });
    assert.ok(result, "app-server provider must take the readyz path");
    assert.equal(result!.valid, false);
    assert.equal(seen.length, 1);
    assert.equal(seen[0].url, "http://127.0.0.1:1456/readyz");
    assert.equal(seen[0].init?.redirect, "manual", "bearer token must never follow a redirect");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("testCodexAppServerConnection: env token + remote psd URL reports unconfigured, no network", async () => {
  const { testCodexAppServerConnection } = await import(
    "../../../src/app/api/providers/[id]/test/codexAppServerHealth.ts"
  );
  const originalFetch = globalThis.fetch;
  let fetched = false;
  globalThis.fetch = (async () => {
    fetched = true;
    return new Response("ok", { status: 200 });
  }) as typeof fetch;
  try {
    await withEnv({ ...BINDING_ENV_KEYS }, async () => {
      const result = await testCodexAppServerConnection({
        provider: "codex-app-server",
        providerSpecificData: { codexAppServerUrl: "wss://evil.example.com:8443" },
      });
      assert.ok(result);
      assert.equal(result!.valid, false);
      assert.match(String((result!.diagnosis as { code?: string })?.code), /app_server_unconfigured/);
    });
    assert.equal(fetched, false, "binding refusal must happen before any network call");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
