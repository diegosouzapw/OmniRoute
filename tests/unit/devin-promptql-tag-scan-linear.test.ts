import test from "node:test";
import assert from "node:assert/strict";

import {
  extractBareSummaryEnvelope,
  parseDevinToolRequest,
} from "../../open-sse/executors/devin-agentic/toolParser.ts";
import { extractFinalResponseMessage } from "../../open-sse/executors/promptql/eventTree.ts";

const OLD_SUMMARY = /^<summary>\s*([\s\S]*?)\s*<\/summary>$/i;
const OLD_FINAL = /<final_response>\s*([\s\S]*?)\s*<\/final_response>/i;

// Small enough to finish with the old cubic regexes, large enough that they would take
// seconds if these paths still used them (2,000 spaces cost the old patterns about 3 s each).
const RUN = 20_000;
const BUDGET_MS = 500;

function timed<T>(fn: () => T): { value: T; ms: number } {
  const started = performance.now();
  const value = fn();
  return { value, ms: performance.now() - started };
}

test("bare summary envelope: same result as the old regex on ordinary input", () => {
  const samples = [
    "<summary>hello</summary>",
    "  <SUMMARY>\n  spaced out \n</SUMMARY>  ",
    "<summary></summary>",
    "<summary> </summary>",
    "<summary>a</summary> tail",
    "head <summary>a</summary>",
    "<summary>a</summary><summary>b</summary>",
    "<summary>only open",
    "</summary>",
    "<summary></summary",
    "no envelope",
  ];
  for (const sample of samples) {
    const old = sample.trim().match(OLD_SUMMARY);
    assert.equal(extractBareSummaryEnvelope(sample), old ? old[1].trim() : null, sample);
  }
});

test("bare summary envelope: a long run of spaces is scanned in linear time", () => {
  const open = timed(() => extractBareSummaryEnvelope(`<summary>${" ".repeat(RUN)}x`));
  assert.equal(open.value, null);
  assert.ok(open.ms < BUDGET_MS, `unclosed took ${open.ms}ms`);
  const closed = timed(() => extractBareSummaryEnvelope(`<summary>${" ".repeat(RUN)}x</summary>`));
  assert.equal(closed.value, "x");
  assert.ok(closed.ms < BUDGET_MS, `closed took ${closed.ms}ms`);
});

test("devin tool request: well-formed envelope still parses", () => {
  const tools = [
    {
      name: "read_file",
      description: "",
      input_schema: {
        type: "object",
        properties: { path: { type: "string" } },
        required: ["path"],
      },
    },
  ];
  const call = parseDevinToolRequest(
    `\n<tool>\n  {"name":"read_file","arguments":{"path":"a.txt"}}\n</tool>\n`,
    tools as never
  ) as { name?: string } | null;
  assert.ok(call);
  assert.equal(parseDevinToolRequest("no tool here", tools as never), null);
  assert.throws(
    () =>
      parseDevinToolRequest(
        `hi <tool>{"name":"read_file","arguments":{"path":"a"}}</tool>`,
        tools as never
      ),
    /standalone tool envelope/
  );
  assert.throws(
    () => parseDevinToolRequest("<tool>{}</tool><tool>{}</tool>", tools as never),
    /more than one tool request/
  );
});

test("devin tool request: unclosed tags and long whitespace are scanned in linear time", () => {
  for (const text of [
    `<tool>${" ".repeat(RUN)}x`,
    "<tool>".repeat(RUN),
    `<tool>${"\n ".repeat(RUN)}`,
  ]) {
    const { value, ms } = timed(() => parseDevinToolRequest(text, []));
    assert.equal(value, null);
    assert.ok(ms < BUDGET_MS, `took ${ms}ms`);
  }
});

test("promptql final response: same result as the old regex on ordinary input", () => {
  const samples = [
    "<final_response>hello</final_response>",
    "x <FINAL_RESPONSE>\n  spaced \n</FINAL_RESPONSE> y",
    "<final_response></final_response>",
    "<final_response>a</final_response><final_response>b</final_response>",
    "<final_response>unclosed",
    "no tag",
  ];
  for (const sample of samples) {
    const old = sample.match(OLD_FINAL);
    const got = extractFinalResponseMessage({ response_text: sample });
    assert.equal(got, old ? old[1].trim() : null, sample);
  }
});

test("promptql final response: unclosed tag and long whitespace are scanned in linear time", () => {
  for (const text of [
    `<final_response>${" ".repeat(RUN)}x`,
    "<final_response>".repeat(RUN),
    `<final_response>${" ".repeat(RUN)}x</final_response>`,
  ]) {
    const { ms } = timed(() => extractFinalResponseMessage({ response_text: text }));
    assert.ok(ms < BUDGET_MS, `took ${ms}ms`);
  }
});
