import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { afterEach, beforeEach, describe, it } from "node:test";

import { ClaudeWebExecutor } from "../../open-sse/executors/claude-web.ts";
import {
  __resetClaudeWebBrowserTemplatesForTesting,
  type ClaudeWebTransportRequest,
  type ClaudeWebTransportResult,
} from "../../open-sse/executors/claude-web/browserTransport.ts";
import { transformToClaude } from "../../open-sse/executors/claude-web/payload.ts";
import { __resetClaudeWebSessionForTesting } from "../../open-sse/executors/claude-web/session.ts";
import {
  isClaudeWebChallenge,
  sendClaudeWebDirect,
} from "../../open-sse/executors/claude-web/transport.ts";

const originalBrowserFlag = process.env.WEB_COOKIE_USE_BROWSER;
const originalPoolFlag = process.env.OMNIROUTE_BROWSER_POOL;

function textStream(text: string): ReadableStream<Uint8Array> {
  const bytes = new TextEncoder().encode(text);
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    },
  });
}

function validClaudeSse(answer = "answer"): ReadableStream<Uint8Array> {
  const events = [
    { type: "message_start", message: { model: "claude-sonnet-5" } },
    { type: "content_block_start", index: 0, content_block: { type: "text" } },
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: answer } },
    { type: "content_block_stop", index: 0 },
    { type: "message_delta", delta: { stop_reason: "end_turn" } },
    { type: "message_stop" },
  ];
  return textStream(events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join(""));
}

function transportRequest(): ClaudeWebTransportRequest {
  const payload = transformToClaude(
    { messages: [{ role: "user", content: "hello" }] },
    "claude-sonnet-5"
  );
  const organizationId = "organization-test";
  const conversationId = "00000000-0000-4000-8000-000000000010";
  return {
    scopeKey: "scope-digest",
    organizationId,
    conversationId,
    endpointSuffix: "completion",
    pageUrl: `https://claude.ai/chat/${conversationId}`,
    url: `https://claude.ai/api/organizations/${organizationId}/chat_conversations/${conversationId}/completion`,
    cookieString: "sessionKey=session-secret; cf_clearance=existing-browser-bound-value",
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json",
    },
    payload,
    locale: payload.locale,
    timezone: payload.timezone,
    signal: null,
  };
}

function result(
  status: number,
  body: ReadableStream<Uint8Array> | null,
  headers: Headers = new Headers()
): ClaudeWebTransportResult {
  return { status, headers, body };
}

function credentials(connectionId = "connection-a") {
  return {
    cookie: "sessionKey=session-secret; cf_clearance=existing-browser-bound-value",
    orgId: "organization-test",
    connectionId,
  };
}

