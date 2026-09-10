# Context Relay (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../features/context-relay.md) · 🇸🇦 [ar](../../../ar/docs/features/context-relay.md) · 🇦🇿 [az](../../../az/docs/features/context-relay.md) · 🇧🇬 [bg](../../../bg/docs/features/context-relay.md) · 🇧🇩 [bn](../../../bn/docs/features/context-relay.md) · 🇨🇿 [cs](../../../cs/docs/features/context-relay.md) · 🇩🇰 [da](../../../da/docs/features/context-relay.md) · 🇩🇪 [de](../../../de/docs/features/context-relay.md) · 🇪🇸 [es](../../../es/docs/features/context-relay.md) · 🇮🇷 [fa](../../../fa/docs/features/context-relay.md) · 🇫🇮 [fi](../../../fi/docs/features/context-relay.md) · 🇫🇷 [fr](../../../fr/docs/features/context-relay.md) · 🇮🇳 [gu](../../../gu/docs/features/context-relay.md) · 🇮🇱 [he](../../../he/docs/features/context-relay.md) · 🇮🇳 [hi](../../../hi/docs/features/context-relay.md) · 🇭🇺 [hu](../../../hu/docs/features/context-relay.md) · 🇮🇩 [id](../../../id/docs/features/context-relay.md) · 🇮🇹 [it](../../../it/docs/features/context-relay.md) · 🇯🇵 [ja](../../../ja/docs/features/context-relay.md) · 🇰🇷 [ko](../../../ko/docs/features/context-relay.md) · 🇮🇳 [mr](../../../mr/docs/features/context-relay.md) · 🇲🇾 [ms](../../../ms/docs/features/context-relay.md) · 🇳🇱 [nl](../../../nl/docs/features/context-relay.md) · 🇳🇴 [no](../../../no/docs/features/context-relay.md) · 🇵🇭 [phi](../../../phi/docs/features/context-relay.md) · 🇵🇱 [pl](../../../pl/docs/features/context-relay.md) · 🇵🇹 [pt](../../../pt/docs/features/context-relay.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/features/context-relay.md) · 🇷🇴 [ro](../../../ro/docs/features/context-relay.md) · 🇷🇺 [ru](../../../ru/docs/features/context-relay.md) · 🇸🇰 [sk](../../../sk/docs/features/context-relay.md) · 🇸🇪 [sv](../../../sv/docs/features/context-relay.md) · 🇰🇪 [sw](../../../sw/docs/features/context-relay.md) · 🇮🇳 [ta](../../../ta/docs/features/context-relay.md) · 🇮🇳 [te](../../../te/docs/features/context-relay.md) · 🇹🇭 [th](../../../th/docs/features/context-relay.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/features/context-relay.md) · 🇵🇰 [ur](../../../ur/docs/features/context-relay.md) · 🇻🇳 [vi](../../../vi/docs/features/context-relay.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/features/context-relay.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/features/context-relay.md)

---

`context-relay`, konuşma tamamlanmadan önce aktif hesap değiştiğinde (rotasyon) oturum sürekliliğini koruyan bir kombo stratejisidir.

Mevcut çalışma zamanı model seçimi için öncelikli (priority) yönlendirme gibi davranır, ardından üzerine bir devir (handoff) katmanı ekler:

- Aktif hesap tükenmeden önce OmniRoute kompakt ve yapılandırılmış bir özet üretir
- Kimlik doğrulama aynı oturum için farklı bir hesap seçtikten sonra, OmniRoute bu özeti sonraki isteğe bir sistem mesajı olarak enjekte eder
- Devir başarıyla tüketildiğinde depodan silinir

## Ne Zaman Kullanılmalı

Aşağıdakilerin tümü doğru olduğunda `context-relay` kullanın:

- Kombonun aynı sağlayıcının birden çok hesabı arasında geçiş yapması bekleniyorsa
- Kısa vadeli konuşma sürekliliğini kaybetmek görev kalitesine zarar verecekse
- Sağlayıcı yaklaşan bir hesap sınırını tahmin etmek için yeterli kota bilgisi sunuyorsa

Bu özellik, tek bir hesap penceresinden daha uzun sürebilecek uzun kodlama veya araştırma oturumları için son derece kullanışlıdır.

## Çalışma Zamanı Akışı

Mevcut davranış kasıtlı olarak iki çalışma zamanı katmanına ayrılmıştır.

### %0 ila %84 Kota Kullanımı

