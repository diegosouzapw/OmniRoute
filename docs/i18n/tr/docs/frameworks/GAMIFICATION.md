# Gamification & Leaderboard System (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Doğruluk kaynağı:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Son güncelleme:** 2026-06-28 — v3.8.40

OmniRoute, kullanıcıları platformla etkileşim kurdukları için ödüllendiren yerel öncelikli bir oyunlaştırma katmanı içerir — istek gönderme, sağlayıcı değiştirme, kombinasyon oluşturma, token paylaşma ve topluluğa katkıda bulunma. Tüm durum SQLite'ta tutulur; topluluk sunucularıyla federasyon isteğe bağlıdır ve gönderim tabanlıdır.

Sistem, **kritik işlem yolunda sıfır gecikme** sağlayacak şekilde tasarlanmıştır — oyunlaştırma olayları istek işlem hattından beklemeden gönderilir ve hiçbir zaman bir LLM yanıtını engellemez.

---

## Genel Bakış

### Amaç

Görünür ilerleme (XP, seviyeler, rozetler), sosyal kanıt (liderlik tabloları) ve ekonomik teşvikler (token paylaşımı, davet ödülleri) sağlayarak kullanıcı etkileşimini ve devamlılığını artırmak.

### Kapsam

| Özellik             | Açıklama                                                                     |
| ------------------- | ---------------------------------------------------------------------------- |
| XP ve Seviyeler     | Her eylem için XP kazanın; polinom eğrisi boyunca seviye atlayın             |
| Rozetler            | 4 nadirlik kademesine sahip 5 kategoride 20'den fazla başarı                 |
| Seriler             | Mevcut/en uzun seriyle günlük etkin kullanım takibi                          |
| Liderlik Tabloları  | Genel, haftalık, aylık, token paylaşımı ve katkı kapsamları                  |
| Token Paylaşımı     | Çift taraflı kayıt defteri aracılığıyla kullanıcılar arasında kredi aktarımı |
| Davet ve Kullanma   | SHA-256 ile karma oluşturularak saklanan yönlendirme kodları                 |
| Topluluk Sunucuları | Harici OmniRoute örnekleriyle federasyon                                     |
| Hile Önleme         | Sunucu taraflı puanlama, hız sınırlama, z-skoru anomali tespiti              |

### Tasarım İlkeleri

1. **Yerel öncelikli** — tüm durum SQLite'ta tutulur; harici hizmet gerekmez.
2. **Engellemesiz** — olaylar beklemeden gönderilir; LLM yanıt yolu oyunlaştırma mantığı nedeniyle hiçbir zaman gecikmez.
3. **Sunucu otoriteli** — XP yalnızca sunucu tarafında hesaplanır; istemciler puanları yapay olarak artıramaz.
4. **Gizliliğe saygılı** — liderlik tablosuna katılım isteğe bağlıdır; kullanıcılar profillerini gizleyebilir.
5. **Federasyona hazır** — topluluk sunucuları imzalı API aracılığıyla puan gönderebilir; eşitleme toplamalı değil, üzerine yazmalıdır.

---

## Mimari

### Üst Düzey Akış

```
İstemci İsteği
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (mevcut işlem hattı) ...
      → yukarı akış yanıtı istemciye gönderilir
      → setImmediate (beklemeden):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Olay yayıcı, tek entegrasyon noktasıdır. `chatCore.ts`, yanıt gönderildikten sonra `emitGamificationEvent()` çağrısını yapar; olay modülü bunu XP, seri, rozet, liderlik tablosu ve hile önleme alt sistemlerine dağıtır.

### Modül Bağımlılık Grafiği

```
src/lib/gamification/
  events.ts          ← giriş noktası (chatCore.ts tarafından çağrılır)
    ├── xp.ts        ← XP hesaplama ve seviye çözümleme
    ├── streaks.ts   ← günlük etkin seri takibi
    ├── badges.ts    ← rozet ölçütlerini değerlendirme
    ├── leaderboard.ts ← sıralama hesaplama ve SSE yayını
    ├── antiCheat.ts ← hız sınırlama ve anomali tespiti
    ├── sharing.ts   ← token aktarım kayıt defteri
    ├── invites.ts   ← davet/kullanma kodu yönetimi
    ├── servers.ts   ← topluluk sunucusu federasyonu
    └── notifications.ts ← SSE bildirim akışı

src/lib/db/
  gamification.ts    ← tüm CRUD işlemleri (8 tablo)

src/app/api/gamification/
  leaderboard/       ← GET sıralamaları, POST manuel yenileme
  leaderboard/stream ← SSE gerçek zamanlı güncellemeler
  transfer/          ← GET geçmişi, POST token gönderimi
  invite/            ← GET/POST kodları, DELETE iptali
  invite/redeem/     ← POST ile kod kullanma
  servers/           ← GET/POST/DELETE topluluk sunucuları
  federation/score/  ← POST ile sunucuya puan gönderme
  federation/leaderboard/ ← GET ile liderlik tablosunu sunucudan alma
  notifications/     ← SSE rozet/seviye atlama bildirimleri
  anomalies/         ← GET anomali raporları (yönetici)
  rotate/            ← POST ile davet token'ı gizli anahtarlarını döndürme
