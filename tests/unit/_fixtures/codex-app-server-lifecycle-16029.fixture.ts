// Launched by the unit wrapper with an isolated environment before application imports.
import assert from "node:assert/strict";
import test from "node:test";
import { setImmediate as nextTick } from "node:timers/promises";

import type { CodexWreqWebSocket } from "../../../open-sse/executors/codex/appServerClient.ts";

assert.ok(process.env.DATA_DIR);
assert.ok(process.env.OMNIROUTE_PLUGINS_DIR);
globalThis.fetch = async () => {
  throw new Error("Unexpected network access in Codex lifecycle fixture");
};
const { CodexAppServerExecutor } = await import("../../../open-sse/executors/codex-app-server.ts");

type Frame = Record<string, unknown>;
type Scenario = "normal" | "retry" | "fatal" | "close" | "socket-error" | "early-close";
const PRIVATE_ERROR = "token=private-value at /srv/private/config.ts\nsecret trace";

function fakeAppServer(scenario: Scenario) {
  let closed = false;
  let closes = 0;
  let outputDelivered = false;
  const sent: Frame[] = [];
  const emit = (frame: Frame) => {
    if (!closed) socket.onmessage?.({ data: JSON.stringify(frame) });
  };
  const notify = (method: string, params: Frame) => emit({ jsonrpc: "2.0", method, params });
  const disconnect = () => {
    closed = true;
    socket.onclose?.();
  };
  const complete = () => {
    if (closed) return;
    outputDelivered = true;
    notify("item/agentMessage/delta", { threadId: "thread-test", delta: "LATE-OK" });
    notify("turn/completed", { turn: { status: "completed" } });
  };
  const afterAccepted = () => {
    if (scenario === "close") return disconnect();
    if (scenario === "socket-error") {
      socket.onerror?.({ message: PRIVATE_ERROR });
      disconnect();
      return;
    }
    if (scenario === "retry" || scenario === "fatal") {
      notify("error", {
        threadId: "thread-test",
        turnId: "turn-test",
        willRetry: scenario === "retry",
        error: { message: PRIVATE_ERROR },
      });
    }
    // Output arrives on a later macrotask, after turn/start has been acknowledged.
    setImmediate(complete);
  };
  const socket: CodexWreqWebSocket = {
    onmessage: null,
    onerror: null,
    onclose: null,
    send(data) {
      const frame = JSON.parse(data) as Frame;
      sent.push(frame);
      if (closed || frame.id == null) return;
      queueMicrotask(() => {
        if (frame.method === "thread/start") {
          // The response resolves its promise, but the awaiting executor has not resumed yet.
          emit({ id: frame.id, result: { thread: { id: "thread-test" } } });
          if (scenario === "early-close") disconnect();
        } else if (frame.method === "turn/start") {
          emit({ id: frame.id, result: { turn: { id: "turn-test", status: "inProgress" } } });
          setImmediate(afterAccepted);
        } else {
          emit({ id: frame.id, result: {} });
        }
      });
    },
    close() {
      closes += 1;
      disconnect();
    },
  };
  return {
    socket,
    sent,
    get closes() {
      return closes;
    },
    get outputDelivered() {
      return outputDelivered;
    },
  };
}

async function executeScenario(scenario: Scenario, stream: boolean) {
  const server = fakeAppServer(scenario);
  const controller = new AbortController();
  const executor = new CodexAppServerExecutor({
    websocketFn: async () => server.socket,
    defaultTimeoutMs: 100,
  });
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const responseText = executor
      .execute({
        model: "gpt-6-luna",
        body: { input: "Reply OK" },
        stream,
        signal: controller.signal,
        credentials: {
          providerSpecificData: {
            codexAppServerUrl: "ws://fixture:1456",
            codexAppServerToken: "fixture-token",
          },
        },
      })
      .then((result) => result.response.text());
    const text = await Promise.race([
      responseText,
      new Promise<never>((_, reject) => {
        timer = setTimeout(
          () => reject(new Error("Turn did not settle after transport closed")),
          500
        );
      }),
    ]);
    await nextTick();
    return { text, server };
  } finally {
    clearTimeout(timer);
    controller.abort();
  }
}

function assertFailure(text: string, stream: boolean) {
  assert.ok(!text.includes("private-value"));
  assert.ok(!text.includes("/srv/private"));
  assert.ok(!text.includes("secret trace"));
  if (stream) {
    assert.equal((text.match(/event: response\.failed/g) ?? []).length, 1);
    assert.ok(!text.includes("event: response.completed"));
    assert.equal((text.match(/data: \[DONE\]/g) ?? []).length, 1);
  } else {
    assert.equal(JSON.parse(text).status, "failed");
  }
  assert.match(text, /codex_app_server_turn_failed/);
}

for (const stream of [true, false]) {
  const mode = stream ? "SSE" : "JSON";
  for (const scenario of ["normal", "retry"] as const) {
    test(`${mode}: ${scenario} waits for output after the turn ACK`, async () => {
      const { text, server } = await executeScenario(scenario, stream);
      assert.ok(server.outputDelivered, "the socket must remain open until output arrives");
      assert.match(text, /LATE-OK/);
      assert.ok(!text.includes("response.failed"));
      assert.ok(!text.includes("private-value"));
      if (stream) assert.equal((text.match(/event: response\.completed/g) ?? []).length, 1);
      else assert.equal(JSON.parse(text).status, "completed");
      assert.equal(server.closes, 1);
    });
  }
  for (const scenario of ["fatal", "close", "socket-error", "early-close"] as const) {
    test(`${mode}: ${scenario} settles exactly once without success`, async () => {
      const { text, server } = await executeScenario(scenario, stream);
      assertFailure(text, stream);
      assert.equal(server.closes, 1);
      if (scenario === "early-close") {
        assert.ok(
          !server.sent.some((frame) => frame.method === "turn/start"),
          "a disconnected thread must not start a new turn"
        );
      }
    });
  }
}
