# Guardrails (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Haqiqatning asosiy manbasi:** `src/lib/guardrails/`
> **Soʻnggi yangilanish:** 2026-08-29 — v3.8.51 (Video Bridge transkriptining kelib chiqishi chaqiruvchi tomonidan eʼlon qilinadi,
> server tomonidan hali tasdiqlanmaydi — #11661 ga muvofiq aniqlashtirildi)

Guardrail’lar OmniRoute va yuqori oqim provayderlari oʻrtasidagi chegarada xavfsizlik, siyosat va kontent oʻzgartirishlarini taʼminlaydi. Har bir guardrail soʻrov yuklamalarini (`preCall`) va yuqori oqim javoblarini (`postCall`) tekshirishi (hamda ixtiyoriy ravishda rad etishi, oʻzgartirishi yoki izoh bilan belgilashi) mumkin.

Tizim **xatoda ochiq qoladi**: agar guardrail bajarilish vaqtida istisno chiqarsa, registr xatoni qayd etadi va soʻrovni muvaffaqiyatsiz yakunlash oʻrniga keyingi guardrail bilan davom etadi. Bloklash tasodif emas, balki aniq qarordir (`block: true`).

## Oʻrnatilgan guardrail’lar

Registr import vaqtida oltita guardrail’ni ustuvorlik tartibida avtomatik yuklaydi
(`registry.ts` → `registerDefaultGuardrails()` ga qarang):

| Ustuvorlik | Nomi                | Bosqich(lar)   | Fayl                  |
| ---------- | ------------------- | -------------- | --------------------- |
| `5`        | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`        | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`        | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`       | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`       | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`       | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Ustuvorlik raqami kichik boʻlganlari **birinchi** bajariladi.

### Vision Bridge (`visionBridge.ts`) — Modallik koʻprigi PR-1

**Tasvirni qoʻllab-quvvatlamaydigan modellarga** yoʻnaltirilgan, tasvirlarni oʻz ichiga oluvchi soʻrovlarni tutib qoladi va yuqori oqim chaqiruvidan oldin butun soʻrovni tasvirni qoʻllab-quvvatlaydigan modelga qayta yoʻnaltiradi yoki tasvir qismlarini sozlanadigan tasvir modeli yaratgan matnli tavsiflar bilan almashtiradi. Bu faqat matn bilan ishlaydigan provayderlarga multimodal yuklamalarni shaffof tarzda qayta ishlash imkonini beradi.

Jarayon:

1. Agar maqsadli model tasvirni allaqachon qoʻllab-quvvatlasa, oʻtkazib yuboriladi (u
   majburiy koʻprik roʻyxatida `isVisionBridgeForcedModel` boʻlmasa).
2. Tasvir qismlari `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`) orqali ajratib olinadi; u combo moslik filtri bilan birgalikda foydalaniladigan yagona haqiqat manbai — `open-sse/utils/mediaParts.ts` ichidagi **yagona media detektori**
   `detectMediaParts()` ga murojaat qiladi.
   Ajratib olish faqat `replaceImageParts` qayta joylashtira oladigan yuqori darajadagi qism shakllari bilan cheklangan (ajratib olish↔almashtirish shartnomasi): OpenAI
   `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` va Responses API `input_image`. Ichma-ich topilmalar va
   faqat indikatorlardan iborat shakllar combo filtriga tegishli boʻlib, hech qachon ajratib olinmaydi.
   Hech narsa topilmasa, oʻtkazib yuboriladi.
3. Ish vaqti konfiguratsiyasi `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) orqali aniqlanadi: yangi `modalityBridge*`
   sozlama kalitlari ustunlik qiladi; eski `visionBridge*` kalitlari **bir sikllik
   zaxira variant** (orqaga qaytarish oynasi) sifatida qoladi. Koʻprik oʻchirilgan boʻlsa, media boʻylab har qanday oʻtishdan oldin jarayon oʻtkazib yuboriladi.
4. Rejim tanlagichi (`modalityBridgeVisionMode`, quyidagi jadvalga qarang)
   qayta yoʻnaltirish yoki tavsiflashni tanlaydi. Qayta yoʻnaltirish faqat `model`
   almashtirilgan `modifiedPayload` hamda `{ rerouted, fromModel, toModel, imagesKept }` metamaʼlumotlarini qaytaradi.