```

---

## Veri Katmanı

### Veritabanı Tabloları

Tüm tablolar, `060_create_gamification.sql` migrasyonu tarafından oluşturulan ana
OmniRoute SQLite veritabanında bulunur. WAL günlükleme, `src/lib/db/core.ts`
içindeki tekil `getDbInstance()` örneğinden devralınır.

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels          │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ api_key_id    TEXT PK    │
│ api_key_id    TEXT      │     │ xp            INTEGER    │
│ scope         TEXT      │     │ level         INTEGER    │
│ score         INTEGER   │     │ title         TEXT       │
│ period        TEXT      │     │ updated_at    TEXT       │
│ updated_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────┐     ┌──────────────────────────┐
│     user_badges         │     │    badge_definitions      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ badge_id      TEXT FK   │     │ category      TEXT       │
│ earned_at     TEXT      │     │ rarity        TEXT       │
│ notified      INTEGER   │     │ criteria_type TEXT       │
└─────────────────────────┘     │ criteria      TEXT(JSON) │
                                │ description   TEXT       │
                                │ icon          TEXT       │
                                │ hidden        INTEGER    │
                                └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│     xp_audit_log        │     │     token_ledger         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ from_key_id   TEXT       │
│ action        TEXT      │     │ to_key_id     TEXT       │
│ xp_awarded    INTEGER   │     │ amount        INTEGER    │
│ metadata      TEXT(JSON)│     │ idempotency_key TEXT UQ  │
│ created_at    TEXT      │     │ created_at    TEXT       │
└─────────────────────────┘     └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│    invite_tokens        │     │   community_servers      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ code          TEXT UQ   │     │ url           TEXT       │
│ token_hash    TEXT      │     │ token_hash    TEXT       │
│ uses          INTEGER   │     │ status        TEXT       │
│ max_uses      INTEGER   │     │ last_sync     TEXT       │
│ created_at    TEXT      │     │ created_at    TEXT       │
│ expires_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
```

### Etki Alanı Modülü: `src/lib/db/gamification.ts`

Standart OmniRoute kalıbını izler — `core.ts` dosyasından `getDbInstance()`
işlevini içe aktarır ve türü belirlenmiş CRUD işlevlerini dışa aktarır. Rota
işleyicilerinde ham SQL bulunmaz.

Temel işlevler:

| İşlev                      | Açıklama                                                        |
| -------------------------- | --------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | (api_key_id, scope, period) için puanı ekle veya güncelle       |
| `getLeaderboard()`         | Belirli bir kapsam/dönem için sayfalandırılmış sıralamalar      |
| `getUserLevel()`           | Kullanıcı seviyesi kaydını getir veya oluştur                   |
| `updateUserLevel()`        | XP, seviye ve unvanı atomik olarak ayarla                       |
| `getBadgeDefinitions()`    | Tüm rozet tanımları (isteğe bağlı olarak filtrelenmiş)          |
| `getUserBadges()`          | Bir kullanıcının kazandığı rozetler                             |
| `awardBadge()`             | Rozet kazanımını ekle (badge_id üzerinde idempotent)            |
| `logXpAction()`            | xp_audit_log tablosuna ekle                                     |
| `getXpAuditLog()`          | Bir kullanıcı için sayfalandırılmış denetim geçmişi             |
| `insertLedgerEntry()`      | Çift taraflı aktarım (işlem içinde)                             |
| `getBalance()`             | Bir kullanıcı için alınanların toplamından gönderilenleri çıkar |
| `getTransferHistory()`     | Sayfalandırılmış aktarım günlüğü                                |
| `createInviteToken()`      | Davet kodunu ve karma değeri alınmış belirteci ekle             |
| `redeemInviteToken()`      | Koda göre ara, doğrula ve kullanım sayısını artır               |
| `upsertCommunityServer()`  | Bir federasyon sunucusunu kaydet veya güncelle                  |
| `getCommunityServers()`    | Bir kullanıcının sunucularını listele                           |
| `deleteCommunityServer()`  | Bir sunucu kaydını kaldır                                       |

---

## XP / Seviye Sistemi

**Dosya:** `src/lib/gamification/xp.ts`

### Seviye Eğrisi

`n` seviyesine ulaşmak için gereken XP, polinomik bir eğriyi izler:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Seviye | Sonraki Seviye İçin XP | Kümülatif XP | Unvan     |
| ------ | ---------------------- | ------------ | --------- |
| 1      | 100                    | 100          | Başlangıç |
| 5      | 1,118                  | 2,415        | Başlangıç |
| 10     | 3,162                  | 10,523       | Kaşif     |
| 25     | 12,500                 | 86,024       | Kaşif     |
| 50     | 35,355                 | 345,529      | Uzman     |
| 75     | 64,952                 | 948,683      | Usta      |
| 100    | 100,000                | 2,050,000    | Efsane    |

### Unvanlar

| Seviye Aralığı | Unvan     |
| -------------- | --------- |
| 1 – 9          | Başlangıç |
| 10 – 24        | Kaşif     |
| 25 – 49        | Uzman     |
| 50 – 74        | Usta      |
| 75 – 100       | Efsane    |

### XP Ödülleri

| Eylem             | XP  | Açıklama                                                       |
| ----------------- | --- | -------------------------------------------------------------- |
| `request`         | 1   | OmniRoute üzerinden yönlendirilen her API isteği için          |
| `provider_switch` | 5   | Farklı bir sağlayıcıya geçiş                                   |
| `model_switch`    | 3   | Farklı bir modele geçiş                                        |
| `combo_create`    | 10  | Yeni bir kombinasyon oluşturma                                 |
| `combo_use`       | 2   | Bir istekte kombinasyon kullanma                               |
| `token_share`     | 1   | Başka bir kullanıcıyla paylaşılan her 1 000 token için         |
| `invite_redeem`   | 50  | Davet kodu kullanma                                            |
| `daily_login`     | 5   | Günlük aktif kullanım (günde bir kez)                          |
| `streak_bonus`    | 2   | Art arda devam edilen her gün için (seri uzunluğuyla çarpılır) |
| `badge_unlock`    | 10  | Rozet açma                                                     |

