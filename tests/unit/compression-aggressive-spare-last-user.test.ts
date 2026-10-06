import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { compressAggressive } from "../../open-sse/services/compression/aggressive.ts";
import { extractTextContent } from "../../open-sse/services/compression/messageContent.ts";

describe("Aggressive compression: spare live user instruction", () => {
  it("spares live (last) user message and keeps tail marker intact", () => {
    const tailMarker = "TAILMARKER-CRITICAL-PAYLOAD-9988";
    // ~20KB content with tail marker at the end
    const longContent =
      "Let us review this codebase in detail.\n" +
      "const x = 1;\n".repeat(1500) +
      `\n${tailMarker}`;
    assert.ok(longContent.length > 16000, `Expected content > 16KB, got ${longContent.length}`);

    const messages = [{ role: "user", content: longContent }];

    const result = compressAggressive(messages);
    const lastMsg = result.messages[0];
    const text = extractTextContent(lastMsg.content);

    assert.ok(text.includes(tailMarker), "Tail marker must be preserved in live user message");
    assert.equal(text, longContent, "Live user message must remain verbatim");
  });

  it("compresses historical long user messages while preserving live user message", () => {
    const oldTailMarker = "OLD-TAIL-MARKER-HISTORICAL-1122";
    const liveTailMarker = "LIVE-TAIL-MARKER-CURRENT-3344";
    const oldLongContent =
      "Historical prompt:\n" + "const oldCode = 2;\n".repeat(1200) + `\n${oldTailMarker}`;
    const liveLongContent =
      "Current live instruction:\n" + "const liveCode = 3;\n".repeat(1200) + `\n${liveTailMarker}`;

    const messages = [
      { role: "user", content: oldLongContent },
      { role: "assistant", content: "Understood, I am ready for the next instruction." },
      { role: "user", content: liveLongContent },
    ];

    const result = compressAggressive(messages);
    assert.equal(result.messages.length, 3);

    const oldMsgText = extractTextContent(result.messages[0].content);
    const assistantMsgText = extractTextContent(result.messages[1].content);
    const liveMsgText = extractTextContent(result.messages[2].content);

    // Old message should be summarized
    assert.ok(oldMsgText.startsWith("[COMPRESSED:"), "Old message should be compressed");
    assert.ok(
      oldMsgText.length < oldLongContent.length,
      "Old message should be significantly shortened"
    );

    // Assistant message preserved
    assert.equal(assistantMsgText, "Understood, I am ready for the next instruction.");

    // Live message must remain intact
    assert.ok(liveMsgText.includes(liveTailMarker), "Live message tail marker must survive");
    assert.equal(liveMsgText, liveLongContent, "Live message must remain verbatim");
  });

  it("F1: Step 2 applyAging does not compress the last user message even when aging threshold triggers", () => {
    const livePrompt = "Live user command: deploy to staging immediately and verify health.";
    const messages = [
      { role: "user", content: "Historical step 1: initial setup" },
      { role: "assistant", content: "Step 1 completed successfully." },
      { role: "user", content: "Historical step 2: database migrations" },
      { role: "assistant", content: "Step 2 migrations applied." },
      { role: "user", content: "Historical step 3: seed test data" },
      { role: "assistant", content: "Step 3 seed finished." },
      { role: "user", content: livePrompt },
      { role: "assistant", content: "Acknowledged, preparing to deploy." },
      { role: "assistant", content: "Checking cluster health." },
      { role: "assistant", content: "Waiting for approval." },
    ];

    // With 10 messages, live user message is at index 6 (distanceFromEnd = 3).
    // In standard aging, distanceFromEnd 3 triggers moderate tier (caveman).
    // The last user message must be spared from aging.
    const result = compressAggressive(messages, {
      thresholds: { fullSummary: 5, moderate: 3, light: 2, verbatim: 1 },
    });

    const liveUserMsg = result.messages[6];
    const text = extractTextContent(liveUserMsg.content);
    assert.equal(text, livePrompt, "Last user message must not be touched by applyAging");
    assert.ok(!text.startsWith("[COMPRESSED:aging:"), "Last user message must not have aging marker");
  });

  it("F2: Step 4 caveman fallback does not compress the last user message", () => {
    const livePrompt =
      "Please urgently check if the server is running on the default port 8080 and report back.";
    const messages = [
      { role: "user", content: "Earlier question about logs." },
      { role: "assistant", content: "Earlier answer about logs." },
      { role: "user", content: livePrompt },
    ];

    // Disable summarizer to trigger Step 4 fallback path with high minSavingsThreshold
    const result = compressAggressive(messages, {
      summarizerEnabled: false,
      minSavingsThreshold: 0.99,
    });

    const liveUserMsg = result.messages[2];
    const text = extractTextContent(liveUserMsg.content);
    assert.equal(text, livePrompt, "Last user message must remain verbatim despite caveman fallback");
  });

  it("F2: Step 4 lite fallback does not compress the last user message", () => {
    const livePrompt =
      "Please    verify    the    whitespace    formatting    in    the    target    output.";
    const messages = [
      { role: "user", content: "Old setup prompt." },
      { role: "assistant", content: "Old setup response." },
      { role: "user", content: livePrompt },
    ];

    const result = compressAggressive(messages, {
      summarizerEnabled: false,
      minSavingsThreshold: 0.99,
    });

    const liveUserMsg = result.messages[2];
    const text = extractTextContent(liveUserMsg.content);
    assert.equal(text, livePrompt, "Last user message must keep verbatim whitespace in fallback");
  });

  it("F3: does not duplicate [COMPRESSED:summary] marker when mid-string markers or repeated summaries occur", () => {
    const oldLongContent =
      "Historical log analysis containing [COMPRESSED:summary] in text:\n" +
      "function analyze() { return 42; }\n".repeat(1200);

    const messages = [
      { role: "user", content: oldLongContent },
      { role: "assistant", content: "Done." },
      { role: "user", content: "Short follow-up" },
    ];

    const result = compressAggressive(messages);
    const oldMsgText = extractTextContent(result.messages[0].content);

    assert.ok(oldMsgText.startsWith("[COMPRESSED:summary]"), "Should start with compressed marker");
    assert.equal(
      oldMsgText.startsWith("[COMPRESSED:summary] [COMPRESSED:summary]"),
      false,
      "Must not contain doubled marker prefix"
    );

    // F3: Ensure count of leading markers is exactly 1 (no mid-string duplication / corrupt prefix)
    const markerMatch = oldMsgText.match(/^\[COMPRESSED:summary\]\s+/g);
    assert.ok(markerMatch && markerMatch.length === 1, "Exactly one leading marker prefix expected");
  });
});
