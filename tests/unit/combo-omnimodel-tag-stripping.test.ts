import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  stripModelTags,
  injectModelTag,
} from "../../open-sse/services/comboAgentMiddleware.ts";

// Regression for the non-global CACHE_TAG_PATTERN bug: `.replace()` with a
// non-global regex only removes the FIRST match, so messages carrying more than
// one <omniModel> tag (e.g. an Open WebUI follow-up/title request that inlines the
// whole chat history) leaked the remaining tags straight to the provider — exactly
// what stripModelTags is documented to prevent (#454).
describe("comboAgentMiddleware — <omniModel> tag stripping (non-global regex bug)", () => {
  test("stripModelTags removes ALL <omniModel> tags from a single message", () => {
    const messages = [
      {
        role: "user",
        content:
          "first <omniModel>claude/claude-opus-4-8</omniModel> " +
          "middle <omniModel>claude/claude-opus-4-8</omniModel> " +
          "end <omniModel>claude/claude-opus-4-8</omniModel>",
      },
    ];

    const stripped = stripModelTags(messages);
    const remaining = (String(stripped[0].content).match(/<omniModel>/g) || []).length;

    assert.equal(remaining, 0, "Provider must never see any <omniModel> tag (#454)");
    assert.ok(
      !String(stripped[0].content).includes("<omniModel>"),
      "Stripped content should contain no tag fragments"
    );
  });

  test("injectModelTag does not leave duplicate tags when the message already has several", () => {
    const messages = [
      { role: "user", content: "Continue" },
      {
        role: "assistant",
        content:
          "answer <omniModel>old/model-a</omniModel> more <omniModel>old/model-b</omniModel>",
      },
    ];

    const result = injectModelTag(messages, "new/model");
    const tagCount = (String(result[1].content).match(/<omniModel>/g) || []).length;

    assert.equal(tagCount, 1, "Exactly one (the freshly pinned) tag should remain");
    assert.ok(
      String(result[1].content).includes("<omniModel>new/model</omniModel>"),
      "The remaining tag must be the new pin"
    );
    assert.ok(
      !String(result[1].content).includes("old/model"),
      "All previous pins must be cleaned"
    );
  });
});
