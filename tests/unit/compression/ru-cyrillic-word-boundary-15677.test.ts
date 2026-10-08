import test from "node:test";
import assert from "node:assert/strict";
import { loadAllRulesForLanguage } from "../../../open-sse/services/compression/ruleLoader.ts";
import { detectCompressionLanguage } from "../../../open-sse/services/compression/languageDetector.ts";

// #15677 — JS `\b` is ASCII-only, so Russian rules wrapped in \b...\b never matched Cyrillic.
function apply(name: string, text: string): string {
  const rule = loadAllRulesForLanguage("ru").find((r) => r.name === name);
  assert.ok(rule, `rule ${name} missing`);
  rule.pattern.lastIndex = 0;
  return text.replace(rule.pattern, rule.replacement as string);
}

test("ru rule packs contain no ASCII-only \\b", () => {
  for (const rule of loadAllRulesForLanguage("ru")) {
    assert.ok(!rule.pattern.source.includes("\\b"), `${rule.name} still uses \\b`);
  }
});

test("ru pleasantries rule strips 'Конечно' (#15677)", () => {
  assert.notEqual(apply("pleasantries", "Конечно, вот ответ."), "Конечно, вот ответ.");
});

test("ru rules do not match inside longer words", () => {
  assert.equal(apply("pleasantries", "Неконечно"), "Неконечно");
});

test("ru word_duplication collapses repeated Cyrillic words", () => {
  assert.equal(apply("word_duplication", "это это файл"), "это файл");
});

test("ru detector keyword hint matches Cyrillic keywords (#15677)", () => {
  assert.equal(detectCompressionLanguage("Это файл"), "ru");
  const kw = /(?<![\p{L}\p{N}_])(?:это|что|как)(?![\p{L}\p{N}_])/iu;
  assert.ok(kw.test("это файл"));
});
