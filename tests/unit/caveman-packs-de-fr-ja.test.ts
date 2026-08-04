import test from "node:test";
import assert from "node:assert/strict";
import {
  loadRulePack,
  loadAllRulesForLanguage,
} from "../../open-sse/services/compression/ruleLoader.ts";

// T05 / C2 — caveman dedup + ultra packs for de, fr, ja (previously only context/filler/structural).
const LANGS = ["de", "fr", "ja"] as const;

// Samples chosen to contain terms the ultra pack abbreviates. For ja the katakana loanwords
// (データベース/アプリケーション/…) are the clear character-length wins; the short-kanji rules
// (設定→config, 認証→auth) are token wins but can be char-neutral, so they stay out of this sample.
const ULTRA_SAMPLES: Record<(typeof LANGS)[number], string> = {
  de: "Die Datenbank-Konfiguration der Anwendung benötigt eine Authentifizierung.",
  fr: "La configuration de la base de données de l'application nécessite une authentification.",
  ja: "データベースとアプリケーション、レスポンスとリクエストとコンフィギュレーション",
};

type LoadedRule = ReturnType<typeof loadRulePack>[number];

function applyAll(text: string, rules: LoadedRule[]): string {
  return rules.reduce((acc, rule) => {
    return typeof rule.replacement === "function"
      ? acc.replace(rule.pattern, rule.replacement)
      : acc.replace(rule.pattern, rule.replacement);
  }, text);
}

for (const lang of LANGS) {
  test(`caveman ${lang}: dedup + ultra packs load and validate`, () => {
    // loadRulePack throws if the pack fails validateRulePack, so a non-throwing non-empty load
    // proves both presence and schema validity.
    const dedup = loadRulePack(lang, "dedup", { refresh: true });
    const ultra = loadRulePack(lang, "ultra", { refresh: true });
    assert.ok(dedup.length > 0, `${lang}/dedup should have rules`);
    assert.ok(ultra.length > 0, `${lang}/ultra should have rules`);
  });

  test(`caveman ${lang}: ultra pack shrinks a representative sample`, () => {
    const ultra = loadRulePack(lang, "ultra", { refresh: true });
    const sample = ULTRA_SAMPLES[lang];
    const out = applyAll(sample, ultra);
    assert.ok(
      out.length < sample.length,
      `${lang} ultra should shrink the sample (${sample.length} -> ${out.length})`
    );
  });
}

test("de/fr/ja expose dedup + ultra categories via loadAllRulesForLanguage", () => {
  for (const lang of LANGS) {
    const cats = new Set(loadAllRulesForLanguage(lang, { refresh: true }).map((r) => r.category));
    assert.ok(cats.has("dedup"), `${lang} should expose the dedup category`);
    assert.ok(cats.has("ultra"), `${lang} should expose the ultra category`);
  }
});
