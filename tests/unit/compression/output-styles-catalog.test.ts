import { test } from "node:test";
import assert from "node:assert/strict";
import {
  OUTPUT_STYLE_CATALOG,
  OUTPUT_STYLE_IDS,
  outputStyleMeta,
  type OutputStyle,
} from "../../../open-sse/services/compression/outputStyles/catalog.ts";

test("catalog seeds terse-prose, less-code, ponytail, terse-cjk with all three levels", () => {
  for (const id of ["terse-prose", "less-code", "ponytail", "terse-cjk"]) {
    const meta = outputStyleMeta(id);
    assert.ok(meta, `${id} present`);
    assert.equal(typeof meta.label, "string");
    for (const level of ["lite", "full", "ultra"] as const) {
      assert.equal(typeof meta.levels[level], "string");
      assert.ok(meta.levels[level].length > 0, `${id}.${level} non-empty`);
    }
  }
});

test("OUTPUT_STYLE_IDS lists every catalog id in catalog (declaration) order", () => {
  assert.deepEqual(OUTPUT_STYLE_IDS, Object.keys(OUTPUT_STYLE_CATALOG));
});

test("terse-cjk carries a locale gate of zh", () => {
  assert.equal(outputStyleMeta("terse-cjk").locale, "zh");
  assert.equal(outputStyleMeta("terse-prose").locale, undefined);
});

test("extensibility: one entry added to the catalog is enumerated with no other change", () => {
  const probe: OutputStyle = {
    id: "__probe__",
    label: "Probe",
    levels: { lite: "L", full: "F", ultra: "U" },
  };
  const extended = { ...OUTPUT_STYLE_CATALOG, [probe.id]: probe };
  const ids = Object.keys(extended);
  assert.ok(ids.includes("__probe__"));
  // Adding a style adds exactly one id; no plumbing edited.
  assert.equal(ids.length, OUTPUT_STYLE_IDS.length + 1);
});

test("every level instruction is deterministic (no Date/Math.random tokens)", () => {
  for (const id of OUTPUT_STYLE_IDS) {
    const meta = outputStyleMeta(id);
    for (const level of ["lite", "full", "ultra"] as const) {
      assert.doesNotMatch(meta.levels[level], /Date\.now|Math\.random|\$\{/);
    }
  }
});
