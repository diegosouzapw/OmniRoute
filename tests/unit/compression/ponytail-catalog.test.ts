/**
 * Tests for the ponytail output style — lazy senior dev prompt injection.
 *
 * Verifies:
 *   - Ponytail is registered with lite/full/ultra levels
 *   - i18n maps exist for pt-BR, vi, ja, id
 *   - Each level contains the SHARED_BOUNDARIES suffix
 *   - Each level contains the core YAGNI/rung-check concept
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { OUTPUT_STYLE_CATALOG } from "../../../open-sse/services/compression/outputStyles/catalog.ts";

const PONY = OUTPUT_STYLE_CATALOG["ponytail"];

function assertString(v: unknown, label: string): asserts v is string {
  assert.equal(typeof v, "string", `${label} must be a string`);
}

describe("ponytail output style", () => {
  it("is registered in the catalog with lite/full/ultra levels", () => {
    assert.ok(PONY, "ponytail must be in catalog");
    assert.equal(PONY.id, "ponytail");
    assert.ok(PONY.label.includes("Ponytail"));
    assertString(PONY.levels.lite, "lite");
    assertString(PONY.levels.full, "full");
    assertString(PONY.levels.ultra, "ultra");
  });

  it("every level ends with the shared boundaries suffix", () => {
    const shared = "Code blocks, file paths";
    assert.ok(PONY.levels.lite.includes(shared));
    assert.ok(PONY.levels.full.includes(shared));
    assert.ok(PONY.levels.ultra.includes(shared));
  });

  it("the full level contains the YAGNI ladder", () => {
    assert.ok(/YAGNI/.test(PONY.levels.full), "full level contains YAGNI");
    assert.ok(PONY.levels.full.includes("Grep every caller"));
    assert.ok(PONY.levels.full.includes("root cause"));
  });

  it("has i18n maps for pt-BR, vi, ja, id", () => {
    assert.ok(PONY.i18n, "i18n must be defined");
    assert.ok(PONY.i18n["pt-BR"], "pt-BR must exist");
    assert.ok(PONY.i18n["vi"], "vi must exist");
    assert.ok(PONY.i18n["ja"], "ja must exist");
    assert.ok(PONY.i18n["id"], "id must exist");
  });

  it("each i18n entry has all three intensity levels", () => {
    for (const [lang, levels] of Object.entries(PONY.i18n ?? {})) {
      assertString(levels.lite, `${lang}.lite`);
      assertString(levels.full, `${lang}.full`);
      assertString(levels.ultra, `${lang}.ultra`);
    }
  });

  it("each i18n level ends with shared boundaries", () => {
    const shared = "Code blocks";
    for (const [lang, levels] of Object.entries(PONY.i18n ?? {})) {
      assert.ok(levels.full.includes(shared), `${lang}.full should contain shared boundaries`);
    }
  });

  it("vi (Vietnamese) level contains the core YAGNI concept", () => {
    const vi = PONY.i18n?.["vi"];
    assert.ok(vi, "vi i18n must exist");
    assert.ok(/YAGNI|yagni/i.test(vi.full), "vi.full contains YAGNI/yagni");
    assert.ok(
      /căn nguyên|triệu chứng/.test(vi.full),
      "vi.full contains Vietnamese dev terminology"
    );
  });

  it("ja (Japanese) level contains the core YAGNI concept", () => {
    const ja = PONY.i18n?.["ja"];
    assert.ok(ja, "ja i18n must exist");
    assert.ok(/YAGNI|yagni/i.test(ja.full), "ja.full contains YAGNI/yagni");
    assert.ok(/grep|グレップ/.test(ja.full), "ja.full contains grep-related terminology");
  });
});
