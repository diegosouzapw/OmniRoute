# Resilience Guide (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute uchta alohida, ammo o‘zaro bog‘liq chidamlilik mexanizmiga ega. Ularning har biri turli qamrov va maqsadga ega. Marshrutlash xatti-harakatini nosozliklardan tozalashda ularni bir-biridan ajratib ko‘ring.

![3 qatlamli chidamlilik modeli](../diagrams/exported/resilience-3layers.svg)

> Manba: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Provayder avtomatik uzgichi

**Qamrovi:** butun provayder (masalan, `glm`, `openai`, `anthropic`).

**Maqsadi:** yuqori oqim/xizmat darajasida qayta-qayta ishlamayotgan provayderga trafik yuborishni to‘xtatish.

**Amalga oshirilishi:**

- Asosiy klass: `src/shared/utils/circuitBreaker.ts`
- Ulanish: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Holat API’si: `GET /api/monitoring/health`
- Qayta tiklash API’si: `POST /api/resilience/reset`
- O‘ramlar: `open-sse/services/accountFallback.ts`
- DB jadvali: `domain_circuit_breakers`

**Holatlar:**

- `CLOSED` — odatiy trafikka ruxsat beriladi
- `DEGRADED` — trafikka hali ham ruxsat beriladi, ammo provayderdagi ko‘paygan nosozliklar kuzatib boriladi
- `OPEN` — provayder vaqtincha bloklanadi; kombinatsiyalangan marshrutlash uni o‘tkazib yuboradi
- `HALF_OPEN` — qayta tiklash kutish vaqti tugagan; sinov so‘roviga ruxsat beriladi

**Sozlanadigan standart qiymatlar (`open-sse/config/constants.ts`, Boshqaruv paneli → Sozlamalar → Chidamlilik bo‘limida mavjud):**

| Klass      | Pasayish chegarasi   | Ochilish chegarasi | Qayta tiklash kutish vaqti |
| ---------- | -------------------- | ------------------ | -------------------------- |
| OAuth      | 5 ta nosozlik        | 8 ta nosozlik      | 60s                        |
| API kaliti | 7 ta nosozlik        | 12 ta nosozlik     | 30s                        |
| Mahalliy   | hisoblab chiqariladi | 2 ta nosozlik      | 15s                        |

`degradationThreshold` provayder qachon `DEGRADED` holatiga o‘tishini boshqaradi; `failureThreshold` esa u qachon ochilishi va o‘tkazib yuborilishini boshqaradi. Mahalliy provayder profillari hali Chidamlilik sozlamalari sahifasida mavjud emas.

**Ishga tushirish kodlari:** faqat provayder darajasidagi `[408, 500, 502, 503, 504]` holatlari. Hisob darajasidagi xatolar (aksariyat 401/403/429 — ular sovitish yoki bloklash mexanizmiga tegishli) uchun avtomatik uzgichni ishga tushirmang.

**Sust tiklanish:** `OPEN` muddati tugaganda, `getStatus()`, `canExecute()`, `getRetryAfterMs()` holatni `HALF_OPEN` holatiga yangilaydi. Fon taymeri talab qilinmaydi.

---

### Ixtiyoriy global provayder sovitishi (vaqt oynasi to‘sig‘i)

To‘rtinchi, **ixtiyoriy** qatlam (`PROVIDER_COOLDOWN_ENABLED`, standart holatda **o‘chirilgan**) ishlamayotgan provayderlar haqidagi so‘rovlararo xotirani
`open-sse/services/providerCooldownTracker.ts` faylida saqlaydi va undan kombinatsiyalangan nishonlarni
aniqlashda foydalanadi, shunda ketma-ket kombinatsiyalangan so‘rovlar hozirgina
ishlamay qolgan provayderni qayta-qayta tekshirmaydi. Provayder darajasidagi yozuvlar `PROVIDER_PROFILES` vaqt oynasi to‘sig‘iga rioya qiladi:

| Profil     | ishga tushish chegarasi (`providerFailureThreshold`) | vaqt oralig‘i (`providerFailureWindowMs`) | sovitish muddati (`providerCooldownMs`) |
| ---------- | ---------------------------------------------------: | ----------------------------------------: | --------------------------------------: |
| OAuth      |                                                 `10` |                                   `15min` |                                  `5min` |
| API kaliti |                                                 `15` |                                   `30min` |                                 `10min` |

Chegaradan past bo‘lsa, provayder **sovitilayotgan** deb hisoblanmaydi; muvaffaqiyatli
urinish vaqt oynasini tozalaydi. Ulanish darajasidagi yozuvlar (`provider:connectionId`) uning o‘rniga
eksponensial `minRetryCooldownMs → maxRetryCooldownMs` kechikishini saqlab qoladi. Qayta belgilashlar:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regressiyadan himoya: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Ulanish uchun kutish davri

**Qamrov:** bitta provayder ulanishi/hisobi/kaliti.

**Maqsad:** ayni provayderning boshqa ulanishlari xizmat ko‘rsatishda davom etayotgan paytda bitta nosoz kalitni chetlab o‘tish.

**Amalga oshirilishi:**

- Mavjud emas deb belgilash: `src/sse/services/auth.ts::markAccountUnavailable()`
- Tanlash: ayni fayldagi `getProviderCredentials*`
- Kutish davrini hisoblash: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Sozlamalar: `src/lib/resilience/settings.ts`

**Har bir ulanish uchun maydonlar:**

- `rateLimitedUntil` — kutish davri tugaydigan vaqt tamg‘asi
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponensial kechiktirish hisoblagichi

**Standart kutish davrlari:**

- OAuth asosiy qiymati: 5s
- API kaliti asosiy qiymati: 3s
- API kaliti uchun 429: yuqori oqimdagi `Retry-After`/qayta o‘rnatish sarlavhalari/tahlil qilinadigan qayta o‘rnatish matniga ustunlik beradi
- Kechiktirish: `baseCooldownMs * 2 ** failureIndex`

**Bir vaqtda ommaviy takroriy urinishlardan himoya:** parallel xatoliklarning kutish davrini haddan tashqari uzaytirishi yoki `backoffLevel` qiymatini ikki marta oshirishining oldini oladi.

**Oqim kontentining to‘xtab qolishi hisobni kutish davriga o‘tkazmaydi.** Kontent to‘xtab qolishini kuzatuvchi mexanizm
(`open-sse/utils/streamHandler.ts`) o‘z vaqtida model chiqishini yubormagan oqimdan
voz kechganda, `markAccountUnavailable()` ulanishdagi xatoni qayd etadi, ammo hech qanday
kutish davrini o‘rnatmaydi: to‘xtab qolish shu so‘rovga tegishli bo‘lib, aksariyat hollarda hali
chiqish bermagan uzoq mulohaza yuritish bosqichidir. Operatorlar `resilienceSettings.streamStallCooldown.enabled`
orqali buni qayta yoqishlari mumkin (standart qiymati `false`).

**Mulohaza freymlari kontent to‘xtab qolishi uchun ajratilgan vaqtni qayta boshlaydi.** Mulohaza yurituvchi model
birinchi ko‘rinadigan tokenini berishdan oldin bir necha daqiqa o‘ylashi mumkin: Claude ichidagi
fikrlash matni bo‘sh bo‘lishi mumkin bo‘lgan `thinking_delta` freymlarini oqim orqali uzatadi,
Responses API esa mulohaza elementlarini ketma-ket uzatadi. `isReasoningProgressFrame()`
(`open-sse/utils/streamReadiness.ts`) bu freymlarni taniydi va kuzatuvchi mexanizm bosqichni
bekor qilish o‘rniga har bir freymda ajratilgan vaqtni qayta boshlaydi. Ular baribir model chiqishi
hisoblanmaydi, shuning uchun faqat mulohaza bilan tugagan bosqich hali ham bo‘sh deb xabar
qilinadi, mulohaza yuritishni to‘xtatib, faqat faollik signallarini yuboradigan bosqich esa baribir
kuzatuvchi mexanizmni ishga tushiradi.

Kiro'ning bo‘sh bo‘lmagan imzoga ega ikkilik `reasoningContentEvent` freymlari ushbu
mulohaza faolligini ijrochi orqali bo‘sh `reasoning_content` deltasi sifatida saqlab qoladi. Imzo
uzatilmaydi. Metama’lumotlar, to‘liq bo‘lmagan freymlar va bo‘sh imzolar kontent uchun ajratilgan
vaqtni qayta boshlamaydi; mustaqil faol oqim taymauti va mijoz tomonidan bekor qilish hali ham
amal qiladi (`open-sse/executors/kiro/reasoning.ts`).

**Yakuniy holatlar (kutish davrlari EMAS):**

- `banned` — taqiqlangan kalit so‘z/hisobni taqiqlash aniqlanganda (qarang: [TAQIQNI ANIQLASH](../security/BAN_DETECTION.md)) hamda yuqori oqim tomonidan har bir so‘rov bo‘yicha ketma-ket uchta rad javobidan keyin (`request_rejected`, masalan, Anthropic OAuth 403 "So‘rovga ruxsat berilmagan" — `open-sse/services/requestRejectedStreak.ts`) o‘rnatiladi; bitta rad javobi faqat ulanishni kutish davriga o‘tkazadi
- `expired` (cheklangan takroriy urinishlardan keyin yakuniy holatga o‘tadi — eksponensial kechiktirish bilan `EXPIRED_RETRY_MAX = 3` — shuning uchun vaqtinchalik OAuth xatolari hisob butunlay faolsizlantirilishidan oldin o‘z-o‘zidan tiklanishi mumkin)
- `credits_exhausted`