5. Tavsiflash yoʻli: tasvirlar sonini `maxImages` bilan cheklaydi, vazifani hisobga oluvchi promptni tuzadi,
   tavsif keshini tekshiradi, tasvir modelini **parallel ravishda**
   (`Promise.allSettled`) chaqiradi va tasvirlar oʻrniga `[Image N]: <description>` matn qismlarini joylashtiradi. Muvaffaqiyatsiz tavsiflash `null` qaytaradi va asl tasvir qismi
   **saqlab qolinadi** (#4012) — combo tavsiflash yoʻlida barcha
   tavsiflashlar muvaffaqiyatsiz boʻlgan holat bundan mustasno; bunda tasvirni qoʻllab-quvvatlamasligi tasdiqlangan yuqori oqimga uning oʻrniga
   `(mavjud emas — tasvirni qoʻllab-quvvatlaydigan provayder ulanmagan)` oʻrinbosari yuboriladi (#8430).
6. `modifiedPayload` + metamaʼlumotlar (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) qaytariladi.

#### Rejim tanlagichi (`modalityBridgeVisionMode`)

| Rejim      | Standart | Xatti-harakat                                                                                                                                                                                                                                                                                                                                                                                |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Eski evristika oʻzgartirilmagan (#6640/#7204): combo boʻlmagan/`auto/` modellar eng yaxshi tasvir modeliga qayta yoʻnaltiriladi, agar asl modelda foydalanishga yaroqli hisob maʼlumotlari mavjud boʻlmasa (mavjud boʻlsa, tavsiflanadi); combo maqsadlar har doim tavsiflanadi.                                                                                                             |
| `describe` |          | Har doim tavsiflaydi — qayta yoʻnaltirish bloki butunlay oʻtkazib yuboriladi; har doim foydalanuvchi tanlagan model javob beradi.                                                                                                                                                                                                                                                            |
| `reroute`  |          | Majburiy qayta yoʻnaltirish: hisob maʼlumotlariga ega modelni saqlab qolish tekshiruvi chetlab oʻtiladi. Qayta yoʻnaltirish **maqsadi** uchun hisob maʼlumotlari tekshiruvi hali ham amal qiladi — foydalanishga yaroqli tasvir maqsadi mavjud boʻlmasa, soʻrov tavsiflashga oʻtadi, shuning uchun xom tasvirlar faqat matn bilan ishlaydigan backend’ga hech qachon yetib bormaydi (#8430). |

Majburiy rejimlar avtomatik evristika ishga tushishidan **oldin** qisqa tutashuv qiladi; `auto` xatti-harakati PR-1 dan oldingi guardrail bilan baytma-bayt bir xil.

#### Vazifani hisobga oluvchi tavsiflash prompti (`modalityBridgeVisionTaskAware`)

Standart qiymati — **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) asosiy
tavsiflash promptiga **oxirgi foydalanuvchi xabari** matnini (500 ta belgigacha qisqartirib) qoʻshadi, tavsifni foydalanuvchi aslida soʻragan narsaga yoʻnaltiradi
(codex-vision-proxy namunasi) va tasvir modelidan koʻrinadigan
matnni transkripsiya qilishni soʻraydi. Bayroq oʻchirilgan boʻlsa — yoki foydalanuvchi matni mavjud boʻlmasa — asosiy prompt oʻzgartirilmasdan ishlatiladi.

Tavsiflash self-loop’ining OpenAI bilan mos keluvchi o‘z so‘rovi (`callVisionModelSingle()`
`visionBridgeHelpers.ts` ichida) har doim `image_url.detail: "high"` ni so‘raydi —
shartsiz ravishda, har bir chaqiruvchi/provayder uchun va hech qanday mijoz signaliga
bog‘lanmagan holda. Past tafsilotli namuna olish aynan ushbu prompt so‘raydigan
matn transkripsiyasi vazifasi uchun OCR aniqligini pasaytiradi, shu sababli dastlabki
kiruvchi so‘rov qanday tafsilot darajasidan foydalanganidan qat’i nazar, tavsiflash
chaqiruvi doim yuqori tafsilot darajasini so‘raydi. Bu faqat ichki tavsiflash so‘rovi
tanasiga ta’sir qiladi; OmniRoute asosiy so‘rovda chaqiruvchining o‘z
`image_url.detail` qiymatini qanday uzatishini o‘zgartirmaydi — bu standart alohida
ravishda va faqat aniqlangan OpenCode mijozlari uchun `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`) ichida qo‘llanadi. Tavsiflash
self-loop’ining Anthropic wire-format tarmog‘ida `detail` maydoni yo‘q va unga har
ikkala standart ham ta’sir qilmaydi.

#### Tavsiflash chiqishi cheklovi (`modalityBridgeVisionMaxChars`)

| Kalit                          | Standart | Oraliq             |
| ------------------------------ | -------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`      | `0` yoki 100–50000 |

`0` (standart) **cheklov yo‘q** degan ma’noni anglatadi — `callVisionModel()`
tomonidan qaytarilgan tavsif o‘zgartirilmasdan uzatiladi va mavjud xatti-harakat
saqlanadi. 100–50000 oralig‘idagi har qanday qiymat tavsif
`[Image N]: <description>` ko‘rinishida qayta joylashtirilishidan oldin uni `…`
qo‘shimchasi bilan qisqartiradi (`src/lib/guardrails/visionBridge.ts` ichidagi
`VisionBridgeGuardrail.preCall()`). Quyi oqimdagi modelga to‘liq transkripsiya
kerak bo‘ladigan tafsilotlarga boy OCR vazifalari uchun bu qiymatni oshiring;
sergap vision modellarda token sarfini cheklash uchun uni kamaytiring.
Dashboard maydoni Vision yorlig‘ining Advanced panelida joylashgan
(`ModalityBridgeVisionTab.tsx` ichidagi `modality-bridge-max-chars`) va aniq
ko‘rsatilgan `0` qiymatiga tegmasdan, 1 dan 99 gacha bo‘lgan har qanday qiymatni
minimal 100 qiymatigacha ko‘taradi — `0` shunchaki «o‘rnatilmagan» standart emas,
balki o‘z holicha yaroqli Zod qiymatidir
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`).

#### Tavsiflash keshi (`modalityBridge/bridgeCache.ts`)

Tavsiflash natijalari uchun xotiradagi LRU + TTL keshi, butun jarayon bo‘ylab
umumiy ishlatiladi. Kalit = `sha256(imageRef + composedPrompt + configuredBridgeModel)`,
uzunlik prefiksi asosidagi freyming bilan (maydon chegaralari to‘qnashuvi yo‘q).
Model komponenti amalda javob bergan model emas, balki **sozlangan** bridge
modelidir — `callVisionModel` ichkarida zaxira variantga o‘tishi mumkin va har bir
urinish bo‘yicha kalitlash keshni parchalab yuborardi. Muvaffaqiyatsiz tavsiflashlar
hech qachon keshga joylanmaydi. Sozlamalar:

| Kalit                           | Standart | Oraliq  |
| ------------------------------- | -------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Masofaviy tasvirni normallashtirish (self-loop tavsiflash/base64 yuklab olish)

Bridge **masofaviy** tasvirni o‘zi yuklab olganida — Anthropic tavsiflash
self-call’i va claude-wire-format uchun base64 konvertatsiyasi
(`ensureBase64ImagesForClaudeWire`), ikkalasi ham `visionBridgeHelpers.ts`
ichidagi `fetchRemoteImageAsDataUri()` orqali — hosil bo‘lgan data URI vision-model
so‘roviga joylashtirilishidan oldin `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) orqali o‘tkaziladi. O‘lchami haddan tashqari
katta tasvirlarning **uzun tomoni 2048px** gacha kichraytiriladi (OpenAI/Anthropic
allaqachon server tomonida qo‘llaydigan o‘lcham chekloviga mos), bu vision model
ko‘radigan narsani o‘zgartirmasdan yuklash baytlari/kechikishini kamaytiradi.
O‘lchamni o‘zgartirish dinamik import orqali yuklanadigan `sharp` yordamida
bajariladi: uning mahalliy binar fayli yuklanmaydigan platformada
`normalizeDataUri()` **hech qachon xato tashlamaydi** — u asl baytlarni o‘zgarishsiz
uzatishga qaytadi, shuning uchun tavsiflash/base64-konvertatsiya yo‘li doimo
ishlashda davom etadi. Tasvir bo‘lmagan baytlar (dekodlanadigan tasvirni
qaytarmagan yuklab olish) ham o‘zgartirilmasdan uzatiladi. Ushbu normallashtirish
bridge o‘z self-call’i uchun yuklab oladigan tasvirlar bilan cheklangan — u hech
qachon chaqiruvchining o‘zgartirilmasdan uzatiladigan xom payload’iga qo‘llanmaydi,
bu faqat aniq rozilik bilan o‘zgartirish tamoyiliga mos keladi (Qat’iy qoida #20).

#### Sozlamalar sxemasi + migratsiya

Yangi `modalityBridge*` kalitlari `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`) ichida Zod orqali tekshiriladi:
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCache*` uchligi va Audio Bridge ishlatadigan
`modalityBridgeAudio*` guruhi. `141_modality_bridge_settings.sql` migratsiyasi
mavjud eski `visionBridge*` qiymatlarini mos keluvchi yangi kalitlarga nusxalaydi
(idempotent, operator o‘rnatgan `modalityBridge*` qiymatini hech qachon qayta
yozmaydi); eski kalitlar bir reliz sikli davomida o‘qish uchun zaxira variant
sifatida qabul qilinadi.

#### Shaffoflik sarlavhasi + statistika

Tavsiflash orqali o‘zgartirilgan javoblarda
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
mavjud bo‘ladi (`modalityBridge/bridgeStats.ts` ichidagi
`buildModalityBridgeHeader()` tomonidan tuziladi,
`src/sse/handlers/chatHelpers.ts` ichidagi `withModalityBridgeHeader()` tomonidan
qo‘shiladi). Qayta yo‘naltirilgan so‘rovlar **hech qanday** sarlavha olmaydi —
payload o‘zgartirilmagan va model almashtirilgani javob tanasining `model`
maydonida allaqachon ko‘rinadi.

`GET /api/modality-bridge/stats` (boshqaruv autentifikatsiyasi,
`GET /api/settings` bilan bir xil daraja) `vision`, `audio` va `video` uchun
xotirada saqlanadigan har bir modallik hisoblagichlarini
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` qaytaradi. `averageLatencyMs`
maxraj sifatida barcha urinishlardan emas, `latencySamples` dan foydalanadi;
vaqt o‘lchanmagan operatsiya soxta nol millisekundlik namuna yaratmaydi.
`bridged` muvaffaqiyatli konvertatsiyalar uchun orqaga mos taxallus bo‘lib
qoladi; muvaffaqiyatsiz urinishlar uning qiymatini oshirmaydi.
Hisoblagichlar dizayn bo‘yicha jarayon qayta ishga tushirilganda nolga qaytadi
(bu hisob-kitob emas, telemetriya).

#### Dashboard konfiguratsiyasi

Maxsus boshqaruv paneli sahifasi
`/dashboard/settings/modality-bridge` manzilida joylashgan. Uning URL orqali murojaat qilish mumkin bo‘lgan `Vision`, `Audio`
va `Video` varaqlari `tab` qiymatini almashtirish vaqtida so‘rov parametrlarini saqlab qoladi.
Vision varag‘ida yoqish/o‘chirish, rejim, model tanlash (jumladan, avtomatik
standart qiymat), vazifani hisobga oluvchi promptlar, kengaytirilgan kutish vaqti/tasvir/tavsif uzunligi/kesh
cheklovlari, bajarilish vaqti
hisoblagichlari va himoyalangan namunaviy so‘rov mavjud. Audio varag‘i ham faol: unda
yoqish/o‘chirish, Auto variantiga ega faqat STT uchun model tanlagichi, kutish vaqti/klipning maksimal uzunligi cheklovlari, audio
hisoblagichlari va `input_audio` namunaviy sinovi mavjud. Video varag‘i ishlaydi: u
FFmpeg/ffprobe bajarilish muhiti holatini ko‘rsatadi — to‘rtta aniq UI holatidan biri (`unknown`,
tekshiruv davom etayotganda yoki yakunlana olmaganda, `restricted`, boshqaruv paneli
loopback bo‘lmagan hostda joylashgani sabab tekshiruv mijoz tomonida o‘tkazib yuborilganda, `unavailable`, tekshiruvdan so‘ng
mavjud emasligi tasdiqlanganda yoki `available`, FFmpeg/ffprobe versiyalari bilan) — yoqish/model/kadr/video/kutish vaqti
cheklovlarini saqlaydi, model tanlagichini tasvir bilan ishlash imkoniyatiga ega
modellar bo‘yicha filtrlaydi va video hisoblagichlarini taqdim etadi.

AI sozlamalari ostidagi avvalgi Vision Bridge kartasi yangi sahifaga olib boruvchi
moslik havolasidir; u endi shaklning ikkinchi nusxasini o‘z ichiga olmaydi. Media Providers ham
mavjud Speech-to-Text sinov maydonini olib tashlamagan holda, Image-to-Text va Speech-to-Text ish jarayonlarini tegishli Modality
Bridge varaqlariga bog‘laydi.

**O‘z-o‘ziga yo‘naltirilgan sikl uchun qabulni chetlab o‘tish:** tavsiflash chaqiruvi OmniRoute'ning
o‘z `/v1` sikli (nostandart provayder modeli) orqali yo‘naltirilganda, quyi so‘rov
`x-omniroute-admission-bypass: internal` yuboradi va aniqlangan
o‘z-o‘ziga yo‘naltirilgan sikl hisob ma’lumoti bilan autentifikatsiya qilinadi — lokal rejimdagi
lokal `sk_omniroute` sentinel qiymati yoki operator sozlagan `OMNIROUTE_API_KEY` / `ROUTER_API_KEY`
muhit kaliti (#1350); shu tufayli `REQUIRE_API_KEY=true` bo‘lgan joylashtirishlar ham tavsiflash
chaqiruvini bajara oladi. Chetlab o‘tish faqat aynan shu hisob ma’lumotlari uchun qabul qilinadi,
shuning uchun tashqi mijozlar qabul tekshiruvini o‘tkazib yuborish uchun bu sarlavhadan foydalana olmaydi.

Eski standart qiymatlar `src/shared/constants/visionBridgeDefaults.ts` faylida;
yangi rejim/vazifani hisobga olish/kesh standart qiymatlari va sozlamalar rezolveri esa
`src/shared/constants/modalityBridgeDefaults.ts` faylida joylashgan. Himoya mexanizmi
`deps` konstruktor parametrini taqdim etadi, shunda testlar soxta `getSettings` va
`callVisionModel` implementatsiyalarini kiritishi mumkin.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Audio tarkibli chat so‘rovlarini audio kiritishni qabul qilishi
ma’lum bo‘lmagan nishonga yetib borishidan oldin tutib qoladi. U chat so‘rovini hech qachon qayta yo‘naltirmaydi: audio qismlar
mavjud OpenAI bilan mos multipart endpoint orqali transkripsiya qilinadi va
tanlangan chat modeli matnli transkriptlar bilan ishlashda davom etadi.

Jarayon:

1. `supportsAudio` qiymatini `getResolvedModelCapabilities()` orqali aniqlang. Avval aniq
   provayder reyestri metama’lumotlari, keyin statik model metama’lumotlari, so‘ng sinxronlangan
   `modalities_input` ustunlikka ega. `audio` mavjud bo‘lmagan e’lon qilingan kirish ro‘yxati `false`;
   imkoniyatga oid dalillar bo‘lmasa, `null` qoladi. `false` ham, `null` ham
   konservativ ko‘prikni faollashtiradi, `true` esa uni chetlab o‘tadi.
2. `modalityBridgeAudio*` sozlamalarini aniqlang va umumiy `detectMediaParts()`
   detektori orqali har bir xabardan ajratib qo‘yish mumkin bo‘lgan yuqori darajali
   audio qismlarni chiqarib oling. Qo‘llab-quvvatlanadigan uzatish shakllari: OpenAI `input_audio`, `audio_url` va
   `source.media_type: "audio/*"`. Ichma-ich audio yo‘naltirish uchun aniqlanadi, ammo
   ajratib olish yo‘li orqali olib tashlanmaydi. Ish hajmi `modalityBridgeAudioMaxClips` bilan cheklanadi;
   keyingi qismlar o‘zgarishsiz qoladi.
3. Sozlangan `provider/model` qiymatiga amal qiling yoki `selectAudioBridgeModel()` funksiyasiga
   `AUDIO_TRANSCRIPTION_PROVIDERS` bo‘ylab barqaror katalog tartibida o‘tib, foydalanish mumkin bo‘lgan
   faol provayder hisob ma’lumotiga ega birinchi modelni tanlashga ruxsat bering.
4. `callAudioTranscription()` base64/data-URI audioni multipart
   `file` formatiga aylantiradi yoki masofaviy `audio_url` faylini DNS mahkamlash va 25 MB
   chegaraga ega faqat ommaviy chiquvchi ulanishlar himoyasi orqali yuklab oladi. So‘ng fayl va tanlangan
   modelni `resolveSelfLoopBearer()` orqali autentifikatsiya qilingan lokal `/v1/audio/transcriptions`
   o‘z-o‘ziga yo‘naltirilgan sikliga POST qiladi. Mavjud transkripsiya marshruti odatiy
   hisob ma’lumotlarini qidirish, kutish davri/tezlik cheklovlarini boshqarish va provayderga yuborishni bajaradi.
5. Muvaffaqiyatli chaqiruvlar o‘z qismlarini `[Audio N]: <transcript>` bilan almashtiradi. Chaqiruvlar
   `Promise.allSettled` bilan bajariladi: alohida chaqiruv muvaffaqiyatsiz tugasa, tegishli asl
   audio qismi saqlanib qoladi (#4012 shartnomasi). Agar barcha chaqiruvlar muvaffaqiyatsiz tugasa va nishonning
   `supportsAudio === false` ekani isbotlangan bo‘lsa, qismlar
   `[Audio N]: (mavjud emas — hech qanday STT provayderi ulanmagan)` ko‘rinishiga o‘tadi (#8430 shartnomasi).
   Noma’lum nishon (`null`) uchun barcha chaqiruvlar muvaffaqiyatsiz tugasa, so‘rov o‘zgarishsiz qoladi. Faqat matn bilan ishlashi
   isbotlangan, foydalanish mumkin bo‘lgan STT hisob ma’lumotiga ega bo‘lmagan nishon tarmoq chaqiruvini amalga oshirmasdan
   xuddi shu aniq o‘rinbosar matnni oladi.

Muvaffaqiyatli transkriptlar butun jarayon miqyosidagi Modality Bridge LRU/TTL keshidan foydalanadi.
Kalit audio havolasi, barqaror `audio-transcription` operatsiya
yorlig‘i va tanlangan STT modelini birlashtiradi; muvaffaqiyatsizliklar hech qachon keshlanmaydi. Audio urinishlari
umumiy `bridged`, `cacheHits`, `failures` va `lastUsedAt` hisoblagichlarini yangilaydi.
O‘zgartirilgan javoblar
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` sarlavhasini oladi; o‘zgarishsiz qolgan
so‘rovlar Audio Bridge segmentini olmaydi.

Bajarilish muhiti sozlamalari DB’da saqlanadi va Zod orqali tekshiriladi:

| Kalit                         | Standart qiymat | Oraliq           |
| ----------------------------- | --------------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`          | —                |
| `modalityBridgeAudioModel`    | `""`            | Auto yoki STT ID |
| `modalityBridgeAudioTimeout`  | `60000`         | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`             | 1–10             |

Umumiy kesh hali ham `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` va `modalityBridgeCacheMaxEntries` orqali boshqariladi.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Chat Completions `messages` va Responses API `input` tarkibidagi yuqori darajali video qismlar maʼlum mahalliy video qoʻllab-quvvatlash imkoniyatiga ega boʻlmagan nishon chaqirilishidan oldin tutib qolinadi. Qoʻllab-quvvatlanadigan shakllar: `input_video`, `video_url`, `video_source`, HTTPS URL manzillari va `data:video/*;base64,...` maʼlumot URI manzillari. Matndagi oddiy fayl nomlari video sifatida qabul qilinmaydi.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) soʻrovni koʻrib chiqish, imkoniyat/siyosat tekshiruvi, har bir soʻrov boʻyicha agregatsiya va javob foydali yukini boshqaradi. Har bir video boʻyicha ishlar — videoni olish, toʻliq natija keshi, kadrlar ketma-ketligini tavsiflash (bunda chaqiruvchi eʼlon qilgan har qanday audio transkript birlashtiriladi), shuningdek har bir urinish boʻyicha metrikalar/bekor qilish/tozalash — `videoBridgePipeline.ts` ichidagi `processVideoPart` ortida yashirilgan boʻlib, u `preCall` sikli ichida har bir video qismi uchun bir marta chaqiriladi. Ushbu modul, shuningdek, aniq port chegaralarini belgilaydi: `VideoMediaBrokerPort` (baytlarni olish va namunaviy kadrlarni ajratib olish), `VideoAudioTranscriptionPort` (chaqiruvchi eʼlon qilgan audio transkriptni namunaviy kadr izohlari bilan birlashtirish) va `VideoDrilldownPort` (kadrlarni batafsil tahlil qilish natijalarini saqlash chegarasi; hali `processVideoPart` bilan ulanmagan — bugungi kunda batafsil tahlil yozuvlarini faqat alohida `/api/modality-bridge/video/drilldown` marshruti yozadi).