function restoreEnv(name: string, value: string | undefined): void {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

beforeEach(() => {
  delete process.env.WEB_COOKIE_USE_BROWSER;
  delete process.env.OMNIROUTE_BROWSER_POOL;
  __resetClaudeWebSessionForTesting();
  __resetClaudeWebBrowserTemplatesForTesting();
});

afterEach(() => {
  restoreEnv("WEB_COOKIE_USE_BROWSER", originalBrowserFlag);
  restoreEnv("OMNIROUTE_BROWSER_POOL", originalPoolFlag);
  __resetClaudeWebSessionForTesting();
  __resetClaudeWebBrowserTemplatesForTesting();
});

describe("Claude Web direct transport", () => {
  it("sends only the prepared endpoint, headers, cookie, and payload", async () => {
    const request = transportRequest();
    let capturedUrl = "";
    let capturedOptions: Record<string, unknown> = {};

    const response = await sendClaudeWebDirect(request, {
      async tlsFetch(url, options) {
        capturedUrl = url;
        capturedOptions = options as unknown as Record<string, unknown>;
        return {
          status: 200,
          headers: new Headers({ "Content-Type": "text/event-stream" }),
          text: null,
          body: validClaudeSse(),
        };
      },
    });

    assert.equal(capturedUrl, request.url);
    assert.equal(capturedOptions.method, "POST");
    assert.equal(capturedOptions.stream, true);
    assert.deepEqual(JSON.parse(String(capturedOptions.body)), request.payload);
    assert.equal((capturedOptions.headers as Record<string, string>).Cookie, request.cookieString);
    assert.equal(response.status, 200);
    assert.ok(response.body);
  });

  it("classifies only known 403 challenge evidence", () => {
    assert.equal(
      isClaudeWebChallenge({
        ...result(403, null, new Headers({ "cf-mitigated": "challenge" })),
        bodyText: "opaque",
      }),
      true
    );
    assert.equal(
      isClaudeWebChallenge({
        ...result(403, null),
        bodyText: "<title>Just a moment...</title>",
      }),
      true
    );
    assert.equal(
      isClaudeWebChallenge({ ...result(403, null), bodyText: '{"error":"forbidden"}' }),
      false
    );
    assert.equal(
      isClaudeWebChallenge({
        ...result(429, null, new Headers({ "cf-mitigated": "challenge" })),
        bodyText: "<title>Just a moment...</title>",
      }),
      false
    );
  });
});

describe("Claude Web executor transport orchestration", () => {
  it("returns buffered output and generated state from an exact direct request", async () => {
    const requests: ClaudeWebTransportRequest[] = [];
    const executor = new ClaudeWebExecutor({
      async sendDirect(request) {
        requests.push(request);
        return result(
          200,
          validClaudeSse("direct answer"),
          new Headers({ "Content-Type": "text/event-stream" })
        );
      },
      async sendBrowser() {
        throw new Error("browser should not be called");
      },
    });

    const execution = await executor.execute({
      model: "claude-sonnet-5",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: false,
      credentials: credentials(),
      signal: null,
    });

    assert.equal(requests.length, 1);
    assert.match(
      requests[0].url,
      /^https:\/\/claude\.ai\/api\/organizations\/organization-test\/chat_conversations\/[a-f0-9-]+\/completion$/
    );
    assert.ok(requests[0].payload.create_conversation_params);
    const responseBody = (await execution.response.json()) as {
      choices: Array<{ message: { content: string } }>;
      claude_web: { conversation_id: string; assistant_message_uuid: string };
    };
    assert.equal(responseBody.choices[0].message.content, "direct answer");
    assert.equal(responseBody.claude_web.conversation_id, requests[0].conversationId);
    assert.match(
      execution.response.headers.get("X-OmniRoute-Claude-Web-Assistant-Message-Uuid") ?? "",
      /^[a-f0-9-]+$/
    );
  });

  it("returns only a redacted request projection to the shared request logger", async () => {
    let sentRequest: ClaudeWebTransportRequest | undefined;
    const executor = new ClaudeWebExecutor({
      async sendDirect(request) {
        sentRequest = request;
        return result(200, validClaudeSse());
      },
      async sendBrowser() {
        throw new Error("browser should not be called");
      },
    });
    const execution = await executor.execute({
      model: "claude-sonnet-5",
      body: {
        messages: [{ role: "user", content: "PRIVATE_PROMPT" }],
        tools: [
          {
            type: "function",
            function: { name: "private_tool", parameters: { type: "object" } },
          },
        ],
      },
      stream: false,
      credentials: {
        ...credentials(),
        deviceId: "private-device-id",
      },
      signal: null,
    });

    assert.equal(sentRequest?.payload.prompt, "PRIVATE_PROMPT");
    const logged = JSON.stringify({
      url: execution.url,
      headers: execution.headers,
      body: execution.transformedBody,
    });
    assert.doesNotMatch(
      logged,
      /PRIVATE_PROMPT|private_tool|private-device-id|organization-test|[0-9a-f]{8}-[0-9a-f-]{27}/i
    );
    assert.match(String(execution.url), /<organization>.*<conversation>/);
  });

  it("does not expose transport exception details in logs or error responses", async () => {
    const messages: string[] = [];
    const executor = new ClaudeWebExecutor({
      async sendDirect() {
        throw new Error(
          "request failed for organization-test and sessionKey=session-secret at https://claude.ai/private"
        );
      },
      async sendBrowser() {
        throw new Error("browser should not be called");
      },
    });
    const execution = await executor.execute({
      model: "claude-sonnet-5",
      body: { messages: [{ role: "user", content: "PRIVATE_PROMPT" }] },
      stream: false,
      credentials: credentials(),
      signal: null,
      log: {
        error(_tag, message) {
          messages.push(message);
        },
      },
    });
    const exposed = `${await execution.response.text()} ${messages.join(" ")}`;
    assert.equal(execution.response.status, 502);
    assert.doesNotMatch(
      exposed,
      /organization-test|session-secret|PRIVATE_PROMPT|claude\.ai\/private/
    );
  });

  it("falls back from a direct challenge to the same scoped browser request when enabled", async () => {
    process.env.OMNIROUTE_BROWSER_POOL = "on";
    let directRequest: ClaudeWebTransportRequest | undefined;
    let browserRequest: ClaudeWebTransportRequest | undefined;
    const executor = new ClaudeWebExecutor({
      async sendDirect(request) {
        directRequest = request;
        return {
          ...result(403, null, new Headers({ "cf-mitigated": "challenge" })),
          bodyText: "<title>Just a moment...</title>",
        };
      },
      async sendBrowser(request) {
        browserRequest = request;
        return result(200, validClaudeSse("browser answer"));
      },
    });

    const execution = await executor.execute({
      model: "claude-opus-4-8",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: false,
      credentials: credentials(),
      signal: null,
    });

    assert.ok(directRequest);
    assert.strictEqual(browserRequest, directRequest);
    assert.equal(execution.response.status, 200);
    assert.equal(
      ((await execution.response.json()) as { choices: Array<{ message: { content: string } }> })
        .choices[0].message.content,
      "browser answer"
    );
  });

  it("returns a sanitized challenge without invoking browser fallback when disabled", async () => {
    let browserCalls = 0;
    const executor = new ClaudeWebExecutor({
      async sendDirect() {
        return {
          ...result(403, null, new Headers({ "cf-mitigated": "challenge" })),
          bodyText: "<title>Just a moment...</title> at C:\\Users\\private\\claude-cookie.txt",
        };
      },
      async sendBrowser() {
        browserCalls += 1;
        return result(200, validClaudeSse());
      },
    });

    const execution = await executor.execute({
      model: "claude-sonnet-5",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: credentials(),
      signal: null,
    });
    const body = await execution.response.text();

    assert.equal(execution.response.status, 403);
    assert.equal(browserCalls, 0);
    assert.match(body, /cloudflare_challenge/);
    assert.doesNotMatch(body, /C:\\\\Users|private|cookie\.txt/);
  });

  it("invalidates reusable continuation state after a 401", async () => {
    const conversationIds: string[] = [];
    let call = 0;
    const executor = new ClaudeWebExecutor({
      async sendDirect(request) {
        call += 1;
        conversationIds.push(request.conversationId);
        if (call === 2) return { ...result(401, null), bodyText: "expired" };
        return result(200, validClaudeSse(call === 1 ? "first answer" : "replacement answer"));
      },
      async sendBrowser() {
        throw new Error("browser should not be called");
      },
    });

    const firstBody = { messages: [{ role: "user", content: "first question" }] };
    const followUpBody = {
      messages: [
        { role: "user", content: "first question" },
        { role: "assistant", content: "first answer" },
        { role: "user", content: "second question" },
      ],
    };
    await executor.execute({
      model: "claude-sonnet-5",
      body: firstBody,
      stream: false,
      credentials: credentials(),
      signal: null,
    });
    const unauthorized = await executor.execute({
      model: "claude-sonnet-5",
      body: followUpBody,
      stream: false,
      credentials: credentials(),
      signal: null,
    });
    await executor.execute({
      model: "claude-sonnet-5",
      body: followUpBody,
      stream: false,
      credentials: credentials(),
      signal: null,
    });

    assert.equal(unauthorized.response.status, 401);
    assert.equal(conversationIds[1], conversationIds[0]);
    assert.notEqual(conversationIds[2], conversationIds[0]);
  });

  it("has no execution-time dependency on the standalone Turnstile solver", () => {
    const executorSource = readFileSync(
      new URL("../../open-sse/executors/claude-web.ts", import.meta.url),
      "utf8"
    );
    const indexSource = readFileSync(
      new URL("../../open-sse/executors/index.ts", import.meta.url),
      "utf8"
    );

    assert.doesNotMatch(executorSource, /claudeTurnstileSolver|getCfClearanceToken|tryBackedChat/);
    assert.doesNotMatch(indexSource, /ClaudeWebWithAutoRefresh/);
    assert.match(indexSource, /"claude-web": new ClaudeWebExecutor\(\)/);
    assert.match(indexSource, /"cw-web": new ClaudeWebExecutor\(\)/);
  });
});