Bu holatlar hisob ma’lumotlari o‘zgarmaguncha yoki operator ularni qayta o‘rnatmaguncha saqlanib qoladi. Yakuniy holatlarni vaqtinchalik kutish davri holati bilan almashtirmang.

**Kechiktirilgan tiklanish:** `rateLimitedUntil` vaqti o‘tgach, ulanish yana tanlash uchun yaroqli bo‘ladi. Muvaffaqiyatli foydalanilganda, `clearAccountError()` barcha xato maydonlarini tozalaydi.

### Claude OAuth foydalanish chegarasi: pastroq ustuvorlikdagi yo‘lak + seans chegarasini qayta o‘rnatish

**Qamrov:** bitta Claude obunasi (OAuth) ulanishi. Har ikkala xususiyat ham **har bir ulanish uchun ixtiyoriy ravishda yoqiladi**
(Ulanishni tahrirlash → Claude bo‘limi → `providerSpecificData` ichidagi `lowPriorityMode` / `autoLimitReset`,
ikkalasi ham standart holatda o‘chiq) va Claude Code'ning `/low-priority` hamda
`/limit-reset` buyruqlarini aks ettiradi (uzatish protokoli Claude Code 2.1.263 versiyasidan olingan).

**Amalga oshirilishi:**

- Holatlar avtomati + javobni tasniflash: `open-sse/services/claudeLowPriority.ts`
- Qayta o‘rnatish holati/talab mijozi: `open-sse/services/claudeLimitReset.ts`
- Ijrochi ilgagi (sarlavha kiritish + ayni hisob bilan qayta urinish): `open-sse/executors/base.ts::execute()`
- Ixtiyoriy yoqish holatini saqlash: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Ishga tushirish sharti:** 5 soatlik foydalanish chegarasi — sarlavhalarida
`anthropic-ratelimit-unified-status: rejected` va hisob bunga mos bo‘lganda
`anthropic-ratelimit-unified-slow-offer: treatment` mavjud bo‘lgan `429`. Ushbu birinchi chegara
429 javobidan oldin hech narsa yuborilmaydi; yagona sarlavhalarsiz kelgan keskin 429 javobi
odatiy kutish davri yo‘lidan o‘tadi.

**Pastroq ustuvorlikdagi yo‘lak** (`lowPriorityMode`):

- Chegaradagi 429 holatida ijrochi taklifni qabul qiladi va darhol **xuddi shu**
  hisob bilan `anthropic-usage-limit: slow` orqali qayta urinadi; yoʻlak eʼlon qilingan
  `anthropic-ratelimit-unified-reset` vaqtigacha (+60 soniyalik zaxira) faol qoladi va shu
  oraliqdagi har bir soʻrov ushbu sarlavhani olib yuradi. Ushlab qolingan 429 javobi hech
  qachon `handleChatCore` ga yetib bormaydi, shuning uchun ulanish **sovutish** holatiga
  oʻtkazilmaydi va undan boshqa ulanishga almashtirilmaydi.
- Keyingi javoblardagi `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  yoʻlakni saqlab qoladi; `slot_busy` (429) yoki `529` serverning
  `anthropic-ratelimit-unified-slow-retry-after` vaqtini kutadi (standart 20 soniya,
  5–600 soniya oraligʻida cheklanadi, ±30% tasodifiy ogʻish) va qayta urinadi; bu
  `anthropic-ratelimit-unified-slow-max-wait` bilan cheklanadi (standart 20 daqiqa,
  1 daqiqa–6 soat oraligʻida cheklanadi) — bu muddatdan oʻtilgach, yoʻlak tugaydi va
  10 daqiqalik sovutish qayta qabul qilishni bloklaydi. Kutish vaqti, shuningdek,
  soʻrovning oʻz yuqori oqimni boshlash taymautidan qolgan vaqt
  (`resolveFetchStartTimeout`, standart 10 daqiqa) minus 5 soniyalik zaxira bilan
  cheklanadi: bu cheklovsiz standart 20 daqiqalik maksimal kutish soʻrov muddatidan
  oshib ketadi va uyqu kutish oʻrtasida bekor qilinib, silliq `max_wait` yakuni +
  sovutish oʻrniga `TimeoutError` yuzaga chiqadi.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 soatlik oyna yangilanishi
  yoki `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (pulli ortiqcha
  foydalanish endi chegarani qoplagani uchun, har qanday holatda uni `extra_usage`
  sifatida yakunlaydi) yoʻlakni tugatadi; shundan keyin javob odatiy sovutish yoʻliga
  oʻtadi. `budget_exhausted` eʼlon qilingan budjet tiklanishigacha (≤ 8 kun) eslab
  qolinadi.
- Chegara tekshiruvi ijrochining 400 sababli bir urinish ichidagi oʻz qayta urinishlaridan
  (kontekstni tahrirlash, fikrlash/harakat chegaralari, parametrlarni avtomatik oʻrganish)
  keyin ishlaydi, shu sababli faqat shu qayta urinishlardan birida yuzaga chiqadigan
  chegaraviy 429 ham sovutish yoʻliga yetib borish oʻrniga ushlab qolinadi.
- Holat har bir ulanish uchun xotirada saqlanadi (qayta ishga tushirish qayta qabul qilish
  uchun bitta qoʻshimcha chegaraviy 429 talab qiladi).

**Seans chegarasini tiklash** (`autoLimitReset`, ikkalasi ham yoqilganida yoʻlakdan oldin sinab koʻriladi):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  bloki; `arm: "reset"` va `available: true` boʻlganda,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` quyidagi
  qiymat bilan: `{ "program": "juniper_tide" }` (tashkilot UUID-si
  `providerSpecificData.organizationUUID` dan, boshlangʻich yuklash zaxira varianti bilan).
- `result: reset|not_limited` → soʻrov toʻliq tezlikda qayta yuboriladi (sekinlashtirish
  sarlavhasisiz). `already_used` / `not_offered` `next_available_at` qiymatini eslab qoladi
  (standart bir hafta); har qanday xatolik 15 daqiqalik ortga chekinishga olib keladi.
  Tiklash haftasiga bir marta amalga oshiriladi va baribir haftalik limitga qoʻshiladi.

Regressiyadan himoya tekshiruvlari: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Seansga bogʻliqlik (#7274)

**Qamrov:** istalgan provayder uchun bitta ulanishga biriktirilgan bitta mijoz seansi (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` sarlavhasi).

**Maqsad:** koʻp bosqichli agentni (Claude Code, aider, maxsus agentlar) soʻrovlar davomida bir xil hisobda saqlash, shu orqali hisoblararo kontekst yoʻqolishini va har bir hisobga tegishli seans holatiga ega provayderlarda takroriy sovuq ishga tushish 429 xatolarini kamaytirish.

**Amalga oshirish:**

- TTL ni aniqlash: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Biriktirishni tanlash/yaratish: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Sarlavhani ajratib olish (umumiy, istalgan provayder): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Doimiy saqlanadigan biriktirish jadvali: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Sozlama: `sessionAffinityTtlMs` (ms dagi global TTL, `0` oʻchiradi) — `src/lib/db/settings.ts`. U faqat Codex uchun moʻljallangan `codexSessionAffinityTtlMs` nomidan `124_generic_session_affinity_ttl.sql` migratsiyasi orqali qayta nomlangan; migratsiya avval sozlangan har qanday Codex TTL qiymatini yangi standart qiymat sifatida koʻchiradi.

#7274 dan oldin `resolveSessionAffinityTtlMs()` `codex` dan boshqa har bir provayder uchun darhol `0` qaytarardi, shu sababli biriktirish mexanizmi va sarlavhalarni ajratib olish allaqachon provayderga bogʻliq boʻlmaganiga qaramay, TTL sozlamasi (va seans sarlavhalari) boshqa joylarda hech qanday taʼsir koʻrsatmasdi. Tuzatish ushbu erta qaytishni olib tashladi; TTL endi global miqyosda `0` dan katta qilib sozlangach, barcha provayderlarga bir xil tatbiq etiladi.

Seansga bogʻliqlikning uchta sarlavhasi hech qachon yuqori oqimga uzatilmaydi — ijrochilar mijoz sarlavhalarini bevosita uzatish oʻrniga oʻzlarining yuqori oqim sarlavhalarini noldan tuzadilar, shu sababli bu faqat ichki korrelyatsiya identifikatori boʻlib qoladi.

### Eksklyuziv boshqariladigan seans ulanishi ijaralari

**Qamrov:** bitta faol boshqariladigan HTTP mijozi/seansi bitta mos OmniRoute ulanishiga egalik qiladi.

**Maqsad:** soʻrovlar davomida qatʼiy marshrutlash chegarasiga muhtoj mijozlarga ulanish ustidan
barqaror eksklyuziv egalikni taqdim etish. Bu yumshoq uzluksizlik afzalligi boʻlgan seansga
bogʻliqlikdan farq qiladi: eksklyuziv ijara hayotiy sikl holatini SQLite da saqlaydi, global faol
egalik qiluvchi va faol ulanishning yagonaligini taʼminlaydi hamda provayderga uzatishdan oldin
eskirgan avlodni rad etadi.

