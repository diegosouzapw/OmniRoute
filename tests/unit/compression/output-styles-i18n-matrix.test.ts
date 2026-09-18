/**
 * Guard for the output-style × language matrix.
 *
 * Why this exists: the compression INPUT engines understand 10 languages (rule
 * packs under open-sse/services/compression/rules/ + the detector), but the
 * OUTPUT styles only instruct in a subset. `less-code` shipped English-only and
 * nobody noticed for months, because every other test is per-style. This test
 * is per-MATRIX: it pins the expected coverage so a new style cannot silently
 * be born English-only, and so an existing style cannot silently lose a locale.
 *
 * Adding a language to a style: extend BASELINE_LANGUAGES below (the assertion
 * is "at least these", so growth never fails the gate).
 * Adding a NEW style: it must cover REQUIRED_LANGUAGES, or be listed in
 * KNOWN_ENGLISH_ONLY with a tracking issue.
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  OUTPUT_STYLE_CATALOG,
  OUTPUT_STYLE_IDS,
  outputStyleMeta,
  SAFETY_BOUNDARIES,
} from "../../../open-sse/services/compression/outputStyles/catalog.ts";

/** Minimum i18n coverage every new non-locale-gated style must ship with. */
const REQUIRED_LANGUAGES = ["pt-BR"];

/**
 * Styles that predate this guard and are still English-only.
 * Do NOT add entries here without an issue — fix the coverage instead.
 */
const KNOWN_ENGLISH_ONLY: Record<string, string> = {};

/**
 * Frozen per-style coverage. The assertion is a SUPERSET check, so adding a
 * language is always allowed; removing one fails the gate.
 */
const BASELINE_LANGUAGES: Record<string, string[]> = {
  // terse-prose reuses CAVEMAN_INSTRUCTION_BY_LANGUAGE (outputMode.ts), which
  // localizes to pt-BR/es/de/fr/it/ru/zh/ja/id/vi — keep the two in sync.
  "terse-prose": ["pt-BR", "es", "de", "fr", "it", "ru", "zh", "ja", "id", "vi"],
  "less-code": ["pt-BR", "vi", "ja", "id", "es", "de", "fr", "it", "ru", "zh"],
  ponytail: ["pt-BR", "vi", "ja", "id", "es", "de", "fr", "it", "ru", "zh"],
  "i-have-adhd": ["pt-BR", "vi", "ja", "id", "es", "de", "fr", "it", "ru", "zh"],
  // locale-gated to zh: the single-language instruction IS the feature.
  "terse-cjk": [],
};

function languagesOf(id: string): string[] {
  return Object.keys(outputStyleMeta(id).i18n ?? {});
}

test("every catalog style is covered by the matrix baseline", () => {
  for (const id of OUTPUT_STYLE_IDS) {
    assert.ok(
      id in BASELINE_LANGUAGES,
      `style "${id}" is missing from BASELINE_LANGUAGES — add its expected languages ` +
        `(and translate it: a new style must cover ${REQUIRED_LANGUAGES.join(", ")})`
    );
  }
});

test("no style loses a language it already had", () => {
  for (const [id, expected] of Object.entries(BASELINE_LANGUAGES)) {
    if (!OUTPUT_STYLE_CATALOG[id]) continue; // style removed — covered by the catalog tests
    const actual = languagesOf(id);
    for (const lang of expected) {
      assert.ok(
        actual.includes(lang),
        `style "${id}" lost its "${lang}" translation (has: ${actual.join(", ") || "none"})`
      );
    }
  }
});

test("a non-locale-gated style ships the required languages, or is a known gap", () => {
  for (const id of OUTPUT_STYLE_IDS) {
    const meta = outputStyleMeta(id);
    // A locale-gated style is only ever offered under its own locale, so a
    // single-language instruction is correct by design (e.g. terse-cjk → zh).
    if (meta.locale) continue;
    if (id in KNOWN_ENGLISH_ONLY) continue;
    const actual = languagesOf(id);
    for (const lang of REQUIRED_LANGUAGES) {
      assert.ok(
        actual.includes(lang),
        `style "${id}" must ship a "${lang}" translation (has: ${actual.join(", ") || "none"}). ` +
          `English-only styles need an entry in KNOWN_ENGLISH_ONLY with a tracking issue.`
      );
    }
  }
});