### Ödüllendirme Akışı

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. XP miktarını almak için `XP_REWARDS[action]` değerine bakın.
2. `checkRateLimit()` üzerinden geçirin (hile önleme: anahtar başına dakikada en fazla 1000 XP).
3. Bir işlem açın:
   - Mevcut `user_levels` satırını okuyun.
   - XP'yi ekleyin; seviyeyi `levelFromXp(totalXp)` aracılığıyla yeniden hesaplayın.
   - Seviye değiştiyse `levelUp = true` olarak ayarlayın.
   - `user_levels` satırını güncelleyin.
   - `xp_audit_log` tablosuna ekleyin.
4. Sonucu döndürün. Bildirimleri çağıran taraf işler.

### Yardımcı: `levelFromXp(totalXp)`

Kümülatif XP `totalXp` değerini aşana kadar 1..100 seviyeleri arasında yineleme yaparak `xp_for_level(n)` değerlerini toplar. Eşiği karşılanan en yüksek seviyeyi döndürür.
Bu işlem O(100) karmaşıklığındadır — seviyeler 100 ile sınırlandığı için kabul edilebilir.

---

## Rozet Sistemi

**Dosya:** `src/lib/gamification/badges.ts`

### Kategoriler

| Kategori       | Açıklama                               | Örnek Rozetler                           |
| -------------- | -------------------------------------- | ---------------------------------------- |
| `usage`        | Hacme dayalı dönüm noktaları           | İlk İstek, 1K İstek, 100K                |
| `sharing`      | Token paylaşımı ve yönlendirmeler      | İlk Paylaşım, Cömert (10 paylaşım)       |
| `contribution` | Topluluk katılımı                      | Kombinasyon Oluşturucu, Sağlayıcı Kaşifi |
| `streak`       | Zaman içindeki tutarlılık              | Hafta Savaşçısı, Aya Sadık               |
| `rare`         | Elde edilmesi zor veya gizli başarılar | Erken Benimseyen, Hata Bildiricisi       |

### Nadirlikler

| Nadirlik    | Renk  | Olasılık İpucu              |
| ----------- | ----- | --------------------------- |
| `common`    | Gri   | Kullanıcıların çoğu         |
| `uncommon`  | Yeşil | Aktif kullanıcılar          |
| `rare`      | Mavi  | Kendini adamış kullanıcılar |
| `legendary` | Altın | İlk %1                      |

### Kriter Türleri

| Tür            | Alan         | Açıklama                                         |
| -------------- | ------------ | ------------------------------------------------ |
| `action_count` | `count`      | Eylemi N kez gerçekleştirin (ör. 1000 istek)     |
| `streak`       | `days`       | Seriyi art arda N gün boyunca sürdürün           |
| `unique_count` | `field`, `n` | N benzersiz değer kullanın (ör. 10 farklı model) |
| `rank`         | `scope`, `n` | Bir liderlik tablosu kapsamında N. sıraya ulaşın |
| `first`        | —            | Bir eylemi gerçekleştiren ilk kişi olun          |
| `hidden`       | (değişir)    | Kazanılana kadar gösterilmeyen kriterler         |

Rozet tanımları, `badge_definitions` içinde JSON `criteria` olarak saklanır:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Değerlendirme Akışı

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # tüm tanımlar
    → getUserBadges(apiKeyId)         # önceden kazanılanlar (atla)
    → kazanılmamış her rozet için:
       → matchesCriteria(badge, event, userState)
       → eşleşirse: awardBadge(apiKeyId, badgeId)
         → bildirim yükünü döndür
```

Değerlendirme **olay güdümlüdür** — her oyunlaştırma olayından sonra çalışır, ancak yalnızca `criteria.type` değeri olay eylemiyle uyumlu olan rozetleri kontrol eder. Bu, değerlendirmeyi hızlı tutar (çoğu olay için < 5ms).

### `matchesCriteria(badge, event, userState)`

| Kriter Türü    | Kontrol                                               |
| -------------- | ----------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`           |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                  |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                |
| `rank`         | `getRank(apiKeyId, scope) <= n`                       |
| `first`        | Bu eylem türü için önceden `xp_audit_log` girdisi yok |
| `hidden`       | Uygun alt kontrole devreder                           |

### Yerleşik Rozetler (20+)

<details>
<summary>Tam rozet listesi</summary>

| Rozet                   | Kategori | Nadirlik      | Kriterler                     |
| ----------------------- | -------- | ------------- | ----------------------------- |
| İlk Adımlar             | kullanım | yaygın        | 1 istek                       |
| Isınmaya Başlama        | kullanım | yaygın        | 100 istek                     |
| Uzman Kullanıcı         | kullanım | nadir olmayan | 1.000 istek                   |
| Yüzbaşı                 | kullanım | nadir         | 10.000 istek                  |
| OmniPower               | kullanım | efsanevi      | 100.000 istek                 |
| Sağlayıcı Gezgini       | katkı    | yaygın        | 5 farklı sağlayıcı kullanma   |
| Sağlayıcı Ustası        | katkı    | nadir olmayan | 20 farklı sağlayıcı kullanma  |
| Kombinasyon Mimarı      | katkı    | nadir olmayan | 5 kombinasyon oluşturma       |
| Kombinasyon Büyükustası | katkı    | nadir         | 25 kombinasyon oluşturma      |
| İlk Paylaşım            | paylaşım | yaygın        | 1 token aktarımı              |
| Cömert                  | paylaşım | nadir olmayan | 10 token aktarımı             |
| Hayırsever              | paylaşım | nadir         | Toplam 10.000 token aktarma   |
| Yönlendiren             | paylaşım | yaygın        | 1 başarılı yönlendirme        |
| Ağ Kurucusu             | paylaşım | nadir olmayan | 10 başarılı yönlendirme       |
| Hafta Savaşçısı         | seri     | nadir olmayan | 7 günlük seri                 |
| Aylık Müdavim           | seri     | nadir         | 30 günlük seri                |
| Durdurulamaz            | seri     | efsanevi      | 365 günlük seri               |
| Erken Benimseyen        | özel     | efsanevi      | Beta döneminde katılma        |
| Sıkıştırma Öncüsü       | özel     | nadir olmayan | Sıkıştırmayı 100 kez kullanma |
| Beceri Koleksiyoncusu   | özel     | nadir         | 10 farklı beceri kullanma     |
| Model Gezgini           | katkı    | nadir olmayan | 15 farklı model kullanma      |

