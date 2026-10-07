/**
 * Rework guards for PR #12905, Group E (system-preamble stripper).
 *
 * Three defects were confirmed by probe on the PR head:
 *
 *  (a) `createSystemPreambleStripper()` was wired DEFAULT-ON and unconditional
 *      in openai-to-claude.ts, unlike the directive stripper right above it
 *      (gated on OMNIROUTE_SYSTEM_INSTRUCTION_APPEND). Its openers are English
 *      prose heuristics, so a legitimate reply that opens with "# Skill usage:
 *      ..." had that whole section deleted from every openai→claude stream.
 *
 *  (b) Neither stripper was ever flushed. A block that never closes keeps the
 *      buffered text forever, so a reply consisting of an unterminated
 *      `<analysis>` reached the client as an EMPTY message.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { createSystemPreambleStripper, createDirectivePreambleStripper } =
  await import("../../open-sse/utils/directivePreambleStripper.ts");
const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");

function createState(): Record<string, unknown> {
  return { toolCalls: new Map() };
}

function emittedText(events: Record<string, unknown>[]): string {
  return events
    .filter(
      (e) =>
        e?.type === "content_block_delta" &&
        (e.delta as Record<string, unknown>)?.type === "text_delta"
    )
    .map((e) => (e.delta as Record<string, unknown>).text as string)
    .join("");
}

function contentChunk(content: string): Record<string, unknown> {
  return {
    id: "chatcmpl-rework-12905",
    model: "auto/deepseek-v4",
    choices: [{ index: 0, delta: { content }, finish_reason: null }],
  };
}

function finishChunk(): Record<string, unknown> {
  return {
    id: "chatcmpl-rework-12905",
    model: "auto/deepseek-v4",
    choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
  };
}

function withEnv(value: string | undefined, fn: () => void): void {
  const previous = process.env.OMNIROUTE_STRIP_SYSTEM_PREAMBLE;
  if (value === undefined) delete process.env.OMNIROUTE_STRIP_SYSTEM_PREAMBLE;
  else process.env.OMNIROUTE_STRIP_SYSTEM_PREAMBLE = value;
  try {
    fn();
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_STRIP_SYSTEM_PREAMBLE;
    else process.env.OMNIROUTE_STRIP_SYSTEM_PREAMBLE = previous;
  }
}

// ── (a) opt-in gate ────────────────────────────────────────────────────────────

test("(a) GATE: with OMNIROUTE_STRIP_SYSTEM_PREAMBLE unset, a legitimate reply opening with a prose head is relayed VERBATIM", () => {
  withEnv(undefined, () => {
    const state = createState();
    const reply = "# Skill usage: how to write one\n\nHere is the guide.\n\n# Next";
    const events = [
      ...openaiToClaudeResponse(contentChunk(reply), state),
      ...openaiToClaudeResponse(finishChunk(), state),
    ];
    assert.equal(
      emittedText(events as Record<string, unknown>[]),
      reply,
      "default-off: the response payload must not be mutated by prose heuristics"
    );
  });
});

test("(a) GATE: with OMNIROUTE_STRIP_SYSTEM_PREAMBLE=1 the operator opts in and the echo block IS stripped", () => {
  withEnv("1", () => {
    const state = createState();
    const echo = "<analysis>\nchronological analysis\n</analysis>\n\nReal answer body.";
    const events = [
      ...openaiToClaudeResponse(contentChunk(echo), state),
      ...openaiToClaudeResponse(finishChunk(), state),
    ];
    const text = emittedText(events as Record<string, unknown>[]);
    assert.ok(!text.includes("<analysis"), "opted in: the echo must not reach the client");
    assert.ok(text.includes("Real answer body."), "real content still passes through");
  });
});

// ── (b) end-of-stream flush ────────────────────────────────────────────────────

test("(b) FLUSH (unit): a system-echo block that never closes is released by flush(), not swallowed", () => {
  const strip = createSystemPreambleStripper();
  const unterminated = "<analysis>\nthis block never closes and IS the whole reply";
  assert.equal(strip(unterminated), "", "still buffered while the block may be an echo");
  assert.equal(
    strip.flush(),
    unterminated,
    "flush must release the buffered text (opener included) at end of stream"
  );
  assert.equal(strip.flush(), "", "flush is idempotent");
});

test("(b) FLUSH (unit): a directive prefix that never completes is released by flush()", () => {
  const strip = createDirectivePreambleStripper("SYSTEM DIRECTIVE TAIL");
  assert.equal(strip("SYSTEM DIR"), "", "still matching the directive prefix");
  assert.equal(strip.flush(), "SYSTEM DIR", "flush must release the partially matched prefix");
});

test("(b) FLUSH (wiring): an unterminated <analysis> reply reaches the client instead of an EMPTY message", () => {
  withEnv("1", () => {
    const state = createState();
    const unterminated = "<analysis>\nthe model never closed the tag and this is the answer";
    const events = [
      ...openaiToClaudeResponse(contentChunk(unterminated), state),
      ...openaiToClaudeResponse(finishChunk(), state),
    ];
    const text = emittedText(events as Record<string, unknown>[]);
    assert.notEqual(text, "", "the whole response must not be swallowed by the stripper");
    assert.ok(
      text.includes("the model never closed the tag and this is the answer"),
      "the buffered answer must be flushed to the client"
    );
  });
});

test("(b) FLUSH: a CLOSED echo block stays stripped — flush must not resurrect a finalized drop", () => {
  withEnv("1", () => {
    const state = createState();
    const echo = "<summary>hi there</summary>\nReal answer body.";
    const events = [
      ...openaiToClaudeResponse(contentChunk(echo), state),
      ...openaiToClaudeResponse(finishChunk(), state),
    ];
    const text = emittedText(events as Record<string, unknown>[]);
    assert.ok(!text.includes("<summary>"), "a finalized drop must not come back on flush");
    assert.ok(text.includes("Real answer body."), "real content preserved");
  });
});
