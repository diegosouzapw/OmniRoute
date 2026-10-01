# Guardrails (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Haqiqatning asosiy manbasi:** `src/lib/guardrails/`
> **Soʻnggi yangilanish:** 2026-08-29 — v3.8.51 (Video Bridge transkriptining kelib chiqishi chaqiruvchi tomonidan eʼlon qilinadi,
> server tomonidan hali tasdiqlanmaydi — #11661 ga muvofiq aniqlashtirildi)

Guardrail’lar OmniRoute va yuqori oqim provayderlari oʻrtasidagi chegarada xavfsizlik, siyosat va kontent oʻzgartirishlarini taʼminlaydi. Har bir guardrail soʻrov yuklamalarini (`preCall`) va yuqori oqim javoblarini (`postCall`) tekshirishi (hamda ixtiyoriy ravishda rad etishi, oʻzgartirishi yoki izoh bilan belgilashi) mumkin.

Tizim **xatoda ochiq qoladi**: agar guardrail bajarilish vaqtida istisno chiqarsa, registr xatoni qayd etadi va soʻrovni muvaffaqiyatsiz yakunlash oʻrniga keyingi guardrail bilan davom etadi. Bloklash tasodif emas, balki aniq qarordir (`block: true`).

## Oʻrnatilgan himoya vositalari

Registr import qilinganda ustuvorlik tartibida oltita himoya vositasini avtomatik ravishda yuklaydi (qarang: `registry.ts` → `registerDefaultGuardrails()`):

| Ustuvorlik | Nomi                | Bosqich(lar)   | Fayl                  |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Ustuvorlik raqami past boʻlganlar **birinchi** ishga tushadi.

### Vision Bridge (`visionBridge.ts`) — Modallik koʻprigi PR-1

Tasvirni oʻz ichiga olgan, **koʻrish qobiliyatiga ega boʻlmagan modellarga** yoʻnaltirilgan soʻrovlarni ushlab qoladi va butun soʻrovni koʻrish qobiliyatiga ega modelga yoʻnaltiradi yoki yuqori oqim chaqiruvidan oldin tasvir qismlarini sozlanishi mumkin boʻlgan koʻrish modeli tomonidan yaratilgan matn tavsiflari bilan almashtiradi. Bu faqat matnli provayderlarga multimodal yuklamalarni shaffof tarzda boshqarish imkonini beradi.

Oqim:

1.  Agar maqsad model allaqachon koʻrish qobiliyatini qoʻllab-quvvatlasa (agar u `isVisionBridgeForcedModel` majburiy koʻprik roʻyxatida boʻlmasa), oʻtkazib yuboring.
2.  `extractImageParts(messages)` (`visionBridgeHelpers.ts`) orqali tasvir qismlarini ajratib oling, bu esa `open-sse/utils/mediaParts.ts` dagi **yagona media detektori** `detectMediaParts()` ga topshiriladi — bu combo moslik filtri bilan boʻlishiladigan yagona haqiqat manbai. Ajratish `replaceImageParts` qayta birlashtira oladigan shakllarning yuqori darajadagi qismlariga (ajratish↔almashtirish shartnomasi) ruxsat berilgan: OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"` va Responses API `input_image`. Ichki topilmalar va faqat indikator shakllar combo-filtr materiali hisoblanadi va hech qachon ajratilmaydi. Agar hech narsa topilmasa, oʻtkazib yuboring.
3.  `resolveVisionBridgeRuntimeSettings()` (`src/shared/constants/modalityBridgeDefaults.ts`) orqali ish vaqti konfiguratsiyasini hal qiling: yangi `modalityBridge*` sozlamalar kalitlari ustunlik qiladi; eski `visionBridge*` kalitlari **bir siklli zaxira** (qaytarish oynasi) boʻlib qoladi. Koʻprik oʻchirilgan boʻlsa, har qanday media oʻtishidan oldin oʻtkazib yuboring.
4.  Rejim tanlagich (`modalityBridgeVisionMode`, quyidagi jadvalga qarang) qayta yoʻnaltirish yoki tavsiflashni hal qiladi. Qayta yoʻnaltirish faqat `model` almashtirilgan `modifiedPayload` ni, shuningdek `{ rerouted, fromModel, toModel, imagesKept }` meta maʼlumotlarini qaytaradi.
5.  Tavsiflash yoʻli: tasvirlarni `maxImages` da cheklang, vazifaga yoʻnaltirilgan soʻrovni tuzing, tavsif keshini tekshiring, koʻrish modelini **parallel ravishda** chaqiring (`Promise.allSettled`) va `[Image N]: <description>` matn qismlarini ularning oʻrniga kiritib qoʻying. Muvaffaqiyatsiz tavsif `null` ni qaytaradi va asl tasvir qismi **saqlanib qoladi** (#4012) — faqat combo tavsif yoʻlida har bir tavsif muvaffaqiyatsiz boʻlganda, tasdiqlangan koʻrish qobiliyatiga ega boʻlmagan yuqori oqim oʻrniga `(mavjud emas — koʻrish qobiliyatiga ega provayder ulanmagan)` stub oladi (#8430).
6.  `modifiedPayload` + meta (`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`) ni qaytaring.

#### Rejim tanlagich (`modalityBridgeVisionMode`)

| Rejim      | Standart | Xulq-atvor                                                                                                                                                                                                                                                                                                                                                    |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Eski evristika, oʻzgartirilmagan (#6640/#7204): combo boʻlmagan/`auto/` modellar, agar asl modelda allaqachon ishlatiladigan hisobga olish maʼlumotlari boʻlmasa (keyin tavsiflaydi), eng yaxshi koʻrish modeliga yoʻnaltiriladi; combo maqsadlari har doim tavsiflaydi.                                                                                      |
| `describe` |          | Har doim tavsiflang — qayta yoʻnaltirish bloki butunlay oʻtkazib yuboriladi; foydalanuvchi tanlagan model har doim javob beradi.                                                                                                                                                                                                                              |
| `reroute`  |          | Majburiy qayta yoʻnaltirish: hisobga olish maʼlumotlari saqlangan model himoyasi chetlab oʻtiladi. Qayta yoʻnaltirish-**maqsad** hisobga olish maʼlumotlari himoyasi hali ham qoʻllaniladi — agar ishlatiladigan koʻrish maqsadi mavjud boʻlmasa, soʻrov tavsiflashga oʻtadi, shunda xom tasvirlar hech qachon faqat matnli backendga yetib bormaydi (#8430). |

Majburiy rejimlar avtomatik evristika ishga tushishidan **oldin** qisqa tutashuv qiladi; `auto` xulq-atvori PR-1 dan oldingi himoya vositasiga bayt-identikdir.

#### Vazifaga yoʻnaltirilgan tavsif soʻrovi (`modalityBridgeVisionTaskAware`)

Standart **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) **oxirgi foydalanuvchi xabarining** matnini (500 belgiga qisqartirilgan) asosiy tavsif soʻroviga qoʻshadi, tavsifni foydalanuvchi aslida nima soʻraganiga (codex-vision-proxy namunasi) yoʻnaltiradi va koʻrish modelidan koʻrinadigan matnni transkripsiya qilishni soʻraydi. Agar bayroq oʻchirilgan boʻlsa — yoki foydalanuvchi matni boʻlmasa — asosiy soʻrov oʻzgarishsiz ishlatiladi.

Oʻz-oʻzidan takrorlanuvchi tasvirlash halqasining oʻz OpenAI-mos soʻrovi (`callVisionModelSingle()`
`visionBridgeHelpers.ts` faylida) har doim `image_url.detail: "high"` ni soʻraydi —
shartsiz, har bir chaqiruvchi/provayder uchun, hech qanday mijoz signaliga bogʻliq emas.
Past detallikdagi namuna olish matnni transkripsiya qilish vazifasi uchun OCR aniqligini pasaytiradi,
bu vazifani ushbu soʻrov talab qiladi, shuning uchun tasvirlash chaqiruvining oʻzi har doim yuqori detallikni soʻraydi,
asl kiruvchi soʻrov qanday detallik darajasidan foydalanganidan qatʼi nazar. Bu
faqat ichki tasvirlash soʻrovining tanasiga taʼsir qiladi; u OmniRoute
chaqiruvchining oʻz `image_url.detail` ni asosiy soʻrovda qanday qilib
uzatishini oʻzgartirmaydi — bu standart alohida va faqat aniqlangan OpenCode mijozlari uchun
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`) da qoʻllaniladi.
Tasvirlash oʻz-oʻzidan takrorlanuvchi halqasining Anthropic wire-format tarmogʻida
`detail` maydoni yoʻq va u ikkala standartdan ham taʼsirlanmaydi.

#### Tasvirlash chiqishi chegarasi (`modalityBridgeVisionMaxChars`)

| Kalit                          | Standart | Oraliq             |
| :----------------------------- | :------- | :----------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` yoki 100–50000 |

`0` (standart) **chegara yoʻqligini** bildiradi — `callVisionModel()` tomonidan qaytarilgan
tavsif oʻzgartirilmagan holda oʻtkaziladi, mavjud xatti-harakatni saqlab qoladi.
100–50000 oraligʻidagi har qanday qiymat tavsifni `…` qoʻshimchasi bilan qisqartiradi,
keyin u `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()`
`src/lib/guardrails/visionBridge.ts` faylida) sifatida qayta birlashtiriladi.
Quyidagi modelga toʻliq transkripsiya kerak boʻlgan detallarga boy OCR vazifalari uchun buni oshiring;
suhbatdosh vizual modellarda token ishlatilishini cheklash uchun buni kamaytiring.
Boshqaruv paneli maydoni Vision tabining Kengaytirilgan panelida joylashgan
(`modality-bridge-max-chars` `ModalityBridgeVisionTab.tsx` faylida) va
1 dan 99 gacha boʻlgan har qanday qiymatni 100 ga qadar cheklaydi, shu bilan birga aniq `0` ni
tegmagan holda qoldiradi — `0` oʻz-oʻzidan toʻgʻri Zod qiymati
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), shunchaki
"oʻrnatilmagan" standart emas.

#### Tasvirlash kesh (`modalityBridge/bridgeCache.ts`)

Tasvirlash chiqishlari uchun xotiradagi LRU + TTL kesh, jarayon boʻylab umumiy.
Kalit = `sha256(imageRef + composedPrompt + configuredBridgeModel)` uzunlik prefiksi bilan
(maydon chegarasi toʻqnashuvlari yoʻq). Model komponenti **konfiguratsiya qilingan**
koʻprik modeli, aslida javob bergan model emas — `callVisionModel` ichki
tomonidan zaxira rejimiga oʻtishi mumkin va har bir urinish uchun kalitlash keshni
parchalab yuboradi. Muvaffaqiyatsiz tasvirlashlar hech qachon keshlanmaydi. Sozlamalar:

| Kalit                           | Standart | Oraliq  |
| :------------------------------ | :------- | :------ |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Masofaviy tasvirni normallashtirish (oʻz-oʻzidan takrorlanuvchi tasvirlash/base64 yuklash)

Koʻprik **masofaviy** tasvirni oʻzi yuklaganda — Anthropic tasvirlash oʻz-oʻzidan chaqiruvi va
claude-wire-format base64 konvertatsiyasi (`ensureBase64ImagesForClaudeWire`),
ikkalasi ham `visionBridgeHelpers.ts` faylidagi `fetchRemoteImageAsDataUri()` orqali —
natijada olingan maʼlumot URI `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`)
orqali oʻtkaziladi, keyin vizual model soʻroviga kiritiladi.
Hajmi katta tasvirlar **2048px uzun qirra** ga qadar kichraytiriladi (OpenAI/Anthropic
allaqachon server tomonida qoʻllaydigan oʻlchamni oʻzgartirish chegarasiga mos keladi),
bu vizual model koʻradigan narsani oʻzgartirmasdan yuklash baytlarini/kechikishini kamaytiradi.
Oʻlchamni oʻzgartirish `sharp` dan foydalanadi, u dinamik import orqali yuklanadi:
uning mahalliy ikkilik fayli yuklanmaydigan platformada, `normalizeDataUri()`
**hech qachon xato bermaydi** — u asl baytlarni oʻzgartirmasdan oʻtkazishga qaytadi,
shuning uchun tasvirlash/base64-konvertatsiya yoʻli har doim ishlashda davom etadi.
Tasvir boʻlmagan baytlar (dekodlanadigan tasvirni qaytarmagan yuklash) ham
tegmagan holda oʻtkaziladi. Bu normallashtirish koʻprik oʻzining oʻz-oʻzidan chaqiruvi
uchun yuklaydigan tasvirlarga qaratilgan — u hech qachon chaqiruvchining asl
oʻtkazish yuklamasiga qoʻllanilmaydi, bu faqat tanlov asosidagi oʻzgartirish
tamoyiliga mos keladi (20-qattiq qoida).