test("every declared translation has all three intensity levels", () => {
  for (const id of OUTPUT_STYLE_IDS) {
    const i18n = outputStyleMeta(id).i18n ?? {};
    for (const [lang, levels] of Object.entries(i18n)) {
      for (const level of ["lite", "full", "ultra"] as const) {
        assert.equal(
          typeof levels[level],
          "string",
          `${id}.i18n["${lang}"].${level} must be a string`
        );
        assert.ok(levels[level].length > 0, `${id}.i18n["${lang}"].${level} must be non-empty`);
      }
    }
  }
});

test("every translated level carries the shared boundaries clause", () => {
  // The boundary clause is what keeps code, paths, commands, errors and URLs
  // verbatim. A translation that drops it would let the model rewrite them.
  // (For styles that declare their own `boundaries`, this inline clause is the
  // placeholder the injector strips before appending the resolved boundary.)
  const anchor = "Code blocks";
  for (const id of OUTPUT_STYLE_IDS) {
    const i18n = outputStyleMeta(id).i18n ?? {};
    for (const [lang, levels] of Object.entries(i18n)) {
      for (const level of ["lite", "full", "ultra"] as const) {
        assert.ok(
          levels[level].includes(anchor),
          `${id}.i18n["${lang}"].${level} is missing the shared boundaries clause`
        );
      }
    }
  }
});

test("KNOWN_ENGLISH_ONLY does not hide a style that is actually translated", () => {
  // Stale-allowlist guard: once a gap is fixed, its entry must be removed.
  for (const id of Object.keys(KNOWN_ENGLISH_ONLY)) {
    if (!OUTPUT_STYLE_CATALOG[id]) continue;
    assert.equal(
      languagesOf(id).length,
      0,
      `style "${id}" now has translations — remove it from KNOWN_ENGLISH_ONLY`
    );
  }
});

/**
 * (The per-style boundary matrix is covered by
 * "the carve-out styles declare the ponytail safety boundary..." below.)
 */

test("the carve-out styles declare the ponytail safety boundary with per-language translations", () => {
  // Defect 1: ponytail and less-code shape code, so they must carry the upstream
  // safety carve-out ("never cut validation, error handling, security,
  // accessibility") instead of relying on the prose-oriented SHARED_BOUNDARIES.
  for (const id of ["ponytail", "less-code"]) {
    const meta = outputStyleMeta(id);
    assert.equal(meta.boundaries, SAFETY_BOUNDARIES, `${id}.boundaries is the carve-out`);
    for (const lang of Object.keys(meta.i18n ?? {})) {
      assert.ok(
        meta.boundariesI18n?.[lang],
        `style "${id}" declares boundaries but is missing boundariesI18n["${lang}"] — ` +
          `a localized instruction must not get an English-only boundary appended`
      );
    }
  }
});

test("wave-2 translations are written in their own language, not copied English", () => {
  const anchors: Record<string, Record<string, RegExp>> = {
    "less-code": {
      es: /petición|archivos/,
      de: /Änderung|Dateien/,
      fr: /demande|fichier/,
      it: /modifica|righe/,
      ru: /[А-Яа-яЁё]/,
      zh: /[一-鿿]/,
    },
    ponytail: {
      es: /escribir|perezoso/,
      de: /faul|schreiben/i,
      fr: /paresseux|écrire/,
      it: /pigro|scrivere/,
      ru: /[А-Яа-яЁё]/,
      zh: /[一-鿿]/,
    },
    "i-have-adhd": {
      es: /acción/,
      de: /ADHS/,
      fr: /délimitée|préambule/,
      it: /delimitata|preamboli/,
      ru: /[А-Яа-яЁё]/,
      zh: /[一-鿿]/,
    },
    "terse-prose": {
      es: /Responde/,
      de: /Antworte/,
      fr: /Reponds|Réponds/i,
      it: /Rispondi/,
      ru: /[А-Яа-яЁё]/,
      zh: /[一-鿿]/,
    },
  };
  for (const [styleId, langs] of Object.entries(anchors)) {
    const i18n = outputStyleMeta(styleId).i18n ?? {};
    for (const [lang, anchor] of Object.entries(langs)) {
      for (const level of ["lite", "full", "ultra"] as const) {
        assert.ok(
          anchor.test(i18n[lang][level]),
          `${styleId}.${lang}.${level} fails its language anchor`
        );
      }
    }
  }
});
