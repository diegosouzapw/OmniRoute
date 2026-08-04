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

/**
 * Decode the conversationId Meta AI sees for a turn. The WS intro frame
 * (type 0x0f, 6-byte header + JSON payload) carries it in the clear, so we
 * don't need to touch the protobuf-encoded prompt frame to observe which
 * conversation a turn actually used.
 */
function decodeIntroConversationId(ws: MockWebSocket): string {
  const frame = ws.sentData[0];
  assert.ok(frame instanceof Uint8Array && frame[0] === 0x0f, "first frame is the intro frame");
  const json = JSON.parse(new TextDecoder().decode((frame as Uint8Array).slice(6)));
  return json["x-dgw-app-x-ecto-conversation-id"];
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

// ─── Test 6: Connection isolation — cache key includes connectionId ─────────

test("muse-spark-web: two connections with identical history get independent conversations", async () => {
  __resetMuseSparkConversationCacheForTesting();
  MockWebSocket.instances = [];
  const executor = new MuseSparkWebExecutor();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("{}", { status: 200 });

  const restore = __setMuseSparkWebSocketForTesting(MockWebSocket as unknown as typeof WebSocket);
  try {
    const continuationBody = {
      messages: [
        { role: "user", content: "ping" },
        { role: "assistant", content: "pong" },
        { role: "user", content: "ping again" },
      ],
    };

    await executor.execute(withConnection("conn-iso-A"));
    const convA1 = decodeIntroConversationId(MockWebSocket.instances.at(-1) as MockWebSocket);

    await executor.execute(withConnection("conn-iso-B"));
    const convB1 = decodeIntroConversationId(MockWebSocket.instances.at(-1) as MockWebSocket);

    await executor.execute(withConnection("conn-iso-A", { body: continuationBody }));
    const convA2 = decodeIntroConversationId(MockWebSocket.instances.at(-1) as MockWebSocket);

    await executor.execute(withConnection("conn-iso-B", { body: continuationBody }));
    const convB2 = decodeIntroConversationId(MockWebSocket.instances.at(-1) as MockWebSocket);

    assert.equal(convA2, convA1, "conn A's continuation reuses conn A's own conversation");
    assert.equal(convB2, convB1, "conn B's continuation reuses conn B's own conversation");
    assert.notEqual(
      convB2,
      convA1,
      "conn B's continuation must not resurrect conn A's conversationId " +
        "even though both connections share identical history text"
    );
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
});

// ─── Test 7: Cache eviction on failure — dead entry isn't reused ─────────────

class FailingWebSocket {
  onopen: (() => void) | null = null;
  onmessage: ((evt: MockWsMessage) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: ((evt: Error) => void) | null = null;
  readyState = WebSocket.CONNECTING;
  url: string;
  constructor(url: string) {
    this.url = url;
    setTimeout(() => this.onerror?.(new Error("upstream dropped the connection")), 10);
  }
  send(_data: Uint8Array | string) {}
  close() {
    this.onclose?.();
  }
}

test("muse-spark-web: WS failure during continuation evicts the cache so the next turn opens a new conversation", async () => {
  __resetMuseSparkConversationCacheForTesting();
  MockWebSocket.instances = [];
  const executor = new MuseSparkWebExecutor();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("{}", { status: 200 });

  const continuationBody = {
    messages: [
      { role: "user", content: "ping" },
      { role: "assistant", content: "pong" },
      { role: "user", content: "ping again" },
    ],
  };

  let restore = __setMuseSparkWebSocketForTesting(MockWebSocket as unknown as typeof WebSocket);
  try {
    // Turn 1: new conversation succeeds and gets cached for continuation.
    await executor.execute(withConnection("conn-evict"));
    const conv1 = decodeIntroConversationId(MockWebSocket.instances.at(-1) as MockWebSocket);

    // Turn 2: same history is recognized as a continuation (cache hit), but
    // the WS connection fails — this must evict the dead cache entry.
    restore();
    restore = __setMuseSparkWebSocketForTesting(FailingWebSocket as unknown as typeof WebSocket);
    const failResult = await executor.execute(
      withConnection("conn-evict", { body: continuationBody })
    );
    assert.ok(
      failResult.response.status === 502 || failResult.response.status === 401,
      `turn 2 fails as expected: ${failResult.response.status}`
    );

    // Turn 3: identical continuation history. If eviction had not happened,
    // this would reuse the dead conv1 conversationId (still within TTL).
    restore();
    restore = __setMuseSparkWebSocketForTesting(MockWebSocket as unknown as typeof WebSocket);
    await executor.execute(withConnection("conn-evict", { body: continuationBody }));
    const conv3 = decodeIntroConversationId(MockWebSocket.instances.at(-1) as MockWebSocket);

    assert.notEqual(
      conv3,
      conv1,
      "a failed continuation must evict the cache — the next identical-history " +
        "turn should open a brand new conversation, not resurrect the dead one"
    );
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
});

// ─── Test 8: Parallel chats with identical assistant text don't collide ─────

test("muse-spark-web: parallel chats with identical assistant replies don't collide in the cache", async () => {
  __resetMuseSparkConversationCacheForTesting();
  MockWebSocket.instances = [];
  const executor = new MuseSparkWebExecutor();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("{}", { status: 200 });

  const restore = __setMuseSparkWebSocketForTesting(MockWebSocket as unknown as typeof WebSocket);
  try {
    // Same connectionId, two independent chat threads. The mock WS always
    // answers "pong", so both threads' cached prefixes end in identical
    // assistant text — only the differing question text keeps them apart.
    await executor.execute(
      withConnection("conn-parallel", { body: { messages: [{ role: "user", content: "tell me a joke" }] } })
    );
    const convX1 = decodeIntroConversationId(MockWebSocket.instances.at(-1) as MockWebSocket);

    await executor.execute(
      withConnection("conn-parallel", {
        body: { messages: [{ role: "user", content: "what's the weather" }] },
      })
    );
    const convY1 = decodeIntroConversationId(MockWebSocket.instances.at(-1) as MockWebSocket);

    await executor.execute(
      withConnection("conn-parallel", {
        body: {
          messages: [
            { role: "user", content: "tell me a joke" },
            { role: "assistant", content: "pong" },
            { role: "user", content: "tell me another" },
          ],
        },
      })
    );
    const convX2 = decodeIntroConversationId(MockWebSocket.instances.at(-1) as MockWebSocket);

    await executor.execute(
      withConnection("conn-parallel", {
        body: {
          messages: [
            { role: "user", content: "what's the weather" },
            { role: "assistant", content: "pong" },
            { role: "user", content: "and tomorrow" },
          ],
        },
      })
    );
    const convY2 = decodeIntroConversationId(MockWebSocket.instances.at(-1) as MockWebSocket);

    assert.equal(convX2, convX1, "the joke thread continues its own conversation");
    assert.equal(convY2, convY1, "the weather thread continues its own conversation");
    assert.notEqual(
      convX2,
      convY2,
      "identical assistant text ('pong') must not make the two threads collide — " +
        "the cache key hashes the full history, not just the last response"
    );
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
});

// ─── Test 9: Empty user-content guard — no user turn falls through to a new conversation ─

test("muse-spark-web: history with no user-role message never reuses a cached conversation", async () => {
  __resetMuseSparkConversationCacheForTesting();
  MockWebSocket.instances = [];
  const executor = new MuseSparkWebExecutor();

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("{}", { status: 200 });

  const restore = __setMuseSparkWebSocketForTesting(MockWebSocket as unknown as typeof WebSocket);
  try {
    // Turn A: an assistant-only payload (no user role anywhere). This still
    // succeeds via the folded prompt and gets written to the cache under a
    // prefix that itself has no user role — a write-side entry the guard
    // must never let a future turn read back into a "continuation".
    await executor.execute(
      withConnection("conn-empty-guard", {
        body: { messages: [{ role: "assistant", content: "prefill" }] },
      })
    );
    const convA = decodeIntroConversationId(MockWebSocket.instances.at(-1) as MockWebSocket);

    // Turn B: the exact prefix cached by turn A ([assistant:"prefill",
    // assistant:"pong"]), still with zero user-role messages. Without the
    // `latestUserContent` guard this would hit turn A's cache entry and POST
    // empty content with isNewConversation:false.
    const resultB = await executor.execute(
      withConnection("conn-empty-guard", {
        body: {
          messages: [
            { role: "assistant", content: "prefill" },
            { role: "assistant", content: "pong" },
          ],
        },
      })
    );
    const convB = decodeIntroConversationId(MockWebSocket.instances.at(-1) as MockWebSocket);

    assert.equal(resultB.response.status, 200, "the assistant-only turn still succeeds");
    assert.notEqual(
      convB,
      convA,
      "a history with no user-role message must never be treated as a cache hit, " +
        "even when its prefix matches a previously written entry"
    );
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
});

test("muse-spark-web: fetch failures do not expose stack traces or source paths", async () => {
  __resetMuseSparkConversationCacheForTesting();
  const executor = new MuseSparkWebExecutor();
  const originalFetch = globalThis.fetch;
  const errorLogs: string[] = [];
  globalThis.fetch = async () => {
    throw new Error("socket failed at /srv/omniroute/secrets.ts:42\n    at fetchGraphql");
  };

  try {
    const result = await executor.execute(
      withConnection("conn-fetch-error", {
        log: {
          error(_tag, message) {
            errorLogs.push(message);
          },
        },
      })
    );
    assert.equal(result.response.status, 502);
    const body = await result.response.json();
    assert.equal(body.error.message, "Warmup fetch failed: socket failed at <path>");
    assert.doesNotMatch(body.error.message, /secrets\.ts|fetchGraphql|\n/);
    assert.deepEqual(errorLogs, ["Warmup failed: Warmup fetch failed: socket failed at <path>"]);
    assert.doesNotMatch(errorLogs[0], /secrets\.ts|fetchGraphql|\n/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
