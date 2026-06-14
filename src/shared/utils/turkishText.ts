/**
 * Türkçe-güvenli metin normalizasyonu, arama ve sıralama yardımcıları.
 *
 * JavaScript'in locale-bağımsız `toLowerCase()`'i Türkçe `İ/I/ı/i`
 * karakterlerini bozar: `"İ".toLowerCase()` → `"i̇"` (U+0069 U+0307
 * combining dot above). Bu, `toLowerCase().includes()` tabanlı aramada
 * Türkçe girdileri eşleşmez kılar.
 *
 * Saf fonksiyonlar — yan etki ve bağımlılık yok.
 *
 * @module shared/utils/turkishText
 */

/** NFD ile katlanmayan Türkçe harfler için açık eşleme. */
const TR_FOLD: Readonly<Record<string, string>> = {
  ı: "i",
  ş: "s",
  ğ: "g",
  ü: "u",
  ö: "o",
  ç: "c",
};

/**
 * Aksan-duyarsız, Türkçe-güvenli arama anahtarı üretir.
 * `"İstanbul"` ve `"istanbul"` → `"istanbul"`; `"Şarj"` → `"sarj"`.
 * Baştaki ve sondaki boşluklar kırpılır.
 */
export function normalizeForSearch(input: string | null | undefined): string {
  if (!input) return "";
  let s = input.toLocaleLowerCase("tr"); // İ→i, I→ı (Türkçe-güvenli)
  s = s.replace(/[ışğüöç]/g, (ch) => TR_FOLD[ch] ?? ch); // açık Türkçe fold
  s = s.normalize("NFD").replace(/[̀-ͯ]/g, ""); // kalan aksanları sil
  return s.trim();
}

/**
 * `text`, `query`'yi (aksan-duyarsız, Türkçe-güvenli) içeriyor mu?
 * Boş sorgu her zaman `true` döner.
 */
export function matchesSearch(
  text: string | null | undefined,
  query: string | null | undefined
): boolean {
  const q = normalizeForSearch(query);
  if (!q) return true;
  return normalizeForSearch(text).includes(q);
}

const trCollator = new Intl.Collator("tr", {
  sensitivity: "base",
  numeric: true,
});

/**
 * Kullanıcı-görünür listeler için Türkçe alfabe + sayısal-duyarlı
 * karşılaştırma. `Array.prototype.sort` ile doğrudan kullanılabilir.
 *
 * `sensitivity: "base"` kullanıldığından aksan/büyük-küçük harf varyantları
 * sıralama açısından eşit sayılır — örneğin `"Şehir"` ile `"şehir"` berabere
 * gelir. Bu karşılaştırıcı görsel liste sıralaması içindir, kesin
 * aksan-farklılaştırmalı sıralama için değil.
 */
export function compareTr(a: string | null | undefined, b: string | null | undefined): number {
  return trCollator.compare(a ?? "", b ?? "");
}
