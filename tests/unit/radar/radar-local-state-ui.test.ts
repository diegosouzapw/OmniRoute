/** Source contract for the Radar local edit/hide/restore controls. */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const pageSource = fs.readFileSync(
  path.join(process.cwd(), "src/app/(dashboard)/dashboard/radar/page.tsx"),
  "utf8"
);
const controlsSource = fs.readFileSync(
  path.join(process.cwd(), "src/app/(dashboard)/dashboard/radar/RadarCatalogTable.tsx"),
  "utf8"
);

test("Radar catalog UI reads and mutates the dedicated local-state endpoint", () => {
  assert.match(pageSource, /<RadarCatalogTable/);
  assert.match(controlsSource, /fetch\("\/api\/radar\/local-model-state"/);
  assert.match(controlsSource, /method:\s*"PATCH"/);
  assert.match(controlsSource, /method:\s*"PUT"/);
  assert.match(controlsSource, /method:\s*"DELETE"/);
});

test("Radar catalog exposes edit, reset, hide, and restore controls", () => {
  for (const key of [
    "editModel",
    "saveModel",
    "resetModel",
    "hideModel",
    "restoreModel",
    "hiddenModelsTitle",
    "localBadge",
  ]) {
    assert.match(
      controlsSource,
      new RegExp(`t\\(\\"${key}\\"`),
      `missing UI translation key ${key}`
    );
  }
  assert.match(controlsSource, /aria-label=\{t\("modelDisplayName"\)\}/);
  assert.match(controlsSource, /type="checkbox"/);
});

test("English and Brazilian Portuguese catalogs include the local state copy", () => {
  for (const locale of ["en", "pt-BR"]) {
    const messages = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), `src/i18n/messages/${locale}.json`), "utf8")
    ) as { radarPage: Record<string, string> };
    for (const key of [
      "colActions",
      "editModel",
      "saveModel",
      "cancelEdit",
      "resetModel",
      "hideModel",
      "restoreModel",
      "hiddenModelsTitle",
      "modelDisplayName",
      "modelEnabled",
      "localBadge",
      "localStateSaveFailed",
    ]) {
      assert.equal(typeof messages.radarPage[key], "string", `${locale} missing radarPage.${key}`);
      assert.ok(messages.radarPage[key].length > 0);
    }
  }
});
