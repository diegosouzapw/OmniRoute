import { afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";

import { CLAUDE_WEB_FINGERPRINT } from "../../open-sse/config/claudeWebFingerprint.ts";
import { ClaudeWebExecutor } from "../../open-sse/executors/claude-web.ts";
import { transformToClaude } from "../../open-sse/executors/claude-web/payload.ts";
import { __setTlsFetchOverrideForTesting } from "../../open-sse/services/claudeTlsClient.ts";

const originalBrowserFlag = process.env.WEB_COOKIE_USE_BROWSER;
const originalPoolFlag = process.env.OMNIROUTE_BROWSER_POOL;

function textStream(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
}

function claudeSseStream(): ReadableStream<Uint8Array> {
  const events = [
    { type: "message_start" },
    { type: "message_delta", delta: { stop_reason: "end_turn" } },
    { type: "message_stop" },
  ];
  return textStream(events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join(""));
}

function clearBrowserFlags(): void {
  delete process.env.WEB_COOKIE_USE_BROWSER;
  delete process.env.OMNIROUTE_BROWSER_POOL;
}

function restoreEnv(name: string, value: string | undefined): void {
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }
}

afterEach(() => {
  __setTlsFetchOverrideForTesting(null);
  restoreEnv("WEB_COOKIE_USE_BROWSER", originalBrowserFlag);
  restoreEnv("OMNIROUTE_BROWSER_POOL", originalPoolFlag);
});

