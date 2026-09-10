---
title: "OmniRoute Auto-Combo Motoru"
version: 3.8.50
lastUpdated: 2026-08-23
---

# OmniRoute Auto-Combo Motoru (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> Uyarlanabilir puanlama + sıfır yapılandırmalı otomatik yönlendirme ile kendi kendini yöneten model zincirleri

## Sıfır Yapılandırmalı Otomatik Yönlendirme (`auto/` Öneki)

> **YENİ:** Kombo oluşturma gerektirmez. Herhangi bir istemcide doğrudan `auto/` önekini kullanın.

### Hızlı Örnekler

| Model ID       | Varyant    | Davranış                                                            |
| -------------- | ---------- | ------------------------------------------------------------------- |
| `auto`         | varsayılan | Tüm bağlı sağlayıcılar, LKGP stratejisi, dengeli ağırlıklar         |
| `auto/coding`  | coding     | Kalite öncelikli ağırlıklar, kod üretimi için optimize              |
| `auto/fast`    | fast       | Düşük gecikmeli ağırlıklı seçim                                     |
| `auto/cheap`   | cheap      | Maliyet optimizasyonlu yönlendirme (en ucuz olan önce)              |
| `auto/offline` | offline    | En yüksek kota kullanılabilirliğine sahip sağlayıcıları tercih eder |
| `auto/smart`   | smart      | Kalite öncelikli + daha iyi model keşfi için %10 keşif oranı        |
| `auto/lkgp`    | lkgp       | Açık LKGP (varsayılan `auto` ile aynı)                              |

### Kategori × Katman Birleşimi (`auto/<category>:<tier>`)

OpenRouter tarzı sonekler, **ne tür bir rota** (kategori) ile **nasıl optimize edileceğini** (katman) ayırır:

- **Kategoriler** (aday havuzunu yeteneğe göre filtreler): `coding` · `reasoning` · `vision` · `chat` · `multimodal`.
- **Katmanlar** (puanlama ağırlıklarını seçer): `fast` · `cheap` · `reliable` · `free` / `pro`.

| Örnek                  | Çözümlendiği Rota                                       |
| ---------------------- | ------------------------------------------------------- |
| `auto/coding:fast`     | kodlama havuzu, düşük gecikmeli ağırlıklar              |
| `auto/coding:cheap`    | kodlama havuzu, maliyet optimizasyonlu                  |
| `auto/reasoning:pro`   | yalnızca akıl yürütme/düşünme modelleri, premium katman |
| `auto/vision`          | vision yetenekli modeller (dengeli ağırlıklar)          |
| `auto/multimodal:free` | çok modlu modeller, yalnızca ücretsiz katman            |

---

## 14 Faktörlü Auto-Combo Puanlama Matrisi

Auto-Combo motoru, her istek için aday sağlayıcıları **14 bağımsız faktör** üzerinden canlı olarak puanlar:

1. **Sağlık Durumu (Health):** Devre kesici durumu (KAPALI = 1.0, AÇIK = 0.0).
2. **Kalan Kota Oranı (Quota Remaining):** Mevcut kota penceresinde kalan yüzde.
3. **Kota Hacmi (Quota Headroom):** Kalan mutlak token veya istek miktarı.
4. **Maliyet Etkinliği (Cost):** Giriş/çıkış token başına katalog fiyatı ($).
5. **Gecikme (Latency):** p50/p95 geçmiş yanıt süresi (ms).
6. **Başarı Oranı (Success Rate):** Son 100 çağrıdaki 2xx HTTP yanıt oranı.
7. **Tazelik (Freshness):** Sağlayıcının son başarılı kullanımından bu yana geçen süre.
8. **LKGP Uyumu (Stickiness):** Son başarılı sağlayıcıya sadakat puanı.
9. **Hata Oranı Eğilimi (Error Rate Trend):** Son 5 dakikadaki 429/5xx hata sıklığı.
10. **Kota Sıfırlanma Yakınlığı (Reset Proximity):** Kota sıfırlanmasına kalan süre.
11. **Önbellek Uyumu (Cache Affinity):** İstem önbelleğini (prompt cache) tutan bağlantıya öncelik verme.
12. **Model Yetenek Uyumu (Capability Match):** Vision, araç çağırma, JSON şema desteği.
13. **Bandit Keşif Payı (Exploration Boost):** Daha iyi modelleri keşfetmek için rastgele deneme ağırlığı.
14. **Yük Dengeleme (Load Distribution):** P2C (power of two choices) ile eşzamanlı istek dağılımı.
