import test from "node:test";
import assert from "node:assert/strict";

const { createSystemPreambleStripper } =
  await import("../../open-sse/utils/directivePreambleStripper.ts");

test("passes normal content through untouched", () => {
  const strip = createSystemPreambleStripper();
  assert.equal(strip("안녕하세요. 준비된 답변입니다."), "안녕하세요. 준비된 답변입니다.");
});

test("strips a single-chunk full <analysis> echo block", () => {
  const strip = createSystemPreambleStripper();
  const echoed =
    "<analysis>\nLet me chronologically analyze the conversation.\nSteps:\n" +
    "1. First\n2. Second\n</analysis>\n\n답변 본문입니다.";
  assert.equal(strip(echoed), "답변 본문입니다.");
});

test("strips analysis echo split across streaming chunks", () => {
  const strip = createSystemPreambleStripper();
  assert.equal(strip("<analysis>\nThink"), "");
  assert.equal(strip("ing and analyze.\n"), "");
  assert.equal(strip("</analysis>\n\n대답입니다."), "대답입니다.");
});

test("strips consecutive analysis + summary echo blocks", () => {
  const strip = createSystemPreambleStripper();
  const t = "<analysis>\nA\n</analysis>\n<summary>\nS\n</summary>\n\n결론";
  assert.equal(strip(t), "결론");
});

test("strips a standalone system-reminder block", () => {
  const strip = createSystemPreambleStripper();
  const t = "<system-reminder>\ncontext\n</system-reminder>\n\n바로 본문";
  assert.equal(strip(t), "바로 본문");
});

test("strips # Verification Process prose + system-reminder echo (real session 06:42)", () => {
  const strip = createSystemPreambleStripper();
  const echoed =
    "# Verification Process\n\nWhen using WebFetch results for verification, " +
    "note the following:\n- Web results are transient\n- Prefer official sources\n\n" +
    "<system-reminder>\nFound existing memory, loading all matching memories:\n" +
    "<br>environment: user_bearer_token</br>\n</system-reminder>\n\n" +
    "사용자가 실제 세션 검증 방법을 묻고 있습니다.";
  assert.equal(strip(echoed), "사용자가 실제 세션 검증 방법을 묻고 있습니다.");
});

test("strips Skill usage prose head then continues through system-reminder echo", () => {
  const strip = createSystemPreambleStripper();
  const echoed =
    "Skill usage (when superpowers skills are installed)\n\n" +
    "When superpowers skills are installed, use appropriate skills.\n" +
    "- superpowers:brainstorming\n- superpowers:systematic-debugging\n\n" +
    "<system-reminder>\ncontext\n</system-reminder>\n\n한국어 답변입니다.";
  assert.equal(strip(echoed), "한국어 답변입니다.");
});

test("flushes partial tag text as real content when stream diverges", () => {
  const strip = createSystemPreambleStripper();
  assert.equal(strip("<analys"), "");
  assert.equal(strip("x 후속"), "<analysx 후속");
});

test("subsequent chunks pass through untouched once real content begins", () => {
  const strip = createSystemPreambleStripper();
  assert.equal(strip("일반 답변입니다."), "일반 답변입니다.");
  assert.equal(strip(" 무언가 더."), " 무언가 더.");
});

// REGRESSION (3a8515, 2026-09-01): an autocompact summary whose ENTIRE content is
// a single <analysis> block is indistinguishable from a system-echo <analysis> block.
// The stripper suppresses the whole block until </analysis>, then drops it; with no
// trailing real content the client receives "" => Claude Code autocompact reports
// "summarization produced empty response". This reproduces the defect at the code
// level (the fix is a separate task; this test documents the bug).
test("REGRESSION (3a8515): a whole-summary <analysis> block with no trailing content is stripped to empty (autocompact empty-response root cause)", () => {
  const strip = createSystemPreambleStripper();
  // The model's entire summary is one <analysis> block (legitimate structured
  // summary, not a system echo). Streamed across chunks like a real response.
  const chunks = [
    "<analysis>",
    "\nThis conversation covered the OmniRoute reasoning-leak diagnosis. ",
    "We traced the bug to the requestedThinking gate in openai-to-claude.ts ",
    "and confirmed fix B synthesizes a text block for reasoning-only responses.",
    "\n</analysis>",
  ];
  let out = "";
  for (const c of chunks) out += strip(c);
  // DEFECT: the whole summary was suppressed (treated as an echo). The fix must
  // preserve it. This assert will FAIL until the stripper is taught that a
  // <analysis> block carrying substantial real content (not a verbatim system
  // echo) is the response, not a preamble.
  assert.ok(
    out.length > 0,
    "a whole-summary <analysis> block MUST NOT be stripped to empty (autocompact empty-response root cause)"
  );
});

test("REGRESSION (3a8515b): a whole-summary <analysis> block + trailing newline is stripped to empty", () => {
  const strip = createSystemPreambleStripper();
  const chunks = ["<analysis>Summary of the 208k-token context for compaction.</analysis>", "\n"];
  let out = "";
  for (const c of chunks) out += strip(c);
  assert.ok(
    out.length > 0,
    "a <analysis> summary + trailing newline MUST NOT be stripped to empty"
  );
});

test("REGRESSION (3a8515c): a long <analysis> summary block loses ~90% of its content (only post-close-tag chars survive)", () => {
  const strip = createSystemPreambleStripper();
  // Build a long summary inside <analysis>, then a short tail after </analysis>.
  // ~5000 chars inside the block (mirrors the 5076 chars that were suppressed),
  // ~500 chars after the close tag (mirrors the 552 chars that survived).
  const inside = "Summary of the conversation. ".repeat(180); // ~5000 chars
  const tail = "Final note. ".repeat(40); // ~480 chars
  const full = "<analysis>\n" + inside + "\n</analysis>\n\n" + tail;
  // Stream it in realistic-sized chunks (~8 chars each, like the 704 deltas)
  const chunks = [];
  for (let i = 0; i < full.length; i += 8) chunks.push(full.slice(i, i + 8));
  let out = "";
  for (const c of chunks) out += strip(c);
  // DEFECT: only the post-close-tag tail (~480 chars) survives; the ~5000-char
  // summary inside <analysis> is suppressed. The fix must preserve the inside.
  assert.ok(
    out.includes(inside.slice(0, 40)),
    "the summary INSIDE <analysis> MUST survive (not be suppressed as an echo); only ~tail survives today"
  );
});
