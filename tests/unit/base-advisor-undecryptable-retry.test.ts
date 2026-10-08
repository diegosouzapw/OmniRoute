/**
 * BaseExecutor's 400-recovery chain must retry once, on the same connection, when
 * Anthropic cannot decrypt an `advisor_redacted_result` produced by another org. The
 * retry marks those results `advisor_tool_result_error` / `unavailable` and leaves the
 * paired `server_tool_use` and every other block untouched.
 *
 * Run: node --import tsx/esm --test tests/unit/base-advisor-undecryptable-retry.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import {
  isAdvisorUndecryptableError,
  replaceRedactedAdvisorResults,
} from "../../open-sse/config/providerFieldStrips.ts";

const ADVISOR_400 = JSON.stringify({
  type: "error",
  error: {
    type: "invalid_request_error",
    message: "Advisor tool result content could not be processed.",
  },
  request_id: "req_test",
});

function anthropic400(message: string): string {
  return JSON.stringify({ type: "error", error: { type: "invalid_request_error", message } });
}

function ok(): Response {
  return new Response(JSON.stringify({ id: "msg_1", type: "message", content: [] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

/** `/v1/messages` POSTs consume `responses` in order; any other URL gets an empty 200. */
function mockFetch(responses: Array<() => Response>) {
  const bodies: Array<Record<string, unknown>> = [];
  const original = globalThis.fetch;
  let i = 0;
  globalThis.fetch = (async (input: unknown, init: { body?: unknown } = {}) => {
    if (!String(input).includes("/v1/messages")) {
      return new Response("{}", { status: 200, headers: { "Content-Type": "application/json" } });
    }
    bodies.push(JSON.parse(String(init.body ?? "{}")));
    const next = responses[Math.min(i, responses.length - 1)];
    i++;
    return next();
  }) as typeof globalThis.fetch;
  return { bodies, restore: () => void (globalThis.fetch = original) };
}

function error400(text: string) {
  return () => new Response(text, { status: 400, headers: { "Content-Type": "application/json" } });
}

function advisorConversation() {
  return {
    model: "claude-opus-5",
    max_tokens: 8,
    tools: [{ type: "advisor_20260301", name: "advisor", model: "claude-opus-5" }],
    messages: [
      { role: "user", content: "plan the migration" },
      {
        role: "assistant",
        content: [
          { type: "text", text: "Asking the advisor." },
          { type: "server_tool_use", id: "srvtoolu_1", name: "advisor", input: {} },
          {
            type: "advisor_tool_result",
            tool_use_id: "srvtoolu_1",
            content: {
              type: "advisor_redacted_result",
              encrypted_content: "EncryptedByAnotherOrg==",
              stop_reason: "end_turn",
            },
          },
          { type: "server_tool_use", id: "srvtoolu_2", name: "advisor", input: {} },
          {
            type: "advisor_tool_result",
            tool_use_id: "srvtoolu_2",
            content: { type: "advisor_result", text: "plain advice", stop_reason: "end_turn" },
          },
          { type: "text", text: "Done." },
        ],
      },
      { role: "user", content: "continue" },
    ],
  };
}

function run(body: Record<string, unknown>) {
  return new DefaultExecutor("claude").execute({
    model: "claude-opus-5",
    body,
    stream: false,
    credentials: {
      connectionId: "conn-advisor",
      accessToken: "sk-ant-oat-conn-advisor",
      providerSpecificData: {},
    },
    skipUpstreamRetry: true,
  });
}

function assistantContent(body: Record<string, unknown> | undefined) {
  const messages = (body?.messages ?? []) as Array<{ role: string; content: unknown }>;
  return messages.find((m) => m.role === "assistant")?.content as Array<Record<string, unknown>>;
}

test("undecryptable advisor 400 retries once on the same connection with redacted results marked unavailable", async () => {
  const { bodies, restore } = mockFetch([error400(ADVISOR_400), ok]);
  try {
    const result = await run(advisorConversation());
    assert.equal(result.response.status, 200, "the retry's success is returned");
  } finally {
    restore();
  }
  assert.equal(bodies.length, 2, "exactly one retry");
  assert.equal(
    (assistantContent(bodies[0])[2].content as { type: string }).type,
    "advisor_redacted_result",
    "first attempt sends the client's blocks as-is"
  );

  const retried = assistantContent(bodies[1]);
  assert.deepEqual(
    retried.map((b) => b.type),
    [
      "text",
      "server_tool_use",
      "advisor_tool_result",
      "server_tool_use",
      "advisor_tool_result",
      "text",
    ],
    "every server_tool_use keeps its result and no block is dropped"
  );
  assert.deepEqual(retried[2], {
    type: "advisor_tool_result",
    tool_use_id: "srvtoolu_1",
    content: { type: "advisor_tool_result_error", error_code: "unavailable" },
  });
  assert.deepEqual(
    retried[4].content,
    { type: "advisor_result", text: "plain advice", stop_reason: "end_turn" },
    "unencrypted advisor results are untouched"
  );
  assert.equal(JSON.stringify(bodies[1]).includes("EncryptedByAnotherOrg"), false);
  assert.deepEqual(
    (bodies[1].messages as Array<{ role: string }>).map((m) => m.role),
    ["user", "assistant", "user"]
  );
});

test("undecryptable advisor 400 retries at most once and returns the second failure", async () => {
  const { bodies, restore } = mockFetch([error400(ADVISOR_400), error400(ADVISOR_400), ok]);
  try {
    const result = await run(advisorConversation());
    assert.equal(result.response.status, 400, "a second failure falls through to combo fallback");
  } finally {
    restore();
  }
  assert.equal(bodies.length, 2, "no second advisor retry");
});

test("an unrelated 400 does not rewrite advisor results or retry", async () => {
  const { bodies, restore } = mockFetch([
    error400(anthropic400("messages.1.content.0: unexpected block")),
    ok,
  ]);
  try {
    const result = await run(advisorConversation());
    assert.equal(result.response.status, 400);
  } finally {
    restore();
  }
  assert.equal(bodies.length, 1);
});

test("the advisor 400 without any redacted result in the body does not retry", async () => {
  const body = advisorConversation();
  const assistant = body.messages[1] as { content: Array<Record<string, unknown>> };
  assistant.content = assistant.content.filter((_, idx) => idx !== 1 && idx !== 2);
  const { bodies, restore } = mockFetch([error400(ADVISOR_400), ok]);
  try {
    const result = await run(body);
    assert.equal(result.response.status, 400);
  } finally {
    restore();
  }
  assert.equal(bodies.length, 1);
});

test("isAdvisorUndecryptableError matches only Anthropic's exact error message", () => {
  assert.equal(isAdvisorUndecryptableError(ADVISOR_400), true);
  assert.equal(
    isAdvisorUndecryptableError("Advisor tool result content could not be processed."),
    false,
    "raw text is not an Anthropic error envelope"
  );
  assert.equal(
    isAdvisorUndecryptableError(anthropic400("Advisor tool result content could not be parsed.")),
    false
  );
  assert.equal(
    isAdvisorUndecryptableError(
      anthropic400("messages.1: Advisor tool result content could not be processed. Retry.")
    ),
    false
  );
  assert.equal(isAdvisorUndecryptableError(""), false);
});

test("replaceRedactedAdvisorResults leaves a body without redacted results unchanged", () => {
  const body = { messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }] };
  const result = replaceRedactedAdvisorResults(body);
  assert.equal(result.replaced, 0);
  assert.equal(result.body, body);
});
