// Text the caller or an upstream model controls goes through tag scanners before any request is
// made. The scanners used to be single regexes with overlapping whitespace classes, which are
// quadratic (or worse) on a long run of newlines or spaces, so one request could stall the
// event loop for every other client. These tests pin the results and the running time.
import test from "node:test";
import assert from "node:assert/strict";

const { findTagBlocks } = await import("../../open-sse/utils/tagBlocks.ts");
const bridge = await import("../../open-sse/executors/grok-web/tool-bridge.ts");
const webTools = await import("../../open-sse/translator/webTools.ts");

/** The scanner regexes as they were before, kept only to check the new code returns the same. */
const OLD_REMINDER_STRIP = (text: string) =>
  text
    .replace(/\n?---\s*\n\s*<internal_reminder>[\s\S]*?<\/internal_reminder>/gi, "")
    .replace(/<internal_reminder>[\s\S]*?<\/internal_reminder>/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

function elapsedMs(run: () => void): number {
  const start = process.hrtime.bigint();
  run();
  return Number(process.hrtime.bigint() - start) / 1e6;
}

test("findTagBlocks returns blocks in order with their bounds and untrimmed inner text", () => {
  const text = "a<x> one </x>b<x>two</x>c";
  const blocks = findTagBlocks(text, /<x>/g, /<\/x>/g);
  assert.deepEqual(
    blocks.map((b) => [b.start, b.end, b.inner]),
    [
      [1, 13, " one "],
      [14, 24, "two"],
    ]
  );
});

test("findTagBlocks stops at an opening tag that has no closing tag after it", () => {
  assert.deepEqual(findTagBlocks("<x>a</x><x>b", /<x>/g, /<\/x>/g).length, 1);
  assert.deepEqual(findTagBlocks("<x><x><x>", /<x>/g, /<\/x>/g), []);
});

test("stripInjectedRuntimeReminders gives the same result as the regexes it replaced", () => {
  const cases = [
    "plain text",
    "before\n---\n<internal_reminder>secret</internal_reminder>\nafter",
    "before\n---  \n\n  <internal_reminder>x</internal_reminder>after",
    "before---\n<internal_reminder>x</internal_reminder>",
    "before <internal_reminder>x</internal_reminder> after",
    "a<INTERNAL_REMINDER>x</Internal_Reminder>b",
    "--- <internal_reminder>same line</internal_reminder>",
    "one\n---\n<internal_reminder>a</internal_reminder>two\n---\n<internal_reminder>b</internal_reminder>three",
    "<internal_reminder>unclosed",
    "x\n\n\n\ny",
    "  \n---\n<internal_reminder></internal_reminder>  ",
  ];
  for (const text of cases) {
    assert.equal(
      bridge.stripInjectedRuntimeReminders(text),
      OLD_REMINDER_STRIP(text),
      JSON.stringify(text)
    );
  }
});

test("stripInjectedRuntimeReminders stays fast on a long run of newlines after a separator", () => {
  const text = "---" + "\n".repeat(60_000);
  assert.ok(elapsedMs(() => bridge.stripInjectedRuntimeReminders(text)) < 500);
});

test("stripInjectedRuntimeReminders stays fast on many unclosed opening tags", () => {
  const text = "<internal_reminder>".repeat(20_000);
  assert.ok(elapsedMs(() => bridge.stripInjectedRuntimeReminders(text)) < 500);
});

test("parseClientToolCallMarkup keeps its results and stays fast on a long run of spaces", () => {
  const registry = bridge.buildGrokToolRegistry({
    tools: [
      {
        type: "function",
        function: {
          name: "read",
          parameters: { type: "object", properties: { path: { type: "string" } } },
        },
      },
    ],
  });
  const calls = bridge.parseClientToolCallMarkup(
    '<tool_call>\n  {"name":"read","arguments":{"path":"a"}}  \n</tool_call>',
    registry
  );
  assert.equal(calls?.length, 1);
  assert.equal(calls?.[0].function.name, "read");

  const hostile = "<tool_call>" + " ".repeat(3_000);
  assert.ok(elapsedMs(() => bridge.parseClientToolCallMarkup(hostile, registry)) < 500);
});

test("parseToolCallsFromText keeps parsing <tool> and <tool_call ...> blocks and stays fast on hostile text", () => {
  const good = webTools.parseToolCallsFromText(
    'hi <tool>{"name":"a","arguments":{}}</tool> and <tool_call name="b">{"name":"b","arguments":{}}</tool_call>'
  );
  assert.deepEqual(
    good.toolCalls?.map((c: { function: { name: string } }) => c.function.name),
    ["a", "b"]
  );

  for (const hostile of [
    "<tool>" + " ".repeat(3_000),
    "<tool_call " + " ".repeat(3_000),
    "<tool>".repeat(20_000),
    "<tool_call>".repeat(20_000),
    // Many opening tags that never reach a `>`: each one used to scan to the end of the text.
    "<tool_call ".repeat(20_000),
  ]) {
    assert.ok(
      elapsedMs(() => webTools.parseToolCallsFromText(hostile)) < 500,
      hostile.slice(0, 20)
    );
  }
});
