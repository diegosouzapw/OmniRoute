import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";

import type { ProviderCredentials } from "../../open-sse/executors/base.ts";
import {
  __resetClaudeWebSessionForTesting,
  __setClaudeWebSessionNowForTesting,
  commitClaudeWebTurn,
  invalidateClaudeWebTurn,
  prepareClaudeWebTurn,
  type PrepareClaudeWebTurnInput,
} from "../../open-sse/executors/claude-web/session.ts";

const CONVERSATION_UUID = "00000000-0000-4000-8000-000000000010";
const PARENT_UUID = "00000000-0000-4000-8000-000000000011";

function input(
  body: Record<string, unknown>,
  overrides: Partial<PrepareClaudeWebTurnInput> = {}
): PrepareClaudeWebTurnInput {
  return {
    body,
    model: "claude-sonnet-5",
    credentials: { connectionId: "connection-a" },
    organizationId: "organization-a",
    normalizedCookie: "sessionKey=cookie-a",
    ...overrides,
  };
}

function firstTurnBody(question = "first question"): Record<string, unknown> {
  return { messages: [{ role: "user", content: question }] };
}

function followUpBody(
  firstQuestion = "first question",
  firstAnswer = "first answer",
  nextQuestion = "second question"
): Record<string, unknown> {
  return {
    messages: [
      { role: "user", content: firstQuestion },
      { role: "assistant", content: firstAnswer },
      { role: "user", content: nextQuestion },
    ],
  };
}

beforeEach(() => {
  __resetClaudeWebSessionForTesting();
  __setClaudeWebSessionNowForTesting(1_000_000);
});

afterEach(() => {
  __resetClaudeWebSessionForTesting();
  __setClaudeWebSessionNowForTesting(null);
});