</details>

---

## Seri Takibi

**Dosya:** `src/lib/gamification/streaks.ts`

### Veri Modeli

Seriler, ad alanına sahip anahtarlar altında `key_value` tablosunda (paylaşılan yardımcı tablo) saklanır:

| Anahtar                       | Değer                            | Açıklama            |
| ----------------------------- | -------------------------------- | ------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Etkin seri verileri |

### Mantık

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Seri kaydını `key_value` tablosundan oku.
2. `{current}`, `{longest}`, `{lastDate}` (ISO tarih dizesi) değerlerini ayrıştır.
3. `lastDate === today` ise değişiklik yapma (bugün zaten sayıldı).
4. `lastDate === yesterday` ise `current` değerini artır; gerekirse `longest` değerini güncelle.
5. `lastDate < yesterday` ise `current = 1` olarak sıfırla (seri bozuldu).
6. Güncellenen kaydı yaz.
7. Kilometre taşlarını kontrol et: 7, 14, 30, 60, 90, 180, 365 gün. Bir kilometre taşı geçildiyse
   `milestone = true` olarak ayarla (çağıran taraf XP verir ve rozetleri kontrol eder).

### Uç Durumlar

- **Saat dilimi**: seriler UTC tarihlerini kullanır (`new Date().toISOString().slice(0, 10)`).
  Bu bilinçli bir tercihtir — tek bir standart saat dilimi, saat dilimleri arasında
  geçiş yaparak sistemi suistimal etmeyi önler.
- **Yeni kullanıcılar**: seri kaydı mevcut değildir; ilk istek kaydı
  `current=1, longest=1, lastDate=today` değerleriyle oluşturur.
- **Günlük birden fazla istek**: seriyi yalnızca UTC gününün ilk isteği
  artırır.

---

## Liderlik Tablosu

**Dosya:** `src/lib/gamification/leaderboard.ts`

### Kapsamlar

| Kapsam          | Dönem   | Açıklama                                                              |
| --------------- | ------- | --------------------------------------------------------------------- |
| `global`        | `all`   | Tüm zamanların kümülatif XP'si                                        |
| `weekly`        | `week`  | Geçerli UTC haftasında kazanılan XP (Pzt-Paz)                         |
| `monthly`       | `month` | Geçerli UTC ayında kazanılan XP                                       |
| `tokens_shared` | `all`   | Başkalarına aktarılan toplam token sayısı                             |
| `contributions` | `all`   | Oluşturulan kombolar + kullanılan sağlayıcılar + kullanılan beceriler |

### Sıralama Hesaplaması

Sıralamalar saklanmaz, **okuma sırasında hesaplanır**. Bu yaklaşım, güncelliğini yitirmiş sıralama verilerini önler
ve düzenli sıralama yeniden hesaplama işlerine duyulan ihtiyacı ortadan kaldırır.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Sorgu kalıbı:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Dönem Değişimi

Haftalık ve aylık liderlik tabloları otomatik olarak yenilenir:

1. **Arşivleme**: dönem sınırında mevcut girdileri dönem etiketiyle
   `leaderboard_archive` tablosuna kopyala.
2. **Sıfırlama**: süresi dolan döneme ait girdileri sil.
3. **Tetikleme**: her `updateLeaderboard()` çağrısında kontrol edilir; yeni dönemin ilk isteği
   yenilemeyi tetikler.

Bu, haftalık tabloların her pazartesi UTC 00:00'da, aylık tabloların ise
her ayın 1. gününde sıfırlanmasını sağlar.

### SSE Gerçek Zamanlı Güncellemeleri

**Uç nokta:** `GET /api/gamification/stream`

```
İstemci → GET /api/gamification/stream
  → SSE bağlantısı kurulur
  → Sunucu, ilk 10 liderlik tablosu anlık görüntüsünü hemen gönderir
  → Her 5 saniyede bir: değişmişse güncellenen ilk 10'u gönder
  → Her 15 saniyede bir: canlılık sinyali yorumu (": heartbeat\n\n")
  → İstemcinin bağlantısı kesilir → temizlik (dinleyiciyi kaldır)
```

Olay biçimi:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE yöneticisi, bağlı istemcileri kapsam bazında izler ve yalnızca
liderlik tablosu verileri son gönderimden bu yana gerçekten değiştiğinde güncelleme gönderir.

---

## Token Paylaşımı

**Dosya:** `src/lib/gamification/sharing.ts`

### Çift Taraflı Kayıt Sistemi

Her transfer, `token_ledger` tablosunda iki satır oluşturur:

| Satır  | `from_key_id` | `to_key_id` | `amount` |
| ------ | ------------- | ----------- | -------- |
| Borç   | gönderen      | alıcı       | +tutar   |
| Alacak | alıcı         | gönderen    | -tutar   |

Bekleyin — kullanılan kural şöyledir:

| Satır    | `from_key_id` | `to_key_id` | `amount` | Anlam                   |
| -------- | ------------- | ----------- | -------- | ----------------------- |
| Gönderim | gönderen      | alıcı       | +tutar   | Gönderenden para çıkışı |
| Alım     | alıcı         | gönderen    | +tutar   | Alıcıya para girişi     |

Bakiye şu şekilde hesaplanır:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Transfer Akışı

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Doğrulama**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Tekrarlanabilirlik**: `idempotency_key` değerinin defterde zaten mevcut olup olmadığını kontrol edin.
   Mevcutsa önbelleğe alınmış sonucu döndürün.