Ommaviy `/v1` soʻrov yoʻli hech qachon quyi jarayonni import qilmaydi yoki ishga tushirmaydi. Masofaviy videolar 50 MiB chegara doirasida yuklab olinadi; ichki base64 videolar uchun har bir videoga konservativ 36 MiB dekodlangan hajm chegarasi qoʻyiladi, shunda model/xabarlar/kadrlash konverti ommaviy JSON soʻrovlarini qabul qilish uchun belgilangan 50 MiB chegaradan oshmaydi. Ichki maʼlumot uzunligi va dekodlangan hajm taxminlari xotira ajratilishidan oldin tekshiriladi. Dastlabki masofaviy URL va har bir qayta yoʻnaltirish uchun HTTPS talab qilinadi; bunda DNS mahkamlashiga ega mavjud faqat ommaviy tashqi ulanish himoyasi ishlatiladi. Soʻng baytlar aynan ichki `POST /api/modality-bridge/video/extract` broker chegarasidan oʻtadi. Bu marshrut ham `LOCAL_ONLY`, ham `SPAWN_CAPABLE` boʻlib, faqat har bir jarayon uchun autentifikatsiyalangan, ishonchli loopback soʻrovini qabul qiladi va hech qachon URL, fayl tizimi yoʻli, bajariladigan fayl yoki argumentlar roʻyxatini qabul qilmaydi. API tanasi hajmini boshqarish konveyeri va ishlov beruvchining inkremental tana oʻquvchisi broker kirishi uchun 50 MiB chegarani bir-biridan mustaqil ravishda taʼminlaydi. Uning cheklangan navbati bir vaqtning oʻzida bitta ajratib olish amalini bajaradi, kutilayotgan toʻrtta vazifaga ruxsat beradi va kutilayotgan kirish maʼlumotlarini 100 MiB bilan cheklaydi.

