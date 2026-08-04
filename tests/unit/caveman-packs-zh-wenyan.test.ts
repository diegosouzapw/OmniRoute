import test from "node:test";
import assert from "node:assert/strict";
import {
  loadRulePack,
  loadAllRulesForLanguage,
} from "../../open-sse/services/compression/ruleLoader.ts";
import {
  detectCompressionLanguage,
  listSupportedCompressionLanguages,
} from "../../open-sse/services/compression/languageDetector.ts";

// T05 / C6 — Chinese (zh / wenyan) caveman pack: the input-side counterpart of the existing
// output-side "terse-cjk" (文言) style. Adds dedup + filler + ultra rule packs and zh detection.

type LoadedRule = ReturnType<typeof loadRulePack>[number];

function applyAll(text: string, rules: LoadedRule[]): string {
  return rules.reduce((acc, rule) => {
    return typeof rule.replacement === "function"
      ? acc.replace(rule.pattern, rule.replacement)
      : acc.replace(rule.pattern, rule.replacement);
  }, text);
}

test("zh: dedup + filler + ultra packs load and validate", () => {
  // loadRulePack throws on validateRulePack failure, so a non-throwing non-empty load proves
  // both presence and schema validity.
  for (const category of ["dedup", "filler", "ultra"]) {
    const rules = loadRulePack("zh", category, { refresh: true });
    assert.ok(rules.length > 0, `zh/${category} should have rules`);
  }
});

test("zh: the pack shrinks a representative sample (classical terseness)", () => {
  const all = loadAllRulesForLanguage("zh", { refresh: true });
  const sample = "请帮我修复数据库的错误，谢谢。如前所述，应用程序需要修复。";
  const out = applyAll(sample, all);
  assert.ok(
    out.length < sample.length,
    `zh pack should shrink the sample (${sample.length} -> ${out.length})`
  );
});

test("zh: loadAllRulesForLanguage exposes dedup, filler and ultra categories", () => {
  const cats = new Set(loadAllRulesForLanguage("zh", { refresh: true }).map((r) => r.category));
  assert.ok(cats.has("dedup"), "zh should expose dedup");
  assert.ok(cats.has("filler"), "zh should expose filler");
  assert.ok(cats.has("ultra"), "zh should expose ultra");
});

test("detectCompressionLanguage: Han without kana → zh", () => {
  assert.equal(detectCompressionLanguage("请帮我修复这个文件的错误"), "zh");
  assert.equal(detectCompressionLanguage("这个应用程序的数据库配置有问题"), "zh");
});

test("detectCompressionLanguage: kana still wins for Japanese (no zh regression)", () => {
  // Han-heavy Japanese with kana must stay ja, not flip to zh.
  assert.equal(detectCompressionLanguage("このコードを修正してください"), "ja");
  assert.equal(detectCompressionLanguage("実装の認証を修正する必要があります"), "ja");
});

test("detectCompressionLanguage: non-CJK languages are unaffected", () => {
  assert.equal(detectCompressionLanguage("necesito corregir este archivo con error"), "es");
  assert.equal(detectCompressionLanguage("ich brauche diese konfiguration"), "de");
});

test("zh is reported as a supported compression language", () => {
  assert.ok(listSupportedCompressionLanguages().includes("zh"));
});
