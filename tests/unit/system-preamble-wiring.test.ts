import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");

function createState() {
  return { toolCalls: new Map() };
}

function emittedText(events: Array<Record<string, unknown>>): string {
  return events
    .filter(
      (e) =>
        e?.type === "content_block_delta" &&
        (e.delta as Record<string, unknown>)?.type === "text_delta"
    )
    .map((e) => (e.delta as Record<string, unknown>).text as string)
    .join("");
}

// The system-preamble stripper is OPT-IN (it mutates response payloads with
// English-prose heuristics). These wiring tests exercise the opted-in path;
// the default-off contract is pinned in system-preamble-gate-and-flush.test.ts.
test.before(() => {
  process.env.OMNIROUTE_STRIP_SYSTEM_PREAMBLE = "1";
});
test.after(() => {
  delete process.env.OMNIROUTE_STRIP_SYSTEM_PREAMBLE;
});

function chunkWith(content: string) {
  return {
    id: "chatcmpl-preamble",
    model: "auto/deepseek-v4",
    choices: [
      {
        index: 0,
        delta: { content },
        finish_reason: null,
      },
    ],
  };
}

test("wiring: strips an <analysis> echo block at the START of the streamed reply", () => {
  const state = createState();
  const echo =
    "<analysis>\nLet me chronologically analyze the conversation.\n</analysis>\n\n실제 답변입니다.";
  const events1 = openaiToClaudeResponse(chunkWith(echo.slice(0, 20)), state);
  const events2 = openaiToClaudeResponse(chunkWith(echo.slice(20)), state);

  const text = emittedText([...events1, ...events2]);
  assert.ok(!text.includes("<analysis"), "echo must not reach the client");
  assert.ok(text.includes("실제 답변입니다."), "real content must pass through");
});

test("wiring: strips a standalone <system-reminder> echo block", () => {
  const state = createState();
  const echo = "<system-reminder>\ncontext\n</system-reminder>\n\n바로 본문";
  const events = openaiToClaudeResponse(chunkWith(echo), state);
  const text = emittedText(events);
  assert.ok(!text.includes("system-reminder"), "echo must not reach the client");
  assert.ok(text.includes("바로 본문"), "real content must pass through");
});

test("wiring: normal content is untouched (no false positives)", () => {
  const state = createState();
  const events = openaiToClaudeResponse(chunkWith("안녕하세요. 일반 답변입니다."), state);
  const text = emittedText(events);
  assert.equal(text, "안녕하세요. 일반 답변입니다.");
});
