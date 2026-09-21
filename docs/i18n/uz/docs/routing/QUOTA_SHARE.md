# Quota Sharing Engine (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Hujjat manbasi**: `docs/routing/QUOTA_SHARE.md`
> B guruhining bir qismi (16 + 22 rejalar).

---

## Umumiy ko‘rinish

Kvotani taqsimlash mexanizmi provayderning vaqtga asoslangan kvotasini (masalan, Codex
uchun 5 soatlik oyna, Kimi uchun 1500 req/h) bir xil ulanishdan foydalanadigan bir nechta
API kalitlari o‘rtasida adolatli taqsimlaydi.

**U hal qiladigan muammo:** OmniRoute ko‘plab API kalitlarini bir xil yuqori oqimdagi
provayder hisobiga proksi qiladi. Taqsimlash mantig‘isiz A kalitidan kelgan keskin yuklama
provayderning bir soatlik kvotasini tugatib qo‘yishi mumkin, natijada B va C kalitlari oyna
qayta tiklanguncha bloklanadi. Mexanizm buning oldini quyidagicha oladi:

1. Har bir kalitning har bir o‘lchov bo‘yicha (%, so‘rovlar, tokenlar, $) sirg‘aluvchi sarfini kuzatadi.
2. Ishni tejovchi adolatli ulush algoritmini qo‘llaydi: global havza to‘yinmagan paytda kalit
   ishlatilmayotgan ulushlardan qarz olishi mumkin.
3. So‘rov yuqori oqimdagi ijro mexanizmiga yetib borishidan oldin natijani tezkor yo‘lda
   (`chatCore.ts`) majburiy qo‘llaydi.

---

## Algoritm: Ishni tejovchi adolatli ulush

`src/lib/quota/fairShare.ts` ichida amalga oshirilgan.

### Rejimlar

| Shart                                      | Rejim      | Xatti-harakat                                                                  |
| ------------------------------------------ | ---------- | ------------------------------------------------------------------------------ |
| `globalUsedPercent < saturationThreshold`  | **Saxiy**  | Kalit global limitdan umumiy sarfni ayirgandagi miqdorgacha qarz olishi mumkin |
| `globalUsedPercent >= saturationThreshold` | **Qat’iy** | Individual adolatli ulush qat’iy qo‘llanadi                                    |

Standart qiymat: `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

### Har bir o‘lchov bo‘yicha qaror

Havzadagi har bir faol o‘lchov uchun mexanizm quyidagilarni hisoblaydi:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = ushbu kalitning joriy sirg‘aluvchi qiymati (QuotaStore.peek dan)
remaining       = fairShareAllowed - consumed
```

So‘ng:

- **`policy = hard`**: agar `consumed > fairShareAllowed` va rejim qat’iy bo‘lsa → **bloklash**.
- **`policy = soft`**: agar `consumed > fairShareAllowed` va rejim qat’iy bo‘lsa → **jarima qo‘llash** (kombinatsiyada ustuvorligini pasaytirish; hech qachon qat’iy bloklamaslik).
- **`policy = burst`**: adolatli ulushdan qat’i nazar, global zaxira mavjud ekan, ruxsat berish.

### Mutlaq chegara

Ajratmadagi `capValue` + `capUnit` rejim yoki siyosatdan qat’i nazar amal qiladigan qat’iy
yuqori chegaradir. `consumed >= capValue` bo‘lgan har qanday o‘lchov so‘rovni doimo
**bloklaydi**.

### Ko‘p o‘lchovli tekshiruv

Havzadagi **istalgan** o‘lchov bloklashni talab qilsa, so‘rov bloklanadi. O‘lchovlar
bir-biridan mustaqil — 5h% kvotasining tugashi weekly% o‘lchoviga ta’sir qilmaydi.

### Qarz olish

Saxiy rejimda ajratilgan ulushidan kam foydalangan kalit boshqa kalitlarning ishlatilmagan
ulushlaridagi ortiqcha resursdan foydalanishi mumkin. Formula:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

