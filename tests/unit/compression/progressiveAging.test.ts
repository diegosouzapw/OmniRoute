import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { applyAging } from "../../../open-sse/services/compression/progressiveAging.ts";
import type { AgingThresholds, Summarizer } from "../../../open-sse/services/compression/types.ts";

function makeMessages(
  count: number,
  role: string = "user",
  prefix: string = "Message"
): Array<{ role: string; content: string }> {
  return Array.from({ length: count }, (_, i) => ({
    role: i % 2 === 0 ? "user" : "assistant",
    content: `${prefix} ${i}: ${"x".repeat(100)}`,
  }));
}

describe("applyAging", () => {
  const defaultThresholds: AgingThresholds = { fullSummary: 5, moderate: 3, light: 2, verbatim: 2 };

  it("returns empty array for empty input", () => {
    const result = applyAging([]);
    assert.deepEqual(result.messages, []);
    assert.equal(result.saved, 0);
  });

  it("returns single message unchanged (verbatim tier)", () => {
    const msgs = [{ role: "user", content: "Hello world" }];
    const result = applyAging(msgs, defaultThresholds);
    assert.equal(result.messages.length, 1);
    assert.equal((result.messages[0] as { content: string }).content, "Hello world");
  });

  it("keeps last 2 messages as verbatim", () => {
    const msgs = makeMessages(10);
    const result = applyAging(msgs, defaultThresholds);
    const last2 = result.messages.slice(-2);
    for (const msg of last2) {
      const content =
        typeof (msg as { content: unknown }).content === "string"
          ? (msg as { content: string }).content
          : "";
      assert.ok(
        !content.startsWith("[COMPRESSED:aging:"),
        `Last message should be verbatim, got: ${content.slice(0, 40)}`
      );
    }
  });

  it("applies fullSummary tier to oldest messages", () => {
    const msgs = makeMessages(10);
    const result = applyAging(msgs, defaultThresholds);
    const first = result.messages[0] as { content: string };
    const content = typeof first.content === "string" ? first.content : "";
    assert.ok(
      content.startsWith("[COMPRESSED:aging:fullSummary]"),
      `Expected fullSummary marker, got: ${content.slice(0, 60)}`
    );
  });

  it("skips messages with [COMPRESSED: prefix (idempotent)", () => {
    const msgs: Array<{ role: string; content: string }> = [
      { role: "assistant", content: "[COMPRESSED:aging:fullSummary] prior summary" },
      { role: "user", content: "New message" },
    ];
    const result = applyAging(msgs, defaultThresholds);
    const first = result.messages[0] as { content: string };
    const content = typeof first.content === "string" ? first.content : "";
    assert.ok(content.startsWith("[COMPRESSED:aging:fullSummary]"));
    assert.ok(!content.includes("[COMPRESSED:aging:fullSummary][COMPRESSED:"));
  });

  it("uses custom thresholds", () => {
    const customThresholds: AgingThresholds = {
      fullSummary: 1,
      moderate: 1,
      light: 1,
      verbatim: 1,
    };
    const msgs = makeMessages(6);
    const result = applyAging(msgs, customThresholds);
    assert.ok(result.messages.length > 0);
  });

  it("accepts custom summarizer", () => {
    const customSummarizer: Summarizer = {
      summarize: () => "[CUSTOM SUMMARY]",
    };
    const msgs = makeMessages(10);
    const result = applyAging(msgs, defaultThresholds, customSummarizer);
    const fullSummaryMsgs = result.messages.filter((m) => {
      const content =
        typeof (m as { content: unknown }).content === "string"
          ? (m as { content: string }).content
          : "";
      return content.includes("[CUSTOM SUMMARY]");
    });
    assert.ok(fullSummaryMsgs.length > 0, "Expected at least one message with custom summary");
  });

  it("computes saved tokens", () => {
    const msgs = makeMessages(10);
    const result = applyAging(msgs, defaultThresholds);
    assert.ok(typeof result.saved === "number");
  });

  it("handles 2-message conversation (all verbatim)", () => {
    const msgs = [
      { role: "user", content: "Hello" },
      { role: "assistant", content: "Hi there" },
    ];
    const result = applyAging(msgs, defaultThresholds);
    assert.equal(result.messages.length, 2);
    for (const msg of result.messages) {
      const content =
        typeof (msg as { content: unknown }).content === "string"
          ? (msg as { content: string }).content
          : "";
      assert.ok(!content.startsWith("[COMPRESSED:"));
    }
  });

  it("handles 5-message conversation with light tier", () => {
    const msgs = makeMessages(5);
    const thresholds: AgingThresholds = { fullSummary: 10, moderate: 10, light: 3, verbatim: 1 };
    const result = applyAging(msgs, thresholds);
    assert.ok(result.messages.length > 0);
  });

  it("handles messages with array content", () => {
    const msgs = [{ role: "user", content: [{ type: "text", text: "Hello from array" }] }];
    const result = applyAging(msgs, defaultThresholds);
    assert.equal(result.messages.length, 1);
  });

  it("does not mutate original messages array", () => {
    const original = makeMessages(5);
    const originalCopy = JSON.parse(JSON.stringify(original));
    applyAging(original, defaultThresholds);
    assert.deepEqual(original, originalCopy);
  });

  it("handles all-assistant messages", () => {
    const msgs = Array.from({ length: 8 }, (_, i) => ({
      role: "assistant" as const,
      content: `Response ${i}: ${"y".repeat(100)}`,
    }));
    const result = applyAging(msgs, defaultThresholds);
    assert.ok(result.messages.length > 0);
  });

  it("handles mixed user/assistant/tool messages", () => {
    const msgs = [
      { role: "user", content: "Fix the bug" },
      { role: "assistant", content: "I'll fix it" },
      { role: "tool", content: "Result: fixed" },
      { role: "assistant", content: "Done" },
    ];
    const result = applyAging(msgs, defaultThresholds);
    assert.ok(result.messages.length > 0);
  });

  it("idempotent — running twice produces same output", () => {
    const msgs = makeMessages(10);
    const first = applyAging(msgs, defaultThresholds);
    const second = applyAging(first.messages, defaultThresholds);
    const firstContent = JSON.stringify(
      first.messages.map((m) => (m as { content: string }).content)
    );
    const secondContent = JSON.stringify(
      second.messages.map((m) => (m as { content: string }).content)
    );
    assert.equal(firstContent, secondContent);
  });
});
