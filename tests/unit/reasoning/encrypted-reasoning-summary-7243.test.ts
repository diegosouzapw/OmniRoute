import { test } from "node:test";
import assert from "node:assert/strict";

const { getVisibleResponsesReasoningSummaryText } = await import(
  "../../../open-sse/translator/response/openai-responses/pureHelpers.ts"
);

test("#7243 getVisibleResponsesReasoningSummaryText returns upstream plaintext summary", () => {
  const item = {
    type: "reasoning",
    summary: [{ type: "summary_text", text: "Planning the next edit." }],
    encrypted_content: "opaque-blob",
  };

  assert.equal(getVisibleResponsesReasoningSummaryText(item), "Planning the next edit.");
});

test("#7243 getVisibleResponsesReasoningSummaryText suppresses synthetic text for encrypted-only reasoning", () => {
  const item = {
    type: "reasoning",
    encrypted_content: "opaque-blob",
  };

  assert.equal(getVisibleResponsesReasoningSummaryText(item), "");
  assert.doesNotMatch(
    getVisibleResponsesReasoningSummaryText(item),
    /OmniRoute cannot recover|encrypted private reasoning/i
  );
});

test("#7243 getVisibleResponsesReasoningSummaryText returns empty for non-reasoning or empty summary", () => {
  assert.equal(getVisibleResponsesReasoningSummaryText(null), "");
  assert.equal(getVisibleResponsesReasoningSummaryText({ type: "message" }), "");
  assert.equal(getVisibleResponsesReasoningSummaryText({ type: "reasoning", summary: [] }), "");
});
