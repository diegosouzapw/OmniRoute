import { test } from "node:test";
import assert from "node:assert/strict";
import {
  catalogDir,
  findIncompleteLocales,
  leafPaths,
} from "../../scripts/i18n/check-key-completeness.mjs";

// Absolute key-set parity between en.json and every locale catalog. Unlike the new-key gate
// (diff-based) and the coverage gate (80 % floor), this one names an ABSENT key regardless of
// when it was added — the defect the batch-1/batch-2 locale PRs (#13044, #13660) shipped.

const en = { home: { title: "Home", legend: { active: "Active" } }, common: { save: "Save" } };

test("leafPaths flattens nested objects into dotted leaves and ignores non-objects", () => {
  assert.deepEqual([...leafPaths(en)].sort(), ["common.save", "home.legend.active", "home.title"]);
  assert.deepEqual([...leafPaths("not a tree")], []);
});

test("a locale with exactly the source key set is not listed", () => {
  const gaps = findIncompleteLocales({
    en,
    locales: {
      pt: { home: { title: "Início", legend: { active: "Ativo" } }, common: { save: "Salvar" } },
    },
  });
  assert.deepEqual(gaps, []);
});

test("a __MISSING__ placeholder counts as present — the ratio gate judges its content", () => {
  const gaps = findIncompleteLocales({
    en,
    locales: {
      pt: {
        home: { title: "__MISSING__:Home", legend: { active: "Ativo" } },
        common: { save: "Salvar" },
      },
    },
  });
  assert.deepEqual(gaps, []);
});

test("absent leaves are reported per locale, sorted, whatever their age", () => {
  const gaps = findIncompleteLocales({
    en,
    locales: {
      km: { home: { title: "ទំព័រដើម" }, common: { save: "រក្សាទុក" } },
      de: { home: { title: "Start", legend: { active: "Aktiv" } }, common: { save: "Speichern" } },
    },
  });
  assert.deepEqual(gaps, [{ locale: "km", missing: ["home.legend.active"], extra: [] }]);
});

test("leaves the source dropped are reported as extra, and a wrong shape counts as missing", () => {
  const gaps = findIncompleteLocales({
    en,
    locales: {
      fr: {
        home: { title: "Accueil", legend: "Légende" },
        common: { save: "Enregistrer", cancel: "Annuler" },
      },
    },
  });
  assert.deepEqual(gaps, [
    { locale: "fr", missing: ["home.legend.active"], extra: ["common.cancel", "home.legend"] },
  ]);
});

test("catalogDir resolves the dashboard and CLI catalog directories", () => {
  assert.ok(catalogDir("ui").endsWith("src/i18n/messages"));
  assert.ok(catalogDir("cli").endsWith("bin/cli/locales"));
  assert.throws(() => catalogDir("nope"), /unknown catalog/);
});