Broker ichida `ffprobe` xususiy mahalliy faylni oʻqiydi; qatʼiy formatlar ruxsat roʻyxatiga pleylist va manifest formatlari kiritilmagan. Ruxsat etilgan MOV oilasidagi konteynerlar uchun tashqi MOV maʼlumot havolalari sukut boʻyicha oʻchirilgan holda qoladi va qatʼiy buyruq ularni yoqmaydi. `ffprobe` ham, `ffmpeg` ham faqat `file` protokoliga ruxsat beruvchi roʻyxat, bitta oqim, qatʼiy argumentlar massivlari va shellsiz ishlashdan foydalanadi; bajariladigan fayllar `PATH` orqali aniqlanadi. Biriktirilgan muqova rasmi oqimlari ijro etiladigan nomzodlar hisoblanmaydi. Barcha ijro etiladigan oqimlar cheklovlarga mos kelishi kerak; deterministik eng kichik indeksli zaxira variantidan oldin aniq standart oqim afzal koʻriladi. Videolar 600 soniya, har bir oʻlcham boʻyicha 8,192 piksel va 33,554,432 manba pikseli bilan cheklanadi. FFmpeg 1–16 ta oʻrta nuqtadagi JPEG kadrni namuna sifatida oladi, uzun qirrani koʻpi bilan 1,024 pikselgacha kichraytiradi, kichikroq kirish maʼlumotlarini kattalashtirmaydi va hech qachon URL qabul qilmaydi. Namuna olish sukut boʻyicha `uniform`. Ixtiyoriy `scene_aware` va tajribaviy `segment_aware` siyosatlari allaqachon tekshirilgan mahalliy oqim ustida bitta qoʻshimcha qatʼiy FFmpeg oʻtishini bajaradi, cheklangan `showinfo` sahna vaqt belgilarini tanlaydi va detektor xatosi, vaqt tugashi, notoʻgʻri shakllangan chiqish yoki boʻsh nomzodlar toʻplami yuz bersa, deterministik ravishda xuddi shu bir tekis oʻrta nuqtalarga qaytadi. Segmentlarni hisobga oluvchi rejim oʻrta nuqta namunalarini tekshirilgan sahna oraliqlariga mutanosib ravishda taqsimlaydi; segmentlarni hisobga oluvchi dalillar va zaxira xatti-harakati quyida batafsil bayon qilingan. Qatʼiy 16 kadrli chegara har bir siyosatda tanlovdan keyin qoʻllanadi. Sahna hisobga olinadigan soʻrovda faqat bitta kadr budjeti boʻlsa, u faol toʻliq video yoki fokus oynasining bir tekis oʻrta nuqtasidan foydalanadi va `policyEffective: uniform` deb xabar beradi: tanlangan yagona sahna kadri vaqt oraligʻining ikkala uchini ham saqlab qola olmaydi. Chaqiruvchi ixtiyoriy ravishda chekli fokus oynasini (`start`/`end` soniyalari) taqdim etishi mumkin; chegaralar media davomiyligiga moslab qirqiladi, teskari yoki chekli boʻlmagan oynalar rad etiladi va barcha namuna olish siyosatlari faqat meʼyorlashtirilgan oraliq ichida bajariladi. Hosil boʻlgan oyna namuna olish metamaʼlumotlariga va ishonchsiz tavsif prefiksiga kiritiladi, shunda quyi oqimdagi modellar fokuslangan parchani toʻliq vaqt chizigʻidan ajrata oladi.

Semantik izoh fokusi alohida, aniq sozlamadir. Standart `full` tahlil rejimi mavjud kadr promptini saqlab qoladi va soʻrov matnini hech qachon izoh modeliga uzatmaydi. `focused` rejimida koʻprik faqat shu Chat yoki Responses konteyneridagi foydalanuvchi yaratgan eng oxirgi boʻsh boʻlmagan `text`/`input_text` qiymatini oʻqiydi, uni NFC formatiga meʼyorlashtiradi, boshqaruv belgilarini va boʻsh joylarni birlashtiradi hamda 500 ta Unicode kod nuqtasi bilan cheklaydi. Boʻsh natija aynan `full` promptiga qaytadi. Foydalanishga yaroqli koʻrsatma maxsus ishonchsiz foydalanuvchi konteksti blokida JSON sifatida ketma-ketlashtiriladi va faqat kuzatiladigan tafsilotlarni ustuvorlashtirishi mumkin; u mediada koʻrinadigan yoki eshitiladigan koʻrsatmalarga amal qilmaslik haqidagi alohida ogohlantirishni bekor qila olmaydi. Matnli fokus hech qachon `start`/`end` qiymatlarini xulosa qilib chiqarmaydi yoki vaqt boʻyicha namuna oluvchini oʻzgartirmaydi.

