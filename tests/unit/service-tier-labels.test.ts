import test from "node:test";
import assert from "node:assert/strict";

import {
  getServiceTierDisplayLabel,
  normalizeServiceTierId,
  translateCostText,
  type TranslationFn,
} from "../../src/shared/utils/serviceTierLabels.ts";

function makeTranslator(messages: Record<string, string>): TranslationFn {
  const translate = ((key: string) => messages[key] || key) as TranslationFn;
  translate.has = (key: string) => Object.prototype.hasOwnProperty.call(messages, key);
  return translate;
}

test("normalizeServiceTierId maps service tier aliases to canonical ids", () => {
  assert.equal(normalizeServiceTierId("fast"), "priority");
  assert.equal(normalizeServiceTierId(" priority "), "priority");
  assert.equal(normalizeServiceTierId(" flex "), "flex");
  assert.equal(normalizeServiceTierId("standard"), "standard");
  assert.equal(normalizeServiceTierId("unknown"), "standard");
  assert.equal(normalizeServiceTierId(null), "standard");
});

test("translateCostText uses available translations and falls back when missing", () => {
  const t = makeTranslator({ serviceTierFlex: "Flexibel" });

  assert.equal(translateCostText(t, "serviceTierFlex", "Flex"), "Flexibel");
  assert.equal(translateCostText(t, "serviceTierFast", "Fast"), "Fast");
});

test("getServiceTierDisplayLabel localizes canonical labels and preserves custom fallback labels", () => {
  const t = makeTranslator({
    serviceTierFast: "Schnell",
    serviceTierFlex: "Flex",
    serviceTierStandard: "Standard",
  });

  assert.equal(getServiceTierDisplayLabel(t, "priority", "priority"), "Schnell");
  assert.equal(getServiceTierDisplayLabel(t, "flex", "flex"), "Flex");
  assert.equal(getServiceTierDisplayLabel(t, "standard", "standard"), "Standard");
  assert.equal(getServiceTierDisplayLabel(t, "flex", "Custom Flex"), "Flex");
});
