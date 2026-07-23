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
  sent: string[] = [];
  closed = false;
  listeners = new Map<string, Listener[]>();

  constructor(public url: string, public options: unknown) {
    MockM365WebSocket.instances.push(this);
    queueMicrotask(() => this.emit("open"));
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
              arguments: [{ messages: [{ text: "hi", author: "bot" }], isLastUpdate: true }],
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
    for (const listener of this.listeners.get(event) ?? []) listener(...args);
  }
}

async function sendChatInvocation(tier: string | undefined) {
  MockM365WebSocket.instances = [];
  const restore = __setCopilotM365WebSocketForTesting(
    MockM365WebSocket as unknown as typeof import("ws").default
  );
  try {
    const executor = new CopilotM365WebExecutor();
    await executor.execute({
      model: "copilot-m365",
      stream: true,
      body: { messages: [{ role: "user", content: "hello" }] },
      credentials: {
        apiKey: "redacted-token",
        providerSpecificData: {
          chathubPath: "redacted-user@redacted-tenant",
          ...(tier ? { tier } : {}),
        },
      },
    } as never);

    assert.equal(MockM365WebSocket.instances.length, 1);
    const sentFrames = MockM365WebSocket.instances[0].sent;
    const chatFrameRaw = sentFrames
      .map((f) => f.replace(/\x1e$/, ""))
      .map((f) => {
        try {
          return JSON.parse(f);
        } catch {
          return null;
        }
      })
      .find((f) => f && f.type === 4 && f.target === "chat");

    assert.ok(chatFrameRaw, "expected a type:4 chat invocation frame to be sent");
    return chatFrameRaw.arguments[0] as Record<string, unknown>;
  } finally {
    restore();
  }
}

test("#7870: enterprise-tier chat invocation must not carry the consumer enable_msa_user optionsSet", async () => {
  const invocationArgs = await sendChatInvocation("enterprise");
  const optionsSets = invocationArgs.optionsSets as string[];
  assert.ok(
    !optionsSets.includes("enable_msa_user"),
    `enterprise-tier invocation must not declare enable_msa_user (MSA/consumer flag); got optionsSets=${JSON.stringify(optionsSets)}`
  );
});

test("#7870: enterprise-tier chat invocation declares the enterprise_flux_work option set", async () => {
  const invocationArgs = await sendChatInvocation("enterprise");
  const optionsSets = invocationArgs.optionsSets as string[];
  assert.ok(
    optionsSets.includes("enterprise_flux_work"),
    `expected enterprise_flux_work in optionsSets, got=${JSON.stringify(optionsSets)}`
  );
});

test("#7870: enterprise-tier chat invocation widens allowedMessageTypes to include ReferencesListComplete", async () => {
  const invocationArgs = await sendChatInvocation("enterprise");
  const allowedMessageTypes = invocationArgs.allowedMessageTypes as string[];
  assert.ok(
    allowedMessageTypes.includes("ReferencesListComplete"),
    `expected ReferencesListComplete in allowedMessageTypes, got=${JSON.stringify(allowedMessageTypes)}`
  );
});

test("#7870: enterprise-tier chat invocation defaults tone to Magic", async () => {
  const invocationArgs = await sendChatInvocation("enterprise");
  assert.equal(invocationArgs.tone, "Magic");
});

test("#7870: individual (no tier) chat invocation payload stays byte-identical to today", async () => {
  const invocationArgs = await sendChatInvocation(undefined);
  const optionsSets = invocationArgs.optionsSets as string[];
  assert.ok(optionsSets.includes("enable_msa_user"));
  assert.equal(invocationArgs.tone, "");
  assert.deepEqual(invocationArgs.allowedMessageTypes, [
    "Chat",
    "Suggestion",
    "InternalSearchQuery",
    "Disengaged",
    "InternalLoaderMessage",
    "Progress",
    "GeneratedCode",
    "RenderCardRequest",
    "AdsQuery",
    "SemanticSerp",
    "GenerateContentQuery",
  ]);
});

test("#7870: EDU-tier chat invocation payload stays byte-identical to today (unaffected by enterprise change)", async () => {
  const invocationArgs = await sendChatInvocation("edu");
  const optionsSets = invocationArgs.optionsSets as string[];
  assert.ok(optionsSets.includes("enable_msa_user"));
  assert.equal(invocationArgs.tone, "");
});