Bu xususiyat har bir API kaliti uchun ixtiyoriy ravishda yoqiladi. Boshqariladigan kalit
`lease:exclusive` doirasiga va aniq koʻrsatilgan, boʻsh boʻlmagan `allowedConnections` roʻyxatiga
ega boʻlishi kerak. Har qanday HTTP mijozi hayotiy sikl oxirgi nuqtasidan foydalanishi mumkin;
mijoz nomi, user-agent, provayder, OAuth usuli yoki model talab qilinmaydi. Ijara modelga emas,
ulanishga egalik qiladi, shuning uchun ulanish odatiy tartibda mos boʻlib qolguncha modelni
oʻzgartirish bogʻlanishni saqlab qoladi. Oddiy model, kvota, salomatlik, sovutish va ruxsat
roʻyxati qoidalari ustuvor boʻlib qoladi hamda shu avlodni boshqa boʻsh va mos ulanishga
oʻtkazishi mumkin.

Hayotiy sikl JSON amallari `acquire`, `renew` va `release` bilan `POST /api/v1/session-leases` orqali boshqariladi.
Boshqariladigan inferensiya soʻrovlari shaffof boʻlmagan `X-OmniRoute-Lease-Owner` qiymatini va aniq
`X-OmniRoute-Lease-Generation` qiymatini taqdim etadi. Egasi `vlo_` dan keyin keladigan 43 ta base64url belgisidan iborat; faqat
uning SHA-256 xeshi saqlanadi. Har bir yakuniy joʻnatish toʻsigʻi autentifikatsiya qilingan API kaliti IDsi va
faol ulanish IDsini ham bogʻlaydi. Ijarani boshqarish sarlavhalari jurnallardan, saqlab qolingan soʻrov snapshotlaridan va
yuqori oqim ijrochi sarlavhalaridan olib tashlanadi.

Agar odatiy marshrutlashda mos boshqariladigan nomzodlar mavjud boʻlsa-yu, ammo har bir boʻsh nomzod
begona faol ijara bilan band boʻlsa, OmniRoute HTTP `429`, lease-capacity-unavailable kodi,
sigʻim kutilmoqda holati va eng yaqin tegishli amal qilish muddati tugashidan kelib chiqib hisoblangan, chegaralangan `Retry-After` qiymatini qaytaradi.
Mos nomzodlarning odatiy tarzda mavjud emasligi ijara ziddiyati hisoblanmaydi va mavjud marshrutlash xatosi semantikasini saqlab qoladi.

Tegishli mexanizmlar alohida qoladi:

- OAuth sessiyasi bandligi OAuth hisoblari uchun jarayon doirasidagi yumshoq taqsimotdir.
- Hisob semaforlari soʻrovlarning parallel bajarilishi uchun ruxsatlar beradi va soʻrov yakunlanganda tugaydi.
- Eksklyuziv boshqariladigan sessiya ijaralari avlod toʻsigʻiga ega barqaror hayotiy sikl egaligidir.

---

## 3. Model bloklanishi

**Qamrov:** provayder + ulanish + model uchligi.

**Holat bo‘yicha kalit qamrovi:** bloklanish qaysi kalitga yozilishini xatolik holati belgilaydi
(`open-sse/services/accountFallback/exactModelLock.ts` ichidagi `resolveLockoutScope()`):

- `429` / `403` / `402` — kvota yoki foydalanish huquqi signali — **kvota oilasi**ni bloklaydi:
  codex uchun butun `codex` / `spark` qamrovi (ulanishdagi har bir `gpt-5*`
  modeli), boshqa provayderlar uchun `getQuotaScopedModelForProvider()`.
- `404` faqat modelning o‘zini bloklaydi (`getModelLockKey()` `not_found` qamrovini toraytiradi).
- Boshqa har qanday holat — `5xx` transport/server xatoliklari va sifat tekshiruvi
  natijasida OmniRoute tomonidan sintez qilingan `502` — faqat **aniq**
  provayder/ulanish/model uchligini bloklaydi. Bitta modeldagi nosoz oqim akkaunt
  kvotasi haqida dalil emas; ushbu qoidadan oldin `codex/gpt-5.6-luna` dagi
  bitta bo‘sh javob, kvotaga ta’sir qilmagan holda, o‘sha ulanishdagi barcha
  `gpt-5*` modellarini marshrutlashdan 2–30 daqiqaga (bosqichma-bosqich oshib boruvchi)
  chiqarib tashlardi.
- Chaqiruvchining aniq ko‘rsatilgan `scope` opsiyasi har doim ustun turadi (Antigravity `"exact"` uzatadi).

**Maqsad:** faqat bitta model mavjud bo‘lmaganda yoki kvotasi cheklanganda butun ulanishni o‘chirib qo‘ymaslik.

**Misollar:**

- 429 qaytaradigan har bir model uchun alohida kvotaga ega provayderlar
- Bitta mavjud bo‘lmagan model uchun 404 qaytaradigan lokal provayderlar
- Provayderga xos rejim/model ruxsati xatoliklari (masalan, Grok rejimlari)

**Amalga oshirish:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model kutish davrlari boshqaruv paneli (v3.8.0)

