import test from "node:test";
import assert from "node:assert/strict";

const { hasThinkTags, extractThinkTags, processStreamingThinkDelta, flushThinkBuffer } =
  await import("../../open-sse/utils/thinkTagParser.ts");

test("hasThinkTags detects opening tags and ignores empty input", () => {
  assert.equal(hasThinkTags("before <think>plan</think> after"), true);
  assert.equal(hasThinkTags("plain answer"), false);
  assert.equal(hasThinkTags(""), false);
});

test("extractThinkTags returns reasoning and cleaned content", () => {
  const result = extractThinkTags("Hello <think>step 1</think> world");

  assert.deepEqual(result, {
    reasoning: "step 1",
    content: "Hello  world",
  });
});

test("extractThinkTags concatenates multiple think blocks and handles unclosed tags", () => {
  assert.deepEqual(extractThinkTags("A <think>first</think> B <think>second</think> C"), {
    reasoning: "first\nsecond",
    content: "A  B  C",
  });

  assert.deepEqual(extractThinkTags("prefix <think>unfinished reasoning"), {
    reasoning: "unfinished reasoning",
    content: "prefix",
  });
});

test("processStreamingThinkDelta extracts content and reasoning across split tags", () => {
  const ctx = { insideThink: false, buffer: "" };

  const first = processStreamingThinkDelta("Hello <thi", ctx);
  const second = processStreamingThinkDelta("nk>plan</th", ctx);
  const third = processStreamingThinkDelta("ink> world", ctx);

  assert.deepEqual(first, {
    reasoningDelta: null,
    contentDelta: "Hell",
  });
  assert.deepEqual(second, {
    reasoningDelta: null,
    contentDelta: "o ",
  });
  assert.deepEqual(third, {
    reasoningDelta: "plan",
    contentDelta: null,
  });
  assert.equal(ctx.insideThink, false);
  assert.equal(ctx.buffer, " world");

  const flushed = flushThinkBuffer(ctx);
  assert.deepEqual(flushed, {
    reasoningDelta: null,
    contentDelta: " world",
  });
});

test("processStreamingThinkDelta keeps partial closing tags buffered while inside think", () => {
  const ctx = { insideThink: true, buffer: "" };

  const result = processStreamingThinkDelta("reasoning</th", ctx);
  assert.deepEqual(result, {
    reasoningDelta: "reason",
    contentDelta: null,
  });
  assert.equal(ctx.buffer, "ing</th");
});

test("flushThinkBuffer returns remaining content or reasoning based on parser state", () => {
  const contentCtx = { insideThink: false, buffer: "tail" };
  const reasoningCtx = { insideThink: true, buffer: "tail-thought" };

  assert.deepEqual(flushThinkBuffer(contentCtx), {
    reasoningDelta: null,
    contentDelta: "tail",
  });
  assert.deepEqual(flushThinkBuffer(reasoningCtx), {
    reasoningDelta: "tail-thought",
    contentDelta: null,
  });
  assert.deepEqual(flushThinkBuffer({ insideThink: false, buffer: "" }), {
    reasoningDelta: null,
    contentDelta: null,
  });
});
