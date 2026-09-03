import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Regression guard for #10812: several locales rendered the *status* "Disabled"
// with the noun for a person who has a disability (ja 障害者, es Discapacitado,
// hi विकलांग, …). It is wrong in context and, for a status badge on a provider
// row, needlessly offensive.
//
// The glossary gate (scripts/i18n/glossary/<locale>.json) already enforces this
// for ko/zh-CN/zh-TW, but it only runs for locales that have a glossary file.
// This test covers every locale in the catalog, so a machine-translation pass
// cannot reintroduce the term in an ungated language.

const messagesDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../src/i18n/messages"
);

// Nouns meaning "a person with a disability". None of these is ever a correct
// rendering of the "Disabled" status, so they are checked against the value of
// every key whose English source is "Disable"/"Disabled".
const PERSON_WITH_DISABILITY_TERMS = [
  "障害者", // ja
  "장애인", // ko
  "残疾", // zh-CN
  "殘疾", // zh-TW
  "残障", // zh-CN
  "殘障", // zh-TW
  "discapacitad", // es
  "minusvál", // es
  "deficiente físic", // pt
  "handicapé", // fr
  "инвалид", // ru
  "інвалід", // uk
  "विकलांग", // hi
  "వికలాంగ", // te
  "معذور", // ur
  "معاق", // ar
  "niepełnospraw", // pl
  "gehandicapt", // nl
  "khuyết tật", // vi
  "ผู้พิการ", // th
  "נכה", // he
];

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

function flatten(value: Json, prefix = "", out = new Map<string, string>()) {
  if (typeof value === "string") {
    out.set(prefix, value);
  } else if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const [k, v] of Object.entries(value)) {
      flatten(v as Json, prefix ? `${prefix}.${k}` : k, out);
    }
  }
  return out;
}

function load(locale: string) {
  return flatten(JSON.parse(readFileSync(path.join(messagesDir, `${locale}.json`), "utf8")));
}

test("no locale renders the Disabled status as a person with a disability (#10812)", () => {
  const en = load("en");
  const disabledKeys = [...en.entries()]
    .filter(
      ([, v]) => v.toLowerCase().replace(/\.$/, "") === "disabled" || v.toLowerCase() === "disable"
    )
    .map(([k]) => k);

  assert.ok(disabledKeys.length > 0, "expected the en catalog to define Disable/Disabled keys");

  const locales = readdirSync(messagesDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.slice(0, -".json".length))
    .filter((l) => l !== "en");

  const violations: string[] = [];
  for (const locale of locales) {
    const messages = load(locale);
    for (const key of disabledKeys) {
      const value = messages.get(key);
      if (!value) continue;
      const hit = PERSON_WITH_DISABILITY_TERMS.find((term) =>
        value.toLowerCase().includes(term.toLowerCase())
      );
      if (hit) violations.push(`${locale} ${key} = ${JSON.stringify(value)} (contains ${hit})`);
    }
  }

  assert.deepEqual(
    violations,
    [],
    `Disabled status mistranslated as a person with a disability:\n  ${violations.join("\n  ")}`
  );
});
