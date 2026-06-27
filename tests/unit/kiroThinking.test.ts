/**
 * Unit tests for the Kiro inline `<thinking>` stream splitter.
 *
 * Ported from decolua/9router#1273 (tests/unit/kiroThinking.test.js).
 * Tests are framework-agnostic: Node.js native test runner (tsx/esm).
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { splitInlineThinking, flushPendingThinking } from "../../open-sse/executors/kiroThinking.ts";

/** Build a fresh state + recorders for each test. */
function makeHarness() {
  const state = { thinkingMode: false, pendingTag: "" };
  const contentParts: string[] = [];
  const reasoningParts: string[] = [];
  const onContent = (s: string) => contentParts.push(s);
  const onReasoning = (s: string) => reasoningParts.push(s);
  const feed = (raw: string | null | undefined) =>
    splitInlineThinking(state, raw, onContent, onReasoning);
  const flush = () => flushPendingThinking(state, onContent, onReasoning);
  return {
    state,
    feed,
    flush,
    get content() {
      return contentParts.join("");
    },
    get reasoning() {
      return reasoningParts.join("");
    },
  };
}

describe("splitInlineThinking", () => {
  it("passes through plain content with no tags", () => {
    const h = makeHarness();
    h.feed("Bonjour, this is just an answer.");
    h.flush();
    assert.equal(h.content, "Bonjour, this is just an answer.");
    assert.equal(h.reasoning, "");
    assert.equal(h.state.thinkingMode, false);
    assert.equal(h.state.pendingTag, "");
  });

  it("splits a single-shot input with one full block", () => {
    const h = makeHarness();
    h.feed("Hello <thinking>secret thoughts</thinking> world");
    h.flush();
    assert.equal(h.content, "Hello  world");
    assert.equal(h.reasoning, "secret thoughts");
    assert.equal(h.state.thinkingMode, false);
  });

  it("handles a tag split across two slices (open tag)", () => {
    // The opening `<thinking>` arrives across two reads.
    const h = makeHarness();
    h.feed("Hi <thi");
    assert.equal(h.content, "Hi "); // only the safe prefix is flushed
    assert.equal(h.state.pendingTag, "<thi");

    h.feed("nking>thoughts</thinking> bye");
    h.flush();
    assert.equal(h.content, "Hi  bye");
    assert.equal(h.reasoning, "thoughts");
    assert.equal(h.state.pendingTag, "");
  });

  it("handles a tag split across two slices (close tag)", () => {
    const h = makeHarness();
    h.feed("<thinking>step 1</thi");
    assert.equal(h.reasoning, "step 1");
    assert.equal(h.state.thinkingMode, true);
    assert.equal(h.state.pendingTag, "</thi");

    h.feed("nking>final answer");
    h.flush();
    assert.equal(h.content, "final answer");
    assert.equal(h.reasoning, "step 1");
    assert.equal(h.state.thinkingMode, false);
  });

  it("handles a tag split character-by-character", () => {
    const h = makeHarness();
    const stream = "before <thinking>hidden</thinking>after";
    for (const ch of stream) h.feed(ch);
    h.flush();
    assert.equal(h.content, "before after");
    assert.equal(h.reasoning, "hidden");
    assert.equal(h.state.thinkingMode, false);
    assert.equal(h.state.pendingTag, "");
  });

  it("handles multiple thinking blocks in sequence", () => {
    const h = makeHarness();
    h.feed("<thinking>plan A</thinking>step1<thinking>plan B</thinking>step2");
    h.flush();
    assert.equal(h.content, "step1step2");
    assert.equal(h.reasoning, "plan Aplan B");
    assert.equal(h.state.thinkingMode, false);
  });

  it("emits leftover content when the stream ends mid-tag", () => {
    const h = makeHarness();
    h.feed("ok <thi");
    assert.equal(h.state.pendingTag, "<thi");
    h.flush();
    // Not in thinking mode — leftover goes to content.
    assert.equal(h.content, "ok <thi");
    assert.equal(h.reasoning, "");
  });

  it("emits leftover reasoning when the stream ends mid-close-tag", () => {
    const h = makeHarness();
    h.feed("<thinking>partial</thi");
    assert.equal(h.state.thinkingMode, true);
    assert.equal(h.state.pendingTag, "</thi");
    h.flush();
    // Leftover stays in reasoning because we never saw the close tag.
    assert.equal(h.reasoning, "partial</thi");
    assert.equal(h.content, "");
  });

  it("does not consume tag-shaped content that isn't a real tag boundary", () => {
    const h = makeHarness();
    h.feed("a<b>c</b>d");
    h.flush();
    assert.equal(h.content, "a<b>c</b>d");
    assert.equal(h.reasoning, "");
  });

  it("only holds back trailing characters that look like a partial OPEN tag (outside thinking mode)", () => {
    const h = makeHarness();
    h.feed("answer text <think");
    assert.equal(h.content, "answer text "); // safe prefix flushed eagerly
    assert.equal(h.state.pendingTag, "<think");

    h.feed("ing>secret</thinking>tail");
    h.flush();
    assert.equal(h.content, "answer text tail");
    assert.equal(h.reasoning, "secret");
  });

  it("does not hold back partial CLOSE tag while outside thinking mode", () => {
    const h = makeHarness();
    h.feed("answer text </think");
    h.feed(" something else");
    h.flush();
    assert.equal(h.content, "answer text </think something else");
    assert.equal(h.reasoning, "");
  });

  it("survives empty / null / undefined slices", () => {
    const h = makeHarness();
    h.feed("");
    h.feed(undefined);
    h.feed(null);
    h.feed("hello");
    h.flush();
    assert.equal(h.content, "hello");
    assert.equal(h.reasoning, "");
  });

  it("flushPendingThinking is a no-op when nothing is pending", () => {
    const h = makeHarness();
    h.feed("just content");
    h.flush();
    h.flush(); // second flush should be a no-op
    assert.equal(h.content, "just content");
    assert.equal(h.reasoning, "");
  });
});