Hiçbir devir özeti üretilmez. İstekler normal öncelik yönlendirmesi gibi davranır.

### %85 ila %94 Kota Kullanımı

Aktif sağlayıcı `handoffProviders` içinde etkinleştirilmişse, OmniRoute hesap tamamen tükenmeden önce arka planda yapılandırılmış bir devir özeti üretir.

Önemli detaylar:

- Varsayılan uyarı eşiği `0.85`'tir
- Üretim için kesin durma noktası `0.95`'tir
- `sessionId + comboName` başına yalnızca bir devam eden devir üretimine izin verilir
- Bu oturum/kombo için zaten etkin bir devir varsa, mükerrer özet üretilmez

### %95 veya Daha Fazla Kota Kullanımı

Yeni bir devir üretilmez. Bu noktada sistem zaten tükenme sınırındadır veya tükenmiştir; çalışma zamanı başka bir özet isteği zamanlamaktan kaçınır.

### Hesap Rotasyonundan Sonra

Aynı oturum için bir sonraki istek farklı bir kimliği doğrulanmış hesaba çözümlendiğinde, OmniRoute saklanan devir özetini bir sistem mesajı olarak başa ekler. Enjeksiyon yalnızca gerçek hesap değişikliği bilindikten sonra gerçekleşir.

## Devir Yükü (Handoff Payload)

Kalıcı devir yükü `context_handoffs` tablosunda saklanır ve şunları içerir:

- `sessionId`
- `comboName`
- `fromAccount`
- `summary`
- `keyDecisions`
- `taskProgress`
- `activeEntities`
- `messageCount`
- `model`
- `warningThresholdPct`
- `generatedAt`
- `expiresAt`

Özet modeline şu yapıda bir JSON nesnesi döndürmesi talimatı verilir:

```json
{
  "summary": "Süreklilik için önemli olan konuların yoğun özeti",
  "keyDecisions": ["Karar 1", "Karar 2"],
  "taskProgress": "Ne yapıldı, ne bekliyor ve bir sonraki adım",
  "activeEntities": ["dosyaA.ts", "özellik X", "sağlayıcı Y"]
}
```

Enjeksiyon anında OmniRoute bu yükü bir `<context_handoff>` sistem mesajına dönüştürür; böylece sonraki hesap doğru yerel bağlamla devam edebilir.

## Yapılandırma

`context-relay` şu yapılandırma alanlarını destekler:

- `handoffThreshold`: Özet üretimi için uyarı eşiği, varsayılan `0.85`
- `handoffModel`: Yalnızca özet üretimi için kullanılan isteğe bağlı model geçersiz kılma
- `handoffProviders`: Devir üretimini tetiklemesine izin verilen sağlayıcıların izin listesi

Genel varsayılanlar Ayarlar sayfasında yapılandırılabilir ve kombo bazlı değerler bunları Kombolar sayfasında geçersiz kılabilir.

## Mimari Not

Mevcut uygulama bağımsız bir `handleContextRelayCombo` işleyicisi kullanmaz.

Bunun yerine:

- `open-sse/services/combo.ts` başarılı bir turun devir üretip üretmeyeceğine karar verir
- `src/sse/handlers/chat.ts` devir özetini yalnızca kimlik doğrulama istek için kullanılan gerçek hesabı belirledikten sonra enjekte eder

## Sınırlamalar

- Etkili çalışma zamanı desteği şu anda `codex` kota rotasyonu üzerinde yoğunlaşmıştır.
- `handoffProviders` bir yapılandırma yüzeyi olarak modellenmiştir ancak gerçek devir üretimi hala sağlayıcıya özel kota altyapısına bağlıdır.
- Özet kasıtlı olarak kompakt ve yakın geçmişe dayalıdır; tam bir konuşma geçmişi tekrar oynatma mekanizması değildir.
- Devirler `sessionId + comboName` ile kapsama alınır ve otomatik olarak sona erer.
- Oturum hesap değiştirmezse, saklanan devir enjekte edilmez.

## Önerilen Kullanım Modeli

- Aynı sağlayıcıdan birden fazla hesap kullanın
- Oturum boyunca kararlı `sessionId` değerleri koruyun
- Arka plan özet isteğine yer bırakmak için `handoffThreshold` değerini yeterince erken bir seviyeye ayarlayın
- Bu özelliği kalıcı belleğin yerine geçen bir mekanizma olarak değil, bir süreklilik desteği olarak değerlendirin
