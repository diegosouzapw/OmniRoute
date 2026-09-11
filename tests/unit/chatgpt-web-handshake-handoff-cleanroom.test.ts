import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  buildChatGptWebSubscribeCommand,
  ChatGptWebHandshakeState,
  ChatGptWebTopicStream,
  parseChatGptWebConversationHandoff,
} from "../../open-sse/utils/chatgptWebTransport.ts";

const SENTINEL = {
  chatRequirementsToken: "sentinel-final-token",
  proofToken: "proof-answer",
  turnstileToken: "turnstile-answer",
  expiresAtMs: 20_000,
};

function streamMessage(
  topicId: string,
  streamItemId: string,
  encodedItem: string,
  parentStreamItemId: string | null = null
) {
  return {
    type: "message",
    topic_id: topicId,
    offset: "offset-redacted",
    payload: {
      type: "conversation-turn-stream",
      metadata: null,
      payload: {
        type: "stream-item",
        stream_item_id: streamItemId,
        parent_stream_item_id: parentStreamItemId,
        encoded_item: encodedItem,
      },
    },
  };
}

describe("ChatGPT Web clean-room handshake state", () => {
  test("binds the finalized Sentinel answers and latest conduit token to one dispatch", () => {
    const state = new ChatGptWebHandshakeState();
    state.setSentinel(SENTINEL);
    state.setConduit("conduit-old");
    state.setConduit("conduit-current");

    assert.deepEqual(state.consumeConversationHeaders("turn-trace", 10_000), {
      "openai-sentinel-chat-requirements-token": "sentinel-final-token",
      "openai-sentinel-proof-token": "proof-answer",
      "openai-sentinel-turnstile-token": "turnstile-answer",
      "x-conduit-token": "conduit-current",
      "x-oai-turn-trace-id": "turn-trace",
    });
    assert.throws(() => state.consumeConversationHeaders("replayed-turn", 10_001), /incomplete/);
  });

  test("fails closed when Sentinel artifacts are expired or empty", () => {
    const state = new ChatGptWebHandshakeState();
    assert.throws(() => state.setSentinel({ ...SENTINEL, proofToken: "" }), /non-empty proofToken/);

    state.setSentinel(SENTINEL);
    state.setConduit("conduit-token");
    assert.throws(() => state.consumeConversationHeaders("turn-trace", 20_000), /expired/);
    assert.throws(() => state.consumeConversationHeaders("turn-trace", 19_000), /incomplete/);
  });
});

describe("ChatGPT Web clean-room SSE to WebSocket handoff", () => {
  test("parses the resume token and common topic from the handoff SSE", () => {
    const handoff = parseChatGptWebConversationHandoff(
      'data: {"type":"resume_conversation_token","kind":"topic",' +
        '"token":"resume-token","conversation_id":"conversation"}\n\n' +
        'data: {"type":"stream_handoff","conversation_id":"conversation",' +
        '"turn_exchange_id":"turn","options":[' +
        '{"type":"resume_sse_endpoint","topic_id":"topic"},' +
        '{"type":"subscribe_ws_topic","topic_id":"topic"}]}\n\n' +
        "data: [DONE]\n\n"
    );

    assert.deepEqual(handoff, {
      conversationId: "conversation",
      turnExchangeId: "turn",
      topicId: "topic",
      resumeToken: "resume-token",
    });
  });

  test("rejects incomplete or internally inconsistent handoffs", () => {
    assert.throws(
      () =>
        parseChatGptWebConversationHandoff(
          'data: {"type":"stream_handoff","conversation_id":"conversation",' +
            '"turn_exchange_id":"turn","options":[' +
            '{"type":"resume_sse_endpoint","topic_id":"topic-a"},' +
            '{"type":"subscribe_ws_topic","topic_id":"topic-b"}]}\n\n'
        ),
      /topic mismatch/
    );
  });

  test("builds the observed array-framed subscribe command", () => {
    assert.equal(
      buildChatGptWebSubscribeCommand(7, "topic", "offset"),
      '[{"id":7,"command":{"type":"subscribe","topic_id":"topic","offset":"offset"}}]'
    );
  });

  test("deduplicates catch-up/live overlap and ignores unrelated topics", () => {
    const stream = new ChatGptWebTopicStream("topic");
    const first = stream.ingestFrame(
      JSON.stringify([
        {
          type: "reply",
          id: 7,
          reply: {
            type: "subscribe",
            topic_id: "topic",
            recovered: true,
            catchups: [streamMessage("topic", "item-1", "event: delta\\n")],
          },
        },
      ])
    );
    assert.deepEqual(first, {
      encodedItems: ["event: delta\\n"],
      lifecycleTypes: [],
      done: false,
    });

    const second = stream.ingestFrame(
      JSON.stringify([
        streamMessage("topic", "item-1", "duplicate"),
        streamMessage("other-topic", "item-other", "ignored"),
        streamMessage("topic", "item-2", "data: [DONE]\n\n", "item-1"),
      ])
    );
    assert.deepEqual(second, {
      encodedItems: ["data: [DONE]\n\n"],
      lifecycleTypes: [],
      done: false,
    });

    const third = stream.ingestFrame(
      JSON.stringify([
        {
          type: "message",
          topic_id: "topic",
          payload: {
            type: "conversation-turn-stream",
            payload: { type: "done", conversation_id: "redacted" },
          },
        },
        {
          type: "message",
          topic_id: "topic",
          payload: { type: "conversation-turn-complete", payload: {} },
        },
      ])
    );
    assert.deepEqual(third, {
      encodedItems: [],
      lifecycleTypes: ["conversation-turn-complete"],
      done: true,
    });
  });
});