describe("Claude Web conversation sessions", () => {
  it("reuses a committed conversation for the matching transcript prefix", () => {
    const first = prepareClaudeWebTurn(input(firstTurnBody()));
    assert.equal(first.endpointSuffix, "completion");
    assert.equal(first.pageUrl, "https://claude.ai/new");
    assert.equal("parent_message_uuid" in first.payload, false);
    commitClaudeWebTurn(first, "first answer");

    const followUp = prepareClaudeWebTurn(input(followUpBody()));

    assert.equal(followUp.conversationId, first.conversationId);
    assert.equal(followUp.parentMessageUuid, first.assistantMessageUuid);
    assert.equal(followUp.pageUrl, `https://claude.ai/chat/${first.conversationId}`);
    assert.equal(followUp.payload.prompt, "second question");
    assert.equal("create_conversation_params" in followUp.payload, false);
  });

  it("recovers every normalized message when multi-turn history misses the cache", () => {
    const recovered = prepareClaudeWebTurn(
      input({
        messages: [
          { role: "system", content: "system rules" },
          { role: "user", content: "old question" },
          { role: "assistant", content: "old answer" },
          { role: "tool", content: [{ type: "text", text: "tool result" }] },
          { role: "user", content: "new question" },
        ],
      })
    );

    assert.notEqual(recovered.payload.prompt, "new question");
    for (const expected of [
      "system rules",
      "old question",
      "old answer",
      "tool result",
      "new question",
    ]) {
      assert.match(recovered.payload.prompt, new RegExp(expected));
    }
    assert.ok(recovered.payload.create_conversation_params);
  });

  it("isolates cache entries by connection, cookie fingerprint, organization, and model", () => {
    const first = prepareClaudeWebTurn(input(firstTurnBody()));
    commitClaudeWebTurn(first, "first answer");

    const isolatedInputs = [
      input(followUpBody(), { credentials: { connectionId: "connection-b" } }),
      input(followUpBody(), { organizationId: "organization-b" }),
      input(followUpBody(), { model: "claude-opus-4-8" }),
    ];
    for (const isolated of isolatedInputs) {
      assert.notEqual(prepareClaudeWebTurn(isolated).conversationId, first.conversationId);
    }

    const cookieScoped = prepareClaudeWebTurn(
      input(firstTurnBody("cookie question"), {
        credentials: {},
        normalizedCookie: "sessionKey=cookie-one",
      })
    );
    commitClaudeWebTurn(cookieScoped, "cookie answer");
    const otherCookie = prepareClaudeWebTurn(
      input(followUpBody("cookie question", "cookie answer", "cookie follow-up"), {
        credentials: {},
        normalizedCookie: "sessionKey=cookie-two",
      })
    );
    assert.notEqual(otherCookie.conversationId, cookieScoped.conversationId);
  });

  it("validates the strict claude_web extension", () => {
    const invalidExtensions = [
      { operation: "duplicate" },
      { conversation_id: "not-a-uuid" },
      { parent_message_uuid: "not-a-uuid" },
      { timezone: "Mars/Olympus_Mons" },
      { locale: "not_a_locale" },
      { tool_states: Array.from({ length: 129 }, () => null) },
      { unknown_field: true },
    ];

    for (const claudeWeb of invalidExtensions) {
      assert.throws(() =>
        prepareClaudeWebTurn(input({ ...firstTurnBody(), claude_web: claudeWeb }))
      );
    }
  });

  it("resolves locale and timezone from extension, provider data, then runtime", () => {
    const credentials: ProviderCredentials = {
      connectionId: "connection-a",
      providerSpecificData: { timezone: "America/New_York", locale: "fr-FR" },
    };
    const explicit = prepareClaudeWebTurn(
      input(
        {
          ...firstTurnBody(),
          claude_web: { timezone: "Asia/Seoul", locale: "ko-KR", tool_states: [] },
        },
        { credentials }
      )
    );
    assert.equal(explicit.payload.timezone, "Asia/Seoul");
    assert.equal(explicit.payload.locale, "ko-KR");
    assert.deepEqual(explicit.payload.tool_states, []);

    const provider = prepareClaudeWebTurn(input(firstTurnBody("provider"), { credentials }));
    assert.equal(provider.payload.timezone, "America/New_York");
    assert.equal(provider.payload.locale, "fr-FR");

    const runtime = prepareClaudeWebTurn(
      input(firstTurnBody("runtime"), { credentials: { connectionId: "connection-a" } })
    );
    const runtimeOptions = Intl.DateTimeFormat().resolvedOptions();
    assert.equal(runtime.payload.timezone, runtimeOptions.timeZone || "UTC");
    assert.equal(runtime.payload.locale, runtimeOptions.locale || "en-US");
  });

  it("builds explicit retry state and fails closed when retry state is absent", () => {
    const retry = prepareClaudeWebTurn(
      input({
        ...followUpBody(),
        claude_web: {
          operation: "retry",
          conversation_id: CONVERSATION_UUID,
          parent_message_uuid: PARENT_UUID,
        },
      })
    );

    assert.equal(retry.endpointSuffix, "retry_completion");
    assert.equal(retry.conversationId, CONVERSATION_UUID);
    assert.equal(retry.parentMessageUuid, PARENT_UUID);
    assert.equal(retry.payload.prompt, "");
    assert.deepEqual(retry.payload.turn_message_uuids, {
      assistant_message_uuid: retry.assistantMessageUuid,
    });
    assert.equal("create_conversation_params" in retry.payload, false);

    assert.throws(
      () => prepareClaudeWebTurn(input({ ...firstTurnBody(), claude_web: { operation: "retry" } })),
      /conversation.*parent|parent.*conversation/i
    );
  });

  it("accepts the legacy credentials conversationId with an explicit parent", () => {
    const credentials = {
      connectionId: "connection-a",
      conversationId: "legacy-conversation",
    } as ProviderCredentials;
    const turn = prepareClaudeWebTurn(
      input(
        {
          ...firstTurnBody(),
          claude_web: { parent_message_uuid: PARENT_UUID },
        },
        { credentials }
      )
    );

    assert.equal(turn.conversationId, "legacy-conversation");
    assert.equal(turn.parentMessageUuid, PARENT_UUID);
    assert.equal("create_conversation_params" in turn.payload, false);
  });

  it("invalidates reusable continuation state", () => {
    const first = prepareClaudeWebTurn(input(firstTurnBody()));
    commitClaudeWebTurn(first, "first answer");
    const reusable = prepareClaudeWebTurn(input(followUpBody()));
    assert.equal(reusable.conversationId, first.conversationId);

    invalidateClaudeWebTurn(reusable, "conversation");
    const afterInvalidation = prepareClaudeWebTurn(input(followUpBody()));
    assert.notEqual(afterInvalidation.conversationId, first.conversationId);
  });

  it("expires entries after 30 minutes", () => {
    const first = prepareClaudeWebTurn(input(firstTurnBody()));
    commitClaudeWebTurn(first, "first answer");

    __setClaudeWebSessionNowForTesting(1_000_000 + 30 * 60 * 1000 + 1);
    const expired = prepareClaudeWebTurn(input(followUpBody()));
    assert.notEqual(expired.conversationId, first.conversationId);
  });

  it("evicts the oldest entry when the 5,000-entry cap is exceeded", () => {
    const oldest = prepareClaudeWebTurn(input(firstTurnBody("question-0")));
    commitClaudeWebTurn(oldest, "answer-0");

    for (let index = 1; index <= 5_000; index += 1) {
      const turn = prepareClaudeWebTurn(input(firstTurnBody(`question-${index}`)));
      commitClaudeWebTurn(turn, `answer-${index}`);
    }

    const evicted = prepareClaudeWebTurn(
      input(followUpBody("question-0", "answer-0", "after eviction"))
    );
    assert.notEqual(evicted.conversationId, oldest.conversationId);
  });

  it("prepares concurrent branches without mutating their shared parent", () => {
    const first = prepareClaudeWebTurn(input(firstTurnBody()));
    commitClaudeWebTurn(first, "first answer");

    const left = prepareClaudeWebTurn(
      input(followUpBody("first question", "first answer", "left branch"))
    );
    const right = prepareClaudeWebTurn(
      input(followUpBody("first question", "first answer", "right branch"))
    );

    assert.equal(left.parentMessageUuid, first.assistantMessageUuid);
    assert.equal(right.parentMessageUuid, first.assistantMessageUuid);
    assert.notEqual(left.assistantMessageUuid, right.assistantMessageUuid);

    commitClaudeWebTurn(left, "left answer");
    invalidateClaudeWebTurn(right);
    const leftFollowUp = prepareClaudeWebTurn(
      input({
        messages: [
          { role: "user", content: "first question" },
          { role: "assistant", content: "first answer" },
          { role: "user", content: "left branch" },
          { role: "assistant", content: "left answer" },
          { role: "user", content: "continue left" },
        ],
      })
    );
    assert.equal(leftFollowUp.conversationId, first.conversationId);
  });
});