describe("Claude Web live request alignment", () => {
  it("maps an explicit reasoning effort to Claude Web extended thinking", () => {
    const payload = transformToClaude(
      {
        messages: [{ role: "user", content: "Think carefully" }],
        reasoning_effort: "high",
      },
      "claude-opus-4-8"
    );

    assert.equal(payload.effort, "high");
    assert.equal(payload.thinking_mode, "extended");
  });

  it("uses the shared browser fingerprint and the new-chat referer", async () => {
    clearBrowserFlags();
    let capturedHeaders: Record<string, string> | undefined;

    __setTlsFetchOverrideForTesting(async (_url, options) => {
      capturedHeaders = options.headers;
      return {
        status: 200,
        headers: new Headers({ "Content-Type": "text/event-stream" }),
        text: null,
        body: claudeSseStream(),
      };
    });

    const result = await new ClaudeWebExecutor().execute({
      model: "claude-opus-4-8",
      body: { messages: [{ role: "user", content: "Hello" }] },
      stream: true,
      credentials: {
        cookie: "sessionKey=fake-session; cf_clearance=fake-clearance",
        orgId: "org-test",
        conversationId: "conv-test",
      },
      signal: null,
    });

    assert.equal(result.response.status, 200);
    assert.equal(capturedHeaders?.["User-Agent"], CLAUDE_WEB_FINGERPRINT.userAgent);
    assert.equal(capturedHeaders?.["Sec-Ch-Ua"], CLAUDE_WEB_FINGERPRINT.secChUa);
    assert.equal(capturedHeaders?.["Sec-Ch-Ua-Platform"], CLAUDE_WEB_FINGERPRINT.secChUaPlatform);
    assert.equal(capturedHeaders?.Referer, "https://claude.ai/new");
  });

  it("fails closed when the authenticated organization cannot be resolved", async () => {
    clearBrowserFlags();
    let completionCalls = 0;

    __setTlsFetchOverrideForTesting(async (url) => {
      if (url.endsWith("/organizations")) {
        return {
          status: 503,
          headers: new Headers({ "Content-Type": "application/json" }),
          text: '{"error":"unavailable"}',
          body: null,
        };
      }

      completionCalls += 1;
      return {
        status: 200,
        headers: new Headers({ "Content-Type": "text/event-stream" }),
        text: null,
        body: claudeSseStream(),
      };
    });

    const result = await new ClaudeWebExecutor().execute({
      model: "claude-sonnet-5",
      body: { messages: [{ role: "user", content: "Hello" }] },
      stream: true,
      credentials: { cookie: "sessionKey=fake-session; cf_clearance=fake-clearance" },
      signal: null,
    });

    assert.equal(result.response.status, 502);
    assert.equal(completionCalls, 0);
    assert.match(await result.response.text(), /organization/i);
  });

  it("uses the first organization returned by the current Claude Web session", async () => {
    clearBrowserFlags();
    let completionCalls = 0;
    let completionUrl = "";

    __setTlsFetchOverrideForTesting(async (url) => {
      if (url.endsWith("/organizations")) {
        return {
          status: 200,
          headers: new Headers({ "Content-Type": "application/json" }),
          text: JSON.stringify([{ uuid: "org-first" }, { uuid: "org-second" }]),
          body: null,
        };
      }

      completionCalls += 1;
      completionUrl = url;
      return {
        status: 200,
        headers: new Headers({ "Content-Type": "text/event-stream" }),
        text: null,
        body: claudeSseStream(),
      };
    });

    const result = await new ClaudeWebExecutor().execute({
      model: "claude-sonnet-5",
      body: { messages: [{ role: "user", content: "Hello" }] },
      stream: true,
      credentials: { cookie: "sessionKey=fake-session; cf_clearance=fake-clearance" },
      signal: null,
    });

    assert.equal(result.response.status, 200);
    assert.equal(completionCalls, 1);
    assert.match(completionUrl, /\/api\/organizations\/org-first\/chat_conversations\//);
  });

  it("reports an invalid organization-session authorization as 401", async () => {
    clearBrowserFlags();
    let completionCalls = 0;

    __setTlsFetchOverrideForTesting(async (url) => {
      if (url.endsWith("/organizations")) {
        return {
          status: 403,
          headers: new Headers({ "Content-Type": "application/json" }),
          text: JSON.stringify({
            error: {
              type: "permission_error",
              message: "Invalid authorization",
              details: { error_code: "invalid_auth" },
            },
          }),
          body: null,
        };
      }

      completionCalls += 1;
      return {
        status: 200,
        headers: new Headers({ "Content-Type": "text/event-stream" }),
        text: null,
        body: claudeSseStream(),
      };
    });

    const result = await new ClaudeWebExecutor().execute({
      model: "claude-sonnet-5",
      body: { messages: [{ role: "user", content: "Hello" }] },
      stream: true,
      credentials: { cookie: "sessionKey=expired-session" },
      signal: null,
    });

    assert.equal(result.response.status, 401);
    assert.equal(completionCalls, 0);
    assert.match(await result.response.text(), /session expired|invalid/i);
  });

  it("sanitizes structured upstream error details before returning them", async () => {
    clearBrowserFlags();
    const upstreamError = {
      error: {
        message: "upstream failed\n    at C:\\Users\\admin\\private\\source.ts:10:2",
        stack: "Error: upstream failed\n    at C:\\Users\\admin\\private\\source.ts:10:2",
        path: "C:\\Users\\admin\\private\\source.ts",
        organization_id: "private-organization-id",
        prompt: "private prompt",
      },
    };

    __setTlsFetchOverrideForTesting(async () => ({
      status: 500,
      headers: new Headers({ "Content-Type": "application/json" }),
      text: null,
      body: textStream(JSON.stringify(upstreamError)),
    }));

    const result = await new ClaudeWebExecutor().execute({
      model: "claude-sonnet-5",
      body: { messages: [{ role: "user", content: "Hello" }] },
      stream: true,
      credentials: {
        cookie: "sessionKey=fake-session; cf_clearance=fake-clearance",
        orgId: "org-test",
        conversationId: "conv-test",
      },
      signal: null,
    });

    assert.equal(result.response.status, 500);
    const rawBody = await result.response.text();
    assert.doesNotMatch(rawBody, /C:\\\\Users/);
    assert.doesNotMatch(rawBody, /"stack"/);
    assert.doesNotMatch(rawBody, /"path"/);
    assert.doesNotMatch(rawBody, /private-organization-id|private prompt/);

    const responseBody = JSON.parse(rawBody) as {
      error: { message: string };
      upstream_details?: unknown;
    };
    assert.equal(responseBody.error.message, "Claude Web API error (500)");
    assert.equal(responseBody.upstream_details, undefined);
  });
});
