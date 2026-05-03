import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  buildCavemanOutputInstruction,
  detectCompressionLanguage,
  loadAllRulesForLanguage,
} from "../../../open-sse/services/compression/index.ts";
import { applyRulesToText } from "../../../open-sse/services/compression/caveman.ts";
import { getRulesForContext } from "../../../open-sse/services/compression/cavemanRules.ts";

const LANGUAGES = ["pt-BR", "es", "de", "fr", "ja"];

describe("Caveman language packs", () => {
  it("ships 5 language packs with at least 15 rules each", () => {
    for (const language of LANGUAGES) {
      const rules = loadAllRulesForLanguage(language, { refresh: true });
      assert.ok(rules.length >= 15, `${language} expected 15+ rules, got ${rules.length}`);
      assert.ok(
        rules.some((rule) => rule.category === "filler"),
        `${language} missing filler`
      );
      assert.ok(
        rules.some((rule) => rule.category === "context"),
        `${language} missing context`
      );
      assert.ok(
        rules.some((rule) => rule.category === "structural"),
        `${language} missing structural`
      );
    }
  });

  it("detects supported languages", () => {
    assert.equal(detectCompressionLanguage("preciso corrigir este arquivo com erro"), "pt-BR");
    assert.equal(detectCompressionLanguage("necesito corregir este archivo con error"), "es");
    assert.equal(detectCompressionLanguage("ich brauche diese konfiguration"), "de");
    assert.equal(detectCompressionLanguage("j'ai besoin de corriger cette erreur fichier"), "fr");
    assert.equal(detectCompressionLanguage("このコードを修正してください"), "ja");
  });

  it("applies non-English rule packs to golden samples", () => {
    const ptRules = getRulesForContext("user", "full", "pt-BR");
    const { text } = applyRulesToText("por favor segue o código: const auth = true", ptRules);

    assert.ok(!text.toLowerCase().includes("por favor"));
    assert.ok(text.includes("Código:"));
    assert.ok(text.includes("auth"));
  });

  it("builds localized output mode instructions", () => {
    const config = { enabled: true, intensity: "full" as const, autoClarity: true };

    assert.match(buildCavemanOutputInstruction(config, "pt-BR"), /Responda/);
    assert.match(buildCavemanOutputInstruction(config, "es"), /Responde/);
    assert.match(buildCavemanOutputInstruction(config, "de"), /Antworte/);
    assert.match(buildCavemanOutputInstruction(config, "fr"), /Reponds/);
    assert.match(buildCavemanOutputInstruction(config, "ja"), /回答/);
  });
});