UI: Sozlamalar → Model kutish davrlari (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Faol bloklanishlarni quyidagilar bilan ro‘yxatlaydi: provayder, ulanish, model, sabab, expiresAt. Operatorlar kartadan modelni qo‘lda qayta yoqishlari mumkin.

**REST API:**

- `GET /api/resilience/model-cooldowns` — faol bloklanishlarni ro‘yxatlash
- `DELETE /api/resilience/model-cooldowns` — qo‘lda qayta yoqish. Tana: `{provider, connection, model}`. Autentifikatsiya: boshqaruv.

### Kutish davri menejeri

UI: Monitoring → Kutish davri menejeri (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Har bir provayder sahifasini alohida ochish o‘rniga, vaqtinchalik sabab tufayli
marshrutlashdan chiqarilgan barcha ulanishlar uchun bitta sahifa. U ulanishlarning
kutish davrlarini, model bloklanishlarini va terminal holatlarni ro‘yxatlaydi;
ularni har bir ulanish, tanlangan ulanishlar yoki provayderning barcha ulanishlari
uchun tozalaydi hamda eng ko‘p sozlanadigan kutish davri qoidalarini tahrirlaydi:
`streamStallCooldown.enabled` va OAuth / API-kalit `connectionCooldown` asosiy
kutish davri hamda maksimal ortga chekinish bosqichlari (`PATCH /api/resilience`
orqali saqlanadi). Terminal holatlar (`banned`, `expired`, `credits_exhausted`)
ro‘yxatga olinadi, ammo bu yerda hech qachon tozalanmaydi.

**REST API** (`src/lib/resilience/cooldownManager.ts`, autentifikatsiya: boshqaruv):

- `GET /api/resilience/cooldowns[?provider=]` — holati, qolgan kutish davri,
  ortga chekinish darajasi, oxirgi xatolik turi va model bloklanishlari bilan ulanishlar (hisob ma’lumotlarisiz)
- `POST /api/resilience/cooldowns` — tana `{connectionIds: string[]}` yoki
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` qaytaradi

### Bloklanish sozlamalari UI’i + muvaffaqiyat orqali pasaytirib tiklash (v3.8.23)

Model bloklanishi doimo yoqilgan, kodga qattiq yozilgan xatti-harakatdan o‘zining
sozlamalar kartasi va o‘zini-o‘zi tiklash yo‘liga ega, to‘liq sozlanadigan hamda
ixtiyoriy yoqiladigan funksiyaga aylandi.

**Sozlamalar kartasi:** Sozlamalar → Model bloklanishi
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Bu yuqoridagi faqat o‘qish uchun mo‘ljallangan `ModelCooldownsCard`dan (u faqat
faol bloklanishlarni _ro‘yxatlaydi_) **farq qiladi** — yangi karta _parametrlarni sozlaydi_. Standart qiymatlar
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) ichida joylashgan:

| Sozlama                 | Standart qiymat                  | Ma’nosi                                                                         |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Asosiy almashtirgich — model bloklanishi **standart holatda o‘chiq**.           |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Model qamrovidagi xatolik sifatida hisoblanadigan yuqori oqim holatlari.        |
| `baseCooldownMs`        | `120_000` (120 s)                | Birinchi xatolik uchun boshlang‘ich bloklanish davomiyligi.                     |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Bosqichma-bosqich oshiriladigan kutish davrining yuqori chegarasi.              |
| `maxBackoffSteps`       | `10`                             | Eksponensial ortga chekinishni oshirish bosqichlarining maksimal soni.          |
| `useExponentialBackoff` | `true`                           | Takroriy xatoliklar kutish davrini eksponensial ravishda oshirish-oshirmasligi. |

Sozlamalar odatiy sozlamalar ombori orqali saqlanadi va barqarorlik sozlamalari
sxemasi orqali tekshiriladi; karta `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` sharti bilan) va `maxBackoffSteps` qiymatlarini
ruxsat etilgan chegaralarga keltiradi.

**Muvaffaqiyat orqali pasaytirib tiklash:** tiklanish **faqat** taymer muddati
tugashiga bog‘liq emas. Sog‘lom javob modelning xatoliklar sonini bosqichma-bosqich
kamaytiradi, natijada davr o‘rtasida tiklangan model taymer muddati tugashidan
oldin oshishni to‘xtatadi (va bloklanishdan chiqariladi). Muvaffaqiyatli kombinatsiya
nishonida `open-sse/services/combo.ts` ichidan `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) chaqiriladi, u saqlangan
`failureCount` qiymatini **yarmiga kamaytiradi** (`Math.floor(failureCount / 2)`);
qiymat `0` ga yetganda bloklanish yozuvi butunlay o‘chiriladi. Unga mos
`recordModelLockoutFailure()` eskalatsiya oynasidagi xatoliklarda hisoblagichni
oshiradi (va kutish davrini uzaytiradi). Muvaffaqiyat orqali pasaytirish oddiy
taymer muddati tugashiga qo‘shimcha ravishda ishlaydi — har ikkala yo‘l ham modelni qayta yoqishi mumkin.

**Holat:** bloklanishlar DB’da saqlanmaydi, balki **xotirada** (`provider:connectionId:model`
bo‘yicha kalitlangan har bir jarayonga tegishli `ModelLockoutEntry` `Map`lari,
aniq qamrovli bloklanishlar esa `provider:connectionId:exact:model` bo‘yicha)
saqlanadi — qayta ishga tushirishda ular yo‘qoladi. _Sozlamalar_ doimiy saqlanadi;
faol bloklanish _holati_ esa vaqtinchalik.

---

## 4. Quota-Share parallellik boshqaruvi (v3.8.36)

Obuna hisoblari (GLM, MiniMax va boshqalar) ko‘pincha bir vaqtning o‘zida faqat ~1–3 ta
so‘rovni qabul qiladi; bundan oshib ketish 429 xatolari va kutish davrlarini keltirib chiqaradi. Bu
bir nechta API kaliti bitta yuqori oqimdagi hisobni ulashadigan **quota-share** (`qtSd/…`)
kombinatsiyalarida ayniqsa keskin namoyon bo‘ladi. Uchta qatlam umumiy hisobning so‘rovlar bilan
haddan tashqari yuklanishiga yo‘l qo‘ymaydi.

### Har bir ulanish uchun parallellik chegarasi (`max_concurrent`)

Har bir provayder ulanishi `max_concurrent` yuqori chegarasini e’lon qilishi mumkin
(`provider_connections.max_concurrent`, ulanish modal oynasi / API / DB orqali o‘rnatiladi).
Cheklov bo‘lmasligi uchun uni bo‘sh qoldiring. Bu quyidagi ketma-ketlashtirish
qatlamini boshqaradigan yagona sozlama — uni hisobning haqiqiy parallelligiga
o‘rnating (masalan, GLM ~1, MiniMax ~2).

### Har bir model uchun parallellik chegaralari (`modelConcurrency`)

Ulanish o‘zining `rateLimitOverrides` xaritasi ichida har bir model uchun aniq
parallellik chegaralarini qo‘shimcha ravishda e’lon qilishi mumkin:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Uni ulanish modal oynasida (**Rate limit overrides → Per-model
concurrency caps**, har bir qatorda bittadan `model=cap`) yoki ayni JSON
tuzilmasi bilan `PATCH /api/providers/[id]` orqali o‘rnating. Kalit semantikasi:

- **Butun ulanish bo‘yicha va muayyan model uchun:** `maxConcurrent` butun
  ulanish uchun umumiy yuqori chegara bo‘lib qoladi. Ikkalasi ham qo‘llanilganda,
  ikkala shlyuz bir xil kompozit shlyuzda atomar tarzda egallanadi
  (`global → provider → account → model`); amaldagi xatti-harakatni
  qo‘llaniladigan qat’iyroq chegara belgilaydi.
- **Model kalitining aniq mosligi:** kalit — marshrutlash aniqlanganidan keyin
  ijro mexanizmiga uzatiladigan model satri; odatda bu mijoz tomonidagi
  `provider/model` taxallusi emas, balki yuqori oqim modelining oddiy identifikatoridir
  (`glm-5`); `zai/glm-5` esa `glm-5` bilan mos kelmaydi. Qiymatlar bir vaqtda
  bajariladigan so‘rovlar uchun musbat butun sonli yuqori chegaralardir.
- **Mahalliy navbatga qo‘yish, aniqlashsiz:** ortiqcha so‘rovlar mavjud
  navbat/vaqt tugashi semantikasiga muvofiq mahalliy navbatga qo‘yiladi
  (turlashtirilgan `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` qabul qilish
  xatolari). OmniRoute yuqori oqim siyosatini aniqlamaydi yoki xulosa qilib
  chiqarmaydi — u operator sozlagan aniq chegaralarni qo‘llaydi. To‘yingan model
  shlyuzi provayderni hech qachon o‘chirib qo‘ymaydi va modelning doimiy
  bloklanishiga olib kelmaydi; yuqori oqimdagi 429/kutish davri/zaxira variantiga
  o‘tish xatti-harakati xatolarga qarshi so‘nggi himoya bo‘lib qoladi.
- **Har bir ulanish va har bir jarayon doirasi:** chegaralar ma’lumotlar
  bazasidagi har bir ulanish uchun alohida bo‘lib, xotirada saqlanadi, shuning
  uchun ayni yuqori oqim API kalitidan qayta foydalanadigan ikkita ulanish
  o‘zaro muvofiqlashtirilmaydi.
- **Sozlanmagan bo‘lsa, o‘zgarishsiz qoladi:** xaritani ko‘rsatmaslik (yoki
  boshqaruv panelidagi maydonni bo‘sh qoldirish) hech qanday model shlyuzini
  qo‘shmaydi. Hech qanday universal provayder chegarasini da’vo qilmaydigan
  namuna konfiguratsiya:

```text
glm-5=1
glm-4.7=3
```

### Quota-share so‘rovlarini ketma-ketlashtirish

Quota-share jo‘natmasi musbat `max_concurrent` qiymatini e’lon qilgan ulanishni
nishonga olganda, ushbu **hisob** uchun parallel so‘rovlar har bir ulanish
semafori (`qsconn:<connectionId>` kaliti) orqali ketma-ketlashtiriladi: ortiqcha
so‘rovlar hisobni haddan tashqari yuklash o‘rniga **navbatda kutadi**. U
**fail-open** tamoyilida ishlaydi — to‘yingan navbat yoki vaqt tugashi jo‘natilishi
mumkin bo‘lgan so‘rovni rad etish o‘rniga slotsiz davom etadi. Uni
**Settings → Resilience → Quota-share per-connection concurrency**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, standart bo‘yicha
yoqilgan) bo‘limida almashtiring. `max_concurrent` chegarasisiz xatti-harakat
o‘zgarmaydi.

> Quota-share marshrutlash shlyuzining (`selectQuotaShareTarget`, DRR + P2C) o‘zi
> fail-open tamoyilida ishlaydi va faqat _chegaraga yetgan_ ulanishning ustuvorligini
> pasaytiradi — bitta ulanishli pulda u qat’iy cheklov o‘rnata olmaydi, shu sababli
> oqimni amalda aynan shu semafor cheklaydi.

### Kutish davrini hisobga oluvchi combo qayta urinishi

Har bir combo strategiyasi uchun (yoqilganda), QISQA vaqtinchalik kutish davri
tufayli 429 xatosini qat’iylashtirishi mumkin bo‘lgan so‘rov 429 ni qaytarish
o‘rniga uning tugashini kutadi va qayta jo‘natiladi — bu bir nechta modelli
combo’larda Gemini turidagi TPM/RPM oynalarini (~60s retry-after) qamrab oladi,
masalan, 2 modelli combo’ning ikkala nishoni ham har bir model uchun tezlik
chegarasiga duch kelganda. **Settings → Resilience** bo‘limidagi
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) bilan
cheklanadi. U `quota_exhausted` (yarim tungacha bloklangan) yoki autentifikatsiya/topilmadi
sabablarida hech qachon kutmaydi.

---

## 5. Soʻrovlar navbatiga qabul qilish nazorati (v3.8.49 · issue #6593)

**Qamrov**: har bir provider+connection uchun mahalliy tezlikni cheklash navbati (`open-sse/services/rateLimitManager.ts`,
Bottleneck asosida ishlaydi), yuqoridagi uchta mexanizmdan bir pogʻona pastda.

**`maxWaitMs` navbatda kutishni cheklaydi; `executionMaxWaitMs` bajarilishni cheklaydi.**
Bu ikkalasi ataylab alohida qilingan va hech biri boshqasiga taʼsir qilmaydi.

