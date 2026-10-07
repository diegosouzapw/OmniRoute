import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  PlaywrightChatGptWebBrowserSession,
  runChatGptWebBrowserTurn,
  type ChatGptWebBrowserSession,
  type ChatGptWebBrowserSessionHandlers,
} from "../../open-sse/utils/chatgptWebBrowserSession.ts";

const HANDOFF_SSE =
  'data: {"type":"resume_conversation_token","kind":"topic",' +
  '"token":"resume-token","conversation_id":"conversation"}\n\n' +
  'data: {"type":"stream_handoff","conversation_id":"conversation",' +
  '"turn_exchange_id":"turn","options":[' +
  '{"type":"resume_sse_endpoint","topic_id":"topic"},' +
  '{"type":"subscribe_ws_topic","topic_id":"topic"}]}\n\n' +
  "data: [DONE]\n\n";

function streamItem(id: string, encodedItem: string, topicId = "topic"): string {
  return JSON.stringify([
    {
      type: "message",
      topic_id: topicId,
      payload: {
        type: "conversation-turn-stream",
        payload: {
          type: "stream-item",
          stream_item_id: id,
          parent_stream_item_id: null,
          encoded_item: encodedItem,
        },
      },
    },
  ]);
}

function doneFrame(topicId = "topic"): string {
  return JSON.stringify([
    {
      type: "message",
      topic_id: topicId,
      payload: {
        type: "conversation-turn-stream",
        payload: { type: "done" },
      },
    },
  ]);
}

class FakeBrowserSession implements ChatGptWebBrowserSession {
  handlers: ChatGptWebBrowserSessionHandlers | null = null;
  submittedPrompt = "";
  cleanupCount = 0;

  constructor(
    private readonly execute: (handlers: ChatGptWebBrowserSessionHandlers) => void,
    private readonly sessionUrl = "https://chatgpt.com/?temporary-chat=true",
    private readonly renderedAssistantText: string | null = null
  ) {}

  url(): string {
    return this.sessionUrl;
  }

  async start(handlers: ChatGptWebBrowserSessionHandlers): Promise<() => Promise<void>> {
    this.handlers = handlers;
    return async () => {
      this.cleanupCount += 1;
    };
  }

  async submitPrompt(request: { prompt: string }): Promise<void> {
    this.submittedPrompt = request.prompt;
    if (!this.handlers) throw new Error("session not started");
    this.execute(this.handlers);
  }

  async readRenderedAssistantText(): Promise<string | null> {
    return this.renderedAssistantText;
  }
}

