# Resilience Guide (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute uchta alohida, lekin bir-biri bilan bog'liq chidamlilik mexanizmiga ega. Ularning har biri turli qamrov va maqsadga ega. Marshrutlash xatti-harakatini nosozliklarini tuzatishda ularni bir-biridan ajratib ko'ring.

![3 qavatli chidamlilik modeli](../diagrams/exported/resilience-3layers.svg)

> Manba: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Provayder avtomatik uzgichi (Circuit Breaker)

**Qamrov:** butun provayder (masalan, `glm`, `openai`, `anthropic`).

**Maqsad:** yuqori oqim/xizmat darajasida takroran ishlamayotgan provayderga trafik yuborishni to'xtatish.

**Amalga oshirish:**

- Asosiy klass: `src/shared/utils/circuitBreaker.ts`
- Ulanish: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Holat API'si: `GET /api/monitoring/health`
- Qayta tiklash API'si: `POST /api/resilience/reset`
- O'ramlar (wrapper): `open-sse/services/accountFallback.ts`
- DB jadvali: `domain_circuit_breakers`

**Holatlar:**

- `CLOSED` — oddiy trafik ruxsat etiladi
- `DEGRADED` — trafik hali ham ruxsat etiladi, lekin provayderda ko'paygan xatoliklar kuzatilmoqda; yetarli miqdordagi muvaffaqiyatli so'rovlar, amal qiladigan ulanish testi yoki oxirgi xatolik turi uchun eng uzun `OPEN` ushlab turish muddatidan keyin (uning `cooldownByKind` qiymati, aks holda `resetTimeout`, × `maxBackoffMultiplier`, kamida bitta cooldown) yangi xatolik yuz bermasa, `CLOSED` holatiga qaytadi
- `OPEN` — provayder vaqtincha bloklangan; combo marshrutlash uni o'tkazib yuboradi
- `HALF_OPEN` — qayta tiklanish vaqti o'tgan; sinov (probe) so'roviga ruxsat beriladi

