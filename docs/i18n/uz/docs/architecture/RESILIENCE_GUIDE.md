# Resilience Guide (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

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

## 2. Ulanishning sovish davri

**Qamrov:** bitta provayder ulanishi/hisobi/kaliti.

**Maqsad:** ayni provayderning boshqa ulanishlari xizmat ko‘rsatishda davom etayotgan paytda bitta nosoz kalitni chetlab o‘tish.

**Amalga oshirilishi:**

- Mavjud emas deb belgilash: `src/sse/services/auth.ts::markAccountUnavailable()`
- Tanlash: ayni fayldagi `getProviderCredentials*`
- Sovish davrini hisoblash: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Sozlamalar: `src/lib/resilience/settings.ts`

**Har bir ulanish uchun maydonlar:**

- `rateLimitedUntil` — sovish davri tugaydigan vaqt tamg‘asi
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponensial ortga chekinish hisoblagichi

**Standart sovish davrlari:**

- OAuth bazaviy qiymati: 5s
- API-key bazaviy qiymati: 3s
- API-key 429: yuqori oqimdagi `Retry-After`/tiklash sarlavhalari/tahlil qilinadigan tiklash matniga ustunlik beradi
- Orqaga chekinish: `baseCooldownMs * 2 ** failureIndex`

**Birdaniga ommaviy qayta urinishdan himoya:** bir vaqtdagi nosozliklar sovish davrini haddan tashqari uzaytirishi yoki `backoffLevel` qiymatini ikki marta oshirishining oldini oladi.

**Yakuniy holatlar (sovish davrlari EMAS):**

- `banned` — taqiqlangan kalit so‘zi / hisob bloklanishini aniqlash orqali o‘rnatiladi ([BAN_DETECTION](../security/BAN_DETECTION.md) ga qarang), shuningdek, yuqori oqimdagi har bir so‘rov bo‘yicha ketma-ket uchta rad javobidan so‘ng (`request_rejected`, masalan, Anthropic OAuth 403 "So‘rovga ruxsat berilmagan" — `open-sse/services/requestRejectedStreak.ts`); bitta rad javobi ulanishni faqat sovish holatiga o‘tkazadi
- `expired` (cheklangan qayta urinishlardan so‘ng yakuniy holatga o‘tadi — eksponensial orqaga chekinish bilan `EXPIRED_RETRY_MAX = 3` — shunda vaqtinchalik OAuth xatolari hisob butunlay o‘chirilishidan oldin o‘z-o‘zidan tiklanishi mumkin)
- `credits_exhausted`

Bu holatlar hisob ma’lumotlari o‘zgarmaguncha yoki operator ularni tiklamaguncha saqlanib qoladi. Yakuniy holatlarni vaqtinchalik sovish holati bilan almashtirmang.

**Kechiktirilgan tiklanish:** `rateLimitedUntil` vaqti o‘tgach, ulanish yana foydalanishga yaroqli bo‘ladi. Muvaffaqiyatli ishlatilganda `clearAccountError()` barcha xato maydonlarini tozalaydi.

### Claude OAuth foydalanish devori: pastroq ustuvorlikdagi yo‘lak + seans cheklovini tiklash

**Qamrov:** bitta Claude obunasi (OAuth) ulanishi. Har ikkala xususiyat ham **har bir
ulanish uchun alohida yoqiladi** (Ulanishni tahrirlash → Claude bo‘limi → `providerSpecificData`
ichidagi `lowPriorityMode` / `autoLimitReset`, ikkalasi ham standart holatda o‘chiq) va Claude
Codeʼning `/low-priority` hamda `/limit-reset` buyruqlarini takrorlaydi (aloqa protokoli
Claude Code 2.1.263 versiyasidan olingan).

**Amalga oshirilishi:**

