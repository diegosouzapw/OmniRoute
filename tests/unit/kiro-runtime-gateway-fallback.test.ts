import test from "node:test";
import assert from "node:assert/strict";

import { KiroExecutor } from "../../open-sse/executors/kiro.ts";

// #<issue>: the executor only ever called the region-resolved CodeWhisperer/
// Amazon Q surface directly. The native Kiro IDE talks to a branded gateway
// (runtime.us-east-1.kiro.dev) first — this covers the new candidate-url
// ordering, fallback-on-auth-failure behavior, and the auth-method gate that
// keeps API-key/IdC/external-IdP connections off the gateway entirely (it
// rejects those token types outright).

test("KiroExecutor.execute tries runtime.us-east-1.kiro.dev before the regional CodeWhisperer host for OAuth accounts", async () => {
  const executor = new KiroExecutor();
  const originalFetch = globalThis.fetch;
  const calledUrls: string[] = [];

  globalThis.fetch = (async (url: string) => {
    calledUrls.push(String(url));
    return new Response("ok", {
      status: 200,
      headers: { "Content-Type": "application/vnd.amazon.eventstream" },
    });
  }) as typeof fetch;

  try {
    executor.transformEventStreamToSSE = (() =>
      new Response("data: [DONE]\n\n", {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      })) as typeof executor.transformEventStreamToSSE;

    await executor.execute({
      model: "claude-sonnet-4.5",
      body: { conversationState: {} },
      stream: true,
      credentials: { accessToken: "kiro-token", providerSpecificData: { authMethod: "social" } },
    });

    assert.equal(calledUrls.length, 1);
    assert.match(
      calledUrls[0],
      /^https:\/\/runtime\.us-east-1\.kiro\.dev\/generateAssistantResponse/
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("KiroExecutor.execute falls back to the regional CodeWhisperer host when the gateway rejects the token", async () => {
  const executor = new KiroExecutor();
  const originalFetch = globalThis.fetch;
  const calledUrls: string[] = [];

  globalThis.fetch = (async (url: string) => {
    calledUrls.push(String(url));
    if (calledUrls.length === 1) {
      return new Response("bearer token invalid", { status: 403 });
    }
    return new Response("ok", {
      status: 200,
      headers: { "Content-Type": "application/vnd.amazon.eventstream" },
    });
  }) as typeof fetch;

  try {
    executor.transformEventStreamToSSE = (() =>
      new Response("data: [DONE]\n\n", {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      })) as typeof executor.transformEventStreamToSSE;

    const result = await executor.execute({
      model: "claude-sonnet-4.5",
      body: { conversationState: {} },
      stream: true,
      credentials: { accessToken: "kiro-token", providerSpecificData: { authMethod: "social" } },
    });

    assert.equal(calledUrls.length, 2);
    assert.match(calledUrls[0], /^https:\/\/runtime\.us-east-1\.kiro\.dev/);
    assert.match(calledUrls[1], /^https:\/\/codewhisperer\.us-east-1\.amazonaws\.com/);
    assert.equal((result.response as Response).status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("KiroExecutor.execute never tries the gateway for api_key/idc/external_idp auth methods", async () => {
  const executor = new KiroExecutor();
  const originalFetch = globalThis.fetch;

  for (const authMethod of ["api_key", "idc", "external_idp"]) {
    const calledUrls: string[] = [];
    globalThis.fetch = (async (url: string) => {
      calledUrls.push(String(url));
      return new Response("ok", {
        status: 200,
        headers: { "Content-Type": "application/vnd.amazon.eventstream" },
      });
    }) as typeof fetch;

    try {
      executor.transformEventStreamToSSE = (() =>
        new Response("data: [DONE]\n\n", {
          status: 200,
          headers: { "Content-Type": "text/event-stream" },
        })) as typeof executor.transformEventStreamToSSE;

      await executor.execute({
        model: "claude-sonnet-4.5",
        body: { conversationState: {} },
        stream: true,
        credentials: { accessToken: "kiro-token", providerSpecificData: { authMethod } },
      });

      assert.equal(calledUrls.length, 1, `expected exactly one call for authMethod=${authMethod}`);
      assert.doesNotMatch(
        calledUrls[0],
        /kiro\.dev/,
        `${authMethod} must never hit the branded gateway`
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  }
});

test("KiroExecutor.execute does not retry a malformed-body 400 across endpoints", async () => {
  const executor = new KiroExecutor();
  const originalFetch = globalThis.fetch;
  const calledUrls: string[] = [];

  globalThis.fetch = (async (url: string) => {
    calledUrls.push(String(url));
    return new Response("REQUEST_BODY_INVALID", { status: 400 });
  }) as typeof fetch;

  try {
    const result = await executor.execute({
      model: "claude-sonnet-4.5",
      body: { conversationState: {} },
      stream: true,
      credentials: { accessToken: "kiro-token", providerSpecificData: { authMethod: "social" } },
    });

    assert.equal(calledUrls.length, 1);
    assert.equal((result.response as Response).status, 400);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
