/**
 * Guards for B-LANG-DETECTOR + B-LANG-DORMANT.
 *
 * B-LANG-DETECTOR: the detector was first-match-wins on a single keyword, and some hint
 * words are English-ambiguous ("configuration" in fr, "error" in es) → English text
 * misclassified as fr/es. Now it is score-based and needs ≥2 hits to leave English.
 *
 * B-LANG-DORMANT: with autoDetectLanguage on but enabledPacks ["en"], detected non-English
 * text fell back to the English pack, whose `articles` rule deletes foreign articles
 * (pt-BR "a"/"o"). Auto-detect must use the detected pack (it always has rules).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { detectCompressionLanguage } from "@omniroute/open-sse/services/compression/languageDetector.ts";
import { cavemanCompress } from "@omniroute/open-sse/services/compression/caveman.ts";

test("detector ignores single English-ambiguous keywords (configuration/error)", () => {
  assert.equal(
    detectCompressionLanguage("Please update the configuration and fix the error in the file"),
    "en"
  );
});

test("detector still recognizes genuine non-English text (>=2 native keywords)", () => {
  assert.equal(detectCompressionLanguage("Por favor preciso do arquivo com erro"), "pt-BR");
  assert.equal(detectCompressionLanguage("これはテストですコードを確認"), "ja");
});

test("auto-detect uses the detected pt-BR pack, not the mangling English pack (B-LANG-DORMANT)", () => {
  // pt-BR prose with an article the English `articles` rule would delete ("a configuração").
  const text =
    "Por favor, você poderia revisar a configuração do arquivo? Obrigado pela ajuda com isso.";
  const res = cavemanCompress({ messages: [{ role: "user", content: text }] } as Record<
    string,
    unknown
  >, {
    enabled: true,
    autoDetectLanguage: true,
    enabledLanguagePacks: ["en"], // the production-default that used to force the English pack
    intensity: "full",
    compressRoles: ["user"],
    minMessageLength: 0,
  } as Record<string, unknown>);
  const rules = res.stats?.rulesApplied ?? [];
  // A pt-BR rule must have run (proves the pt-BR pack was selected, not English).
  assert.ok(
    rules.some((r) => r.startsWith("pt_")),
    `expected a pt_* rule to apply, got: ${JSON.stringify(rules)}`
  );
});
