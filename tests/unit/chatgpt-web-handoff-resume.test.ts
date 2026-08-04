import assert from "node:assert/strict";
import test from "node:test";

import type { TlsFetchOptions } from "../../open-sse/services/chatgptTlsClient.ts";

const { ChatGptWebExecutor, __resetChatGptWebCachesForTesting } =
  await import("../../open-sse/executors/chatgpt-web.ts");
const { __setTlsFetchOverrideForTesting } =
  await import("../../open-sse/services/chatgptTlsClient.ts");

function makeHeaders(values: Record<string, string> = {}): Headers {
  const headers = new Headers();
  for (const [name, value] of Object.entries(values)) headers.set(name, value);
  return headers;
}

function sseText(events: unknown[]): string {
  return `${events.map((event) => `data: ${JSON.stringify(event)}\r\n\r\n`).join("")}data: [DONE]\r\n\r\n`;
}

type ResumeRequest = {
  body: { conversation_id?: string; offset?: number };
  headers: Record<string, string>;
};

function installHandoffMock(
  finalText: string,
  options: { firstResumeStatus?: number } = {}
): {
  calls: { conversationDetail: number; resume: ResumeRequest[] };
  restore: () => void;
} {
  const calls = {
    conversationDetail: 0,
    resume: [] as ResumeRequest[],
  };

  __setTlsFetchOverrideForTesting(async (url: string, request: TlsFetchOptions = {}) => {
    const target = String(url);
    const json = (body: unknown, status = 200) => ({
      status,
      headers: makeHeaders({ "Content-Type": "application/json" }),
      text: JSON.stringify(body),
      body: null,
    });

    if (
      (target === "https://chatgpt.com/" || target === "https://chatgpt.com") &&
      (request.method ?? "GET") === "GET"
    ) {
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "text/html" }),
        text: '<html data-build="prod-test"><script src="/_next/static/chunks/main.js"></script></html>',
        body: null,
      };
    }

    if (target.includes("/api/auth/session")) {
      return json({
        accessToken: "jwt-test",
        expires: new Date(Date.now() + 3_600_000).toISOString(),
        user: { id: "account-test" },
      });
    }

    if (target.includes("/sentinel/chat-requirements")) {
      return json({ token: "requirements-token", proofofwork: { required: false } });
    }

    if (target.endsWith("/backend-api/f/conversation/resume")) {
      const body = JSON.parse(request.body ?? "{}") as ResumeRequest["body"];
      calls.resume.push({ body, headers: request.headers ?? {} });
      if (options.firstResumeStatus && calls.resume.length === 1) {
        return {
          status: options.firstResumeStatus,
          headers: makeHeaders({ "Content-Type": "text/plain" }),
          text: "not ready",
          body: null,
        };
      }
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "text/event-stream" }),
        text: sseText([
          {
            conversation_id: "conversation-handoff",
            message: {
              id: "assistant-final",
              author: { role: "assistant" },
              content: { content_type: "text", parts: [finalText] },
              status: "in_progress",
            },
          },
          {
            conversation_id: "conversation-handoff",
            message: {
              id: "assistant-final",
              author: { role: "assistant" },
              content: { content_type: "text", parts: [finalText] },
              status: "finished_successfully",
              end_turn: true,
            },
          },
        ]),
        body: null,
      };
    }

    if (target.endsWith("/backend-api/f/conversation")) {
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "text/event-stream" }),
        text: sseText([
          {
            type: "resume_conversation_token",
            token: "resume-token",
            conversation_id: "conversation-handoff",
          },
          {
            type: "stream_handoff",
            conversation_id: "conversation-handoff",
            turn_exchange_id: "turn-handoff",
            options: [
              { type: "resume_sse_endpoint", topic_id: "conversation-turn-handoff" },
              { type: "subscribe_ws_topic", topic_id: "conversation-turn-handoff" },
            ],
          },
        ]),
        body: null,
      };
    }

    if (/\/backend-api\/conversation\/[^/?#]+$/.test(target)) {
      calls.conversationDetail++;
      return json(
        {
          detail: {
            message: "You do not have access to this temporary conversation.",
            code: "conversation_not_found",
          },
        },
        404
      );
    }

    // Browser warmup requests are non-fatal, but returning 200 keeps test logs quiet.
    if (
      target.includes("/backend-api/me") ||
      target.includes("/backend-api/conversations?") ||
      target.includes("/backend-api/models?")
    ) {
      return json({});
    }

    return { status: 404, headers: makeHeaders(), text: "not mocked", body: null };
  });

  return {
    calls,
    restore() {
      __setTlsFetchOverrideForTesting(null);
    },
  };
}