`resilienceSettings.requestQueue.maxWaitMs` — **navbatda kutish byudjeti**:
u provider slotini kutish va keyin QUEUED holatida turish vaqtini qamrab oladi; vazifa
QUEUED holatidan chiqib, bajarilishni boshlashi bilanoq uning taymeri tozalanadi
(`rateLimitManager.ts`, `wrappedFn`). Bu chegaradan oshgan soʻrov upstreamʼga
hech qachon yetib bormaydi. Standart qiymat 30000ms boʻlib,
`src/lib/resilience/settings.ts` ichidagi `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
orqali beriladi va `tests/unit/ratelimit-admission-control-6593.test.ts`
tomonidan mustahkamlangan; shu sababli uni oʻzgartirish bu paragrafning sezdirmay
eskirib qolishiga emas, balki testning xato bilan yakunlanishiga olib keladi.

`resilienceSettings.requestQueue.executionMaxWaitMs` — Bottleneck vazifaning
`expiration` qiymati sifatida qabul qiladigan parametr boʻlib, uning taymeri
faqat yuborilgandan keyin ishga tushadi. U oʻz upstream kutish vaqti chekloviga
ega boʻlmagan ijrochilar uchun zaxira himoya vazifasini bajaradi va ijrochining
fetch boshlanishi uchun oʻz kutish vaqti uzoqroq boʻlsa, shu qiymatgacha
oshiriladi; shu sababli u bajarilayotgan sogʻlom javobni muddatidan oldin
toʻxtata olmaydi. Standart qiymat 600000ms (10 daqiqa).

Navbat byudjetini `expiration` qiymatiga uzatish avval inkremental boʻlmagan
gatewayʼlarni bajarilish oʻrtasida toʻxtatib qoʻyar edi — ular dastlabki baytlar
kelgunicha qonuniy ravishda bir necha daqiqa ishlashi mumkin — va aynan shu
sababli amal qilish muddati tugashi `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) sifatida koʻrsatiladi, navbat byudjeti
esa navbat kutish vaqti tugashi kodini olib yuradi. Istalgan birini
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) yoki boshqaruv
panelidagi (**Settings → Resilience**) sozlama orqali qayta belgilang. Har ikkisi
normallashtirish vaqtida 1ms–24h oraligʻiga cheklanadi.

**Har ikkisi uchun ustuvorlik tartibi:** env var faqat _standart_ qiymatni beradi.
`resilienceSettings.requestQueue` ichida saqlab qoʻyilgan qiymat (boshqaruv
paneli / API patch orqali, `key_value` ichida saqlanadi) undan ustun keladi,
har bir ulanishga xos `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` esa undan ham ustun keladi. Shu sababli allaqachon saqlab
qoʻyilgan qiymatga ega deploymentʼda env varʼni oʻrnatish hech narsani
oʻzgartirmaydi — buning oʻrniga saqlangan sozlamani tozalang yoki yangilang.

Navbatda turish vaqti `maxWaitMs` bilan cheklanadi; quyidagi `maxQueueDepth` esa
bir vaqtning oʻzida qancha chaqiruvchi navbatga qoʻyilishi mumkinligini cheklaydi.

**`maxQueueDepth` — ixtiyoriy qabul qilish chegarasi (yangi).** `resilienceSettings.requestQueue.maxQueueDepth`
bir provider+connection uchun bir vaqtning oʻzida navbatda turishi mumkin
boʻlgan (hali yuborilmagan) soʻrovlar sonini cheklaydi. Navbatda allaqachon
`maxQueueDepth` ta soʻrov boʻlsa, yangi soʻrov `limiter.schedule()` ga yetib
bormasidan **oldin** typed `code: "RATE_LIMIT_QUEUE_FULL"` xatosi bilan darhol
rad etiladi — shu sababli rad etish kam resurs talab qiladi va ushbu soʻrov uchun
har qanday keyingi promptni siqish / tarjima qilish ishlaridan oldin sodir
boʻladi. Standart qiymat `0` = oʻchirilgan, bu mavjud cheklanmagan navbat
xatti-harakatini saqlab qoladi; diapazon 0–100000 bilan cheklangan.
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) yoki
`resilienceSettings.requestQueue.maxQueueDepth` (boshqaruv paneli/API patch)
orqali qayta belgilang.

Qabul qilish tekshiruvining oʻzi sof funksiya
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) boʻlib,
uni haqiqiy Bottleneck limiterʼisiz unit-test qilish mumkin.

> #6593ʼni boshlagan RFC hujjatida `bypassCompressionOnRateLimit`
> flag ham taklif qilingan. Ushbu repoʼdagi `open-sse/services/compression/`
> pipelineʼi sintez qilingan 429 javob tanalaridagi HTTP javobini siqish emas,
> balki chiquvchi LLM soʻrovidagi prompt/context siqish mexanizmidir (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` bloki atrofida);
> literal bypass flag uchun mos kod yoʻli mavjud emas. Hozirda ushbu
> promptni siqish bosqichi soʻrov pipelineʼida `withRateLimit()`dan _oldin_
> bajariladi, shuning uchun navbat toʻliqligi sababli rad etilganda uni oʻtkazib
> yuborish uchun tartibni oʻzgartirish ushbu issue qamrovidan alohida va kattaroq
> oʻzgarishdir; bu yerda u ataylab amalga oshirilmadi va protsessor resurslarini
> tejash foydasi tartibni oʻzgartirish xavfiga arziydigan boʻlsa, keyingi vazifa
> sifatida qoldirildi.

---

## 6. Sekin oqim o‘tkazuvchanligi nazoratchisi (#9709)

Ixtiyoriy `resilienceSettings.streamRecovery.throughputWatchdog` himoya mexanizmi
yuqori oqim hali ham bo‘laklarni yuborayotgan, ammo sozlangan foydali chiqish
tezligidan past darajada assistent chiqishini ishlab chiqarayotgan holatni aniqlaydi.
U ataylab bo‘sh turish taym-autidan alohida qilingan: heartbeat va metama’lumotlar
hech bir taymerni qayta o‘rnatmaydi va jarayon siljishi sifatida hisoblanmaydi. U,
shuningdek, chiqish sifatidan qat’i nazar mutlaq xavfsizlik chegarasi bo‘lib qoladigan
urinishning qat’iy muddatidan (#9153) ham alohida.

Nazoratchi urinishni to‘xtatishidan oldin qizdirish davri va undan keyin to‘liq
sirpanma oyna o‘tishini talab qiladi. U Chat Completions va Responses API chiqish
hodisalaridagi matn deltalarini hisoblaydi (UTF-8 baytlarining konservativ
proksi-o‘lchovi), faqat foydalanish ma’lumotlarini o‘z ichiga olgan va bo‘sh
hodisalarni e’tiborsiz qoldiradi hamda tool-call yoki reasoning hodisalari
bajarilayotgan paytda baholashni to‘xtatib turadi. U sukut bo‘yicha o‘chirilgan
va `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` orqali yoqilishi mumkin; oyna,
qizdirish davri, minimal tezlik va o‘lchanadigan minimal chiqish odatiy
resilience-settings normallashtirish qatlami tomonidan chegaralanadi.

Yoqilganda, nazoratchining to‘xtatishi faqat faol yuqori oqim urinishiga qo‘llanadi.
Mijozga ko‘rinadigan biror bayt yuborilishidan oldin mavjud bir xil hisob qaydnomasi
doirasidagi erta tiklash yo‘li urinishni qayta ochishi mumkin. Tasdiqlashdan keyin
oqim hech qachon ko‘r-ko‘rona qayta ijro etilmaydi; faqat mavjud xavfsiz o‘rta-oqim
davom ettirish shartnomasi suffiksni ulashi mumkin. Yakunlash bir martalik bo‘lib
qoladi, shuning uchun foydalanishni hisobga olish va semaforni bo‘shatish
takrorlanmaydi.

---

## 7. Yuqori oqim statusini qayta belgilash (noto‘g‘ri ko‘rsatilgan kvota xatolari)

**Qamrov:** vaqtinchalik kvota tugashini noto‘g‘ri HTTP statusi bilan bildiradigan bitta yuqori oqim shlyuzi.

**Maqsad:** tasniflashdan OLDIN chalg‘ituvchi statusni tuzatish, shunda quyi oqim iste’molchilari (fallback engine, combo aggregation, mijozga yo‘naltirilgan javob) xatoning aslida qayta urinish mumkin bo‘lgan tabiatini ko‘radi.

Ayrim shlyuzlar VAQTINCHALIK kvota tugashini qayta urinish mumkin bo‘lmagan HTTP
statusi bilan bildiradi. `agentrouter.org` standart `429` o‘rniga xitoycha matnli
(`用户额度不足` / `额度不足`) `403` (ba’zan `400`) qaytaradi. Claude Code kabi
mijozlar `403` statusini doimiy deb hisoblab, sessiyani to‘xtatadi; tuzatishsiz
fallback engine uni kvota hodisasi o‘rniga `AUTH_ERROR` sifatida tasniflaydi.

**Amalga oshirish:**

- Reyestr + moslashtiruvchi: `open-sse/config/upstreamStatusRestatement.ts` —
  har bir provayder uchun qoidalar ro‘yxati (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()` orqali
  moslashtiriladi.
- Chaqiruv joyi: `open-sse/handlers/chatCore.ts` faylidagi `providerFailure:`
  bloki (taxminan 3654-qator), `parseUpstreamError()` xato HTTP statusiga ega
  yuqori oqim javobini (`!providerResponse.ok`) tahlil qilganidan keyin va har
  qanday tasniflash bajarilishidan oldin, shunda barcha quyi oqim iste’molchilari
  tuzatilgan statusni ko‘radi. `200` SSE oqimi ichiga joylangan xatolar alohida,
  keyinroq bajariladigan oqimni tahlil qilish yo‘lidan o‘tadi va bugungi kunda
  bu hook tomonidan **qamrab olinmaydi** — bu ma’lum cheklov bo‘lib, hozircha
  agentrouter’ning noto‘g‘ri statusi uchun kerak emas (chunki u xato HTTP
  statusi sifatida yuzaga chiqadi).
- Qayta urinishga yaroqlilik: `429` `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) tarkibiga kiradi, shuning
  uchun qayta belgilangan xato o‘lik `403` sifatida ko‘rinish o‘rniga haqiqiy
  qayta urinish oynasiga ega bo‘ladi.
- Sun’iy `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) faqat
  qayta belgilangan javob **mijozga** bildiradigan qiymatdir; u ulanishning ichki
  sovush/bloklanish davomiyligi emas — bu qayta belgilangan xatoni amalda qayta
  ishlaydigan mexanizm tomonidan alohida boshqariladi (Connection Cooldown’ning
  bosqichma-bosqich ortuvchi kechikishi, §2, API kaliti provayderlari uchun
  asosiy qiymat `3s`; yoki agentrouter kabi har bir model kvotasiga ega
  provayderlar uchun Model Lockout, §3). Router mijozga e’lon qilgan 60s
  oynadan ertaroq ichki qayta urinishga yaroqli bo‘lishi mumkin — bu ataylab
  qoldirilgan zaxira, xato emas.

