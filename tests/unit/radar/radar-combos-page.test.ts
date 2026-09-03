import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const pagePath = path.join(process.cwd(), "src/app/(dashboard)/dashboard/radar/combos/page.tsx");
const radarPagePath = path.join(process.cwd(), "src/app/(dashboard)/dashboard/radar/page.tsx");

function pageSource(): string {
  return fs.existsSync(pagePath) ? fs.readFileSync(pagePath, "utf8") : "";
}

test("Radar exposes the guided combos page from its catalog", () => {
  assert.ok(fs.existsSync(pagePath), "missing /dashboard/radar/combos page");
  assert.match(fs.readFileSync(radarPagePath, "utf8"), /href="\/dashboard\/radar\/combos"/);
});

test("guided combos reuse only the local catalog, builder options, and combo writer", () => {
  const source = pageSource();
  assert.match(source, /fetch\("\/api\/radar\/catalog"\)/);
  assert.match(source, /fetch\("\/api\/combos\/builder\/options"\)/);
  assert.match(source, /fetch\("\/api\/combos",\s*\{/);
  assert.match(source, /method:\s*"POST"/);
  assert.doesNotMatch(source, /\/api\/radar\/sync/);
  assert.doesNotMatch(source, /localDb|getDbInstance|createCombo\(/);
});

test("guided combos render family, provider models, strategy reason and created state", () => {
  const source = pageSource();
  assert.match(source, /buildRadarComboSuggestions/);
  for (const key of [
    "familyLabel",
    "modelsLabel",
    "strategyReason",
    "generateButton",
    "alreadyCreated",
    "noSuggestions",
    "catalogRequired",
    "loadFailed",
    "createFailed",
  ]) {
    assert.match(source, new RegExp(`t\\("${key}"`), `missing UI key ${key}`);
  }
});

test("every locale carries the Radar combos namespace and English/pt-BR have real copy", () => {
  const messagesDir = path.join(process.cwd(), "src/i18n/messages");
  const files = fs.readdirSync(messagesDir).filter((file) => file.endsWith(".json"));
  const requiredKeys = [
    "title",
    "subtitle",
    "backToRadar",
    "loading",
    "familyLabel",
    "modelsLabel",
    "strategyReason",
    "generateButton",
    "generating",
    "alreadyCreated",
    "created",
    "noSuggestions",
    "catalogRequired",
    "loadFailed",
    "createFailed",
  ];

  for (const file of files) {
    const messages = JSON.parse(fs.readFileSync(path.join(messagesDir, file), "utf8")) as {
      radarCombosPage?: Record<string, unknown>;
    };
    for (const key of requiredKeys) {
      const value = messages.radarCombosPage?.[key];
      assert.equal(typeof value, "string", `${file}: missing radarCombosPage.${key}`);
      assert.ok((value as string).trim().length > 0, `${file}: empty radarCombosPage.${key}`);
    }
  }

  for (const locale of ["en", "pt-BR"]) {
    const messages = JSON.parse(
      fs.readFileSync(path.join(messagesDir, `${locale}.json`), "utf8")
    ) as { radarCombosPage: Record<string, string> };
    for (const key of requiredKeys) {
      assert.doesNotMatch(
        messages.radarCombosPage[key],
        /^__MISSING__:/,
        `${locale}: placeholder at radarCombosPage.${key}`
      );
    }
  }
});