bu yerda `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Global yuqori chegara
(ushbu o‘lchov uchun havza `limit` qiymati) har doim qat’iy chegara hisoblanadi.

---

## Sirg‘aluvchi oyna hisoblagichi

`src/lib/quota/sqliteQuotaStore.ts` va `redisQuotaStore.ts` ichida amalga oshirilgan.

Har bir `(apiKeyId, dimensionKey)` uchun ikkita segment:

- `curr`: joriy segment (`floor(nowMs / windowMs)`)
- `prev`: oldingi segment (`curr - 1`)

Amaldagi sirg‘aluvchi qiymat:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Aniqlik**: ~99% aniq. Segmentlar orasidagi chegarada xatolik oyna hajmining ko‘pi bilan
1% ini tashkil qiladi (bu 2 segmentli yaqinlashtirishga xos).

### Parallel ishlash

SQLite drayveri: har bir `(apiKeyId | dimensionKey)` kaliti uchun xotiradagi mutex
o‘qish-o‘zgartirish-yozish poyga holatining oldini oladi. Andoza `src/sse/services/auth.ts`
ichidagi haddan tashqari parallel so‘rovlarning oldini olish mexanizmini takrorlaydi.

Redis drayveri: atomar inkrement uchun Lua EVAL skripti — bitta Redis buyrug‘i sifatida bajariladi.

---

## Drayverlar

### SQLite (standart, o‘rnatish talab qilinmaydi)

- Jadval: `quota_consumption` (`073_quota_pools.sql` / `074_quota_consumption.sql` migratsiyasiga qarang).
- Bitta nusxali joylashtirishlar uchun eng maqbul.
- Barcha doimiy ma’lumotlar mavjud OmniRoute SQLite ma’lumotlar bazasida (`DATA_DIR/storage.sqlite`) saqlanadi.

### Redis (ixtiyoriy, ko‘p nusxali)

- `ioredis` npm paketi talab qilinadi.
- Hisoblagichlar Redis’da saqlanadi; metama’lumotlar (pullar/ajratmalar) esa SQLite’da qoladi.
- Hisoblagichlar umumiy bo‘lishi kerak bo‘lgan ko‘p replikali joylashtirishlar uchun eng maqbul.

### Drayverlarni almashtirish

Sozlamalar interfeysi orqali (`/dashboard/settings` → Kvota ombori) yoki muhit o‘zgaruvchilari orqali:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Ma’lumotlar bazasidagi sozlama muhit sozlamasidan ustun turadi. Agar `driver=redis` bo‘lsa-yu, URL mavjud bo‘lmasa yoki
`ioredis` o‘rnatilmagan bo‘lsa, fabrika SQLite’ga qaytadi va ogohlantirishni jurnalga yozadi.

Drayverni tanlash tartibi:

1. Ma’lumotlar bazasi sozlamasi `quotaStore.driver`
2. Muhit o‘zgaruvchisi `QUOTA_STORE_DRIVER`
3. Standart: `sqlite`

---

## Ko‘p o‘lchovlilik

Pul bir nechta o‘lchovga ega bo‘lishi mumkin. Har bir o‘lchov mustaqil:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // ushbu o‘lchov uchun pulning global yuqori chegarasi
}
```

**Misol: Codex tarifi** (5h% + haftalik%):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Ruxsat berilishi uchun so‘rov barcha o‘lchovlar talablariga javob berishi kerak.

---

## Tarif aniqlagichi

`src/lib/quota/planResolver.ts` faylida amalga oshirilgan.

Ustuvorlik tartibi (eng yuqoridan eng pastga):

1. **Ma’lumotlar bazasidagi qo‘lda bekor qilish** — har bir `connectionId` uchun `provider_plans` jadvali.
2. **Ma’lum katalog** — `src/lib/quota/planRegistry.ts` (faqat ma’lumotlar).
3. **Bo‘sh tarif** — o‘lchovlar yo‘q, qo‘lda sozlash talab qilinadi.

### Ma’lum katalog

| Provayder             | O‘lchovlar                                                    |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, noma’lum), `tokens/weekly`              |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Standart qiymat yo‘q — qo‘lda sozlash talab qilinadi          |

---

## Konveyer bilan integratsiya

### PRE xuki (`open-sse/handlers/chatCore.ts`)