#### FU-07 tuzilmaviy segment dalillari

`segment_aware` allaqachon tekshirilgan mahalliy video oqimi ustida bitta cheklangan dastlabki tahlil oʻtishidan foydalanadi. Qatʼiy filtrlar zanjiri avval kenglikni koʻpi bilan 320 pikselgacha kichraytiradi, sahna oʻzgarishlari va qotib qolgan oraliqlarni aniqlaydi, soʻng xiralik, oʻrtacha yorqinlik hamda fazoviy/vaqt maʼlumotlari uchun soniyasiga 1 kadr oladi. Oʻtish 600 ta tuzilmaviy namuna, bitta FFmpeg/filtr oqimi, xuddi shu faqat `file` protokoli va konteynerlar ruxsat roʻyxatlari, 1 MiB jarayon chiqishi chegarasi hamda brokerning umumiy bekor qilish/muddat chegarasi ichida koʻpi bilan 30 soniya bilan cheklanadi. U hech qachon soʻrovdan buyruq, filtr, yoʻl yoki URL qabul qilmaydi.

Strukturaviy qiymatlar semantik videoni tushunish emas, balki deterministik namuna olish dalillaridir. Ular subyektlar, harakatlar, subtitrlar, nutq yoki foydalanuvchi maqsadini aniqlamaydi. Sahna va qotib qolish chegaralari segmentlarni hosil qiladi; qotib qolish qamrovi, xiralik, ekspozitsiya, fazoviy tafsilot va vaqt bo‘yicha o‘zgarish faqat mavjud 1–16 kadrli budjet qanday taqsimlanishiga ta’sir qiladi. To‘liq qotib qolgan segment ko‘pi bilan bitta kadr bilan cheklanadi, qotib qolmagan segmentlar esa qolgan budjet uchun raqobatlashadi. Chegaralar soni kadrlar sonidan ko‘p bo‘lsa, vaqt shkalasi bo‘ylab bir tekis qamrov saqlanadi, shunda boshidagi tezkor kesishlar oxirdagi uzun segmentni yashira olmaydi. Qotib qolish chegarasidan 1 soniyalik tahlil aniqligi ichida joylashgan sahna chegaralari birlashtiriladi.

Mavjud bo‘lmagan filtrlar, noto‘g‘ri shakllangan yoki bo‘sh dalillar, detektor xatosi yoxud chegaralangan dastlabki tahlilning vaqt tugashi holatida aynan bir tekis oraliq nuqtalar siyosatiga ochiq tarzda qaytiladi. Chaqiruvchining bekor qilishi yoki broker muddati tugashi bunday qaytishga olib kelmaydi: bu bajarilayotgan quyi jarayonni to‘xtatadi, keyingi kadrlarni ajratib olishning oldini oladi va xususiy vaqtinchalik daraxt `finally` ichida o‘chiriladi.

`scripts/perf/video-bridge-fu07-eval.ts` deduplikatsiyadan keyingi subtitr chaqiruvlari tejalishi, zich harakat uchun budjet taqsimoti, xiralik/ekspozitsiya/SI-TI dalillari, uzun yakuniy qismli tezkor kesishlar va bosqichma-bosqich so‘nishdagi yolg‘on ijobiy natijalar uchun deterministik haqiqiy FFmpeg sinov namunalarini yaratadi. U dastlabki tahlilning real vaqtini va `/usr/bin/time` mavjud bo‘lsa, quyi jarayonning CPU sarfi hamda RSS cho‘qqisini qayd etadi. Uning sifat tekshiruvlari faqat strukturaviy etalonlardir. Haqiqiy subtitr modelining sifati `HOLD` holatida qoladi, chunki bu sinov vositasida vakolatli endpoint yoki muzlatilgan baholovchi mavjud emas. Pul tejalishi ham, `--caption-cost-per-call-usd` har bir chaqiruv uchun aniq musbat xarajat bahosini taqdim etmaguncha, `HOLD` holatida qoladi; skript hech qachon bu natijalarning birortasini soxtalashtirmaydi.

Har bir kadr 4 MiB bilan, barcha xom kadrlar birgalikda 23 MiB bilan, seriyalashtirilgan broker javobi esa 32 MiB bilan cheklanadi. Xususiy vaqtinchalik katalog `finally` ichida o‘chiriladi. OmniRoute FFmpeg’ni o‘z ichiga olmaydi va maxsus bajariladigan fayl yo‘lini qabul qilmaydi. Subtitr yaratishdan oldin ko‘prik konservativ vizual deduplikatsiya bosqichini qo‘llaydi: har bir JPEG 16×16 kulrang bufergacha kichraytiriladi va faqat oxirgi saqlab qolingan kadr bilan taqqoslanadi. Bir kadrdan ortiq so‘ralgan subtitr budjeti uchun ajratib olish shu budjetdan ko‘pi bilan ikki baravar katta va hech qachon 16 kadrdan oshmaydigan cheklangan nomzodlar to‘plamini taqdim etadi. So‘ralgan chegara faqat deduplikatsiyadan keyin qo‘llanadi; budjet kamida ikkita bo‘lsa, yakuniy siyraklashtirish paytida birinchi va oxirgi tanlangan nomzodlar saqlab qolinadi. Versiyalangan `grayscale-16x16-mean-cells-v2` siyosati o‘rtacha yorqinlik farqi va normallashtirilgan farqi kamida 0.05 bo‘lgan kichik tasvir kataklari nisbatidan kattasini ishlatadi. Dublikat chegarasi 0.04 konstantasidir; u ish vaqti sozlamasi sifatida ochib berish uchun emas, balki oldindan aytish mumkinligi sababli tanlangan. Ushbu ikkilamchi yuqori kontrastli signal faqat o‘rtacha qiymatga asoslangan taqqoslash yashirishi mumkin bo‘lgan kichik harakatlar va ko‘rinadigan matndagi o‘zgarishlarni saqlab qoladi. Taqqoslagich yoki dekoder xatolarida ochiq tarzda davom etilib, qamrov saqlanadi. Chiqish metama’lumotlari ajratib olingan nomzodlar, muvaffaqiyatli ishlatilgan kadrlar va tashlab yuborilgan vizual dublikatlarni alohida ko‘rsatadi.

Aniq belgilangan video qismi vaqt belgilariga ega kontakt varag‘ini so‘rashi mumkin. Ko‘prik ko‘pi bilan 4 ustunli, 16 kadrli JPEG panjarasini yaratadi. Har bir 512 pikselli katak o‘z manbasining vaqt belgisini yuqori kontrastli pastki tasmaga yozadi, ayni vaqt belgilarining o‘zi esa keyingi bog‘lash va audit uchun matnli metama’lumotlarda saqlanadi. To‘liq JPEG hajmi 32 MiB bilan cheklanganicha qoladi. Agar `sharp` panjarani dekodlay yoki tuza olmasa, ko‘prik alohida JPEG kadrlarga qaytadi; mijozning bekor qilishi esa baribir kontakt varag‘i operatsiyasi orqali tarqaladi.

Ishga kiritish dalillari sintetik kompozitsiya mikrobenchmarkidan ataylab ajratilgan. `scripts/perf/video-bridge-contact-sheet-eval.ts` haqiqiy OpenAI-mos ko‘rish modellari uchun sxema versiyasiga ega A/B sinov vositasini belgilaydi. U provayder bildirgan tokenlar, boshidan oxirigacha bo‘lgan real kechikish (kontakt varag‘ini tuzish bilan birga), model chaqiruvlari soni va manifestda belgilangan faktlarning saqlanishini o‘lchaydi. Modelning xom javoblari hisobotga yozilmaydi; faqat SHA-256 dayjestlari va mos kelgan fakt ID’lari saqlanadi. `--execute-real` uzatilmaguncha hamda `--model`, `OMNIROUTE_BASE_URL` va `OMNIROUTE_API_KEY` sozlanmaguncha sinov vositasi hech qanday tarmoq yoki pulli model chaqiruvini amalga oshirmaydi. Bunday aniq haqiqiy ishga tushirishsiz uning mashina o‘qiy oladigan hukmi `HOLD` holatida qoladi; faqat sintetik foydali yuk yoki chaqiruvlar soni o‘lchovlari ishga kiritish dalili hisoblanmaydi.