Doimiy xatolar (agentrouter’ning `无权访问模型` — bu modeldan foydalanish huquqi
yo‘q) HECH QACHON qayta belgilanmaydi: `textMarkers` mos kelganida ham
`excludeMarkers` qoidani bekor qiladi, shuning uchun xato o‘zining asl statusini
saqlab qoladi va hech narsa uni cheksiz qayta urinmaydi. Mos keluvchi provayder
tasniflash qoidasi
(`open-sse/config/providerErrorRules.ts` ichidagi `agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, e’lon qilingan asosiy sovush muddati
`6h`) `checkFallbackError` (`open-sse/services/accountFallback.ts`) tomonidan
umumiy apikey toifasidagi `FORBIDDEN` erta qaytarilishidan _oldin_ tekshiriladi;
bu `honorsRuleLockScope(provider)` bilan cheklangan (#10334 — hozirda
`providerErrorRules.ts` ichidagi `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ruxsat
ro‘yxati orqali faqat agentrouter uchun). Qoidada e’lon qilingan 6h sovush
muddati `fallbackResult.baseCooldownMs` sifatida uzatiladi, ammo u baribir
avvaldan mavjud har bir model kvotasi uchun bloklash yo‘liga
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, sovush muddati
manbasidan tashqari #10334 bilan o‘zgartirilmagan) beriladi: u boshqa barcha
model bloklashlari kabi operatorning `mlSettings.maxCooldownMs` qiymatigacha
(sukut bo‘yicha `1_800_000ms` / 30min) pasaytirib cheklanadi va _saqlanadigan
bloklash sababi_ qoidaning `"auth_error"` qiymati emas, avvaldan mavjud
qattiq kodlangan `"forbidden"` bo‘lib qoladi — boshidan oxirigacha faqat sovush
davomiyligiga amal qilinadi, sabab satriga emas. Ulanishning o‘zi faol qoladi;
shu ulanishdagi boshqa modellar ta’sirlanmaydi.

Qayta ifodalangan kvota xatolari (`额度不足`) production muhitida provayder qoidasiga mos keladi
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, o‘ziga tegishli e’lon qilingan cooldown yo‘q — persistence qatlamining
masshtablangan backoff standart qiymati qo‘llanadi). #10334 dan boshlab,
`ProviderErrorRuleMatch` dagi `scope` boshidan oxirigacha qo‘llanadi, ammo
**faqat** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ruxsat ro‘yxatidagi provayderlar uchun
(`providerErrorRules.ts` — hozircha faqat `"agentrouter"`,
`honorsRuleLockScope()` orqali boshqariladi). Boshqa barcha provayderlar uchun
`scope` xuddi #10334 dan oldingidek faqat axborot xususiyatiga ega bo‘lib qoladi.
`checkFallbackError` mos kelgan qoidaning scope qiymatini
`fallbackResult.ruleScope` sifatida taqdim etadi;
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) esa `ruleScope` qiymatini butun ulanishga
taalluqli, o‘z-o‘zidan tiklanadigan signal sifatida qo‘llash haqiqatan ham
xavfsizligini tasdiqlovchi umumiy guard hisoblanadi (`scope` `"connection"`,
reason `quota_exhausted`, hech qachon `permanent` emas, hech qachon
`creditsExhausted` emas — bu kelajakdagi biror qoida `"connection"` scope qiymatini
doimiy akkaunt holati bilan bog‘lashiga qarshi himoya). Uni ikki iste’molchi chaqiradi:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provayderning **har bir model uchun alohida** bloklash
  tarmog‘iga tushish o‘rniga (agentrouter’da `passthroughModels: true` →
  `hasPerModelQuota()` `true` qaytaradi), u **vaqtinchalik ulanish cooldown’i**ni
  qo‘llaydi — `testStatus: "unavailable"` + `rateLimitedUntil`, hech qachon
  terminal holat (`credits_exhausted`/`banned`/`expired`) emas — shu sababli
  ulanish cooldown muddati tugagach, hisob ma’lumotlarini qo‘lda tiklashni talab
  qilmasdan o‘z-o‘zidan tiklanadi. `disableCooling: true` bo‘lgan ulanishlar uchun
  o‘tkazib yuboriladi (#2997): bu opt-out o‘rniga har bir model uchun alohida
  bloklashga o‘tadi (hujjatlashtirilgan murosa — tarmoq ustidagi kod izohiga qarang).
- **Ayni so‘rov doirasidagi combo marshrutlash** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): xuddi shu guard ulanishni
  `${provider}:${connectionId}` kaliti bilan xotiradagi `exhaustedConnections`
  to‘plamida belgilaydi. Bu faqat o‘z target obyektida aynan shu
  `connectionId` mavjud bo‘lgan qolgan AYNI-SO‘ROV target’ini o‘tkazib yuboradi
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections`
  tekshiruvidan oldin `if (provider &&
connectionId)`) — oddiy model-ro‘yxat combo’sida qo‘shni target’larning o‘zida
  biriktirilgan `connectionId` bo‘lmaydi va u har bir dispatch uchun faqat
  javobdagi `X-OmniRoute-Selected-Connection-Id` header’idan aniqlanadi, shuning
  uchun bunday combo hech qachon ushbu kalitga mos kelmaydi. Bu keng tarqalgan
  holatda qolgan leg’ning hozirgina limiti tugagan akkauntni qayta ishlatishidan
  haqiqiy himoya ushbu Set EMAS — bu yuqoridagi persistence qatlami
  (ulanishning `rateLimitedUntil` qiymati endi kelajakdagi vaqtni ko‘rsatadi)
  hamda shu guard’ning xatolik uchun `transientRateLimitedProviders` qiymatini
  bostirishi kombinatsiyasidir ("Ikki bosqichli dizayn" va
  `targetExhaustion.ts` dagi `isAgentrouterConnectionQuotaScope` tarmog‘idagi
  kod izohiga qarang): ushbu Set belgilanmay qolgani sababli, `combo.ts` dagi
  `allowRateLimitedConnection` orqali majburiy ruxsat berish
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) provayderning qolgan
  leg’lari uchun ishga tushmaydi, shu bois hisob ma’lumotlarini tanlashdagi
  `rateLimitedUntil` filtri (`src/sse/services/auth.ts:1238`) odatdagidek
  hisobga olinadi va qolgan leg agentrouter’ning boshqa, hali ham foydalanish
  mumkin bo‘lgan ulanishini tanlaydi yoki foydalanish mumkin bo‘lgan hisob
  ma’lumotlari yo‘qligi sababli muvaffaqiyatsiz tugaydi — u ushbu tarmoq hozirgina
  cooldown qo‘llagan ulanishga majburan qaytmaydi.

### Ikki bosqichli dizayn: statusni qayta ifodalash, so‘ng tasniflash

Statusni qayta ifodalash (`upstreamStatusRestatement.ts`) va provayderni
tasniflash qoidalari (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) provayder id’si va matn markerlari bo‘yicha kalitlanadigan
alohida registrlardir, ammo ular turli joylarda ishlaydi va turli maqsadlarga
xizmat qiladi: qayta ifodalash `chatCore.ts` ichida HTTP statusini erta bosqichda
qayta yozadi; tasniflash qoidalari esa `checkFallbackError()` ichida
fallback `reason` va lock `scope` qiymatini
(`model` / `provider` / `connection`) tanlaydi
(`open-sse/services/accountFallback.ts`).

Tasniflash qoidalari to‘liq xato **matni**ni (`额度不足` kabi body markerlariga
mos kelish uchun zarur) faqat `providerErrorRules.ts` dagi
`FULL_TEXT_RULE_PROVIDERS` ruxsat ro‘yxatiga kiritilgan provayderlar uchun
ko‘radi — hozircha faqat `"agentrouter"`. Boshqa har bir **ichki katalog**
provayderi uchun `checkFallbackError` `getProviderErrorRuleMatch` ga faqat
strukturaviy xatoni (`{code, type}`) uzatadi; bu header/status/code asosidagi
qoidalar uchun yetarli, ammo body matnidagi markerlarni ko‘rmaydi.
`resolveRuleMatchBody()` yordamchi funksiyasi ushbu tanlovni amalga oshiradi:
ruxsat ro‘yxatidagi provayderlar uchun to‘liq xato matni, aks holda strukturaviy
xato. **Ichki** provayderni `FULL_TEXT_RULE_PROVIDERS` ro‘yxatiga qo‘shish har bir
provayder uchun aniq opt-in hisoblanadi — bu ro‘yxatda bo‘lmagan har bir provayder
uchun standart yo‘l baytma-bayt o‘zgarishsiz qolishi uchun mavjud.

Qoidaning `scope` qiymati (`model` / `provider` / `connection`)
`FULL_TEXT_RULE_PROVIDERS` dan alohida opt-in hisoblanadi:
`checkFallbackError` uni faqat `fallbackResult.ruleScope` sifatida taqdim etadi,
downstream iste’molchilar esa uni axborot yorlig‘idan boshqa ma’noda faqat shu
fayldagi `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ruxsat ro‘yxatiga kiritilgan
provayderlar uchun qo‘llaydi (`honorsRuleLockScope()` orqali boshqariladi —
hozircha faqat `"agentrouter"`). Provayder ushbu ruxsat ro‘yxatiga kiritilgach,
`scope: "connection"` mosligi amalda nima qilishini bilish uchun yuqoridagi
"Qayta ifodalangan kvota xatolari" bo‘limiga qarang.

