---
title: "Test Kapsam Planı"
version: 3.8.50
lastUpdated: 2026-08-23
---

# Test Kapsam Planı (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../../ar/docs/ops/COVERAGE_PLAN.md) · 🇦🇿 [az](../../../az/docs/ops/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../../bg/docs/ops/COVERAGE_PLAN.md) · 🇧🇩 [bn](../../../bn/docs/ops/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../../cs/docs/ops/COVERAGE_PLAN.md) · 🇩🇰 [da](../../../da/docs/ops/COVERAGE_PLAN.md) · 🇩🇪 [de](../../../de/docs/ops/COVERAGE_PLAN.md) · 🇪🇸 [es](../../../es/docs/ops/COVERAGE_PLAN.md) · 🇮🇷 [fa](../../../fa/docs/ops/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../../fi/docs/ops/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../../fr/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [gu](../../../gu/docs/ops/COVERAGE_PLAN.md) · 🇮🇱 [he](../../../he/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../../hi/docs/ops/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../../hu/docs/ops/COVERAGE_PLAN.md) · 🇮🇩 [id](../../../id/docs/ops/COVERAGE_PLAN.md) · 🇮🇹 [it](../../../it/docs/ops/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../../ja/docs/ops/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../../ko/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [mr](../../../mr/docs/ops/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../../ms/docs/ops/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../../nl/docs/ops/COVERAGE_PLAN.md) · 🇳🇴 [no](../../../no/docs/ops/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../../phi/docs/ops/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../../pl/docs/ops/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../../pt/docs/ops/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../../ro/docs/ops/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../../ru/docs/ops/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../../sk/docs/ops/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../../sv/docs/ops/COVERAGE_PLAN.md) · 🇰🇪 [sw](../../../sw/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ta](../../../ta/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [te](../../../te/docs/ops/COVERAGE_PLAN.md) · 🇹🇭 [th](../../../th/docs/ops/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/COVERAGE_PLAN.md) · 🇵🇰 [ur](../../../ur/docs/ops/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../../vi/docs/ops/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/COVERAGE_PLAN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/COVERAGE_PLAN.md)

---

## Taban Çizgisi

| Metrik               | Kapsam                                               | İfadeler / Satırlar | Dallar | Fonksiyonlar | Notlar                                             |
| -------------------- | ---------------------------------------------------- | ------------------: | -----: | -----------: | -------------------------------------------------- |
| Önerilen taban çizgi | Yalnızca kaynak kod, testler hariç, `open-sse` dahil |              82.58% | 75.22% |       84.23% | İyileştirilecek proje genelindeki taban çizgisidir |

## Kurallar

- Kapsam hedefleri `tests/**` için değil, kaynak dosyalar için geçerlidir.
- `open-sse/**` ürünün bir parçasıdır ve kapsamda kalmalıdır.
- Yeni kod, dokunulan alanlardaki kapsamı düşürmemelidir.
- Uygulama ayrıntıları yerine davranış ve dal sonuçlarını test etmeyi tercih edin.
- `src/lib/db/**` için geniş mock'lar yerine geçici SQLite veritabanlarını ve küçük fikstürleri tercih edin.

## Aşamalar

| Aşama   |                Hedef | Odak Alanı                                     | Durum         |
| ------- | -------------------: | ---------------------------------------------- | ------------- |
| Aşama 1 | %60 ifadeler / satır | Hızlı kazanımlar ve düşük riskli yardımcılar   | ✅ Tamamlandı |
| Aşama 2 | %65 ifadeler / satır | Veritabanı ve rota temelleri                   | ✅ Tamamlandı |
| Aşama 3 | %70 ifadeler / satır | Sağlayıcı doğrulaması ve kullanım analitiği    | ✅ Tamamlandı |
| Aşama 4 | %75 ifadeler / satır | `open-sse` çevirmenleri ve yardımcıları        | ✅ Tamamlandı |
| Aşama 5 | %80 ifadeler / satır | `open-sse` işleyicileri ve yürütücü dalları    | ✅ Tamamlandı |
| Aşama 6 | %85 ifadeler / satır | Uç durumlar, dal borcu, regresyon paketleri    | Devam ediyor  |
| Aşama 7 | %90 ifadeler / satır | Son tarama, boşluk kapatma, sıkı kalite kapısı | Bekliyor      |