Chaqiruvchilar tekislangan matnga allaqachon ega bo‘lsa, qo‘llab-quvvatlanadigan video qismiga ixtiyoriy `transcript.cues` massivini biriktirishi mumkin. Har bir ishora `text`, tekshirilgan davomiylik ichidagi chekli `start`/`end` oralig‘i va ruxsat etilgan ro‘yxatdagi `source` (`client`, `embedded` yoki `audio-bridge`) qiymatini o‘z ichiga olishi kerak; `confidence` sukut bo‘yicha `1` bo‘ladi va `0` bilan `1` orasida qolishi shart. Aynan bir xil takroriy ishoralar birlashtiriladi. OmniRoute hech qachon ushbu metama’lumotlar asosida transkripsiyani boshlamaydi: tekshirilgan ishoralar manbasi, ishonch darajasi va oralig‘i bilan tavsiflangan natijaga ko‘chiriladi hamda kadr subtitrlari bilan birga ishonchsiz kuzatuvlar sifatida ko‘rsatiladi. Noto‘g‘ri, diapazondan tashqaridagi yoki kelib chiqishi ko‘rsatilmagan matn subtitr oqimiga aralashtirilmay, rad etiladi. Hozirda `source` maydoni server tomonidan tekshirilmaydi, balki chaqiruvchi tomonidan e’lon qilinadi: OmniRoute qiymat ruxsat etilgan uchta satrdan biri bo‘lishini ta’minlaydi, ammo `embedded` yoki `audio-bridge` belgisi haqiqatan ham serverga tegishli ajratib olish jarayonidan kelganini hali kriptografik tarzda tasdiqlamaydi. Ushbu tekshiruv joriy etilguncha `source` qiymatini ishonchsiz ko‘rsatma sifatida qabul qiling; unga asoslanib avtorizatsiya qarorlarini qabul qilmang.

Ilgʻor chaqiruvchi ayni video uchun allaqachon avtorizatsiyadan oʻtgan `audioTranscript` trekini taqdim etishi mumkin. Birlashtirish chegarasi vizual va audio kuzatuvlarni yagona muddat va bekor qilish signali doirasida bajaradi, ularni umumiy vaqt shkalasida tartiblaydi, mutlaqo bir xil nusxalarni birlashtiradi va faqat bir tomon muvaffaqiyatli boʻlganda qisman natija haqida xabar beradi. Yaroqsiz `audioTranscript` butun videoni muvaffaqiyatsiz qilish oʻrniga shu qisman natijaga olib keladi — vizual tavsif saqlanadi, audio tarmogʻi esa tozalangan xatolik kodini qayd etadi. Har bir tarmoqning mavjudligi, qismanlik bayrogʻi va tozalangan xatolik kodlari tavsiflangan natijada, himoya mexanizmi metamaʼlumotlarida (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), natijalar keshi metamaʼlumotlarida va ko‘prikning birlashtirish hisoblagichlarida saqlanadi. Standart Video Bridge yoʻli nutqni matnga aylantirishni ishga tushirmaydi yoki medianing ikkinchi nusxasini yuklab olmaydi; bunday trek aniq taqdim etilmasa, u faqat video bilan ishlashda davom etadi.

