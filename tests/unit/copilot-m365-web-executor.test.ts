import test from "node:test";
import assert from "node:assert/strict";

import {
  CopilotM365WebExecutor,
  __setCopilotM365WebSocketForTesting,
} from "../../open-sse/executors/copilot-m365-web.ts";
import { encodeFrame } from "../../open-sse/executors/copilot-m365-frames.ts";

type Listener = (...args: unknown[]) => void;

class MockM365WebSocket {
  static instances: MockM365WebSocket[] = [];
  static mode: "success" | "error" = "success";

  sent: string[] = [];
  closed = false;
  listeners = new Map<string, Listener[]>();

  constructor(
    public url: string,
    public options: unknown
  ) {
    MockM365WebSocket.instances.push(this);
    queueMicrotask(() => {
      if (MockM365WebSocket.mode === "error") {
        this.emit("error", new Error("upstream transport failed\nstack line"));
        return;
      }
      this.emit("open");
    });
  }

  on(event: string, listener: Listener): this {
    const listeners = this.listeners.get(event) ?? [];
    listeners.push(listener);
    this.listeners.set(event, listeners);
    return this;
  }

  send(data: string): void {
    this.sent.push(String(data));
    const parsed = JSON.parse(String(data).replace(/\x1e$/, ""));
    if (parsed.protocol === "json") {
      queueMicrotask(() => this.emit("message", Buffer.from(encodeFrame({}))));
      return;
    }
    if (parsed.type === 4 && parsed.target === "chat") {
      queueMicrotask(() => {
        this.emit(
          "message",
          Buffer.from(
            encodeFrame({
              type: 1,
              target: "update",
              arguments: [{ messages: [{ text: "In progress...", messageType: "Progress", author: "bot" }] }],
            }) +
              encodeFrame({
                type: 1,
                target: "update",
                arguments: [{ messages: [{ text: "po", author: "bot" }] }],
              }) +
              encodeFrame({
                type: 1,
                target: "update",
                arguments: [{ messages: [{ text: "pong", author: "bot" }], isLastUpdate: true }],
              }) +
              encodeFrame({ type: 2, invocationId: "0", item: { messages: [] } }) +
              encodeFrame({ type: 3, invocationId: "0" })
          )
        );
      });
    }
  }

  close(): void {
    this.closed = true;
  }

  emit(event: string, ...args: unknown[]): void {
    for (const listener of this.listeners.get(event) ?? []) {
      listener(...args);
    }
  }
}

function makeInput(stream = true) {
  return {
    model: "copilot-m365",
    stream,
    body: { messages: [{ role: "user", content: "Reply with exactly one word: pong" }] },
    credentials: {
      apiKey: "redacted-token",
      providerSpecificData: { chathubPath: "redacted-user@redacted-tenant" },
    },
  };
}

async function readBody(response: Response): Promise<string> {
  return await response.text();
}

test("CopilotM365WebExecutor streams OpenAI SSE chunks from accumulated M365 updates", async () => {
  MockM365WebSocket.instances = [];
  MockM365WebSocket.mode = "success";
  const restore = __setCopilotM365WebSocketForTesting(
    MockM365WebSocket as unknown as typeof import("ws").default
  );
  try {
    const executor = new CopilotM365WebExecutor();
    const result = await executor.execute(makeInput(true));
    const body = await readBody(result.response);

    assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");
    assert.match(result.url, /access_token=REDACTED/);
    assert.doesNotMatch(result.url, /redacted-token/);
    assert.equal(MockM365WebSocket.instances.length, 1);

    const sent = MockM365WebSocket.instances[0].sent.join("\n");
    assert.match(sent, /"protocol":"json"/);
    assert.match(sent, /"type":6/);
    assert.match(sent, /"target":"chat"/);

    const dataLines = body
      .split("\n")
      .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]");
    const payloads = dataLines.map((line) => JSON.parse(line.slice("data: ".length)));
    const deltas = payloads.map((payload) => payload.choices?.[0]?.delta?.content).filter(Boolean);
    const finishReasons = payloads.map((payload) => payload.choices?.[0]?.finish_reason).filter(Boolean);

    assert.deepEqual(deltas, ["po", "ng"]);
    assert.deepEqual(finishReasons, ["stop"]);
    assert.match(body, /data: \[DONE\]/);
    assert.doesNotMatch(body, /In progress/);
  } finally {
    restore();
  }
});

test("CopilotM365WebExecutor sanitizes WebSocket error SSE payloads", async () => {
  MockM365WebSocket.instances = [];
  MockM365WebSocket.mode = "error";
  const restore = __setCopilotM365WebSocketForTesting(
    MockM365WebSocket as unknown as typeof import("ws").default
  );
  try {
    const executor = new CopilotM365WebExecutor();
    const result = await executor.execute(makeInput(true));
    const body = await readBody(result.response);

    assert.match(body, /data: /);
    assert.match(body, /upstream transport failed/);
    assert.doesNotMatch(body, /stack line/);
    assert.doesNotMatch(body, /\nstack/);
  } finally {
    restore();
  }
});