test("ChatGPT Web Pro models resume Temporary Chat handoffs through native SSE", async (t) => {
  for (const model of ["gpt-5.6-pro", "gpt-5.5-pro", "gpt-5.5-pro-extended"]) {
    await t.test(model, async () => {
      __resetChatGptWebCachesForTesting();
      const expected = `RESUMED_${model}`;
      const mock = installHandoffMock(expected);
      try {
        const executor = new ChatGptWebExecutor();
        const result = await executor.execute({
          model,
          body: { messages: [{ role: "user", content: "hard problem" }] },
          stream: false,
          credentials: { apiKey: `cookie-${model}` },
          signal: AbortSignal.timeout(20_000),
          log: null,
        });

        assert.equal(result.response.status, 200);
        const response = await result.response.json();
        assert.equal(response.choices[0].message.content, expected);
        assert.equal(mock.calls.resume.length, 1);
        assert.deepEqual(mock.calls.resume[0].body, {
          conversation_id: "conversation-handoff",
          offset: 0,
        });
        assert.equal(mock.calls.resume[0].headers["x-conduit-token"], "resume-token");
        assert.equal(mock.calls.conversationDetail, 0);
      } finally {
        mock.restore();
      }
    });
  }
});

test("ChatGPT Web handoff retries the next resume offset after a 404", async () => {
  __resetChatGptWebCachesForTesting();
  const mock = installHandoffMock("OFFSET_ONE_OK", { firstResumeStatus: 404 });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.6-pro",
      body: { messages: [{ role: "user", content: "hard problem" }] },
      stream: false,
      credentials: { apiKey: "cookie-offset" },
      signal: AbortSignal.timeout(20_000),
      log: null,
    });

    assert.equal(result.response.status, 200);
    const response = await result.response.json();
    assert.equal(response.choices[0].message.content, "OFFSET_ONE_OK");
    assert.deepEqual(
      mock.calls.resume.map((call) => call.body.offset),
      [0, 1]
    );
    assert.equal(mock.calls.conversationDetail, 0);
  } finally {
    mock.restore();
  }
});

test("ChatGPT Web streaming appends the native resumed Pro answer", async () => {
  __resetChatGptWebCachesForTesting();
  const mock = installHandoffMock("STREAM_RESUME_OK");
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.5-pro-extended",
      body: { messages: [{ role: "user", content: "hard problem" }], stream: true },
      stream: true,
      credentials: { apiKey: "cookie-stream" },
      signal: AbortSignal.timeout(20_000),
      log: null,
    });

    assert.equal(result.response.status, 200);
    const responseText = await result.response.text();
    const content = responseText
      .split("\n")
      .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
      .map((line) => JSON.parse(line.slice(6)) as Record<string, unknown>)
      .map((event) => {
        const choices = event.choices as Array<{ delta?: { content?: string } }> | undefined;
        return choices?.[0]?.delta?.content ?? "";
      })
      .join("");

    assert.equal(content, "STREAM_RESUME_OK");
    assert.equal(mock.calls.resume.length, 1);
    assert.equal(mock.calls.conversationDetail, 0);
  } finally {
    mock.restore();
  }
});