**Sozlanadigan standart qiymatlar (`open-sse/config/constants.ts`, Boshqaruv paneli → Sozlamalar → Chidamlilik sahifasida ko'rsatiladi):**

| Sinf    | DEGRADED bo'ladi | Ochiladi   | Qayta tiklanish vaqti |
| ------- | ---------------- | ---------- | --------------------- |
| OAuth   | 5 xatolik        | 8 xatolik  | 60s                   |
| API-key | 7 xatolik        | 12 xatolik | 30s                   |
| Local   | hosilaviy        | 2 xatolik  | 15s                   |

`degradationThreshold` provayder qachon `DEGRADED` holatiga kirishini boshqaradi; `failureThreshold` esa qachon ochilishi va o'tkazib yuborilishini belgilaydi. Mahalliy (Local) provayder profillari hozircha Chidamlilik sozlamalari sahifasida ko'rsatilmaydi.

**Uzgich kodlari:** faqat provayder darajasidagi statuslar `[408, 500, 502, 503, 504]`. Hisob (account) darajasidagi xatoliklar uchun ishga TUSHMASLIGI kerak (ko'pchilik 401/403/429 xatoliklari cooldown yoki lockout mexanizmlariga tegishli).

**Dangasa tiklanish (lazy recovery):** `OPEN` muddati tugagach, `getStatus()`, `canExecute()`, `getRetryAfterMs()` holatni `HALF_OPEN` ga yangilaydi. Xuddi shu o'qishlar (va keyingi xatolik) eskirgan `DEGRADED` holatini `CLOSED` ga qaytaradi. Orqa fon taymeri kerak emas.

---

### Ixtiyoriy (opt-in) global Provayder Cooldown'i (oyna cheklovi)

To'rtinchi, **ixtiyoriy** qavat (`PROVIDER_COOLDOWN_ENABLED`, sukut bo'yicha **o'chiq**) ishlamayotgan provayderlar haqida so'rovlararo xotirani `open-sse/services/providerCooldownTracker.ts` faylida saqlaydi; combo maqsadlarini aniqlash shu xotiraga murojaat qiladi, shunda ketma-ket combo so'rovlar hozirgina ishlamay qolgan provayderni qayta-qayta tekshirib o'tirmaydi. Provayder darajasidagi yozuvlar `PROVIDER_PROFILES` oyna chekloviga bo'ysunadi:

| Profil  | ishga tushadi (`providerFailureThreshold`) | ichida (`providerFailureWindowMs`) | soviydi (`providerCooldownMs`) |
| ------- | -----------------------------------------: | ---------------------------------: | -----------------------------: |
| OAuth   |                                       `10` |                            `15min` |                         `5min` |
| API key |                                       `15` |                            `30min` |                        `10min` |

Chegaradan past bo'lsa, provayder sovuyapti deb hisoblan**maydi**; muvaffaqiyatli so'rov oynani tozalaydi. Ulanish darajasidagi yozuvlar (`provider:connectionId`) buning o'rniga eksponensial `minRetryCooldownMs → maxRetryCooldownMs` backoff'ini saqlaydi. Qayta belgilashlar (override):
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regressiyadan himoya qiluvchi test: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Ulanish sovushi

**Qamrov:** bitta provayder ulanishi/akkaunti/kaliti.

**Maqsad:** bitta yaroqsiz kalitni o'tkazib yuborish, shu provayderning boshqa ulanishlari xizmat ko'rsatishda davom etar ekan.

**Amalga oshirish:**

- Mavjud emas deb belgilash: `src/sse/services/auth.ts::markAccountUnavailable()`
- Tanlash: shu fayldagi `getProviderCredentials*`
- Sovush hisobi: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Sozlamalar: `src/lib/resilience/settings.ts`

**Har bir ulanish uchun maydonlar:**

- `rateLimitedUntil` — sovush muddati tugaguncha bo'lgan vaqt belgisi
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponensial backoff hisoblagichi

**Standart sovushlar:**

- OAuth bazasi: 5s
- API-kalit bazasi: 3s
- API-kalit 429: yuqori oqimning `Retry-After`/reset sarlavhalari/tahlil qilinadigan reset matnini afzal ko'radi
- Backoff: `baseCooldownMs * 2 ** failureIndex`

**Anti-thundering-herd himoyasi:** bir vaqtning o'zida yuz beradigan xatoliklar sovushni ortiqcha uzaytirib yuborishining yoki `backoffLevel`ni ikki marta oshirib yuborishining oldini oladi.

**Parallelizm chegarali 429 javoblari backoff narvonida yuqoriga ko'tarilmaydi.** Tanasida
parallelizm chegarasi haqida xabar bo'lgan `429` ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) akkaunt sog'lom, lekin bandligini anglatadi.
`checkFallbackError()` `concurrency_limited` sababini qaytaradi: darhol keyingi
ulanishga o'ting, bu ulanishni qat'iy `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) yoki
yuqori oqimning qayta urinish ko'rsatmasi davomida sovuting, `backoffLevel`ni o'zgarmas qoldiring
va `skipProviderBreaker`ni o'rnating.
Aniq kvota tanasi baribir ustun keladi, shuning uchun kvota naqshiga ham mos keladigan tana
kvota hukmi bo'lib qoladi. Aniqlash: `src/shared/utils/classify429.ts` faylidagi `looksLikeConcurrencyLimit()`;
hukm: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (breakerning
`FailureKind`i) o'zgarmagan va bunday tanalar uchun hali ham `rate_limit`ni qaytaradi.

**Oqim kontentining to'xtab qolishi akkauntni sovutmaydi.** Kontent-to'xtab qolish watchdog'i
(`open-sse/utils/streamHandler.ts`) o'z vaqtida model chiqishi yubormagan oqimdan voz kechganida,
`markAccountUnavailable()` xatoni ulanishda qayd etadi, lekin sovush o'rnatmaydi:
to'xtab qolish aynan shu so'rovga tegishli — ko'pincha hali chiqish bermagan
uzun reasoning navbati. Operatorlar `resilienceSettings.streamStallCooldown.enabled`
orqali buni qayta yoqishlari mumkin (standart `false`).

**Reasoning freymlari kontent-to'xtab qolish byudjetini qaytadan boshlaydi.** Reasoning modeli
birinchi ko'rinadigan tokenidan oldin daqiqalar davomida o'ylashi mumkin: Claude fikrlash
matni bo'sh bo'lishi mumkin bo'lgan `thinking_delta` freymlarini oqizadi, Responses API esa
ketma-ket reasoning elementlarini oqizadi. `isReasoningProgressFrame()`
(`open-sse/utils/streamReadiness.ts`) bunday freymlarni taniydi va watchdog navbatni bekor
qilish o'rniga har birida byudjetini qaytadan boshlaydi. Ular baribir model chiqishi emas,
shuning uchun faqat reasoning bilan tugagan navbat baribir bo'sh deb hisoblanadi, reasoningni
to'xtatib faqat heartbeat yuboradigan navbat esa baribir watchdog'ni ishga tushiradi.

Kironing bo'sh bo'lmagan imzoga ega binar `reasoningContentEvent` freymlari bu reasoning
faolligini ijrochi orqali bo'sh `reasoning_content` deltasi sifatida saqlab qoladi. Imzo
uzatilmaydi. Metadata, to'liq bo'lmagan freymlar va bo'sh imzolar kontent byudjetini qaytadan
boshlamaydi; mustaqil faol-oqim taymauti va mijoz bekor qilishi baribir amal qiladi
(`open-sse/executors/kiro/reasoning.ts`).

**Yakuniy holatlar (sovushlar EMAS):**

- `banned` — taqiqlangan kalit so'z / akkaunt-banini aniqlash (qarang [BAN_DETECTION](../security/BAN_DETECTION.md)) hamda yuqori oqimning ketma-ket uchta har-so'rov rad etishi (`request_rejected`, masalan Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`) orqali o'rnatiladi; bitta rad etish faqat ulanishni sovutadi
- `expired` (chegaralangan qayta urinishlardan keyin — eksponensial backoff bilan `EXPIRED_RETRY_MAX = 3` — yakuniy holatga o'tadi, shunda vaqtinchalik OAuth xatolari akkaunt butunlay o'chirilishidan oldin o'z-o'zidan tuzalishi mumkin)
- `credits_exhausted`

Bular hisob ma'lumotlari o'zgarguncha yoki operator ularni tiklaguncha saqlanadi. Yakuniy holatlarni vaqtinchalik sovush holati bilan ustidan yozmang.

**Kechiktirilgan tiklash:** `rateLimitedUntil` o'tib ketganda, ulanish yana tanlash uchun mavjud bo'ladi. Muvaffaqiyatli foydalanishda `clearAccountError()` barcha xato maydonlarini tozalaydi.

### Claude OAuth foydalanish devori: pastroq ustuvorlikli yo'lak + sessiya chegarasini tiklash

**Qamrov:** bitta Claude obuna (OAuth) ulanishi. Ikkala funksiya ham **har bir ulanish uchun
opt-in** (Ulanishni tahrirlash → Claude bo'limi → `providerSpecificData` ichidagi `lowPriorityMode` /
`autoLimitReset`, ikkalasi ham standart o'chiq) va Claude Code'ning `/low-priority` va
`/limit-reset` buyruqlarini aks ettiradi (wire-kontrakt Claude Code 2.1.263'dan olingan).

**Amalga oshirish:**

- Holat mashinasi + javob klassifikatsiyasi: `open-sse/services/claudeLowPriority.ts`
- Tiklash holati/talab mijozi: `open-sse/services/claudeLimitReset.ts`
- Ijrochi hook'i (sarlavha kiritish + shu akkauntda qayta urinish): `open-sse/executors/base.ts::execute()`
- Opt-in saqlash: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Tetikchi:** 5 soatlik foydalanish devori — sarlavhalari
`anthropic-ratelimit-unified-status: rejected` va akkaunt huquqli bo'lganda
`anthropic-ratelimit-unified-slow-offer: treatment` qiymatlarini olib yuradigan `429`. Shu birinchi devor
429'idan oldin hech narsa yuborilmaydi; unified sarlavhalarsiz kelgan to'p 429 oddiy sovush yo'lidan o'tadi.

**Pastroq ustuvorlikli yo'lak** (`lowPriorityMode`):

- 429 devorida ijrochi taklifni qabul qiladi va darhol **xuddi shu**
  akkaunt bilan `anthropic-usage-limit: slow` sarlavhasida qayta urinadi; yo'lak e'lon qilingan
  `anthropic-ratelimit-unified-reset` (+60s qo'shimcha muddat) gagacha faol qoladi va bu oynadagi
  har bir so'rov ushbu sarlavhani olib yuradi. Qo'lga olingan 429 hech qachon `handleChatCore` ga
  yetib bormaydi, shuning uchun ulanish sovutishga **qo'yilmaydi** va rotatsiyadan chiqarilmaydi.
- Keyingi javoblardagi `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  yo'lakni saqlab qoladi; `slot_busy` (429) yoki `529` holatida serverning
  `anthropic-ratelimit-unified-slow-retry-after` qiymati kutiladi (standart 20s, 5–600s oralig'iga
  chegaralangan, ±30% jitter) va qayta uriniladi, bu `anthropic-ratelimit-unified-slow-max-wait`
  bilan cheklangan (standart 20 daqiqa, 1 daqiqa–6 soat oralig'iga chegaralangan) — undan oshganda
  yo'lak tugaydi va 10 daqiqalik sovutish qayta qabul qilishni bloklaydi. Kutilish qo'shimcha
  ravishda so'rovning o'z upstream-start timeoutidan (`resolveFetchStartTimeout`, standart
  10 daqiqa) qolgan vaqt minus 5 soniyalik zaxira bilan cheklanadi: bu cheklov bo'lmasa,
  20 daqiqalik standart max-wait so'rovdan uzoq yashar edi va uyqu kutilish o'rtasida to'xtatilib,
  toza `max_wait` tugashi + sovutish o'rniga `TimeoutError` ko'rsatardi.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5 soatlik oyna almashinuvi yoki
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (bu uni har qanday statusda
  `extra_usage` sifatida tugatadi, chunki pullik overage endi devorni qoplaydi) yo'lakni tugatadi;
  keyin javob oddiy sovutish yo'lidan o'tadi. `budget_exhausted` e'lon qilingan byudjet
  tiklanishigacha (≤ 8 kun) eslab qolinadi.
- Devor tekshiruvi ijrochining o'z 400 ga asoslangan urinish ichidagi qayta urinishlaridan
  (kontekstni tahrirlash, thinking/effort cheklovlari, parametrlarni avtomatik o'rganish) keyin
  ishga tushadi, shuning uchun faqat shu qayta urinishlarning birida yuzaga chiqqan devor 429
  sovutish yo'liga yetib borish o'rniga baribir qo'lga olinadi.
- Holat har bir ulanish uchun operativ xotirada saqlanadi (qayta ishga tushirish qayta qabul
  qilish uchun bitta qo'shimcha devor 429 sarflashga olib keladi).

**Sessiya limitini tiklash** (`autoLimitReset`, ikkalasi ham yoqilganda yo'lakdan oldin sinab ko'riladi):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  bloki; `arm: "reset"` va `available: true` bo'lganda,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`
  `{ "program": "juniper_tide" }` tanasi bilan (tashkilot UUID si
  `providerSpecificData.organizationUUID` dan, bootstrap zaxirasi).
- `result: reset|not_limited` → so'rov to'liq tezlikda qayta uriniladi (slow sarlavhasiz).
  `already_used` / `not_offered` `next_available_at` ni memoizatsiya qiladi (standart bir hafta);
  har qanday xatolik 15 daqiqalik orqaga chekinishga olib keladi. Tiklash haftada bir marta
  amalga oshiriladi va baribir haftalik limit hisobiga kiritiladi.

Regressiya himoyalari: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Sessiya affiniteti (#7274)

**Qamrov:** bitta mijoz sessiyasi (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` sarlavhasi) bitta ulanishga mahkamlanadi, **har qanday** provayder uchun.

**Maqsad:** ko'p burilishli agentni (Claude Code, aider, maxsus agentlar) so'rovlar davomida bir xil akkauntda ushlab turish, akkauntlararo kontekst yo'qotilishini va akkaunt-boshiga sessiya holatiga ega provayderlarda takroriy sovuq start 429 xatolarini kamaytirish.

**Amalga oshirish:**

- TTL ni aniqlash: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin tanlash/yaratish: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Sarlavhani ajratib olish (umumiy, har qanday provayder): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Doimiy saqlanadigan pin jadvali: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Sozlama: `sessionAffinityTtlMs` (global TTL, ms da, `0` o'chiradi) — `src/lib/db/settings.ts`. `124_generic_session_affinity_ttl.sql` migratsiyasi tomonidan faqat Codex ga xos bo'lgan `codexSessionAffinityTtlMs` dan qayta nomlangan; migratsiya avval sozlangan har qanday Codex TTL qiymatini yangi standart sifatida olib o'tadi.

#7274 dan oldin `resolveSessionAffinityTtlMs()` `codex` dan tashqari barcha provayderlar uchun zudlik bilan `0` ga chiqib ketardi, shuning uchun TTL sozlamasi (va sessiya sarlavhalari) mahkamlash mexanizmi ham, sarlavhani ajratib olish ham allaqachon provayderga bog'liq bo'lmasa-da, boshqa hech qayerda ta'sir qilmas edi. Tuzatish shu erta qaytishni olib tashladi; TTL endi global ravishda `0` dan yuqori o'rnatilgach, barcha provayderlarga bir xil qo'llanadi.

Uchta sessiya-affiniteti sarlavhasi hech qachon upstreamga uzatilmaydi — ijrochilar mijoz sarlavhalarini o'tkazib yuborish o'rniga o'z upstream sarlavhalarini noldan quradi, shuning uchun bu faqat ichki korrelyatsiya identifikatori bo'lib qoladi.

### Boshqariladigan sessiya ulanishlarining eksklyuziv ijaralari

**Qamrov:** bitta faol boshqariladigan HTTP mijoz/sessiyasi bitta mos OmniRoute ulanishiga egalik qiladi.

**Maqsad:** so'rovlar davomida qattiq marshrutlash to'sig'iga muhtoj bo'lgan mijozlar uchun
doimiy eksklyuziv ulanish egaligini ta'minlash. Bu sessiya affinitetidan farq qiladi: affinitet
yumshoq uzluksizlik afzalligi bo'lsa, eksklyuziv ijara lifecycle holatini SQLite da saqlaydi,
global faol egalik va faol ulanish yagonaligini majburlaydi hamda provayderga jo'natishdan oldin
eskirgan generatsiyani rad etadi.

Bu xususiyat har bir API kaliti uchun ixtiyoriy ravishda yoqiladi. Boshqariladigan kalit `lease:exclusive`
scope ga va aniq bo'sh bo'lmagan `allowedConnections` ro'yxatiga ega bo'lishi kerak. Har qanday HTTP mijoz
lifecycle endpointidan foydalanishi mumkin; mijoz nomi, user-agent, provayder, OAuth usuli yoki model
talab qilinmaydi. Ijara modelga emas, ulanishga egalik qiladi, shuning uchun ulanish odatdagidek mos
bo'lib turganida model o'zgarishi bog'lanishni saqlab qoladi. Oddiy model, kvota, sog'liq, sovutish va
allowlist qoidalari hal qiluvchi bo'lib qoladi va xuddi shu generatsiyani boshqa bo'sh mos ulanishga
o'tkazishi mumkin.

Hayotiy sikl `acquire`, `renew` va `release` JSON amallari bilan `POST /api/v1/session-leases` orqali amalga oshiriladi.
Boshqariladigan inferens soʻrovlari shaffof boʻlmagan `X-OmniRoute-Lease-Owner` qiymatini va aniq
`X-OmniRoute-Lease-Generation` qiymatini taqdim etadi. Egasi `vlo_` dan keyin 43 ta base64url belgisidan foydalanadi; faqat uning SHA-256 heshi saqlanadi. Har bir yakuniy yuborish chegarasi (dispatch fence) autentifikatsiya qilingan API kalit ID sini va faol ulanish ID sini ham bogʻlaydi. Lizing boshqaruv sarlavhalari jurnallardan, saqlangan soʻrov snapshotlaridan va yuqori oqim ijrochi sarlavhalaridan oʻchiriladi.

Agar oddiy marshrutlashda mos boshqariladigan nomzodlar mavjud boʻlsa, lekin har bir boʻsh nomzod begona faol lizing tomonidan band qilingan boʻlsa, OmniRoute HTTP `429`, lizing-sigʻim-mavjud-emas kodi, sigʻimni kutish holati va eng yaqin tegishli tugash muddatidan olingan chegaralangan `Retry-After` qiymatini qaytaradi.
Oddiy boʻsh moslik lizing raqobati hisoblanmaydi va mavjud marshrutlash xatoligi semantikasini saqlab qoladi.

Tegishli mexanizmlar alohida qoladi:

- OAuth sessiya bandligi OAuth akkauntlari uchun jarayon ichidagi yumshoq taqsimotdir.
- Akkaunt semaforlari soʻrov parallelligi ruxsatnomalarini beradi va soʻrov tugagach yakunlanadi.
- Eksklyuziv boshqariladigan sessiya lizinglari avlod chegarasi (generation fence) bilan barqaror hayotiy sikl egaligidir.

---

## 3. Model blokirovkasi

**Qamrov:** provayder + ulanish + model uchligi.

**Status bo'yicha kalit qamrovi:** muvaffaqiyatsiz bo'lgan status blokirovka qaysi kalitga yozilishini belgilaydi (`open-sse/services/accountFallback/exactModelLock.ts` faylidagi `resolveLockoutScope()`):

- `429` / `403` / `402` — kvota yoki ruxsat (entitlement) signali — **kvota oilasini** blokirovka qiladi:
  codex uchun butun `codex` / `spark` qamrovi (ulanishning har bir `gpt-5*`
  modeli), boshqa provayderlar uchun `getQuotaScopedModelForProvider()`.
- `404` faqat modelning o'zini blokirovka qiladi (`getModelLockKey()` `not_found` holatini toraytiradi).
- Boshqa har qanday status — `5xx` transport/server xatoliklari va OmniRoute'ning sifat
  tekshiruvidan o'zi sintez qilgan `502` — faqat **aniq**
  provayder/ulanish/model uchligini blokirovka qiladi. Bitta modeldagi yomon oqim
  hisobning kvotasi haqida dalil emas; bu qoidadan oldin
  `codex/gpt-5.6-luna`da bitta bo'sh javob ushbu ulanishning barcha `gpt-5*`
  modellarini marshrutlashdan 2–30 daqiqaga (oshib boruvchi) olib tashlardi,
  kvotasi esa o'zgarmasdan qolardi.
- Chaqiruvchining aniq ko'rsatilgan `scope` opsiyasi har doim ustun keladi (Antigravity `"exact"` uzatadi).

**Maqsad:** faqat bitta model mavjud bo'lmaganda yoki kvota bilan cheklanganda butun ulanishni o'chirib qo'ymaslik.

**Misollar:**

- Har bir model uchun kvota qo'llovchi va 429 qaytaruvchi provayderlar
- Bitta topilmagan model uchun 404 qaytaruvchi mahalliy provayderlar
- Provayderga xos rejim/model ruxsat xatoliklari (masalan, Grok rejimlari)

**Implementatsiya:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model sovutishlari paneli (v3.8.0)

UI: Sozlamalar → Model sovutishlari (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Faol blokirovkalarni quyidagilar bilan ro'yxatlaydi: provayder, ulanish, model, sabab, expiresAt. Operatorlar modelni kartadan qo'lda qayta yoqishlari mumkin.

**REST API:**

- `GET /api/resilience/model-cooldowns` — faol blokirovkalar ro'yxati
- `DELETE /api/resilience/model-cooldowns` — qo'lda qayta yoqish. Tana: `{provider, connection, model}`. Avtorizatsiya: management.

### Cooldown boshqaruvchisi

UI: Monitoring → Cooldown boshqaruvchisi (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Vaqtinchalik sabab tufayli marshrutlashdan chiqqan har bir ulanish uchun bitta sahifa —
har bir provayder sahifasini ochish o'rniga. U ulanish sovutishlari, model blokirovkalari
va yakuniy holatlarni ro'yxatlaydi, ularni har bir ulanish uchun, tanlanganlar uchun yoki
provayderning barcha ulanishlari uchun tozalaydi hamda eng ko'p sozlanadigan sovutish
qoidalarini tahrirlaydi: `streamStallCooldown.enabled` hamda OAuth / API-kalit
`connectionCooldown` asosiy sovutishi va maksimal backoff qadamlari
(`PATCH /api/resilience` orqali saqlanadi). Yakuniy holatlar (`banned`, `expired`,
`credits_exhausted`) ro'yxatlanadi, lekin bu yerda hech qachon tozalanmaydi.

**REST API** (`src/lib/resilience/cooldownManager.ts`, avtorizatsiya: management):

- `GET /api/resilience/cooldowns[?provider=]` — status, qolgan sovutish,
  backoff darajasi, oxirgi xato turi va model blokirovkalari bilan ulanishlar
  (hisob ma'lumotlarisiz)
- `POST /api/resilience/cooldowns` — tana `{connectionIds: string[]}` yoki
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` qaytaradi

### Blokirovka sozlamalari UI + muvaffaqiyat-pasayishi tiklanishi (v3.8.23)

Model blokirovkasi doimiy yoqilgan, qattiq kodlashgan xatti-harakatdan to'liq
sozlanadigan, ixtiyoriy (opt-in) xususiyatga aylandi — o'z sozlamalar kartasi va
o'z-o'zini tuzatadigan tiklanish yo'li bilan.

**Sozlamalar kartasi:** Sozlamalar → Model blokirovkasi
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Bu yuqoridagi faqat o'qish uchun mo'ljallangan `ModelCooldownsCard`dan
**farq qiladi** (u faqat faol blokirovkalarni _ro'yxatlaydi_) — yangi karta
_parametrlarni sozlaydi_. Standartlar `DEFAULT_MODEL_LOCKOUT_SETTINGS`da
joylashgan (`src/lib/resilience/modelLockoutSettings.ts`):

| Sozlama                 | Standart                         | Ma'nosi                                                                   |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Bosh kalit — model blokirovkasi **standart bo'yicha o'chiq**.             |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Model qamrovli muvaffaqiyatsizlik deb hisoblanadigan upstream statuslari. |
| `baseCooldownMs`        | `120_000` (120 s)                | Birinchi muvaffaqiyatsizlik uchun boshlang'ich blokirovka davomiyligi.    |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Oshirilgan sovutishning yuqori chegarasi.                                 |
| `maxBackoffSteps`       | `10`                             | Maksimal eksponentsial-backoff eskalatsiya qadamlari.                     |
| `useExponentialBackoff` | `true`                           | Takroriy muvaffaqiyatsizliklar sovutishni eksponentsial oshiradimi.       |

Sozlamalar oddiy sozlamalar ombori orqali saqlanadi va resilience sozlamalari
sxemasi orqali tekshiriladi; karta `baseCooldownMs`/`maxCooldownMs`ni
(`maxCooldownMs ≥ baseCooldownMs` sharti bilan) va `maxBackoffSteps`ni cheklaydi.

**Muvaffaqiyat-pasayishi tiklanishi:** tiklanish **faqat** taymer tugashi emas.
Sog'lom javob modelning muvaffaqiyatsizliklar sonini orqaga qaytarib tushiradi,
shuning uchun oyna o'rtasida tiklangan model taymeri tugashidan oldin eskalatsiyani
to'xtatadi (va tozalanadi). Muvaffaqiyatli combo nishonida
`open-sse/services/combo.ts` `decayModelFailureCount()`ni chaqiradi
(`open-sse/services/accountFallback.ts`), u saqlangan `failureCount`ni
**yarmiga** kamaytiradi (`Math.floor(failureCount / 2)`); u `0`ga yetganda
blokirovka yozuvi butunlay o'chiriladi. Qarama-qarshi
`recordModelLockoutFailure()` eskalatsiya oynasi ichidagi
muvaffaqiyatsizliklarda sonni oshiradi (va sovutishni eskalatsiya qiladi). Bu
muvaffaqiyat-pasayishi oddiy taymer tugashiga qo'shimcha — ikkala yo'l ham
modelni qayta yoqishi mumkin.

**Holat:** blokirovkalari **xotirada** saqlanadi (har bir jarayon uchun
`provider:connectionId:model` kaliti bilan bog'langan `ModelLockoutEntry`
`Map`lari, aniq qamrovli qulflar esa `provider:connectionId:exact:model` bilan),
DB ga saqlanmaydi — ular qayta ishga tushirishda yo'qoladi. _Sozlamalar_
saqlanadi; faol blokirovka _holati_ vaqtinchalikdir.

---

## 4. Quota-share parallellik nazorati (v3.8.36)

Obuna hisoblari (GLM, MiniMax va boshq.) ko'pincha atigi ~1–3 ta parallel so'rovni qabul qiladi; bundan oshib ketish 429 xatolarini va cooldown (sovutish) davrlarini keltirib chiqaradi. Bu **quota-share** (`qtSd/…`) kombinatsiyalarida keskin namoyon bo'ladi, bunda bir nechta API kalit bitta upstream hisobini bo'lishadi. Uch qatlam umumiy hisobning to'lib ketishidan (flood) himoya qiladi.

### Har bir ulanish uchun parallellik chegarasi (`max_concurrent`)

Har bir provayder ulanishi `max_concurrent` chegarasini e'lon qilishi mumkin
(`provider_connections.max_concurrent`, ulanish modali / API / DB orqali o'rnatiladi).
Cheklov bo'lmasligi uchun uni bo'sh qoldiring. Bu — quyidagi seriyalash qatlamini
boshqaradigan yagona parametr: uni hisobning haqiqiy parallellik darajasiga o'rnating
(masalan, GLM ~1, MiniMax ~2).

### Har bir model uchun parallellik chegaralari (`modelConcurrency`)

Ulanish qo'shimcha ravishda o'zining `rateLimitOverrides` xaritasi ichida har bir model uchun aniq parallellik chegaralarini e'lon qilishi mumkin:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Buni ulanish modalida (**Rate limit overrides → Har bir model uchun parallellik
chegaralari**, har qatorda bitta `model=cap`) yoki xuddi shunday JSON ko'rinishi bilan
`PATCH /api/providers/[id]` orqali o'rnating. Asosiy semantika:

- **Butun ulanish bo'yicha va modelga xos:** `maxConcurrent` umumiy, butun
  ulanish bo'yicha chegara bo'lib qoladi. Ikkalasi ham qo'llanilganda, ikkala
  darvoza bir xil kompozit darvozada atomik tarzda olinadi
  (`global → provider → account → model`); amaliy natija — qo'llaniladigan
  eng qat'iy cheklovga teng.
- **Model kalitining aniq mosligi:** kalit — marshrutlash aniqlangandan keyin
  ijrochiga uzatiladigan model satri, ya'ni odatda sof upstream model
  identifikatori (`glm-5`), mijoz tomonidagi `provider/model` taxallusi emas
  (`zai/glm-5` `glm-5` ga mos kelmaydi). Qiymatlar — musbat butun sonli parallel
  so'rovlar chegaralari.
- **Mahalliy navbat, avtomatik aniqlash yo'q:** ortiqcha so'rovlar mavjud
  navbat/timeout semantikasi bilan mahalliy navbatga qo'yiladi (tipli
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` kirish xatolari). OmniRoute
  upstream siyosatini aniqlamaydi yoki taxmin qilmaydi — u operator sozlagan
  aniq chegaralarni qo'llaydi. To'yangan model darvozasi provayderni hech qachon
  o'chirmaydi va doimiy model blokirovkasini yaratmaydi; upstream
  429/cooldown/fallback xatti-harakati xatolarning oxirgi himoyasi bo'lib qoladi.
- **Har bir ulanish va har bir jarayon doirasida:** chegaralar har bir ma'lumotlar
  bazasi ulanishi uchun belgilanadi va xotirada saqlanadi, shuning uchun bir xil
  upstream API kalitini qayta ishlatadigan ikki ulanish bir-biri bilan
  muvofiqlashmaydi.
- **Sozlanmagan — o'zgarmagan degani:** xaritani kiritmaslik (yoki boshqaruv
  paneli maydonini bo'sh qoldirish) hech qanday model darvozasini qo'shmaydi.
  Har qanday universal provayder chegarasini ta'kidlamagan holda misol
  konfiguratsiya:

```text
glm-5=1
glm-4.7=3
```

### Quota-share so'rovlarini seriyalash

Quota-share yuborish (dispatch) musbat `max_concurrent` e'lon qilgan ulanishga
qaratilganda, ushbu **hisobga** qilingan parallel so'rovlar har bir ulanish uchun
semafor orqali seriyalanadi (kalit `qsconn:<connectionId>`): ortiqcha so'rovlar
hisobni to'ldirib yuborish o'rniga **navbatda kutadi**. Bu **fail-open** — to'yangan
navbat yoki timeout yuborilishi mumkin bo'lgan so'rovni hech qachon rad etish
o'rniga, slotsiz davom etadi. **Sozlamalar → Chidamlilik → Quota-share har-ulanish
parallelligi** bo'limida almashtiriladi
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, sukut bo'yicha yoqilgan).
`max_concurrent` chegarasisiz xatti-harakat o'zgarmaydi.

> Quota-share marshrutlash darvozasi (`selectQuotaShareTarget`, DRR + P2C) o'zi ham
> fail-open bo'lib, chegaraga yetgan ulanishni faqat _ustuvorlikdan tushiradi_ —
> bitta ulanishli hovuz (pool) bilan u qattiq cheklay olmaydi, shuning uchun
> to'lqinni aslida ushbu semafor tiib turadi.

### Kombinatsiya uchun cooldown'ni hisobga oluvchi qayta urinish

Har bir kombinatsiya strategiyasi uchun (yoqilgan bo'lsa), QISQA vaqtinchalik
cooldown sababli 429 ni keltirib chiqaradigan so'rov 429 ni qaytarish o'rniga
uni kutib turadi va qayta yuboradi — bu ko'p modelli kombinatsiyalarda
Gemini sinfidagi TPM/RPM oynalarini (~60s retry-after) qamrab oladi, masalan,
2 modelli kombinatsiyaning ikkala nishoni ham model bo'yicha rate limit'ga duch
kelganda. **Sozlamalar → Chidamlilik** dagi `comboCooldownWait` (`enabled`,
`maxWaitMs`, `maxAttempts`, `budgetMs`) bilan chegaralanadi. U `quota_exhausted`
(yarim tungacha qulflangan) yoki auth/not-found sabablari bo'yicha hech qachon
kutmaydi.

Xuddi shu darvoza yuborishdan oldingi holatni ham qamrab oladi (#16319): kombinatsiyaning
har bir nishoni uning modeli qisqa vaqtinchalik blokirovkada bo'lgani uchun birorta
urinish amalga oshirilishidan oldin o'tkazib yuborilsa, nol-urinishli yo'l xuddi
shu chegaralar ostida qulfning ochilishini kutadi va qayta yuboradi — ishorasiz
`503 ALL_TARGETS_SKIPPED` javobini berish o'rniga. Kutishga ruxsat bo'lmaganda
(chegara, urinish yoki byudjet tugagan, yoki funksiya o'chirilgan), yakuniy javob
eng erta vaqtinchalik qulfning tugash muddatidan olingan `retry_after` /
`reset_at` qiymatlarini olib yuruvchi `429 rate_limit_error` ga ko'tariladi; kvota,
auth va not-found qulflari ishorasiz 503 ni saqlab qoladi.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Navbatga qabul qilishni boshqarish (v3.8.49 · masala #6593)

**Qamrov**: har bir provayder+ulanish uchun lokal rate-limit navbati (`open-sse/services/rateLimitManager.ts`,
Bottleneck'ga asoslangan), yuqoridagi uchta mexanizmdan bir qatlam pastda.

**`maxWaitMs` navbat kutishini chegaralaydi; `executionMaxWaitMs` bajarilishni chegaralaydi.**
Ikkalasi ataylab ajratilgan va hech biri ikkinchisini oziqlantirmaydi.

`resilienceSettings.requestQueue.maxWaitMs` — bu **navbatda kutish byudjeti**: u
provayder slotini kutishni va so'ngra QUEUED holatida turishni qamrab oladi va uning taymeri
vazifa QUEUED holatidan chiqib, bajarilishni boshlagan zahoti tozalanadi
(`rateLimitManager.ts`, `wrappedFn`). Undan oshib ketgan so'rov hech qachon upstream'ga yetib bormaydi.
Standart 30000ms, `src/lib/resilience/settings.ts` faylidagi `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
tomonidan beriladi va `tests/unit/ratelimit-admission-control-6593.test.ts` bilan qotirilgan,
shuning uchun uning o'zgarishi ushbu paragrafni jimgina eskirib qolishga qoldirmasdan, o'sha testni qizil qiladi.

`resilienceSettings.requestQueue.executionMaxWaitMs` — bu Bottleneck vazifa `expiration`i sifatida
qabul qiladigan qiymat, uning taymeri faqat dispatch'dan keyin boshlanadi. Bu
o'zining upstream timeout'iga ega bo'lmagan bajaruvchilar uchun zaxira to'siq bo'lib,
agar bajaruvchining o'z fetch-start timeout'i uzunroq bo'lsa, o'sha qiymatgacha ko'tariladi,
shuning uchun u sog'lom, davom etayotgan javobni to'xtatib qo'ya olmaydi. Standart 600000ms (10 daqiqa).

Navbat byudjetini `expiration`ga oziqlantirish aynan shu narsa ilgari inkremental bo'lmagan
gateway'larni bajarilish o'rtasida o'ldirardi — ular birinchi baytlargacha qonuniy ravishda bir necha daqiqa ishlaydi —
va shuning uchun expiration `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) sifatida yuzaga chiqadi, navbat byudjeti esa
navbat-timeout kodini olib yuradi. Ikkalasini ham `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) yoki dashboard orqali boshqaring
(**Settings → Resilience**). Normalizatsiya qilinganda ikkalasi ham 1ms–24s oralig'iga cheklanadi.

**Ustuvorlik, ikkalasi uchun ham:** env o'zgaruvchisi faqat _standart_ qiymatni beradi. `resilienceSettings.requestQueue`da
saqlangan qiymat (dashboard / API patch, `key_value`da saqlanadi) undan ustun turadi, va har bir ulanish uchun
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` esa bundan ham ustun turadi. Shuning uchun
allaqachon saqlangan qiymatga ega bo'lgan deployment'da env o'zgaruvchisini o'rnatish
hech narsani o'zgartirmaydi — buning o'rniga saqlangan sozlamani tozalang yoki yangilang.

Navbatda turish `maxWaitMs` bilan chegaralanadi; quyidagi `maxQueueDepth` bir vaqtning o'zida
qancha chaqiruvchi navbatda turishi mumkinligini chegaralaydi.

**Javob tanasida ko'rsatilgan qayta urinishlar: pacing va lockout.** 429 javob tanasi o'zining kutish vaqtini
nomlashi mumkin (Gemini `RetryInfo.retryDelay`, "retry after Ns" matni), buni
`updateFromResponseBody` o'qiydi. Ulanishning `maxWaitMs`iga mos keladigan kutish — bu pacing: limiter
o'sha vaqt davomida o'z rezervuarini bo'shatadi va navbatdagi chaqiruvlar u qayta to'lganda dispatch qilinadi.
`maxWaitMs`dan uzunroq kutish esa navbat o'tirib kuta olmaydigan narsadir — Gemini tugagan kunlik kvotaga
`retryDelay: "86399s"` bilan javob qaytaradi. Qayta qurilgan 429'dagi uzatilgan `Retry-After` (#16528)
allaqachon fallback dvigatelining modelni o'sha oyna uchun bloklashiga olib keladi, ammo limiterni ham
shu sababdan pauza qilish kalitga erta yetib kelgan har qanday chaqiruvni (masalan, resilience reset'dan keyin)
butun `maxWaitMs` davomida to'xtatib qo'yar edi. Bunday kutish tiplashtirilgan Google `RetryInfo`
detalidan (`google_rpc_retry_info` kelib chiqishi) kelib chiqqanda va kalitning limiteri allaqachon modelga
chegaralangan bo'lsa (qarang `getLimiterKey`), 429 o'sha ulanishda model lockout'iga aylanadi
(`open-sse/services/rateLimitManager/bodyRetryPause.ts` faylidagi `lockModelForLongBodyRetry`, maksimal 24 soat),
va limiter pauza qilinmagan holda qoldiriladi. Akkaunt tanlash bu lock'ni `isModelLocked()` orqali o'tkazib yuboradi,
ulanishga bog'langan maqsadlar uchun combo pre-dispatch gate ham shunday qiladi. Antigravity'da, uning limiteri
har bir kvota oilasi uchun bo'lsa, lock uning boshqa kvota lock'lari kabi aniq modelga qo'yiladi. Alias uni o'sha modelga
hal qilgan bo'lsa, mijoz so'ragan nom ham lock qilinadi, chunki bu tekshiruvlar so'ralgan nomdan foydalanadi;
u aniq (`lockExactModel`) lock qilinadi, shuning uchun antigravity kvota oilasini yoki codex qamrovini kesib o'tuvchi
alias hech qachon o'zini lock qilmaydi. Proza ko'rinishidagi ishora, tiplashtirilmagan `retryDelay` yoki butun ulanish
tomonidan bo'lishilgan limiter pauzani saqlab qoladi. 429 yo'li hozirgina qayta qurgan limiter haqiqatan pauza qilsa,
qolgan navbat vaqti pauza tugashidan oldin tamom bo'ladigan chaqiruv o'sha vaqtni kutmasdan, darhol
navbat-timeout kodi bilan qaytariladi (`checkLimiterPause`); qayd etilgan tugash limiter qurilishidan oldin,
Bottleneck o'zining yangilash soatini boshlaydigan joyda bog'lanadi va rezervuarga keyingi har qanday o'zgarish uni unutadi.
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` va
`tests/unit/rate-limit-body-retry-pause.test.ts` bilan qamrab olingan.

**`maxQueueDepth` — ixtiyoriy qabul qilish chegarasi (yangi).** `resilienceSettings.requestQueue.maxQueueDepth`
bir vaqtning o'zida bitta provayder+ulanish uchun qancha so'rov navbatda (hali dispatch qilinmagan) turishi mumkinligini chegaralaydi.
Navbat allaqachon `maxQueueDepth` so'rovni ushlab turganda, yangi so'rov `limiter.schedule()`ga yetib borishidan **oldin**
tiplashtirilgan `code: "RATE_LIMIT_QUEUE_FULL"` xatosi bilan tez rad etiladi
— shuning uchun rad etish arzon bo'lib, o'sha so'rov uchun har qanday quyi oqimdagi
prompt-compression / tarjima ishlaridan oldin sodir bo'ladi. Standart `0` =
o'chirilgan, mavjud chegaralanmagan navbat xatti-harakatini saqlab qoladi; chegaralangan 0–100000.
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) yoki
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch) orqali boshqaring.

Qabul qilish tekshiruvining o'zi sof funksiya
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), shuning uchun uni haqiqiy Bottleneck limiter'isiz
unit-test qilish mumkin.

> #6593 ni ochgan RFC shuningdek `bypassCompressionOnRateLimit`
> bayrog'ini ham taklif qilgan edi. Bu repodagi `open-sse/services/compression/`
> pipeline'i chiquvchi LLM so'rovida prompt/kontekst siqilishi (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` bloki atrofida),
> sintez qilingan 429 tanalarida HTTP javob siqilishi emas — so'zma-so'z
> bypass bayrog'i uchun mos keladigan kod yo'li mavjud emas. Bu prompt siqish
> qadami hozirda so'rov pipeline'ida `withRateLimit()` dan _oldin_ ishlaydi,
> shuning uchun navbat to'lgan holda rad etilganda uni o'tkazib yuborish uchun
> qayta tartibga solish — bu issue doirasidan tashqaridagi alohida, kattaroq
> o'zgarishdir; u ataylab bu yerda **amalga oshirilmadi** va CPU tejash foydasi
> qayta tartibga solish xavfiga arziydigan bo'lsa, keyingi ish sifatida
> qoldirildi.

### Rate-limit avtomatik yoqish xavfsizlik tarmog'i va ulanish himoyasi (`rateLimitProtection`)

**Avtomatik yoqish xavfsizlik tarmog'i** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, standart `true`):
Standart holatda OmniRoute barcha faol API-kalit provayder ulanishlari uchun rate-limit navbat himoyasini avtomatik ravishda yoqadi (`getProviderCategory(provider) === "apikey"`). Bu so'rov tezligiga sezgir yuqori oqim API kalitlariga kiruvchi so'rovlar yuqori oqim 429 xatolariga o'z-o'zidan portlash o'rniga Bottleneck orqali navbatga qo'yilishi va cheklanishini ta'minlaydi. Xavfsizlik tarmog'ini `RATE_LIMIT_AUTO_ENABLE` muhit o'zgaruvchisi orqali bekor qilish mumkin (`false`/`0`/`off` o'chiradi, `true`/`1`/`on` majburiy yoqadi), bu esa saqlangan dashboard sozlamasidan ustun turadi (**Sozlamalar → Chidamlilik** / `PATCH /api/resilience`).

**Har bir ulanish uchun `rateLimitProtection` semantikasi:**
Har bir ulanish uchun rate-limit himoyasi provayder ulanishlaridagi `rateLimitProtection` boolean maydoni orqali kuzatiladi (SQLite'da `rate_limit_protection` sifatida saqlanadi):

- **Aniq yoqilgan (`rateLimitProtection === true`)**: Ushbu ulanish uchun rate-limit himoyasi provayder toifasidan yoki avtomatik yoqish xavfsizlik tarmog'i yoqilgan-yoqmaganidan qat'i nazar, aniq yoqilgan.
- **Aniq o'chirilgan (`rateLimitProtection === false`)**: Aniq himoyani o'chiradi, lekin faol API-kalit ulanishini global avtomatik yoqish xavfsizlik tarmog'idan **chiqarmaydi**. `reconcileEnabledConnections` da (`open-sse/services/rateLimitManager.ts`) `false` va `undefined` teng: faqat `rateLimitProtection === true` aniq bekor qilish (override) sifatida qabul qilinadi. Agar `rateLimitProtection` `false` bo'lsa (yoki o'rnatilmagan bo'lsa), faol API-kalit ulanishi hali ham avtomatik yoqish shartiga mos keladi va rate-limit himoyasida qolaveradi.
- **Har bir ulanish uchun alohida chiqish imkoniyati yo'q**: Operator hozirda boshqalar uchun avtomatik yoqishni faol saqlagan holda "ushbu yagona faol API-kalit ulanishi rate-limit navbat himoyasisiz ishlashi kerak" degan holatni ifodalay olmaydi. API-kalit ulanishlarini rate-limit navbatlarisiz to'liq ishlatish uchun xavfsizlik tarmog'i global ravishda o'chirilishi kerak (`RATE_LIMIT_AUTO_ENABLE=false` yoki `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Qo'llab-quvvatlanadigan yozish yo'llari:**

- **`POST /api/rate-limits`**: Ulanish uchun `rateLimitProtection` ni almashtirishning qo'llab-quvvatlanadigan boshqaruv yozish yo'li (`{ connectionId: string, enabled: boolean }`). Buni `enabled: true` bilan chaqirish aniq himoyani yoqadi; `enabled: false` bilan chaqirish esa aniq himoyani olib tashlaydi (garchi avtomatik yoqish yoqilgan bo'lsa, faol API-kalit ulanishlari global xavfsizlik tarmog'i ostida qolsa-da).
- **`PUT /api/providers/[id]`**: Ataylab `rateLimitProtection` ni qabul qilmaydi va o'zgartirmaydi (#11278). `PUT /api/providers/[id]` orqali provayder ulanishi metama'lumotlarini yangilash hech qachon saqlangan rate-limit himoyasi holatini o'zgartirmaydi.

---

## 6. Sekin oqim throughput kuzatuvchisi (#9709)

Ixtiyoriy `resilienceSettings.streamRecovery.throughputWatchdog` nazoratchisi hali ham bo'laklar yuborayotgan, lekin sozlangan foydali-chiqish tezligidan past assistent chiqishi ishlab chiqarayotgan upstreamni aniqlaydi. U bo'sh turish timeout'idan ataylab farq qiladi: heartbeat'lar va metadata hech qaysi taymerni qayta o'rnatmaydi va taraqqiyot deb hisoblanmaydi. U shuningdek qattiq urinish deadline'idan (#9153) ham farq qiladi, chunki u chiqish sifatidan qat'i nazar mutlaq xavfsizlik chegarasi bo'lib qoladi.

Kuzatuvchi abort qilishidan oldin isinish davri va undan so'ng to'liq siljiydigan oynani talab qiladi. U Chat Completions va Responses API chiqish hodisalaridagi matn deltalarini sanaydi (ehtiyotkor UTF-8 bayt proksisi), faqat usage'dan iborat va bo'sh hodisalarni e'tiborga olmaydi hamda tool-call yoki reasoning hodisalari jarayonda bo'lganda baho berishni to'xtatib turadi. U sukut bo'yicha o'chirilgan va `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` bilan yoqilishi mumkin; oyna, isinish davri, minimal tezlik va minimal o'lchanadigan chiqish odatiy resilience-settings normalizatsiya qatlami tomonidan chegaralanadi.

Yoqilganda, kuzatuvchi aborti faqat faol upstream urinishiga nisbatan qo'llaniladi. Mijozga ko'rinadigan birorta baytdan oldin mavjud bir akkauntli erta tiklash yo'li urinishni qayta ochishi mumkin. Commitdan keyin oqim hech qachon ko'r-ko'rona qayta ijro etilmaydi; faqat mavjud xavfsiz oqim-ichida davom ettirish kontrakti suffiksni tikib qo'sha oladi. Yakunlash bir martalik bo'lib qoladi, shu bois usage hisobi va semaforni bo'shatish takrorlanmaydi.

---

## 7. Upstream statusini qayta bayon qilish (notoʻgʻri koʻrsatilgan kvota xatolari)

**Qamrov:** vaqtinchalik kvota tugashini notoʻgʻri HTTP status bilan xabar qiladigan bitta upstream shlyuz.

**Maqsad:** chalgʻituvchi statusni tasniflashdan OLDIN tuzatish, shunda quyi oqim iste'molchilari (fallback dvigateli, combo agregatsiyasi, mijozga qaratilgan javob) xatolikning qayta urinish mumkin boʻlgan haqiqiy tabiatini koʻradi.

Ba'zi shlyuzlar VAQTINCHALIK kvota tugashini qayta urinib boʻlmaydigan HTTP
status bilan bildiradi. `agentrouter.org` standart `429` oʻrniga xitoycha
javob tanasi (`用户额度不足` / `额度不足`) bilan `403` (ba'zan `400`) qaytaradi.
Claude Code kabi mijozlar `403` ni doimiy deb bilib, sessiyani bekor qiladi,
va tuzatishsiz fallback dvigateli uni kvota hodisasi oʻrniga `AUTH_ERROR`
deb tasniflardi.

**Amalga oshirish:**

- Reestr + moslashtiruvchi: `open-sse/config/upstreamStatusRestatement.ts` —
  har bir provayder uchun qoidalar roʻyxati (`{id, fromStatuses, toStatus,
textMarkers, excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()`
  orqali moslashtiriladi.
- Chaqiruv nuqtasi: `open-sse/handlers/chatCore.ts` faylidagi `providerFailure:`
  bloki (taxminan 3654-qator), `parseUpstreamError()` xato HTTP statusli
  upstream javobini tahlil qilgandan (`!providerResponse.ok`) soʻng darhol va
  har qanday tasniflash ishga tushishidan oldin, shunda har bir quyi oqim
  iste'molchisi tuzatilgan statusni koʻradi. `200` SSE oqimi ichiga
  joylashtirilgan xatolar alohida, keyinroq bajariladigan oqim-tahlil
  yoʻlidan oʻtadi va bugungi kunda bu hook tomonidan qamrab **olinmaydi** —
  bu ma'lum cheklov bo'lib, agentrouter'ning notoʻgʻri statusi uchun hali
  kerak emas (u xato HTTP statusi sifatida yuzaga chiqadi).
- Qayta urinishga moslik: `429` `RETRY_AFTER_ELIGIBLE_STATUSES` ichida
  (`open-sse/services/combo/unavailableRetryGate.ts`), shuning uchun qayta
  bayon qilingan xato oʻlik `403` sifatida koʻrinish oʻrniga haqiqiy qayta
  urinish oynasiga ega boʻladi.
- Sintetik `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) —
  bu faqat qayta bayon qilingan javob **mijozga** aytadigan qiymat; u oʻzi
  ulanishning ichki cooldown/lockout davomiyligi emas — buni qayta bayon
  qilingan xatoni amalda qayta ishlaydigan mexanizm alohida boshqaradi
  (Connection Cooldown'ning ortib boruvchi backoff'i, §2, API-kalit
  provayderlari uchun bazaviy `3s`; yoki Model Lockout, §3, agentrouter
  kabi model-kvota provayderlari uchun). Router mijozga e'lon qiladigan
  60s oynadan oldinroq ichkarida qayta urinishga mos boʻlishi mumkin —
  bu qasddan qoldirilgan zaxira, xatolik emas.

Doimiy xatolar (agentrouter'ning `无权访问模型` — bu modelga kirish yoʻq)
HECH QACHON qayta bayon qilinmaydi: `excludeMarkers` hatto `textMarkers`
mos kelganda ham qoidaga veto qoʻyadi, shuning uchun xato asl statusini
saqlab qoladi va hech narsa uni abadiy qayta urinmaydi. Mos keluvchi
provayder tasnif qoidasi (`open-sse/config/providerErrorRules.ts` dagi
`agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`,
e'lon qilingan `6h` bazaviy cooldown) umumiy apikey toifasidagi `FORBIDDEN`
erta-qaytishdan _oldin_ `checkFallbackError`
(`open-sse/services/accountFallback.ts`) tomonidan koʻrib chiqiladi,
`honorsRuleLockScope(provider)` shartiga bogʻlangan holda (#10334 — hozircha
faqat agentrouter'ga xos, `providerErrorRules.ts` dagi
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist'i orqali). Qoidaning e'lon
qilingan 6h cooldown'i `fallbackResult.baseCooldownMs` sifatida uzatiladi,
lekin u baribir ilgaridan mavjud model-kvota lockout yoʻlagini quvvatlaydi
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, #10334
tomonidan cooldown manbasidan tashqari oʻzgartirilmagan): u har qanday
boshqa model lockout'i kabi operatorning `mlSettings.maxCooldownMs`
qiymatiga (standart `1_800_000ms` / 30 daqiqa) qisqartiriladi, va
_saqlanadigan lockout sababi_ qoidaning `"auth_error"` i emas, balki
ilgaridan mavjud qattiq kodlangan `"forbidden"` boʻlib qoladi — toʻliq
zanjirda faqat cooldown davomiyligi hisobga olinadi, sabab qatori emas.
Ulanishning oʻzi faol qoladi; shu ulanishdagi qo'shni modellarga
ta'sir qilmaydi.

Qayta bayon qilingan kvota xatolari (`额度不足`) prodakshnda provayder
qoidasiga yetib boradi (`agentrouter-user-quota-exhausted`:
`reason: "quota_exhausted"`, `scope: "connection"`, oʻziga xos e'lon
qilingan cooldown'i yoʻq — saqlash qatlamining masshtablangan backoff
standarti qo'llaniladi). #10334 dan beri `ProviderErrorRuleMatch` dagi
`scope` toʻliq zanjirda HAQIQATAN iste'mol qilinadi, lekin **faqat**
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist'idagi provayderlar uchun
(`providerErrorRules.ts` — bugun faqat `"agentrouter"`,
`honorsRuleLockScope()` orqali shartlangan). Boshqa barcha provayderlar
uchun `scope` aynan #10334 dan oldingidek, ma'lumot uchun qoladi.
`checkFallbackError` mos kelgan qoidaning scope'ini
`fallbackResult.ruleScope` sifatida chiqaradi;
`isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) —
`ruleScope` ni butun ulanish miqyosida, oʻz-oʻzidan tiklanadigan signal
sifatida hisobga olish haqiqatan xavfsiz ekanligini tasdiqlovchi umumiy
himoyachi (scope `"connection"`, sabab `quota_exhausted`, hech qachon
`permanent` emas, hech qachon `creditsExhausted` emas — kelajakdagi
qoidaning scope `"connection"` ni doimiy hisob holati bilan juftlashiga
qarshi himoya). Ikki iste'molchi uni chaqiradi:

- **Doimiylik** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provayderning **har bir model uchun** blokirovka
  tarmog'iga tushib qolish o'rniga (agentrouter `passthroughModels: true` →
  `hasPerModelQuota()` `true` qaytaradi), u **vaqtinchalik ulanish
  sovutishini** qo'llaydi — `testStatus: "unavailable"` + `rateLimitedUntil`,
  hech qanday yakuniy status emas
  (`credits_exhausted`/`banned`/`expired`) — shuning uchun sovutish muddati
  tugagach, qo'lda credentialni qayta sozlash talab etilmasdan, ulanish
  o'z-o'zidan tiklanadi.
  `disableCooling: true` bo'lgan ulanishlar uchun o'tkazib yuboriladi (#2997):
  bunday opt-out buning o'rniga har bir model uchun blokirovkaga o'tib o'tadi
  (hujjatlashtirilgan kompromiss — tarmoq ustidagi kod sharhiga qarang).
- **Bir xil so'rov kombo marshrutlash** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): xuddi shu himoya ulanishni
  xotira-ichidagi `exhaustedConnections` to'plamiga
  `${provider}:${connectionId}` kaliti bilan belgilaydi. Bu faqat o'z target
  obyektida _aynadan o'sha `connectionId`ni allaqachon olib yuruvchi_ qolgan
  BIR XIL SO'ROV targetini o'tkazib yuboradi
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections`
  qidiruvidan oldin `if (provider &&
connectionId)`) — oddiy model-ro'yxati kombosi, bunda qo'shni targetlar
  o'zlariga mahkamlangan `connectionId` olib yurmaydi va bittasi faqat har bir
  jo'natishda javobning `X-OmniRoute-Selected-Connection-Id` sarlavhasidan
  aniqlanadi, hech qachon bu kalit mosligiga duch kelmaydi. Bu keng tarqalgan
  holat uchun, qolgan oyoqning hozirgina tugatilgan hisobni qayta ishlatishidan
  haqiqiy himoya bu Set EMAS — bu yuqoridagi doimiylik qatlami (ulanishning
  `rateLimitedUntil` endi kelajakda) va xuddi shu himoyaning ushbu xato uchun
  `transientRateLimitedProviders`ni bostirishi kombinatsiyasidir ("Ikki bosqichli
  dizayn" bo'limi va `targetExhaustion.ts`dagi
  `isAgentrouterConnectionQuotaScope` tarmog'idagi kod sharhiga qarang): bu Set
  belgilanmagan holda qoldirilganda, `combo.ts`ning
  `allowRateLimitedConnection` majburiy ruxsati
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) provayderning qolgan
  oyoqlari uchun umuman ishga tushmaydi, shuning uchun credential tanlashning
  `rateLimitedUntil` filtri (`src/sse/services/auth.ts:1238`) odatdagidek hurmat
  qilinadi va qolgan oyoq yoki hali ham mos bo'lgan boshqa agentrouter
  ulanishini tanlaydi, yoki mavjud credentiallar yo'qligi sababli
  muvaffaqiyatsiz bo'ladi — u bu tarmoq hozirgina sovutgan ulanishga o'zini
  majburan qaytarmaydi.

### Ikki bosqichli dizayn: statusni qayta bayon qilish, so'ng tasniflash

Statusni qayta bayon qilish (`upstreamStatusRestatement.ts`) va provayder
tasniflash qoidalari (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ikkalasi ham provayder identifikatori va matn
markerlariga kalitlanadigan alohida reyestrlardir, lekin ular turli joylarda
ishlaydi va turli maqsadlarga xizmat qiladi: qayta bayon qilish HTTP statusini
`chatCore.ts`da erta bosqichda qayta yozadi; tasniflash qoidalari esa zaxira
`reason`ni tanlaydi va `scope`ni (`model` / `provider` / `connection`)
`checkFallbackError()` ichida qulflaydi (`open-sse/services/accountFallback.ts`).

Tasniflash qoidalari to'liq xato **matnini** faqat
`providerErrorRules.ts`dagi `FULL_TEXT_RULE_PROVIDERS` ruxsat ro'yxatida
keltirilgan provayderlar uchun ko'radi (`额度不足` kabi tana markerlarini
moslashtirish uchun zarur) — hozircha faqat `"agentrouter"`. Boshqa har bir
**o'rnatilgan katalog** provayderi uchun `checkFallbackError`
`getProviderErrorRuleMatch`ga faqat strukturalashgan xatoni (`{code, type}`)
topshiradi, bu sarlavha/status/kodga asoslangan qoidalar uchun yetarli, lekin
tana-matn markerlariga nisbatan ko'rdir. `resolveRuleMatchBody()` yordamchisi
ushbu tanlovni bajaradi: ruxsat ro'yxatiga kiritilgan provayderlar uchun to'liq
xato matni, aks holda strukturalashgan xato. `FULL_TEXT_RULE_PROVIDERS`ga
**o'rnatilgan** provayder qo'shish har bir provayder bo'yicha aniq opt-in'dir —
u ro'yxatda bo'lmagan har bir provayder uchun standart yo'l baytma-bayt
o'zgarmay qolishi uchun mavjud.

Qoidaning `scope`i (`model` / `provider` / `connection`)
`FULL_TEXT_RULE_PROVIDERS`dan alohida opt-in'dir: `checkFallbackError` uni
faqat `fallbackResult.ruleScope` sifatida ochib beradi va quyi oqim
iste'molchilari uni ma'lumot yorlig'idan farqli biror narsa sifatida faqat
xuddi shu fayldagi `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ruxsat ro'yxatidagi
provayderlar uchun hurmat qiladi (`honorsRuleLockScope()` orqali cheklangan —
bugun faqat `"agentrouter"`). Provayder ushbu ruxsat ro'yxatiga kiritilgach,
`scope: "connection"` mosligi aslida nima qilishini bilish uchun yuqoridagi
"Qayta bayon qilingan kvota xatolari" bo'limiga qarang.

**#11104 — operator e'lon qilgan qoidalar ikkala ruxsat ro'yxatini chetlab
o'tadi.** Operator ushbu faylni tahrirlamasdan, ish vaqtida
`settings.providerErrorRules` orqali
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) har bir
provayder uchun qoida e'lon qilishi mumkin. Operator qoidasini
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ortiga qo'yish —
o'rnatilgan katalog qoidalarining **standart** xatti-harakatini himoya qilish
uchun mo'ljallangan ruxsat ro'yxatlari — sozlamalar mexanizmini u yerda
allaqachon keltirilgan provayderlardan tashqari barcha provayderlar uchun
samarasiz qilib qo'yardi, chunki qoidani e'lon qilishning o'zi allaqachon
operatorning aniq opt-in'idir. `resolveRuleMatchBody()` va
`honorsRuleLockScope()` ikkalasi ham avval `hasOperatorRuleForProvider()`ni
tekshiradi: operator qoidasiga ega provayder xom xato matnini oladi va uning
e'lon qilingan `scope`i hurmat qilinadi, u biror ruxsat ro'yxatida ham
ko'rsatilganmi-yo'q, bundan qat'i nazar.

**Ma'lum bo'shliq — `providerRuleRegistry` HTTP 400 uchun hech qachon
murojaat qilinmaydi.** `checkFallbackError`ning `BAD_REQUEST` tarmog'i 400
statusini to'liq o'zining naqsh massivlari (`accountFallback.ts`dagi
`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` va boshqalar) orqali
tasniflaydi va undan yuqoridagi `configuredRule`/`getProviderErrorRuleMatch`
tarmog'iga yetib borishdan oldin qaytadi. `status: 400`li o'rnatilgan katalog
qoidasi (yoki operator qoidasi) sintaktik jihatdan to'g'ri, lekin hech qachon
ishga tushmaydi. Bugun hech qanday mavjud qoida 400 ni nishonga olmaydi,
shuning uchun ishlab chiqarishda hech narsa ta'sirlanmaydi — lekin kelajakdagi
400 qoidasi avval ushbu tarmoqni o'zgartirishni talab qiladi, bu qoida
qo'shishdan ko'ra kattaroq o'zgarishdir (u naqsh-massiv xatti-harakatiga
allaqachon tayanadigan har bir provayder uchun 400 ni qayta tasniflaydi) va
bitta provayder qoidasini qo'shish doirasidan tashqarida.

### Kvotani notoʻgʻri bildiruvchi yangi gateway qoʻshish

1. `statusRestatementRegistry` da bitta qoida massivini roʻyxatdan oʻtkazing
   (`open-sse/config/upstreamStatusRestatement.ts`). `textMarkers` ni
   provayderga xos saqlang; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) bilan toʻqnashadigan umumiy
   inglizcha iboralarni hech qachon qayta ishlatmang.
2. Toʻgʻri qulflash doirasini tanlash uchun ixtiyoriy ravishda
   `open-sse/config/providerErrorRules.ts` faylida (`providerRuleRegistry`)
   tasniflash qoidalarini roʻyxatdan oʻtkazing (hisob boʻylab kvota uchun
   `connection`, har bir modelga xos xatolar uchun `model`). Bu qadam
   production muhitida faqat qoidalari toʻliq xato matnini (body markerlarini)
   talab qiladigan provayderlar uchun kuchga kiradi: provayder
   identifikatorini xuddi shu fayldagi `FULL_TEXT_RULE_PROVIDERS` ga qoʻshing —
   aks holda `checkFallbackError` qoidaga faqat tuzilmaviy `{code, type}`
   xatosini topshiradi va body-matn qoidasi jonli trafikda hech qachon mos
   kelmaydi. Faqat `status`/`headers` boʻyicha mos keladigan qoidalar
   (masalan, Opencode yoki Minimaxniki) uchun bu opt-in talab qilinmaydi.
   Bundan alohida, agar qoida `scope: "connection"` ni eʼlon qilsa va maqsad
   haqiqiy ulanish boʻylab cooldown hamda bir xil soʻrov doirasida combo
   oʻtkazib yuborish boʻlsa (shunchaki axborot beruvchi yorliq emas),
   provayder identifikatorini xuddi shu fayldagi
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ga qoʻshing — aynan shu
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) va
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) ichida
   `isAgentrouterConnectionQuotaScope()` uslubidagi isteʼmolni boshqaradi;
   u boʻlmasa, `scope` baribir `fallbackResult.ruleScope` orqali oqib oʻtadi,
   lekin uni hech narsa amalda qoʻllamaydi.
3. `tests/unit/upstream-status-restatement.test.ts` va
   `tests/unit/agentrouter-error-rules.test.ts` ga oʻxshatib unit testlar
   qoʻshing (jumladan, not-permanent / not-creditsExhausted himoyalari va —
   agar provayderga allowlist kerak boʻlsa — `resolveRuleMatchBody()` toʻliq
   matnni faqat oʻsha provayder uchun qaytarishini tasdiqlovchi test).

`chatCore.ts`, `classifyError` yoki combo ga hech qanday oʻzgarish talab
qilinmaydi.

#### Egress-bucketli qulflash (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` dagi provayderlar (opencode oilasi)
IP-bucketli upstream sifatida qaraladi (opencode bepul darajasi IP-bucketli,
hisob-bucketli emas — #9611 ga qarang): status-429 boʻyicha `quota_exhausted`
**yoki** `rate_limit_exceeded` deb tasniflangan xato, rotatsiya ularni sinab
koʻrishidan oldin, soʻnggi maʼlum egress IP manzili muvaffaqiyatsiz
ulanishniki bilan bir xil boʻlgan har bir allowlisted-oiladagi ulanishni
cooldown holatiga oʻtkazadi — bu N-1 ta oldindan muvaffaqiyatsizligi
kafolatlangan upstream chaqiruvlarini oldini oladi (#10460/#10525 bilan bir
xil sxema). `rate_limit_exceeded` ataylab kiritilgan:
`markAccountUnavailable` yoʻlida opencode-ga xos qoidalar hech qachon mos
kelmaydi (`checkFallbackError` ga headers/body topshirilmaydi, opencode
`FULL_TEXT_RULE_PROVIDERS` da yoʻq), shuning uchun body qismida obuna-kvota
matni ("monthly usage limit reached") boʻlgan 429 `status_429` qoidasiga
yetib borishdan oldin kvota-matn fallbacki (`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; 1 soatlik cooldown) tomonidan `quota_exhausted` deb
tasniflanadi — kvota matnisiz 429 (oddiy rate limiting) esa `status_429`
qoidasi orqali `rate_limit_exceeded` deb tasniflanadi va baribir IP oilasini
cooldown qiladi. Allowlisted provayder uchun IP-bucketli rate limit tugagan
kvota bilan bir xil signaldir. Halol cheklovlar:

- **Best-effort**: qulf ulanishning so'nggi ma'lum `egress_ip` qiymatini
  `proxy_logs` jadvalidan aniqlaydi (24 soatlik oyna, sinxron, keshsiz). Sovuq
  kesh (egress IP hech qachon tekshirilmagan) yoki qator yo'q →
  muvaffaqiyatsiz ulanish baribir branch tomonidan sovitiladi (avvalgidek
  yoziladi), faqat hech qanday sibling qulflanmaydi.
- **Hech qachon yakuniy emas**: cooldown — yangilanib turuvchi kvota oynasi
  (`testStatus: "unavailable"`); doimiy holat IP darajasidagi signaldan hech
  qachon olinmaydi. `disableCooling` ulanishlari branchni butunlay o'tkazib
  yuboradi.
- **Allowlistdagi oila uchun qulf granularligi o'zgaradi**: bu faqatgina
  sibling optimallashtiruvi emas, balki scope o'zgarishi. opencode —
  `passthroughModels` provayderi, shuning uchun bu branchdan oldin 429 har bir
  MODEL bo'yicha blokirovka hosil qilardi; endi u ulanish cooldown'ini hosil
  qiladi — jumladan, umuman siblingsiz yagona ulanish bilan ishlaydigan
  operator uchun ham. Bu aynan opencode qoida jadvali allaqachon to'g'ri deb
  e'lon qilgan granularlik (`scope: "connection"`, `providerErrorRules.ts`),
  lekin hozirgacha hech qachon bajarilmagan, chunki opencode
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ichida emas. Branch muvaffaqiyatsiz
  ulanishning cooldown'i + `backoffLevel`ini o'zi yozadi, ulanish qamrovli
  agentrouter branchini aks ettiradi va qaytadi — model bo'yicha blok va
  quyidagi umumiy yo'lga hech qachon yetib borilmaydi.
- **Combo ham kiritilgan**: agentrouter branchi kabi, bu scope combo
  chaqiruvchisi 429 ga qo'llaydigan `persistUnavailableState`/`isCombo`
  pasaytirishini ataylab e'tiborsiz qoldiradi. Model bo'yicha blokirovka bu
  scope'ning zaifroq shakli emas, balki noto'g'ri birlik: u tugagan IP haqida
  hech narsa aytmaydi, shuning uchun combo rotatsiyasi har bir sibling uchun
  kafolatlangan muvaffaqiyatsiz chaqiruvdan bittasini behuda sarflashda davom
  etardi.
- **Sibling xavfsizligi**: allaqachon yakuniy holatda bo'lgan
  (banned/credits_exhausted) yoki allaqachon uzunroq cooldown'da bo'lgan
  sibling hech qachon ustidan yozilmaydi.
- **Eksklyuziv allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS`ni kengaytirish —
  egasining aniq qarori; umumiy wiring yo'q (pattern #10334/#10419). Sibling
  so'rovi shu allowlistni SQL literali sifatida takrorlash o'rniga unga
  bog'lanadi, shuning uchun uni kengaytirish bir qatorlik o'zgarish bo'lib
  qoladi.
- **Egress IP rotatsiyasi, ikkala yo'nalishda**: qidiruv oynasi (24 soat)
  egress-IP kesh TTL'idan (5 daqiqa) ancha keng, shuning uchun "so'nggi
  ma'lum IP" joriy holat emas, balki tarix. Agar ulanishning proxysi oyna
  ichida almashgan bo'lsa, qulf chinakamiga ulashilgan IP'ni **o'tkazib
  yuborishi** mumkin (yozilgan IP — yangi, hali tugamagan) — va simmetrik
  ravishda u tugagan IP'dan shu vaqt ichida almashgan siblingni **sovitishi**
  mumkin. Ikkinchi holatda o'sha sibling bitta cooldown oynasini yo'qotadi;
  ikkalasi ham tarixga asoslangan qidiruvning qabul qilingan best-effort
  cheklovlaridir.
- **Xarajat**: `proxy_logs`ning ikkita cheklangan skanerlashi
  (`idx_pl_timestamp` orqali oyna bo'yicha filtrlangan), faqat 429
  chastotasida. Yangi indeks yo'q (migratsiya 134 YAGNI). O'rtacha hajmdagi
  real trafikli DB nusxasida o'lchangan; yuqori o'tkazuvchanlikka ega
  instansiya xuddi shu oynada mutanosib ravishda ko'proq qator saqlaydi.

---

## Boshqa chidamlilik xususiyatlari

- **21 ta marshrutlash strategiyasi** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) ga qarang.
- **Reset-aware routing** (v3.8.0) — ulanishlarni kvota tiklanish vaqtiga ko'ra ustuvor qiladi.
- **Fon rejimi degradatsiyasi** — Responses API dagi `background: true` ogohlantirish bilan sinxron rejimga tushiriladi.
- **Vositalar limitini dinamik aniqlash** — vosita soni limitiga yetilganda provayderlarni chekintiradi.
- **Favqulodda zaxira mexanizmi (fallback)** — `OMNIROUTE_EMERGENCY_FALLBACK` orqali boshqariladi; operatorlar uni qayta ishga tushirishsiz Feature Flags sahifasidan bekor qilishlari mumkin.

---

## Nosozliklarni tuzatish

- Weighted combo `503 all_targets_cooling_down` javobini qaytaradi (`Retry-After` o'rnatilgan, `diagnostics.excluded` har bir targetni `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` bilan sanaydi) → pool sozlangan va ulangan, har bir target shunchaki chidamlilik taymeri tomonidan istisno qilingan; `[COMBO] Weighted selection: every target excluded before dispatch — …` ogohlantirishi sabablarni va qolgan soniyalarni ko'rsatadi. Xuddi shu kombodan olingan `404 no_executable_targets` hech qanday chidamlilik taymeri ishtirok etmaganini anglatadi (ishga tushiradigan hech narsa yo'q yoki har bir akkaunt mavjudlik tekshiruvidan o'tolmagan). `targetResolution.ts` da yig'ilgan istisnolardan `open-sse/services/combo/pinRecovery.ts` da qurilgan.
- Provayderning barcha kalitlari o'tkazib yuborildi → circuit breaker holatini VA har bir ulanishning `rateLimitedUntil`/`testStatus` qiymatini tekshiring.
- Provayder reset oynasidan keyin doimiy istisno qilingan → kod `getStatus()`/`canExecute()` o'rniga xom `state` ni o'qiyapti.
- Bitta kalit ishlamayapti, boshqalari ishlashi kerak → circuit breaker o'rniga connection cooldown ni afzal ko'ring.
- Faqat bitta model ishlamayapti → connection cooldown o'rniga model lockout ni afzal ko'ring.
- Holat o'z-o'zidan tiklanishi kerak edi, lekin tiklanmayapti → kelajakdagi timestamp hamda muddati o'tgan holatni yangilaydigan o'qish yo'lini tekshiring. Doimiy holatlar qo'lda o'zgartirishni talab qiladi.

---

## Runtime holati — agent uchun tezkor ma'lumotnoma

> Agent qo'llanmasi 40k kontekst byudjetidan oshmasligi uchun `AGENTS.md` → "Resilience
> Runtime State" bo'limidan (PR #12743) so'zma-so'z ko'chirildi. Bu yuqoridagi bo'limlarning
> ixcham, agentga mo'ljallangan ko'rinishi; raqamlangan bo'limlar to'liq ma'lumotnoma bo'lib qoladi.

OmniRoute da bir-biri bilan bog'liq, lekin alohida uchta vaqtinchalik xato mexanizmi mavjud. Marshrutlash xatti-harakatida nosozlikni qidirganda ularning qamrovini alohida saqlang. Bir qarashda tushunish uchun [3 qatlamli chidamlilik diagrammasi](../diagrams/exported/resilience-3layers.svg) ga qarang (manba: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)).

### Provayder Circuit Breaker

**Qamrov**: butun provayder, masalan `glm`, `openai`, `anthropic`.

**Maqsad**: upstream/xizmat darajasida qayta-qayta xato berayotgan provayderga trafik yuborishni to'xtatish, shunda bitta nosog'lom provayder har bir so'rovni sekinlashtirmaydi.

**Amalga oshirish**:

- Asosiy klass: `src/shared/utils/circuitBreaker.ts`
- Chat gate/ijro ulanishi: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Runtime holati API si: `src/app/api/monitoring/health/route.ts`
- Umumiy wrapperlar: `open-sse/services/accountFallback.ts`
- Doimiy saqlanadigan holat jadvali: `domain_circuit_breakers`

**Holatlar** (4 ta — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: normal trafik ruxsat etiladi.
- `DEGRADED`: erta ogohlantirish zonasi — xatolar degradatsiya chegarasidan oshdi, lekin hali uzgich chegarasidan oshmadi; trafik davom etadi, dashboardlar ogohlantirishni ko'rsatadi. Yaroqli ulanish testi yoki yangi xatosiz sokin oyna uni `CLOSED` holatiga qaytaradi (oyna `docs/architecture/RESILIENCE_GUIDE.md` da keltirilgan).
- `OPEN`: provayder vaqtincha bloklangan; chaqiruvchilar provider-circuit-open javobini oladi yoki combo marshrutlash boshqa targetga o'tadi.
- `HALF_OPEN`: reset timeout muddati o'tgan; sinov so'roviga ruxsat beriladi. Muvaffaqiyat uzgichni yopadi, xato uni qayta ochadi.

**Standart qiymatlar** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, `src/lib/resilience/settings.ts` dagi `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` orqali ishlatiladi → `src/sse/handlers/chatHelpers.ts` dagi `getCircuitBreaker(provider, …)`). Butun provayder uzgichi `circuitBreakerThreshold` / `circuitBreakerReset` asosida ishlaydi:

| Profil     | degradatsiya | ochilish (`circuitBreakerThreshold`) | tiklash (`circuitBreakerReset`) |
| ---------- | -----------: | -----------------------------------: | ------------------------------: |
| OAuth      |          `5` |                                  `8` |                           `60s` |
| API kaliti |          `7` |                                 `12` |                           `30s` |
| Lokal      |     (hosila) |                                  `2` |                           `15s` |

`PROVIDER_PROFILES` shuningdek `providerFailureThreshold` (10/15/2), `providerFailureWindowMs` (15/30/5 daq) va `providerCooldownMs` (5/10/1 daq) ni ham belgilaydi: bular **ixtiyoriy global Provider Cooldown ning oyna darvozasi**ni ta'minlaydi (`PROVIDER_COOLDOWN_ENABLED`, standart holda o'chiq) — `open-sse/services/providerCooldownTracker.ts` dagi provayder darajasidagi yozuv faqat `providerFailureWindowMs` ichida `providerFailureThreshold` ta xatodan keyin sovush deb hisoblanadi va keyin `providerCooldownMs` davomida sovuydi. Ular faol uzgichning chegaralari EMAS — ularni uzgich xatti-harakatini kutib sozlamang. Har bir standart qiymatni `OMNIROUTE_PROVIDER_BREAKER_*` va `OMNIROUTE_CIRCUIT_BREAKER_*` muhit o'zgaruvchilari orqali bekor qilish mumkin; runtime uchun aniq ma'lumotnoma jadvali `docs/architecture/RESILIENCE_GUIDE.md` da joylashgan.

Faqat provayder darajasidagi xato holatlari provayder uzgichini ishga tushirishi kerak:

```ts
(408, 500, 502, 503, 504);
```

Ko'pchilik `401`, `403` yoki `429` holatlari kabi oddiy akkaunt/kalit/model xatolari uchun butun provayder uzgichini ishga tushirmang. Ular odatda connection cooldown yoki model lockout ga tegishli. Umumiy API-kalit provayderining `403` holati terminal provayder/akkaunt xatosi deb tasniflanmagan taqdirda tiklanadigan bo'lishi kerak.

Breaker fon taymeridan emas, balki dangasa (lazy) tiklashdan foydalanadi. `OPEN` muddati
tugaganda, `getStatus()`, `canExecute()` va `getRetryAfterMs()` kabi o'qishlar holatni
`HALF_OPEN` ga yangilaydi, shuning uchun dashboardlar va combo nomzod yaratuvchilar muddati
o'tgan provayderni abadiy chetda qoldirmaydi.

### Ulanish cooldowni

**Qamrov**: bitta provayder ulanishi/akkaunti/kaliti.

**Maqsad**: bir provayderning boshqa ulanishlari so'rovlarga xizmat ko'rsatishda davom
etishi uchun, bitta nosoz kalit/akkauntni vaqtincha o'tkazib yuborish.

**Amalga oshirish**:

- Yozish/yangilash yo'li: `src/sse/services/auth.ts::markAccountUnavailable()`
- Akkauntni tanlash/filtrlash: `src/sse/services/auth.ts::getProviderCredentials...`
- Cooldown hisoblash: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Sozlamalar: `src/lib/resilience/settings.ts`

Provayder ulanishlaridagi muhim maydonlar:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Akkaunt tanlash paytida ulanish quyidagi holatda o'tkazib yuboriladi:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldownlar ham dangasa ishlaydi: `rateLimitedUntil` o'tmishda qolganda, ulanish yana
tanlashga mos bo'ladi. Muvaffaqiyatli foydalanilganda, `clearAccountError()` `testStatus`,
`rateLimitedUntil`, xato maydonlari va `backoffLevel` qiymatlarini tozalaydi.

Standart ulanish cooldown xatti-harakati:

- OAuth asosiy cooldowni: `5s`.
- API-kalit asosiy cooldowni: `3s`.
- API-kalit uchun `429` javobida upstream qayta urinish ko'rsatmalariga (`Retry-After`,
  reset sarlavhalari yoki tahlil qilinadigan reset matni) mavjud bo'lganda ustunlik
  berish kerak.
- Takrorlanuvchi tiklanadigan xatolar eksponensial backoffdan foydalanadi:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Thundering-herdga qarshi himoya bir xil ulanishda bir vaqtda yuzaga keladigan xatolarning
cooldownni qayta-qayta uzaytirishi yoki `backoffLevel`ni ikki marta oshirib yuborishining
oldini oladi.

Yakuniy holatlar cooldown emas. `banned`, `expired` (u faqat `EXPIRED_RETRY_MAX` orqali
N ta cheklangan qayta urinishdan keyin yakuniy holatga aylanadi) va `credits_exhausted`
ma'lumotlar/sozlamalar o'zgartirilguncha yoki operator ularni qayta o'rnatguncha mavjud
bo'lmasligi uchun mo'ljallangan. Yakuniy holatlarning ustiga vaqtinchalik cooldown
holatini yozmang.

### Model bloklanishi

**Qamrov**: provayder + ulanish + model.

**Maqsad**: ushbu ulanish uchun faqat bitta model mavjud bo'lmasa yoki kvota bilan
cheklangan bo'lsa, butun ulanishni o'chirib qo'ymaslik.

Misollar:

- Har bir model bo'yicha kvota qo'llab, `429` qaytaradigan provayderlar.
- Bitta topilmayotgan model uchun `404` qaytaradigan mahalliy provayderlar.
- Tanlangan Grok rejimlari kabi provayderga xos rejim/model ruxsat xatolari.

Model bloklanishi `open-sse/services/accountFallback.ts` da joylashgan bo'lib, bir xil
ulanishga boshqa modellarga xizmat ko'rsatishda davom etish imkonini beradi.

### Nosozliklarni tuzatish bo'yicha ko'rsatmalar

- Agar provayderning barcha kalitlari o'tkazib yuborilsa, provayder breaker holatini va
  har bir ulanishning `rateLimitedUntil`/`testStatus` qiymatlarini tekshiring.
- Agar provayder qayta o'rnatish oynasidan keyin ham doimiy ravishda chiqarib
  yuborilgandek ko'rinsa, kod `getStatus()`/`canExecute()` dan foydalanish o'rniga xom
  `state`ni o'qiyotganligini tekshiring.
- Agar bitta provayder kaliti ishlamasa, lekin boshqalari ishlashi kerak bo'lsa, provayder
  breakeri o'rniga ulanish cooldownini afzal ko'ring.
- Agar faqat bitta model ishlamasa, ulanish cooldowni o'rniga model bloklanishini afzal
  ko'ring.
- Agar holat o'z-o'zidan tiklanishi kerak bo'lsa, unda kelajakdagi vaqt belgisi/qayta
  o'rnatish taymauti hamda muddati o'tgan holatni yangilaydigan o'qish yo'li bo'lishi
  kerak. Doimiy holatlar qo'lda ma'lumot yoki konfiguratsiya o'zgarishlarini talab qiladi.

---

## TLS Fingerprinting va yashirinlik

Provayderga xos yashirinlik (JA3/JA4, CCH, obfuskatsiya) alohida hujjatlashtirilgan — qarang `docs/security/STEALTH_GUIDE.md` (git; `/docs` ichiga kompilyatsiya qilinmagan).

---

## Barqarorlik testlari (8-bosqich · C-blok)

Barqarorlik logikasi uchun unit testlardan tashqari, uchta test runtime-ni
haqiqiy stress/muvaffaqiyatsizlik sharoitlarida sinovdan o'tkazadi (barchasi integratsiya/nightly — hech biri PR-larni bloklamaydi):

| Test        | Nima qiladi                                                                                                                                                                                                  | Ishga tushirish                            |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| Chaos       | Soxta-upstream tuguni haqiqiy latency/reset/timeout/503 holatlarini kiritadi; circuit breaker ochilishi/tiklanishini va `checkFallbackError` 503 ni tiklanadigan fallback sifatida tasniflashini tekshiradi. | `RUN_CHAOS_INT=1 npm run test:chaos`       |
| Heap-growth | `--expose-gc` ostida har bir `createSSEStream` uchun ~500 ta oqim; heap chegaradan oshib ketsa muvaffaqiyatsiz bo'ladi (OOM guard #3069).                                                                    | `npm run test:heap`                        |
| k6 soak     | `/api/monitoring/health` ga uzluksiz yuk; p95/xato chegaralari.                                                                                                                                              | `k6 run tests/load/k6-soak.js` (har kecha) |

`.github/workflows/nightly-resilience.yml` tomonidan boshqariladi (cron + dispatch). Standart
`test:integration` da chaos va heap o'z-o'zini o'tkazib yuboradi (`RUN_CHAOS_INT`/`--expose-gc` bo'lmasa).

---

## Shuningdek qarang

- [Arxitektura qo'llanmasi](./ARCHITECTURE.md) — Tizim arxitekturasi va ichki tuzilishi
- [Foydalanuvchi qo'llanmasi](../guides/USER_GUIDE.md) — Provayderlar, kombolar, CLI integratsiyasi
- [Auto-Combo dvigateli](../routing/AUTO-COMBO.md) — 16 faktorli baholash, rejim paketlari