**#11104 — operator tomonidan eʼlon qilingan qoidalar ikkala ruxsat roʻyxatini ham chetlab oʻtadi.** Operator
ushbu faylni tahrirlamasdan, ish vaqtida `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
orqali har bir provayder uchun qoida eʼlon qilishi mumkin. Operator qoidasini
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ortida cheklash — bu
ruxsat roʻyxatlari ichki katalog qoidalarining **standart** xatti-harakatini
himoya qilishga moʻljallangan — sozlamalar mexanizmini u yerda allaqachon
koʻrsatilgan provayderlardan tashqari barcha provayderlar uchun ishlamaydigan
qilib qoʻyar edi, chunki qoidani eʼlon qilishning oʻzi operatorning aniq
roziligidir. `resolveRuleMatchBody()` va `honorsRuleLockScope()` avval
`hasOperatorRuleForProvider()`ni tekshiradi: operator qoidasiga ega provayder
xom xato matnini oladi va uning eʼlon qilingan `scope` qiymati, provayder
ruxsat roʻyxatlaridan birortasida mavjud yoki mavjud emasligidan qatʼi nazar,
inobatga olinadi.

**Maʼlum kamchilik — HTTP 400 uchun `providerRuleRegistry` hech qachon tekshirilmaydi.**
`checkFallbackError`ning `BAD_REQUEST` tarmogʻi 400 statusini toʻliq
oʻzining andoza massivlari (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` va `accountFallback.ts`dagi boshqalar) orqali
tasniflaydi va undan yuqoridagi `configuredRule`/`getProviderErrorRuleMatch`
tarmogʻiga yetib borishdan oldin natijani qaytaradi. `status: 400`ga ega ichki
katalog qoidasi (yoki operator qoidasi) sintaktik jihatdan toʻgʻri, ammo hech
qachon ishga tushmaydi. Hozirda mavjud qoidalardan hech biri 400ni nishonga
olmaydi, shuning uchun ishlab turgan muhitdagi hech narsaga taʼsir qilmaydi —
ammo kelajakdagi 400 qoidasi avval ushbu tarmoqqa oʻzgartirish kiritishni
talab qiladi; bu shunchaki qoida qoʻshishdan kattaroq oʻzgarishdir (u andoza
massivlariga asoslangan xatti-harakatga tayanayotgan har bir provayder uchun
400ni qayta tasniflaydi) va bitta provayder qoidasini qoʻshish doirasidan
tashqarida.

### Kvotani notoʻgʻri ifodalovchi yangi shlyuzni qoʻshish

