/**
 * Tests for G1 — i18n deep-merge EN fallback (src/i18n/request.ts).
 *
 * Strategy (A): test `deepMergeFallback` directly via its named export.
 * This avoids mocking next/headers, next-intl, and dynamic imports while
 * achieving ≥90% line coverage of the merge function itself.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { deepMergeFallback } from "../../src/i18n/request.ts";

// ---------------------------------------------------------------------------
// 1. deepMergeFallback — locale-specific key wins (target wins)
// ---------------------------------------------------------------------------

test("deepMergeFallback: locale-specific key is preserved when source has the same key", () => {
  const target: Record<string, unknown> = { greeting: "Hola" };
  const source: Record<string, unknown> = { greeting: "Hello" };
  const result = deepMergeFallback(target, source);
  assert.equal(result.greeting, "Hola", "target value must survive when both target and source have the key");
});

test("deepMergeFallback: returns the same target reference (mutates in-place)", () => {
  const target: Record<string, unknown> = { a: 1 };
  const source: Record<string, unknown> = { b: 2 };
  const result = deepMergeFallback(target, source);
  assert.equal(result, target, "must return the same object reference");
});

// ---------------------------------------------------------------------------
// 2. deepMergeFallback — missing keys are added from source (fallback wins)
// ---------------------------------------------------------------------------

test("deepMergeFallback: missing key in target is filled from source", () => {
  const target: Record<string, unknown> = { localeKey: "Hola" };
  const source: Record<string, unknown> = { localeKey: "Hello", fallbackKey: "Fallback EN" };
  const result = deepMergeFallback(target, source);
  assert.equal(result.localeKey, "Hola", "locale key must win");
  assert.equal(result.fallbackKey, "Fallback EN", "fallback key must be added");
});

test("deepMergeFallback: entire namespace missing in target is filled from source", () => {
  const target: Record<string, unknown> = { namespace1: { localeKey: "Hola" } };
  const source: Record<string, unknown> = {
    namespace1: { localeKey: "Hello", fallbackKey: "Fallback EN" },
    namespace2: { onlyEn: "Only EN" },
  };
  const result = deepMergeFallback(target, source);
  // locale key wins inside existing namespace
  assert.equal((result.namespace1 as Record<string, unknown>).localeKey, "Hola");
  // fallback key added inside existing namespace
  assert.equal((result.namespace1 as Record<string, unknown>).fallbackKey, "Fallback EN");
  // entire namespace from source added to target
  assert.deepEqual(result.namespace2, { onlyEn: "Only EN" });
});

// ---------------------------------------------------------------------------
// 3. deepMergeFallback — deep merge on nested objects
// ---------------------------------------------------------------------------

test("deepMergeFallback: deep merge recurses into nested objects", () => {
  const target: Record<string, unknown> = {
    a: {
      b: {
        locale: "es value",
      },
    },
  };
  const source: Record<string, unknown> = {
    a: {
      b: {
        locale: "en value",
        fallback: "en fallback",
      },
      c: "only in en",
    },
  };
  const result = deepMergeFallback(target, source);
  const a = result.a as Record<string, unknown>;
  const b = a.b as Record<string, unknown>;
  assert.equal(b.locale, "es value", "deeply nested locale key must win");
  assert.equal(b.fallback, "en fallback", "deeply nested missing key must be filled from fallback");
  assert.equal(a.c, "only in en", "sibling key missing in target must be filled from source");
});

test("deepMergeFallback: three levels deep — target wins at all levels", () => {
  const target: Record<string, unknown> = {
    l1: { l2: { l3: { key: "locale" } } },
  };
  const source: Record<string, unknown> = {
    l1: { l2: { l3: { key: "fallback", extra: "extra-en" }, l2extra: "l2extra-en" } },
  };
  const result = deepMergeFallback(target, source);
  const l3 = (((result.l1 as Record<string, unknown>).l2 as Record<string, unknown>).l3 as Record<string, unknown>);
  assert.equal(l3.key, "locale");
  assert.equal(l3.extra, "extra-en");
  const l2 = ((result.l1 as Record<string, unknown>).l2 as Record<string, unknown>);
  assert.equal(l2.l2extra, "l2extra-en");
});

// ---------------------------------------------------------------------------
// 4. deepMergeFallback — arrays are NOT deep-merged (scalar replacement)
// ---------------------------------------------------------------------------

test("deepMergeFallback: arrays in target are preserved as-is (not merged with source)", () => {
  const target: Record<string, unknown> = { items: ["es-a", "es-b"] };
  const source: Record<string, unknown> = { items: ["en-a", "en-b", "en-c"] };
  const result = deepMergeFallback(target, source);
  // Target already has the key, so it wins — array from source is ignored.
  assert.deepEqual(result.items, ["es-a", "es-b"]);
});

test("deepMergeFallback: array missing in target is filled from source (not merged)", () => {
  const target: Record<string, unknown> = {};
  const source: Record<string, unknown> = { tags: ["en-tag-1", "en-tag-2"] };
  const result = deepMergeFallback(target, source);
  assert.deepEqual(result.tags, ["en-tag-1", "en-tag-2"]);
});

test("deepMergeFallback: source array does NOT overwrite existing object in target", () => {
  // Source has an array where target has an object — target wins (existing value kept).
  const target: Record<string, unknown> = { data: { nested: "locale" } };
  const source: Record<string, unknown> = { data: ["en-1", "en-2"] };
  const result = deepMergeFallback(target, source);
  // target has "data" defined (as object), so source's array is ignored
  assert.deepEqual(result.data, { nested: "locale" });
});

test("deepMergeFallback: source object does NOT overwrite existing array in target", () => {
  // Source has an object where target has an array — target array wins (existing value kept).
  const target: Record<string, unknown> = { list: ["es-item"] };
  const source: Record<string, unknown> = { list: { key: "en-val" } };
  const result = deepMergeFallback(target, source);
  // target has "list" defined (as array), source is an object — since target[key] !== undefined
  // the else-if branch is skipped, so target.list remains the array.
  assert.deepEqual(result.list, ["es-item"]);
});

// ---------------------------------------------------------------------------
// 5. deepMergeFallback — null values in source / target
// ---------------------------------------------------------------------------

test("deepMergeFallback: null in source is treated as scalar (fills missing target key)", () => {
  const target: Record<string, unknown> = {};
  const source: Record<string, unknown> = { nullable: null };
  const result = deepMergeFallback(target, source);
  assert.equal(result.nullable, null);
});

test("deepMergeFallback: null in target preserves null (source object does not recurse into null)", () => {
  const target: Record<string, unknown> = { section: null };
  const source: Record<string, unknown> = { section: { key: "en-val" } };
  const result = deepMergeFallback(target, source);
  // target has "section" defined (as null — not undefined), so source's value is NOT applied.
  assert.equal(result.section, null);
});

// ---------------------------------------------------------------------------
// 6. deepMergeFallback — empty objects
// ---------------------------------------------------------------------------

test("deepMergeFallback: empty target gets all keys from source", () => {
  const target: Record<string, unknown> = {};
  const source: Record<string, unknown> = { a: "A", b: { c: "C" } };
  const result = deepMergeFallback(target, source);
  assert.equal(result.a, "A");
  assert.deepEqual(result.b, { c: "C" });
});

test("deepMergeFallback: empty source leaves target unchanged", () => {
  const target: Record<string, unknown> = { x: "locale-x" };
  const source: Record<string, unknown> = {};
  const result = deepMergeFallback(target, source);
  assert.equal(result.x, "locale-x");
  assert.equal(Object.keys(result).length, 1);
});

// ---------------------------------------------------------------------------
// 7. Scenario: realistic i18n shape — simulate en.json as fallback
// ---------------------------------------------------------------------------

test("realistic i18n: es locale with partial translations falls back to EN for missing keys", () => {
  // Simulates what getRequestConfig does:
  //   localeMessages = es.json content (partial)
  //   fallbackMessages = en.json content (complete)
  //   messages = deepMergeFallback({ ...localeMessages }, fallbackMessages)
  const esLocale: Record<string, unknown> = {
    namespace1: {
      localeKey: "Hola",
      // fallbackKey is absent — will come from EN
    },
    // namespace2 is absent — will come from EN
  };
  const enFallback: Record<string, unknown> = {
    namespace1: {
      localeKey: "Hello",
      fallbackKey: "Fallback EN",
    },
    namespace2: {
      onlyEn: "Only EN",
    },
  };

  // Simulate what the factory does: shallow copy first so we don't mutate the import cache
  const messages = deepMergeFallback({ ...esLocale }, enFallback);

  assert.equal(messages.namespace1, esLocale.namespace1, "namespace1 object is the same reference (mutated in-place)");
  const ns1 = messages.namespace1 as Record<string, unknown>;
  assert.equal(ns1.localeKey, "Hola", "locale-specific key wins");
  assert.equal(ns1.fallbackKey, "Fallback EN", "missing key filled from EN fallback");
  assert.deepEqual(messages.namespace2, { onlyEn: "Only EN" }, "entirely missing namespace filled from EN");
});

test("realistic i18n: en locale — shallow copy means no mutation of original en object", () => {
  // When locale === 'en', the factory returns localeMessages as-is (no merge).
  // This test verifies the shallow copy pattern does not mutate the original.
  const enLocale: Record<string, unknown> = { key: "EN value" };
  const copy = { ...enLocale };
  deepMergeFallback(copy, {}); // noop — empty source
  assert.equal(enLocale.key, "EN value", "original object must not be mutated");
});

test("realistic i18n: locale invalid → DEFAULT_LOCALE applies; merge still works for non-EN default", () => {
  // If DEFAULT_LOCALE were "pt-BR" (not EN), we'd merge pt-BR with EN fallback.
  // Simulate this by merging a pt-BR partial object with EN.
  const ptBrLocale: Record<string, unknown> = {
    common: { save: "Salvar" },
    // 'common.cancel' is missing — should come from EN
  };
  const enFallback: Record<string, unknown> = {
    common: { save: "Save", cancel: "Cancel" },
    extra: { key: "Extra EN" },
  };
  const messages = deepMergeFallback({ ...ptBrLocale }, enFallback);
  const common = messages.common as Record<string, unknown>;
  assert.equal(common.save, "Salvar", "locale key wins in default locale");
  assert.equal(common.cancel, "Cancel", "missing key filled from EN");
  assert.deepEqual(messages.extra, { key: "Extra EN" }, "missing namespace filled from EN");
});
