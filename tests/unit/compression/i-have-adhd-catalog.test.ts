/**
 * Tests for the i-have-adhd output style — action-first prompt injection.
 *
 * Verifies:
 *   - i-have-adhd is registered with lite/full/ultra levels
 *   - i18n map exists for pt-BR with all three levels
 *   - Each level (en and pt-BR) contains the SHARED_BOUNDARIES suffix
 *   - Core concepts present: action-first, numbered steps, no preamble
 *   - No locale gate (style valid under every language)
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  OUTPUT_STYLE_CATALOG,
  outputStyleMeta,
} from "../../../open-sse/services/compression/outputStyles/catalog.ts";

const ADHD = OUTPUT_STYLE_CATALOG["i-have-adhd"];

function assertString(v: unknown, label: string): asserts v is string {
  assert.equal(typeof v, "string", `${label} must be a string`);
}

describe("i-have-adhd output style", () => {
  it("is registered in the catalog with lite/full/ultra levels", () => {
    assert.ok(ADHD, "i-have-adhd must be in catalog");
    assert.equal(ADHD.id, "i-have-adhd");
    assert.ok(ADHD.label.includes("ADHD"));
    assertString(ADHD.levels.lite, "lite");
    assertString(ADHD.levels.full, "full");
    assertString(ADHD.levels.ultra, "ultra");
  });

  it("every level ends with the shared boundaries suffix", () => {
    const shared = "Code blocks, file paths";
    assert.ok(ADHD.levels.lite.includes(shared));
    assert.ok(ADHD.levels.full.includes(shared));
    assert.ok(ADHD.levels.ultra.includes(shared));
  });

  it("the full level contains the action-first core concepts", () => {
    assert.ok(ADHD.levels.full.includes("Lead with the next action"));
    assert.ok(/[Nn]umber/.test(ADHD.levels.full), "full mentions numbered steps");
    assert.ok(ADHD.levels.full.includes("No preamble"));
  });

  it("has an i18n map for pt-BR with all three intensity levels", () => {
    assert.ok(ADHD.i18n, "i18n must be defined");
    const pt = ADHD.i18n["pt-BR"];
    assert.ok(pt, "pt-BR must exist");
    assertString(pt.lite, "pt-BR.lite");
    assertString(pt.full, "pt-BR.full");
    assertString(pt.ultra, "pt-BR.ultra");
  });

  it("each pt-BR level ends with shared boundaries", () => {
    const shared = "Code blocks";
    const pt = ADHD.i18n?.["pt-BR"];
    assert.ok(pt, "pt-BR i18n must exist");
    assert.ok(pt.lite.includes(shared), "pt-BR.lite contains shared boundaries");
    assert.ok(pt.full.includes(shared), "pt-BR.full contains shared boundaries");
    assert.ok(pt.ultra.includes(shared), "pt-BR.ultra contains shared boundaries");
  });

  it("pt-BR full contains Portuguese action-first terminology", () => {
    const pt = ADHD.i18n?.["pt-BR"];
    assert.ok(pt, "pt-BR i18n must exist");
    assert.ok(/ação/.test(pt.full), "pt-BR.full mentions ação");
    assert.ok(/preâmbulo/.test(pt.full), "pt-BR.full mentions preâmbulo");
  });

  it("has i18n maps for pt-BR, vi, ja and id (parity with ponytail)", () => {
    assert.ok(ADHD.i18n, "i18n must be defined");
    for (const lang of ["pt-BR", "vi", "ja", "id"]) {
      const levels = ADHD.i18n[lang];
      assert.ok(levels, `${lang} must exist`);
      assertString(levels.lite, `${lang}.lite`);
      assertString(levels.full, `${lang}.full`);
      assertString(levels.ultra, `${lang}.ultra`);
      assert.ok(
        levels.full.includes("Code blocks"),
        `${lang}.full must keep the shared boundaries clause`
      );
    }
  });

  it("each translation is written in its own language, not copied English", () => {
    // Native-script / native-word anchors: a level that merely duplicated the
    // English text would pass the structural checks above but fail here.
    const anchors: Record<string, RegExp> = {
      vi: /hành động/, // "action"
      ja: /[぀-ヿ]/, // kana — Japanese-exclusive
      id: /aksi|langkah/, // "action" / "step"
    };
    for (const [lang, pattern] of Object.entries(anchors)) {
      const levels = ADHD.i18n?.[lang];
      assert.ok(levels, `${lang} i18n must exist`);
      assert.ok(pattern.test(levels.full), `${lang}.full must use ${lang} vocabulary`);
      assert.ok(pattern.test(levels.ultra), `${lang}.ultra must use ${lang} vocabulary`);
    }
  });

  it("carries no locale gate", () => {
    assert.equal(outputStyleMeta("i-have-adhd").locale, undefined);
  });
});