- Holatlar mashinasi + javoblarni tasniflash: `open-sse/services/claudeLowPriority.ts`
- Tiklash holati/so‘rovi mijozi: `open-sse/services/claudeLimitReset.ts`
- Bajaruvchi huk (sarlavha kiritish + ayni hisobda qayta urinish): `open-sse/executors/base.ts::execute()`
- Alohida yoqish holatini saqlash: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Ishga tushirish sharti:** 5 soatlik foydalanish devori — sarlavhalarida
`anthropic-ratelimit-unified-status: rejected` va hisob mos bo‘lganda
`anthropic-ratelimit-unified-slow-offer: treatment` mavjud bo‘lgan `429`. Birinchi devor
429 javobidan oldin hech narsa yuborilmaydi; birlashtirilgan sarlavhalarsiz keskin 429
javobi odatiy sovish yo‘lidan o‘tadi.

**Pastroq ustuvorlikdagi yo‘lak** (`lowPriorityMode`):

- Devor 429 javobida bajaruvchi taklifni qabul qiladi va **ayni** hisob bilan
  `anthropic-usage-limit: slow` sarlavhasini qo‘shib darhol qayta urinadi; yo‘lak e’lon
  qilingan `anthropic-ratelimit-unified-reset` vaqtigacha (+60s imtiyozli davr) faol qoladi
  va shu vaqt oralig‘idagi har bir so‘rov ushbu sarlavhani olib yuradi. Ushlab qolingan 429
  javobi `handleChatCore` ga hech qachon yetib bormaydi, shu sababli ulanish sovish
  holatiga **o‘tkazilmaydi** va boshqasiga almashtirilmaydi.
- Keyingi javoblardagi `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  yo‘lakni saqlab qoladi; `slot_busy` (429) yoki `529` serverning
  `anthropic-ratelimit-unified-slow-retry-after` muddatini kutadi (standart 20s, 5–600s
  oralig‘ida cheklanadi, ±30% tasodifiy og‘ish) va
  `anthropic-ratelimit-unified-slow-max-wait` bilan cheklangan holda qayta urinadi
  (standart 20 min, 1 min–6 h oralig‘ida cheklanadi) — bu muddatdan keyin yo‘lak tugaydi
  va 10 daqiqalik sovish qayta qabul qilishni bloklaydi. Kutish vaqti, shuningdek,
  so‘rovning yuqori oqimni boshlash taymautidan (`resolveFetchStartTimeout`, standart
  10 min) qolgan vaqt minus 5 s zaxira bilan cheklanadi: bu cheklovsiz standart
  20 daqiqalik maksimal kutish so‘rovning o‘zidan uzoq davom etar va uyqu kutishning
  o‘rtasida bekor qilinib, odatiy `max_wait` yakuni + sovish o‘rniga `TimeoutError`
  yuzaga kelishiga sabab bo‘lar edi.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5h oynaning almashishi yoki
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (pulli ortiqcha
  foydalanish endi devorni qoplagani sababli, har qanday holatda uni `extra_usage`
  sifatida tugatadi) yo‘lakni yakunlaydi; keyin javob odatiy sovish yo‘liga o‘tadi.
  `budget_exhausted` e’lon qilingan budjet tiklanishigacha (≤ 8 kun) eslab qolinadi.
- Devor tekshiruvi bajaruvchining 400 sababli bir urinish doirasidagi qayta urinishlaridan
  (kontekstni tahrirlash, fikrlash/sa’y-harakat chegaralari, parametrlarni avtomatik
  o‘rganish) keyin bajariladi, shu sababli faqat ushbu qayta urinishlardan birida paydo
  bo‘ladigan devor 429 javobi ham sovish yo‘liga yetib borish o‘rniga ushlab qolinadi.
- Holat har bir ulanish uchun xotirada saqlanadi (qayta ishga tushirish qayta qabul qilish
  uchun bitta qo‘shimcha devor 429 javobini talab qiladi).

**Seans cheklovini tiklash** (`autoLimitReset`, ikkalasi ham yoqilganida yo‘lakdan oldin sinab ko‘riladi):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  bloki; `arm: "reset"` va `available: true` bo‘lganda,
  `{ "program": "juniper_tide" }` bilan
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`
  (`providerSpecificData.organizationUUID` dan tashkilot UUIDsi, boshlang‘ich zaxira
  variant bilan).