#### Sozlamalar sxemasi + migratsiya

Yangi `modalityBridge*` kalitlari `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`) da Zod-tasdiqlangan:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCache*` uchligi va Audio Bridge tomonidan ishlatiladigan
`modalityBridgeAudio*` guruhi. `141_modality_bridge_settings.sql` migratsiyasi
mavjud eski `visionBridge*` qiymatlarini mos keladigan yangi kalitlarga nusxalaydi
(idempotent, operator tomonidan oʻrnatilgan `modalityBridge*` qiymatini hech qachon
qayta yozmaydi); eski kalitlar bir reliz sikli davomida oʻqish uchun zaxira sifatida
qabul qilinadi.

#### Shaffoflik sarlavhasi + statistikalar

Tasvirlash orqali oʻzgartirilgan javoblar
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
( `modalityBridge/bridgeStats.ts` faylidagi `buildModalityBridgeHeader()` tomonidan yaratilgan,
`src/sse/handlers/chatHelpers.ts` faylidagi `withModalityBridgeHeader()` tomonidan muhrlangan)
sarlavhasini olib yuradi. Yoʻnaltirilgan soʻrovlar **hech qanday** sarlavha olmaydi —
yuklama tegmagan va model almashtirish javob tanasining `model` maydonida allaqachon koʻrinadi.

`GET /api/modality-bridge/stats` (boshqaruv autentifikatsiyasi, `GET /api/settings` bilan bir xil daraja)
`vision`, `audio` va `video` uchun xotiradagi har bir modalitet boʻyicha hisoblagichlarni
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` qaytaradi.
`averageLatencyMs` oʻzining maxrajida barcha urinishlarni emas, balki `latencySamples` dan foydalanadi;
vaqtni hisoblamaydigan operatsiya nol millisekundlik namunani yaratmaydi.
`bridged` muvaffaqiyatli konvertatsiyalar uchun orqaga mos keladigan taxallus boʻlib qoladi;
muvaffaqiyatsiz urinishlar uni oshirmaydi.
Hisoblagichlar jarayon qayta ishga tushirilganda dizayn boʻyicha qayta oʻrnatiladi
(telemetriya, hisobga olish emas).

#### Boshqaruv paneli konfiguratsiyasi

Maxsus boshqaruv paneli sahifasi
`/dashboard/settings/modality-bridge`. Uning URL-manzilga ega `Vision`, `Audio`
va `Video` yorliqlari `tab` qiymatini almashtirganda soʻrov parametrlarini saqlaydi.
Vision yorligʻi yoqish, rejim, model tanlash (shu jumladan avtomatik
standart), vazifaga yoʻnaltirilgan soʻrov, ilgʻor vaqt tugashi/rasm/tavsif uzunligi/kesh
chegaralari, ish vaqti
hisoblagichlari va himoyalangan namunaviy soʻrovni ochib beradi. Audio yorligʻi ham jonli: u
yoqish, Auto bilan faqat STT model tanlagichini, vaqt tugashi/maksimal klip chegaralarini, audio
hisoblagichlarni va `input_audio` namunaviy testini ochib beradi. Video yorligʻi ishlaydi: u
FFmpeg/ffprobe ish vaqti holatini hisobot qiladi — toʻrtta aniq UI holatidan biri (`unknown` tekshiruv
davomida yoki yakunlana olmaganda, `restricted` tekshiruv mijoz tomonida oʻtkazib yuborilgan
non-loopback boshqaruv paneli xostida, `unavailable` tekshirilgandan soʻng topilmaganligi tasdiqlanganda,
yoki `available` FFmpeg/ffprobe versiyalari bilan) — yoqish/model/kadr/video/vaqt tugashi chegaralarini saqlaydi,
model tanlagichni vision-qobiliyatli modellarga filtrladi va video hisoblagichlarni ochib beradi.

AI sozlamalari ostidagi avvalgi Vision Bridge kartasi yangi sahifaga moslik havolasi hisoblanadi;
u endi shaklning ikkinchi nusxasiga ega emas. Media Providers ham
Image-to-Text va Speech-to-Text ish oqimlarini tegishli Modality
Bridge yorliqlariga mavjud Speech-to-Text playgroundni olib tashlamasdan bogʻlaydi.