1. `statusRestatementRegistry`da bitta qoida massivini roʻyxatdan oʻtkazing
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers`ni
   provayderga xos holda saqlang; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) bilan toʻqnashadigan umumiy
   inglizcha iboralarni hech qachon qayta ishlatmang.
2. Toʻgʻri bloklash doirasini tanlash uchun ixtiyoriy ravishda
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`)da
   tasniflash qoidalarini roʻyxatdan oʻtkazing (`connection` — hisob boʻylab
   amal qiladigan kvota uchun, `model` — har bir modelga xos xatolar uchun).
   Bu qadam ishlab turgan muhitda faqat qoidalari xatoning toʻliq matniga
   (tana markerlariga) muhtoj boʻlgan provayderlar uchun kuchga kiradi:
   provayder identifikatorini shu fayldagi `FULL_TEXT_RULE_PROVIDERS`ga
   qoʻshing — aks holda `checkFallbackError` qoidaga faqat tuzilmaviy
   `{code, type}` xatosini uzatadi va tana matniga asoslangan qoida real
   trafikda hech qachon mos kelmaydi. Faqat `status`/`headers` boʻyicha mos
   keladigan qoidalar (Opencode yoki Minimax qoidalari kabi) bu rozilikni
   talab qilmaydi. Bundan tashqari, agar qoida `scope: "connection"`ni eʼlon
   qilsa va maqsad shunchaki axborot yorligʻi emas, balki haqiqiy ulanish
   miqyosidagi sovitish davri hamda ayni soʻrovdagi kombinatsiyani oʻtkazib
   yuborish boʻlsa, provayder identifikatorini shu fayldagi
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS`ga qoʻshing — aynan shu narsa
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) va
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) ichidagi
   `isAgentrouterConnectionQuotaScope()` uslubidagi foydalanishni cheklaydi;
   busiz `scope` hali ham `fallbackResult.ruleScope` orqali uzatiladi, ammo
   hech narsa unga muvofiq harakat qilmaydi.
3. `tests/unit/upstream-status-restatement.test.ts` va
   `tests/unit/agentrouter-error-rules.test.ts`ga oʻxshash birlik testlarini
   qoʻshing (jumladan, not-permanent / not-creditsExhausted himoya
   tekshiruvlari va — agar provayderga ruxsat roʻyxati kerak boʻlsa —
   `resolveRuleMatchBody()` toʻliq matnni faqat shu provayder uchun
   qaytarishini tasdiqlovchi test).

`chatCore.ts`, `classifyError` yoki kombinatsiyaga hech qanday oʻzgartirish
kiritish shart emas.

#### Chiquvchi trafik boʻyicha guruhlangan bloklash (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`dagi provayderlar (opencode oilasi) IP boʻyicha
guruhlangan yuqori oqim sifatida koʻriladi (opencode bepul tarifi hisob
boʻyicha emas, IP boʻyicha guruhlangan — #9611ga qarang): `quota_exhausted`
**yoki** `rate_limit_exceeded` sifatida tasniflangan 429 statusi, rotatsiya
ularni sinab koʻrishidan oldin, oxirgi maʼlum chiquvchi IP manzili xato bergan
ulanishnikiga mos keladigan ruxsat berilgan oiladagi barcha ulanishlar uchun
sovitish davrini ishga tushiradi
— bu N-1 ta kafolatlangan muvaffaqiyatsiz yuqori oqim chaqiruvining oldini
oladi (#10460/#10525 bilan bir xil shakl).
`rate_limit_exceeded` ataylab kiritilgan: `markAccountUnavailable` yoʻlida
opencodega xos qoidalar hech qachon mos kelmaydi (`checkFallbackError`ga
sarlavhalar/tana uzatilmaydi, opencode esa `FULL_TEXT_RULE_PROVIDERS`da emas),
shu sababli tanasida obuna kvotasi matni ("monthly usage limit reached")
mavjud boʻlgan 429, `status_429` qoidasiga yetib borishdan oldin, kvota
matniga asoslangan zaxira mexanizmi (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; 1 soatlik sovitish davri) tomonidan `quota_exhausted`
sifatida tasniflanadi — kvota matni boʻlmagan 429 esa (oddiy tezlik
cheklovi) `status_429` qoidasi orqali `rate_limit_exceeded` sifatida
tasniflanadi va baribir IP oilasi uchun sovitish davrini ishga tushiradi.
Ruxsat roʻyxatidagi provayder uchun IP boʻyicha guruhlangan tezlik cheklovi
tugagan kvota bilan bir xil signaldir. Amaldagi cheklovlar:

- **Imkon qadar**: blokirovka ulanishning oxirgi maʼlum `egress_ip`
  qiymatini `proxy_logs` dan aniqlaydi (24 soatlik oyna, sinxron, keshsiz). Sovuq
  kesh (`egress` IP hech qachon tekshirilmagan) yoki satr yoʻqligi → xatoga uchragan
  ulanish ushbu tarmoq tomonidan baribir sovitiladi (hozirgidek qayd etiladi),
  faqat birorta ham turdosh ulanish bloklanmaydi.
- **Hech qachon terminal holat emas**: sovitish — yangilanib turuvchi kvota oynasi
  (`testStatus: "unavailable"`); IP darajasidagi signaldan hech qachon doimiy
  holat chiqarilmaydi. `disableCooling` ulanishlari bu tarmoqni butunlay chetlab
  oʻtadi.
- **Ruxsat etilgan oilada blokirovka donadorligi oʻzgaradi**: bu faqat turdosh
  ulanishlarni optimallashtirish emas, balki qamrov oʻzgarishidir. opencode —
  `passthroughModels` provayderi, shu sabab bu tarmoqdan oldin 429 har bir MODEL
  uchun alohida blokirovka hosil qilardi; endi esa u ulanishning sovitilishini
  keltirib chiqaradi — bu hatto hech qanday turdosh ulanishsiz bitta ulanishni
  ishlatayotgan operatorga ham taalluqli. Aynan shu donadorlik opencode qoidalari
  jadvalida allaqachon toʻgʻri deb belgilangan (`scope: "connection"`,
  `providerErrorRules.ts`), biroq opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
  tarkibida boʻlmagani sababli hozirgacha unga amal qilinmagan. Bu tarmoq
  ulanish doirasidagi agentrouter tarmogʻiga taqlid qilib, xatoga uchragan
  ulanishning sovitilishi + `backoffLevel` qiymatini oʻzi yozadi va qaytadi —
  quyidagi har bir model uchun blok va umumiy yoʻlga hech qachon yetib
  borilmaydi.
- **Combo ham kiritilgan**: agentrouter tarmogʻidagi kabi, bu qamrov combo
  chaqiruvchisi 429 ga qoʻllaydigan `persistUnavailableState`/`isCombo`
  pasaytirishini ataylab eʼtiborsiz qoldiradi. Har bir model uchun blokirovka
  ushbu qamrovning kuchsizroq shakli emas, balki notoʻgʻri birlikdir: u limiti
  tugagan IP haqida hech narsa bildirmaydi, shu sabab combo rotatsiyasi har bir
  turdosh ulanish uchun kafolatlangan tarzda muvaffaqiyatsiz tugaydigan bittadan
  chaqiruvni behuda sarflashda davom etardi.
- **Turdosh ulanishlar xavfsizligi**: allaqachon terminal holatdagi
  (banned/credits_exhausted) yoki uzoqroq sovitish davrida boʻlgan turdosh
  ulanish hech qachon qayta yozilmaydi.
- **Eksklyuziv ruxsat roʻyxati**: `EGRESS_BUCKETED_LOCK_PROVIDERS` ni kengaytirish
  — egasining aniq qarori; umumiy ulash qoʻllanilmaydi (#10334/#10419 andozasi).
  Turdosh ulanishlar soʻrovi ham aynan shu ruxsat roʻyxatini SQL literali
  sifatida takrorlash oʻrniga unga bogʻlanadi, shu sabab uni kengaytirish bir
  qatorlik oʻzgarish boʻlib qoladi.
- **Egress IP rotatsiyasi, har ikki yoʻnalishda**: qidiruv oynasi (24 soat)
  egress-IP keshi TTL qiymatidan (5 min) ancha keng, shu sabab «oxirgi maʼlum
  IP» joriy holat emas, balki tarixdir. Agar ulanish proksisi shu oyna ichida
  rotatsiya qilingan boʻlsa, blokirovka haqiqatan ham umumiy boʻlgan IP ni
  **oʻtkazib yuborishi** mumkin (qayd etilgan IP — yangi, limiti tugamagan IP)
  — va aksincha, u limiti tugagan IP dan keyinchalik boshqa IP ga rotatsiya
  qilingan **turdosh ulanishni sovitishi** mumkin. Ikkinchi holat turdosh
  ulanishga bitta sovitish oynasiga tushadi; ikkala holat ham tarixga
  asoslangan qidiruvning «imkon qadar» ishlash cheklovlari sifatida qabul
  qilinadi.
- **Xarajat**: `proxy_logs` boʻylab ikkita chegaralangan skanerlash (oyna boʻyicha
  `idx_pl_timestamp` orqali filtrlanadi), faqat 429 chastotasida. Yangi indeks
  yoʻq (134-migratsiya YAGNI). Oʻrtacha oʻlchamdagi real trafik maʼlumotlar
  bazasi nusxasida oʻlchangan; yuqori oʻtkazuvchanlikka ega instansiya ayni
  oyna ichida mutanosib ravishda koʻproq satr saqlaydi.

---

## Boshqa barqarorlik xususiyatlari

- **19 ta marshrutlash strategiyasi** (ustuvorlik, vaznli, navbatma-navbat, kontekstni uzatish, avval toʻldirish, p2c, tasodifiy, eng kam ishlatilgan, xarajat boʻyicha optimallashtirilgan, tiklanishni hisobga oluvchi, tiklanish oynasi, zaxira sigʻimi, qatʼiy tasodifiy, avtomatik, lkgp, kontekst boʻyicha optimallashtirilgan, kesh boʻyicha optimallashtirilgan, birlashtirish, konveyer) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) ga qarang.
- **Tiklanishni hisobga oluvchi marshrutlash** (v3.8.0) — ulanishlarni kvota tiklanish vaqtiga qarab ustuvorlashtiradi.
- **Fon rejimining soddalashtirilishi** — Responses API uchun `background: true` ogohlantirish bilan sinxron rejimga soddalashtiriladi.
- **Vositalar limitini dinamik aniqlash** — vositalar soni limitiga yetilganda provayderlardan foydalanishni kamaytiradi.
- **Favqulodda zaxira variantiga oʻtish** — `OMNIROUTE_EMERGENCY_FALLBACK` orqali boshqariladi; operatorlar uni qayta ishga tushirmasdan Feature Flags sahifasidan oʻzgartirishi mumkin.

---

## Nosozliklarni tuzatish

- Vaznli kombinatsiya `503 all_targets_cooling_down` javobini qaytaradi (`Retry-After` o‘rnatilgan, `diagnostics.excluded` esa har bir nishonni `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` bilan ro‘yxatlaydi) → pul sozlangan va ulangan, ammo har bir nishon barqarorlik taymeri sababli chiqarib tashlangan; `[COMBO] Weighted selection: every target excluded before dispatch — …` ogohlantirishi sabablar va qolgan soniyalarni ko‘rsatadi. Xuddi shu kombinatsiyadan kelgan `404 no_executable_targets` hech qanday barqarorlik taymeri qatnashmaganini anglatadi (ishga tushiradigan hech narsa yo‘q yoki barcha hisoblar mavjudlik tekshiruvidan o‘ta olmagan). Bu `targetResolution.ts` ichida to‘plangan chiqarib tashlashlar asosida `open-sse/services/combo/pinRecovery.ts` ichida tuzilgan.
- Provayderning barcha kalitlari o‘tkazib yuborildi → uzgich holatini HAMDA har bir ulanishning `rateLimitedUntil`/`testStatus` qiymatini tekshiring.
- Provayder tiklash oynasidan keyin ham doimiy ravishda chiqarib tashlanmoqda → kod `getStatus()`/`canExecute()` o‘rniga bevosita `state` qiymatini o‘qimoqda.
- Bitta kalit ishlamaydi, boshqalari esa ishlashi kerak → uzgich o‘rniga ulanishning sovish davrini afzal ko‘ring.
- Faqat bitta model ishlamaydi → ulanishning sovish davri o‘rniga model blokirovkasini afzal ko‘ring.
- Holat o‘z-o‘zidan tiklanishi kerak, ammo tiklanmayapti → kelajak vaqt tamg‘asi va muddati o‘tgan holatni yangilaydigan o‘qish yo‘lini tekshiring. Doimiy holatlar qo‘lda o‘zgartirishni talab qiladi.

---

## TLS barmoq izi va yashirinlik

Provayderga xos yashirinlik (JA3/JA4, CCH, obfuskatsiya) alohida hujjatlashtirilgan — `docs/security/STEALTH_GUIDE.md` ga qarang (git ichida; `/docs` tarkibiga kompilyatsiya qilinmaydi).

---

## Barqarorlikni sinash (8-bosqich · C bloki)

Barqarorlik mantigʻi uchun modul testlaridan tashqari, uchta test ish muhitini
haqiqiy yuklama/nosozlik sharoitlarida tekshiradi (barchasi integratsion/tungi — hech biri PRlarni bloklamaydi):

| Test                     | Nima tekshiriladi                                                                                                                                                                                                                   | Ishga tushirish                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Xaos                     | Soxta yuqori oqim tuguni haqiqiy kechikish/tiklanish/taym-aut/503 holatlarini kiritadi; avtomatik uzgich ochilishi/tiklanishini va `checkFallbackError` 503 holatini tiklanadigan zaxira oʻtishi sifatida tasniflashini tekshiradi. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Hip oʻsishi              | `--expose-gc` bilan har bir `createSSEStream` uchun ~500 ta oqim; agar hip belgilangan chegaradan oshsa, test muvaffaqiyatsiz tugaydi (OOM himoyasi #3069).                                                                         | `npm run test:heap`                    |
| k6 davomiy yuklama testi | `/api/monitoring/health` uchun uzluksiz yuklama; p95/xatolik chegaralari.                                                                                                                                                           | `k6 run tests/load/k6-soak.js` (tungi) |

`.github/workflows/nightly-resilience.yml` orqali boshqariladi (cron + qoʻlda ishga tushirish). Standart
`test:integration` rejimida xaos va hip testlari oʻz-oʻzidan oʻtkazib yuboriladi (`RUN_CHAOS_INT`/`--expose-gc` boʻlmasa).

---

## Shuningdek qarang

- [Arxitektura qoʻllanmasi](./ARCHITECTURE.md) — Tizim arxitekturasi va ichki tuzilishi
- [Foydalanuvchi qoʻllanmasi](../guides/USER_GUIDE.md) — Provayderlar, kombinatsiyalar, CLI integratsiyasi
- [Avtomatik kombinatsiya mexanizmi](../routing/AUTO-COMBO.md) — 16 omilli baholash, rejim paketlari
