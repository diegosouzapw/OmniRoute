import { test } from "node:test";
import assert from "node:assert/strict";
import { mergeMissing } from "../../scripts/i18n/sync-ui-keys.mjs";

test("merges new keys and matches the pre-change snapshot byte for byte", () => {
  const source = {
    common: { save: "Save", cancel: "Cancel", fresh: "Fresh" },
    dashboard: { title: "Title", fresh: "New panel" },
    top: "Top",
  };
  const target = {
    common: { save: "Guardar", cancel: "Cancelar" },
    dashboard: { title: "Titulo" },
    top: "Topo",
  };
  const { merged, addedPaths } = mergeMissing(source, target);
  assert.deepEqual(addedPaths, ["common.fresh", "dashboard.fresh"]);
  assert.deepEqual(JSON.parse(JSON.stringify(merged)), {
    common: { save: "Guardar", cancel: "Cancelar", fresh: "__MISSING__:Fresh" },
    dashboard: { title: "Titulo", fresh: "__MISSING__:New panel" },
    top: "Topo",
  });
  assert.equal(
    JSON.stringify({ merged, addedPaths }),
    '{"merged":{"common":{"save":"Guardar","cancel":"Cancelar","fresh":"__MISSING__:Fresh"},' +
      '"dashboard":{"title":"Titulo","fresh":"__MISSING__:New panel"},"top":"Topo"},' +
      '"addedPaths":["common.fresh","dashboard.fresh"]}'
  );
});

test("drops forbidden keys from the merged tree and the added paths", () => {
  const source = JSON.parse(
    '{"ok":"Ok","__proto__":"Proto","prototype":"Proto","constructor":"Ctor"}'
  );
  const { merged, addedPaths } = mergeMissing(source, {});
  assert.deepEqual(addedPaths, ["ok"]);
  assert.deepEqual(JSON.parse(JSON.stringify(merged)), { ok: "__MISSING__:Ok" });
  assert.equal(Object.getPrototypeOf(merged), null);
  assert.equal({}.polluted, undefined);
});

test("reports no additions when the target is already in sync", () => {
  const source = { common: { save: "Save" }, top: "Top" };
  const target = { common: { save: "Guardar" }, top: "Topo" };
  const { merged, addedPaths } = mergeMissing(source, target);
  assert.deepEqual(addedPaths, []);
  assert.deepEqual(JSON.parse(JSON.stringify(merged)), target);
  assert.equal(JSON.stringify(merged), '{"common":{"save":"Guardar"},"top":"Topo"}');
});

test("keeps the existing value on shape mismatch", () => {
  const leafVsObject = mergeMissing({ a: "Alpha" }, { a: { deep: "Profundo" } });
  assert.deepEqual(leafVsObject.addedPaths, []);
  assert.deepEqual(JSON.parse(JSON.stringify(leafVsObject.merged)), { a: { deep: "Profundo" } });

  const objectVsLeaf = mergeMissing({ nested: { b: "Bravo" } }, { nested: "Bravo" });
  assert.deepEqual(objectVsLeaf.addedPaths, ["nested.b"]);
  assert.deepEqual(JSON.parse(JSON.stringify(objectVsLeaf.merged)), {
    nested: { b: "__MISSING__:Bravo" },
  });
});
