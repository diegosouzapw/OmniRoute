import test from "node:test";
import assert from "node:assert/strict";

import {
  MuseSparkWebExecutor,
  __resetMuseSparkConversationCacheForTesting,
} from "../../open-sse/executors/muse-spark-web.ts";

// Canned Meta AI response shape. parseMetaAiResponseText accepts either a
// plain JSON body or an SSE stream of `data: <json>` frames; we send a plain
// JSON body since the assertions don't care about delta structure.
function metaAiSseResponse(content: string): Response {
  const body = JSON.stringify({
    data: {
      sendMessageStream: {
        __typename: "AssistantMessage",
        content,
      },
    },
  });
  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

type CapturedRequest = { url: string; init: RequestInit | undefined; body: unknown };

function captureFetch(reply: () => Response): {
  fetchFn: typeof fetch;
  captured: CapturedRequest[];
} {
  const captured: CapturedRequest[] = [];
  const fetchFn: typeof fetch = async (input, init) => {
    let body: unknown = undefined;
    if (init?.body && typeof init.body === "string") {
      try {
        body = JSON.parse(init.body);
      } catch {
        body = init.body;
      }
    }
    captured.push({
      url: typeof input === "string" ? input : (input as URL).toString(),
      init,
      body,
    });
    return reply();
  };
  return { fetchFn, captured };
}

function executeInputs(messages: Array<{ role: string; content: string }>) {
  return {
    model: "muse-spark",
    body: { messages },
    stream: false,
    credentials: { apiKey: "abra_sess=foo", connectionId: "conn-test-1" },
    signal: null,
    log: null,
    upstreamExtraHeaders: undefined,
  } as Parameters<MuseSparkWebExecutor["execute"]>[0];
}

test("muse-spark-web: first turn opens a new meta.ai conversation", async () => {
  __resetMuseSparkConversationCacheForTesting();
  const executor = new MuseSparkWebExecutor();
  const original = globalThis.fetch;
  const { fetchFn, captured } = captureFetch(() => metaAiSseResponse("pong"));
  globalThis.fetch = fetchFn;
  try {
    const result = await executor.execute(executeInputs([{ role: "user", content: "ping" }]));
    assert.equal(captured.length, 1, "exactly one upstream call");
    const sentVars = (captured[0].body as { variables: Record<string, unknown> }).variables;
    assert.equal(sentVars.isNewConversation, true, "first turn → isNewConversation: true");
    assert.equal(sentVars.content, "ping", "first turn → bare user content");
    assert.match(String(sentVars.conversationId), /^c\./, "fresh meta.ai conversation id");
    assert.equal(result.response.status, 200);
  } finally {
    globalThis.fetch = original;
  }
});

test("muse-spark-web: follow-up turn continues the cached conversation", async () => {
  __resetMuseSparkConversationCacheForTesting();
  const executor = new MuseSparkWebExecutor();
  const original = globalThis.fetch;
  let nthReply = 0;
  const { fetchFn, captured } = captureFetch(() =>
    metaAiSseResponse(nthReply++ === 0 ? "pong" : "pong-again")
  );
  globalThis.fetch = fetchFn;
  try {
    // Turn 1
    await executor.execute(executeInputs([{ role: "user", content: "ping" }]));
    // Turn 2 — caller sends the OpenAI history including the prior assistant.
    await executor.execute(
      executeInputs([
        { role: "user", content: "ping" },
        { role: "assistant", content: "pong" },
        { role: "user", content: "ping again" },
      ])
    );
    assert.equal(captured.length, 2, "two upstream calls");
    const turn1 = (captured[0].body as { variables: Record<string, unknown> }).variables;
    const turn2 = (captured[1].body as { variables: Record<string, unknown> }).variables;
    assert.equal(turn1.isNewConversation, true);
    assert.equal(turn2.isNewConversation, false, "second turn → continues");
    assert.equal(
      turn2.conversationId,
      turn1.conversationId,
      "second turn reuses first turn's conversation id"
    );
    assert.equal(turn2.content, "ping again", "second turn → only the latest user content");
  } finally {
    globalThis.fetch = original;
  }
});

test("muse-spark-web: connection isolation — different connectionId → independent conversations", async () => {
  __resetMuseSparkConversationCacheForTesting();
  const executor = new MuseSparkWebExecutor();
  const original = globalThis.fetch;
  const { fetchFn, captured } = captureFetch(() => metaAiSseResponse("pong"));
  globalThis.fetch = fetchFn;
  try {
    const baseInputs = (id: string) => ({
      model: "muse-spark",
      body: {
        messages: [
          { role: "user", content: "ping" },
          { role: "assistant", content: "pong" },
          { role: "user", content: "again" },
        ],
      },
      stream: false,
      credentials: { apiKey: "abra_sess=foo", connectionId: id },
      signal: null,
      log: null,
      upstreamExtraHeaders: undefined,
    });
    // Two different connections both have the same OpenAI history with the
    // same prior assistant content. They must not collide on the cache.
    await executor.execute(baseInputs("conn-A") as Parameters<MuseSparkWebExecutor["execute"]>[0]);
    await executor.execute(baseInputs("conn-B") as Parameters<MuseSparkWebExecutor["execute"]>[0]);
    const a = (captured[0].body as { variables: Record<string, unknown> }).variables;
    const b = (captured[1].body as { variables: Record<string, unknown> }).variables;
    assert.equal(a.isNewConversation, true);
    assert.equal(b.isNewConversation, true);
    assert.notEqual(a.conversationId, b.conversationId);
  } finally {
    globalThis.fetch = original;
  }
});

test("muse-spark-web: meta error during continuation evicts the stale cache entry", async () => {
  __resetMuseSparkConversationCacheForTesting();
  const executor = new MuseSparkWebExecutor();
  const original = globalThis.fetch;

  // Reply 1: success. Reply 2: HTTP 400 (e.g. Meta deleted the conversation).
  // Reply 3: success again — cache must have been evicted, so this turn
  // should open a fresh conversation, not reuse the dead one.
  let n = 0;
  const fetchFn: typeof fetch = async () => {
    n++;
    if (n === 2) {
      return new Response(JSON.stringify({ errors: [{ message: "conversation not found" }] }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    return metaAiSseResponse(n === 1 ? "pong" : "pong-2");
  };
  const captured: CapturedRequest[] = [];
  globalThis.fetch = (async (input, init) => {
    let body: unknown = undefined;
    if (init?.body && typeof init.body === "string") {
      try {
        body = JSON.parse(init.body);
      } catch {
        body = init.body;
      }
    }
    captured.push({
      url: typeof input === "string" ? input : (input as URL).toString(),
      init,
      body,
    });
    return fetchFn(input as never, init as never);
  }) as typeof fetch;

  try {
    // Turn 1 — opens conversation A and caches it.
    await executor.execute(executeInputs([{ role: "user", content: "ping" }]));
    // Turn 2 — would continue conversation A but Meta returns 400.
    await executor.execute(
      executeInputs([
        { role: "user", content: "ping" },
        { role: "assistant", content: "pong" },
        { role: "user", content: "again" },
      ])
    );
    // Turn 3 — same prior-assistant content, retried by the user. Cache
    // should have been evicted on turn 2, so this turn opens a new
    // conversation rather than re-trying the dead one.
    await executor.execute(
      executeInputs([
        { role: "user", content: "ping" },
        { role: "assistant", content: "pong" },
        { role: "user", content: "again" },
      ])
    );
    const t1 = (captured[0].body as { variables: Record<string, unknown> }).variables;
    const t2 = (captured[1].body as { variables: Record<string, unknown> }).variables;
    const t3 = (captured[2].body as { variables: Record<string, unknown> }).variables;
    assert.equal(t1.isNewConversation, true);
    assert.equal(t2.isNewConversation, false, "turn 2 attempted to continue");
    assert.equal(t2.conversationId, t1.conversationId);
    assert.equal(
      t3.isNewConversation,
      true,
      "turn 3 must open a fresh conversation after the stale entry was evicted"
    );
    assert.notEqual(
      t3.conversationId,
      t1.conversationId,
      "turn 3 must not reuse the dead conversation id"
    );
  } finally {
    globalThis.fetch = original;
  }
});

test("muse-spark-web: parallel chats with identical assistant text but different histories do not collide", async () => {
  __resetMuseSparkConversationCacheForTesting();
  const executor = new MuseSparkWebExecutor();
  const original = globalThis.fetch;

  // Both chats end with the assistant saying the same generic line. Without
  // hashing the preceding history, both would map to the same cache entry
  // and the second chat's continuation would route into the first chat's
  // meta.ai conversation.
  const COMMON_REPLY = "I don't have access to real-time data.";
  const { fetchFn, captured } = captureFetch(() => metaAiSseResponse(COMMON_REPLY));
  globalThis.fetch = fetchFn;
  try {
    // Chat A — turn 1 sets up the cache.
    await executor.execute(executeInputs([{ role: "user", content: "what's the weather" }]));
    // Chat B — turn 1 (different question, same response) sets up its own cache entry.
    await executor.execute(executeInputs([{ role: "user", content: "stock price for AAPL" }]));
    const a1 = (captured[0].body as { variables: Record<string, unknown> }).variables;
    const b1 = (captured[1].body as { variables: Record<string, unknown> }).variables;

    // Chat A — turn 2 should continue conversation A, not jump to B's id.
    await executor.execute(
      executeInputs([
        { role: "user", content: "what's the weather" },
        { role: "assistant", content: COMMON_REPLY },
        { role: "user", content: "any forecast at all?" },
      ])
    );
    // Chat B — turn 2 should continue conversation B.
    await executor.execute(
      executeInputs([
        { role: "user", content: "stock price for AAPL" },
        { role: "assistant", content: COMMON_REPLY },
        { role: "user", content: "any market info at all?" },
      ])
    );
    const a2 = (captured[2].body as { variables: Record<string, unknown> }).variables;
    const b2 = (captured[3].body as { variables: Record<string, unknown> }).variables;

    assert.equal(a2.isNewConversation, false, "chat A turn 2 continues");
    assert.equal(b2.isNewConversation, false, "chat B turn 2 continues");
    assert.equal(a2.conversationId, a1.conversationId, "chat A continues into A's conversation");
    assert.equal(b2.conversationId, b1.conversationId, "chat B continues into B's conversation");
    assert.notEqual(
      a2.conversationId,
      b2.conversationId,
      "the two chats must not collide despite identical assistant text"
    );
  } finally {
    globalThis.fetch = original;
  }
});

test("muse-spark-web: empty latestUserContent (no `user` role) falls back to fresh conversation", async () => {
  __resetMuseSparkConversationCacheForTesting();
  const executor = new MuseSparkWebExecutor();
  const original = globalThis.fetch;
  const { fetchFn, captured } = captureFetch(() => metaAiSseResponse("ack"));
  globalThis.fetch = fetchFn;
  try {
    // Pre-seed the cache with a normal turn so a hit IS possible if the
    // guard isn't in place.
    await executor.execute(executeInputs([{ role: "user", content: "ping" }]));

    // Now send a payload with no `user` role at all (system + assistant
    // only). `latestUserContent` is empty; without the guard the executor
    // would route this through the cache-hit path and POST empty content
    // with `isNewConversation: false`.
    await executor.execute(
      executeInputs([
        { role: "system", content: "you are helpful" },
        { role: "assistant", content: "ack" },
      ])
    );
    const t2 = (captured[1].body as { variables: Record<string, unknown> }).variables;

    assert.equal(
      t2.isNewConversation,
      true,
      "empty latestUserContent must NOT use the cache-hit path"
    );
    assert.notEqual(t2.content, "", "must not POST empty content");
    assert.match(
      String(t2.content),
      /assistant: ack/,
      "should fall through to the folded-history prompt"
    );
  } finally {
    globalThis.fetch = original;
  }
});