**Oʻz-oʻzidan kirishni chetlab oʻtish:** OmniRoute oʻzining `/v1` oʻz-oʻzidan
aylanish (nostandart provayder modeli) orqali chaqiruvni yoʻnaltirganda,
kichik soʻrov `x-omniroute-admission-bypass: internal` ni yuboradi va
hal qilingan oʻz-oʻzidan aylanma hisobga olish maʼlumotlari bilan
tasdiqlanadi — mahalliy rejimda mahalliy `sk_omniroute` sentinel,
yoki operator tomonidan sozlanadigan `OMNIROUTE_API_KEY` / `ROUTER_API_KEY`
muhit kaliti (#1350) shuning uchun `REQUIRE_API_KEY=true` joylashtirishlar
ham chaqiruvni bajarishi mumkin. Chetlab oʻtish faqat shu aniq hisobga olish
maʼlumotlari uchun amal qiladi, shuning uchun tashqi mijozlar sarlavhadan
kirishni oʻtkazib yuborish uchun foydalana olmaydi.

Eski standartlar `src/shared/constants/visionBridgeDefaults.ts` da joylashgan;
yangi rejim/vazifaga yoʻnaltirilgan/kesh standartlari va sozlamalar hal qiluvchi
`src/shared/constants/modalityBridgeDefaults.ts` da joylashgan. Himoya paneli
`deps` konstruktor opsiyasini ochib beradi, shuning uchun testlar soxta
`getSettings` va `callVisionModel` implementatsiyalarini kiritishi mumkin.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Audio oʻz ichiga olgan chat soʻrovlarini audio kiritishni qabul qilishi maʼlum
boʻlmagan maqsadga yetib borguncha ushlab qoladi. U hech qachon chat soʻrovini
qayta yoʻnaltirmaydi: audio qismlar mavjud OpenAI-mos koʻp qismli endpoint
orqali transkripsiya qilinadi va tanlangan chat modeli matn transkriptlari
bilan davom etadi.

Oqim:

1. `getResolvedModelCapabilities()` orqali `supportsAudio` ni hal qiling. Aniq
   provayder-registri metamaʼlumotlari ustunlik qiladi, keyin statik model
   metamaʼlumotlari, keyin sinxronlangan `modalities_input`. `audio`siz eʼlon
   qilingan kiritish roʻyxati `false` boʻladi; qobiliyat dalili qolmasa `null`
   boʻladi. Ham `false`, ham `null` konservativ koʻprikni faollashtiradi,
   `true` esa uni chetlab oʻtadi.
2. `modalityBridgeAudio*` sozlamalarini hal qiling va umumiy `detectMediaParts()`
   detektori orqali har bir xabardan birlashtiriladigan yuqori darajadagi audio
   qismlarni ajratib oling. Qoʻllab-quvvatlanadigan sim shakllari OpenAI
   `input_audio`, `audio_url` va `source.media_type: "audio/*"` dir. Ichki
   audio yoʻnaltirish uchun aniqlanadi, lekin birlashtirish yoʻli bilan
   olib tashlanmaydi. Ish `modalityBridgeAudioMaxClips` bilan cheklangan;
   keyingi qismlar tegmasdan qoladi.
3. Sozlangan `provider/model` ni hurmat qiling, yoki `selectAudioBridgeModel()`
   ga `AUDIO_TRANSCRIPTION_PROVIDERS` ni barqaror katalog tartibida koʻrib
   chiqishga va ishlatilishi mumkin boʻlgan faol provayder hisobga olish
   maʼlumotlariga ega birinchi modelni tanlashga ruxsat bering.
4. `callAudioTranscription()` base64/data-URI audioni koʻp qismli `file` ga
   oʻzgartiradi, yoki masofaviy `audio_url` ni faqat ommaviy tashqi himoya
   orqali DNS pinning va 25 MB chegarasi bilan yuklab oladi. Keyin u faylni
   va tanlangan modelni mahalliy `/v1/audio/transcriptions` oʻz-oʻzidan
   aylanishga POST qiladi, `resolveSelfLoopBearer()` bilan tasdiqlanadi.
   Mavjud transkripsiya yoʻli normal hisobga olish maʼlumotlarini qidirishni,
   sovutish/tezlikni cheklashni va provayderni joʻnatishni amalga oshiradi.
5. Muvaffaqiyatli chaqiruvlar oʻz qismlarini `[Audio N]: <transcript>` bilan
   almashtiradi. Chaqiruvlar `Promise.allSettled` bilan ishlaydi: individual
   muvaffaqiyatsizlik oʻsha asl audio qismini saqlab qoladi (#4012 shartnomasi).
   Agar har bir chaqiruv muvaffaqiyatsiz tugasa va maqsad `supportsAudio === false`
   ekanligi isbotlansa, qismlar `[Audio N]: (mavjud emas — STT provayderi
ulangan emas)` boʻladi (#8430 shartnomasi). Nomaʼlum maqsad (`null`) uchun
   barcha muvaffaqiyatsizlik natijasi tegmasdan qoladi. Ishlatilishi mumkin
   boʻlgan STT hisobga olish maʼlumotlariga ega boʻlmagan isbotlangan faqat
   matnli maqsad tarmoq chaqiruvini chiqarmasdan bir xil aniq stubni oladi.

Muvaffaqiyatli transkriptlar jarayon boʻyicha Modality Bridge LRU/TTL keshidan
foydalanadi. Kalit audio havolasini, barqaror `audio-transcription` operatsiya
yorligʻini va tanlangan STT modelini birlashtiradi; muvaffaqiyatsizliklar
hech qachon keshlanmaydi. Audio urinishlari umumiy `bridged`, `cacheHits`,
`failures` va `lastUsedAt` hisoblagichlarini yangilaydi. Oʻzgartirilgan
javoblar `x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`
ni olib keladi; tegmasdan qolgan soʻrovlar Audio Bridge segmentini olmaydi.

Ish vaqti sozlamalari DB-ga asoslangan va Zod-tasdiqlangan:

| Kalit                         | Standart | Oraliq           |
| ----------------------------- | -------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —                |
| `modalityBridgeAudioModel`    | `""`     | Avto yoki STT ID |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10             |

Umumiy kesh `modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`
va `modalityBridgeCacheMaxEntries` tomonidan boshqariladi.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Chat Completions `messages` va Responses API `input` dagi yuqori darajadagi video qismlarni, ma'lum mahalliy video qo'llab-quvvatlashga ega bo'lmagan maqsad chaqirilishidan oldin ushlab turadi.
Qo'llab-quvvatlanadigan shakllar `input_video`, `video_url`, `video_source`, HTTPS URL'lar
va `data:video/*;base64,...` ma'lumotlar URI'lari. Matndagi oddiy fayl nomlari video sifatida
qabul qilinmaydi.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) so'rovni ko'rib chiqish,
imkoniyat/siyosatni tekshirish, so'rov bo'yicha agregatsiya va javob yuklamasiga egalik qiladi.
Har bir video uchun ish — qabul qilish, butun natija keshini, kadrlar ketma-ketligini tavsiflash
(bu har qanday chaqiruvchi tomonidan e'lon qilingan audio transkriptni birlashtiradi) va
har bir urinish uchun metrikalar/bekor qilish/tozalash — `preCall` tsikli ichida har bir video
qismi uchun bir marta chaqiriladigan `videoBridgePipeline.ts` dagi `processVideoPart` ortida yashiringan.
Ushbu modul shuningdek, aniq port chegaralarini belgilaydi: `VideoMediaBrokerPort`
(baytlarni qabul qilish va namunali kadrlarni ajratib olish), `VideoAudioTranscriptionPort`
(chaqiruvchi tomonidan e'lon qilingan audio transkriptni namunali sarlavhalar bilan birlashtirish)
va `VideoDrilldownPort` (kadrni chuqurlashtirishni saqlash chegarasi; hali `processVideoPart` ga
ulanmagan — bugungi kunda faqat alohida `/api/modality-bridge/video/drilldown` yo'li chuqurlashtirish
yozuvlarini yozadi).

Ommaviy `/v1` so'rov yo'li hech qachon kichik jarayonni import qilmaydi yoki chaqirmaydi. Masofaviy
videolar 50 MiB chegarasi ostida yuklab olinadi; ichki base64 videolarida har bir video uchun
36 MiB dekodlangan konservativ chegara mavjud, shunda model/xabarlar/ramka konverti
50 MiB ommaviy JSON so'rovini qabul qilish chegarasi ichida qolishi mumkin. Ajratishdan oldin
ichki uzunlik va dekodlangan o'lcham taxminlari tekshiriladi. Dastlabki masofaviy URL va har bir
yo'naltirishda HTTPS talab qilinadi, mavjud faqat ommaviy tashqi himoya DNS pinning bilan
ishlatiladi. Keyin baytlar aniq ichki `POST /api/modality-bridge/video/extract` broker chegarasini
kesib o'tadi. Ushbu yo'l ham `LOCAL_ONLY`, ham `SPAWN_CAPABLE` bo'lib, faqat jarayon bo'yicha
tasdiqlangan, ishonchli loopback so'rovini qabul qiladi va hech qachon URL, fayl tizimi yo'li,
ijro etiladigan fayl yoki argumentlar ro'yxatini qabul qilmaydi. API tana hajmi quvuri va
ishlovchining bosqichma-bosqich tana o'quvchisi mustaqil ravishda 50 MiB broker kirish chegarasini
qo'llaydi. Uning cheklangan navbati bir vaqtning o'zida bitta ajratishni bajaradi, to'rtta kutishdagi
ishga ruxsat beradi va kutishdagi kirishni 100 MiB bilan cheklaydi.

Broker ichida `ffprobe` shaxsiy mahalliy faylni o'qiydi; qat'iy format ruxsat berilgan ro'yxat
pleylist va manifest formatlarini istisno qiladi. Ruxsat berilgan MOV-oilaviy konteynerlar uchun
tashqi MOV ma'lumotlar havolalari sukut bo'yicha o'chirilgan bo'lib qoladi va qat'iy buyruq ularni
tanlamaydi. `ffprobe` ham, `ffmpeg` ham faqat `file`-protokol oq ro'yxatidan, bitta ipdan,
qat'iy argumentlar massividan, qobiqsiz va `PATH` dan hal qilingan ijro etiladigan fayllardan
foydalanadi. Biriktirilgan rasm qopqoq oqimlari ijro etiladigan nomzodlar emas. Barcha ijro
etiladigan oqimlar chegaralarga javob berishi kerak va aniq sukut oqimi deterministik eng past
indeksli zaxiradan oldin afzal ko'riladi. Videolar 600 soniya, har bir o'lchamda 8,192 piksel va
33,554,432 manba piksel bilan cheklangan. FFmpeg 1-16 o'rta nuqtali JPEG kadrlarini namuna oladi,
uzun qirrasini 1,024 pikseldan oshmaydigan qilib kichraytiradi, kichikroq kirishlarni kattalashtirmaydi
va hech qachon URL qabul qilmaydi. Namuna olish sukut bo'yicha `uniform` hisoblanadi. Ixtiyoriy
`scene_aware` va eksperimental `segment_aware` siyosatlari allaqachon tasdiqlangan mahalliy oqim
ustidan bitta qo'shimcha qat'iy FFmpeg o'tishini amalga oshiradi, cheklangan `showinfo` sahna
vaqt tamg'alarini tanlaydi va detektor xatosi, vaqt tugashi, noto'g'ri formatlangan chiqish
yoki bo'sh nomzodlar to'plami bo'lsa, bir xil bir xil o'rta nuqtalarga deterministik tarzda
qaytariladi. Segment-aware rejimi o'rta nuqta namunalarini tasdiqlangan sahna intervallariga
mutanosib ravishda ajratadi; segment-aware dalillari va zaxira xatti-harakatlari quyida
batafsil bayon etilgan. Qattiq 16 kadrli chegara har bir siyosatda tanlovdan keyin qo'llaniladi.
Sahna-aware so'rovida faqat bir kadrli byudjet bo'lsa, u faol to'liq video yoki fokus oynasining
bir xil o'rta nuqtasidan foydalanadi va `policyEffective: uniform` deb xabar beradi: bitta
tanlangan sahna kadri ikkala vaqtinchalik uchini ham saqlay olmaydi. Chaqiruvchi ixtiyoriy ravishda
cheklangan fokus oynasini (`start`/`end` soniyalar) taqdim etishi mumkin; chegaralar media
davomiyligiga qisqartiriladi, teskari yoki cheklanmagan oynalar rad etiladi va barcha namuna
olish siyosatlari faqat normallashtirilgan interval ichida amalga oshiriladi. Natijada olingan
oyna namuna olish metama'lumotlariga va ishonchsiz tavsif prefiksiga kiritiladi, shunda quyi
oqim modellari fokuslangan parchani to'liq vaqt jadvalidan ajrata oladi.

Semantik sarlavha fokusi alohida, aniq sozlama hisoblanadi. Sukut bo'yicha `full` tahlil rejimi
mavjud kadr so'rovini saqlaydi va hech qachon so'rov matnini sarlavha modeliga yubormaydi.
`focused` rejimida ko'prik faqat bir xil Chat yoki Responses konteyneridan eng so'nggi bo'sh
bo'lmagan foydalanuvchi tomonidan yozilgan `text`/`input_text` ni o'qiydi, uni NFC ga
normallashtiradi, boshqaruv belgilarini va bo'shliqlarni yig'adi va uni 500 Unicode kod
nuqtasi bilan cheklaydi. Bo'sh natija aniq `full` so'roviga qaytariladi. Foydali maslahat
maxsus ishonchsiz-foydalanuvchi-kontekst blokida JSON sifatida seriyalashtiriladi va faqat
kuzatiladigan tafsilotlarni ustuvor qilishi mumkin; u mediada ko'rinadigan yoki eshitiladigan
ko'rsatmalarga rioya qilmaslik haqidagi alohida ogohlantirishni bekor qila olmaydi. Matnli
fokus hech qachon `start`/`end` ni aniqlamaydi yoki vaqtinchalik namuna oluvchini o'zgartirmaydi.

#### FU-07 strukturaviy segment dalillari

`segment_aware` allaqachon tasdiqlangan mahalliy video oqimi ustidan bitta cheklangan
oldindan tahlil o'tishidan foydalanadi. Qat'iy filtr zanjiri avval maksimal 320 piksel
kengligiga o'lchaydi, sahna o'zgarishlarini va muzlatilgan intervallarni aniqlaydi,
keyin loyqalik, o'rtacha luma va fazoviy/vaqtinchalik ma'lumotlar uchun soniyasiga 1 kadr
namuna oladi. O'tish 600 strukturaviy namuna, bitta FFmpeg/filtr ipi, bir xil `file`-only
protokoli va konteyner ruxsat berilgan ro'yxatlari, 1 MiB jarayon-chiqish chegarasi va
brokerning umumiy bekor qilish/muddat ichida maksimal 30 soniya bilan cheklangan. U
so'rovdan hech qachon buyruq, filtr, yo'l yoki URL qabul qilmaydi.

Strukturaviy qiymatlar semantik videoni tushunish emas, balki deterministik namuna olish dalillaridir. Ular subyektlar, harakatlar, sarlavhalar, nutq yoki foydalanuvchi niyatini aniqlamaydi. Sahna va muzlatish chegaralari segmentlarni hosil qiladi; muzlatish qamrovi, xiralik, ekspozitsiya, fazoviy tafsilotlar va vaqtinchalik o'zgarishlar faqat mavjud 1-16 kadr byudjeti qanday taqsimlanishiga ta'sir qiladi. To'liq muzlatilgan segment bir kadr bilan cheklanadi, muzlatilmagan segmentlar esa qolgan byudjet uchun raqobatlashadi. Chegaralar kadrlar sonidan oshib ketganda, vaqt jadvalining bir xil qamrovi saqlanib qoladi, shuning uchun tezkor dastlabki kesishlar uzun orqa segmentni yashira olmaydi. Muzlatish chegarasining 1 soniyalik tahlil ruxsati ichidagi sahna chegaralari birlashtiriladi.

Yo'qolgan filtrlar, noto'g'ri shakllangan/bo'sh dalillar, detektor xatosi yoki chegaralangan oldindan tahlil qilish vaqti tugashi aniq bir xil o'rta nuqta siyosatiga ochiq qoldiriladi. Chaquiruvchining bekor qilishi yoki brokerning muddati ochiq qoldirilmaydi: u ishlayotgan kichik jarayonni tugatadi, keyingi kadrni ajratib olishni oldini oladi va shaxsiy vaqtinchalik daraxt `finally` blokida o'chiriladi.

`scripts/perf/video-bridge-fu07-eval.ts` post-dedup sarlavha-chaqiruv tejash, zich harakat byudjetini taqsimlash, xiralik/ekspozitsiya/SI-TI dalillari, uzun dumli tezkor kesishlar va asta-sekin yo'qolishning noto'g'ri pozitivlari uchun deterministik haqiqiy FFmpeg moslamalarini yaratadi. U oldindan tahlil qilish vaqtini va, agar `/usr/bin/time` mavjud bo'lsa, bolalar CPU va eng yuqori RSSni yozib oladi. Uning sifat tekshiruvlari faqat strukturaviy orakullardir. Haqiqiy sarlavha-model sifati `HOLD` holatida qoladi, chunki bu jabduqning vakolatli oxirgi nuqtasi yoki muzlatilgan hakami yo'q. Pul tejash ham `HOLD` holatida qoladi, agar `--caption-cost-per-call-usd` har bir chaqiruv uchun aniq ijobiy bahoni taqdim etmasa; skript hech qachon ikkala natijani ham soxtalashtirmaydi.

Har bir kadr 4 MiB bilan, barcha xom kadrlar birgalikda 23 MiB bilan, va seriyalashtirilgan broker javobi 32 MiB bilan cheklangan. Shaxsiy vaqtinchalik katalog `finally` blokida o'chiriladi. OmniRoute FFmpegni o'z ichiga olmaydi va maxsus bajariladigan fayl yo'lini qabul qilmaydi. Sarlavha qo'yishdan oldin, ko'prik konservativ vizual dublikatlarni olib tashlash jarayonini qo'llaydi: har bir JPEG 16×16 kulrang rangli buferga kamaytiriladi va faqat saqlangan oxirgi kadr bilan solishtiriladi. So'ralgan sarlavha byudjeti bir kadrga nisbatan yuqori bo'lsa, ajratish ushbu byudjetdan ikki baravar ko'p va hech qachon 16 kadrgacha bo'lgan chegaralangan nomzodlar havzasini taqdim etadi. So'ralgan chegara faqat dublikatlarni olib tashlashdan keyin qo'llaniladi, bunda birinchi va oxirgi tanlangan nomzodlar byudjet kamida ikkita bo'lganda yakuniy ingichkalash paytida saqlanib qoladi. Versiyalangan `grayscale-16x16-mean-cells-v2` siyosati o'rtacha luma delta va normallashtirilgan deltasi kamida 0.05 bo'lgan eskiz katakchalarining nisbati kattasini ishlatadi. Dublikat chegarasi doimiy 0.04 bo'lib, u ish vaqti sozlamasi sifatida ko'rsatilmagan, balki bashorat qilinishi uchun tanlangan. Bu ikkilamchi yuqori kontrastli signal kichik harakatlarni va ko'rinadigan matn o'zgarishlarini saqlab qoladi, ularni faqat o'rtacha qiymatni solishtirish yashirishi mumkin. Komparator yoki dekoder xatolari ochiq qoldiriladi va qamrovni saqlaydi. Chiqish metama'lumotlari ajratilgan nomzodlarni, muvaffaqiyatli ishlatilgan kadrlar va tashlab yuborilgan vizual dublikatlarni ajratadi.

Aniqlangan video qismi vaqt tamg'ali kontakt varag'ini so'rashi mumkin. Ko'prik ko'pi bilan 4 ustunli, 16 kadrli JPEG panjarasini yaratadi. Har bir 512 pikselli katakcha o'z manba vaqt tamg'asini yuqori kontrastli pastki lentaga yozadi, shu bilan birga bir xil vaqt tamg'alari keyingi bog'lanish va audit uchun matnli metama'lumotlarda qoladi. To'liq JPEG 32 MiB bilan cheklangan bo'lib qoladi. Agar `sharp` panjarani dekodlay olmasa yoki tuzata olmasa, ko'prik alohida JPEG kadrlariga qaytadi; mijozning bekor qilishi varaq operatsiyasi orqali ham tarqaladi.

Rag'batlantirish dalillari sintetik kompozitsiya mikrobenchmarkidan ataylab ajratilgan. `scripts/perf/video-bridge-contact-sheet-eval.ts` haqiqiy OpenAI-mos keluvchi ko'rish modellari uchun sxema-versiyalangan A/B jabduqni belgilaydi. U provayder tomonidan hisobot qilingan tokenlarni, yakuniy devor kechikishini (varaq kompozitsiyasini o'z ichiga olgan holda), model chaqiruvlari sonini va manifestda belgilangan faktlarni saqlashni o'lchaydi. Xom model javoblari hisobotga yozilmaydi; faqat SHA-256 xeshlari va mos kelgan fakt IDlari saqlanadi. Jabduq `--execute-real` o'tkazilmaguncha va `OMNIROUTE_BASE_URL` hamda `OMNIROUTE_API_KEY` sozlanmaguncha hech qanday tarmoq yoki pullik model chaqiruvini amalga oshirmaydi. Ushbu aniq haqiqiy ishga tushirishsiz, uning mashina o'qiy oladigan xulosasi `HOLD` holatida qoladi; faqat sintetik yuk/chaqiruvlar soni o'lchovlari rag'batlantirish dalili emas.

Chaqiruvchilar allaqachon moslashtirilgan matnga ega bo'lganlarida, qo'llab-quvvatlanadigan video qismiga ixtiyoriy `transcript.cues` massivini biriktirishi mumkin. Har bir ishora `text`, tekshirilgan davomiylik ichidagi cheklangan `start`/`end` intervali va oq ro'yxatga kiritilgan `source` (`client`, `embedded` yoki `audio-bridge`) ni o'z ichiga olishi kerak; `confidence` sukut bo'yicha `1` ga teng va `0` dan `1` gacha bo'lishi shart. Aynan bir xil ishoralar birlashtiriladi. OmniRoute hech qachon bu metama'lumotlardan transkripsiyani boshlamaydi: tasdiqlangan ishoralar manba, ishonch va interval bilan tavsiflangan natijaga nusxa ko'chiriladi va kadr sarlavhalari bilan birga ishonchsiz kuzatuvlar sifatida ko'rsatiladi. Noto'g'ri, diapazondan tashqari yoki kelib chiqishi noma'lum matn sarlavha oqimiga aralashtirilmasdan rad etiladi. `source` maydoni hozirda chaqiruvchi tomonidan e'lon qilinadi, server tomonidan tasdiqlanmaydi: OmniRoute qiymatning ruxsat etilgan uchta satrdan biri bo'lishini ta'minlaydi, ammo `embedded` yoki `audio-bridge` yorlig'i haqiqatan ham serverga tegishli ajratishdan kelganligini hali kriptografik tarzda tasdiqlamaydi. Ushbu tasdiqlash amalga oshirilguncha `source` ni ishonchsiz maslahat sifatida qabul qiling; unga asoslanib avtorizatsiya qarorlarini qabul qilmang.

Ilgʻor chaqiruvchi bir xil video uchun allaqachon ruxsat berilgan `audioTranscript` trekini taqdim etishi mumkin. Fuzion tikuv vizual va audio kuzatuvlarni bir muddat va bekor qilish signali ostida ishga tushiradi, ularni umumiy vaqt jadvaliga joylashtiradi, aniq dublikatlarni yoʻq qiladi va faqat bir tomon muvaffaqiyat qozonganida qisman natijani xabar qiladi. Notoʻgʻri `audioTranscript` butun videoni ishdan chiqarish oʻrniga, ushbu qisman natijaga tushadi — vizual tavsif saqlanadi va audio tarmogʻi tozalangan xato kodini qayd etadi. Har bir tarmoqning mavjudligi, qisman bayroq va tozalangan xato kodlari tavsiflangan natijada, himoya panjarasi metamaʼlumotlarida (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), natija-kesh metamaʼlumotlarida va koʻprikni birlashtirish hisoblagichlarida saqlanadi. Standart Video Bridge yoʻli nutqni matnga aylantirishni chaqirmaydi yoki ikkinchi media nusxasini yuklab olmaydi; ushbu aniq trek boʻlmasa, u faqat video boʻlib qoladi.

**Transkriptni saqlash (#12150 P1).** Bu Video Bridge (oʻzi opt-in) transkript ishorasini koʻrsatgan har safar avtomatik ravishda qoʻllaniladi — alohida saqlash bayrogʻi yoʻq. Soʻrov har qanday transkript ishorasini (chaqiruvchi tomonidan eʼlon qilingan `transcript` yoki birlashtirilgan `audioTranscript`) koʻrsatganida, himoya panjarasi uni `videoBridgeObserved` deb belgilaydi va video tavsifining tahrirlangan soyasini yaratadi — har bir ishoraning erkin matnli qismi `[redacted-video-transcript]` bilan almashtirilgan bir xil koʻrsatish, bu satr yigʻilishidan oldin tuzilgan ishora maydonini almashtirish orqali quriladi (hech qachon tekislangan matnni tahlil qilish orqali emas, shuning uchun hech qanday ishora mazmuni — dushmanlik yoki oddiy, shu jumladan `]` ni oʻz ichiga olgan tanalar, masalan, `[inaudible]`/`[music]` — saqlanib qolmaydi). Saqlangan chaqiruv jurnali soʻrov tanasi har bir video-hosil qilingan matn qismini mazmun tengligi boʻyicha mos keladigan tahrirlangan soya bilan almashtiradi; `fullText` ankori tugallangan chaqiruvdan oldingi himoya panjarasi yuklamasidan qayta oʻqiladi, shuning uchun keyingi zanjir himoya panjaralari (PII va hisobga olish maʼlumotlarini maskalash, ustuvorliklar 10/95) tavsif matnini joyida qayta yozgandan soʻng va tizim-soʻrov/uzatish/xotira inʼektsiyasi xabar massivini qayta shakllantirgandan soʻng ham moslik muvaffaqiyatli boʻladi. Modelga yuborilgan tana oʻzgarishsiz qoladi. Kuzatilgan soʻrov shuningdek, hech qanday doimiy Xotirani toʻldirmaydi (ham soʻrov- ham javob-hosil qilingan ekstraktsiya oʻtkazib yuboriladi), shuning uchun modelning oʻz javobi transkript matnini Xotiraga aks ettira olmaydi.

Qoʻshimcha saqlangan nusxalar bir xil kuzatilgan-soʻrov signalidan foydalanadi. Xom himoya panjarasidan oldingi mijoz-soʻrov surati, xotiradagi kutilayotgan soʻrov va erta rad etilgan-soʻrov jurnali video qismlaridagi transkript maydonlarini tuzilmaviy ravishda almashtiradi; quvur liniyasi bosqichlari tomonidan sintez qilingan satr soʻrovlari va kontekst uzatish saqlangan-soʻrov-tanasi qabul qiluvchisida tahrirlanadi. Saqlangan `video_content_removed` belgisi `previous_response_id` davom etishini ataylab tashlab yuborilgan matnni qayta tiklash oʻrniga yopiq tarzda ishdan chiqaradi. Agar kuzatilgan soʻrov jurnalga yozishdan oldin oʻzining qism-qism tahrirlash soyasini yoʻqotsa, yoki bir nechta video soyalaridan biri keyingi soʻrov oʻzgarishlaridan keyin mos kelmasa, saqlangan soʻrov tanasi qisman tahrirlangan transkriptni saqlash oʻrniga butunlay tashlab yuboriladi.

Kuzatilgan soʻrov uchun model javobi transkriptning har qanday qismini tuzilgan ishora chegarasisiz iqtibos keltirishi mumkin. Shuning uchun uning saqlangan chaqiruv jurnali `responseBody` tashlab yuborish belgisi bilan almashtiriladi; batafsil quvur liniyasi artefakti (yuqori oqim/mijoz tanalari va oqim boʻlaklarini oʻz ichiga olishi mumkin) saqlanmaydi. Semantik, idempotensiya va fikrlash-qayta ijro etish keshlar ushbu soʻrov uchun oʻqish va yozishni chetlab oʻtadi. Provayder soʻrovi va mijozga koʻrinadigan javob oʻzgarishsiz qoladi. Batafsil artefakt tashlab yuborilganda vaqtinchalik buferdan erta keepalive baytlari chiqariladi. Kironing notoʻgʻri shakllangan EventStream ogohlantirishi faqat yuklama bayt sonini xabar qiladi, hech qachon uning mazmunini yoki JSON tahlilchining xom xatosini emas. Bu har bir bogʻliq boʻlmagan provayder/plagin diagnostikasi tekshirilganligini daʼvo qilmaydi; kengroq saqlangan-qabul qiluvchi tekshiruvi #11658 da kuzatiladi.

Ichki `/api/modality-bridge/video/drilldown` hayot aylanishi alohida, loopback/token-tasdiqlangan kesh substratidir. Har bir operatsiya shuningdek, kanonik shaffof asosiy identifikatorni talab qiladi. Ishlab chiqarish chaqiruvchisi yoqilishidan oldin, u ushbu identifikatorni tasdiqlangan ijarachidan olishi kerak va hech qachon mijoz tomonidan tanlangan qiymatni yubormasligi kerak. Kesh kalitlari ushbu asosiy identifikatorni kanonik sessiya va video-havola identifikatorlariga bogʻlaydi, faqat ularning SHA-256-hosil qilingan kalitlarini saqlaydi va ham oʻqish, ham oʻchirishni bir xil asosiy identifikatorga cheklaydi. Kesh har bir yozuv uchun koʻpi bilan 16 ta hosil qilingan JPEG kadrlarini saqlaydi, ularni oʻn daqiqadan soʻng muddati tugaydi va chegaralangan `start`/`end` oʻqishlarni yoki aniq sessiyani oʻchirishni qoʻllab-quvvatlaydi.

Har bir asosiy identifikator 16 ta yozuv va 64 MiB kanonik JPEG maʼlumotlari bilan cheklangan. Bu chegaralar global 64-yozuv/256 MiB chegarasidan mustaqil: asosiy kvota bosimi global LRU chiqarish koʻrib chiqilishidan oldin faqat shu asosiy identifikatorning eng kam ishlatilgan yozuvlarini chiqaradi. Muddati tugagan yozuvlar kesh faoliyati boʻyicha ham asosiy, ham global hisob-kitoblardan tozalanadi, bekor qilish va tasdiqlash xatosi esa qisman almashtirishni amalga oshirmaydi.

Kesh kanonik boʻlmagan Base64, ortiqcha toʻldirish, JPEG boʻlmagan media, notoʻgʻri shakllangan yoki kesilgan JPEGlar va chegaralangan toʻliq tasvirni `sharp` dekodlash paytida ogohlantirish beradigan JPEGlarni rad etadi. U har bir qabul qilingan tasvirni kanonik JPEG sifatida qayta kodlaydi, kenglik va balandlikni chaqiruvchi maydonlarga ishonish oʻrniga dekodlangan baytlardan oladi va har qanday ortiqcha poliglot baytlarini saqlash oʻrniga tashlab yuboradi. Faqat chegaralangan kanonik siqilgan bufer ikkala kvotaga ham kiritiladi. JSON sim chegarasi 32 MiB dekodlangan-kirish chegarasi uchun Base64 qoʻshimcha xarajatlarini oʻz ichiga oladi. Har bir saqlangan hosila oʻzining tasdiqlangan JPEG formati/oʻlchamini, namuna olish siyosatini, hosila versiyasini, yaratilish vaqtini, server tomonidan hisoblangan kontent xeshini va xeshlangan ota-havolasini, shuningdek, ishonchli chaqiruvchining ota-kontent xeshini qayd etadi. Bekor qilish atom keshini amalga oshirishdan oldin asinxron dekodlash/xesh bosqichlari orasida tekshiriladi.

Bu transh hali ishlab chiqarish prodyuserini marshrutga ulamaydi va koʻp oʻlchovli variant tanlashni taʼminlamaydi. Shuning uchun shaffof Video Bridge soʻrov yoʻli qoʻshimcha ish talab qilmaydi, ijara-bogʻlangan asosiy hosila va toʻliq FU-08 koʻp oʻlchovli hayot aylanishi esa toʻliq xatti-harakat sifatida hujjatlashtirilmagan, balki aniq keyingi ish boʻlib qoladi.

Kadrlar sozlagan Video modeli bilan ketma-ket sarlavhalanadi. Boʻsh Video bekor qilish Vision sozlamasini meros qilib oladi; agar ikkalasi ham boʻsh boʻlsa, Vision avto-router samarali vision-qobiliyatli modelni tanlaydi. Muvaffaqiyatli sarlavhalar asl qismni barqaror `[Video description:` prefiksi bilan almashtiradi, bu matnni ishonchsiz media-hosil qilingan kuzatuv sifatida belgilaydi va quyi oqim modellariga mediada topilgan koʻrsatmalarga amal qilmaslikni aytadi. Kadr-sarlavha kesh kalitlari JPEG baytlari, soʻrov, vaqt belgisi va samarali modelni oʻz ichiga oladi; faqat muvaffaqiyatli sarlavhalar keshlanadi. Kesh yozuvlari haqiqiy muvaffaqiyatli prodyuser modelini, shu jumladan zaxira modelini saqlaydi; agar turli kadrlar turli modellar tomonidan ishlab chiqarilgan boʻlsa, koʻprik `mixed` deb xabar beradi. Keshga tushish soʻralgan marshrutlash rejasi sifatida qayta belgilash oʻrniga oʻsha prodyuser identifikatorini qayta ishlatadi. Butun video natija keshi chiqishni oʻzgartiradigan har bir kirish boʻyicha kalitlanadi — soʻrov, samarali model, namuna olish siyosati, kadrlar soni, semantik tahlil rejimi, normallashtirilgan fokus ishorasining SHA-256 barmoq izi, fokus oynasi, `transcript`, `audioTranscript` va kontakt-varaq belgisi — shuning uchun bu oʻlchamlardan birini oʻzgartirish keshga tushmaslikni, hech qachon eskirgan qayta ishlatishni anglatadi. Vizual dedup siyosati versiyasi, chegarasi va cheklangan nomzod-kadrlar soni ham natija-kesh kaliti va metamaʼlumotlarida aniq koʻrsatilgan; shuning uchun siyosat oʻzgarishi eskirgan butun video tavsifini qayta ishlata olmaydi. Natija-kesh v4 metamaʼlumotlari rejim va barmoq izini saqlaydi, hech qachon xom foydalanuvchi vazifasini emas. Guardrail metamaʼlumotlari soʻralgan va samarali tahlil rejimlarini ham xabar beradi; foydalanuvchi matni ishlatilmaydigan soʻralgan `focused` rejimi samarali `full` deb xabar beriladi.

Guardrail har bir qoʻllab-quvvatlanadigan video qismini chiqaradi, lekin `modalityBridgeVideoMaxVideos` dan koʻpini tasvirlamaydi. `supportsVideo === false` ekanligi isbotlangan maqsad uchun muvaffaqiyatsiz va chegaradan oshgan videolar aniq xavfsiz matn belgilari boʻlib qoladi, shuning uchun hech qanday xom video saqlanib qolmaydi. Imkoniyat nomaʼlum boʻlsa, bu qismlar tegmagan holda qoladi. `supportsVideo === true` boʻlgan maqsadlar koʻprikni chetlab oʻtadi. Mijoz soʻrovi bekor qilish signali yuklab olish, broker navbati, quyi jarayonlar va sarlavha chaqiruvlari orqali tarqaladi; bekor qilishlar videolar orasida toʻxtaydi va hech qachon xom mediaga ochiq qolmaydi.

Ishlash vaqti sozlamalari DB-ga asoslangan va Zod-tasdiqlangan:

| Kalit                               | Standart    | Oraliq / xatti-harakat                                                                                             |
| :---------------------------------- | :---------- | :----------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Ixtiyoriy ish vaqti, qoʻshilish                                                                                    |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` umumiy sarlavhalarni saqlaydi; `focused` cheklangan, ishonchsiz soʻnggi foydalanuvchi kontekstini ishlatadi |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge modelini meros qilib oladi                                                                           |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                               |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` yoki proportsional `segment_aware`; detektor nosozligi `uniform` ga qaytadi               |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                     |

120 soniyadan yuqori boʻlgan eski saqlangan Video vaqt tugash qiymatlari broker muddatiga cheklanadi; bu chegaradan yuqori yangi sozlamalar yozuvlari rad etiladi. `GET /api/modality-bridge/video/runtime` autentifikatsiya yoki ish vaqti tekshiruvidan oldin ishonchli shtamplangan loopback lokalitetini talab qiladi, keyin boshqaruv autentifikatsiyasini talab qiladi. U faqat `available`, tozalangan FFmpeg/ffprobe versiyalarini va ish vaqti mavjud boʻlmaganda qatʼiy sababni qaytaradi. Ichki chiqarish nuqtasi ommaviy yuklash API emas: navbat toʻyinganligi `503` va `Retry-After` ni qaytaradi, chaqiruvchi uzilishi `499` ni qaytaradi va qatʼiy broker muddati `504` ni qaytaradi. Konvertatsiya qilingan javoblar Vision yoki Audio segmentlarini olib tashlamasdan markaziy `x-omniroute-modality-bridge` sarlavhasiga `video->text;model=<visionModel>;parts=<videos>` ni qoʻshadi.

### PII Masker (`piiMasker.ts`)

**Ikkala** bosqichda ham ishlaydi.

- **`preCall`** yuklamani klonlaydi, `system`, `messages`, `input` va `prompt` (shu jumladan oddiy satr elementlari) boʻylab yuradi va satr `content`/`text` maydonlariga `processPII()` ( `@/shared/utils/inputSanitizer` dan) ni qoʻllaydi. `PII_REDACTION_ENABLED=true` boʻlganda, aniqlangan PII chiquvchi yuklamada tahrirlanadi. Bu `INPUT_SANITIZER_MODE` dan mustaqil (bu faqat soʻrov-injeksiya siyosatini boshqaradi). Tahrirlash oʻchirilgan boʻlsa, chaqiruv kontentni qayta yozmasdan aniqlash sonini qayd etadi.
- **`postCall`** javobni chuqur klonlaydi, `sanitizePIIResponse()` ni va Responses-API-shakl maskerini (`maskResponsesOutput` — `output_text` va `output[].content[].text` ni qamrab oladi) ishga tushiradi. Agar biron bir tahrirlash sodir boʻlsa, oʻzgartirilgan javob asl nusxasini almashtiradi.

Guardrail hech qachon bloklamaydi; u faqat izohlaydi (`meta.detections`, `meta.redacted`) yoki qayta yozadi.

### Soʻrov Injeksiya (`promptInjection.ts`)

Foydalanuvchi tomonidan taqdim etilgan kontentdagi raqib tuzilmalarini aniqlaydi va sozlagan siyosatni qoʻllaydi. Xatti-harakat atrof-muhit oʻzgaruvchilari va konstruktor opsiyalari tomonidan boshqariladi:

| Sozlama            | Env var                                                                                               | Standart | Ta'sir                                                                                                                                                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yoqilgan           | `INPUT_SANITIZER_ENABLED`                                                                             | `true`   | `false` bo'lganda, himoya tizimi ishlamaydi.                                                                                                                                                                          |
| Rejim              | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`   | Inyeksiya siyosati: `block`, `warn` yoki `log`. (`redact` orqaga moslik uchun qabul qilinadi, lekin inyeksiya matnini **olib tashlamaydi**; PII qayta yozish so'rovi `PII_REDACTION_ENABLED` tomonidan boshqariladi.) |
| Bloklash chegarasi | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`   | Bloklash uchun talab qilinadigan minimal jiddiylik. Odatda, o'rtacha daraja faqat kuzatuv rejimida bo'ladi.                                                                                                           |

**Rejim ustunligi** (`getMode`): chaqiruvchi `options.mode` →
`INJECTION_GUARD_MODE` **DB funksiya-bayrog'ini bekor qilish** (Boshqaruv paneli → Sozlamalar →
Funksiya bayroqlari) → `INJECTION_GUARD_MODE` muhit o'zgaruvchisi → `INPUT_SANITIZER_MODE` muhit o'zgaruvchisi →
`warn`. Shuning uchun boshqaruv panelidagi bekor qilish muhit o'zgaruvchilaridan ustun turadi, shu sababli Funksiya
bayroqlari interfeysi ishlayotgan himoyani jonli ravishda boshqaradi (qayta ishga tushirishsiz). DB o'qish xavfsizdir:
agar xato yuz bersa, himoya muhitga asoslangan xatti-harakatga qaytadi va agar hech qanday bekor qilish o'rnatilmagan
bo'lsa, xatti-harakat faqat muhitga asoslangan yechim bilan bir xil bo'ladi.

Aniqlash manbalari:

1.  `sanitizeRequest()` `@/shared/utils/inputSanitizer` dan (quvur liniyasining boshqa joylarida ishlatiladigan umumiy
    detektorlar to'plami).
2.  O'rnatilgan `DEFAULT_GUARD_PATTERNS` (hozirda `system_override_inline` va `markdown_system_block`, ikkalasi ham
    `high` jiddiylikda).
3.  Konstruktor opsiyalari orqali uzatiladigan ixtiyoriy `customPatterns` (satrlar, regex yoki
    `{ name, pattern, severity }` yozuvlari).

`mode === "block"` bo'lganda **va** kamida bitta aniqlash jiddiylik chegarasiga mos kelsa, `preCall`
`{ block: true, message: "Request rejected: suspicious content detected" }` ni qaytaradi. `warn`/`log` rejimlarida
himoya tizimi jurnalga yozadi, lekin chaqiruvga ruxsat beradi. Umumiy yordamchi `evaluatePromptInjection()` ham reyestr
orqali o'tmasdan so'rovlarni baholashi kerak bo'lgan chaqiruvchilar uchun eksport qilinadi.

**Skanerlash chegarasi (v3.8.20):** detektor birlashtirilgan so'rov matnining faqat **birinchi 16 KB** qismini
tekshiradi — `src/shared/utils/inputSanitizer.ts` faylidagi `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bayt).
`detectInjection()` va `evaluatePromptInjection()` ikkalasi ham naqsh siklini ishga tushirishdan oldin
`slice(0, MAX_INJECTION_SCAN_BYTES)` ni qo'llaydi. Inyeksiya direktivalari kiritishning yuqori qismida joylashganligi
sababli, bu yuzlab KB hajmdagi yuklamalarda regex CPU/GC ni cheklaydi, aniqlashni zaiflashtirmaydi (qarang: #3932,
#4041).

### Maxfiy ma'lumotlarni yashiruvchi (`credentialMasker.ts`)

**Ikkala** bosqichda ham ishlaydi, standart zanjirda oxirgi (ustuvorlik `95`). Chiqish yuklamasidan (xabar mazmuni,
asbob chaqiruvi argumentlari, asbob natijalari) **va** provayder javobidan mashhur API-kalit / maxfiy token naqshlarini
yashiradi, shuning uchun so'rovga joylashtirilgan (yoki asbob natijasi tomonidan qaytarilgan) maxfiy ma'lumotlar yuqori
oqim provayderiga yoki mijozga sizib chiqmaydi.

- **Faqat ixtiyoriy**, PII ni yashirish bilan bir xil konvensiya (Qattiq qoida #20 ga yaqin): `settings.credentialRedactionEnabled === true` **yoki** `CREDENTIAL_REDACTION_ENABLED=true` bo'lmasa, o'chirilgan. Agar u o'chirilgan bo'lsa, himoya tizimi hech narsa qilmaydi — u hech qachon bloklamaydi va hech qachon qayta yozmaydi.
- `redactCredentials()` to'liq yuklama/javob daraxtini (`walkValue()`, prototip-ifloslanishidan himoyalangan, `WeakSet` orqali sikldan himoyalangan) ko'rib chiqadi va mos kelgan joylarni `[REDACTED:<type>]` joylashtiruvchisi bilan almashtiradi, faqat haqiqatda o'zgargan shoxchalarni klonlaydi.
- `CREDENTIAL_PATTERNS` LLM provayder kalitlarini (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokenlarini (GitHub, Slack, Linear, Notion, npm, Postman, Discord), to'lov kalitlarini (Stripe, Square), bulut kalitlarini (AWS access key, Twilio, SendGrid, Mailgun), shaxsiy kalitlar / JWTlarni, maxfiy ma'lumotlarni o'z ichiga olgan ulanish satrlarini (`mongodb://user:pass@...`, va hokazo) va umumiy `Authorization`/`x-api-key`/`api-key`/`apikey` sarlavha-qiymat naqshini qamrab oladi. Sarlavha shaklidagi kalitlar (`authorization`, `x-api-key`, `api-key`, `apikey`) umumiy matn regex orqali emas, balki strukturaviy ravishda (faqat qiymat, `Bearer `/`Basic ` kabi sxema prefiksi saqlanadi) yashiriladi.
- Himoya tizimi hech qachon bloklamaydi; u faqat qayta yozadi (`modifiedPayload` / `modifiedResponse`) va izohlaydi (`meta.credentialsRedacted`, `meta.count`).

Regressiyadan himoya: `tests/unit/credential-masker-guardrail.test.ts`.

## Asosiy kontrakt (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true zanjir bajarilishini darhol toʻxtatadi
  message?: string; // bloklanganda koʻrsatiladi
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // soʻrovni qayta yozish uchun preCall tomonidan qaytariladi
  modifiedResponse?: TValue; // javobni qayta yozish uchun postCall tomonidan qaytariladi
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Himoya cheklovi `void`, `{}` yoki `{ block: false }` qiymatlaridan birini
qaytarish orqali «oʻzgarish yoʻq» holatini bildiradi. `modifiedPayload`/`modifiedResponse`
qaytarilishi zanjir boʻylab keyingi himoya cheklovlariga uzatilayotgan qiymatni
almashtiradi. `signal?: AbortSignal` chaqiruvchining hayot siklini himoya
cheklovlariga uzatadi. Soʻrovning bekor qilinishi ataylab qoʻllanadigan ochiq
oʻtkazish istisnosidir: media koʻpriklari ishni toʻxtatadi va tozalashni amalga
oshiradi, bunda xom media uni qoʻllab-quvvatlamasligi maʼlum boʻlgan maqsadga
qayta tiklanmaydi.

## Reestr (`registry.ts`)

Yagona `guardrailRegistry` nusxasi quyidagilarni taqdim etadi:

- `register(guardrail)` — himoya cheklovini qoʻshadi (yoki normallashtirilgan
  nom boʻyicha almashtiradi) va roʻyxatni `priority` qiymatining oʻsish tartibida
  qayta saralaydi.
- `clear()` / `list()` — maʼmuriy yordamchi funksiyalar.
- `runPreCallHooks(payload, context)` — faol himoya cheklovlarini ketma-ket
  bajaradi, foydali yuklamani `modifiedPayload` orqali uzatadi va birinchi
  `block: true` holatida toʻxtaydi.
- `runPostCallHooks(response, context)` — javob tomonida xuddi shu oqimni
  bajaradi.
- `resetGuardrailsForTests({ registerDefaults })` — holatni tozalaydi va
  testlarni izolyatsiya qilish uchun ixtiyoriy ravishda standart himoya
  cheklovlarini qayta roʻyxatdan oʻtkazadi.

Har ikkala bajaruvchi ham `{ blocked, payload|response, results, guardrail?, message? }`
qiymatini qaytaradi, bunda `results` har bir himoya cheklovi uchun `blocked`,
`skipped`, `modified`, `error` va `meta` maydonlarini oʻz ichiga olgan
`GuardrailExecutionResult` yozuvlari massivi boʻlib, kuzatuv uchun foydalidir.

### Har bir soʻrov uchun himoya cheklovlarini oʻchirish

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` joriy soʻrov uchun
oʻtkazib yuborilishi kerak boʻlgan himoya cheklovlari nomlarining takrorlanmaydigan
roʻyxatini jamlaydi. Manbalar (barchasi ixtiyoriy, barchasi birlashtiriladi):

- `apiKeyInfo.disabledGuardrails`
- Soʻrov tanasidagi `disabledGuardrails` (yuqori darajada)
- Soʻrov tanasidagi `metadata.disabledGuardrails`
- `x-omniroute-disabled-guardrails` sarlavhasi (yoki eski
  `x-disabled-guardrails`)

Qiymatlar satrlar massivi yoki vergul bilan ajratilgan satr boʻlishi mumkin;
nomlar kichik harflardagi kebab-case formatiga normallashtiriladi
(`pii_masker` → `pii-masker`). Natija `context.disabledGuardrails` orqali
reestrga uzatiladi va reestr mos keluvchi himoya cheklovlarini oʻtkazib yuboradi
(`results` ichida `skipped: true`).

## Bajarilish tartibi

`src/sse/handlers/chat.ts` va `open-sse/handlers/chatCore.ts` orqali oʻtadigan har bir soʻrov uchun:

1. `resolveDisabledGuardrails(...)` API kaliti, soʻrov tanasi va sarlavhalar asosida oʻtkazib yuboriladigan himoya mexanizmlari roʻyxatini tuzadi.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` himoya mexanizmlarini ustuvorlikning oʻsish tartibida ishga tushiradi:
   - Oʻchirilgan himoya mexanizmlari `skipped` sifatida qayd etiladi.
   - Har bir himoya mexanizmining `preCall` funksiyasi `modifiedPayload` orqali foydali yuklamani qayta yozishi mumkin.
   - Birinchi `block: true` zanjirni muddatidan oldin toʻxtatadi va ishlov beruvchi himoya mexanizmi tomonidan rad etilganlik javobini qaytaradi.
3. (Qayta yozilgan boʻlishi mumkin boʻlgan) foydali yuklama kombinatsiyalangan marshrutlash va yuqori oqimga joʻnatish jarayoniga oʻtadi.
4. Javob shakllantirilgach, `guardrailRegistry.runPostCallHooks(...)` javob ustida ayni zanjirni ishga tushiradi. Bu yerda `block: true` yuqori oqim javobini bekor qiladi.

Istisno chiqaradigan himoya mexanizmlari `error: <message>` bilan qayd etiladi va `logger.warn` orqali jurnalga yoziladi, ammo zanjir davom etadi — bu ataylab ochiq xato siyosati asosida ishlaydi.

## Konfiguratsiya

Ichki himoya mexanizmlari oʻqiydigan muhit oʻzgaruvchilari:

| Oʻzgaruvchi                           | Foydalanadigan mexanizm  | Taʼsiri                                                                                                                             |
| ------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`       | Aniqlashni butunlay oʻchirish uchun `false` qiymatini belgilang.                                                                    |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`       | Inʼeksiya siyosati: `warn`, `block` yoki `log`. Eski `redact` qiymati inʼeksiya matnini qayta yozmaydi.                             |
| `INJECTION_GUARD_MODE`                | `prompt-injection`       | Inʼeksiya himoyasi rejimi; shuningdek, muhit oʻzgaruvchilarini **ustunlik bilan almashtiradigan** MB xususiyat bayrogʻi (MB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`       | `MODE=block` rad etadigan minimal jiddiylik darajasi: `high` (standart), `medium` yoki `low`.                                       |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`       | `INPUT_SANITIZER_BLOCK_THRESHOLD` uchun eski muqobil nom.                                                                           |
| `PII_REDACTION_ENABLED`               | `pii-masker`             | `true` boʻlganda, soʻrovdagi PII tahrirlanadi (inʼeksiya rejimidan mustaqil ravishda).                                              |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (quyi oqim) | Javob tomonidagi niqoblash mexanizmi xatti-harakatini boshqaradi.                                                                   |

Modality Bridge himoya mexanizmlari ish vaqti konfiguratsiyasini muhit oʻzgaruvchilaridan emas, MB tomonidan qoʻllab-quvvatlanadigan sozlamalar omboridan (`getSettings()`) oʻqiydi. Vision uchun asosiy kalitlar:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` va
`modalityBridgeCacheMaxEntries`. Eski
`visionBridge*` kalitlari faqat hujjatlashtirilgan bir siklli oʻqish
zaxira varianti sifatida qabul qilinadi; boshqaruv panelidagi yozuvlar asosiy kalitlardan foydalanadi. Standart qiymatlar va zaxira variantni aniqlovchi
`src/shared/constants/modalityBridgeDefaults.ts` faylida joylashgan, eski
konstantalar esa `src/shared/constants/visionBridgeDefaults.ts` faylida saqlab qolingan.

Audio `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` va `modalityBridgeAudioMaxClips`, shuningdek, umumiy
`modalityBridgeCache*` sozlamalaridan foydalanadi. Audio uchun eski kalitlarga qaytish imkoniyati yoʻq, chunki bu
kalitlar Modality Bridge sxemasi bilan birga joriy etilgan.

Video `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` va
`modalityBridgeVideoTimeout`, shuningdek, umumiy `modalityBridgeCache*` sozlamalaridan foydalanadi.
U standart holatda oʻchirilgan, chunki FFmpeg/ffprobe ixtiyoriy operatsion
bogʻliqliklar hisoblanadi va kadrlarga tavsif yaratish kechikish hamda model xarajatini oshiradi.

## Maxsus Guardrail’lar

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Qadamlar:

1. `BaseGuardrail`ni kengaytiruvchi `src/lib/guardrails/myGuardrail.ts` faylini yarating.
2. `preCall` va/yoki `postCall`ni amalga oshiring.
3. Import vaqtida roʻyxatdan oʻtkazing (`registerDefaultGuardrails`dan qoʻshing) yoki
   bajarilish vaqtida `guardrailRegistry.register(...)`ni chaqiring — registr
   bir xil normallashtirilgan nomga ega oldingi guardrail’ni almashtiradi.
4. Testlarni `tests/unit/` ichiga qoʻshing (mavjud misollar:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testlash

Maʼlum holatdan boshlash uchun testlar orasida `resetGuardrailsForTests()`dan foydalaning.
Boʻsh registr bilan boshlash va faqat test qilinayotgan guardrail’larni roʻyxatdan
oʻtkazish uchun `{ registerDefaults: false }`ni uzating. Vision Bridge bogʻliqliklarni
kiritishni (`deps.getSettings`, `deps.callVisionModel`) qabul qiladi; Audio Bridge esa
sozlamalar, imkoniyatlar, STT modelini tanlash, hisob maʼlumotlarini tekshirish va
transkripsiya uchun mos ekvivalent ulanish nuqtalarini taqdim etadi. Shu sababli testlar
har ikkala oqimni ham maʼlumotlar bazasi yoki tarmoqqa ulanmasdan sinashi mumkin.

## Shuningdek qarang

- `src/lib/guardrails/` — amalga oshirish
- `src/shared/utils/inputSanitizer.ts` — prompt-injection va PII niqoblashni
  taʼminlovchi umumiy detektor
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge standartlari va
  majburiy bridge modellari roʻyxati
- `src/shared/constants/modalityBridgeDefaults.ts` — umumiy Vision/Audio bajarilish muhiti standartlari
- `docs/architecture/RESILIENCE_GUIDE.md` — ortogonal qatlam (circuit breaker, kutish davrlari)
- `docs/reference/ENVIRONMENT.md` — muhit oʻzgaruvchilarining toʻliq maʼlumotnomasi

## Injection-guard marshrut qamrovi va red-team (8-bosqich · D blok)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) foydalanuvchi promptlarini
qabul qiladigan barcha marshrutlarni qamrab oladi. U `INJECTION_GUARD_MODE`ga amal qiladi
(standart `warn` = faqat jurnalga yozish; `block` = HTTP 400 `SECURITY_001`ni qaytaradi).

| Tur           | Marshrutlar                                                                                                                                          | Standart rejim |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Matn (mavjud) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn           |
| Generativ     | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn           |
| Maʼlumotlar   | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn           |

Matnni ajratib olish (`extractMessageContents`) `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`ni qamrab oladi.

**Red-team (har kecha, `nightly-llm-security.yml`):** promptfoo har bir marshrut
`INJECTION_GUARD_MODE=block` holatida OWASP-LLM korpusini bloklashini tekshiradi; garak
probelarni ishga tushiradi (maxfiy kalit boʻlmasa, oʻtkazib yuboradi).
Izchillik uchun `moderations` ham kiritilgan — `block` rejimidagi operatorlar uni
`resolveDisabledGuardrails` orqali istisno qilishi mumkin.

Har kechalik ish jarayoni (`.github/workflows/nightly-llm-security.yml`, cron + qoʻlda
ishga tushirish) ikkita vazifaga ega:

- **`promptfoo-guard` (bloklovchi)** — `INJECTION_GUARD_MODE=block` bilan
  `promptfoo eval -c promptfooconfig.yaml`ni ishga tushiradi. Har bir zararli holat
  (masalan, "barcha oldingi koʻrsatmalarni eʼtiborsiz qoldir…", DAN uslubidagi
  jailbreak’lar) javobda `error.code === "SECURITY_001"` mavjudligini, yaʼni guard
  soʻrovni amalda rad etganini tekshiradi.
- **`garak` (tavsiyaviy)** — lokal OmniRoute nusxasiga
  (`http://localhost:20128/v1`) qarshi garak’ni `--probes promptinject,dan,leakreplay`
  bilan ishga tushiradi. U provayder maxfiy kalitiga (`PROMPTFOO_PROVIDER_KEY`)
  bogʻlangan; kalit boʻlmasa muammosiz oʻtkazib yuboradi va `|| true` bilan
  yakunlanadi, shu sababli CI’ni muvaffaqiyatsiz qilmasdan hisobot beradi.

Guard yordamchisining (`createInjectionGuard` / `withInjectionGuard`) qamrovi
prompt qabul qiluvchi har bir `/v1` marshrutini oʻz ichiga oladi; prompt matni
`src/shared/utils/inputSanitizer.ts` ichidagi `extractMessageContents()` tomonidan
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`dan olinadi.
