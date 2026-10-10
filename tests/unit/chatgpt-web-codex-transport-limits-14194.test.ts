import assert from "node:assert/strict";
import test from "node:test";

import { requireChatGptWebCodexRoute } from "../../open-sse/executors/chatgpt-web-codex/models.ts";
import {
  assertChatGptWebInputWithinLimits,
  assertChatGptWebMultipartInputWithinLimits,
} from "../../open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/browser-worker.ts";

// Conservative transport policy from upstream v6.1.7, commit f9ad4ae83a579287105ad822dd0c3e0029b04ef6.
// These literals describe the preflight contract, not a new measurement of the remote service.
const LIMIT_ERROR = {
  name: "ChatGptWebAdapterError",
  status: 400,
  errorType: "invalid_request_error",
  code: "context_length_exceeded",
  retryable: false,
};

function preflight(
  id: string,
  proAvailable: boolean,
  chars: number,
  inputTokens = 1_000,
  messageTokens = 1_000
) {
  const route = requireChatGptWebCodexRoute(id);
  assertChatGptWebInputWithinLimits(
    inputTokens,
    messageTokens,
    route.backendModel,
    route.effort,
    { localToolsEnabled: true, solAvailable: route.sol, proAvailable },
    chars
  );
}

for (const [id, proAvailable] of [
  ["medium", false],
  ["high", false],
  ["medium", true],
  ["high", true],
  ["extra-high", true],
] as const) {
  test(`${id} on ${proAvailable ? "Pro" : "Plus"} accepts 500k chars and rejects the next char`, () => {
    const model = `chatgpt-web-codex/${id}`;
    assert.doesNotThrow(() => preflight(model, proAvailable, 500_000));
    assert.throws(() => preflight(model, proAvailable, 500_001), LIMIT_ERROR);
  });
}

for (const [id, proAvailable, limit] of [
  ["instant", false, 211_256],
  ["instant", true, 545_000],
  ["pro", true, 1_635_000],
] as const) {
  test(`${id} on ${proAvailable ? "Pro" : "Plus"} retains its distinct character boundary`, () => {
    assert.doesNotThrow(() => preflight(id, proAvailable, limit));
    assert.throws(() => preflight(id, proAvailable, limit + 1), LIMIT_ERROR);
  });
}

for (const id of ["luna", "think"]) {
  test(`${id} retains its token limit without acquiring a reasoning character limit`, () => {
    assert.doesNotThrow(() => preflight(id, false, 500_001, 28_000));
    assert.throws(() => preflight(id, false, 1, 28_001), LIMIT_ERROR);
  });
}

test("the character ceiling does not replace Plus context-token rejection", () => {
  assert.doesNotThrow(() => preflight("medium", false, 1, 89_999));
  assert.throws(() => preflight("medium", false, 1, 90_000), LIMIT_ERROR);
});

test("the character ceiling does not replace Pro message-token rejection", () => {
  assert.doesNotThrow(() => preflight("high", true, 1, 104_000, 103_000));
  assert.throws(() => preflight("high", true, 1, 104_000, 103_001), LIMIT_ERROR);
});

test("unknown backend models remain rejected before transport", () => {
  assert.throws(
    () =>
      assertChatGptWebInputWithinLimits(
        1_000,
        1_000,
        "unknown-model",
        "medium",
        { localToolsEnabled: true, solAvailable: true, proAvailable: false },
        1
      ),
    /context limit is not defined for model: unknown-model/
  );
});

for (const proAvailable of [false, true]) {
  for (const oversizedPart of ["stage", "final"] as const) {
    test(`multipart ${oversizedPart} on ${proAvailable ? "Pro" : "Plus"} respects the 500k boundary`, () => {
      const route = requireChatGptWebCodexRoute("high");
      const checkMultipart = (chars: number) =>
        assertChatGptWebMultipartInputWithinLimits(
          1_000,
          1_000,
          route.backendModel,
          route.effort,
          { localToolsEnabled: true, solAvailable: true, proAvailable },
          chars,
          2,
          {
            stagingEffort: "medium",
            maxStageMessageTokens: 1_000,
            maxStageChars: oversizedPart === "stage" ? chars : 1,
            finalMessageTokens: 1_000,
            finalMessageChars: oversizedPart === "final" ? chars : 1,
          }
        );
      assert.doesNotThrow(() => checkMultipart(500_000));
      assert.throws(() => checkMultipart(500_001), LIMIT_ERROR);
    });
  }
}