- `result: reset|not_limited` → so‘rov to‘liq tezlikda qayta uriniladi (sekinlik sarlavhasisiz).
  `already_used` / `not_offered` `next_available_at` qiymatini xotirada saqlaydi (standart
  bir hafta); har qanday nosozlik 15 daqiqalik orqaga chekinishga olib keladi. Tiklash
  haftada bir marta amalga oshiriladi va baribir haftalik cheklovga kiradi.

Regressiyadan himoya testlari: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Seansga bog‘liqlik (#7274)

**Qamrov:** **istalgan** provayder uchun bitta ulanishga biriktirilgan bitta mijoz seansi (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` sarlavhasi).

**Maqsad:** ko‘p bosqichli agentni (Claude Code, aider, maxsus agentlar) so‘rovlar davomida bir xil hisobda saqlash, shu orqali hisoblararo kontekst yo‘qolishini va har bir hisob bo‘yicha sessiya holatiga ega provayderlarda takroriy sovuq ishga tushish 429 xatolarini kamaytirish.

**Amalga oshirish:**

- TTL aniqlash: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Biriktirishni tanlash/yaratish: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Sarlavhani ajratib olish (umumiy, istalgan provayder): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Saqlanadigan biriktirish jadvali: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Sozlama: `sessionAffinityTtlMs` (ms dagi global TTL, `0` o‘chiradi) — `src/lib/db/settings.ts`. Faqat Codex uchun mo‘ljallangan `codexSessionAffinityTtlMs` nomidan `124_generic_session_affinity_ttl.sql` migratsiyasi orqali o‘zgartirilgan; u avval sozlangan har qanday Codex TTL qiymatini yangi standart qiymat sifatida ko‘chiradi.

#7274 dan oldin `resolveSessionAffinityTtlMs()` `codex` dan boshqa barcha provayderlar uchun darhol `0` qaytarar edi, shu sababli biriktirish mexanizmi va sarlavhalarni ajratib olish allaqachon provayderga bog‘liq bo‘lmagan bo‘lsa ham, TTL sozlamasi (va sessiya sarlavhalari) boshqa joylarda hech qanday ta’sir ko‘rsatmas edi. Tuzatish ushbu erta qaytishni olib tashladi; endi TTL global miqyosda `0` dan yuqori qiymatga o‘rnatilgach, barcha provayderlarga bir xil tarzda qo‘llanadi.

Sessiya yaqinligini belgilovchi uchta sarlavha hech qachon yuqori oqimga uzatilmaydi — ijrochilar mijoz sarlavhalarini to‘g‘ridan-to‘g‘ri uzatish o‘rniga o‘zlarining yuqori oqim sarlavhalarini boshidan yaratadi, shuning uchun bu faqat ichki korrelyatsiya identifikatori bo‘lib qoladi.

### Boshqariladigan sessiya ulanishlarining eksklyuziv ijaralari

**Qamrov:** bitta faol boshqariladigan HTTP mijoz/sessiya bitta mos OmniRoute ulanishiga egalik qiladi.

**Maqsad:** so‘rovlar davomida qat’iy marshrutlash chegarasiga muhtoj mijozlar uchun bardavom eksklyuziv ulanish egaligini ta’minlash. Bu yumshoq uzluksizlik afzalligi bo‘lgan sessiya yaqinligidan farq qiladi: eksklyuziv ijara hayot sikli holatini SQLite’da saqlaydi, faol egalar va faol ulanishlarning global yagonaligini ta’minlaydi hamda provayderga yuborishdan oldin eskirgan avlodni rad etadi.

Bu imkoniyat har bir API kaliti uchun ixtiyoriy ravishda yoqiladi. Boshqariladigan kalit `lease:exclusive` qamroviga va aniq ko‘rsatilgan, bo‘sh bo‘lmagan `allowedConnections` ro‘yxatiga ega bo‘lishi kerak. Istalgan HTTP mijoz hayot sikli endpointidan foydalanishi mumkin; mijoz nomi, user-agent, provayder, OAuth usuli yoki model talab qilinmaydi. Ijara modelga emas, ulanishga egalik qiladi, shu sababli ulanish odatdagi mezonlarga muvofiq qolsa, modelning o‘zgarishi bog‘lanishni saqlab qoladi. Model, kvota, salomatlik holati, sovish davri va ruxsat etilganlar ro‘yxatining odatiy qoidalari o‘z kuchida qoladi hamda ayni avlodni boshqa bo‘sh va mos ulanishga o‘tkazishi mumkin.

Hayot sikli `acquire`, `renew` va `release` JSON amallariga ega `POST /api/v1/session-leases` orqali boshqariladi. Boshqariladigan inferensiya so‘rovlarida shaffof bo‘lmagan `X-OmniRoute-Lease-Owner` qiymati va aniq `X-OmniRoute-Lease-Generation` taqdim etiladi. Ega identifikatori `vlo_` dan keyin keladigan 43 ta base64url belgisidan iborat; faqat uning SHA-256 xeshi saqlanadi. Har bir yakuniy jo‘natish chegarasi autentifikatsiya qilingan API kaliti ID sini va faol ulanish ID sini ham bog‘laydi. Ijarani boshqarish sarlavhalari jurnallardan, saqlanadigan so‘rov oniy nusxalaridan va yuqori oqim ijrochisi sarlavhalaridan olib tashlanadi.

Agar odatiy marshrutlashda mos boshqariladigan nomzodlar mavjud bo‘lsa-yu, ammo har bir bo‘sh nomzod begona faol ijara bilan band bo‘lsa, OmniRoute HTTP `429`, lease-capacity-unavailable kodi, sig‘imni kutish holati va eng yaqin tegishli amal qilish muddati tugashidan hisoblangan chegaralangan `Retry-After` qiymatini qaytaradi. Moslikning odatiy tarzda bo‘sh bo‘lishi ijara ziddiyati hisoblanmaydi va mavjud marshrutlash xatosi semantikasini saqlab qoladi.

Tegishli mexanizmlar alohida bo‘lib qoladi:

- OAuth sessiyalarining bandligi OAuth hisoblari uchun jarayon doirasidagi yumshoq taqsimotdir.
- Hisob semaforlari so‘rovlar parallelligi uchun ruxsatlar beradi va so‘rov yakunlanganda tugaydi.
- Boshqariladigan sessiyalarning eksklyuziv ijaralari — bu avlod chegarasiga ega bardavom hayot sikli egaligidir.

---

## 3. Modelni bloklash

**Qamrov:** provayder + ulanish + model uchligi.

**Holat bo‘yicha kalit qamrovi:** xato holati bloklash qaysi kalitga
yozilishini belgilaydi (`open-sse/services/accountFallback/exactModelLock.ts` ichidagi `resolveLockoutScope()`):

- `429` / `403` / `402` — kvota yoki foydalanish huquqi signali — **kvota oilasini** bloklaydi:
  codex uchun butun `codex` / `spark` qamrovi (ulanishdagi barcha `gpt-5*`
  modellari), boshqa provayderlar uchun `getQuotaScopedModelForProvider()`.
- `404` faqat modelning o‘zini bloklaydi (`getModelLockKey()` `not_found` qamrovini toraytiradi).
- Boshqa har qanday holat — `5xx` transport/server xatolari va sifat tekshiruvi
  natijasida OmniRoute tomonidan yaratilgan `502` — faqat **aniq**
  provayder/ulanish/model uchligini bloklaydi. Bitta modeldagi nosoz oqim akkaunt
  kvotasi haqida dalil emas; bu qoidadan oldin `codex/gpt-5.6-luna` modelidagi
  bitta bo‘sh javob ushbu ulanishning barcha `gpt-5*` modellarini, kvotasi
  o‘zgarmagan bo‘lsa ham, marshrutlashdan 2–30 daqiqaga (bosqichma-bosqich oshib boruvchi) chiqarib tashlardi.
- Chaqiruvchining aniq ko‘rsatilgan `scope` opsiyasi doimo ustun turadi (Antigravity `"exact"` uzatadi).

**Maqsad:** faqat bitta model mavjud bo‘lmaganda yoki kvotasi cheklanganda butun ulanishni o‘chirib qo‘yishning oldini olish.

**Misollar:**

- Har bir model uchun alohida kvotaga ega provayderlarning 429 qaytarishi
- Mahalliy provayderlarning mavjud bo‘lmagan bitta model uchun 404 qaytarishi
- Provayderga xos rejim/model ruxsati xatolari (masalan, Grok rejimlari)

**Amalga oshirish:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Model kutish muddatlari boshqaruv paneli (v3.8.0)

UI: Sozlamalar → Model kutish muddatlari (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Faol bloklashlarni quyidagi ma’lumotlar bilan ko‘rsatadi: provayder, ulanish, model, sabab, expiresAt. Operatorlar kartadan modelni qo‘lda qayta yoqishi mumkin.

**REST API:**

- `GET /api/resilience/model-cooldowns` — faol bloklashlar ro‘yxatini olish
- `DELETE /api/resilience/model-cooldowns` — qo‘lda qayta yoqish. So‘rov tanasi: `{provider, connection, model}`. Autentifikatsiya: boshqaruv.

### Bloklash sozlamalari UI’i + muvaffaqiyat asosidagi pasayish orqali tiklash (v3.8.23)

Modelni bloklash doimo yoqilgan, kodda qat’iy belgilangan xatti-harakatdan o‘z
sozlamalar kartasi va o‘zini o‘zi tiklash yo‘liga ega, to‘liq sozlanadigan hamda
ixtiyoriy yoqiladigan funksiyaga aylantirildi.

**Sozlamalar kartasi:** Sozlamalar → Modelni bloklash
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Bu yuqoridagi faqat o‘qish uchun mo‘ljallangan `ModelCooldownsCard`dan (u faqat
faol bloklashlarni _ro‘yxatlaydi_) **farq qiladi** — yangi karta _parametrlarni sozlaydi_. Standart
qiymatlar `DEFAULT_MODEL_LOCKOUT_SETTINGS` ichida joylashgan
(`src/lib/resilience/modelLockoutSettings.ts`):

| Sozlama                 | Standart qiymat                  | Ma’nosi                                                                    |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Asosiy almashtirgich — modelni bloklash **standart holatda o‘chiq**.       |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Model qamrovidagi xato sifatida hisoblanadigan yuqori oqim holatlari.      |
| `baseCooldownMs`        | `120_000` (120 s)                | Birinchi xato uchun dastlabki bloklash davomiyligi.                        |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Bosqichma-bosqich oshiriladigan kutish muddatining yuqori chegarasi.       |
| `maxBackoffSteps`       | `10`                             | Eksponensial kechikishni oshirish bosqichlarining maksimal soni.           |
| `useExponentialBackoff` | `true`                           | Takroriy xatolar kutish muddatini eksponensial ravishda oshirishi kerakmi. |

Sozlamalar odatiy sozlamalar ombori orqali saqlanadi va chidamlilik sozlamalari
sxemasi orqali tekshiriladi; karta `baseCooldownMs`/`maxCooldownMs`
qiymatlarini (`maxCooldownMs ≥ baseCooldownMs` sharti bilan) hamda `maxBackoffSteps`ni cheklaydi.

**Muvaffaqiyat asosidagi pasayish orqali tiklash:** tiklash faqat taymer muddati
tugashiga bog‘liq **emas**. Sog‘lom javob modelning xatolar sonini bosqichma-bosqich
kamaytiradi, shuning uchun vaqt oralig‘i davomida tiklangan model taymer muddati
tugashidan oldin oshib borishni to‘xtatadi (va bloklash bekor qilinadi). Kombinatsiyalangan
nishon muvaffaqiyatli bo‘lganda, `open-sse/services/combo.ts` fayli
`decayModelFailureCount()`ni (`open-sse/services/accountFallback.ts`) chaqiradi,
u saqlangan `failureCount` qiymatini **yarmiga kamaytiradi**
(`Math.floor(failureCount / 2)`); qiymat `0`ga yetganda bloklash yozuvi butunlay
o‘chiriladi. Unga mos `recordModelLockoutFailure()` eskalatsiya oralig‘ida yuz
bergan xatolarda hisoblagichni oshiradi (va kutish muddatini uzaytiradi).
Muvaffaqiyat asosidagi bu pasayish oddiy taymer muddati tugashiga qo‘shimcha
ravishda ishlaydi — har ikkala yo‘l ham modelni qayta yoqishi mumkin.

**Holat:** bloklashlar DB’da saqlanmaydi, balki **xotirada** saqlanadi (har bir
jarayon uchun `provider:connectionId:model` kalitli `ModelLockoutEntry`
`Map`lari, aniq qamrovli bloklashlar uchun esa `provider:connectionId:exact:model`);
ular qayta ishga tushirilganda yo‘qoladi. _Sozlamalar_ doimiy saqlanadi; faol
bloklash _holati_ esa vaqtinchalikdir.

---

## 4. Kvota ulashishdagi parallellikni boshqarish (v3.8.36)

Obuna hisoblari (GLM, MiniMax va boshqalar) ko‘pincha bir vaqtning o‘zida faqat ~1–3 ta
so‘rovni qabul qiladi; bu chegaradan oshish 429 xatolari va kutish davrlarini keltirib chiqaradi. Bu holat
bir nechta API kaliti bitta yuqori oqimdagi hisobni ulashadigan **quota-share** (`qtSd/…`)
kombinatsiyalarida ayniqsa keskin. Uchta qatlam umumiy hisobning so‘rovlar bilan to‘lib ketishiga yo‘l qo‘ymaydi.

### Har bir ulanish uchun parallellik chegarasi (`max_concurrent`)

Har bir provayder ulanishi `max_concurrent` yuqori chegarasini belgilashi mumkin
(`provider_connections.max_concurrent`, ulanish modal oynasi / API / DB orqali o‘rnatiladi).
Cheklov bo‘lmasligi uchun uni bo‘sh qoldiring. Bu quyidagi ketma-ketlashtirish
qatlamini boshqaradigan yagona sozlama — uni hisobning haqiqiy parallellik darajasiga o‘rnating (masalan, GLM ~1, MiniMax ~2).

### Quota-share so‘rovlarini ketma-ketlashtirish

Quota-share dispetcherizatsiyasi musbat `max_concurrent` qiymatini belgilagan ulanishni
nishonga olganida, ayni **hisobga** yo‘naltirilgan parallel so‘rovlar har bir ulanishga
tegishli semafor (`qsconn:<connectionId>` kaliti) orqali ketma-ketlashtiriladi: ortiqcha so‘rovlar
hisobni to‘ldirish o‘rniga **navbatda kutadi**. Bu **fail-open** tamoyilida ishlaydi — to‘lgan
navbat yoki taym-aut jo‘natilishi mumkin bo‘lgan so‘rovni rad etish o‘rniga slotsiz davom etadi.
Buni **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, standart
holatda yoqilgan) orqali almashtiring. `max_concurrent` chegarasi bo‘lmasa, xatti-harakat o‘zgarmaydi.

> Quota-share marshrutlash darvozasi (`selectQuotaShareTarget`, DRR + P2C)ning o‘zi
> fail-open tamoyilida ishlaydi va faqat chegaraga yetgan ulanishning ustuvorligini _pasaytiradi_ —
> bitta ulanishli pulda u qat’iy cheklov qo‘ya olmaydi, shu sababli oqimni amalda aynan
> shu semafor nazorat qiladi.

### Kombinatsiyaning kutish davrini hisobga oluvchi qayta urinish

Har bir kombinatsiya strategiyasi uchun (yoqilganida), qisqa muddatli o‘tkinchi kutish davri sababli
429 xatosini aniq yuzaga keltiradigan so‘rov 429 ni qaytarish o‘rniga shu davr tugashini kutadi va
qayta jo‘natiladi — bu ko‘p modelli kombinatsiyalardagi Gemini turidagi TPM/RPM oynalarini
(~60s retry-after), masalan, 2 modelli kombinatsiyaning har ikkala nishoni har bir modelga tegishli
tezlik chegarasiga urilishini qamrab oladi. Bu **Settings → Resilience** ichidagi
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) bilan cheklanadi. U `quota_exhausted` (yarim tungacha bloklangan)
yoki autentifikatsiya/topilmadi sabablarida hech qachon kutmaydi.

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