Yuqori oqim ijrochisidan oldin, autentifikatsiya va siyosat tekshiruvlaridan keyin ishga tushadi:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → har bir o‘lchov uchun getQuotaStore().peek()
      → fairShare.decideFairShare()
      → agar bloklansa → 429 qaytarish (buildErrorBody, qat’iy qoida #12)
      → agar ruxsat berilsa + ustuvorligi pasaytirilsa → nomzodda quotaSoftPenalty=true o‘rnatish
  → executor.execute()
```

**Xatolikda ruxsat berish**: agar `enforceQuotaShare` istisno chiqarsa, so‘rovga
`pino.warn` jurnal yozuvi bilan ruxsat beriladi. Bu kvota mexanizmidagi xato barcha
trafikni bloklashining oldini oladi.

### POST xuki (sarflanishni qayd etish)

Muvaffaqiyatli javobdan keyin:

```
executor muvaffaqiyatli natija qaytaradi
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → har bir o‘lchov uchun getQuotaStore().consume()
      → xatolikda ruxsat berish: xatolar pino.warn sifatida jurnalga yoziladi, mijozga hech qachon uzatilmaydi
```

**Og‘ish haqida eslatma**: agar javobdan keyin `consume` muvaffaqiyatsiz bo‘lsa, sirg‘aluvchi hisoblagich sarfni kam hisoblaydi.
Provayderdan kelgan to‘yinganlik signali (masalan, `anthropic-ratelimit-unified-5h-utilization`)
keyingi so‘rovda global taxminni tuzatadi.

### Kombinatsiyaning yumshoq jarimasi (`open-sse/services/combo.ts`)

`decision.deprioritize === true` bo‘lganda:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // standart 0.7
}
```

Jarima boshqa barcha baholash omillaridan keyin qo‘llanadi. U to‘yingan kalitni qat’iy
bloklamasdan, avtomatik kombinatsiyaning uni tanlash ehtimolini kamaytiradi.

---

## UI bo‘yicha qo‘llanma

### `/dashboard/costs/quota-share` — Asosiy hovuzlar sahifasi

Komponentlar (barchasi `src/app/(dashboard)/dashboard/costs/quota-share/` ichida):

| Komponent              | Maqsadi                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Yangi foydalanuvchilarga kvotani ulashishni tushuntiruvchi kirish kartasi                           |
| `CreatePoolModal`      | Yangi kvota hovuzini yaratish (ulanish + nom + dastlabki ajratmalar)                                |
| `PoolCard`             | Har bir hovuz bo‘yicha qisqacha ma’lumot: nom, ulanish, ajratmalar soni                             |
| `DimensionBar`         | Har bir o‘lcham uchun segmentlangan panel: har bir kalit ulushi + umumiy foydalanish                |
| `AllocationTable`      | Sarflangan miqdor, adolatli ulush, yetishmovchilik/ortiqcha, qarz olish belgisi ko‘rsatilgan jadval |
| `BurnRateChart`        | EMA sarflanish tezligi chiziqli diagrammasi (`dynamic()` orqali kech yuklanadigan Recharts)         |
| `EditAllocationsModal` | Hovuz uchun ajratma vaznlari, limitlar va siyosatlarni tahrirlash                                   |

Sahifa huklari:

- `usePools` — har 30 soniyada `GET /api/quota/pools` orqali ma’lumotlarni oladi.
- `usePoolUsage` — talab bo‘yicha `GET /api/quota/pools/[id]/usage` orqali ma’lumotlarni oladi.
- `useLocalStoragePoolMigration` — eski LS ma’lumotlarini ko‘chirish uchun komponent o‘rnatilganda bir marta ishga tushadi.

### `/dashboard/costs/quota-share/plans` — Provayder tarifi konfiguratsiyasi

- `ProviderPlanConfigClient.tsx`: provayderni tanlash, aniqlangan tarifni
  (katalogdan avtomatik ravishda yoki qo‘lda qayta belgilangan) ko‘rish va o‘lchamlarni tahrirlash uchun ochiladigan ro‘yxat.
- O‘zgarishlar `PUT /api/quota/plans/[connectionId]` manziliga yoziladi.
- O‘chirish katalogdagi tarifga yoki bo‘sh tarifga qaytaradi.

---

## Muhit o‘zgaruvchilari

| O‘zgaruvchi                        | Standart qiymat | Tavsif                                                                          |
| ---------------------------------- | --------------- | ------------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`        | Foydalaniladigan drayver: `sqlite` yoki `redis`                                 |
| `QUOTA_STORE_REDIS_URL`            | _(bo‘sh)_       | Redis URL manzili, masalan, `redis://localhost:6379`                            |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`           | 0..1; `>= threshold` qat’iy rejimni faollashtiradi                              |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`           | 0..1; yumshoq siyosatning umumiy bali uchun ko‘paytiruvchi                      |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`            | GC eski `quota_consumption` segmentlarini olib tashlashidan oldingi kunlar soni |

MB sozlamalari (`quotaStore.*`) muhit o‘zgaruvchilarini qayta belgilaydi.

---

## Muammolarni bartaraf etish

### Redis sozlangan, ammo ulanmayapti

`ioredis` o‘rnatilganini (`npm ls ioredis`) va `QUOTA_STORE_REDIS_URL`
manzili mavjudligini tekshiring. Ulanish amalga oshmasa, fabrika SQLite’ga
qaytadi (bu `warn` darajasida jurnalga yoziladi).

### `peek` eskirgan ma’lumotni qaytaradi / ochiq ruxsat rejimiga o‘tadi

Agar `peek` istisno chiqarsa, `enforceQuotaShare` natijani "ruxsat berish" sifatida qabul qiladi (ochiq ruxsat rejimi).
Asosiy sababni aniqlash uchun `pino` jurnallaridagi `quota:enforce` va
`quota:factory` yozuvlarini tekshiring.

### Sarf hisoblagichining siljishi

Agar provayderdagi amaldagi foydalanish hisoblagichlardan farq qilsa, bu kutilgan holat —
2 segmentli sirg‘aluvchi oynada oyna chegaralarida ~1% xatolik mavjud va `consume`
javobdan keyin natijani kutmasdan ishga tushiriladi. To‘yinganlik signali (`saturationSignals.ts`)
provayderning haqiqiy foydalanish darajasini 30 soniyalik TTL bilan o‘qiydi va `globalUsedPercent`
qiymatini shunga mos ravishda sozlaydi.

### Hovuz sarflanish tezligi uchun "ma’lumot yo‘q" deb ko‘rsatmoqda

`computeBurnRate` uchun kamida 2 ta tarixiy namuna talab etiladi. Avval
`consume` chaqiruvlari bo‘lmagan yangi hovuzlarda `tokensPerSecond: 0` va `timeToExhaustionMs: null` ko‘rsatiladi.

---

## localStorage’dan migratsiya

`/dashboard/costs/quota-share` ilk bor yuklanganda, `useLocalStoragePoolMigration` xuki quyidagilarni tekshiradi:

1. `localStorage.getItem("omniroute:quota-share:pools")` bo‘sh emas.
2. `GET /api/quota/pools` so‘rovi `[]` qaytaradi (DB bo‘sh).

Agar ikkala shart ham bajarilsa, u har bir eski pulni paketli tarzda `POST /api/quota/pools` manziliga yuboradi, so‘ng localStorage kalitini o‘chiradi. Migratsiya idempotent: 2-shart qayta migratsiya qilinishining oldini oladi.

---

## Ichki strategiya tasnifi

`quota-share` — **faqat ichki foydalanish uchun** mo‘ljallangan marshrutlash strategiyasi (`src/shared/constants/routingStrategies.ts` ichidagi `INTERNAL_ROUTING_STRATEGY_VALUES`). U faqat tizim tomonidan yaratilgan `qtSd/` pul kombinatsiyalarida ishlatiladi va UI yoki API’da hech qachon foydalanuvchi tanlay oladigan variant sifatida ko‘rinmasligi uchun ataylab `ROUTING_STRATEGY_VALUES` tarkibiga kiritilmagan.

---

## Test qamrovi

Quota-share mexanizmi bilan birga avtomatlashtirilgan qamrovning ikki qatlami taqdim etiladi:

| To‘plam                 | Buyruq                                                                 | Nimalarni qamrab oladi                                                                                                                                                                                                                                  |
| :---------------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Modul (29 ta test)      | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR rejalashtiruvchisi, to‘yinganlikni cheklash, parallellik limitlari, fairShare hisobi, navbatga to‘plash                                                                                                                                             |
| Integratsiya matritsasi | `npm run test:combo:matrix`                                            | Haqiqiy kombinatsiya konveyeri orqali boshidan oxirigacha marshrutlash qarori; jonli ulanish nuqtalari (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) orqali DRR adolatliligi va to‘yinganlikda ustuvorlikni pasaytirish |

Integratsiya matritsasi CI’da barcha 19 ta ommaviy strategiya bilan birga ishga tushiriladi. Modul testlari to‘plamini alohida ishga tushirish mumkin.

---

## DB sxemasi haqida qisqacha

`078`, `079` va `085` migratsiyalari orqali uchta jadval qo‘shilgan:

- `quota_pools` + `quota_allocations` — pul ta’riflari va har bir kalit uchun ajratmalar.
- `quota_consumption` — har bir `(apiKeyId, dimensionKey)` uchun sirg‘aluvchi 2-chelakli hisoblagichlar.
- `provider_plans` — provayder rejalarini qo‘lda qayta belgilash (har bir connectionId uchun o‘lchamlar JSON’i).

Barcha jadvallar idempotent `CREATE TABLE IF NOT EXISTS` migratsiyalari orqali qo‘shilgan.
