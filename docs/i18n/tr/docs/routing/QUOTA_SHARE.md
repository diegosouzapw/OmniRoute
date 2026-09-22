# Quota Sharing Engine (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Belge referansı**: `docs/routing/QUOTA_SHARE.md`
> Grup B'nin bir parçasıdır (planlar 16 + 22).

---

## Genel Bakış

Kota Paylaşım Motoru, bir sağlayıcının zamana dayalı kotasını (ör. Codex
5 saatlik pencere, Kimi 1500 istek/saat), aynı bağlantıyı paylaşan birden fazla
API anahtarı arasında adil şekilde dağıtır.

**Çözdüğü sorun:** OmniRoute, birçok API anahtarını aynı üst sağlayıcı hesabı
üzerinden yönlendirir. Paylaşım mantığı olmadan A anahtarından gelen yoğun bir
istek akışı, sağlayıcının saatlik kotasını tüketebilir ve pencere sıfırlanana
kadar B ve C anahtarlarının engellenmesine neden olabilir. Motor bunu şu şekilde önler:

1. Her anahtarın boyut başına kayan tüketimini (%, istekler, token'lar, $) izler.
2. İş-korumalı adil paylaşım algoritması uygular: genel havuz doygun olmadığı
   sürece bir anahtar, kullanılmayan paylardan ödünç alabilir.
3. İstek üst yürütücüye ulaşmadan önce sonucu kritik yolda (`chatCore.ts`) uygular.

---

## Algoritma: İş-Korumalı Adil Paylaşım

`src/lib/quota/fairShare.ts` içinde uygulanmıştır.

### Modlar

| Koşul                                      | Mod        | Davranış                                                      |
| ------------------------------------------ | ---------- | ------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Cömert** | Anahtar, genel limit eksi toplam tüketim kadar ödünç alabilir |
| `globalUsedPercent >= saturationThreshold` | **Katı**   | Bireysel adil paylaşım sınırını kesin olarak uygular          |

Varsayılan `saturationThreshold = 0.5` (`QUOTA_SATURATION_THRESHOLD` ortam değişkeni).

### Boyut başına karar

Havuzdaki her etkin boyut için motor şunları hesaplar:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = bu anahtarın mevcut kayan değeri (QuotaStore.peek üzerinden)
remaining       = fairShareAllowed - consumed
```

Ardından:

- **`policy = hard`**: `consumed > fairShareAllowed` ve mod katıysa → **engelle**.
- **`policy = soft`**: `consumed > fairShareAllowed` ve mod katıysa → **cezalandır** (kombinasyonda önceliğini düşür; hiçbir zaman kesin olarak engelleme).
- **`policy = burst`**: adil paydan bağımsız olarak genel kapasite mevcut olduğu sürece izin ver.

### Mutlak sınır

Bir tahsis üzerindeki `capValue` + `capUnit`, moddan veya ilkeden bağımsız bir
kesin üst sınırdır. `consumed >= capValue` olan herhangi bir boyut, isteği her
zaman **engeller**.

### Çok boyutlu kontrol

Havuzdaki **herhangi bir** boyut isteği engelleyecekse istek engellenir. Boyutlar
birbirinden bağımsızdır — 5h% kotasının tükenmesi weekly% boyutunu etkilemez.

### Ödünç alma

Cömert modda, tahsisini tamamen tüketmemiş bir anahtar, diğer anahtarların
kullanılmamış paylarındaki fazlalığı kullanabilir. Formül şöyledir:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

Burada `consumedByOtherKeys = consumedTotal - consumedByThisKey` şeklindedir.
Genel tavan (ilgili boyut için havuz `limit` değeri) her zaman kesin üst sınırdır.

---

## Kayan Pencere Sayacı

`src/lib/quota/sqliteQuotaStore.ts` ve `redisQuotaStore.ts` içinde uygulanmıştır.

Her `(apiKeyId, dimensionKey)` için iki bölüm:

- `curr`: geçerli bölüm (`floor(nowMs / windowMs)`)
- `prev`: önceki bölüm (`curr - 1`)

Etkin kayan değer:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Hassasiyet**: Yaklaşık %99 doğruluk. Hata, bölümler arasındaki sınırda pencere
boyutunun en fazla %1'i kadardır (2 bölümlü yaklaşımın doğasında vardır).

### Eşzamanlılık

SQLite sürücüsü: `(apiKeyId | dimensionKey)` anahtarı başına bellek içi mutex,
oku-değiştir-yaz yarış durumunu önler. Kalıp, `src/sse/services/auth.ts` içindeki
istek-yığılması karşıtı yaklaşımı yansıtır.

Redis sürücüsü: Atomik artırma için Lua EVAL betiği — tek bir Redis komutu olarak çalışır.

---

## Sürücüler

### SQLite (varsayılan, kurulum gerektirmez)

- Tablo: `quota_consumption` (`073_quota_pools.sql` / `074_quota_consumption.sql` migrasyonlarına bakın).
- Tek örnekli dağıtımlar için en uygunudur.
- Tüm kalıcı veriler mevcut OmniRoute SQLite veritabanında bulunur (`DATA_DIR/storage.sqlite`).

### Redis (isteğe bağlı, çok örnekli)

- `ioredis` npm paketini gerektirir.
- Sayaçlar Redis'te saklanır; meta veriler (havuzlar/tahsisler) ise SQLite'ta kalır.
- Sayaçların paylaşılması gereken çok replikalı dağıtımlar için en uygunudur.

### Sürücüler arasında geçiş

Ayarlar kullanıcı arayüzü (`/dashboard/settings` → Kota Deposu) veya ortam değişkenleri aracılığıyla:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Veritabanı ayarı, ortam değişkenine göre önceliklidir. `driver=redis` olduğu hâlde URL yoksa veya
`ioredis` kurulu değilse fabrika SQLite'a geri döner ve bir uyarı günlüğe kaydeder.

Sürücü seçim sırası:

1. Veritabanı ayarı `quotaStore.driver`
2. Ortam değişkeni `QUOTA_STORE_DRIVER`
3. Varsayılan: `sqlite`

---

## Çoklu Boyut

Bir havuzun birden fazla boyutu olabilir. Her boyut bağımsızdır:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // bu boyut için genel havuz üst sınırı
}
```

**Örnek: Codex planı** (5h% + haftalık%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Bir isteğe izin verilmesi için isteğin tüm boyutları karşılaması gerekir.

---

## Plan Çözümleyici

`src/lib/quota/planResolver.ts` içinde uygulanmıştır.

Öncelik sırası (en yüksekten en düşüğe):

1. **Manuel veritabanı geçersiz kılma ayarı** — `connectionId` başına `provider_plans` tablosu.
2. **Bilinen katalog** — `src/lib/quota/planRegistry.ts` (yalnızca veri).
3. **Boş plan** — boyut yoktur, manuel yapılandırma gereklidir.

### Bilinen katalog

| Sağlayıcı             | Boyutlar                                                      |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, bilinmiyor), `tokens/weekly`            |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Varsayılan yok — manuel yapılandırma gerekli                  |

---

## İşlem Hattı Entegrasyonu

### PRE kancası (`open-sse/handlers/chatCore.ts`)

Kimlik doğrulama ve politika kontrollerinden sonra, yukarı akış yürütücüsünden önce çalışır:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → boyut başına getQuotaStore().peek()
      → fairShare.decideFairShare()
      → engellenecekse → 429 döndür (buildErrorBody, Kesin Kural #12)
      → izin verilecekse + öncelik düşürülecekse → adayda quotaSoftPenalty=true olarak ayarla
  → executor.execute()
```

**Hata durumunda açık**: `enforceQuotaShare` hata fırlatırsa istek,
bir `pino.warn` günlük kaydıyla geçirilir. Bu, kota motorundaki bir hatanın tüm
trafiği engellemesini önler.

### POST kancası (tüketimi kaydetme)

Başarılı bir yanıttan sonra:

```
yürütücü başarı döndürür
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → boyut başına getQuotaStore().consume()
      → hata durumunda açık: hatalar pino.warn olarak günlüğe kaydedilir, istemciye asla iletilmez
```

**Sapma notu**: `consume`, yanıt sonrasında başarısız olursa kayan sayaç tüketimi
eksik sayar. Sağlayıcıdan gelen doygunluk sinyali (ör. `anthropic-ratelimit-unified-5h-utilization`),
bir sonraki istekte genel tahmini düzeltir.

### Kombinasyon hafif cezası (`open-sse/services/combo.ts`)

`decision.deprioritize === true` olduğunda:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // varsayılan 0.7
}
```

Ceza, diğer tüm puanlama faktörlerinden sonra uygulanır. Doygun bir anahtarın
otomatik kombinasyon tarafından seçilme olasılığını, anahtarı kesin olarak engellemeden düşürür.

---

## Kullanıcı Arayüzü Rehberi

### `/dashboard/costs/quota-share` — Ana havuzlar sayfası

Bileşenler (tümü `src/app/(dashboard)/dashboard/costs/quota-share/` içinde):

| Bileşen                | Amaç                                                                 |
| ---------------------- | -------------------------------------------------------------------- |
| `QuotaConceptCard`     | Yeni kullanıcılara kota paylaşımını açıklayan tanıtım kartı          |
| `CreatePoolModal`      | Yeni bir kota havuzu oluşturur (bağlantı + ad + ilk tahsisler)       |
| `PoolCard`             | Havuz başına özet: ad, bağlantı, tahsis sayısı                       |
| `DimensionBar`         | Boyut başına yığılmış çubuk: her anahtarın payı + genel kullanım     |
| `AllocationTable`      | Tüketim, adil pay, açık/fazla ve ödünç alma bayrağını içeren tablo   |
| `BurnRateChart`        | EMA tüketim hızı çizgi grafiği (`dynamic()` ile tembel Recharts)     |
| `EditAllocationsModal` | Bir havuzun tahsis ağırlıklarını, sınırlarını ve ilkelerini düzenler |

Sayfa hook'ları:

- `usePools` — her 30 saniyede bir `GET /api/quota/pools` isteği gönderir.
- `usePoolUsage` — isteğe bağlı olarak `GET /api/quota/pools/[id]/usage` isteği gönderir.
- `useLocalStoragePoolMigration` — eski LS verilerini taşımak için bağlama sırasında bir kez çalışır.

### `/dashboard/costs/quota-share/plans` — Sağlayıcı planı yapılandırması

- `ProviderPlanConfigClient.tsx`: sağlayıcı seçmek, çözümlenen planı
  (katalogdan otomatik veya elle geçersiz kılınmış) görüntülemek ve boyutları düzenlemek için açılır menü.
- Değişiklikler `PUT /api/quota/plans/[connectionId]` adresine yazılır.
- Silme işlemi, katalogdaki plana veya boş plana geri döndürür.

---

## Ortam Değişkenleri

| Değişken                           | Varsayılan | Açıklama                                                 |
| ---------------------------------- | ---------- | -------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`   | Kullanılacak sürücü: `sqlite` veya `redis`               |
| `QUOTA_STORE_REDIS_URL`            | _(boş)_    | Redis URL'si, ör. `redis://localhost:6379`               |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`      | 0..1; `>= threshold` katı modu etkinleştirir             |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`      | 0..1; esnek ilke birleşik puanı için çarpan              |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`       | GC'nin eski `quota_consumption` bölümlerini silme süresi |

Veritabanı ayarları (`quotaStore.*`), ortam değişkenlerini geçersiz kılar.

---

## Sorun Giderme

### Redis yapılandırılmış ancak bağlanmıyor

`ioredis` paketinin yüklü olduğunu (`npm ls ioredis`) ve `QUOTA_STORE_REDIS_URL`
adresine erişilebildiğini doğrulayın. Bağlantı başarısız olduğunda fabrika SQLite'a
geri döner (`warn` düzeyinde günlüğe kaydedilir).

### `peek`, eski veri döndürüyor / hata durumunda erişime izin veriyor

`peek` hata verirse `enforceQuotaShare`, sonucu "izin ver" olarak değerlendirir
(hata durumunda erişime izin verme). Kök nedeni belirlemek için `pino` günlüklerindeki
`quota:enforce` ve `quota:factory` girdilerini kontrol edin.

### Tüketim sayacı sapması

Gerçek sağlayıcı kullanımı sayaçlardan farklıysa bu beklenen bir durumdur —
2 bölümlü kayan pencerenin pencere sınırlarında yaklaşık %1 hata payı vardır ve
`consume`, yanıt sonrasında beklemeden çalıştırılır. Doygunluk sinyali
(`saturationSignals.ts`), gerçek sağlayıcı kullanımını 30 saniyelik TTL ile okur ve
`globalUsedPercent` değerini buna göre ayarlar.

### Havuz, tüketim hızı için "veri yok" gösteriyor

`computeBurnRate` en az 2 geçmiş örnek gerektirir. Önceden `consume` çağrısı
bulunmayan yeni havuzlar `tokensPerSecond: 0` ve `timeToExhaustionMs: null`
gösterir.

---

## localStorage'dan Geçiş

`/dashboard/costs/quota-share` ilk kez yüklendiğinde, `useLocalStoragePoolMigration` hook'u
şunları kontrol eder:

1. `localStorage.getItem("omniroute:quota-share:pools")` boş değildir.
2. `GET /api/quota/pools`, `[]` döndürür (DB boştur).

Her ikisi de doğruysa, eski havuzların her birini toplu olarak `POST /api/quota/pools`
adresine gönderir ve ardından localStorage anahtarını kaldırır. Geçiş idempotenttir: 2. koşul yeniden geçiş yapılmasını önler.

---

## Dahili Strateji Sınıflandırması

`quota-share`, **yalnızca dahili** bir yönlendirme stratejisidir
(`src/shared/constants/routingStrategies.ts` içindeki `INTERNAL_ROUTING_STRATEGY_VALUES`).
Yalnızca sistem tarafından oluşturulan `qtSd/` havuz kombinasyonları tarafından kullanılır
ve kullanıcı tarafından seçilebilir bir seçenek olarak UI veya API'de hiçbir zaman
görünmemesi için kasıtlı olarak `ROUTING_STRATEGY_VALUES` kapsamı dışında tutulur.

---

## Test Kapsamı

Quota-share motoruyla birlikte iki otomatik test kapsamı katmanı sunulur:

| Test Paketi         | Komut                                                                  | Kapsadığı alanlar                                                                                                                                                                                                                    |
| :------------------ | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Birim (29 test)     | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR zamanlayıcısı, doygunluk geçitlemesi, eşzamanlılık sınırları, fairShare hesaplamaları, birikmiş işlerin kuyruğa alınması                                                                                                         |
| Entegrasyon matrisi | `npm run test:combo:matrix`                                            | Gerçek kombinasyon işlem hattı üzerinden uçtan uca yönlendirme kararı; canlı bağlantı noktaları (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) aracılığıyla DRR adaleti + doygunlukta öncelik düşürme |

Entegrasyon matrisi, 19 herkese açık stratejinin tamamıyla birlikte CI'da çalışır. Birim
test paketi bağımsız olarak çalıştırılabilir.

---

## DB Şeması Özeti

`078`, `079` ve `085` geçişleri tarafından eklenen üç tablo:

- `quota_pools` + `quota_allocations` — havuz tanımları ve anahtar başına tahsisler.
- `quota_consumption` — `(apiKeyId, dimensionKey)` başına kayan 2 bölmeli sayaçlar.
- `provider_plans` — manuel sağlayıcı planı geçersiz kılmaları (connectionId başına dimensions JSON'u).

Tüm tablolar, idempotent `CREATE TABLE IF NOT EXISTS` geçişleri aracılığıyla eklenir.