**Transkriptni saqlash (#12150 P1).** Bu Video Bridge (uning oʻzi ixtiyoriy ravishda yoqiladi) transkript signalini render qilgan har qanday holatda avtomatik ravishda qoʻllanadi — alohida saqlash bayrogʻi yoʻq. Soʻrov istalgan transkript signalini (chaqiruvchi eʼlon qilgan `transcript` yoki birlashtirilgan `audioTranscript`) render qilganda, himoya mexanizmi uni `videoBridgeObserved` deb belgilaydi va video tavsifining tahrirlangan yashirin nusxasini yaratadi — bu aynan bir xil render boʻlib, unda har bir signalning erkin matnli tanasi satr yigʻilishidan oldin tuzilmaviy signal maydonini almashtirish orqali `[redacted-video-transcript]` bilan almashtiriladi (hech qachon yassilangan matnni tahlil qilish orqali emas, shu sababli hech qanday signal mazmuni — zararli yoki oddiy, jumladan `[inaudible]`/`[music]` kabi `]` belgisini oʻz ichiga olgan tanalar — saqlanib qololmaydi). Saqlanadigan chaqiruv jurnali soʻrov tanasi kontent tengligi boʻyicha moslashtirib, videodan olingan har bir matn qismini shu tahrirlangan yashirin nusxa bilan almashtiradi; `fullText` tayanchi chaqiruvdan oldingi yakunlangan himoya mexanizmi foydali yukidan qayta oʻqiladi, shu sababli keyingi zanjir himoya mexanizmlari (PII va hisob maʼlumotlarini niqoblovchilar, ustuvorliklari 10/95) tavsif matnini oʻz joyida qayta yozganidan va tizim prompti/topshirish/xotira kiritilishi xabarlar massivining shaklini oʻzgartirganidan keyin ham moslik muvaffaqiyatli boʻladi. Modelga yuqori oqim boʻylab yuboriladigan tana oʻzgarmaydi. Kuzatilgan soʻrov hech qanday doimiy Memory maʼlumotini ham toʻldirmaydi (soʻrovdan ham, javobdan ham olinadigan ajratib olish oʻtkazib yuboriladi), shu sababli modelning oʻz javobi transkript matnini Memory ichiga takrorlab yozolmaydi.

Keyingi ishlar uchun kuzatilayotgan, hali ochiq saqlash yuzalari (**P2**, #12430): batafsil jurnal artefaktidagi himoya mexanizmidan oldingi xom mijoz soʻrovi oniy tasviri; `previous_response_id` orqali davom ettirishning yopiq tarzda rad etilishi; transkriptni sintezlangan satr prompti ichiga joylaydigan hosilaviy promptning ichki yuborishlari (konveyer bosqichlari, kontekstni topshirish); hamda transkriptni iqtibos qiluvchi model javobining javob tanasi / semantik kesh nusxasi. Bular P1 doirasidagi saqlanadigan soʻrov tanasi + Memory qamrovidan tashqaridagi xom/javob sinfiga mansub yoki ixtiyoriy ravishda yoqiladigan yuzalardir.

Ichki `/api/modality-bridge/video/drilldown` hayot sikli alohida, loopback/token orqali autentifikatsiyalangan kesh substratidir. Har bir amal kanonik noaniq principal identifikatorini ham talab qiladi. Ishlab chiqarish chaqiruvchisi yoqilishidan oldin u ushbu identifikatorni autentifikatsiyalangan tenantdan hosil qilishi va hech qachon mijoz tanlagan qiymatni uzatmasligi kerak. Kesh kalitlari ushbu principalni kanonik seans va video havolasi identifikatorlariga bogʻlaydi, faqat ularning SHA-256 asosida hosil qilingan kalitlarini saqlaydi hamda oʻqish va oʻchirish amallarini ayni principal doirasida cheklaydi. Kesh har bir yozuv uchun koʻpi bilan 16 ta hosilaviy JPEG kadrni saqlaydi, ularni oʻn daqiqadan keyin muddati tugagan deb hisoblaydi va chegaralangan `start`/`end` oʻqishlarini yoki seansni aniq oʻchirishni qoʻllab-quvvatlaydi.

Har bir principal 16 ta yozuv va 64 MiB kanonik JPEG maʼlumoti bilan cheklangan. Bu cheklovlar global 64 yozuv/256 MiB chegarasidan mustaqildir: principal kvotasi bosimi global LRU boʻyicha chiqarib tashlash koʻrib chiqilishidan oldin faqat shu principalning eng uzoq vaqtdan beri ishlatilmagan yozuvlarini chiqarib tashlaydi. Muddati tugagan yozuvlar kesh faoliyati vaqtida principal va global hisobdan tozalanadi, bekor qilish va tekshiruv muvaffaqiyatsizligi esa qisman almashtirishni qayd etmaydi.

Kesh kanonik boʻlmagan Base64 maʼlumotlarini, ortiqcha toʻldirishni, JPEG boʻlmagan medialarni, notoʻgʻri shakllangan yoki kesilgan JPEG fayllarini va chegaralangan toʻliq tasvir `sharp` dekodlashi paytida ogohlantirish hosil qiladigan JPEG fayllarini rad etadi. U qabul qilingan har bir tasvirni kanonik JPEG sifatida qayta kodlaydi, kenglik va balandlikni chaqiruvchi maydonlariga ishonish oʻrniga dekodlangan baytlardan aniqlaydi hamda oxiridagi har qanday poliglot baytlarni saqlash oʻrniga tashlab yuboradi. Har ikkala kvota uchun faqat chegaralangan kanonik siqilgan bufer hisobga olinadi. JSON uzatish chegarasi dekodlangan kirish maʼlumotlarining 32 MiB chegarasi uchun Base64 ustama hajmini oʻz ichiga oladi. Har bir saqlangan hosila oʻzining tekshirilgan JPEG formati/rezolyutsiyasi, namuna olish siyosati, hosila versiyasi, yaratilish vaqti, server tomonidan hisoblangan kontent xeshi hamda xeshlangan asosiy havola va ishonchli chaqiruvchining asosiy kontent xeshini qayd etadi. Bekor qilish atomar kesh qaydidan oldin asinxron dekodlash/xeshlash bosqichlari orasida tekshiriladi.

Ushbu transh hali ishlab chiqarish manbasini marshrutga ulamaydi va koʻp rezolyutsiyali variantlarni tanlashni taʼminlamaydi. Shu sababli shaffof Video Bridge soʻrov yoʻli qoʻshimcha ish talab qilmaydi, tenantga bogʻlangan principalni hosil qilish va toʻliq FU-08 koʻp rezolyutsiyali hayot sikli esa tugallangan xatti-harakat sifatida hujjatlashtirilmay, keyingi aniq ishlar boʻlib qoladi.

Kadrlar sozlangan Video modeli yordamida ketma-ket tavsiflanadi. Boʻsh
Video bekor qilishi Vision sozlamasini meros qilib oladi; agar ikkalasi ham boʻsh boʻlsa, Vision
avtomatik marshrutizatori amaldagi tasvirlarni qayta ishlashga qodir modelni tanlaydi. Muvaffaqiyatli tavsiflar
asl qismni barqaror `[Video description:` prefiksi bilan almashtiradi; bu prefiks matnni
ishonchsiz, media asosida olingan kuzatuv sifatida ham belgilaydi va keyingi
modellarga mediada topilgan koʻrsatmalarga amal qilmaslikni bildiradi. Kadr tavsiflari keshi kalitlari
JPEG baytlari, prompt, vaqt tamgʻasi va amaldagi modelni oʻz ichiga oladi; faqat muvaffaqiyatli
tavsiflar keshlanadi. Kesh yozuvlari amalda muvaffaqiyatli ishlagan ishlab chiqaruvchi modelni,
jumladan zaxira modelni ham saqlaydi; turli kadrlar turli modellar tomonidan
yaratilganida bridge `mixed` deb xabar beradi. Keshdan topilgan natija soʻralgan marshrutlash rejasi
nomi bilan qayta belgilanish oʻrniga oʻsha ishlab chiqaruvchi identifikatoridan foydalanadi. Butun video natijasi
keshi chiqishni oʻzgartiradigan har bir kirish maʼlumoti — prompt, amaldagi
model, namuna olish siyosati, kadrlar soni, semantik tahlil rejimi, normallashtirilgan
fokus koʻrsatmasining SHA-256 raqamli izi, fokus oynasi, `transcript`,
`audioTranscript` va kontakt-varaq bayrogʻi — asosida kalitlanadi; shu sababli ushbu
oʻlchamlardan istalgan birining oʻzgarishi eskirgan natijani qayta ishlatish emas, balki keshda topilmaslikka olib keladi. Vizual deduplikatsiya siyosati
versiyasi, chegarasi va cheklangan nomzod kadrlar soni ham
natijalar keshi kaliti va metamaʼlumotlarida aniq koʻrsatiladi; shu sababli siyosat oʻzgarsa, eskirgan
butun video tavsifidan qayta foydalanib boʻlmaydi. Natijalar keshi v4 metamaʼlumotlari rejim va
raqamli izni saqlaydi, foydalanuvchining xom vazifasini esa hech qachon saqlamaydi. Guardrail metamaʼlumotlari soʻralgan va
amaldagi tahlil rejimlarining ikkalasini ham bildiradi; foydalanishga yaroqli foydalanuvchi matnisiz soʻralgan
`focused` rejimi amalda `full` sifatida koʻrsatiladi.

Guardrail barcha qoʻllab-quvvatlanadigan video qismlarini ajratib oladi, ammo
`modalityBridgeVideoMaxVideos` dan ortigʻini tavsiflamaydi. `supportsVideo === false`
ekanligi isbotlangan maqsad uchun muvaffaqiyatsiz va limitdan oshgan videolar aniq xavfsiz
matn markerlariga aylanadi, shuning uchun hech qanday xom video saqlanib qolmaydi. Imkoniyat nomaʼlum boʻlsa, bu qismlar
oʻzgartirilmaydi. `supportsVideo === true` boʻlgan maqsadlar bridgeʼni chetlab oʻtadi.
Mijoz soʻrovini bekor qilish signali yuklab olish, broker navbati,
quyi jarayonlar va tavsif chaqiruvlari orqali uzatiladi; bekor qilishlar videolar orasida ishlovni toʻxtatadi va hech qachon
xom mediaga ochiq tarzda davom etmaydi.

Ish vaqti sozlamalari DBʼda saqlanadi va Zod yordamida tekshiriladi:

| Kalit                               | Standart    | Diapazon / xatti-harakat                                                                                                |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Ixtiyoriy ish vaqti funksiyasi, alohida yoqilishi kerak                                                                 |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` umumiy tavsiflarni saqlaydi; `focused` cheklangan, ishonchsiz eng soʻnggi foydalanuvchi kontekstidan foydalanadi |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge modelini meros qilib oladi                                                                                |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                    |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` yoki proporsional `segment_aware`; detektor xatosi `uniform` ga qaytishga olib keladi          |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                     |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                          |

Avvaldan saqlangan, 120 soniyadan yuqori Video kutish vaqti qiymatlari
brokerning oxirgi muddatigacha cheklanadi; ushbu limitdan yuqori yangi sozlama yozuvlari rad etiladi.
`GET /api/modality-bridge/video/runtime` autentifikatsiya yoki ish vaqtini tekshirishdan oldin
ishonchli tamgʻalangan loopback mahalliyligini, undan keyin esa boshqaruv
autentifikatsiyasini talab qiladi. U faqat `available`, tozalangan FFmpeg/ffprobe versiyalari va ish vaqti
mavjud boʻlmaganda qatʼiy belgilangan sababni qaytaradi. Ichki ajratib olish endpointʼi
ommaviy yuklash APIʼsi emas: navbat toʻlib qolsa `503` va `Retry-After` qaytariladi, chaqiruvchi
uzilib qolsa `499`, brokerning qatʼiy oxirgi muddati tugasa esa `504` qaytariladi. Oʻzgartirilgan javoblar
Vision yoki Audio segmentlarini olib tashlamasdan markaziy
`x-omniroute-modality-bridge` sarlavhasiga
`video->text;model=<visionModel>;parts=<videos>` ni qoʻshadi.

### PII niqoblagichi (`piiMasker.ts`)

**Ikkala** bosqichda ham ishlaydi.

- **`preCall`** foydali yuklamani klonlaydi, `system`, `messages`, `input` va
  `prompt` boʻylab yuradi (jumladan oddiy satr elementlari) hamda satrli
  `content`/`text` maydonlariga (`@/shared/utils/inputSanitizer` dan olingan)
  `processPII()` ni qoʻllaydi. `PII_REDACTION_ENABLED=true` boʻlganda aniqlangan PII chiquvchi
  foydali yuklamada yashiriladi. Bu `INPUT_SANITIZER_MODE` dan mustaqil (u faqat
  prompt-inʼeksiya siyosatini boshqaradi). Yashirish oʻchirilganida chaqiruv kontentni
  qayta yozmasdan aniqlashlar sonini qayd etadi.
- **`postCall`** javobni chuqur klonlaydi, `sanitizePIIResponse()` va
  Responses-API shakli niqoblagichini (`maskResponsesOutput` — `output_text` va
  `output[].content[].text` ni qamrab oladi) ishga tushiradi. Agar biror yashirish amalga oshirilsa,
  oʻzgartirilgan javob asl javobning oʻrnini egallaydi.

Guardrail hech qachon bloklamaydi; u faqat annotatsiya qoʻshadi (`meta.detections`,
`meta.redacted`) yoki qayta yozadi.

### Prompt inʼeksiyasi (`promptInjection.ts`)

Foydalanuvchi taqdim etgan kontentdagi adversarial tuzilmalarni aniqlaydi va sozlangan
siyosatni majburan qoʻllaydi. Xatti-harakat muhit oʻzgaruvchilari va konstruktor
parametrlari tomonidan boshqariladi:

| Sozlama            | Muhit o‘zgaruvchisi                                                                                         | Standart qiymat | Ta’siri                                                                                                                                                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yoqilgan           | `INPUT_SANITIZER_ENABLED`                                                                                   | `true`          | `false` bo‘lganda, himoya mexanizmi tekshiruvni darhol yakunlaydi.                                                                                                                                                                  |
| Rejim              | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                             | `warn`          | Inʼeksiya siyosati: `block`, `warn` yoki `log`. (`redact` orqaga moslik uchun qabul qilinadi, ammo inʼeksiya matnini **olib tashlamaydi**; so‘rovdagi PII maʼlumotlarini qayta yozish `PII_REDACTION_ENABLED` orqali boshqariladi.) |
| Bloklash chegarasi | `blockThreshold` opsiyasi / `INPUT_SANITIZER_BLOCK_THRESHOLD` (`INJECTION_GUARD_BLOCK_THRESHOLD` taxallusi) | `high`          | Bloklash uchun talab qilinadigan minimal jiddiylik darajasi. Standart holatda o‘rta daraja faqat kuzatiladi.                                                                                                                        |

**Rejim ustuvorligi** (`getMode`): chaqiruvchining `options.mode` qiymati →
`INJECTION_GUARD_MODE` uchun **DB xususiyat bayrog‘i orqali bekor qilish** (Boshqaruv paneli → Sozlamalar →
Xususiyat bayroqlari) → `INJECTION_GUARD_MODE` muhit o‘zgaruvchisi → `INPUT_SANITIZER_MODE` muhit o‘zgaruvchisi →
`warn`. Shu sababli boshqaruv panelidagi bekor qilish muhit o‘zgaruvchilaridan ustun turadi va Xususiyat
bayroqlari interfeysi ishlayotgan himoya mexanizmini real vaqtda boshqaradi (qayta ishga tushirish talab qilinmaydi). DB o‘qilishi xatolarga chidamli:
agar xato yuz bersa, himoya mexanizmi muhit o‘zgaruvchilariga asoslangan xatti-harakatga qaytadi; hech qanday
bekor qilish o‘rnatilmaganida esa xatti-harakat faqat muhit o‘zgaruvchilari orqali aniqlanadigan holat bilan bir xil bo‘ladi.

Aniqlash manbalari:

1. `@/shared/utils/inputSanitizer` modulidagi `sanitizeRequest()` (jarayonning
   boshqa qismlarida ham ishlatiladigan umumiy detektorlar to‘plami).
2. Ichki `DEFAULT_GUARD_PATTERNS` (hozirda `system_override_inline` va
   `markdown_system_block`; ikkalasining jiddiylik darajasi ham `high`).
3. Konstruktor opsiyalari orqali uzatiladigan ixtiyoriy `customPatterns` (satrlar, muntazam ifodalar
   yoki `{ name, pattern, severity }` yozuvlari).

`mode === "block"` bo‘lganda **va** kamida bitta aniqlangan holat jiddiylik
chegarasiga yetsa, `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }` qiymatini qaytaradi. `warn`/`log` rejimlarida himoya mexanizmi jurnalga yozadi, ammo
chaqiruvga ruxsat beradi. Umumiy yordamchi `evaluatePromptInjection()` ham
reestrdan foydalanmasdan promptlarni baholashi kerak bo‘lgan chaqiruvchilar uchun eksport qilinadi.

**Skanerlash chegarasi (v3.8.20):** detektor birlashtirilgan prompt matnining faqat
**dastlabki 16 KB** qismini tekshiradi — `src/shared/utils/inputSanitizer.ts` faylida
`MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bayt). `detectInjection()` ham,
`evaluatePromptInjection()` ham naqshlar siklini bajarishdan oldin
`slice(0, MAX_INJECTION_SCAN_BYTES)` ni qo‘llaydi. Inʼeksiya direktivalari kiritmaning yuqori qismida joylashadi, shu sababli bu
yuzlab KB hajmdagi foydali yuklamalarda regex CPU/GC sarfini aniqlash samaradorligini pasaytirmasdan
cheklaydi (#3932, #4041 ga qarang).

### Hisob maʼlumotlarini niqoblovchi (`credentialMasker.ts`)

Standart zanjirning oxirida (ustuvorlik `95`) **har ikki** bosqichda ishlaydi. Chiquvchi foydali yuklamadagi (xabar
mazmuni, vosita chaqiruvi argumentlari, vosita natijalari) **hamda** provayder javobidagi
keng tarqalgan API kaliti / maxfiy token naqshlarini berkitadi; natijada promptga joylangan
(yoki vosita natijasi tomonidan qaytarilgan) hisob maʼlumotlari yuqori oqim provayderiga yoki mijozga
sizib chiqmaydi.

- **Faqat aniq yoqilganda ishlaydi**, PII maʼlumotlarini berkitish bilan bir xil qoida (Qatʼiy qoida #20 ga yaqin):
  `settings.credentialRedactionEnabled === true` **yoki**
  `CREDENTIAL_REDACTION_ENABLED=true` bo‘lmasa, o‘chirilgan bo‘ladi. O‘chirilganida himoya mexanizmi hech qanday amal bajarmaydi —
  u hech qachon bloklamaydi va hech narsani qayta yozmaydi.
- `redactCredentials()` butun foydali yuklama/javob daraxtini kezib chiqadi (`walkValue()`,
  prototip ifloslanishidan himoyalangan, `WeakSet` orqali sikllardan himoyalangan) va mosliklarni
  `[REDACTED:<type>]` o‘rinbosari bilan almashtiradi; faqat amalda o‘zgargan
  shoxlarni klonlaydi.
- `CREDENTIAL_PATTERNS` LLM provayderlari kalitlarini (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS tokenlarini (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), to‘lov kalitlarini (Stripe, Square), bulut
  kalitlarini (AWS kirish kaliti, Twilio, SendGrid, Mailgun), maxfiy kalitlar / JWTlarni,
  hisob maʼlumotlarini o‘z ichiga oluvchi ulanish satrlarini (`mongodb://user:pass@...` va boshqalar) hamda
  umumiy `Authorization`/`x-api-key`/`api-key`/`apikey` sarlavha-qiymat
  naqshini qamrab oladi. Sarlavha ko‘rinishidagi kalitlar (`authorization`, `x-api-key`, `api-key`,
  `apikey`) umumiy matn regexi orqali emas, balki tuzilmaviy tarzda berkitiladi (faqat qiymat; `Bearer `/`Basic `
  kabi sxema prefiksi saqlanadi).
- Himoya mexanizmi hech qachon bloklamaydi; u faqat qayta yozadi (`modifiedPayload` /
  `modifiedResponse`) va izohli metadata qo‘shadi (`meta.credentialsRedacted`, `meta.count`).

Regressiyadan himoya testi: `tests/unit/credential-masker-guardrail.test.ts`.

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
