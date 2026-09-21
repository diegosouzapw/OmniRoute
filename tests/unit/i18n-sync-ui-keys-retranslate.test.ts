import test from "node:test";
import assert from "node:assert/strict";
import { markIdenticalAsMissing } from "../../scripts/i18n/sync-ui-keys.mjs";

// PR-4 of the locale expansion: `sync-ui-keys --retranslate-identical` turns every leaf that
// is still a verbatim copy of the English value (outside `untranslatable-keys.json`) back into
// a `__MISSING__:` placeholder so `--translate-markers` retranslates it.

test("markIdenticalAsMissing flags English leaves as placeholders and skips the allowlist", () => {
  const source = { common: { save: "Save", brand: "OmniRoute" }, x: { y: "Delete" } };
  const merged = { common: { save: "Save", brand: "OmniRoute" }, x: { y: "Excluir" } };
  const n = markIdenticalAsMissing(merged, source, new Set(["common.brand"]));
  assert.equal(n, 1);
  assert.deepEqual(merged, {
    common: { save: "__MISSING__:Save", brand: "OmniRoute" },
    x: { y: "Excluir" },
  });
});

test("markIdenticalAsMissing leaves existing placeholders, translations and empty strings alone", () => {
  const source = { a: "Alpha", b: "Beta", c: "", d: { e: "Echo" } };
  const merged = { a: "__MISSING__:Alpha", b: "Bêta", c: "", d: { e: "Echo" } };
  const n = markIdenticalAsMissing(merged, source, new Set());
  assert.equal(n, 1);
  assert.equal(merged.a, "__MISSING__:Alpha");
  assert.equal(merged.b, "Bêta");
  assert.equal(merged.c, "");
  assert.equal(merged.d.e, "__MISSING__:Echo");
});

test("markIdenticalAsMissing never counts a leaf whose target is missing or a different shape", () => {
  const source = { a: "Alpha", nested: { b: "Bravo" } };
  const merged = { nested: "Bravo" };
  const n = markIdenticalAsMissing(merged, source, new Set());
  assert.equal(n, 0);
  assert.deepEqual(merged, { nested: "Bravo" });
});