describe("ChatGPT Web clean-room browser-owned session", () => {
  test("decodes a direct first-party conversation response without DOM or WebSocket handoff", async () => {
    const directSse =
      'event: delta_encoding\ndata: "v1"\n\n' +
      'event: delta\ndata: {"p":"","o":"add","v":{"message":{' +
      '"id":"assistant-message","author":{"role":"assistant"},' +
      '"content":{"content_type":"text","parts":["DIRECT_OK"]},' +
      '"status":"finished_successfully","end_turn":true}}}\n\n' +
      'data: {"type":"message_stream_complete","conversation_id":"conversation"}\n\n' +
      "data: [DONE]\n\n";
    let submitted: unknown = null;
    const session = {
      url: () => "https://chatgpt.com/?temporary-chat=true",
      start: async () => async () => {},
      submitPrompt: async (request: unknown) => {
        submitted = request;
        return directSse;
      },
    } satisfies ChatGptWebBrowserSession;

    const result = await runChatGptWebBrowserTurn(session, {
      prompt: "direct prompt",
      attachments: [],
      timeoutMs: 1_000,
    });

    assert.equal((submitted as { prompt: string }).prompt, "direct prompt");
    assert.deepEqual((submitted as { attachments: unknown[] }).attachments, []);
    assert.ok((submitted as { signal: AbortSignal }).signal instanceof AbortSignal);
    assert.equal(result.text, "DIRECT_OK");
    assert.equal(result.conversationId, "conversation");
  });

  test("buffers WebSocket frames until handoff and returns only decoded output", async () => {
    const root =
      'event: delta_encoding\ndata: "v1"\n\n' +
      'event: delta\ndata: {"p":"","o":"add","v":{"message":{"author":{"role":"assistant"},' +
      '"content":{"content_type":"text","parts":[""]},"status":"in_progress",' +
      '"end_turn":false}}}\n\n';
    const append =
      'event: delta\ndata: {"p":"/message/content/parts/0","o":"append",' +
      '"v":"BROWSER_OWNED_OK"}\n\n';
    const finish =
      'event: delta\ndata: {"p":"/message/status","o":"replace",' +
      '"v":"finished_successfully"}\n\n' +
      'event: delta\ndata: {"p":"/message/end_turn","o":"replace","v":true}\n\n';

    const session = new FakeBrowserSession((handlers) => {
      handlers.onWebSocketFrame(streamItem("item-1", root));
      handlers.onBootstrap(HANDOFF_SSE);
      handlers.onWebSocketFrame(streamItem("item-2", append));
      handlers.onWebSocketFrame(streamItem("item-3", finish));
      handlers.onWebSocketFrame(doneFrame());
    });

    const result = await runChatGptWebBrowserTurn(session, {
      prompt: "clean-room prompt",
      timeoutMs: 1_000,
    });

    assert.equal(session.submittedPrompt, "clean-room prompt");
    assert.equal(session.cleanupCount, 1);
    assert.deepEqual(result, {
      conversationId: "conversation",
      turnExchangeId: "turn",
      text: "BROWSER_OWNED_OK",
      status: "finished_successfully",
      endTurn: true,
    });
    assert.equal(JSON.stringify(result).includes("resume-token"), false);
  });

  test("fails closed for non-ChatGPT origins before starting the browser session", async () => {
    const session = new FakeBrowserSession(() => {}, "https://example.com/");
    await assert.rejects(
      runChatGptWebBrowserTurn(session, { prompt: "blocked", timeoutMs: 50 }),
      /first-party chatgpt\.com origin/
    );
    assert.equal(session.handlers, null);
  });

  test("rejects incomplete terminal documents and always releases listeners", async () => {
    const session = new FakeBrowserSession((handlers) => {
      handlers.onBootstrap(HANDOFF_SSE);
      handlers.onWebSocketFrame(streamItem("item-1", "data: [DONE]\n\n"));
      handlers.onWebSocketFrame(doneFrame());
    });

    await assert.rejects(
      runChatGptWebBrowserTurn(session, { prompt: "incomplete", timeoutMs: 1_000 }),
      /assistant document is incomplete/
    );
    assert.equal(session.cleanupCount, 1);
  });

  test("preserves the terminal assistant when a hidden tool document follows it", async () => {
    const assistant =
      'event: delta_encoding\ndata: "v1"\n\n' +
      'event: delta\ndata: {"p":"","o":"add","v":{"message":{' +
      '"author":{"role":"assistant"},"content":{"content_type":"text",' +
      '"parts":["VISIBLE_ASSISTANT"]},"status":"finished_successfully",' +
      '"end_turn":true}}}\n\n' +
      "data: [DONE]\n\n";
    const hiddenTool =
      'event: delta_encoding\ndata: "v1"\n\n' +
      'event: delta\ndata: {"p":"","o":"add","v":{"message":{' +
      '"author":{"role":"tool"},"content":{"content_type":"text",' +
      '"parts":["hidden"]},"status":"in_progress","end_turn":null}}}\n\n' +
      "data: [DONE]\n\n";
    const session = new FakeBrowserSession((handlers) => {
      handlers.onBootstrap(HANDOFF_SSE);
      handlers.onWebSocketFrame(streamItem("assistant", assistant));
      handlers.onWebSocketFrame(streamItem("tool", hiddenTool));
      handlers.onWebSocketFrame(doneFrame());
    });

    const result = await runChatGptWebBrowserTurn(session, {
      prompt: "multi-document",
      timeoutMs: 1_000,
    });

    assert.equal(result.text, "VISIBLE_ASSISTANT");
    assert.equal(session.cleanupCount, 1);
  });

  test("continues through a tool-only topic into the next same-conversation handoff", async () => {
    const tool =
      'event: delta_encoding\ndata: "v1"\n\n' +
      'event: delta\ndata: {"p":"","o":"add","v":{"message":{' +
      '"author":{"role":"tool"},"content":{"content_type":"text",' +
      '"parts":["hidden"]},"status":"in_progress","end_turn":null}}}\n\n' +
      "data: [DONE]\n\n";
    const assistant =
      'event: delta_encoding\ndata: "v1"\n\n' +
      'event: delta\ndata: {"p":"","o":"add","v":{"message":{' +
      '"author":{"role":"assistant"},"content":{"content_type":"text",' +
      '"parts":["MULTI_HANDOFF_OK"]},"status":"finished_successfully",' +
      '"end_turn":true}}}\n\n' +
      "data: [DONE]\n\n";
    const secondHandoff = HANDOFF_SSE.replaceAll('"turn"', '"turn-2"').replaceAll(
      '"topic"',
      '"topic-2"'
    );
    const session = new FakeBrowserSession((handlers) => {
      handlers.onBootstrap(HANDOFF_SSE);
      handlers.onWebSocketFrame(streamItem("tool", tool));
      handlers.onWebSocketFrame(doneFrame());
      handlers.onBootstrap(secondHandoff);
      handlers.onWebSocketFrame(streamItem("assistant", assistant, "topic-2"));
      handlers.onWebSocketFrame(doneFrame("topic-2"));
    });

    const result = await runChatGptWebBrowserTurn(session, {
      prompt: "multi-handoff",
      timeoutMs: 1_000,
    });

    assert.equal(result.text, "MULTI_HANDOFF_OK");
    assert.equal(result.conversationId, "conversation");
    assert.equal(result.turnExchangeId, "turn-2");
    assert.equal(session.cleanupCount, 1);
  });

  test("uses the first-party rendered assistant after a tool-only terminal topic", async () => {
    const tool =
      'event: delta_encoding\ndata: "v1"\n\n' +
      'event: delta\ndata: {"p":"","o":"add","v":{"message":{' +
      '"author":{"role":"tool"},"content":{"content_type":"text",' +
      '"parts":["hidden"]},"status":"in_progress","end_turn":null}}}\n\n' +
      "data: [DONE]\n\n";
    const session = new FakeBrowserSession(
      (handlers) => {
        handlers.onBootstrap(HANDOFF_SSE);
        handlers.onWebSocketFrame(streamItem("tool", tool));
        handlers.onWebSocketFrame(doneFrame());
      },
      "https://chatgpt.com/?temporary-chat=true",
      "DOM_FALLBACK_OK"
    );

    const result = await runChatGptWebBrowserTurn(session, {
      prompt: "rendered fallback",
      timeoutMs: 50,
    });

    assert.equal(result.text, "DOM_FALLBACK_OK");
    assert.equal(result.status, "finished_successfully");
    assert.equal(session.cleanupCount, 1);
  });

  test("aborts without dispatch when the caller signal is already cancelled", async () => {
    const controller = new AbortController();
    controller.abort();
    const session = new FakeBrowserSession(() => {});

    await assert.rejects(
      runChatGptWebBrowserTurn(session, {
        prompt: "cancelled",
        timeoutMs: 1_000,
        signal: controller.signal,
      }),
      /aborted/
    );
    assert.equal(session.handlers, null);
    assert.equal(session.submittedPrompt, "");
  });

  test("aborts promptly while browser submission is still pending", async () => {
    const controller = new AbortController();
    let cleanupCount = 0;
    let releaseSubmission: () => void = () => {};
    const session = {
      url: () => "https://chatgpt.com/?temporary-chat=true",
      start: async () => async () => {
        cleanupCount += 1;
      },
      submitPrompt: async () =>
        new Promise<void>((resolve) => {
          releaseSubmission = resolve;
        }),
    } satisfies ChatGptWebBrowserSession;

    const turn = runChatGptWebBrowserTurn(session, {
      prompt: "cancel pending submit",
      timeoutMs: 1_000,
      signal: controller.signal,
    });
    await new Promise<void>((resolve) => setImmediate(resolve));
    controller.abort();

    const timeoutMarker = Symbol("abort-timeout");
    let timeout: NodeJS.Timeout | undefined;
    const observed = await Promise.race([
      turn.catch((error: unknown) => error),
      new Promise<typeof timeoutMarker>((resolve) => {
        timeout = setTimeout(() => resolve(timeoutMarker), 200);
      }),
    ]);
    if (timeout) clearTimeout(timeout);
    releaseSubmission();
    if (observed === timeoutMarker) await turn.catch(() => {});

    assert.notEqual(observed, timeoutMarker, "abort waited for the pending browser submission");
    assert.match(String(observed), /aborted/);
    assert.equal(cleanupCount, 1);
  });

  test("aborts the browser-owned request when the turn timeout expires", async () => {
    let submittedSignal: AbortSignal | null | undefined;
    const session = {
      url: () => "https://chatgpt.com/?temporary-chat=true",
      start: async () => async () => {},
      submitPrompt: async (request: { signal?: AbortSignal | null }) => {
        submittedSignal = request.signal;
        return new Promise<string>(() => {});
      },
    } satisfies ChatGptWebBrowserSession;

    await assert.rejects(
      runChatGptWebBrowserTurn(session, { prompt: "timeout", timeoutMs: 10 }),
      /timed out/
    );
    assert.equal(submittedSignal?.aborted, true);
  });

  test("Playwright binding delegates to the direct first-party request runner", async () => {
    const observed: unknown[] = [];
    const page = {
      url: () => "https://chatgpt.com/?temporary-chat=true",
      locator() {
        throw new Error("DOM hot path must not be used");
      },
    } as unknown as import("playwright").Page;
    const session = new PlaywrightChatGptWebBrowserSession(page, {
      selection: { kind: "free", thinkEnabled: true },
      executePageRequest: async (_page, input) => {
        observed.push(input);
        return "DIRECT_SSE";
      },
    });

    const response = await session.submitPrompt({ prompt: "direct", attachments: [] });

    assert.equal(response, "DIRECT_SSE");
    assert.deepEqual(observed, [
      {
        prompt: "direct",
        attachments: [],
        selection: { kind: "free", thinkEnabled: true },
      },
    ]);
  });
});
