import test from "node:test";
import assert from "node:assert/strict";

const { createDirectivePreambleStripper } =
  await import("../../open-sse/utils/directivePreambleStripper.ts");

const DIRECTIVE =
  "Respond ONLY in the same language as the user message. " +
  "Put all planning, reasoning, and chain-of-thought in the reasoning_content " +
  "field, never in the content field. Do not repeat or translate your response " +
  "in another language.";

test("strips a single-chunk full directive preamble", () => {
  const strip = createDirectivePreambleStripper(DIRECTIVE);
  assert.equal(
    strip(DIRECTIVE + "\n\n안녕하세요. 준비된 답변입니다."),
    "\n\n안녕하세요. 준비된 답변입니다."
  );
});

test("strips directive split across streaming chunks", () => {
  const strip = createDirectivePreambleStripper(DIRECTIVE);
  const a = DIRECTIVE.slice(0, 10);
  const b = DIRECTIVE.slice(10, 40);
  const c = DIRECTIVE.slice(40, 90);
  const d = DIRECTIVE.slice(90, 120);
  const rest = DIRECTIVE.slice(120);
  assert.equal(strip(a), "", "nothing emitted while still matching prefix");
  assert.equal(strip(b), "");
  assert.equal(strip(c), "");
  assert.equal(strip(d), "");
  assert.equal(strip(rest + "\n\n후반부"), "\n\n후반부");
});

test("flushes matched prefix as real content when stream diverges from directive", () => {
  const strip = createDirectivePreambleStripper(DIRECTIVE);
  assert.equal(strip("Respond ONLY in the sam"), ""); // partial match so far
  assert.equal(strip("x"), "Respond ONLY in the samx"); // diverges at 'x'
});

test("passes content through untouched when it never matches the directive", () => {
  const strip = createDirectivePreambleStripper(DIRECTIVE);
  assert.equal(strip("안녕하세요. 일반적인 응답입니다."), "안녕하세요. 일반적인 응답입니다.");
});

test("handles exact full-directive stream with no trailing text", () => {
  const strip = createDirectivePreambleStripper(DIRECTIVE);
  assert.equal(strip(DIRECTIVE.slice(0, 50)), "");
  assert.equal(strip(DIRECTIVE.slice(50)), "");
});

test("subsequent chunks pass through untouched once directive is consumed", () => {
  const strip = createDirectivePreambleStripper(DIRECTIVE);
  assert.equal(strip(DIRECTIVE), "");
  assert.equal(strip("\n\n후반부"), "\n\n후반부");
  assert.equal(strip("추가 텍스트"), "추가 텍스트");
});

test("empty directive behaves as no-op passthrough", () => {
  const strip = createDirectivePreambleStripper("");
  assert.equal(strip("text"), "text");
});