3. **İşlem** (tek bir SQLite işlemi):
   a. Gönderenin bakiyesini hesaplayın.
   b. `balance < amount` ise işlemi iptal edin (yetersiz bakiye).
   c. Gönderim satırını ekleyin (`from=gönderen,` döndürün.

### Hız Sınırlama

- API anahtarı başına dakikada en fazla 10 transfer.
- Tek bir transferde en fazla 10.000 token.
- API anahtarı başına günde en fazla 100.000 token transferi.

---

## Davet ve Token Kullanma

**Dosya:** `src/lib/gamification/invites.ts`

### Kod Biçimi

- **Kod**: Kullanıcıya gösterilen, insanlar tarafından okunabilen 8 karakterli alfasayısal kod (ör. `A3K9-X7M2`).
- **Token**: SHA-256 karması olarak saklanan 32 baytlık rastgele token. Programatik kullanım için kullanılır (ör. URL bağlantıları).

### Depolama

| Sütun        | Değer                                |
| ------------ | ------------------------------------ |
| `code`       | `A3K9X7M2` (benzersiz, indekslenmiş) |
| `token_hash` | SHA-256(raw_token)                   |

Ham token, oluşturulma sırasında kullanıcıya yalnızca bir kez döndürülür. OmniRoute
bunu bir daha asla saklamaz veya göstermez — yalnızca karma değeri kalıcı olarak tutulur.

### Kendi Kendine Referans Vermeyi Önleme

Bir kullanıcı bir kodu kullandığında sistem şunları kontrol eder:

1. Kodun farklı bir `api_key_id` değerine ait olması.
2. Kodu kullanan kullanıcının daha önce aynı referans veren kişiden herhangi bir
   kod kullanmamış olması (`invite_tokens` + kullanım günlüğü üzerinden birleştirme yapılır).

Kontrollerden biri başarısız olursa kullanım işlemi açık bir hata mesajıyla reddedilir.

### Süre Sonu ve Sınırlar

- Varsayılan `max_uses`: 10 (oluşturma sırasında yapılandırılabilir).
- Varsayılan `expires_at`: oluşturulma tarihinden itibaren 30 gün.
- Süresi dolmuş veya kullanım hakkı tükenmiş kodlar HTTP 410 Gone döndürür.

---

## Topluluk Sunucusu Federasyonu

**Dosya:** `src/lib/gamification/servers.ts`

### Bağlanma

Bir topluluk sunucusu, uzak sunucu tarafından verilen bir davet belirteci aracılığıyla kaydedilir. Yerel örnek:

1. Davet belirtecini alır (ör. kontrol paneline yapıştırılır).
2. Belirteci doğrulamak ve güncel liderlik tablosunu almak için uzak sunucuda `POST /api/gamification/federation/leaderboard` çağrısı yapar.
3. Sunucu kaydını `status: connected` ile saklar.

### Eşitleme Modeli

Federasyon, eklemeli eşitleme yerine **üzerine yazmalı eşitleme** kullanır:

```
Yerel Örnek                   Topluluk Sunucusu
     │                              │
     ├── puanı gönder ─────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (sunucu belirteç karmasını doğrular)
     │                              │
     ├── liderlik tablosunu çek ───►│  GET /federation/leaderboard
     │◄── ilk N kayıt ──────────────┤  (yerel önbelleğin üzerine yazar)
     │                              │
     └── sağlık kontrolü ──────────►│  GET /federation/health
         (her 60 sn, zaman aşımı 5 sn) │
```

### Kimlik Doğrulama

Federasyon istekleri şunları içerir:

```
Authorization: Bearer <ham_belirteç>
X-Federation-Version: 1
```

Uzak sunucu, belirtecin karmasını oluşturur ve eşleşen `community_servers` satırını arar. Bu, saklanan karmanın aktarılmasını önler.

### Sağlık İzleme

Her sunucu kaydı şunları takip eder:

| Alan        | Açıklama                                   |
| ----------- | ------------------------------------------ |
| `status`    | `connected`, `degraded`, `unreachable`     |
| `last_sync` | Son başarılı eşitlemenin ISO zaman damgası |
| `failures`  | Art arda başarısız olan sağlık kontrolleri |

Art arda 5 başarısızlıktan sonra durum `unreachable` olarak değişir ve manuel bir sağlık kontrolü başarılı olana kadar eşitleme duraklatılır.

---

## Hile Önleme

**Dosya:** `src/lib/gamification/antiCheat.ts`

### Sunucu Taraflı Puanlama

Tüm XP hesaplamaları `src/lib/gamification/xp.ts` içinde gerçekleştirilir. İstemciler hiçbir zaman puan göndermez; eylemleri gönderir ve sunucu XP'yi hesaplar. `leaderboard.score` sütununa yalnızca sunucu taraflı kod tarafından yazılabilir.

### Hız Sınırlaması

| Sınır                          | Değer   | Kapsam              |
| ------------------------------ | ------- | ------------------- |
| Dakika başına maksimum XP      | 1,000   | API anahtarı başına |
| Dakika başına maksimum aktarım | 10      | API anahtarı başına |
| Maksimum aktarım miktarı       | 10,000  | Aktarım başına      |
| Maksimum günlük aktarım        | 100,000 | API anahtarı başına |

Hız sınırları, bellek içi bir kayan pencere kullanır (`open-sse/services/` içindeki `RateLimitManager` ile aynı kalıp). İşlem yeniden başlatılırsa SQLite destekli sayaçlara geri dönülür.

### Z-Skoru Anomali Algılama

Sistem, her API anahtarı için saat başına kazanılan XP'nin 7 günlük kayan penceresini tutar. Her XP ödülünde:

1. Kullanıcının mevcut saatlik XP oranını hesaplar.
2. Popülasyon ortalamasını ve standart sapmasını hesaplar.
3. `z = (user_rate - mean) / stddev` değerini hesaplar.
4. `z > 3.0` ise (3 standart sapma), bunu anomali olarak işaretler.

Anomaliler, `action = 'anomaly_detected'` ile `xp_audit_log` tablosuna kaydedilir ve yönetici kontrol panelinde gösterilir.

### Denetim İzi

Her XP ödülü, aktarım, rozet kazanımı ve anomali algılaması şu bilgilerle `xp_audit_log` tablosuna kaydedilir:

| Alan         | Açıklama                                   |
| ------------ | ------------------------------------------ |
| `api_key_id` | Kim                                        |
| `action`     | Ne oldu (xp_award, transfer, anomaly, …)   |
| `xp_awarded` | Miktar (XP dışı olaylar için 0)            |
| `metadata`   | Bağlamı içeren JSON (eylem türü, hedef, …) |
| `created_at` | Ne zaman (ISO 8601)                        |

Yöneticiler, `GET /api/gamification/anomalies` aracılığıyla denetim izinin tamamını sorgulayabilir.

---

## API Rotaları

Tüm rotalar standart OmniRoute düzenini izler:

```
Rota → CORS ön kontrolü → Gövde doğrulaması (Zod) → Kimlik doğrulama (extractApiKey)
  → İşleyici
```

### Uç Noktalar

| Yöntem | Yol                                        | Açıklama                                               | Kimlik Doğrulama |
| ------ | ------------------------------------------ | ------------------------------------------------------ | ---------------- |
| GET    | `/api/gamification/leaderboard`            | Liderlik tablosunu getir (kapsam, dönem, sayfalama)    | İsteğe bağlı     |
| POST   | `/api/gamification/leaderboard`            | Liderlik tablosu önbelleğini zorla yenile              | Gerekli          |
| GET    | `/api/gamification/stream`                 | SSE ile gerçek zamanlı liderlik tablosu güncellemeleri | İsteğe bağlı     |
| GET    | `/api/gamification/transfer`               | Transfer geçmişini getir (sayfalama)                   | Gerekli          |
| POST   | `/api/gamification/transfer`               | Başka bir kullanıcıya token gönder                     | Gerekli          |
| GET    | `/api/gamification/invite`                 | Davet kodlarımı listele                                | Gerekli          |
| POST   | `/api/gamification/invite`                 | Yeni bir davet kodu oluştur                            | Gerekli          |
| DELETE | `/api/gamification/invite`                 | Bir davet kodunu iptal et                              | Gerekli          |
| POST   | `/api/gamification/invite/redeem`          | Bir davet kodunu kullan                                | Gerekli          |
| GET    | `/api/gamification/servers`                | Topluluk sunucularını listele                          | Gerekli          |
| POST   | `/api/gamification/servers`                | Bir topluluk sunucusuna bağlan                         | Gerekli          |
| DELETE | `/api/gamification/servers`                | Bir topluluk sunucusuyla bağlantıyı kes                | Gerekli          |
| POST   | `/api/gamification/federation/score`       | Puanı uzak sunucuya gönder                             | Federasyon       |
| GET    | `/api/gamification/federation/leaderboard` | Liderlik tablosunu uzak sunucudan al                   | Federasyon       |
| GET    | `/api/gamification/notifications`          | SSE rozet/seviye atlama bildirimleri                   | Gerekli          |
| GET    | `/api/gamification/anomalies`              | Anomali raporlarını görüntüle (yönetici)               | Yönetici         |
| POST   | `/api/gamification/rotate`                 | Davet token'ı gizli anahtarlarını döndür               | Gerekli          |

### İstek/Yanıt Örnekleri

**POST /api/gamification/transfer**

```json
// İstek
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Yanıt 200
{
  "success": true,
  "transfer": {
    "id": "txn-uuid",
    "from": "sender-api-key-id",
    "to": "recipient-api-key-id",
    "amount": 500,
    "createdAt": "2026-05-19T12:00:00.000Z"
  },
  "balance": 2500
}

// Yanıt 400 (yetersiz bakiye)
{
  "error": "Yetersiz bakiye",
  "balance": 200,
  "requested": 500
}
```

**GET /api/gamification/leaderboard?scope=weekly&limit=10**

```json
{
  "scope": "weekly",
  "period": "2026-W20",
  "entries": [
    {
      "rank": 1,
      "apiKeyId": "key-uuid",
      "displayName": "User***1234",
      "score": 15230,
      "level": 42,
      "title": "Uzman"
    }
  ],
  "total": 847,
  "updatedAt": "2026-05-19T12:00:00.000Z"
}
```

---

## MCP Araçları (8)

Mevcut araçlarla birlikte `open-sse/mcp-server/` altında kayıtlıdır.
`gamification` izin kapsamıyla sınırlandırılmıştır.

| Araç                       | Açıklama                                             | Girdi Şeması                 |           |
| -------------------------- | ---------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Bir kapsam/dönem için liderlik tablosunu getirir     | `{ scope, period?, limit? }` |
| `gamification_rank`        | Çağrıyı yapanın sıralamasını ve komşularını getirir  | `{ scope }`                  |
| `gamification_profile`     | XP, seviye, unvan ve seri özetini getirir            | `{}`                         |
| `gamification_badges`      | Kazanılan rozetleri veya tüm tanımları listeler      | `{ earned?: boolean }`       |
| `gamification_transfer`    | Başka bir kullanıcıya jeton gönderir                 | `{ to, amount }`             |
| `gamification_invite`      | Davet kodları oluşturur veya listeler                | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Topluluk sunucularını listeler veya bunlara bağlanır | `{ action, token? }`         |
| `gamification_anomalies`   | Anomali raporlarını görüntüler (yönetici kapsamı)    | `{ limit?, since? }`         |

---

## Kontrol Paneli Sayfaları

### `/dashboard/leaderboard`

- Podyum görünümü (avatarları ve XP değerleriyle ilk 3).
- Kapsam seçici: Genel / Haftalık / Aylık / Paylaşılan Jetonlar / Katkılar.
- Sıra, ad, puan, seviye ve unvan bilgilerini içeren sayfalandırılmış tablo (sayfa başına 25).
- SSE gerçek zamanlı güncellemeleri — sıralama değişiklikleri animasyonla gösterilir.
- Mevcut kullanıcı, "Sıralamanız" sabit satırıyla tabloda vurgulanır.

### `/dashboard/profile`

- Mevcut seviye ve bir sonraki seviye eşiğini gösteren XP ilerleme çubuğu.
- Unvan rozeti belirgin biçimde gösterilir.
- Rozet galerisi — kazanılan rozetler kazanılma tarihleriyle gösterilir, kazanılmayan rozetler gri gösterilir
  (gizli rozetler kazanılana kadar "???" gösterir).
- Alev simgeli seri sayacı; seri takvimi (son 30 gün).
- XP geçmişi grafiği (son 30 gündeki günlük XP).

### `/dashboard/tokens`

- Jeton bakiyesi (belirgin biçimde, sayfanın üst kısmında).
- Transfer formu: alıcı, miktar, onay iletişim kutusu.
- Filtreleri (gönderilen/alınan/tümü) içeren transfer geçmişi tablosu.
- Davet bölümü: etkin kodlar, yeni kod oluşturma, paylaşım bağlantısı.
- Topluluk sunucuları: sağlık durumlarıyla birlikte listeleme, bağlanma/bağlantıyı kesme.

### `/dashboard/gamification/admin`

- Önem derecesi, kullanıcı, zaman damgası ve z-skorunu içeren anomali listesi.
- Filtreleri (eylem türü, kullanıcı, tarih aralığı) içeren denetim günlüğü görüntüleyicisi.
- Sistem istatistikleri: verilen toplam XP, etkin kullanıcılar, rozet kazanma oranları.
- Federasyon sunucularının sağlık durumuna genel bakış.

---

## İşlem Hattı Entegrasyonu

### Entegrasyon Noktası

Oyunlaştırma, istek işlem hattına `open-sse/handlers/chatCore.ts` içindeki tek bir noktadan
bağlanır:

```typescript
// Yanıt istemciye gönderildikten sonra:
setImmediate(() => {
  emitGamificationEvent({
    type: "request.completed",
    apiKeyId,
    metadata: {
      provider: selectedProvider,
      model: selectedModel,
      comboId: resolvedCombo?.id,
      compressionUsed: compressionStats?.applied,
      skillUsed: skillExecution?.name,
    },
  }).catch(() => {
    // Gönder ve unut: günlüğe kaydet ancak asla istemciye yansıtma
  });
});
```

### Olay Türleri

| Olay Türü           | Ne Zaman Yayınlanır                                        |
| ------------------- | ---------------------------------------------------------- |
| `request.completed` | Başarılı LLM yanıtı gönderildiğinde                        |
| `provider.switch`   | Sağlayıcı değiştirildiğinde (combo geri dönüşleri sayılır) |
| `combo.created`     | Yeni combo yapılandırması kaydedildiğinde                  |
| `combo.used`        | Combo hedefi başarıyla kullanıldığında                     |
| `badge.earned`      | Rozet değerlendirmesi bir eşleşme bulduğunda               |
| `streak.milestone`  | Seri eşiği aşıldığında                                     |
| `transfer.sent`     | Jeton transferi tamamlandığında                            |
| `referral.redeemed` | Davet kodu başarıyla kullanıldığında                       |
| `compression.used`  | İstem sıkıştırması uygulandığında                          |
| `skill.executed`    | Beceri yürütme işlemi tamamlandığında                      |
| `model.first_use`   | Model son 7 gün içinde kullanılmamış olduğunda             |

### Engellememe Garantisi

`setImmediate` + `.catch(() => {})` kalıbı şunları sağlar:

1. Oyunlaştırma çalışmadan önce yanıt tamamen gönderilir.
2. Oyunlaştırma hataları hiçbir zaman istemciye yansımaz.
3. Olay işleme, satır içinde değil bir sonraki mikro görevde çalışır.

---

## Güvenlik

### Tehdit Modeli

| Tehdit                                  | Önlem                                                                                  |
| --------------------------------------- | -------------------------------------------------------------------------------------- |
| Puan şişirme                            | XP yalnızca sunucu tarafında hesaplanır; istemciler puan değil, eylem gönderir         |
| Yeniden oynatma saldırıları             | Transferlerde idempotency anahtarları; denetim günlüğünde yinelenen kayıtları kaldırma |
| Transfer dolandırıcılığı                | Çift taraflı kayıt sistemi; atomik işlemler; hız sınırları                             |
| Kendi kendine yönlendirme               | Kullanım sırasında `api_key_id` çapraz kontrolü                                        |
| Liderlik tablosu manipülasyonu          | Z-skoru anomali tespiti; yönetici anomali panosu                                       |
| Federasyon token'ı hırsızlığı           | SHA-256 ile özetlenmiş depolama; ham token yalnızca bir kez gösterilir                 |
| Davet kodlarına kaba kuvvet saldırıları | Kullanım uç noktasında hız sınırlaması; 8 karakterlik entropi                          |
| Görünen adlarda XSS                     | Görünen adlar temizlenir; liderlik tablosu girdileri kaçışlanır                        |
| Özetlerde zamanlama saldırıları         | Token özeti karşılaştırması için `crypto.timingSafeEqual`                              |

### Kimlik Doğrulama Gereksinimleri

- **Herkese açık** (kimlik doğrulama yok): `GET /leaderboard`, `GET /stream` (salt okunur
  liderlik tabloları).
- **API anahtarı gerekli**: tüm yazma işlemleri, profil, transferler, davetler.
- **Yalnızca yönetici**: anomali panosu, denetim günlüğü görüntüleyicisi.
- **Federasyon**: `Authorization` üst bilgisinde ham token kullanan ve depolanan
  SHA-256 özetiyle doğrulanan ayrı kimlik doğrulama yolu.

---

## Test

### Test Dosyaları

Tüm testler, yerel Node.js test çalıştırıcısını (`node --import tsx/esm --test`) kullanır.

| Test Dosyası                                  | Kapsam                                                    | Testler |
| --------------------------------------------- | --------------------------------------------------------- | ------- |
| `tests/unit/gamification/xp.test.ts`          | XP hesaplama, seviye eğrisi, unvanlar                     | 8       |
| `tests/unit/gamification/badges.test.ts`      | Rozet ölçütü eşleştirme, verme                            | 10      |
| `tests/unit/gamification/streaks.test.ts`     | Seri mantığı, dönüm noktaları, uç durumlar                | 7       |
| `tests/unit/gamification/leaderboard.test.ts` | Sıralama hesaplama, sayfalama, rotasyon                   | 8       |
| `tests/unit/gamification/sharing.test.ts`     | Transferler, bakiye, idempotency                          | 9       |
| `tests/unit/gamification/invites.test.ts`     | Oluşturma, kullanma, süre sonu, kendi kendine yönlendirme | 7       |
| `tests/unit/gamification/antiCheat.test.ts`   | Hız sınırları, z-skoru, denetim günlükleme                | 6       |
| `tests/unit/gamification/events.test.ts`      | Olay yayımı, fan-out, hata işleme                         | 5       |

### Testleri Çalıştırma

```bash
# Tüm oyunlaştırma testleri
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Tek test dosyası
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Kapsam Gereksinimleri

`CONTRIBUTING.md` uyarınca tüm yeni modüller şunlara sahip olmalıdır:

- Dal kapsamı >= %80.
- Her genel kullanıma açık fonksiyon en az bir kez test edilmelidir.
- Hata yolları test edilmelidir (yetersiz bakiye, süresi dolmuş kodlar, hız sınırları).

---

## Dosya Yapısı

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # 8 tablonun tamamı + indeksler
      gamification.ts                  # Etki alanı CRUD modülü
    gamification/
      xp.ts                           # XP hesaplama, seviye eğrisi, unvanlar
      badges.ts                       # Rozet tanımları, kriterler, değerlendirme
      streaks.ts                      # Günlük seri takibi
      leaderboard.ts                  # Sıralama hesaplama, SSE, rotasyon
      antiCheat.ts                    # Hız sınırlama, z-skoru, denetim
      sharing.ts                      # Token aktarım defteri
      invites.ts                      # Davet/kullanım kodları
      servers.ts                      # Topluluk sunucusu federasyonu
      events.ts                       # Olay yayıcı (entegrasyon noktası)
      notifications.ts                # SSE bildirim akışı
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST liderlik tablosu
        leaderboard/stream/route.ts   # SSE gerçek zamanlı güncellemeler
        transfer/route.ts             # GET/POST aktarımlar
        invite/route.ts               # GET/POST/DELETE davet kodları
        invite/redeem/route.ts        # POST kod kullanımı
        servers/route.ts              # GET/POST/DELETE sunucular
        federation/score/route.ts     # POST skor gönderme
        federation/leaderboard/route.ts # GET liderlik tablosunu alma
        notifications/route.ts        # SSE bildirimleri
        anomalies/route.ts            # GET anomali raporları
        rotate/route.ts               # POST gizli anahtarları döndürme
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Sıralamalar sayfası
        profile/page.tsx               # XP/rozetler/seriler sayfası
        tokens/page.tsx                # Bakiye/aktarımlar/davetler sayfası
        gamification/admin/page.tsx    # Yönetici anomali izleme
  shared/
    constants/
      gamification.ts                  # XP_REWARDS, TITLES, BADGE_DEFS, LIMITS

tests/
  unit/
    gamification/
      xp.test.ts
      badges.test.ts
      streaks.test.ts
      leaderboard.test.ts
      sharing.test.ts
      invites.test.ts
      antiCheat.test.ts
      events.test.ts

docs/
  frameworks/
    GAMIFICATION.md                    # Bu belge
```

---

## Geçiş Stratejisi

### Aşama 1: Arka Uç Çekirdeği (PR 1)

- `060_create_gamification.sql` geçişi (8 tablo).
- `src/lib/db/gamification.ts` (etki alanı modülü).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- `chatCore.ts` içindeki entegrasyon noktası.
- XP, seriler ve olaylar için birim testleri.

### Aşama 2: Rozetler ve Liderlik Tablosu (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Sabitlerdeki rozet tanımları.
- Liderlik tablosu API rotaları + SSE akışı.
- Rozetler ve liderlik tablosu için birim testleri.

### Aşama 3: Paylaşım ve Davetler (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Aktarım + davet API rotaları.
- Paylaşım, davetler ve hile önleme için birim testleri.

### Aşama 4: Federasyon ve Kontrol Paneli (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Federasyon API rotaları.
- Kontrol paneli sayfaları (liderlik tablosu, profil, tokenlar, yönetim).
- MCP araçlarının kaydı.

---

## Gelecekteki Değerlendirmeler

- **Sezonluk etkinlikler**: süreli rozet setleri ve liderlik tablosu sezonları.
- **Takım liderlik tabloları**: kullanıcıları kuruluşa veya kombinasyona göre gruplandırma.
- **XP çarpanları**: promosyon dönemlerinde XP'yi artırma.
- **Başarım paylaşımı**: paylaşılabilir rozet kartları (OpenGraph görselleri) oluşturma.
- **Mobil anlık bildirimler**: rozet/seviye etkinlikleri için webhook tabanlı bildirimler.
- **Liderlik tablosu API'si**: üçüncü taraf entegrasyonları için herkese açık API.
