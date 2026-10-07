import { test } from "node:test";
import assert from "node:assert/strict";
import { findUntranslatedNewKeys } from "../../scripts/i18n/check-new-key-coverage.mjs";

const en = (extra: Record<string, string> = {}) => ({ ui: { existing: "Existing", ...extra } });

test("a key that already existed is never flagged, however bad its translations", () => {
  const gaps = findUntranslatedNewKeys({
    baseEn: en(),
    headEn: en(),
    headLocales: { pt: { ui: {} } },
  });
  assert.deepEqual(gaps, [], "pre-existing debt stays frozen — this gate judges only new keys");
});

test("a new English key missing from a locale is flagged", () => {
  const gaps = findUntranslatedNewKeys({
    baseEn: en(),
    headEn: en({ fresh: "Fresh" }),
    headLocales: { pt: { ui: { existing: "Existente" } }, de: { ui: { existing: "Vorhanden" } } },
  });
  assert.deepEqual(gaps, [
    { key: "ui.fresh", locale: "de" },
    { key: "ui.fresh", locale: "pt" },
  ]);
});

test("a new key translated everywhere passes", () => {
  const gaps = findUntranslatedNewKeys({
    baseEn: en(),
    headEn: en({ fresh: "Fresh" }),
    headLocales: { pt: { ui: { existing: "Existente", fresh: "Novo" } } },
  });
  assert.deepEqual(gaps, []);
});

/**
 * 2026-09-16: eight feature PRs added 61 keys to en.json and stamped `__MISSING__:<en>` into
 * all 65 locales instead of translating. This gate accepted the marker as "the key reached the
 * locale", nothing blocked the PRs, and the real-translation ratio gate then went red on the
 * release tip for everybody (pt-BR 3.2 % > 2.5 % + 0.5). A marker is an absent translation.
 */
test("a new key that only carries a __MISSING__ marker is flagged", () => {
  const gaps = findUntranslatedNewKeys({
    baseEn: en(),
    headEn: en({ fresh: "Fresh" }),
    headLocales: {
      pt: { ui: { existing: "Existente", fresh: "__MISSING__:Fresh" } },
      de: { ui: { existing: "Vorhanden", fresh: "Frisch" } },
    },
  });
  assert.deepEqual(gaps, [{ key: "ui.fresh", locale: "pt" }]);
});

test("an empty string does NOT satisfy the gate", () => {
  const gaps = findUntranslatedNewKeys({
    baseEn: en(),
    headEn: en({ fresh: "Fresh" }),
    headLocales: { pt: { ui: { existing: "Existente", fresh: "   " } } },
  });
  assert.deepEqual(gaps, [{ key: "ui.fresh", locale: "pt" }]);
});

/**
 * The incident this gate encodes: Phase 3 added keys against 42 locales; the EU batch then
 * took the repo to 51, and the nine newcomers never received them.
 */
test("a locale added AFTER the key still has to carry it", () => {
  const gaps = findUntranslatedNewKeys({
    baseEn: en(),
    headEn: en({ compareMode: "Compare runs" }),
    headLocales: {
      pt: { ui: { existing: "Existente", compareMode: "Comparar execuções" } },
      el: { ui: { existing: "Υπάρχον" } },
    },
  });
  assert.deepEqual(gaps, [{ key: "ui.compareMode", locale: "el" }]);
});

test("a new key whose English value is empty is not enforced", () => {
  const gaps = findUntranslatedNewKeys({
    baseEn: en(),
    headEn: en({ blank: "" }),
    headLocales: { pt: { ui: { existing: "Existente" } } },
  });
  assert.deepEqual(gaps, []);
});
