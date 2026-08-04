import { test } from "node:test";
import assert from "node:assert/strict";
import {
  normalizeForSearch,
  matchesSearch,
  matchesAnyToken,
  compareTr,
} from "../../src/shared/utils/turkishText.ts";

test("normalizeForSearch: İ combining-dot üretmez (i'ye katlanır)", () => {
  const out = normalizeForSearch("İ");
  assert.equal(out, "i");
  assert.ok(!out.includes("̇"), "combining dot above bulunmamalı");
});

test("normalizeForSearch: I (dotless) → i", () => {
  assert.equal(normalizeForSearch("IĞDIR"), "igdir");
});

test("normalizeForSearch: aksanları katlar (şğüöç)", () => {
  assert.equal(normalizeForSearch("Şarj Çözüm Güven"), "sarj cozum guven");
});

test("matchesSearch: İstanbul'u 'istanbul' sorgusuyla bulur", () => {
  assert.equal(matchesSearch("İstanbul", "istanbul"), true);
});

test("matchesSearch: Latin 'Istanbul' sorgusu (noktasız I) dotted İ metnini bulur", () => {
  // Real-world: data has the dotted Turkish İ, the user types a Latin capital I
  // (no dot) from a non-Turkish keyboard. Both must fold to "istanbul".
  assert.equal(matchesSearch("İstanbul", "Istanbul"), true);
  assert.equal(matchesSearch("Istanbul", "İstanbul"), true);
});

test("matchesSearch: aksan-duyarsız (Şarj İstasyonu ↔ 'sarj')", () => {
  assert.equal(matchesSearch("Şarj İstasyonu", "sarj"), true);
});

test("matchesSearch: eşleşmeyen sorgu false döner", () => {
  assert.equal(matchesSearch("OpenAI", "anthropic"), false);
});

test("matchesSearch: boş sorgu her şeyi eşler", () => {
  assert.equal(matchesSearch("herhangi", ""), true);
});

test("compareTr: Türkçe alfabede ç, c'den sonra gelir", () => {
  assert.deepEqual(["d", "ç", "c", "b"].sort(compareTr), ["b", "c", "ç", "d"]);
});

test("compareTr: ı, i'den önce gelir (Türkçe)", () => {
  assert.equal(compareTr("ı", "i") < 0, true);
});

test("compareTr: sayısal-duyarlı (item2 < item10)", () => {
  assert.equal(compareTr("item2", "item10") < 0, true);
});

test("normalizeForSearch: null/undefined boş string döner", () => {
  assert.equal(normalizeForSearch(null), "");
  assert.equal(normalizeForSearch(undefined), "");
});

test("normalizeForSearch: yalnızca boşluk → boş string", () => {
  assert.equal(normalizeForSearch("   "), "");
});

test("matchesSearch: yalnızca boşluk sorgusu her şeyi eşler", () => {
  assert.equal(matchesSearch("herhangi", "   "), true);
});

test("compareTr: null/undefined argümanları güvenli (?? '' guard)", () => {
  assert.equal(compareTr(null, "a") < 0, true);
  assert.equal(compareTr("a", null) > 0, true);
  assert.equal(compareTr(null, undefined), 0);
});

// ---------------------------------------------------------------------------
// matchesAnyToken — Türkçe bölümü (release tarafı)
// ---------------------------------------------------------------------------

test("matchesAnyToken: tek token eşleşmesi", () => {
  assert.equal(matchesAnyToken("pollinations", "pollinations sambanova"), true);
});

test("matchesAnyToken: birden fazla token'dan biri eşleşir", () => {
  assert.equal(matchesAnyToken("sambanova", "pollinations sambanova huggingface"), true);
});

test("matchesAnyToken: hiçbir token eşleşmez", () => {
  assert.equal(matchesAnyToken("openai", "pollinations sambanova"), false);
});

test("matchesAnyToken: Türkçe ve aksan duyarsız çoklu token eşleşmesi", () => {
  assert.equal(matchesAnyToken("İstanbul Provider", "ankara istanbul"), true);
});

test("matchesAnyToken: boş veya yalnızca boşluk sorgusu her şeyi eşler", () => {
  assert.equal(matchesAnyToken("herhangi", ""), true);
  assert.equal(matchesAnyToken("herhangi", "   "), true);
});

test("matchesAnyToken: null/undefined text/query güvenli", () => {
  assert.equal(matchesAnyToken(null, "test"), false);
  assert.equal(matchesAnyToken("test", null), true);
});

// ---------------------------------------------------------------------------
// matchesAnyToken — PR #8660 bölümü (space-separated query)
// ---------------------------------------------------------------------------

test("matchesAnyToken: single token behaves like matchesSearch", () => {
  assert.equal(matchesAnyToken("İstanbul", "istanbul"), true);
  assert.equal(matchesAnyToken("OpenAI", "anthropic"), false);
});

test("matchesAnyToken: multi-token query matches any token (OR fallback)", () => {
  assert.equal(matchesAnyToken("pollinations", "pollinations sambanova"), true);
  assert.equal(matchesAnyToken("sambanova", "pollinations sambanova"), true);
  assert.equal(matchesAnyToken("huggingface", "pollinations sambanova"), false);
  assert.equal(matchesAnyToken("testorg", "testorg github"), true);
  assert.equal(matchesAnyToken("github", "testorg github"), true);
});

test("matchesAnyToken: full query match takes priority before OR split", () => {
  assert.equal(matchesAnyToken("pollinations sambanova", "pollinations sambanova"), true);
});

test("matchesAnyToken: Turkish normalization works across tokens", () => {
  assert.equal(matchesAnyToken("Şarj", "sarj istanbul"), true);
  assert.equal(matchesAnyToken("İstanbul", "istanbul sarj"), true);
});

test("matchesAnyToken: empty or whitespace query matches all", () => {
  assert.equal(matchesAnyToken("anything", ""), true);
  assert.equal(matchesAnyToken("anything", "   "), true);
});

test("matchesAnyToken: null/undefined guard mirrors matchesSearch", () => {
  assert.equal(matchesAnyToken(null, "query"), false);
  assert.equal(matchesAnyToken("text", null), true);
  assert.equal(matchesAnyToken(undefined, "query"), false);
  assert.equal(matchesAnyToken("text", undefined), true);
});
