import test from "node:test";
import assert from "node:assert/strict";
import {
  MuseSparkWebExecutor,
  __resetMuseSparkConversationCacheForTesting,
  __setMuseSparkWebSocketForTesting,
} from "../../open-sse/executors/muse-spark-web.ts";
import { WebSocket } from "ws";

// ─── Mock WebSocket ──────────────────────────────────────────────────────────

type MockWsMessage = { data: string };

class MockWebSocket {
  static instances: MockWebSocket[] = [];
  onopen: (() => void) | null = null;
  onmessage: ((evt: MockWsMessage) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: ((evt: Error) => void) | null = null;
  readyState = WebSocket.CONNECTING;
  sentData: (Uint8Array | string)[] = [];
  url: string;

  constructor(url: string) {
    this.url = url;
    MockWebSocket.instances.push(this);
    setTimeout(() => {
      this.readyState = WebSocket.OPEN;
      this.onopen?.();
    }, 0);
  }

  send(data: Uint8Array | string) {
    this.sentData.push(data);
    // When a prompt frame (type 0x0d) is sent, simulate a response + close
    if (data instanceof Uint8Array && data.length > 0 && data[0] === 0x0d) {
      setTimeout(() => {
        this.onmessage?.({
          data: JSON.stringify({
            type: "full",
            response: {
              sections: [{ view_model: { primitive: { text: "pong" } } }],
            },
          }),
        });
        setTimeout(() => this.close(), 5);
      }, 5);
    }
  }

  close() {
    this.readyState = WebSocket.CLOSED;
    this.onclose?.();
  }
}

type ExecuteParams = Parameters<MuseSparkWebExecutor["execute"]>[0];

function makeBaseInput(overrides?: Partial<ExecuteParams>): ExecuteParams {
  return {
    model: "muse-spark",
    body: { messages: [{ role: "user", content: "ping" }] },
    stream: false,
    credentials: {
      apiKey: "ecto_1_sess=test123",
      connectionId: "conn-test-1",
      providerSpecificData: { authorization: "ecto1:test-auth-token" },
    },
    signal: null,
    log: null,
    upstreamExtraHeaders: undefined,
    ...overrides,
  } as ExecuteParams;
}

function withConnection(connectionId: string, overrides?: Partial<ExecuteParams>): ExecuteParams {
  return makeBaseInput({
    credentials: {
      apiKey: "ecto_1_sess=test123",
      connectionId,
      providerSpecificData: { authorization: "ecto1:test-auth-token" },
    },
    ...overrides,
  } as Partial<ExecuteParams>);
}

test("makeBaseInput nests connectionId override into credentials", () => {
  const input = makeBaseInput({
    credentials: { connectionId: "conn-distinct" },
  } as Partial<ExecuteParams>);
  assert.equal((input.credentials as { connectionId?: string }).connectionId, "conn-distinct");
});

// ─── Test 1: New conversation sends via WebSocket ────────────────────────────

test("muse-spark-web: new conversation sends via WebSocket", async () => {
  __resetMuseSparkConversationCacheForTesting();
  MockWebSocket.instances = [];
  const executor = new MuseSparkWebExecutor();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("{}", { status: 200 });

  const restore = __setMuseSparkWebSocketForTesting(MockWebSocket as unknown as typeof WebSocket);
  try {
    const result = await executor.execute(makeBaseInput());
    assert.equal(MockWebSocket.instances.length, 1, "one WebSocket was created");
    const ws = MockWebSocket.instances[0];
    assert.ok(ws.sentData.length >= 1, "at least one frame was sent");
    // First frame should be intro (type 0x0f)
    const firstFrame = ws.sentData[0];
    assert.ok(firstFrame instanceof Uint8Array, "first frame is binary");
    assert.equal(firstFrame[0], 0x0f, "first frame is intro frame");
    // Second frame should be prompt (type 0x0d)
    if (ws.sentData.length >= 2) {
      const secondFrame = ws.sentData[1];
      assert.ok(secondFrame instanceof Uint8Array, "second frame is binary");
      assert.equal(secondFrame[0], 0x0d, "second frame is prompt frame");
    }
    // Should get a 200 response with default text when WS returns nothing
    assert.equal(result.response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
});

// ─── Test 2: Follow-up turn reuses conversation via WebSocket ────────────────

test("muse-spark-web: follow-up turn reuses conversation via WebSocket", async () => {
  __resetMuseSparkConversationCacheForTesting();
  MockWebSocket.instances = [];
  const executor = new MuseSparkWebExecutor();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("{}", { status: 200 });

  const restore = __setMuseSparkWebSocketForTesting(MockWebSocket as unknown as typeof WebSocket);
  try {
    // Turn 1
    await executor.execute(withConnection("conn-cont"));
    // Turn 2 — caller sends history including prior assistant
    await executor.execute(
      withConnection("conn-cont", {
        body: {
          messages: [
            { role: "user", content: "ping" },
            { role: "assistant", content: "pong" },
            { role: "user", content: "ping again" },
          ],
        },
      })
    );
    // Continuation completed without error (both turns should succeed)
    assert.equal(MockWebSocket.instances.length, 2, "two WS connections made");
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
});

// ─── Test 3: Missing authorization returns 400 ────────────────────────────────

test("muse-spark-web: missing authorization returns 400", async () => {
  __resetMuseSparkConversationCacheForTesting();
  const executor = new MuseSparkWebExecutor();
  const result = await executor.execute(
    makeBaseInput({
      credentials: { apiKey: "ecto_1_sess=test123", connectionId: "conn-noauth" },
    })
  );
  assert.equal(result.response.status, 400);
  const body = await result.response.json();
  assert.match(body.error.message, /Authorization/);
});

// ─── Test 4: WS error returns error status ────────────────────────────────────

test("muse-spark-web: WebSocket error returns error status", async () => {
  __resetMuseSparkConversationCacheForTesting();
  const executor = new MuseSparkWebExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("{}", { status: 200 });

  class ErrorWs {
    onopen: (() => void) | null = null;
    onmessage: ((evt: MockWsMessage) => void) | null = null;
    onclose: (() => void) | null = null;
    onerror: ((evt: Error) => void) | null = null;
    readyState = WebSocket.CONNECTING;
    url: string;
    constructor(url: string) {
      this.url = url;
      setTimeout(() => this.onerror?.(new Error("fail")), 10);
    }
    send(_data: Uint8Array | string) {}
    close() {
      this.onclose?.();
    }
  }

  const restore = __setMuseSparkWebSocketForTesting(ErrorWs as unknown as typeof WebSocket);
  try {
    const result = await executor.execute(withConnection("conn-err"));
    assert.ok(
      result.response.status === 502 || result.response.status === 401,
      `Got error status: ${result.response.status}`
    );
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
});

// ─── Test 5: GraphQL error in 200 response is detected ─────────────────────

test("muse-spark-web: GraphQL error in 200 response is detected", async () => {
  __resetMuseSparkConversationCacheForTesting();
  MockWebSocket.instances = [];
  const executor = new MuseSparkWebExecutor();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ errors: [{ message: "Unknown type 'AttachmentInput'" }] }), {
      status: 200,
    });

  const restore = __setMuseSparkWebSocketForTesting(MockWebSocket as unknown as typeof WebSocket);
  try {
    const result = await executor.execute(withConnection("conn-gql-err"));
    assert.equal(result.response.status, 502);
    const body = await result.response.json();
    assert.match(body.error.message, /AttachmentInput/);
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
});

test("muse-spark-web: fetch failures do not expose stack traces or source paths", async () => {
  __resetMuseSparkConversationCacheForTesting();
  const executor = new MuseSparkWebExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("socket failed at /srv/omniroute/secrets.ts:42\n    at fetchGraphql");
  };

  try {
    const result = await executor.execute(withConnection("conn-fetch-error"));
    assert.equal(result.response.status, 502);
    const body = await result.response.json();
    assert.equal(body.error.message, "Warmup fetch failed: socket failed at <path>");
    assert.doesNotMatch(body.error.message, /secrets\.ts|fetchGraphql|\n/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
