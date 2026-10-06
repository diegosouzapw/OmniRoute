import { test } from "node:test";
import assert from "node:assert/strict";

import {
  sendAntigravityRequest,
  tryCreditsRetry,
} from "../../open-sse/executors/antigravity/executeAttempt.ts";

// The Antigravity request payload is finite JSON even when the response is streamed, so every
// physical send (first attempt, 403 retry, Google One AI credits retry) must carry a replayable
// string body with no `duplex` upload stream (#5770 follow-up).

test("Antigravity streaming sends finite JSON as a replayable fixed request body", async () => {
  const originalFetch = globalThis.fetch;
  const sends: Array<{ body: BodyInit | null | undefined; duplex: unknown }> = [];

  globalThis.fetch = (async (_url: string | URL | Request, init?: RequestInit) => {
    sends.push({
      body: init?.body,
      duplex: (init as (RequestInit & { duplex?: unknown }) | undefined)?.duplex,
    });
    return new Response(
      'data: {"response":{"candidates":[{"content":{"parts":[{"text":"ok"}]},"finishReason":"STOP"}]}}\n\n',
      { status: sends.length === 1 ? 403 : 200, headers: { "Content-Type": "text/event-stream" } }
    );
  }) as typeof fetch;

  try {
    const body = {
      project: "project-1",
      requestId: "agent-test",
      request: { contents: [{ role: "user", parts: [{ text: "hello" }] }] },
      model: "gemini-2.5-flash",
      userAgent: "antigravity",
      requestType: "agent",
    };
    const result = await sendAntigravityRequest(
      "antigravity",
      "https://cloudcode-pa.googleapis.com/v1internal:streamGenerateContent?alt=sse",
      "gemini-2.5-flash",
      { "Content-Type": "application/json" },
      body,
      { accessToken: "token", projectId: "project-1" },
      true,
      null,
      { debug() {}, info() {}, warn() {}, error() {} },
      0,
      { value: 0 },
      "agent-test"
    );

    assert.equal(result.response.status, 200);
    assert.equal(sends.length, 2, "403 retry must perform a second physical send");
    for (const send of sends) {
      assert.equal(typeof send.body, "string");
      assert.equal(send.duplex, undefined);
    }
    assert.equal(String(sends[0]?.body), String(sends[1]?.body));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Antigravity credits retry also keeps a streaming request body replayable", async () => {
  const originalFetch = globalThis.fetch;
  let capturedBody: BodyInit | null | undefined;
  let capturedDuplex: unknown;

  globalThis.fetch = (async (_url: string | URL | Request, init?: RequestInit) => {
    capturedBody = init?.body;
    capturedDuplex = (init as (RequestInit & { duplex?: unknown }) | undefined)?.duplex;
    return new Response(
      'data: {"response":{"candidates":[{"content":{"parts":[{"text":"ok"}]},"finishReason":"STOP"}]}}\n\n',
      { status: 200, headers: { "Content-Type": "text/event-stream" } }
    );
  }) as typeof fetch;

  try {
    const result = await tryCreditsRetry(
      "antigravity",
      "https://cloudcode-pa.googleapis.com/v1internal:streamGenerateContent?alt=sse",
      { "Content-Type": "application/json" },
      {
        project: "project-1",
        requestId: "agent-test-credits",
        request: { contents: [{ role: "user", parts: [{ text: "hello" }] }] },
        model: "gemini-2.5-flash",
        userAgent: "antigravity",
        requestType: "agent",
      },
      { accessToken: "token", projectId: "project-1" },
      true,
      null,
      { debug() {}, info() {}, warn() {}, error() {} },
      "account-1",
      () => {},
      { value: 0 },
      "agent-test-credits"
    );

    assert.equal(result?.response.status, 200);
    assert.equal(typeof capturedBody, "string");
    assert.equal(capturedDuplex, undefined);
    assert.match(String(capturedBody), /"enabledCreditTypes":\["GOOGLE_ONE_AI"\]/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
